# pondex — Roadmap
_Last updated: 2026-07-20 · Survey Wave 1 (n=56) + Wave 2 (n=35) + 3 depth interviews + Research Council (22 Experten) + Deep Research (107 Agents)_

---

## Gesamtüberblick

```
Phase A — Landing Page fertig        → Juli 2026      (diese Woche)
Phase B — App-Shell mit Demo         → August 2026    (nächste Woche)
Phase C — Auth (Login/Signup)        → August 2026    (Ende August)
Phase D — Echtes Backend + Daten     → Sept 2026
Phase E — Pro Tier + Stripe          → Sept–Okt 2026
Phase F — Growth + SEO               → Q4 2026
```

---

## Phase A — Landing Page fertigstellen
**Ziel:** Etwas Echtes das man Menschen zeigen kann. User Journey: Landing → App.
**Timeline:** 20.–22. Juli 2026 (2–3 Tage)
**Status:** 🟡 In Progress

### Architektur
```
/ (Landing Page)
├── Hero: "Still not sure where to invest"
├── Testimonials (Social Proof — direkt nach Hero)
├── How it Works (3 Schritte)
├── ProductDemo (Ticker eingeben → Demo-Score)
├── Differentiation (vs Yahoo/ChatGPT/Bloomberg)
├── Features
├── Pricing
├── FAQ
├── Final CTA
└── Footer

CTAs:
├── "Analyse a stock — it's free" → scrollt zu #demo
├── "Log in →" → /app  (vorerst direkt, kein Auth)
└── "Sign up" → /app   (vorerst direkt, kein Auth)
```

### Offene Tasks (priorität)
- [x] LP-1: Klick-Auslöser unter CTA ✅ 2026-07-20
- [x] LP-2: Social Proof vor Demo ✅ 2026-07-20
- [x] LP-5: Stats verständlicher ✅ 2026-07-20
- [ ] LP-3: Hero Visual — Score-Card Screenshot einbauen (30 min)
- [ ] LP-4: Testimonials — Initialen-Avatare statt Stock-Fotos (20 min)
- [ ] LP-6: Meta Tags + Open Graph in index.html (15 min)
- [ ] LP-7: GitHub Push + Live-URL deployen (15 min)

---

## Phase B — App-Shell mit Demo-Daten
**Ziel:** User die von der Landing Page kommen sehen eine funktionierende App (mit Demo-Daten).
**Timeline:** 23.–31. Juli 2026
**Status:** ⬜ Planned

### Architektur
```
/app
├── Dashboard (Watchlist + Portfolio als Mockup)
├── Analyse: Ticker eingeben → Demo-Score (wie ProductDemo auf LP)
│   ├── Scorecard Tab (Score 0–100)
│   ├── Chart Tab (mit 50/200-MA)
│   ├── Valuation Tab
│   └── weitere Tabs
└── Nav: Analyse / Watchlist / Portfolio / Account
```

### Tasks
- [ ] K: Score 0–100 (statt out of 5.0) — scoring.js + ScoreHero.jsx
- [ ] L: 50/200-Tage Moving Averages im Chart
- [ ] N: Tooltips für Fachbegriffe (ⓘ-Symbol)
- [ ] O: "Profile" → "Account" umbenennen
- [ ] P: Scroll-Indikator auf Analysis-Seite
- [ ] Dashboard-Page: Watchlist + Portfolio als schöne Mockup-Seite
- [ ] CTAs auf LP zu /app verlinken (Log in, Sign up)

---

## Phase C — Auth (Login / Signup)
**Ziel:** Echte User-Accounts. Retention messbar machen.
**Timeline:** 1.–15. August 2026
**Status:** ⬜ Planned

### Architektur
```
/login    → Email + Passwort → /app
/signup   → Email + Passwort → Onboarding → /app
/onboarding → 5 Fragen (Strategie, Risiko, Horizont, WHY)
```

### Tasks
- [ ] Supabase Auth einrichten (Email + Google)
- [ ] /login + /signup Pages
- [ ] 5-Fragen Onboarding Flow
- [ ] User-Profil in Supabase speichern
- [ ] Watchlist + Portfolio an User-Account koppeln
- [ ] Privacy Policy live (Pflicht vor Auth)

---

## Phase D — Echtes Backend + Live-Daten
**Ziel:** Echte Stock-Analyse mit Yahoo Finance + SEC EDGAR.
**Timeline:** 15. August – 15. September 2026
**Status:** ⬜ Planned

### Tasks
- [ ] Railway Backend deployen (FastAPI)
- [ ] Yahoo Finance Live-Daten (yfinance)
- [ ] SEC EDGAR Daten
- [ ] Groq AI Chat mit Source Attribution
- [ ] Error Monitoring: Sentry DSN auf Railway
- [ ] Rate-Limiting + Caching

---

## Phase E — Pro Tier + Stripe
**Ziel:** Erste zahlende User.
**Timeline:** September–Oktober 2026
**Status:** ⬜ Planned

### Tasks
- [ ] Stripe Integration (€4.99/Monat)
- [ ] Free Tier: 1 Verdict/Tag
- [ ] Pro Tier: Unlimited + Peer Comparison + Portfolio Tracker
- [ ] Paywall Disclaimer (regulatorisch)
- [ ] Van Westendorp Pricing Test auswerten

---

## Phase F — Growth + SEO
**Ziel:** Organischer Traffic. 1.000 zahlende User.
**Timeline:** Q4 2026
**Status:** ⬜ Planned

### Tasks
- [ ] SEO Landing Pages pro Persona (/value-investing, /passive-investor)
- [ ] Multilingual DE + ES
- [ ] Weekly Digest Email
- [ ] Verdict Track Record Feature
- [ ] Customizable Dashboard

---

## Strategische Entscheidungen (dokumentiert)

| Entscheidung | Gewählt | Warum |
|---|---|---|
| Auth Timing | Phase C (nicht sofort) | Erst echte User sehen, dann Gate |
| Demo vs. Live | Demo zuerst | Backend noch nicht produktionsreif |
| Score-Format | 0–100 | Gunnar + Patricia Interview (2/3 eindeutig) |
| Free Tier | 1 Verdict/Tag | Beweis vor Paywall |
| LP-Struktur | Hero → Social Proof → Demo | Vercel/Raycast Pattern (verifiziert) |
| Design-System | Grayscale #000–#D6D6D6 | Konsistent, premium, editorial |

---

## User Journey (End-to-End)

```
Besucher landet auf /
        ↓
Sieht Hero + "Analyse a stock"
        ↓
Tippt AAPL → sieht Demo-Score (kein Login nötig)
        ↓
Interessiert → "Sign up" → /signup
        ↓
Onboarding (Investor-Profil)
        ↓
/app → Dashboard → eigene Analyse
        ↓
Nach 1 Verdict/Tag → Upgrade-Prompt → Pro €4.99/mo
```

---

## Nächste 3 konkrete Schritte (heute)

1. **LP-3** — Hero Visual einbauen (Score-Card Screenshot oder Mockup)
2. **LP-4** — Initialen-Avatare G / P / J statt Stock-Fotos
3. **LP-6 + LP-7** — Meta Tags + GitHub Push → Live-URL

---

## Verweis-Dokumente

| Dokument | Inhalt |
|---|---|
| `docs/specs/LANDING-PAGE-PLAYBOOK.md` | Design + Copy Regeln |
| `docs/product/WEBSITE-COUNCIL.md` | Council-System für Website-Entscheidungen |
| `docs/CURRENT-TODOS.md` | Alle offenen Tasks |
| `docs/research/interviews/` | Gunnar, Patricia, José Interviews |
| `docs/research/surveys/` | Wave 1 + Wave 2 Analyse |
