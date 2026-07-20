# pondex — App Design Specification

_Single source of truth for all app screens, navigation, states, and interactions._
_Referenced by: LOVABLE-PHASE2-AUTH-SHELL.md, LOVABLE-PHASE3-LIVE-SCORING-STRIPE.md_
_Last updated: 2026-07-17_

---

## 1. DESIGN PHILOSOPHY

pondex is NOT a broker. It is a research intelligence platform.
The design must reflect this: calm, trustworthy, data-dense but never overwhelming.

**Three design principles:**
1. **Clarity over density** — show one verdict clearly, not ten metrics noisily
2. **Audit trail always visible** — every number has a source badge, always
3. **Explanation before score** — plain language first, number as conclusion

**Reference:** Zinve Studio Template visual language (dark/light alternating,
Kanit/Khand typography, pill buttons, gradient-brand accent) — but pondex
has its own identity through the brand gradient and tacho-gauge component.

**NOT Revolut:** pondex never uses "Buy", "Sell", "Kaufen", "Verkaufen",
"Empfehlung", "Vorschlag". Every verdict is framed as "Fit for your strategy".

---

## 2. NAVIGATION ARCHITECTURE

### 2.1 App shell structure

```
┌─────────────────────────────────────────────┐
│  TOP NAV (52px, fixed, always visible)       │
│  logo · search bar · 🔔 · 👤               │
├──────────┬──────────────────────────────────┤
│          │                                  │
│  SIDE    │   MAIN CONTENT AREA              │
│  NAV     │   (scrollable)                   │
│  (desk.) │                                  │
│          │                                  │
└──────────┴──────────────────────────────────┘
│  BOTTOM TAB BAR (mobile only, 56px)         │
└─────────────────────────────────────────────┘
```

### 2.2 Top Navigation Bar (all screen sizes)

```
[pondex_]    [🔍 Search any stock or ticker...]    [🔔]  [👤]
```

- **Logo:** "pondex_" Kanit 700, white — links to `/app` dashboard
- **Search bar:** center, prominent, 40% of nav width on desktop
  - Placeholder: "Search any stock or ticker..."
  - On focus: expands, shows recent searches dropdown
  - Autocomplete: ticker + company name + sector tag
  - On select: navigates to `/app/stock/:ticker`
  - Mobile: full width row below logo
- **Bell icon (🔔):** price alerts + upcoming events notification center
  - Red dot badge when unread notifications exist
  - Click → slide-down panel showing recent alerts
- **Avatar (👤):** account dropdown
  - Shows: email + subscription tier badge ("Free" or "Pro")
  - Links: Settings · Subscription · Sign out
  - On mobile: same behavior, tap to open

**Top nav background:**
- On dashboard + light screens: white, border-bottom: 1px solid rgba(0,0,0,0.08)
- On dark screens (stock detail): #0a0a0a, border-bottom: 1px solid rgba(255,255,255,0.08)
- Transition: smooth 200ms when navigating between light/dark screens

### 2.3 Sidebar Navigation (desktop ≥1280px only)

```
┌──────────────┐
│  pondex_     │  ← wordmark
│              │
│  🔍 Analyse  │  ← active state: #00ff88 left border + text
│  📊 Portfolio│
│  📅 Calendar │
│  ⭐ Watchlist│
│  🤖 Assistant│
│              │
│  ─────────── │
│  ⚙ Settings  │
└──────────────┘
```

- Width: 220px, fixed left
- Background: #0a0a0a (dark)
- Active item: 2px #00ff88 left border + text white
- Inactive: text rgba(255,255,255,0.45)
- Hover: text rgba(255,255,255,0.8), bg rgba(255,255,255,0.04)
- Font: Khand 600, 12px, uppercase, letter-spacing 0.12em
- Settings pinned to bottom

### 2.4 Bottom Tab Bar (mobile ≤767px only)

```
[🔍 Analyse] [📊 Portfolio] [📅 Calendar] [⭐ Watchlist] [🤖 Assistant]
```

- Height: 56px + safe area bottom
- Background: #0a0a0a, border-top: 1px solid rgba(255,255,255,0.08)
- Active: icon + label in #00ff88
- Inactive: icon + label in rgba(255,255,255,0.4)
- Settings accessible via top nav avatar only on mobile
- Tab bar hides when soft keyboard is open (on mobile inputs)

### 2.5 Stock Detail Sub-Navigation (tabs)

Sticky below the stock header on `/app/stock/:ticker`:

```
[Overview]  [Insights]  [Financials]  [News]
```

- Active tab: white text + 2px #00ff88 bottom border
- Inactive: white 50% opacity
- Font: Khand 600, 13px, uppercase
- Background: #0a0a0a, border-bottom: 1px solid rgba(255,255,255,0.08)
- Tab switch: instant, no animation (content fades in)
- On mobile: scrollable horizontally if tabs overflow

---

## 3. ALL SCREENS — COMPLETE SPEC

### 3.1 `/login` and `/signup`

**Layout:** Centered card on dark bg with gradient overlay
- Background: #0a0a0a + --gradient-brand at opacity 0.15
- Card: white, border-radius 16px, .gradient-border-card, max-width 440px
- Logo + wordmark centered at top of card
- Email field + password field + CTA button
- "Sign in with Google" secondary button (Google icon + text)
- Toggle: "Don't have an account? Sign up" / "Already have an account? Sign in"
- Forgot password link below password field

**`/forgot-password`:**
- Same card layout
- Email field + "Send reset link" button
- Success state: "Check your email — we sent a reset link to [email]"
- Error state: "No account found with this email"

**`/reset-password`:**
- New password + confirm password fields
- Validate: min 8 chars, show strength indicator
- Success → redirect to `/app` with toast "Password updated"

### 3.2 Onboarding (`/onboarding`)

5 screens, one question each. Dark bg, gradient overlay.
Large Kanit H2 question. Pill-shaped answer options (dark card, white border).
Progress indicator: 5 dots at top, current dot in #00ff88.
"Skip for now" text link bottom right (saves defaults).

Screen 1: "Why do you invest?"
→ Build wealth · Retirement · Large purchase · Income · Just learning

Screen 2: "How long do you plan to hold?"
→ Less than 1 year · 1–5 years · 5–10 years · 10+ years

Screen 3: "If a stock dropped 20% in a month, you would:"
→ Hold and wait · Review my thesis · Sell immediately · Buy more

Screen 4: "Which strategy fits you best?"
→ Value · Growth · Dividend · Momentum
(Each with 1-line description)

Screen 5: "How much experience do you have?"
→ Just starting · 1–3 years · 3+ years

Final screen: confirmation + "Open pondex →" CTA
Saves all answers to `profiles`. Redirect to `/app`.

### 3.3 `/app` — Dashboard

**Layout (desktop):** 2-column grid (sidebar + main)
**Layout (mobile):** single column with bottom tab bar

**Sections in order:**

**Search bar** (prominent, full width at top of content area):
- "Search any stock or ticker..." placeholder
- On focus: recent searches dropdown (last 5, with X to clear each)
- On type: autocomplete with ticker + name + % change today

**Upcoming Events widget** (next 3 events from portfolio + watchlist):
```
Upcoming events                              See all →
──────────────────────────────────────────────────────
🟣  NVDA · Earnings Call · 26 Aug
🟢  AAPL · Ex-Dividend · 15 Aug · $0.25/share
🟣  AMZN · Earnings Call · 1 Aug
```
"See all →" → `/app/calendar`

**Recently analysed** (last 5 stocks):
Row of stock chips: logo + ticker + last score + score change arrow

**Watchlist preview** (first 4 from watchlist):
Compact rows: ticker · name · score · price · % change
"View all →" → `/app/watchlist`

**Portfolio summary** (if holdings exist):
Total value · Total P&L · Aggregate score
"View portfolio →" → `/app/portfolio`

**Empty state (new user, nothing added yet):**
```
[Illustration: simple chart icon]
Start by searching for a stock
[Search bar CTA]
```

### 3.4 `/app/stock/:ticker`

**Stock header (sticky, dark):**
```
← [back]    NVDA · NVIDIA Corporation    🔔  ⭐
             GPU Developer · Technology
             $207.06  ▲ +2.1%  ·  Today
```

**4 tabs:** Overview · Insights · Financials · News
(See Phase 2 spec for full tab content)

### 3.5 `/app/compare`

**Layout:**
```
[Stock 1: search input]    vs    [Stock 2: search input]

         AAPL          MSFT        Sector Avg
──────────────────────────────────────────────
Score    78/100        71/100       65/100
P/E      28.4x         32.1x        27.8x
FCF      4.2%          3.8%         3.1%
Gross M. 44.1%         68.9%        41.2%
Beta     1.19          0.89         1.05
──────────────────────────────────────────────
Source: Yahoo Finance · TTM · Jul 2026
⚠ Research tool only. Not financial advice.
```

- Pro feature — soft paywall for free tier
- "Winner" highlight: best value in each row gets subtle #00ff88 bg
- Mobile: horizontal scroll on table, or stack as cards

### 3.6 `/app/portfolio`

**Layout:**
Portfolio summary header: total value · total P&L · aggregate pondex score

Holdings table:
```
Ticker  Company     Shares  Cost   Current  P&L      Score
AAPL    Apple Inc.  10      $180   $213     +$330    78 ↑
NVDA    NVIDIA      5       $190   $207     +$85     71 →
──────────────────────────────────────────────────────────
                                   Total    +$415
```

- Tap row → navigates to `/app/stock/:ticker`
- "Add holding" button: modal with ticker search + shares + cost basis
- Swipe left on mobile → delete row (confirm dialog)
- Edit holding: tap → inline edit for shares and cost basis

**Empty state:**
```
[Icon: portfolio chart]
No holdings yet
Add your first stock to track your portfolio
[+ Add holding]
```

### 3.7 `/app/watchlist`

List of saved stocks. Sort options: Score (high→low) · Alphabetical · Date added.

Each row:
```
[Logo] NVDA  NVIDIA Corporation  71/100 ↓  $207.06  ▼ -1.2%  [✕]
```

- Tap → `/app/stock/:ticker`
- ✕ removes from watchlist (with undo toast)
- "Add stock" → search modal

**Empty state:**
```
[Icon: star]
No stocks on your watchlist yet
Search for a stock and tap ⭐ to add it
```

### 3.8 `/app/calendar`

**Layout:**
```
[Filter: My Portfolio] [Filter: Watchlist]    [≡ filter] [📅 view]

AUGUST 2026
────────────────────────────────────────
26 Aug  🟣  NVDA · Earnings Call
15 Aug  🟢  AAPL · Ex-Dividend · $0.25/share
15 Aug  🟢  AAPL · Dividend Payment · $0.25/share

SEPTEMBER 2026
────────────────────────────────────────
 7 Sep  🟠  Market Closed · Labor Day
```

Event colors:
- 🟢 Green card: Dividend / Ex-Dividend
- 🟣 Purple card: Earnings Call / Earnings Release
- 🟠 Orange card: Market holiday / Closure

Footer: `Data: Yahoo Finance · Dates subject to change · Not investment advice`

**Empty state (no portfolio/watchlist):**
```
Add stocks to your portfolio or watchlist
to see upcoming events here
[→ Search stocks]
```

### 3.9 `/app/assistant`

Full-screen AI research companion.

**Header:**
```
← [back]    pondex assistant    [🕐 history]
──────────────────────────────────────────────
⚠ pondex assistant provides research information, not investment advice.
```

**Chat interface:**
- User messages: right-aligned, dark pill bg (#0a0a0a)
- pondex responses: left-aligned, white card with .gradient-border-card
- Source badges inline in response text
- Typing indicator: 3 animated dots

**Suggested questions (on empty state):**
```
Try asking:
"Is NVDA expensive right now?"
"What changed in AAPL's score this week?"
"Compare MSFT and GOOGL for a value investor"
"Explain the P/E ratio in simple terms"
```

**Context panel (collapsible, right side on desktop):**
Shows current stock context if navigated from a stock page.
Shows user's strategy profile.

### 3.10 `/app/settings`

**Sections:**

**Investor Profile**
- Strategy: Value / Growth / Dividend / Momentum (pill selector)
- Risk tolerance: Low / Medium / High (pill selector)
- Investment horizon: <1yr / 1–5yr / 5–10yr / 10+yr
- Investing goal (free text, optional)
- "Save profile" button

**Subscription**
- Current plan: "Free tier · 1 verdict/day" or "Pro · Unlimited"
- If Free: "Upgrade to Pro — €4.99/month" CTA in #00ff88
- If Pro: "Manage subscription" → Stripe Customer Portal
- Next billing date · Cancel option

**Price Alerts**
- List of active alerts with threshold prices
- Delete individual alerts

**Account**
- Email address (read-only)
- Change password link
- Delete account (destructive, confirmation required)

### 3.11 `/score-methodology` (public page, no auth required)

Accessible from every score display via "How is this calculated?" link.

Explains:
- 5 factors + weights per strategy (table)
- Normalisation method (percentile vs sector peers)
- Data sources per factor
- What the score means and what it doesn't
- Full disclaimer section

Design: light background, editorial layout, no nav sidebar.

### 3.13 `/app/world` — Global Stock Map

**What it is:**
An interactive 3D globe showing where portfolio and watchlist companies
are headquartered. Gives instant visual context: where is my money invested?
Which countries/regions am I exposed to?

**Phase:** Phase 3 (requires real company HQ data from provider)

**Library:** `react-globe.gl` (free, WebGL-based, zero dependencies)
or `three-globe` — both render a rotating 3D Earth with country markers.

**Visual design:**
- Dark background (#0a0a0a) — the globe looks best on dark
- Globe texture: dark ocean (#0d1117), muted land (#1a2332)
- Country borders: rgba(255,255,255,0.08) thin lines
- Company markers: glowing dots using --gradient-brand colors
  - Each dot: company logo (small circle) or ticker label
  - Hover: show company name + ticker + pondex score
  - Click: navigate to `/app/stock/:ticker`
- Countries with multiple holdings: larger/brighter dot cluster
- Gradient-brand accent for the most heavily invested country

**Globe interactions:**
- Auto-rotates slowly on load (stops when user interacts)
- Drag to rotate
- Scroll to zoom
- Click country → highlight all companies from that country

**Data needed:**
- Company HQ country/coordinates: from `market_data_cache`
  (Yahoo Finance `summaryProfile.country` + `summaryProfile.city`)
- Coordinates mapped via static `country-coords.json` in repo

**Where it lives in the app:**
- Accessible via top nav globe icon 🌍 (desktop) or bottom tab (mobile)
- Also as a widget on the Dashboard: mini non-interactive globe
  showing portfolio geographic distribution
- Full screen: `/app/world`

**Dashboard widget version:**
Small 200×200px globe, non-interactive, shows dots for portfolio holdings.
Click → expands to full `/app/world` screen.

**Responsive:**
- Desktop: full-screen immersive 3D globe
- Mobile: same — WebGL works on mobile, touch to rotate

**What the data shows:**
```
Your portfolio exposure:
🇺🇸 United States    65%  (AAPL, NVDA, MSFT, AMZN)
🇩🇪 Germany          20%  (SAP, Siemens)
🇳🇱 Netherlands      10%  (ASML)
🇩🇰 Denmark           5%  (Novo Nordisk)
```

Geographic breakdown shown as a legend below the globe.

**Why this feature:**
- Unique — no competitor (Revolut, Seeking Alpha, Simply Wall St) has this
- Immediate visual impact for new users (wow factor on first open)
- Practical: helps investors understand geographic concentration risk
- Differentiator that's visually memorable = word of mouth driver

Simple chronological list of product updates. Light bg, no auth required.
Linked from landing page footer.

---

## 4. GLOBAL STATES

### 4.1 Loading States

**Skeleton loader** (use for any async data fetch):
```jsx
// Animate shimmer left→right, 1.4s, repeat
<div className="h-4 rounded bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 animate-shimmer" />
```

**Tacho gauge loading:** needle at 0, grey arc, "Calculating..." label
**Score number loading:** "—" placeholder, grey color
**Chart loading:** grey placeholder rectangle, same dimensions as chart
**Table rows loading:** 3 skeleton rows, staggered fade-in

### 4.2 Error States

**Invalid ticker:**
```
[Icon: search with X]
"XYZABC" not found
Check the ticker symbol and try again
```

**Data unavailable (Yahoo Finance error):**
```
[Icon: cloud with X]
Data temporarily unavailable
We couldn't fetch live data for NVDA.
Try again in a moment.
[Try again button]
```

**Daily limit reached (HTTP 402):**
```
[Icon: lock]
Daily limit reached
Free tier includes 1 full verdict per day.
Upgrade to Pro for unlimited verdicts.
[Upgrade to Pro →]  [Try again tomorrow]
```

**Stale data warning (>24h):**
Yellow banner below any metric:
`⚠ This data was last updated more than 24 hours ago. It may be outdated.`

**Network offline:**
Toast at top: `No internet connection — showing cached data`

### 4.3 Empty States

Each screen has a branded empty state with:
- Simple icon (lucide-react)
- Headline (what's missing)
- 1-line description
- CTA button to fix it

| Screen | Icon | Headline | CTA |
|---|---|---|---|
| Dashboard (no recent) | Search | Start exploring | Search bar |
| Portfolio (empty) | BarChart2 | No holdings yet | + Add holding |
| Watchlist (empty) | Star | Nothing saved yet | Search stocks |
| Calendar (no events) | Calendar | No upcoming events | Add to portfolio |
| Assistant (no history) | MessageCircle | Ask anything | Suggested questions |

### 4.4 Toast / Notification System

Single toast component, top-center, slides down.
- Success: green left border, ✓ icon
- Error: red left border, ✗ icon
- Info: blue left border, ℹ icon
- Warning: amber left border, ⚠ icon
- Auto-dismiss: 4 seconds
- Manual close: ✕ button

Examples:
- "Added NVDA to watchlist" + undo link
- "Profile saved"
- "Score updated for 3 holdings"
- "Daily verdict limit reached"

### 4.5 Transitions

**Route transitions:** fade-in only (opacity 0→1, 150ms) — no slide, too distracting
**Tab switches (stock detail):** instant + content fade-in (100ms)
**Modal open/close:** scale 0.95→1.0 + opacity, 200ms
**Sidebar/bottom nav active state:** instant color change, no animation
**Tacho gauge:** needle animates 0→final value on first render (800ms, ease-out)
**Score number:** counts up 0→final on scroll into view (600ms)

---

## 5. RESPONSIVE RULES (app screens)

### Desktop (≥1280px)
- Sidebar navigation visible (220px)
- Main content: remaining width
- Stock detail: 3-column layout (sidebar nav · stock detail · optional panel)
- Dashboard: 2-column grid for widgets
- Compare: full table visible

### Tablet (≤991px)
- Sidebar: hidden, replaced by top nav hamburger → drawer
- Stock detail tabs: same, scrollable
- Insights 4 sections: 2×2 grid
- Financials table: horizontal scroll
- Dashboard: single column

### Mobile (≤767px)
- Bottom tab bar: 5 tabs
- Top nav: logo + search icon (expands to full) + bell + avatar
- Stock detail tabs: scrollable horizontal
- Insights sections: stacked single column
- Compare table: horizontal scroll with frozen first column
- Calendar: full-width event cards
- Font sizes: −25% from desktop values

### Mobile portrait (≤479px)
- H1/H2: 56px / 32px
- Body: 14px
- Bottom tab bar labels: hidden (icons only)
- Cards: full-width, no horizontal padding on edges

---

## 6. DISCLAIMER SYSTEM

### Global Disclaimer component (3 variants)

```jsx
// variant="full" — used on Insights tab, Score Methodology page
⚠ pondex is a research and educational tool. This is not financial advice.
Past performance is not a reliable indicator of future results. Always conduct
your own due diligence and consult a qualified financial advisor before making
investment decisions. Data sourced from Yahoo Finance and SEC EDGAR — accuracy
not guaranteed.

// variant="default" — used on Overview tab, Score Demo
⚠ pondex is a research and educational tool. This is not financial advice.
Always conduct your own due diligence and consult a qualified financial advisor
before making investment decisions.

// variant="short" — used on cards, inline, footer
⚠ Research tool only. Not financial advice.
```

Styling: font-size 11px, italic, opacity 0.5, line-height 1.5.
Non-removable. Appears on every screen with financial data.

### Placement rules

| Location | Variant |
|---|---|
| Hero score card (landing) | short |
| Score demo section (landing) | default |
| Pricing section (landing) | default |
| Stock Overview tab | default (pinned at bottom) |
| Insights tab — each section | short (below each tacho) |
| Analyst consensus section | full (forecasts not guaranteed) |
| Financials tab | short |
| Compare screen | default |
| Assistant chat (pinned top) | default |
| Score methodology page | full |
| Footer (landing + app) | Inline: "Not financial advice" |

### Revolut-inspired disclaimer language
Revolut uses: "Vergangene Performance ist kein zuverlässiger Indikator für
zukünftige Ergebnisse. Investition auf eigenes Risiko."
pondex uses equivalent English framing adapted for an information tool.
Never broker-like language.

---

## 7. DATA SOURCES — COMPLETE REFERENCE

| Data | Source | Endpoint / Method | Cost | Phase |
|---|---|---|---|---|
| Price, P/E, EPS, Dividend, Beta, Market Cap | Yahoo Finance | `quoteSummary?modules=summaryDetail,defaultKeyStatistics` | Free | Phase 3 |
| Revenue, Gross Margin, Operating Margin | Yahoo Finance | `quoteSummary?modules=incomeStatementHistory` | Free | Phase 3 |
| FCF Yield, EV/EBITDA, P/S | Yahoo Finance | `quoteSummary?modules=financialData,valuation` | Free | Phase 3 |
| Income Statement, Balance Sheet, Cashflow | SEC EDGAR XBRL | `data.sec.gov/api/xbrl/companyfacts/CIK{...}.json` | Free | Phase 3 |
| Insider transactions (Form 4) | SEC EDGAR | `data.sec.gov/submissions/CIK{...}.json` | Free | Phase 3 |
| Analyst consensus, price targets | Yahoo Finance | `quoteSummary?modules=recommendationTrend,financialData` | Free | Phase 3 |
| EPS estimates (actual + forecast) | Yahoo Finance | `quoteSummary?modules=earningsTrend,earnings` | Free | Phase 3 |
| Calendar events (Earnings, Ex-Dividend) | Yahoo Finance | `quoteSummary?modules=calendarEvents` | Free | Phase 3 |
| Technical indicators (SMA, EMA, RSI, MACD) | Yahoo Finance | `chart?interval=1d&range=1y` → compute client-side | Free | Phase 3 |
| S&P 500 index (sentiment) | Yahoo Finance | Ticker: ^GSPC | Free | Phase 3 |
| News feed per stock | Yahoo Finance | `search?q={ticker}&newsCount=10` | Free | Phase 3 |
| Company logo | Clearbit Logo API OR local mapping | `logo.clearbit.com/{domain}` | Free tier | Phase 2 |
| Sector reference data (for normalisation) | Static JSON in repo | `src/data/sector-reference.json` | Free (manual) | Phase 3 |

**Note on Revolut's providers:**
- Revolut uses **Factset** for financial statements — commercial, expensive
- Revolut uses **Polygon.io** for technical data — commercial
- Revolut uses **EDI** for events calendar — commercial
- **pondex uses Yahoo Finance + SEC EDGAR for the same data at zero cost**
  This is the cost advantage that enables €4.99/month pricing.

---

## 8. SECTOR REFERENCE DATA (for scoring normalisation)

Static JSON file: `src/data/sector-reference.json`

Structure:
```json
{
  "Technology": ["AAPL", "MSFT", "GOOGL", "META", "NVDA", "AMD", "INTC", "ORCL", "CRM", "ADBE", "QCOM", "AVGO", "TXN", "MU", "AMAT"],
  "Healthcare": ["JNJ", "UNH", "PFE", "MRK", "ABBV", "TMO", "DHR", "ABT", "BMY", "AMGN", "GILD", "CVS", "CI", "HUM", "ISRG"],
  "Finance": ["JPM", "BAC", "WFC", "GS", "MS", "BLK", "AXP", "USB", "PNC", "TFC", "SCHW", "CME", "ICE", "CB", "AON"],
  "Consumer": ["AMZN", "TSLA", "HD", "MCD", "NKE", "SBUX", "TGT", "LOW", "COST", "WMT", "PG", "KO", "PEP", "MO", "PM"],
  "Energy": ["XOM", "CVX", "COP", "SLB", "EOG", "PXD", "VLO", "PSX", "MPC", "OXY", "HAL", "BKR", "DVN", "FANG", "HES"],
  "Industrial": ["HON", "UPS", "CAT", "DE", "MMM", "GE", "RTX", "LMT", "NOC", "BA", "FDX", "CSX", "NSC", "UNP", "EMR"],
  "Real Estate": ["AMT", "PLD", "CCI", "EQIX", "PSA", "EQR", "AVB", "DRE", "O", "VTR", "WELL", "ARE", "BXP", "SLG", "HST"]
}
```

Each sector needs min. 15 companies for reliable percentile normalisation.
This file is checked into the repo and updated quarterly.

---

## 9. MISSING SCREENS BACKLOG (Phase 3+)

These are defined in scope but not yet fully specced:

| Screen | Phase | Notes |
|---|---|---|
| `/score-methodology` | Phase 3 | See section 3.11 above — fully specced |
| `/changelog` | Phase 3 | Simple markdown-rendered list |
| `/app/notifications` | Phase 3 | Bell icon → full history of price alerts + events |
| `/forgot-password` | Phase 2 | See section 3.1 above |
| `/reset-password` | Phase 2 | See section 3.1 above |
| `/app/settings/subscription` | Phase 3 | Stripe Customer Portal integration |
| Referral screen | Phase 4 | Not yet scoped |
| Support/help | Phase 4 | Not yet scoped |

---

_This spec is the authority for all design decisions in Phase 2 and Phase 3._
_When Lovable makes a design decision not covered here, refer to the Zinve_
_Studio Template visual reference and the pondex brand gradient as the tie-breaker._
