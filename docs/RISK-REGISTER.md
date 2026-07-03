# Risk Register — pondex

> Risks that are named can be managed. Risks that are ignored become incidents.
> Review at the start of every major phase.
>
> Last updated: 2026-06-21

---

## Risk Scoring Guide

| Score | Priority | Required action |
|-------|---------|----------------|
| 7–9 | Critical | Active mitigation required immediately |
| 4–6 | High | Mitigation plan in place and tracked |
| 1–3 | Medium / Low | Monitor; act if score increases |

Score = Impact (1–3) × Likelihood (1–3)

---

## Active Risks

| ID | Risk | Impact | Likelihood | Score | Status | Mitigation | Review |
|----|------|--------|-----------|-------|--------|-----------|--------|
| R-003 | Groq API changes pricing or rate limits | 2 | 2 | 4 | Open | AI tile degrades gracefully if unavailable. Monitor Groq pricing page. | Phase 2 |
| R-005 | User loses all data (localStorage cleared) | 2 | 2 | 4 | Open | JSON export feature planned. Users must be warned data is browser-local. | Phase 2 |
| R-007 | Finnhub WebSocket key revoked or rate-limited | 2 | 2 | 4 | Open | Ticker tape is nice-to-have — app works without it. Move to user-provided key. | Phase 2 |
| R-008 | Single-file architecture becomes unmaintainable | 2 | 2 | 4 | Open | Acceptable for Phase 1. Module split planned for Phase 2. | Pre-Phase 2 |
| R-011 | Scope creep delays Phase 2 indefinitely | 2 | 3 | 6 | Open | Phase 2 scope must be broken into strict sub-milestones. See ROADMAP.md. | Phase 2 planning |
| R-012 | Supabase pricing changes after Phase 2 launch | 2 | 2 | 4 | Open | Use standard SQL, no Supabase-specific extensions. Migration should take days, not weeks. | Phase 2 design |
| R-013 | GitHub Pages goes down or rate-limits | 2 | 1 | 2 | Low | Single HTML file — mirroring to Vercel/Netlify is a 10-min task. | As needed |
| R-014 | AI output misread as investment advice (regulatory) | 3 | 2 | 6 | Open | Disclaimer added to AI tab (2026-07-02). Full MiFID II / EU AI Act review → `doc/regulatory/REGULATORY.md`. | Pre-Phase 2 |
| R-015 | yfinance unofficial API breaks at scale | 2 | 2 | 4 | Open | Acceptable for Phase 1. Review official Yahoo Finance API or alternative at >10k MAU. | Phase 2 |

---

## Closed Risks

| ID | Risk | Closed | How resolved |
|----|------|--------|-------------|
| R-C01 | FMP `/ratios-ttm` deprecated endpoint | 2026-06-21 | Migrated to `/stable/ratios?period=TTM` |
| R-C02 | Dock tabs showing stale data across tickers | 2026-06-21 | `updateDockTab()` + `resetDockLiveValues()` implemented |
| R-C03 | CORS blocked Worker origin | ~2026-05 | Worker CORS fixed to allow all origins for proxy-only use |
| R-001 | FMP changes/deprecates more endpoints | 2026-07-02 | FMP vollständig entfernt (ADR-005). Stack: Yahoo Finance + SEC EDGAR only. |
| R-002 | FMP free tier exhausted | 2026-07-02 | FMP vollständig entfernt (ADR-005). Kein Rate-Limit-Risiko mehr. |
| R-004 | XSS via malicious FMP API response | 2026-07-02 | FMP vollständig entfernt. Kein externer HTML-Input mehr aus dieser Quelle. |
| R-009 | DCF shows wrong data for non-NVDA tickers | 2026-07-02 | `dcf.js` → `getDefaultInputs()` berechnet alle Werte dynamisch aus `incomeStatements` + `profile.beta`. Kein Hardcode mehr. |
| R-010 | Price chart shows fabricated data | 2026-07-02 | `ChartTile.jsx` ruft `fetchHistoricalPrice` auf — echter Preisverlauf aus Yahoo Finance. |

---

## Risk Review Log

| Date | Changes |
|------|---------|
| 2026-06-21 | Initial register created. 13 active risks identified. R-009 and R-010 flagged as critical. |
| 2026-07-02 | R-001, R-002, R-004 closed (FMP entfernt, ADR-005). R-009 closed (DCF dynamisch). R-010 closed (Chart echte Daten). R-014 neu (Regulatory/AI disclaimer). R-015 neu (yfinance Scale). Phase-Referenzen von Phase 4 → Phase 2 korrigiert. |

---

*Last updated: 2026-07-02*
*Next review: Vor Phase 2 Launch (Login + Paywall)*
