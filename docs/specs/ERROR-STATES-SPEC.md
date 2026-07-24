# pondex_ — Error States & Empty States Specification
_Stand: 2026-07-24 · Gilt für alle Seiten und Komponenten_

---

## Prinzipien

1. **Nie leer lassen** — Jeder leere oder fehlerhafte Zustand hat eine Nachricht
2. **Immer eine Aktion anbieten** — Was kann der User als nächstes tun?
3. **Kein technisches Jargon** — "Ticker not found" statt "404 Not Found"
4. **Kein Fake-Content** — Leerer State > erfundene Daten
5. **Phase-ehrlich** — "Coming Q4 2026" statt "Kommt bald™"

---

## 1. Stock-Analyse (/app/stock)

### 1.1 Leerer Zustand (kein Ticker in URL)

```
[ Stock ]
Get your verdict.

[Input: Ticker eingeben...]  [GET VERDICT →]
```
- Keine Demo-Chips (wurden entfernt)
- Input mit Placeholder "AAPL, NVDA..."

### 1.2 Loading-Zustand

```
[Ticker im Input]  [... ]
↓
Content-Bereich: leer (kein Spinner, kein Skeleton)
```
- Button zeigt "..." und ist deaktiviert
- Kein Flicker durch Skeleton-Loader

### 1.3 Fehler — Demo-Ticker (kein Backend)

```
Ticker not found or not in demo set.

Try a demo ticker:
[AAPL] [NVDA] [MSFT] [TSLA] [GOOGL] [AMZN]
```
- Chips sind klickbar → starten Analyse direkt
- Farbe: C.down (rot) für die Fehlermeldung
- Kein technischer Error-Text

### 1.4 Fehler — API-Timeout (Phase C)

```
Could not reach the analysis server. Please try again.
[Try again →]
```
- Retry-Button ruft `analyse(currentTicker)` erneut auf
- Nach 3 Versuchen: "Still having trouble? The server may be restarting. Try in 30 seconds."

### 1.5 Fehler — Ticker nicht gefunden (Phase C, echter Backend)

```
"[TICKER]" not found.
Check the ticker symbol and try again.

Try a known stock: [AAPL] [NVDA] [MSFT]
```

---

## 2. Tabs im Stock-Detail

### 2.1 News Tab

```
[ News ]
News feed coming in Phase C.
Requires NewsAPI integration · no placeholder data shown.
```

### 2.2 Order Book Tab

```
[ Order Book ]
Live order book coming in Phase C.
Requires real-time market data feed.
```

### 2.3 Exit Check Tab

```
[ Exit Check ]
Exit Strategy coming Q4 2026.

Enter your purchase price to track your thesis and receive
HOLD / TRIM / EXIT signals based on score decay and
fundamental changes.

Research signal only · Not financial advice
```

### 2.4 Upcoming Events (Overview Tab)

```
[ Upcoming events ]
Calendar data coming in Phase C.
```

### 2.5 Financials — keine Daten

```
Financial data unavailable.
```
(Keine weitere Aktion — Daten kommen wenn Backend live)

---

## 3. Home Dashboard

### 3.1 Watchlist — kein Backend (Demo-Modus)

```
Watchlist · 4 stocks
```
(Keine Dollar-Summe wenn keine Live-Preise verfügbar)

### 3.2 Top Movers — kein Backend

- Karten zeigen "—" für Preis und Change
- Kein Error-State — Karten bleiben sichtbar mit Tickers

### 3.3 Upcoming Events — keine Events

- Sektion wird ausgeblendet wenn Events-Array leer
- Kein Placeholder-Text nötig

---

## 4. Portfolio

### 4.1 Positions Tab — leer

```
[ No positions ]
You have no open positions.

[Analyse a stock →]  → /app/stock?ticker=AAPL
```

### 4.2 Watchlist Tab — kein Backend (Demo-Modus)

- Zeilen zeigen "—" für Preis und Change
- Kein Error-State — Struktur bleibt sichtbar

### 4.3 Transactions Tab — leer

```
[ No transactions ]
No buy/sell history yet.
Transactions will appear here once portfolio tracking is available. Coming Q4 2026.

[Explore stocks →]  → /app/markets
```

### 4.4 Account Tab — Member Since

- Mit `user.createdAt`: Jahr daraus ableiten
- Ohne: `new Date().getFullYear()`
- Niemals hardcoded "2026"

---

## 5. Markets

### 5.1 Top Movers / Popular — kein Backend

```
Loading market data...
```
Skeleton-Placeholder: 6 graue Karten (gleiche Größe wie echte Karten)
Nach 5s ohne Antwort:
```
Market data unavailable. Try again later.
[Refresh →]
```

### 5.2 News Tab

```
[ Market News ]
News coming in Phase 2.
Requires NewsAPI key.
```

### 5.3 Collections — nicht-funktionale Karten

- Karten ohne Demo-Ticker: cursor default, kein hover-Effekt
- Karten mit Demo-Tickern: klickbar → filtert Movers-View

---

## 6. Robo Advisor

### 6.1 Savings Plans Tab

```
[ Savings Plans ]
Recurring investments coming Q4 2026.
Set up automatic monthly investments into your Robo portfolio.
```

### 6.2 Round-up Tab

```
[ Round-up ]
Spare change investing coming Q4 2026.
Round up every transaction and invest the difference automatically.
```

### 6.3 Forecasts Tab

```
[ Forecasts ]
Portfolio projections coming Q4 2026.
See how your portfolio could grow over 5, 10, 20 years.
```

### 6.4 Onboarding — Ergebnis

```
[ Profile complete ]
Your profile is ready.
Based on your answers: [Conservative / Core / Growth] Portfolio.
Portfolio building is coming Q4 2026.

[Back to overview]  [Start over]
```

---

## 7. CFD

### 7.1 "Join Waitlist" Button

```
Toast-Notification (oben rechts, 3s):
"You are on the waitlist. We'll be in touch."
```
- Kein browser `alert()`
- Kein /signup redirect (User ist bereits eingeloggt)

### 7.2 Instruments Table — Change Column

```
+0.82% (preview)
```
- In C[400] (grau), nicht grün/rot
- Oder: Change-Spalte ganz ausblenden bis live

---

## 8. Globale Error States

### 8.1 Session abgelaufen / localStorage gelöscht

```
AuthGuard greift → Redirect zu /login

Login-Seite zeigt keinen speziellen State
(User merkt es implizit durch die Weiterleitung)
```

### 8.2 Seite nicht gefunden (/404)

`PageNotFound.jsx` — wird bei Wildcard-Route angezeigt:
```
[ 404 ]
Page not found.

[Back to app →]  → /app
[Go to home →]   → /
```

### 8.3 Netzwerk offline (Phase C+)

```
(Fetch schlägt fehl → identisch zu API-Timeout-State)
"Could not reach the analysis server. Please try again."
```

---

## 9. Loading States

| Komponente | Loading-Zustand |
|---|---|
| Stock Analyse | Button → "...", Content leer |
| Home Watchlist | Preise zeigen "—" bis geladen |
| Home Top Movers | Preise zeigen "—" bis geladen |
| Markets Grid | 6 Skeleton-Karten (grauer BG, gleiche Größe) |
| StockChart | "Loading chart…" zentriert in Chart-Bereich |
| Portfolio Watchlist | Preise zeigen "—" bis geladen |

---

## 10. Disclaimer-Zustände

Immer sichtbar, nie hinter einem Klick:

| Kontext | Text |
|---|---|
| Score-Card | "⚠ Research tool only · Not financial advice" |
| StockChart (Demo) | "Illustrative · Live chart requires backend" |
| CFD Instruments | "[ Preview data — not live. CFD trading coming Q4 2026. ]" |
| Exit Check (Phase E2) | "Research signal only · Not financial advice" |
| RoboAdvisor Returns | "Historical estimate only — not a guarantee" |
| AI Chat (Phase E3) | "AI-generated · Always verify sources · Not financial advice" |
| Footer (Landing) | "Research tool only — not financial advice · Data: Yahoo Finance & SEC EDGAR" |

---

_Stand: 2026-07-24_
_Verweis: UX-STRUCTURE-SPEC.md §5 (User Flows mit Error States) · COUNCIL-AUDIT-2026-07-23.md_
