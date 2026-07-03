# Survey Analysis – Detailed Execution Guide

**Parent:** → [`master_survey_analysis_playbook.md`](./master_survey_analysis_playbook.md)
**Role:** Step-by-step instructions, templates, internal prompts, QA rubric, and checklists.

---

## Table of Contents

1. [Phase 1: Data Intake and Preprocessing](#phase-1-data-intake-and-preprocessing)
2. [Phase 2: Cohort Segmentation](#phase-2-cohort-segmentation)
3. [Phase 3A: Behavior vs. Opinion Sieve](#phase-3a-behavior-vs-opinion-sieve)
4. [Phase 3B: Qualitative Text Clustering](#phase-3b-qualitative-text-clustering)
5. [Phase 4A: So-What Framework](#phase-4a-so-what-framework)
6. [Phase 4B: MVP Persona](#phase-4b-mvp-persona)
7. [Phase 4C: Triangulation and Next Experiments](#phase-4c-triangulation-and-next-experiments)
8. [Phase 5: Report Template](#phase-5-report-template)
9. [Statistical Hygiene](#statistical-hygiene)
10. [Bias, Ethics, and Privacy](#bias-ethics-and-privacy)
11. [Internal AI Prompts](#internal-ai-prompts)
12. [QA Rubric](#qa-rubric)
13. [Do's and Don'ts](#dos-and-donts)
14. [Handover Checklist](#handover-checklist)

---

## Phase 1: Data Intake and Preprocessing

### 1.1 Required Fields (Ideal Schema)

| Field | Type | Purpose |
|-------|------|---------|
| `respondent_id` | string/int | Unique identifier |
| `weekly_time_spent` | numeric (hours) | Primary behavior signal for segmentation |
| `tools_used` | multi-select/text | Current behavior |
| `paid_status_per_tool` | text/boolean | Skin in the game |
| `monthly_spend_total` | numeric (EUR) | Financial commitment |
| `experience_level` | ordinal/years | Context |
| `trading_frequency` | numeric (trades/week) | Behavior intensity |
| `asset_classes` | multi-select | Context |
| `primary_goals` | multi-select/text | Outcome orientation |
| `frustrations_free_text` | text | Problem discovery (key input) |
| `desired_features_free_text` | text | Translate to problems (do not take at face value) |
| `willingness_to_pay` | ordinal/range | Soft signal (cross-check vs. actual spend) |
| `geography_currency` | text | Budget context |
| `business_vs_individual` | categorical | Sample composition |
| `demographics` | various | Optional context |

### 1.2 Schema Mapping

If the incoming data uses different column names:
- Create a mapping table: `original_column → standard_field`
- Log the mapping in the report's Methods section
- If a field is missing entirely, note it as a limitation and proceed without it

### 1.3 Data Cleaning Rules

| Step | Rule | Action |
|------|------|--------|
| Deduplication | Same respondent_id or identical response patterns | Remove duplicates; keep first |
| Speeders | Completion time < 5th percentile (if available) | Flag and remove |
| Inconsistency | Contradictory closed answers (e.g., "0 trades/week" but "daily trader") | Flag; do not remove unless clearly bot-generated |
| Time normalization | Convert all time to hours/week | Apply conversion factor |
| Tool name normalization | "Google Sheets" = "GSheet" = "Sheets" | Use canonical names |
| Spend normalization | Convert to EUR/month | Use current exchange rates if multi-currency |
| Language | Detect language per response | Translate to English for clustering; keep originals |
| Empty/null | Missing critical fields (time_spent, frustrations) | Note count; include in N but flag in cohort analysis |

### 1.4 Quality Summary Output

```
Data Quality Summary:
- Total raw responses: XX
- Removed (duplicates): XX
- Removed (speeders): XX
- Flagged (inconsistencies): XX
- Final valid responses: XX
- Missing fields: [list fields and % missing]
- Languages detected: [list]
```

---

## Phase 2: Cohort Segmentation

### 2.1 Default Cohort Definitions

| Cohort | Criterion | Rationale |
|--------|-----------|-----------|
| **Passive** | < 1 hour/week | Low engagement; majority in many samples; potential high-volume/low-touch segment |
| **Intermediate** | 1–3 hours/week | Moderate engagement; growing interest |
| **Heavy** | ≥ 3 hours/week | High engagement; power users; potentially different needs |

### 2.2 Computation

For each cohort, compute:
- `share_pct` = n_cohort / n_total × 100
- `n` = absolute count
- `median_hours` = median of weekly_time_spent within cohort
- `median_spend` = median of monthly_spend_total within cohort
- `pct_paying` = share with at least one paid tool

### 2.3 Reporting Table

```markdown
| Cohort | Share | n | Median Hours | Median Spend | % Paying | Notes |
|--------|-------|---|--------------|--------------|----------|-------|
| Passive | XX% | XX | XX h | €XX | XX% | … |
| Intermediate | XX% | XX | XX h | €XX | XX% | … |
| Heavy | XX% | XX | XX h | €XX | XX% | … |
```

### 2.4 Small-Cohort Warning

If any cohort has n < 10 or represents < 15% of total sample:
- Flag: "Directional only — insufficient sample for reliable conclusions."
- Still report findings but caveat them.

### 2.5 Dominant Cohort Identification

- The cohort with the largest share AND a coherent pain profile becomes the **MVP focus segment**.
- If two cohorts are close in size, compare monetization potential (% paying, median spend) to break the tie.

---

## Phase 3A: Behavior vs. Opinion Sieve

### 3A.1 Hard Behavioral Evidence (High Trust)

Extract and report:
- **Tools used** (Top-5 overall; Top-3 per cohort)
- **Paid tools** (which ones; what share of cohort pays)
- **Monthly spend** (median, range per cohort)
- **Trading frequency** (median trades/week per cohort)
- **Asset classes** (distribution per cohort)

### 3A.2 Soft Opinion Evidence (Lower Trust)

Extract and report with explicit caveats:
- **Desired features** (themes only — translate to problems)
- **Willingness-to-pay** (bands/ranges per cohort)
- **Self-reported importance ratings** (if available)

### 3A.3 Contradiction Detection

Systematic check:
- Cross-tabulate WTP (high/medium/low) against actual monthly_spend
- Flag: respondents with WTP = "high" AND spend = €0
- Report contradiction rate per cohort
- Interpret: high contradiction rate = low predictive validity of stated WTP

Output format:
```markdown
### Contradictions Detected
- XX% of respondents claim "high WTP" but currently spend €0/month.
- Cohort breakdown:
  - Passive: XX% contradictory
  - Heavy: XX% contradictory
- Implication: Stated WTP in [cohort] is unreliable; validate via pricing experiments.
```

---

## Phase 3B: Qualitative Text Clustering

### 3B.1 Objective

Convert free-text responses (frustrations, feature wishes) into **problem clusters**. The output is a set of underlying pains/jobs — never a list of features.

### 3B.2 Method: Two-Pass Thematic Coding

**Pass 1 — Open Coding:**
- Read each response.
- Extract the core problem/pain expressed (strip solution language).
- Assign 1–2 preliminary codes per response.
- Allow codes to emerge inductively from data.

**Pass 2 — Axial Coding (Consolidation):**
- Group similar codes into 3–4 main clusters.
- Merge overlapping codes.
- Ensure each cluster is:
  - Distinct (minimal overlap)
  - Actionable (can inform a design/product decision)
  - Evidence-backed (supported by multiple responses)
- Create an "Other" bucket for long-tail items.

### 3B.3 Translation Rules

| User Says (Feature/Solution) | Translate To (Problem/Pain) |
|-----------------------------|-----------------------------|
| "I want real-time alerts" | Fear of missing critical moves; cannot monitor continuously |
| "Need better charts" | Visual overload; cannot extract signal from noise quickly |
| "Want AI recommendations" | Decision paralysis; lack confidence in own analysis |
| "Integrate with my broker" | Execution friction; context-switching wastes time |

### 3B.4 Suggested Cluster Categories (Adapt to Data)

- **Data trust / signal confidence** — "Can I trust what I'm seeing?"
- **Time scarcity / cognitive overload** — "I don't have time for this complexity."
- **Complexity / noise vs. clarity** — "Too much information, not enough insight."
- **Error risk / execution friction** — "I'm afraid of making costly mistakes."
- **Other** — Long-tail items below threshold.

### 3B.5 Quantification

For each cluster:
- `frequency_overall` = responses mentioning this cluster / total valid responses × 100
- `frequency_target_cohort` = responses in target cohort mentioning this / n_target_cohort × 100
- Report both values.

### 3B.6 Reporting Thresholds

- Promote to main cluster: ≥ 15% in target cohort OR high-intensity quotes (strong emotional language, consequences described).
- Keep in "Other": < 15% and low intensity.
- Always include 1–2 anonymized, representative quotes per cluster.

### 3B.7 Output Format

```markdown
## Problem Clusters

| # | Cluster | Overall | Target Cohort (Passive) | Intensity |
|---|---------|---------|------------------------|-----------|
| 1 | Data trust / signal confidence | XX% | XX% | High/Med/Low |
| 2 | Time scarcity / cognitive overload | XX% | XX% | High/Med/Low |
| 3 | Complexity / noise vs. clarity | XX% | XX% | High/Med/Low |
| 4 | Error risk / execution friction | XX% | XX% | High/Med/Low |
| — | Other | XX% | XX% | — |

### Representative Quotes (Anonymized)
**Cluster 1 – Data Trust:**
- "..." (Passive, ID-XX)
- "..." (Heavy, ID-XX)

**Cluster 2 – Time Scarcity:**
- "..." (Passive, ID-XX)
```

---

## Phase 4A: So-What Framework

### Structure

For each of the top 3–4 insights, produce concrete guidance for the Product Trio:

#### For Product Manager (Value / Viability)

Answer:
- What real outcome do customers care about?
- What evidence exists that they would pay to solve this?
- What is the smallest problem slice that could unlock payment?
- What is the MVP value proposition in one sentence?

Format:
```markdown
**PM – Value:**
- Core problem: [one sentence]
- Payment evidence: [paid substitutes, budget bands, behavior signals]
- MVP value prop: "[one sentence that a customer would nod to]"
- Risk: [what could make this wrong]
```

#### For Product Designer (Usability / Desirability)

Answer:
- What UI/UX principles does the target cohort's behavior demand?
- What is the appropriate information density?
- What are the critical moments (where trust/confidence must be built)?
- What interaction patterns suit the time budget?

Format:
```markdown
**Design – Usability:**
- Primary UX principle: [e.g., data reduction over data richness]
- Information density: [e.g., summary-first, details on demand]
- Critical moments: [e.g., first portfolio check, alert receipt]
- Interaction budget: [e.g., <2 min per session for Passive users]
- Anti-pattern to avoid: [e.g., complex multi-chart dashboards]
```

#### For Tech Lead (Feasibility / Cost)

Answer:
- What data freshness is actually needed (end-of-day vs. intraday vs. real-time)?
- What integrations/APIs are prerequisites?
- What are the cost drivers and where can we save?
- What compliance/privacy constraints exist?

Format:
```markdown
**Tech – Feasibility:**
- Data freshness: [recommendation with rationale]
- Required integrations: [list with priority]
- Cost drivers: [e.g., real-time market data fees, compute for ML]
- Cost-saving levers: [e.g., EOD data covers 77% of use cases]
- Compliance: [e.g., GDPR, financial data regulations]
```

---

## Phase 4B: MVP Persona

### Template

Build from the dominant cohort's actual data. Every field must be traceable to survey evidence.

```markdown
## MVP Persona: [Name]

**Profile:**
- Segment: [Cohort name] ([share]% of sample, n=[X])
- Behavior: [hours/week], checks [frequency], [trading style]
- Experience: [level]
- Asset focus: [classes]

**Goals / Desired Outcomes:**
- [Primary outcome — what success looks like for them]
- [Secondary outcome]

**Biggest Frustrations (from clusters):**
1. [Cluster X]: "[short quote]"
2. [Cluster Y]: "[short quote]"

**Current Tools & Spend:**
- Tools: [list, with paid/free status]
- Monthly spend: €[median] (range: €[min]–€[max])

**Realistic Budget for New Tool:**
- €[range]/month (derived from: current spend + stated WTP, weighted toward behavior)

**Buying Trigger:**
- [What event or realization would make them try/buy]

**"Won't Accept" (Dealbreakers):**
- [Non-negotiable — what would make them leave immediately]
- [e.g., complexity requiring >5 min setup, unreliable data, hidden fees]

**Evidence Confidence:**
- Behavior data: [High/Medium/Low]
- Pain clusters: [High/Medium/Low]
- Budget estimate: [High/Medium/Low — likely Low if WTP is self-reported only]
```

---

## Phase 4C: Triangulation and Next Experiments

### Validation Priorities

| Insight | Validation Method | Priority | Effort |
|---------|------------------|----------|--------|
| Top problem cluster | 5–8 qualitative interviews (target cohort) | High | Medium |
| WTP / pricing | Smoke test or pricing page experiment | High | Low–Medium |
| UX assumptions | Prototype usability test (3–5 users) | Medium | Medium |
| Data freshness needs | Concierge MVP with EOD data; measure satisfaction | Medium | Low |
| Cohort differences | Behavioral analytics post-launch (if applicable) | Low (deferred) | High |

### Recommended Next Steps (Ordered)

1. Conduct 5–8 discovery interviews with Passive cohort members to validate top pain clusters.
2. Run a lightweight pricing experiment (landing page with price point) to test real WTP.
3. Build a low-fidelity prototype addressing Cluster 1 for usability testing.
4. Revisit survey data after interviews — update clusters and persona if needed.

---

## Phase 5: Report Template

Use this exact structure for the final deliverable. Fill all placeholders with real data.

```markdown
# Product Discovery Survey Report (n=XX)

**Date:** YYYY-MM-DD
**Analyst:** [AI / Human name]
**Scope:** First-pass survey analysis following Cagan/Inspired principles.
**Confidence Level:** Exploratory (small sample, self-reported data)

---

## Executive Summary
- Dominant segment: [Cohort] at [XX]% of sample.
- Top problem: [Cluster name] — affects [XX]% of target cohort.
- Key contradiction: [one sentence].
- Recommended next action: [one sentence].

---

## 1) Data Quality Summary
- Raw responses: XX
- Valid after cleaning: XX
- Removed: XX (reasons: …)
- Key missing fields: …

## 2) Cohort Segmentation
[Table from Phase 2]

## 3) Behavior vs. Opinion Sieve
### Hard Evidence
[From Phase 3A.1]
### Soft Evidence
[From Phase 3A.2]
### Contradictions
[From Phase 3A.3]

## 4) Problem Clusters
[Table and quotes from Phase 3B]

## 5) So-What? for Product Trio
### PM (Value)
[From Phase 4A]
### Design (Usability)
[From Phase 4A]
### Tech (Feasibility)
[From Phase 4A]

## 6) MVP Persona
[From Phase 4B]

## 7) Next Experiments
[From Phase 4C]

## 8) Methods & Limitations
- Cleaning steps applied: …
- Cohort definitions: …
- Clustering method: two-pass thematic coding
- Key assumptions: …
- Limitations:
  - Small sample (n=XX): findings are directional, not statistically significant.
  - Self-reported behavior: may overstate engagement and WTP.
  - Convenience sample: not representative of total addressable market.
  - Single data source: no triangulation with behavioral telemetry yet.

## 9) Appendix
- Schema mapping log
- Full cluster codebook
- Quote library (anonymized)
```

---

## Statistical Hygiene

| Rule | Rationale |
|------|-----------|
| Report whole-number percentages | False precision misleads with n≈50 |
| Always show cohort N in parentheses | e.g., "62% (n=8 of 13)" — reader sees the small base |
| Use medians, not means, for spend/time | Skewed distributions are common |
| Do not infer causality | Describe associations and differences only |
| Flag directional findings | Any cohort with n<10 is "suggestive, not conclusive" |
| No p-values or significance tests | Sample too small; creates false confidence |

---

## Bias, Ethics, and Privacy

| Concern | Mitigation |
|---------|-----------|
| **Sampling bias** | Label as convenience sample. Do not generalize to TAM. |
| **Social desirability** | Expect overstatement of skill, engagement, and WTP. Weight behavior over claims. |
| **Anchoring** | If survey showed price ranges, note potential anchoring in WTP responses. |
| **Language bias** | Translate consistently; retain originals for audit. |
| **Privacy** | No PII in quotes or tables. Aggregate sensitive fields. Use ID codes only. |
| **Confirmation bias (analyst)** | Follow the method mechanically. Report contradictions to your own hypothesis. |

---

## Internal AI Prompts

Use these prompts internally during analysis. They are not shown to the end user.

### Data Mapping
```
Given columns [X, Y, Z, ...], map them to standard fields:
weekly_time_spent, tools_used, paid_spend_eur, frustrations_text, desired_features_text.
Output a mapping table and flag any unmappable columns.
```

### Contradiction Detection
```
Cross-tabulate willingness_to_pay against monthly_spend_total.
List respondents where WTP >= "high" but spend = €0.
Report: count, share overall, share per cohort.
```

### Cluster Inference
```
From these free-text responses, extract the underlying problem statement (not the feature request).
Group into ≤4 themes. For each theme provide:
- Theme name
- 2-sentence description of the pain
- Frequency (count and %)
- 2 representative anonymized quotes
```

### So-What Synthesis
```
For each top cluster, provide:
- One PM value statement (what problem to solve for payment)
- One UX principle (how the interface should behave)
- One tech feasibility note (what infrastructure is needed/not needed)
Keep each to 1-2 sentences. Be concrete and testable.
```

### Persona Drafting
```
Using the dominant cohort's statistics, write a factual persona.
Include: behavior pattern, goals, frustrations (mapped to clusters), current tools,
monthly spend, realistic budget, buying trigger, and dealbreakers.
Every claim must trace to a data point. Flag low-confidence items.
```

---

## QA Rubric

Run this checklist before finalizing the report. All items must pass.

| Category | Criterion | Pass? |
|----------|-----------|-------|
| **Cohort Integrity** | Uses behavior (not demographics) for segmentation | ☐ |
| | Reports per-cohort differences (not just averages) | ☐ |
| | Flags small cohorts appropriately | ☐ |
| **Evidence Weighting** | Paid behavior prioritized over hypothetical WTP | ☐ |
| | Contradictions explicitly stated and quantified | ☐ |
| | No feature wishlist presented as findings | ☐ |
| **Clustering Quality** | 3–4 coherent problem clusters (not feature categories) | ☐ |
| | Quotes support clusters; features translated to pains | ☐ |
| | Frequency reported overall AND per target cohort | ☐ |
| **Decision Usefulness** | Clear PM/Design/Tech implications stated | ☐ |
| | Implications are concrete, specific, and testable | ☐ |
| | MVP persona grounded in data (not fiction) | ☐ |
| **Transparency** | Cleaning steps and assumptions logged | ☐ |
| | Limitations acknowledged (sample size, bias, self-report) | ☐ |
| | Confidence level stated per major finding | ☐ |
| **Completeness** | All sections of the report template filled | ☐ |
| | Next experiments recommended | ☐ |
| | Handover checklist completed | ☐ |

---

## Do's and Don'ts

### Do

- Center analysis on behavior and paid signals.
- Present segmented insights and contradictions clearly.
- Keep outputs concise, testable, and decision-ready.
- Translate feature requests into underlying problems.
- Use quotes to bring clusters to life (anonymized).
- State confidence level for each major finding.
- Recommend concrete next experiments.
- Acknowledge what you do NOT know.

### Don't

- Turn the survey into a feature wishlist or roadmap vote.
- Average away cohort differences into meaningless means.
- Overclaim beyond what the data supports.
- Present hypothetical WTP as reliable revenue projections.
- Ignore contradictions between stated intent and actual behavior.
- Skip the Methods & Limitations section.
- Use statistical language (significance, p-values) inappropriately for small samples.
- Include PII or identifiable information in the report.

---

## Handover Checklist

Complete before delivering the report:

- [ ] Data schema mapped and mapping logged
- [ ] Cleaning summary produced (rows removed, reasons)
- [ ] Cohorts assigned and reported with Ns and medians
- [ ] Behavior vs. opinion sieve complete with contradiction rates
- [ ] Problem clusters finalized (3–4 + Other)
- [ ] Representative quotes selected (anonymized)
- [ ] So-What actions for PM/Design/Tech drafted
- [ ] MVP persona written and evidence-linked
- [ ] Next experiments recommended with priority
- [ ] Methods & limitations section included
- [ ] QA rubric passed (all items checked)
- [ ] No PII in final document
- [ ] Report reviewed for overclaiming or unsupported assertions

---

## Optional Enhancements

Apply if time/data permits:

| Enhancement | Description |
|-------------|-------------|
| **Confidence annotation** | Tag each finding as High/Medium/Low confidence based on evidence strength. |
| **Sensitivity analysis** | Show how insights change if cohort thresholds shift (e.g., Heavy ≥ 5h). |
| **Quote library** | Full appendix of anonymized quotes per cluster, beyond the 2 shown in-report. |
| **Spend distribution chart** | Histogram of monthly spend across cohorts (if data rich enough). |
| **Cross-cohort migration** | If longitudinal data exists: who moved from Passive to Heavy and why? |
| **Competitive landscape map** | Tools used mapped against capabilities and price points. |

---

*End of Detailed Execution Guide. Return to → [`master_survey_analysis_playbook.md`](./master_survey_analysis_playbook.md)*
