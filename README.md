# futara

**A personal investment intelligence tool** — algorithmic stock scoring, DCF valuation, and strategy-aligned analysis in one place.

**Live:** https://dan123iel.github.io/stockrater/
**Repo:** https://github.com/dan123iel/stockrater

---

## What is this?

futara answers one question: **"Should I buy this stock — given how I invest?"**

It scores any stock against your personal investment strategy (value, growth, dividend, or momentum), explains *why* a stock scores the way it does, and tracks your own trades over time. No Bloomberg subscription required, no YouTube opinion, no bank advisor conflict of interest.

---

## How it works

```
You open futara in a browser
       ↓
Enter a ticker (e.g. NVDA, AAPL, MSFT)
       ↓
futara fetches live data from Finnhub + Yahoo Finance
       ↓
Calculates a score (1–5) adjusted to YOUR investment profile
       ↓
Shows: score, explanation, chart, ratios, DCF, insider trades, news
```

Everything runs in the browser. No server, no database, no login required.
Data is cached locally for 1 hour.

---

## File Structure

```
futara/
│
├── index.html                    ← Active design (CSS only — swap to change the look)
│
├── src/
│   └── js/
│       ├── templates.js          ← All page HTML (structure of every screen)
│       └── app.js                ← All logic (data fetching, scoring, navigation)
│
├── designs/                      ← Alternative visual designs (same logic, different CSS)
│   ├── v0-brutalist/             ← Space Grotesk, high contrast
│   ├── v1-dark-purple/           ← Dark mode, purple accent (Syne font)
│   ├── v2-editorial-beige/       ← Light mode, serif typography (DM Serif Display)
│   └── v3-minimalist-air/        ← Ultra-minimal, Cormorant Garamond
│
├── worker.js                     ← Cloudflare Worker (backend proxy for Yahoo Finance)
│
├── public/robots.txt
│
├── PROJECT.md                    ← Technical architecture and rules
├── ROADMAP.md                    ← Product vision, phases, and backlog
└── README.md                     ← This file
```

---

## The Three-File Architecture

futara separates three concerns completely:

| File | Responsibility | Change when... |
|---|---|---|
| `index.html` | Visual design (CSS only) | You want a different look |
| `src/js/templates.js` | Page structure (HTML) | You add/remove a screen or widget |
| `src/js/app.js` | Logic (data, scoring, API) | You add/change a feature |

**Switching designs is one step:** replace `index.html` with any file from `designs/`.
The logic and structure stay exactly the same.

---

## Design Variants

| Folder | Style | Font |
|---|---|---|
| `designs/v0-brutalist/` | High contrast, editorial | Space Grotesk |
| `designs/v1-dark-purple/` | Dark mode, purple accent | Syne |
| `designs/v2-editorial-beige/` | Warm light mode, serif | DM Serif Display |
| `designs/v3-minimalist-air/` | Ultra-minimal, airy | Cormorant Garamond |

Browse live: https://dan123iel.github.io/stockrater/designs/v1-dark-purple/

---

## Data Sources

| Source | What it provides | Cost |
|---|---|---|
| Finnhub | Live prices (WebSocket), news | Free tier |
| Yahoo Finance (via Worker) | Fundamentals, historical charts | Free (proxied) |
| FMP (optional) | Enhanced fundamentals | Free tier |

---

## Tech Stack

- **Frontend:** Vanilla HTML + CSS + JavaScript — no framework, no build step
- **Backend:** Cloudflare Worker (lightweight proxy)
- **Storage:** Browser localStorage (no database at this stage)
- **Hosting:** GitHub Pages (auto-deploys on push)

---

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for the full product vision.

**Current:** Scoring, DCF, comparison, portfolio, news
**Next:** Strategy profile, score explanations, trade journal, AI (Groq/Llama)
**Later:** Broker CSV import, auth, multi-user (Supabase)

---

## Local Development

```bash
# No build step needed
python3 -m http.server 8080
# open http://localhost:8080
```
