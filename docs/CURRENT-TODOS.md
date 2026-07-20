# pondex — Current To-Dos

_Last updated: 2026-07-16 · Based on: Wave 1 (n=56) + Wave 2 (n=35) + 3 Interviews + Research Council Report (22 Experten, 13 Phasen)_

> This document is the single source of truth for active tasks.
> Rules: Nothing gets built that isn't listed here. Nothing gets added without survey or interview evidence.

---

## ✅ Done Today

- [x] Backend live: https://stockrater-production.up.railway.app ✅ 2026-07-04
- [x] Smoke Test passed (AAPL score + source attribution working) ✅ 2026-07-04
- [x] Chart tab fixed (apiKey guard removed) ✅ 2026-07-04
- [x] 7 Startup Laws + Cagan 4 Risk Gates embedded in Council ✅ 2026-07-04
- [x] North Star + No Vitamins documented in vision + principles ✅ 2026-07-04
- [x] Docs restructured: docs/, context/, architecture/, specs/ ✅ 2026-07-03
- [x] Competitor analysis written ✅ 2026-07-03
- [x] Assumptions log, Decision log, Glossary created ✅ 2026-07-03
- [x] Incident log created (INC-001, INC-002) ✅ 2026-07-04
- [x] Sentry integrated in backend (awaiting DSN setup) ✅ 2026-07-04

---

## 🔴 Discovery — This Week (do not postpone)

### 1. Interview Gunnar Leu
- [x] LinkedIn message sent ✅ 2026-07-04
- [x] Call booked ✅ 2026-07-04
- [x] Interview conducted ✅ 2026-07-13
- [x] Documented in `user-interviews.md` → Interview Log ✅ 2026-07-13
- [x] Transcript saved → `docs/discovery/transcripts/2026-07-13_interview-GL-Churner-Gunnar-Leu.md` ✅

### 2. Interview Patricia G. Parnet
- [x] Interview conducted ✅ 2026-07-10
- [x] Documented in `user-interviews.md` → Interview Log ✅
- [x] Transcript saved → `docs/discovery/transcripts/2026-07-10_interview-PGP-Tech-Patricia-Parnet.md` ✅

### Synthese (Gunnar + Patricia)
- [x] Patterns dokumentiert in `user-interviews.md` → Synthesis Section ✅ 2026-07-13
- [x] 8 Patterns identifiziert, 6 Code-Änderungen priorisiert

### 3. Message José Bernardo S.
**Why:** Passive investor, LinkedIn link available. Signal: "Everything in one place."
- [ ] Message sent
- [ ] Call conducted + documented

### ⛔ Do not contact yet
- saderomo, Karen García, carolinademuner → Aspirers, 0% payment history, different product logic → Phase 2

---

## 🟡 Survey — After Interview #1

### 4. Wave 2 Survey — bereit, noch nicht gepostet
**File:** `docs/research/surveys/wave2/wave2-survey.md`
**Channels:** r/eupersonalfinance → r/Bogleheads → r/investing (alle EN)
**Tool:** Tally

- [x] Survey-Fragen geschrieben ✅ 2026-07-13
- [x] Reddit-Posts (3 Versionen) geschrieben ✅ 2026-07-13
- [ ] Interview #3 José abwarten — ggf. Fragen anpassen
- [ ] Tally-Survey erstellen + Link eintragen
- [ ] r/eupersonalfinance posten
- [ ] r/Bogleheads posten (gleicher Tag)
- [ ] r/investing posten (2–3 Tage später)
- [ ] Ergebnisse in `docs/discovery/opportunity-scorecard.md` eintragen

### 5. Van Westendorp Pricing Test
**Why:** 85% of investors have never paid for a tool. No price point was tested in Wave 1. Choosing a paywall price without this test is guessing.
**Who:** Only the 5 contacts with payment history from Wave 1 + interview participants
**Not with:** cold traffic — no baseline
- [ ] Interviews completed (prerequisite)
- [ ] Landing page with $9/$19/$49 created
- [ ] Sent to WTP contacts
- [ ] Result documented in `docs/discovery/opportunity-scorecard.md`

---

## 🟢 Code — Validated from Interviews (do these now)

> Alle 6 Punkte direkt aus Gunnar + Patricia abgeleitet. Kein Spec nötig — klar und klein genug.

### K. Bewertungsskala 1–100 (statt 1–10)
**Evidence:** Gunnar + Patricia beide unabhängig (2/2 Interviews)
- [ ] Score-Berechnung in Backend anpassen (multiply by 10 oder native 0–100)
- [ ] Score-Anzeige in Frontend updaten
- [ ] Alle Texte die "out of 10" sagen anpassen

### L. 50/200-Tage-Linien im Chart
**Evidence:** Gunnar explizit, waren früher drin
- [ ] Chart-Tab: Moving Average Linien wieder einbauen (50d + 200d)

### M. Chart-Analyse in Text (AI-generiert)
**Evidence:** Gunnar — "was sagt mir der Chart eigentlich?"
- [ ] Unter Chart: 2–3 Sätze AI-Zusammenfassung (z.B. "Aktie handelt 8% unter der 200-Tage-Linie. RSI bei 42 — weder überkauft noch überverkauft.")

### N. Tooltips / Info-Symbole für Fachbegriffe
**Evidence:** Patricia — "du musst vom dümmsten Nutzer ausgehen, der noch gar keine Ahnung hat"
- [ ] Info-Symbol (ⓘ) neben DCF, Verdict, KGV, Forward-KGV, RSI etc.
- [ ] Kurze Plain-Language-Erklärung im Tooltip

### O. "Profile" → "Account" umbenennen
**Evidence:** Gunnar — "Profil klingt als wäre ich sichtbar"
- [ ] Nav-Label + Seiten-Titel umbenennen

### P. Scroll-Indikator auf Homepage + Stock-Seite
**Evidence:** Gunnar + Patricia scrollten beide nicht spontan
- [ ] Visuellen Hinweis einbauen dass mehr Inhalt folgt (Pfeil, Animation oder Schatten)

---

## 🟢 Code — Still Open

### I. Chart Tab — verify fix is live
- [ ] Open live app → AAPL → Chart tab → confirm chart renders correctly

### J. TAM/SAM/SOM
**Why:** Missing from `docs/product/strategy.md` — needed for investor pitch + pricing decisions.
**How:** Bottom-up: (EU retail investors) × (% willing to pay) × (price point hypothesis)
- [ ] Add TAM/SAM/SOM section to `docs/product/strategy.md`

---

## 🚀 Deployment

### F. Backend on Railway
- [x] Railway account + project set up ✅ 2026-07-02
- [x] Dockerfile + Procfile fixes deployed ✅ 2026-07-02
- [x] Backend live ✅ 2026-07-02
- [x] yfinance upgraded to 1.2.0 ✅ 2026-07-04
- [x] Smoke Test passed ✅ 2026-07-04

### H. Sentry Error Monitoring
**Why:** INC-001 took 3h because the real error (KeyError) appeared as a generic 429. Sentry shows the stack trace immediately.
**Effort:** 5 minutes
- [ ] sentry.io → free account → New Project → Python → FastAPI
- [ ] Copy DSN (looks like `https://abc@xyz.ingest.sentry.io/123`)
- [ ] Railway → Variables → set `SENTRY_DSN`
- [ ] Verify: trigger an error → appears in Sentry dashboard

### G. Retention Tracking
**Why:** OKR "30-day retention >40% with first 10 users" is not automatically measurable without login.
**Plan (no code needed):**
- [ ] Create list of first 10 real users → `docs/discovery/user-tracking-phase1.md`
- [ ] 7-day follow-up: short WhatsApp/LinkedIn message "Did you come back?"
- [ ] 30-day follow-up: 15-min call — did you return? Why / why not?
- [ ] Record result in `docs/product/metrics.md` after 30 days

---

## ⚖️ Regulatory — Before Phase 2 Launch (before September 2026)

> Full action plan → `docs/regulatory/REGULATORY.md` Section 9
> Phase 1 regulatory is fully complete.

### Step 1 — Clarify jurisdiction
- [ ] Decision made + recorded in `docs/regulatory/REGULATORY.md` Section 7

### Step 2 — Privacy Policy (required before login goes live)
- [ ] Written (datenschutz-generator.de or iubenda.com)
- [ ] Saved as `frontend/public/privacy.html`
- [ ] Link added to footer

### Step 3 — Terms of Service (required before paywall)
- [ ] Written
- [ ] Saved as `frontend/public/terms.html`
- [ ] Link in footer + checkbox before paywall

### Step 4 — Paywall disclaimer (code)
- [ ] Checkbox "I understand pondex is not an investment advisor" before `stripe.redirectToCheckout()`

### Step 5 — EU AI Act assessment
- [ ] Documented in `docs/regulatory/REGULATORY.md`

### Step 6 — yfinance license (at >1k MAU)
- [ ] Evaluate Alpha Vantage or official Yahoo Finance API

---

---

## 🎯 Landing Page — Roadmap (basierend auf Playbook + Deep Research)

> Playbook: `docs/specs/LANDING-PAGE-PLAYBOOK.md`
> Grundlage: 107-Agent Deep Research (Juli 2026) + 8 verifizierte Quellen

### LP-1 — Klick-Auslöser unter Hero-CTA [KRITISCH, 5 min]
**Evidence:** Alle Top-LPs (Vercel, Raycast, Shopify) — senkt Hemmschwelle massiv
- [ ] „No account required · Free forever" direkt unter „Analyse a stock — it's free" CTA hinzufügen

### LP-2 — Sektionsreihenfolge: Social Proof vor Demo [KRITISCH, 10 min]
**Evidence:** Vercel + Raycast (verifiziert Juli 2026) — Social Proof direkt nach Hero, NICHT nach Demo
- [ ] Landing.jsx: Testimonials-Section nach Hero verschieben (vor ProductDemo)
- [ ] Reihenfolge: Hero → Testimonials → HowItWorks → Demo → Differentiation → Features → Pricing → FAQ → CTA

### LP-3 — Hero Visual: Score-Card Screenshot [HOCH, 30 min]
**Evidence:** Alle Top-LPs haben Hero Visual — pondex_ Hero ist nur Text, größte Lücke
- [ ] Screenshot der ProductDemo (AAPL Score-Card) als Hero Visual einbauen
- [ ] Rechts neben/unter dem Headline-Text platzieren

### LP-4 — Testimonials: Stock-Fotos ersetzen [HOCH, 20 min]
**Evidence:** Raycast nutzt echte bekannte Namen (Guillermo Rauch etc.) — Unsplash-Fotos wirken unglaubwürdig
- [ ] Option A: Echte Fotos von Gunnar/Patricia/José einholen
- [ ] Option B: Initialen-Avatare (G, P, J) als Placeholder bis echte Fotos da sind

### LP-5 — Stats verständlicher machen [MITTEL, 10 min]
**Evidence:** „45 Survey respondents" versteht ein neuer Besucher nicht — braucht Kontext
- [ ] Stats umbenennen: „45 investors interviewed" / „71% trust only sourced data" / „60s to first verdict" / „€0 to start"

### LP-6 — Meta Tags + Open Graph [MITTEL, 15 min]
**Evidence:** Fehlen komplett — kein schönes Preview beim Teilen auf LinkedIn/Twitter
- [ ] `<title>pondex_ — One verdict for every stock</title>` in index.html
- [ ] Meta Description + og:title + og:description + og:image

### LP-7 — Separate Persona-LPs [NIEDRIG, später]
**Evidence:** SISTRIX Multi-Page Strategie — eine LP pro Zielgruppe performt besser
- [ ] `/value-investing` → Gunnar Persona
- [ ] `/passive-investor` → Patricia Persona
- [ ] Erst nach 10 echten Usern und ersten Conversion-Daten

---

## 🔍 Research — Offene Rechercheaufgaben

### R1. GitHub — Analytics Tools als Inspiration/Basis
**Source:** Mündlicher Hinweis — auf GitHub soll es Entwickler geben, die ähnliche Aktien-Analytics-Tools gebaut haben.
**Why:** Potenzielle Code-Basis, Architektur-Referenz, oder Kooperationspartner.
**Actions:**
- [ ] GitHub durchsuchen: `stock analysis tool`, `stock research react`, `stock screener open source`, `equity research tool`
- [ ] Filter: Python + FastAPI Backend oder React Frontend, Stars >50, letzter Commit <12 Monate
- [ ] 3–5 interessante Repos dokumentieren in `docs/research/competitors/github-reference-tools.md`
- [ ] Prüfen: Lizenz kompatibel? (MIT / Apache = nutzbar, GPL = vorsicht)
- [ ] Prüfen: Nutzen sie Yahoo Finance / SEC EDGAR? Wie lösen sie die Rate-Limit-Probleme?

### R2. Revolut — Analyse ✅ ERLEDIGT
**Source:** Mündlicher Hinweis — Screenshots wurden geliefert und vollständig analysiert.
**Ergebnis:** `docs/research/competitors/revolut-analysis.md` — vollständige Analyse:
- [x] Revolut Robo-Advisor Onboarding Flow (17 Screens) dokumentiert ✅
- [x] Events-Kalender Feature ("Ereignisse") dokumentiert — Dividenden, Earnings, Feiertage ✅
- [x] Regulatorisches Framing analysiert (Revolut = MiFID II-lizenziert; pondex = Informationstool) ✅
- [x] pondex-Adaption spezifiziert: 5-Fragen-Onboarding + Portfolio-Kalender Feature-Spec ✅
- [x] Datenprovider identifiziert: Yahoo Finance Calendar API (kostenlos), EDI (Revolut, kostenpflichtig) ✅

**Neue Features daraus:**
- Portfolio-Kalender `/app/calendar` → Phase 3 (Dividenden + Earnings für Portfolio + Watchlist)
- Dashboard-Events-Widget → Phase 3
- Onboarding "20% Drawdown"-Frage übernehmen → Phase 2

---

## 📋 Features aus Research Council — noch nicht in Roadmap/Specs (nach Priorität)

> Alle folgenden Items sind aus dem Research Council Report (2026-07-16) destilliert.
> Priorität nach: Häufigkeit der Nennung × Konfidenz × strategischem Fit.

### P1 — Score-Granularität: 1–100 mit 1–10 Summary-Band [KRITISCH]
**Evidence:** PGP-Tech (1–10) vs. GL-Churner (1–100) — direkt widersprüchliche Präferenzen, beide stark.
**Research Council Verdict:** User-Test zwingend bevor Launch. Empfehlung: 1–100 intern, obere Zeile zeigt "7/10 äquivalent" als Quick-Read.
**OQ-01 aus Council:** "Was treibt höheres Vertrauen UND Conversion — muss getestet werden."
- [ ] UX-Test mit 5 Nutzern: Format A (1–100) vs. Format B (1–10) — Vertrauen + Think-Aloud
- [ ] Ergebnis dokumentieren in `docs/research/experiments/EXP-001-score-format.md`
- [ ] Erst danach: finale Implementierung

### P2 — Freemium-Gate: Wie viel gratis, damit Conversion nicht kannibalisiert wird [KRITISCH]
**Evidence:** 40% Wave 2 "würde gratis testen", 46% "muss es erst funktionieren sehen", 85% Wave 1 haben nie für Research gezahlt.
**Contradiction aus Council:** Zu großzügiges Free-Tier → kein Upgrade-Grund. Zu restriktiv → kein Proof of Value.
**OQ-03 aus Council:** "Was ist die Mindestanzahl kostenloser Verdicts für Conversion?"
- [ ] Hypothesis definieren: 1 Verdict/Tag free → messe D7 Conversion Rate nach Launch
- [ ] Threshold festlegen: wenn <3% Conversion nach 100 Free Users → Free-Tier anpassen
- [ ] Dokumentieren in `docs/research/experiments/EXP-002-freemium-gate.md`

### P3 — Onboarding: Risk-Profil + Investing WHY [HOCH]
**Evidence:** PGP-Tech (explizit "Tool muss mich kennen"), GL-Churner (Retention hängt an WHY-Verankerung), Wave 1 Anforderungen.
**Phase:** Phase 2
**Spec:** Bereits in `docs/specs/EXIT-STRATEGY-SPEC.md` Component 1 beschrieben.
- [ ] 5-Fragen-Onboarding designen: Strategie, Risikobereitschaft, Horizont, Portfoliogröße, WHY
- [ ] "WHY I invest" als optionalen Step einbauen (nicht erzwingen — GL-Churner Insight)
- [ ] In Phase 2 Lovable-Prompt aufnehmen

### P4 — Plain-Language Chart-Interpretation [HOCH]
**Evidence:** GL-Churner "Charts I love. But what can I read from this chart? That explanation is missing."
**Phase:** Phase 2 (bereits in K-Tasks als M erwähnt — aber hier mit vollständiger Spec)
**Was konkret:** Unter dem Kurs-Chart: 2–3 AI-Sätze: Trend, Support/Resistance, Momentum-Signal.
- [ ] Bereits als Task M gelistet — sicherstellen dass es in Phase 2 Lovable-Prompt landet
- [ ] Spec ergänzen: welche Groq-Prompt-Vorlage liefert verlässliche Chart-Interpretation ohne Halluzination?

### P5 — Peer Comparison: 2 Aktien + Sektor-Durchschnitt [HOCH]
**Evidence:** Stärkste unpromptete positive Reaktion aller Demo-Sessions (JBS-Fin: "I really like the comparison part — that's how you make a decision"). GL-Churner: Sektor-Vergleich explizit gefordert.
**Phase:** Phase 2
- [ ] Bereits in Roadmap — sicherstellen dass Lovable Phase 2 Prompt dies enthält
- [ ] Datenquelle für Sektor-Median klären: Yahoo Finance Sektordaten verfügbar? Oder SEC EDGAR?

### P6 — Wöchentliche Portfolio Summary Email [MITTEL]
**Evidence:** PGP-Tech "Push Notifications + regelmäßige Portfolio-Summary-Mail", GL-Churner Retention-Insight (Mails müssen WHY triggern, nicht Features).
**Phase:** Phase 2
**Critical Rule:** Mail muss persönliche Ziele re-triggern ("Dein NVIDIA-Thesis hält noch — Score: 74"), NICHT Features bewerben ("Neue Funktion: Vergleichstools").
- [ ] Supabase Edge Function `weekly-digest` in Phase 3 planen
- [ ] E-Mail-Template: Stock + Score + eine Thesis-Zeile + Goal-Anker

### P7 — Verdict Track Record: historische Trefferquote [MITTEL]
**Evidence:** Wave 2, Simon: "honest information on how well these verdicts worked in the past."
**Phase:** Phase 3 (braucht 6+ Monate Daten zuerst)
**Regulatorisches Risiko:** Darstellung von historischer Performance → Disclaimer zwingend ("vergangene Performance ist kein Indikator für zukünftige Ergebnisse").
- [ ] In Phase 3 Roadmap aufnehmen
- [ ] Regulatory Council Review bevor Feature gebaut wird

### P8 — Separate Marketing Landing Page ≠ App [BEREITS DONE via Lovable Phase 1]
**Evidence:** PGP-Tech "Marketing page and app mixed together — confusing."
- [x] Bereits adressiert durch Lovable Phase 1 Landing Page ✅

### P9 — Multilingual DE + ES [MITTEL]
**Evidence:** 53% der Befragten europäisch, Spanish verbatims in Wave 1, JBS-Fin aus Mexiko.
**Phase:** Phase 2/3
- [ ] DE zuerst (größter EU-Markt), dann ES
- [ ] Groq-Prompt auf Deutsch testen — Qualität der deutschen AI-Ausgabe validieren

### P10 — Customizable Dashboard (Module reorder/hide) [NIEDRIG]
**Evidence:** GL-Churner "remove what I don't need, reorder tiles."
**Phase:** Phase 4
- [ ] Icebox bis Phase 4 — kein Action nötig jetzt

---

## ⏸ Waiting (do not build yet)

| Feature | Why waiting | When |
|---------|-------------|------|
| Geopolitics / Macro data | After Gunnar Leu interview — may be nice-to-have only | After Interview #1 |
| Multilingual DE/ES | Wave 2 must confirm EU signal | Phase 2 |
| New tabs (Ownership etc.) | After existing tabs fully source-attributed | After audit |
| Login / Auth | Phase 2 — no retention signal before 10 users | Phase 2 |
| Micro-investing / Education | Aspirer features — 0% WTP signal | Phase 2+ |
| Watchlist / Portfolio | Phase 2 | Phase 2 |
| Sentry DSN setup | Low priority until users start hitting errors | When convenient |

---

## 📍 Where everything lives

| Topic | Document |
|-------|---------|
| Full survey analysis | `docs/research/surveys/2026-06-29_wave1/2026-06-29_survey-wave1-analysis.md` |
| Opportunity scoring + decision log | `docs/discovery/opportunity-scorecard.md` |
| Interview contacts + template + log | `docs/discovery/user-interviews.md` |
| Competitor analysis | `docs/research/competitors/competitor-analysis.md` |
| Analysis playbook (for Wave 2) | `docs/research/_playbooks/` |
| Regulatory boundaries | `docs/regulatory/REGULATORY.md` |
| Technical architecture | `context/context/architecture.md` |
| Roadmap | `docs/specs/ROADMAP.md` |
| Risk register | `docs/RISK-REGISTER.md` |
| Folder structure rules | `docs/STRUCTURE.md` |
| Incident log | `docs/architecture/INCIDENT-LOG.md` |
| Assumptions | `docs/product/assumptions.md` |
| Decision log | `docs/product/decision-log.md` |

---

---

## 📍 Neue Dokumente (2026-07-16)

| Dokument | Inhalt |
|---|---|
| `docs/specs/EXIT-STRATEGY-SPEC.md` | Exit-Strategy vollständige Feature-Spec |
| `docs/specs/LOVABLE-PHASE1-LANDING.md` | Lovable Prompt Phase 1 |
| `docs/specs/LOVABLE-PHASE2-AUTH-SHELL.md` | Lovable Prompt Phase 2 |
| `docs/specs/LOVABLE-PHASE3-LIVE-SCORING-STRIPE.md` | Lovable Prompt Phase 3 |
| `docs/research/competitors/COMPETITIVE-INTELLIGENCE.md` | Tiefe Wettbewerbs-Analyse |
| `docs/regulatory/REGULATORY-COUNCIL.md` | Council-Protokoll + Phase-Checklisten |
| `docs/regulatory/PRIVACY-POLICY-TEMPLATE.md` | GDPR Privacy Policy Draft |
| `docs/regulatory/TERMS-OF-SERVICE-TEMPLATE.md` | AGB Draft |
| `docs/research/analysis/2026-07-16_research-council-report-internal.md` | 13-Phasen Research Council Report |

---

_Next update: nach GitHub-Recherche (R1) + Revolut-Analyse (R2) + erstem Lovable Phase 1 Generate-Durchlauf_
