# Feature Spec — Thesis Tracker

## Problem This Solves

Retail investors make purchase decisions but rarely document why. Six months later, they can't remember their original thesis — so they hold a losing position out of inertia rather than conviction, or sell a winner too early because the emotional context is gone. No tool currently closes this loop at zero cost.

---

## User Story

As a self-directed investor, I want to define why I'm buying a stock before I buy it, so that pondex can tell me months later whether my reasoning still holds.

---

## Acceptance Criteria

- [ ] At time of purchase (or when logging a position), user can define up to 3 quantitative thesis conditions
  - Example: "Revenue growth stays above 15%", "Gross margin stays above 60%", "CEO remains in role"
- [ ] Conditions are stored in localStorage alongside the portfolio position
- [ ] Each quarter (triggered when user opens the position, or manually), pondex checks available data against the conditions
- [ ] If a condition is met: ✓ green indicator
- [ ] If a condition is at risk (within 10% of threshold): ⚠ amber indicator
- [ ] If a condition is broken: ✗ red indicator + explanation in plain language
- [ ] When all 3 conditions are broken: banner "Thesis broken — review this position"
- [ ] User can update conditions at any time (with timestamp of change)
- [ ] Thesis history is preserved — user can see original conditions and how they evolved

---

## Out of Scope (this version)

- Push notifications for thesis events
- Automatic quarterly trigger without user opening the app
- Thesis conditions for non-quantitative factors (e.g. "CEO stays in role" requires manual check)
- Multi-user thesis sharing

---

## Open Questions

- [ ] How do we handle thesis checks for non-US stocks where quarterly data is less structured?
- [ ] What's the right number of conditions — fixed at 3, or 1–5 user-defined?
- [ ] How do we source the quarterly data trigger? Yahoo Finance earnings calendar?

---

## Dependencies

- Trade Journal (buy event must be loggable)
- Yahoo Finance quarterly fundamentals endpoint
- V1 Portfolio feature (position must exist before thesis can be attached)

---

## Technical Notes

- Stored in localStorage under key `pondextheses` as array of objects
- Each thesis object: `{ ticker, conditions: [{label, operator, value, metric}], createdAt, history: [] }`
- Condition evaluation runs client-side against latest Yahoo summary data
- No server needed — all logic in browser
