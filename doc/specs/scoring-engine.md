# Feature Spec — Scoring Engine

## What It Does

Produces a single score (0.0–5.0) representing how well a stock fits the user's investment strategy. The score is not an absolute quality rating — it is a strategy-relative fit signal.

---

## Score Components

| Category | Default Weight | Description |
|---|---|---|
| Financial Ratios | 65% | P/E, gross margin, operating margin, revenue growth, FCF yield |
| Management Quality | 12% | Insider net buy ratio (last 20 transactions) |
| Moat / Competitive | 10% | Gross margin level + trend |
| ESG & Risk | 8% | Beta (renamed to "Risk" — ESG label is misleading, see ADR pending) |
| Valuation | 5% | P/E + EV/EBITDA as standalone valuation check |

**Total: 100%**

---

## Profile Weight Adjustments

Weights shift based on the user's strategy profile:

| Focus | Ratios | Valuation | Management | ESG/Risk | Moat |
|---|---|---|---|---|---|
| Value | +10 | +10 | -5 | -5 | 0 |
| Growth | +5 | -10 | -5 | 0 | +10 |
| Dividend | +5 | +5 | -5 | +10 | -5 |
| Momentum | -10 | 0 | 0 | -5 | +15 |

Weights are normalized to 100% after adjustment.

---

## Scoring Thresholds (Financial Ratios)

Each metric is scored 0–5 against published academic benchmarks:

| Metric | 5 (Excellent) | 3 (Average) | 1 (Weak) | Source |
|---|---|---|---|---|
| Gross Margin | > 50% | 25–50% | < 15% | Damodaran NYU |
| Operating Margin | > 25% | 8–25% | < 2% | Damodaran NYU |
| Revenue Growth YoY | > 20% | 5–20% | < 0% | CFA Institute |
| P/E Ratio (lower = better) | < 15x | 15–30x | > 50x | Graham (default) |
| FCF Yield | > 5% | 2–5% | < 0% | CFA Institute |

**Growth profile adjustments:** P/E excellent threshold shifts to 40x. Revenue growth excellent threshold shifts to 30%.

---

## Confidence Score

Alongside every score, a Confidence Score (0–100%) is calculated based on:

| Factor | Points |
|---|---|
| 5+ years of revenue history available | +20 |
| Insider transaction data available (EDGAR) | +20 |
| EPS history available | +15 |
| Beta data available | +10 |
| Analyst coverage available | +15 |
| No estimated/TTM-only data | +20 |

**Interpretation:**
- 80–100%: High confidence — full data set
- 50–79%: Moderate — some data points estimated or missing
- < 50%: Low — score based on limited data, treat with caution

---

## Score Labels

| Score | Old Label | New Label (V1) |
|---|---|---|
| ≥ 4.0 | Strong Buy | Excellent Fit |
| ≥ 3.3 | Buy | Good Fit |
| ≥ 2.5 | Hold | Neutral Fit |
| < 2.5 | Avoid | Poor Fit |

**Rationale for rename:** "Strong Buy" implies financial advice. "Excellent Fit" communicates strategy alignment — which is what the score actually measures.

---

## Data Sources

- Financial ratios: Yahoo Finance summary endpoint (via Worker)
- Insider data: SEC EDGAR Form 4 (US stocks only)
- Beta: Yahoo Finance
- EPS history: SEC EDGAR XBRL (US stocks only)

---

## Known Limitations

- Insider data unavailable for non-US stocks → Management Quality category scores at neutral (2.5) by default
- EPS history unavailable for non-US stocks → noted in Data Coverage Indicator
- TTM data may not reflect most recent quarter if earnings were recent
- Score does not account for qualitative moat factors (brand, network effects, switching costs)
