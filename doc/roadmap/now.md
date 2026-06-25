# Now — MVP

**Goal:** Prove the core idea. A user enters a ticker, understands whether it fits their strategy, and comes back.

**Exit criteria:**
- 500 monthly active users
- 40% 7-day retention
- API error rate < 2%
- JSON backup/restore shipped
- Yahoo Finance fallback implemented

---

## In Scope

- [ ] Strategy-relative score (0–5, 5 categories, profile-weighted)
- [ ] Score explanation per component — traceable, with sources
- [ ] Confidence Score (0–100%) — how many data points back this score
- [ ] Reverse DCF — "what growth rate does the current price imply?"
- [ ] AI interpretation in plain language — why does this stock fit or not fit the profile
- [ ] Data Coverage Indicator — what's available for this stock (Insider: N/A, EPS: partial, etc.)
- [ ] Watchlist
- [ ] JSON Export / Import (localStorage backup)
- [ ] Yahoo Finance fallback — tiles fail gracefully, not catastrophically
- [ ] Visible disclaimer — algorithmic signals, not financial advice

## Explicitly Out of Scope

- AI Chat
- Proactive stock suggestions
- Thesis Tracker
- Portfolio
- Broker sync
- Mobile optimization
- Multi-language

---

## Open Questions

- [ ] What's the minimum profile setup that makes the score meaningfully different? (1 question vs 3?)
- [ ] How do we handle stocks with < 3 data points? Show score with low confidence or no score?
- [ ] What's the right Confidence Score methodology?
