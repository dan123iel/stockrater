# Risk Register — pondex
_Last updated: 2026-07-24 · Next review: vor Phase C Launch_

> Risks that are named can be managed. Risks that are ignored become incidents.
> Review at the start of every major phase.

---

## Risk Scoring

| Score | Priority | Action |
|---|---|---|
| 7–9 | Critical | Active mitigation required immediately |
| 4–6 | High | Mitigation plan in place and tracked |
| 1–3 | Medium/Low | Monitor; act if score increases |

Score = Impact (1–3) × Likelihood (1–3)

---

## Active Risks

| ID | Risk | Impact | Likelihood | Score | Status | Mitigation | Review |
|---|---|---|---|---|---|---|---|
| R-003 | Groq API changes pricing or rate limits | 2 | 2 | 4 | Open | AI layer degrades gracefully. Cache AI outputs 24h (ADR-011). Monitor groq.com/pricing. | Phase C |
| R-005 | User loses data (localStorage cleared) | 2 | 2 | 4 | Open | Phase D: Supabase persistence. Phase C: warn users data is browser-local. | Phase D |
| R-011 | Scope creep delays Phase C indefinitely | 2 | 3 | 6 | Open | PHASE-C-LAUNCH-CHECKLIST.md defines hard go/no-go gate. | Pre-Phase C |
| R-012 | Supabase pricing changes after Phase D | 2 | 2 | 4 | Open | Standard PostgreSQL only — migration to any hosted Postgres takes days. | Phase D |
| R-014 | AI output misread as investment advice | 3 | 2 | 6 | Open | Disclaimer on every score card. "SIGNAL" framing (R-017). Full review: docs/regulatory/ | Phase C |
| R-015 | yfinance unofficial API breaks at scale | 2 | 2 | 4 | Open | Caching (ADR-011). At >10k MAU: evaluate official Yahoo Finance API. | Phase E |
| R-016 | yfinance commercial use ToS violation | 3 | 2 | 6 | Open | yfinance widely used commercially. Monitor Yahoo ToS. At scale: switch to official API or Polygon.io. | Phase E |
| R-017 | BUY/HOLD/SELL framing triggers MiFID II advisory classification | 3 | 2 | 6 | Open | UX-STRUCTURE-SPEC §8.1: use "Research Signal" framing. Legal review recommended before Phase C. | Phase C |
| R-018 | GDPR enforcement before /terms and /privacy are live | 3 | 3 | **9** | **Critical** | Hard gate in PHASE-C-LAUNCH-CHECKLIST.md (G-01, G-02). Must deploy before Phase C. | **Immediate** |
| R-019 | Competitor builds in-house research score | 2 | 2 | 4 | Open | Differentiate via Exit Strategy + Thesis Tracker. Ship Phase E2 before competitor signal detected. | Quarterly |
| R-020 | EU AI Act compliance gap | 3 | 2 | 6 | Open | Self-assessment in REGULATORY.md §9. Active since August 2026. Budget €100–200 legal opinion. | Phase C |
| R-021 | Warm-network research bias invalidates assumptions | 2 | 2 | 4 | Open | n=91 all warm contacts. Cold-audience Reddit test (EXP-001) required before Phase E. | Pre-Phase E |
| R-022 | Stripe regulatory requirements not met | 2 | 2 | 4 | Open | ADR-012: EU consumer protection checklist. Pre-payment disclaimer + 14-day withdrawal right. | Phase E |

---

## Closed Risks

| ID | Risk | Closed | How resolved |
|---|---|---|---|
| R-001 | FMP changes/deprecates endpoints | 2026-07-02 | FMP removed entirely (ADR-005). |
| R-002 | FMP free tier exhausted | 2026-07-02 | FMP removed (ADR-005). |
| R-004 | XSS via malicious FMP API response | 2026-07-02 | FMP removed. No external HTML input. |
| R-007 | Finnhub WebSocket key revoked | 2026-07-10 | React rebuild — no Finnhub dependency. |
| R-008 | Single-file architecture unmaintainable | 2026-07-10 | Migrated to React + Vite modular architecture. |
| R-009 | DCF shows wrong data for non-NVDA tickers | 2026-07-02 | DCF dynamic from income statements. |
| R-010 | Price chart shows fabricated data | 2026-07-23 | StockChart.jsx uses yfinance OHLCV. Illustrative fallback for demo mode. |
| R-013 | GitHub Pages downtime | — | 404.html redirect in place. Acceptable risk at current scale. |

---

## Risk Review Log

| Date | Changes |
|---|---|
| 2026-06-21 | Initial register. 13 active risks. |
| 2026-07-02 | R-001/002/004 closed (FMP removed). R-014/015 added. |
| 2026-07-24 | Major update: R-007/008/009/010/013 closed (React migration). R-016–R-022 added (Council Consistency Check). Phase references updated to letter system (Phase C/D/E). R-018 marked Critical. |
