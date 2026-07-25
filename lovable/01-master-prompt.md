# pondex_ — Lovable Master Prompt

Paste this as your first message in Lovable.

---

## What to build

Build **pondex_** — a B2C fintech research tool for retail investors.

**Core concept:** User enters a stock ticker → gets a clear 0–100 score + BUY/HOLD/SELL signal + plain-language explanation with source citations. Every number cites its source (Yahoo Finance, SEC EDGAR, or Groq AI).

**Product name:** always written as `pondex_` (lowercase + underscore)

---

## Tech Stack

- **Frontend:** React + Vite + TypeScript (preferred) or JSX
- **Routing:** React Router v6, basename `/stockrater` for GitHub Pages
- **Auth:** Supabase Auth (email/password + Google OAuth)
- **Database:** Supabase PostgreSQL
- **Styling:** Tailwind CSS v3 + shadcn/ui — override all default colors via CSS variables in globals.css. Do NOT use Tailwind color utility classes (text-blue-500, bg-gray-100 etc.) directly — use only the custom CSS variable tokens from the design brief.
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Icons:** Lucide React (included in shadcn/ui)
- **Deployment:** GitHub Pages (frontend), Railway (backend API — already exists, do not build)

---

## Backend API (already exists — do NOT rebuild)

The backend is a FastAPI app deployed on Railway. Frontend calls:
```
GET /score/{ticker}      → score + factors + AI explanation
GET /quote/{ticker}      → price, change, company info
GET /financials/{ticker} → 3 years income/balance/cashflow
GET /ratios/{ticker}     → P/E, margins, ROE etc.
GET /history/{ticker}    → OHLCV candles for chart
```

Use `import.meta.env.VITE_API_URL` for the base URL.
Fallback to demo data when API is unavailable (see `04-demo-data.md`).

---

## Pages to build

### Public (no auth required)
1. `/` — Landing Page (see `02-ux-structure.md` §Landing)
2. `/login` — Login form
3. `/signup` — Signup form
4. `/terms` — Terms of Service (static text page)
5. `/privacy` — Privacy Policy (static text page)

### Authenticated (AuthGuard — redirect to /login if not logged in)
6. `/app` — Home Dashboard
7. `/app/stock` — Stock Analysis (search + verdict, `?ticker=AAPL`)
8. `/app/portfolio` — Portfolio (4 tabs: Positions, Watchlist, Transactions, Account)
9. `/app/markets` — Markets (5 tabs: Top Movers, Popular, Collections, News, Calendar)
10. `/app/robo` — Robo Advisor (4 tabs + onboarding flow)
11. `/app/cfd` — CFD Preview page
12. `/app/account` — Account page (plan, delete account)

### Error
13. `/404` — Page not found

---

## Navigation

### Public pages — LandingNav (fixed top bar)
- Logo left → scrolls to top
- Center links: How It Works · Demo · Features · Reviews · Pricing (all scroll anchors on landing page)
- Right: Log in → /login | Free Trial → /signup
- Mobile (<900px): hamburger → fullscreen overlay with same links

### Authenticated pages — AppNav (fixed top bar) + BottomNav (mobile)
- Logo left → /
- Center: Home · Portfolio · Markets · Robo Advisor · CFD
- Right: Search input (always visible, not a toggle) + Go button → /app/stock?ticker=XXX | Log out | Profile → /app/account
- Mobile (<900px): hide top nav, show bottom nav bar (Home | Markets | Search | Portfolio | Account)

---

## Auth behavior

**Phase B demo mode (until Supabase is wired):**
- Any email + any password → login succeeds
- Store `{ email }` in localStorage as `pondex_user`
- Show demo banner: "Demo mode — any credentials work. Real accounts coming soon."

**First signup:**
- Set `pondex_onboarded = '1'` in localStorage
- Navigate to `/app/stock?ticker=AAPL` (first analysis as onboarding)
- Show dismissible welcome banner

**Supabase auth (Phase D — wire when ready):**
- Replace localStorage fake auth with Supabase `signUp` / `signInWithPassword`
- Schema in `03-data-model.md`

---

## Key UX rules

1. Every score card shows: "Research tool only · Not financial advice"
2. Every data point has a source label (Yahoo Finance / SEC EDGAR / Groq AI)
3. No fake data — empty states instead of invented content
4. "Coming Q4 2026" for unbuilt features — never "Phase 3" or "coming soon™"
5. Error state for unknown tickers shows 6 demo ticker chips: AAPL NVDA MSFT TSLA GOOGL AMZN
6. Loading: button shows "..." — content area stays empty (no skeleton flickering)
7. Demo tickers only (until backend live): AAPL, NVDA, MSFT, TSLA, GOOGL, AMZN

---

## Important don'ts

- No Math.random() in render (flickers on re-render)
- No raw `href="/signup"` — use `<Link to="/signup">` (GitHub Pages basename issue)
- No hardcoded dates like `new Date(2026, 6, 22)` — always `new Date()`
- No "Phase 1/2/3/4" language user-facing
- No fake news headlines attributed to real outlets (Reuters, Bloomberg etc.)
- No Morningstar/Bloomberg/Reuters in the data sources list (not integrated)
- The product is NOT an investment advisor — never phrase signals as recommendations

---

## Files in this package

| File | Contents |
|---|---|
| `01-master-prompt.md` | This file — stack, pages, rules |
| `02-ux-structure.md` | Every page in detail — content, flows, empty states |
| `03-data-model.md` | Supabase schema, score model, demo data |
| `04-demo-data.md` | Complete demo data for 6 tickers (scores, quotes, ratios, financials) |
| `05-design-brief.md` | Design direction — what Daniel wants |
| `06-regulatory.md` | Disclaimers, GDPR requirements, what must be on each page |
