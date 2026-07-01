# pondex_ — CLAUDE.md

> Auto-loaded by Claude Code at session start.
> This file is intentionally short — the full rules live in `.project-context/`.

---

## Start here

1. Read `.project-context/MASTER.md` — workspace map, rules, current milestone
2. Read `doc/product/PRODUCT-JOURNEY.md` — Cagan phases, where code lives

---

## Run commands

```bash
# Backend (modular — run from backend/)
cd backend && uvicorn app.main:app --reload --port 8000

# Frontend
cd frontend && npm run dev        # → http://localhost:5174
npm run build                     # production build

# Both at once (dev only)
docker compose up
```

---

## Current milestone

**Phase 1 — MVP** · OKR: 30-day retention > 40% with first 10 real users
Live: https://dan123iel.github.io/stockrater/
Backend: Railway (not yet deployed — still localhost)

Next action: Interview Gunnar Leu → `doc/discovery/user-interviews.md`
