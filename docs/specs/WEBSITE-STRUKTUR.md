# pondex_ — Website-Struktur

> Stand: 2026-07-20
> Basis: Research Wave 1+2 (n=91) + 3 Depth Interviews + Deep Research (107 Agents)

---

## Gesamt-Übersicht

```
pondex_
│
├── / (Landing Page)          ← Marketing, öffentlich
├── /login                    ← Auth Gate (Phase C)
├── /signup                   ← Auth Gate (Phase C)
├── /onboarding               ← Investor-Profil (Phase C)
│
└── /app (App Shell)          ← Nach Login
    ├── /app/analyse          ← Kernfunktion
    ├── /app/compare          ← Peer Comparison (Phase B)
    ├── /app/watchlist        ← Watchlist (Phase B)
    ├── /app/portfolio        ← Portfolio (Phase B)
    └── /app/account          ← Account-Einstellungen
```

---

## 1. Landing Page ( / )

**Nav:**
```
[p_ Logo]                              [Log in]  [+]
```
- Logo → /
- Log in → /login
- [+] → Hamburger Overlay mit Nav-Links

**Hamburger Overlay:**
```
( _01 )  How it works
( _02 )  Features
( _03 )  Pricing
( _04 )  FAQ
( _05 )  Contact

hi@pondex.app              LI / GH / X
```

**Sektionen (in Reihenfolge):**

| # | Section | Status | Research-Basis |
|---|---|---|---|
| 1 | Hero — Headline + CTA + Partikel | ✅ Live | — |
| 2 | Score Card — Gauge Aha-Moment | ✅ Live | MVP M1 |
| 3 | 🔲 Buy/Hold/Sell Verdict Banner | PLACEHOLDER | José Interview |
| 4 | Testimonials — G/P/J Cards | ✅ Live | 3 Interviews |
| 5 | How it Works — 3 Schritte | ✅ Live | Wave 1+2 |
| 6 | 🔲 Comparison Feature Teaser | PLACEHOLDER | #1 User Reaction |
| 7 | Interaktive Demo (Ticker eingeben) | ✅ Live | Wave 2: "proof it works" |
| 8 | 🔲 Investor-Profil Erklärung | PLACEHOLDER | Patricia Interview |
| 9 | Differentiation — vs. Yahoo/GPT | ✅ Live | Wave 2 Pain #1 |
| 10 | Feature Showcase | ✅ Live | Research Council M1-M4 |
| 11 | Pricing — Free + €4.99 Pro | ✅ Live | Wave 2 WTP 69% |
| 12 | FAQ | ✅ Live | — |
| 13 | Final CTA | ✅ Live | — |
| 14 | Footer + Newsletter | ✅ Live | — |

---

## 2. Auth-Seiten (Phase C)

### /login
```
┌─────────────────────────────────────┐
│  [p_ Logo]                          │
│                                     │
│  Welcome back.                      │
│                                     │
│  [Email ___________________]        │
│  [Password _________________]       │
│  [Log in →]                         │
│                                     │
│  Don't have an account? Sign up     │
│                                     │
│  ─────────── or ───────────         │
│  [Continue with Google]             │
└─────────────────────────────────────┘
```

### /signup
```
┌─────────────────────────────────────┐
│  [p_ Logo]                          │
│                                     │
│  Start for free.                    │
│  No credit card required.           │
│                                     │
│  [Email ___________________]        │
│  [Password _________________]       │
│  [Create account →]                 │
│                                     │
│  Already have an account? Log in    │
│                                     │
│  ─────────── or ───────────         │
│  [Continue with Google]             │
└─────────────────────────────────────┘
```

### /onboarding (5 Schritte)
```
Step 1/5  What's your investing strategy?
          [ Value ] [ Growth ] [ Dividend ] [ Momentum ]

Step 2/5  How would you describe your risk tolerance?
          [ Conservative ] [ Moderate ] [ Aggressive ]

Step 3/5  What's your typical investment horizon?
          [ < 1 year ] [ 1–3 years ] [ 3–10 years ] [ 10+ years ]

Step 4/5  How much are you typically investing?
          [ < €1k ] [ €1k–10k ] [ €10k–100k ] [ > €100k ]

Step 5/5  Why do you invest? (optional)
          [ Financial freedom ] [ Retirement ] [ Building wealth ]
          [ I want to learn ] [ Skip ]
```
→ Danach: /app/analyse

---

## 3. App Shell ( /app )

### Navigation (nach Login)
```
┌────────────────────────────────────────────────────┐
│  [p_ Logo]   Analyse  Compare  Watchlist  Portfolio │  [Account ↓]
└────────────────────────────────────────────────────┘
```

**Nav-Links:**
- `Analyse` → /app/analyse (Kern-Feature)
- `Compare` → /app/compare (Peer Comparison — Phase B)
- `Watchlist` → /app/watchlist (Phase B)
- `Portfolio` → /app/portfolio (Phase B)
- `[Account ↓]` → Dropdown: Settings / Billing / Log out

---

### /app/analyse — Analyse-Seite

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│  [AAPL ___________________] [Analyse →]             │
│  Recent: AAPL · NVDA · MSFT                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Apple Inc.  ·  AAPL  ·  NASDAQ                    │
│                                                     │
│  ┌──────────────────┐  ┌───────────────────────┐   │
│  │  VERDICT         │  │  PRICE CHART          │   │
│  │  78/100          │  │  1D · 1M · 6M · 1Y    │   │
│  │  ⬤ Good Fit      │  │  [Chart]              │   │
│  │  HOLD            │  │                       │   │
│  └──────────────────┘  └───────────────────────┘   │
│                                                     │
│  [ Scorecard ] [ Valuation ] [ Insider ] [ AI ]    │
│  ─────────────────────────────────────────────     │
│  [Tab Content]                                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**Tabs:**
- Scorecard — Faktoren + Quellen + Plain-Language
- Valuation — P/E, DCF, EV/EBITDA
- Insider — Kauf/Verkauf Transaktionen
- AI Chat — Quellenbasierter Chat
- News — Aktuelle Nachrichten
- Ownership — Institutionelle Inhaber

---

### /app/compare — Peer Comparison

**Layout:**
```
┌─────────────────────────────────────────────────────┐
│  Compare stocks side by side                        │
│                                                     │
│  [AAPL ___] vs [MSFT ___]  + Sector Average        │
│                                                     │
│         AAPL    MSFT    Sector Avg                  │
│  Score   78      84       71                        │
│  P/E     28x     32x      34x                       │
│  Margin  44%     44%      31%                       │
│  ...                                                │
└─────────────────────────────────────────────────────┘
```
**Research:** Stärkste Reaktion aller User-Tests.

---

### /app/watchlist

```
┌─────────────────────────────────────────────────────┐
│  My Watchlist                        [+ Add stock]  │
│                                                     │
│  AAPL  Apple Inc.      78 ⬤  Good Fit   $182.40    │
│  NVDA  NVIDIA Corp.    71 ⬤  Good Fit   $890.12    │
│  TSLA  Tesla Inc.      45 ⬤  Weak Fit   $238.10    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

### /app/portfolio

```
┌─────────────────────────────────────────────────────┐
│  Portfolio Overview                                 │
│                                                     │
│  Total Value: €12,450                               │
│  Avg Score:   74/100 ⬤                             │
│                                                     │
│  AAPL  30%   78 ⬤   +12.4%                        │
│  NVDA  25%   71 ⬤   +45.2%                        │
│  MSFT  20%   84 ⬤   +8.1%                         │
│  Cash  25%   —      —                              │
└─────────────────────────────────────────────────────┘
```

---

### /app/account

```
┌─────────────────────────────────────────────────────┐
│  Account                                            │
│                                                     │
│  Email:    daniel@example.com                       │
│  Plan:     Free (1 verdict/day)                     │
│  [Upgrade to Pro →]                                 │
│                                                     │
│  Investor Profile                                   │
│  Strategy:   Value                                  │
│  Risk:       Moderate                               │
│  Horizon:    3–10 years                             │
│  [Edit Profile]                                     │
│                                                     │
│  [Log out]                                          │
└─────────────────────────────────────────────────────┘
```

---

## 4. Design-System (beide Welten)

| Token | Wert | Verwendung |
|---|---|---|
| `C.black` | `#000000` | Headlines, Nav, CTAs |
| `C[600]` | `#242424` | Strong text |
| `C[400]` | `#656565` | Muted text |
| `C[200]` | `#AFAFAF` | Borders, Dividers |
| `C[100]` | `#D6D6D6` | Backgrounds |
| `C.white` | `#FFFFFF` | Page background |
| Score grün | `#16a34a` | Score ≥ 70 |
| Score amber | `#d97706` | Score 45–69 |
| Score rot | `#dc2626` | Score < 45 |

**Fonts:** `Interdisplay` (Headlines) · `Chivo Mono` (Labels/Mono)

---

## 5. User Journey

```
Besucher landet auf /
        ↓
Hero: Headline weckt Neugier
        ↓
Score Card scrollt rein → "Aha, das ist das Produkt"
        ↓
Testimonials + Demo → Vertrauen + Beweis
        ↓
Pricing → Free Tier, kein Risiko
        ↓
[Analyse a stock] → Demo ohne Login
        ↓
[Sign up] → /signup → Onboarding → /app/analyse
        ↓
1 Verdict/Tag kostenlos
        ↓
Nach N Verdicts: Upgrade-Prompt → €4.99/Monat
```

---

## 6. Noch offen / Nächste Schritte

| Phase | Was | Wann |
|---|---|---|
| A | ~~Landing Page fertig~~ | ✅ Jetzt |
| A | 3 Placeholders befüllen | Diese Woche |
| B | App-Shell im Bungee-Stil | 23.–31. Juli |
| C | Auth (Login/Signup/Onboarding) | August |
| D | Echtes Backend + Live-Daten | Sept |
| E | Stripe + Pro Tier | Sept–Okt |
