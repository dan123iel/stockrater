# pondex — Produktvision & technische Dokumentation

**Live:** https://dan123iel.github.io/stockrater/
**Repo:** https://github.com/dan123iel/stockrater

---

## Was pondex ist

pondex ist ein persönlicher Investment-Assistent im Browser. Kein Account. Keine App. Keine Kosten.

Du gibst einen Ticker ein — NVDA, AAPL, SAP, ASML, was auch immer — und bekommst sofort eine vollständige Analyse: Score, Chart, Fundamentaldaten, Insider-Aktivität, Fair Value, AI-Erklärung, News. Alles an einem Ort, alles auf deine persönliche Strategie zugeschnitten.

Aber pondex hört dort nicht auf. Es schlägt dir auch aktiv Aktien vor die zu dir passen — basierend auf deinem Profil, deinem Portfolio, deinen Vorlieben, dem aktuellen Marktumfeld und hundert weiteren Parametern. Und es hat einen AI-Chat mit dem du über jede Aktie, jede Entscheidung, jedes Konzept reden kannst — der dir nicht nur Zahlen gibt sondern sie einordnet, erklärt und bewertet.

---

## Das Problem das pondex löst

### Problem 1 — Daten ohne Meinung

Morningstar, Yahoo Finance, Seeking Alpha, Tikr — sie alle zeigen dir Zahlen. P/E 28x. Umsatzwachstum 18%. Operating Margin 24%. Bruttomarge 61%.

Aber was bedeutet das? Ist ein P/E von 28x bei dieser Aktie in diesem Sektor mit diesem Wachstum teuer oder günstig? Ist eine Bruttomarge von 61% gut oder sollte sie für ein Software-Unternehmen höher sein? Ist Insider-Kaufaktivität von 60% beunruhigend oder normal?

**Daten ohne Einordnung zwingen den Nutzer dazu selbst eine Meinung zu bilden — ohne die Werkzeuge das fundiert zu tun.**

pondex löst das indem jede Zahl sofort bewertet wird: grün bedeutet diese Zahl ist stark nach akademischen Standards, gelb ist mittel, rot ist schwach. Und der AI-Chat erklärt dir warum — auf dein Profil bezogen, nicht generisch.

### Problem 2 — Strategie-Blindheit der bestehenden Tools

Kein kostenloses Tool fragt dich wer du als Investor bist. Bloomberg gibt NVIDIA denselben Score wie er einem Value-Investor und einem Growth-Investor zeigt. Das ist falsch. Eine Aktie mit P/E 50 und 35% Umsatzwachstum ist für einen Growth-Investor mit langem Horizont attraktiv und für einen konservativen Value-Investor uninteressant. Das sind zwei legitime, verschiedene Einschätzungen.

**pondex kennt deine Strategie und bewertet jede Aktie relativ dazu.**

### Problem 3 — Der Recherche-Aufwand

Fünf Tabs offen. Yahoo Finance für Charts. Macrotrends für historische Margen. SEC EDGAR für Insider-Trades. Ein Reddit-Thread für Meinungen. Ein YouTube-Video für Kontext. Zwei Stunden später hat man widersprüchliche Informationen und trifft trotzdem eine Bauchentscheidung.

**pondex bringt alles in eine Oberfläche und sagt dir am Ende was es bedeutet.**

### Problem 4 — Du weißt nicht was du nicht weißt

Das größte Problem: Du musst selbst wissen welche Aktie du analysieren willst. Du analysierst NVDA weil du NVDA kennst. Aber was ist mit der europäischen Halbleiter-Zulieferer-Aktie die gerade 20% unter Fair Value handelt und perfekt in dein Portfolio passen würde — die du nie analysiert hast weil du nie davon gehört hast?

**pondex schlägt dir proaktiv Aktien vor die zu dir passen, bevor du fragst.**

---

## Für wen pondex gemacht ist

### Primäre Zielgruppe

**Der selbstbestimmte Privatanleger, 25–45 Jahre, der ernsthaft investiert aber kein Profi ist.**

Er verwaltet sein eigenes Depot. Er kauft Einzelaktien, keine reinen ETF-Sparpläne. Er hat eine Meinung — kauft lieber Qualitätsunternehmen als Meme-Stocks, oder interessiert sich für unterbewertete Substanzwerte, oder folgt Wachstumstrends. Er liest gelegentlich Geschäftsberichte aber hat keine Zeit das systematisch für jede Aktie zu tun. Er will verstehen warum eine Aktie gut oder schlecht ist, nicht nur ob sie gestiegen ist. Er zahlt nicht 50€/Monat für Seeking Alpha.

### Sekundäre Zielgruppe

**Finanzinteressierte die anfangen ernsthafter zu investieren** — jemand der bisher nur ETFs hatte und jetzt Einzelaktien analysieren will. pondex erklärt was die Zahlen bedeuten statt nur Zahlen zu zeigen.

**Finanz-Content-Creator und Blogger** — jemand der über Aktien schreibt oder spricht und schnell saubere, korrekte Datenpunkte braucht.

### Wer es nicht ist

- Daytrader die auf Minutencharts schauen
- Institutionelle Anleger mit Bloomberg-Zugang
- Leute die ausschließlich in ETFs investieren

---

## Was pondex tut — alle Funktionen

### Das Strategie-Profil

Bevor du eine Aktie analysierst legst du einmalig fest wer du als Investor bist:

- **Zeithorizont** — Short (unter 1 Jahr) / Medium (1–5 Jahre) / Long (5+ Jahre)
- **Risikobereitschaft** — Conservative / Moderate / Aggressive
- **Anlagefokus** — Value / Growth / Dividend / Momentum

Das ist kein kosmetisches Feature. Es verändert mathematisch wie der Score berechnet wird. Ein Value-Investor gewichtet P/E und DCF stärker. Ein Growth-Investor gewichtet Umsatzwachstum und Moat stärker. Dieselbe Aktie bekommt bei verschiedenen Profilen verschiedene Scores — weil sie für verschiedene Strategien tatsächlich verschieden gut geeignet ist.

---

### Der algorithmische Score

Kernstück der App. Ein Wert von 0–5.0, aufgeschlüsselt in fünf Kategorien:

**Financial Ratios (65% Standardgewicht)**
Bruttomarge, Operating Margin, Umsatzwachstum, P/E Ratio, FCF Yield. Jede Kennzahl wird gegen akademische Benchmarks bewertet — Graham, Damodaran NYU, CFA Institute. Nicht gegen den Sektor-Durchschnitt (der sich opportunistisch ändert) sondern gegen absolute, publizierte Standards.

**Management Quality (12%)**
Insider-Kaufquote der letzten 20 Transaktionen. Akademisch belegt: Insider-Käufe prognostizieren überdurchschnittliche Returns (Seyhun 1986, Piotroski F-Score). Wenn das Management eigenes Geld in die eigene Aktie steckt ist das ein Signal.

**Moat / Competitive Advantage (10%)**
Bruttomarge-Niveau und Trend. Eine dauerhaft hohe und steigende Bruttomarge ist das klarste quantitative Signal für einen Burggraben (Morningstar-Methodik, Buffett).

**ESG & Risk (8%)**
Beta als Volatilitätsmaß. Für konservative Investoren höher gewichtet.

**Valuation (5%)**
P/E und EV/EBITDA als reine Bewertungskennzahl.

Ergebnis: ≥4.0 Strong Buy · ≥3.3 Buy · ≥2.5 Hold · <2.5 Avoid

Die Gewichte verschieben sich mit deinem Profil. Der Score ist kein absolutes Urteil — er ist eine Antwort auf die Frage "passt diese Aktie zu meiner Strategie?"

---

### DCF Stresstest

Fair Value Berechnung mit drei Szenarien:

- **Bear Case** — was ist die Aktie wert wenn Wachstum einbricht und Margen fallen
- **Base Case** — was ist die Aktie wert bei aktuellen Trends
- **Bull Case** — was ist die Aktie wert wenn alles gut läuft

Du kannst Wachstumsrate, Marge und WACC (Kapitalkostensatz) selbst verschieben und siehst live wie sich der faire Kurs verändert. Der Unterschied zwischen "die Aktie kostet 150€" und "die Aktie ist bei meinen Annahmen 120–200€ wert, aktuell also 15% unterbewertet."

---

### Peer-Vergleich / Comparison

Du analysierst NVIDIA und willst wissen ob AMD oder INTC besser aufgestellt sind. Du klickst auf `+` in der Suchzeile, fügst bis zu drei Vergleichs-Ticker hinzu — Score, Margen, Wachstum, Bewertung aller Unternehmen nebeneinander in einer Matrix. Keine neue Seite, direkt in der laufenden Analyse.

---

### AI-Chat — das Herzstück

Nicht ein Button der einen generischen Text generiert. Ein vollständiger, kontextbewusster Chat-Assistent der:

**Einordnet statt nur Zahlen zu nennen**
"P/E 28x" ist eine Zahl. "P/E 28x ist für ein Software-Unternehmen mit 22% Umsatzwachstum und 40% FCF-Marge im historischen Kontext moderat bewertet — teurer als der S&P-Durchschnitt aber gerechtfertigt durch das Wachstumsprofil" ist eine Einordnung. pondex liefert die Einordnung.

**Dein Profil kennt**
Der Chat weiß dass du Growth-Investor mit langem Horizont bist. Er erklärt Dinge nicht für einen Day-Trader sondern für dich. Er bewertet die Aktie nicht abstrakt sondern: "Für dein Profil ist X weil Y."

**Dein Portfolio kennt**
Du fragst "soll ich ASML kaufen?" — der Chat weiß dass du bereits NVDA und TSMC hast und 58% Halbleiter-Exposure. Er berücksichtigt das in seiner Antwort. "ASML würde dein Halbleiter-Exposure auf 68% erhöhen — das Unternehmen ist fundamental stark aber du hast bereits starkes Sektor-Klumpenrisiko."

**Die aktuelle Aktie kennt**
Du analysierst NVDA und fragst "was denkst du?" — der Chat hat den aktuellen Score, alle Kennzahlen, Insider-Aktivität, News der letzten Tage, den DCF-Wert. Er antwortet auf Basis echter, frischer Daten nicht aus seinem Training-Wissen.

**Vergleiche anstellt**
"Vergleich NVDA und AMD für mein Growth-Profil" — der Chat holt beide Datensätze, berechnet beide Scores und erklärt die Unterschiede in einer klaren Gegenüberstellung.

**Konzepte erklärt**
"Was ist WACC?" "Warum ist Free Cash Flow wichtiger als Gewinn?" "Erkläre mir den Unterschied zwischen Gross Margin und Operating Margin." Der Chat ist auch Lernwerkzeug.

**Szenarien durchdenkt**
"Was passiert mit meinem Portfolio wenn die Zinsen um 1% steigen?" "Welche meiner Positionen sind am stärksten von einem Dollar-Anstieg betroffen?" "Was wäre der Worst Case für mein Portfolio wenn wir eine Rezession bekommen?"

Der Chat-Verlauf bleibt in der Session erhalten — du kannst über mehrere Nachrichten ein Thema vertiefen, nicht nur einmalige Fragen stellen.

---

### Proaktive Aktienvorschläge — die Intelligence Engine

Das ist der Sprung von einem Analyse-Tool zu einem persönlichen Investment-Assistenten. Du öffnest pondex und siehst Vorschläge — nicht weil du gesucht hast, sondern weil pondex genug über dich weiß.

**Alle Parameter die einfließen:**

*Dein Strategie-Profil*
Was du explizit festgelegt hast — Zeithorizont, Risikobereitschaft, Fokus, Score-Gewichtungen.

*Dein Portfolio*
Sektor-Konzentration (60% Tech → pondex sucht in anderen Sektoren), geographische Konzentration (nur US → europäische Alternativen), Bewertungs-Mix (nur hochbewertete Growth → günstige Ergänzungen), Korrelation (kein zweites NVDA wenn du AMD schon hast), Performance der bestehenden Positionen, durchschnittliche Haltedauer.

*Dein Trade Journal*
Welche Branchen du historically bevorzugt hast, bei welchen Scores du gekauft hast, wann du verkauft hast, Begründungen aus deinen Notizen, Eigenschaften von Verlust-Trades (werden gemieden).

*Makro-Kontext*
Zinsniveau (hohes Zinsumfeld → Value/Dividend gegenüber Growth bevorzugt), Rezessionswahrscheinlichkeit (erhöhtes Risiko → defensivere Sektoren), Sektorrotation (wo fließt Kapital rein/raus), Volatilität (VIX hoch → niedrig-Beta Aktien bei conservative Profil), Währungsumfeld, Zentralbank-Zyklus.

*Fundamentale Qualitäts-Filter*
Harte Mindestkriterien: Umsatz wächst, positiver Free Cash Flow oder klarer Weg dahin, keine akute Bilanzgefährdung, kein massiver Insider-Ausverkauf, Score über Profil-Schwellenwert.

*Bewertungskontext*
Absolut (DCF fair bewertet / unter / überbewertet), relativ zur eigenen Historie (günstiger oder teurer als historisch), relativ zu Peers (vs. Sektor-Durchschnitt), Margin of Safety (wie viel Puffer zwischen Kurs und Fair Value).

*Technische Signale*
Als Timing-Hinweis, nicht als primärer Filter: Trend, RSI (überkauft/überverkauft), relative Stärke. Für Momentum-Profile stärker gewichtet.

*Katalysatoren*
Anstehendes Earnings-Release, Produktlaunch, Analyst-Upgrades/-Downgrades, Index-Aufnahme.

*Thematische Präferenzen*
Was pondex über Zeit aus deinem Verhalten lernt: welche Themen dich interessieren (AI, Nachhaltigkeit, Emerging Markets), welche Unternehmensgrößen du bevorzugst, welche Regionen du analysierst.

*Watchlist-Verhalten*
Aktien die du watchgelistet aber nicht gekauft hast — wenn der Kurs gefallen ist aber die Fundamentals gleich geblieben sind könnte das jetzt der richtige Zeitpunkt sein.

**Wie ein Vorschlag aussieht:**

Nicht einfach "schau dir ASML an". Jeder Vorschlag enthält:

- **Warum diese Aktie für dich** — bezogen auf dein spezifisches Profil, nicht generisch
- **Was dagegen spricht** — ehrlich, jeder Vorschlag hat eine explizite Risiko-Sektion
- **Was du schon hast das ähnlich ist** — Korrelations-Hinweis
- **Score und Einzelkategorien** — sofort sichtbar
- **Confidence-Level** — wie stark ist der Datenboden (10 Jahre Fundamentaldaten vs. junges Unternehmen)

pondex wird mit der Zeit besser — nicht weil du mehr eingibst, sondern weil du es benutzt. Jede analysierte Aktie, jeder Kauf, jeder Journal-Eintrag schärft das Modell.

---

### Portfolio & Trade Journal

Du trägst deine Positionen ein — Ticker, Kaufpreis, Anzahl Aktien, Datum. pondex berechnet P&L, Gesamtperformance, Sektorgewichtung, geographische Verteilung.

Das Trade Journal erlaubt dir Notizen zu jedem Kauf und Verkauf. "Warum habe ich das gekauft?" "Was hat meine These bestätigt oder widerlegt?" Das ist nicht nur für die Dokumentation — pondex liest diese Notizen und versteht über Zeit was dir wichtig ist.

Alles lokal — keine Cloud, kein Account, alles nur in deinem Browser-localStorage.

---

### Makro-Dashboard

Zinsentwicklung, wichtige Indizes, FX-Kurse, Rohstoffpreise, Zentralbank-Entscheidungen im Überblick. Kontext für die Einzelaktien-Analyse. Eine Aktie mit P/E 40 bei 2% Zinsen ist fundamental anders zu beurteilen als bei 5% Zinsen.

---

### Markets-Überblick

Marktbarometer (S&P 500 P/E vs. historischem Durchschnitt mit Einordnung: unterbewertet / fair / überbewertet / Bubble), Sektor-Heatmap, Major Indices mit Mini-Charts, Live Ticker-Tape mit Echtzeit-Kursen.

---

## Die USPs — direkter Vergleich

| | pondex | Yahoo Finance | Seeking Alpha | Morningstar | Bloomberg |
|---|---|---|---|---|---|
| Kostenlos | ✓ | ✓ | teilweise | teilweise | ✗ |
| Strategie-relativer Score | ✓ | ✗ | ✗ | ✗ | ✗ |
| Zahlen werden eingeordnet | ✓ | ✗ | teilweise | teilweise | ✓ |
| AI-Chat mit Portfolio-Kontext | ✓ | ✗ | ✗ | ✗ | ✗ |
| Proaktive Aktienvorschläge | ✓ | ✗ | ✗ | ✗ | ✗ |
| DCF Stresstest | ✓ | ✗ | Premium | Premium | ✓ |
| Alles in einer Oberfläche | ✓ | teilweise | teilweise | teilweise | ✓ |
| Kein Account nötig | ✓ | ✗ | ✗ | ✗ | ✗ |
| Daten lokal / privat | ✓ | ✗ | ✗ | ✗ | ✗ |

---

## Was pondex nicht ist

- Kein Trading-Tool. Keine Order-Ausführung, keine Depotanbindung (Phase 4 geplant).
- Kein Social Network. Keine Community, keine Kommentare, kein "andere Nutzer sagen".
- Keine Finanzberatung im rechtlichen Sinne. Algorithmische Signale, keine Empfehlungen.
- Kein Daytrading-Tool. Keine Tick-Charts, kein Orderbuch, keine Level-2-Daten.

---

## Warum Single-File HTML

Bewusste Designentscheidung. Kein Backend, kein Account, kein Server der Daten speichert. Du kannst die Datei herunterladen und offline nutzen (bis auf API-Calls). Portfolio-Daten, Strategie-Profil, API-Keys — alles in deinem Browser-localStorage. Niemand außer dir sieht das. Null Datenschutzrisiko für persönliche Finanzdaten.

---

## Produktphasen

### Phase 1 — MVP ✅ DONE
- Ticker-Suche weltweit (LOCAL_TICKER_MAP + Massive API)
- Algorithmisches Scoring (5 Faktoren, profilgewichtet)
- DCF-Modell mit Stresstest (3 Szenarien)
- 12 Analytics-Tiles: Scorecard, Chart, Valuation, News, Insiders, Dividends, Financials, Analysts, AI Insights, Company, Ownership, Stresstest
- Live-Ticker-Band (Echtzeit via Finnhub WebSocket)
- Peer-to-Peer Comparison Matrix
- Portfolio (manuell)
- AI Insights via Groq (Llama 3.3 70B)
- Globale Abdeckung: US, Europa, Asien, Emerging Markets

### Phase 2 — Intelligence ✅ / 🚧 IN PROGRESS
- ✅ Strategie-Profil mit Persistenz
- ✅ Proaktive Aktienvorschläge (Ideas-Seite, AI-basiert)
- ✅ AI-Chat (kontextbewusst: Profil + Portfolio + aktuelle Aktie)
- 🚧 Algorithmische Discovery (ohne AI, rein scorecard-basiert aus kuriertem Universum)
- 🚧 Source-based Discovery (YouTuber, Blogs, RSS → Ticker-Extraktion → pondex-Check)

### Phase 3 — Trade Journal ⬜ GEPLANT
- Manuelle Trade-Eingabe mit Notizen
- CSV-Import (Broker-Export)
- Performance-Analyse: Score zum Kaufzeitpunkt vs. heute
- Was hat meine These bestätigt oder widerlegt?

### Phase 4 — Broker-API ⬜ GEPLANT
- Trade Republic, Scalable Capital, IBKR
- Automatische Portfolio-Synchronisation

### Phase 5 — Multi-User / Produkt ⬜ GEPLANT
- Auth (Supabase oder Clerk)
- PostgreSQL-Datenbank
- Abo-Modell
- Mobile App (PWA oder React Native)

---

## Technische Architektur (aktuell)

```
Browser (index.html — single file)
  └── Alle Logik in einer Datei (kein Build-System, kein Framework)
  └── localStorage: Portfolio, Watchlist, Trades, Theme, Strategie-Profil

Cloudflare Worker (trading.d-lenz-contact.workers.dev)
  ├── /yahoo/summary/{ticker}     ← Financials, Margins, P/E (global, kein Key)
  ├── /yahoo/chart/{ticker}       ← OHLC Chart-Daten (global, kein Key)
  ├── /yahoo-news?q={ticker}      ← News (global, kein Key)
  ├── /massive/{endpoint}         ← Ticker-Details, Dividenden, Logos (MASSIVE_KEY)
  ├── /edgar/{path}               ← Insider-Trades, EPS (US, kein Key)
  ├── /branding/{path}            ← Firmen-Logos (MASSIVE_KEY)
  └── /ai/groq                    ← AI Proxy (GROQ_KEY)

Worker Secrets (Cloudflare Dashboard — nie im Browser):
  MASSIVE_KEY  — Massive/Polygon API Key
  GROQ_KEY     — Groq API Key (Llama 3.3 70B)

Finnhub WebSocket — Echtzeit-Quotes für Ticker-Tape (hardcoded free key)
```

## Datenquellen

| Quelle | Wofür | Limit |
|---|---|---|
| Yahoo Finance | Charts, Financials, News, alle globalen Aktien | kein Key, kein Limit |
| Massive/Polygon | Ticker-Details, Dividenden, Logos | 5 req/min free tier — gecacht |
| SEC EDGAR | Insider-Trades Form 4, EPS-History | nur US-Aktien, kein Limit |
| Groq / Llama 3.3 70B | AI Insights, AI-Chat, Vorschläge | Worker Secret |
| Finnhub WebSocket | Echtzeit-Preise Ticker-Tape | Free Key hardcoded |

## LocalStorage-Keys

| Key | Inhalt |
|---|---|
| `pondex_strategy` | Strategie-Profil + Weights (JSON) |
| `pondex_theme` | `light` / `dark` |
| `pondex_groq_key` | Groq Key (optional, falls eigener Key) |
| `sr_portfolio` | Portfolio-Positionen |
| `sr_watchlist` | Watchlist |
| `sr_trades` | Trade-Journal |

## Scoring-Logik

```
Financial Ratios    50–75%  — P/E, Margins, Growth, EV/EBITDA, FCF-Yield
Management          10–22%  — Insider-Aktivität (Form 4, US only)
Moat / Competitive  10–15%  — Gross Margin Level + Trend
ESG & Risk           5–13%  — Beta
DCF / Valuation      5–20%  — P/E, EV/EBITDA

Thresholds passen sich dem Profil an:
  Growth:   P/E excellent=40x, revenueGrowth excellent=30%
  Value:    P/E excellent=12x, revenueGrowth excellent=10%
  Dividend: FCF-Yield excellent=7%
  Balanced: Defaults (P/E 15x, growth 20%)

Score-Label: ≥4.0 Strong Buy · ≥3.3 Buy · ≥2.5 Hold · <2.5 Avoid
```

## Globale Abdeckung

Jede Aktie auf Yahoo Finance — 70.000+ Ticker weltweit.

Einschränkungen:
- Insider-Trades (EDGAR Form 4): nur US-Aktien
- EPS-History: nur US-Aktien (GAAP)
- Dividenden: hauptsächlich US + große ADRs
- Namenssuche: LOCAL_TICKER_MAP (~150 bekannte) + Massive API

## Entwicklungsregeln

- Eine Datei — kein Build-System, kein npm, kein Framework
- Keine kostenpflichtigen APIs (alles free-tier oder Worker-proxied)
- Alle API-Keys server-seitig (Cloudflare Worker Secrets) — nie im Browser
- Yahoo Finance für globale Finanzdaten (kein Key, kein Limit)
- Massive nur für Ticker-Details, Dividenden, Logos (5 req/min — cachen)
- Kein Backend, keine Datenbank, keine Server-seitige Nutzerdaten
