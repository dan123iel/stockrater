# pondex_ — Vollständige Website & App Spezifikation
_Version 1.0 · Stand: 2026-07-24 · Single source of truth für Design, Struktur und Content_

---

## 0. Design System — Grundregeln

### Farben
```
white:   #FFFFFF  — alle Section-Hintergründe
100:     #D6D6D6  — Borders, Divider, Backgrounds (hell)
200:     #AFAFAF  — Borders, Divider
300:     #898989  — Secondary Text
400:     #656565  — Muted Text, Labels
500:     #434343  — Body Text
600:     #242424  — Strong Text
black:   #000000  — Headlines, Buttons, primary

up:      #16a34a  — BUY / Gain / Positiv
down:    #dc2626  — SELL / Loss / Negativ
warn:    #d97706  — HOLD / Warning
earnings: #7c3aed — Earnings-Events
```

### Typografie
```
Headlines:  Interdisplay, Inter, Arial, sans-serif  — fontWeight 500, letterSpacing -1px bis -3px
Labels/Mono: Chivo Mono, monospace                  — textTransform uppercase, letterSpacing 0.08em–0.12em
```

**Regeln:**
- Kein Farbblock-Hintergrund für Sections (ausser schwarz für CTAs)
- Section-Labels immer: `[ LABEL ]` im Mono-Font, 10–11px, C[400], uppercase, letterSpacing 0.12em
- Keine `( )` Klammern — nur `[ ]`
- Score-Farben: grün ≥70, amber 45–69, rot <45

### Abstände
```
Nav Height:    72px (fixed)
Section py:    80px–120px
Container:     max-width 1440px, padding 0 32px
Radius Buttons: 8–10px
Radius Cards:   12–16px
Radius Pills:   50px
```

### Animationen (Framer Motion)
```jsx
// Standard fade-up (alle Sections)
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, ease: 'easeOut' }}

// Stagger (Listen)
transition={{ delay: index * 0.07 }}

// Hover Cards
whileHover={{ borderColor: C.black }}
```

---

## 1. URL-Struktur — Gesamtübersicht

```
/                       → Landing Page (öffentlich)
/login                  → Login (öffentlich)
/signup                 → Signup (öffentlich)
/app                    → Home / Dashboard (AuthGuard)
/app/stock?ticker=AAPL  → Stock Detail (AuthGuard)
/app/portfolio          → Portfolio (AuthGuard)
/app/markets            → Markets (AuthGuard)
/app/robo               → Robo Advisor (AuthGuard)
/app/cfd                → CFD (AuthGuard)
/app/account            → Account (AuthGuard) — Phase D
```

---

## 2. Landing Page — `/`

### 2.1 LandingNav (fixiert, height 72px)

**Layout:** `Logo | Nav-Links (zentriert) | Log in + Free Trial`

**Logo:** `pondex_` — Textlogo, Interdisplay, fontWeight 500, fontSize 20px, color black

**Nav-Links (Desktop):**
```
How It Works  |  Demo  |  Features  |  Reviews  |  Pricing
```
- Alle als `<a href="#anchor">` — Scroll-Anchor, kein React Router
- Font: Interdisplay 14px, color C[500]
- Hover: background C[100], color black, borderRadius 8px
- Padding: 6px 14px

**Rechts:**
- "Log in" → `/login` (Link, color C[600], padding 8px 16px)
- "Free Trial" → `/signup` (Button, background black, color white, borderRadius 8px, padding 8px 20px)
- Hamburger-Button: sichtbar unter 900px, öffnet Mobile-Overlay

**Mobile Overlay** (AnimatePresence):
- Fullscreen weiß, opacity 0→1
- Links als `<a href="#anchor">` (nicht `<Link>`), fontSize 32px, borderBottom C[100]
- Close-Button (×) oben rechts
- Z-Index über allem

**Background:** `rgba(255,255,255,0.7)`, backdropFilter blur(10px)
**No border-bottom** auf Landing, auf App-Pages: `1px solid C[100]`

---

### 2.2 Hero Section — Above the Fold

**Ziel:** Besucher in <5 Sekunden verstehen lassen was pondex_ ist und warum es für sie relevant ist.

**Layout:**
```
[Stat-Overlay oben links]          [Stat-Overlay oben rechts]
         [Score Card — Hauptvisual, max-width 680px]
```

**Headline:** (rotierend, AnimatePresence)
```
"Still not sure where to invest."
"Still not sure which stock to pick."
"Still not sure if the price is right."
"Still not sure what the numbers mean."
"Still not sure after hours of research."
"Still not sure which source to trust."
```
→ Darunter: `pondex_` (schwarz hinterlegt) + "gives you one verdict."
- Font: Interdisplay, clamp(44px, 6.5vw, 96px), fontWeight 500, letterSpacing -3px

**Subtext:** "A 0–100 score for any stock. Every number cites its source. No noise — just a clear verdict in under 60 seconds."
- Font: Interdisplay 18px, color C[400], maxWidth 560px

**CTAs:**
- Primär: "Start free trial" → `/signup` — background black, color white, borderRadius 10px, 14px 32px
- Sekundär: "Get a demo" → scrollt zu `#demo` — transparent, border 1.5px C[200], borderRadius 10px

**Stat-Overlays (Floating Cards):**
- Links oben: background black, color white — Label "Investor research · n=45", Zahl "71%", Text "trust only sourced data"
- Rechts oben: background white, border C[200] — Label "Time to verdict", Zahl "60s", Text "any stock, always sourced"

**Score Card Visual (Haupt-Hero-Element):**
```
AAPL · NMS · Technology
Apple Inc.
$213.49 · +1.15 (0.35%) · Illustrative

                           HOLD
                           59/100

Fundamentals  58/100  ████████░░  [Amber Bar]
Moat          73/100  ████████░░  [Green Bar]
Risk          66/100  ████████░░  [Amber Bar]
Valuation     38/100  ████░░░░░░  [Red Bar]

Source: Yahoo Finance · SEC EDGAR · Not financial advice
```
- Hintergrund: white, border C[200], borderRadius 20px, boxShadow
- Score-Farbe: C.warn (amber)

**Logos Bar (unter Hero Visual):**
```
[ Data sources ]
Yahoo Finance    ·    SEC EDGAR    ·    Groq AI
```
- Nur echte Datenquellen — kein Morningstar, Bloomberg, Reuters

---

### 2.3 ProductDemo — id="demo"

**Zweck:** Aha-Moment — User kann direkt einen Ticker eingeben und sieht Score.

**Layout:**
```
[ Demo ]
Try it yourself.

[Input: Ticker eingeben]  [GET SCORE →]

Quick picks: [AAPL] [NVDA] [MSFT] [TSLA] [GOOGL] [AMZN]

→ Score-Card erscheint inline (ohne Page-Reload)
```

**Score-Card Output:**
- Score 0–100 + Gauge-Animation
- BUY / HOLD / SELL Badge (farbig)
- 2–3 Satz Summary
- 3 Faktoren als Balken (Fundamentals, Moat, Valuation)
- "Full analysis in the app →" CTA

**Daten:** Demo-Daten hardcoded für 6 Ticker. Andere Ticker → "Try AAPL, NVDA, MSFT, TSLA, GOOGL or AMZN"

---

### 2.4 HowItWorks — id="how-it-works"

**Format:** 3 Schritte horizontal

```
[ How it works ]
Three steps to your verdict.

001                     002                     003
Enter a ticker.         We analyse it.          You decide.
Type in any stock       5 factors. Every        BUY / HOLD / SELL —
symbol. Takes 2         number cites its        plain language, no
seconds.                source.                 jargon.
```
- Zahlen: Chivo Mono, groß
- Trennlinie oben (2px solid black)
- Jeder Schritt in eigenem Grid-Column

---

### 2.5 VerdictBanner — Fullwidth schwarz

**Zweck:** Jose Interview — Klartextempfehlung ist der Conversion-Trigger.

```
[ Verdict ]
HOLD · 78/100 · GOOD FIT

"The score is there. Now you know."
```
- Background: black, color white
- Typography: sehr groß, letterSpacing tight
- Score-Badge: farbig (C.warn für HOLD)

---

### 2.6 Differentiation

**Format:** Vergleichstabelle

```
[ Why pondex_ ]
Not just another finance tool.

              Yahoo Finance    ChatGPT    Bloomberg    pondex_
Sources cited      ✗              ✗          ✗           ✓
Clear verdict      ✗              ✗          ✗           ✓
Your strategy      ✗              ✗          ✗           ✓
Affordable         ✓              ✓          ✗           ✓
Simple UX          ✗              ✓          ✗           ✓
```
- pondex_ Spalte hervorgehoben (black background oder border)

---

### 2.7 FeatureShowcase — id="features"

**Format:** 4 Features mit Research-Quotes

```
[ Features ]
Everything you need.
Nothing you don't.

Feature 01: Source-cited scoring
"71% of investors only trust data with cited sources." — Wave 1, n=45
A 0–100 score across 5 factors. Yahoo Finance + SEC EDGAR. Every number traceable.

Feature 02: Your investor profile
"The tool must know me." — Patricia M., Passive Investor
Score weighted to your strategy. Value · Growth · Dividend · Momentum.

Feature 03: Peer comparison
"That's how you make a decision." — José R., Finance Professional
Compare 2 stocks side by side + sector average. Same format, always.

Feature 04: Exit signals
"I never know when to sell." — Wave 1, Signal/Noise = #1 pain
HOLD / TRIM / EXIT recommendation for positions you already hold.
```

---

### 2.8 ComparisonTeaser — id="compare"

**Format:** 2 Aktien nebeneinander + Sektor-Average

```
[ Compare ]
Two stocks. One decision.

         AAPL          MSFT        Tech Avg
Score    78/100        84/100       71/100
Verdict  HOLD          BUY          —
P/E      32.4x         38.1x        31.2x
Margin   26.1%         36.2%        24.8%
```
- Stark formatiert, Monospace für Zahlen
- CTA: "Compare any two stocks →" → `/signup`

---

### 2.9 InvestorProfile

**Format:** 4 Investor-Typen — gleiche Aktie, anderer Score

```
[ Your Strategy ]
Same stock. Different verdict.
AAPL — Apple Inc.

Value Investor:    62/100  HOLD   (Valuation too stretched)
Growth Investor:   81/100  BUY    (Fundamentals strong)
Dividend Investor: 74/100  HOLD   (Yield too low)
Momentum Trader:   88/100  BUY    (Trend intact)
```
- Zeigt Differenziator: Score wird zur Strategie gewichtet
- Patricia Interview: "Das Tool muss mich kennen"

---

### 2.10 Testimonials — id="reviews"

**Format:** Stacking Cards (Scroll-Animation)

**Header:**
```
[ Testimonials ]
Trusted by investors who aren't afraid to question the data.
From user research interviews · n=45 · June 2026
```

**3 Cards (stacked, gleiten beim Scrollen übereinander):**
```
Card 1 — Gunnar L., Value Investor · Berlin
Initial: G (groß, dunkel)
"The score is much better than a raw price. Undervalued/overvalued
with a number — that's what I need."
User interview · June 2026

Card 2 — Patricia M., Passive Investor · Hamburg
"I find it amazing. Gen-Z mindset — rate everything out of ten.
That's how I think."

Card 3 — José R., Finance Professional · Madrid
"I really like the comparison part. That's how you can actually
make a decision."
```

**Stats-Bar darunter:**
```
45                 71%                   60s              €0
Investors          Trust only            To your first    To start —
interviewed        sourced data          verdict          no card needed
```

---

### 2.11 MidCTA (Zwischen-CTA nach Testimonials)

**Format:** Schwarze Fullwidth-Bar

```
[ 71% of investors only trust sourced data ]
Every number pondex_ shows cites its source. Always.

[Start free — no card needed →]
1 verdict/day free · Pro from €4.99/mo
```

---

### 2.12 Pricing — id="pricing"

**Format:** 2 Karten (Free / Pro) + Toggle Monthly/Yearly

```
[ Pricing ]
Start free. Upgrade when you need more.

[ Monthly | Yearly −17% ]

┌─────────────────────────────┐  ┌─────────────────────────────┐
│ Free                        │  │ Pro                         │
│ €0 /month                   │  │ €4.99 /month                │
│                             │  │ (€49.99/year)               │
│ — 1 full verdict per day    │  │ — Unlimited verdicts        │
│ — Sources on every number   │  │ — Peer comparison           │
│ — Plain-language summary    │  │ — DCF model + stress test   │
│ — Price chart               │  │ — Watchlist + portfolio     │
│ — No credit card required   │  │ — Weekly digest email       │
│                             │  │ — AI chat (sourced)         │
│ [Start for free →]          │  │ [Start 7-day trial +]       │
└─────────────────────────────┘  └─────────────────────────────┘

No credit card required for free tier. Cancel anytime.
```

- Free Card: border C[200], borderRadius 40px, background white
- Pro Card: background black, color white, borderRadius 40px
- Alle CTAs via `<Link to="/signup">` (kein raw href)

---

### 2.13 FAQ — id="faq"

**Format:** Accordion, Fragen per Klick expandierbar

```
[ FAQ ]
Got questions?

Q: Is pondex_ financial advice?
A: No. pondex_ is a research tool...

Q: What data sources do you use?
A: Yahoo Finance, SEC EDGAR, Groq AI (Llama 3.3)...

Q: How is the score calculated?
A: Five factors: Fundamentals, Moat, Risk, Valuation, Management...

Q: What does "1 verdict per day" mean?
A: Free users can run one full analysis per day...

Q: Is my data safe?
A: We store only your email. No financial data, no trading activity...

Q: What is the Pro trial?
A: 7 days of full Pro access, cancel anytime, no card needed...
```

- Border-bottom: 1px solid C[200] zwischen Fragen
- Chevron-Icon dreht sich beim Öffnen (90deg rotation)

---

### 2.14 FounderNote (Gründerhinweis)

**Format:** 2-Spalten, grauer Hintergrund (C[100])

```
[ Why I built this ]

Links:
[Avatar D]
Daniel
Founder · pondex_

45 / Investors interviewed
3  / Months building

Rechts:
"I spent hours reading analyst reports, Reddit threads, and earnings 
calls — only to still feel unsure. Too much noise. No clear signal."

I built pondex_ because I kept asking: is this stock actually a good 
fit for me right now? Every source gave me a different answer. None 
cited their sources. None cared about my strategy.

After 45 investor interviews, one thing was clear: the problem isn't 
access to data — it's too much of it. pondex_ gives you one number, 
one verdict, every source cited. That's it.

[Try it free →]
```

**Hinweis zu Foto:**
- Aktuell: Initial-Avatar "D" (C[600] Background, 96px Kreis)
- Sobald verfügbar: echtes quadratisches Foto, 400×400px, WebP
- Niemals generische Stock-Fotos verwenden

---

### 2.15 FinalCTA

**Format:** Fullwidth, weiß, border-top C[200]

```
Stop guessing.
Start verifying.

"Your first verdict takes 60 seconds. No account. No credit card."

[Analyse a stock now — it's free]
Europe & Latin America · Built on real research · v1.0
```

---

### 2.16 LandingFooter

**Format:** Grauer Hintergrund (C[100])

```
Oben: Logo  |  pondex_ · 2026

Newsletter:
"Stay updated."
[Email eingeben]  [→]
→ On submit: "Thanks — we'll be in touch." (kein Page-Reload)

Footer-Links:
Product  |  Pricing  |  Blog  |  Changelog

Rechtliches:
Privacy Policy  |  Terms of Service  |  Disclaimer

© 2026 pondex_. All rights reserved.
Research tool only — not financial advice.
```

**Newsletter:** `e.preventDefault()` + State-Toggle zu Thank-You-Message. Kein Server-Call in Phase B.

---

### 2.17 Vollständige Landing Page Struktur (Reihenfolge)

```
1.  LandingNav              fixiert, height 72px
2.  Hero                    Above the Fold — Headline + CTA + Visual
3.  ProductDemo             id="demo" — interaktiver Ticker-Input
4.  HowItWorks              id="how-it-works" — 3 Schritte
5.  VerdictBanner           Fullwidth schwarz — BUY/HOLD/SELL
6.  Differentiation         vs. Yahoo/ChatGPT/Bloomberg
7.  FeatureShowcase         id="features" — 4 Features + Research-Quotes
8.  ComparisonTeaser        2 Aktien nebeneinander
9.  InvestorProfile         Same stock, different score
10. Testimonials            id="reviews" — Stacking Cards + Stats
11. MidCTA                  Schwarze Bar — Social Proof Hook + CTA
12. Pricing                 id="pricing" — Free/Pro Cards
13. FAQ                     id="faq" — Accordion
14. FounderNote             Gründer-Story, grauer BG
15. FinalCTA                Stop guessing. Start verifying.
16. LandingFooter           Newsletter + Links
```

---

## 3. Login — `/login`

### Ziel
Bestehende User einloggen. Demo-Modus transparent machen.

### Layout
```
[LandingNav]

                    Welcome back.
                    Log in to your pondex_ account.

              ┌──────────────────────────────────────┐
              │ Demo mode — any credentials work.    │
              │ Real accounts coming in Phase D.     │
              └──────────────────────────────────────┘

              EMAIL
              [you@example.com                      ]

              PASSWORD
              [••••••••                              ]

              [Log in →]

              No account? Sign up →
              Forgot password? (Coming soon)
```

### Verhalten
- Jede Email + Passwort (min. 1 Zeichen) → Login erfolgreich
- `localStorage.setItem('pondex_user', JSON.stringify({ email }))`
- Nach Login → `/app` (Home)
- "Sign up →" = `<Link to="/signup">` (kein raw href)
- Loading-State: Button-Text "..." + opacity 0.6

### Design
- Max-width: 400px, zentriert
- Inputs: background C[100], border C[200], borderRadius 12px, padding 14px 16px
- Submit: background black, borderRadius 12px, width 100%
- Demo-Banner: background C[100], border C[200], borderRadius 10px

---

## 4. Signup — `/signup`

### Ziel
Neue User registrieren. Direkt nach Signup zur ersten Analyse führen.

### Layout
```
[LandingNav]

                    Start for free.
                    No credit card required.

              ┌──────────────────────────────────────┐
              │ Demo mode — any credentials work.    │
              │ Real accounts coming in Phase D.     │
              └──────────────────────────────────────┘

              EMAIL
              [you@example.com                      ]

              PASSWORD
              [min. 8 characters                    ]

              [Create account →]

              Already have an account? Log in →
```

### Verhalten
- Email + Passwort (min. 8 Zeichen) → Account wird erstellt
- `localStorage.setItem('pondex_user', JSON.stringify({ email }))`
- **Erstes Signup:** `localStorage.getItem('pondex_onboarded')` fehlt
  → Navigate `/app/stock?ticker=AAPL` (Onboarding-Flow: erste Analyse)
  → `localStorage.setItem('pondex_onboarded', '1')`
- **Weiterer Login:** → Navigate `/app`

### Onboarding-Banner (auf Stock-Seite nach erstem Signup)
- Kleine Bar unter Nav: "Welcome — this is your first verdict. Powered by Yahoo Finance + SEC EDGAR."
- Dismiss-Button (×)
- Verschwindet nach Dismiss oder nach 10 Sekunden

---

## 5. App — Authenticated Area

### AppNav (alle /app/* Seiten, height 72px)

**Layout:** `Logo | Nav-Links (zentriert) | Search-Input + Go | Log out | Profile`

**Logo:** pondex_ → navigiert zu `/` (Landing)

**Nav-Links:**
```
Home  |  Portfolio  |  Markets  |  Robo Advisor  |  CFD
```
- Aktive Page: background C[100], fontWeight 600
- KEIN "Stock" als Nav-Item (ist search-driven, kein eigenständiger Bereich)

**Suche (immer sichtbar, nie toggle):**
```
[AAPL, NVDA...  ] [Go]
```
- Input: width 120px, background C[100], borderRadius 8px
- Go-Button: background black, color white, borderRadius 6px
- Enter-Taste oder Go → navigate `/app/stock?ticker={INPUT}`

**Rechts:**
- "Log out" → localStorage löschen + navigate `/`
- "Profile" → `<Link to="/app/portfolio">` (Account-Tab) — bis `/app/account` gebaut wird

**Border-Bottom:** `1px solid C[100]` (unterscheidet App-Nav von Landing-Nav)

---

## 6. Home — `/app`

### Ziel
Kuratierter Einstiegspunkt: Watchlist-Übersicht + Top Movers + Events + Robo-Teaser.

### Layout (2-Spalten: Hauptbereich + Sidebar 360px)

**Header:**
```
[ Home ]
Good morning, daniel.  (time-of-day aware: morning/afternoon/evening)
                        (nur Vorname, nicht daniel.schmidt)
```

**Linke Spalte:**

**Portfolio Strip:**
```
Watchlist           Today
4 stocks            +$2.14   (nur wenn Live-Daten verfügbar, sonst "—")

                              [View portfolio →]
```
- "Watchlist value" NICHT als Dollar-Summe wenn kein Backend (irreführend)
- Stattdessen: "4 stocks tracked"

**Top Movers:**
```
[ Top movers ]                                    [Markets →]

[AAPL]  [NVDA]  [MSFT]
Apple   NVIDIA  Microsoft
$213    $131    $471
+0.54%  +1.89%  +0.69%

[TSLA]  [GOOGL] [AMZN]
Tesla   Alphabet Amazon
$316    $198    $222
-1.50%  +0.55%  +0.40%
```
- 6 Cards, 3×2 Grid
- Klick → `/app/stock?ticker=XXX`
- Demo-Daten wenn Backend nicht erreichbar

**Watchlist:**
```
[ Watchlist ]                                     [Edit →]

AAPL  Apple Inc.          $213.49    +0.54%
NVDA  NVIDIA Corporation  $131.38    +1.89%
MSFT  Microsoft Corp.     $471.16    +0.69%
TSLA  Tesla, Inc.         $316.06    -1.50%
```
- Hover: leichter translate (transform, kein padding-change)
- Klick → `/app/stock?ticker=XXX`

**Rechte Sidebar:**

**Robo-Teaser (dunkel):**
```
[ Robo Advisor ]
Investing on autopilot.
Set your goal — pondex builds and rebalances automatically.
[Get started →]
```

**Upcoming Events:**
```
[ Upcoming events ]                               [Calendar →]

AAPL  Earnings Call      Jul 29   [earnings]
META  Earnings Call      Jul 30   [earnings]
NVDA  Ex-Dividend Date   Aug 15   [dividend]
```
- earnings: #7c3aed / #f5f3ff
- dividend: C.up / #f0fdf4

---

## 7. Stock — `/app/stock?ticker=AAPL`

### Ziel
Die Kernfunktion. Ticker eingeben → vollständige Analyse.

### Search Header
```
Linke Spalte (1–7):          Rechte Spalte (8–12):
[ Stock ]                    [AAPL, NVDA...        ] [GET VERDICT →]
Get your verdict.
                             (nach Analyse: Company Header)
                             AAPL · NASDAQ · Technology
                             Apple Inc.
                             $213.49  +1.15 (+0.54%)
```

**Error-State** (Ticker nicht in Demo-Set):
```
Ticker not found or not in demo set.
Try a demo ticker: [AAPL] [NVDA] [MSFT] [TSLA] [GOOGL] [AMZN]
```

**Loading-State:** "..." im Button, Content-Area leer (kein Flicker)

### Tabs (nur sichtbar wenn Ergebnis vorhanden)
```
OVERVIEW  |  KEY METRICS  |  FINANCIALS  |  NEWS  |  ORDER BOOK  |  LEARN
```

---

### Tab: Overview

```
[ Price chart ]
[1W] [1M] [3M] [6M] [1Y]   +0.54% (3M)   Illustrative · Live chart requires backend

[Area Chart — 280px Höhe]
[Volume Bars — 40px]
Volume · Illustrative data
```

**Verdict + Factor Breakdown (12-Column Grid):**

```
Col 1–4: [ pondex_ verdict ]        Col 5–12: [ Factor breakdown ]
[Gauge-Animation]
78                                  Fundamentals    82/100
/100                                Strong revenue growth...      Yahoo Finance
[BUY] GOOD FIT                      ████████░░

Apple shows strong fundamentals     Moat            88/100
with consistent cash flow and       Ecosystem lock-in...          SEC EDGAR
a wide moat...                      █████████░

⚠ RESEARCH TOOL ONLY · NOT ADVICE  Risk            71/100
                                    Low ESG risk...               Yahoo Finance
                                    ████████░░

                                    Valuation       62/100
                                    Premium vs peers...           Yahoo Finance
                                    ██████░░░░

                                    Management      85/100
                                    Capital allocation...         SEC EDGAR
                                    █████████░
```

**Key Metrics Strip:**
```
Market Cap    Price      52W High    52W Low    Beta      Sector
$3.28T        $213.49    $237.23     $164.08    1.21      Technology
```

**Events + Similar + About (3-Column):**
```
[ Upcoming events ]    [ Similar stocks ]    [ About ]
Calendar data          MSFT →                Apple Inc. designs...
coming in Phase C.     GOOGL →               
                       AMZN →                Industry: Consumer Electronics
                                             Country: US
```

---

### Tab: Key Metrics

**4 Sections in 2×2 Grid:**

**Price & Volume** (Source: Yahoo Finance)
```
Current Price         $213.49
52-Week High          $237.23
52-Week Low           $164.08
Market Cap            $3.28T
Shares Outstanding    15.20B
Beta                  1.21
```

**Valuation** (Source: Yahoo Finance – TTM)
```
P/E Ratio             32.4x
Forward P/E           28.1x
Price / Book          48.2x
Price / Sales         8.1x
FCF Yield             3.1%
EV / EBITDA           24.8x
```

**Profitability** (Source: Yahoo Finance – TTM)
```
Gross Margin          46.1%
Operating Margin      31.1%
Net Margin            26.1%
Revenue Growth        4.2%
Dividend Yield        0.5%
Payout Ratio          15.2%
```

**Management Effectiveness** (Source: Yahoo Finance – TTM)
```
Return on Equity      160.1%
Return on Assets      28.1%
Debt / Equity         1.81
Current Ratio         1.04
Quick Ratio           0.98
```

---

### Tab: Financials

**Sub-Tabs:** Income Statement | Balance Sheet | Cash Flow

**Annual · Source: Yahoo Finance / SEC EDGAR**

**Income Statement:**
```
Metric                  2024        2023        2022
Total Revenue           $391.0B     $383.3B     $394.3B
Gross Profit            $180.7B     $169.1B     $170.8B
Operating Income        $123.2B     $114.3B     $119.4B
Net Income              $93.7B      $97.0B      $99.8B
Operating Margin        31.5%       29.8%       30.3%
```

**Balance Sheet:**
```
Total Assets            $365.0B     ...
Total Liabilities       $308.0B     ...
Total Equity            $57.0B      ...
Debt/Equity Ratio       1.87        ...
```

**Cash Flow:**
```
Operating Cash Flow     $118.3B     ...
Investing Cash Flow     -$4.0B      ...
Financing Cash Flow     -$122.0B    ...
Free Cash Flow          $108.8B     ...
Capital Expenditures    -$9.4B      ...
```

---

### Tab: News
```
[ News ]
News feed coming in Phase C.
Requires NewsAPI integration · no placeholder data shown.
```
Kein Fake-Content, keine Fake-Quellen (Reuters/Bloomberg etc.)

---

### Tab: Order Book
```
[ Order Book ]
Live order book coming in Phase C.
Requires real-time market data feed.
```

---

### Tab: Learn

**3 Spalten:**

**Glossary** (links):
```
P/E RATIO     Price-to-Earnings: how much investors pay per $1...
EPS           Earnings Per Share: company profit divided by...
DCF           Discounted Cash Flow: valuation based on expected...
MOAT          Competitive advantage that protects market share...
FCF YIELD     Free Cash Flow / Market Cap: how much free cash...
BETA          Volatility relative to market. Beta > 1 = more volatile.
```

**About [TICKER]** (mitte):
- Voller Firmenname, Beschreibung (max 600 Zeichen)
- Sector, Industry, Country

**Data Sources** (rechts):
```
Yahoo Finance
Price, ratios, financials, company info
finance.yahoo.com

SEC EDGAR
Official filings: 10-K, 10-Q, 8-K
sec.gov/edgar

Groq AI
Plain-language summaries via Llama 3.3
groq.com

⚠ RESEARCH TOOL ONLY · NOT FINANCIAL ADVICE
```

---

## 8. Portfolio — `/app/portfolio`

### Header
```
[ Portfolio ]
Your investments.              Watchlist: 4 stocks    Today: —
```

### Tabs
```
POSITIONS  |  WATCHLIST  |  TRANSACTIONS  |  ACCOUNT
```
**Default: Tab 0 (Positions)**

---

**Positions (Tab 0):**
```
[ No positions ]
You have no open positions.
[Analyse a stock →]  → /app/stock?ticker=AAPL (kein leerer Stock-State)
```

**Watchlist (Tab 1):**
```
TICKER  COMPANY               PRICE     CHANGE           SECTOR     
AAPL    Apple Inc.            $213.49   +1.15 (+0.54%)   Technology  [Analyse]
NVDA    NVIDIA Corporation    $131.38   +2.44 (+1.89%)   Technology  [Analyse]
MSFT    Microsoft Corp.       $471.16   +3.22 (+0.69%)   Technology  [Analyse]
TSLA    Tesla, Inc.           $316.06   -4.82 (-1.50%)   Consumer    [Analyse]
```
- Hover: whileHover backgroundColor C[100] + transform translateX(4px) (kein paddingLeft)

**Transactions (Tab 2):**
```
[ No transactions ]
No buy/sell history yet.
```

**Account (Tab 3):**
```
[ Account ]

user@example.com
Free tier

───────────────────────
Available balance    —
Plan                 Free
Member since         2026

───────────────────────
[Log out]
```
- "Free tier" (NICHT "Phase 1" oder "Free tier · Phase 1")
- "Member since": von `user.createdAt` wenn verfügbar, sonst "2026"

---

## 9. Markets — `/app/markets`

### Header
```
[ Markets ]
What's moving today.              Gainers: 4    Losers: 2
```

### Tabs
```
TOP MOVERS  |  POPULAR STOCKS  |  COLLECTIONS  |  NEWS  |  CALENDAR
```

**Top Movers:**
- Sortiert nach absolutem |changePercent|, Gainers + Losers gemischt
- 6-Column Grid Cards

**Popular Stocks:**
- Kuratierte Liste nach Market Cap: AAPL, MSFT, NVDA, GOOGL, AMZN, TSLA
- NICHT identisch mit Top Movers

**Collections:**
```
Big Tech         [AAPL] [MSFT] [GOOGL] [META] [AMZN]
Semiconductors   [NVDA] [AMD] [INTC] [ASML]
EV & Energy      [TSLA]
Streaming        [NFLX] [META]
```
- Klick auf Collection: filtert die Movers-Ansicht (oder zeigt Placeholder)

**News:**
```
[ Market News ]
News coming in Phase 2.
Requires NewsAPI key.
```

**Calendar:**
- Monatskalender mit Navigation (← →)
- Heutiges Datum: `new Date()` (NIEMALS hardcoded)
- Events als farbige Chips: earnings (purple), dividend (green), holiday (gray)
- NVDA Aug 26 erscheint nur EINMAL (keine Duplikate)

---

## 10. Robo Advisor — `/app/robo`

### Header
```
[ Robo Advisor ]
Investing on autopilot.
Set your goal. Define your risk. pondex builds and rebalances automatically.
```

### Tabs
```
PORTFOLIO  |  SAVINGS PLANS  |  ROUND-UP  |  FORECASTS
```

**Portfolio Tab — Hauptinhalt:**

**How It Works (4 Schritte):**
```
( 01 )              ( 02 )              ( 03 )              ( 04 )
Define your         Set your risk       We build the        Automated
goal.               profile.            portfolio.          rebalancing.
```

**Portfolio Types:**
```
Core Portfolio              Growth Portfolio           Conservative Portfolio
Risk: Moderate              Risk: High                 Risk: Low
80% Equities · 20% Bonds   95% Equities · 5% Bonds   50% Equities · 50% Bonds
+8.2% p.a.                  +11.4% p.a.               +5.1% p.a.
Historical estimate only — not a guarantee
```

**CTA Banner (dunkel):**
```
Coming Q4 2026
Your automated portfolio. Sourced. Transparent. Yours.
[Start onboarding →]
Preview only · Not yet active
```

**Onboarding Flow (bei Klick auf "Start onboarding"):**
```
Progress Bar: ████░░░░ (1 von 4)

Question 1 of 4
What is your investment goal?
[Wealth building]  [Retirement]  [Large purchase]  [Income]

← Back  (geht einen Schritt zurück, NICHT zurück zur Übersicht)
```

**Ergebnis (nach Frage 4):**
- Scoring-Logik:
  - `answers[2] === 'Sell immediately'` OR `answers[1] === '< 1 year'` → Conservative
  - `answers[2] === 'Buy more'` AND `answers[1] === '10+ years'` → Growth
  - Sonst → Core
- "Your profile is ready. Based on your answers: **Growth Portfolio**. Coming Q4 2026."

**Andere Tabs:**
```
Savings Plans:   "Recurring investments coming Q4 2026."
Round-up:        "Spare change investing coming Q4 2026."
Forecasts:       "Portfolio projections coming Q4 2026."
```
(Kein "Phase 3" oder interne Roadmap-Sprache)

---

## 11. CFD — `/app/cfd`

### Header
```
[ CFD ]
Trade with leverage.
Contracts for Difference on stocks, indices, forex, and commodities.
```

### Stats Bar (4 Spalten, korrekte Werte)
```
Max Leverage    Asset Classes    Min Spread    Status
1:30            4                TBD           Preview
```
**NICHT:** "500+ Markets", "<10ms Execution", "0.1 pip Min Spread" — das sind fabricated specs

### Preview Banner
```
[ Preview data — not live. CFD trading coming Q4 2026. ]
```

### Risk Warning
```
⚠ Risk Warning: CFDs are complex instruments with a high risk of losing money due 
to leverage. Most retail investors lose money trading CFDs. pondex_ does not 
provide investment advice.
```

### Instruments Table
```
INSTRUMENT    TYPE        LEVERAGE    SPREAD    CHANGE    
S&P 500       Index       1:20        0.4       +0.82%    Coming soon
NASDAQ        Index       1:20        0.5       +1.24%    Coming soon
EUR/USD       Forex       1:30        0.1       -0.12%    Coming soon
Gold          Commodity   1:20        0.3       +0.44%    Coming soon
Oil (WTI)     Commodity   1:10        0.5       -1.02%    Coming soon
BTC/USD       Crypto      1:2         0.8       +2.18%    Coming soon
```
- Change-Spalte: grün/rot gefärbt
- "Coming soon" in jeder Zeile (kein Trade-Button)

### Phase CTA (dunkel)
```
Coming Q4 2026
Full CFD execution engine. Real leverage. Coming soon.
[Join waitlist →]  → Alert("You are on the waitlist.") — kein /signup
```

---

## 12. Zukünftige Seiten (noch nicht gebaut)

### `/app/account` (Phase D)
```
[ Account ]
user@example.com
Free tier

Email              user@example.com
Plan               Free
Member since       2026
Verdicts today     0 / 1

[Upgrade to Pro]
[Log out]
```

### `/app/stock/:ticker` nach Phase C
- Selbe Struktur wie aktuell, aber echte Daten (Yahoo Finance via Railway Backend)
- Chart: echte OHLCV-Daten statt illustrativer Daten
- News: echte Headlines via NewsAPI
- Header zeigt echten Preis + Change in Echtzeit (kein "Illustrative")

---

## 13. Routing & Auth

### Auth Guard
- Alle `/app/*` Routes haben `<AuthGuard>` — prüft `localStorage.getItem('pondex_user')`
- Nicht eingeloggt → redirect `/login`

### Wildcard Route
- `path="*"` → `<PageNotFound />` (existiert in `src/lib/PageNotFound.jsx`)
- NICHT `<Landing />` — User soll wissen dass Route fehlt

### Router basename
- `basename="/stockrater"` in `<BrowserRouter>`
- **Alle internen Links als `<Link to="...">` — niemals `<a href="...">`** (außer externe URLs)
- Externes Ausnahme: `<a href="https://..." target="_blank">` für Yahoo Finance etc.

### GitHub Pages 404
- `frontend/public/404.html` redirectet alle unbekannten Pfade zurück zur App
- `index.html` restauriert den Pfad aus `sessionStorage` beim ersten Load

---

## 14. Demo-Daten (Phase B — ohne Backend)

### Unterstützte Ticker (6 total)
```
AAPL  78/100  HOLD   Apple Inc.
NVDA  71/100  HOLD   NVIDIA Corporation
MSFT  84/100  BUY    Microsoft Corporation
TSLA  42/100  SELL   Tesla, Inc.
GOOGL 76/100  BUY    Alphabet Inc.
AMZN  65/100  HOLD   Amazon.com, Inc.
```

### Was pro Ticker verfügbar ist
- Score + Factors + Summary (App.jsx DEMO_DATA)
- Quote (Preis, Change, MarketCap, 52W High/Low, Beta, Sector) — DEMO_QUOTES
- Ratios (P/E, Margins, ROE etc.) — DEMO_RATIOS
- Financials (3 Jahre Income/Balance/CashFlow) — DEMO_FINANCIALS
- Chart (illustrative 252-Tage Kursdaten) — StockChart.jsx generateCandles()

### Für andere Ticker
- Error-State mit Demo-Ticker-Chips (kein leerer Screen)
- Text: "Ticker not found or not in demo set."

---

## 15. Sprachregeln & Copy

- Produktname: immer **pondex_** (lowercase + underscore) — nie "Poindex", "Pondex", "pondex"
- Ton: direkt, klar, minimal — keine Superlative, keine Buzzwords
- Disclaimer: immer "Research tool only · Not financial advice"
- Section Labels: immer `[ LABEL ]` — nie `( LABEL )`
- Zahlen: immer mit Quelle — "Source: Yahoo Finance", "Source: SEC EDGAR"
- Interne Roadmap-Sprache NIEMALS user-facing: kein "Phase 1", "Phase 3", "v1.0 internal"
  → Stattdessen: "Coming Q4 2026", "Coming soon", "Free tier"

---

## 16. Wichtige Nicht-Tuns (Don'ts)

| Don't | Warum | Stattdessen |
|---|---|---|
| Fake News-Headlines mit Reuters/Bloomberg | Trust-destroying, ICP Pain = untrustworthy signals | Empty State "News coming Phase C" |
| Math.random() in JSX-Render | Flickert bei jedem Re-Render | useMemo oder static data |
| Raw `href="/signup"` | 404 auf GitHub Pages (basename issue) | `<Link to="/signup">` |
| `new Date(2026, 6, 22)` hardcoded | Veraltet sofort | `new Date()` |
| Morningstar/Bloomberg/Reuters in LogosBar | Nicht integriert, factually false | Yahoo Finance, SEC EDGAR, Groq AI |
| AAPL $327.74 | Stale seit 2020 | Aktuelle Demo-Preise mit "Illustrative" label |
| "Phase 1", "Phase 3", "Wave 1" user-facing | Internes Jargon | "Free tier", "Coming Q4 2026", "n=45" |
| setOpen(false) ohne useState | ReferenceError | State immer deklarieren bevor verwenden |
| `whileHover={{ paddingLeft: '8px' }}` | Grid-Reflow | `transform: translateX(4px)` |
| Watchlist-Value als Dollar-Summe ohne Shares | Finanziell nonsensical | "4 stocks tracked" |

---

_Stand: 2026-07-24_
_Nächste Review: nach Phase C (Backend live)_
_Verweis-Docs: COUNCIL-AUDIT-2026-07-23.md · LANDING-PAGE-CONVERSION-GUIDE.md · BUNGEE-DESIGN-SYSTEM.md · APP-INFORMATION-ARCHITECTURE.md_
