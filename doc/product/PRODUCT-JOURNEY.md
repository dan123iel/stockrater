# pondex_ — Product Journey (Inspired by Marty Cagan)

> This document describes how pondex_ is built — not just what we build, but how we discover, validate, and deliver.
> Based on *Inspired* by Marty Cagan. The fundamental shift: Discovery and Delivery run in parallel, not sequentially.

---

## The Journey at a Glance

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CONTINUOUS DISCOVERY                                │
│  ┌──────────────┐   ┌──────────────────┐   ┌─────────────────────────────┐ │
│  │  1. FRAMING  │──▶│  2. INTERVIEWS   │──▶│  3. PROTOTYPE & TEST        │ │
│  │  Vision,OKRs │   │  2–3/week always │   │  De-risk all 4 risk types   │ │
│  └──────────────┘   └──────────────────┘   └─────────────┬───────────────┘ │
└────────────────────────────────────────────────────────────│────────────────┘
                                                             │ validated only
┌────────────────────────────────────────────────────────────▼────────────────┐
│                         DELIVERY (runs in parallel)                         │
│  ┌──────────────────────────────┐   ┌──────────────────────────────────────┐│
│  │  4. BUILD                    │──▶│  5. MEASURE                          ││
│  │  Scalable, tested code       │   │  Did we hit the outcome?             ││
│  └──────────────────────────────┘   └──────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────────┘
```

**The key insight:** Engineers build validated features from last week while the Product Trio is already interviewing and prototyping for next week. Discovery never stops.

---

## Phase 1 — Framing

**Purpose:** Align on *why* before touching *what*.

**Outputs:**
- Product Vision (2–5 year direction) → `doc/product/vision.md`
- Product Strategy (which market segments, when) → `doc/product/strategy.md`
- OKRs (outcome-based goals, not feature lists) → `doc/product/metrics.md`
- ICP definition → `doc/product/personas.md`

**For pondex_:**
The OKR for Phase 1 is not "ship 12 tabs" — it is:
> **"Achieve 30-day retention > 40% with the first 10 real users."**

The Product Trio owns the *how*. Management owns the *why*.

**Where things live:**
```
doc/product/
├── vision.md          ← 2–5 year direction
├── strategy.md        ← GTM, ICP, messaging (single source of truth)
├── personas.md        ← ICP profiles derived from survey
├── metrics.md         ← OKRs, retention targets, success criteria
└── principles.md      ← How we make decisions
```

---

## Phase 2 — Continuous Discovery: Customer Interviews

**Cadence:** 2–3 interviews per week, every week, permanently.

**The Cagan rule:** Never ask "what features do you want?" — observe how they solve the problem today.

**Interview goals:**
1. Understand the actual behavior (not the stated preference)
2. Find pain, inefficiency, workarounds
3. After 5–6 interviews on the same problem: pattern recognition kicks in

**For pondex_:**
- Primary contact: Gunnar Leu (churned, $15–50/mo, highest-signal Q9 in dataset)
- Secondary: 6 follow-up contacts from Wave 1 survey
- Cold outreach: r/eupersonalfinance after Wave 2 survey

**Where things live:**
```
doc/discovery/
├── user-interviews.md       ← Interview guide, contact list, session notes
├── competitor-analysis.md   ← What exists, why it fails our ICP
└── problem-validation.md    ← How we confirmed the pain is real
```

**Survey as scaled discovery:**
```
doc/research/
├── survey-wave1.md          ← Strategic findings (live data → dashboard)
├── survey-dashboard.md      ← How the live dashboard works, Wave 2 plan
```
→ Live dashboard: https://dan123iel.github.io/survey/

---

## Phase 3 — Prototype & Test (De-risking)

**Purpose:** Kill bad ideas cheaply before engineers write a single line of production code.

Every idea must pass all four risk gates:

| Risk | Question | How we test it |
|---|---|---|
| **Value Risk** | Will users actually choose this / pay for it? | Show prototype in interview — do they lean in or scroll past? |
| **Usability Risk** | Can they use it without help? | Give them a task, observe silently, note where they fail |
| **Feasibility Risk** | Can we build it? | Tech Lead writes throwaway spike code to test APIs |
| **Business Viability Risk** | Does it fit our constraints? | PM reviews with stakeholders before building |

**An idea only moves to Delivery when all four risks are validated.**

**For pondex_ — what's already validated:**
- ✅ Value: 5 WTP proofs from survey, 2 churners confirmed they'd pay if noise solved
- ✅ Usability: explanation-first UX from ADR-007, source attribution pattern tested
- ✅ Feasibility: yfinance + Groq stack proven, backend running
- ✅ Viability: no paid APIs required, no broker licence needed for Phase 1

**Where things live:**
```
doc/specs/                   ← Feature specs after validation
├── scoring-engine.md
├── ai-chat.md
├── dcf-model.md
└── ...
design/wireframes/           ← ASCII wireframes (readable by AI agents)
design/reference/            ← pondex-v1.html original prototype
```

---

## Phase 4 — Delivery

**Purpose:** Build scalable, tested, production-grade code — no surprises, because engineers were in the room during Discovery.

**For pondex_:**
```
frontend/src/
├── pages/          ← One file per route/view
├── components/     ← Reusable UI (tiles, nav, panels)
│   └── ui/         ← shadcn — DO NOT EDIT MANUALLY
└── lib/
    ├── fmp.js      ← API client → calls backend only
    └── storage.js  ← localStorage persistence

backend/
└── main.py         ← All FastAPI endpoints (single file, intentional for Phase 1)
```

**Definition of Done (every PR):**
- [ ] `npm run build` passes with zero errors
- [ ] Backend starts without errors
- [ ] Source attribution renders for any new metric or AI output
- [ ] No FMP references remain
- [ ] Committed and pushed

→ Full checklist: `.project-context/context/coding-guidelines.md`

---

## Phase 5 — Measure

**The only question that matters:** Did we hit the outcome?

**For pondex_ Phase 1:**
- Target: **30-day retention > 40%** with first 10 real users
- How to measure: manual check (ask users directly) until analytics are integrated
- If yes → celebrate, move to Phase 2 OKR
- If no → return to Phase 2 (interviews) to find out why, not to Phase 4 (more features)

**Where things live:**
```
doc/product/metrics.md       ← OKRs, current targets, measurement method
```

---

## Where Does Existing Code Live?

| What you built | Where it lives | Phase it belongs to |
|---|---|---|
| React frontend (Analysis, Markets, etc.) | `frontend/src/pages/` | Phase 4 — Delivery |
| API client | `frontend/src/lib/fmp.js` | Phase 4 — Delivery |
| FastAPI backend | `backend/main.py` | Phase 4 — Delivery |
| Scorecard / scoring logic | `backend/main.py` → `/score` endpoint | Phase 4 — Delivery |
| ASCII wireframes | `design/wireframes/` | Phase 3 — Prototype |
| Original prototype | `design/reference/pondex-v1.html` | Phase 3 — Prototype |
| Survey findings | `doc/research/survey-wave1.md` | Phase 2 — Discovery |
| Interview guide | `doc/discovery/user-interviews.md` | Phase 2 — Discovery |
| ICP, personas | `doc/product/personas.md` | Phase 1 — Framing |
| OKRs, metrics | `doc/product/metrics.md` | Phase 1 — Framing |
| ADRs | `doc/adr/` | Phase 3/4 — cross-cutting |

---

## The Parallel Rhythm (Week-by-Week)

```
Week N:   Discovery → Interview Gunnar Leu → identify Macro Hub pain
Week N:   Delivery  → Engineers ship 12-tab analytics

Week N+1: Discovery → Prototype Macro Hub concept → test with 2 users
Week N+1: Delivery  → Engineers fix Source Attribution edge cases

Week N+2: Discovery → Macro Hub prototype validated → write spec
Week N+2: Delivery  → Engineers pick up Macro Hub from validated spec
```

Discovery is always one sprint ahead of Delivery. The spec only gets written after validation.

---

## Governance & Process

Before any feature moves from Phase 3 (Prototype) to Phase 4 (Delivery), it must pass the Product Council review.

→ **`doc/product/PRODUCT-COUNCIL.md`** — 2-phase council structure, risk gates, 48h SLA, Go/No-Go process
