# pondex_ — Architecture & Data Flow

## 1. System Overview

Two-tier: React frontend + FastAPI backend. No database. No auth (Phase 1).

```
Browser (React + Vite)  →  fetch()  →  FastAPI (port 8000)  →  yfinance / SEC EDGAR / Groq
```

---

## 2. Full Directory Map

```
pondex/                         ← Git repo root (.git is here)
│
├── CLAUDE.md                   ← Auto-loaded AI context
├── README.md                   ← Human quick start
├── STRATEGY.md                 ← GTM, ICP, messaging (non-technical)
├── .gitignore
│
├── .project-context/           ← AI agent rules (this system)
│   ├── MASTER.md
│   └── context/
│       ├── architecture.md     ← This file
│       ├── tech-stack.md
│       └── coding-guidelines.md
│
├── backend/                    ← FastAPI Python backend
│   ├── main.py                 ← ALL endpoints are here (single file)
│   ├── requirements.txt
│   └── .env.example
│
├── code/                       ← React + Vite frontend
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── App.jsx             ← Router (single route → Home)
│       ├── main.jsx
│       ├── index.css           ← ALL CSS variables / design tokens
│       ├── pages/
│       │   ├── Home.jsx        ← View switcher (no URL routes)
│       │   ├── Analysis.jsx    ← 12-tab analytics (main feature)
│       │   ├── Markets.jsx     ← Index overview + quick analyze
│       │   ├── Macro.jsx
│       │   ├── Ideas.jsx
│       │   ├── Portfolio.jsx
│       │   └── Watchlist.jsx
│       ├── components/
│       │   ├── Nav.jsx         ← 6 links: Analyze, Markets, Macro, Ideas, Watchlist, Portfolio
│       │   ├── ScoreHero.jsx   ← Explanation-first score panel (ADR-007)
│       │   ├── SettingsPanel.jsx
│       │   ├── ThesisDrawer.jsx
│       │   ├── InvestmentMemo.jsx
│       │   ├── tiles/          ← ChartTile, ValuationTile, DCFTile, NewsTile, InsiderTile, AllInsightsTile
│       │   └── ui/             ← shadcn components (do not edit)
│       └── lib/
│           ├── fmp.js          ← API client → calls backend (NOT FMP directly)
│           ├── storage.js      ← localStorage helpers
│           └── scoring.js      ← Client-side scoring (fallback; backend /score is primary)
│
├── doc/                        ← All documentation
│   ├── PROJECT-BRIEF.md
│   ├── PRD.md
│   ├── ROADMAP.md
│   ├── ARCHITECTURE.md         ← Extended version of this file
│   ├── research/
│   │   └── survey-wave1.md     ← n=45, June 2026
│   └── adr/
│       ├── ADR-005-yahoo-finance-no-fmp.md
│       ├── ADR-006-groq-llama-no-openai.md
│       └── ADR-007-explanation-first-ux.md
│
└── design/
    ├── wireframes/             ← ASCII wireframes (all screens)
    └── reference/
        └── pondex-v1.html      ← Original single-file prototype
```

---

## 3. Backend API Endpoints (backend/main.py)

Base URL: `http://localhost:8000` (dev) / Railway URL (prod)

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

`/score` returns `explanations{}` (plain-language per factor) and `sources[]` (named attribution per metric). Both must be rendered. Non-negotiable — ADR-007.

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
- Persistence: `localStorage` via `lib/storage.js` (profile, watchlist, portfolio, thesis, chat)
- Backend cache: 5-min TTL in-memory (`_cache` dict in main.py)
