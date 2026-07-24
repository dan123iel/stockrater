# pondex_ — UX Structure for Lovable

All pages, content hierarchy, flows, and states.
No CSS values — only what appears and in what order.

---

## 1. Landing Page — /

### Above the Fold: Hero

**Navigation bar (fixed):**
Logo | How It Works · Demo · Features · Reviews · Pricing | Log in · Free Trial

**Headline (rotating):**
"Still not sure [where to invest / which stock to pick / if the price is right]..."
→ "pondex_ gives you one verdict."

**Subtext:** "A 0–100 score for any stock. Every number cites its source. No noise — just a clear verdict in under 60 seconds."

**Two CTAs:**
- Primary: "Start free trial" → /signup
- Secondary: "Get a demo" → scrolls to #demo section

**Two floating stat cards:**
- Left: "71%" · "trust only sourced data" · "Investor research · n=45"
- Right: "60s" · "any stock, always sourced" · "Time to verdict"

**Score card visual (illustrative):**
```
AAPL · NASDAQ · Technology
Apple Inc.
$213.49 · Illustrative

                    HOLD
                    78/100

Fundamentals  82/100  ████████░░
Moat          88/100  █████████░
Risk          71/100  ████████░░
Valuation     62/100  ██████░░░░
Management    85/100  █████████░

Source: Yahoo Finance · SEC EDGAR · Not financial advice
```

**Data sources bar:** Yahoo Finance · SEC EDGAR · Groq AI

---

### Section 2: ProductDemo (id="demo")

Interactive demo — no login required.

```
[ Demo ]
Try it yourself.

[Enter a ticker...] [GET SCORE →]

Result appears inline:
Score 78/100 · HOLD · "Apple shows strong fundamentals..."
3 factor bars with sources
[Full analysis in the app →] → /signup
```

Demo works for: AAPL, NVDA, MSFT, TSLA, GOOGL, AMZN
Other tickers: "Try: AAPL NVDA MSFT TSLA GOOGL AMZN"

---

### Section 3: How It Works (id="how-it-works")

3 numbered steps:
```
001               002                 003
Enter a ticker.   We analyse it.      You decide.
Type any stock    5 factors, every    BUY/HOLD/SELL —
symbol. 2s.       number sourced.     plain language.
```

---

### Section 4: Verdict Banner

Full-width dark section:
```
HOLD · 78/100 · GOOD FIT
"The score is there. Now you know."
```

---

### Section 5: Differentiation

Comparison table:
```
                Yahoo Finance  ChatGPT  Bloomberg  pondex_
Sources cited        ✗           ✗          ✗        ✓
Clear verdict        ✗           ✗          ✗        ✓
Your strategy        ✗           ✗          ✗        ✓
Affordable           ✓           ✓          ✗        ✓
```
pondex_ column highlighted.

---

### Section 6: Features (id="features")

4 feature blocks with research quotes:
1. Source-cited scoring — "71% trust only sourced data" — Wave 1, n=45
2. Your investor profile — "The tool must know me." — Patricia M., Passive Investor
3. Peer comparison — "That's how you make a decision." — José R., Finance Professional
4. Exit signals — "I never know when to sell." — Gunnar L., Value Investor

---

### Section 7: Comparison Teaser

Two stocks side by side + sector average:
```
         AAPL     MSFT    Tech Avg
Score    78/100   84/100   71/100
Verdict  HOLD     BUY      —
P/E      32.4x    38.1x    31.2x
Margin   26.1%    36.2%    24.8%
```
CTA: "Compare any two stocks →" → /signup

---

### Section 8: Investor Profile

Same stock, different score per investor type:
```
AAPL — Apple Inc.
Value Investor:    62/100  HOLD
Growth Investor:   81/100  BUY
Dividend Investor: 74/100  HOLD
Momentum Trader:   88/100  BUY
```

---

### Section 9: Testimonials (id="reviews")

Header: "Trusted by investors who aren't afraid to question the data."
Subtext: "From user research interviews · n=45 · June 2026"

3 stacking cards (scroll animation):
- Gunnar L., Value Investor · Berlin — "The score is much better than a raw price..."
- Patricia M., Passive Investor · Hamburg — "Gen-Z mindset — rate everything out of ten..."
- José R., Finance Professional · Madrid — "I really like the comparison part..."

Stats bar: 45 interviews · 71% trust only sourced data · 60s to first verdict · €0 to start

---

### Section 10: Mid-CTA (dark bar)

"Every number pondex_ shows cites its source. Always."
[Start free — no card needed →] → /signup
"1 verdict/day free · Pro from €4.99/mo"

---

### Section 11: Pricing (id="pricing")

Toggle: Monthly / Yearly (−17%)

Free €0/month:
- 1 full verdict per day
- Source attribution on every number
- Plain-language explanations
- Price chart
- No credit card required
[Start for free →] → /signup

Pro €4.99/month:
- Unlimited verdicts
- Peer comparison (2 stocks + sector avg)
- DCF model + stress test (coming Q4 2026)
- Watchlist + portfolio tracker
- Weekly digest email
- AI chat with source attribution (coming Q4 2026)
[Start 7-day trial →] → /signup

Note: "No credit card required for free tier. Cancel anytime."

---

### Section 12: FAQ (id="faq")

6 accordion questions:
1. Is pondex_ financial advice? — No. Research tool only.
2. What data sources? — Yahoo Finance, SEC EDGAR, Groq AI (Llama 3.3)
3. How is the score calculated? — 5 factors: Fundamentals, Moat, Risk, Valuation, Management
4. What does "1 verdict per day" mean? — Free tier limit. Resets at midnight.
5. Is my data safe? — Only email stored. No financial data, no trading activity.
6. What is the Pro trial? — 7 days full Pro, cancel anytime, no card needed.

---

### Section 13: Founder Note

Gray background section.
Left: Avatar "D" + "Daniel" + "Founder · pondex_" + stats (45 interviews, 3 months building)
Right: Personal story — "I spent hours reading analyst reports... only to still feel unsure."
CTA: "Try it free →" → /signup

---

### Section 14: Final CTA

"Stop guessing. Start verifying."
"Your first verdict takes 60 seconds. No account. No credit card."
[Analyse a stock now — it's free] → scrolls to #demo or /signup

---

### Section 15: Footer

Newsletter: [Email] [→] → Thank-you state on submit (no server call yet)
Links: Product · Pricing · Privacy · Terms · Disclaimer
Copyright: "© 2026 pondex_ · Research tool only — not financial advice"

---

## 2. Login — /login

```
Welcome back.
Log in to your pondex_ account.

[Demo banner — gray box]
"Demo mode — any credentials work. Real accounts coming soon."

EMAIL: [you@example.com]
PASSWORD: [••••••••]

[Log in →]

No account? Sign up →
Forgot password? (Coming soon)
```

Behavior: any credentials → success → /app

---

## 3. Signup — /signup

```
Start for free.
No credit card required.

[Demo banner]

EMAIL: [you@example.com]
PASSWORD: [min. 8 characters]

[Create account →]

Already have an account? Log in →

By creating an account you agree to our Terms of Service and Privacy Policy.
```

Behavior:
- First signup → /app/stock?ticker=AAPL + onboarding banner
- Subsequent logins → /app

---

## 4. Home Dashboard — /app

**Header:** "Good [morning/afternoon/evening], [firstname]."

**Layout:** 2 columns — main content left + sidebar 360px right

**Left column:**
- Watchlist strip: "Watchlist · 4 stocks" + "Today: +$X.XX" (or "—") + "View portfolio →"
- Top Movers: 6 cards (3×2 grid) — Ticker · Company · Price · % Change · clickable → /app/stock
- Watchlist list: 4 rows — Ticker · Company · Price · % Change · clickable → /app/stock

**Right sidebar:**
- Robo Advisor teaser (dark bg): "Investing on autopilot." + "Get started →" → /app/robo
- Upcoming Events: date · ticker · event name · type badge (earnings/dividend)

---

## 5. Stock Analysis — /app/stock

### Empty state (no ticker)
```
[ Stock ]
Get your verdict.

[Ticker input...] [GET VERDICT →]
```

### Loading state
Button shows "...", content area empty.

### Error state (unknown ticker)
```
Ticker not found or not in demo set.
Try: [AAPL] [NVDA] [MSFT] [TSLA] [GOOGL] [AMZN]
```

### Result state
**Header:**
```
AAPL · NASDAQ · Technology          [AAPL, NVDA...]  [GET VERDICT →]
Apple Inc.
$213.49  +1.15 (+0.54%)
```

**Tabs:** Overview | Key Metrics | Financials | News | Order Book | Exit Check | Learn

---

### Tab: Overview
- Price Chart (illustrative label if demo data)
  - Range selector: 1W 1M 3M 6M 1Y
  - Area chart 280px + volume bars 40px
- Verdict card (col 1–4):
  - Gauge animation
  - Score 78/100
  - [HOLD] GOOD FIT badge
  - Summary text
  - "⚠ Research tool only · Not financial advice"
- Factor breakdown (col 5–12):
  - 5 rows: Name · Score/100 · Explanation · Bar · Source
- Key metrics strip (6 cols): Market Cap · Price · 52W High · 52W Low · Beta · Sector
- Upcoming events: "Calendar data coming in Phase C."
- Similar stocks: 3–4 peer tickers as links → /app/stock?ticker=XXX

---

### Tab: Key Metrics
4 sections in 2×2 grid:
- Price & Volume: Current Price · 52W High/Low · Market Cap · Shares · Beta
- Valuation: P/E · Forward P/E · P/Book · P/Sales · FCF Yield · EV/EBITDA
- Profitability: Gross Margin · Operating Margin · Net Margin · Revenue Growth · Dividend Yield
- Management: ROE · ROA · Debt/Equity · Current Ratio · Quick Ratio

All values with source label (Yahoo Finance TTM / SEC EDGAR)

---

### Tab: Financials
Sub-tabs: Income Statement | Balance Sheet | Cash Flow
Table: 3 years of annual data
Source: "Annual · Yahoo Finance / SEC EDGAR"

---

### Tab: News
```
[ News ]
News feed coming in Phase C.
Requires NewsAPI integration · no placeholder data shown.
```

---

### Tab: Order Book
```
[ Order Book ]
Live order book coming in Phase C.
Requires real-time market data feed.
```

---

### Tab: Exit Check
```
[ Exit Check ]
Exit Strategy coming Q4 2026.

Enter your purchase price to track your thesis and receive
HOLD / TRIM / EXIT signals based on score decay and
fundamental changes.

Research signal only · Not financial advice
```

---

### Tab: Learn
3 columns:
- Glossary: P/E · EPS · DCF · Moat · FCF Yield · Beta (term + definition)
- About [TICKER]: company description · Sector · Industry · Country
- Data Sources: Yahoo Finance · SEC EDGAR · Groq AI + disclaimer

---

## 6. Portfolio — /app/portfolio

**Header:** "Your investments." + "Watchlist: 4 stocks" + "Today: —"
**Tabs:** Positions | Watchlist | Transactions | Account (default: Positions)

**Positions:** Empty state — "No open positions." + [Analyse a stock →] → /app/stock?ticker=AAPL

**Watchlist:** Table — Ticker · Company · Price · Change · Sector · [Analyse] button
Each row clickable → /app/stock?ticker=XXX

**Transactions:** "No buy/sell history yet. Coming Q4 2026." + [Explore stocks →] → /app/markets

**Account:**
- Email address
- Plan: Free tier
- Member since: [year from createdAt or current year]
- Available balance: —
- [Log out] button
- [Delete account] link → confirmation dialog → clear all data → redirect to /

---

## 7. Markets — /app/markets

**Header:** "What's moving today." + Gainers count + Losers count
**Tabs:** Top Movers | Popular Stocks | Collections | News | Calendar

**Top Movers:** Sorted by |% change|, gainers + losers mixed, 6-column grid of cards
**Popular Stocks:** Curated by market cap: AAPL MSFT NVDA GOOGL AMZN TSLA (different from Top Movers)
**Collections:** Cards — Big Tech · Semiconductors · EV & Energy · Streaming (clickable → filters view)
**News:** "News coming in Phase 2. Requires NewsAPI key."
**Calendar:** Month calendar, today = new Date(), events as colored chips (earnings=purple, dividend=green)

---

## 8. Robo Advisor — /app/robo

**Header:** "Investing on autopilot."
**Tabs:** Portfolio | Savings Plans | Round-up | Forecasts

**Portfolio tab:**
1. How it works: 4 steps (01 Goal · 02 Risk · 03 Build · 04 Rebalance)
2. Portfolio types: Conservative (~5.1% p.a.*) · Core (~8.2% p.a.*) · Growth (~11.4% p.a.*)
   *"Historical estimate only — not a guarantee"
3. Dark CTA banner: "Coming Q4 2026" + [Start onboarding →]

**Onboarding flow (on button click):**
Progress bar (3 steps)
- Q1: Investment goal? [Wealth building] [Retirement] [Income] [Large purchase]
- Q2: How long to hold? [<1yr] [1-5yrs] [5-10yrs] [10+yrs]
- Q3: Portfolio drops 20%: [Sell immediately] [Hold and wait] [Buy more]
- Back button: goes one step back (not exit)
- Skip: uses default Core weights
- Result: "Your style: [Conservative/Core/Growth] Portfolio. Coming Q4 2026."

**Other tabs:** All show "Coming Q4 2026." + brief description

---

## 9. CFD — /app/cfd

**Header:** "Trade with leverage."
**Stats bar (4 cols):** Max Leverage: 1:30 · Asset Classes: 4 · Min Spread: TBD · Status: Preview

**Risk Warning (required):**
"⚠ Risk Warning: CFDs are complex instruments with a high risk of losing money due to leverage. Most retail investors lose money trading CFDs. pondex_ does not provide investment advice."

**Preview banner:** "[ Preview data — not live. CFD trading coming Q4 2026. ]"

**Instruments table:** S&P 500 · NASDAQ · EUR/USD · Gold · Oil (WTI) · BTC/USD
Columns: Name · Type · Leverage · Spread · Change (preview, gray) · Coming soon

**Phase CTA:** "Coming Q4 2026." + [Join waitlist →] → Toast "You are on the waitlist."

---

## 10. Account — /app/account

```
[ Account ]

user@example.com
Free tier

Email          user@example.com
Plan           Free
Member since   2026
Verdicts today 0 / 1

[Upgrade to Pro →]
[Log out]
[Delete account] → confirmation → clear data → redirect /
```

---

## 11. 404 Page

```
[ 404 ]
Page not found.

[Back to app →] → /app
[Go to home →] → /
```
