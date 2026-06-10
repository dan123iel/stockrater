# futara — Algorithmic Investment Intelligence

**Live:** https://dan123iel.github.io/stockrater/
**Repo:** https://github.com/dan123iel/stockrater

---

## Vision

> „Ich will wissen ob diese Aktie zu meiner Strategie passt — algorithmisch, transparent, ohne Interessenskonflikt."

futara ist eine algorithmische Investment-Plattform die:
- Aktien nach objektiven Kennzahlen bewertet (Scorecard)
- Entscheidungen auf die persönliche Anlagestrategie abstimmt
- Eigene Trades analysiert und bewertet
- Eine Alternative zu Bankberatern und meinungsbasierten Quellen darstellt

Zielgruppe: Privatanleger die selbst investieren und fundierte, nachvollziehbare Entscheidungsunterstützung wollen — kein Bloomberg-Abo, kein Youtuber-Opinion.

---

## Produktphasen

### Phase 1 — MVP (aktuell)
Serverlose Single-Page-App, Design von Logik getrennt.
- Ticker-Suche + algorithmisches Scoring
- DCF-Modell mit Stresstest
- Vergleich (Peer-to-Peer Matrix)
- Portfolio (manuell)
- Live-Ticker (Finnhub WebSocket)
- News (Finnhub REST)

### Phase 2 — Strategie-Profil
- Onboarding: Anlagehorizont, Risikotoleranz, Fokus (Value/Growth/Dividende)
- Score wird relativ zur Strategie berechnet, nicht absolut
- "Warum 4.2?" — Erklärung jeder Score-Komponente

### Phase 3 — Trade-Journal
- Manuelle Trade-Eingabe
- CSV-Import (Broker-Export)
- Performance-Analyse: War meine Entscheidung gut?
- Vergleich Entscheidungszeitpunkt vs. heutiger Score

### Phase 4 — Broker-API
- Trade Republic (inoffizielle WebSocket-API)
- Scalable Capital (API-Beta)
- Automatische Portfolio-Synchronisation

### Phase 5 — Produkt / Multi-User
- Auth (Supabase oder Clerk)
- PostgreSQL-Datenbank (Supabase)
- Nutzer-Profile mit eigener Strategie + Portfolio
- Abo-Modell

---

## Architektur (aktuell)

```
Browser
  └── index.html          ← Design (HTML + CSS only, austauschbar)
  └── src/js/app.js       ← Logik (komplett design-unabhängig)
  └── worker.js           ← Cloudflare Worker (Yahoo Finance Proxy)

Externe APIs
  └── Finnhub             ← Live-Preise (WebSocket) + News (REST)
  └── FMP                 ← Fundamentaldaten (optional)
  └── Yahoo via Worker    ← Summary, Chart, Historische Daten
```

**Design wechseln:** `index.html` austauschen, `app.js` bleibt unverändert.
Alle Designs liegen in `test2/`, `test3/`, `test4/` als Referenz.

---

## Dateistruktur

```
index.html          ← Aktives Design (HTML + CSS)
src/js/app.js       ← Gesamte Anwendungslogik
worker.js           ← Cloudflare Worker (Backend-Proxy)
test/index.html     ← Design V0 — Space Grotesk / Brutalist
test2/index.html    ← Design V1 — Dark Purple (Syne)
test3/index.html    ← Design V2 — Editorial Beige (DM Serif Display)
test4/index.html    ← Design V3 — Minimalist Air (Cormorant Garamond)
public/robots.txt   ← SEO
sitemap.xml         ← SEO
PROJECT.md          ← dieses Dokument
README.md           ← öffentliche Beschreibung
```

---

## app.js — Logik-Übersicht

| Bereich | Funktion |
|---------|----------|
| Navigation | `showPage()` |
| Ticker-Tape | `buildTape()`, `connectFinnhubWS()`, `renderTape()` |
| Market Pulse | `buildMarketPulse()` |
| News | `loadMarketsNews()`, `loadTickerNews()`, `openNewsModal()` |
| Suche | `toggleNavSearch()`, `navFilterSearch()`, `renderNavDropdown()` |
| Analytics | `openTicker()`, `loadTickerData()`, `updateAnalyticsUI()` |
| Chart | `drawPriceChart()` |
| DCF | `updateDCF()` |
| Comparison | `launchComparison()`, `loadComparison()` |
| Theme | `setTheme()`, `toggleTheme()` |
| Init | `init()` — läuft beim Start |

---

## API-Keys & Konfiguration

| Service | Key/URL | Wo |
|---------|---------|-----|
| Finnhub | `d8k2199r01qjgd6qgrugd8k2199r01qjgd6qgrv0` | `app.js` FINNHUB_KEY |
| Yahoo Worker | `https://fragrant-wave-6bd7.d-lenz-contact.workers.dev` | localStorage `sr_workerurl` |
| FMP (optional) | eigener Key | localStorage `fmpApiKey` |

---

## Worker-Endpunkte

| Endpunkt | Liefert |
|----------|---------|
| `/yahoo/summary/{TICKER}` | Fundamentals, Ratios, Financials |
| `/yahoo/chart/{TICKER}?range={range}` | OHLC-Kursdaten |
| `/yahoo/search` | **disabled** — nicht aufrufen |

---

## LocalStorage-Keys

| Key | Inhalt |
|-----|--------|
| `sr_portfolio` | Positionen |
| `sr_watchlist` | Watchlist |
| `sr_trades` | Trade-Journal |
| `sr_cache` | API-Cache (1h TTL) |
| `sr_workerurl` | Worker-URL (überschreibbar) |
| `fmpApiKey` | FMP API-Key |
| `theme` | `light` / `dark` |

---

## Scoring-Logik (Phase 1)

Aktuell: 10-Faktoren gewichtet, absolut.

```
Financial Ratios    65%  — P/E, Margins, Growth, EV/EBITDA
Management          12%  — Insider-Aktivität, Vergütung
Moat / Competitive  10%  — Marktposition, Pricing Power
ESG & Risk           8%  — Beta, Volatilität, Governance
DCF / Valuation      5%  — Margin of Safety
```

**Geplant Phase 2:** Score relativ zur Anlagestrategie des Nutzers.
Ein P/E von 30x ist für einen Growth-Investor anders zu werten als für einen Value-Investor.

---

## Verbesserungspotenzial (Backlog)

- [ ] Strategie-Profil beim Onboarding (Horizont, Risiko, Fokus)
- [ ] Score-Erklärung: "Warum zieht Valuation den Score runter?"
- [ ] Trade-Journal mit Performance-Rückblick
- [ ] CSV-Import (Broker-Export)
- [ ] Strategie-gefilterter Score
- [ ] Alerts (Kurs fällt unter SMA200, Score-Änderung)
- [ ] Watchlist mit Benachrichtigungen
- [ ] Supabase-Auth für Multi-User
- [ ] Trade Republic / Scalable API

---

## Regeln

- Design und Logik sind getrennt — nie JS in `index.html` schreiben
- `app.js` ist die einzige Logik-Datei
- Worker-URL nie hardcoden — immer über localStorage
- Keine farbigen Tabellen-Hintergründe — nur Text/Bars farbig
- Auto-push Hook aktiv — jede Dateiänderung wird automatisch committed
