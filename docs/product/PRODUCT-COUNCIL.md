# Product Council Framework: Structure & Workflow

> This blueprint defines our 2-phase Product Council setup. It maintains maximum development velocity while systematically mitigating regulatory, financial, legal, and security risks before engineering begins.

---

## The 7 Laws — Applied Before Every Decision

These laws are checked before any feature moves through the Council. They override everything except legality.

### Law 1 — The 80% Rule (Word of Mouth)
> "A product so good that people tell their friends."

The ultimate predictor of startup success. Not: is this useful? But: will a user recommend this unprompted to someone they care about? If no → don't ship.

### Law 2 — Simplicity
> The product must be explainable in 2–3 sentences. If it requires complex explanation, it signals unclear thinking or no market need.

pondex_ in one sentence: *"Enter a ticker, get a plain-language verdict with every number sourced — in under 60 seconds."* Every new feature must preserve or improve this sentence. If the sentence gets longer, the feature is too complex.

### Law 3 — Exponential Market
> Target small, nascent markets on the verge of exponential growth — not today's TAM.

EU retail investing is growing fast: zero-commission brokers (Trade Republic, Scalable), passive ETF adoption, post-COVID financial awareness. The wave is already forming. pondex_ must ride it, not wait for it to peak.

### Law 4 — Real Trend vs. Fake Trend
> Real trend: early adopters use it obsessively and tell friends (iPhone, ChatGPT).
> Fake trend: high initial hype, low sustained daily usage (VR, NFTs).

**Test for every feature:** Will users use this daily/weekly without being reminded? Or is it a novelty that gets ignored after day 3? Wave 1 signal/noise pain = real — investors research stocks every week. Source attribution = real — 71% WTP only with it. Macro Hub = unvalidated — don't build until Gunnar Leu confirms.

### Law 5 — Evangelical Founder
> At least one founder must be able to infect the world with enthusiasm — for recruiting, selling, fundraising, press.

Every product decision shapes the story. Features that are hard to explain in a LinkedIn post or investor pitch are harder to sell. If you can't evangelize a feature in 10 seconds → simplify or kill it.

### Law 6 — Ambitious Vision
> It is often easier to start a hard, ambitious startup than a modest one. Large problems attract elite talent and retain motivation.

pondex_ is not a stock screener. It is the research tool that makes every EU retail investor as informed as a professional — without Bloomberg costs. That vision is worth working on. Features that shrink the vision (e.g. adding a ticker tape, gamification, social feed) are distractions.

### Law 7 — Hard Startup Advantage
> Startups compound advantage by making strategic decisions exponentially faster than incumbents.
> One "yes" from a customer beats every "no" inside a corporation.

Seeking Alpha, Morningstar, Koyfin cannot pivot overnight. pondex_ can. When Yahoo Finance changes its API — we fix it in hours. When users ask for EU stock coverage — we ship it in days. Speed is the moat. Every Council decision must be made fast — no paralysis.

---

## The Startup Principles Behind the Laws

### Product & Market
- **The 80% Rule:** Spontaneous word-of-mouth is the ultimate success signal
- **Simplicity:** Complex explanations = unclear thinking or no market need
- **Exponential Markets:** Target markets about to grow, not markets already big
- **Real vs. Fake Trends:** Obsessive daily use = real. Novelty purchase = fake

### Vision & Execution
- **Chief Evangelist:** Enthusiasm is a product feature — it recruits, sells, raises capital
- **Ambitious Vision:** Hard problems attract better people than easy ones
- **Conviction + Flexibility:** Clear view of the destination, flexible on the path

### Strategic Advantage
- **Ruthless Momentum:** Once lost, momentum is nearly impossible to regain — keep shipping
- **Defensibility:** Plan for network effects or switching costs from day one
- **Agility over Incumbents:** One strategic decision made in hours beats one made in quarters
- **Platform Shifts:** When a new platform emerges (AI, mobile), pivot overnight — incumbents can't

---

```
          [ PHASE 1: DISCOVERY TRIO ]
         (Concept / Validated Prototype)
                       │
                       ▼
         [ PHASE 2: VIABILITY COUNCIL ]
             (Async Risk Gatekeepers)
                       │
                       ▼
               [ FINAL VERDICT ]
     (Peer Feedback & PM Go/No-Go Decision)
```

---

## Phase 1: The Discovery Trio (The Creators)

**Mode:** Proactive, synchronous, continuous daily collaboration.

| Role | Risk Lens |
|---|---|
| **Product Manager** | Value Risk + Business Viability — does this solve a real problem? does it align with strategy? |
| **Product Designer** | Usability Risk — can complex financial data be compressed so users understand it within 60 seconds? |
| **Tech Lead** | Feasibility Risk — do we have the data pipelines and infrastructure to build this reliably? |

The Trio transforms validated discovery insights into low-risk prototypes. Nothing moves to Phase 2 until all three lenses are green.

---

## Phase 2: The Viability Council (The Gatekeepers)

**Mode:** Reactive, asynchronous, on-demand review.

| Role | Review Mandate |
|---|---|
| **Compliance & Legal** | **Regulatory Risk** — does our data presentation slide into licensed financial advice (BaFin, MiFID II)? |
| **Market Data & Finance** | **Unit Economics Risk** — recurring API/infrastructure costs? Sustainable within pricing model? |
| **Cyber-Security & Privacy** | **Trust & Security Risk** — user data safety, GDPR compliance |
| **Tax & Calculation** | **Accuracy Risk** — are financial calculations mathematically and legally bulletproof? |

---

## Decision-Making Process

### Step 1 — Anonymous Peer Review
Written feedback from Phase 2 experts is aggregated and channeled back to the Trio.

### Step 2 — The Chair's Verdict
The final **Go / No-Go** decision rests solely with the **Product Manager / Founder** as Chair.

> **The Cagan Principle:** If Legal states *"This is strictly illegal"* → automatic No-Go. If Legal states *"This introduces manageable risk with guardrails X and Y"* → PM weighs risk against user value and takes full ownership.

---

## Core Operational Rules

### Rule 1 — 48-Hour SLA for Phase 2
Council experts receive specific, bite-sized questions and must respond (Red / Yellow / Green) within **48 hours**.

### Rule 2 — No Surprises
Never present a fully engineered feature to Phase 2 gatekeepers the night before launch.

### Rule 3 — Data Integrity is a Product Feature
A single dashboard displaying corrupted financial data destroys user trust permanently. Rigorous data validation is non-negotiable.

---

## For pondex_ Specifically

**Current council composition (solo founder phase):**

| Role | Status |
|---|---|
| PM / Founder | Active — you |
| Tech Lead | Active — Claude Code |
| Product Designer | Active — ASCII wireframes + survey data as proxy |
| Compliance | Pending — consult before any "recommendation" feature |
| Market Data / Finance | Pending — validate before adding paid data sources |

**Current regulatory boundary:** pondex_ shows algorithmic signals with named sources. It does not recommend buying or selling. This boundary must not be crossed without a Compliance review.

---

## Reference

- **Live survey data:** https://dan123iel.github.io/survey/
- Survey findings: `docs/research/surveys/2026-06-29_wave1/`
- Interview guide: `docs/discovery/user-interviews.md`
- Architecture decisions: `docs/architecture/adr/`
- Feature roadmap: `docs/specs/ROADMAP.md`
- Assumptions: `docs/product/assumptions.md`

> **Note for AI agents:** Before evaluating Value Risk for any feature, scan `docs/research/` for all available survey files. The target group is predominantly passive investors with low risk tolerance — features that increase complexity without addressing signal/noise pain will fail the Value Risk gate. Always run the 7 Laws check first.


---

## Phase 1: The Discovery Trio (The Creators)

**Mode:** Proactive, synchronous, continuous daily collaboration.

| Role | Risk Lens |
|---|---|
| **Product Manager** | Value Risk + Business Viability — does this solve a real problem? does it align with strategy? |
| **Product Designer** | Usability Risk — can complex financial data be compressed so users understand it within 60 seconds? |
| **Tech Lead** | Feasibility Risk — do we have the data pipelines and infrastructure to build this reliably? |

The Trio transforms validated discovery insights into low-risk prototypes. Nothing moves to Phase 2 until all three lenses are green.

---

## Phase 2: The Viability Council (The Gatekeepers)

**Mode:** Reactive, asynchronous, on-demand review.

Council experts review independently once Phase 1 delivers a validated concept.

| Role | Review Mandate |
|---|---|
| **Compliance & Legal** | **Regulatory Risk** — does our data presentation slide into licensed financial advice (BaFin, MiFID II)? Where are disclaimers required? |
| **Market Data & Finance** | **Unit Economics Risk** — what are recurring API/infrastructure costs? Is this feature sustainable within our pricing model? |
| **Cyber-Security & Privacy** | **Trust & Security Risk** — how safe is user data (portfolios, account syncs)? Do we meet GDPR standards? |
| **Tax & Calculation** | **Accuracy Risk** — are financial calculations (FIFO, performance metrics) mathematically and legally bulletproof? |

---

## Decision-Making Process

### Step 1 — Anonymous Peer Review
Written feedback from Phase 2 experts is aggregated and channeled back to the Trio. The Trio iterates on the prototype to remediate identified risks without stalling the project.

### Step 2 — The Chair's Verdict
Product development is not a democracy. The final **Go / No-Go** decision rests solely with the **Product Manager / Founder** as Chair.

> **The Cagan Principle:** If Legal states *"This is strictly illegal"* → automatic No-Go. If Legal states *"This introduces manageable risk with guardrails X and Y"* → the PM weighs that risk against user value and takes full ownership.

---

## Core Operational Rules

### Rule 1 — 48-Hour SLA for Phase 2
Administrative inertia kills velocity. Council experts receive specific, bite-sized questions and must respond (Red / Yellow / Green) within **48 hours**.

### Rule 2 — No Surprises
Never present a fully engineered feature to Phase 2 gatekeepers the night before launch. A veto at that stage wastes capital and morale.

Share a rough sketch or async heads-up early: *"We are exploring X — do you foresee immediate regulatory blockers?"*

### Rule 3 — Data Integrity is a Product Feature
A single dashboard displaying corrupted financial data destroys user trust permanently. Rigorous data validation, automated pipeline testing, and error handling are **non-negotiable product features** — not technical debt.

---

## For pondex_ Specifically

**Current council composition (solo founder phase):**

| Role | Status |
|---|---|
| PM / Founder | Active — you |
| Tech Lead | Active — Claude Code |
| Product Designer | Active — ASCII wireframes + survey data as proxy |
| Compliance | Pending — consult before any "recommendation" feature |
| Market Data / Finance | Pending — validate before adding paid data sources |

**Current regulatory boundary:** pondex_ shows algorithmic signals with named sources. It does not recommend buying or selling. This boundary must not be crossed without a Compliance review.

---

## Reference

- **Live survey data (always current):** https://dan123iel.github.io/survey/
- Survey findings + strategic conclusions: `doc/research/survey-wave1.md`
- Future wave files will appear in `doc/research/` — always use the most recent one
- Interview guide (Gunnar Leu priority): `doc/discovery/user-interviews.md`
- Architecture decisions: `doc/adr/`
- Feature roadmap: `doc/ROADMAP.md`

> **Note for AI agents:** Before evaluating Value Risk for any feature, scan `doc/research/` for all available survey files and cross-reference with the live dashboard. The target group is predominantly passive investors and aspirers with low risk tolerance — features that increase complexity or cost without addressing confirmed pain points (signal/noise, plain language, source attribution) will fail the Value Risk gate.
