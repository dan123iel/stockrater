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
| R-001 | FMP changes/deprecates more endpoints | 3 | 3 | 9 | Open | Abstract all FMP calls behind `fetchFMP`/`fetchFMPStable`. Monitor FMP changelog. Already migrated one set of deprecated endpoints. | Each phase |
| R-002 | FMP free tier (250 req/day) exhausted by active use | 2 | 3 | 6 | Open | 1-hour in-memory cache reduces calls significantly. Plan: persist cache to localStorage (TD-002). Consider FMP paid tier at $14/mo if needed. | Phase 4 |
| R-003 | Groq API changes pricing or rate limits | 2 | 2 | 4 | Open | OpenRouter free tier configured as fallback in Profile → AI Engine. AI tile degrades gracefully if unavailable. | Phase 4 |
| R-004 | XSS via malicious FMP API response | 3 | 1 | 3 | Open | Tracked as TD-007. Full HTML escaping audit in progress. FMP is reputable but not unconditionally trusted. | Pre-launch |
| R-005 | User loses all data (localStorage cleared) | 2 | 2 | 4 | Open | JSON export feature planned (Profile → Storage). Users must be clearly warned that data is browser-local. | Phase 4 |
| R-006 | Cloudflare Worker quota exceeded (100k req/day free) | 1 | 1 | 1 | Low | Current usage is far below limit. Worker only serves news. Monitor if user base grows significantly. | Phase 4 |
| R-007 | Finnhub WebSocket key revoked or rate-limited | 2 | 2 | 4 | Open | Finnhub key hardcoded (TD-008). Ticker tape is a nice-to-have — app works without it. Plan: move to user-provided key. | Phase 4 |
| R-008 | Single-file architecture becomes unmaintainable | 2 | 2 | 4 | Open | Tracked as TD-001. Acceptable constraint for Phase 1–3. Build step + module split planned for Phase 4. | Pre-Phase 4 |
| R-009 | DCF shows wrong data for non-NVDA tickers | 3 | 3 | 9 | Open | Tracked as TD-003. DCF assumptions are NVDA-hardcoded. Users could make investment decisions based on wrong fair value. Must fix before any public promotion. | Immediate |
| R-010 | Price chart shows fabricated data | 3 | 3 | 9 | Open | Tracked as TD-009. Chart is randomly generated. Users see a chart that looks real but isn't. Must fix before any public promotion. | Immediate |
| R-011 | Scope creep delays Phase 4 indefinitely | 2 | 3 | 6 | Open | Phase 4 scope (auth + broker + subscription) is 3 projects in one. Must be broken into strict sub-milestones. See ROADMAP.md. | Phase 4 planning |
| R-012 | Supabase pricing changes after Phase 4 launch | 2 | 2 | 4 | Open | Design data layer with abstraction so migration to another Postgres provider takes days, not weeks. Use standard SQL, no Supabase-specific extensions where avoidable. | Phase 4 design |
| R-013 | GitHub Pages goes down or rate-limits | 2 | 1 | 2 | Low | Single HTML file — mirroring to Vercel or Netlify is a 10-minute task. No lock-in. | As needed |

---

## Critical Risks Requiring Immediate Action

### R-009 — DCF shows wrong numbers for all tickers except NVDA

This is the most serious accuracy risk in the current app. The DCF tile shows NVDA's revenue growth (8.5%), operating margin (65.6%), and WACC (9.4%) as defaults for every ticker. A user analyzing AAPL, TSLA, or any other stock sees a fair value calculated from NVDA's fundamentals. They may not notice.

**Immediate action:** Do not promote pondex publicly or link to it from any public forum until TD-003 is resolved.

### R-010 — Price chart is randomly generated

The chart tile renders a random walk simulation, not real price history. It looks convincing. Users cannot tell without external verification.

**Immediate action:** Add a visible disclaimer to the chart tile ("Chart: simulated data — real price history coming soon") until TD-009 is resolved.

---

## Closed Risks

| ID | Risk | Closed | How resolved |
|----|------|--------|-------------|
| R-C01 | FMP `/ratios-ttm` deprecated endpoint | 2026-06-21 | Migrated to `/stable/ratios?period=TTM` |
| R-C02 | Dock tabs showing stale data across tickers | 2026-06-21 | `updateDockTab()` + `resetDockLiveValues()` implemented |
| R-C03 | CORS blocked Worker origin | ~2026-05 | Worker CORS fixed to allow all origins for proxy-only use |

---

## Risk Review Log

| Date | Changes |
|------|---------|
| 2026-06-21 | Initial register created. 13 active risks identified. R-009 and R-010 flagged as critical. |

---

*Last updated: 2026-06-21*
*Next review: Before Phase 4 begins — full re-score of all risks*
