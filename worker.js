// pondex Cloudflare Worker — v3
// Proxies: Yahoo Finance (chart + news), Massive/Polygon (fundamentals), SEC EDGAR (insider + EPS)
//
// Deploy: dash.cloudflare.com → Workers & Pages → your worker → Edit code → paste → Deploy
//
// ── REQUIRED: Worker Secret ───────────────────────────────────────────────────
// Worker → Settings → Variables and Secrets → Add variable (Type: Secret):
//   MASSIVE_KEY   your Massive/Polygon API key
// ─────────────────────────────────────────────────────────────────────────────

const ALLOWED_ORIGINS = [
  'https://dan123iel.github.io',
  'http://localhost',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:8080',
  'http://127.0.0.1',
  'http://127.0.0.1:5500',
  'http://127.0.0.1:8080',
  'null', // file:// protocol — local dev
];

const MASSIVE_BASE = 'https://api.massive.com';
const EDGAR_BASE   = 'https://data.sec.gov';

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') return corsResponse(null, 204, request);

    const url  = new URL(request.url);
    const path = url.pathname;

    // ── Yahoo Finance news ─────────────────────────────────────────────────
    if (path === '/yahoo-news') {
      return handleNews(url.searchParams.get('q') || '', request);
    }

    // ── Yahoo Finance chart ────────────────────────────────────────────────
    const chartMatch = path.match(/^\/yahoo\/chart\/([A-Z0-9.\-^]+)$/i);
    if (chartMatch) {
      return handleYahooChart(chartMatch[1].toUpperCase(), url.searchParams.get('range') || '1y', request);
    }

    // ── Massive (Polygon) proxy — /massive/<version>/<endpoint>?params ─────
    if (path.startsWith('/massive/')) {
      return handleMassive(path.slice(9), url.searchParams, request, env);
    }

    // ── Massive branding proxy — /branding/<encoded-path> ──────────────────
    // Proxies authenticated logo/icon URLs from Massive branding API
    if (path.startsWith('/branding/')) {
      return handleBranding(path.slice(10), request, env);
    }

    // ── SEC EDGAR proxy — /edgar/<path> ────────────────────────────────────
    // Examples:
    //   /edgar/submissions/CIK0000320193.json
    //   /edgar/api/xbrl/companyconcept/CIK0000320193/us-gaap/EarningsPerShareDiluted.json
    //   /edgar/company_tickers.json
    if (path.startsWith('/edgar/')) {
      return handleEdgar(path.slice(7), request);
    }

    // ── Groq AI proxy — POST /ai/groq ──────────────────────────────────────
    // Proxies Groq chat completions server-side — no user key needed in browser
    if (path === '/ai/groq' && request.method === 'POST') {
      return handleGroq(request, env);
    }

    // ── Legacy Yahoo summary (kept for backward compat) ────────────────────
    const summaryMatch = path.match(/^\/yahoo\/summary\/([A-Z0-9.\-^]+)$/i);
    if (summaryMatch) return handleYahooSummary(summaryMatch[1].toUpperCase(), request);

    return corsResponse({ error: 'Unknown endpoint' }, 404, request);
  },
};

// ── Groq AI proxy ────────────────────────────────────────────────────────────
async function handleGroq(request, env) {
  const key = env.GROQ_KEY;
  if (!key) {
    return corsResponse({ error: 'GROQ_KEY not configured as Worker Secret.' }, 503, request);
  }
  try {
    const body = await request.json();
    // Force model to current supported version
    if (!body.model || body.model === 'llama3-70b-8192') {
      body.model = 'llama-3.3-70b-versatile';
    }
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return corsResponse(data, res.status, request);
  } catch (e) {
    return corsResponse({ error: e.message }, 502, request);
  }
}

// ── Massive branding proxy (logos/icons) ─────────────────────────────────────
async function handleBranding(subpath, request, env) {
  const key = env.MASSIVE_KEY;
  if (!key) return new Response('No key', { status: 503 });
  const brandingUrl = `https://api.massive.com/v1/reference/company-branding/${subpath}?apiKey=${key}`;
  try {
    const res = await fetch(brandingUrl, {
      headers: { 'User-Agent': 'pondex-worker/3.0' },
      cf: { cacheTtl: 86400, cacheEverything: true },
    });
    const blob = await res.arrayBuffer();
    const ct = res.headers.get('Content-Type') || 'image/jpeg';
    const origin = request ? (request.headers.get('Origin') || '') : '';
    const allowed = ['https://dan123iel.github.io','http://localhost','http://127.0.0.1','null'];
    const allowedOrigin = allowed.includes(origin) ? origin : allowed[0];
    return new Response(blob, {
      status: res.status,
      headers: {
        'Content-Type': ct,
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': allowedOrigin,
      },
    });
  } catch (e) {
    return new Response('error', { status: 502 });
  }
}

// ── Massive (Polygon) proxy ───────────────────────────────────────────────────
async function handleMassive(subpath, params, request, env) {
  const key = env.MASSIVE_KEY;
  if (!key) {
    return corsResponse({ error: 'MASSIVE_KEY not configured — set it as a Worker Secret.' }, 503, request);
  }
  const qs = new URLSearchParams(params);
  qs.set('apiKey', key);
  const massiveUrl = `${MASSIVE_BASE}/${subpath}?${qs.toString()}`;

  // Use longer cache for financials (change quarterly) vs. prices (change daily)
  const isFinancials = subpath.includes('financials');
  const cacheTtl = isFinancials ? 86400 : 3600; // 24h for financials, 1h for others

  try {
    const res  = await fetch(massiveUrl, {
      headers: { 'User-Agent': 'pondex-worker/3.0' },
      cf: { cacheTtl, cacheEverything: true },
    });
    const data = await res.json();
    // If Massive returns a rate limit error, return it with 429 so client can handle it
    if (data && data.error && data.error.includes('exceeded')) {
      return corsResponse(data, 429, request);
    }
    return corsResponse(data, res.status, request);
  } catch (e) {
    return corsResponse({ error: e.message }, 502, request);
  }
}

// ── SEC EDGAR proxy ───────────────────────────────────────────────────────────
async function handleEdgar(subpath, request) {
  // SEC EDGAR requires a descriptive User-Agent (company + contact)
  const edgarUrl = `${EDGAR_BASE}/${subpath}`;
  try {
    const res  = await fetch(edgarUrl, {
      headers: {
        'User-Agent': 'pondex/3.0 (d.lenz.contact@gmail.com)',
        'Accept': 'application/json',
      },
      cf: { cacheTtl: 3600, cacheEverything: true },
    });
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch(e) { data = { raw: text }; }
    return corsResponse(data, res.status, request);
  } catch (e) {
    return corsResponse({ error: e.message }, 502, request);
  }
}

// ── Yahoo Finance news ────────────────────────────────────────────────────────
async function handleNews(ticker, request) {
  try {
    const rssUrl = `https://feeds.finance.yahoo.com/rss/2.0/headline?s=${encodeURIComponent(ticker)}&region=US&lang=en-US`;
    const res  = await fetch(rssUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const xml  = await res.text();
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let m;
    while ((m = itemRegex.exec(xml)) !== null) {
      const block   = m[1];
      const title   = (block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)  || block.match(/<title>(.*?)<\/title>/))?.[1]  || '';
      const link    = block.match(/<link>(.*?)<\/link>/)?.[1] || '';
      const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';
      const source  = block.match(/<source[^>]*>(.*?)<\/source>/)?.[1] || 'Yahoo Finance';
      if (title) items.push({ title: title.trim(), link: link.trim(), pubDate: pubDate.trim(), source: source.trim() });
    }
    return corsResponse(items.slice(0, 10), 200, request);
  } catch (e) {
    return corsResponse({ error: e.message }, 500, request);
  }
}

// ── Yahoo Finance chart ───────────────────────────────────────────────────────
async function handleYahooChart(ticker, range, request) {
  try {
    const res  = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=${range}`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    const json   = await res.json();
    const result = json?.chart?.result?.[0];
    if (!result) return corsResponse({ error: `Ticker ${ticker} not found` }, 404, request);
    const meta       = result.meta || {};
    const timestamps = result.timestamp || [];
    const quote      = result.indicators?.quote?.[0] || {};
    const closes     = (quote.close  || []).map(v => v ?? null);
    const highs      = (quote.high   || []).map(v => v ?? null);
    const lows       = (quote.low    || []).map(v => v ?? null);
    const volumes    = (quote.volume || []).map(v => v ?? null);
    return corsResponse({ meta, timestamps, closes, highs, lows, volumes }, 200, request);
  } catch (e) {
    return corsResponse({ error: e.message }, 500, request);
  }
}

// ── Yahoo Finance summary (legacy) ────────────────────────────────────────────
async function handleYahooSummary(ticker, request) {
  try {
    const crumb   = await getCrumb();
    const modules = ['financialData','defaultKeyStatistics','balanceSheetHistory',
      'incomeStatementHistory','cashflowStatementHistory','earningsTrend'].join(',');
    const res  = await fetch(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=${encodeURIComponent(modules)}&crumb=${encodeURIComponent(crumb.crumb)}`,
      { headers: { Cookie: crumb.cookie, 'User-Agent': 'Mozilla/5.0' } }
    );
    const json   = await res.json();
    const result = json?.quoteSummary?.result?.[0];
    if (!result) return corsResponse({ error: `Ticker ${ticker} not found` }, 404, request);
    return corsResponse(flatten(result), 200, request);
  } catch (e) {
    return corsResponse({ error: e.message }, 500, request);
  }
}

async function getCrumb() {
  const init = await fetch('https://fc.yahoo.com', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    redirect: 'follow',
  });
  const cookieHeader = init.headers.get('set-cookie') || '';
  const cookie = cookieHeader.split(';')[0];
  const crumbRes = await fetch('https://query1.finance.yahoo.com/v1/test/getcrumb', {
    headers: { 'User-Agent': 'Mozilla/5.0', Cookie: cookie },
  });
  const crumb = await crumbRes.text();
  return { crumb: crumb.trim(), cookie };
}

function flatten(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(flatten);
  if ('raw' in obj && Object.keys(obj).length <= 3) return obj.raw;
  const keys = Object.keys(obj);
  if (keys.length === 0) return null;
  const out = {};
  for (const [k, v] of Object.entries(obj)) out[k] = flatten(v);
  return out;
}

// ── CORS helper ───────────────────────────────────────────────────────────────
function corsResponse(body, status = 200, request) {
  const origin        = request ? (request.headers.get('Origin') || '') : '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return new Response(body !== null ? JSON.stringify(body) : null, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-store',
    },
  });
}
