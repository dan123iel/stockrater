# pondex — Current To-Dos

_Last updated: 2026-07-22 · Großer App-Aufbau abgeschlossen_

> Single source of truth für aktive Tasks.
> Roadmap: `docs/specs/ROADMAP.md` · IA: `docs/specs/APP-INFORMATION-ARCHITECTURE.md`

---

## ✅ Heute erledigt (2026-07-22) — Zusammenfassung

### Design & Navigation
- [x] Jasper-Style Nav: Logo links, Links zentriert, Log in + Free Trial rechts ✅
- [x] AppNav (authenticated): Home · Portfolio · Markets · Robo Advisor · CFD · Stock + Search + Log out + Profile ✅
- [x] LandingNav (public): Product · Solutions · Resources · Company · Pricing ✅
- [x] Active Nav-State: aktuell aktive Seite hervorgehoben ✅
- [x] pondex_ Logo (PNG) in beiden Navbars ✅
- [x] Dev Grid ausgeschaltet (DEV_GRID = false) ✅
- [x] Bungee-Style Design Pass: alle App-Pages (Home, Portfolio, Markets, Robo, CFD, Stock) ✅
- [x] `bungee.js` Design-System mit headline, card, btn, stat, tab, row ✅

### App Pages — vollständig gebaut
- [x] **Home** (`/app`): Dashboard mit Live-Daten, Top Movers, Watchlist, Robo-Teaser, Events ✅
- [x] **Portfolio** (`/app/portfolio`): Watchlist mit Live-Preisen, 4 Tabs, Account ✅
- [x] **Markets** (`/app/markets`): Top Movers live, Collections, Calendar-Grid ✅
- [x] **Robo Advisor** (`/app/robo`): 4 Tabs + Onboarding-Flow ✅
- [x] **CFD** (`/app/cfd`): Instrumente-Tabelle, Risk Warning ✅
- [x] **Stock** (`/app/stock`): 6 Tabs nach IA-Spec ✅

### Stock Page — vollständig
- [x] **Price Chart**: Recharts Area-Chart, 1W/1M/3M/6M/1Y Range, Volume-Bar ✅
- [x] **Event-Marker im Chart**: lila Earnings-Linien mit E-Label, Legende ✅
- [x] **Key Metrics**: 4 Sektionen — Price & Volume, Valuation, Profitability, Management Effectiveness ✅
- [x] **Financials**: 3 Sub-Tabs — Income Statement, Balance Sheet, Cash Flow ✅
- [x] **Overview**: Chart + Verdict + Factor Breakdown + Events inline + Similar Stocks + About ✅
- [x] **News, Order Book, Learn** Tabs ✅

### Backend-Erweiterungen
- [x] `/financials` erweitert: Balance Sheet + Cash Flow Felder ✅
- [x] `/ratios` komplett: P/E, Forward P/E, P/B, P/S, ROE, ROA, Margen etc. ✅

### Calendar
- [x] Echter Monats-Grid in Markets > Calendar ✅
- [x] Navigation ← → zwischen Monaten ✅
- [x] Farbcodierung: lila Earnings, grün Dividend, grau Holiday ✅

---

## 🔴 Morgen — Priorität 1: Landing Page fixen

> **Problem:** Landing Page gefällt nicht — Sektionen unten ohne Funktion, Nav-Links ohne Ziel

### LP-NAV-1: Nav-Links mit Inhalten verbinden
- [ ] "Product" → scrollt zu `#features` Section (HowItWorks/Features)
- [ ] "Solutions" → scrollt zu `#how-it-works`
- [ ] "Resources" → scrollt zu `#faq`
- [ ] "Company" → scrollt zu `#testimonials` oder eigene Seite
- [ ] "Pricing" → scrollt zu `#pricing`
- [ ] Smooth-scroll implementieren

### LP-HERO-1: Hero neu gestalten
- [ ] Aktueller Hero wirkt zu leer unter dem Headline
- [ ] Score-Card Preview mit echten Daten (AAPL live vom Backend)
- [ ] Oder: Video-Background wieder einbauen (war vorher besser)
- [ ] "Start free trial" CTA klarer positionieren

### LP-CONTENT-1: Alle Sektionen der Landing Page prüfen
- [ ] HowItWorks: Inhalt stimmt — Grid-Ausrichtung prüfen
- [ ] ProductDemo: noch vorhanden? Funktioniert sie?
- [ ] Features: vollständig?
- [ ] Testimonials: G/P/J Stacking-Cards — noch da?
- [ ] Pricing: Free + Pro — aktuell?
- [ ] FAQ: Antworten vollständig?
- [ ] FinalCTA: Button funktioniert?
- [ ] Footer: Links vollständig?

### LP-DESIGN-1: Visual-Qualität
- [ ] Konsistenz mit App-Design (gleiche Fonts, gleiche Abstände)
- [ ] Hero-Visual überzeugender machen
- [ ] Mobile-Check (mindestens 768px)

---

## 🟡 Diese Woche — Code (Interview-validiert)

### K. Score 1–100 final (statt 1–10 Backend-Basis)
- [x] Score wird bereits als 0–100 angezeigt (fitScore * 20) ✅
- [ ] Backend-Berechnung prüfen: stimmt die Skala?

### L. 50/200-Tage Moving Average im Chart
- [ ] StockChart.jsx: SMA-Berechnung hinzufügen
- [ ] Toggle: Chart + SMA(50) + SMA(200) ein/ausblenden

### M. AI Chart-Interpretation
- [ ] Unter Chart: 2–3 Sätze Groq-generiert (Trend, RSI, Support/Resistance)
- [ ] Groq-Endpoint bereits vorhanden: `/ai/chat`

### N. Tooltips für Fachbegriffe
- [ ] Info-Symbol (ⓘ) neben DCF, Verdict, KGV, Forward-KGV, RSI
- [ ] Hover/Click → Plain-Language-Erklärung

### O. "Profile" → "Account" Seite bauen
- [ ] Route `/app/account` erstellen
- [ ] Zeigt: E-Mail, Plan, Logout, Einstellungen

### P. Scroll-Indikator auf Stock-Page
- [ ] Visueller Hinweis dass mehr Inhalt folgt

---

## 🟡 Phase C — Backend live (August 2026)

- [ ] Railway Backend: aktuell läuft es lokal — auf Railway deployen
- [ ] Frontend `VITE_API_URL` auf Railway-URL setzen
- [ ] Smoke Test: AAPL Score + Chart vom Live-Backend
- [ ] Sentry DSN auf Railway konfigurieren

---

## ⬜ Phase D — Auth (August 2026)

- [ ] Supabase Auth (Email + Google)
- [ ] Login/Signup Seiten mit echtem Auth verbinden (aktuell localStorage-Mock)
- [ ] 5-Fragen Onboarding nach Signup
- [ ] Score gewichtet nach User-Strategie
- [ ] Freemium Gate: 1 Verdict/Tag zählen

---

## ⬜ Phase E — Pro Tier + Stripe (Sept–Okt 2026)

- [ ] Stripe (€4.99/Monat, €49.99/Jahr)
- [ ] Free Tier Gate + Upgrade-Prompt
- [ ] Comparison Feature (Pro-only)

---

## 📍 Wo alles liegt

| Topic | File |
|---|---|
| IA Spec | `docs/specs/APP-INFORMATION-ARCHITECTURE.md` |
| Design Grid | `docs/specs/DESIGN-GRID.md` |
| Landing Page Playbook | `docs/specs/LANDING-PAGE-PLAYBOOK.md` |
| Revolut UI Referenz | `docs/research/competitors/revolut-ui-architecture.md` |
| Design System (Code) | `frontend/src/lib/bungee.js` |
| Grid System (Code) | `frontend/src/lib/grid.js` |
| Farb-Tokens | `frontend/src/lib/colors.js` |
| AppNav | `frontend/src/components/AppNav.jsx` |
| LandingNav | `frontend/src/components/landing/LandingNav.jsx` |
| Stock Chart | `frontend/src/components/StockChart.jsx` |
| Dev Grid toggle | `frontend/src/App.jsx` → `DEV_GRID` |

---

_Next: Landing Page fixen (LP-NAV-1, LP-HERO-1, LP-CONTENT-1) · dann Moving Averages im Chart_
