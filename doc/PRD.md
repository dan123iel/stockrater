# pondex_ — Product Requirements Document

_Derived from Survey Wave 1 (n=45, 29–30 June 2026)_

---

## User Segments

### Segment A — Active Investors (n=9, 20%)
Have a research process. It's noisy. Priced out of Bloomberg.
- Tools: broker app + AI + social media
- #1 frustration: Cost (33%), then Signal/Noise
- Time: < 1 hour/week
- Pitch: "Bloomberg-quality signal at a fraction of the cost"

### Segment B — Passive Investors (n=17, 38%)
Set up an ETF once and never looked back. Behaviourally disengaged.
- Tools: broker app only
- #1 frustration: Signal/Noise, Complexity
- Time: < 1 hour/week
- Behave like non-investors — frustrations identical to Aspirers
- Pitch: "Tells you what matters in 60 seconds"

### Segment C — Aspirers / Want to Start (n=16, 36%)
Motivated but blocked by complexity, fear, or capital.
- #1 barrier: "Too complicated" (63%), Fear of losing money (38%)
- Unlock features: Plain language (50%), Health score (38%), Micro-investing $5 (38%)
- Key UX rule: Show explanation FIRST, score as conclusion — score as first screen actively repels this segment

---

## Core Product Requirements

All requirements derived from data — not assumptions.

### REQ-1: Noise-filtered signal (not data aggregation)
**Source:** Q4A cross-tab — signal/noise is #1 pain at every tool-count level, including single-tool users
**What it means:** Don't consolidate 5 noisy sources into one noisy dashboard. Surface the verdict, hide the noise.
**Acceptance criteria:** User sees a clear plain-language verdict before any raw numbers

### REQ-2: Every AI output cites a named primary source
**Source:** Q6 — 58% gave this answer word-for-word: "only if the AI displays the exact primary source and formula used"
**What it means:** Non-negotiable UX requirement. Every metric shows its source inline (not in a tooltip, not optional).
**Acceptance criteria:** P/E ratio shows "Yahoo Finance – trailing twelve months" beneath it. AI chat response includes sources[]. No number appears without attribution.

### REQ-3: 60-second use case by default, depth on demand
**Source:** Q2A — 80% of investors spend < 1 hour/week on research
**What it means:** The product must serve the 60-second user first. Drill-down is opt-in.
**Acceptance criteria:** Default view gives verdict + source in ≤ 3 clicks from search. Advanced metrics accessible but not required.

### REQ-4: Plain-language explanations (multilingual)
**Source:** Q3B (50% of aspirers), Q9 verbatims in Spanish, 57% of respondents European
**What it means:** No jargon in the primary explanation. Translations: EN + DE + ES for Phase 2.
**Acceptance criteria:** Each factor explanation uses no unexplained financial acronyms. Non-finance-professional can read it without a dictionary.

### REQ-5: Simple health score with drill-down
**Source:** Q3B — 38% of aspirers want a health score
**Constraint:** Score must appear as conclusion, not as entry point. Aspirers blocked by complexity need to understand what the score means before trusting it.
**Acceptance criteria:** Score is the last element rendered in ScoreHero, not the first.

### REQ-6: Pitch framing — "audit trail" not "AI-powered"
**Source:** Wave 2 response pattern — cold audience 44% AI skeptical vs 21% warm audience
**What it means:** AI is the mechanism, not the message. Don't headline with AI.
**Acceptance criteria:** Landing page and marketing copy leads with "research with a clear audit trail"

---

## Features Not to Build (yet)

| Feature | Why not |
|---|---|
| Micro-investing / fractional shares | Needs broker API or partnership — Phase 3 |
| Real-time streaming | No survey signal, adds infrastructure cost |
| Buy/sell recommendations | Regulatory risk without licence |
| Risk-matched personalised recommendations | Appeared unprompted in Q9 — validate before building |

---

## Analytics Tabs — Priority Order

Derived from survey frustrations, not feature requests:

| Tab | Priority | Survey basis |
|---|---|---|
| Scorecard (plain-language + score) | P0 | REQ-1, REQ-2, REQ-5 |
| AI Insights (with source attribution) | P0 | REQ-2 |
| Price Chart | P1 | Used by 54% (TradingView users) |
| Valuation | P1 | P/E is core to value investor ICP |
| News | P1 | Signal/noise — curated, not raw |
| Insider Trades | P2 | SEC EDGAR — ICP (Gunnar Leu) explicitly needs it |
| DCF / Stresstest | P2 | Power user feature |
| Company Profile | P2 | Context for plain-language segment |
| Ownership | P3 | Useful, not urgent |
| Financials | P3 | Coming soon |
| Dividends | P3 | Coming soon |
| Analysts | P3 | Coming soon |

---

## Acceptance Criteria — Phase 1 Done

- [ ] Search any ticker → result in < 3s
- [ ] Every factor shows plain-language explanation before score
- [ ] Every metric shows named source
- [ ] AI chat returns sources[] alongside answer
- [ ] 12 tabs visible in analytics — 9 functional, 3 "coming soon"
- [ ] All 7 nav routes accessible
- [ ] Backend runs on Railway (not just localhost)
- [ ] No FMP API key required anywhere in the codebase
