# pondex — Glossary

> Single source of truth for terminology used across product, code, and docs.
> When in doubt, use these definitions — do not invent synonyms.

---

## Product Terms

**Score**
The overall quality rating of a stock, expressed as a number (1–10) or letter grade. Derived from weighted factors across valuation, quality, and growth dimensions. Always shown after the explanation, never before (→ ADR-007).

**Factor**
A single measurable dimension contributing to the Score (e.g., P/E ratio, debt-to-equity, revenue growth). Every factor cites its named source.

**Verdict**
A plain-language summary of the Score: *"This stock is fairly valued because…"*. The Verdict is the primary output of the Scorecard tab.

**Source Attribution**
The named data source displayed alongside every metric (e.g., *"P/E 18.4 · Source: Yahoo Finance TTM"*). Non-negotiable — no metric is shown without attribution.

**Scorecard**
The main analysis view: Score + Verdict + factor breakdown + source attribution for every metric.

**Signal**
Relevant, actionable information that helps an investor make a decision. The opposite of Noise.

**Noise**
Irrelevant, misleading, or unverifiable information. pondex exists to filter noise from signal.

**Fair Value**
An estimate of what a stock is intrinsically worth, derived from DCF or comparable valuation. Not a price target. Always shown with methodology and source.

**Margin of Safety**
The gap between Fair Value and current market price. A positive margin = stock trades below fair value.

**Quality**
A composite score of financial health indicators: profitability, balance sheet strength, earnings consistency. Not the same as "good company" — a qualitative judgment.

**Watchlist**
A user-curated list of stocks to monitor. Phase 2 feature (not in MVP).

**Portfolio**
A collection of stocks a user holds or tracks. Phase 2 feature (not in MVP).

---

## User Research Terms

**ICP (Ideal Customer Profile)**
The specific type of user pondex is built for in Phase 1: self-directed value investor, EU/DACH region, previously paid for research tools, churned because noise wasn't solved. Named archetype: Gunnar Leu.

**WTP (Willingness to Pay)**
Whether a user would pay for pondex, and at what price point. Measured via Van Westendorp test (planned post-Interview #1).

**Signal/Noise Pain**
The core problem: existing tools produce too much noise relative to actionable signal. Validated as #1 pain in Wave 1 (n=56).

**Churn**
A user who previously paid for a competing tool and cancelled. High-value interview target: they've already proved WTP and have strong opinions about what failed.

**Wave**
A survey cohort. Wave 1 = warm network (n=56, June 2026). Wave 2 = cold audience (Reddit), planned after Interview #1.

---

## Technical Terms

**Backend**
FastAPI application running on Railway. Handles data fetching (Yahoo Finance, SEC EDGAR), AI inference (Groq), and scoring logic.

**Frontend**
React + Vite application deployed on GitHub Pages. Calls the backend exclusively — never third-party APIs directly.

**API Client**
`frontend/src/lib/fmp.js` — the single file responsible for all frontend → backend communication. Misnamed (historical: was FMP), but kept for consistency.

**Tab**
A content section within the Analysis view (e.g., Scorecard, Chart, Valuation, DCF, AI Chat). Each tab is a separate React component loaded lazily.

**Tile**
A reusable UI component displaying a single data point or metric within a tab (e.g., `ValuationTile.jsx`, `InsiderTile.jsx`).

**ADR (Architecture Decision Record)**
A document capturing a significant architectural choice, its context, and rationale. Stored in `docs/architecture/adr/`.

---

_Update this glossary whenever a new term is introduced in the codebase, docs, or user research. Consistent terminology prevents ambiguity across Claude sessions._
