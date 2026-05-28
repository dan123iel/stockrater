# StockRater — Company Rating & Trading Tool

A self-hosted, shareable web app for fundamental company analysis and leverage trading position sizing. Built on the Financial Modeling Prep API.

## Features

- **Company Rating** — Enter any ticker, auto-loads live balance sheet, income statement, cash flow, and key ratios from FMP. Scores 10 financial ratios against benchmarks. Manual qualitative scoring (Management, Moat, ESG). Weighted scorecard (70% / 10% / 10% / 10%) with verdict: Strong buy / Buy / Hold / Avoid.
- **Leverage Trading** — Load live price, SMA200, and ATR from FMP automatically. Position sizing, SL/TP calculation (TP1 +50%, TP2 +100%, TP3 trailing). Trend validation vs. SMA 200 + Market Filter.
- **Portfolio & Watchlist** — Save rated companies and trades. Data persists in localStorage.
- **Mobile-friendly** — Responsive sidebar, works on phone and desktop.

---

## Setup in 3 steps

### 1. Get a free FMP API key
Go to [https://financialmodelingprep.com/register](https://financialmodelingprep.com/register) and create a free account. No credit card required. The free tier includes 250 requests/day — enough for normal personal use.

### 2. Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `stockrater`)
2. Upload `index.html` to the repository root
3. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
4. After ~1 minute your app is live at `https://yourusername.github.io/stockrater/`
5. Share that link with friends — they set their own API key in the Settings tab

### 3. Enter your API key in the app
Open the app → **Settings tab** → paste your FMP key → Save. The key is stored only in your browser's localStorage — never sent to any server other than FMP directly.

---

## Architecture

```
index.html          ← entire app, single file, no build step
  ├── CSS           ← dark theme, responsive, mobile sidebar
  ├── FMP API calls ← quote, balance-sheet, income-statement,
  │                   cash-flow, key-metrics, historical prices
  ├── Scoring logic ← ratio benchmarks (Damodaran-based)
  │                   WACC table by industry
  └── localStorage  ← portfolio, trades, watchlist, 1h cache
```

## WACC / Beta source
Industry-level WACC and Beta values are sourced from Aswath Damodaran's annual dataset (NYU Stern). Built into the app — no additional API needed.

## Ratio benchmarks

| Ratio | Score 5 | Score 3.5 | Score 2 |
|---|---|---|---|
| Current ratio | ≥1.5 | ≥1.0 | ≥0.8 |
| Quick ratio | ≥1.0 | ≥0.9 | ≥0.7 |
| Cash ratio | ≥0.3 | ≥0.2 | ≥0.1 |
| Equity / assets | ≥40% | ≥25% | ≥15% |
| Debt / equity | ≤1.0x | ≤1.4x | ≤1.6x |
| Debt ratio | ≤30% | ≤40% | ≤50% |
| Gross margin | ≥35% | ≥20% | ≥10% |
| Net margin | ≥12% | ≥6% | ≥2% |
| FCF margin | ≥12% | ≥6% | ≥2% |
| EV / EBITDA | ≤12x | ≤22x | ≤35x |

## Scorecard weights

| Category | Weight |
|---|---|
| A) Financial ratios | 70% |
| B) Management quality | 10% |
| C) Competitive moat | 10% |
| D) ESG & Risk | 10% |
