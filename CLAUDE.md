# pondex_ — CLAUDE.md

> This file is loaded automatically by Claude Code on every session in this repository.
> Read this before touching any file.

---

## 1. What is this project?

pondex_ is a stock research tool. It gives any stock a plain-language verdict with a traceable source for every number. Built for self-directed investors who are priced out of Bloomberg or frustrated by AI that hallucinates numbers.

**The one rule that overrides everything else:** Every metric and every AI output must show its named primary source. No number without attribution.

---

## 2. Read these files first

In this order, before writing any code:

1. `.project-context/MASTER.md` — purpose, current milestone, hard rules
2. `.project-context/context/architecture.md` — where every file lives, all API endpoints
3. `.project-context/context/tech-stack.md` — approved tech only
4. `.project-context/context/coding-guidelines.md` — code rules + Definition of Done

---

## 3. Where things belong — no guessing

| What | Where |
|---|---|
| Frontend pages | `code/src/pages/` |
| Reusable components | `code/src/components/` |
| API client (calls backend) | `code/src/lib/fmp.js` |
| User data (localStorage) | `code/src/lib/storage.js` |
| CSS variables / design tokens | `code/src/index.css` |
| All backend endpoints | `backend/main.py` |
| Product decisions, roadmap | `doc/ROADMAP.md`, `doc/PRD.md` |
| Survey data, research | `doc/research/` |
| Architecture decisions | `doc/adr/ADR-NNN-*.md` |
| AI agent rules | `.project-context/` |
| Persistent AI memory | `~/.claude/projects/.../memory/` |

---

## 4. Hard rules

- **No FMP.** Data comes from `backend/main.py` via `yfinance`. `lib/fmp.js` calls the backend, not FMP.
- **No OpenAI / Claude for AI features.** Groq Llama 3.3 70B only.
- **Every metric shows its source.** `explanations{}` and `sources[]` from `/score` must render in the UI.
- **Score is a conclusion.** Explanation renders first, score number last. Never show score on screen 1.
- **Verify before reporting done.** Run `npm run build`, check files exist, grep for FMP refs, commit, push.

---

## 5. Current milestone

**Phase 1 — MVP** · Target: 15 July 2026

In scope: 12-tab analytics, explanation-first UX, source attribution, 6 nav pages.
Not yet: Login, Stripe, Macro Hub, Multilingual, Dark mode.

→ `doc/ROADMAP.md` for full breakdown.
