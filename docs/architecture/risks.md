# Technical Risks

Risk format: **Likelihood (H/M/L) × Impact (H/M/L) = Priority**

---

## RISK-001 — Yahoo Finance Endpoint Deprecation

**Likelihood:** H — Yahoo has deprecated endpoints before without notice  
**Impact:** H — Primary data source for charts, financials, and prices  
**Priority: Critical**

**Description:** pondex uses unofficial Yahoo Finance query endpoints without an API agreement. Yahoo can change or block these at any time.

**Mitigation:**
- Worker catches 4xx/5xx responses and returns a structured error to the client
- All tiles degrade gracefully: "Data temporarily unavailable" instead of blank or crashed
- FMP (Financial Modeling Prep) configured as fallback for fundamentals (user provides key)
- 1-hour localStorage cache buffers short outages

**Status:** Graceful degradation partially implemented. FMP fallback not yet wired. **MVP blocker.**

---

## RISK-002 — localStorage Data Loss

**Likelihood:** H — Users clear browser storage regularly  
**Impact:** H — Portfolio, journal, theses, strategy profile all lost  
**Priority: Critical**

**Description:** All user data lives in localStorage. One "Clear browsing data" click destroys years of documented investment history.

**Mitigation:**
- JSON Export button (one click, downloads full data snapshot)
- JSON Import button (restore from file)
- Prominent placement — not buried in settings
- Future: optional E2E encrypted cloud sync (Phase 4)

**Status:** Not implemented. **MVP blocker.**

---

## RISK-003 — Massive/Polygon Rate Limit at Scale

**Likelihood:** M — Only becomes an issue with multiple concurrent users  
**Impact:** M — Discovery Engine and ticker search degrade  
**Priority: High (before Discovery Engine ships)**

**Description:** Free tier = 5 requests/minute. The Discovery Engine requires scoring 200 stocks. Multiple concurrent users will exhaust this immediately.

**Mitigation:**
- Cloudflare KV cache: nightly Cron scores ~200 stocks, result cached
- Browser fetches one pre-built payload (1 request)
- Matching runs client-side — no additional API pressure

**Status:** Not implemented. Must ship before Discovery Engine. See discovery-engine.md.

---

## RISK-004 — AI Hallucinations (Financial Figures)

**Likelihood:** M — LLMs are unreliable with specific numbers  
**Impact:** H — A wrong revenue figure destroys user trust immediately  
**Priority: High (before AI Chat ships)**

**Description:** If the AI states "Apple has $60B in cash" and the actual figure is $45B, the user loses confidence in every pondex output.

**Mitigation:**
- RAG architecture: Worker injects live JSON data into every prompt context
- System prompt: "Use only context-provided data. If a metric is absent, say 'data not available.'"
- No AI output is generated without a live data fetch

**Status:** System prompt instruction in place. Full JSON injection not verified for all prompts. **Must be audited before AI Chat launch.** See ADR-005.

---

## RISK-005 — Single-File Architecture Collapse

**Likelihood:** H — index.html is already 7,000+ lines  
**Impact:** M — Developer velocity drops, bugs become harder to isolate  
**Priority: High (before V1)**

**Description:** Adding Thesis Tracker, AI Chat, and Portfolio to a single HTML file will create an unmaintainable codebase. Feature interactions will produce hard-to-reproduce bugs.

**Mitigation:**
- Vite build system with single-file inlining (deployment unchanged)
- TypeScript for new features
- Unit tests for scoring engine and thesis evaluation logic

**Status:** Not started. Must happen before V1 development begins. See ADR-003.

---

## RISK-006 — FX / Currency Inconsistency

**Likelihood:** H — Any European user with US stocks is affected  
**Impact:** M — Portfolio totals, DCF calculations, and P&L are wrong  
**Priority: Medium (before portfolio metrics)**

**Description:** Yahoo Finance returns financial data in the company's reporting currency. An EU user comparing ASML (EUR) and NVDA (USD) in the same portfolio will see inconsistent numbers.

**Mitigation:**
- Fetch EUR/USD (and other pairs) via Yahoo chart endpoint in Worker
- Normalize all portfolio values to user's base currency
- Display "converted from [currency]" where applicable

**Status:** Not implemented. Must ship before portfolio-level metrics are shown.

---

## RISK-007 — Finnhub Key Exposed in Source

**Likelihood:** L — Requires someone to read the source  
**Impact:** L — Only affects ticker tape (rate limited, not critical data)  
**Priority: Low**

**Description:** The Finnhub WebSocket key is hardcoded in index.html. Anyone reading the source can use it.

**Mitigation:** Move to Cloudflare Worker Secret.

**Status:** Known, low priority. Ticker tape degrades to static if key is rate-limited.
