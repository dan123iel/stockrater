# pondex_ — CLAUDE.md

This file is loaded automatically by Claude Code on every session in this directory.

## What to read first

Before doing anything, read these files in order:

1. `.project-context/MASTER.md` — purpose, rules, current milestone, what NOT to do
2. `.project-context/context/architecture.md` — where every file lives, all API endpoints
3. `.project-context/context/tech-stack.md` — approved tech only (no FMP, no OpenAI)
4. `.project-context/context/coding-guidelines.md` — code rules + Definition of Done checklist

## Where things are saved — no guessing

| What | Where | Never in |
|---|---|---|
| Product decisions, roadmap, features | `doc/ROADMAP.md`, `doc/PRD.md` | Memory, chat |
| Survey data, research | `doc/research/` | Memory |
| Architecture decisions | `doc/adr/ADR-NNN-*.md` | Comments in code |
| Design tokens, CSS rules | `code/src/index.css` | Inline styles |
| AI agent rules & context | `.project-context/` | CLAUDE.md directly |
| Backend endpoints | `backend/main.py` | Separate files |
| Frontend pages | `code/src/pages/` | `components/` |
| Reusable UI components | `code/src/components/` | `pages/` |
| API client (calls backend) | `code/src/lib/fmp.js` | Components directly |
| User data (localStorage) | `code/src/lib/storage.js` | Hardcoded |
| Persistent AI memory | `~/.claude/projects/.../memory/` | This repo |

## Hard rules (enforced every session)

- **No FMP** — data comes from `backend/main.py` via Yahoo Finance (`yfinance`). `lib/fmp.js` calls the backend, not FMP.
- **No OpenAI/Claude for AI features** — Groq Llama 3.3 70B only (`GROQ_API_KEY` in `backend/.env`)
- **Every metric shows its source** — `explanations{}` and `sources[]` from `/score` endpoint must render. Non-negotiable. See `doc/adr/ADR-007-explanation-first-ux.md`.
- **Score is a conclusion** — plain-language explanation renders before the number. Never show score on screen 1.
- **Verify before done** — run `npm run build` + check files exist + no FMP refs + committed + pushed. See `coding-guidelines.md`.

## Current milestone

**Phase 1 — MVP** · Target: 15 July 2026

In scope: 12-tab analytics, explanation-first UX, source attribution, 6 nav pages, backend on Railway.
Not in scope yet: Login, Stripe, Macro Hub, Multilingual, Dark mode.

Full roadmap: `doc/ROADMAP.md`
