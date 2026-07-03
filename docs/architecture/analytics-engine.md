# Analytics Engine

Reference for all tabs in the Analytics view and their data requirements.

---

## Architecture

When a user opens a ticker, pondex loads the Analytics view. All data flows through a single **Cloudflare Worker** at `trading.d-lenz-contact.workers.dev`. The browser never calls Yahoo Finance, Massive/Polygon, SEC EDGAR, or Groq directly — the Worker proxies and caches everything. API keys are stored as Worker secrets, never in the browser.

```
Browser → Cloudflare Worker → Yahoo Finance
                            → Massive (Polygon.io)
                            → SEC EDGAR (public, no key)
                            → Groq AI (key in Worker secret)
```

---

## Quick-Access Tabs (Inner Tab Bar)

These 6 tabs appear in the tab bar at the top of every analytics view:

| Tab | Opens tile | Shortcut |
|-----|-----------|---------|
| Scorecard | Algorithmic rating | default |
| Charts | Price chart | — |
| DCF | Stresstest (DCF model) | — |
| Insider | Insider trades | — |
| AI | AI Insights | — |
| News | News & Sentiment | — |

---

## All Tiles (Manage Tiles Panel)

The full tile list available via the Manage Tiles panel. Users can add/remove/reorder.

### 1. Scorecard
**What it shows:** Algorithmic fit score (0–5) weighted by the user's strategy profile. Five sub-scores: Financial Ratios, Management Quality, Moat/Competitive, ESG & Risk, Valuation/DCF. Includes Confidence Score (0–100%) and Data Coverage box.

**Data source:** Yahoo Finance summary (`/yahoo/summary/{ticker}`)  
**Fallback:** Graceful error + Retry button if Yahoo is unreachable  
**US-only limitation:** Insider data and EPS history only available for US-listed tickers (SEC EDGAR). Non-US stocks show lower confidence.  
**API keys needed:** None (Worker proxies Yahoo)

---

### 2. Price Chart
**What it shows:** OHLC candlestick or line chart. Timeframes: 1D / 1W / 1M / 3M / 6M / YTD / 1Y / Max. Overlays: SMA 50, SMA 200, RSI. Optional index comparison (S&P 500, DAX, etc.).

**Data source:** Yahoo Finance chart (`/yahoo/chart/{ticker}?range=…`)  
**API keys needed:** None

---

### 3. Valuation (Ratios)
**What it shows:** P/E, EV/EBITDA, P/S ratio, FCF Yield, Operating Margin, Gross Margin, Revenue Growth (TTM). Tabs: Valuation / Profitability / Liquidity.

**Data source:** Yahoo Finance summary  
**API keys needed:** None

---

### 4. Stresstest (DCF)
**What it shows:** DCF fair value with adjustable sliders for Revenue Growth (5Y CAGR), Operating Margin, WACC. Outputs: Worst / Base / Best case fair value, 5-year projection table, Reverse DCF ("market implies X% growth at current price").

**Data source:** Yahoo Finance summary (price, revenue, operating margin, shares outstanding, beta → auto-calculates WACC)  
**API keys needed:** None  
**Note:** Reverse DCF uses binary search to find the implied growth rate — no additional API call needed.

---

### 5. News & Sentiment
**What it shows:** Live news feed for the ticker, sourced from Yahoo Finance news. Exchange context loaded first from Massive to correctly scope the feed.

**Data sources:**
- Yahoo Finance news (`/yahoo-news?q={ticker}`)
- Massive ticker details (`/v3/reference/tickers/{ticker}`) — for exchange context only

**API keys needed:** MASSIVE_KEY in Worker (free tier: 5 req/min)

---

### 6. Insider Trades
**What it shows:** Recent insider transactions (Form 4 filings): buyer/seller name, role, shares, value, transaction type (buy/sell). Only available for US-listed companies.

**Data source:** SEC EDGAR Form 4 filings (public, no key required)  
**Endpoints used:**
- `EDGAR /submissions/CIK{cik}.json` — fetch filing list
- `EDGAR /{xmlPath}` — parse individual Form 4 XML

**API keys needed:** None  
**Limitation:** US stocks only. Non-US tickers show "No insider data available."

---

### 7. Ownership
**What it shows:** Market cap, shares outstanding, 52-week high/low, float, institutional ownership percentage.

**Data source:** Yahoo Finance summary  
**API keys needed:** None

---

### 8. Dividend Calendar
**What it shows:** Dividend yield, annual payout, ex-dividend dates, dividend history chart.

**Data sources:**
- Yahoo Finance summary (yield, payout ratio)
- Massive dividends (`/v3/reference/dividends`) — for history

**API keys needed:** MASSIVE_KEY in Worker

---

### 9. Financials
**What it shows:** Income statement, balance sheet, cash flow — annual and quarterly. Tabs: Income / Balance / Cash Flow.

**Data source:** Massive financial statements (`/vX/reference/financials?ticker={ticker}`)  
**API keys needed:** MASSIVE_KEY in Worker  
**Limitation:** US-heavy coverage. Non-US tickers often return no data.

---

### 10. Analyst Ratings
**What it shows:** Analyst consensus (Buy/Hold/Sell), price target, EPS history (actual vs. estimate).

**Data sources:**
- Yahoo Finance summary (analyst consensus, price target)
- SEC EDGAR XBRL EPS concept (`/api/xbrl/companyconcept/CIK{cik}/us-gaap/EarningsPerShareDiluted.json`)
- Massive financial statements (EPS fallback)

**API keys needed:** None for EDGAR, MASSIVE_KEY in Worker for fallback  
**Limitation:** EPS from EDGAR is US-only.

---

### 11. AI Insights
**What it shows:** Strategy-aware AI analysis: summary, buy reasons, key risks, 3 alternative stocks. The prompt is grounded with live financial data from the Scorecard (no hallucination of figures).

**Data source:** Groq LLM via Worker (`/ai/groq`) — model: Llama 3.3 70B  
**AI providers available:** Groq (default, via Worker key) or OpenRouter (user provides own key)  
**API keys needed:**
- **Groq:** GROQ_KEY stored as Worker secret — users don't need to provide anything
- **OpenRouter:** User can optionally provide their own key in Settings → Data & API for unlimited usage

---

### 12. Company Profile
**What it shows:** Business description, sector, industry, headquarters, website, employee count, exchange, ISIN/WKN if available. Company logo sourced from Massive branding endpoint.

**Data sources:**
- Massive ticker reference (`/v3/reference/tickers/{ticker}`)
- Massive branding (`/branding/{path}`) — for company logo

**API keys needed:** MASSIVE_KEY in Worker

---

## Worker Infrastructure

**URL:** `https://trading.d-lenz-contact.workers.dev`  
**Platform:** Cloudflare Workers (free tier)

**Routes proxied:**

| Worker path | Upstream | Notes |
|-------------|----------|-------|
| `/yahoo/summary/{ticker}` | Yahoo Finance | Cached 5 min |
| `/yahoo/chart/{ticker}` | Yahoo Finance | Cached 5 min |
| `/yahoo-news` | Yahoo Finance | Not cached |
| `/massive/{path}` | Polygon.io / Massive | Cached 1h (financials), 5 min (others) |
| `/edgar/{path}` | SEC EDGAR | Cached 1h |
| `/ai/groq` | Groq API | Not cached |
| `/branding/{path}` | Massive branding CDN | Cached |

**Secrets stored in Worker (never in browser):**

| Secret | Used for | Free tier limits |
|--------|----------|-----------------|
| `MASSIVE_KEY` | Polygon.io / Massive API | 5 req/min, unlimited history |
| `GROQ_KEY` | Groq AI (Llama 3.3 70B) | Rate limits apply on free tier |

**No key required for:**
- Yahoo Finance (unofficial endpoint, no SLA)
- SEC EDGAR (public government API)

---

## What Would Break Without the Worker

| Removed | Impact |
|---------|--------|
| MASSIVE_KEY | News (exchange context), Dividends history, Financials tab, Analyst EPS fallback, Company Profile, logos |
| GROQ_KEY | AI Insights tab — falls back to "API key required" message unless user provides OpenRouter key |
| Cloudflare Worker itself | Everything — all data is proxied through it |

---

## Ticker Search

Users can find any company via:
1. **Search tab** (magnifying glass in the inner tab bar) — searches Massive ticker reference by name or ticker, supports ISIN/WKN lookup
2. **Hero search** on the Analytics start screen — same endpoint
3. **Ticker tags** on the start screen (quick access to NVDA, AAPL, MSFT, AMD, TSLA, GOOGL, BTC)

Search endpoint: `Massive /v3/reference/tickers?search={query}&active=true&limit=10`

---

## Known Limitations

| Limitation | Affected tiles | Reason |
|-----------|---------------|--------|
| No insider data for non-US stocks | Scorecard (confidence), Insider | SEC EDGAR is US-only |
| No EPS history for non-US stocks | Analyst Ratings | SEC EDGAR XBRL is US-only |
| Financials often missing for non-US | Financials, Analyst | Massive coverage is US-heavy |
| No real-time price (15-min delay) | All tiles using price | Yahoo Finance unofficial endpoint |
| AI rate limits on free Groq tier | AI Insights | Groq free tier caps |
| Yahoo Finance unofficial (no SLA) | All tiles | Could break without notice — see RISK-001 in risks.md |
