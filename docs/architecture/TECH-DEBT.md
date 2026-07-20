# Tech Debt Register — pondex

> Tech debt is not a failure — it is a conscious trade-off.
> The failure is not tracking it.
> Log it when you create it. Review it at the start of every phase.
>
> Last updated: 2026-06-21

---

## Active Debt Summary

| ID | Area | Description | Priority | Added |
|----|------|-------------|----------|-------|
| TD-001 | Architecture | Single-file HTML is 4,800+ lines — no module separation | Medium | 2026-06-21 |
| TD-002 | Performance | FMP API cache is in-memory only — lost on every page reload | Medium | 2026-06-21 |
| TD-003 | ~~Data accuracy~~ | ~~DCF assumptions hardcoded to NVDA — don't change per ticker~~ | ~~High~~ | Resolved 2026-06-21 |
| TD-004 | UX / Navigation | No URL routing — browser back button broken, links not shareable | Medium | 2026-06-21 |
| TD-005 | Testing | Zero automated test coverage | Medium | 2026-06-21 |
| TD-006 | Consistency | Mixed localStorage key naming (`sr_*` vs `pondex*`) | Low | 2026-06-21 |
| TD-007 | ~~Security~~ | ~~Incomplete HTML escaping of FMP API data in innerHTML~~ | ~~High~~ | Resolved 2026-06-21 |
| TD-008 | Security | Finnhub API key hardcoded in pondex.html | Low | 2026-06-21 |
| TD-009 | Data accuracy | Chart price data is randomly generated — disclaimer added, real OHLC pending Phase 4 | Medium | 2026-06-21 |
| TD-010 | UX | Mobile layout is responsive CSS only — not usable on 375px | Medium | 2026-06-21 |

---

## Detailed Entries

---

### TD-001 — Single-file HTML exceeds maintainable size

**Area:** `pondex.html` (entire file)

**What is the problem?**
`pondex.html` is a single file containing ~4,800 lines of HTML, CSS, and JavaScript. There are no module boundaries, no separation of concerns at the file level. Finding a specific function requires search. Adding a new section risks unintentional interactions with existing code.

**Why was this shortcut taken?**
The single-file architecture was a deliberate Phase 1–3 decision: zero build step, maximum portability, deployable as a file. The trade-off was accepted.

**What is the risk if we never fix it?**
Continued growth will make the file unmaintainable. Editing one section risks breaking another. Onboarding a second developer would be painful.

**What does the proper fix look like?**
Phase 4: introduce a build step (Vite or esbuild), split into `src/js/`, `src/css/`, modular tile builders. Estimated effort: 2–3 days.

**Priority:** Medium
**Target:** Phase 4 — before adding a second developer or significant new features

---

### TD-002 — API cache lost on every page reload

**Area:** `pondex.html` → `FMP_CACHE` variable

**What is the problem?**
`FMP_CACHE` is a JavaScript object (in-memory). It is destroyed every time the page reloads. The 1-hour TTL cache effectively works only within a single browsing session. Users who reload the page re-consume FMP API quota.

**Why was this shortcut taken?**
In-memory cache is simpler to implement and does not risk stale data surviving between sessions unexpectedly.

**What is the risk if we never fix it?**
Power users will exhaust the 250 req/day FMP free tier faster than expected. On the paid tier this is fine; on the free tier it's a real problem.

**What does the proper fix look like?**
Persist `FMP_CACHE` to `localStorage` with a TTL check on read. Add a serialization/deserialization wrapper around `fetchFMP`. Estimated effort: 2–3 hours.

**Priority:** Medium
**Target:** Before promoting pondex to more than ~5 daily active users

---

### TD-003 — DCF model hardcoded to NVDA assumptions

**Area:** `pondex.html` → `buildDCF()`, `calcDCF()`

**What is the problem?**
The DCF stress-test tile uses hardcoded default values for Revenue Growth (8.5%), Operating Margin (65.6%), and WACC (9.4%) — which are NVDA's approximate numbers. When a user analyzes AAPL, TSLA, or MSFT, the sliders start at NVDA values and the "Current price" is hardcoded as `$205.10` (NVDA's price). The DCF fair value and margin of safety are therefore wrong for any ticker other than NVDA.

**Why was this shortcut taken?**
The DCF model was built with NVDA as the demo ticker. Pulling real fundamentals to seed the sliders requires additional FMP API calls (income statement, profile) and a mapping layer. That was deferred to avoid scope creep.

**What is the risk if we never fix it?**
Users see a wrong fair value for their ticker, potentially influencing real investment decisions. This is the highest-priority accuracy debt in the app.

**What does the proper fix look like?**
When `buildDCF` is called:
1. Fetch current price from `profile` API (already called by `launchAnalytics`)
2. Fetch revenue + operating margin from income statement / ratios API
3. Seed slider defaults from these real values
4. Show a "loading assumptions..." state before sliders render
Estimated effort: 1 day.

**Priority:** High
**Target:** Before any public promotion of the app

---

### TD-004 — No URL routing

**Area:** `pondex.html` → `G()` function, `launchAnalytics()`

**What is the problem?**
The URL never changes when navigating. Opening NVDA analytics, AAPL analytics, or the Markets page all show the same URL. The browser back button does not work. You cannot share a link to a specific analysis (`/analytics/NVDA`).

**Why was this shortcut taken?**
Implementing hash-based routing adds moderate complexity. The partial implementation (`location.hash = '#/analytics/' + ticker`) exists but isn't handled on load.

**What is the risk if we never fix it?**
Share-ability is a growth lever. A user who wants to share their NVDA analysis cannot do so. This limits organic growth.

**What does the proper fix look like?**
Hash-based routing on page load: parse `location.hash` on `init()` and route accordingly. Estimated effort: 2–3 hours.

**Priority:** Medium
**Target:** Before any social/sharing promotion

---

### TD-005 — Zero automated test coverage

**Area:** Entire codebase

**What is the problem?**
There are no automated tests of any kind — no unit tests, no integration tests, no end-to-end tests. All testing is manual. Every change carries the risk of silent regressions.

**Why was this shortcut taken?**
Single-file vanilla JS does not have a natural test framework. Setting up Jest or Playwright for a single HTML file adds infrastructure complexity that was not justified for early-phase development.

**What is the risk if we never fix it?**
As the codebase grows, manual testing misses edge cases. Silent regressions (e.g. dock tabs not updating for certain tickers) go undetected.

**What does the proper fix look like?**
Phase 4 (when build step is introduced): add Playwright end-to-end tests for the core user journey (search → scorecard → switch ticker → dock tabs update). Unit test the DCF calculation and score computation. Estimated effort: 3–4 days initial setup.

**Priority:** Medium
**Target:** Phase 4 — before production with real users

---

### TD-006 — Mixed localStorage key naming conventions

**Area:** `pondex.html` → various localStorage reads/writes, `PROJECT.md`

**What is the problem?**
Some code uses `sr_*` prefix (legacy: `sr_portfolio`, `sr_watchlist`, `sr_trades`, `sr_workerurl`) and some uses `pondex*` prefix (new: `pondexfmp_key`, `pondexgroq_key`, etc.). The old `sr_*` keys are referenced in `PROJECT.md` as documentation but the actual code may have diverged.

**Why was this shortcut taken?**
The app was renamed from "stockrater" (`sr_`) to "pondex" incrementally. Not all keys were migrated at once.

**What is the risk if we never fix it?**
Data loss if code reads `pondexportfolio` but a user has data stored in `sr_portfolio`. Confusing for anyone reading the code.

**What does the proper fix look like?**
Audit all localStorage reads/writes. Standardize everything to `pondex*`. Add a one-time migration on `init()` that moves data from `sr_*` keys to `pondex*`. Estimated effort: 2–3 hours.

**Priority:** Low
**Target:** Before Phase 4 launch (clean slate for new users)

---

### TD-007 — Incomplete HTML escaping of API data

**Area:** All tile builders that use `innerHTML` with API-supplied strings

**What is the problem?**
Several tile builders interpolate strings from FMP API responses directly into HTML `innerHTML` assignments. Company names, analyst names, news headlines — if any of these contain `<script>` or `<img onerror=...>` payloads, they would execute in the user's browser.

FMP API responses are not inherently trusted. A compromised FMP response could inject script content.

**Why was this shortcut taken?**
The risk was assessed as low (FMP is a reputable provider), and implementing full escaping for every field requires a utility function and review of every tile builder.

**What is the risk if we never fix it?**
XSS via a malicious FMP API response could exfiltrate localStorage data (including API keys). Low probability but real impact.

**What does the proper fix look like?**
Create a `safeStr(s)` utility that escapes `<`, `>`, `"`, `'`, `&`. Apply it to every API-supplied string before `innerHTML` interpolation. Audit all tile builders. Estimated effort: 4–6 hours.

**Priority:** High
**Target:** Before any public release

---

### TD-008 — Finnhub API key hardcoded in pondex.html

**Area:** `pondex.html` → `FINNHUB_KEY` constant

**What is the problem?**
The Finnhub WebSocket key is hardcoded as a constant in the file, visible to anyone who views source.

**Why was this shortcut taken?**
The Finnhub free tier key has no sensitive scope (public market data only) and is rate-limited. The risk was assessed as low.

**What is the risk if we never fix it?**
The key could be abused by others who find it in source. Finnhub might rate-limit or revoke it.

**What does the proper fix look like?**
Move to localStorage (user enters their own Finnhub key) or load from a Worker environment variable in Phase 4. Estimated effort: 1 hour.

**Priority:** Low
**Target:** Phase 4

---

### TD-009 — Price chart uses randomly generated data

**Area:** `pondex.html` → `redrawChart()` function

**What is the problem?**
The price chart in the Analytics tile generates random price data via a mathematical simulation (`Math.sin + Math.random`). It does not fetch or display real historical price data for the searched ticker. Every render produces a different "chart."

**Why was this shortcut taken?**
Real OHLC price history requires a paid FMP tier or a different data source. The chart was built as a UI demonstration.

**What is the risk if we never fix it?**
Users see a chart that looks real but is entirely fabricated. This is a trust issue for an investment tool.

**What does the proper fix look like?**
Options:
1. FMP `/historical-price-full/{symbol}?serietype=line` — available on paid tier
2. Yahoo Finance chart data via the existing Cloudflare Worker proxy
3. Alpha Vantage free daily OHLC

Recommended: use Yahoo Finance chart via Worker (already used for news). Estimated effort: 1 day.

**Priority:** High
**Target:** Before any public promotion

---

### TD-010 — Mobile layout is CSS-responsive but not UX-usable

**Area:** `pondex.html` → CSS `@media` queries, dock tab layout

**What is the problem?**
The responsive CSS exists and the layout doesn't break at 375px. But the dock tabs (8+ tabs in a horizontal row), the comparison matrix, and several tile tables are unusable on mobile — too small to tap, overflow horizontally, or require desktop hover patterns.

**Why was this shortcut taken?**
pondex was designed for desktop. Mobile was a "nice to have."

**What is the risk if we never fix it?**
A growing share of investment research happens on mobile. Unusable mobile limits growth.

**What does the proper fix look like?**
Mobile-first UX pass: stack dock tabs vertically, replace table views with card views at <768px, increase tap targets. Estimated effort: 3–4 days.

**Priority:** Medium
**Target:** Phase 4 UX sprint

---

## Resolved Debt

| ID | Title | Fixed on | How it was fixed |
|----|-------|----------|-----------------|
| — | Dock tabs showing stale NVDA data on ticker switch | 2026-06-21 | Added `updateDockTab()` + `resetDockLiveValues()` called on `launchAnalytics()` |
| — | FMP `/ratios-ttm` Legacy Endpoint error | 2026-06-21 | Migrated to `/stable/ratios?period=TTM` + `fetchFMPStable()` function |
| — | 7 duplicate footer HTML blocks | 2026-06-21 | Replaced with single `#shared-footer` element |
| — | Breadth chart pixelated on retina screens | 2026-06-20 | Added `devicePixelRatio` scaling + switched to system-ui font |

---

## Rules for This Document

1. Log it when you create it — not after the sprint, not "later"
2. High priority debt must not survive more than one phase
3. Every entry needs a concrete fix description — not just "improve this"
4. Review at the start of each phase: pick at minimum one item to resolve
5. Move resolved entries to the Resolved section with a date and one-line description

---

*Last reviewed: 2026-06-21*
*Next review: Start of Phase 4 planning*
