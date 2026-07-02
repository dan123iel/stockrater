# pondex_ — Current To-Dos

_Letzte Aktualisierung: 2026-07-02 · Basis: Wave 1 Survey Analysis (n=56) + Opportunity Scorecard + Council Review_

> Dieses Dokument ist die einzige Quelle der Wahrheit für aktuelle Aufgaben.
> Regeln: Nichts wird gebaut was nicht hier steht. Nichts wird hier ergänzt ohne Survey- oder Interview-Evidenz.

---

## 🔴 Discovery — Diese Woche (nicht verschieben)

### 1. Gunnar Leu auf LinkedIn anschreiben
**Warum:** Einziger Churner mit vollständigem Profil: Zahlungshistorie ($15–50/mo), benannter Pain (Noise), detaillierter Q9-Verbatim, Kontaktfreigabe. Jedes Interview danach.
**Wie:** Vorlage steht in `doc/discovery/user-interviews.md` → Abschnitt "Outreach template". Copy-paste, Calendly oder "Wann passt es dir?" ergänzen.
**Ziel:** 45-min Video-Call. Interview-Guide aus `user-interviews.md` nutzen.
- [ ] LinkedIn-Nachricht abgeschickt
- [ ] Call gebucht
- [ ] Interview geführt + in `user-interviews.md` → Interview-Log dokumentiert

### 2. Patricia G. Parnet anschreiben
**Warum:** Passive Investorin, survey consent gegeben, Signal: "Daily overview + annual reports" — deckt sich mit Cluster 3 (Fragmentation).
**Wie:** Gleiche Vorlage wie Gunnar, leicht anpassen ("your insight about daily overviews was really interesting").
- [ ] Nachricht abgeschickt
- [ ] Call geführt + dokumentiert

### 3. José Bernardo S. anschreiben
**Warum:** Passiver Investor, LinkedIn-Link vorhanden, Signal: "Everything in one place".
- [ ] Nachricht abgeschickt
- [ ] Call geführt + dokumentiert

### ⛔ Nicht jetzt kontaktieren
- saderomo, Karen García, carolinademuner → Aspirers, 0% Zahlungshistorie, andere Problem-Logik → Phase 2

---

## 🟡 Survey — Nach Interview #1

### 4. Wave 2 Survey vorbereiten
**Warum:** Wave 1 war Warm Network (WhatsApp). Kälteres Publikum (Reddit) zeigt bereits höhere AI-Skepsis. Findings müssen repliziert werden bevor Investor-Pitch oder Paid Acquisition.
**Kanal:** r/eupersonalfinance + r/finanzen
**Fixes gegenüber Wave 1:**
- Barriers: Einzelauswahl statt Multi-Select (kein primärer Pain identifizierbar)
- Konzept zuerst zeigen, dann Features fragen (sonst inflated demand)
- Direkter Preispunkt: $9 / $19 / $49 (kein offener WTP)
- Konsistente Likert-Skala durchgehend
**Template:** `doc/research/surveys/2026-06-29_wave1/2026-06-29_survey-wave1-dashboard.md` → Abschnitt "Wave 2"
- [ ] Interview #1 abgeschlossen (Voraussetzung)
- [ ] Wave 2 Fragebogen erstellt
- [ ] Auf Reddit gepostet

### 5. Van Westendorp Pricing-Test
**Warum:** 85% der Investoren haben noch nie bezahlt. Kein einziger Preispunkt wurde in Wave 1 getestet. Paywall-Entscheidung ohne diesen Test wäre Raten.
**Mit wem:** Nur die 5 Kontakte mit Zahlungshistorie aus Wave 1 + Interview-Teilnehmer
**Nicht mit:** kaltem Traffic — keine Baseline
- [ ] Interviews abgeschlossen (Voraussetzung)
- [ ] Landing Page mit $9/$19/$49 erstellt
- [ ] An WTP-Kontakte geschickt
- [ ] Ergebnis in `doc/discovery/opportunity-scorecard.md` dokumentiert

---

## 🟢 Code — Diese Woche

> **Vorab geklärt (2026-07-02):** R-009 (DCF hardcoded NVDA) und R-010 (Chart random data) sind bereits behoben — `dcf.js` und `ChartTile.jsx` waren bereits auf dynamische Daten umgestellt. Risk Register war veraltet.

### A. Regulatory Disclaimer auf AI-Tab
- [x] Disclaimer unter jeder AI-Antwort sichtbar ✅ 2026-07-02

### B. Risk Register aufräumen
- [x] Erledigt ✅ 2026-07-02

### C. Roadmap korrigieren
- [x] Erledigt ✅ 2026-07-02

### D. Source Attribution Audit — alle Tiles
- [x] `ValuationTile.jsx` — "Source: Yahoo Finance TTM" ✅ 2026-07-02
- [x] `InsiderTile.jsx` — "Source: SEC EDGAR Form 4" ✅ 2026-07-02
- [x] `DCFTile.jsx` — "Inputs derived from Yahoo Finance" ✅ 2026-07-02
- [x] `PeerComparisonTile.jsx` — "Source: Yahoo Finance TTM" ✅ 2026-07-02
- [x] `ChartTile.jsx` — "Price data: Yahoo Finance" ✅ 2026-07-02

### E. Council-Fixes (nach Product Council Review 2026-07-02)
- [x] Disclaimer Opacity: `.22` → `.55` (`Analysis.jsx`) ✅ 2026-07-02
- [x] AI Chat Source Attribution: Fallback-Quellen wenn Client keine sendet (`score.py`) ✅ 2026-07-02
- [x] CORS: `allow_origins=["*"]` → spezifische Origins via `ALLOWED_ORIGINS` env var (`main.py`) ✅ 2026-07-02
- [x] Personas-Dokument: Survey-basiert neu geschrieben, Hypothesis-Disclaimer entfernt ✅ 2026-07-02
- [x] Dockerfile: `uvicorn main:app` → `uvicorn app.main:app` (korrekter Modulpfad) ✅ 2026-07-02
- [x] `railway.toml` erstellt für Railway Deployment ✅ 2026-07-02

---

## 🚀 Deployment — Vor 15. Juli (Blocker für Phase 1 OKR)

### F. Backend auf Railway deployen
**Warum:** Ohne Deployment keine echten User, kein OKR messbar. Blocker für Phase 1.
**Was bereits vorbereitet:**
- `railway.toml` → erstellt ✅
- `Dockerfile` → korrekter Modulpfad ✅
- CORS → spezifische Origins ✅

**Noch zu tun:**
- [ ] Railway-Account einloggen / Projekt anlegen: `railway login` → `railway init`
- [ ] Environment Variables setzen auf Railway: `GROQ_API_KEY`, `ALLOWED_ORIGINS=https://dan123iel.github.io`
- [ ] Ersten Deploy ausführen: `railway up` (aus `/backend`)
- [ ] Backend-URL im Frontend eintragen: `VITE_API_URL=https://<railway-url>` in GitHub Pages deployment
- [ ] Health-Check testen: `curl https://<railway-url>/`

### G. Retention-Messung operationalisieren
**Warum:** OKR "30-day retention >40% mit ersten 10 Usern" ist ohne Login nicht automatisch messbar.
**Plan (kein Code nötig):**
- [ ] Liste der 10 ersten echten User anlegen (Name, Datum erster Besuch, Ticker analysiert)
- [ ] 7-Tage Follow-up: kurze WhatsApp/LinkedIn-Nachricht "Hast du nochmal reingeschaut?"
- [ ] 30-Tage Follow-up: 15-min Call — bist du zurückgekommen? Warum/warum nicht?
- [ ] Tabelle in `doc/discovery/` anlegen: `user-tracking-phase1.md`
- [ ] Ergebnis nach 30 Tagen in `doc/product/metrics.md` eintragen

### D. Source Attribution Audit — alle Tiles
- [x] `ValuationTile.jsx` — "Source: Yahoo Finance TTM" ✅ 2026-07-02
- [x] `InsiderTile.jsx` — "Source: SEC EDGAR Form 4" ✅ 2026-07-02
- [x] `DCFTile.jsx` — "Inputs derived from Yahoo Finance" ✅ 2026-07-02
- [x] `PeerComparisonTile.jsx` — "Source: Yahoo Finance TTM" ✅ 2026-07-02
- [x] `ChartTile.jsx` — "Price data: Yahoo Finance" ✅ 2026-07-02

---

## ⚖️ Regulatory — Vor Phase 2 Launch (vor September 2026)

> Vollständiger Aktionsplan mit Anleitungen → `doc/regulatory/REGULATORY.md` Section 9
> Phase-1-Regulatory ist vollständig erledigt.

### Schritt 1 — Jurisdiktion klären
**Aufwand:** 1 Tag, du allein, kein Anwalt nötig
**Was:** Entscheide welches Recht gilt. Empfehlung: Deutsches Recht + DSGVO (einfachste Basis für Solo-Founder in DE).
- [ ] Entscheidung getroffen + in `doc/regulatory/REGULATORY.md` Section 7 eingetragen

### Schritt 2 — Privacy Policy
**Aufwand:** 2–3 Stunden, Generator nutzen (datenschutz-generator.de oder iubenda.com)
**Pflicht:** Sobald Login / Google Sign-In live geht (Phase 2)
- [ ] Privacy Policy geschrieben
- [ ] Abgelegt als `frontend/public/privacy.html`
- [ ] Link im Footer eingebaut

### Schritt 3 — Terms of Service
**Aufwand:** 2–3 Stunden Generator + optional 1× Anwalt-Review (~200–400€)
**Pflicht:** Vor Stripe / Paywall live
- [ ] ToS geschrieben (Kernaussage: Informationswerkzeug, kein Anlageberater, Haftungsausschluss)
- [ ] Abgelegt als `frontend/public/terms.html`
- [ ] Link im Footer + Checkbox vor Paywall

### Schritt 4 — Paywall-Disclaimer (Code)
**Aufwand:** 30 min Code
**Pflicht:** Vor Stripe-Checkout
- [ ] Checkbox "Ich verstehe, dass pondex kein Anlageberater ist" vor `stripe.redirectToCheckout()`

### Schritt 5 — EU AI Act Einschätzung
**Aufwand:** 2 Stunden Recherche, optional kurze Anwalts-Einschätzung (~100–200€)
**Wahrscheinliches Ergebnis:** pondex ist kein high-risk AI System (kein Kredit, kein Recht, kein Biometrie)
- [ ] Einschätzung dokumentiert in `doc/regulatory/REGULATORY.md`

### Schritt 6 — yfinance Lizenz (bei >1k MAU)
**Aufwand:** 1 Stunde Recherche
**Jetzt:** Nichts tun — R-015 im Risk Register. Erst relevant bei Skalierung.
- [ ] Alpha Vantage oder offizielle Yahoo Finance API evaluieren (wenn MAU >1k)

---

| Feature | Warum warten | Wann |
|---------|-------------|------|
| Geopolitik / Macro-Daten | Erst nach Gunnar Leu Interview — könnte Nice-to-Have sein | Nach Interview #1 |
| Multilingual DE/ES | Wave 2 muss EU-Signal bestätigen | Phase 2 |
| Neue Tabs (Ownership etc.) | Erst wenn bestehende sauber quellattribuiert | Nach Audit |
| Login / Auth | Phase 2 — kein Retention-Signal vor 10 Usern | Phase 2 |
| Micro-investing / Education | Aspirer-Features — 0% WTP-Signal | Phase 2+ |
| Watchlist / Portfolio | Phase 2 | Phase 2 |

---

## 📍 Wo alles dokumentiert ist

| Thema | Dokument |
|-------|---------|
| Vollständige Survey-Analyse | `doc/research/surveys/2026-06-29_wave1/2026-06-29_survey-wave1-analysis.md` |
| Opportunity Scoring + Decision Log | `doc/discovery/opportunity-scorecard.md` |
| Interview-Kontakte + Vorlage + Log | `doc/discovery/user-interviews.md` |
| Analyse-Playbook (für Wave 2) | `doc/research/_playbooks/` |
| Post-Survey Discovery-Prozess | `doc/research/_playbooks/post_analysis_discovery_process.md` |
| Regulatorische Grenzen | `doc/regulatory/REGULATORY.md` |
| Technische Architektur | `.project-context/context/architecture.md` |
| Roadmap | `doc/ROADMAP.md` |
| Risk Register | `doc/RISK-REGISTER.md` |

---

_Nächste Aktualisierung: nach Interview #1 mit Gunnar Leu_
