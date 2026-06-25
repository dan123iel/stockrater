# pondex — Roadmap

## Prinzip

Eine Phase ist done wenn ihre Erfolgsmetriken erreicht sind — nicht wenn alle Features gebaut sind. Lieber wenige Features außergewöhnlich gut als viele mittelmäßig.

---

## MVP — Kernidee beweisen

**Ziel:** Zeigen dass "Ticker eingeben → Analyse sehen → Entscheidung verstehen" funktioniert und Nutzer zurückkommen.

**Exit-Kriterium:** 500 MAU, 40% 7-Tage-Retention, 0 kritische Datenfehler.

### Was reinkommt

- Aktien-Suche (Ticker + Name, weltweit)
- Strategy-relative Score (0–5, 5 Kategorien, profilgewichtet)
- Score-Erklärung pro Komponente — nachvollziehbar, mit Quellen
- Confidence Score (0–100%) — wie viele Datenpunkte liegen vor
- Fundamentaldaten (Margen, Wachstum, P/E, FCF)
- Fair-Value / DCF (einfach, 3 Szenarien)
- Reverse DCF — "welches Wachstum impliziert der aktuelle Kurs?"
- AI-Einordnung in Alltagssprache — warum passt die Aktie zum Profil
- Data Coverage Indicator — was ist für diese Aktie verfügbar
- Einfache Watchlist
- JSON Backup/Restore
- Risikohinweis / Disclaimer sichtbar

### Was rausfliegt (explizit)

- AI-Chat (zu komplex, braucht Portfolio-Kontext)
- Proaktive Vorschläge (braucht mehr Nutzerdaten)
- Thesis Tracker (Phase V1)
- Portfolio (Phase V1)
- Broker-Sync, Mobile App, Social (Phase 3+)

---

## V1 — Personalisierung & Entscheidungsbegleitung

**Ziel:** pondex kennt den Nutzer und begleitet Entscheidungen — nicht nur einzelne Analysen.

**Exit-Kriterium:** 2.000 MAU, 25% 30-Tage-Retention, 30% Portfolio-Adoption, 20% Thesis-Tracker-Adoption.

### Was hinzukommt

- Strategie-Profil (Value / Growth / Dividend / Momentum + Horizont + Risiko)
- Portfolio (manuell, CSV-Import)
- Thesis Tracker — These beim Kauf definieren, automatisch überwachen
- Investment Memo — generierbar nach jeder Analyse (Kaufthese, Risiken, Exit-Kriterien)
- Peer-Vergleich (2–5 Aktien nebeneinander)
- Watchlist Alerts (Fair-Value-Abweichung, Insider-Kauf, Earnings)
- Datenquellen-Transparenz + Aktualisierungsfrequenz sichtbar
- Score-Umbenennung: Excellent Fit / Good Fit / Neutral Fit / Poor Fit
- Bear Thesis automatisch generiert neben Bull Case
- "Warum diese Aktie?" — 3–5 Gründe in Alltagssprache pro Vorschlag

---

## V2 — Intelligence & Proaktivität

**Ziel:** pondex arbeitet für den Nutzer — nicht nur wenn er fragt.

**Exit-Kriterium:** 5.000 MAU, 35% 30-Tage-Retention, 50% Thesis-Tracker aktiv, NPS > 50.

### Was hinzukommt

- AI-Chat (kontextbewusst: Profil + Portfolio + aktuelle Aktie)
- Proaktive Aktienvorschläge (Profil + Portfolio + Makro + Journal)
- Discovery Engine (kuratiertes Universum ~200 Qualitätsaktien, täglich gecacht)
- Portfolio Intelligence (Doppelgänger-Erkennung, Hidden Dependencies, Resilience Score)
- Decision Quality Score — Entscheidungsprozess bewerten, nicht Ergebnis
- Earnings Translator — was wirklich passiert, nicht nur EPS beat/miss
- Pre-Mortem Engine — vor dem Kauf: was könnte die These zerstören?
- Shareable Thesis Card (PNG für X, Reddit, LinkedIn)
- Keyboard-driven UI (CMD+K Suche, Tab-Navigation)
- Mehrsprachigkeit (DE/EN)

---

## V3 — Decision Intelligence

**Ziel:** pondex macht Nutzer messbar besser als Investoren.

### Was hinzukommt

- Investment Autopsy (Post-Mortem für geschlossene Positionen)
- Bias Detector (Muster nach 50 Trades)
- Personal Alpha Tracker (wo kommt Outperformance her)
- Investment GPS (Ziel + Wahrscheinlichkeit + Sparrate-Optimierung)
- Portfolio Stress Test (Szenarien für das gesamte Depot)
- Thesis Drift Detector
- Circle of Competence Score
- Personal Investment Handbook (aus Nutzungshistorie generiert)
- Decision Journal Replay
- Opportunity Cost Engine

---

## Phase 4+ — Skalierung

- Broker-Sync (Trade Republic, Scalable, IBKR)
- Automatische Portfolio-Synchronisation
- Auth + Cloud-Sync (Ende-zu-Ende verschlüsselt)
- Abo-Modell (Freemium — lokale Version bleibt kostenlos)
- Mobile App (PWA)
- Multi-User

---

## Was nie gebaut wird

❌ Social Feed · Kommentare · Copy Trading · Like-System · Leaderboards
❌ "Top Trending Stocks" · Gamification · Streaks · Push-Bombardierung
❌ Features die Nutzung erhöhen aber Entscheidungsqualität nicht verbessern
