# vistaclara — Equity Analysis Platform

Single-page equity analysis app. No build step, no npm, no framework.

**Live:** https://dan123iel.github.io/stockrater/
**Repo:** https://github.com/dan123iel/stockrater

---

## File Structure

```
index.html        — entire app (HTML + inline CSS + inline JS)
src/js/main.js    — app logic (fetching, rendering, calculations)
worker.js         — Cloudflare Worker (data proxy for Yahoo Finance)
public/robots.txt — SEO
sitemap.xml       — SEO
PROJECT.md        — this file
README.md         — short public description
```

---

## How it works

Data flows through a Cloudflare Worker that proxies Yahoo Finance:

| Endpoint | Returns |
|----------|---------|
| `/yahoo/summary/{TICKER}` | Fundamentals (ratios, financials, statements) |
| `/yahoo/chart/{TICKER}?range={range}` | OHLC price data + meta (name, currency, price) |

`/yahoo/search` is **disabled** — do not call it.

---

## Design System

**Colors**
```
--bg:     #f0edf5   background (lavender-white)
--ink:    #1a1028   primary text
--mid:    #6b5a8a   secondary text
--purple: #5b21f5   primary accent
--lime:   #c8ff00   secondary accent (use sparingly)
--green:  #00a86b   finance positive
--red:    #e0302a   finance negative
--amber:  #e08000   finance neutral
--dark:   #0e0a1a   dark sections / footer
```

**Fonts** (Google Fonts)
- `DM Sans` — UI text
- `DM Mono` — labels, numbers, code

**Finance color logic**
- Score ≥ 3.5 → green `#059669`
- Score ≥ 2.5 → amber `#d97706`
- Score < 2.5 → red `#dc2626`

---

## App Structure (sections)

1. **Home** — hero, ghost wordmark, CTA
2. **Analysis** — search input, try-pills
3. **Result / Dashboard** — tile grid after search:
   - Scorecard (gauge + verdict)
   - Market Context (trend, volatility, 52w position)
   - Price Chart (range tabs, crosshair)
   - Financial Ratios
   - Period Overview (TTM / Q / FY)
   - DCF / Intrinsic Value
   - Qualitative Assessment (management, moat, ESG)
4. **Compare** — side-by-side two tickers
5. **Portfolio** — saved holdings + watchlist
6. **Footer** — dark, ghost wordmark

---

## Local Storage Keys

| Key | Content |
|-----|---------|
| `sr_portfolio` | saved positions |
| `sr_watchlist` | watchlist entries |
| `sr_trades` | risk engine trades |
| `sr_cache` | API response cache (1h TTL) |
| `sr_search_history` | recent searches |
| `sr_workerurl` | Cloudflare Worker URL |

---

## Rules (do not change)

- No colored table cell backgrounds — only text/bars are colored
- No blue/indigo as main color
- No logo fetching — initials avatar only
- No `/yahoo/search` calls
- All styles stay inline in `index.html` — no external CSS files
- Auto-push hook: every file change is auto-committed and pushed to GitHub
