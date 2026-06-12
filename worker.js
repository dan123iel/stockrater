// Cloudflare Worker — Yahoo Finance Proxy for StockRater
// Deploy at: https://dash.cloudflare.com → Workers & Pages → Create Worker

const ALLOWED_ORIGINS = [
  'https://dan123iel.github.io',
  'http://localhost',
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1',
  'http://127.0.0.1:5500',
  'null', // file:// protocol (local HTML open in browser)
];

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return corsResponse(null, 204, request);
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // /yahoo/summary/:ticker — full quoteSummary with all financial modules
    const summaryMatch = path.match(/^\/yahoo\/summary\/([A-Z0-9.\-^]+)$/i);
    if (summaryMatch) {
      return handleSummary(summaryMatch[1].toUpperCase(), request);
    }

    // /yahoo/chart/:ticker?range=1y
    const chartMatch = path.match(/^\/yahoo\/chart\/([A-Z0-9.\-^]+)$/i);
    if (chartMatch) {
      const range = url.searchParams.get('range') || '1y';
      return handleChart(chartMatch[1].toUpperCase(), range, request);
    }

    // /yahoo/search?q=query — search by name, ISIN, WKN
    if (path === '/yahoo/search') {
      const q = url.searchParams.get('q') || '';
      return handleSearch(q, request);
    }

    return corsResponse({ error: 'Unknown endpoint' }, 404, request);
  },
};

async function handleSummary(ticker, request) {
  try {
    const crumb = await getCrumb();

    // All modules needed for full ratio coverage:
    // financialData       → margins, revenue, cashflow, debt, currentRatio, quickRatio
    // defaultKeyStatistics→ forwardPE, EV, sharesOutstanding, earningsGrowth, insiders
    // balanceSheetHistory → totalAssets, totalLiab, totalStockholderEquity, currentLiabilities
    // incomeStatementHistory → totalRevenue, netIncome, researchDevelopment, grossProfit
    // cashflowStatementHistory → totalCashFromOperatingActivities, capitalExpenditures
    // earningsTrend       → earningsGrowth, revenueGrowth per quarter
    // esgScores           → totalEsg, environmentScore, socialScore, governanceScore
    const modules = [
      'financialData',
      'defaultKeyStatistics',
      'balanceSheetHistory',
      'balanceSheetHistoryQuarterly',
      'incomeStatementHistory',
      'incomeStatementHistoryQuarterly',
      'cashflowStatementHistory',
      'cashflowStatementHistoryQuarterly',
      'earningsTrend',
      'esgScores',
    ].join(',');

    const res = await fetch(
      `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${ticker}?modules=${encodeURIComponent(modules)}&crumb=${encodeURIComponent(crumb.crumb)}`,
      { headers: { Cookie: crumb.cookie, 'User-Agent': 'Mozilla/5.0' } }
    );
    const json = await res.json();
    const result = json?.quoteSummary?.result?.[0];
    if (!result) return corsResponse({ error: `Ticker ${ticker} not found` }, 404);

    const flat = flatten(result);

    // Merge most-recent balance sheet row into financialData for easy access
    const bs = flat.balanceSheetHistory?.balanceSheetStatements?.[0] || {};
    const is = flat.incomeStatementHistory?.incomeStatementHistory?.[0] || {};
    const cf = flat.cashflowStatementHistory?.cashflowStatements?.[0] || {};

    const fd = flat.financialData || {};

    // Fill missing fields from statement history if not already present
    fd.totalAssets            = fd.totalAssets            ?? bs.totalAssets;
    fd.totalLiab              = fd.totalLiab              ?? bs.totalLiab;
    fd.totalStockholderEquity = fd.totalStockholderEquity ?? bs.totalStockholderEquity;
    fd.totalCurrentLiabilities= fd.totalCurrentLiabilities?? bs.totalCurrentLiabilities;
    fd.totalCurrentAssets     = fd.totalCurrentAssets     ?? bs.totalCurrentAssets;
    fd.cash                   = fd.cash                   ?? bs.cash;
    fd.shortTermInvestments   = fd.shortTermInvestments   ?? bs.shortTermInvestments;
    fd.inventory              = fd.inventory              ?? bs.inventory;
    fd.shortLongTermDebt      = fd.shortLongTermDebt      ?? bs.shortLongTermDebt;
    fd.longTermDebt           = fd.longTermDebt           ?? bs.longTermDebt;

    // Income statement supplements
    fd.researchDevelopment    = fd.researchDevelopment    ?? is.researchDevelopment;
    fd.grossProfit            = fd.grossProfit            ?? is.grossProfit;
    fd.totalRevenue           = fd.totalRevenue           ?? is.totalRevenue;
    fd.netIncomeToCommon      = fd.netIncomeToCommon      ?? is.netIncome;
    fd.ebit                   = fd.ebit                   ?? is.ebit;

    // Derive R&D if Yahoo returns null: totalOpEx - COGS - SGA
    if (!fd.researchDevelopment && is.totalOperatingExpenses && is.costOfRevenue) {
      const sga = is.sellingGeneralAdministrative || 0;
      const derived = is.totalOperatingExpenses - is.costOfRevenue - sga;
      if (derived > 0) fd.researchDevelopment = derived;
    }

    // Cashflow supplements
    fd.operatingCashflow      = fd.operatingCashflow      ?? cf.totalCashFromOperatingActivities;
    fd.capitalExpenditures    = fd.capitalExpenditures    ?? cf.capitalExpenditures;
    if (!fd.freeCashflow && fd.operatingCashflow != null && fd.capitalExpenditures != null) {
      fd.freeCashflow = fd.operatingCashflow + fd.capitalExpenditures; // capex is negative
    }

    flat.financialData = fd;

    return corsResponse(flat, 200, request);
  } catch (e) {
    return corsResponse({ error: e.message }, 500, request);
  }
}

async function handleSearch(query, request) {
  try {
    const res = await fetch(
      `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&quotesCount=6&newsCount=0&listsCount=0`,
      { headers: { 'User-Agent': 'Mozilla/5.0' } }
    );
    const json = await res.json();
    const quotes = (json?.quotes || []).map(q => ({
      symbol: q.symbol,
      name: q.longname || q.shortname || q.symbol,
      exchange: q.exchange,
      type: q.quoteType,
    })).filter(q => q.type === 'EQUITY' || q.type === 'ETF');
    return corsResponse({ quotes });
  } catch (e) {
    return corsResponse({ error: e.message, quotes: [] }, 500, request);
  }
}

async function handleChart(ticker, range, request) {
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
    const highs  = (quote.high  || []).map(v => v ?? null);
    const lows   = (quote.low   || []).map(v => v ?? null);

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

// Unwrap Yahoo's {raw, fmt} wrapper objects recursively
// Returns null for empty wrappers like {raw: null} or {}
function flatten(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(flatten);
  if ('raw' in obj && Object.keys(obj).length <= 3) return obj.raw; // {raw: null} → null, {raw: 123} → 123
  const keys = Object.keys(obj);
  if (keys.length === 0) return null; // empty {} → null
  const out = {};
  for (const [k, v] of Object.entries(obj)) out[k] = flatten(v);
  return out;
}

function corsResponse(body, status = 200) {
  return new Response(body !== null ? JSON.stringify(body) : null, {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'no-store',
    },
  });
}
