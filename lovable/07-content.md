# pondex_ — Content Spec (07)
Send this as Message 5 in Lovable after the 6 base files.

---

## /terms — Terms of Service

Page title: "Terms of Service"
Last updated: July 2026
Governing law: Germany

Sections (render as h2 headings with paragraphs):

**1. Service Description**
pondex_ is a financial research tool that provides algorithmic stock analysis scores. It is not a licensed investment advisor. All content is for informational purposes only and does not constitute investment advice.

**2. Data Sources**
Scores are computed using data from Yahoo Finance and SEC EDGAR. AI-generated explanations use Groq AI (Llama 3.3). Data accuracy is not guaranteed.

**3. No Investment Advice**
pondex_ scores and signals (BUY/HOLD/SELL) are research tools only. All investment decisions are made solely by the user. pondex_ accepts no liability for investment outcomes.

**4. Free Tier Limitations**
Free accounts are limited to 1 full analysis per day. This limit resets at midnight UTC.

**5. Account & Data**
We store only your email address and investor profile preferences. You may delete your account at any time from the Account page.

**6. GDPR Rights (EU Users)**
You have the right to access, correct, and delete your personal data. To exercise these rights, contact: legal@pondex.app

**7. Changes**
We may update these terms. Continued use after changes constitutes acceptance.

**Contact:** legal@pondex.app

---

## /privacy — Privacy Policy

Page title: "Privacy Policy"
Last updated: July 2026

Sections:

**1. Data We Collect**
- Email address (required for account)
- Investor profile answers (3 onboarding questions — optional)
- Daily verdict count (stored locally in your browser)
- Watchlist tickers (stored locally in your browser, Phase D: in database)

**2. What We Do NOT Collect**
- No financial account data
- No trading history
- No payment data (Stripe handles payments directly)
- No device fingerprinting
- No third-party tracking without consent

**3. How We Use Your Data**
- Email: account authentication and product updates
- Investor profile: personalizing your stock scores
- We do not sell or share your data with third parties

**4. Analytics**
We use Plausible Analytics — a privacy-first, cookie-free analytics tool hosted in the EU. No personal data is collected. No cookie banner required.

**5. Data Storage**
Data is stored on Supabase (EU region — Frankfurt, Germany). Supabase is GDPR-compliant and has executed a Data Processing Agreement with us.

**6. Your Rights (GDPR)**
- Right of access: request a copy of your data
- Right to rectification: correct inaccurate data
- Right to erasure: delete your account and all data from the Account page
- Right to portability: export your data on request

To exercise these rights: legal@pondex.app

**7. Contact**
pondex_ · legal@pondex.app · Germany

---

## Welcome Banner (first session after signup)

Shown on /app/stock?ticker=AAPL immediately after first signup.

**Position:** Fixed bar below the AppNav, above the page content. Full width.
**Background:** #0A0A0A (dark)
**Text color:** #FFFFFF
**Height:** 44px
**Dismiss:** × button on right side

**Copy:**
```
Welcome to pondex_ — this is your first verdict. Every number cites its source. [×]
```

**Behavior:**
- Appears only once (localStorage key: `pondex_onboarding_banner_seen`)
- Set key on dismiss
- Also auto-dismisses after 8 seconds
- Does NOT appear on any subsequent page load

---

## Free Tier Gate — Upgrade Modal

Shown when a free user tries to run their 2nd analysis on the same day.

**Trigger:** User clicks "GET VERDICT" when `localStorage.getItem('pondex_verdicts_YYYY-MM-DD') >= 1`

**Component:** Modal overlay (not a page redirect)

**Copy:**
```
You've used your free verdict for today.

Upgrade to Pro for unlimited verdicts, peer comparison, and AI chat.

[Upgrade to Pro — €4.99/month]    [Remind me tomorrow]
```

**Behavior:**
- "Upgrade to Pro" → navigate to /pricing or Stripe checkout (Phase E)
- "Remind me tomorrow" → dismiss modal, input stays empty, no analysis runs
- Modal closes on overlay click (same as "Remind me tomorrow")

**Pro features to show in modal (3 bullet points):**
- Unlimited verdicts per day
- Peer comparison (2 stocks + sector average)
- AI chat with source attribution

---

## Demo Watchlist & Events (for Home Dashboard empty state)

```javascript
const DEMO_WATCHLIST = ['AAPL', 'MSFT', 'NVDA', 'GOOGL']

const DEMO_EVENTS = [
  { date: 'Aug 1',  ticker: 'AMZN', event: 'Earnings Call',    type: 'earnings' },
  { date: 'Aug 15', ticker: 'NVDA', event: 'Ex-Dividend Date', type: 'dividend' },
  { date: 'Aug 26', ticker: 'NVDA', event: 'Earnings Call',    type: 'earnings' },
]
```

Use these when backend is not available so the Home Dashboard is never empty.

---

## Sector Average (for Comparison Teaser on Landing Page)

```javascript
const DEMO_SECTOR_AVG = {
  Technology: { score: 71, peRatio: 31.2, netMargin: 24.8, revenueGrowth: 0.12 },
}
```

Use `DEMO_SECTOR_AVG.Technology` as the "Tech Avg" column in the landing page Comparison Teaser section.

---

## API Field → Display Name Mapping

The backend returns raw API keys as factor names. Map them to display labels:

```javascript
const FACTOR_NAMES = {
  ratios:     'Fundamentals',
  moat:       'Moat',
  esgRisk:    'Risk',
  valuation:  'Valuation',
  management: 'Management',
}
```

Never show raw keys like "ratios" or "esgRisk" in the UI — always use the display names above.

---

## Collections Tab — Filtered View

When a user clicks a Collection card in Markets, show an inline list of that collection's tickers below:

```javascript
const COLLECTIONS = [
  { name: 'Big Tech',       tickers: ['AAPL', 'MSFT', 'GOOGL', 'AMZN'] },
  { name: 'Semiconductors', tickers: ['NVDA'] },
  { name: 'EV & Energy',    tickers: ['TSLA'] },
  { name: 'Streaming',      label: 'Coming Q4 2026', tickers: [] },
]
```

Click behavior: toggle inline list below the card. Each ticker in the list is clickable → /app/stock?ticker=XXX

---

## Robo Advisor — Back Button on Step 1

On the onboarding flow:
- Back on step 2, 3: go to previous question, preserve answers so far
- Back on step 1: exit the onboarding flow, return to the Portfolio tab main view, reset progress bar to 0, reset CTA to "Start onboarding →"
