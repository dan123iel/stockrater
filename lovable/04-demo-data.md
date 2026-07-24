# pondex_ — Demo Data for Lovable

Use this data when the backend API is unavailable (fetch fails).
Fall back to these values silently — show "Illustrative" label on chart only.

---

## Scores + Factors

```javascript
const DEMO_DATA = {
  AAPL: {
    score: 78, verdict: 'HOLD',
    summary: 'Apple shows strong fundamentals with consistent cash flow and a wide moat, but trades at a premium valuation.',
    factors: [
      { name: 'Fundamentals', score: 82, explanation: 'Strong revenue growth and healthy margins.', source: 'Yahoo Finance' },
      { name: 'Moat',         score: 88, explanation: 'Ecosystem lock-in and brand loyalty.', source: 'SEC EDGAR' },
      { name: 'Risk',         score: 71, explanation: 'Low ESG risk, stable governance.', source: 'Yahoo Finance' },
      { name: 'Valuation',    score: 62, explanation: 'Trades at premium vs. sector peers.', source: 'Yahoo Finance' },
      { name: 'Management',   score: 85, explanation: 'Consistent capital allocation and buybacks.', source: 'SEC EDGAR' },
    ]
  },
  NVDA: {
    score: 71, verdict: 'HOLD',
    summary: 'NVIDIA leads AI infrastructure but valuation reflects extreme growth expectations.',
    factors: [
      { name: 'Fundamentals', score: 91, explanation: 'Explosive revenue growth driven by AI demand.', source: 'Yahoo Finance' },
      { name: 'Moat',         score: 90, explanation: 'CUDA ecosystem creates high switching costs.', source: 'SEC EDGAR' },
      { name: 'Risk',         score: 55, explanation: 'High concentration risk in data center segment.', source: 'Yahoo Finance' },
      { name: 'Valuation',    score: 38, explanation: 'Extremely elevated P/E relative to history.', source: 'Yahoo Finance' },
      { name: 'Management',   score: 82, explanation: 'Visionary leadership with strong execution.', source: 'SEC EDGAR' },
    ]
  },
  MSFT: {
    score: 84, verdict: 'BUY',
    summary: 'Microsoft combines cloud dominance, AI integration, and disciplined capital allocation.',
    factors: [
      { name: 'Fundamentals', score: 88, explanation: 'Azure growth and Office 365 recurring revenue.', source: 'Yahoo Finance' },
      { name: 'Moat',         score: 92, explanation: 'Enterprise software dominance and switching costs.', source: 'SEC EDGAR' },
      { name: 'Risk',         score: 78, explanation: 'Well-diversified with low regulatory risk.', source: 'Yahoo Finance' },
      { name: 'Valuation',    score: 71, explanation: 'Premium but justified by growth trajectory.', source: 'Yahoo Finance' },
      { name: 'Management',   score: 90, explanation: 'Nadella-era transformation continues to deliver.', source: 'SEC EDGAR' },
    ]
  },
  TSLA: {
    score: 42, verdict: 'SELL',
    summary: 'Tesla faces margin compression, intensifying competition, and CEO distraction risk.',
    factors: [
      { name: 'Fundamentals', score: 48, explanation: 'Margins declining as EV price war intensifies.', source: 'Yahoo Finance' },
      { name: 'Moat',         score: 55, explanation: 'Brand strength but narrowing tech lead.', source: 'SEC EDGAR' },
      { name: 'Risk',         score: 35, explanation: 'High CEO concentration risk and governance concerns.', source: 'Yahoo Finance' },
      { name: 'Valuation',    score: 28, explanation: 'Still priced for perfection despite slowing growth.', source: 'Yahoo Finance' },
      { name: 'Management',   score: 40, explanation: 'Distraction risk from multiple CEO ventures.', source: 'SEC EDGAR' },
    ]
  },
  GOOGL: {
    score: 76, verdict: 'BUY',
    summary: 'Alphabet offers AI leadership, search dominance, and YouTube at a reasonable valuation.',
    factors: [
      { name: 'Fundamentals', score: 85, explanation: 'Strong ad revenue recovery and cloud growth.', source: 'Yahoo Finance' },
      { name: 'Moat',         score: 88, explanation: 'Search monopoly and data network effects.', source: 'SEC EDGAR' },
      { name: 'Risk',         score: 62, explanation: 'Regulatory antitrust risk in multiple jurisdictions.', source: 'Yahoo Finance' },
      { name: 'Valuation',    score: 72, explanation: 'Reasonable P/E given earnings growth outlook.', source: 'Yahoo Finance' },
      { name: 'Management',   score: 74, explanation: 'Solid execution but AI transition creates uncertainty.', source: 'SEC EDGAR' },
    ]
  },
  AMZN: {
    score: 65, verdict: 'HOLD',
    summary: 'Amazon benefits from AWS and advertising but retail margins remain under pressure.',
    factors: [
      { name: 'Fundamentals', score: 72, explanation: 'AWS and ads drive margin expansion.', source: 'Yahoo Finance' },
      { name: 'Moat',         score: 85, explanation: 'Prime ecosystem and logistics network.', source: 'SEC EDGAR' },
      { name: 'Risk',         score: 60, explanation: 'Regulatory scrutiny and labor cost headwinds.', source: 'Yahoo Finance' },
      { name: 'Valuation',    score: 55, explanation: 'Fair value; limited near-term upside.', source: 'Yahoo Finance' },
      { name: 'Management',   score: 68, explanation: 'Post-Bezos transition progressing steadily.', source: 'SEC EDGAR' },
    ]
  },
}
```

---

## Quotes (prices)

```javascript
const DEMO_QUOTES = {
  AAPL:  { companyName: 'Apple Inc.',           price: 213.49, change: 1.15,  changePercent: 0.54,  marketCap: 3280000000000, beta: 1.21, sector: 'Technology',            industry: 'Consumer Electronics',        country: 'US', exchangeShortName: 'NASDAQ', '52wHigh': 237.23, '52wLow': 164.08, sharesOutstanding: 15204000000, description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.' },
  NVDA:  { companyName: 'NVIDIA Corporation',   price: 131.38, change: 2.44,  changePercent: 1.89,  marketCap: 3210000000000, beta: 1.66, sector: 'Technology',            industry: 'Semiconductors',              country: 'US', exchangeShortName: 'NASDAQ', '52wHigh': 153.13, '52wLow': 86.52,  sharesOutstanding: 24420000000, description: 'NVIDIA Corporation provides graphics and compute and networking solutions worldwide.' },
  MSFT:  { companyName: 'Microsoft Corporation',price: 471.16, change: 3.22,  changePercent: 0.69,  marketCap: 3500000000000, beta: 0.90, sector: 'Technology',            industry: 'Software—Infrastructure',     country: 'US', exchangeShortName: 'NASDAQ', '52wHigh': 497.74, '52wLow': 385.58, sharesOutstanding: 7430000000,  description: 'Microsoft Corporation develops and supports software, services, devices, and solutions worldwide.' },
  TSLA:  { companyName: 'Tesla, Inc.',           price: 316.06, change: -4.82, changePercent: -1.50, marketCap: 1010000000000, beta: 2.31, sector: 'Consumer Cyclical',     industry: 'Auto Manufacturers',          country: 'US', exchangeShortName: 'NASDAQ', '52wHigh': 488.54, '52wLow': 214.11, sharesOutstanding: 3200000000,  description: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles and energy generation and storage systems.' },
  GOOGL: { companyName: 'Alphabet Inc.',         price: 198.12, change: 1.08,  changePercent: 0.55,  marketCap: 2410000000000, beta: 1.03, sector: 'Communication Services',industry: 'Internet Content & Information',country: 'US', exchangeShortName: 'NASDAQ', '52wHigh': 208.70, '52wLow': 155.63, sharesOutstanding: 12170000000, description: 'Alphabet Inc. provides various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America.' },
  AMZN:  { companyName: 'Amazon.com, Inc.',      price: 222.50, change: 0.88,  changePercent: 0.40,  marketCap: 2360000000000, beta: 1.14, sector: 'Consumer Cyclical',     industry: 'Internet Retail',             country: 'US', exchangeShortName: 'NASDAQ', '52wHigh': 242.52, '52wLow': 166.88, sharesOutstanding: 10610000000, description: 'Amazon.com, Inc. engages in the retail sale of consumer products, advertising, and subscriptions service through online and physical stores.' },
}
```

---

## Ratios

```javascript
const DEMO_RATIOS = {
  AAPL:  { peRatio: 32.4, forwardPE: 28.1, priceToBook: 48.2, priceToSales: 8.1,  fcfYield: 0.031, enterpriseValueMultiple: 24.8, grossMargin: 0.461, operatingMargin: 0.311, netMargin: 0.261, revenueGrowth: 0.042, dividendYield: 0.005, payoutRatio: 0.152, returnOnEquity: 1.601, returnOnAssets: 0.281, debtToEquity: 1.81, currentRatio: 1.04, quickRatio: 0.98 },
  NVDA:  { peRatio: 54.2, forwardPE: 38.8, priceToBook: 38.1, priceToSales: 25.4, fcfYield: 0.018, enterpriseValueMultiple: 42.1, grossMargin: 0.752, operatingMargin: 0.618, netMargin: 0.552, revenueGrowth: 0.942, dividendYield: 0.0003,payoutRatio: 0.015, returnOnEquity: 1.242, returnOnAssets: 0.582, debtToEquity: 0.41, currentRatio: 4.17, quickRatio: 3.81 },
  MSFT:  { peRatio: 38.1, forwardPE: 31.4, priceToBook: 13.4, priceToSales: 14.2, fcfYield: 0.026, enterpriseValueMultiple: 27.8, grossMargin: 0.698, operatingMargin: 0.442, netMargin: 0.362, revenueGrowth: 0.151, dividendYield: 0.0068,payoutRatio: 0.242, returnOnEquity: 0.362, returnOnAssets: 0.162, debtToEquity: 0.71, currentRatio: 1.28, quickRatio: 1.21 },
  TSLA:  { peRatio: 88.4, forwardPE: 72.1, priceToBook: 14.8, priceToSales: 8.2,  fcfYield: 0.008, enterpriseValueMultiple: 64.2, grossMargin: 0.178, operatingMargin: 0.062, netMargin: 0.058, revenueGrowth: 0.021, dividendYield: 0,     payoutRatio: 0,     returnOnEquity: 0.118, returnOnAssets: 0.042, debtToEquity: 0.11, currentRatio: 1.84, quickRatio: 1.42 },
  GOOGL: { peRatio: 24.8, forwardPE: 20.4, priceToBook: 7.2,  priceToSales: 6.8,  fcfYield: 0.038, enterpriseValueMultiple: 17.4, grossMargin: 0.582, operatingMargin: 0.322, netMargin: 0.282, revenueGrowth: 0.122, dividendYield: 0,     payoutRatio: 0,     returnOnEquity: 0.314, returnOnAssets: 0.162, debtToEquity: 0.08, currentRatio: 1.94, quickRatio: 1.88 },
  AMZN:  { peRatio: 42.1, forwardPE: 34.8, priceToBook: 9.4,  priceToSales: 3.8,  fcfYield: 0.022, enterpriseValueMultiple: 28.4, grossMargin: 0.482, operatingMargin: 0.108, netMargin: 0.088, revenueGrowth: 0.111, dividendYield: 0,     payoutRatio: 0,     returnOnEquity: 0.224, returnOnAssets: 0.072, debtToEquity: 0.48, currentRatio: 1.06, quickRatio: 0.84 },
}
```

---

## Peer Map (similar stocks — demo tickers only)

```javascript
const PEER_MAP = {
  AAPL:  ['MSFT', 'GOOGL', 'AMZN'],
  NVDA:  ['MSFT', 'TSLA', 'AMZN'],
  MSFT:  ['AAPL', 'GOOGL', 'AMZN'],
  TSLA:  ['AMZN', 'GOOGL', 'NVDA'],
  GOOGL: ['MSFT', 'AAPL', 'AMZN'],
  AMZN:  ['MSFT', 'GOOGL', 'AAPL'],
}
```

---

## Financials (3 years each)

See current App.jsx DEMO_FINANCIALS for full data — copy directly from:
`frontend/src/pages/App.jsx` lines ~430–520

Data includes for each of 3 years:
date, revenue, grossProfit, operatingIncome, netIncome, operatingIncomeRatio,
totalAssets, totalLiabilities, totalEquity, debtToEquity,
operatingCashFlow, investingCashFlow, financingCashFlow, freeCashFlow, capitalExpenditure

---

## Chart Fallback

Generate synthetic candle data when /history fails:

```javascript
function generateCandles(startPrice, drift, volatility, days = 252) {
  const candles = []
  let price = startPrice
  const now = new Date()
  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const change = price * (drift / 252 + volatility * (
      Math.sin(i * 2.3) * 0.4 + Math.cos(i * 1.7) * 0.3 + Math.sin(i * 0.8) * 0.3
    ))
    price = Math.max(price + change, 1)
    candles.push({
      date: date.toISOString().split('T')[0],
      close: parseFloat(price.toFixed(2)),
      volume: Math.floor(50000000 + Math.sin(i) * 20000000)
    })
  }
  return candles
}

const DEMO_CANDLES = {
  AAPL:  generateCandles(164,  0.30, 0.018),
  NVDA:  generateCandles(87,   0.82, 0.032),
  MSFT:  generateCandles(386,  0.22, 0.015),
  TSLA:  generateCandles(214,  0.48, 0.042),
  GOOGL: generateCandles(156,  0.27, 0.017),
  AMZN:  generateCandles(167,  0.33, 0.019),
}
```

Label chart as "Illustrative · Live chart requires backend" when using demo candles.
