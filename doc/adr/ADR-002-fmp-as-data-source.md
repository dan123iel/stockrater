# ADR-002 — Financial Modeling Prep as primary data source

| Field | Value |
|-------|-------|
| **Date** | 2026-05 (estimated) |
| **Status** | Accepted — v3 TTM endpoints partially deprecated, migrated to /stable/ |
| **Decided by** | Daniel |

---

## Context

pondex needs fundamental financial data: P/E ratios, margins, revenue growth, insider trades, institutional ownership, analyst ratings, dividends. This data must be accessible directly from the browser (no backend) and the cost must be within a €15/month budget.

---

## Decision

Financial Modeling Prep (FMP) is the primary data source. Free tier: 250 requests/day. Paid tier: $14/month for 300 req/minute.

---

## Options Considered

| Option | Pros | Cons |
|--------|------|------|
| FMP (financialmodelingprep.com) | Comprehensive fundamentals, insider data, analyst ratings, dividends, income/balance/CF statements. Browser-accessible. Good docs. | 250 req/day on free tier. Some endpoints deprecated for new accounts. |
| Yahoo Finance | Free, widely known | No official API. Unreliable. Requires CORS proxy. Limited fundamentals depth. |
| Alpha Vantage | Free tier available | Very limited free tier (25 req/day). No insider data. Limited depth. |
| Polygon.io | Good quality | $29/month minimum for fundamentals. Too expensive for Phase 1–3. |

---

## Reasoning

FMP provides the most comprehensive set of fundamental endpoints (ratios, metrics, financials, insider trades, dividends, analysts) in a single API with browser-accessible CORS. The free tier is sufficient for a single user with the 1-hour client-side cache. Yahoo Finance is used only as a news fallback via the Cloudflare Worker proxy.

---

## Consequences

**Positive:**
- One API key, one data source for all fundamentals
- Good documentation
- Browser-accessible (no proxy needed)

**Negative / Trade-offs:**
- 250 req/day free tier — exhausted by heavy use. Mitigated by 1-hour cache (TD-002 tracks cache improvement).
- FMP deprecated v3 TTM endpoints for new accounts after August 2025. Mitigation: `fetchFMPStable()` function added to call `/stable/` endpoints. Existing v3 endpoints still valid.
- Vendor dependency — if FMP changes pricing or removes endpoints, migration effort required.

**Ongoing risk:** R-001 in RISK-REGISTER.md.

---

## Update — 2026-06-21

FMP deprecated `/api/v3/ratios-ttm/{sym}` and `/api/v3/key-metrics-ttm/{sym}` for accounts created after August 31, 2025. These have been migrated to `/stable/ratios?symbol={sym}&period=TTM` and `/stable/key-metrics?symbol={sym}&period=TTM` respectively. A `fetchFMPStable()` function was added alongside `fetchFMP()`. Field names in the stable API differ slightly (no `TTM` suffix on field names).

---

*Superseded by: not yet*
