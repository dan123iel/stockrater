# pondex_ — Architecture & Data Flow

## 1. System Overview

Two-tier architecture: React frontend + FastAPI backend. No database. No auth layer (Phase 1).

```
Browser (React + Vite)
    ↓ fetch()
FastAPI (Python, port 8000)
    ↓ yfinance / SEC EDGAR / Groq API
External data sources (read-only)
```

---

## 2. Directory Map

```
NEW/
├── .project-context/       ← AI agent context (this system)
├── README.md               ← Human-readable start guide
├── STRATEGY.md             ← GTM, ICP, messaging
├── doc/                    ← Product + engineering documentation
│   ├── PROJECT-BRIEF.md
│   ├── PRD.md
│   ├── ROADMAP.md
│   ├── ARCHITECTURE.md     ← Extended architecture notes
│   ├── research/survey-wave1.md
│   └── adr/                ← Architecture Decision Records
├── design/
│   ├── wireframes/         ← ASCII wireframes (all screens)
│   └── reference/pondex-v1.html  ← Original prototype
├── backend/
│   ├── main.py             ← All API endpoints
│   └── requirements.txt
└── code/
    └── src/
        ├── App.jsx         ← Router (single route → Home)
        ├── pages/
        │   ├── Home.jsx        ← View switcher (no URL routes)
        │   ├── Analysis.jsx    ← 12-tab analytics
        │   ├── Markets.jsx     ← Index overview + quick analyze
        │   ├── Macro.jsx
        │   ├── Ideas.jsx
        │   ├── Portfolio.jsx
        │   └── Watchlist.jsx
        ├── components/
        │   ├── Nav.jsx         ← 6 links: Analyze, Markets, Macro, Ideas, Watchlist, Portfolio
        │   ├── ScoreHero.jsx   ← Explanation-first score panel (ADR-007)
        │   ├── tiles/          ← ChartTile, ValuationTile, DCFTile, NewsTile, InsiderTile, AllInsightsTile
        │   └── ...
        └── lib/
            ├── fmp.js          ← API client (calls backend, not FMP)
            └── scoring.js      ← Client-side scoring (fallback only — backend /score is primary)
```

---

## 3. Backend API Endpoints

Base URL: `http://localhost:8000` (dev) / Railway URL (prod)

| Endpoint | Method | Returns |
|---|---|---|
| `/quote/{ticker}` | GET | Price, company info, beta, 52W range |
| `/ratios/{ticker}` | GET | P/E, margins, FCF yield, revenue growth |
| `/history/{ticker}` | GET | OHLCV candles (default: 1Y) |
| `/financials/{ticker}` | GET | Income statements (4 years) |
| `/insider/{ticker}` | GET | SEC EDGAR Form 4 trades |
| `/news/{ticker}` | GET | Yahoo Finance RSS articles |
| `/score/{ticker}` | GET | fitScore, scores{}, **explanations{}**, **sources[]** |
| `/ai/chat` | POST | AI response + **sources[]** (Groq Llama 3.3 70B) |

**Critical:** `/score` returns `explanations{}` (plain-language per factor) and `sources[]` (named attribution per metric). Frontend must display both. See ADR-007.

---

## 4. Data Sources

| Data | Source | API Key? |
|---|---|---|
| Price, fundamentals, ratios | Yahoo Finance (`yfinance`) | No |
| Income statements | Yahoo Finance (`yfinance`) | No |
| Insider trades | SEC EDGAR Form 4 + yfinance fallback | No |
| News | Yahoo Finance RSS | No |
| AI insights | Groq API (Llama 3.3 70B) | Yes — `GROQ_API_KEY` in `.env` |

---

## 5. State Management

- No global state library (no Redux/Zustand)
- Component-level `useState` for UI state
- `localStorage` for user profile, watchlist, portfolio, thesis notes, chat history
- Backend in-memory cache (5-min TTL) for Yahoo Finance rate-limit protection
