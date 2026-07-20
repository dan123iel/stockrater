# pondex

> Stock research with a clear audit trail.
> Plain-language verdicts. Every number cites its source.

**Status:** Phase 1 — Landing Page (Lovable) · July 2026
**Live app:** https://dan123iel.github.io/stockrater/
**Backend:** Railway (live) · Frontend: GitHub Pages

---

## What is pondex?

pondex is a stock research tool for self-directed retail investors.
Source-cited verdict on any stock in under 60 seconds — no jargon, no noise.

**USP:** Every number shows its named primary source + date.
Broker-agnostic — works with IBKR, Trade Republic, Comdirect, Degiro.

---

## Quick Start (existing React + FastAPI app)

```bash
# Backend
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env    # add GROQ_API_KEY
uvicorn app.main:app --reload --port 8000

# Frontend
cd frontend
npm install && npm run dev    # → http://localhost:5174

# Or both
docker compose up
```

---

## Project Structure

```
pondex/
├── CLAUDE.md                    ← AI agent instructions
├── README.md
├── docker-compose.yml
│
├── context/                     ← AI agent rules + workspace map
│   └── MASTER.md
│
├── backend/                     ← FastAPI + Yahoo Finance + SEC EDGAR + Groq
├── frontend/                    ← React + Vite + Tailwind + shadcn (existing app)
│
├── docs/                        ← Single source of truth — all documentation
│   ├── CURRENT-TODOS.md         ← Active tasks
│   ├── STRUCTURE.md             ← Folder rules (permanent)
│   │
│   ├── specs/                   ← Feature specs + Lovable build prompts
│   │   ├── ROADMAP.md           ← Phase 1–7 full roadmap
│   │   ├── PRD.md
│   │   ├── APP-DESIGN-SPEC.md          ← Master UI/UX spec (nav, screens, states)
│   │   ├── EXIT-STRATEGY-SPEC.md
│   │   ├── LOVABLE-PHASE1-LANDING.md   ← Lovable prompt: Landing Page  ← START HERE
│   │   ├── LOVABLE-PHASE2-AUTH-SHELL.md
│   │   └── LOVABLE-PHASE3-LIVE-SCORING-STRIPE.md
│   │
│   ├── product/
│   │   ├── vision.md            ← North Star + Phase 1→7 journey
│   │   └── strategy.md          ← ICP, positioning, competitive moat
│   │
│   ├── research/
│   │   ├── surveys/             ← Wave 1 (n=56) + Wave 2 (n=35)
│   │   ├── interviews/          ← Patricia, Gunnar, José transcripts
│   │   ├── analysis/            ← Research Council reports (22 experts)
│   │   └── competitors/
│   │       ├── COMPETITIVE-INTELLIGENCE.md
│   │       └── revolut-analysis.md   ← Full Revolut product teardown
│   │
│   ├── architecture/
│   │   └── DATA-SOURCES-STRATEGY.md  ← Yahoo→Massive.com migration plan
│   │
│   └── regulatory/
│       ├── REGULATORY-COUNCIL.md
│       ├── PRIVACY-POLICY-TEMPLATE.md
│       └── TERMS-OF-SERVICE-TEMPLATE.md
```

---

## Tech Stack

| Layer | Tech | Note |
|---|---|---|
| Frontend (existing) | React 18 + Vite + Tailwind + shadcn | `frontend/` |
| Frontend (Lovable) | React + Vite + Tailwind + Framer Motion | Phase 1 landing page |
| Backend | Python FastAPI | `backend/` |
| Market data | Yahoo Finance (Phase 1) → Massive.com (Phase 2+) | See DATA-SOURCES-STRATEGY.md |
| Filings | SEC EDGAR XBRL | Free, official |
| AI | Groq Llama 3.3 70B | `GROQ_API_KEY` required |
| Auth + DB | Supabase (Phase 2+) | |
| Payments | Stripe (Phase 2+) | |
| 3D Globe | react-globe.gl (Phase 3) | World map feature |

---

## Build Roadmap

| Phase | What | Status |
|---|---|---|
| 1 | Landing Page (Lovable) | 🔄 **Next — start here** |
| 2 | Auth + Dashboard + Supabase Schema | ⏳ After Phase 1 deployed |
| 3 | Live Data + Scoring + Stripe + 3D Globe | ⏳ After Phase 2 tested |
| 4 | SEO, multilingual DE/ES, affiliate | 📋 2027 |
| 5 | Broker affiliate links | 📋 Future |
| 6 | White-label broker partner | 📋 Vision |
| 7 | Licensed investment platform | 📋 Long-term |

---

## Key Documents

| What | Where |
|---|---|
| **START HERE: Lovable Phase 1 prompt** | `docs/specs/LOVABLE-PHASE1-LANDING.md` |
| Full app UI/UX spec (all screens, nav, states) | `docs/specs/APP-DESIGN-SPEC.md` |
| Phase 1–7 roadmap | `docs/specs/ROADMAP.md` |
| Active tasks | `docs/CURRENT-TODOS.md` |
| Data provider strategy (Yahoo→Massive.com) | `docs/architecture/DATA-SOURCES-STRATEGY.md` |
| Revolut product teardown | `docs/research/competitors/revolut-analysis.md` |
| Research Council report | `docs/research/analysis/2026-07-16_research-council-report-internal.md` |
| Regulatory checklist | `docs/regulatory/REGULATORY-COUNCIL.md` |

---

## License

MIT
