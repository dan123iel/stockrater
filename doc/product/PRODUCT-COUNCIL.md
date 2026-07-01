# Product Council Framework: Structure & Workflow

> This blueprint defines our 2-phase Product Council setup. It maintains maximum development velocity while systematically mitigating regulatory, financial, legal, and security risks before engineering begins.

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

- Survey findings (n=51): `doc/research/survey-wave1.md` → live dashboard
- Interview guide (Gunnar Leu): `doc/discovery/user-interviews.md`
- Architecture decisions: `doc/adr/`
- Feature roadmap: `doc/ROADMAP.md`
