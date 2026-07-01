# pondex_ — Project Master Context

## 1. Core Purpose

pondex_ reduces signal-to-noise in stock research. Plain-language verdict for any stock, every number cites its named source. Target user: self-directed value investor (EU-NW), previously paid for research tools, churned because noise wasn't solved.

**The one constraint that overrides everything:** Every AI output and every displayed metric must cite its named primary source. No number without attribution. This is not optional.

**How we build:** Continuous Discovery (Cagan) running in parallel with Delivery. We never ship a feature that hasn't passed all four risk gates. See `doc/product/PRODUCT-JOURNEY.md`.

---

## Feature Discovery & Product Governance (Automatic Trigger)

Whenever the user asks to design, plan, or implement a **NEW FEATURE**, a **NEW DATA SOURCE**, or a **MAJOR ARCHITECTURAL CHANGE**, you MUST automatically execute the following workflow before writing any code:

1. **Context Retrieval:** Read and analyze `doc/product/PRODUCT-COUNCIL.md`.
2. **Phase 1 & 2 Audit:** Explicitly evaluate the proposal against Usability Risk, Feasibility Risk, Regulatory Risk, and Unit Economics.
3. **Structured Response:** Open your response with this assessment block:

> 🏛️ **Product Council Context Audit**
> - **Phase 1 (Trio):** [1 sentence on Usability/Design challenge + 1 sentence on Tech Feasibility]
> - **Phase 2 (Viability):** [1 sentence on Legal/Compliance risk + 1 sentence on Finance/API costs]
> - **File Layout:** [Exact paths where new files will be placed per the Repository Structure Rulebook]

*Skip this entire step ONLY if the request is a simple bug fix, minor refactoring of existing logic, or a pure informational Q&A.*

---

## 2. Workspace Map

### Product context (read before any product decision)

| File | Phase | Purpose |
|---|---|---|
| `doc/product/PRODUCT-JOURNEY.md` | All | **Start here** — full Cagan journey, where code lives, weekly rhythm |
| `doc/product/vision.md` | 1 — Framing | 2–5 year direction |
| `doc/product/strategy.md` | 1 — Framing | GTM, ICP, messaging, growth hypothesis |
| `doc/product/personas.md` | 1 — Framing | ICP profiles from survey |
| `doc/product/metrics.md` | 1 — Framing | OKRs, 30-day retention target |
| `doc/PROJECT-BRIEF.md` | 1 — Framing | What, for whom, why |
| `doc/discovery/user-interviews.md` | 2 — Discovery | Interview guide, Gunnar Leu contact, session notes |
| `doc/research/survey-wave1.md` | 2 — Discovery | Survey findings (→ live: dan123iel.github.io/survey/) |
| `doc/PRD.md` | 3 — Prototype | Requirements after validation |
| `doc/USER-STORIES.md` | 3 — Prototype | Stories in INVEST format |
| `doc/specs/` | 3 — Prototype | Feature specs (only written after validation) |
| `doc/ROADMAP.md` | 4 — Delivery | What's in scope now vs later |
| `doc/adr/` | 4 — Delivery | Architecture decisions (ADR-001 → ADR-009) |

### Engineering context (read before writing any code)

| File | Purpose |
|---|---|
| `.project-context/context/architecture.md` | Full directory map, all API endpoints, data sources |
| `.project-context/context/tech-stack.md` | Approved tech only — no FMP, no OpenAI |
| `.project-context/context/coding-guidelines.md` | Code style, error handling, Definition of Done |

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

In scope:
- 12-tab analytics (Scorecard, Chart, Valuation, DCF, News, Insider, AI, Ownership, Profile + 3× coming soon)
- Explanation-first UX + source attribution per metric
- 6 nav pages: Analyze, Markets, Macro, Ideas, Watchlist, Portfolio
- Live: https://dan123iel.github.io/stockrater/

Not in scope until Phase 2: Login, Stripe, Macro Hub, Multilingual, Dark mode.

→ `doc/ROADMAP.md` for full phase breakdown.
→ `doc/product/PRODUCT-JOURNEY.md` for the full Cagan journey.
