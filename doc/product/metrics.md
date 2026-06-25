# Metrics

---

## North Star Metric

**% of analyses that result in a documented investment thesis**

Why this metric: It directly measures whether pondex achieves its core mission — turning data consumption into structured decision-making. A user who writes a thesis has crossed from passive browsing to active decision support.

> *Hypothesis: If this metric is above 20%, pondex is genuinely changing behavior, not just displaying data.*

---

## Input Metrics (leading indicators we can influence)

| Metric | What it measures | Target (MVP) |
|---|---|---|
| Time-to-first-insight | Minutes from ticker entry to score comprehension | < 2 min |
| Score explanation click-rate | % of users who expand "why this score" | > 40% |
| Session depth | Avg number of tiles opened per session | > 2 |
| Return visit rate (7-day) | % of users who return within 7 days | > 35% |
| Thesis Tracker adoption | % of portfolio users who use Thesis Tracker | > 20% (V1) |

---

## Guardrail Metrics (must not degrade)

| Metric | Threshold | Risk if breached |
|---|---|---|
| API error rate | < 2% of requests | Users see broken tiles, lose trust |
| Data freshness | Fundamentals < 24h stale | Score based on outdated data |
| Score accuracy (backtesting) | TBD — needs methodology | Core product claim undermined |
| Time to interactive | < 3s on average connection | Drop-off before first value moment |

---

## Phase Exit Criteria

### MVP is done when:
- 500 monthly active users
- 40% 7-day retention
- API error rate < 2%
- JSON backup/restore shipped
- Yahoo Finance fallback implemented

### V1 is done when:
- 2,000 MAU
- 25% 30-day retention
- 30% of users have entered a portfolio position
- 20% of portfolio users have created at least one thesis

### V2 is done when:
- 5,000 MAU
- 35% 30-day retention
- 50% of thesis-creating users have received at least one thesis alert
- NPS > 50

---

## What We Do Not Measure

- **Page views** — vanity metric, doesn't indicate value
- **Time on site** — ambiguous; long sessions can mean confusion
- **Total analyses run** — a user running 50 analyses without documenting a thesis hasn't changed behavior
- **Social shares** — useful for growth but not a product health signal
