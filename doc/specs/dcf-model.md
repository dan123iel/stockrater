# Feature Spec — DCF Model & Reverse DCF

## What It Does

Two related valuation features:

1. **DCF Stresstest** — calculates fair value under three scenarios (Bear / Base / Bull) based on user-adjustable assumptions
2. **Reverse DCF** — given the current market price, calculates what growth rate the market is implying

---

## DCF Stresstest

### Inputs

| Input | Default | Range | Source |
|---|---|---|---|
| Revenue growth rate (yr 1–5) | TTM revenue growth | -20% to +50% | User-adjustable |
| Terminal growth rate | 3% | 0% to 5% | User-adjustable |
| Operating margin | TTM operating margin | -10% to +60% | User-adjustable |
| WACC | 8–10% (estimated by beta) | 5% to 20% | User-adjustable |
| Tax rate | 21% (US) / 25% (EU) | 0% to 40% | Estimated |

### Scenarios

| Scenario | Growth Assumption | Margin Assumption |
|---|---|---|
| Bear | Base × 0.5 | Base × 0.85 |
| Base | TTM values | TTM values |
| Bull | Base × 1.5 | Base × 1.1 |

### Output

- Fair value per share (Bear / Base / Bull)
- Margin of safety at current price (positive = undervalued)
- "Implied return at current price" for each scenario

---

## Reverse DCF

### What It Answers

> "For the current stock price to be justified, what growth rate must the company sustain over the next 10 years?"

This is psychologically more actionable than a fair value estimate because it forces the user to make a belief judgment: "Do I actually think this is achievable?"

### Calculation

Solves for the revenue growth rate `g` such that DCF(Base Case with g) = current market price.

### Output

> "At $485, NVDA is pricing in ~28% annual revenue growth for the next 10 years. The 5-year analyst consensus is 22%. Do you believe the market's implied growth rate is achievable?"

---

## Acceptance Criteria

- [ ] Three scenario outputs visible side by side
- [ ] Sliders for growth rate, margin, WACC — live recalculation on change
- [ ] Reverse DCF prominently shown alongside fair value
- [ ] Current price vs. Base Case fair value: margin of safety displayed as %
- [ ] Assumptions visible and source-labeled ("TTM operating margin: 24.3%")
- [ ] Disclaimer: "DCF models are sensitive to assumptions. Small changes in growth rate produce large fair value changes."

---

## Known Limitations

- WACC estimation is approximate (beta-based, no full CAPM implementation)
- Model uses simplified single-stage growth (not two-stage) for performance reasons
- Non-USD stocks: requires FX conversion (see risks.md — not yet implemented)
- No terminal value multiple method (only perpetuity growth model)

---

## Open Questions

- [ ] Should we show sensitivity tables (how fair value changes with ±1% growth)?
- [ ] Is single-stage DCF accurate enough or does two-stage matter for the target user?
