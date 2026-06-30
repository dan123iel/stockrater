# Architecture

## System Overview

```
Browser (index.html)
│
├── All logic in a single file (no framework, no build system — until V1)
├── localStorage: portfolio, watchlist, trades, theses, strategy profile, theme
│
└── Fetches via Cloudflare Worker ──► Yahoo Finance (global)
                                  ──► Massive/Polygon (ticker details, dividends)
                                  ──► SEC EDGAR (insider trades, EPS — US only)
                                  ──► Groq API (AI explanations)
                                  ──► Cloudflare KV (discovery universe cache)
```

---

## Cloudflare Worker

**URL:** `https://trading.d-lenz-contact.workers.dev`  
**Allowed Origin:** `https://dan123iel.github.io` (CORS — see RISK-006 in risks.md for localhost issue)

### Endpoints

| Path | Proxies to | Auth |
|---|---|---|
| `/yahoo/summary/{ticker}` | Yahoo Finance | None |
| `/yahoo/chart/{ticker}` | Yahoo Finance | None |
| `/yahoo-news?q={ticker}` | Yahoo Finance RSS | None |
| `/massive/{path}` | Polygon/Massive API | MASSIVE_KEY (Secret) |
| `/edgar/{path}` | SEC EDGAR | None |
| `/branding/{path}` | Polygon Branding | MASSIVE_KEY (Secret) |
| `/ai/groq` | Groq API | GROQ_KEY (Secret) |
| `/discovery/universe` | Cloudflare KV | None |

**Worker Secrets (never in browser):**
- `MASSIVE_KEY` — Polygon/Massive API key
- `GROQ_KEY` — Groq API key

---

## localStorage Schema

| Key | Type | Contents |
|---|---|---|
| `pondex_strategy` | JSON object | Strategy profile + score weights |
| `pondex_theme` | string | `light` / `dark` |
| `pondex_groq_key` | string | Optional user-provided Groq key |
| `sr_portfolio` | JSON array | Portfolio positions |
| `sr_watchlist` | JSON array | Watchlist tickers |
| `sr_trades` | JSON array | Trade journal entries |
| `pondex_theses` | JSON array | Thesis Tracker entries (V1) |
| `pondex_cache_{key}` | JSON object | API response cache with timestamp |

---

## Data Flow — Analytics Page

```
User enters ticker
       │
       ▼
Resolve ticker (LOCAL_TICKER_MAP → Massive search API)
       │
       ▼
Parallel fetch:
  ├── Yahoo summary  → fundamentals, margins, P/E
  ├── Yahoo chart    → price history
  └── EDGAR Form 4   → insider trades (US only)
       │
       ▼
Calculate score (client-side, pure JS)
  └── Apply profile weights
  └── Calculate confidence score
       │
       ▼
Render tiles
  └── Scorecard, Chart, Valuation, DCF, Insiders, News, AI...
```

---

## V1 Architecture Changes (Planned)

1. **Vite build system** — compiles components into single index.html output. Development uses modules; deployment remains one file.
2. **TypeScript** — new features (Thesis Tracker, Portfolio) written in TS, compiled by Vite.
3. **Unit tests** — scoring engine and thesis evaluation covered by Vitest.

See ADR-003.
