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

```javascript
const DEMO_FINANCIALS = {
  AAPL: [
    { date: '2024-09-30', revenue: 391035000000, grossProfit: 180683000000, operatingIncome: 123216000000, netIncome: 93736000000, operatingIncomeRatio: 0.315, totalAssets: 364980000000, totalLiabilities: 308030000000, totalEquity: 56950000000, debtToEquity: 1.87, operatingCashFlow: 118254000000, investingCashFlow: -4031000000, financingCashFlow: -121983000000, freeCashFlow: 108807000000, capitalExpenditure: -9447000000 },
    { date: '2023-09-30', revenue: 383285000000, grossProfit: 169148000000, operatingIncome: 114301000000, netIncome: 96995000000, operatingIncomeRatio: 0.298, totalAssets: 352583000000, totalLiabilities: 290437000000, totalEquity: 62146000000, debtToEquity: 1.96, operatingCashFlow: 110543000000, investingCashFlow: 3705000000, financingCashFlow: -108488000000, freeCashFlow: 99584000000, capitalExpenditure: -10959000000 },
    { date: '2022-09-30', revenue: 394328000000, grossProfit: 170782000000, operatingIncome: 119437000000, netIncome: 99803000000, operatingIncomeRatio: 0.303, totalAssets: 352755000000, totalLiabilities: 302083000000, totalEquity: 50672000000, debtToEquity: 2.37, operatingCashFlow: 122151000000, investingCashFlow: -22354000000, financingCashFlow: -110749000000, freeCashFlow: 111443000000, capitalExpenditure: -10708000000 },
  ],
  NVDA: [
    { date: '2025-01-31', revenue: 130497000000, grossProfit: 98148000000, operatingIncome: 81507000000, netIncome: 72880000000, operatingIncomeRatio: 0.624, totalAssets: 111601000000, totalLiabilities: 30002000000, totalEquity: 81599000000, debtToEquity: 0.37, operatingCashFlow: 64089000000, investingCashFlow: -11029000000, financingCashFlow: -15308000000, freeCashFlow: 60352000000, capitalExpenditure: -3737000000 },
    { date: '2024-01-31', revenue: 60922000000, grossProfit: 44301000000, operatingIncome: 32972000000, netIncome: 29760000000, operatingIncomeRatio: 0.541, totalAssets: 65728000000, totalLiabilities: 22643000000, totalEquity: 43085000000, debtToEquity: 0.53, operatingCashFlow: 28608000000, investingCashFlow: -8014000000, financingCashFlow: -14027000000, freeCashFlow: 27021000000, capitalExpenditure: -1587000000 },
    { date: '2023-01-31', revenue: 26914000000, grossProfit: 15356000000, operatingIncome: 4224000000, netIncome: 4368000000, operatingIncomeRatio: 0.157, totalAssets: 41193000000, totalLiabilities: 18390000000, totalEquity: 22803000000, debtToEquity: 0.81, operatingCashFlow: 5641000000, investingCashFlow: 2292000000, financingCashFlow: -10412000000, freeCashFlow: 3808000000, capitalExpenditure: -1833000000 },
  ],
  MSFT: [
    { date: '2024-06-30', revenue: 245122000000, grossProfit: 171008000000, operatingIncome: 109433000000, netIncome: 88136000000, operatingIncomeRatio: 0.447, totalAssets: 512163000000, totalLiabilities: 243686000000, totalEquity: 268477000000, debtToEquity: 0.91, operatingCashFlow: 118548000000, investingCashFlow: -78866000000, financingCashFlow: -42175000000, freeCashFlow: 74071000000, capitalExpenditure: -44477000000 },
    { date: '2023-06-30', revenue: 211915000000, grossProfit: 146052000000, operatingIncome: 88523000000, netIncome: 72361000000, operatingIncomeRatio: 0.418, totalAssets: 411976000000, totalLiabilities: 205753000000, totalEquity: 206223000000, debtToEquity: 1.00, operatingCashFlow: 87582000000, investingCashFlow: -22680000000, financingCashFlow: -43935000000, freeCashFlow: 59475000000, capitalExpenditure: -28107000000 },
    { date: '2022-06-30', revenue: 198270000000, grossProfit: 135620000000, operatingIncome: 83383000000, netIncome: 72738000000, operatingIncomeRatio: 0.421, totalAssets: 364840000000, totalLiabilities: 198298000000, totalEquity: 166542000000, debtToEquity: 1.19, operatingCashFlow: 89035000000, investingCashFlow: -30311000000, financingCashFlow: -58876000000, freeCashFlow: 65149000000, capitalExpenditure: -23886000000 },
  ],
  TSLA: [
    { date: '2024-12-31', revenue: 97690000000, grossProfit: 17385000000, operatingIncome: 7076000000, netIncome: 7263000000, operatingIncomeRatio: 0.072, totalAssets: 122669000000, totalLiabilities: 51956000000, totalEquity: 70713000000, debtToEquity: 0.11, operatingCashFlow: 14923000000, investingCashFlow: -13990000000, financingCashFlow: -2877000000, freeCashFlow: 3580000000, capitalExpenditure: -11343000000 },
    { date: '2023-12-31', revenue: 96773000000, grossProfit: 17660000000, operatingIncome: 8891000000, netIncome: 14997000000, operatingIncomeRatio: 0.092, totalAssets: 106618000000, totalLiabilities: 43009000000, totalEquity: 62609000000, debtToEquity: 0.07, operatingCashFlow: 13256000000, investingCashFlow: -12269000000, financingCashFlow: 204000000, freeCashFlow: 4358000000, capitalExpenditure: -8898000000 },
    { date: '2022-12-31', revenue: 81462000000, grossProfit: 20853000000, operatingIncome: 13656000000, netIncome: 12556000000, operatingIncomeRatio: 0.168, totalAssets: 82338000000, totalLiabilities: 36440000000, totalEquity: 44898000000, debtToEquity: 0.11, operatingCashFlow: 14724000000, investingCashFlow: -11973000000, financingCashFlow: -3624000000, freeCashFlow: 7571000000, capitalExpenditure: -7158000000 },
  ],
  GOOGL: [
    { date: '2024-12-31', revenue: 350018000000, grossProfit: 210352000000, operatingIncome: 112389000000, netIncome: 100118000000, operatingIncomeRatio: 0.321, totalAssets: 450861000000, totalLiabilities: 119162000000, totalEquity: 331699000000, debtToEquity: 0.10, operatingCashFlow: 125294000000, investingCashFlow: -50948000000, financingCashFlow: -57695000000, freeCashFlow: 72764000000, capitalExpenditure: -52530000000 },
    { date: '2023-12-31', revenue: 307394000000, grossProfit: 174062000000, operatingIncome: 84293000000, netIncome: 73795000000, operatingIncomeRatio: 0.274, totalAssets: 402392000000, totalLiabilities: 107633000000, totalEquity: 294759000000, debtToEquity: 0.06, operatingCashFlow: 101746000000, investingCashFlow: -22752000000, financingCashFlow: -61380000000, freeCashFlow: 69495000000, capitalExpenditure: -32251000000 },
    { date: '2022-12-31', revenue: 282836000000, grossProfit: 156633000000, operatingIncome: 74842000000, netIncome: 59972000000, operatingIncomeRatio: 0.265, totalAssets: 359268000000, totalLiabilities: 107633000000, totalEquity: 251635000000, debtToEquity: 0.06, operatingCashFlow: 91495000000, investingCashFlow: -35523000000, financingCashFlow: -69757000000, freeCashFlow: 60010000000, capitalExpenditure: -31485000000 },
  ],
  AMZN: [
    { date: '2024-12-31', revenue: 637959000000, grossProfit: 326971000000, operatingIncome: 68588000000, netIncome: 59248000000, operatingIncomeRatio: 0.108, totalAssets: 624894000000, totalLiabilities: 337873000000, totalEquity: 287021000000, debtToEquity: 0.55, operatingCashFlow: 115877000000, investingCashFlow: -77134000000, financingCashFlow: -15497000000, freeCashFlow: 38521000000, capitalExpenditure: -77356000000 },
    { date: '2023-12-31', revenue: 574785000000, grossProfit: 270279000000, operatingIncome: 36852000000, netIncome: 30425000000, operatingIncomeRatio: 0.064, totalAssets: 527854000000, totalLiabilities: 296800000000, totalEquity: 231054000000, debtToEquity: 0.57, operatingCashFlow: 84946000000, investingCashFlow: -49830000000, financingCashFlow: -15879000000, freeCashFlow: 32004000000, capitalExpenditure: -52729000000 },
    { date: '2022-12-31', revenue: 513983000000, grossProfit: 225152000000, operatingIncome: 12248000000, netIncome: -2722000000, operatingIncomeRatio: 0.024, totalAssets: 462675000000, totalLiabilities: 316633000000, totalEquity: 146042000000, debtToEquity: 1.14, operatingCashFlow: -794000000, investingCashFlow: -37601000000, financingCashFlow: 9718000000, freeCashFlow: -19364000000, capitalExpenditure: -58321000000 },
  ],
}
```

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
