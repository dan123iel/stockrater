// Cloudflare Worker — Yahoo Finance Proxy for StockRater
// Deploy at: https://dash.cloudflare.com → Workers & Pages → Create Worker

const ALLOWED_ORIGIN = 'https://dan123iel.github.io';

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return corsResponse(null, 204);
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // /yahoo/summary/:ticker — quoteSummary with auto-crumb
    const summaryMatch = path.match(/^\/yahoo\/summary\/([A-Z0-9.\-^]+)$/i);
    if (summaryMatch) {
      return handleSummary(summaryMatch[1].toUpperCase());
    }

    // /yahoo/chart/:ticker?range=1y
    const chartMatch = path.match(/^\/yahoo\/chart\/([A-Z0-9.\-^]+)$/i);
    if (chartMatch) {
      const range = url.searchParams.get('range') || '1y';
      return handleChart(chartMatch[1].toUpperCase(), range);
    }

    return corsResponse({ error: 'Unknown endpoint' }, 404);
  },
};

async function handleSummary(ticker) {
  try {
    const crumb = await getCrumb();
    const modules = 'financialData,defaultKeyStatistics';
    const res = await fetch(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=${modules}&crumb=${encodeURIComponent(crumb.crumb)}`,
      { headers: { Cookie: crumb.cookie, 'User-Agent': 'Mozilla/5.0' } }
    );
    const json = await res.json();
    const result = json?.quoteSummary?.result?.[0];
    if (!result) return corsResponse({ error: `Ticker ${ticker} not found` }, 404);
    return corsResponse(result);
  } catch (e) {
    return corsResponse({ error: e.message }, 500);
  }
}

async function handleChart(ticker, range) {
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=${range}`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    const json = await res.json();
    const result = json?.chart?.result?.[0];
    if (!result) return corsResponse({ error: `Ticker ${ticker} not found` }, 404);

    const meta = result.meta || {};
    const timestamps = result.timestamp || [];
    const quote = result.indicators?.quote?.[0] || {};
    const closes = (quote.close || []).map(v => v ?? null);
    const highs = (quote.high || []).map(v => v ?? null);
    const lows = (quote.low || []).map(v => v ?? null);

    return corsResponse({ meta, timestamps, closes, highs, lows });
  } catch (e) {
    return corsResponse({ error: e.message }, 500);
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
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      Cookie: cookie,
    },
  });
  const crumb = await crumbRes.text();
  return { crumb: crumb.trim(), cookie };
}

function corsResponse(body, status = 200) {
  return new Response(body !== null ? JSON.stringify(body) : null, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
