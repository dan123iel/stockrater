# Later — Full Feature Backlog

Prioritized but not scheduled. Items move to `next.md` when the current phase exits.

**Filter for every feature:** Does it make decisions, learning, or behavior better? If none, it doesn't belong here.

---

## V2 — Intelligence & Proactivity

### AI Chat
Context-aware chat assistant that knows the user's profile, portfolio, and the current stock's live data. It interprets instead of just answering — "As a Growth investor with a long horizon, this matters to you because..." It can compare two stocks, explain concepts, think through scenarios, and never cites numbers it wasn't given in context (RAG architecture, ADR-005). Chat history persists for the session.

### Proactive Stock Suggestions (Discovery Engine)
See `doc/specs/discovery-engine.md` for full spec. Curated universe of ~200 global stocks, scored nightly via Cloudflare KV. Local matching against profile + portfolio gaps. Each suggestion includes: why this stock for you, why not, what you already own that's similar.

### Decision Quality Score
Rates the decision process, not the outcome. A well-reasoned buy of a stock that later drops still scores high. An impulsive FOMO buy that accidentally worked scores low. Inputs: score at time of purchase, margin of safety, thesis documented (yes/no), portfolio concentration impact, profile alignment. Output: 0–100 decision quality score per trade.

### Earnings Translator
After earnings: instead of "EPS beat, revenue beat," pondex explains what actually happened. "Revenue beat expectations but management quietly lowered next quarter's guidance and gross margins declined 1.2%. That's why the stock is down despite the headline beat." Pulls from the MD&A section of the earnings release.

### Pre-Mortem Engine
Before confirming a purchase, pondex asks: "Imagine this investment is a disaster in 3 years. What was most likely the cause?" Forces the user to articulate the failure mode before committing. Stored alongside the thesis. Reduces confirmation bias.

### Portfolio Doppelgänger
Detects hidden concentration. "You think you own 5 different companies. You actually own 5 versions of the same bet on AI infrastructure capex." Shows which macro themes or risk factors connect apparently unrelated positions.

### Shareable Thesis Card
Generates a clean PNG (via HTML canvas): stock ticker, fit score, 3 key reasons, 1 key risk, confidence score. Designed for sharing on X, Reddit, Substack, LinkedIn. Branded with pondex logo. The organic distribution engine.

### Keyboard Shortcuts
- `CMD+K` — open ticker search from anywhere
- Arrow keys — navigate between Analytics tiles
- `C` — open AI Chat
- `T` — open Thesis Tracker for current stock
- `ESC` — close any overlay

### Multi-language
German and English minimum. UI copy, AI explanations, and score labels all localized.

---

## V3 — Learning System

### Investment Autopsy
For every closed position: what was right, what was wrong, what was luck, what was skill. pondex separates process (was the reasoning sound?) from outcome (did it work?). After 6 months, 1 year, and 3 years, it surfaces the closed position with a structured post-mortem prompt.

### Bias Detector
After 50+ trades, pondex identifies systematic patterns in the user's decision history:
- "You sell winners after +15% on average (too early)"
- "You hold losers until -40% on average (too long)"
- "You buy most often when news sentiment is at peak positive (buying at highs)"
- "You almost never invest outside the US"
- "You avoid Healthcare regardless of fundamentals"

### Personal Alpha Tracker
Where does the user's actual outperformance come from? Breaks down returns by: sector, geography, company size, holding period, buy condition (high confidence vs. low confidence purchases). Shows where the user genuinely has an edge vs. where they consistently underperform.

### Portfolio Stress Test
Full portfolio scenario analysis. Not just DCF for individual stocks — for the entire portfolio. Scenarios: AI bubble bursts, recession, oil +50%, China-Taiwan conflict, rates +2%, USD -15%. Output: estimated portfolio impact, biggest risk contributor, which positions amplify vs. hedge each other.

### Investment GPS
The user sets a goal: "€1M in 20 years, investing €500/month." pondex calculates current trajectory probability, required annual return, and how changes in savings rate affect the outcome. Not a robo-advisor — just a calculator that makes the math visible.

### Conviction Tracker
At purchase, the user rates conviction: 8/10. When the stock drops 20%, pondex asks: "Conviction still 8/10?" Tracks conviction over time. Reveals whether the user holds positions out of genuine belief or out of anchoring to the purchase price.

### Thesis Drift Detector
Detects when the user's stated reason for holding has silently shifted from the original thesis. "In 2025 you bought for long-term growth. Your recent journal entries suggest you're now holding because you're down 18% and don't want to realize the loss." Points out the gap without judgment.

### Circle of Competence Score
Tracks which sectors the user spends time in, scores well in, and makes good decisions in. Shows a visual "competence map." When the user analyzes a biotech stock but has never analyzed biotech before: "This is outside your tracked competence area. Proceed with extra skepticism."

### Personal Investment Handbook
After 12–18 months of usage, pondex auto-generates: "You invest best when: score > 4.0, large caps, tech or software, holding period > 2 years. Your most consistent mistakes: turnaround stories, biotech, buying after media hype peaks."

### Decision Journal Replay
Time-machine for decisions. The user can pull up any past decision and see: the original thesis, the news context at the time, the score, the alternatives they considered, and how it turned out. Not hindsight — the data is frozen at the decision date so the user can fairly evaluate the reasoning.

### Opportunity Cost Engine
Every purchase is stored alongside the alternatives that existed at the time. After 1 year: "You chose ASML (+22%). The top alternative you passed on was NOVO (+38%). You chose correctly vs. AMD (-9%) and INTC (-22%)." Teaches whether the stock selection process works.

---

## V3+ — Advanced Features

### Investment Timeline
Per-stock timeline view. Each position gets its own story: purchase date + thesis → earnings events → analyst changes → insider activity → news milestones → thesis check results → eventual sale. Everything on one scrollable timeline per stock.

### Red Flag Timeline
Chronological warning signals for a stock. Shows when the first amber signal appeared (e.g. CEO selling) vs. when the full thesis broke. "The first warning signs appeared 8 months before the guidance cut. Here's what was available at the time."

### Portfolio Historian
Shows how the portfolio's composition has evolved. "12 months ago: 90% tech, 0% healthcare, no dividend stocks. Today: 55% tech, 15% healthcare, 10% dividend stocks." Makes the user's own evolution as an investor visible.

### Portfolio Immune System
Health score for the portfolio based on: currency concentration, sector concentration, geographic concentration, average valuation, balance sheet quality, cashflow stability. Not performance — robustness.

### AI Investment Committee
Four virtual perspectives on any stock or decision:
- **Buffett lens:** Quality, moat, long-term durability
- **Graham lens:** Value, margin of safety, downside protection
- **Lynch lens:** Growth, understandable business, PEG ratio
- **Dalio lens:** Macro context, diversification, correlation
Not four chatbots — four structured analytical frameworks applied to the same data, with a synthesis at the end.

### Historical Analog Engine
"When has a similar situation appeared historically?" NVIDIA today vs. Cisco 1999. Meta 2022 vs. Microsoft 2011. Novo Nordisk vs. early pharma blockbusters. Not as prediction — as a thinking tool. Shows base rates for comparable situations.

### Counterfactual Engine ("Almost Bought")
The app remembers every stock analyzed but not purchased. After 1 year: "Here are the 20 stocks you analyzed and decided against. How did they perform?" Validates or challenges the user's screening judgment.

### Portfolio Digital Twin
Simulate changes before making them. "What does my portfolio look like if I add €5k to ASML? What if I sell half my NVIDIA? What if I rotate entirely into European stocks?" See risk metrics, concentration, and projected scenarios before acting.

### Second-Level Thinking Engine
Surfaces non-obvious implications of macro trends. "AI is growing → obvious play: NVIDIA. Second-level: who sells the shovels? ASML, TSMC, cooling infrastructure. Third-level: who benefits from AI-driven productivity gains in non-tech sectors?" Generates idea chains, not just ticker suggestions.

### Market Noise Filter
Scores every news item for relevance to the user specifically. "Tesla misses deliveries" — if you own Tesla at 12% of your portfolio: High relevance. If you don't own Tesla: Low relevance. Prevents the user from reacting to news that doesn't affect their actual holdings.

### Earnings Importance Score
Filters quarterly reports by thesis relevance. "Normal earnings — no thesis-relevant data changed." vs. "Thesis Event — your condition 2 (gross margin > 60%) was just tested. Result: 58.4%. Below threshold." The user doesn't need to read every earnings release — only the ones that matter.

### Versionierung von Überzeugungen (Conviction History)
Tracks conviction score per position over time. NVIDIA: Conviction 9/10 (Jan 2025) → 7/10 (Apr 2025) → 5/10 (Sep 2025). Shows when conviction began declining, correlated with what events. Makes the erosion of thesis conviction visible before it becomes a realized loss.

### "What Must Be True?" (Reverse Valuation)
At current market price, calculates what assumptions must hold for the stock to be fairly valued. "At $485, NVIDIA requires 28% annual revenue growth for 10 years to justify the price. The 5-year analyst consensus is 22%. Do you believe the market's implied growth rate is achievable?" More actionable than a static DCF output.

### Regret Minimizer
For every decision, records: what information was available, what alternatives existed, what the uncertainty was. Later evaluates: "Given only what you knew at the time, was this a rational decision?" Prevents hindsight bias ("I should have known") by anchoring evaluation to the information available at decision time.

### Portfolio Narrative (Auto-Generated)
Generates a plain-language description of what the user's portfolio is actually betting on. "You are currently invested primarily in dominant technology platforms with high returns on capital and AI exposure. 74% of your risk comes from the United States. Your portfolio implicitly bets on continued declining rates and rising enterprise AI investment." Makes the user's implicit thesis explicit.

### FOMO & Panic Blocker
When a portfolio stock has extreme intraday volatility (RSI > 80 or < 20, volume spike) and the user opens it, the AI enters stoic mode: "NVIDIA is down 12% today. Before you act: your original thesis had a 5-year horizon and it's currently year 1. Has anything fundamentally changed, or are you reacting to market noise?" Applies Behavioral Finance friction before reactive decisions.

### Anomaly Radar (Behavioral Patterns)
After sufficient trade history, surfaces patterns in the user's behavior: "You buy most frequently on days when the stock's news sentiment is at maximum positive — a signal you may be buying at local highs due to media influence." Behavioral Finance, personalized.

### Local AI via WebGPU
Optional: runs a small language model (Llama-3-8B or Gemma-2B) directly in the browser using WebGPU hardware acceleration. Fully offline AI Chat with zero server costs and mathematically guaranteed privacy. "What happens in pondex, stays in pondex."

### Collective Intelligence (Anonymous, GDPR-Compliant)
Optional: users can contribute anonymously to a trend signal. The Worker counts which tickers users with a "Growth / Aggressive" profile are analyzing this week — without any personal data. Powers a "trending in your profile type" signal on the Ideas page.

### Source-Based Discovery
User adds external sources: YouTube channel URL, Substack/blog RSS, newsletter link. pondex extracts mentioned tickers via AI, runs each through the scoring engine, and surfaces: "3 stocks mentioned in your sources this week — here's the pondex check for each." Bridges the gap between external research and systematic analysis.

---

## Never

| Feature | Reason |
|---|---|
| Social feed / comments | Contradicts calm philosophy — adds noise, not signal |
| Copy trading | Removes decision ownership from the user |
| Gamification / streaks | Optimizes for engagement, not decision quality |
| "Top trending stocks" | Promotes FOMO — the exact behavior pondex fights |
| Push price alerts | Noise; thesis-level alerts are sufficient |
| Leaderboards | Social comparison ≠ better decisions |
| Automated trading | Different risk profile, out of scope |
