# vistaclara — Equity Analysis Platform

> **UI Lab Spec:** See `UI_LAB.md` for the complete design system, component gallery, layout/nav/hero variants, animation specs, dark mode, and all visual experiments — with full reference index to NVRMND, Locomotive, The Outline, Starface, Stripe, Glossier and other sources.

## Projektübersicht

Single-page Equity Analysis App (eine `index.html`, kein Build-Step).
Deployed auf GitHub Pages: https://dan123iel.github.io/stockrater/
Daten kommen über einen Cloudflare Worker: `https://fragrant-wave-6bd7.d-lenz-contact.workers.dev`

Worker-Endpoints:
- `/yahoo/summary/{TICKER}` → Fundamentaldaten (financialData, defaultKeyStatistics, Statements)
- `/yahoo/chart/{TICKER}?range={range}` → OHLC + Timestamps + meta (Preis, Name, Währung)
- `/yahoo/search` → NICHT verfügbar (wurde deaktiviert)

---

## Design-Prinzipien

### Farben — nur diese 4
- **Grün** `#059669` — positiv, Score ≥ 3.5, aufwärts
- **Rot** `#dc2626` — negativ, Score < 2.5, abwärts
- **Gelb/Amber** `#d97706` — neutral, Score 2.5–3.5, flach
- **Lila** `#7c3aed` — nur sparsam für Akzente (z.B. Sector-Score S)
- Kein Blau, kein Indigo als Hauptfarbe

### Trend-Pfeile
- ↑ grün, → gelb, ↓ rot — immer

### Keine farbigen Zell-Hintergründe
- Tabellenzellen, Score-Rows etc. haben **keinen** farbigen Hintergrund
- Nur der Text/Wert und Balken sind farbig

### Typografie
- Fließtext: Inter
- Zahlen/Code: JetBrains Mono
- Schriftgrößen: konsistent klein halten (.6rem Labels, .82rem Body, 1rem Werte)

### Abstände
- Card-Padding: `1.25rem 1.5rem`
- Card-Margin-Bottom: `.75rem`
- Main-Padding: `1.5rem 1.75rem`
- Search-Bar Margin-Bottom: `1rem`
- Kein übertriebener Whitespace — Seite soll dicht und professionell wirken

### Schatten & Borders
- Subtil: `box-shadow: 0 1px 3px rgba(0,0,0,.04)`
- Border: `1px solid var(--border)` = `rgba(0,0,0,.07)`

---

## Seiten-Aufbau (Rating Page — Reihenfolge)

1. **Hero** — Firmenlogo (Initialen), Name, Ticker/Exchange/Sektor/Währung/ISIN/WKN, Preis + Change
2. **Scorecard** — Gauge-Kreis links, Verdict-Pill + WACC rechts, darunter 4 Zeilen (Financial Ratios 70%, Management 10%, Moat 5%, ESG 5%)
3. **Market Context** — Trend (SMA200), Volatilität, 52W Position, Forward P/E, DCF Upside
4. **Price Chart** — mit Range-Tabs, Crosshair zeigt Datum + Preis + Währung
5. **Period Overview** — TTM / Latest Q / FY−1 / FY−2 Tabelle
6. **Financial Ratios** — Key Metrics Grid + Ratio Scoring Tabelle
7. **Qualitative Assessment** — Management, Moat, ESG mit Stern-Rating (auto-filled)
8. **Intrinsic Value (DCF)** — Fair Value, Bull/Base/Bear, editierbare Parameter
9. **Margin Profile + Key Financials** — nebeneinander auf Desktop (2-Spalten Grid), untereinander auf Mobile

---

## Scorecard

- Gauge-Kreis: Farbe je nach Score (grün ≥3.5, gelb ≥2.5, rot <2.5)
- Verdict: Strong Buy / Buy / Hold / Avoid
- Kein Firmenname im Scorecard (der ist im Hero)
- Keine border-left Striche vor den 4 Zeilen
- Balken: 120px breit, dünn (4px), Farbe nach scoreColor()

## scoreColor(sc)
```
≥ 3.5 → grün #059669
≥ 2.5 → gelb #d97706
< 2.5 → rot  #dc2626
```

---

## Ratio Scoring Bars (T/S)

Jede Ratio hat zwei Balken übereinander:
- **T** (Theory — eigene Benchmarks): Kreis oben, mit outline (kein Fill), Position am Score-Ende
- **S** (Sector — S&P 500 Median): Kreis unten, mit outline
- Balken: durchgehend, grüner Teil links + farbiger Marker (~8% Breite) + grauer Rest
- Score-Anzeige: `T x.0 · S x.0` rechts unten

---

## ISIN / WKN

Yahoo Finance liefert ISIN/WKN nicht. Es gibt eine lokale `TICKER_IDENTIFIERS` Map im JS.
Bei neuen Tickers einfach in die Map eintragen.

---

## Search / Dropdown

- History-Dropdown erscheint beim Fokus auf das Suchfeld
- Jeder Eintrag hat ein ✕ zum Entfernen (`removeFromHistory(idx)`)
- Nach Auswahl: Dropdown sofort weg, Input leer, `fetchCompany(ticker)` mit Force-Ticker
- Nach Enter: Input sofort leer, `fetchCompany()` liest aus `forceTicker` Parameter

---

## Worker / Daten

- Worker-URL wird in `localStorage('sr_workerurl')` gespeichert
- Ohne Worker → Fehlermeldung
- `sector` kommt aus `summary.financialData.sector` (kann null sein)
- `longName`, `currency`, `regularMarketPrice` kommen aus `chart.meta`
- `timestamps` für Chart-Crosshair kommen aus `chart.timestamps`

---

## Technische Details

- Kein Build-Step, kein npm, alles in einer HTML-Datei
- LocalStorage: `sr_portfolio`, `sr_watchlist`, `sr_trades`, `sr_cache`, `sr_search_history`, `sr_workerurl`
- Cache TTL: 1 Stunde
- Auto-Push Hook: jede Änderung an Dateien in diesem Ordner wird automatisch committed + gepusht

---

## Was NICHT gemacht werden soll

- Kein Blau/Indigo als Hauptfarbe
- Keine farbigen Hintergründe in Tabellenzellen
- Keine Erklärungstexte unter Page-Titles
- Kein Logo-Fetch (Clearbit) — nur Initialen-Text im Avatar
- Kein `/yahoo/search` Endpoint aufrufen (nicht verfügbar)
- Keinen großen Whitespace zwischen Sections
