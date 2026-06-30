# pondex_ — Project Master Context

## 1. Core Purpose

pondex_ reduces signal-to-noise in stock research. It gives any stock a plain-language verdict with a traceable source for every number. Target user: self-directed value investor (EU-NW), previously paid for research tools, churned because noise wasn't solved.

**The one constraint that overrides everything:** Every AI output and every displayed metric must cite its named primary source. No number without attribution. This is not optional.

---

## 2. Workspace Map

Every agent working in this repository must read this file first, then the relevant sub-files below.

| File | Purpose |
|---|---|
| `.project-context/MASTER.md` | This file — entry point, rules, current milestone |
| `.project-context/context/architecture.md` | Stack, data flow, API endpoints, component map |
| `.project-context/context/tech-stack.md` | Approved tech only — no FMP, no OpenAI |
| `.project-context/context/coding-guidelines.md` | Code style, error handling, Definition of Done |

Full product documentation lives in `doc/` — read `doc/PROJECT-BRIEF.md` and `doc/PRD.md` before making product decisions.

---

## 3. Execution Rules for Every Agent

1. **Read this file first.** Before writing any code or making any file change, read `MASTER.md` and the relevant context sub-files.
2. **No unapproved dependencies.** Check `tech-stack.md` before adding any library or API.
3. **Source attribution is mandatory.** Every metric shown in the UI must display its data source. Every AI response must include `sources[]`. Non-negotiable — see ADR-007.
4. **Explanation before score.** The score is a conclusion, not an entry point. Plain-language explanation renders first. See ADR-007.
5. **Update docs when structure changes.** If you add a page, endpoint, or component, update `architecture.md` and this file's workspace map.
6. **Verify before declaring done.** Run `npm run build` (frontend) and check that all intended files exist. Do not report a task complete without verifying it.

---

## 4. What NOT to do

- Do not use FMP (Financial Modeling Prep) — use Yahoo Finance via yfinance. See ADR-005.
- Do not use OpenAI or Anthropic/Claude for AI features — use Groq Llama 3.3 70B. See ADR-006.
- Do not show a score without first showing an explanation. See ADR-007.
- Do not add features not in `doc/ROADMAP.md` Phase 1 without updating the roadmap.
- Do not commit `venv/`, `node_modules/`, `.env`, or `dist/`.

---

## 5. Current Milestone

**Phase 1 — MVP** (Target: 15 July 2026)

In scope now:
- 12-tab analytics layout (Scorecard, Chart, Valuation, DCF, News, Insider, AI, Ownership, Profile + 3× coming soon)
- Explanation-first UX with source attribution per metric
- All 6 nav pages functional (Analyze, Markets, Macro, Ideas, Watchlist, Portfolio)
- Backend running on Railway (not just localhost)

Not in scope until Phase 2: Login, Stripe, Macro Hub, Multilingual, Portfolio tracking.

See `doc/ROADMAP.md` for full phase breakdown.
