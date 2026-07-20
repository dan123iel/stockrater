# pondex — Exit Strategy Feature Spec

_Last updated: 2026-07-16 · Derived from GL-Churner interview (Gunnar Leu), JBS-Fin interview (José Bernardo), Research Council Report Phase 8/13_

---

## Why This Feature Exists

**Primary evidence:** Gunnar Leu's interview explicitly surfaces "when to sell" as an unmet need:
> "I never know when to sell. The tool tells me if something is a good buy — but once I'm in, I'm flying blind."

**Survey signal (Wave 1, Wave 2):** "Decision paralysis" is the #2 pain after signal/noise. Exit decisions are harder than entry decisions for retail investors because:
1. Loss aversion bias — holding losers too long
2. No systematic framework — gut-based decisions
3. No tool tracks the original thesis to check if it still holds

**Strategic fit:** Exit strategy is the natural Phase 2 extension of the thesis tracker. A user who documented WHY they bought now gets told WHEN that rationale has broken down.

---

## What "Exit Strategy" Means in pondex

pondex does NOT give a "sell now" recommendation (regulatory constraint — see `docs/regulatory/REGULATORY.md`).

Instead, pondex provides:
1. **Thesis Drift Alert** — "Your original buy thesis was: 'P/E below 20, FCF yield >4%'. Current state: P/E is now 34, FCF yield is 2.1%. 2 of 3 thesis conditions have broken."
2. **Score Decay Signal** — Score dropped from 74 → 41 since purchase. pondex explains what changed and why.
3. **Risk Escalation Flag** — Beta has increased from 1.1 → 1.8 since your last review. Risk profile has shifted beyond your stated tolerance (medium).
4. **Hold/Review prompt** — Never "Sell." Always "Review." User decides — pondex surfaces the evidence.

---

## Feature Components

### Component 1 — Thesis Tracker (prerequisite, Phase 2)
When a user adds a stock to their portfolio, pondex prompts:
> "What is your thesis for holding this position?"
3 inputs:
- Target score threshold (e.g. "I'll review if score drops below 55")
- Key metrics to watch (user selects 2–3 from: P/E, FCF yield, gross margin, beta, revenue growth)
- Investment horizon (3 months / 1 year / 3+ years)

This data is stored in `portfolio_holdings.thesis_json` (jsonb column — add to schema in Phase 3 migration).

### Component 2 — Score Decay Monitor
Runs weekly (cron via Supabase Edge Function `monitor-portfolio`):
- For each `portfolio_holdings` row, fetches current verdict score
- Compares to score at time of purchase (`verdicts` table)
- If score dropped >15 points: triggers "Score Decay Alert" notification

### Component 3 — Thesis Condition Checker
For each metric the user is watching:
- Retrieves current value from `market_data_cache`
- Compares to value at time of thesis creation (stored in `portfolio_holdings.thesis_json`)
- Flags broken conditions (>20% deviation from original value)

### Component 4 — Exit Review Screen (`/app/portfolio/:ticker/review`)
Triggered when: score drops >15 points OR 2+ thesis conditions broken OR user manually opens it.

Layout:
```
[Ticker header — name, current price, change since purchase]

YOUR THESIS (set on [date])
─────────────────────────────
Condition 1: P/E below 20        → Current: 34.2  ❌ Broken
Condition 2: FCF yield above 4%  → Current: 2.1%  ❌ Broken
Condition 3: Revenue growth >10% → Current: 14.2% ✅ Holds

SCORE AT PURCHASE: 74/100   CURRENT SCORE: 41/100
Score has dropped 33 points since [purchase date].

PRIMARY DRIVER OF DECLINE
──────────────────────────
Valuation factor: 4.1 → 1.8
"P/E has expanded from 18.4 to 34.2 — stock has repriced significantly
since your purchase. Sector median P/E remains 22x."
Source: Yahoo Finance TTM · Retrieved: 2026-07-16

[⚠ This is not a sell recommendation. Review your thesis and make
your own decision. pondex provides information, not advice.]
```

### Component 5 — Strategy-Based Exit Thresholds (auto-configured)
When user sets strategy profile, pondex pre-fills sensible monitoring thresholds:

| Strategy | Score drop alert | Key metric trigger |
|---|---|---|
| Value | >20 points | P/E expands >50% from purchase |
| Growth | >25 points | Revenue growth drops below 10% YoY |
| Dividend | >15 points | Dividend yield drops >30% |
| Momentum | >30 points | Beta drops below 1.0 (momentum fading) |

User can override all thresholds in `/app/settings`.

---

## Roadmap Placement

| Phase | What ships |
|---|---|
| Phase 2 | Thesis Tracker (Component 1) — input at portfolio add |
| Phase 2 | Score Decay Monitor (Component 2) — weekly email digest |
| Phase 3 | Thesis Condition Checker (Component 3) + Exit Review Screen (Component 4) |
| Phase 3 | Strategy-Based Auto-Thresholds (Component 5) |

---

## Regulatory Framing (Critical)

All exit-related UI must use this language pattern:

| ✅ Allowed | ❌ Not allowed |
|---|---|
| "Your thesis conditions have changed" | "You should sell" |
| "Score has dropped 33 points — review recommended" | "This is no longer a good investment" |
| "2 of 3 conditions you set are no longer met" | "Exit position" |
| "Risk profile has shifted beyond your stated tolerance" | "This stock is now risky for you" |

The feature is positioned as a **thesis accountability tool**, not a sell signal generator.

---

## Long-Term Vision (Phase 4+)

After 12+ months of thesis data per user:
- **Decision Quality Feedback Loop:** "In 8 of your 11 exits where thesis-P/E condition broke, the stock declined further within 90 days. Your thesis discipline has protected you."
- **Personal Pattern Recognition:** "You tend to hold too long after a score drop below 50. Your average loss when this happens: -18%."

This is the durable switching-cost moat described in `docs/product/strategy.md` — the personalised model no competitor can replicate without years of user-specific data.
