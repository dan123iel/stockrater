# pondex — Intelligence Architecture Document

> Last updated: 2026-06-22
> Purpose: Document what pondex has, what is missing vs. competitors,
> and the roadmap for making AI Insights the core differentiator.
> This document is the source of truth before any implementation begins.

---

## Part 1 — What pondex has today

### Tiles and their data sources

| Tile | Data source | What it computes | What it shows |
|------|-------------|-----------------|---------------|
| Scorecard | FMP `/stable/ratios` + `/profile` + `/insider-trading` | 5 factor scores (fin/mgmt/moat/esg/val), weighted by user profile | Score 0–5, factor bars, "Why this score?" explanation with sources |
| Chart | Canvas (simulated data) | None — demo data | Price line, SMA 50/200, RSI, volume bars, simulated OHLC |
| Valuation | FMP `/stable/ratios` + `/stable/key-metrics` | P/E, EV/EBITDA, P/S, FCF yield, margins, ROE, dilution | Tabbed: Valuation / Profitability / Liquidity |
| Stresstest (DCF) | FMP `/profile` + `/income-statement` | 5-year DCF, 3 scenarios (worst/base/best) | Sliders seeded from real data, fair value, MoS % |
| News | Yahoo Finance via Cloudflare Worker (DNS dead) | None | Static demo items + live Yahoo RSS (broken) |
| Insiders | FMP `/insider-trading` | Net buy ratio, buy/sell counts, total value | Transaction table, sentiment badge |
| Ownership | FMP `/institutional-holder` + `/profile` | Top 10 holders, institutional %, shares outstanding | Holdings table |
| Dividends | FMP `/dividends-historical` + `/profile` | Yield, streak, annual history | Yield/streak stats + history bars |
| Financials | FMP `/income-statement` + `/balance-sheet` + `/cash-flow` | Revenue, income, assets, liabilities, FCF | Tabbed quarterly/annual tables |
| Analysts | FMP `/analyst-stock-recommendations` + `/price-target-summary` | Buy/Hold/Sell distribution, price target | Rating bars, target range, history |
| AI Insights | Groq (Llama 3.1 70B) or OpenRouter | None — generates from general knowledge only | Summary, buy reasons, risks, 3 alternatives |
| Company Profile | FMP `/stable/profile` | Sector, industry, CEO, HQ, description | Overview card |

### What the AI prompt currently receives

```
ticker: "AMD"
profile: "Growth / Balanced"
horizon: "Medium-term (1–5 yrs)"
risk: "Balanced"
topWeightLabel: "Financial Ratios"
topWeight: 65%
score: "4.20"
```

**That's all.** No actual financial data. No ratios. No insider data. No macro context.
The AI generates text from its training data about AMD — not from pondex's live data.

---

## Part 2 — Gap analysis: What Morningstar and Yahoo Finance have that pondex doesn't

### Tier 1 — Critical gaps (high value, feasible with FMP free tier)

| Feature | Morningstar | Yahoo Finance | pondex today | Gap |
|---------|-------------|---------------|--------------|-----|
| **Earnings surprises** | Not shown | ✅ EPS Est. vs. Actual, Surprise % per quarter | ❌ Missing | FMP `/earnings-surprises` — 4h |
| **Annual returns vs. index** | ✅ Year-by-year vs. benchmark | ✅ YTD/1Y/3Y/5Y vs. S&P 500 | ❌ Missing | FMP `/historical-price-full` — 1 day |
| **Forward growth estimates** | Partially | ✅ Current Qtr, Next Qtr, Current Year, Next Year EPS/Revenue | ❌ Missing | FMP `/analyst-estimates` — 4h |
| **Normalized vs. reported metrics** | ✅ Normalized EPS alongside reported | Partially | ❌ Missing | Already in FMP income statement (`normalizedIncome`) — 2h |
| **Peer comparison auto-generated** | ✅ AMD vs. NVDA vs. INTC side by side | Partially in sidebar | ⚠️ Manual only | Static peer map + FMP calls — 1 day |
| **Price vs. Fair Value visual** | ✅ Gauge with uncertainty band | Price target range bar | ⚠️ Text only ($97, -53% MoS) | Pure UI, no new API — 2h |
| **52-week range visual** | ✅ Shown | ✅ Shown | ❌ Missing from header | Already in FMP profile data — 30min |

### Tier 2 — Valuable but secondary

| Feature | Morningstar | Yahoo Finance | pondex today | Gap |
|---------|-------------|---------------|--------------|-----|
| **Governance score (ISS)** | ❌ | ✅ ISS QualityScore with 4 pillars | ❌ Missing | Requires premium data license. Note for Phase 4. |
| **Executive compensation table** | ✅ CEO pay 5-year trend | ✅ Full exec table | ⚠️ Basic exec list only | FMP `/key-executives` — partial data |
| **Insider transaction history paginited** | ✅ 414 transactions, 10-year history | Partially | ⚠️ Last 20 only | Increase limit + pagination — 2h |
| **Economic Moat rating narrative** | ✅ Wide/Narrow/None with explanation | ❌ | ❌ | pondex computes proxy — add narrative label |
| **Stock splits history** | ✅ | Partially | ❌ | FMP `/historical-price-full` includes splits |
| **Payout ratio + dividend growth CAGR** | ✅ | ✅ | ⚠️ Basic yield only | Already computed in dividend tile — display gap |

### Tier 3 — Deliberately NOT adding (conflicts with pondex soul)

| Feature | Why not |
|---------|---------|
| Options chain | Different user type — derivatives trader, not fundamental investor |
| Social/Reddit forum | pondex principle: data over opinion noise |
| Analyst narrative reports | pondex equivalent is AI Insights — and it will be better |
| Video embeds | No investment decision value |
| Pre-market/after-hours pricing | Requires real-time WebSocket. Phase 4. |
| ISS Governance Score (direct) | Premium license ($$$). Not FMP free tier. |

### The critical insight from this comparison

**Morningstar and Yahoo Finance show the same problem:**
They display data in isolated modules. A user sees P/E 117× in Valuation. They see Revenue Growth +35% in Financials. They see Insider Net Selling in Ownership. They see VIX 17.4 in a separate macro tool.

**Nobody connects these four signals and says:**
> "P/E 117× sounds expensive. But paired with 35% revenue growth, that's a PEG ratio of ~3.3 — expensive but not irrational for the sector. However, insiders are selling at 77% of transactions, and with the 10Y at 4.32%, the risk premium for growth stocks is compressed. For your 5-year horizon, the entry point matters more than usual."

That synthesis is what pondex must do. It requires first collecting all the data, then connecting it.

---

## Part 3 — The AI Intelligence Architecture

### Current state (broken)

```
AI Insights today:
  Input:  ticker + profile name + score number
  Output: generic text from training data about the company
  Problem: NOT grounded in pondex's live data
           NOT correlating signals across tiles
           NOT personalised beyond profile name
```

### Target state

```
AI Insights target:
  Input:  ticker + profile + ALL live data from all tiles
  Output: synthesis of what the combined signals mean
           for this specific investor profile
           in the current macro environment
  Result: something NO other tool provides
```

### The data pipeline for AI context

When a user opens AI Insights, the system should collect:

```javascript
// BLOCK 1 — Investor profile (already exists)
profile: {
  name: "Growth / Balanced",
  horizon: "Medium-term (1–5 yrs)",
  risk: "Balanced",
  focus: "Growth",
  weights: { fin: 75, mgmt: 10, moat: 13, esg: 2, val: 0 }
}

// BLOCK 2 — Scorecard (already computed)
scorecard: {
  total: 4.20,
  label: "Buy",
  factors: {
    fin:  { score: 5.0, weight: 75 },
    mgmt: { score: 2.5, weight: 10 },
    moat: { score: 3.8, weight: 13 },
    esg:  { score: 3.7, weight: 2  },
    val:  { score: 2.5, weight: 0  }
  }
}

// BLOCK 3 — Live financial ratios (already fetched for Valuation tile)
financials: {
  grossMargin: 0.503,        // 50.3%
  operatingMargin: 0.107,    // 10.7%
  revenueGrowthYoY: 0.350,   // +35%
  peRatio: 117.3,
  evEbitda: 91.1,
  fcfYield: 0.011,           // 1.1%
  debtEquity: 0.06,
  currentRatio: 2.72
}

// BLOCK 4 — Insider signal (already fetched for Insiders tile)
insiders: {
  buyRatio: 0.23,            // 23% buys, 77% sells
  netSentiment: "Net Selling",
  recentTransactions: 20,
  totalBoughtValue: "$1.2M",
  totalSoldValue: "$8.4M"
}

// BLOCK 5 — Macro context (static data already in pondex)
macro: {
  fedRate: "4.25–4.50%",
  tenYearYield: 4.32,
  cpi: 3.1,
  vix: 17.4,
  sp500YTD: "+12.1%",
  regime: "Elevated rates, moderating inflation"
}

// BLOCK 6 — Valuation context (DCF already computed)
valuation: {
  currentPrice: 160.40,
  dcfFairValue: 155.00,       // from Stresstest tile
  marginOfSafety: -3.3,       // slightly overpriced
  analystConsensus: "Buy",
  analystTargetAvg: 180.00,
  priceVsTarget: "+12.2%"
}

// BLOCK 7 — NEW: Earnings surprises (to be added)
earnings: {
  lastQuarter: { epsEst: 0.68, epsActual: 0.96, surprise: "+41%" },
  trend: "3 consecutive positive surprises"
}
```

### The prompt that uses all of this

```
You are a financial analyst for pondex.
Do NOT use your training data about AMD — use ONLY the data provided below.
Your job is to find correlations between these signals and explain what they mean
together for this specific investor. Be specific. Be honest. Flag contradictions.

INVESTOR PROFILE:
- Strategy: Growth / Balanced
- Horizon: Medium-term (1–5 years)
- Highest weight: Financial Ratios (75%)
- Risk: Balanced

LIVE DATA AS OF [DATE]:
[all 7 blocks above, formatted as key-value pairs]

WHAT TO ANALYZE:
1. SIGNAL SYNTHESIS: What do these data points mean together?
   Find 2–3 correlations or contradictions between the signals.
   Example: "Revenue growth of +35% is strong, but P/E of 117× means
   you're paying $3.35 for every $1 of growth (PEG 3.3) — expensive
   but not irrational given the sector."

2. PROFILE FIT: Given this investor's specific profile, is this a buy?
   Explain why the score is [X] for THIS profile vs. what a value investor
   would see.

3. RISK FLAGS: What specific combination of signals should concern this
   investor? (e.g., "Insider selling + compressed FCF yield + high WACC
   environment = limited margin for disappointment")

4. ONE KEY QUESTION: What single data point should this investor watch
   most closely? Why?

5. ALTERNATIVES: Exactly 3 stocks that score better on this investor's
   top-weighted factor, with a one-sentence reason each.

Respond in JSON: {synthesis, profile_fit, risk_flags, watch, alternatives[]}
Keep each field to 2–4 sentences. Specific numbers. No generic statements.
```

### Why automatic trigger is correct (answer to question 2)

Auto-trigger is right because:

1. **All the data is already fetched** when the user opens other tiles. The AI tile just aggregates it — no extra API cost.
2. **The user context is fresh** — they just looked at the Valuation, Insiders, and Financials tiles. The AI should synthesize what they just saw.
3. **Manual trigger creates friction** — the value proposition of pondex is "analysis that comes to you", not "analysis you have to ask for".
4. **One caveat**: auto-trigger only when data is actually loaded. If tiles haven't been opened yet, show a "Loading context..." state while the required data fetches happen silently in the background.

### Implementation sequence

**Step 1 — Data aggregation function** (no UI changes)
Create `collectAIContext(ticker)` that reads from `FMP_CACHE` for all already-fetched data. Does not make new API calls — reads from cache only. Falls back gracefully if a tile's data hasn't been loaded yet.

**Step 2 — New prompt** (replaces current minimal prompt)
Wire the collected context into the prompt. Update `runGroqAnalysis()`.

**Step 3 — Auto-trigger**
When AI tile opens, call `collectAIContext()`, check if minimum data exists (profile + at least ratios), then auto-run. No button press needed.

**Step 4 — Add missing data points** (new FMP calls)
- Earnings surprises: `/earnings-surprises/{ticker}` → add to Analysts tile AND AI context
- Forward estimates: `/analyst-estimates/{ticker}` → add to Analysts tile AND AI context
- Annual returns: `/historical-price-full/{ticker}` → add to Chart tile AND AI context

**Step 5 — Visual upgrades** (no new data needed)
- Price vs. Fair Value gauge in DCF tile
- 52-week range in header
- Normalized EPS flag in Financials tile

---

## Part 4 — What makes pondex different (the soul)

### The three layers

```
LAYER 1 — Data (what Morningstar and Yahoo do)
  "Here are the numbers."
  → pondex has this

LAYER 2 — Scoring (what pondex already does better)
  "Here is how these numbers rank, weighted for YOUR strategy."
  → pondex does this, transparently, with cited sources

LAYER 3 — Synthesis (what nobody does — pondex's moat)
  "Here is what these numbers MEAN together, for YOU, right now."
  → pondex is building this
```

### The pondex principles that must NOT change

1. **Every score is explainable** — no black boxes. User can always see why.
2. **Profile-relative** — same stock, different score for different investors. By design.
3. **Honest about data quality** — if something is simulated or estimated, it says so.
4. **No opinion noise** — no Reddit feeds, no YouTube embeds, no analyst chat.
5. **Transparent sources** — every threshold has a citation (Damodaran, Graham, CFA, etc.)
6. **Client-side privacy** — data stays in the user's browser until Phase 4.

### The differentiator sentence (for the About modal, Phase 4)

> "Every other tool shows you what a stock's numbers are.
> pondex tells you what those numbers mean — for how YOU invest."

---

## Part 5 — Implementation priority order

### Immediate (before anything new)
- [ ] Fix Cloudflare Worker (deploy worker.js to new Cloudflare account)
- [ ] Verify all stable API endpoints return data correctly after migration

### Sprint 1 — Data completeness
- [ ] **Earnings surprises** — add to Analysts tile + cache for AI context
- [ ] **Forward EPS/Revenue estimates** — add to Analysts tile + cache for AI context
- [ ] **52-week range** — show in header (data already in profile response)
- [ ] **Normalized EPS** — flag in Financials tile (already in FMP response)
- [ ] **Annual returns vs. S&P** — add to Chart tile

### Sprint 2 — AI Intelligence (the soul)
- [ ] **`collectAIContext()`** — aggregate all cached tile data
- [ ] **New AI prompt** — use all 7 data blocks, ask for correlations not summaries
- [ ] **Auto-trigger** — AI tile runs when opened, no button needed
- [ ] **Loading state** — "Analyzing 7 data signals..." instead of just spinner

### Sprint 3 — Visual quality
- [ ] **Price vs. Fair Value gauge** in DCF tile
- [ ] **Peer auto-comparison** — auto-load 3 peers on Comparison page
- [ ] **Moat label** — translate moat score to "Wide / Narrow / None" narrative

### Phase 4 — After auth/database
- [ ] **Historical scoring** — "What was AMD's pondex score when you bought?"
- [ ] **Score change alerts** — notify when score crosses threshold
- [ ] **Cross-portfolio correlation** — what signals across your holdings correlate?
- [ ] **Governance score** — ISS data when affordable

---

*Last updated: 2026-06-22*
*Next review: After Sprint 1 is complete*
*Owner: Daniel*
