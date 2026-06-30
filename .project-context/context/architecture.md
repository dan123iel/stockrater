# pondex_ — Architecture & Data Flow

## 1. System Overview

Two-tier: React frontend + FastAPI backend. No database. No auth (Phase 1).

```
Browser (React + Vite)  →  fetch()  →  FastAPI (port 8000)  →  yfinance / SEC EDGAR / Groq
```

Start everything: `docker compose up` (see `docker-compose.yml` in root)

---

## 2. Full Directory Map

```
pondex/                              ← Git repo root
│
├── CLAUDE.md                        ← Auto-loaded AI context
├── README.md
├── docker-compose.yml               ← Starts backend + frontend together
├── .gitignore
│
├── .project-context/                ← AI agent rules (this system)
│   ├── MASTER.md
│   └── context/
│       ├── architecture.md          ← This file
│       ├── tech-stack.md
│       └── coding-guidelines.md
│
├── backend/                         ← FastAPI Python backend
│   ├── main.py                      ← ALL endpoints (single file, intentional)
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example                 ← GROQ_API_KEY
│
├── frontend/                        ← React + Vite (formerly "code/")
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── Dockerfile
│   ├── .env.example                 ← VITE_API_URL
│   └── src/
│       ├── App.jsx                  ← Router (single route → Home)
│       ├── main.jsx
│       ├── index.css                ← ALL CSS variables / design tokens
│       ├── pages/
│       │   ├── Home.jsx             ← View switcher (no URL routes)
│       │   ├── Analysis.jsx         ← 12-tab analytics (main feature)
│       │   ├── Markets.jsx
│       │   ├── Macro.jsx
│       │   ├── Ideas.jsx
│       │   ├── Portfolio.jsx
│       │   └── Watchlist.jsx
│       ├── components/
│       │   ├── Nav.jsx              ← 6 links
│       │   ├── ScoreHero.jsx        ← Explanation-first score panel (ADR-007)
│       │   ├── SettingsPanel.jsx
│       │   ├── ThesisDrawer.jsx
│       │   ├── InvestmentMemo.jsx
│       │   ├── tiles/               ← ChartTile, ValuationTile, DCFTile, NewsTile, InsiderTile, AllInsightsTile
│       │   └── ui/                  ← ⚠ shadcn-generated — DO NOT EDIT MANUALLY
│       └── lib/
│           ├── fmp.js               ← API client → calls backend (NOT FMP directly)
│           ├── storage.js           ← localStorage helpers
│           └── scoring.js           ← Client-side fallback (backend /score is primary)
│
├── design/
│   ├── wireframes/                  ← 21 ASCII wireframes — readable by AI agents
│   └── reference/
│       └── pondex-v1.html           ← Original single-file prototype
│
└── doc/
    ├── PROJECT-BRIEF.md
    ├── PRD.md
    ├── ROADMAP.md
    ├── USER-STORIES.md
    ├── adr/                         ← ADR-001 through ADR-007
    ├── research/
    │   ├── survey-wave1.md
    │   ├── survey-dashboard.md
    │   └── user-interviews.md
    ├── brand/
    └── product/
        ├── strategy.md              ← GTM, ICP, messaging (single source of truth)
        ├── personas.md
        └── metrics.md
```

---

## 3. Backend API Endpoints (backend/main.py)

Base URL: `http://localhost:8000` (dev) / Railway URL (prod, set via `VITE_API_URL`)

| Endpoint | Method | Key response fields |
|---|---|---|
| `/quote/{ticker}` | GET | price, companyName, beta, 52wHigh/Low |
| `/ratios/{ticker}` | GET | peRatio, grossMargin, fcfYield, revenueGrowth |
| `/history/{ticker}` | GET | candles[] (OHLCV, default 1Y) |
| `/financials/{ticker}` | GET | revenue, netIncome, grossProfit (4 years) |
| `/insider/{ticker}` | GET | SEC EDGAR Form 4 trades |
| `/news/{ticker}` | GET | Yahoo Finance RSS articles |
| `/score/{ticker}` | GET | fitScore, scores{}, **explanations{}**, **sources[]** |
| `/ai/chat` | POST | content (AI text), **sources[]** |

`/score` returns `explanations{}` (plain-language per factor) and `sources[]` (named attribution per metric). Both must render in the UI — ADR-007.

---

## 4. Data Sources

| Data | Source | Key? |
|---|---|---|
| Price, fundamentals, ratios, news | Yahoo Finance (`yfinance`) | No |
| Insider trades | SEC EDGAR Form 4 | No |
| AI insights | Groq API — `llama-3.3-70b-versatile` | Yes (`GROQ_API_KEY`) |

---

## 5. State

- No Redux/Zustand — component `useState` only
- Persistence: `localStorage` via `lib/storage.js`
- Backend cache: 5-min TTL in-memory (`_cache` dict in `main.py`)
- API base URL: `import.meta.env.VITE_API_URL || 'http://localhost:8000'` in `lib/fmp.js`
