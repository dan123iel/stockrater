# pondex_ — Project Master Context

## 1. Core Purpose

pondex_ reduces signal-to-noise in stock research. It gives any stock a plain-language verdict with a traceable source for every number. Target user: self-directed value investor (EU-NW), previously paid for research tools, churned because noise wasn't solved.

**The one constraint that overrides everything:** Every AI output and every displayed metric must cite its named primary source. No number without attribution. This is not optional.

---

## 2. Workspace Map

| File | Purpose |
|---|---|
| `.project-context/MASTER.md` | This file — entry point, rules, current milestone |
| `.project-context/context/architecture.md` | Stack, data flow, API endpoints, full directory map |
| `.project-context/context/tech-stack.md` | Approved tech only — no FMP, no OpenAI |
| `.project-context/context/coding-guidelines.md` | Code style, error handling, Definition of Done |
| `doc/PROJECT-BRIEF.md` | What, for whom, why |
| `doc/PRD.md` | User segments, feature requirements, acceptance criteria |
| `doc/ROADMAP.md` | Phase 1/2/3 — what's in scope now |
| `doc/USER-STORIES.md` | User stories (INVEST format) derived from survey |
| `doc/research/survey-wave1.md` | Survey Wave 1 results (n=45) |
| `doc/research/survey-dashboard.md` | How the live dashboard works + Wave 2 plan |
| `doc/research/user-interviews.md` | Interview guide + contact list (Gunnar Leu priority) |
| `doc/adr/` | All architecture decisions |

---

## 3. Execution Rules

1. **Read this file first.** Before any code or file change, read MASTER.md and the relevant context sub-files.
2. **No unapproved dependencies.** Check `tech-stack.md` before adding any library or API.
3. **Source attribution is mandatory.** Every metric in the UI must show its data source. Every AI response includes `sources[]`. See ADR-007.
4. **Explanation before score.** Plain-language text renders before the score number. See ADR-007.
5. **Update docs when structure changes.** New page, endpoint, or component → update `architecture.md`.
6. **Verify before done.** Run `npm run build`, check files, grep for FMP refs, commit, push. See `coding-guidelines.md`.

---

## 4. What NOT to do

- Do not use FMP (Financial Modeling Prep) — use Yahoo Finance via yfinance. ADR-005.
- Do not use OpenAI or Anthropic/Claude for AI features — use Groq Llama 3.3 70B. ADR-006.
- Do not show a score before showing an explanation. ADR-007.
- Do not add features outside `doc/ROADMAP.md` Phase 1 without updating the roadmap first.
- Do not commit `venv/`, `node_modules/`, `.env`, `dist/`, `__pycache__/`.

---

## 5. Current Milestone

**Phase 1 — MVP** (Target: 15 July 2026)

In scope:
- 12-tab analytics (Scorecard, Chart, Valuation, DCF, News, Insider, AI, Ownership, Profile + 3× coming soon)
- Explanation-first UX with source attribution per metric
- 6 nav pages: Analyze, Markets, Macro, Ideas, Watchlist, Portfolio
- Backend deployable on Railway

Not in scope until Phase 2: Login, Stripe, Macro Hub, Multilingual, Dark mode.

→ `doc/ROADMAP.md` for full phase breakdown.
