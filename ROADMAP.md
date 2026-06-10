# futara — Product Roadmap & Discovery

**Version:** 0.1 (Discovery Phase)
**Last updated:** 2026-06-10
**Status:** Pre-MVP

---

## The One-Liner

> "futara tells you whether a stock fits *your* investment strategy — algorithmically, transparently, without conflict of interest."

---

## Unique Positioning Statement (UPS)

| Competitor | Problem |
|---|---|
| Bloomberg / Morningstar | Data for professionals, expensive, no personal strategy match |
| YouTube / Influencers | Opinion-based, not reproducible, no personal reference |
| Bank advisors | Conflict of interest — they sell products |
| Robo-advisors (Scalable, etc.) | Black box, no explainability, no education |
| **futara** | **Strategy-relative scoring, explainable, personal, open** |

The core insight: a P/E of 30x is good for a growth investor and bad for a value investor. No tool currently adjusts the score to the user's profile. That is the gap.

---

## Target Users (Persona Interview — open questions)

### Primary: The Self-Directed Retail Investor
- Invests 1–4x per year, own research
- Uses YouTube, Reddit, maybe Bloomberg for free
- Frustrated that no tool combines their personal strategy with objective data
- Wants to know: "Should I buy this?" not just "here is the data"

### Secondary: The Active Trader
- Trades more frequently, wants quick signals
- Needs portfolio performance vs. own past decisions
- Wants to know: "Was that trade actually good in hindsight?"

### Future: The Advised Investor
- Currently uses a bank advisor
- Wants a second opinion, fee-free
- Trusts numbers more than salespeople

---

## The 3 Core Questions futara Must Answer

1. **"Should I buy this stock — given how I invest?"**
   → Strategy-relative score, not absolute

2. **"Was my past trade actually a good decision?"**
   → Trade journal + retrospective scoring

3. **"What is happening in the market right now that is relevant to me?"**
   → Macro summary + AI-filtered news by portfolio/watchlist

---

## Discovery — What We Know vs. What We Need to Validate

| Assumption | Status | How to validate |
|---|---|---|
| Users want strategy-relative scoring | Hypothesis | Build it, measure engagement |
| Scorecard is differentiating | Likely true — nothing like it exists | User interviews |
| People will log their own trades | Uncertain | Observe if portfolio section is used |
| AI summaries add value | Likely yes | A/B test with/without |
| Broker API is needed for retention | Phase 4 — not MVP | Survey active users |

---

## Product Phases

### ✅ Phase 0 — Foundation (done)
- [x] Single-page app, no build step
- [x] Design/logic fully separated (`index.html` = CSS, `app.js` = logic)
- [x] Ticker search + basic scorecard
- [x] DCF model with stress test
- [x] Peer comparison matrix
- [x] Live ticker tape (Finnhub WebSocket)
- [x] News feed (Finnhub REST, cards with thumbnail + modal)
- [x] Portfolio (manual, localStorage)
- [x] Dark/light theme
- [x] Design variants (test2 / test3 / test4)

---

### 🔵 Phase 1 — MVP (next 4–6 weeks)
**Goal:** First version that delivers real, personal value.
**Success metric:** User opens it before making an investment decision.

**Features:**
- [ ] **Strategy Profile** — onboarding screen, 3 questions:
  - Investment horizon (short / medium / long)
  - Risk tolerance (conservative / moderate / aggressive)
  - Focus (value / growth / dividend / momentum)
- [ ] **Strategy-relative scoring** — same stock, different score per profile
  - Value investor: rewards low P/E, penalises high growth multiples
  - Growth investor: rewards revenue growth, tolerates high multiples
  - Dividend: rewards yield, payout ratio, streak
- [ ] **Scorecard weight editor** — manually adjust the 5 factor weights
  - Sliders: Financial Ratios / Management / Moat / ESG / Valuation
  - Reset to profile defaults
- [ ] **Score explanation** — "Why 4.2?"
  - Per factor: what is pulling the score up/down and why
  - Plain-English sentence per factor
- [ ] **Ensure full English** — all UI strings in English

---

### 🟡 Phase 2 — Intelligence (weeks 6–12)
**Goal:** AI makes the app feel like a smart analyst, not just a calculator.
**Success metric:** User shares a futara analysis with someone else.

**Features:**
- [ ] **AI integration** (Groq API — free tier, Llama 3 / Gemma 2)
  - Company summary: what the company actually does, in plain English
  - Macro summary: what is happening in markets relevant to this stock
  - Side facts: moat, competitive position, risks — 3 bullet points
  - Buy/sell recommendation explanation aligned with user's strategy
- [ ] **Stock recommendations** — "Based on your profile, consider:"
  - Filter universe by strategy criteria
  - Show top 5 matching stocks with mini-scorecard
- [ ] **Voting rights & ownership structure** (via API or static data)
  - Float, insider %, institutional %, free float
  - Voting share classes (e.g. Alphabet Class A/B/C)
- [ ] **Widget layout customisation** — drag to reorder, hide/show tiles
  - Saved per user in localStorage

---

### 🟠 Phase 3 — Trade Journal (weeks 12–20)
**Goal:** futara becomes the place where you track and learn from your decisions.
**Success metric:** User logs at least 3 trades.

**Features:**
- [ ] **Manual trade entry** — date, ticker, price, quantity, reason
- [ ] **Trade retrospective** — "You bought NVDA at $180. Score at the time: 3.9. Score today: 4.6."
- [ ] **Performance analysis** — P&L, vs. index, vs. own strategy
- [ ] **CSV import** — broker export (Trade Republic, Scalable, generic)
- [ ] **Macro summary page** — standalone section
  - Interest rates, inflation, VIX, sector rotation
  - AI-generated weekly summary

---

### 🔴 Phase 4 — Platform (months 5–12)
**Goal:** futara becomes a product, not just a personal tool.
**Success metric:** 100 active users, NPS > 40.

**Features:**
- [ ] **Auth** (Supabase Auth or Clerk) — email/Google login
- [ ] **Database** (Supabase PostgreSQL) — user data, trades, profiles
- [ ] **Broker API** — Trade Republic (unofficial WS), Scalable Capital (API beta)
- [ ] **Alerts** — price drops below SMA200, score changes, news triggers
- [ ] **Watchlist notifications**
- [ ] **Subscription model** — free tier + pro features

---

## Data Model (current — localStorage)

```
strategy_profile: {
  horizon: 'long',        // short / medium / long
  risk: 'moderate',       // conservative / moderate / aggressive
  focus: 'growth',        // value / growth / dividend / momentum
  scoreWeights: {
    ratios: 65,
    management: 12,
    moat: 10,
    esg: 8,
    valuation: 5
  }
}

portfolio: [
  { sym, name, shares, avgPrice, addedAt }
]

trades: [
  { sym, date, price, qty, side, reason, scoreAtTime }
]

watchlist: [sym, ...]

cache: { [sym]: { data, ts } }
```

**Phase 4 — database entities:**
`user` → `strategy_profile` → `portfolio` → `position` → `trade`
`watchlist` → `alert` → `notification`

---

## Tech Stack

| Layer | Current | Phase 4 |
|---|---|---|
| Frontend | HTML + CSS + vanilla JS | Stay (or migrate to Next.js if needed) |
| Logic | `src/js/app.js` | Same + modular files |
| Backend | Cloudflare Worker (proxy only) | + Supabase Edge Functions |
| Database | localStorage | Supabase PostgreSQL |
| Auth | none | Supabase Auth / Clerk |
| AI | none | Groq API (Llama 3.1 / Gemma 2) |
| Live data | Finnhub WebSocket + REST | Same |
| Fundamentals | Yahoo via Worker + FMP | Same + possibly Alpha Vantage |
| Hosting | GitHub Pages | Same (or Vercel for Next.js) |

---

## Scorecard Rules (Phase 1 target)

```
Default weights (total = 100):
  Financial Ratios    65  ← P/E, margins, growth, EV/EBITDA
  Management          12  ← insider activity, compensation
  Moat / Competitive  10  ← market position, pricing power
  ESG & Risk           8  ← beta, volatility, governance
  DCF / Valuation      5  ← margin of safety

Profile adjustments (applied automatically):
  value:    ratios +10, valuation +10, management -5, esg -5
  growth:   ratios +5, moat +10, valuation -10, management -5
  dividend: ratios +5, esg +10, valuation +5, management -5, moat -5
  momentum: ratios -10, moat +15, esg -5, management 0

Score bands:
  ≥ 4.5  → Strong Buy
  ≥ 3.5  → Buy
  ≥ 2.5  → Hold
  ≥ 1.5  → Reduce
  < 1.5  → Avoid
```

---

## Open Questions — ANSWERED

| # | Question | Decision |
|---|---|---|
| 1 | AI provider | **Groq** — free tier, open-source models (Llama 3.1 8B / Gemma 2 9B). No cost. |
| 2 | Score explanation | **Hybrid** — rule-based templates for financial logic (e.g. "P/E 16x is 24% below sector avg") + AI for plain-English synthesis. If API fails, rules-only fallback. |
| 3 | Broker CSV first | **Trade Republic** — largest retail broker in DACH, highest user overlap with target persona. Generic CSV as fallback. |
| 4 | Design direction | **Purpose-driven, not fixed.** futara is positioned as a smart, trustworthy but approachable tool — not a bank, not a startup meme. Think: serious fintech meets editorial clarity. Design should feel like a premium research tool a solo investor would actually trust. Final design to be decided after Phase 1 logic is solid. |
| 5 | Language | **English first.** German + Spanish in Phase 4. i18n structure to be set up in Phase 2 so translation is easy later. |

---

## Score Explanation — Hybrid Architecture

```
Layer 1 — Financial Rules (always runs, no API needed):
  "P/E 16.2x is 24% below sector average (21.1x) → positive signal"
  "Gross margin 74.1% is in top 5% of sector → elite"
  "Revenue growth +85% YoY → hyper growth, above benchmark"
  "DCF fair value $245 vs price $205 → 19% margin of safety"

Layer 2 — AI Synthesis (Groq, runs on demand):
  Takes all rule outputs as context
  Generates 2–3 sentence plain-English summary
  Aligns explanation with user's strategy profile
  Example: "For a growth investor, NVDA scores exceptionally well.
  The revenue growth of 85% and elite margins outweigh the
  slightly elevated EV/EBITDA. Main risk: valuation sensitivity
  to rate changes."

Fallback: if Groq API unavailable → show Layer 1 only
Cost: Groq free tier = 14,400 requests/day on Llama 3.1 8B → sufficient
```

---

## i18n Structure (Phase 2 prep)

All UI strings will be moved to a `strings` object in `app.js`:

```js
const STRINGS = {
  en: {
    'nav.markets': 'Markets',
    'nav.analytics': 'Analytics',
    'score.strongBuy': 'Strong Buy',
    // ...
  },
  de: { /* Phase 4 */ },
  es: { /* Phase 4 */ }
}
```

No external library needed. Simple `t('key')` function.
Set up the structure in Phase 2 so translation in Phase 4 is a 1-day job.

---

## Next Actions — Sprint Plan

**Sprint 1 — Strategy Core** *(implement in `app.js`)*
- [ ] Strategy Profile onboarding — 3 questions, saved to localStorage
- [ ] Strategy-relative score calculation — weights shift per profile
- [ ] Scorecard weight editor in Profile — sliders + manual override
- [ ] Score explanation Layer 1 — financial rules, no AI, always works

**Sprint 2 — Intelligence**
- [ ] Groq API — company summary + strategy-aligned explanation (Layer 2)
- [ ] Stock recommendations based on strategy profile
- [ ] Voting rights + ownership structure widget in Analytics
- [ ] Widget drag & reorder — complete existing partial implementation

**Sprint 3 — Data & Language**
- [ ] All UI strings in English (audit + fix)
- [ ] Trade Journal — manual entry
- [ ] Trade Republic CSV import
- [ ] Macro summary section

**Sprint 4 — Design & i18n Prep**
- [ ] Final design direction decided
- [ ] i18n string structure set up in `app.js` (prep for DE/ES later)
