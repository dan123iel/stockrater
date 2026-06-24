# pondex — Algorithmic Investment Intelligence

**Live:** https://dan123iel.github.io/stockrater/
**Repo:** https://github.com/dan123iel/stockrater

---

## Vision

> „Ich will wissen ob diese Aktie zu meiner Strategie passt — algorithmisch, transparent, ohne Interessenskonflikt."

pondex ist eine algorithmische Investment-Plattform die:
- Aktien **weltweit** nach objektiven Kennzahlen bewertet (Scorecard)
- Entscheidungen auf die persönliche Anlagestrategie abstimmt
- Eigene Trades analysiert und bewertet
- Aktien-Empfehlungen basierend auf Profil + Portfolio generiert
- Eine Alternative zu Bankberatern und meinungsbasierten Quellen darstellt

Zielgruppe: Privatanleger die selbst investieren und fundierte, nachvollziehbare Entscheidungsunterstützung wollen — kein Bloomberg-Abo, kein Youtuber-Opinion.

---

## Produktphasen

### Phase 1 — MVP ✅ DONE
Serverlose Single-Page-App, globale Aktienabdeckung, keine kostenpflichtigen APIs.
- ✅ Ticker-Suche (Name + Symbol) — weltweit über LOCAL_TICKER_MAP + Massive API
- ✅ Algorithmisches Scoring (5 Faktoren, profilgewichtet)
- ✅ DCF-Modell mit Stresstest (3 Szenarien)
- ✅ 12 Analytics-Tiles: Scorecard, Chart, Valuation, News, Insiders, Dividends, Financials, Analysts, AI Insights, Company, Ownership, Stresstest
- ✅ Live-Ticker-Band (Yahoo Finance, 60s Refresh)
- ✅ Vergleich (Peer-to-Peer Matrix)
- ✅ Portfolio (manuell)
- ✅ AI Insights via Groq (Llama 3.3 70B, kein User-Key nötig)
- ✅ Globale Abdeckung: US, Europa, Asien, Emerging Markets (Yahoo Finance)

**Datenquellen (alle kostenlos):**
- Yahoo Finance — Financials, Chart, News, alle globalen Aktien
- Massive (Polygon) — Ticker-Details, Dividenden, Branding/Logo
- SEC EDGAR — Insider-Trades (Form 4), EPS-History (US-Aktien)
- Groq / Llama 3.3 70B — AI Insights (Worker Secret)
- Cloudflare Worker — Proxy für alle APIs (kein Key im Browser)

---

### Phase 2 — Portfolio + Strategie-Empfehlungen 🚧 IN PROGRESS

#### 2a — Portfolio-Verwaltung ✅ DONE
- ✅ Portfolio-Eingabe: Ticker + Anzahl Shares + Kaufpreis (localStorage)
- ✅ Live P&L: aktueller Preis via Yahoo Chart
- ✅ Remove position
- ❌ CSV-Import (Broker-Export) — Phase 3
- ❌ Sektor/Region-Gewichtung + Donut-Chart mit echten Daten

#### 2b — Strategie-basierte Empfehlungen ✅ DONE (Ideas page)
- ✅ "ideas 💡" Seite in Navigation
- ✅ AI generiert 6 Aktien-Empfehlungen basierend auf: Profil + Portfolio + Makro
- ✅ Mindestens 1 internationale Aktie, 2 verschiedene Sektoren
- ✅ Makro-Context (Zinsen, Regime) fließt in Prompt ein
- ✅ Klick auf Karte öffnet direkt Analytics für die Aktie

#### 2c — AI Chat ✅ DONE
- ✅ Persistent Chat auf Ideas-Seite (Gesprächsverlauf bleibt in Session)
- ✅ Context-aware: kennt Profil, aktuell betrachtete Aktie, Portfolio
- ✅ "Compare NVDA and AMD for my Growth profile" funktioniert
- ✅ Letzte 10 Exchanges als Kontext übergeben (20 Messages)

#### 2d — Strategie-Profil Persistenz ✅ DONE
- ✅ Profil in localStorage — überlebt Seitenreload
- ✅ Onboarding nur für neue Nutzer
- ✅ Profile-aware Scoring-Thresholds

#### 2e — Source-based Discovery 🔜 GEPLANT
**Idee:** Der Nutzer kann externe Quellen (YouTuber, Blogs, Websites) hinterlegen.
pondex extrahiert daraus erwähnte Aktien, analysiert sie algorithmisch nach dem Nutzerprofil
und gibt einen gefilterten, strategie-konformen Vorschlag zurück.

**Feature A — Content-Source Feed (vom Nutzer konfigurierbar)**
- Nutzer fügt Quellen hinzu: YouTube-Kanal-URL, Blog-URL, RSS-Feed, Newsletter-Link
- pondex liest den aktuellen Content (via Cloudflare Worker → RSS oder YouTube transcript API)
- Groq/LLM extrahiert erwähnte Ticker aus dem Text
- Jede gefundene Aktie wird automatisch gescort (Yahoo Finance → pondex Scorecard)
- Ergebnis: gefilterte Liste "Diese Aktien wurden in deinen Quellen genannt — hier ist der pondex-Check"
- Nutzer sieht: Ticker, Erwähnung in welcher Quelle, pondex Score, Fit zu seiner Strategie

**Feature B — Algorithmische Discovery (ohne Nutzereingabe)**
- pondex schlägt proaktiv Aktien vor, die zu Profil + Portfolio + Makro passen
- Basis: kurierte Watchlist von ~500 bekannten Qualitätsaktien (global)
- Filter: Profil-Schwellenwerte (P/E, Margen, Wachstum), Portfolio-Lücken (fehlende Sektoren/Regionen)
- Ranking: pondex Scorecard — nur Aktien über Schwellenwert werden gezeigt
- Bereits vorhanden als Groq-basierte Empfehlung (2b) — Extension: algorithmisch statt AI-generiert

**Quellen-Typen (geplant):**
- YouTube-Kanäle (z.B. Finanzfluss, The Plain Bagel, Joseph Carlson, Dividend Bull)
  → via YouTube Data API (free 10k req/day) oder Transcript-Extraktion
- Blogs / Substack / Seeking Alpha Artikel → via RSS oder URL-Fetch + LLM-Extraktion
- Reddit (r/investing, r/stocks, r/wallstreetbets) → via Reddit API (free, OAuth)
- Eigene Link-Liste (beliebige URL, pondex versucht Ticker zu extrahieren)

**Technischer Stack:**
- Quellen werden in localStorage gespeichert (Name + URL + Typ)
- Cloudflare Worker fetcht den Content (CORS-Problem umgehen)
- Groq extrahiert Ticker aus dem Text ("Which stocks are mentioned in this content?")
- Yahoo Finance holt Finanzdaten für jeden gefundenen Ticker
- pondex Scorecard filtert nach Nutzerprofil

**Einschränkungen:**
- YouTube Transcripts: kostenpflichtige API oder Workaround via yt-dlp (nicht im Browser möglich)
  → Lösung: User gibt manuell Video-URL ein, Worker holt Untertitel via YouTube API (free tier)
- Paywalled Content (Seeking Alpha Premium etc.) → nicht zugänglich, nur free articles
- RSS-Feeds: einfachste und zuverlässigste Option (die meisten Finanzblogs haben RSS)

---

### Phase 3 — Trade-Journal
- Manuelle Trade-Eingabe mit Notizen ("Warum habe ich das gekauft?")
- CSV-Import (Broker-Export)
- Performance-Analyse: War meine Entscheidung gut? (Score zum Kaufzeitpunkt vs. heute)
- Vergleich Entscheidungszeitpunkt vs. heutigem Score

---

### Phase 4 — Broker-API
- Trade Republic (inoffizielle WebSocket-API)
- Scalable Capital (API-Beta)
- IBKR (Interactive Brokers API)
- Automatische Portfolio-Synchronisation

---

### Phase 5 — Produkt / Multi-User
- Auth (Supabase oder Clerk)
- PostgreSQL-Datenbank (Supabase)
- Nutzer-Profile mit eigener Strategie + Portfolio
- Abo-Modell
- Mobile App (PWA oder React Native)

### Phase 6 — Mobile Optimierung 📱
- Responsive Layout für Smartphones (Dock-Tabs scrollbar, Charts touch-optimiert)
- PWA (Progressive Web App) — Add to Home Screen, Offline-Cache
- Touch Gestures für Chart-Zoom

---

## Architektur (aktuell — Phase 1)

```
Browser (pondex.html)
  └── Alle Logik in einer Datei (kein Build-System)
  └── localStorage: Portfolio, Watchlist, Trades, Theme, Strategie-Profil

Cloudflare Worker (trading.d-lenz-contact.workers.dev)
  ├── /yahoo/summary/{ticker}     ← Financials, Margins, P/E (global, kein Key)
  ├── /yahoo/chart/{ticker}       ← OHLC Chart-Daten (global, kein Key)
  ├── /yahoo-news?q={ticker}      ← News (global, kein Key)
  ├── /massive/{endpoint}         ← Ticker-Details, Dividenden, Logos (MASSIVE_KEY)
  ├── /edgar/{path}               ← Insider-Trades, EPS (US, kein Key)
  ├── /branding/{path}            ← Firmen-Logos (MASSIVE_KEY)
  └── /ai/groq                    ← AI Insights Proxy (GROQ_KEY)

Worker Secrets (Cloudflare Dashboard):
  MASSIVE_KEY  — Massive/Polygon API Key
  GROQ_KEY     — Groq API Key (Llama 3.3 70B)
```

---

## LocalStorage-Keys

| Key | Inhalt |
|-----|--------|
| `pondex_strategy` | Strategie-Profil + Weights (JSON) |
| `pondex_theme` | `light` / `dark` |
| `pondex_groq_key` | Groq Key (optional, falls eigener Key) |
| `sr_portfolio` | Portfolio-Positionen |
| `sr_watchlist` | Watchlist |
| `sr_trades` | Trade-Journal |

---

## Scoring-Logik (Phase 1 + Phase 2a)

5 Faktoren, profilgewichtet:

```
Financial Ratios    ~50-75%  — P/E*, Margins, Growth*, EV/EBITDA, FCF-Yield*
Management          ~10-22%  — Insider-Aktivität (Form 4, US only)
Moat / Competitive  ~10-15%  — Gross Margin Level + Trend
ESG & Risk          ~5-13%   — Beta
DCF / Valuation      ~5-20%  — P/E*, EV/EBITDA

* Thresholds passen sich dem Profil an:
  Growth:  P/E excellent=40x, revenueGrowth excellent=30%
  Value:   P/E excellent=12x, revenueGrowth excellent=10%
  Income:  FCF-Yield excellent=7%
  Balanced: Defaults (P/E 15x, growth 20%)
```

---

## Globale Aktienabdeckung

**Weltweit funktioniert:** Jede Aktie die auf Yahoo Finance gelistet ist — das sind 70.000+ Ticker weltweit.

**Einschränkungen:**
- Insider-Trades (EDGAR Form 4): nur US-Aktien
- EPS-History (EDGAR XBRL): nur US-Aktien (GAAP)
- Dividenden (Massive): hauptsächlich US + große ADRs
- Suche nach Name: LOCAL_TICKER_MAP (~150 bekannte Aktien) + Massive API (rate-limited)
- Direkteingabe Ticker: immer 100% zuverlässig weltweit

**Getestet ✅ (24.06.2026):** 60 Aktien aus US, Deutschland, Niederlande, Dänemark, Schweiz, Frankreich, UK, Spanien, Japan, Taiwan, China, Korea, Indien, Brasilien, Australien — alle pass.

---

## Regeln

- Eine Datei — kein Build-System, kein npm
- Keine kostenpflichtigen APIs (alles free-tier oder Worker-proxied)
- Alle API-Keys server-seitig (Cloudflare Worker Secrets) — nie im Browser
- Yahoo Finance für globale Finanz-Daten (kein Key, kein Limit)
- Massive nur für: Ticker-Details, Dividenden, Logos (5 req/min free tier — cachen!)
