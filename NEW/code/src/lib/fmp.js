// pondex data layer — Yahoo Finance via Python backend
// Backend: cd backend && uvicorn main:app --reload --port 8000

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
let cache = {};
const CACHE_TTL = 5 * 60 * 1000;

const isCacheValid = (key) => cache[key] && Date.now() - cache[key].ts < CACHE_TTL;

const get = async (path) => {
  if (isCacheValid(path)) return cache[path].data;
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${path}`);
  const data = await res.json();
  cache[path] = { data, ts: Date.now() };
  return data;
};

export const fetchProfile = (ticker) => get(`/quote/${ticker}`);
export const fetchRatios = (ticker) => get(`/ratios/${ticker}`);
export const fetchKeyMetrics = (ticker) => get(`/ratios/${ticker}`); // same endpoint
export const fetchIncomeStatement = (ticker) => get(`/financials/${ticker}`);
export const fetchInsiderTrading = (ticker) => get(`/insider/${ticker}`);
export const fetchHistoricalPrice = (ticker) => get(`/history/${ticker}?period=1y`).then(d => d.candles || []);
export const fetchCurrentPrice = (ticker) => get(`/quote/${ticker}`).then(d => ({ price: d.price }));
export const fetchScore = (ticker, strategy) => get(`/score/${ticker}?strategy=${strategy || 'growth'}`);
export const fetchNews = (ticker) => get(`/news/${ticker}`);

export const fetchAllData = async (ticker, _apiKey) => {
  const sym = ticker.trim().toUpperCase();

  // Check if backend is running — if not, fall back to demo data
  try {
    await fetch(`${API_BASE}/`, { signal: AbortSignal.timeout(2000) });
  } catch {
    console.warn('[pondex] Backend not running — using demo data. Start: cd backend && uvicorn main:app --reload');
    return getDemoData(sym);
  }

  const results = await Promise.allSettled([
    fetchProfile(sym),
    fetchRatios(sym),
    fetchRatios(sym),            // keyMetrics = ratios in this backend
    fetchIncomeStatement(sym),
    fetchInsiderTrading(sym),
  ]);

  const profile    = results[0].status === 'fulfilled' ? results[0].value : null;
  const ratios     = results[1].status === 'fulfilled' ? results[1].value : null;
  const keyMetrics = results[2].status === 'fulfilled' ? results[2].value : null;
  const income     = results[3].status === 'fulfilled' ? results[3].value : [];
  const insider    = results[4].status === 'fulfilled' ? results[4].value : [];

  // Map backend field names to what scoring.js expects
  const mappedRatios = ratios ? {
    peRatio:                  ratios.peRatio,
    enterpriseValueMultiple:  ratios.enterpriseValueMultiple,
    priceToSalesRatio:        ratios.priceToSales,
    grossProfitMargin:        ratios.grossMargin,
    operatingProfitMargin:    ratios.operatingMargin,
    netProfitMargin:          ratios.netMargin,
    returnOnEquity:           ratios.returnOnEquity,
    returnOnAssets:           ratios.returnOnAssets,
    debtEquityRatio:          ratios.debtToEquity,
    currentRatio:             ratios.currentRatio,
    dividendYield:            ratios.dividendYield,
  } : null;

  const mappedKeyMetrics = keyMetrics ? {
    freeCashFlowYield:        keyMetrics.fcfYield,
    marketCap:                profile?.marketCap,
    enterpriseValue:          null,
  } : null;

  const mappedIncome = (income || []).map(s => ({
    revenue:              s.revenue,
    netIncome:            s.netIncome,
    grossProfit:          s.grossProfit,
    operatingIncomeRatio: s.operatingIncomeRatio,
  }));

  const allFailed = !profile && !mappedRatios;
  if (allFailed) {
    console.warn(`[pondex] No data returned for ${sym} — using demo`);
    return getDemoData(sym);
  }

  return {
    profile,
    ratios: mappedRatios,
    keyMetrics: mappedKeyMetrics,
    incomeStatements: mappedIncome,
    insiderTrades: insider || [],
    errors: {
      ratios:  results[1].status === 'rejected' ? results[1].reason?.message : null,
      insider: results[4].status === 'rejected' ? results[4].reason?.message : null,
    }
  };
};

export const clearCache = () => { cache = {}; };

// ─── DEMO DATA (shown when backend is offline) ────────────────────────────────
const DEMO_DATA = {
  NVDA: {
    profile: { companyName: 'NVIDIA Corporation', symbol: 'NVDA', exchangeShortName: 'NASDAQ', currency: 'USD', price: 875.39, beta: 1.68, sector: 'Technology', description: 'NVIDIA designs graphics processing units for gaming, data centers, and AI.' },
    ratios: { peRatio: 38.4, enterpriseValueMultiple: 47.2, priceToSalesRatio: 22.1, grossProfitMargin: 0.728, operatingProfitMargin: 0.421, netProfitMargin: 0.358, returnOnEquity: 0.894, debtEquityRatio: 0.42, currentRatio: 4.17, dividendYield: 0.003 },
    keyMetrics: { freeCashFlowYield: 0.028, marketCap: 2150000000000 },
    incomeStatements: [{ revenue: 60922000000, netIncome: 21797000000, grossProfit: 44301000000, operatingIncomeRatio: 0.421 }, { revenue: 26974000000, netIncome: 4368000000, grossProfit: 15356000000, operatingIncomeRatio: 0.162 }],
    insiderTrades: [{ reportingName: 'Jensen Huang', typeOfOwner: 'CEO', transactionType: 'S-Sale', transactionDate: '2024-11-15', value: 17100000 }, { reportingName: 'Colette Kress', typeOfOwner: 'CFO', transactionType: 'S-Sale', transactionDate: '2024-10-20', value: 6084000 }],
    errors: {}, _isDemo: true,
  },
  AAPL: {
    profile: { companyName: 'Apple Inc.', symbol: 'AAPL', exchangeShortName: 'NASDAQ', currency: 'USD', price: 227.82, beta: 1.24, sector: 'Technology', description: 'Apple designs, manufactures and markets smartphones, personal computers, tablets, and wearables.' },
    ratios: { peRatio: 33.2, enterpriseValueMultiple: 26.1, priceToSalesRatio: 8.9, grossProfitMargin: 0.456, operatingProfitMargin: 0.311, netProfitMargin: 0.254, returnOnEquity: 1.472, debtEquityRatio: 1.87, currentRatio: 0.98, dividendYield: 0.0044 },
    keyMetrics: { freeCashFlowYield: 0.031, marketCap: 3500000000000 },
    incomeStatements: [{ revenue: 385603000000, netIncome: 97982000000, grossProfit: 175880000000, operatingIncomeRatio: 0.311 }],
    insiderTrades: [], errors: {}, _isDemo: true,
  }
};

function getDemoData(sym) {
  const demo = DEMO_DATA[sym];
  if (demo) return { ...demo };
  return {
    profile: { companyName: sym, symbol: sym, price: null, currency: 'USD', beta: 1.0, sector: '' },
    ratios: null, keyMetrics: null, incomeStatements: [], insiderTrades: [],
    errors: { ratios: 'Backend offline — start with: cd backend && uvicorn main:app --reload' },
    _isDemo: true,
  };
}
