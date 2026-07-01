# pondex_ — CLAUDE.md

> Auto-loaded by Claude Code on every session. Read before touching anything.

---

## 1. What is this?

pondex_ is a stock research tool. Plain-language verdict for any stock, every number cites its source. Built for self-directed investors who are priced out of Bloomberg or frustrated by AI that hallucinates numbers.

**How we build:** Continuous Discovery (Cagan's *Inspired*) running in parallel with Delivery.
Full process: `doc/product/PRODUCT-JOURNEY.md`

---

## 2. Read first

1. `.project-context/MASTER.md` — rules, workspace map, current milestone
2. `doc/product/PRODUCT-JOURNEY.md` — full Cagan journey + where code lives
3. `.project-context/context/architecture.md` — directory map, all API endpoints
4. `.project-context/context/tech-stack.md` — approved tech only
5. `.project-context/context/coding-guidelines.md` — code rules + Definition of Done

---

## 3. Where things belong

### Product documents (by Cagan phase)

| Phase | What | Where |
|---|---|---|
| 1 — Framing | Vision, OKRs, ICP, strategy | `doc/product/` |
| 2 — Discovery | Interviews, survey, competitor analysis | `doc/discovery/` + `doc/research/` |
| 3 — Prototype | PRD, user stories, feature specs | `doc/PRD.md`, `doc/USER-STORIES.md`, `doc/specs/` |
| 4 — Delivery | Roadmap, ADRs, technical docs | `doc/ROADMAP.md`, `doc/adr/`, `doc/technical/` |

### Code

| What | Where |
|---|---|
| Frontend pages | `frontend/src/pages/` |
| Reusable components | `frontend/src/components/` |
| shadcn UI components | `frontend/src/components/ui/` — ⚠ DO NOT EDIT |
| API client (→ backend) | `frontend/src/lib/fmp.js` |
| localStorage | `frontend/src/lib/storage.js` |
| CSS variables / tokens | `frontend/src/index.css` |
| All backend endpoints | `backend/main.py` |
| Wireframes | `design/wireframes/` |
| AI agent rules | `.project-context/` |
| Persistent AI memory | `~/.claude/projects/.../memory/` |

---

## 4. Hard rules

- **No FMP.** `lib/fmp.js` calls the backend, not FMP. ADR-005.
- **No OpenAI / Claude for AI.** Groq Llama 3.3 70B only. ADR-006.
- **Every metric shows its source.** `explanations{}` + `sources[]` must render. ADR-007.
- **Score is a conclusion.** Explanation first, score last. ADR-007.
- **No spec before validation.** Write specs only after all 4 Cagan risk gates pass.
- **Verify before done.** `npm run build` + file check + FMP grep + commit + push.

---

## 5. Current milestone

**Phase 1 — MVP** · Target: 15 July 2026
OKR: 30-day retention > 40% with first 10 real users

Live: https://dan123iel.github.io/stockrater/

Not yet: Login, Stripe, Macro Hub, Multilingual, Dark mode.
