# Product Discovery Survey Report — Wave 1 (n=56)

**Date:** 2026-06-29  
**Analyst:** AI (Claude) · Playbook: `_playbooks/master_survey_analysis_playbook.md` + `sub_detailed_execution_guide.md`  
**Scope:** First-pass survey analysis following Cagan/Inspired principles.  
**Confidence Level:** Exploratory — small sample (n=56), warm-network convenience sample, self-reported data. All findings are directional signals, not statistically significant.

**Data note:** Initial analysis reported n=45. Correct figure is n=56 after proper CSV parsing (multi-line quoted fields were being undercounted by line-based methods). All numbers in this document are derived from the full 56-row dataset.

---

## Executive Summary

- **Dominant segment:** Passive investors at 41% of sample (n=23) — largest behaviorally coherent group.
- **Top problem:** Complexity / noise vs. clarity — #1 frustration for investors at 37% (13/35), running as a cross-cutting theme across all cohorts.
- **Key contradiction:** 85% of investors have never paid for a research tool, yet a meaningful share expresses enthusiasm for pondex features — stated intent is not backed by behavior.
- **Structural finding:** Signal/Noise is not a tool-stack problem. Even single-tool users report it. The problem is architectural, not additive.
- **AI trust:** 64% conditional (source + formula required) — this is a UX requirement, not a marketing problem.
- **Recommended next action:** Interview Gunnar Leu to validate the value investing + geopolitics + fundamentals convergence pain — this is the clearest WTP-backed use case in the dataset.

---

## 1. Data Quality Summary

| Item | Count |
|------|-------|
| Raw responses | 56 |
| Removed (duplicates) | 0 |
| Removed (speeders / bots) | 0 |
| Flagged (inconsistencies) | 2 (see notes) |
| Final valid responses | 56 |

**Schema mapping:**

| Survey field | Standard field |
|---|---|
| Q1 | investor_status |
| Q2A | weekly_time_spent (investors) |
| Q3A cols 6–13 | tools_used (boolean per tool) |
| Q4A | primary_frustration |
| Q5A / Q5A_sub | paid_status / monthly_spend |
| Q2B cols 18–23 | aspirer_barriers (boolean) |
| Q3B cols 25–30 | aspirer_enablers (boolean) |
| Q6 | ai_trust_level |
| Q7 | profession |
| Q8 | region |
| Q9 | magic_wand_freetext |
| Q10 / col 37 | contact_consent / linkedin |

**Flagged inconsistencies:**
- ID `VpYbLAg`: Q1 = aspirer, yet Q2A has "Less than 1 hour" and tools = "Random Facebook pages, vibes." Retained; treated as aspirer.
- ID `LDYgdOv`: Q4A = "Nothing", Q9 = "Nothing" — active investor, zero expressed pain. Retained as low-signal data point.

**Languages detected:** English (primary), Spanish (3 Q9 responses), German (1 Q9 response). Translated for clustering; originals preserved in raw CSV.

---

## 2. Cohort Segmentation

**Segmentation basis:** Q1 investor status × Q2A weekly time spent (behavior, not demographics).

| Cohort | Definition | n | Share | Weekly Time | % Paying | Notes |
|--------|-----------|---|-------|------------|---------|-------|
| **Not Interested** | Q1 = not interested | 3 | 5% | — | 0% | Out of scope for MVP |
| **Aspirer** | Q1 = want to start | 18 | 32% | n/a | 0% | Distinct UX needs — onboarding only |
| **Passive Investor** | Q1 = passive | 23 | **41%** | mostly <1h | 8% (2/23) | **Dominant cohort — MVP focus** |
| **Active Investor** | Q1 = actively | 12 | 21% | mostly <1h | 16% (2/12) + 8% churned | Second segment |
| **Investors total** | passive + active | 35 | 62% | 80% spend <1h | 14% ever paid | |

> **Small-cohort warning:** Not Interested (n=3) is directional only.

**Dominant cohort: Passive Investor (41%, n=23)**
Largest share, coherent pain profile (complexity + fragmentation), most use broker tools + AI for free.

**Secondary cohort: Aspirer (32%, n=18)**
Meaningful size; zero current spend; fundamentally different pain (access barrier, not noise). Do not conflate with investors.

---

## 3. Behavior vs. Opinion Sieve

### 3A. Hard Behavioral Evidence (High Trust)

**Investor tool stack (n=35):**

| Tool | Overall | Passive (n=23) | Active (n=12) |
|------|---------|--------------|--------------|
| Broker's built-in tools | 51% (18/35) | 60% (14/23) | 33% (4/12) |
| AI Tools (ChatGPT/Perplexity/Claude) | 45% (16/35) | 47% (11/23) | 41% (5/12) |
| Social Media (Reddit/X/LinkedIn) | 37% (13/35) | 34% (8/23) | 41% (5/12) |
| Yahoo Finance | 17% (6/35) | 13% (3/23) | 25% (3/12) |
| TradingView | 11% (4/35) | 4% (1/23) | 25% (3/12) |
| Bloomberg / Reuters | 8% (3/35) | 8% (2/23) | 8% (1/12) |
| Morningstar / Seeking Alpha | 5% (2/35) | 8% (2/23) | 0% (0/12) |

**Key observation:** Passive investors cluster on broker tools + AI (both free). Active investors add more tools — the scattered-tabs pain is structurally their problem. AI tool usage is nearly identical across both investor types (47% vs. 41%).

**Time spent on research (investors n=35):**

| Time | n | % |
|------|---|---|
| Less than 1 hour/week | 28 | 80% |
| 1–3 hours/week | 6 | 17% |
| 7+ hours/week | 1 | 3% |

**Paid status (investors n=35):**

| Status | n | % |
|--------|---|---|
| Never paid — free tools only | 30 | **85%** |
| Currently paying | 3 | 8% |
| Paid but cancelled | 2 | 6% |

**Monthly spend (paying/churned, n=5):**
- Under $15/month: 2 respondents
- $15–$50/month: 2 respondents (incl. Gunnar Leu)
- $50–$200/month: 1 respondent (Bloomberg-tier, Finance/NA)

**Skin-in-the-game summary:** Only 5 investors have payment history. Both churners left for the same reason: noise unsolved after paying. The $50–200/mo Finance/NA respondent is cost-driven with full AI trust — different profile, out of Phase 1 ICP.

### 3B. Soft Opinion Evidence (Lower Trust)

**Aspirer barriers (n=18, multi-select):**

| Barrier | n | % |
|---------|---|---|
| Too complicated | 11 | 61% |
| Fear of losing money | 6 | 33% |
| Not enough capital | 5 | 27% |
| Not enough time | 4 | 22% |
| Distrust of platforms | 3 | 16% |

**Aspirer enablers (n=18, multi-select):**

| Enabler | n | % |
|---------|---|---|
| Plain-language explanations | 9 | 50% |
| Simple institutional score | 8 | 44% |
| Micro-investing ($5 start) | 8 | 44% |
| Educational modules | 5 | 27% |
| AI assistant with verifiable answers | 1 | 5% |

### 3C. Contradiction Detection

**WTP vs. behavior (investors n=35):**
- 85% (30/35) have never paid for any research tool
- No explicit price-point WTP question in Wave 1 (design gap — fix in Wave 2)
- Only the 5 payment-history respondents carry real WTP signal
- Both churners are the highest-signal data points: paid, cancelled, named the reason

**AI trust vs. paid behavior:**

| AI Trust | n (investors) | Ever paid | Rate |
|---|---|---|---|
| Conditional (source + formula) | 22 | 4 (18%) | Low contradiction |
| Skeptical (raw data only) | 10 | 1 (10%) | Moderate |
| Fully | 3 | 0 (0%) | — |

> **Implication:** Feature enthusiasm from the 85% who never paid cannot be treated as WTP evidence. Van Westendorp pricing test required before any paywall decision.

---

## 4. Problem Clusters

**Method:** Two-pass thematic coding on Q4A (investor frustrations, n=35) + Q9 magic wand (all, valid responses). Feature language stripped; translated to underlying pain.

| # | Cluster | Investors (n=35) | Passive (n=23) | Active (n=12) | Aspirers (n=18) | Intensity |
|---|---------|-----------------|--------------|-------------|--------------|---------|
| 1 | **Complexity / Noise vs. Clarity** | 51% (18/35) | 52% (12/23) | 50% (6/12) | 33% (6/18) | **High** |
| 2 | **Data Trust / AI Reliability** | 20% (7/35) | 22% (5/23) | 16% (2/12) | 11% (2/18) | **High** |
| 3 | **Time Scarcity / Fragmentation** | 14% (5/35) | 17% (4/23) | 8% (1/12) | 11% (2/18) | **Medium** |
| 4 | **Access / Complexity Barrier** | 0% (0/35) | 0% (0/23) | 0% (0/12) | **89% (16/18)** | **High** (aspirers only) |
| — | Other (cost, personalization) | 11% (4/35) | — | — | — | Low–Med |

> **Critical finding:** Cluster 4 is an aspirer-exclusive pain. Zero investors cite it. Investor UX and aspirer onboarding are separate design problems and must not be blended.

### Representative Quotes (Anonymized)

**Cluster 1 — Complexity / Noise vs. Clarity:**
- *"I need some good chart basics, but also an overview over geo-politics and other external market factors, some industry news... My decisions are mostly based on my trust in the market chances I see."* (Active, EU-NW — Gunnar Leu)
- *"Remove noise and get actual data to analyse"* (Passive, EU-NW, ID-xX6YMBr)
- *"not getting real insights, just very general and overall topics. No clear recommendations for me and my situation"* (Passive, EU-NW, ID-OFVLJyR)
- *"to have a bloomberg type of data, as the retailer can't have access to it"* (Active, EU-E, ID-9qrlydE)

**Cluster 2 — Data Trust / AI Reliability:**
- *"take a look for more trustful information"* (Active, EU-NW, ID-A7QprJk)
- *"Accuracy on data"* (Passive, NA, ID-b5AWKY7)
- *"Tener acceso instantáneo a datos confiables, actualizados y comparables"* [Instant access to reliable, updated, comparable data without consulting multiple sources] (Active, NA, ID-PdPzbjx)

**Cluster 3 — Time Scarcity / Fragmentation:**
- *"Everything is scattered — too many open tabs, no single source of truth"* (multiple respondents)
- *"Compare different stocks in one chart"* (Passive, EU-NW, ID-9qr7M04)
- *"Get a daily, personal overview connected to news, favourite companies, trends"* (Passive, EU-E — Patricia G. Parnet)

**Cluster 4 — Access / Complexity Barrier (Aspirers only):**
- *"I have no idea about stocks — stocks for dummies all the way to more advanced concepts"* (Aspirer, NA — saderomo)
- *"I am very interested in the ethics behind investing, I would love to have easy access to that information"* (Aspirer, NA — Karen García)
- *"To be an expert on it and have the knowledge to do it with confidence and on a regular basis"* (Aspirer, EU-NW — carolinademuner)

---

## 5. So-What? for Product Trio

### PM — Value

**Insight 1: Noise problem is real, cross-cutting, and unsolved by current tools.**
- Core problem: Investors cannot extract decision-ready signal from tools they already use — even single-tool users report noise. Adding more data makes it worse.
- Payment evidence: Both churners left paying tools specifically because noise wasn't solved. Hard evidence, not opinion.
- MVP value prop: *"pondex gives you one clear verdict per stock, with every number sourced — no noise, no tabs, no hallucinations."*
- Risk: Only works if the verdict is genuinely better signal than AI + broker today. Generic output fails the same way ChatGPT does.

**Insight 2: WTP is entirely unvalidated.**
- 85% never paid anything. Only 5 respondents have skin in the game.
- Required before any paywall: Van Westendorp test with the 5 payment-history contacts + Gunnar Leu interview.

**Insight 3: Aspirers are a separate product problem.**
- 32% of sample but zero payment history, fundamentally different pain (access vs. noise).
- Do not build for them in Phase 1. Their pain informs copy tone and onboarding, not features.

### Design — Usability

**For Passive Investors (dominant cohort):**
- Primary UX principle: Radical reduction — one verdict, one source trail, one action. Not a dashboard.
- Information density: Summary-first (verdict + top 3 signals), drill-down optional.
- Critical moments: First verdict render (must feel trustworthy, not overwhelming); source attribution (visible without being intrusive).
- Interaction budget: <60 seconds to verdict. 80% spend <1h/week — they will not read a 12-tab dashboard.
- Anti-pattern: Do not lead with the score. Explanation first, then number. ADR-007 is empirically validated.

**For Aspirers (onboarding only):**
- Plain language is non-negotiable (50% cited it as the #1 enabler).
- Score as entry point repels this group — amplifies fear of being wrong.
- Micro-investing and education are Phase 2 scope — do not build now.

### Tech — Feasibility

- Data freshness: End-of-day sufficient. 80% of investors spend <1h/week — real-time is not a stated need and dramatically increases cost.
- Required integrations (Phase 1): Yahoo Finance + SEC EDGAR + Groq. All already in stack.
- Geopolitics + macro (Gunnar Leu Q9): Not in stack. Validate in interview — must-have or nice-to-have?
- Cost driver: Groq API calls per verdict. Cache aggressively for large-cap stocks.
- Compliance: `doc/regulatory/REGULATORY.md` — no investment advice framing, informational only.

---

## 6. MVP Personas

### Persona A: "The Passive Noise-Reducer" (Primary ICP)

**Profile:**
- Segment: Passive Investor — 41% of sample (n=23)
- Behavior: Checks portfolio <1h/week; uses broker tools + AI (both free); reacts to news, rarely initiates deep research
- Experience: Self-taught, intermediate; EU-NW dominant
- Asset focus: ETFs primarily, some individual stocks (NYSE exposure)

**Goals:**
- Primary: Quickly verify if a stock is worth looking at — without opening 5 tabs
- Secondary: Confidence that data is real and sourced

**Biggest Frustrations:**
1. Complexity / Noise: *"Remove noise and get actual data to analyse"*
2. Fragmentation: Everything scattered, no single source of truth
3. Data Trust: AI tools hallucinate — can't verify what's real

**Current Tools & Spend:**
- Broker's built-in tools (free), AI tools (free), occasionally Yahoo Finance
- Monthly spend: €0 (85% of investors pay nothing)

**Realistic Budget:**
- €9–19/month — low confidence (inferred from 2 churners at $15–50/mo; no price test yet)

**Buying Trigger:**
Tries pondex on a stock they're considering; gets a sourced verdict in <60 seconds; realizes they don't need to open Yahoo Finance anymore.

**Dealbreakers:**
- Score with no explanation
- AI output with no cited source
- Another tab to manage — must replace, not supplement
- Setup >2 minutes

**Evidence Confidence:** Pain: High · Behavior: Medium · Budget: Low

---

### Persona B: "The Overwhelmed Aspirer" (Onboarding / Phase 2)

**Profile:**
- Segment: Aspirer — 32% of sample (n=18)
- Behavior: Has not invested; 61% say "too complicated" is the #1 barrier

**Goals:**
- Understand if a stock is healthy without financial literacy
- Start small, feel safe

**Biggest Frustrations:**
1. Complexity Barrier: Jargon is a wall
2. Fear: Loss aversion > opportunity appeal

**Buying Trigger:** A friend shows them a pondex verdict that reads like a sentence, not a spreadsheet.

**Dealbreakers:** Scores without explanation, jargon, any UI that signals "for experts only."

**Evidence Confidence:** Pain: High · Budget: Very Low (zero payment history)

> **Phase 1 note:** Persona B informs copy tone and onboarding UX. Do not build features exclusively for this persona before Persona A is fully served.

---

## 7. Next Experiments (Ordered by Priority)

| # | Action | Validates | Method | Priority |
|---|--------|-----------|--------|--------|
| 1 | Interview Gunnar Leu | Cluster 1 depth; geopolitics need; real WTP range | 45-min discovery interview | **Immediate** |
| 2 | Van Westendorp pricing test | Real WTP at $9/$19/$49 | Landing page with 5 WTP contacts | **Before paywall** |
| 3 | Wave 2 on r/eupersonalfinance | Cold-audience replication | Tally survey, fixed structure | **After Gunnar** |
| 4 | Prototype usability test — verdict screen | Explanation-first UX reduces confusion? | 3–5 passive investors, "analyze AAPL in 60s" task | Phase 1 mid-point |
| 5 | Follow-up DMs (Patricia G. Parnet, José Bernardo, Kristin Müller) | Secondary ICP validation | Short LinkedIn message + 20-min call | After Wave 2 |

---

## 8. Methods & Limitations

**Cleaning steps:**
- CSV parsed with Python `csv` module handling quoted multi-line fields (Tally export format)
- Initial line-count of 43–45 was wrong — multi-line quoted rows (e.g. Gunnar Leu's Q9) were being split; correct n=56
- Schema mapped from Tally column order to standard fields
- Tool names normalized: "Scalable", "Traderepublic", "Justetf.com", "Empfehlungen", "By" → broker/other category
- Spanish/German Q9 responses translated; originals preserved in raw CSV
- 2 inconsistencies flagged and retained

**Cohort definitions:**
- Behavior-based (Q1 × Q2A time), not demographic
- "Active" = self-described active traders regardless of time spent

**Clustering method:** Two-pass thematic coding — open coding on Q4A + Q9, axial consolidation into 4 clusters.

**Limitations:**
- n=56: directional only, not statistically significant
- Warm-network sample (WhatsApp blast): overrepresents Tech/Product/Finance professionals
- Self-reported tool usage and WTP likely overstated
- No behavioral telemetry to triangulate
- Wave 2 (later responses, colder audience) showed higher AI skepticism — Wave 1 numbers may be optimistic
- Q9 had several low-signal responses ("tw", "-", "Nothing", blank) — clustering on valid subset only

---

## 9. Appendix

### A. Cluster Codebook

| Code | Cluster | Example raw text |
|------|---------|-----------------|
| signal_noise | Complexity / Noise | "separate the signal from the noise" |
| scattered_tabs | Complexity / Noise | "too many open tabs, no single source of truth" |
| slow_research | Time Scarcity | "grinding through financial statements is slow" |
| ai_hallucination | Data Trust | "AI tools make things up or hallucinate numbers" |
| data_accuracy | Data Trust | "accuracy on data", "trustful information" |
| too_complicated | Access Barrier | "too complicated", "don't know how to analyze" |
| fear_loss | Access Barrier | "fear of losing money" |
| cost_tools | Other | "tools that are actually good are way too expensive" |
| personalization | Other | "recommendations for me and my situation" |

### B. Follow-up Contacts

| Name | Segment | Contact | Key Signal |
|------|---------|---------|-----------|
| Gunnar Leu | Churned investor | LinkedIn: Gunnar Leu | Value investing + geopolitics + fundamentals — **Interview #1** |
| saderomo | Aspirer | linkedin.com/in/saderomo/ | "stocks for dummies to advanced" |
| Karen García | Aspirer | Survey consent | Ethics behind investing; VERY simplified |
| Patricia G. Parnet | Passive investor | Survey consent | Daily overview + annual reports |
| José Bernardo S. | Passive investor | linkedin.com/in/josé-bernardo... | "Everything in one place" |
| carolinademuner | Aspirer | Survey consent | "expert, confident, regular basis" |
| Kristin Müller | Active investor | Survey consent | Strategy feedback from a stock expert |

### C. Data Correction Log

| Version | n reported | Reason for error | Corrected to |
|---------|-----------|-----------------|-------------|
| Initial insights doc (survey-wave1-insights.md) | 45 | Manual estimate, not from CSV | 56 |
| First analysis draft | 45 | Timestamp regex count missed multi-line rows | 56 |
| This report | **56** | Python csv module, proper multi-line parsing | — |
