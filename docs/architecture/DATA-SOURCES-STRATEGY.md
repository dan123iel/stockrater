# pondex — Data Provider Strategy

_Last updated: 2026-07-17_
_Trigger for review: before Phase 2 launch (first paying users)_

---

## TL;DR

**Phase 1:** Yahoo Finance (yfinance) — free, fast, legal risk accepted as technical debt.
**Phase 2+:** Migrate to Massive.com (ex-Polygon.io) Starter at $29/month — legally clean.
**Critical open question:** Verify EU stock coverage on Massive.com before Phase 2 commit.
**Factset:** Out of scope until post-Series A. €50k–200k/year is not bootstrap viable.

---

## Provider Comparison

### 1. Yahoo Finance / yfinance

| | |
|---|---|
| Cost | Free |
| Data | EOD prices, P/E, EPS, revenue, balance sheet, cashflow, earnings dates, insider data, news, EU stocks via suffix (SAP.DE, BATS.L) |
| Legal risk | **HIGH** — Yahoo ToS explicitly prohibits commercial use. yfinance itself warns "intended for personal use only." Cease-and-desist risk once revenue exists. |
| Reliability | Medium — HTML scraping, endpoints break without warning, 2–5% data failure rate in production, no SLA |
| Phase 1 verdict | ✅ Use — zero users, zero revenue, enforcement risk essentially nil. Document as technical debt. |
| Phase 2+ verdict | ❌ Do not use — first paying user makes this legally indefensible |

### 2. Massive.com (formerly Polygon.io)

Polygon.io was acquired and rebranded as **massive.com**. API and data remain intact.

| Plan | Price | What's included |
|---|---|---|
| Free | $0 | 5 calls/min, EOD data, technicals, 2yr history, **individual use only** |
| Starter | $29/mo | Unlimited calls, 15-min delayed, 5yr history, WebSockets |
| Developer | $79/mo | Unlimited, 10yr history, trades data |
| Advanced | $199/mo | Real-time, 20yr+ history, **Financials & Ratios (fundamentals)** |
| Financials add-on | $29/mo | May be stackable onto lower tiers — **verify before commit** |

**EU stock coverage: UNCONFIRMED — this is the #1 open question.**
Massive.com has historically been US-centric. DAX, FTSE, Euronext coverage not documented.
**Action required:** Test with SAP.DE, ASML.AS, VOW3.DE before committing to this provider.

**Legal risk:** Low — legitimate commercial API, proper ToS, SLA on paid tiers.

### 3. Factset

| | |
|---|---|
| Cost | **No self-serve pricing.** Enterprise contracts only. Estimated $50k–200k+/year. |
| Data | Institutional-grade. Full EU markets, deep fundamentals, EPS estimates with revisions, analyst ratings, real-time. Best data quality of the three. |
| Legal risk | Zero — full licensing, redistribution rights per contract |
| Phase verdict | ❌ Out of scope for bootstrap phase. Relevant only post-Series A with institutional funding. |
| Note | Revolut has a custom enterprise deal as a licensed financial institution. pondex cannot replicate this cost structure at €4.99/month pricing. |

### 4. EU-Focused Alternatives (if Massive.com EU coverage fails)

| Provider | Price | EU Coverage | Notes |
|---|---|---|---|
| **Finnhub** | Free + $50/mo | ✅ Confirmed EU | Free tier: 60 calls/min, EOD, basic fundamentals, earnings |
| **EOD Historical Data** | $19–79/mo | ✅ Confirmed EU | 70+ exchanges, fundamentals, technicals, good EU depth |
| **Twelve Data** | $29/mo | ✅ Confirmed EU | Technical indicators, fundamentals, real-time on paid |
| **Alpha Vantage** | Free + $50/mo | Partial EU | US-focused, limited EU fundamentals |

**Recommendation if Massive.com EU coverage is insufficient:**
Use **EOD Historical Data** ($19.99/mo) or **Finnhub** ($50/mo) as EU-primary provider.

---

## Migration Plan

### Phase 1 (now → first paying user)
- Yahoo Finance via yfinance
- SEC EDGAR for filings (free, official, no risk)
- Document every yfinance call in the codebase with `// TODO: migrate to paid provider before Phase 2`
- Edge Function already designed with swappable `MARKET_DATA_PROVIDER` env var

### Phase 2 (first paying user → ~100 users)
**Before first payment goes live:**
1. Test Massive.com free tier with 10 EU tickers (SAP.DE, ASML.AS, NOVO-B.CO, MC.PA, SIE.DE)
2. If EU coverage confirmed → upgrade to Massive.com Starter ($29/mo)
3. If EU coverage not confirmed → use EOD Historical Data ($19.99/mo) instead
4. Change `MARKET_DATA_PROVIDER` env var in Supabase — no frontend changes needed

**Cost math at Phase 2:**
- 6 paying users × €4.99 = ~€30/mo covers the data provider
- Break-even: 6 Pro subscribers

### Phase 3 (~100–1000 users)
- Evaluate Massive.com Advanced ($199/mo) for fundamentals + real-time
- Or layer EOD Historical Data for EU + Massive.com for US technicals
- SEC EDGAR remains free for all filing data

### Phase 4+ (1000+ users)
- $199/mo = ~4% of revenue at 1000 users — acceptable
- Explore Refinitiv/LSEG developer tier for institutional-grade EU data
- Factset only relevant post-Series A

---

## Data Source Map (what comes from where)

| Data | Phase 1 | Phase 2+ |
|---|---|---|
| Price, P/E, EPS, Dividend, Beta | Yahoo Finance | Massive.com or EOD HD |
| Revenue, Gross Margin, Operating Margin | Yahoo Finance | Massive.com Advanced or EOD HD |
| FCF, EV/EBITDA, P/S | Yahoo Finance | Massive.com Advanced |
| Income Statement, Balance Sheet, Cashflow | SEC EDGAR XBRL | SEC EDGAR XBRL (stays free) |
| Insider transactions (Form 4) | SEC EDGAR | SEC EDGAR (stays free) |
| Analyst consensus, price targets | Yahoo Finance | Finnhub or Massive.com |
| EPS estimates (actual + forecast) | Yahoo Finance | Finnhub or Massive.com |
| Calendar events (Earnings, Ex-Dividend) | Yahoo Finance | Massive.com or EOD HD |
| Technical indicators (SMA/EMA/RSI/MACD) | Yahoo Finance → compute | Massive.com Starter |
| S&P 500 / market sentiment | Yahoo Finance | Massive.com |
| News feed | Yahoo Finance | Finnhub (free tier has news) |
| Company logos | Clearbit (free tier) | Clearbit (stays free) |
| **Company HQ country (for World Map feature)** | Yahoo Finance profile | Massive.com reference data |
| Sector reference (for normalisation) | Static JSON in repo | Static JSON (stays manual) |

---

## Action Items Before Phase 2 Launch

- [ ] Test Massive.com / massive.com with EU ticker list (SAP.DE, ASML.AS, SIE.DE, MC.PA, NOVO-B.CO)
- [ ] If EU confirmed: sign up for Massive.com Starter ($29/mo)
- [ ] If EU not confirmed: sign up for EOD Historical Data ($19.99/mo)
- [ ] Update `MARKET_DATA_PROVIDER` env var in Supabase
- [ ] Remove all yfinance calls from production backend (keep as fallback in dev only)
- [ ] Verify Finnhub free tier covers news + analyst consensus for EU stocks
