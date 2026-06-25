# ADR-004 — Scoring methodology: absolute thresholds with published sources

| Field | Value |
|-------|-------|
| **Date** | 2026-06-22 |
| **Status** | Accepted |
| **Decided by** | Daniel |

---

## Context

The pondex scorecard needed to move from hardcoded NVDA values to computing real factor scores per ticker. Two approaches were available: (1) absolute thresholds — fixed values like "gross margin >50% = excellent", (2) sector-relative z-scoring — rank the stock against its sector peers.

---

## Decision

Use **absolute thresholds with published academic sources**, not sector-relative z-scoring.

---

## Options Considered

| Option | Pros | Cons |
|--------|------|------|
| Absolute thresholds (chosen) | Works with any ticker immediately, no peer data needed. Thresholds are traceable to named sources. User can understand and challenge each threshold. | Some metrics are sector-dependent — a P/E of 25× is cheap in software but expensive in utilities. |
| Sector-relative z-scoring | Accounts for sector differences. How Bloomberg/FactSet work. | Requires peer group data for every sector. FMP free tier does not provide peer lists or sector distributions. Would require additional API calls or a static database. Introduces a black-box element (the score depends on the peer group composition). |

---

## Reasoning

Sector-relative scoring is the professionally correct approach but is not feasible on the FMP free tier without storing a full sector peer database. The absolute threshold approach is used by widely-read practitioners (Graham's P/E ≤15 criterion, Buffett's gross margin >40% moat signal) and is explicitly documented in the `SCORING_METHODOLOGY` constant in the code. Every threshold has a `[TAG]` reference to its source.

The key design principle: **transparent over sophisticated**. A score the user can verify ("gross margin is 74%, threshold for excellent is 50%, therefore this scores near maximum") is more valuable than a black-box percentile rank the user cannot challenge.

---

## Consequences

**Positive:**
- Zero additional API calls or static data needed for scoring
- Every threshold is auditable — `SCORING_METHODOLOGY` in source code
- The "Why this score?" panel shows exact metric values with source citations
- Works for any ticker FMP covers, including international stocks

**Negative / Trade-offs:**
- A utility company with P/E 18× scores poorly on valuation even though 18× is normal for that sector. Mitigated by showing the raw metric alongside the score so the user can apply their own judgment.
- Beta as the sole ESG proxy is a weak proxy for true ESG risk. Mitigated by noting explicitly in the UI that ESG controversy data requires premium FMP tier.

**When to revisit:**
Phase 4 — if a sector peer database is added (e.g. Damodaran annual CSV files hardcoded by sector), switch valuation and margin scoring to sector-relative. This would require updating `computeRawScores` to accept a `sectorAvg` parameter and adjusting `scoreMetric` calls accordingly.

---

## Sources used

| Tag | Source |
|-----|--------|
| [DAM] | Damodaran, A. — NYU Stern annual data files. pages.stern.nyu.edu/~adamodar |
| [GRA] | Graham, B. — "The Intelligent Investor" (1949, rev. 2003), Ch. 14–15 |
| [CFA] | CFA Institute — "Equity Asset Valuation" (4th ed., 2020) |
| [MOR] | Morningstar — "Morningstar's Approach to Moat Ratings" (2017) |
| [BUF] | Buffett, W. / Munger, C. — Berkshire Hathaway annual letters (1977–2023) |
| [SEY] | Seyhun, H.N. — "Insiders' Profits, Costs of Trading, and Market Efficiency" (1986), Journal of Financial Economics |
| [PIO] | Piotroski, J. — "Value Investing: The Use of Historical Financial Statement Information to Separate Winners from Losers" (2000), Journal of Accounting Research |

---

*Related: ADR-002 (FMP as data source)*
