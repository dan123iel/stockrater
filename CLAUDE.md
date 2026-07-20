# pondex_ — CLAUDE.md

> Auto-loaded by Claude Code at session start.
> This file is intentionally short — the full rules live in `context/`.

---

## Start here

1. Read `context/MASTER.md` — workspace map, rules, current milestone
2. Read `docs/product/PRODUCT-JOURNEY.md` — Cagan phases, where code lives
3. Read `docs/STRUCTURE.md` — canonical folder structure (permanent, do not deviate)

---

## Run commands

```bash
# Backend (modular — run from backend/)
cd backend && uvicorn app.main:app --reload --port 8000

# Frontend
cd frontend && npm run dev        # → http://localhost:5173/stockrater/
npm run build                     # production build

# Both at once (dev only)
docker compose up
```

---

## Current milestone

**Phase 1 — MVP** · OKR: 30-day retention > 40% with first 10 real users
Live: https://dan123iel.github.io/stockrater/
Backend: Railway (not yet deployed — still localhost)

Next action: Push Landing Page changes to GitHub

---

## Council-System

Vor nicht-trivialen Entscheidungen immer den passenden Council einberufen.

| Was | Council | Datei |
|---|---|---|
| Landing Page, Hero, CTA, Conversion | **Website Council** | `docs/product/WEBSITE-COUNCIL.md` |
| Features, Roadmap, JTBD | **Product Council** | `docs/product/COUNCIL-METHODOLOGY.md` |
| Survey/Interview-Auswertung | **Research Council** | `docs/research/_playbooks/research-council.md` |
| Score-Logik, Verdict, Daten | **Investment Intelligence Council** | `docs/product/WEBSITE-COUNCIL.md` |

**Trivialitäts-Check zuerst** — kein Council für Bugfixes, Typos, kleine Tweaks.

---

## Design-System

Farb-Palette (alle Landing-Page-Components):
```
white: #FFFFFF  |  100: #D6D6D6  |  200: #AFAFAF  |  300: #898989
400: #656565    |  500: #434343  |  600: #242424  |  black: #000000
```
→ `frontend/src/lib/colors.js` — niemals Hard-Code-Farben, immer `C.*`

Typografie: `Interdisplay` (Headlines) + `Chivo Mono` (Details)

---

## Landing Page

Struktur (verifiziert durch 107-Agent Deep Research, Juli 2026):
```
Hero → Testimonials → HowItWorks → Demo → Differentiation → Features → Pricing → FAQ → CTA
```
Playbook: `docs/specs/LANDING-PAGE-PLAYBOOK.md`
Offene TODOs: `docs/CURRENT-TODOS.md` → Sektion „Landing Page Roadmap"
