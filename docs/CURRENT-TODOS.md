# pondex — Current To-Dos

_Last updated: 2026-07-29 · Großer App + Landing Page Überarbeitung_

> Single source of truth für aktive Tasks.
> Roadmap: `docs/specs/ROADMAP.md` · IA: `docs/specs/APP-INFORMATION-ARCHITECTURE.md`

---

## ✅ Heute erledigt (2026-07-29) — Zusammenfassung

### App — FintechX Redesign
- [x] AppShell komplett neu: dunkle Sidebar, weiße aktive Nav-Box, grauer Topbar ✅
- [x] FintechX-Layout: Financial Command Hero, 4 Stat-Cards, Investment Performance Chart ✅
- [x] Dashboard Customize Mode: Widgets drag & drop, hinzufügen, entfernen ✅
- [x] Mobile Bottom Tab Bar (5 Tabs, dark bg, lila aktiv) ✅
- [x] Hover-States überall (Nav, Buttons, Avatar-Dropdown) ✅
- [x] Search expandiert on focus + lila Ring ✅
- [x] Scroll-Progress-Bar unter Topbar ✅
- [x] Avatar-Dropdown mit Account/Settings/Sign out + Keyboard-Support ✅

### App — Neue Seiten
- [x] **Portfolio** (`/app/portfolio`): Holdings-Tabelle, P&L, Add/Remove, Watchlist-Tab ✅
- [x] **Markets** (`/app/markets`): Top Movers Toggle, Collections, Events Calendar ✅
- [x] **Robo Advisor** (`/app/robo`): 3 Portfolios (Conservative/Core/Growth), Onboarding-Steps ✅
- [x] **CFD** (`/app/cfd`): Instrumente-Tabelle, Risk Warning, Category-Filter ✅
- [x] **Compare** (`/app/compare`): 2 Stock-Pickers, 13-Zeilen Vergleichstabelle, Winner-Highlight ✅

### App — Stock-Seite Verbesserungen
- [x] SMA 50 + SMA 200 Toggle-Buttons im Chart ✅
- [x] TermTooltip: ⓘ Info-Icon auf P/E, FCF, Beta etc. → Popover-Definition ✅
- [x] Source Badges: `📊 Yahoo Finance · TTM` überall ✅
- [x] Compare in Nav (GitCompare Icon) ✅

### Infrastructure
- [x] Skeleton Loaders (shimmer CSS animation) ✅
- [x] Accessibility: role="navigation", aria-labels, aria-expanded, keyboard nav ✅
- [x] CSS-Variablen konsolidiert (--color-up/down/hold etc.) ✅
- [x] CSS-Klassen (card-flat, btn-dark, badge-*) in styles.css ✅

### Landing Page
- [x] VerdictBanner: scrollende Verdict-Cards (AAPL/MSFT/TSLA etc.) ✅
- [x] CompareTeaser: Side-by-side AAPL vs MSFT mit Sector-Avg ✅
- [x] InvestorProfile: 4 Investor-Typen, gleiche Aktie = 4 verschiedene Scores ✅

---

## 🔴 Kritisch — Blockiert echte Nutzung

### C. Railway Backend deployen
- [ ] FastAPI lokal → Railway deployen
- [ ] `VITE_API_URL` auf Railway-URL setzen (GitHub Secret)
- [ ] Frontend: API-Call zu Railway statt Demo-Daten
- [ ] Smoke Test: AAPL → echte Score stimmt mit Demo überein
- [ ] yfinance Rate-Limit + Caching testen

### D. Auth reaktivieren (Supabase)
- [ ] `_authenticated/route.tsx` Guard reaktivieren (aktuell bypass)
- [ ] Supabase Email + Google + Apple Login vollständig testen
- [ ] 5-Fragen Onboarding nach Signup einbauen
- [ ] Score gewichtet nach User-Strategie (Value/Growth/Dividend/Momentum)
- [ ] Freemium Gate: 1 Verdict/Tag zählen + Upgrade-Modal

---

## 🟡 App-Features noch offen

### Stock-Seite
- [ ] **Similar Stocks** — horizontal scrollable Peer-Liste auf Overview Tab
- [ ] **AI Chart Interpretation** — 2-3 Groq-Sätze unter Chart (Task M)
- [ ] **Insights Tab** — Deep-Dive: Fundamentals / Analysten / Technisch / Sentiment

### Dashboard
- [ ] **Empty state** für neue User (noch keine Watchlist/Portfolio)
- [ ] **Recently analysed** — letzte 5 gesuchten Stocks als Chips

### Markets
- [ ] **News Tab** — News-Feed (momentan nur in Stock-Detail)
- [ ] **Dynamischer Calendar** — Events aus Portfolio/Watchlist des Users

### Auth/Account
- [ ] **Account-Seite** vollständig — E-Mail, Plan, Logout, Einstellungen
- [ ] **Privacy Policy** live (Pflicht vor echtem Auth, DSGVO)

---

## 🟢 Phase E — Pro Tier + Stripe (Sept–Okt 2026)
- [ ] Stripe Integration (€4.99/Monat, €49.99/Jahr)
- [ ] Free Tier Gate: nach 1 Verdict/Tag → Upgrade-Prompt
- [ ] Pro Features: Unlimited + Compare + Portfolio Tracker
- [ ] Van Westendorp Pricing Test auswerten

## 🟢 Phase E3 — AI Features (Okt–Nov 2026)
- [ ] Groq API Key + Rate-Limit-Strategie
- [ ] Score Explainer: `/explain/{ticker}` Endpoint
- [ ] Investment Copilot: Chat-UI (Pro-Feature)
- [ ] Quellenangaben in AI-Output erzwingen (71% WTP-Bedingung)

---

## 📍 Wo alles liegt

| Topic | File |
|---|---|
| App Shell | `lovable-app/src/components/app/AppShell.tsx` |
| Dashboard | `lovable-app/src/routes/_authenticated/app.index.tsx` |
| Stock Detail | `lovable-app/src/routes/_authenticated/app.stock.tsx` |
| Compare | `lovable-app/src/routes/_authenticated/app.compare.tsx` |
| Portfolio | `lovable-app/src/routes/_authenticated/app.portfolio.tsx` |
| Markets | `lovable-app/src/routes/_authenticated/app.markets.tsx` |
| Robo | `lovable-app/src/routes/_authenticated/app.robo.tsx` |
| CFD | `lovable-app/src/routes/_authenticated/app.cfd.tsx` |
| Landing Route | `lovable-app/src/routes/index.tsx` |
| Verdict Banner | `lovable-app/src/components/pondex/VerdictBanner.tsx` |
| Compare Teaser | `lovable-app/src/components/pondex/CompareTeaser.tsx` |
| Investor Profile | `lovable-app/src/components/pondex/InvestorProfile.tsx` |
| CSS Variables | `lovable-app/src/styles.css` |
| Demo Data | `lovable-app/src/lib/demo-data.ts` |
| Auth Guard | `lovable-app/src/routes/_authenticated/route.tsx` |
