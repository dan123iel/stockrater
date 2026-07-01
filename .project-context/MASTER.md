# pondex_ — Project Master Context

## 1. Core Purpose

pondex_ reduces signal-to-noise in stock research. Plain-language verdict for any stock, every number cites its named source. Target user: self-directed value investor (EU-NW), previously paid for research tools, churned because noise wasn't solved.

**The one constraint that overrides everything:** Every AI output and every displayed metric must cite its named primary source. No number without attribution. This is not optional.

**How we build:** Continuous Discovery (Cagan) running in parallel with Delivery. We never ship a feature that hasn't passed all four risk gates. See `doc/product/PRODUCT-JOURNEY.md`.

---

## 2. Workspace Map

### Product context (read before making any product decision)

| File | Phase | Purpose |
|---|---|---|
| `doc/product/PRODUCT-JOURNEY.md` | All | **Start here** — full Cagan journey, where code lives, weekly rhythm |
| `doc/product/vision.md` | 1 — Framing | 2–5 year direction |
| `doc/product/strategy.md` | 1 — Framing | GTM, ICP, messaging, growth hypothesis |
| `doc/product/personas.md` | 1 — Framing | ICP profiles from survey |
| `doc/product/metrics.md` | 1 — Framing | OKRs, 30-day retention target |
| `doc/PROJECT-BRIEF.md` | 1 — Framing | What, for whom, why |
| `doc/discovery/user-interviews.md` | 2 — Discovery | Interview guide, Gunnar Leu contact, session notes |
| `doc/discovery/competitor-analysis.md` | 2 — Discovery | What exists, why it fails |
| `doc/research/survey-wave1.md` | 2 — Discovery | Survey findings (→ live: dan123iel.github.io/survey/) |
| `doc/research/survey-dashboard.md` | 2 — Discovery | Dashboard docs, Wave 2 plan |
| `doc/PRD.md` | 3 — Prototype | Requirements after validation |
| `doc/USER-STORIES.md` | 3 — Prototype | Stories in INVEST format |
| `doc/specs/` | 3 — Prototype | Feature specs (only written after validation) |
| `doc/ROADMAP.md` | 4 — Delivery | What's in scope now vs later |
| `doc/adr/` | 4 — Delivery | Architecture decisions (ADR-001 → ADR-007) |

### Engineering context (read before writing any code)

| File | Purpose |
|---|---|
| `.project-context/context/architecture.md` | Full directory map, all API endpoints, data sources |
| `.project-context/context/tech-stack.md` | Approved tech only — no FMP, no OpenAI |
| `.project-context/context/coding-guidelines.md` | Code style, error handling, Definition of Done |

---

## 3. Where Code Lives

| What | Path | Notes |
|---|---|---|
| Frontend pages | `frontend/src/pages/` | One file per view |
| Reusable components | `frontend/src/components/` | Tiles, Nav, Panels |
| shadcn UI | `frontend/src/components/ui/` | ⚠ DO NOT EDIT |
| API client | `frontend/src/lib/fmp.js` | Calls backend, not FMP |
| LocalStorage | `frontend/src/lib/storage.js` | All user persistence |
| CSS variables | `frontend/src/index.css` | All design tokens |
| All API endpoints | `backend/main.py` | Single file, intentional |
| ASCII wireframes | `design/wireframes/` | Readable by AI agents |
| Original prototype | `design/reference/pondex-v1.html` | Phase 3 reference |

---

## 4. Execution Rules

1. **Read `doc/product/PRODUCT-JOURNEY.md` first** for any product decision.
2. **Read this file + relevant context sub-files** before any code change.
3. **No unapproved dependencies.** Check `tech-stack.md` before adding anything.
4. **Source attribution is mandatory.** Every metric shows its source. Every AI response includes `sources[]`. ADR-007.
5. **Explanation before score.** Plain-language text renders before the number. ADR-007.
6. **Do not touch `frontend/src/components/ui/`** — shadcn-generated.
7. **Specs only after validation.** Don't write a spec for something that hasn't passed all 4 Cagan risk gates.
8. **Update docs when structure changes.** New page, endpoint, or component → update `architecture.md` and this file.
9. **Verify before done.** `npm run build` + file check + FMP grep + commit + push. See `coding-guidelines.md`.

---

## 5. What NOT to do

- Do not use FMP — Yahoo Finance via yfinance only. ADR-005.
- Do not use OpenAI or Claude for AI — Groq Llama 3.3 70B only. ADR-006.
- Do not show score before explanation. ADR-007.
- Do not edit `frontend/src/components/ui/`.
- Do not add features outside Phase 1 scope without updating `doc/ROADMAP.md`.
- Do not write a spec before passing all 4 risk gates (Value, Usability, Feasibility, Viability).
- Do not commit `venv/`, `node_modules/`, `.env`, `dist/`, `__pycache__/`.

---

## 6. Current Milestone

**Phase 1 — MVP** · OKR: 30-day retention > 40% with first 10 real users · Target: 15 July 2026

In scope:
- 12-tab analytics (Scorecard, Chart, Valuation, DCF, News, Insider, AI, Ownership, Profile + 3× coming soon)
- Explanation-first UX + source attribution per metric
- 6 nav pages: Analyze, Markets, Macro, Ideas, Watchlist, Portfolio
- Live at: https://dan123iel.github.io/stockrater/

Not in scope until Phase 2: Login, Stripe, Macro Hub, Multilingual, Dark mode.

→ Full phase breakdown: `doc/ROADMAP.md`
→ Full journey: `doc/product/PRODUCT-JOURNEY.md`
