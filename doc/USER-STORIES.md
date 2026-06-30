# User Stories — pondex_

> Abgeleitet aus Survey Wave 1 (n=45, Juni 2026) und ICP-Interviews.
> Format: "As a [who], I want to [what], so that [why]."
> Jede Story hat Akzeptanzkriterien (Given / When / Then).

---

## Segmente

| Kürzel | Wer |
|---|---|
| **VA** | Value Investor (Active) — zahlt/zahlte bereits, EU-NW, ICP |
| **PI** | Passive Investor — ETF-only, rarely checks |
| **AS** | Aspirer — will anfangen, noch kein Investment |

---

## Phase 1 — MVP (in Scope)

### US-001 · Ticker suchen und analysieren

```
Als VA/PI
möchte ich einen Ticker eingeben und innerhalb von 60 Sekunden ein klares Urteil sehen,
damit ich nicht durch mehrere Tools scrollen muss um eine Einschätzung zu bekommen.
```

**Akzeptanzkriterien:**
- Given: Ich bin auf der Analyze-Seite
- When: Ich tippe "NVDA" und drücke Enter
- Then: Score, Erklärung und Quellenangabe erscheinen in < 3 Sekunden

---

### US-002 · Plain-language Erklärung vor dem Score

```
Als AS
möchte ich zuerst eine Erklärung in normaler Sprache lesen (kein Fachjargon),
damit ich verstehe was der Score bedeutet bevor ich ihm vertraue.
```

**Akzeptanzkriterien:**
- Given: Ich habe einen Ticker analysiert
- When: Die Ergebnisse laden
- Then: Der Text "Strong fundamentals — healthy margins..." erscheint vor der Score-Zahl
- And: Kein unerklärtes Akronym (P/E, EBITDA, etc.) im Primary-Text

---

### US-003 · Quellenangabe für jede Zahl

```
Als VA (Gunnar Leu-Typ)
möchte ich für jede angezeigte Kennzahl die genaue Datenquelle sehen,
damit ich dem Urteil vertrauen kann ohne es blind hinzunehmen.
```

**Akzeptanzkriterien:**
- Given: Score-Panel ist geladen
- When: Ich klicke das ▾-Icon neben einem Faktor
- Then: Ich sehe z.B. "P/E Ratio · 24.3x · Yahoo Finance – trailing twelve months"
- And: Jede Zeile hat Label, Wert und Quelle

---

### US-004 · AI-Insights mit Quellennachweis

```
Als VA
möchte ich dem AI-Chat eine Frage stellen und eine Antwort bekommen,
die nur Fakten aus benannten Quellen enthält,
damit ich keine halluzinierten Zahlen als Entscheidungsgrundlage benutze.
```

**Akzeptanzkriterien:**
- Given: AI-Insights Tab ist offen, Groq Key ist gesetzt
- When: Ich frage "What is the biggest risk?"
- Then: Die Antwort enthält keine Zahlen ohne Quellenangabe
- And: Das sources[]-Array zeigt die verwendeten Datenpunkte

---

### US-005 · Zwischen 12 Analyse-Tabs wechseln

```
Als VA/PI
möchte ich zwischen Scorecard, Chart, Valuation, DCF, News, Insider und AI wechseln,
damit ich tief in den Bereich einsteigen kann der mich gerade interessiert.
```

**Akzeptanzkriterien:**
- Given: Analyse ist geladen
- When: Ich klicke "Insider"
- Then: Die Insider-Trades-Ansicht öffnet sich ohne Page Reload
- And: Der aktive Tab ist visuell hervorgehoben
- And: "Financials", "Dividends", "Analysts" zeigen "coming soon"

---

### US-006 · Watchlist aufbauen

```
Als PI
möchte ich Aktien auf eine Watchlist setzen,
damit ich sie beim nächsten Besuch schnell wieder aufrufen kann.
```

**Akzeptanzkriterien:**
- Given: Ich habe AAPL analysiert
- When: Ich navigiere zu Watchlist
- Then: AAPL erscheint in der Liste
- And: Klick auf AAPL öffnet direkt die Analyse

---

### US-007 · Schnell zwischen Markets-Übersicht und Analyse wechseln

```
Als VA/PI
möchte ich auf der Markets-Seite einen Index oder eine Aktie anklicken,
damit ich direkt in die Analyse springe ohne den Ticker manuell einzugeben.
```

**Akzeptanzkriterien:**
- Given: Ich bin auf der Markets-Seite
- When: Ich klicke "ASML"
- Then: Die Analyze-Seite öffnet sich mit ASML vorgeladen

---

## Phase 2 — Geplant (nicht in Phase 1)

### US-008 · Macro-Kontext zur Aktienanalyse

```
Als VA (Gunnar Leu-Typ)
möchte ich geopolitische Ereignisse und externe Marktfaktoren zusammen mit der Aktienanalyse sehen,
damit ich nicht zwischen Handelsblatt, YouTube und dem Analyse-Tool wechseln muss.
```

**Survey-Basis:** Q9-Verbatim von Gunnar Leu — sein expliziter #1-Request.
**Status:** Phase 2, Macro Hub.

---

### US-009 · Erklärungen auf Deutsch oder Spanisch

```
Als AS (EU-NW / Lateinamerika)
möchte ich die Erklärungen in meiner Muttersprache lesen,
damit mir kein Sprachbarriere die Entscheidung erschwert.
```

**Survey-Basis:** 57% EU-Respondents, mehrere Verbatims auf Spanisch (Q9).
**Status:** Phase 2, Multilingual.

---

### US-010 · Konto erstellen und Einstellungen speichern

```
Als VA
möchte ich mich einloggen können,
damit mein Strategie-Profil, meine Watchlist und mein Portfolio-Track nicht verloren gehen
wenn ich den Browser-Cache lösche.
```

**Status:** Phase 2, Login + Backend-Persistenz.

---

## Won't build (begründet)

| Story | Warum nicht |
|---|---|
| "Als User möchte ich Aktien direkt kaufen" | Broker-Lizenz erforderlich |
| "Als User möchte ich Empfehlungen bekommen (Buy/Sell)" | Regulatorisches Risiko |
| "Als User möchte ich Echtzeit-Streaming-Preise" | Infrastrukturkosten vs. Nutzen |
| "Als User möchte ich Aktien mit Freunden teilen" | Kein Survey-Signal, Phase 3+ |

---

## Story Map (nach User Journey)

```
[Entdecken]          [Analysieren]          [Entscheiden]         [Wiederkommen]
      ↓                    ↓                       ↓                     ↓
US-007 Markets       US-001 Suche           US-003 Quellen         US-006 Watchlist
                     US-002 Erklärung       US-004 AI-Chat
                     US-005 Tabs
```
