# Architecture — pondex

> Last updated: 2026-06-21
> Author: Daniel

---

## System Overview

pondex is a client-side-only single-file web application. It runs entirely in the browser — no backend server, no database, no build step. All user data (strategy profile, portfolio, trades, API keys) lives in the browser's `localStorage`. External data is fetched directly from third-party APIs (FMP, Yahoo Finance via Cloudflare Worker proxy). The entire application is a single `pondex.html` file containing all HTML, CSS, and JavaScript.

---

## Architecture Diagram

```
User's Browser
│
├── pondex.html  (HTML + CSS + all JavaScript — ~4,800 lines)
│     │
│     ├── UI Layer       — page rendering, DOM manipulation, canvas charts
│     ├── Logic Layer    — scoring engine, DCF model, FMP API calls, onboarding
│     └── State          — currentTicker, currentWeights, localStorage (keys below)
│
├── localStorage
│     ├── pondex_fmp_key          — Financial Modeling Prep API key
│     ├── pondex_groq_key         — Groq API key (AI summaries)
│     ├── pondex_portfolio        — Holdings array
│     ├── pondex_trades           — Trade journal entries
│     ├── pondex_strategy_profile — Horizon, risk, focus, scorecard weights
│     └── pondex_watchlist        — Saved tickers
│
External APIs (called directly from browser)
│
├── Financial Modeling Prep (FMP)
│     ├── /api/v3/profile/{sym}           — price, logo, company data
│     ├── /stable/ratios?symbol={sym}     — P/E, margins, growth (TTM)
│     ├── /stable/key-metrics?symbol={sym}— EV/EBITDA, FCF yield (TTM)
│     ├── /api/v3/income-statement/{sym}  — quarterly/annual income
│     ├── /api/v3/balance-sheet-statement — assets, debt
│     ├── /api/v3/cash-flow-statement     — operating CF, FCF
│     ├── /api/v3/insider-trading         — insider buy/sell transactions
│     ├── /api/v3/institutional-holder    — top shareholders
│     ├── /api/v3/historical-price-full/stock_dividend — dividend history
│     ├── /api/v3/analyst-stock-recommendations — buy/hold/sell counts
│     └── /api/v3/price-target-consensus  — analyst price targets
│
├── Cloudflare Worker (fragrant-wave-6bd7.workers.dev)
│     └── /yahoo-news?q={ticker}  — Yahoo Finance RSS → JSON (CORS proxy)
│
└── Groq API (api.groq.com)
      └── /openai/v1/chat/completions — Llama 3.1 AI summaries
```

---

## Tech Stack Decisions

| Layer | Technology | Why |
|-------|-----------|-----|
| Application | Vanilla JS (ES5/ES6) | No build step, no dependencies, maximum portability. Works as a file:// URL or served from any static host. |
| Styling | Inline CSS in HTML | Single-file constraint. CSS variables (`--f-bg`, `--f-text`, etc.) used for theming. |
| Charts | Canvas 2D API | Zero dependencies. Custom-drawn bar charts, price charts, gauges, donut charts. |
| Data source | Financial Modeling Prep (FMP) | Comprehensive fundamentals API. Free tier: 250 req/day. Well-documented. |
| CORS proxy | Cloudflare Worker | Yahoo Finance RSS does not allow direct browser requests. Worker proxies and converts to JSON. |
| AI | Groq API (Llama 3.1 8B) | Free tier, fast inference, sufficient for company summaries and score explanations. |
| State | browser localStorage | No server needed for Phase 1–3. All user data stays on device — GDPR-friendly. |
| Hosting | GitHub Pages | Zero cost, zero ops, serves static files. |

---

## Non-Functional Requirements

### Performance

```
FMP API response:     < 2s (typical: 400–800ms)
Page initial load:    < 1s (single file, no external JS bundles)
Canvas redraws:       < 16ms (60fps target for smooth interaction)
localStorage reads:   < 1ms (synchronous, in-memory by browser)
API cache TTL:        1 hour (FMP_TTL = 3,600,000ms) — reduces daily request count
Concurrent users:     N/A — client-side only, no shared infrastructure
```

### Reliability

```
Uptime dependency:    GitHub Pages (99.9%+ SLA)
FMP availability:     Not guaranteed — all tiles show graceful error states
Groq availability:    Not guaranteed — AI tile degrades to "no AI key" message
Data loss:            localStorage is browser-local — user responsible for backup
                      Export (JSON) feature planned in Profile → Storage tab
```

### Security

```
Auth:                 None in Phase 1–3 (no user accounts)
Data sensitivity:     API keys in localStorage — low risk (no financial data stored)
Network:              All API calls over HTTPS
No secrets in code:   FMP and Groq keys entered by user at runtime, never hardcoded
CORS:                 FMP allows direct browser requests; Yahoo Finance proxied via Worker
```

---

## Data Flow — Analytics tile (core use case)

```
1. User types ticker (e.g. "AAPL") → launchAnalytics('AAPL')
2. currentTicker = 'AAPL', resetDockLiveValues() clears stale data
3. renderTiles() → renderDock() + renderActiveTile()
4. Active tile (e.g. Scorecard) → buildScorecard(body) — runs locally, no API call
5. User clicks Valuation tab → buildRatios(body)
   a. fetchFMPStable('/ratios?symbol=AAPL&period=TTM', cb)
   b. Check FMP_CACHE['stable:/ratios?...'] — if fresh (<1hr), return cached
   c. If stale: GET https://financialmodelingprep.com/stable/ratios?symbol=AAPL&period=TTM&apikey=...
   d. Response parsed → P/E, margins, etc. extracted → rendered into tile
   e. updateDockTab('ratios', 'P/E 29.2×', 'Fair', '') — dock tab updated live
6. User searches AMD → step 1–5 repeat with new ticker
   a. FMP_CACHE['stable:/ratios?...AAPL'] preserved — no re-fetch if user returns
```

---

## Key Design Decisions

| Decision | Choice | Alternatives considered | Reason |
|----------|--------|------------------------|--------|
| Single-file HTML | Yes | Separate CSS/JS files, bundler | Portability: works as a file, deployable anywhere, no build infrastructure |
| No framework | Vanilla JS | React, Vue, Svelte | Zero dependency surface. No build step. No version conflicts. Sufficient for current complexity. |
| localStorage for state | Yes | IndexedDB, cookies, URL state | Simple API, synchronous reads, sufficient storage for this data volume |
| Canvas for charts | Yes | Chart.js, D3.js | No dependencies. Full control over rendering. No bundle size increase. |
| FMP as data source | Primary | Yahoo Finance (unreliable), Alpha Vantage | Best free-tier fundamentals coverage. Stable API. Good documentation. |
| Cloudflare Worker as proxy | Yes (Yahoo) | Direct fetch, server-side | Yahoo Finance doesn't allow CORS. Worker is free up to 100k req/day. |
| FMP v3 vs stable | Hybrid | All v3, all stable | `/ratios-ttm` and `/key-metrics-ttm` are deprecated for new accounts (after Aug 2025). Others still valid on v3. |
| 1-hour API cache | Yes | No cache, longer TTL | 250 req/day FMP free tier. 1hr balances freshness vs. quota. Cache is in-memory (lost on reload). |
| ES5 compatibility | Partial | Full ES6+ | Some older syntax remains from original codebase. New code uses ES6 where safe. |

---

## External Dependencies

| Service | Purpose | Criticality | Fallback if unavailable |
|---------|---------|-------------|------------------------|
| FMP API | All fundamental data (ratios, financials, insider, dividends, analyst) | High | Each tile shows explicit error with "Set your FMP key" link |
| Cloudflare Worker | Yahoo Finance CORS proxy for news | Medium | News tile shows "proxy unavailable" message |
| Groq API | AI company summaries and score explanations | Low | AI tile shows "no Groq key" — rest of app unaffected |
| GitHub Pages | Static file hosting | High | App is a single file — can be served from any static host in minutes |

---

## Current Constraints & Known Limitations

```
1. Single-file architecture — pondex.html is ~4,800 lines. Refactoring into
   separate files is deferred to Phase 4 when a build step is introduced.
   See TECH-DEBT.md TD-001.

2. FMP free tier — 250 requests/day. Heavy usage (many tickers, frequent reloads)
   can exhaust the quota. Cache mitigates this significantly.

3. In-memory API cache — FMP_CACHE is lost on page reload. Each reload re-fetches
   from FMP. Planned fix: persist cache to localStorage with TTL check.
   See TECH-DEBT.md TD-002.

4. Demo/static data in some tiles — DCF assumptions (revenue growth, operating margin)
   are hardcoded to NVDA values. They do not update dynamically per ticker.
   See TECH-DEBT.md TD-003.

5. No URL routing — navigating to /analytics/AAPL is not possible. Browser back
   button does not work as expected. Planned fix in Phase 4.
   See TECH-DEBT.md TD-004.

6. No tests — zero automated test coverage. All testing is manual.
   Acceptable for current phase; required before Phase 4 goes to production.
   See TECH-DEBT.md TD-005.
```

---

## Phase 4 Architecture (planned)

When pondex moves to a multi-user platform, the architecture will need to change:

```
Browser (Next.js or current HTML)
    |
    | HTTPS
    ↓
Supabase Edge Functions (or separate FastAPI backend)
    |          |
    ↓          ↓
Supabase    Supabase Auth
PostgreSQL  (email / Google)
    |
    ↓
External APIs (FMP, Groq) — called server-side, key not exposed to browser
```

Key changes:
- API keys move server-side (currently in localStorage — acceptable for single-user, not for multi-user)
- localStorage data migrated to PostgreSQL per user
- Supabase Auth handles identity
- Cloudflare Worker expanded for server-side API aggregation

---

*Last updated: 2026-06-21*
*Status: Phase 1–3 complete — single-file client-side architecture*
*Next review: Before Phase 4 begins*
