# pondex — Roadmap
_Last updated: 2026-07-20 · Stand nach Phase A + MVP App_

---

## Gesamtüberblick

| Phase | Was | Status | Timeline |
|---|---|---|---|
| **A** | Landing Page fertigstellen | ✅ Done | 2026-07-20 |
| **B** | MVP App (/app) mit Demo-Daten | ✅ Done | 2026-07-20 |
| **C** | Echtes Backend + Live-Daten | 🟡 Next | Aug 2026 |
| **D** | Auth (Login / Signup / Onboarding) | ⬜ Planned | Aug 2026 |
| **E** | Pro Tier + Stripe | ⬜ Planned | Sept–Okt 2026 |
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
