# Revolut Investment App — UI/UX & Information Architecture
> Rekonstruiert aus direkten Product-Screenshots (Revolut App DE, 2026-07-16)
> Zweck: Referenz für pondex Feature-Entwicklung und Navigation-Struktur

---

## 1. Gesamt-Struktur (Sitemap)

```
REVOLUT APP
│
├── HOME (Hauptnavigation unten)
│   ├── Startseite
│   ├── Zahlungen
│   ├── Investieren        ← Relevant für pondex
│   ├── Krypto
│   └── Mehr
│
└── INVESTIEREN
    ├── Dashboard (Investieren-Home)
    │   ├── Produkte-Widget
    │   │   ├── Aktien
    │   │   ├── ETFs und ETPs
    │   │   ├── Anleihen
    │   │   ├── Robo-Advisor
    │   │   └── CFD
    │   ├── Top Mover Widget (Gewinner / Verlierer Toggle)
    │   ├── Unternehmensmassnahme-Widget (nächste Events)
    │   ├── Lernen-Widget
    │   ├── Transaktionen-Widget
    │   └── "+ Widgets hinzufügen" (modulares Dashboard)
    │
    ├── AKTIEN-SUCHE
    │   └── Suchfeld → Ergebnisliste → Aktien-Detail
    │
    ├── AKTIEN-DETAIL (z.B. NVDA)
    │   ├── Header
    │   │   ├── Ticker + Name + Branche ("GPU-Entwickler")
    │   │   ├── Kurs + Veränderung (absolut + %)
    │   │   ├── Zeitraum-Selector (1T / 1W / 1M / 6M / 1J / 5J / Max)
    │   │   ├── Glocke (Preisalarm)
    │   │   └── Stern (Watchlist)
    │   │
    │   ├── Tab 1: ÜBERBLICK
    │   │   ├── Chart (Kerzen/Linie/Balken/Heikin-Ashi)
    │   │   │   └── Events im Chart: E (Earnings) / D (Dividende)
    │   │   ├── "Vorschlag von Revolut: KAUF" Widget
    │   │   │   ├── Tacho-Grafik (rot→grau→grün)
    │   │   │   ├── "45,4% erwartete Rendite"
    │   │   │   ├── "94% der Analysten empfehlen Kauf"
    │   │   │   └── Button: "Erkenntnisse erkunden" → Tab 2
    │   │   ├── Schlüsselwerte
    │   │   │   ├── Marktkapitalisierung
    │   │   │   ├── P/E-Verhältnis
    │   │   │   ├── EPS
    │   │   │   └── Dividendenrendite
    │   │   ├── Nächstes Event (inline): "26. Aug · Earnings Call"
    │   │   ├── EPS-Chart (Jährlich/Vierteljährlich)
    │   │   ├── Finanzleistung-Chart (Umsatz/Nettoeinkommen/Marge)
    │   │   ├── Über [Unternehmen] (Kurzbeschreibung + Tags)
    │   │   ├── Preisalarm einrichten
    │   │   └── "Ähnlich wie" (horizontal scrollbare Peer-Liste)
    │   │
    │   ├── Tab 2: EINBLICKE (= Analysis Deep-Dive)
    │   │   ├── Overarching Verdict
    │   │   │   ├── "KAUF · Performt voraussichtlich besser als S&P 500"
    │   │   │   └── Tacho (rot/grau/grün)
    │   │   ├── Dimension 1: FUNDAMENTALS
    │   │   │   ├── Erwartete jährliche Rendite: 45,4%
    │   │   │   ├── Benchmark: S&P 500 · 13,5%
    │   │   │   ├── EPS-Wachstumsbeitrag: 26,5%
    │   │   │   ├── P/E-Multiplikator-Beitrag: 18,2%
    │   │   │   ├── Dividenden-Beitrag: 0,7%
    │   │   │   └── Sharpe-Index: 0,87
    │   │   ├── Dimension 2: EXTERNE ANALYSTEN
    │   │   │   ├── "Starker Kauf"
    │   │   │   ├── Ø Kursziel: 313,74$ (57 Analysten)
    │   │   │   ├── Aufwärtspotenzial: +52,1%
    │   │   │   ├── Hoch/Niedrig Range
    │   │   │   └── Verteilung: 82% Starker Kauf / 12% Kaufen
    │   │   ├── Dimension 3: TECHNISCHE DATEN
    │   │   │   ├── "Zuversichtlich"
    │   │   │   ├── Moving Averages: SMA(20/50/200), EMA(20/50/200)
    │   │   │   ├── Oszillatoren: RSI(14), Stochastic, MACD
    │   │   │   └── Datenprovider: Polygon.io
    │   │   └── Dimension 4: STIMMUNG (Sentiment)
    │   │       ├── S&P 500 vs. 125-Tage-MA
    │   │       └── Datenprovider: Polygon.io
    │   │
    │   ├── Tab 3: FINANZDATEN
    │   │   ├── Plain-Language-Erklärung oben (was ist eine GuV?)
    │   │   ├── Gewinn- & Verlustrechnung
    │   │   │   ├── Jährlich/Vierteljährlich Toggle
    │   │   │   ├── Jahr-Selektor (2021–2025)
    │   │   │   └── Zeilen: Umsatz, Nettoeinkommen, Bruttogewinn, etc.
    │   │   ├── Bilanzen
    │   │   │   ├── Schulden/Vermögen-Ratio: 23,94%
    │   │   │   └── Assets vs. Liabilities
    │   │   ├── Cashflow
    │   │   │   ├── Freier Cashflow: 95,7B$
    │   │   │   └── Operativ / Investitionen / Finanzierung
    │   │   └── Datenprovider: Factset
    │   │
    │   └── Tab 4: NEUIGKEITEN
    │       ├── Nach Datum gruppiert
    │       ├── Headline + Uhrzeit + Quelle
    │       └── Datenprovider: StreetAccount
    │
    ├── KAUFEN / VERKAUFEN
    │   ├── Betrag eingeben
    │   ├── Order-Typ (Market / Limit)
    │   ├── Vorschau (Gebühren, Ausführungspreis)
    │   ├── MiFID II Disclaimer + Checkbox
    │   └── Order bestätigen → Bestätigungsscreen
    │
    ├── EVENTS-KALENDER ("Ereignisse")
    │   ├── Filter-Tabs: Mein Portfolio / Beobachtungsliste
    │   ├── Chronologisch sortiert
    │   └── Event-Typen:
    │       ├── 🟢 Grün: Dividende / Ex-Dividende
    │       ├── 🟣 Lila: Earnings Call
    │       └── 🟠 Orange: Markt geschlossen / Feiertag
    │
    ├── ROBO-ADVISOR ONBOARDING (17 Screens)
    │   ├── Ziel des Portfolios
    │   ├── Zielbetrag (EUR)
    │   ├── Anlagehorizont
    │   ├── Erfahrung + Wissenstest
    │   ├── Transaktionshistorie
    │   ├── Finanzielle Situation (Ausgaben, Verbindlichkeiten)
    │   ├── Risikotoleranz ("20% Drawdown — was machst du?")
    │   ├── Nachhaltigkeitspräferenzen
    │   └── Portfolio-Vorschlag + AGB + Bestätigung
    │
    └── WATCHLIST
        ├── Liste gespeicherter Aktien
        ├── Kursveränderung (%)
        └── Direktlink → Aktien-Detail
```

---

## 2. User Flow — Haupt-Journey

```
START
  │
  ▼
Dashboard (Investieren)
  │
  ├── Aktie suchen / Top Mover antippen
  │       │
  │       ▼
  │   Aktien-Detail
  │       │
  │       ├── Tab: Überblick → Schnellüberblick + Tacho-Verdict
  │       │       │
  │       │       └── "Erkenntnisse erkunden" →
  │       │
  │       ├── Tab: Einblicke → Tiefe Analyse (4 Dimensionen)
  │       │       │
  │       │       └── "Empfohlene Käufe" (andere Aktien)
  │       │
  │       ├── Tab: Finanzdaten → GuV / Bilanz / Cashflow
  │       │
  │       └── Tab: Neuigkeiten → News-Feed
  │               │
  │               └── [KAUFEN Button — persistent am unteren Rand]
  │                       │
  │                       ▼
  │                   Kaufen-Flow
  │                       ├── Betrag eingeben
  │                       ├── Order-Typ wählen
  │                       ├── Disclaimer bestätigen
  │                       └── ✅ Order ausgeführt
  │
  └── Events-Kalender (vom Dashboard-Widget)
          │
          └── Filter: Portfolio / Watchlist
```

---

## 3. Navigation Pattern

| Element | Position | Verhalten |
|---|---|---|
| Bottom Tab Bar | Unten, persistent | 5 Tabs: Home, Zahlen, Investieren, Krypto, Mehr |
| Aktien-Detail Header | Oben fixed | Ticker, Kurs, Zeitraum-Selector |
| Tab Bar (Detail) | Unter Header | Überblick / Einblicke / Finanzdaten / Neuigkeiten |
| Kaufen Button | Unten fixed | Immer sichtbar auf Aktien-Detail |
| Zurück-Pfeil | Oben links | Standard iOS/Android Back |
| Watchlist-Stern | Oben rechts im Detail | Toggle Add/Remove |
| Preisalarm-Glocke | Oben rechts im Detail | Modal öffnen |

---

## 4. Design-Patterns die Revolut nutzt

| Pattern | Beschreibung | pondex-Relevanz |
|---|---|---|
| **Tacho-Grafik** | Rot→Grau→Grün für Verdict | ✅ Bereits in pondex Score-Card |
| **Dimension-Cards** | Jede Analyse-Dimension als eigene Card mit Tacho + Zahl + Text | ✅ Factor Breakdown |
| **Plain-Language oben** | Jede Finanzkennzahl erklärt bevor sie gezeigt wird | ✅ Tooltips (Task N) |
| **Events im Chart** | E/D Marker direkt auf Chart-Timeline | 🔴 Phase 3 |
| **Peer-Liste horizontal** | "Ähnlich wie" — scroll-horizontal, direkt antippen | 🔴 Phase 2 |
| **Datenprovider-Attribution** | "Daten von Polygon.io / Factset / StreetAccount" | ✅ Bereits in pondex |
| **Disclaimer prominent** | Vor jedem Kauf + auf jedem Analyse-Screen | ✅ Regulatory |
| **Modulares Dashboard** | Widgets hinzufügen/entfernen | 🔴 Phase 4 |

---

## 5. Datenprovider-Map (Revolut)

| Bereich | Provider | Kosten |
|---|---|---|
| Kurs-Chart, Technische Indikatoren, Sentiment | Polygon.io | Kostenpflichtig |
| GuV, Bilanz, Cashflow | Factset | Kostenpflichtig |
| News | StreetAccount | Kostenpflichtig |
| Events-Kalender | EDI (Exchange Data International) | Kostenpflichtig |
| Analyst-Ratings | Intern aggregiert (Bloomberg/Refinitiv-Basis) | — |

**pondex Alternativen (kostenlos):**
| Bereich | Alternative |
|---|---|
| Kurs + Technische Indikatoren | Yahoo Finance (yfinance) |
| GuV / Bilanz / Cashflow | SEC EDGAR XBRL API |
| News | Yahoo Finance News |
| Events (Earnings + Dividenden) | Yahoo Finance calendarEvents |

---

## 6. Was pondex hat vs. was fehlt

| Revolut Feature | pondex Status | Wo |
|---|---|---|
| Score/Verdict (Tacho) | ✅ Done | `/app` Score-Card |
| Factor Breakdown | ✅ Done | Factor-Tabs |
| Quellenangaben | ✅ Done | Pro jede Metrik |
| Chart (Kurs-History) | ✅ Done | Chart-Tab |
| Finanzdaten (GuV etc.) | ✅ Done | Valuation-Tab |
| News | ✅ Done | News-Tab |
| Plain-Language Erklärungen | 🔴 Teilweise | Tooltips fehlen (Task N) |
| Moving Averages im Chart | 🔴 Fehlt | Task L |
| Peer-Comparison | 🔴 Phase 2 | — |
| Events-Kalender | 🔴 Phase 3 | — |
| Onboarding (Risikoprofil) | 🔴 Phase 2 | — |
| Watchlist | 🔴 Phase 2 | — |
| Preisalarm | 🔴 Phase 3 | — |
| Kaufen/Verkaufen | ❌ Nie | Kein Broker |
| Modulares Dashboard | ❌ Phase 4 | — |

---

_Quelle: Revolut App DE, Screenshots 2026-07-16, analysiert via revolut-analysis.md_
_Für Feature-Specs: `docs/specs/EXIT-STRATEGY-SPEC.md`_
_Für regulatorische Grenzen: `docs/regulatory/REGULATORY.md`_
