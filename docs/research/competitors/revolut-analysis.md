# Revolut Robo-Advisor & Events Calendar — Competitive Analysis

_Date: 2026-07-16 · Source: Direct product screenshots from Revolut App (DE)_
_Relevance: Onboarding-Flow als Referenz für pondex Onboarding; Events-Kalender als neue Feature-Inspiration_

---

## Teil 1: Revolut Robo-Advisor Onboarding Flow

### Was Revolut tut (vollständiger Flow aus Screenshots)

Revolut hat für seinen Robo-Advisor (MiFID II-lizenziert über Revolut Securities UAB, Bank of Lithuania) einen strukturierten Onboarding-Flow entwickelt. Der Flow ist regulatorisch notwendig (MiFID II Suitability Assessment) — aber Revolut hat ihn UX-freundlich gestaltet.

**Vollständiger Screen-by-Screen Flow:**

| Screen | Frage | Optionen | Regulatorischer Zweck |
|---|---|---|---|
| 1 | "Was ist das Ziel deines Portfolios?" | Allgemeines Investieren / Große Anschaffung / Eigenheim / Ruhestand / Notfallreserve | MiFID II: Investment objective |
| 2 | "Lege einen Zielbetrag fest" | Freitext EUR-Eingabe | MiFID II: Financial situation |
| 3 | "Wann möchtest du dein Ziel erreichen?" | Monat/Jahr-Picker | MiFID II: Investment horizon |
| 4 | "Hast du bereits Erfahrungen mit den Finanzmärkten gemacht?" | Relevante Bildung / Berufserfahrung / Vorherige Investitionen / Nichts davon | MiFID II: Knowledge & experience |
| 5 | "Wieviele Jahre an Bildung/Erfahrung hast du?" | ≤3 Jahre / >3 Jahre | MiFID II: Knowledge depth |
| 6 | "Was ist das Hauptziel eines diversifizierten ETP-Portfolios?" | Wissenstest-Frage mit 3 Optionen | MiFID II: Appropriateness test |
| 7 | "Wie viele Transaktionen hast du in den vergangenen 12 Monaten getätigt?" | 1–10 / Mehr als 10 | MiFID II: Trading frequency |
| 8 | "Wie viel hast du in den vergangenen 12 Monaten investiert?" | €0–5k / €5k–10k / >€10k | MiFID II: Financial situation |
| 9 | "Wie hoch sind deine monatlichen Ausgaben?" | €0–500 / €500–1k / €1k–2.5k / €2.5k–5k / >€5k | MiFID II: Financial situation |
| 10 | "Wie hoch sind deine gesamten finanziellen Verbindlichkeiten?" | €0–5k / €5k–15k / €15k–30k / €30k–50k / >€50k | MiFID II: Financial situation |
| 11 | "Wenn deine Investition in einem Monat über 20% sinken würde, würdest du:" | Behalten / Mit dem Verkauf loslegen / Kaufe mehr | MiFID II: Risk tolerance (Loss scenario) |
| 12 | "Wie hoch ist deine Risikotoleranz?" | Geringes / Mittleres / Hohes Risiko (mit Beschreibung) | MiFID II: Risk profile |
| 13 | "Welches Portfolio ist am Besten mit deinen Werten und Zielen vereinbar?" | Kernportfolio / Nachhaltiges Portfolio | ESG preference |
| 14 | "Nachhaltigkeitspräferenzen" | Revolut übernimmt / Meine Präferenzen anpassen | EU Sustainable Finance Disclosure Regulation |
| 15 | "Wichtigste nachteilige Nachhaltigkeitsauswirkungen" | Soziales+Arbeit / Wasser / Energie+Effizienz / Biodiversität / Abfall | SFDR PAI disclosure |
| 16 | Portfolio-Vorschlag mit historischer Performance | Simulierte +98,68% über 5 Jahre, Portfoliozuteilung (98% Aktien / 2% Geld), Risikobewertungen | MiFID II: Suitability confirmation |
| 17 | "Kenntnisnahme" | Checkbox: AGB Robo-Advisor, Risikobeschreibung, Ex-Ante Kosteninformation, Portfoliostrategie-Berichte | MiFID II: Mandatory disclosure before contract |

---

### Was das für pondex bedeutet

**Wichtigste Erkenntnis:** Revolut kann "Empfehlungen" machen weil sie MiFID II-lizenziert sind (Revolut Securities UAB, Bank of Lithuania). pondex ist NICHT lizenziert — daher ist der pondex-Onboarding-Flow strukturell anders.

**Was pondex übernehmen kann (ohne Lizenz):**
- Ziel-Setting-Fragen (Ruhestand, Anschaffung etc.) → als "Kontext für Score-Interpretation", nicht als Anlageberatung
- Risikotoleranz (Geringes/Mittleres/Hohes Risiko) → beeinflusst Score-Gewichtung
- Anlagehorizont → beeinflusst, welche Metriken prominent sind
- "20% Drawdown — was würdest du tun?" → gute Frage für Risikoprofil
- Erfahrungsstand → beeinflusst Plain-Language-Tiefe (mehr Erklärungen für Einsteiger)

**Was pondex NICHT übernehmen darf (ohne MiFID II-Lizenz):**
- Portfolio-Empfehlung ("dieses Portfolio passt zu dir")
- Historische Performance als Verkaufsargument ("simulierte +98,68%")
- "Konto erstellen" nach Suitability-Assessment mit implizierten Anlageempfehlungen
- Ex-Ante Kosteninformation (nur relevant für tatsächliche Anlageprodukte)

**Regulatorische Grenze:** Revolut ist ein zugelassenes Investment-Unternehmen. pondex ist ein Informationstool. Revolut fragt "was soll ich für dich kaufen?" — pondex fragt "was passt zu deiner Strategie, damit DU entscheiden kannst."

**Konkreter Unterschied in der Sprache:**
- Revolut: "Welches Portfolio empfehlen wir dir?" → Anlageberatung ✅ (lizenziert)
- pondex: "Dein Risikoprofil beeinflusst, wie wir Scores für dich berechnen" → Information ✅ (kein Lizenz nötig)

---

### Onboarding-Fragen für pondex (abgeleitet aus Revolut + Research Council)

Empfohlener pondex-Onboarding-Flow (Phase 2, 5–7 Fragen):

| # | Frage | Optionen | Zweck für pondex |
|---|---|---|---|
| 1 | "Warum investierst du?" | Vermögensaufbau / Ruhestand / Große Anschaffung / Einkommen durch Dividenden / Lerne gerade | Score-Gewichtung + Retention (WHY-Anker) |
| 2 | "Wie lange planst du zu investieren?" | <1 Jahr / 1–5 Jahre / 5–10 Jahre / 10+ Jahre | Score-Gewichtung (Value vs. Momentum) |
| 3 | "Wenn eine Aktie 20% fällt — was machst du?" | Halte durch / Prüfe die Thesis nochmal / Verkaufe sofort | Risikoprofil-Ermittlung (kein Beratungs-Statement) |
| 4 | "Welche Strategie beschreibt dich am besten?" | Value (günstige Bewertung) / Growth (hohes Wachstum) / Dividend (regelmäßige Ausschüttungen) / Momentum (Kurs-Trends) | Score-Gewichtungs-Profil |
| 5 | "Wie viel Erfahrung hast du mit Aktien?" | Gerade erst angefangen / 1–3 Jahre / 3+ Jahre | Jargon-Level in Erklärungen |

**Danach:** "pondex berechnet Scores basierend auf deinen Antworten. Du kannst das jederzeit in den Einstellungen ändern. pondex gibt keine Anlageberatung — alle Entscheidungen triffst du selbst."

---

## Teil 2: Revolut Events-Kalender — "Ereignisse"

### Was Revolut zeigt (Screenshot 21:01)

Revolut hat einen **"Ereignisse"-Screen** im Investieren-Bereich, der:
- Alle kommenden Unternehmens-Events für Portfolio + Watchlist anzeigt
- Nach Datum chronologisch sortiert ist
- Zwei Filter-Tabs hat: "Mein Portfolio" und "Beobachtungsliste"
- Farb-codierte Event-Typen zeigt:
  - 🟢 Grün = Dividende / Ex-Dividende
  - 🟣 Lila = Earnings Call / Unternehmensmassnahme
  - 🟠 Orange = Markt geschlossen / Feiertag

**Konkrete Events die Revolut zeigt:**
- NVIDIA · 4. Jun · Ex-Dividende
- iShares Dow Jones Glob · 15. Jun · Dividende · 0,31 € pro Aktie
- iShares Dow Jones Glob · 15. Jun · Ex-Dividende
- NVIDIA · 26. Jun · Dividende · 0,25 $ pro Aktie
- NVIDIA · 26. Aug · Earnings Call

**Datenprovider:** "Die Informationen werden von EDI bereitgestellt" (EDI = Exchange Data International — kostenpflichtiger Finanzdaten-Anbieter)

### Dashboard-Integration (Screenshot 21:02)

Im Investieren-Dashboard zeigt Revolut:
- "Unternehmensmassnahme" Widget mit den nächsten 2 Events direkt auf der Startseite
- "Alle anzeigen" → führt zum vollständigen Ereignisse-Screen
- Nächste Events prominent: NVIDIA Earnings Call 26. Aug · Markt geschlossen 7. Sep

---

## Teil 3: Portfolio-Kalender Feature-Spec für pondex

### Beschreibung

Ein Kalender-Screen (`/app/calendar`) der alle bevorstehenden Ereignisse für Aktien im Portfolio und in der Watchlist des Nutzers anzeigt.

### Event-Typen

| Typ | Farbe | Datenquelle | Verfügbarkeit |
|---|---|---|---|
| Dividende (Ex-Date) | Grün | Yahoo Finance `.calendar` endpoint | Kostenlos |
| Dividende (Payment Date + Betrag) | Grün | Yahoo Finance | Kostenlos |
| Earnings Call / Earnings Release | Lila | Yahoo Finance `.calendar` | Kostenlos |
| Jahreshauptversammlung (AGM) | Blau | SEC EDGAR (DEF 14A Proxy Filing) | Kostenlos |
| Aktien-Split | Orange | Yahoo Finance | Kostenlos |
| Markt geschlossen / Feiertag | Grau | Statische Liste (NYSE, XETRA, LSE Feiertage) | Kostenlos |

**Nicht im MVP:** Analystentage, Investorenkonferenzen, Bond-Fälligkeiten (zu komplex für Phase 3)

### Datenquellen — Technische Details

**Yahoo Finance Calendar:**
```
https://query1.finance.yahoo.com/v10/finance/quoteSummary/{TICKER}
?modules=calendarEvents
```
Gibt zurück: `earnings.earningsDate`, `dividendDate`, `exDividendDate`

**SEC EDGAR (AGM-Daten):**
- Form DEF 14A enthält Proxy-Meeting-Datum
- Verfügbar über EDGAR Full-Text Search API
- Aufwand: hoch — Phase 4, nicht Phase 3

### UI-Spezifikation

**Screen-Layout (inspiriert von Revolut, aber pondex-Design-System):**
```
/app/calendar

[Filter-Tabs: Alle | Mein Portfolio | Watchlist]

JULI 2026
──────────
26. Jul  [AAPL]  Apple Inc.
         Earnings Call · Erwartet nach Börsenschluss
         "Letztes Quartal: EPS $1.52, Erwartung $1.71"

AUGUST 2026
──────────
15. Aug  [NVDA]  NVIDIA Corporation
         Ex-Dividende · $0.01 pro Aktie

26. Aug  [NVDA]  NVIDIA Corporation
         Earnings Call · Datum bestätigt

SEPTEMBER 2026
──────────
 7. Sep  Markt geschlossen (US) · Labor Day

[ⓘ Daten von Yahoo Finance · Termine können sich ändern · Keine Anlageberatung]
```

**Farb-Codierung:**
- Dividende/Ex-Dividende: `#00ff88` (pondex Accent-Grün)
- Earnings: `#7c3aed` (Lila)
- Marktfeiertag: `rgba(255,255,255,0.3)` (Grau)
- AGM: `#2563eb` (Blau)

**Dashboard-Widget:**
Auf dem `/app` Dashboard: "Nächste Ereignisse" Widget zeigt die 3 nächsten Events aus Portfolio + Watchlist.

### Datenbank-Schema (Ergänzung zu Phase 2)

```sql
-- Keine eigene Tabelle nötig für Phase 3 —
-- Events werden on-demand von Yahoo Finance abgerufen und gecached in market_data_cache
-- metric_key Beispiele: 'earnings_date', 'ex_dividend_date', 'dividend_date', 'dividend_amount'
-- TTL: 24h Cache (Events ändern sich selten, aber können sich verschieben)
```

### Roadmap-Einordnung

| Phase | Was |
|---|---|
| Phase 3 | Events-Kalender MVP: Dividenden + Earnings für Portfolio + Watchlist |
| Phase 3 | Dashboard-Widget: nächste 3 Events |
| Phase 4 | AGM-Daten via SEC EDGAR DEF 14A |
| Phase 4 | Calendar-Export (ICS-Format für Google/Apple Calendar) |
| Phase 4 | Event-Notifications (Email: "AAPL Earnings in 3 Tagen") |

---

## Teil 4: Revolut "Lernen"-Screen — Referenz für pondex Jargon-System

Revolut hat einen "Lernen"-Screen mit:
- Kursen ("Wie du ins Trading einsteigen kannst", "Investieren in Aktien")
- Blog
- Begriffserklärungen (Glossar)

**Regulatorischer Disclaimer auf dem Lernen-Screen:**
> "Die im Kurs enthaltenen Informationen dienen nur zu Bildungszwecken und stellen keine persönliche Empfehlung, Investitionsberatung oder ein Angebot für eine Investitionsentscheidung dar."

**Was das für pondex bedeutet:**
- Revolut's Disclaimer-Sprache ist ein gutes Referenz-Template
- pondex's Tooltip-System (P4 aus CURRENT-TODOS) ist das Äquivalent zu Revoluts Begriffserklärungen
- Keine eigene "Lernen"-Section nötig — Tooltips inline sind effizienter für pondex's 60-Sekunden-UX

---

## Zusammenfassung: Was in pondex einfliesst

| Revolut-Feature | pondex-Adaption | Phase |
|---|---|---|
| Onboarding-Flow (Ziel, Horizont, Risiko, Erfahrung) | Vereinfachter 5-Fragen-Onboarding, klar als Informations-Tool framed | Phase 2 |
| "20% Drawdown"-Frage | Übernehmen als Risikotoleranz-Frage | Phase 2 |
| Events-Kalender (Dividenden + Earnings) | Portfolio-Kalender `/app/calendar` | Phase 3 |
| Dashboard-Events-Widget | "Nächste Ereignisse" auf `/app` Dashboard | Phase 3 |
| Farb-codierte Event-Typen | Grün=Dividende, Lila=Earnings, Grau=Feiertag | Phase 3 |
| Lern-/Glossar-Section | Nur als Inline-Tooltips, kein eigener Screen | Phase 2 |
| MiFID II Disclaimer vor Vertragsabschluss | pondex-Disclaimer vor Paywall-Checkout | Phase 2 |

---

## Teil 5: Revolut Aktien-Detail-Screen — vollständige Analyse (NVDA)

### Screen-Struktur (4 Tabs)
Revolut zeigt jede Aktie in 4 Tabs: **Überblick · Finanzdaten · Neuigkeiten · Order-Buch**

---

### Tab 1: Überblick — Was Revolut zeigt

**Header:**
- Ticker + Name + Branche ("GPU-Entwickler")
- Kurs mit Glocke (Preisalarm) + Stern (Watchlist) oben rechts
- Kursveränderung: absolut + prozentual, wählbarer Zeitraum

**Chart:**
- Kerzen/Linie wählbar, Zeitintervalle: 1T / 1W / 1M / 6M / 1J / 5J / Max
- Events direkt im Chart markiert: **E** = Earnings, **D** = Dividende
- Candlestick-Chart mit konfigurierbarem Intervall (10 Min, 1h, 1 Tag, 4 Tage, 1 Woche, 5 Wochen)
- Diagramm-Typen: Kerzen / Linie / Balken / Heikin-Ashi / Hohlkerzen
- Zeichenwerkzeuge: Mess-Tool, Trendlinie, Horizontale Linie, Vertikale Linie, Fibonacci-Retracement, Elliott-Impulswelle

**Chart-Overlay: Vergleich der Vermögenswerte**
- Mehrere Aktien gleichzeitig auf einem Chart (NVDA + AAPL + MSFT)
- Prozentuale Darstellung (Rendite seit Startpunkt)
- Aktien einzeln ein-/ausblendbar

**"Vorschlag von Revolut" (KRITISCH für pondex-Regulatorik):**
- Großes Widget: "**Kauf**" als Headline + Tacho-Grafik (rot/grün/grau)
- Sub-Punkte:
  - "45,4 % erwartete Rendite, über S&P 500"
  - "Positive risikobereinigte Rendite"
  - "94 % der Analysten empfehlen einen Kauf"
  - "Der Preis steigt"
- Disclaimer: "Die Daten wurden zuletzt aktualisiert am 16.07.2026, 20:04 · **Offenlegung zur Recherche von Revolut Securities Europe UAB**"
- Button: "Erkentnisse erkunden" (führt zum "Einblicke"-Screen)

**Schlüsselwerte (Überblick-Tab):**
- Marktdeckelung: 5,14T $
- P/E-Verhältnis: 31,70
- EPS: 6,53 $
- Dividendenrendite: 0,14 %

**Ereignisse (inline im Überblick):**
- Nächster Event direkt sichtbar: "26. Aug · Earnings Call"

**EPS-Chart (Jährlich/Vierteljährlich Toggle):**
- Tatsächliche EPS (grün) + Geschätzte EPS (grau) für '21–'28
- EPS-Wachstum: -2,61 %

**Finanzleistung-Chart:**
- Einnahmen / Nettoeinkommen / Gewinnspanne als Balken+Linie
- Jährlich/Vierteljährlich wählbar
- Umsatzwachstum: 65,47 %

**Über NVIDIA:** Kurzbeschreibung + Tags (US, Technologie)

**Alarme:** Preisalarm einstellbar direkt auf der Seite

**"Ähnlich wie":** Horizontal scrollbare Peer-Liste (AAPL, GOOGL, GOOG, MSFT) mit Tagesveränderung

**Footer-Disclaimer:**
> "Die vergangene Wertentwicklung ist kein zuverlässiger Indikator für zukünftige Ergebnisse. Die angezeigten Chartdaten sind nur indikativ. Der tatsächliche Ausführungspreis kann abweichen. Die Informationen werden von **Polygon.io** bereitgestellt. Investitionsdienstleistungen werden von Revolut Securities UAB (305799582) bereitgestellt, die von der Bank of Lithuania autorisiert und reguliert ist. **Investition auf eigenes Risiko.**"

---

### Tab 2: "Einblicke" (Revoluts Analyse-Screen)

**Aufbau:**
Übergeordnete Verdict-Karte → 4 Dimensionen → jeweils mit Tacho + Plain-Text

**Overarching Verdict:**
- "**Kauf** · Performt voraussichtlich besser als S&P 500"
- Tacho: Rot (Verkauf) → Grau → Grün (Kauf)

**Dimension 1 — Grundlagen (Fundamentals):**
- "Erwartete jährliche Rendite: **45,4 %**" (In den Top 1%)
- Benchmark: S&P 500 · 13,5 %
- Aufschlüsselung:
  - EPS-Wachstumsbeitrag: 26,5 %
  - Beitrag des KGV-Multiplikators (P/E): 18,2 %
  - Dividenden-Beitrag: 0,7 %
- Sharpe-Index: **0,87** (In den Top 1%, vs. S&P 500: 0,59)
- Expandierbare Sub-Charts für jeden Beitrag

**Dimension 2 — Externe Analysten:**
- "**Starker Kauf**" (Tacho zeigt ganz rechts)
- Durchschnittliches Kursziel: **313,74 $** für 12 Monate (57 Analyst*innen)
- Aufwärtspotenzial: +52,1 %
- Hoch: 743,10 $ (+260,22 %) / Niedrig: 180,00 $ (-12,74 %)
- Verteilung: 82 % Starker Kauf / 12 % Kaufen
- Visualisierung: Liniendiagramm aktueller Kurs → Analysten-Ziel

**Dimension 3 — Technische Daten:**
- "**Zuversichtlich**" (Tacho bei ~70% grün)
- Zähler: 0 Auf-Baisse / 0 Neutral / 9 Zuversichtlich
- Gleitende Durchschnitte:
  - SMA(20): 202,22 · Zuversichtlich
  - SMA(50): 209,61 · Zuversichtlich
  - SMA(200): 192,14 · Zuversichtlich
  - EMA(20): 204,54 · Zuversichtlich
  - EMA(50): 204,48 · Zuversichtlich
  - EMA(200): 193,85 · Zuversichtlich
- Oszillatoren:
  - RSI(14): 56,90 · Zuversichtlich
  - STOCHASTIC_K(14,3,3): 94,54 · Zuversichtlich
  - MACD(12,26,9): 0,17 · Zuversichtlich
- Datenprovider: **Polygon.io**

**Dimension 4 — Stimmung (Sentiment):**
- "**Zuversichtlich**" (Tacho bei ~60%)
- S&P 500 Indexfonds: 7.572 (vs. 125-Tage-Durchschnitt: 7.106)
- Erklärung: "Wenn der S&P 500 über seinem gleitenden Durchschnitt der letzten 125 Tage liegt, ist das ein Zeichen für positive Dynamik"
- Datenprovider: **Polygon.io**

**"Empfohlene Käufe":** Horizontal scrollbare Liste weiterer Aktien (NVDA, AMZN, AVGO, MU)

---

### Tab 3: Finanzdaten

**Gewinn- und Verlustrechnung (mit Plain-Language-Erklärung oben):**
> "Eine Gewinn- und Verlustrechnung zeigt die Einnahmen und Ausgaben der Firma während eines bestimmten Zeitraums"
- Jährlich/Vierteljährlich Toggle
- Jahr-Selektor: 2021–2025
- Zeilen: Gesamtumsatz, Nettoeinkommen, Kosten der Einnahmen, Bruttogewinn, Gesamtbetriebskosten (aufklappbar), Operatives Einkommen, Einkommen vor Steuern, Einkommensteuer, Verfügbares Einkommen (EPS-Basis)
- Datenprovider: **Factset**

**Bilanzen (mit Plain-Language-Erklärung):**
> "Eine Bilanzrechnung zeigt die Vermögenswerte, Verbindlichkeiten und das Aktienkapital einer Firma zu einem bestimmten Zeitpunkt"
- Schulden gegenüber Vermögenswerten: 23,94 %
- Gesamtvermögen: 206,8B $ / Gesamtverbindlichkeiten: 49,51B $

**Cashflow (mit Plain-Language-Erklärung):**
> "Eine Cashflow-Rechnung zeigt die Bargeldbewegungen der Firma während eines bestimmten Zeitraums"
- Freier Cashflow: 95,7B $
- Operativ: 102,71B $ / Investitionen: -52,23B $ / Finanzierung: -48,48B $
- Datenprovider: **Factset**

---

### Tab 4: Neuigkeiten
- Nach Datum gruppiert (Heute / [Datum])
- Jede Meldung: Ticker + Veränderung % · Headline · Uhrzeit · Quelle (StreetAccount)
- Relevante Tickers je Meldung sichtbar (z.B. "AMD ▼6,29% · NVDA ▼2,92%")

---

## Teil 6: Revolut Dashboard (Investieren-Home)

**Produkte-Widget:** Aktien / ETFs und ETPs / Anleihen / Robo-Advisor / CFD

**"Die Top Mover von heute":** Tab-Toggle Top-Gewinner / Top-Verlierer, 8 Aktien mit % angezeigt

**"Unternehmensmassnahme"-Widget:** Nächste Events (Earnings Call 26. Aug, Markt geschlossen 7. Sep)

**"Lernen"-Widget:** Kurse direkt auf Startseite

**"Transaktionen"-Widget:** "Jetzt investieren" CTA

**"+ Widgets hinzufügen":** Modulares Dashboard

---

## Teil 7: Was pondex daraus ableiten soll

### Sofort-Erkenntnisse für pondex

| Revolut-Feature | pondex-Adaption | Regulatorisches Framing | Phase |
|---|---|---|---|
| "Vorschlag von Revolut: Kauf" | ❌ Nicht kopieren — erfordert MiFID II-Lizenz | — | Never |
| Tacho-Grafik (rot/grau/grün) | ✅ Für Score-Visualisierung verwenden — aber als "Fit zur Strategie", nicht "Kauf/Verkauf" | Score ≠ Empfehlung | Phase 1 |
| Technische Daten (SMA/EMA/RSI/MACD mit "Zuversichtlich/Neutral/Bärisch") | ✅ Für TabChart — vereinfacht, mit Plain-Language | "Technischer Indikator, kein Handelssignal" | Phase 2 |
| "Ähnlich wie" (Peer-Liste) | ✅ Für Peer-Comparison-Feature | Informationell | Phase 2 |
| Events im Chart (E/D Marker) | ✅ Earnings + Dividenden-Marker direkt im Kurs-Chart | Standard-Info | Phase 3 |
| Preisalarm ("+ Add") | ✅ Für Watchlist mit Preisalarm | Standard-Info | Phase 3 |
| Finanzdaten mit Plain-Language-Erklärung | ✅ Direkt übernehmen — Revoluts "Was ist eine GuV?"-Texte sind vorbildlich | Standard-Info | Phase 2 |
| Factset als Datenprovider (GuV/Bilanz/Cashflow) | ⚠️ Kostenpflichtig — Alternative: SEC EDGAR XBRL für dieselben Daten kostenlos | — | Phase 3 |
| Polygon.io für Technische Daten + Chart | ⚠️ Kostenpflichtig — Alternative: Yahoo Finance für EOD-Daten ausreichend für pondex ICP | — | Phase 2 |
| "Empfohlene Käufe" | ❌ Nicht ohne Lizenz | — | Never |
| Multi-Asset-Chart-Vergleich (NVDA + AAPL + MSFT) | ✅ Für Peer-Comparison visuell | Informationell | Phase 3 |
| Zeichenwerkzeuge (Fibonacci, Elliott-Wellen) | ❌ Zu komplex für ICP (passive Investoren), GL-Churner-Segment only | — | Phase 4 |

### Wichtigster Befund aus diesen Screenshots

**Revolut verwendet "Kauf" / "Starker Kauf" als Schlagwort — und kann das, weil sie lizenziert sind.**

pondex muss dasselbe Bedürfnis (klare Richtung, kein Rauschen) mit anderem Vokabular lösen:

| Revolut (lizenziert) | pondex (Informationstool) |
|---|---|
| "Kauf" | "Passt gut zu deiner Value-Strategie" |
| "Starker Kauf" | "Score: 91/100 — Alle 5 Faktoren positiv" |
| "45,4 % erwartete Rendite" | "EPS-Wachstum 26,5% YoY — über Sektor-Median" |
| "Der Preis steigt" | "Über SMA(50) und SMA(200) — technisch positiv" |
| "Performt voraussichtlich besser als S&P 500" | "Sharpe-Ratio 0,87 vs. S&P 500: 0,59" |

Der **pondex-Vorteil** gegenüber Revoluts Einblicke-Screen: **jede Zahl zitiert ihre Quelle mit Datum.** Revolut zeigt "45,4% erwartete Rendite" ohne zu erklären woher diese Zahl kommt. Das ist genau die Lücke aus Survey Wave 1 (58% fordern Quellenangaben).

---

_Datenquelle: Direkte Product-Screenshots Revolut App (DE), 2026-07-16_
_Regulatory note: Revolut Securities UAB (305799582) ist durch die Bank of Lithuania autorisiert und reguliert. pondex ist kein zugelassenes Wertpapierunternehmen — alle Features müssen entsprechend geframt sein._
