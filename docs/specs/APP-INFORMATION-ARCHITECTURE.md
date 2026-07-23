# pondex_ — App Information Architecture
> Source: Hand-sketched IA reviewed and refined (2026-07-22)
> This document defines the navigation structure and screen hierarchy for the entire pondex_ app.
> All new pages, tabs, and components must follow this structure.

---

## Legend

| Format | Meaning |
|---|---|
| **Bold, in tree** | **Navigation** — own screen/tab, reachable by click |
| Normal, in tree | Page module — section/component on a page (no separate navigation step) |
| *Italic, in list below* | *Data field* — single value within a module (e.g. table row) |

---

## Full Architecture

```
Home
│
├── Portfolio
│   ├── Positions
│   ├── Watchlist
│   ├── Transactions
│   └── Account
│
├── Markets
│   ├── Top Movers
│   ├── Popular Stocks
│   ├── Collections
│   ├── News
│   └── Calendar
│
├── Robo Advisor
│   ├── Portfolio
│   ├── Savings Plans
│   ├── Round-up
│   └── Forecasts
│
├── CFD
│   └── (open — no sub-menu defined yet)
│
└── Stock (single stock detail)
    ├── Overview
    ├── Key Metrics
    ├── Financials
    ├── News
    ├── Order Book
    └── Learn
```

**Bottom Navigation:**
```
Home │ Portfolio │ Markets │ Search │ Profile
```

---

## Open Decision: Home vs. Portfolio — separate or merged?

| | Option A — Separate (as above) | Option B — Merged |
|---|---|---|
| Structure | Home = curated entry point, Portfolio = own positions | Home *is* the Portfolio screen |
| Pro | More room for algorithmic/editorial content on start screen | Leaner, one less main area, no duplication risk |
| Con | Risk of total value/performance appearing on both screens | Robo/cross-product hints must share Portfolio screen |
| Reference | Apps with separate "Discover" tab | Trade Republic, Robinhood |

**Recommendation for pondex_:** Option A — pondex ICP (self-directed value investor) benefits from a curated entry with Top Movers + Events. Decision must be confirmed before building Phase 2.

---

## 1. Home / Portfolio

**Home** (curated entry — Option A):
- Portfolio quick overview (module)
  - *Total value*
  - *Daily change*
- Robo Advisor teaser (module, links to Robo Advisor section)
- Top Movers today (module)
- News (module, market focus)
- Corporate events / Calendar (module)

**Portfolio** (own investments):
- **Positions**
  - *Current holdings, cost basis, current value, performance*
- **Watchlist**
  - *Tracked tickers without position*
- **Transactions**
  - *Buy/sell history*
- **Account**
  - *Available balance, deposit, withdraw*

**Global action bar** (module, visible on Portfolio screen):
- Deposit · Trade · Withdraw · More

---

## 2. Markets

Discovery area — consolidates all market/community content.

- **Top Movers**
  - *Winners/losers of the day*
- **Popular Stocks**
  - *Most traded, popular buys, recommended buys*
- **Collections**
  - *Themes, sectors, curated bundles* — curation logic (editorial vs. algorithmic) TBD
- **News**
  - *Market news* (focus: overall market, not individual companies)
- **Calendar**
  - *Corporate actions, earnings dates*

---

## 3. Robo Advisor

Automated portfolio management — standalone main section.

- **Portfolio**
  - Chart (module)
  - Target portfolio allocation (module)
  - About this portfolio (module)
- **Savings Plans**
  - Standing order (module)
- **Round-up**
  - Spare change investing (module)
- **Forecasts**
  - Forecast module

---

## 4. CFD

Placeholder section only — no sub-menu defined from sketches. Likely analogous to Stock/Robo Advisor with own trading area for contracts for difference.

---

## 5. Stock (Single Stock Detail)

Reachable from: Home, Markets, Search, Watchlist.

```
Stock
├── Overview
│   ├── Chart (module)
│   ├── Recommendation (module: Buy/Hold/Sell, return, analysts, sentiment, history)
│   ├── Key metrics summary (module, links to full Key Metrics tab)
│   ├── Events (module)
│   ├── Company profile (module)
│   ├── Alerts (module) — trigger types (price/news/technical) TBD
│   └── Similar stocks (module)
│
├── Key Metrics
│   ├── Price & Volume (module)
│   ├── Valuation (module)
│   ├── Profitability (module)
│   └── Management Effectiveness (module)
│
├── Financials
│   ├── Income Statement (module: scrollable table)
│   ├── Balance Sheet (module: scrollable table)
│   └── Cash Flow (module: scrollable table)
│
├── News
│   └── Company-specific news
│
├── Order Book
│
└── Learn
    ├── Courses (module)
    ├── Blog (module)
    └── Glossary (module)
```

### 5.1 Key Metrics — Data Fields

**Price & Volume**
- *Price: daily range, 52-week range, 5-year range*
- *Volume: current, average*
- *Market cap, shares outstanding, float*

**Per Share Data**
- *EPS, revenue/share, book value/share, cash flow/share, cash/share, dividend yield, dividend/share, payout ratio*

**Valuation**
- *P/E, Price/Sales, Price/Book, Price/Cash Flow*

**Profitability**
- *Gross margin, operating margin, net profit margin*

**Management Effectiveness**
- *ROE, ROA, ROI*

### 5.2 Financials — Data Fields

**Income Statement** (period toggle: annual/quarterly, year columns e.g. 2021–2025)
- *Total revenue, net income, cost of revenue, gross profit, total operating expenses (SG&A, D&A), operating income, income before tax, income tax, net available income, diluted weighted average shares, diluted EPS*
- Module "Past Performance" (chart at bottom)

**Balance Sheet**
- *Total assets, total liabilities*
- Sub-breakdown (current/non-current assets, short/long-term liabilities, equity) — TBD

**Cash Flow**
- *Cash from operating activities, investing activities, financing activities, capital expenditures*

---

## 6. pondex_ Navigation — Confirmed

**Top navigation bar (desktop/web):**
```
[Logo]   Portfolio   Markets   Robo Advisor   CFD   Stock          [Log in]  [+]
```

**Routes:**
| Nav Item | Route | Phase |
|---|---|---|
| Portfolio | `/app/portfolio` | Phase 2 |
| Markets | `/app/markets` | Phase 2 |
| Robo Advisor | `/app/robo` | Phase 3 |
| CFD | `/app/cfd` | Phase 4 |
| Stock | `/app/stock/:ticker` | ✅ Phase 1 (exists as `/app`) |

**Current `/app` maps to:** Stock detail (ticker input → verdict)

---

## 7. Open Questions

| Item | Status |
|---|---|
| Home vs. Portfolio separate or merged | Decision pending |
| CFD structure | No sub-menu defined |
| Robo Advisor reminder function | Purpose unclear |
| Collections curation logic | Editorial vs. algorithmic TBD |
| Alert trigger types | Not defined |
| Balance sheet breakdown | Headers only as reference |

---

_Source: Investment-App_Informationsarchitektur.md (DE original, 2026-07-22)_
_Navigation confirmed by user: Portfolio · Markets · Robo Advisor · CFD · Stock_
_For regulatory boundaries: `docs/regulatory/REGULATORY.md`_
_For Revolut UI reference: `docs/research/competitors/revolut-ui-architecture.md`_
