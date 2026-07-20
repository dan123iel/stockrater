# pondex — PHASE 2: Auth + Dashboard Shell + Supabase Schema

**Prerequisite:** Phase 1 (Landing Page) is live and working.

**Goal:** User can register/login, sees a dashboard with navigation to all app areas,
can set their strategy/risk profile. All database tables exist with correct RLS policies.
All verdict/score displays use hardcoded placeholder data — no live financial data in this phase.

**Design system:** → `docs/brainstorming/design-system/BUNGEE-DESIGN-SYSTEM.md`

---

## 1. SUPABASE AUTH

- Email/password login + Google OAuth
- After registration: automatically create a row in `profiles` (trigger `on_auth_user_created`)
- Protected routes: everything under `/app/*` requires auth, otherwise redirect to `/login`
- Routes: `/login`, `/signup`, `/app/*` alongside existing `/` (landing page)

---

## 2. DATABASE SCHEMA

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  investor_strategy text check (investor_strategy in ('value','growth','dividend','momentum')) default 'value',
  risk_tolerance text check (risk_tolerance in ('low','medium','high')) default 'medium',
  subscription_tier text check (subscription_tier in ('free','pro')) default 'free',
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "own profile" on profiles for all using (auth.uid() = id);

create table verdict_usage (
  user_id uuid references profiles(id) on delete cascade,
  usage_date date not null default current_date,
  verdict_count int not null default 0,
  primary key (user_id, usage_date)
);
alter table verdict_usage enable row level security;
create policy "own usage" on verdict_usage for all using (auth.uid() = user_id);

create table market_data_cache (
  ticker text not null,
  data_source text not null,
  metric_key text not null,
  metric_value numeric,
  raw_payload jsonb,
  retrieved_at timestamptz not null default now(),
  primary key (ticker, data_source, metric_key)
);
alter table market_data_cache enable row level security;
create policy "public read cache" on market_data_cache for select using (true);

create table verdicts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  ticker text not null,
  score numeric not null,
  strategy_used text not null,
  factor_breakdown jsonb not null,
  created_at timestamptz default now()
);
alter table verdicts enable row level security;
create policy "own verdicts" on verdicts for all using (auth.uid() = user_id);

create table watchlist (
  user_id uuid references profiles(id) on delete cascade,
  ticker text not null,
  added_at timestamptz default now(),
  primary key (user_id, ticker)
);
alter table watchlist enable row level security;
create policy "own watchlist" on watchlist for all using (auth.uid() = user_id);

create table portfolio_holdings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  ticker text not null,
  shares numeric not null,
  cost_basis numeric,
  added_at timestamptz default now()
);
alter table portfolio_holdings enable row level security;
create policy "own holdings" on portfolio_holdings for all using (auth.uid() = user_id);
```

**Test criterion:** User A must NEVER be able to read rows belonging to User B. Test with two accounts before Phase 3.

---

## 3. APP NAVIGATION STRUCTURE

### Top Nav (all screen sizes, 52px)
```
[pondex_]    [🔍 Search any stock or ticker...]    [🔔]  [👤]
```
- Logo → `/app`
- Search bar: center, 40% width desktop, autocomplete (ticker + name)
- Bell: price alerts + events, red dot badge when unread
- Avatar: email + plan badge (Free/Pro), links to Settings / Sign out

### Sidebar (desktop ≥1280px, 220px)
```
🔍 Analyse
📊 Portfolio
📅 Calendar
⭐ Watchlist
🤖 Assistant
──────────
⚙ Settings  ← pinned bottom
```

### Bottom Tab Bar (mobile ≤767px, 56px)
```
🔍 Analyse | 📊 Portfolio | 📅 Calendar | ⭐ Watchlist | 🤖 Assistant
```
Labels hidden below 479px (icons only). Tab bar hides when keyboard open.

---

## 4. APP SCREENS (placeholder data — no live backend)

### `/login` and `/signup`
- Centered card on dark background with brand gradient overlay at opacity 0.2
- Email + password fields, Google OAuth button
- "pondex_" wordmark at top of card
- Toggle: "Don't have an account? Sign up" / "Already have an account? Sign in"

### `/app` — Dashboard
- Sticky top nav + sidebar (desktop) or bottom tab bar (mobile)
- Search bar: prominent, full width at top of content area
- **Sections in order:**
  1. Search bar (prominent, "Search any stock or ticker...")
  2. Upcoming Events widget (3 placeholder rows: Earnings purple, Dividend green, Holiday orange)
  3. Recently analysed (last 5 stocks — placeholder chips)
  4. Watchlist preview (first 4 — placeholder rows)
  5. Portfolio summary (if holdings exist)
- Empty state (new user): illustration + "Start by searching for a stock"

### `/app/stock/:ticker`

**Stock header (sticky, dark):**
```
← [back]    NVDA · NVIDIA Corporation    🔔  ⭐
             GPU Developer · Technology
             $207.06  ▲ +2.1%  ·  Today
```

**4 sub-tabs:** Overview · Insights · Financials · News

**Overview tab:**
- Score hero: tacho gauge (SVG semicircle, red→grey→#00ff88) + "71 / 100" + "Good Fit — Value Strategy"
- 5 factor rows with placeholder scores + 1-sentence explanations + source badges
- Price chart placeholder (1D/1W/1M/6M/1Y/Max toggle)
- Key metrics row: Market Cap · P/E · EPS · Dividend Yield (all placeholder)
- "Similar stocks" horizontal scroll row (placeholder chips)
- Next event pill (placeholder)

**Insights tab:** 4 tacho gauges — Fundamentals, Analyst Consensus, Technical Summary, Market Sentiment. All placeholder values.

**Financials tab:** Income Statement / Balance Sheet / Cashflow — placeholder rows with Annual/Quarterly toggle.

**News tab:** Placeholder article list grouped by date.

### `/app/compare`
- Two ticker inputs + placeholder comparison table
- Sector average as third column
- "Pro feature" soft paywall badge (upgrade CTA)

### `/app/portfolio`
- Holdings table with real CRUD (wired to `portfolio_holdings`) — no scoring yet
- Columns: Ticker · Shares · Cost basis
- "Add holding" modal: ticker search + shares + cost basis
- Swipe left on mobile → delete (confirm dialog)

### `/app/watchlist`
- Real CRUD wired to `watchlist` table
- Each row: ticker + placeholder score badge
- Sort: Score / Alphabetical / Date added

### `/app/calendar`
- Placeholder events, grouped by month, two filter tabs: "My Portfolio" / "Watchlist"
- Event types: green (Dividend), purple (Earnings), orange (Market holiday)
- Footer: "Data source: Yahoo Finance · Dates subject to change"

### `/app/settings`
- Investor strategy selector: Value / Growth / Dividend / Momentum → saves to `profiles`
- Risk tolerance: Low / Medium / High → saves to `profiles`
- Investing goal (optional free text)
- Subscription: "Free tier · 1 verdict/day" + "Upgrade to Pro" → placeholder

### `/app/assistant`
- Full-screen chat UI
- Suggested questions on empty state
- User messages: right-aligned; pondex responses: left-aligned with source badges
- Disclaimer pinned at top: `⚠ pondex assistant provides research information, not investment advice.`
- No real AI wiring in Phase 2 — static placeholder responses

---

## 5. ONBOARDING FLOW (new users after signup, before dashboard)

5 screens, one question each. Dark background, large question, pill-shaped answer options.
Progress dots at top (5 dots, active in accent color).
"Skip for now" link bottom right.

**Step 1:** Why do you invest?
→ Build wealth · Save for retirement · Save for a purchase · Generate income · Just learning

**Step 2:** How long do you plan to hold?
→ Less than 1 year · 1–5 years · 5–10 years · 10+ years

**Step 3:** If a stock dropped 20% in one month, you would:
→ Hold and wait · Review my thesis · Sell immediately · Buy more

**Step 4:** Which strategy fits you best?
→ Value · Growth · Dividend · Momentum (each with 1-line description)

**Step 5:** How much experience do you have?
→ Just starting · 1–3 years · 3+ years

Final: "pondex calculates scores based on your profile. You can change this anytime in Settings. pondex provides information, not investment advice — all decisions are yours."
→ Save to `profiles`, redirect to `/app`

---

## 6. GLOBAL UI STATES

### Loading
- Skeleton shimmer for all async data
- Tacho gauge: needle at 0, grey arc, "Calculating..." label
- Score number: "—" placeholder

### Error States
- Invalid ticker: "XYZABC not found — check the ticker symbol"
- Data unavailable: cloud icon + "Try again" button
- Daily limit (HTTP 402): lock icon + upgrade CTA
- Stale data (>24h): amber banner

### Empty States
| Screen | Headline | CTA |
|---|---|---|
| Dashboard | Start exploring | Search bar |
| Portfolio | No holdings yet | + Add holding |
| Watchlist | Nothing saved yet | Search stocks |
| Calendar | No upcoming events | Add to portfolio |
| Assistant | Ask anything | Suggested questions |

### Toast System
Top-center, slides down. Auto-dismiss 4s. Variants: success (green) / error (red) / info (blue) / warning (amber).

---

## 7. RESPONSIVE RULES

| Breakpoint | Layout |
|---|---|
| ≥1280px | Sidebar (220px) + main content |
| ≤991px | Sidebar hidden, top nav hamburger → drawer |
| ≤767px | Bottom tab bar, single column |
| ≤479px | Tab labels hidden (icons only), tighter padding |

---

## 8. NOT IN THIS PHASE

- No Edge Functions
- No Yahoo Finance or SEC EDGAR calls
- No scoring calculation
- No Stripe (soft paywall UI only — "Upgrade" → placeholder)

---

## 9. FILE STRUCTURE

```
src/
  pages/
    Login.jsx
    Signup.jsx
    Onboarding.jsx
    Dashboard.jsx
    StockDetail.jsx
    Compare.jsx
    Portfolio.jsx
    Watchlist.jsx
    Calendar.jsx
    Assistant.jsx
    Settings.jsx
  lib/
    supabaseClient.js
supabase/
  migrations/
    001_init_schema.sql
```
