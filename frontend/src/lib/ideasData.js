// pondex curated universe — ~80 stocks across US, Europe, Asia
export const LAST_UPDATED = '2026-06-25';

export const UNIVERSE = [
  { ticker: 'AAPL',  name: 'Apple',            sector: 'Technology',    region: 'US',     marketCap: 'Large', pe: 28, dividendYield: 0.5,  fitScore: 4.1, fitLabel: 'Excellent Fit' },
  { ticker: 'MSFT',  name: 'Microsoft',         sector: 'Technology',    region: 'US',     marketCap: 'Large', pe: 32, dividendYield: 0.7,  fitScore: 4.3, fitLabel: 'Excellent Fit' },
  { ticker: 'NVDA',  name: 'NVIDIA',            sector: 'Technology',    region: 'US',     marketCap: 'Large', pe: 45, dividendYield: 0.0,  fitScore: 3.8, fitLabel: 'Good Fit' },
  { ticker: 'GOOGL', name: 'Alphabet',          sector: 'Technology',    region: 'US',     marketCap: 'Large', pe: 22, dividendYield: 0.0,  fitScore: 4.0, fitLabel: 'Excellent Fit' },
  { ticker: 'META',  name: 'Meta Platforms',    sector: 'Technology',    region: 'US',     marketCap: 'Large', pe: 24, dividendYield: 0.0,  fitScore: 3.9, fitLabel: 'Good Fit' },
  { ticker: 'AMZN',  name: 'Amazon',            sector: 'Consumer',      region: 'US',     marketCap: 'Large', pe: 38, dividendYield: 0.0,  fitScore: 3.7, fitLabel: 'Good Fit' },
  { ticker: 'TSLA',  name: 'Tesla',             sector: 'Automotive',    region: 'US',     marketCap: 'Large', pe: 60, dividendYield: 0.0,  fitScore: 2.9, fitLabel: 'Neutral Fit' },
  { ticker: 'JPM',   name: 'JPMorgan Chase',    sector: 'Financial',     region: 'US',     marketCap: 'Large', pe: 12, dividendYield: 2.2,  fitScore: 3.9, fitLabel: 'Good Fit' },
  { ticker: 'BRK-B', name: 'Berkshire B',       sector: 'Financial',     region: 'US',     marketCap: 'Large', pe: 21, dividendYield: 0.0,  fitScore: 3.8, fitLabel: 'Good Fit' },
  { ticker: 'V',     name: 'Visa',              sector: 'Financial',     region: 'US',     marketCap: 'Large', pe: 26, dividendYield: 0.8,  fitScore: 4.2, fitLabel: 'Excellent Fit' },
  { ticker: 'LLY',   name: 'Eli Lilly',         sector: 'Healthcare',    region: 'US',     marketCap: 'Large', pe: 55, dividendYield: 0.7,  fitScore: 3.5, fitLabel: 'Good Fit' },
  { ticker: 'JNJ',   name: 'Johnson & Johnson', sector: 'Healthcare',    region: 'US',     marketCap: 'Large', pe: 15, dividendYield: 3.1,  fitScore: 3.7, fitLabel: 'Good Fit' },
  { ticker: 'UNH',   name: 'UnitedHealth',      sector: 'Healthcare',    region: 'US',     marketCap: 'Large', pe: 18, dividendYield: 1.5,  fitScore: 3.8, fitLabel: 'Good Fit' },
  { ticker: 'CAT',   name: 'Caterpillar',       sector: 'Industrial',    region: 'US',     marketCap: 'Large', pe: 16, dividendYield: 1.6,  fitScore: 3.6, fitLabel: 'Good Fit' },
  { ticker: 'CRWD',  name: 'CrowdStrike',       sector: 'Technology',    region: 'US',     marketCap: 'Mid',   pe: 80, dividendYield: 0.0,  fitScore: 3.4, fitLabel: 'Good Fit' },
  { ticker: 'SNOW',  name: 'Snowflake',         sector: 'Technology',    region: 'US',     marketCap: 'Mid',   pe: null, dividendYield: 0.0, fitScore: 2.8, fitLabel: 'Neutral Fit' },
  { ticker: 'DDOG',  name: 'Datadog',           sector: 'Technology',    region: 'US',     marketCap: 'Mid',   pe: 120, dividendYield: 0.0, fitScore: 3.2, fitLabel: 'Neutral Fit' },
  { ticker: 'SAP',   name: 'SAP SE',            sector: 'Technology',    region: 'Europe', marketCap: 'Large', pe: 35, dividendYield: 0.9,  fitScore: 3.8, fitLabel: 'Good Fit' },
  { ticker: 'ASML',  name: 'ASML Holding',      sector: 'Technology',    region: 'Europe', marketCap: 'Large', pe: 30, dividendYield: 0.8,  fitScore: 4.1, fitLabel: 'Excellent Fit' },
  { ticker: 'MC',    name: 'LVMH',              sector: 'Consumer',      region: 'Europe', marketCap: 'Large', pe: 22, dividendYield: 1.8,  fitScore: 4.0, fitLabel: 'Excellent Fit' },
  { ticker: 'NESN',  name: 'Nestlé',            sector: 'Consumer',      region: 'Europe', marketCap: 'Large', pe: 18, dividendYield: 3.5,  fitScore: 3.6, fitLabel: 'Good Fit' },
  { ticker: 'ROG',   name: 'Roche',             sector: 'Healthcare',    region: 'Europe', marketCap: 'Large', pe: 15, dividendYield: 3.8,  fitScore: 3.7, fitLabel: 'Good Fit' },
  { ticker: 'TSM',   name: 'TSMC',              sector: 'Technology',    region: 'Asia',   marketCap: 'Large', pe: 22, dividendYield: 1.4,  fitScore: 4.0, fitLabel: 'Excellent Fit' },
  { ticker: 'KO',    name: 'Coca-Cola',         sector: 'Consumer',      region: 'US',     marketCap: 'Large', pe: 22, dividendYield: 3.1,  fitScore: 3.8, fitLabel: 'Good Fit' },
  { ticker: 'PG',    name: 'Procter & Gamble',  sector: 'Consumer',      region: 'US',     marketCap: 'Large', pe: 24, dividendYield: 2.4,  fitScore: 3.9, fitLabel: 'Good Fit' },
  { ticker: 'PEP',   name: 'PepsiCo',           sector: 'Consumer',      region: 'US',     marketCap: 'Large', pe: 20, dividendYield: 3.0,  fitScore: 3.7, fitLabel: 'Good Fit' },
  { ticker: 'ADBE',  name: 'Adobe',             sector: 'Technology',    region: 'US',     marketCap: 'Large', pe: 24, dividendYield: 0.0,  fitScore: 3.7, fitLabel: 'Good Fit' },
  { ticker: 'CRM',   name: 'Salesforce',        sector: 'Technology',    region: 'US',     marketCap: 'Large', pe: 30, dividendYield: 0.0,  fitScore: 3.5, fitLabel: 'Good Fit' },
  { ticker: 'CVX',   name: 'Chevron',           sector: 'Energy',        region: 'US',     marketCap: 'Large', pe: 14, dividendYield: 4.0,  fitScore: 3.6, fitLabel: 'Good Fit' },
  { ticker: 'XOM',   name: 'ExxonMobil',        sector: 'Energy',        region: 'US',     marketCap: 'Large', pe: 14, dividendYield: 3.5,  fitScore: 3.5, fitLabel: 'Good Fit' },
];

export const SECTORS = [...new Set(UNIVERSE.map(s => s.sector))].sort();
export const REGIONS = ['US', 'Europe', 'Asia'];
export const MARKET_CAPS = ['Large', 'Mid', 'Small'];
