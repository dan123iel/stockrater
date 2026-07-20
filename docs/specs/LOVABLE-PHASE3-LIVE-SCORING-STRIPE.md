# pondex — PHASE 3: Edge Functions + Scoring Engine + Stripe

**Prerequisite:** Phase 1 + Phase 2 live and tested. RLS verified between two accounts.

**Goal:** Replace all placeholder data with live data. Real scoring calculation. Real payments.

**Approach:** Build and test each Edge Function individually in order:
`fetch-market-data` → `fetch-sec-filing` → `calculate-verdict` → `stripe-webhook`

**Design system:** → `docs/brainstorming/design-system/BUNGEE-DESIGN-SYSTEM.md`

---

## 1. EDGE FUNCTION: `fetch-market-data`

- Input: `{ ticker: string }`
- First checks `market_data_cache` — if entry <24h old, return from cache (include `retrieved_at`)
- Otherwise: fetch Yahoo Finance, parse: P/E, FCF yield, gross margin, beta, price, market cap, EV/EBITDA, P/S, operating margin, revenue, EPS, dividend yield, 52-week high/low
- Write to `market_data_cache` via Service Role key
- Every metric MUST include `source` and `retrieved_at` — no exceptions
- On timeout or parse error: return `{"error": "data_unavailable", "ticker": "..."}` — never return stale as current
- Provider interface swappable via `MARKET_DATA_PROVIDER` env var

**Test:** 5 tickers including one invalid → clean error state, no crash.

---

## 2. EDGE FUNCTION: `fetch-sec-filing`

- Input: `{ ticker: string }` → mapped to CIK via `https://www.sec.gov/files/company_tickers.json`
- Fetch `data.sec.gov/submissions/CIK{10-digit}.json` and XBRL company facts
- Extract: Revenue Growth YoY, Operating Margin, Insider Buy/Sell Ratio (Form 4)
- If data not available: mark factor as "not rateable" — never guess
- Cache in `market_data_cache` (data_source = 'sec_edgar')
- Required header: `User-Agent: pondex research-tool contact@pondex.app`

**Test:** Works for AAPL (full XBRL), clean error for non-US tickers without SEC filings.

---

## 3. EDGE FUNCTION: `calculate-verdict`

### 3.1 Flow
- Input: `{ ticker: string, strategy: 'value'|'growth'|'dividend'|'momentum' }`
- Calls `fetch-market-data` + `fetch-sec-filing` (or reads from cache)
- Free tier: check `verdict_usage` BEFORE calculation — if limit reached: HTTP 402 `{"error": "daily_limit_reached"}`
- Limit check is server-side only — never in client
- Writes result to `verdicts`, increments `verdict_usage.verdict_count`

### 3.2 Factors
| Factor | Source | Raw metric |
|---|---|---|
| Fundamentals | SEC EDGAR | Revenue Growth YoY, Gross Margin trend (4 quarters) |
| Valuation | Yahoo Finance | P/E, EV/EBITDA, P/S vs. sector median |
| Management Quality | SEC EDGAR Form 4 | Insider Buy/Sell ratio, 6 months |
| Economic Moat | Yahoo Finance + SEC | Gross Margin trend over 5 quarters |
| Risk Profile | Yahoo Finance | Beta, 1-year volatility |

### 3.3 Normalisation
Each metric normalised to 1–5 scale via percentile vs. sector reference group (min. 15 companies, static JSON in repo). Without reference group: factor is "not rateable", never guessed.

### 3.4 Strategy weights
```js
const WEIGHTS = {
  value:    { fundamentals: 0.25, valuation: 0.35, management: 0.15, moat: 0.15, risk: 0.10 },
  growth:   { fundamentals: 0.35, valuation: 0.15, management: 0.10, moat: 0.25, risk: 0.15 },
  dividend: { fundamentals: 0.20, valuation: 0.20, management: 0.20, moat: 0.15, risk: 0.25 },
  momentum: { fundamentals: 0.15, valuation: 0.10, management: 0.15, moat: 0.20, risk: 0.40 }
}
// final_score = round( sum(factor_score_1to5 * weight) / 5 * 100 )
```

### 3.5 Required output per factor
```json
{
  "factor": "valuation",
  "score_1to5": 2.1,
  "explanation": "P/E of 68x is above the sector median of 34x.",
  "sources": [
    { "provider": "Yahoo Finance", "metric": "P/E", "retrieved_at": "2026-07-17T10:00:00Z" }
  ]
}
```
Without `explanation` AND at least one `sources` entry: factor must NOT be rendered.

**Test:** Call verdict twice for same ticker+strategy — second call served from cache.

---

## 4. EDGE FUNCTION: `fetch-calendar-events`

- Input: `{ tickers: string[] }` (portfolio + watchlist)
- Fetch Yahoo Finance `quoteSummary?modules=calendarEvents` per ticker
- Extract: earnings date, dividend date, ex-dividend date
- Cache in `market_data_cache`
- Return sorted events: `{ ticker, event_type, date, amount? }`
- Wire to `/app/calendar` and dashboard "Upcoming Events" widget

**Test:** Correct events for AAPL + NVDA, graceful handling for tickers with no events.

---

## 5. STRIPE INTEGRATION

### Checkout flow
"Upgrade" button calls `create-checkout-session` Edge Function → redirects to Stripe Checkout.
Stripe Prices: Monthly €4.99, Yearly €49.99 — Price IDs as env vars.

### Edge Function: `stripe-webhook`
- `checkout.session.completed` → set `profiles.subscription_tier = 'pro'`, store Stripe IDs
- `customer.subscription.deleted` → reset to `subscription_tier = 'free'`
- Idempotency: store Stripe event ID, skip already-processed events
- Signature verification with `STRIPE_WEBHOOK_SECRET` — reject without valid signature

**Test:** Stripe CLI simulate, then re-send same webhook — state unchanged on second delivery.

---

## 6. FRONTEND WIRING

- `/app/stock/:ticker` Overview: calls `calculate-verdict`, tacho gauge animates 0→score
- `/app/stock/:ticker` Insights: analyst consensus + technical indicators from Yahoo Finance
- `/app/stock/:ticker` Financials: P&L, Balance Sheet, Cashflow from SEC EDGAR XBRL; EPS chart from Yahoo Finance
- `/app/stock/:ticker` News: Yahoo Finance news feed filtered to ticker
- `/app/compare`: two parallel `calculate-verdict` calls + sector average (Pro only)
- `/app/calendar`: wires `fetch-calendar-events`
- Dashboard events widget: next 3 real events
- HTTP 402 from `calculate-verdict`: clear upgrade CTA, not generic error

### Technical Indicators (chart screen)
Wire real values from Yahoo Finance:

```
MOVING AVERAGES
SMA(20)    Bullish    202.22
SMA(50)    Bullish    209.61
SMA(200)   Bullish    192.14
EMA(20)    Bullish    204.54
EMA(50)    Bullish    204.48
EMA(200)   Bullish    193.85

OSCILLATORS
RSI(14)               56.90   Bullish
MACD(12,26,9)          0.17   Bullish
```

Signal colors: Bullish = accent, Neutral = muted, Bearish = red.

---

## 7. PONDEX ASSISTANT (AI Research Companion)

Full-screen at `/app/assistant`. Floating button on all `/app/stock/:ticker` screens.

**Behaviour:**
- Grounded in live data from `market_data_cache` — no hallucinated numbers
- Every factual claim includes a source badge inline
- Plain language only — no jargon unless user asks
- Never says "buy" or "sell": "I can show you the data and what it means — the decision is yours."

**Example:**
```
User: "Is NVDA expensive right now?"
pondex: "NVDA's P/E ratio is 68x, compared to the semiconductor sector
         median of 34x (Source: Yahoo Finance · TTM). For a growth investor,
         high P/E can be justified by 59% EPS growth YoY. For a value
         investor, it would be considered elevated.
         ⚠ This is information, not a recommendation."
```

**Edge Function: `assistant-chat`**
- Input: `{ message, ticker, strategy, conversation_history }`
- Fetches current data from `market_data_cache`, injects into system prompt
- Model: Groq Llama 3.3 70B
- Returns: `{ response, sources[] }`
- Sources rendered as inline badges

---

## 8. COMPLIANCE

- Every verdict screen shows `retrieved_at` — if >24h: stale data warning badge
- No "Buy" / "Sell" / "Recommend" anywhere in UI text
- Score label always "Fit for your [strategy] strategy"
- Score methodology page (`/score-methodology`) accessible from every score display

---

## 9. LANDING PAGE UPDATES (after Phase 3)

After Phase 3 the daily limit is enforced server-side per account. Update landing page:
- Section 9 (Pricing), Free card: "Free account · 1 verdict/day · no credit card"
- Section 10 (FAQ), account question: update to reflect account requirement

---

## 10. KNOWN RISKS

| Risk | Mitigation |
|---|---|
| Yahoo Finance blocks requests | Clean error state, swappable provider interface |
| Stripe webhook delivered twice | Event ID idempotency check |
| Sector reference group incomplete | Return factor as "not rateable" |
| SEC filing missing for non-US stocks | Clean error state, no crash |

---

## 11. FILE STRUCTURE

```
supabase/
  functions/
    fetch-market-data/index.ts
    fetch-sec-filing/index.ts
    fetch-calendar-events/index.ts
    calculate-verdict/index.ts
    create-checkout-session/index.ts
    stripe-webhook/index.ts
    assistant-chat/index.ts
  migrations/
    002_stripe_fields.sql
src/
  data/
    sector-reference.json
```
