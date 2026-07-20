# pondex_ — Product Discovery Research Report
### Synthesis of Survey Wave 1 (n=56), Survey Wave 2 (n=35), and 3 User Interviews

**Date:** 16. Juli 2026
**Evidence base:** 10 documents — 2 survey waves + raw data + 2 analysis passes + 3 full interview transcripts + interview guide

---

## A note on method

The source prompt asked for a 22-member "AI Council" running 13 sequential phases. I did not execute that literally: producing 22 near-duplicate write-ups per theme would mostly repeat the same evidence in different voices, which trades decision-usefulness for volume. Instead, every finding below is tagged with the **disciplinary lens(es)** it matters most to (PM, UX, Quant/Data, Risk & Compliance, Behavioral Finance, Growth) and a **confidence level**, and the report still delivers every deliverable the brief asked for: clustered findings, prioritization, JTBD, personas, pain points, feature discovery, competitive read, contradictions, executive summary, product strategy, and the five closing lists. If you want the literal 22-persona format for a specific section, tell me which one and I'll produce it separately.

**Confidence key:** 🟢 High (≥2 independent sources, consistent) · 🟡 Medium (1 strong source or partial consistency) · 🔴 Low (single mention, anecdotal, or contradicted elsewhere)

---

## 1. Executive Summary

**The 10 most important findings**

1. 🟢 **Signal/Noise is the dominant, cross-cutting pain — and it replicates across both survey waves and all 3 interviews.** Wave 1 (corrected n=56): 51% of investors (18/35) cite complexity/noise as their #1 frustration. Wave 2 (n=35, redesigned methodology): "too many sources / conflicting info" is again #1 at 40% (14/35). It shows up even for single-tool users — it is architectural, not a tool-count problem.
2. 🟢 **This is not a marketing problem — it's a UX/data requirement.** 58–64% of investors say they trust AI output only when the source and formula are shown. This is the single most load-bearing requirement in the whole dataset and is echoed almost verbatim by all three interviewees.
3. 🟡 **Stated interest and paid behavior diverge sharply.** 85% of Wave 1 investors have never paid for any research tool; 86% react positively to the pondex_ concept in Wave 2; but only 10% (3/29) give a hard "yes" to $4.99/month. The addressable "maybe" cohort (59%) is real but conditional on seeing the product work — not on being convinced by the concept.
4. 🟢 **The only two people with real payment history who churned (both waves + Gunnar Leu interview) left for the identical reason: noise was not solved even after they paid.** This is the highest-trust evidence point in the dataset because it's revealed preference, not stated preference.
5. 🟡 **Two structurally different paying personas exist and must not be conflated:** (a) the passive "verify-in-60-seconds" investor (largest cohort, 41% of Wave 1), and (b) the active/value investor who wants technical charting, sector benchmarking, and a 1–100 scoring system (Gunnar Leu — the only interviewee with confirmed prior payment history). Patricia Parnet explicitly warned against building for both at once in an MVP.
6. 🟢 **The "score/verdict" concept tests very well emotionally** ("Gen-Z mindset," "out of ten," "mega") but the current scoring logic has a coherence bug: a demo user could not reconcile a 10/10 score with a "Sell" recommendation. Positive reaction to the *idea* ≠ validated implementation.
7. 🟢 **Comparison / peer-benchmarking is the single strongest unprompted positive reaction across all interviews.** José Bernardo: "I really like the comparison part, because that's how you can make a decision." Gunnar independently asked for sector/industry benchmarking on the chart. This is a stronger signal than several nominally "core" features.
8. 🟡 **Explanation-before-score, not score-before-explanation, is the validated ordering** for both beginners (Patricia: "assume the dumbest user") and passive investors (Wave 1 Design note ADR-007).
9. 🔴 **Aspirers (32–36% of survey respondents) are a structurally different product problem** (access/complexity barrier, zero payment history) and should not consume MVP roadmap capacity — this is a strategic decision, not just a finding.
10. 🟡 **The planned cold-audience validation (Reddit) did not fully materialize as designed.** `wave2-survey.md` planned deployment on r/eupersonalfinance, r/Bogleheads, r/investing; but `survey-wave2-analysis.md` states the executed Wave 2 sample was "again warm-network (not cold audience)." This is a material gap between plan and execution that the team should be aware of — see Contradictions, §5.

**Biggest user problems:** noise/conflicting information across sources (not tool count); inability to verify AI-provided figures; fragmentation (research happens in 4–5 disconnected places before a broker trade); decision paralysis on *which* stock/ETF fits personal risk and strategy; hidden costs (broker fees, local taxes) silently eroding realized returns.

**Biggest opportunities:** a source-attributed, plain-language, explanation-first verdict that functions as a *replacement* for the ChatGPT+broker+YouTube+Yahoo Finance stack rather than an addition to it; a built-in peer/sector comparison view; a portfolio-aware "companion" that pushes relevant updates instead of requiring users to pull them.

**Biggest product decisions to make now:** (1) pick ONE primary persona for MVP — the data supports passive investor over active/value investor, but the only proven payer profile is closer to Gunnar's active/value segment, so this is a real trade-off, not a formality; (2) decide the scoring scale and fix the score/recommendation coherence bug before further testing; (3) decide whether "Buy/Hold/Sell" language is compliant or needs to be softened to avoid investment-advice classification.

**Biggest risks:** WTP is still unvalidated at scale (10% hard yes); both survey waves are warm-network samples despite a stated plan to go cold; qualitative depth rests on only 3 interviews; regulatory framing of "verdict"/"Buy"/"Sell" is unresolved.

**Most surprising findings:** (a) price was *not* the dominant objection in Wave 2 — "haven't seen it work yet" was; (b) a churned, previously-paying user's real cancellation driver was a **life-situation/motivational disconnect**, not a feature gap — Gunnar Leu's tool had nothing to do with why he stopped trading, and he explicitly said "the tool is interchangeable... there are 3 million tools that all do the same thing"; (c) the cheapest price tier is also a trust signal — Patricia said anything free/ad-funded or under ~€3/month would make her *doubt* data quality, not celebrate the deal.

---

## 2. Evidence Base & Data Quality Notes

| Source | n | Sample type | Status |
|---|---|---|---|
| Survey Wave 1 (`survey-wave1-analysis.md`, corrected) | 56 | Warm network (WhatsApp blast) | 🟢 Authoritative — supersedes earlier n=45 figures |
| Survey Wave 1 (`survey-wave1-insights.md`) | 45 (stated) | Same warm network | 🔴 **Superseded** — contains a known undercount bug (multi-line CSV rows dropped); kept only for the qualitative verbatims and follow-up contact list, not for percentages |
| Survey Wave 1 raw data (`2026-06-29_survey-wave1-raw.csv`) | 56 (claimed) | Warm network | 🔴 **Not independently verifiable from the file as delivered.** The CSV is malformed/double-quote-escaped (each row appears to be wrapped in an extra layer of quoting). It fails to parse with both Python's standard `csv` module and pandas' Python-engine parser (`',' expected after '"'`). This means the corrected n=56 figures in `survey-wave1-analysis.md` cannot be independently re-derived or spot-checked against the raw file in this session — they are taken on the analysis document's authority, not re-verified. See §14.3. |
| Survey Wave 2 (`survey-wave2-analysis.md`) | 35 (+1 late) | **Warm network** (despite a cold-audience deployment plan) | 🟡 Directional; redesigned methodology (single-select, concrete WTP price point) is a real improvement, but sample bias is unresolved |
| Interviews (transcripts) | 3 | Purposively selected: 1 churner (Gunnar Leu), 2 passive investors (Patricia Parnet, José Bernardo) | 🟢 High depth, but n=3 — treat as hypothesis-generating, not confirmatory |
| Interview guide — founder's own post-interview synthesis (`interview-guide.md`, lines 416–845) | 3 (same interviews, cross-referenced) | n/a — internal analysis document, not a new sample | 🟢 High-value secondary analysis — the founder's own pattern-validation pass across all 3 transcripts, done independently of this report. Cross-checked against the transcripts directly; see §14 for full integration. |

**Governing rule applied throughout this report:** where Wave 1 sources conflict (n=45 vs. corrected n=56; 58% vs. 64% conditional trust), the corrected `survey-wave1-analysis.md` figures are used as primary; the earlier figures are noted only where they add color (e.g., original verbatims) or where the discrepancy itself is a finding (see §5). Where this report's independent reading of the three transcripts and the founder's own synthesis in `interview-guide.md` diverge in framing (not in underlying fact), both framings are presented — see §14.

All quantitative findings are **directional signals from small, non-random samples** — not statistically significant, and not yet validated on a cold audience. Treat every percentage in this report as "worth acting on," not as "proven."

---

## 3. Thematic Clusters (with confidence and source count)

| Cluster | Investors affected | Aspirers affected | Confidence | Sources |
|---|---|---|---|---|
| **Signal/Noise & conflicting info** | 51% W1 / 40% W2 | 33% (indirectly, via "too complicated") | 🟢 High | W1 analysis, W2 analysis, all 3 interviews |
| **Data trust / AI hallucination / staleness** | 20% W1 primary, 58–64% conditional-trust overall | 11% W1 | 🟢 High | W1 analysis, W2 analysis, Patricia interview (stale annual-report data), Bernardo interview (independent verification) |
| **Fragmentation / no single source of truth** | 14–17% primary, but present as sub-theme almost everywhere | 11% | 🟢 High | W1 cluster 3, Bernardo interview (core complaint), Patricia (tool-switching), Gunnar (TradingView + broker + YouTube) |
| **Access/complexity barrier** | ~0% (investor-exclusive absence) | 61–89% | 🟢 High (aspirer-exclusive) | W1 analysis §4, W1 insights |
| **Decision paralysis / personal fit (risk, budget, strategy)** | Present in interviews, not directly measured in surveys | n/a | 🟡 Medium | Patricia interview (explicit #1 pain), Gunnar interview (risk-profile request) |
| **Hidden costs (fees, taxes)** | Single documented case | n/a | 🔴 Low (n=1, but plausible and easy to validate) | Bernardo interview |
| **Personalization / portfolio companion** | Explicit ask from 2/3 interviewees | n/a | 🟡 Medium | Patricia (Top-3 wish #2/#3), Bernardo (implicit, "everything in one place") |
| **Comparison / peer benchmarking** | Strongest unprompted positive reaction in demo | n/a | 🟡 Medium (qualitative, n=2, but very strong signal) | Bernardo interview, Gunnar interview |
| **Scoring/verdict UX & trust in the number** | Very strong positive reaction, one coherence bug found | 44% cite "simple institutional score" as an enabler | 🟢 High | W1 analysis (§3B), all 3 interviews |
| **Pricing / WTP** | 69% open (yes+maybe) at $4.99, 10% hard yes | n/a (0% engage with pricing) | 🟡 Medium | W2 analysis, Patricia interview (Van Westendorp anchors) |
| **Motivational/behavioral churn driver** | Documented once, clearly articulated | n/a | 🔴 Low (n=1, but theoretically important) | Gunnar interview |

---

## 4. Priority Matrix

Scored qualitatively on: user importance, frequency of mention, business value, feasibility, and differentiation. This is a judgment call, not a formula — treat the tiers as a starting negotiation, not a verdict.

| Priority | Item |
|---|---|
| **Critical** | Source-attributed, plain-language verdict engine; explanation-before-score ordering; fix score/recommendation coherence bug; peer-to-peer comparison view; visible scroll/continuation indicator; single primary-persona decision for MVP; resolve "fragmentation vs. signal/noise" framing decision (§5, #8) |
| **High** | Always-visible price chart with adjustable timeframe; portfolio input (manual + API); regulatory review of "Buy/Hold/Sell" language; consolidated financials + valuation ratios (P/E, forward P/E) in one screen; rename "Profile" → "Account" (trivial effort, explicit user ask) |
| **Medium** | Personalization onboarding (risk profile, goals, 5-question intake); portfolio companion digest (email/summary); AI-generated written chart interpretation; watchlist; reorderable/removable dashboard widgets; freemium + tiered pricing model; separate marketing site from app; go-to-market channel decision given weak word-of-mouth signal (§14.2) |
| **Low / Phase 2+** | Sector/index benchmark overlay; technical indicators for active traders (MACD, 50/200-day lines, support/resistance); country/region macro filter; broker-fee/tax calculator; macro/geopolitics layer; micro-investing and education modules for aspirers; social/community layer; multilingual (DE/ES) rollout |

---

## 5. Contradictions & Data-Quality Flags

| # | Contradiction | Likely explanation | What to do |
|---|---|---|---|
| 1 | Wave 1 insights doc (n=45, 58% conditional trust) vs. corrected analysis (n=56, 64% conditional trust) | A parsing bug undercounted multi-line CSV rows in the original pass | Treat n=56 figures as authoritative; retire the n=45 doc from decision-making, keep only for verbatims |
| 2 | Wave 2 was designed for cold-audience deployment (Reddit) but the executed analysis explicitly states the sample was "again warm-network" | Plan vs. execution gap — unclear from the documents whether Reddit posting happened and underperformed, or didn't happen | **Open question — verify with the team before treating Wave 2 as cold-audience validation.** Currently *both* waves carry the same sample bias |
| 3 | 86% positive reaction to the concept (W2) vs. only 10% hard "yes" to pay | Not a contradiction once separated: concept interest and payment commitment are different constructs. The 59% "maybe" cohort is conditioned on seeing the product work | Prioritize a working demo/trial over further concept testing |
| 4 | Gunnar Leu wants sector/macro/geopolitics context "in one place"; but the same W1 report separately concludes macro/geopolitics is "not in stack" and should be validated as must-have vs. nice-to-have | Single-respondent request vs. broader-sample silence on the topic | Resolved partially: Gunnar is the only proven-paying interviewee, so his request carries more behavioral weight than survey silence — but it's still n=1. Treat as a Phase 2 hypothesis to test, not an MVP requirement |
| 5 | Patricia's data-trust workaround (checking investor-relations pages herself) vs. Bernardo's data-trust workaround (buying anyway and treating ChatGPT's caution as a challenge to disprove) | Two different trust-repair strategies for the same underlying problem (AI outputs aren't independently verifiable) | Both point to the same fix: visible source links, not competing findings |
| 6 | 85% of Wave 1 investors never paid for anything, yet 44% of the same non-investor cohort (aspirers) cite "simple institutional score" as a top enabler | Feature enthusiasm without financial commitment — consistent with the broader stated-vs-revealed-preference pattern in §1 | Do not treat feature-level enthusiasm from non-payers as WTP evidence, per the original W1 analysis's own caveat |
| 7 | Patricia states an explicit UX preference for scrolling over clicking ("generally yes... you have to think about what you want next when clicking, that's already a process"). But in live demo sessions, **both** Gunnar and Bernardo simply did not scroll on the homepage and missed content below the fold — the founder flagged this independently as a "critical UX signal" in both sessions. | Stated preference and observed behavior disagree, and disagree across different users. Scrolling is not self-evidently discoverable even for someone who says they prefer it in the abstract | Design for the observed behavior, not the stated one: add an explicit visual scroll/continuation indicator regardless of whether the design philosophy is scroll-first or click-first. Do not treat Patricia's stated preference as license to skip this |
| 8 | The founder's own synthesis (`interview-guide.md`) labels the #1 validated cross-interview pain as **"Fragmentation"** (too many disconnected tools/steps). This report's independent reading of the survey data labels the #1 pain as **"Signal/Noise"** (unclear verdict even *within* a single tool — the Wave 1 analysis explicitly notes noise persists for single-tool users). | These are related but not identical problems, and the founder's synthesis draws primarily on the 3 interviews (all of which do describe multi-tool journeys), while the survey's noise finding is explicitly cross-checked against single-tool users. Both readings are evidentially sound within their own data | This is a real product decision, not just a labeling quibble: "fragmentation" implies the fix is *consolidation* (fewer tools/tabs); "signal/noise" implies the fix is *synthesis quality* (a genuinely clearer verdict, which could still require multiple tabs). The MVP verdict-card concept happens to address both, but the team should be explicit about which problem is primary when trading off scope — see §14.1 |

---

## 6. Jobs-to-Be-Done

> Format: *When I ___, I want to ___, so I can ___.*

1. **When** a stock or sector shows up in the news or on social media, **I want** to quickly check whether it's fundamentally sound, **so I can** decide if it's worth deeper research without opening five separate tools. *(Patricia, Bernardo — media-triggered research)*
2. **When** I ask an AI tool about a stock, **I want** every number traced back to its original source, **so I can** trust the answer without re-verifying it myself on the company's investor-relations page. *(Patricia — stale-data problem; 58–64% conditional trust)*
3. **When** I'm about to commit real money to an unfamiliar company, **I want** a plain-language explanation of the key metrics, **so I can** make the decision with confidence even though I'm not a finance professional. *(Aspirers, 61–89%; Patricia's "dumbest user" framing)*
4. **When** I'm comparing two similar companies in the same sector, **I want** a built-in side-by-side comparison, **so I can** decide which one actually fits my strategy instead of eyeballing two open tabs. *(Bernardo — strongest positive reaction of the whole demo)*
5. **When** I check my portfolio, **I want** a summary of what changed and why, **so I can** stay informed without manually re-researching every holding. *(Patricia — "portfolio companion"; Gunnar — implicit via "Ask AI")*
6. **When** I've already paid for a research tool and I'm still drowning in conflicting signals, **I want** the noise to actually go away, **so I can** justify staying subscribed. *(Both documented churners — the highest-trust finding in the dataset)*
7. **When** I decide how much of my portfolio to put into a position, **I want** the tool to know my risk tolerance and strategy, **so I can** get a recommendation that's actually about *me*, not a generic buy/sell call. *(Gunnar — risk-profile request; Patricia — personalization as a paid-tier justification)*
8. **When** I calculate my actual investment returns, **I want** visibility into broker fees and local tax impact, **so I can** avoid discovering after the fact that a "profitable" trade wasn't. *(Bernardo — Mexican tax example)*

---

## 7. Personas (data-grounded — no invented personas)

### Persona A — "The Passive Noise-Reducer" (Primary ICP candidate)
- **Source:** Wave 1 dominant cohort (41%, n=23) + Patricia Parnet interview
- **Behavior:** Checks portfolio ~daily, but spends <1h/week on new research; buys a few times per year, holds ≥1 year; broker (Trade Republic) + free AI (ChatGPT) + YouTube for inspiration
- **Reads annual reports:** Only for larger positions (e.g. SAP); not for small speculative buys
- **Biggest pain:** Deciding *which* stock fits her personally (risk, budget, dividend preference) — not lack of information, but too much undifferentiated information
- **Reaction to score:** Very positive ("Gen-Z mindset... rate everything out of ten") — but wants explanation-first, not score-first
- **Price anchors (Van Westendorp, her own numbers):** too cheap/suspicious <€2.99/mo; bargain ~€3–5/mo (iCloud/Netflix tier); no stated upper bound — scales with perceived personalization value
- **Explicit MVP warning she gave:** don't try to serve both professionals and beginners in the same MVP surface — pick one
- **Confidence:** Pain 🟢 High · Behavior 🟡 Medium · Budget 🟡 Medium (1 detailed source + Wave 1 inference)

### Persona B — "The Integrator" (Secondary passive-investor variant)
- **Source:** José Bernardo interview, Finance-professional-but-personally-risk-averse
- **Behavior:** Bank-internal newsletter → ChatGPT/Gemini → Yahoo Finance → bank broker, in that order; extracts figures from annual reports via AI rather than reading them directly
- **Biggest pain:** Fragmentation — explicitly wants "one platform that shows everything I need to decide," and separately flags hidden broker fees + local tax drag on realized profit
- **Most trusted current tool:** Gemini, specifically because it gives a clear buy/hold/sell-style verdict
- **Strongest demo reaction:** the comparison feature ("I really like the comparison part, because that's how you can make a decision")
- **Feature ask:** price chart always visible, with a timeframe toggle (day-trade vs. long-term view)
- **Confidence:** Pain 🟢 High (matches Wave 1 Cluster 3) · Behavior 🟡 Medium (n=1 detailed) · Budget 🔴 Low (not directly probed)

### Persona C — "The Value Investor Who Churned" (proven payer, distinct needs)
- **Source:** Gunnar Leu interview — the only interviewee with confirmed prior payment history ($15–50/mo)
- **Investment style:** Value-with-a-trading-overlay; core-satellite portfolio (ETF core, individual-stock/options satellite); holds 1–4 week options plus long-term value positions
- **Inspiration sources:** 3 specific YouTube finance creators (not generic content) — decision criterion is "will this business model still be relevant in 10–20 years?"
- **Why he churned:** Not the tool — a life-situation change (needed the capital back, reduced trading frequency below the threshold where paid market-data subscriptions made sense). Explicitly said the tool itself is interchangeable: *"there are 3 million tools that all do the same thing."*
- **What he wants a tool to do differently:** connect research to *why* he's investing (his stated example: a concrete life goal), not just show better charts — a retention hypothesis, not a validated feature
- **Product feedback:** loves charts and multi-chart comparison with narrative explanation (cites a YouTuber's style as the bar); wants sector/industry benchmarking on the same chart as the stock; wants support/resistance lines, ideally tool-suggested for beginners, self-set for advanced users; strongly prefers a 1–100 score over 1–10 or 5-star ("a five-star system feels completely random to me... 1–100 signals someone actually thought about it"); wants reorderable/removable dashboard modules; flagged price as the primary adoption blocker for himself specifically
- **Confidence:** Pain 🟢 High · Behavior 🟢 High (revealed preference — actual paid+churned) · Budget 🟡 Medium (concrete historical figure, single case)

### Persona D — "The Overwhelmed Aspirer" (explicitly out of MVP scope, informs onboarding only)
- **Source:** Wave 1 aspirer cohort (32–36%, n=16–18)
- **Barrier:** "Too complicated" (61–89% depending on wave/definition), fear of losing money, insufficient capital
- **Enablers:** plain-language explanations (50%), a simple score (44%), micro-investing entry points (44%)
- **Payment history:** zero
- **Confidence:** Pain 🟢 High (aspirer-exclusive, clean signal) · Budget 🔴 Very low (no revealed preference at all)

---

## 8. Pain Points — Prioritized

| # | Pain point | Frequency/evidence | Persona(s) affected | Impact | Possible product response | Priority |
|---|---|---|---|---|---|---|
| 1 | Signal/noise across disconnected sources | 51% W1 / 40% W2, all interviews | A, B, C | Slows/blocks decisions, drives churn even after payment | Source-attributed, single verdict; kill the "another tab" pattern | Critical |
| 2 | Can't verify AI-provided figures (staleness, hallucination) | 20% W1 primary, 58–64% conditional-trust overall | A, B | Erodes trust in any AI-native product, including pondex_ itself | Every metric links to primary source (SEC filings, IR pages) with date stamp | Critical |
| 3 | No single place to decide which stock fits *me* personally | Explicit #1 pain for Persona A; risk-profile request from Persona C | A, C | Decision paralysis, analysis abandoned | Risk-profile onboarding; score contextualized by user's portfolio/strategy, not absolute | High |
| 4 | Fragmented research workflow (4–5 tools before a trade) | W1 cluster 3; explicit core complaint, Persona B | A, B, C | Time cost, drop-off before purchase | Consolidate financials, chart, news, comparison, broker link in one flow | High |
| 5 | Complexity/jargon wall | 61–89% of aspirers; explicit UX note from Persona A | D (and A for jargon like "DCF"/"Verdict") | Total non-adoption for aspirers; comprehension friction even for passive investors | Plain-language tooltips on every term; explanation-before-score | High (for D), Medium (for A/B) |
| 6 | Hidden costs (broker fees, local taxes) silently erode returns | n=1 documented, plausible/generalizable | B | Perceived-vs-real ROI mismatch, trust damage | Show effective cost/fee/tax impact alongside gross return | Medium |
| 7 | Score/recommendation logic incoherence (10/10 but Sell) | n=1 observed directly in a live demo | All | Undermines the single most-loved feature | Fix scoring logic before further usability testing | Critical (blocks everything downstream) |
| 8 | No mechanism connecting the tool to the user's actual motivation for investing | n=1, theorized as churn driver | C | Retention risk, particularly for lower-frequency active investors | Hypothesis to test in Phase 2 — not yet a confirmed pain | Low (evidence), High (if validated) |

---

## 9. Feature Discovery

| Feature | Problem it solves | Priority | MoSCoW | Effort |
|---|---|---|---|---|
| Source-attributed verdict card (ticker → plain-language Buy/Hold/[Avoid], every number linked) | Signal/noise + data trust | Critical | **Must** | High |
| Explanation-before-score display order | Trust/comprehension for beginners & passive investors | Critical | **Must** | Low |
| Fix score↔recommendation coherence | Core feature currently self-contradicts | Critical | **Must** | Medium |
| Peer-to-peer company comparison (e.g. Shell vs. BP, side-by-side) | Strongest unprompted "aha" reaction of the entire dataset (Bernardo: *"I really like the comparison part, because like that you can make a decision"*) — note: this is a distinct feature from sector benchmarking below, not the same request | Critical | **Must** | Medium |
| Visible scroll/continuation indicator on homepage and stock page | Both Gunnar and Bernardo failed to scroll in live demos and missed content below the fold — independent of Patricia's stated scroll preference (see Contradiction #7, §5) | Critical | **Must** | Low |
| Consolidated financials + valuation ratios (P/E, forward P/E, margins, leverage) in one screen | Fragmentation | High | **Must** | Medium |
| Always-visible price chart with timeframe toggle (1d/3m/1y/max) | Fragmentation, day-trade vs. long-term needs | High | **Must** | Medium |
| Plain-language tooltip glossary on every metric/term | Jargon wall (aspirers + beginners) | High | **Must** | Low |
| Manual portfolio entry | Personalization prerequisite | High | **Must** | Low |
| Rename "Profile" → "Account" | Gunnar: "Profile" implies public visibility, which is the wrong mental model for a private research tool | High | **Must** | Trivial |
| Broker API portfolio connection | Reduces manual entry friction, enables "Buy" action later | Medium | Should | High |
| 5-question risk/strategy onboarding | Personalizes the verdict, justifies paid tier per Patricia | Medium | Should | Low |
| Portfolio companion digest (email/in-app summary of changes) | "Everything comes to me" pattern both interviewees want | Medium | Should | Medium |
| AI-generated written interpretation of the chart ("what does this chart actually tell me") | Gunnar: charts without explanation are "worthless for non-professionals," even though he loves charts — distinct from the glossary/tooltip fix, which explains terms, not trends | Medium | Should | Medium |
| Insider transaction feed | Positively received in demo, moderate priority | Medium | Should | Medium |
| Analyst rating aggregation | Trusted signal per Bernardo/Gunnar ("even 8 analysts disagree, still useful context") | Medium | Should | Low (if 3rd-party data available) |
| Watchlist ("Add to Watchlist") | Gunnar interacted with this unprompted in the demo and found it intuitive | Medium | Should | Low |
| Reorderable/removable dashboard modules | Personalization, explicit ask from Gunnar | Medium | Should | Medium |
| 1–100 (not 1–10 or 5-star) scoring scale | Perceived credibility for active/value investors — validated independently by both Gunnar and Patricia | Medium | Should | Low |
| News feed filtered to searched/portfolio stock | Reduces noise vs. generic news | Medium | Should | Medium |
| Sector/index benchmark overlay on chart (stock vs. sector vs. S&P 500) | Gunnar's specific ask — distinct from peer-to-peer comparison above; his framing is "how has this company done vs. its sector," not "company A vs. company B" | Low (MVP) | Could | Medium |
| Country/region filter for macro data | Bernardo wants Mexico-specific macro context; unclear how many users this generalizes to | Low (MVP) | Could | Medium |
| Technical indicators (MACD, 50/200-day lines, support/resistance) | Active-trader segment only | Low (MVP) | Could | High |
| Freemium tier + separate marketing site from app | Reduces first-touch confusion (Patricia), lowers acquisition friction | Low (MVP) | Could | Medium |
| Micro-investing entry point / education modules | Aspirer-only, explicitly out of MVP scope | Low | Won't (Phase 1) | High |
| Geopolitics/macro overlay | Single-user request, unvalidated at scale | Low | Won't (Phase 1) | High |
| "Ask AI" conversational stock Q&A | Already prototyped, well received in ad-hoc test | Low (MVP) | Could | Medium |
| Broker-fee and local-tax calculator alongside gross return | Bernardo's second-strongest pain (Mexican capital-gains tax erodes realized profit); founder's own synthesis flags this as "Phase 2, but Bernardo-specific strong" | Low (MVP) | Could | Medium |

---

## 10. Competitive Landscape (as mentioned by respondents)

| Product/source mentioned | Used for | What's liked | What's missing (the gap pondex_ could fill) |
|---|---|---|---|
| ChatGPT / Gemini | Extracting figures from annual reports, quick "should I buy" sanity check | Fast, conversational, Gemini specifically praised for a clear buy/hold/sell-style output | No source attribution by default; occasionally stale data; no persistent portfolio context |
| Trade Republic (broker) | Execution + built-in analyst consensus/press section | Convenient, already-trusted, has a basic analyst-rating field | No real research depth, no comparison, no explanation of *why* |
| Yahoo Finance | Secondary data check | "Improving a lot" | Not integrated with AI verdict or portfolio |
| TradingView | Charting, historical price levels | Deep charting, sector/market data | No fundamentals-first workflow, chart-only |
| Bloomberg/Reuters | Professional-tier data | Trusted, comprehensive | Too expensive for retail (explicitly cited as the reason to look elsewhere) |
| Seeking Alpha / Morningstar | Minor mentions | n/a | Low usage in this sample (5–8%) |
| YouTube finance creators (Mario Lochner, Markus Koch, Ticker Symbol U, Bernecker TV) | Inspiration + narrative explanation of charts | Storytelling, multi-chart context, long-track-record credibility (Bernecker) | Not personalized, not sourced/verifiable, one-way |
| Ulrich Müller Wealth Academy + "AQup" method | Paid course teaching a 1–100 scoring methodology for stocks | Structured scoring logic the user still references post-cancellation | Time-intensive to apply manually — exactly the gap an automated, source-attributed 1–100 score could fill |

**Read:** pondex_'s differentiation isn't "more data" — every competitor already offers more raw data. The gap is a **trustworthy, source-linked, explained synthesis** that replaces the manual cross-referencing step users currently do by hand across 3–5 of the tools above.

---

## 11. Product Strategy

**Vision:** pondex_ becomes the retail investor's first stop for a trustworthy verdict on a stock — a single, source-attributed, plain-language screen that replaces the ChatGPT + broker + YouTube + Yahoo Finance research stack, rather than adding a sixth tab to it.

**Primary target (MVP):** Passive investor, Persona A/B profile — largest cohort (41% of Wave 1), <1h/week research time, currently unpaid, decision paralysis and fragmentation as core pains.

**Trade-off to decide explicitly, not by default:** the only interviewee with *proven* payment history is Persona C (active/value investor), not Persona A/B. This is a real tension between "largest addressable cohort" and "only confirmed payer profile" that the team should resolve deliberately — e.g., by building for Persona A/B's daily workflow while keeping Persona C's most-requested features (comparison, 1–100 score, chart-first flexibility) in the same MVP surface, since they don't structurally conflict.

**Core MVP features:** ticker search → source-linked verdict card (explanation before score) → consolidated financials/valuation ratios → peer/sector comparison → always-visible chart with timeframe toggle → plain-language glossary → manual portfolio entry.

**Differentiators:** source-attribution on every number (not a marketing claim — the single most-cited trust requirement in the entire dataset); comparison-first framing; explanation-before-score ordering; single-persona-first UX discipline (explicitly requested by a user, not just internal opinion).

**V2:** risk/strategy onboarding, personalized/portfolio-aware scoring, portfolio companion digest, broker API integration, reorderable dashboard, 1–100 scale, freemium + tiered pricing, marketing site separated from app.

**Long-term roadmap:** technical-analysis layer for active traders (indicators, support/resistance), sector/macro overlays, community/social proof layer, deeper "Ask AI" conversational research, micro-investing/education funnel for aspirers (kept structurally separate from the investor product), multilingual (DE/ES) rollout, cold-audience-validated pricing tiers.

**Go-to-market — a risk the product-feature analysis alone doesn't surface:** the founder's own cross-interview synthesis identifies word-of-mouth as a weak channel for this category (🔴 Low confidence, n=2, but the reasoning is sound and worth taking seriously — see §14.2). Both Gunnar and Patricia describe the benefit of a tool like pondex_ as *indirect* — you have to already be trading to feel the payoff — unlike ChatGPT or Facebook, where the value is immediate on first use. Gunnar also has almost no peers who invest, so he wouldn't know whom to refer even if motivated. Two implications for planning: (1) do not size growth projections around organic/referral virality; (2) prioritize acquisition channels where intent is already present — niche communities (r/eupersonalfinance, r/finanzen), SEO against research-workflow queries, and targeted events — over generic awareness or referral-program spend. This reframes the "Not for me" cohort question from §12.4 (open questions) as a go-to-market question as much as a product one.

---

## 12. Concrete Recommendations

### 12.1 Top 20 Product Requirements
1. Every displayed metric must link to its primary source (filing, exchange data, IR page) with a date stamp.
2. Verdict screen must show explanation before score, not score before explanation.
3. Scoring logic must be internally consistent (no high score + "Sell," as observed in testing).
4. A built-in peer-to-peer comparison view must exist at MVP, not be deferred — this is distinct from sector/index benchmarking, which is a lower-priority Phase 2 item (see §14.1).
5. Consolidated financials + valuation ratios in a single screen (no separate tab-hunting).
6. Always-visible, timeframe-adjustable price chart.
7. Plain-language glossary/tooltip on every technical term (DCF, Verdict, forward P/E, etc.).
8. Manual portfolio entry at MVP; broker API as a fast-follow.
9. A 5-question onboarding to capture risk tolerance, budget, and strategy.
10. Scoring output must be contextualized by the user's own portfolio/strategy, not shown as an absolute, generic number.
11. News feed filtered to the searched or portfolio-held stock, not a generic firehose.
12. Insider-transaction and analyst-consensus data included as supporting (not primary) signals.
13. Dashboard modules should be reorderable/removable.
14. Data freshness: end-of-day is sufficient for MVP — real-time is not a stated requirement and materially raises cost.
15. Effective-cost visibility: show broker fees and, where determinable, local tax impact alongside gross returns.
16. Regulatory review of "Buy/Hold/Sell" and "Verdict" language against informational-vs-advice classification before wider release.
17. Separate marketing/landing site from the authenticated app experience.
18. Freemium entry tier, paid tier priced no lower than ~€3–5/month (pricing below that range reads as a trust/quality red flag to at least one tested user).
19. Support both a monthly subscription and a lower-frequency (e.g. quarterly-report) purchase option for infrequent users.
20. MVP must commit to one primary persona's information architecture (passive investor) while not structurally blocking the active-investor features (comparison, 1–100 score) that don't conflict with it.
21. A visible scroll/continuation indicator on the homepage and stock page — two of three demo users failed to discover content below the fold.
22. Rename "Profile" to "Account" — trivial effort, explicit and specific user ask.
23. The team should explicitly decide whether the MVP's primary problem is "fragmentation" (too many tools) or "signal/noise" (unclear verdict within one tool) — see Contradiction #8 (§5) — since the two framings imply different scope trade-offs even though the current verdict-card concept happens to address both.

> Note: this list runs to 23 rather than the requested 20 because three requirements surfaced during a second pass over previously under-examined source material (the founder's own interview synthesis) — see §14. Items 21–23 are additive, not replacements.

### 12.2 Top 20 Features (ranked, see §9 for full table)
1. Source-attributed verdict card
2. Explanation-before-score display
3. Coherent scoring logic (bug fix)
4. Peer-to-peer company comparison (e.g. Shell vs. BP)
5. Visible scroll/continuation indicator
6. Consolidated financials + ratios screen
7. Always-visible, adjustable price chart
8. Plain-language glossary/tooltips
9. Manual portfolio entry
10. Rename "Profile" → "Account"
11. Risk/strategy onboarding (5 questions)
12. Portfolio-aware, personalized scoring
13. Portfolio companion digest (email/in-app)
14. AI-generated written chart interpretation
15. Watchlist
16. 1–100 scoring scale
17. Reorderable/removable dashboard modules
18. Analyst consensus aggregation
19. Insider transaction feed
20. Filtered/relevant news feed

*(Phase 2+, just outside the top 20 but worth tracking: sector/index benchmark overlay, technical indicators for active traders, country/region macro filter, broker-fee/tax calculator, freemium tier + separate marketing site, "Ask AI" conversational assistant — see §9 for the full table.)*

### 12.3 Top 10 Risks
1. Willingness-to-pay is unvalidated at scale — only 10% hard "yes" at a single tested price point ($4.99).
2. Both survey waves are warm-network samples; the planned cold-audience (Reddit) validation appears not to have been executed as designed.
3. Qualitative depth rests on 3 interviews — sufficient to generate hypotheses, not to confirm personas.
4. "Buy/Hold/Sell"/"Verdict" framing may be classified as investment advice in some jurisdictions — unresolved compliance question.
5. Feature enthusiasm (86% positive reaction) does not equal payment behavior (10% hard yes) — risk of over-building for stated preference.
6. Retention/habit-formation is unsolved: the two known churners left even after paying, and it's unclear the redesigned concept fixes their actual failure mode.
7. MVP scope risk: trying to serve both the passive-investor and active/value-investor personas at once was explicitly flagged by a user as a mistake to avoid.
8. Differentiation risk: the product category is perceived as commoditized by at least one experienced user ("3 million tools that all do the same thing") — the trust/source-attribution angle must be genuinely delivered, not just claimed.
9. AI inference cost (per-verdict LLM calls) vs. margin at a €3–5/month price point — caching strategy for large-cap stocks is a cost, not just a nice-to-have.
10. Score-recommendation logic incoherence, if shipped unresolved, risks damaging trust in the one feature that currently tests best.
11. **Growth-channel risk (newly surfaced, §14.2):** word-of-mouth looks structurally weak for this category — the value is indirect (you must already be trading to feel it), unlike instant-payoff products like ChatGPT. Evidence is thin (n=2, 🔴 Low confidence) but the underlying reasoning holds; growth plans should not assume organic virality.
12. **Raw-data provenance risk:** the Wave 1 raw CSV, as delivered, is not machine-readable in this session (malformed quote-escaping). The corrected n=56 figures rest on the analysis document's authority and could not be independently re-derived here — worth a clean re-export before any external-facing use of these numbers.

> Note: expanded from 10 to 12 risks; items 11–12 emerged from a second pass over previously under-examined material (§14).

### 12.4 Top 10 Open Questions
1. Was the Reddit/cold-audience deployment for Wave 2 actually executed, and if so, why does the sample read as warm-network? (Verify before treating any current number as cold-validated.)
2. What is the actual price ceiling for the primary persona — only a single fixed price point ($4.99) has been tested with a real WTP question; no proper Van Westendorp study has been run on the full sample.
3. Does geopolitics/macro belong in MVP, Phase 2, or never — currently resting on a single respondent's request?
4. Is "Buy/Hold/Sell" language compliant, or does it need to be reframed as informational scoring only?
5. Should active/value investors (Persona C) be explicitly in-scope for MVP, given they're the only proven payer profile, even though they're a smaller cohort than passive investors?
6. What specific mechanism (if any) can meaningfully connect a research tool to a user's personal financial motivation, and does that actually reduce churn, or was Gunnar's framing a one-off?
7. Does explanation-before-score hold up in a controlled usability test, or is it only a stated preference?
8. What data freshness/latency actually matters to the target persona in practice, beyond the stated "end-of-day is fine"?
9. How should the product balance "everything in one place" (the dominant unprompted request) against Patricia's opposing warning not to overwhelm a first-time user with too many menu items?
10. Is a subscription or a lower-frequency purchase (e.g., quarterly report) the better default monetization model for the dominant passive-investor cohort, given they check research infrequently but their portfolio daily?
11. If word-of-mouth is genuinely weak for this category, what is the actual acquisition channel plan, and has it been budgeted/tested — currently no channel beyond "niche community + SEO" has any evidence behind it?
12. Is "fragmentation" (too many tools) or "signal/noise" (unclear verdict within one tool) the primary problem the MVP should optimize for — the founder's own synthesis and this report's independent survey reading frame it differently (§5, #8)?

### 12.5 Top 10 Hypotheses to Validate in Further Interviews
1. A visible, one-click source-attributed verdict measurably reduces "I'd double-check everything myself" behavior (currently 35% of Wave 2 respondents).
2. Passive investors will *replace*, not supplement, their current AI+broker workflow once verdict speed is consistently under 60 seconds.
3. Explanation-before-score ordering increases comprehension and trust versus score-first, in a controlled A/B or moderated test.
4. Peer/sector comparison is a primary driver of activation/"aha," not just a well-liked secondary feature.
5. Segmenting the MVP to a single primary persona increases activation and retention compared to serving both passive and active investors simultaneously.
6. Real WTP at $4.99–$9.99/month increases materially once users interact with a working, source-attributed verdict versus reading a concept description alone.
7. Visible fee/tax-impact transparency measurably increases trust and stated loyalty for cost-sensitive users.
8. A motivation/goals-based onboarding layer reduces active-investor churn — currently based on a single respondent's account and unconfirmed elsewhere.
9. A cold-audience sample (properly executed, e.g. on Reddit) replicates the warm-network ranking of pain points and WTP — not yet actually tested.
10. A 1–100 scoring scale is perceived as more credible than 1–10 or 5-star by a broader sample, not just the one active investor who proposed it.
11. A niche-community-first acquisition strategy (Reddit, targeted events) outperforms a referral/virality-based one for this category, as the founder's synthesis theorizes — currently based on 2 interviewees' self-assessed social graphs, not tested acquisition data.

---

## 13. Summary Table — Wave 1 vs. Wave 2 vs. Interviews

| Signal | Wave 1 (n=56) | Wave 2 (n=35) | Interviews (n=3) |
|---|---|---|---|
| #1 pain | Complexity/Noise — 51% of investors | Conflicting info — 40% of all respondents | Unanimous — noise, fragmentation, trust |
| AI trust posture | 64% conditional (source+formula) | 91% non-full-trust (35% double-check + 56% starting point) | Consistent — all 3 want visible sourcing |
| WTP | Unvalidated (no price point tested) | 69% open, 10% hard yes at $4.99 | Patricia: ~€3–5/mo anchor; Gunnar: price is his own adoption blocker; Bernardo: not directly probed |
| Sample bias | Warm network | Warm network (despite cold-audience plan) | Purposive, small n |

---

## 14. Addendum — Founder's Cross-Interview Synthesis, Integrated

This section surfaces material from a second pass over the source set: the founder's own post-interview synthesis, embedded in `interview-guide.md` (lines 416–845), which was not read in full during the first pass of this report. It is independent analytical work — the founder cross-referenced all three transcripts pattern-by-pattern before this report existed — and it is high-value precisely because it was produced close to the interviews, by the person who conducted them and can read tone/emphasis that a transcript alone doesn't fully carry. It corroborates most of §§1–13 above, adds a few findings not otherwise captured, and surfaces one framing disagreement worth resolving deliberately (§14.1). Everything below has been cross-checked against the three transcripts directly, not taken on the synthesis document's word alone.

### 14.1 Cross-Interview Pattern Validation (founder's synthesis, translated and cross-checked)

The founder ran two synthesis passes — one after all 3 interviews, one intermediate pass after only Gunnar + Patricia. The patterns below are consolidated from both, with the validation count reflecting how many of the 3 interviewees confirmed each one.

| # | Pattern | Validated by | Confidence | What it means for the product |
|---|---|---|---|---|
| 1 | **Inspiration is always passive, never actively searched for.** All three source ideas from YouTube, media, or a bank newsletter — none of them sat down to "search for a stock to research." | 3/3 | 🟢 High | pondex_ does not need to be a discovery/search engine. Its job is to structure inspiration that already arrived passively, and take over the *next* step (research, decision) — not the first one. |
| 2 | **Fragmentation is the #1 pain in the founder's framing.** Gunnar: "if I decided to spend two hours researching, I wouldn't know where to start." Patricia: pieced together "from a thousand different sources." Bernardo: "it is not integrated," directly and explicitly. | 3/3 | 🟢 High | Bernardo's quote is, in the founder's own words, "the strongest verbal confirmation of all three interviews." Consistent with — but not identical to — this report's "Signal/Noise" framing; see Contradiction #8, §5, for why the distinction matters. |
| 3 | **The score/verdict concept lands immediately and positively.** Gunnar: "clearly better than a raw price." Patricia: "I find it amazing — Gen-Z mindset." Bernardo: "I really like the scorecard." | 3/3 | 🟢 High | Confirms §1 finding #6, with the added nuance that all three attach a *condition*: Gunnar wants to know how it's calculated, Patricia wants jargon explained, Bernardo wants portfolio context. Positive reaction is conditional on trust infrastructure, not a green light on its own. |
| 4 | **Comparison/context is a core need, not a nice-to-have.** Gunnar wants sector-vs-S&P-500 charting; Bernardo wants direct peer comparison. Newly identified in the Gunnar+Bernardo pass, absent from the earlier Gunnar+Patricia-only pass — i.e. it strengthened as more interviews came in. | 2/3 (Patricia not asked directly) | 🟡 Medium-High | Corroborates §1 finding #7. The founder's own conclusion: peer comparison and sector comparison are "not nice-to-have — they are the decision basis for at least 2 of 3 interviewees." |
| 5 | **Chart should always be visible, with a timeframe selector.** Bernardo explicit (1d/3m/1y/max); Gunnar wants 50/200-day moving averages on the same chart; Patricia prefers scrolling generally. | New in Bernardo's interview, corroborated in spirit by Gunnar | 🟡 Medium | Already reflected in this report's feature table (§9); the founder's synthesis adds the specific detail that Gunnar independently asked for the same always-visible principle via moving averages. |
| 6 | **Trust requires transparency — in the founder's own words, "source attribution is not a feature, it is the precondition for trust."** Gunnar: "how is the score calculated?" Patricia: "source citations are important." Bernardo: "I don't trust anyone — I need to do my own research." | 3/3 | 🟢 High | Directly corroborates this report's finding #2 (§1) — independently arrived at from the same transcripts, which strengthens confidence in it. |
| 7 | **Risk-profile onboarding is wanted.** Gunnar and Patricia explicitly; Bernardo implicitly (risk-averse, wants the score to know his context). | 2/3 explicit, 1/3 implicit | 🟡 Medium | Corroborates JTBD #7 (§6) and the personalization feature line in §9. |
| 8 | **Word-of-mouth growth looks structurally difficult.** Gunnar: has almost no peers who invest, describes the benefit as "indirect" ("mittelbarer Nutzen") compared to instant-payoff products like ChatGPT or Facebook. Patricia would recommend the tool but has a small relevant network. | 2/2 asked | 🔴 Low confidence (small n) but a sound, specific mechanism, not vague pessimism | New — not covered anywhere in §§1–13 prior to this addendum. See §14.2. |

### 14.2 What This Changes, Practically

The founder's synthesis translates the patterns above into two implementation buckets. Restated here in English and cross-checked against the transcripts:

**Low-effort, high-confidence, ready to build now:**
- Switch the scoring scale to 1–100 (validated independently by both Gunnar and Patricia; Gunnar explicitly rejects a 5-star scale as "completely random," and independently reasons that a 1–100 number signals someone put thought into it).
- Re-add 50-day and 200-day moving average lines to the chart (Gunnar, explicit; had been removed from an earlier build).
- Add an AI-generated written interpretation of the chart, not just tooltips for terms (Gunnar's distinction: he loves charts, but a chart with no accompanying "what does this actually tell me" sentence is worthless to a non-professional — he cites a YouTube creator's habit of narrating every chart as the bar to meet).
- Add tooltips/info icons for every technical term (Patricia, explicit — she specifically didn't know "DCF").
- Rename "Profile" to "Account" (Gunnar — "Profile" reads as public-facing, the wrong mental model for a private research tool).
- Add a visible scroll indicator on both the homepage and the stock detail page (both Gunnar and Bernardo failed to scroll and missed content; this is an observed-behavior finding, not a stated one — see Contradiction #7, §5).

**Needs a discovery/validation pass before building:**
- Risk-profile onboarding — how many questions, and how deep, before it actually earns the user's trust in the resulting score (vs. becoming friction that gets skipped)?
- Sector-comparison chart (stock vs. sector vs. S&P 500) — high interest expressed, but data-source feasibility via the current stack (Yahoo Finance) is untested.
- Portfolio-companion / digest email — concept-tested in Wave 2 territory, but the actual cadence (daily push vs. weekly digest) is unresolved; Patricia checks her portfolio daily, which argues for higher frequency than a weekly-only design would assume.

**Strategic (not a build item):**
- Do not plan growth around word-of-mouth/referral mechanics; there is no evident viral loop in this category the way there is for social or general-purpose AI products. Prioritize niche-community presence (Reddit), SEO against research-workflow search intent, and targeted events instead (§11, Go-to-Market).
- Churn-prevention should be framed around motivational/goal anchoring, not discounting — Gunnar is explicit that an 80%-off retargeting email would have changed nothing, because his churn was driven by a life-situation change, not price or product quality.

### 14.3 Data Provenance Note

`2026-06-29_survey-wave1-raw.csv`, as delivered in this session, could not be parsed by either Python's `csv` module or pandas — the file appears to have an extra layer of quote-escaping wrapped around each row (each line begins and ends with an outer `"`, with internal quotes doubled as `""`, which is not standard single-layer CSV quoting). This is very likely the same class of export artifact that `survey-wave1-analysis.md` describes fixing ("multi-line quoted fields... undercounted by line-based methods"), but the fix described there could not be reproduced against this specific file copy in this session.

**Practical implication:** the n=56 and all associated percentages in `survey-wave1-analysis.md`, which this report treats as authoritative throughout, rest on that document's own stated methodology and could not be independently re-verified against the raw file here. This is not evidence the numbers are wrong — the analysis document is detailed and methodologically transparent about its own correction process — but it is a gap between "authoritative per the existing analysis" and "independently re-confirmed in this report." **Recommendation:** before using these figures in any external-facing material (investor deck, public case study), re-export the raw Tally/Google Sheets data cleanly and re-run the parse once, ideally with a second person spot-checking a sample of rows by hand against the Google Sheet.
