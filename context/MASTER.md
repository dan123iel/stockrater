# pondex_ — Project Master Context

## 1. Core Purpose

pondex_ reduces signal-to-noise in stock research. Plain-language verdict for any stock, every number cites its named source. Target user: self-directed value investor (EU-NW), previously paid for research tools, churned because noise wasn't solved.

**The North Star (overrides all other product decisions):**
> "A product so good, people tell their friends."

**The product law that follows from it:**
> Never build vitamins. Only painkillers. pondex solves a real, expensive pain (signal/noise). Every feature either makes that pain go away — or it doesn't belong here.

**The one technical constraint that overrides everything:** Every AI output and every displayed metric must cite its named primary source. No number without attribution. This is not optional.

**How we build:** Continuous Discovery (Cagan) running in parallel with Delivery. We never ship a feature that hasn't passed all four risk gates. See `docs/product/PRODUCT-JOURNEY.md`.

---

## Feature Discovery & Product Governance (Automatic Trigger)

Whenever the user asks to design, plan, or implement a **NEW FEATURE**, a **NEW DATA SOURCE**, or a **MAJOR ARCHITECTURAL CHANGE**, you MUST automatically execute the following workflow before writing any code:

1. **Context Retrieval:** Read `docs/product/PRODUCT-COUNCIL.md` AND scan all files in `docs/research/` — always use the most current survey data available (check `docs/research/survey-wave1.md` and any newer wave files). The live dashboard at `https://dan123iel.github.io/survey/` reflects the latest n — reference it for current numbers.
2. **Phase 1 & 2 Audit:** Evaluate against the council criteria (Usability, Feasibility, Regulatory, Economics) AND validate against the empirical user data — does this feature solve a confirmed pain point of the target group, or does it clash with their preferences or willingness-to-pay?
3. **Structured Response:** Open your response with the mandatory assessment block:

> 🏛️ **Product Council & Research Audit**
>
> **7 Startup Laws:**
> - **Law 1 — Word of Mouth:** Will users tell friends about this? Painkiller or vitamin?
> - **Law 2 — Simplicity:** Does this keep the product explainable in 2–3 sentences?
> - **Law 3 — Trend:** Does this ride a real trend (obsessive daily use) or a fake one?
> - **Law 4 — Ambitious Vision:** Does this expand or shrink the vision?
>
> **Cagan 4 Risk Gates:**
> - **Value Risk:** Do we have evidence users want this? (survey n + finding)
> - **Usability Risk:** Can users understand and use this without help?
> - **Feasibility Risk:** Can we build this reliably with our current stack?
> - **Viability Risk:** Legal/compliance exposure + API/infrastructure cost?
>
> **Verdict:** Go / Refine / Hold — and where new files will be placed.

*Skip this entire step ONLY if the request is a simple bug fix, minor refactoring of existing logic, or a pure informational Q&A.*

---

## 2. Workspace Map

### Product context (read before any product decision)

| File | Phase | Purpose |
|---|---|---|
| `docs/product/PRODUCT-JOURNEY.md` | All | **Start here** — full Cagan journey, where code lives, weekly rhythm |
| `docs/product/vision.md` | 1 — Framing | 2–5 year direction |
| `docs/product/strategy.md` | 1 — Framing | GTM, ICP, messaging, growth hypothesis |
| `docs/product/personas.md` | 1 — Framing | ICP profiles from survey |
| `docs/product/metrics.md` | 1 — Framing | OKRs, 30-day retention target |
| `docs/PROJECT-BRIEF.md` | 1 — Framing | What, for whom, why |
| `docs/discovery/user-interviews.md` | 2 — Discovery | Interview guide, Gunnar Leu contact, session notes |
| `docs/research/surveys/2026-06-29_wave1/2026-06-29_survey-wave1-insights.md` | 2 — Discovery | Survey strategic insights (→ live: dan123iel.github.io/survey/) |
| `docs/research/surveys/2026-06-29_wave1/2026-06-29_survey-wave1-analysis.md` | 2 — Discovery | Full playbook analysis report (Cagan phases 1–5, personas, so-what) |
| `docs/research/_playbooks/` | 2 — Discovery | Analysis playbook (master + execution guide) — reuse for every wave |
| `docs/regulatory/REGULATORY.md` | All | Legal boundaries, MiFID II / GDPR / EU AI Act, prohibited features, Phase 2 checklist |
| `docs/PRD.md` | 3 — Prototype | Requirements after validation |
| `docs/USER-STORIES.md` | 3 — Prototype | Stories in INVEST format |
| `docs/specs/` | 3 — Prototype | Feature specs (only written after validation) |
| `docs/ROADMAP.md` | 4 — Delivery | What's in scope now vs later |
| `docs/adr/` | 4 — Delivery | Architecture decisions (ADR-001 → ADR-009) |

### Engineering context (read before writing any code)

| File | Purpose |
|---|---|
| `context/architecture.md` | Full directory map, all API endpoints, data sources |
| `context/tech-stack.md` | Approved tech only — no FMP, no OpenAI |
| `context/coding-guidelines.md` | Code style, error handling, Definition of Done |

---

## 3. Repository Structure Rulebook

You operate as a strict Senior Developer. You must strictly adhere to the existing modular repository structure. It is forbidden to create monolithic files, bloat single components, or mix architectural layers.

### Backend

| Path | What belongs here | What does NOT belong here |
|---|---|---|
| `backend/app/main.py` | App init, CORS/Middleware, `include_router()` calls ONLY | Business logic, direct endpoints, external API calls |
| `backend/app/api/` | API routers and endpoint definitions (Pydantic Request/Response). One file per domain. | Service logic, API client code |
| `backend/app/services/` | External API integrations and core algorithms (`yahoo.py`, `groq.py`, `sec_edgar.py`). API keys via `core/config.py` ONLY. | Routing, request parsing, hardcoded credentials |
| `backend/app/core/` | Centralized config (`config.py`) and infrastructure utilities like caching (`cache.py`) | Domain logic, endpoints |

### Frontend

| Path | What belongs here | What does NOT belong here |
|---|---|---|
| `frontend/src/pages/` | High-level route views. NEVER become monoliths. | Inline data fetching logic, large JSX blocks |
| `frontend/src/components/tabs/` | All tab contents for large views — isolated standalone components, loaded via `React.lazy()` + `<Suspense>` | Anything not a tab section |
| `frontend/src/components/tiles/` | Reusable base UI tiles for data visualization | Page-level logic |
| `frontend/src/components/ui/` | Shadcn components — **auto-generated, NEVER edit manually** | Anything custom |
| `frontend/src/lib/fmp.js` | API client — calls pondex backend ONLY | Direct third-party API calls |

---

## 4. Forbidden Anti-Patterns (Immediate Failure Criteria)

1. **No Monoliths.** Do not add new endpoints to `backend/app/main.py`. Every new domain = new `services/x.py` + new `api/x.py` + one `include_router()` line in `main.py`.

2. **No Direct Frontend-to-Third-Party Calls.** The frontend communicates *exclusively* with the pondex FastAPI backend. Yahoo Finance, SEC EDGAR, Groq, FMP must NEVER be called directly from the browser — this leaks credentials and breaks CORS.

3. **No Legacy File.** `backend/main.py` is deleted. Do NOT recreate, reference, or import it.

4. **No Score Before Explanation.** Plain-language factor explanation renders before the score number. ADR-007.

5. **No Unapproved APIs.** No FMP. No OpenAI. No Anthropic. Data = Yahoo Finance + SEC EDGAR. AI = Groq Llama 3.3 70B. ADR-005, ADR-006.

6. **No Spec Before Validation.** Write a feature spec only after it passes all 4 Cagan risk gates (Value, Usability, Feasibility, Viability).

7. **No Dirty Commits.** Never commit `venv/`, `node_modules/`, `.env`, `dist/`, `__pycache__/`.

---

## 5. Workflow for New Features or Data Sources

Before writing any code, you MUST state where files will be placed.

**Required response format:**
> "To add data source X, I will create `backend/app/services/x.py` for the fetch logic and `backend/app/api/x.py` for the router. The frontend will call it via `frontend/src/lib/fmp.js`."

This declaration is not optional. It prevents architectural drift before a single line is written.

---

## 6. Current Milestone

**Phase 1 — MVP** · OKR: 30-day retention > 40% with first 10 real users · Target: 15 July 2026

→ **`docs/CURRENT-TODOS.md`** — Vollständige aktuelle To-Do-Liste (Discovery + Code), täglich lesen.

In scope:
- 12-tab analytics (Scorecard, Chart, Valuation, DCF, News, Insider, AI, Ownership, Profile + 3× coming soon)
- Explanation-first UX + source attribution per metric
- 6 nav pages: Analyze, Markets, Macro, Ideas, Watchlist, Portfolio
- Live: https://dan123iel.github.io/stockrater/

Not in scope until Phase 2: Login, Stripe, Macro Hub, Multilingual, Dark mode.

→ `docs/specs/ROADMAP.md` for full phase breakdown.
→ `docs/product/PRODUCT-JOURNEY.md` for the full Cagan journey.
