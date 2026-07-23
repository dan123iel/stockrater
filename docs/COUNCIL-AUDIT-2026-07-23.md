# pondex_ Council Audit — Full App Review
_Date: 2026-07-23 · 59 Agents · 9 Pages · 5 Council Members_

---

## Executive Summary

- **The app is in a pre-user state.** 5 of 5 council members across all 9 pages returned NEEDS_WORK. No page passed. The core research flow (search ticker → get verdict) works in demo mode but is surrounded by enough fake data, broken routes, and trust-destroying content that showing it to real users today would cause permanent churn.
- **The single highest risk is fake financial data attributed to real sources.** The News tab shows fabricated Reuters/Bloomberg/CNBC/WSJ headlines. The Order Book generates random numbers on every render. CFD shows static change percentages as live data.
- **One P0 bug affects every single authenticated page.** `setSearchOpen(false)` is called in `AppNav.handleSearch` but `setSearchOpen` is never declared. ReferenceError on every search submission.
- **The Profile button is broken on every authenticated page.** `AppNav` links to `/app/account` which has no route.
- **Top opportunity:** Fix the quick-win one-liners, remove fake news and order book tabs → app becomes shareable with Wave 1 participants.

---

## Page-by-Page Verdict

| Page | Verdict | Top Issue | Priority |
|---|---|---|---|
| Landing | NEEDS_WORK | Hero 'Get a demo' CTA hits AuthGuard; mobile nav has no hamburger | P0 |
| Login | NEEDS_WORK | Fake auth with no demo banner | P0 |
| Signup | NEEDS_WORK | No post-signup onboarding; raw href 404s | P0 |
| Home | NEEDS_WORK | `setSearchOpen` crash; portfolioValue is sum of prices | P0 |
| Stock / App | NEEDS_WORK | News tab has fake Reuters/Bloomberg headlines; Order Book Math.random | P0 |
| Markets | NEEDS_WORK | CalendarView hardcodes today as July 22; Top Movers = Popular Stocks | P0 |
| Portfolio | NEEDS_WORK | Watchlist hardcoded; default tab is Watchlist not Positions | P1 |
| RoboAdvisor | NEEDS_WORK | Always recommends Growth Portfolio regardless of answers | P0 |
| CFD | NEEDS_WORK | Static fake % changes styled as live; claims 500+ markets, <10ms | P0 |

---

## 🔴 P0 — Broken / Must Fix Before Any User Sees This

1. **`setSearchOpen` ReferenceError** — `AppNav.jsx` handleSearch calls `setSearchOpen(false)` but no state exists → crashes every nav search
2. **Profile button → `/app/account`** — no route registered, falls through to Landing wildcard
3. **Hero 'Get a demo' → navigate('/app')** — hits AuthGuard, redirects cold visitors to login
4. **Mobile nav permanently inaccessible** — AnimatePresence overlay exists but no hamburger button sets `open=true`
5. **Mobile nav `<Link>` for `#anchors`** — React Router treats as path navigation, not scroll
6. **Fake news headlines (Reuters/Bloomberg/CNBC/WSJ)** — template strings as real news in Stock News tab
7. **Order Book Math.random() in render** — flickers on every re-render, NaN when quote is null
8. **Fake auth with no demo banner** — any credentials work, no disclosure
9. **AAPL price $327.74** — stale since 2020, destroys trust with any financially literate visitor
10. **Morningstar/Bloomberg/Reuters in LogosBar** — not integrated, factually false
11. **RoboAdvisor always → Growth Portfolio** — answers collected but never evaluated
12. **CFD 'Join waitlist' → `/signup`** — authenticated user loses session
13. **StockChart always shows 'Chart unavailable'** — no demo fallback for 6 demo tickers
14. **Pricing CTAs `href="/signup"`** — bypasses React Router, 404 on GitHub Pages
15. **Home/Portfolio show `$0.00`** — silent backend failure with no demo fallback state

---

## 🟠 P1 — UX/Realism Issues (Fix This Week)

1. AAPL has 3 different scores across Hero (59), ProductDemo (78), App DEMO_DATA (78) — needs canonical source
2. CalendarView hardcodes `new Date(2026, 6, 22)` → `new Date()`
3. Portfolio defaults to tab 1 (Watchlist) → should be 0 (Positions)
4. `useEffect` on Stock page `[]` dep → stale ticker on navigation → needs `[searchParams]`
5. Similar Stocks use hardcoded `<a href="/stockrater/...">` → full page reload
6. Upcoming Events hardcoded to same 2 dates for every ticker
7. Similar Stocks always Big Tech regardless of sector
8. Watchlist value = sum of prices, not portfolio value
9. Free tier says "No account required" but AuthGuard requires one
10. LandingNav labels don't match scroll targets (Company→#testimonials, Resources→#demo)
11. Hero "Survey · Wave 1" is internal jargon
12. Watchlist hardcoded constant, not user-editable
13. Free tier 1 verdict/day limit not enforced
14. "Good morning" ignores time of day
15. CFD static changes styled as live (no disclaimer)
16. CFD stats row claims 500+ markets, <10ms execution
17. RoboAdvisor Back button exits entire onboarding (not previous step)
18. Markets Top Movers and Popular Stocks are identical
19. Stock page error gives no guidance for unsupported tickers
20. AppNav has "Stock" as nav item → renders empty state
21. Collections tab cards have cursor:pointer but no click handler
22. Portfolio Account shows "Free tier · Phase 1" (internal language)
23. Footer email capture form has no submit handler
24. Testimonials personas have no attribution (Wave 1 research)
25. Post-signup lands on blank Home with no onboarding

---

## 🟡 P2 — Polish

1. Interdisplay font never loaded → all headlines fall back to Inter
2. Dual design system conflict in index.css (old gradient palette vs Bungee grayscale)
3. Nav height token conflict: G.nav.height='72px' vs --nav-height:80px in index.css
4. S and M exported from both bungee.js and grid.js (duplicate)
5. Verdict colors (#16a34a, #dc2626, #d97706) hardcoded ~20x → need C.up, C.down, C.warn tokens
6. Section label format: mix of `[ ]` and `( )` — standardize to `[ ]`
7. BungeeButton hardcodes '#1e1e1e' instead of C.black
8. Border-radius inconsistent (7px, 8px, 10px, 12px) — use G.radius scale
9. Error messages use raw ⚠ emoji (platform-inconsistent)
10. StockChart applies Apple earnings months to all tickers
11. PageNotFound.jsx exists but never used (wildcard → Landing)
12. Home TOP_TICKERS includes META (no demo data) → use AMZN
13. Markets TICKERS includes 6 unsupported tickers → restrict to 6 demo set
14. Portfolio Positions CTA → /app/stock (no ticker) = dead end
15. CFD "Coming in Phase 4" → "Coming Q4 2026"
16. RoboAdvisor return estimates have no disclaimer
17. Loading state shows only "..." in button, no content area feedback
18. Home greeting uses raw email local-part (daniel.schmidt)
19. Footer legal links all href='#'
20. LandingFooter marginTop: '250px' (magic number)
21. Testimonials top:'80px' sticky offset (wrong nav height)
22. Watchlist hover animates padding → grid reflow (use transform)
23. Landing components redeclare S/M locally instead of importing
24. "Forgot password?" missing from Login
25. No focus-visible styles (accessibility)

---

## Quick Wins (< 30 min each)

- Delete `setSearchOpen(false)` from AppNav handleSearch — 1 line
- Change `/app/account` → `/app/portfolio` in AppNav — 1 word
- `new Date(2026, 6, 22)` → `new Date()` in Markets CalendarView
- `useState(1)` → `useState(0)` in Portfolio.jsx
- Add time-of-day greeting in Home.jsx
- Remove `{ label: 'Stock', to: '/app/stock' }` from AppNav navLinks
- Remove Morningstar/Bloomberg/Reuters from Hero LogosBar
- Pricing free tier "No account required" → "No credit card required"
- Replace `<a href="/stockrater/app/stock?...">` with `<Link>` in App.jsx
- Add `[searchParams]` dep to Stock page useEffect
- Replace fake News tab with empty state
- Change Hero "Get a demo" to scroll to #demo
- Add C.up/C.down/C.warn to colors.js + global replace
- Fix Pricing CTAs: raw href → `<Link to="/signup">`
- Replace `META` with `AMZN` in Home TOP_TICKERS
- Change "Free tier · Phase 1" → "Free tier" in Portfolio Account tab
- Add e.preventDefault() + thank-you state to Footer email form
- Wire RoboAdvisor Back button to step back (not exit)
- Add demo banner to Login/Signup forms
- Add error guidance chips (demo tickers) on Stock page error

---

## Big Ticket Items (Phase C+)

- **[Phase C]** StockChart demo candle data (90-day OHLCV for 6 tickers)
- **[Phase C]** User-editable watchlist via localStorage
- **[Phase C]** Free-tier 1 verdict/day limit + upgrade modal
- **[Phase C]** RoboAdvisor scoring logic (Conservative/Core/Growth)
- **[Phase C]** Demo quote stubs for Home/Portfolio/Markets (no $0.00)
- **[Phase C]** First-session onboarding flow (→ /app/stock?ticker=AAPL)
- **[Phase C]** Mobile navigation (AppNav hamburger + LandingNav trigger)
- **[Phase C]** DEMO_DATA quote stubs for 6 tickers (companyName, price, change)
- **[Phase C]** Per-ticker similarStocks peer map
- **[Phase D]** Supabase auth (replace fake setTimeout)
- **[Phase D]** /app/account route and page
- **[Phase D/E]** GDPR: ToS checkbox + /terms + /privacy stubs

---

## Navigation & Routing Audit

| Route | Issue | Fix |
|---|---|---|
| AppNav → `/app/account` | No route → Landing wildcard | Change to `/app/portfolio` |
| AppNav → `/app/stock` (no ticker) | Empty state, dead nav item | Remove from navLinks |
| Hero 'Get a demo' → `/app` | AuthGuard → login | Scroll to #demo |
| Pricing `href='/signup'` ×2 | Bypasses Router, 404 | `<Link to="/signup">` |
| Login `<a href='/signup'>` | Raw href, basename issue | `<Link to="/signup">` |
| Signup `<a href='/login'>` | Raw href | `<Link to="/login">` |
| App.jsx line 191 `<a href="/stockrater/app/stock?...">` | Hardcoded basename, full reload | `<Link to="/app/stock?...">` |
| App.jsx `path="*"` → `<Landing />` | Auth users hit dead routes silently | Use `<PageNotFound />` |
| CFD → `/signup` (Join waitlist) | Auth user loses session | Inline capture or toast |
| LandingNav mobile `<Link to="#anchor">` | Path nav not scroll | `<a href="#anchor">` |
| LandingNav mobile — no hamburger | setOpen(true) never called | Add hamburger button |
| Portfolio Positions CTA → `/app/stock` | Dead end empty state | → `/app/stock?ticker=AAPL` |

---

## Demo Data Audit

| Location | Claims | Reality | Fix |
|---|---|---|---|
| Hero AAPL $327.74 | Live price | Stale since 2020 | Remove or label 'Illustrative' |
| Stock News tab | Reuters/Bloomberg/CNBC | Hardcoded template strings | Remove → empty state |
| Stock Order Book | Live depth | Math.random() in render | Remove tab |
| Stock Upcoming Events | Per-ticker dates | Same 2 hardcoded for all | Remove or label Demo |
| Stock Similar Stocks | Sector peers | Always Big Tech | Remove or per-ticker map |
| Hero LogosBar | Data providers | Morningstar/Bloomberg not used | Remove, keep Yahoo/SEC/Groq |
| Home Watchlist value | Portfolio value | Sum of prices | Rename to '4 stocks tracked' |
| Markets CalendarView today | Current date | Hardcoded Jul 22 | `new Date()` |
| RoboAdvisor '+11.4% p.a.' | Performance | Fabricated | Add disclaimer |
| RoboAdvisor result | Personalized | Always Growth | Wire scoring |
| CFD changes '+0.82%' | Live data | Static | 'Preview — not live' banner |
| CFD stats '500+ Markets' | Product specs | Fabricated | Remove |
| Portfolio 'Phase 1' | Plan label | Internal jargon | 'Free tier' |
| Testimonials personas | Real users | Wave 1 research participants | Add attribution |

---

## Design System Compliance

**Missing color tokens:**
| Token needed | Hex | Used in |
|---|---|---|
| C.up | #16a34a | App.jsx ×8, Home.jsx ×4, Markets ×4, Portfolio ×2... |
| C.down | #dc2626 | Same files |
| C.warn | #d97706 | App.jsx ×3, bungee.js |
| C.earnings | #7c3aed | Home, Markets, App |

**Font violations:**
- Interdisplay declared in grid.js + bungee.js but never loaded via @font-face or CDN
- index.css sets `html { font-family: 'Inter' }` globally, overrides intent
- S and M duplicated in bungee.js and grid.js

**Ghost design system in index.css:**
- `--color-valuation: #F093A2`, `--color-growth: #8FD8C8`, gradient utilities — contradict Bungee grayscale, delete them

**Spacing/layout:**
- LandingFooter `marginTop: '250px'` — magic number
- Testimonials sticky `top: '80px'` — wrong nav height (should be 72px)
- AppNav 'Go' button `borderRadius: '7px'` — not in G.radius scale

