# pondex_ — Phase C Launch Checklist
_Go/No-Go Gate vor dem ersten echten User_
_Stand: 2026-07-24 · Verantwortlich: Daniel_

---

## Wie dieses Dokument benutzen

Jede Zeile muss auf ✅ stehen bevor Phase C als "live" gilt.
❌ = noch nicht erledigt · ⚠️ = teilweise / in Arbeit · ✅ = abgeschlossen

---

## 1. Backend (Railway)

| # | Check | Status | Notiz |
|---|---|---|---|
| B-01 | Railway-Projekt existiert und ist mit GitHub verbunden | ❌ | |
| B-02 | FastAPI startet ohne Fehler auf Railway | ❌ | |
| B-03 | `VITE_API_URL` als GitHub Secret gesetzt | ❌ | |
| B-04 | `GROQ_API_KEY` als Railway Env Var gesetzt | ❌ | |
| B-05 | `SENTRY_DSN` als Railway Env Var gesetzt | ❌ | Optional aber empfohlen |
| B-06 | Smoke Test: `/score/AAPL` liefert validen Score | ❌ | |
| B-07 | Smoke Test: AAPL Score stimmt mit Demo-Daten überein (~78) | ❌ | |
| B-08 | Smoke Test: `/quote/AAPL` liefert Preis + Change | ❌ | |
| B-09 | Rate Limit Test: 20 Requests in 60s → kein 429 | ❌ | yfinance |
| B-10 | Cache funktioniert: zweiter Request < 100ms | ❌ | ADR-011 |
| B-11 | Fehlerfall: unbekannter Ticker → 404 mit sinnvoller Message | ❌ | |
| B-12 | Fehlerfall: yfinance Timeout → 503 (nicht 500) | ❌ | |

---

## 2. Frontend (GitHub Pages)

| # | Check | Status | Notiz |
|---|---|---|---|
| F-01 | `VITE_API_URL` zeigt auf Railway (nicht localhost) | ❌ | |
| F-02 | Build läuft ohne Fehler (`npm run build`) | ⚠️ | prüfen nach API-Umstellung |
| F-03 | AAPL Analyse auf live URL gibt echten Score | ❌ | |
| F-04 | Chart zeigt echte OHLCV-Daten (nicht "Illustrative") | ❌ | |
| F-05 | "Illustrative"-Label verschwindet wenn echte Daten da | ❌ | StockChart.jsx |
| F-06 | Error State für unbekannte Ticker funktioniert | ✅ | Demo-Chips vorhanden |
| F-07 | Loading State: kein Flicker, kein leerer Bildschirm | ✅ | |
| F-08 | PageNotFound wired (Wildcard-Route) | ✅ | |
| F-09 | GitHub Pages 404-Redirect funktioniert | ✅ | 404.html vorhanden |
| F-10 | Mobile: Seite bricht nicht unter 375px | ❌ | AppNav überläuft |

---

## 3. Regulatorik & GDPR (PFLICHT vor erstem EU-User)

| # | Check | Status | Notiz |
|---|---|---|---|
| G-01 | `/terms` Route in App.jsx registriert | ❌ | GDPR-Pflicht |
| G-02 | `/privacy` Route in App.jsx registriert | ❌ | GDPR-Pflicht |
| G-03 | Terms of Service Dokument deployed (kein Placeholder-Text) | ❌ | Template in docs/regulatory/ |
| G-04 | Privacy Policy Dokument deployed | ❌ | Template in docs/regulatory/ |
| G-05 | Signup.jsx: "By creating an account you agree to [Terms] and [Privacy]" sichtbar | ❌ | GDPR Art. 13 |
| G-06 | Links in Signup zu /terms und /privacy funktionieren | ❌ | |
| G-07 | EU AI Act Self-Assessment abgeschlossen und dokumentiert | ❌ | Aktiv seit Aug 2026 |
| G-08 | Disclaimer "Research tool only · Not financial advice" auf jeder Score-Card | ✅ | |
| G-09 | CFD Risk Warning vollständig und sichtbar | ✅ | |
| G-10 | RoboAdvisor Renditen mit Disclaimer ("not a guarantee") | ✅ | |

---

## 4. Content & Trust

| # | Check | Status | Notiz |
|---|---|---|---|
| C-01 | AAPL Score konsistent: 78/100 überall (Hero + Demo + App) | ✅ | Fixed 2026-07-24 |
| C-02 | Keine Fake-Headlines in News-Tab | ✅ | Empty State vorhanden |
| C-03 | Keine Math.random() Order Book Daten | ✅ | Empty State vorhanden |
| C-04 | "Phase 3" / "Phase 4" nirgendwo user-facing | ✅ | Fixed 2026-07-24 |
| C-05 | Nur echte Datenquellen in LogosBar (Yahoo/SEC/Groq) | ✅ | Fixed 2026-07-22 |
| C-06 | Demo-Banner auf Login/Signup entfernen sobald echte Auth live | ❌ | Phase D |
| C-07 | "Illustrative"-Label auf Chart verschwindet mit echten Daten | ❌ | Implementierung nötig |
| C-08 | Watchlist editierbar (nicht hardcoded) | ❌ | localStorage-basiert |

---

## 5. Performance & Monitoring

| # | Check | Status | Notiz |
|---|---|---|---|
| P-01 | Score-Endpoint Antwortzeit < 5s (95th percentile) | ❌ | messen nach Deploy |
| P-02 | Sentry oder einfaches Logging aktiv auf Railway | ❌ | |
| P-03 | Railway Health-Check Endpoint (`/health`) antwortet | ❌ | |
| P-04 | Keine 500-Fehler in Railway Logs nach Smoke Tests | ❌ | |

---

## 6. Kommunikation (vor Launch)

| # | Check | Status | Notiz |
|---|---|---|---|
| K-01 | CLAUDE.md aktualisiert: Backend-URL eingetragen | ❌ | |
| K-02 | ROADMAP.md Phase C als "Done" markiert | ❌ | nach Abschluss |
| K-03 | README.md aktualisiert mit echten Run-Instructions | ❌ | |

---

## Go / No-Go Entscheidung

**Minimum für Go:**
- Alle B-01 bis B-08 ✅
- Alle G-01 bis G-06 ✅ (GDPR-Minimum)
- Alle C-01 bis C-05 ✅
- F-01 bis F-03 ✅

**Nice-to-have für Go:**
- Alle P-Checks ✅
- F-10 (Mobile) ✅

**Darf auf Phase D verschoben werden:**
- C-06 (Demo-Banner entfernen)
- C-08 (Watchlist editierbar)
- G-07 (AI Act) — dokumentieren, nicht blockieren

---

_Letzte Aktualisierung: 2026-07-24_
_Nächste Review: wenn B-01 abgeschlossen (Railway-Deployment startet)_
