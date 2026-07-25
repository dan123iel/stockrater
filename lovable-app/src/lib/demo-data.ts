// Deterministic demo data for pondex_ — used when backend is unavailable.
// Never use Math.random() in this file.

export type Verdict = "BUY" | "HOLD" | "SELL";

export interface Factor {
  name: string;
  score: number;
  explanation: string;
  source: string;
}

export interface DemoScore {
  score: number;
  verdict: Verdict;
  summary: string;
  factors: Factor[];
}

export interface DemoQuote {
  companyName: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  beta: number;
  sector: string;
  industry: string;
  country: string;
  exchangeShortName: string;
  "52wHigh": number;
  "52wLow": number;
  sharesOutstanding: number;
  description: string;
}

export const DEMO_TICKERS = [
  "AAPL",
  "NVDA",
  "MSFT",
  "TSLA",
  "GOOGL",
  "AMZN",
] as const;
export type DemoTicker = (typeof DEMO_TICKERS)[number];

export const DEMO_SCORES: Record<DemoTicker, DemoScore> = {
  AAPL: {
    score: 78,
    verdict: "HOLD",
    summary:
      "Apple shows strong fundamentals with consistent cash flow and a wide moat, but trades at a premium valuation.",
    factors: [
      { name: "Fundamentals", score: 82, explanation: "Strong revenue growth and healthy margins.", source: "Yahoo Finance" },
      { name: "Moat", score: 88, explanation: "Ecosystem lock-in and brand loyalty.", source: "SEC EDGAR" },
      { name: "Risk", score: 71, explanation: "Low ESG risk, stable governance.", source: "Yahoo Finance" },
      { name: "Valuation", score: 62, explanation: "Trades at premium vs. sector peers.", source: "Yahoo Finance" },
      { name: "Management", score: 85, explanation: "Consistent capital allocation and buybacks.", source: "SEC EDGAR" },
    ],
  },
  NVDA: {
    score: 71,
    verdict: "HOLD",
    summary:
      "NVIDIA leads AI infrastructure but valuation reflects extreme growth expectations.",
    factors: [
      { name: "Fundamentals", score: 91, explanation: "Explosive revenue growth driven by AI demand.", source: "Yahoo Finance" },
      { name: "Moat", score: 90, explanation: "CUDA ecosystem creates high switching costs.", source: "SEC EDGAR" },
      { name: "Risk", score: 55, explanation: "High concentration risk in data center segment.", source: "Yahoo Finance" },
      { name: "Valuation", score: 38, explanation: "Extremely elevated P/E relative to history.", source: "Yahoo Finance" },
      { name: "Management", score: 82, explanation: "Visionary leadership with strong execution.", source: "SEC EDGAR" },
    ],
  },
  MSFT: {
    score: 84,
    verdict: "BUY",
    summary:
      "Microsoft combines cloud dominance, AI integration, and disciplined capital allocation.",
    factors: [
      { name: "Fundamentals", score: 88, explanation: "Azure growth and Office 365 recurring revenue.", source: "Yahoo Finance" },
      { name: "Moat", score: 92, explanation: "Enterprise software dominance and switching costs.", source: "SEC EDGAR" },
      { name: "Risk", score: 78, explanation: "Well-diversified with low regulatory risk.", source: "Yahoo Finance" },
      { name: "Valuation", score: 71, explanation: "Premium but justified by growth trajectory.", source: "Yahoo Finance" },
      { name: "Management", score: 90, explanation: "Nadella-era transformation continues to deliver.", source: "SEC EDGAR" },
    ],
  },
  TSLA: {
    score: 42,
    verdict: "SELL",
    summary:
      "Tesla faces margin compression, intensifying competition, and CEO distraction risk.",
    factors: [
      { name: "Fundamentals", score: 48, explanation: "Margins declining as EV price war intensifies.", source: "Yahoo Finance" },
      { name: "Moat", score: 55, explanation: "Brand strength but narrowing tech lead.", source: "SEC EDGAR" },
      { name: "Risk", score: 35, explanation: "High CEO concentration risk and governance concerns.", source: "Yahoo Finance" },
      { name: "Valuation", score: 28, explanation: "Still priced for perfection despite slowing growth.", source: "Yahoo Finance" },
      { name: "Management", score: 40, explanation: "Distraction risk from multiple CEO ventures.", source: "SEC EDGAR" },
    ],
  },
  GOOGL: {
    score: 76,
    verdict: "BUY",
    summary:
      "Alphabet offers AI leadership, search dominance, and YouTube at a reasonable valuation.",
    factors: [
      { name: "Fundamentals", score: 85, explanation: "Strong ad revenue recovery and cloud growth.", source: "Yahoo Finance" },
      { name: "Moat", score: 88, explanation: "Search monopoly and data network effects.", source: "SEC EDGAR" },
      { name: "Risk", score: 62, explanation: "Regulatory antitrust risk in multiple jurisdictions.", source: "Yahoo Finance" },
      { name: "Valuation", score: 72, explanation: "Reasonable P/E given earnings growth outlook.", source: "Yahoo Finance" },
      { name: "Management", score: 74, explanation: "Solid execution but AI transition creates uncertainty.", source: "SEC EDGAR" },
    ],
  },
  AMZN: {
    score: 65,
    verdict: "HOLD",
    summary:
      "Amazon benefits from AWS and advertising but retail margins remain under pressure.",
    factors: [
      { name: "Fundamentals", score: 72, explanation: "AWS and ads drive margin expansion.", source: "Yahoo Finance" },
      { name: "Moat", score: 85, explanation: "Prime ecosystem and logistics network.", source: "SEC EDGAR" },
      { name: "Risk", score: 60, explanation: "Regulatory scrutiny and labor cost headwinds.", source: "Yahoo Finance" },
      { name: "Valuation", score: 55, explanation: "Fair value; limited near-term upside.", source: "Yahoo Finance" },
      { name: "Management", score: 68, explanation: "Post-Bezos transition progressing steadily.", source: "SEC EDGAR" },
    ],
  },
};

export const DEMO_QUOTES: Record<DemoTicker, DemoQuote> = {
  AAPL: { companyName: "Apple Inc.", price: 213.49, change: 1.15, changePercent: 0.54, marketCap: 3280000000000, beta: 1.21, sector: "Technology", industry: "Consumer Electronics", country: "US", exchangeShortName: "NASDAQ", "52wHigh": 237.23, "52wLow": 164.08, sharesOutstanding: 15204000000, description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide." },
  NVDA: { companyName: "NVIDIA Corporation", price: 131.38, change: 2.44, changePercent: 1.89, marketCap: 3210000000000, beta: 1.66, sector: "Technology", industry: "Semiconductors", country: "US", exchangeShortName: "NASDAQ", "52wHigh": 153.13, "52wLow": 86.52, sharesOutstanding: 24420000000, description: "NVIDIA Corporation provides graphics and compute and networking solutions worldwide." },
  MSFT: { companyName: "Microsoft Corporation", price: 471.16, change: 3.22, changePercent: 0.69, marketCap: 3500000000000, beta: 0.9, sector: "Technology", industry: "Software—Infrastructure", country: "US", exchangeShortName: "NASDAQ", "52wHigh": 497.74, "52wLow": 385.58, sharesOutstanding: 7430000000, description: "Microsoft Corporation develops and supports software, services, devices, and solutions worldwide." },
  TSLA: { companyName: "Tesla, Inc.", price: 316.06, change: -4.82, changePercent: -1.5, marketCap: 1010000000000, beta: 2.31, sector: "Consumer Cyclical", industry: "Auto Manufacturers", country: "US", exchangeShortName: "NASDAQ", "52wHigh": 488.54, "52wLow": 214.11, sharesOutstanding: 3200000000, description: "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles and energy generation and storage systems." },
  GOOGL: { companyName: "Alphabet Inc.", price: 198.12, change: 1.08, changePercent: 0.55, marketCap: 2410000000000, beta: 1.03, sector: "Communication Services", industry: "Internet Content & Information", country: "US", exchangeShortName: "NASDAQ", "52wHigh": 208.7, "52wLow": 155.63, sharesOutstanding: 12170000000, description: "Alphabet Inc. provides various products and platforms." },
  AMZN: { companyName: "Amazon.com, Inc.", price: 222.5, change: 0.88, changePercent: 0.4, marketCap: 2360000000000, beta: 1.14, sector: "Consumer Cyclical", industry: "Internet Retail", country: "US", exchangeShortName: "NASDAQ", "52wHigh": 242.52, "52wLow": 166.88, sharesOutstanding: 10610000000, description: "Amazon.com, Inc. engages in the retail sale of consumer products, advertising, and subscriptions." },
};

export const PEER_MAP: Record<DemoTicker, DemoTicker[]> = {
  AAPL: ["MSFT", "GOOGL", "AMZN"],
  NVDA: ["MSFT", "TSLA", "AMZN"],
  MSFT: ["AAPL", "GOOGL", "AMZN"],
  TSLA: ["AMZN", "GOOGL", "NVDA"],
  GOOGL: ["MSFT", "AAPL", "AMZN"],
  AMZN: ["MSFT", "GOOGL", "AAPL"],
};

export const DEMO_WATCHLIST: DemoTicker[] = ["AAPL", "MSFT", "NVDA", "GOOGL"];

export const DEMO_EVENTS = [
  { date: "Aug 1", ticker: "AMZN", event: "Earnings Call", type: "earnings" as const },
  { date: "Aug 15", ticker: "NVDA", event: "Ex-Dividend Date", type: "dividend" as const },
  { date: "Aug 26", ticker: "NVDA", event: "Earnings Call", type: "earnings" as const },
];

// Deterministic candle generator — no Math.random().
export interface Candle {
  date: string;
  close: number;
  volume: number;
}
export function generateCandles(
  startPrice: number,
  drift: number,
  volatility: number,
  days = 252,
): Candle[] {
  const candles: Candle[] = [];
  let price = startPrice;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const change =
      price *
      (drift / 252 +
        volatility *
          (Math.sin(i * 2.3) * 0.4 +
            Math.cos(i * 1.7) * 0.3 +
            Math.sin(i * 0.8) * 0.3));
    price = Math.max(price + change, 1);
    candles.push({
      date: date.toISOString().split("T")[0],
      close: parseFloat(price.toFixed(2)),
      volume: Math.floor(50000000 + Math.sin(i) * 20000000),
    });
  }
  return candles;
}

export const DEMO_CANDLES: Record<DemoTicker, Candle[]> = {
  AAPL: generateCandles(164, 0.3, 0.018),
  NVDA: generateCandles(87, 0.82, 0.032),
  MSFT: generateCandles(386, 0.22, 0.015),
  TSLA: generateCandles(214, 0.48, 0.042),
  GOOGL: generateCandles(156, 0.27, 0.017),
  AMZN: generateCandles(167, 0.33, 0.019),
};

export function isDemoTicker(t: string): t is DemoTicker {
  return (DEMO_TICKERS as readonly string[]).includes(t.toUpperCase());
}

export function verdictFromScore(score: number): Verdict {
  if (score >= 70) return "BUY";
  if (score >= 50) return "HOLD";
  return "SELL";
}

export function verdictColor(score: number): "buy" | "hold" | "sell" {
  if (score >= 70) return "buy";
  if (score >= 50) return "hold";
  return "sell";
}
