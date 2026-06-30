# ADR-005: Yahoo Finance as sole data source (no paid APIs)

**Date:** June 2026
**Status:** Accepted
**Supersedes:** ADR-002 (FMP as data source)

## Decision

Use Yahoo Finance via `yfinance` Python library as the sole data source for market data, fundamentals, and ratios. SEC EDGAR for insider trades (Form 4). No paid APIs.

## Context

ADR-002 chose Financial Modeling Prep (FMP) as the primary data source. FMP requires a paid API key ($14/mo minimum), creates a hard dependency on a third party, and conflicts with the constraint of keeping the product free to run during the pre-revenue phase.

Survey Wave 1 confirmed the target user is priced out of expensive tools — the product itself cannot require a paid data subscription to operate.

## Consequences

- `yfinance` covers all required data: price, fundamentals, ratios, financials, insider activity, news
- No API key required for users or for running the backend
- Rate-limit risk at scale — mitigated by 5-minute backend cache
- Data quality is Yahoo-grade (good for MVP, not Bloomberg-grade)
- Free: consistent with the product's "no paid APIs" constraint
