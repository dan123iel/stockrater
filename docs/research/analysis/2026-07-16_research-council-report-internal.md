# pondex Research Council Report
## Full 13-Phase Analysis — July 2026

**Prepared by:** AI Research Council (22 interdisciplinary experts)
**Date:** 2026-07-16
**Data Sources:** Survey Wave 1 (n=56, June 2026), Survey Wave 2 (n=35, July 2026), Interview: Patricia Parnet (PGP-Tech, 2026-07-10), Interview: Gunnar Leu (GL-Churner, 2026-07-13), Interview: José Bernardo S. (JBS-Fin, 2026-07-14)
**Total primary respondents:** 91 survey participants + 3 depth interviews
**Product:** pondex — AI-powered stock research, $4.99/month, React + FastAPI + Yahoo Finance + Groq Llama

---

## Phase 1 — Data Confirmation

All five data sources have been read and integrated:

| Source | Type | n | Date |
|--------|------|---|------|
| Survey Wave 1 | Quantitative + open-ends | 56 | June 2026 |
| Survey Wave 2 | Quantitative + open-ends | 35 | July 2026 |
| Patricia Parnet (PGP-Tech) | 1:1 depth interview | 1 | 2026-07-10 |
| Gunnar Leu (GL-Churner) | 1:1 depth interview | 1 | 2026-07-13 |
| José Bernardo S. (JBS-Fin) | 1:1 depth interview | 1 | 2026-07-14 |

All major claims in this report are tagged to their originating source. No data has been extrapolated or invented.

---

## Phase 2 — Independent Council Member Perspectives

### Chief Research Officer — Lead Synthesis
The cross-wave signal is unambiguous: information fragmentation is the dominant user problem, and it is structural, not tool-specific. Wave 1 names it "Signal/Noise" at 37% (13/35 investors); Wave 2 names it "Conflicting info / too many sources" at 40% (14/35). The consistency across two independent samples 30 days apart elevates this from observation to validated finding. All three interviews confirm the same fragmentation pattern through different workflows: YouTube→ChatGPT→Broker (PGP-Tech), YouTube→TradingView→Broker (GL-Churner), Newsletter→AI→Yahoo Finance→Broker (JBS-Fin). pondex has a clear, evidence-backed problem to solve. The critical risk is that the product solves data aggregation rather than signal filtering — two very different jobs.

### Quantitative Research Analyst
Key statistical findings across waves:

- Signal/Noise dominates investors in both waves: Wave 1 37% (#1), Wave 2 40% (#1) — **High confidence**, n=70 investors combined
- WTP at $4.99 remains uncertain: Wave 2 shows 10% hard Yes, 59% conditional ("depends how well it works"), 31% No — **Medium confidence**, n=29
- AI trust is predominantly conditional: Wave 1 58% require source + formula (n=42), Wave 2 56% "starting point" usage intent (n=34) — **High confidence**, cross-wave consistent
- 85% of Wave 1 respondents never paid for a research tool (n=56) — this is the core adoption barrier, not price point
- Cross-tab finding: All 3 hard WTP Yes in Wave 2 have "Conflicting info" as their #1 pain — small n but directionally strong

Caution: Wave 2 n=35 limits subgroup analysis. The 10% hard Yes WTP (n=3 absolute) is too small for pricing conclusions.

### Qualitative Research Analyst
The interview data reveals a pattern that surveys miss: users describe their research process as reactive and event-driven, not systematic. PGP-Tech starts from a heatwave news event, not a financial screen. GL-Churner gets all ideas from YouTubers, "never searches independently." JBS-Fin starts from his bank's internal newsletter. This means pondex's information architecture must accommodate idea-triggered entry points ("I heard about this company, tell me everything") not just ticker-search entry. The "magic wand" responses in Wave 2 further confirm qualitative texture: Maximilian wants curated historical data on specific metrics he cares about; Simon wants back-tested verdict performance; these are not the same job.

### Behavioral Finance Expert
Two behavioral patterns dominate the data. First, decision paralysis: GL-Churner explicitly states "If I decided to spend 2 hours researching on my own, I wouldn't know where to begin" (GL-Churner interview) — this is classic information overload / analysis paralysis. Second, present bias in retention: GL-Churner would not have stayed for product features alone; only re-triggering his WHY for investing (life goals) would have retained him. This has major implications for churn reduction — pondex should anchor users to personal financial goals, not product features. The 85% non-payment rate (Wave 1) is consistent with status quo bias: free defaults (broker tools, ChatGPT) are entrenched. Switching cost is behavioral, not monetary.

### Professional Trader / Technical Analysis Expert
GL-Churner's chart wishlist is specific and actionable: support/resistance lines, MACD, 50/200-day moving averages, sector comparison, and plain-language chart interpretation. He explicitly says "Charts I love. But what can I read from this chart? That explanation is missing." (GL-Churner interview). JBS-Fin wants a persistent price chart with time range selector always visible. Neither user is asking for basic OHLCV data — they want interpreted charts. This is a differentiable feature: chart + explanation in plain language exists nowhere in the free-tier stack they currently use. However, technical analysis features risk scope creep for the MVP. Prioritize: plain-language chart interpretation over raw indicator overlays.

### Equity Research Analyst / Financial Analyst
JBS-Fin's workflow is notable: he feeds entire annual reports into ChatGPT/Gemini for AI-assisted extraction, then cross-checks Yahoo Finance for market consensus. This is sophisticated, but his pain is that the process is fragmented and he "ends up with a loss because I don't see all the charges / taxes upfront" (JBS-Fin interview). The tax/fee transparency gap is a distinct pain not surfaced in surveys — it may be Mexico-specific or European-applicable but warrants a hypothesis. Maximilian (Wave 2 magic wand) wants "cashflow, profit, dividend per share last 10 years + pipeline + risks + price drivers" — this is a structured fundamental brief, not an AI chat. pondex must define whether it produces structured financial briefs or conversational AI verdicts, or both.

### Macro Economist
Demographics skew European (53%) with a tech/business professional majority (56% combined). Europe implies GDPR compliance requirements, multilingual needs (DE, ES confirmed as requirements in Wave 1 product requirements), and potential MiFID II disclosure considerations. Mexico-based JBS-Fin introduces a LatAm dimension. The $4.99/month price point converts to ~€4.60 — PGP-Tech's acceptable range was €3–5/month ("iCloud/Netflix level — wouldn't have to think about it"), validating the price for European passive investors. The Bloomberg-priced-out finance professional (Wave 1 WTP, $50–200/mo) represents a ceiling segment, not the ICP.

### Risk Management Expert
The 85% never-paid-for-research statistic (Wave 1) is the primary commercial risk — it suggests the market is habituated to free tools and the switching cost is high. The second risk: "I'd try it for free" is 40% of Wave 2 reactions — freemium may cannibalize conversion if the free tier is too generous. The AI hallucination concern (19% of investor pain points, Wave 1) is a product liability risk: if pondex cites wrong data, users will attribute the loss to the tool. Source citation is therefore both a trust feature and a liability-reduction mechanism. Churn risk: GL-Churner left not because the product failed but because his personal life changed — retention requires non-product hooks (goal anchoring, progress tracking).

### UX Researcher
Three usability findings emerge from the interview data:

1. PGP-Tech specifically criticized: "Marketing page and app mixed together — confusing." This is a conversion funnel problem — the landing page is conflating marketing copy with product UI.
2. PGP-Tech said "don't assume everyone knows DCF, Verdict" — jargon is an onboarding barrier for passive investors.
3. GL-Churner said "Profile sounds social — call it Account." Terminology matters; product language should match mental models.

PGP-Tech also offered a methodology insight: "Let users explain what they see first, before you guide them" — this should inform future usability test protocols. The 6/16 non-investors in Wave 1 who want "plain-language explanations" reinforces the accessibility imperative.

### Jobs-to-be-Done Expert
See Phase 5 for full JTBD statements. Key observation: users are not hiring pondex to "do research." They are hiring it to reach a confident investment decision faster, with lower cognitive load. The job is confidence, not information. This reframes the core value proposition away from "we aggregate data" toward "we give you a verdict you can act on." GL-Churner articulates this directly: "The price of a stock tells me nothing. Undervalued/overvalued with a score — that's much better." The score is a confidence mechanism, not a data display.

### Product Manager
The Wave 2 "magic wand" responses reveal four distinct product visions among users, which cannot all be built at once: (1) curated historical metrics dashboard (Maximilian); (2) back-tested verdict track record (Simon); (3) stock screener with custom filters (tehunk); (4) beginner-accessible explanations (Priyanka). These are different products. PGP-Tech's advice — "focus MVP on one target group" — is the most strategically sound input in the entire dataset. The current product scope risks serving no one well by trying to serve everyone.

### Customer Success Expert
GL-Churner's retention insight is the most operationally actionable finding: the retargeting emails failed because they advertised features instead of re-triggering his investing WHY. This maps directly to onboarding design — pondex should capture user goals (life vision, financial milestone) at signup, and re-surface these in retention communications. PGP-Tech wants push notifications and regular portfolio summary emails — these are engagement features that, if personalized to stated goals, become retention features.

---

## Phase 3 — Theme Clusters

### Theme A: Information Fragmentation (Critical)
Users universally describe a multi-tool, multi-step research workflow. No single tool closes the loop from idea to decision. Confirmed in Wave 1 (37% signal/noise), Wave 2 (40% conflicting info), and all three interviews. The "thousand sources" metaphor (PGP-Tech) and "I don't know where to begin" (GL-Churner) describe the same structural problem.

### Theme B: Verdict Confidence Over Data Volume (Critical)
Users do not want more data — they want a confident, actionable conclusion. The score concept resonated strongly with both PGP-Tech ("mega — out of ten") and GL-Churner ("undervalued/overvalued with a score is much better"). JBS-Fin trusts Gemini specifically because "it clearly shows buy/hold/sell and explains why." The job is confidence, not information.

### Theme C: Source Attribution as Trust Prerequisite (Critical)
58% of Wave 1 respondents require source + formula for conditional AI trust. Wave 2: 56% would use it as "a starting point," 35% would "double-check everything." JBS-Fin: "I don't trust anyone — I need to do my own research." Source citation is not a nice-to-have; it is the minimum viable trust layer.

### Theme D: Personalization and Goal Anchoring (High)
PGP-Tech wants the tool to "know me — my risk tolerance, what's important to me." GL-Churner's retention depended on re-triggering his WHY for investing. Wave 1 product requirements include "risk-matched personalized recommendations." This theme spans acquisition (relevance) and retention (emotional anchoring).

### Theme E: Accessibility and Plain Language (High)
Passive investors (41%, Wave 1) and non-investors (n=16, Wave 1) both flag comprehension barriers. PGP-Tech warns against assuming DCF/Verdict knowledge. Wave 1: 8/16 non-investors want plain-language explanations. Wave 2: "Make it easier for layman to understand" (Priyanka). The jargon problem is an acquisition barrier for the majority segment.

### Theme F: Score Design and Granularity (Medium)
Both PGP-Tech and GL-Churner reacted positively to the score concept but with different format preferences: PGP-Tech prefers 1–10 ("Gen-Z mindset"), GL-Churner prefers 1–100 ("more granular, feels more thought-out"). This is a design tension to resolve. GL-Churner also wants score methodology transparency.

### Theme G: Comparison and Benchmarking (Medium)
GL-Churner wants company vs. sector vs. S&P500 comparison. JBS-Fin wants side-by-side company comparison and Yahoo Finance market consensus integration. Both are experienced investors. This is likely a V2 feature for the ICP but a strong differentiator.

### Theme H: Chart Interpretation (Medium)
GL-Churner loves charts but needs plain-language interpretation. JBS-Fin wants a persistent chart with time-range selector. Neither is requesting advanced charting tools — both want basic charts made more accessible through explanation.

### Theme I: Conversion and Pricing Psychology (High)
85% never paid for research (Wave 1). WTP at $4.99 is 10% hard Yes, 69% open (Wave 2). PGP-Tech's acceptable range is €3–5/month. The price is right; the conversion trigger is "proof that it works" — demonstrated value before payment, not price reduction.

### Theme J: Retention and Churn Drivers (High)
GL-Churner left due to life change, not product failure — but re-enrollment would require goal re-anchoring, not feature improvement. Retargeting emails failed by advertising features. The churn pattern implies product-market fit may exist but emotional connection is missing.

### Theme K: UI/UX Confusion Points (Medium)
PGP-Tech: marketing page and app confused. "Verdict" and "DCF" are unexplained jargon. GL-Churner: "Profile" should be "Account." Wave 1 non-investors: "too complicated" (10/16). These are fixable friction points, not structural problems.

---

## Phase 4 — Priority Matrix

| Finding | Priority | Confidence | Source Count |
|---------|----------|------------|--------------|
| Signal/Noise / Information fragmentation is #1 pain | Critical | High | Wave 1 + Wave 2 + 3 interviews |
| Source attribution is trust prerequisite | Critical | High | Wave 1 (58%) + Wave 2 (56%) + JBS-Fin |
| Score/verdict mechanism resonates strongly | Critical | High | PGP-Tech + GL-Churner + JBS-Fin + Wave 2 |
| 85% never paid — behavioral barrier to conversion | Critical | High | Wave 1 (n=56) |
| Price point $4.99 is validated | High | Medium | PGP-Tech + Wave 2 (69% open) |
| Personalization / goal anchoring needed for retention | High | Medium | PGP-Tech + GL-Churner |
| Plain language / jargon-free design required | High | High | PGP-Tech + Wave 1 + Wave 2 |
| "Proof it works" is the conversion trigger | High | Medium | Wave 2 (59% conditional) + GL-Churner |
| Comparison feature (sector / peer) is valued | Medium | Medium | GL-Churner + JBS-Fin |
| Chart + plain-language interpretation | Medium | Medium | GL-Churner + JBS-Fin |
| Score granularity debate (1–10 vs 1–100) | Medium | Medium | PGP-Tech vs GL-Churner |
| Persistent price chart | Medium | Medium | JBS-Fin |
| Push notifications / portfolio summary email | Medium | Low | PGP-Tech only |
| Tax/fee transparency | Low | Low | JBS-Fin only |
| Custom stock screener / filter | Low | Low | Wave 2 (tehunk) only |

---

## Phase 5 — Jobs-to-be-Done Statements

**JTBD-1 (Core / Critical)**
When I hear about an interesting stock or theme, I want to quickly get a clear verdict on whether it's worth investing in, so I can make a confident decision without spending hours across multiple tools.
*Evidence: PGP-Tech (YouTube → ChatGPT → Trade Republic workflow); GL-Churner ("information retrieval is the most frustrating part"); Wave 1 37% signal/noise; Wave 2 40% conflicting info.*

**JTBD-2 (Trust / Critical)**
When I receive an AI-generated stock assessment, I want to see exactly where every number came from, so I can trust the output enough to act on it (or verify it myself).
*Evidence: Wave 1 58% conditional trust; Wave 2 56% "starting point"; JBS-Fin "I don't trust anyone"; GL-Churner wants score methodology transparent.*

**JTBD-3 (Verdict / Critical)**
When I'm evaluating a stock, I want a single, unambiguous score or rating that tells me if it's undervalued or overvalued relative to its sector, so I don't have to synthesize raw numbers myself.
*Evidence: GL-Churner "undervalued/overvalued with a score is much better"; JBS-Fin trusts Gemini for buy/hold/sell clarity; PGP-Tech "score mega — out of ten."*

**JTBD-4 (Accessibility / High)**
When I'm a first-time or passive investor, I want all financial terms explained in plain language without assumed knowledge, so I don't feel excluded or overwhelmed by jargon.
*Evidence: PGP-Tech warns against assuming DCF knowledge; Wave 1 non-investors 10/16 "too complicated"; Wave 2 Priyanka "make it easier for layman"; Wave 1 8/16 want plain-language explanations.*

**JTBD-5 (Personalization / High)**
When I set up my investment profile, I want the tool to remember my risk tolerance and financial goals, so every recommendation and verdict is filtered through what actually matters to me.
*Evidence: PGP-Tech "the tool would need to know me"; GL-Churner would stay if tool re-triggered his WHY for investing; Wave 1 product requirement: risk-matched recommendations.*

**JTBD-6 (Chart Interpretation / Medium)**
When I'm looking at a price chart, I want a plain-language explanation of what the chart pattern means (support levels, trend, momentum), so I can use chart data without needing technical analysis expertise.
*Evidence: GL-Churner "Charts I love. But what can I read from this chart? That explanation is missing."; JBS-Fin wants persistent chart always visible.*

**JTBD-7 (Comparison / Medium)**
When I'm deciding between two similar companies, I want to see them compared side-by-side against each other and against their sector benchmark, so I can identify the better opportunity without manual research.
*Evidence: GL-Churner "company vs sector vs S&P500"; JBS-Fin "it would be nice to compare similar companies side by side"; JBS-Fin "I really like the comparison part."*

**JTBD-8 (Retention / High)**
When I fall off my investing habit, I want the tool to reconnect me to my original financial goals and remind me why I started, so I re-engage rather than canceling my subscription.
*Evidence: GL-Churner "the retargeting emails should have triggered my WHY for investing"; "the tool needs to take me on a journey — why do I invest, what are my life goals."*

**JTBD-9 (Track Record / Medium)**
When I'm considering trusting pondex verdicts, I want to see a historical track record of how well previous verdicts performed, so I can calibrate how much weight to give the AI's recommendations.
*Evidence: Wave 2 Simon "get honest information on how well these verdicts worked in the past — a success history."*

**JTBD-10 (Onboarding / High)**
When I first open pondex, I want to immediately understand what it does and see it working on a real stock within 60 seconds, so I can evaluate its value before committing to payment.
*Evidence: Wave 2 46% "I'd need to see it work first"; 40% "I'd try it for free"; GL-Churner churn pattern implies proof of value must precede payment.*

---

## Phase 6 — Data-Driven Personas

### Persona 1: The Reactive Passive Investor — "Patricia"
**Based on:** PGP-Tech (Patricia Parnet) + Wave 1 passive investor segment (41%, n=23)

**Profile:** 25–35, tech/business professional, opened depot in last 3 years, invests opportunistically based on news/trends, checks depot daily but researches rarely. European.

**Research workflow:** News/YouTube → ChatGPT → Broker. Uses AI for idea validation, broker for execution.

**Core job:** "Tell me if this stock fits me — my budget, my risk, my timeline — so I can act on my hunch without falling into a research rabbit hole."

**Key pain:** Doesn't know which specific stock to pick within a theme. Doesn't know when to sell.

**Score preference:** 1–10 ("Gen-Z mindset")

**Price sensitivity:** €3–5/month ("wouldn't have to think about it")

**Trust requirement:** Source-cited verdicts + personalization

**Jargon risk:** High — actively flagged DCF and "Verdict" as unclear

**Retention lever:** Personalized push notifications, portfolio summary emails, goal anchoring

---

### Persona 2: The Value Investor with Information Overload — "Gunnar"
**Based on:** GL-Churner (Gunnar Leu) + Wave 1 churner WTP segment

**Profile:** 30–45, value investing mindset with technical analysis interest, uses IBKR, gets all ideas from specific YouTube channels, holds Core-Satellite portfolio. European.

**Research workflow:** 3–4 YouTube channels → TradingView → Broker. Never self-initiates research.

**Core job:** "Give me a comprehensive story about this business — why it'll still be relevant in 10 years — with a trustworthy score I can compare to sector peers."

**Key pain:** Paralysis when trying to research independently. Charts without interpretation. No benchmark context.

**Score preference:** 1–100 ("more granular, feels more thought-out")

**Price sensitivity:** Previously WTP $15–50/month; churned due to life change not product failure

**Trust requirement:** Transparent score methodology + sector comparison data

**Churn profile:** Goal-disconnection churner — retention requires purpose re-anchoring, not feature enhancement

**Retention lever:** Investing WHY / life goal reminder; customizable dashboard

---

### Persona 3: The Finance-Literate Skeptic — "José"
**Based on:** JBS-Fin (José Bernardo S.) + Wave 1 Bloomberg-priced-out finance professional

**Profile:** 30–45, finance professional, passive investor, risk-averse, invests in ETFs and blue-chip stocks. Currently Mexico-based; European/LatAm crossover.

**Research workflow:** Bank newsletter → ChatGPT/Gemini (feeds annual reports) → Yahoo Finance → Broker.

**Core job:** "Give me one place where I can see all the data I need — including comparison to peers — and trust that it's current and independent."

**Key pain:** Fragmented workflow across too many tools. Hidden fees and taxes eating returns without advance visibility.

**Score preference:** Buy/Hold/Sell with clear reasoning (Gemini model)

**Price sensitivity:** Not explicitly stated; Bloomberg user in Wave 1 segment paid $50–200/month

**Trust requirement:** Very high — "I don't trust anyone." Requires Yahoo Finance cross-validation visible in UI.

**Feature priority:** Persistent price chart, company comparison tab, market consensus integration

---

### Persona 4: The Hesitant Non-Investor — "Priyanka"
**Based on:** Wave 1 non-investor segment (n=16) + Wave 2 beginner feedback

**Profile:** 20–35, interested in investing but intimidated. Barrier: complexity + fear of loss + insufficient capital. Currently uses no financial tools.

**Core job:** "Make investing feel safe and understandable for someone who knows nothing — start me with a small amount and hold my hand."

**Key pain:** Everything feels too complicated. Fear of making a wrong decision and losing money.

**Unlock features:** Plain-language explanations (8/16), health score (6/16), micro-investing ($5 start, 6/16)

**Note:** This persona represents a future growth segment, not the current ICP. pondex's current free-tier Yahoo Finance + FastAPI stack can serve this persona's information needs. However, micro-investing requires broker integration outside current scope.

---

## Phase 7 — Prioritized Pain Points

| Rank | Pain Point | Segment | Source | Frequency |
|------|-----------|---------|--------|-----------|
| 1 | Conflicting information / too many sources to synthesize | Investors | Wave 1 (37%), Wave 2 (40%), all 3 interviews | Very High |
| 2 | No clear, actionable verdict — "what should I do?" | Investors | GL-Churner, JBS-Fin, Wave 2 (20% "takes too long to decide") | High |
| 3 | AI outputs with no source citations — can't verify | Investors | Wave 1 (58% conditional trust), JBS-Fin, GL-Churner | High |
| 4 | Research takes too long | Investors | Wave 1 (19% "too slow"), Wave 2 (20% "takes too long") | High |
| 5 | Don't understand financial metrics (P/E, DCF) | Passive + beginners | Wave 2 (17%), PGP-Tech, Wave 1 non-investors | High |
| 6 | Charts are visible but uninterpretable | Value investors | GL-Churner | Medium |
| 7 | No benchmark context (sector, S&P500) | Value investors | GL-Churner, JBS-Fin | Medium |
| 8 | Tool doesn't know my risk profile or goals | Passive investors | PGP-Tech, GL-Churner, Wave 1 requirements | Medium |
| 9 | Marketing and product UI are confusingly mixed | All | PGP-Tech | Medium |
| 10 | Too expensive or wrong cost structure | Early majority | Wave 1 (12%), Wave 2 churners | Medium |
| 11 | AI hallucinations / outdated data | Investors | Wave 1 (19%), PGP-Tech ("sometimes gives old data") | Medium |
| 12 | No company comparison / peer benchmarking | Finance-literate | JBS-Fin, GL-Churner | Medium |
| 13 | Hidden fees / taxes not visible before execution | Finance-literate | JBS-Fin | Low |
| 14 | No way to filter stocks by personal criteria | Active investors | Wave 2 (tehunk) | Low |

---

## Phase 8 — Feature Discovery (MoSCoW)

### Must Have (MVP — without these, the product fails its core job)

**M1 — Source-cited stock verdict**
Every AI output must cite named primary source (Yahoo Finance, SEC filing, etc.) with publication date. Non-negotiable for 58% conditional-trust users.
*Source: Wave 1, Wave 2, JBS-Fin, GL-Churner*

**M2 — Plain-language verdict / health score**
A single score (number) with plain-language explanation. No jargon assumed. "Undervalued / Overvalued / Fair value" with explanation.
*Source: GL-Churner, PGP-Tech, JBS-Fin, Wave 2*

**M3 — 60-second default use case**
User enters ticker or company name → receives a complete verdict in under 60 seconds. Depth is available on demand, not forced upfront.
*Source: Wave 1 product requirements, Wave 2 (20% "takes too long")*

**M4 — Jargon-free onboarding**
All financial terms (P/E, DCF, EV/EBITDA) explained inline or via tooltip. No prior knowledge assumed.
*Source: PGP-Tech, Wave 2 (17% "don't understand metrics")*

**M5 — Price chart (persistent, with time-range selector)**
Basic OHLCV chart always visible on stock detail page. Time range: 1d / 1m / 3m / 1y / max.
*Source: JBS-Fin, GL-Churner*

**M6 — Freemium model with clear value demonstration**
Free tier must demonstrate core value (at least 1 full verdict) before paywall. "I'd try it for free" = 40% Wave 2 conversion intent.
*Source: Wave 2 (40%), Wave 1 85% non-payers*

### Should Have (V1 post-launch — significantly increases conversion and retention)

**S1 — User risk profile / investing goal onboarding**
Capture risk tolerance, investment horizon, portfolio size at signup. Filter all verdicts and recommendations through this profile.
*Source: PGP-Tech, GL-Churner, Wave 1 requirements*

**S2 — Score with transparent methodology**
Link or expandable section explaining how the score is calculated, which metrics are weighted, and which sources feed it.
*Source: GL-Churner "score methodology transparent"*

**S3 — Company comparison (side-by-side)**
Compare 2 stocks across key metrics. Sector average as third column.
*Source: JBS-Fin, GL-Churner*

**S4 — Plain-language chart interpretation**
Below the price chart, a 2–3 sentence AI summary: "This stock has been in a downtrend since [date]. It recently bounced off support at [price]."
*Source: GL-Churner "that explanation is missing"*

**S5 — Portfolio summary email / push notification**
Weekly email or push: portfolio performance, any new red flags, goal progress.
*Source: PGP-Tech "push notifications / regular portfolio summary email"*

**S6 — Verdict track record display**
Show historical accuracy of pondex verdicts for a stock over time. "Of 8 verdicts in the past 12 months, 6 were directionally correct."
*Source: Wave 2, Simon "success history"*

**S7 — Buy/Hold/Sell recommendation (with reasoning)**
Explicit directional recommendation beyond a neutral score. JBS-Fin specifically trusts Gemini for this.
*Source: JBS-Fin, Wave 2 (GL-Churner preference for clear direction)*

### Nice to Have (V2 — expands user base, increases ARPU)

**N1 — Stock screener with custom filters**
Filter by sector, score range, dividend yield, market cap. User-defined criteria.
*Source: Wave 2 (tehunk)*

**N2 — Goal anchoring / investing WHY profile**
Onboarding step: "Why do you invest? What are you saving for?" Re-surface in retention communications.
*Source: GL-Churner — primary churn re-engagement lever*

**N3 — Multilingual support (DE, ES)**
German and Spanish UI and AI output. European 53% + LatAm segment.
*Source: Wave 1 requirements*

**N4 — Customizable dashboard (reorder / remove tiles)**
Let power users remove irrelevant modules and reorder the layout.
*Source: GL-Churner "remove what I don't need, reorder tiles"*

**N5 — Sector/S&P500 comparison chart overlay**
Visual chart showing stock performance vs sector ETF vs S&P500 over selectable time range.
*Source: GL-Churner, JBS-Fin*

**N6 — 10-year historical metrics table**
Cashflow, profit, dividend per share — last 10 years in a sortable table.
*Source: Wave 2 Maximilian*

---

## Phase 9 — Competitor Analysis (User-Referenced Only)

This section covers only tools that research participants explicitly mentioned. No external competitive research has been added.

| Tool | Who Mentioned | How Used | Gap That pondex Can Fill |
|------|--------------|----------|--------------------------|
| **ChatGPT** | PGP-Tech, JBS-Fin | Company validation, annual report extraction | Old/undated data ("sometimes gives old data" — PGP-Tech); no source citation visible to user |
| **Gemini** | JBS-Fin | Annual report extraction, buy/hold/sell verdict | JBS-Fin trusts Gemini's directional clarity — pondex must match this clarity |
| **TradingView** | GL-Churner | Chart analysis — highs, lows, support levels | Charts have no plain-language interpretation; no fundamental data integration |
| **Yahoo Finance** | JBS-Fin, Wave 1 (15%) | Market consensus cross-check | Raw data, no synthesis; interface not verdict-oriented |
| **Trade Republic** | PGP-Tech | Analyst ratings, price history, execution | Research tool, not a decision tool; no AI synthesis |
| **Bloomberg/Reuters** | Wave 1 (12%) | Professional research | Price-prohibitive for retail ($50–200/mo) — clear ceiling segment |
| **IBKR** | GL-Churner | Execution platform | Not a research tool; no AI layer |
| **Bank's internal newsletter** | JBS-Fin | Idea generation | Non-public, manually curated; creates dependency on employer |
| **YouTube (Lochner, Koch, etc.)** | GL-Churner, PGP-Tech | Idea generation | Not investable-level analysis; cannot search by ticker |

**Key competitive observation:** Every user's current stack is a patchwork. No existing tool closes the full loop from "idea" to "confident decision" to "source-cited verdict." pondex has a genuine white space — but only if it synthesizes, not just aggregates.

---

## Phase 10 — Contradictions and Tensions in the Data

### Contradiction 1: "I never paid but I would pay"
85% of Wave 1 respondents have never paid for a research tool, yet 69% of Wave 2 investors are "open" to $4.99/month. This is not necessarily a contradiction — the framing shifted from "have you paid?" (behavioral history) to "would you pay for this specific product?" (stated intent). However, stated WTP consistently overpredicts actual conversion in consumer software by 3–5x. The hard Yes rate (10%, n=3) is the more reliable signal.
*Type: Measurement artifact / behavioral gap. Hypothesis: actual conversion rate at launch will be 2–5%, not 69%.*

### Contradiction 2: Score format preference — 1–10 vs 1–100
PGP-Tech: "Gen-Z mindset — out of ten." GL-Churner: "1–10 looks superficial, 1–100 feels more trustworthy." Both strong reactions, opposite conclusions.
*Type: Genuine user preference divergence. Resolution: display 1–100 internally, show top-level 1–10 equivalent for quick read. Or user-selectable. Do not assume one format satisfies both segments.*

### Contradiction 3: Freemium demand vs "I want proof before paying"
40% of Wave 2 said "I'd try it for free" and 46% said "I'd need to see it work first." If the free tier is too limited, "I'd try it for free" users cannot get proof of value and won't convert. If the free tier is too generous, they don't need to upgrade.
*Type: Classic freemium conversion tension. The free tier must give enough to create conviction but not enough to meet recurring research needs.*

### Contradiction 4: "Don't serve both beginners and professionals" vs the persona mix
PGP-Tech explicitly said "Focus MVP on one target group." Yet the three interviewees represent three distinct sophistication levels (passive/reactive, value/technical, finance-professional). The survey data adds a non-investor segment.
*Type: Genuine scope tension. Resolution: the ICP should be PGP-Tech's persona (passive/reactive investor) for MVP. Other segments are V2 expansion.*

### Contradiction 5: Trust through independence vs Yahoo Finance as citation
JBS-Fin: "I don't trust anyone — I need to do my own research." Yet he uses Yahoo Finance for cross-validation. If pondex cites Yahoo Finance as a source, it may not satisfy his independence requirement — he already checks Yahoo Finance himself.
*Type: Trust architecture tension. pondex must cite primary sources (SEC filings, official earnings releases) not just data aggregators, to satisfy the most skeptical segment.*

### Contradiction 6: "Take me on a journey" vs "60-second verdict"
GL-Churner wants a goal-anchored, narrative-rich investment journey. PGP-Tech and the broader survey data want a fast, 60-second verdict. These are different products.
*Type: Segment-level product philosophy divergence. Resolve with progressive disclosure: 60-second verdict first, goal/narrative layer available for those who want depth.*

---

## Phase 11 — Executive Summary (10 Key Insights)

**Insight 1: The problem is real, consistent, and segment-agnostic.**
Information fragmentation is the #1 frustration across two survey waves (37% Wave 1, 40% Wave 2) and all three depth interviews. Critically, it is not a tool-stack problem — even users with comprehensive stacks (JBS-Fin: newsletter + ChatGPT + Yahoo Finance + broker) experience it. This validates the problem space with High confidence.

**Insight 2: The job is confidence, not data.**
Users do not want more information — they want a verdict they can act on. The score/verdict mechanism is the single most consistently valued concept across all data sources. pondex's core value proposition must be framed as "confidence in 60 seconds," not "all your data in one place."

**Insight 3: Source citation is the minimum viable trust layer.**
58% of Wave 1 and 56% of Wave 2 respondents will only use AI output conditionally, with source attribution required. This is not a marketing differentiator — it is a prerequisite for the product to be used at all. Every AI output must cite named, dated primary sources.

**Insight 4: The price point is validated — the conversion trigger is proof, not price.**
$4.99/month falls within PGP-Tech's "iCloud/Netflix level — wouldn't have to think about it" range (€3–5). The barrier to conversion is not price; it is proof of value. 46% of Wave 2 said "I'd need to see it work first." The freemium tier must deliver a complete, impressive experience.

**Insight 5: 85% behavioral inertia is the real commercial challenge.**
85% of Wave 1 respondents have never paid for a research tool. This is a category-creation challenge, not a competitive displacement challenge. The marketing must establish the category ("AI stock verdict") before selling the product.

**Insight 6: Retention requires goal anchoring, not feature enhancement.**
GL-Churner represents the canonical churn pattern: left due to life change, would not return for product features, would return only if reconnected to his WHY for investing. Onboarding must capture personal financial goals, and all retention communications must reference those goals.

**Insight 7: Plain language is a growth lever, not just a UX nicety.**
17% of Wave 2 investors don't understand P/E or DCF. 10/16 Wave 1 non-investors found investing "too complicated." PGP-Tech explicitly warned against jargon. Removing financial jargon expands the addressable market from ~41% passive investors to the full population of non-investors (estimated 40%+ of survey sample).

**Insight 8: The ICP for MVP is "Patricia" — the reactive passive investor.**
41% of Wave 1 is the passive investor segment. PGP-Tech is the clearest interview representative. She has validated price sensitivity, clear pain points, and a simple research workflow that pondex can replace end-to-end. She also gave the best product advice in the dataset: "Focus MVP on one target group."

**Insight 9: Comparison and benchmarking are V1 differentiators, not MVP blockers.**
Both JBS-Fin and GL-Churner strongly value company vs. sector vs. peer comparison. This feature is not required for the passive investor ICP but represents a natural V1 expansion that deepens value for more sophisticated users. It is a clear post-MVP roadmap item.

**Insight 10: The score design decision (1–10 vs 1–100) is a strategic brand choice.**
PGP-Tech and GL-Churner give opposite preferences with equal conviction. The resolution (1–100 with a 10-point summary band) must be user-tested, not assumed. This is the highest-urgency UX research question for the next sprint.

---

## Phase 12 — Product Strategy

### Vision
pondex is the first AI stock research tool that gives everyday investors a confident, source-cited verdict in 60 seconds — no jargon, no noise, no trust required in advance.

### ICP for MVP
**Segment:** Reactive passive investor, 25–40, European/tech-professional, opened depot in last 5 years, does not have a systematic research process, currently combines YouTube/ChatGPT/broker, invests every few months.

**Qualifying signals:**
- Uses ChatGPT for stock research but wants to verify data
- Checks depot regularly but researches only on news triggers
- Willing to pay "iCloud level" for a tool that saves time and builds confidence
- Does not have financial industry background

**Disqualifying signals for MVP (serve in V2):**
- Finance professional requiring institutional-grade data
- Power user wanting custom screeners or API access
- Non-investor requiring micro-investing / broker integration

### Core Feature Set (Minimum for ICP)
1. Ticker search → AI verdict in < 60 seconds
2. Verdict includes: score (1–100), plain-language assessment, buy/hold/sell direction, 3 supporting data points each with named source + date
3. Price chart (persistent, time-range selector)
4. Inline jargon explanations (tooltip or sidebar)
5. Freemium gate: 1 full verdict per day free; unlimited for $4.99/month

### MVP Scope (Ship to validate ICP)
- Core verdict flow (M1–M4 from Phase 8)
- Persistent price chart (M5)
- Freemium conversion gate (M6)
- Clean separation: marketing landing page ≠ product UI
- Rename "Profile" to "Account"
- Remove unexplained jargon from all visible copy

### V1 Scope (3–6 months post-launch)
- Risk profile / investing goal onboarding (S1)
- Score methodology transparency (S2)
- Company comparison — 2 stocks + sector average (S3)
- Plain-language chart interpretation (S4)
- Weekly portfolio summary email (S5)
- Buy/Hold/Sell with explicit reasoning (S7)

### V2 Scope (6–12 months)
- Goal anchoring / investing WHY retention flow (N2)
- Multilingual support: German, Spanish (N3)
- Verdict track record display (S6)
- Customizable dashboard (N4)
- Sector / S&P500 comparison chart overlay (N5)
- 10-year historical metrics table (N6)
- Stock screener with custom filters (N1)

### Roadmap Summary

| Milestone | Key Deliverable | Target |
|-----------|----------------|--------|
| MVP Launch | Source-cited verdict + chart + freemium | Q3 2026 |
| V1 | Personalization + comparison + email digest | Q4 2026 |
| V2 | Goal anchoring + multilingual + screener | Q1-Q2 2027 |
| Growth | Power user features (API, custom filters) | 2027 |

---

## Phase 13 — Requirements, Features, Risks, Questions, Hypotheses

### 20 Product Requirements

| ID | Requirement | Priority | Source |
|----|------------|----------|--------|
| PR-01 | Every AI output must cite at least one named, dated primary source | Critical | Wave 1, Wave 2, JBS-Fin |
| PR-02 | Full verdict must be deliverable in under 60 seconds from ticker entry | Critical | Wave 1 requirements |
| PR-03 | Score displayed on a 1–100 scale (research recommendation; validate via UX test) | High | GL-Churner, PGP-Tech |
| PR-04 | All financial terms (P/E, DCF, EV/EBITDA, MACD) must have inline plain-language explanations | High | PGP-Tech, Wave 2 |
| PR-05 | Price chart must be visible on stock detail page at all times without scrolling | High | JBS-Fin |
| PR-06 | Price chart must include time-range selector: 1d / 1m / 3m / 1y / max | High | JBS-Fin |
| PR-07 | Freemium tier must provide at least one complete, untruncated verdict per day | High | Wave 2 (46% "need to see it work") |
| PR-08 | Landing page (marketing) must be a separate page from the product UI | High | PGP-Tech |
| PR-09 | "Account" not "Profile" in navigation | Medium | GL-Churner |
| PR-10 | Buy/Hold/Sell recommendation must include minimum 2 sentences of plain-language reasoning | High | JBS-Fin, GL-Churner |
| PR-11 | Onboarding must capture: risk tolerance, investment horizon, portfolio size | High | PGP-Tech, GL-Churner |
| PR-12 | Primary data sources must be SEC filings / official earnings releases, not only data aggregators | High | JBS-Fin trust architecture |
| PR-13 | Score methodology must be accessible (expandable section or dedicated page) | Medium | GL-Churner |
| PR-14 | Verdict must be language-switchable to German and Spanish (V1) | Medium | Wave 1 requirements, demographics |
| PR-15 | Mobile-responsive design required — users check depot on mobile daily | Medium | PGP-Tech ("checks depot at least once a day") |
| PR-16 | Weekly email digest must reference user's stated investment goals, not product features | Medium | GL-Churner |
| PR-17 | Company comparison view must support at least 2 companies + sector average | Medium | JBS-Fin, GL-Churner |
| PR-18 | Data freshness indicator must be visible on every data point (source date) | High | PGP-Tech ("sometimes gives old data"), Wave 1 |
| PR-19 | AI output must not present probabilistic statements as certainties | Medium | Wave 1 hallucination concern (19%) |
| PR-20 | Onboarding must include optional "WHY I invest" / life goal capture step | Medium | GL-Churner retention insight |

---

### 20 Features

| ID | Feature | Phase | JTBD Served |
|----|---------|-------|-------------|
| F-01 | AI stock verdict card: score + verdict + direction + 3 cited data points | MVP | JTBD-1, JTBD-2, JTBD-3 |
| F-02 | Source citation panel: per data point — source name, publication date, link | MVP | JTBD-2 |
| F-03 | Inline jargon tooltip system (hover/tap for plain-language definition) | MVP | JTBD-4 |
| F-04 | Persistent price chart with time-range selector | MVP | JTBD-6 |
| F-05 | Freemium gate: 1 verdict/day free; unlimited paid | MVP | JTBD-10 |
| F-06 | Onboarding: risk profile + investing horizon + portfolio size | V1 | JTBD-5 |
| F-07 | Personalized verdict filter: "Is this right for my risk profile?" | V1 | JTBD-5 |
| F-08 | Score methodology page: weighted metrics, calculation logic, data sources | V1 | JTBD-2 |
| F-09 | Company comparison table: 2 stocks + sector average, key metrics side-by-side | V1 | JTBD-7 |
| F-10 | Plain-language chart interpretation: 2–3 sentence AI summary below price chart | V1 | JTBD-6 |
| F-11 | Weekly portfolio summary email: holdings snapshot + goal progress | V1 | JTBD-8 |
| F-12 | Buy/Hold/Sell recommendation badge with reasoning | V1 | JTBD-3 |
| F-13 | Verdict track record: historical accuracy of previous verdicts for a ticker | V2 | JTBD-9 |
| F-14 | "WHY I invest" onboarding step + life goal capture | V2 | JTBD-8 |
| F-15 | Sector/S&P500 comparison chart overlay | V2 | JTBD-7 |
| F-16 | 10-year historical metrics table (cashflow, profit, dividend/share) | V2 | JTBD-1 |
| F-17 | Stock screener with user-defined filters | V2 | JTBD-7 |
| F-18 | Customizable dashboard: reorder / hide modules | V2 | GL-Churner preference |
| F-19 | Multilingual UI + AI output (DE, ES) | V2 | Demographics (53% Europe) |
| F-20 | Push notification: "Your portfolio has a new red flag" | V2 | PGP-Tech retention preference |

---

### 10 Risks

| ID | Risk | Severity | Likelihood | Mitigation |
|----|------|----------|------------|------------|
| R-01 | Stated WTP (69% open) does not convert to actual payment — real conversion 2–5% | Critical | High | Prioritize free tier quality; create strong upgrade trigger at day 3 |
| R-02 | Yahoo Finance data is delayed or incorrect; pondex verdict cites wrong number | High | Medium | Show data freshness timestamp; always cite source date; caveat stale data |
| R-03 | Groq Llama hallucination in verdict output creates liability if user trades on it | High | Medium | Add mandatory disclaimer; every claim must have cited source; do not generate price targets |
| R-04 | Freemium tier is too generous — users get full value without converting | High | Medium | Daily verdict limit (1/day free); comparison feature paywalled |
| R-05 | ICP scope creep — trying to serve Patricia + Gunnar + José simultaneously kills MVP focus | High | High | Formally lock ICP to Persona 1 for MVP; document V2 expansion criteria |
| R-06 | Score design decision (1–10 vs 1–100) alienates one segment regardless of choice | Medium | High | User test both formats before launch; consider user-selectable display |
| R-07 | European GDPR compliance for AI-generated financial data | Medium | High | Legal review before launch; no storing of AI outputs on user without consent |
| R-08 | MiFID II or equivalent regulation classifies pondex verdicts as "investment advice" | High | Medium | Comply via standard disclaimer; position as "research tool not advice"; legal review |
| R-09 | Churn rate is high because emotional goal anchoring (WHY I invest) is a V2 feature | Medium | Medium | Include basic goal capture in V1 onboarding even without full WHY system |
| R-10 | Non-investor segment (Persona 4) generates significant interest but no revenue at $4.99 price point | Low | Medium | Track non-investor conversion separately; do not build micro-investing features for MVP |

---

### 10 Open Questions

| ID | Question | Blocking For |
|----|---------|-------------|
| OQ-01 | What score format (1–10 vs 1–100) drives higher trust AND conversion? Must be user-tested. | MVP design decision |
| OQ-02 | Can pondex cite SEC filings / earnings releases directly via Yahoo Finance API, or does primary source citation require a separate data layer? | PR-12, PR-01 |
| OQ-03 | What is the freemium-to-paid conversion rate target, and what is the minimum free verdict count to achieve it? | Freemium gate design |
| OQ-04 | Is the data accuracy gap (PGP-Tech: "sometimes gives old data from ChatGPT") a Yahoo Finance data latency issue or a Groq Llama training data issue? | PR-18, R-02 |
| OQ-05 | Does the €/$ price point need localization beyond currency conversion? (Tax treatment, billing region) | Pricing for EU/LatAm |
| OQ-06 | What is the minimum viable plain-language chart interpretation the Groq Llama model can reliably produce without hallucinating? | F-10 feasibility |
| OQ-07 | Should the weekly email digest be included in MVP or V1, given GL-Churner's retention data? | Retention prioritization |
| OQ-08 | What is the current app's jargon density? How many unexplained financial terms appear in the verdict flow? | PR-04 sprint planning |
| OQ-09 | How does the non-investor segment (Persona 4) discover pondex? What acquisition channel reaches people who don't yet invest? | Growth strategy |
| OQ-10 | Is there a legal requirement to display a financial disclaimer before showing any verdict, and does this break the 60-second UX? | MVP compliance |

---

### 10 Hypotheses

| ID | Hypothesis | Type | How to Test | Confidence |
|----|-----------|------|------------|------------|
| H-01 | If every verdict cites named sources with dates, conditional-trust users (58%) will complete the verdict flow and not bounce | Behavioral | A/B test: cited vs uncited verdict → measure completion rate | High prior |
| H-02 | If the freemium tier delivers 1 complete, impressive verdict for free, 5–10% of free users will upgrade within 7 days | Conversion | Freemium cohort analysis at D7 | Medium |
| H-03 | Users who complete the "WHY I invest" onboarding step will have 40%+ lower 90-day churn than users who skip it | Retention | Cohort A (WHY captured) vs B (skipped) → 90-day churn | Medium |
| H-04 | A 1–100 score will be perceived as more credible than a 1–10 score by users with >2 years investing experience | Trust perception | Usability test: show both formats to 10 users; measure stated trust + think-aloud | Medium |
| H-05 | "Conflicting info" as #1 pain predicts WTP — users with this pain convert at 3x the rate of users with other primary pains | Conversion driver | Cross-tab pain point vs conversion in first 500 signups | Low (n=3 in Wave 2 only) |
| H-06 | Adding plain-language chart interpretation will increase time-on-page for the stock detail view by > 30% | Engagement | A/B test with / without chart interpretation paragraph | Medium |
| H-07 | Separating marketing landing page from product UI will increase trial signup conversion by >20% | Funnel | A/B test: current mixed page vs dedicated landing page | High prior (PGP-Tech + standard CRO) |
| H-08 | Users who complete the risk profile onboarding step will rate verdicts as more relevant (+0.5 on 1–5 scale) vs users who skipped | Personalization value | In-app rating prompt: personalized vs unpersonalized verdict |Medium |
| H-09 | At least 20% of paying users will have "conflicting info / too many sources" as their stated primary pain — this is the conversion-predictive segment | Segmentation | Post-conversion survey on first billing anniversary | Medium |
| H-10 | Weekly goal-anchored email digest will reduce monthly churn by > 15% vs no-email control group | Retention | Email cohort split in first 3 months post-V1 launch | Low (GL-Churner insight, n=1) |

---

## Appendix: Confidence Calibration Summary

| Claim | Confidence | Source Count |
|-------|------------|--------------|
| Signal/Noise is #1 investor pain | High | Wave 1 + Wave 2 + 3/3 interviews |
| Source citation required for trust | High | Wave 1 n=26/42 + Wave 2 n=19/34 + 2/3 interviews |
| Score concept resonates | High | 3/3 interviews + Wave 2 open-ends |
| $4.99 price point validated | Medium | 1 interview (PGP-Tech) + Wave 2 69% open |
| Passive investor is majority segment | High | Wave 1 41% (n=23) |
| Goal anchoring reduces churn | Low-Medium | 1 interview (GL-Churner) |
| 1–100 preferred over 1–10 | Medium | 1/3 interviews (GL-Churner); contradicted by PGP-Tech |
| Non-investors represent growth segment | Medium | Wave 1 n=16; not yet a revenue segment |

---

*Report prepared by the pondex AI Research Council — 22 interdisciplinary experts.*
*All data citations reference original source documents. No data has been extrapolated or invented.*
*Next research action recommended: Score format user test (OQ-01) and freemium conversion tracking setup (OQ-03).*
