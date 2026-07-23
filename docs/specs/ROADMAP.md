# pondex — Roadmap
_Last updated: 2026-07-23 · Council Audit + App überarbeitet_

---

## Gesamtüberblick

| Phase | Was | Status | Timeline |
|---|---|---|---|
| **A** | Landing Page fertigstellen | ✅ Done | 2026-07-20 |
| **B** | MVP App mit vollständiger Demo-Erfahrung | ✅ Done | 2026-07-23 |
| **C** | Echtes Backend + Live-Daten | 🟡 Next | Aug 2026 |
| **D** | Auth (Supabase / Onboarding) | ⬜ Planned | Aug 2026 |
| **E** | Pro Tier + Stripe | ⬜ Planned | Sept–Okt 2026 |
| **E2** | Exit Strategy Feature | ⬜ Planned | Okt 2026 |
| **E3** | AI Features (Copilot, Explainer) | ⬜ Planned | Okt–Nov 2026 |
| **F** | Growth + SEO | ⬜ Planned | Q4 2026 |

---

## ✅ Phase A — Landing Page (Done: 2026-07-20)

**Live:** https://dan123iel.github.io/stockrater/
**Commit:** `cd2882c`, `5009f03`

### Was gebaut wurde
- Hero: clean fullscreen, Headline rotiert, Partikel-Hintergrund, Scroll-Indikator
- ScoreCardSection: Gauge (grün/gelb/rot) + Score + HOLD/BUY/SELL animiert rein
- Testimonials: Stacking-Cards Scroll-Animation (G/P/J Initialen-Avatare)
- HowItWorks: 3 Schritte (001/002/003)
- ProductDemo: interaktiver Ticker-Input mit Demo-Scores
- Differentiation: Yahoo/ChatGPT/Bloomberg vs. pondex_
- FeatureShowcase: 4 Features mit Research-Quotes
- Pricing: Free (€0) + Pro (€4.99) mit Toggle
- FAQ: 6 Fragen, accordion
- FinalCTA + Footer mit Newsletter

### Placeholders (noch zu bauen)
- 🔲 **Buy/Hold/Sell Verdict Banner** — José Interview: Klartextempfehlung ist der Conversion-Trigger
- 🔲 **Comparison Feature Teaser** — stärkste Reaktion aller User-Tests (Gunnar, Patricia, José)
- 🔲 **Investor-Profil Erklärung** — Score wird zu deiner Strategie gewichtet (Differenziator)

### Design-Entscheidungen
- Bungee-Stil (Hamburger Nav, große Typografie, Scroll-Animationen)
- Grayscale-Palette: #000–#D6D6D6 (tokens in `frontend/src/lib/colors.js`)
- Fonts: Interdisplay (Headlines) + Chivo Mono (Labels)
- Farben für Score: grün ≥70, amber 45–69, rot <45

---

## ✅ Phase B — MVP App mit vollständiger Demo-Erfahrung (Done: 2026-07-23)

**Live:** https://dan123iel.github.io/stockrater/app
**Commits:** `efb8a63`, `a47e7b0`, `0cac8ae`, `fa79b33`, `5eea358`, `099a3ca`

### Was gebaut wurde (2026-07-20)
- `/app` Route mit Ticker-Input
- Score 0–100 + Gauge-Animation + Buy/Hold/Sell Badge
- Plain-Language Summary + Factor Breakdown (5 Faktoren mit Erklärung + Bar + Quelle)
- Nav: Home, Portfolio, Markets, Robo Advisor, CFD
- Login / Signup (Demo-Auth)

### Council Audit + Überarbeitung (2026-07-23)
59-Agent Council Audit über alle 9 Seiten → 40+ Issues gefixed:

**App (Stock-Seite):**
- Vollständige Demo-Daten für 6 Ticker: Score + Quote + Ratios + Financials (3 Jahre)
- Illustrativer Price Chart (generierte Kursdaten, klar als Illustrativ markiert)
- Alle 6 Tabs funktionieren: Overview, Key Metrics, Financials, News (empty state), Order Book (empty state), Learn
- Echte Peer-Map pro Ticker (TSLA → AMZN/GOOGL/NVDA, nicht immer Big Tech)
- useEffect fix: stale ticker bei Navigation behoben
- Error-State: Demo-Ticker Chips statt kryptische Fehlermeldung

**Navigation & Routing:**
- AppNav: kein setSearchOpen-Crash mehr, Profile → /app/portfolio, kein "Stock"-Nav-Item
- Alle `/signup`-Links via React Router (keine 404 auf GitHub Pages mehr)
- Mobile Nav: Hamburger-Button + Close, richtige Scroll-Anchors

**Realism / Trust:**
- AAPL Preis $327.74 → $213.49 + "Illustrative" Label
- Morningstar/Bloomberg/Reuters aus LogosBar entfernt → nur Yahoo Finance, SEC EDGAR, Groq AI
- Fake Reuters/Bloomberg News-Tab → sauberer Empty State
- Order Book Math.random() → sauberer Empty State
- Demo-Banner auf Login/Signup
- CFD: kein "500+ Markets" / "<10ms Execution" mehr, Preview-Banner

**UX-Fixes:**
- RoboAdvisor: echte Scoring-Logik (Conservative/Core/Growth), Back-Button geht einen Schritt zurück
- Markets: CalendarView heute korrekt (`new Date()`), Popular Stocks ≠ Top Movers
- Portfolio: Default-Tab = Positions (nicht Watchlist), "Free tier" statt "Phase 1"
- Home: Time-of-Day Greeting, META → AMZN, Watchlist-Label ohne Dollar-Summe
- Signup: Onboarding-Flow → `/app/stock?ticker=AAPL` beim ersten Login

**Design System:**
- `colors.js`: `C.up`, `C.down`, `C.warn`, `C.earnings` Tokens hinzugefügt
- LandingNav Labels: How It Works / Demo / Features / Reviews / Pricing

### Demo-Daten (6 Stocks — alle Tabs)
| Ticker | Score | Verdict | Chart | Financials | Key Metrics |
|---|---|---|---|---|---|
| AAPL | 78 | HOLD | ✅ Illustrativ | ✅ 3 Jahre | ✅ |
| NVDA | 71 | HOLD | ✅ Illustrativ | ✅ 3 Jahre | ✅ |
| MSFT | 84 | BUY | ✅ Illustrativ | ✅ 3 Jahre | ✅ |
| TSLA | 42 | SELL | ✅ Illustrativ | ✅ 3 Jahre | ✅ |
| GOOGL | 76 | BUY | ✅ Illustrativ | ✅ 3 Jahre | ✅ |
| AMZN | 65 | HOLD | ✅ Illustrativ | ✅ 3 Jahre | ✅ |

### User Journey aktuell
```
/ (Landing) → [Free Trial] → /signup → /app/stock?ticker=AAPL (Onboarding)
/ (Landing) → [Log in] → /login → /app (Home)
/app → Search Bar → /app/stock?ticker=XXX → Score + alle Tabs
```

### Was noch fehlt für echte Nutzung
- Echtes Backend Railway (Phase C)
- Supabase Auth (Phase D)
- 1 Verdict/Tag Gate (Phase D/E)

---

## 🟡 Phase C — Echtes Backend + Live-Daten (Next)

**Ziel:** /app zeigt echte Scores für beliebige Ticker
**Timeline:** August 2026

### Tasks
- [ ] Railway Backend deployen (FastAPI läuft lokal, `backend/`)
- [ ] `SENTRY_DSN` + `VITE_API_URL` auf Railway/GitHub Secrets setzen
- [ ] Frontend: API-Call zu Railway statt Demo-Daten
- [ ] yfinance Rate-Limit testen + Caching (Redis oder in-memory)
- [ ] Fehlerhandling: "Ticker not found", API-Timeout etc.
- [ ] Demo Quote-Stubs als Backend-Fallback (Home/Portfolio/Markets zeigen $0 ohne Backend)
- [ ] Smoke Test: AAPL → echte Score stimmt mit Demo überein

### Architektur
```
/app Frontend → Railway API → yfinance + SEC EDGAR → Score
```

---

## ⬜ Phase D — Auth (Login / Signup / Onboarding)

**Ziel:** Echte User-Accounts. Free Tier: 1 Verdict/Tag messbar.
**Timeline:** August 2026 (nach Phase C)

### Tasks
- [ ] Supabase Auth einrichten (Email + Google)
- [ ] Demo-Auth (`setTimeout`) durch Supabase ersetzen
- [ ] `createdAt` Timestamp bei Signup speichern (für "Member since")
- [ ] 5-Fragen Onboarding (Strategie, Risiko, Horizont, Portfoliogröße, WHY)
- [ ] Score gewichtet nach User-Strategie (Value/Growth/Dividend/Momentum)
- [ ] Freemium Gate: 1 Verdict/Tag via localStorage-Counter + Upgrade-Modal
- [ ] `/app/account` Route + Page (Profile Button ist aktuell Workaround auf /app/portfolio)
- [ ] Privacy Policy live (Pflicht vor Auth, GDPR)

---

## ⬜ Phase E — Pro Tier + Stripe

**Ziel:** Erste zahlende User.
**Timeline:** September–Oktober 2026

### Tasks
- [ ] Stripe Integration (€4.99/Monat, €49.99/Jahr)
- [ ] Free Tier Gate: nach 1 Verdict/Tag → Upgrade-Prompt
- [ ] Pro Features: Unlimited + Comparison + Portfolio Tracker
- [ ] Paywall Disclaimer (regulatorisch)
- [ ] Van Westendorp Pricing Test auswerten

---

## ⬜ Phase E2 — Exit Strategy Feature

**Ziel:** User können nicht nur kaufen, sondern auch wissen *wann zu verkaufen*.
**Timeline:** Oktober 2026

### Konzept
- User gibt Ticker + optional Einstiegspreis + Haltedauer ein
- pondex_ berechnet: Exit-Score (0–100) + Empfehlung: HOLD / TRIM / EXIT
- Faktoren: RSI Überkauft, P/E vs. Sektor, Trend-Umkehr, Fundamentalverschlechterung

### Tasks
- [ ] Exit-Score-Logik definieren
- [ ] Backend: `/exit` Endpoint (FastAPI)
- [ ] Frontend: neuer Tab „Exit Check" in `/app/stock`
- [ ] Demo-Daten: TSLA (EXIT), AAPL (HOLD), NVDA (TRIM)
- [ ] LP-Erwähnung: in FeatureShowcase aufnehmen

---

## ⬜ Phase E3 — AI Features (Copilot + Explainer)

**Ziel:** AI als Kern-Differenziator.
**Timeline:** Oktober–November 2026

### Tasks
- [ ] Groq API Key + Rate-Limit-Strategie
- [ ] Score Explainer: `/explain/{ticker}` Endpoint
- [ ] Explainer in `/app/stock` unter Factor Breakdown
- [ ] Investment Copilot: Chat-UI (Pro-Feature)
- [ ] Quellenangaben in AI-Output erzwingen (Wave 1: 71% WTP-Kondition)
- [ ] Disclaimer-Banner über AI-Modul

---

## ⬜ Phase F — Growth + SEO

**Ziel:** Organischer Traffic. 1.000 zahlende User.
**Timeline:** Q4 2026

### Tasks
- [ ] SEO Landing Pages pro Persona (/value-investing, /passive-investor)
- [ ] Meta Tags bereits live ✅
- [ ] Weekly Digest Email (Supabase Edge Function)
- [ ] Multilingual DE + ES
- [ ] Verdict Track Record Feature (braucht 6+ Monate Daten)

---

## Offene LP-Placeholders (Phase A Restarbeit)

### 🔲 1. Buy/Hold/Sell Verdict Banner
- **Format:** Fullwidth, schwarz: „HOLD · 78/100 · GOOD FIT"
- **Warum:** José: vertraut Gemini wegen Klartextempfehlung
- **Platzierung:** Nach ScoreCardSection, vor Testimonials

### 🔲 2. Comparison Feature Teaser
- **Format:** 2 Aktien nebeneinander + Sektor-Average
- **Warum:** Stärkste Reaktion aller 3 Interviews
- **Platzierung:** Nach HowItWorks, vor ProductDemo

### 🔲 3. Investor-Profil Erklärung
- **Format:** 4 Investor-Typen → je anderer Score
- **Warum:** Differenziator. Patricia: „Das Tool muss mich kennen."
- **Platzierung:** Nach ProductDemo, vor Differentiation

---

## Strategische Entscheidungen

| Entscheidung | Gewählt | Warum |
|---|---|---|
| Design-System | Bungee-Stil, Grayscale | Premium, editorial, minimalistisch |
| Score-Format | 0–100 | Gunnar + Patricia Interview |
| Free Tier | 1 Verdict/Tag | Beweis vor Paywall — Wave 2 |
| Auth Timing | Phase D (nach echten Daten) | Erst Proof, dann Gate |
| MVP Scope | Ticker → Score + alle Tabs | Council Audit: volle Demo-Erfahrung nötig |
| Demo-Daten | 6 Stocks, alle Tabs | Backend noch nicht produktionsreif |
| Chart | Illustrative synthetische Daten | Besser als "Chart unavailable" |

---

## URLs

| | URL |
|---|---|
| Landing Page (live) | https://dan123iel.github.io/stockrater/ |
| App (live) | https://dan123iel.github.io/stockrater/app |
| Dev Server | http://localhost:5174/stockrater/ |
| Backend (Railway) | https://stockrater-production.up.railway.app |
| GitHub Repo | https://github.com/dan123iel/stockrater |

---

## Verweis-Dokumente

| Dokument | Inhalt |
|---|---|
| `docs/specs/WEBSITE-STRUKTUR.md` | Vollständige Website-Struktur + Nav + Wireframes |
| `docs/specs/LANDING-PAGE-PLAYBOOK.md` | Design + Copy Regeln, Deep Research Findings |
| `docs/product/WEBSITE-COUNCIL.md` | 3-Ebenen Council für Website-Entscheidungen |
| `docs/COUNCIL-AUDIT-2026-07-23.md` | Vollständiger Council Audit (59 Agents, 9 Seiten) |
| `docs/CURRENT-TODOS.md` | Alle offenen Tasks |
| `frontend/src/lib/colors.js` | Design-Tokens (Farben inkl. C.up/C.down/C.warn) |
| `frontend/src/pages/App.jsx` | Stock-Detail-Seite (alle Tabs + vollständige Demo-Daten) |
| `frontend/src/pages/Landing.jsx` | Landing Page |


---

## Gesamtüberblick

| Phase | Was | Status | Timeline |
|---|---|---|---|
| **A** | Landing Page fertigstellen | ✅ Done | 2026-07-20 |
| **B** | MVP App (/app) mit Demo-Daten | ✅ Done | 2026-07-20 |
| **C** | Echtes Backend + Live-Daten | 🟡 Next | Aug 2026 |
| **D** | Auth (Login / Signup / Onboarding) | ⬜ Planned | Aug 2026 |
| **E** | Pro Tier + Stripe | ⬜ Planned | Sept–Okt 2026 |
| **E2** | Exit Strategy Feature | ⬜ Planned | Okt 2026 |
| **E3** | AI Features (Copilot, Explainer) | ⬜ Planned | Okt–Nov 2026 |
| **F** | Growth + SEO | ⬜ Planned | Q4 2026 |

---

## ✅ Phase A — Landing Page (Done: 2026-07-20)

**Live:** https://dan123iel.github.io/stockrater/
**Commit:** `cd2882c`, `5009f03`

### Was gebaut wurde
- Hero: clean fullscreen, Headline rotiert, Partikel-Hintergrund, Scroll-Indikator
- ScoreCardSection: Gauge (grün/gelb/rot) + Score + HOLD/BUY/SELL animiert rein
- Testimonials: Stacking-Cards Scroll-Animation (G/P/J Initialen-Avatare)
- HowItWorks: 3 Schritte (001/002/003)
- ProductDemo: interaktiver Ticker-Input mit Demo-Scores
- Differentiation: Yahoo/ChatGPT/Bloomberg vs. pondex_
- FeatureShowcase: 4 Features mit Research-Quotes
- Pricing: Free (€0) + Pro (€4.99) mit Toggle
- FAQ: 6 Fragen, accordion
- FinalCTA + Footer mit Newsletter

### Placeholders (noch zu bauen)
- 🔲 **Buy/Hold/Sell Verdict Banner** — José Interview: Klartextempfehlung ist der Conversion-Trigger
- 🔲 **Comparison Feature Teaser** — stärkste Reaktion aller User-Tests (Gunnar, Patricia, José)
- 🔲 **Investor-Profil Erklärung** — Score wird zu deiner Strategie gewichtet (Differenziator)

### Design-Entscheidungen
- Bungee-Stil (Hamburger Nav, große Typografie, Scroll-Animationen)
- Grayscale-Palette: #000–#D6D6D6 (tokens in `frontend/src/lib/colors.js`)
- Fonts: Interdisplay (Headlines) + Chivo Mono (Labels)
- Farben für Score: grün ≥70, amber 45–69, rot <45

---

## ✅ Phase B — MVP App (Done: 2026-07-20)

**Live:** https://dan123iel.github.io/stockrater/app
**Commit:** `efb8a63`

### Was gebaut wurde
- `/app` Route: eine saubere Seite, kein Schnickschnack
- Ticker-Input + Quick-Picks (AAPL, NVDA, MSFT, TSLA, GOOGL, AMZN)
- Score 0–100 + Gauge-Animation + Buy/Hold/Sell Badge (farbig)
- Plain-Language Summary (1–2 Sätze)
- Factor Breakdown: 5 Faktoren, je mit Erklärung + Bar + Quelle
- Disclaimer Footer
- Nav: Logo → / zurück, DEMO Badge

### Demo-Daten (6 Stocks)
| Ticker | Score | Verdict |
|---|---|---|
| AAPL | 78 | HOLD |
| NVDA | 71 | HOLD |
| MSFT | 84 | BUY |
| TSLA | 42 | SELL |
| GOOGL | 76 | BUY |
| AMZN | 65 | HOLD |

### User Journey aktuell
```
/ (Landing) → [Analyse a stock] → /app → Ticker eingeben → Score + Verdict
```

### Was noch fehlt für echte Nutzung
- Echte Daten (Backend Railway + Yahoo Finance)
- Auth (Phase D)

---

## 🟡 Phase C — Echtes Backend + Live-Daten (Next)

**Ziel:** /app zeigt echte Scores für beliebige Ticker
**Timeline:** August 2026

### Tasks
- [ ] Railway Backend deployen (FastAPI läuft lokal, `backend/`)
- [ ] `SENTRY_DSN` auf Railway setzen
- [ ] Frontend: API-Call zu Railway statt Demo-Daten
- [ ] yfinance Rate-Limit testen + Caching
- [ ] Fehlerhandling: "Ticker not found", API-Timeout etc.
- [ ] Smoke Test: AAPL → echte Score stimmt mit Demo überein

### Architektur
```
/app Frontend → Railway API → yfinance + SEC EDGAR → Score
```

---

## ⬜ Phase D — Auth (Login / Signup / Onboarding)

**Ziel:** Echte User-Accounts. Free Tier: 1 Verdict/Tag messbar.
**Timeline:** August 2026 (nach Phase C)

### Tasks
- [ ] Supabase Auth einrichten (Email + Google)
- [ ] `/login` + `/signup` Pages im Bungee-Stil
- [ ] 5-Fragen Onboarding (Strategie, Risiko, Horizont, Portfoliogröße, WHY)
- [ ] Score gewichtet nach User-Strategie (Value/Growth/Dividend/Momentum)
- [ ] Freemium Gate: 1 Verdict/Tag zählen
- [ ] Privacy Policy live (Pflicht vor Auth)

### Research-Basis
- Patricia: „Das Tool muss mich kennen"
- Wave 2: 46% brauchen Proof first → Free Tier löst das
- GL-Churner: Retention hängt an WHY (persönliche Ziele)

---

## ⬜ Phase E — Pro Tier + Stripe

**Ziel:** Erste zahlende User.
**Timeline:** September–Oktober 2026

### Tasks
- [ ] Stripe Integration (€4.99/Monat, €49.99/Jahr)
- [ ] Free Tier Gate: nach 1 Verdict/Tag → Upgrade-Prompt
- [ ] Pro Features: Unlimited + Comparison + Portfolio Tracker
- [ ] Paywall Disclaimer (regulatorisch)
- [ ] Van Westendorp Pricing Test auswerten

### Research-Basis
- Wave 2: 69% offen für €4.99 (3 Hard-Yes + 17 Maybe)
- Barrier ist nicht Preis, sondern Proof — deshalb Free Tier zuerst

---

## ⬜ Phase E2 — Exit Strategy Feature

**Ziel:** User können nicht nur kaufen, sondern auch wissen *wann zu verkaufen*.
**Timeline:** Oktober 2026 (nach Phase E)

### Konzept
Ein dedizierter „Exit Check" für eine gehaltene Position:
- User gibt Ticker + optional Einstiegspreis + Haltedauer ein
- pondex_ berechnet: Exit-Score (0–100) + Empfehlung: HOLD / TRIM / EXIT
- Anzeige: Momentum-Trend, Überbewertungs-Signal, Stop-Loss-Vorschlag

### Tasks
- [ ] Exit-Score-Logik definieren (Faktoren: RSI Überkauft, P/E vs. Sektor, Trend-Umkehr, Fundamentalverschlechterung)
- [ ] Backend: `/exit` Endpoint (FastAPI)
- [ ] Frontend: neuer Tab „Exit Check" in `/app`
- [ ] Demo-Daten: TSLA (EXIT), AAPL (HOLD), NVDA (TRIM)
- [ ] Copy: erklären was ein Exit-Signal bedeutet (nicht Panikverkauf)
- [ ] LP-Erwähnung: in FeatureShowcase aufnehmen

### Research-Basis
- Wave 1: Signal/Noise = #1 Pain — User wissen nicht WANN zu verkaufen
- Differenziert von Bloomberg/Yahoo: die zeigen nur Buy-Side
- Günstiger psychologischer Anker: „pondex_ schützt vor schlechten Exits"

---

## ⬜ Phase E3 — AI Features (Copilot + Explainer)

**Ziel:** AI als Kern-Differenziator — nicht Hype, sondern konkrete Entscheidungshilfe.
**Timeline:** Oktober–November 2026

### Konzept
Zwei AI-Module:

**1. Score Explainer (Groq / llama3)**
- Plain-Language-Erklärung warum Score X — automatisch generiert
- Heute: 1–2 hartcodierte Sätze; AI macht es dynamisch + quellenbasiert
- Format: „MSFT scored 84 because… [3 bullet reasons with source]"

**2. Investment Copilot (Chat)**
- User kann Fragen stellen: „Soll ich bei diesem Score nachkaufen?"
- Context-aware: kennt Score, Faktoren, User-Profil (Phase D)
- Kein Finanzberater-Ersatz — klarer Disclaimer, immer Quellenangabe
- Pro-Feature (Phase E)

### Tasks
- [ ] Groq API Key einrichten + Rate-Limit-Strategie
- [ ] Score Explainer: Backend Endpoint `/explain/{ticker}`
- [ ] Explainer in `/app` integrieren (unter Factor Breakdown)
- [ ] Copilot: Chat-UI Mockup (minimal, kein Bloat)
- [ ] Copilot: Kontext-Injection (Score + Faktoren als System-Prompt)
- [ ] Quellenangaben in AI-Output erzwingen (Wave 1: 71% WTP nur mit Quellen)
- [ ] Disclaimer-Banner über AI-Modul
- [ ] LP: AI-Abschnitt in FeatureShowcase + Differentiation-Section updaten

### Research-Basis
- Wave 1: 71% WTP nur mit Quellenangaben — AI muss erklären können
- Differenziert von ChatGPT: pondex_ AI kennt echte Finanzdaten, kein Halluzinationsrisiko
- Groq bereits in Tech-Stack (laut PRODUCT-JOURNEY.md)

---

## ⬜ Phase F — Growth + SEO

**Ziel:** Organischer Traffic. 1.000 zahlende User.
**Timeline:** Q4 2026

### Tasks
- [ ] SEO Landing Pages pro Persona (/value-investing, /passive-investor)
- [ ] Meta Tags bereits live ✅
- [ ] Weekly Digest Email (Supabase Edge Function)
- [ ] Multilingual DE + ES
- [ ] Verdict Track Record Feature (Phase 3 — braucht 6+ Monate Daten)

---

## Offene LP-Placeholders (Phase A Restarbeit)

Diese 3 Sections fehlen noch auf der Landing Page:

### 🔲 1. Buy/Hold/Sell Verdict Banner
- **Format:** Fullwidth, schwarz, große Typografie: „HOLD · 78/100 · GOOD FIT"
- **Warum:** José: vertraut Gemini wegen Klartextempfehlung. Research Council MVP M1.
- **Platzierung:** Nach ScoreCardSection, vor Testimonials

### 🔲 2. Comparison Feature Teaser
- **Format:** 2 Aktien nebeneinander + Sektor-Average als 3. Spalte
- **Warum:** Stärkste Reaktion aller 3 Interviews. José: „That's how you make a decision."
- **Platzierung:** Nach HowItWorks, vor ProductDemo

### 🔲 3. Investor-Profil Erklärung
- **Format:** 4 Investor-Typen → je anderer Score für dieselbe Aktie
- **Warum:** Differenziator. Patricia: „Das Tool muss mich kennen."
- **Platzierung:** Nach ProductDemo, vor Differentiation

---

## Strategische Entscheidungen (dokumentiert)

| Entscheidung | Gewählt | Warum |
|---|---|---|
| Design-System | Bungee-Stil, Grayscale | Premium, editorial, minimalistisch |
| Score-Format | 0–100 | Gunnar + Patricia Interview |
| Free Tier | 1 Verdict/Tag | Beweis vor Paywall — Wave 2 |
| Auth Timing | Phase D (nach echten Daten) | Erst Proof, dann Gate |
| MVP Scope | Nur Ticker → Score | Patricia: „Focus MVP on one target group" |
| Old Frontend | Archiviert in `_archive/` | Neubau im Bungee-Stil |
| Demo-Daten | 6 Stocks hardcoded | Backend noch nicht produktionsreif |

---

## URLs

| | URL |
|---|---|
| Landing Page (live) | https://dan123iel.github.io/stockrater/ |
| App (live) | https://dan123iel.github.io/stockrater/app |
| Dev Server | http://localhost:5173/stockrater/ |
| Backend (Railway) | https://stockrater-production.up.railway.app |
| GitHub Repo | https://github.com/dan123iel/stockrater |

---

## Verweis-Dokumente

| Dokument | Inhalt |
|---|---|
| `docs/specs/WEBSITE-STRUKTUR.md` | Vollständige Website-Struktur + Nav + Wireframes |
| `docs/specs/LANDING-PAGE-PLAYBOOK.md` | Design + Copy Regeln, Deep Research Findings |
| `docs/product/WEBSITE-COUNCIL.md` | 3-Ebenen Council für Website-Entscheidungen |
| `docs/CURRENT-TODOS.md` | Alle offenen Tasks |
| `frontend/src/lib/colors.js` | Design-Tokens (Farben) |
| `frontend/src/pages/App.jsx` | MVP App-Seite |
| `frontend/src/pages/Landing.jsx` | Landing Page |
| `frontend/src/_archive/` | Altes App-Frontend (archiviert) |
