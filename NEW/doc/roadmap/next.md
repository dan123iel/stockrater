# Next — V1

**Prerequisite:** MVP exit criteria met.

**Goal:** pondex knows the user and accompanies decisions — not just individual analyses.

**Exit criteria:**
- 2,000 MAU
- 25% 30-day retention
- 30% of users have entered at least one portfolio position
- 20% of portfolio users have created at least one thesis

---

## In Scope

- [ ] Strategy profile (Value / Growth / Dividend / Momentum + horizon + risk tolerance)
- [ ] Portfolio (manual entry + CSV import)
- [ ] Thesis Tracker — define conditions at purchase, auto-monitored each quarter
- [ ] Investment Memo — generated after analysis (thesis, risks, exit criteria, fair value)
- [ ] Peer comparison (2–5 stocks side by side)
- [ ] Watchlist alerts — fair value deviation, insider buy, earnings event
- [ ] Score label rename: Excellent Fit / Good Fit / Neutral Fit / Poor Fit
- [ ] Bear thesis — auto-generated alongside bull case
- [ ] "Why this stock?" layer — 3–5 reasons in plain language, profile-specific
- [ ] FX conversion in Worker — EUR/USD normalization for portfolio metrics
- [ ] Data source transparency — last updated timestamp visible per tile
- [ ] Vite build system — single-file output maintained, codebase becomes maintainable

## Dependencies

- Thesis Tracker requires: Trade Journal (logging buy events)
- Investment Memo requires: Score + DCF + AI explanation all available
- Portfolio metrics require: FX conversion (see Risks)
- Vite migration must happen before Thesis Tracker (complexity threshold reached)

---

## Open Questions

- [ ] How does Thesis Tracker handle earnings data for non-US stocks (no EDGAR)?
- [ ] What's the right number of thesis conditions — 3 fixed, or freeform?
- [ ] CSV import format — broker-specific or standardized?
