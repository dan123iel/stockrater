# pondex_

> Stock research with a clear audit trail. Plain-language verdicts. Every number cites its source.

---

## Quick Start

### Option A — Docker (ein Befehl)

```bash
cp backend/.env.example backend/.env   # GROQ_API_KEY eintragen
cp frontend/.env.example frontend/.env
docker compose up
# Backend → http://localhost:8000
# Frontend → http://localhost:5174
```

### Option B — Lokal ohne Docker

```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env    # GROQ_API_KEY eintragen
uvicorn main:app --reload --port 8000

# Frontend (neues Terminal)
cd frontend
npm install
cp .env.example .env
npm run dev             # → http://localhost:5174
```

---

## Struktur

```
pondex/
├── CLAUDE.md                    ← AI agent context (auto-loaded by Claude Code)
├── README.md
├── docker-compose.yml           ← Startet Backend + Frontend mit einem Befehl
│
├── .project-context/            ← Regelwerk für alle AI-Agenten
│   ├── MASTER.md
│   └── context/
│       ├── architecture.md
│       ├── tech-stack.md
│       └── coding-guidelines.md
│
├── backend/                     ← FastAPI (Python)
│   ├── main.py                  ← Alle Endpoints
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── frontend/                    ← React + Vite + Tailwind
│   ├── src/
│   │   ├── pages/               ← Analysis, Markets, Macro, Ideas, Portfolio, Watchlist
│   │   ├── components/
│   │   │   ├── tiles/           ← Analyse-Tiles (Chart, Valuation, DCF, ...)
│   │   │   └── ui/              ← shadcn — NICHT BEARBEITEN
│   │   └── lib/
│   │       ├── fmp.js           ← API-Client → ruft backend/ auf
│   │       └── storage.js       ← localStorage
│   ├── Dockerfile
│   └── .env.example             ← VITE_API_URL
│
├── design/
│   ├── wireframes/              ← 21 ASCII-Wireframes (lesbar für AI-Agenten)
│   └── reference/
│       └── pondex-v1.html       ← Original-Prototyp
│
└── doc/                         ← Single Source of Truth
    ├── PROJECT-BRIEF.md
    ├── PRD.md
    ├── ROADMAP.md
    ├── USER-STORIES.md
    ├── adr/                     ← Architecture Decision Records
    ├── research/
    │   ├── survey-wave1.md      ← Survey-Ergebnisse (n=45)
    │   ├── survey-dashboard.md  ← Dashboard-Doku + Wave 2
    │   └── user-interviews.md   ← Interview-Guide (Gunnar Leu #1)
    ├── brand/
    └── product/
        ├── strategy.md          ← GTM, ICP, Messaging, Roadmap-Übersicht
        ├── personas.md
        └── metrics.md
```

---

## Stack

| Layer | Tech | Warum |
|---|---|---|
| Frontend | React 18 + Vite + Tailwind | `frontend/` |
| Backend | Python FastAPI | `backend/` |
| Marktdaten | Yahoo Finance (`yfinance`) | Kostenlos, kein API-Key |
| Insider | SEC EDGAR Form 4 | Kostenlos |
| AI | Groq Llama 3.3 70B | `GROQ_API_KEY` erforderlich |
| Deploy | Vercel (FE) + Railway (BE) | ~$5/mo |

**Keine bezahlten Daten-APIs. Kein OpenAI. Kein FMP.**

---

## Dokumentation

| Was | Wo |
|---|---|
| Projektziele & Scope | `doc/PROJECT-BRIEF.md` |
| User Segments & Features | `doc/PRD.md` |
| Roadmap | `doc/ROADMAP.md` |
| User Stories | `doc/USER-STORIES.md` |
| GTM, ICP, Messaging | `doc/product/strategy.md` |
| Architektur-Entscheidungen | `doc/adr/` |
| Survey-Ergebnisse | `doc/research/survey-wave1.md` |
| Interview-Guide | `doc/research/user-interviews.md` |

---

## Status

Active development — Phase 1 MVP · Target: 15 July 2026

---

## License

MIT
