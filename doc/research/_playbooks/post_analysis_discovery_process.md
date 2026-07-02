# Post-Analysis Discovery Process – Working with Survey Results

**Framework:** Marty Cagan, *Inspired* / *Empowered*
**Predecessor:** → [`master_survey_analysis_playbook.md`](./master_survey_analysis_playbook.md)
**Context:** You have completed the survey analysis. You now hold problem clusters, a behavior-based segmentation, a focus persona, and initial So-What actions. This document governs what happens next.

---

## Core Premise

> "The survey told you WHERE to look. It did not tell you WHAT to build."
> — Principle derived from Cagan

Survey results are **hypotheses**, not conclusions. The next phase is about reducing four risks before committing engineering resources:

| Risk | Question |
|------|----------|
| **Value** | Will customers choose to use/buy this? |
| **Usability** | Can they figure out how to use it? |
| **Feasibility** | Can we build it with the time, skills, and technology we have? |
| **Business Viability** | Does it work for our business (revenue, compliance, brand, partnerships)? |

Nothing moves to delivery until all four risks are addressed through evidence — not opinions.

---

## Phase Map: From Survey Results to Validated MVP

```
┌─────────────────────────────────────────────────────────────┐
│  SURVEY RESULTS (You are here)                              │
│  • Problem clusters                                         │
│  • Behavior-based cohorts                                   │
│  • Focus persona                                            │
│  • So-What hypotheses for PM/Design/Tech                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: OPPORTUNITY ASSESSMENT                             │
│  • Prioritize which problems to pursue                      │
│  • Score against value, urgency, frequency, market size     │
│  • Kill weak opportunities early                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: QUALITATIVE DISCOVERY (Interviews)                 │
│  • Validate problem clusters with real users                │
│  • Understand context, triggers, workarounds                │
│  • Refine persona with behavioral depth                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: SOLUTION DISCOVERY (Prototyping)                   │
│  • Generate solution ideas (diverge)                        │
│  • Build rapid prototypes (low to high fidelity)            │
│  • Test with users (usability + value)                      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: QUANTITATIVE VALIDATION (Experiments)              │
│  • Pricing experiments, fake doors, concierge MVPs          │
│  • Measure actual behavior, not stated intent               │
│  • Go/No-Go decision                                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 5: DELIVERY PLANNING                                  │
│  • Story mapping for MVP scope                              │
│  • Engineering feasibility confirmed                        │
│  • Business viability sign-off                              │
│  • Build, ship, measure                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Step 1: Opportunity Assessment

### Purpose

Not every problem cluster from the survey deserves pursuit. Use a structured framework to prioritize.

### Opportunity Scoring Matrix

Rate each problem cluster (1–5 scale):

| Criterion | Description | Weight |
|-----------|-------------|--------|
| **Frequency** | How often does this pain occur for the target cohort? | High |
| **Intensity** | How severe is the pain when it occurs? (from quotes, language) | High |
| **Willingness to pay** | Evidence of existing spend on solving this (behavior, not stated WTP) | High |
| **Market size** | How large is the affected cohort (% of addressable market)? | Medium |
| **Alignment** | Does solving this fit our capabilities, brand, and strategy? | Medium |
| **Solvability** | Can we realistically address this better than alternatives? | Medium |

### Scoring Template

```markdown
| Problem Cluster | Frequency | Intensity | WTP Evidence | Market Size | Alignment | Solvability | Total |
|-----------------|-----------|-----------|--------------|-------------|-----------|-------------|-------|
| Cluster A       | X/5       | X/5       | X/5          | X/5         | X/5       | X/5         | XX/30 |
| Cluster B       | X/5       | X/5       | X/5          | X/5         | X/5       | X/5         | XX/30 |
| Cluster C       | X/5       | X/5       | X/5          | X/5         | X/5       | X/5         | XX/30 |
```

### Decision Rules

- **Pursue (top 1–2):** Highest score AND strong behavioral evidence (not just stated pain).
- **Park:** Medium score or weak behavioral evidence. Revisit after primary opportunity is validated.
- **Kill:** Low score, no behavioral evidence, or poor alignment. Remove from scope.

### Output

A ranked list of 1–2 opportunities to take into qualitative discovery, with explicit reasoning for what was killed and why.

---

## Step 2: Qualitative Discovery (Interviews)

### Purpose

The survey identified patterns. Interviews reveal **why** — the context, triggers, emotions, and workarounds that quantitative data cannot capture.

### Interview Design (Cagan Principles)

#### Who to Interview

- 5–8 users from the **target cohort** (your focus persona segment)
- Mix of: strongest pain reporters + moderate reporters + 1–2 edge cases
- Source from survey respondents who agreed to follow-up (if available)
- Supplement with recruited users matching persona criteria

#### Interview Structure (60 min)

| Block | Duration | Purpose | Key Questions |
|-------|----------|---------|---------------|
| **Context** | 10 min | Understand their world | "Walk me through your last trading/analysis session." "What triggered it?" |
| **Problem exploration** | 25 min | Deep-dive on pain | "When was the last time [problem cluster] frustrated you?" "What happened next?" "What did it cost you (time/money/stress)?" |
| **Current solutions** | 15 min | Understand workarounds | "Show me how you handle this today." "What tools do you open?" "What do you wish you could skip?" |
| **Value test** | 10 min | Gauge real priority | "If I could magically solve [problem], what would change for you?" "What would you give up to have this solved?" |

#### Critical Interview Rules

| Rule | Rationale |
|------|-----------|
| Ask about **past behavior**, never hypotheticals | "Tell me about the last time..." not "Would you...?" |
| Never pitch a solution | You are here to learn, not to sell. |
| Follow the emotion | When they show frustration, excitement, or resignation — dig deeper. |
| Silence is a tool | Let them fill the gap. Don't rescue them with suggestions. |
| Record (with consent) | Review recordings for nuance you missed live. |
| No leading questions | "How did that make you feel?" not "That must have been frustrating, right?" |

#### Interview Output Template

```markdown
## Interview Summary: [Respondent ID / Pseudonym]

**Cohort:** [Passive/Intermediate/Heavy]
**Date:** YYYY-MM-DD
**Duration:** XX min

### Context
- [Their situation, role, goals, typical workflow]

### Problem Validation
- Cluster [X] confirmed? [Yes/No/Partial]
  - Evidence: "[quote]"
  - Severity: [1–5]
  - Frequency: [daily/weekly/monthly]
- Cluster [Y] confirmed? [Yes/No/Partial]
  - Evidence: "[quote]"

### Current Workarounds
- [What they do today to cope]
- [Tools/hacks/manual processes]
- [What they accept as "good enough"]

### Surprising Insights (Not in Survey)
- [New pain or context not captured in survey]

### Value Signal
- Strength: [Strong/Moderate/Weak]
- Evidence: "[quote about what solving this would mean]"

### Key Quotes
- "..."
- "..."
```

### Synthesis Across Interviews

After 5–8 interviews, produce:

```markdown
## Interview Synthesis (n=X interviews)

### Problem Cluster Validation
| Cluster | Confirmed | Partially | Not confirmed | Confidence |
|---------|-----------|-----------|---------------|------------|
| A       | X/Y       | X/Y       | X/Y           | High/Med/Low |
| B       | X/Y       | X/Y       | X/Y           | High/Med/Low |

### New Insights (Not in Survey)
- [Emergent theme 1]
- [Emergent theme 2]

### Persona Refinement
- [What changed or deepened about the focus persona]

### Revised Opportunity Ranking
- [Did the priority shift based on interviews?]

### Ready for Prototyping?
- [Yes — which problem to prototype for]
- [No — need more interviews because...]
```

### When to Stop Interviewing

- **Saturation signal:** The last 2 interviews revealed no new themes or contradictions.
- **Minimum:** 5 interviews from target cohort.
- **Maximum before prototyping:** 12 (if still discovering new themes, revisit your segmentation).

---

## Step 3: Solution Discovery (Prototyping)

### Purpose

Generate and test potential solutions for the validated problem. The goal is learning speed, not production quality.

### 3.1 Ideation (Diverge)

#### Who Participates

The **Product Trio** (PM, Designer, Tech Lead) — together, not sequentially.

#### Method

- Reference: validated problem cluster + persona + workaround patterns from interviews
- Constraint: solutions must address the root pain, not replicate feature requests
- Generate: individually sketch 3–5 solution approaches (10 min silent divergence)
- Share: present to trio, discuss trade-offs
- Converge: select 2–3 concepts to prototype

#### Evaluation Criteria for Concepts

| Criterion | Question |
|-----------|----------|
| Problem fit | Does this directly address the validated pain? |
| Simplicity | Can the target persona (Passive, low-time) use this in <2 min? |
| Differentiation | Is this meaningfully better than current workarounds? |
| Feasibility | Can we build a testable version in days, not months? |
| Business fit | Can we deliver this profitably within our model? |

### 3.2 Prototype Fidelity Ladder

| Level | What It Is | When to Use | Time to Build |
|-------|-----------|-------------|---------------|
| **Paper/Wireframe** | Sketches, sticky notes, hand-drawn flows | Very early; testing concept and flow | 1–2 hours |
| **Clickable mockup** | Figma/InVision with static screens | Testing navigation, information hierarchy | 1–3 days |
| **High-fidelity prototype** | Realistic visuals, dummy data, interactive | Testing perceived value and usability | 3–5 days |
| **Wizard of Oz / Concierge** | Real-looking product, human-powered backend | Testing value before building technology | 1–2 weeks |
| **Live data prototype** | Functional slice with real data, limited scope | Final validation before full build | 2–4 weeks |

**Cagan's rule:** Start at the lowest fidelity that can answer your current question. Only increase fidelity when lower levels pass.

### 3.3 Prototype Testing (Usability + Value)

#### Test Structure (Per User, 30–45 min)

| Phase | Duration | What You Do |
|-------|----------|-------------|
| **Context reset** | 5 min | Remind them of the problem (not the solution). "Last time we talked about [problem]. I want to show you something and get your honest reaction." |
| **First impression** | 5 min | Show the prototype. Stay silent. Observe: do they understand what it is? Do they lean in or pull back? |
| **Task-based walkthrough** | 15–20 min | Give them a realistic task. "Imagine it's Monday morning and you want to [goal]. Use this to do that." Observe confusion, questions, shortcuts. |
| **Value assessment** | 10 min | "How does this compare to what you do today?" "Would this replace [current tool]?" "What's missing that would stop you from using this?" |
| **Debrief** | 5 min | "What would you change?" "What surprised you?" |

#### Key Signals to Watch

| Signal | Interpretation |
|--------|---------------|
| Immediate understanding | Good concept clarity |
| "Oh, this would save me from..." | Value resonance — they connect to real pain |
| Asks "when can I get this?" | Strong buying signal |
| Confused about navigation | Usability issue — fix in next iteration |
| "Nice, but I'd still need [other tool]" | Incomplete value prop or wrong problem |
| Polite but no enthusiasm | Likely not solving a real problem for them |
| Tries to use it for something unexpected | Watch — might reveal a better opportunity |

#### Test Output

```markdown
## Prototype Test Results (Concept: [Name], n=X users)

### Value Risk
- Users who said this solves their problem: X/Y
- Users who would switch from current tool: X/Y
- Key value quote: "..."
- Value risk status: [Resolved / Needs iteration / Unresolved]

### Usability Risk
- Task completion without help: X/Y
- Average confusion points: X per session
- Critical usability issues: [list]
- Usability risk status: [Resolved / Needs iteration / Unresolved]

### Feasibility Check (Tech Lead)
- Anything tested that is technically unfeasible? [Yes/No]
- Cost implications of tested concept: [notes]

### Decision
- [ ] Iterate on this concept (fix issues, test again)
- [ ] Pivot to a different concept
- [ ] Advance to quantitative validation
```

### 3.4 Iteration Loops

Expect 2–4 prototype iterations before advancing:

```
Prototype v1 → Test (3–5 users) → Learn → Refine
Prototype v2 → Test (3–5 users) → Learn → Refine
Prototype v3 → Test (3–5 users) → Confidence threshold met → Advance
```

**Advance when:**
- ≥ 80% of test users demonstrate understanding without assistance
- ≥ 60% express clear value signal (would switch, would pay, asks "when?")
- Tech Lead confirms feasibility within constraints
- No critical usability blockers remain

---

## Step 4: Quantitative Validation (Experiments)

### Purpose

Prototypes tested qualitatively with 5–15 users. Now validate at scale with real behavioral signals before committing to full build.

### 4.1 Experiment Types

| Experiment | What It Tests | How It Works | Signal |
|-----------|---------------|--------------|--------|
| **Fake Door / Smoke Test** | Demand (Value risk) | Landing page describing the product; CTA = "Sign up for early access" | Conversion rate on CTA |
| **Pricing Page Test** | Willingness to pay | Real-looking pricing page with tiers; measure clicks/sign-ups per tier | Price sensitivity, tier preference |
| **Concierge MVP** | End-to-end value | Deliver the value manually to 10–20 users; measure retention and satisfaction | Repeat usage, NPS, willingness to pay after experience |
| **Wizard of Oz** | Perceived value + usability at scale | Product looks real, backend is manual/semi-automated | Engagement, task completion, retention |
| **Pre-order / Letter of Intent** | Serious commitment | Ask for a deposit, LOI, or credit card (refundable) | Conversion rate (strongest signal) |

### 4.2 Selecting the Right Experiment

Decision tree:

```
Is the primary open question about DEMAND (will they want it)?
  → Fake Door / Smoke Test

Is the primary question about PRICE (will they pay, and how much)?
  → Pricing Page Test or Pre-order

Is the primary question about SUSTAINED VALUE (will they keep using it)?
  → Concierge MVP or Wizard of Oz

Is the primary question about FEASIBILITY (can we deliver at quality)?
  → Technical spike / Live Data Prototype
```

### 4.3 Experiment Design Template

```markdown
## Experiment Brief: [Name]

**Hypothesis:** If we [action], then [target persona] will [measurable behavior],
because [reason from discovery].

**Risk being tested:** [Value / Usability / Feasibility / Viability]

**Audience:**
- Segment: [Target cohort from survey]
- Sample size target: [n=XX]
- Recruitment method: [survey follow-up list, ads, community, etc.]

**Mechanic:**
- [Describe what the user sees and does]

**Success metric:**
- Primary: [e.g., conversion rate ≥ 10%]
- Secondary: [e.g., average time on page, click-through to pricing]

**Failure threshold:**
- Below [X%]: kill or pivot
- Between [X%] and [Y%]: iterate and re-test
- Above [Y%]: advance to delivery

**Duration:** [X days/weeks]

**Cost:** [Budget for ads, tooling, manual effort]

**Owner:** [PM / Designer / Tech Lead]
```

### 4.4 Interpreting Experiment Results

| Result | Interpretation | Action |
|--------|---------------|--------|
| Above success threshold | Strong evidence of demand/value | Advance to delivery planning |
| In ambiguous range | Signal exists but not convincing | Iterate: refine messaging, pricing, or audience targeting; re-run |
| Below failure threshold | Insufficient demand or wrong approach | Pivot: revisit problem, try different solution, or target different cohort |
| High sign-ups but low retention (Concierge) | Curiosity, not commitment | Value prop unclear or product doesn't deliver on promise; iterate on core experience |
| High engagement but low conversion to paid | Free value delivered but payment barrier exists | Pricing issue or insufficient differentiation vs. free alternatives |

### 4.5 Go / No-Go Decision

Before moving to delivery, the Product Trio must answer YES to all four:

| Risk | Evidence Required | Status |
|------|-------------------|--------|
| **Value** | Users chose to engage/sign up/pay in experiment | ☐ Yes ☐ No |
| **Usability** | Users completed tasks without assistance in prototype tests | ☐ Yes ☐ No |
| **Feasibility** | Tech Lead confirms buildable within [X] weeks/sprints | ☐ Yes ☐ No |
| **Business Viability** | Unit economics work; no compliance/legal blockers; aligns with strategy | ☐ Yes ☐ No |

**If any risk is unresolved:** Do not proceed to delivery. Return to the appropriate discovery step.

---

## Step 5: Delivery Planning

### Purpose

You have validated evidence for all four risks. Now define the smallest shippable product that delivers the validated value.

### 5.1 Story Mapping (MVP Scoping)

#### Process

1. **Backbone:** Map the user's journey as a sequence of activities (left to right).
2. **Walking skeleton:** For each activity, define the minimum functionality that completes the journey end-to-end.
3. **MVP line:** Draw a horizontal line. Everything below is "later." Everything above is the first release.
4. **Release slices:** If needed, define Release 1 (bare minimum), Release 2 (improved), Release 3 (complete vision).

#### MVP Scoping Principles (Cagan)

| Principle | Application |
|-----------|-------------|
| **Solve one problem completely** | Do not partially solve three problems. Fully address the #1 validated pain. |
| **End-to-end over depth** | A thin, complete flow beats a deep feature with no surrounding context. |
| **Time-box aggressively** | MVP should ship in ≤ 6 weeks. If it can't, the scope is too large — cut further. |
| **Value from day one** | The user must receive clear value on first use. No "empty state" experiences. |
| **Instrument everything** | Build analytics into the MVP from the start. You need behavioral data immediately. |

### 5.2 Success Metrics Definition

Define before building:

```markdown
## MVP Success Metrics

**Primary (must achieve within [X] weeks of launch):**
- [Metric]: [Target] — e.g., "7-day retention ≥ 30% of activated users"

**Secondary:**
- [Metric]: [Target] — e.g., "NPS ≥ 30 among weekly active users"
- [Metric]: [Target] — e.g., "Conversion to paid ≥ 5% within 30 days"

**Guardrail (must NOT violate):**
- [Metric]: [Threshold] — e.g., "Support tickets per user < 0.5/week"

**Learning Metrics (no target, just observe):**
- Feature usage distribution
- Session length and frequency by cohort
- Drop-off points in flow
```

### 5.3 Launch Strategy

| Phase | Duration | Goal | Audience |
|-------|----------|------|----------|
| **Alpha** | 1–2 weeks | Find showstopper bugs; validate core flow | Internal team + 5–10 friendly users |
| **Beta (closed)** | 2–4 weeks | Validate value and retention with real users | 30–100 users from target cohort (invite-only) |
| **Beta (open) / GA** | Ongoing | Scale; measure unit economics; iterate | Public or broader audience |

### 5.4 Post-Launch: Continuous Discovery

Shipping is not the end. Cagan's model is a continuous loop:

```
Ship → Measure → Learn → Discover → Ship → ...
```

Post-launch actions:
- Monitor success metrics weekly.
- Conduct ongoing discovery interviews (1–2/week minimum).
- Run A/B tests on key flows.
- Revisit parked problem clusters when primary is validated.
- Update persona based on actual usage data (behavior > survey).

---

## Anti-Patterns to Avoid

| Anti-Pattern | What It Looks Like | Why It Fails |
|--------------|-------------------|--------------|
| **Survey-to-roadmap** | "Users asked for X, so we build X" | Stated preferences ≠ actual needs; no risk reduction |
| **Skipping interviews** | "We have 52 survey responses, that's enough" | Survey reveals WHAT but not WHY; no depth |
| **High-fidelity too early** | Building a polished product before validating the problem | Expensive to change; team becomes attached to solution |
| **Democracy-driven decisions** | "60% voted for feature A, so we build it" | Majority preference ≠ value; ignores cohort differences |
| **Endless discovery** | Months of research with no prototyping or testing | Diminishing returns; team loses momentum |
| **Premature scaling** | Launching to everyone before retention is proven | Acquires users who churn; damages brand |
| **Ignoring non-users** | Only talking to enthusiasts | Survivorship bias; misses why the majority disengages |
| **Building for Heavy users** | Optimizing for power users when Passive is 77% | Misses the revenue opportunity; alienates majority |

---

## Decision Log Template

Maintain a running decision log throughout the process:

```markdown
## Discovery Decision Log

| Date | Decision | Evidence | Alternatives Considered | Owner |
|------|----------|----------|------------------------|-------|
| YYYY-MM-DD | Pursue Cluster A as primary opportunity | Highest score (24/30); confirmed in 6/8 interviews | Cluster B (20/30, weaker interview signal) | PM |
| YYYY-MM-DD | Target Passive cohort for MVP | 77% of sample; coherent pain profile; underserved | Heavy users (higher spend but n=6, niche) | PM |
| YYYY-MM-DD | Use EOD data (not real-time) for MVP | Passive users check 2–3x/week; real-time adds €X/mo cost with no validated need | Real-time (for Heavy users in future release) | Tech Lead |
| YYYY-MM-DD | Kill Cluster C | No interview confirmation; low score (12/30) | — | PM |
```

---

## Timeline Expectations

| Phase | Typical Duration | Output |
|-------|-----------------|--------|
| Survey Analysis | 1–3 days | Discovery Report (problem clusters, persona, So-What) |
| Opportunity Assessment | 1 day | Ranked problems, kill/pursue decisions |
| Discovery Interviews | 1–2 weeks | Validated clusters, refined persona, ready-to-prototype brief |
| Prototyping + Testing | 2–4 weeks (2–4 iterations) | Validated concept, resolved usability/value risks |
| Quantitative Experiment | 1–3 weeks | Demand/pricing evidence, Go/No-Go |
| Delivery Planning | 2–3 days | Story map, MVP scope, success metrics |
| MVP Build | 4–6 weeks | Shippable product |
| Beta + Iteration | 2–4 weeks | Retention data, iteration, scale decision |

**Total: Survey to Beta ≈ 10–16 weeks** (not months of planning, but weeks of learning).

---

## Stakeholder Communication

### What to Share (and When)

| Audience | What They Need | Format | Frequency |
|----------|---------------|--------|-----------|
| **Product Trio** | Full detail: clusters, quotes, experiment results | Working docs, weekly sync | Continuous |
| **Leadership / Sponsors** | Confidence level, risks, Go/No-Go recommendations | 1-page summary + decision request | At each phase gate |
| **Engineering Team** | Validated scope, constraints, success metrics | Story map, acceptance criteria | At delivery handoff |
| **Sales / Marketing** | Persona, value prop, positioning language | Persona card, messaging brief | Pre-launch |

### Framing Results for Stakeholders

Do NOT say:
- "Users want feature X" (feature framing)
- "52 people said they'd pay for this" (overclaiming from soft data)
- "The survey proves there's demand" (survey cannot prove demand)

DO say:
- "We identified [problem] affecting [X%] of our target segment, validated through [N] interviews and [experiment type]."
- "Prototype testing showed [X/Y] users completed the core task and [X/Y] expressed intent to switch from their current tool."
- "[Experiment] demonstrated [X%] conversion, above our [Y%] threshold. We recommend proceeding to MVP."

---

## Complete Discovery Artifact Chain

Every phase produces artifacts that feed the next:

```
Survey Results
  └→ Discovery Report (.md)
       └→ Opportunity Scorecard
            └→ Interview Guide + Interview Summaries
                 └→ Interview Synthesis
                      └→ Prototype Brief
                           └→ Prototype + Test Results
                                └→ Experiment Brief + Results
                                     └→ Go/No-Go Decision
                                          └→ Story Map + MVP Spec
                                               └→ Success Metrics Dashboard
                                                    └→ Post-Launch Learning Log
```

Each artifact is a living document. Update as you learn. Never treat an early artifact as frozen truth.

---

## Summary: The Cagan Mindset After Survey Analysis

1. **Surveys generate hypotheses.** They do not validate solutions.
2. **Interviews validate problems.** They reveal context, emotion, and workarounds.
3. **Prototypes validate solutions.** They answer "can they use it?" and "do they want it?"
4. **Experiments validate demand.** They answer "will they pay/commit?"
5. **MVPs validate sustainability.** They answer "will they keep using it?"
6. **Each step eliminates risk.** Do not skip steps. Do not over-invest in any single step.
7. **Speed of learning is everything.** Optimize for fastest risk reduction, not for perfection at any stage.

---

*End of Post-Analysis Discovery Process. Return to → [`master_survey_analysis_playbook.md`](./master_survey_analysis_playbook.md)*
