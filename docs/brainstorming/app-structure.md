# App-Struktur & Navigation

_Stand: 2026-07-17 · Basiert auf UX Council Research + Nutzer-Entscheidungen_

---

## Zwei Versionen

### Version 1 — Nicht eingeloggt (Landing Page / Marketing)
Öffentlich erreichbar. Zeigt was pondex kann. Ziel: Conversion zu Free/Pro.
→ Datei: `landing-page-content.md`

### Version 2 — Eingeloggt (App / Dashboard)
Personalisiertes Dashboard. Vollständige Funktionalität.
→ Struktur unten

---

## App Navigation (eingeloggte Version)

### Konsens aus UX Council Research:
Robinhood, Yahoo Finance, Bloomberg, Revolut — alle nutzen Bottom Tabs (Mobile) + Left Sidebar (Desktop).

### 5 Haupt-Tabs

```
Home  |  Search  |  Watchlist  |  Markets  |  Assistant
 🏠       🔍         ⭐           📊           🤖
```

| Tab | Inhalt | Warum |
|---|---|---|
| **Home** | Dashboard: Portfolio + Search + Markt-Chips + Movers + News + Events | Erste Anlaufstelle, alles auf einen Blick |
| **Search** | Ticker suchen → Stock Detail mit 4 Sub-Tabs | Primäre Aktion, muss in Nav sein |
| **Watchlist** | Gespeicherte Aktien mit Scores | Täglicher Return-Grund |
| **Markets** | Indices, Sektoren, Top Movers | Kontext für Recherche |
| **Assistant** | pondex AI Chat mit Quellenangaben | Einzigartiges Differenzierungsmerkmal |

### Dashboard-Reihenfolge (UX Council)
```
1. Portfolio-Streifen    ← sofort sehen: wie stehe ich heute?
2. Suchfeld              ← prominent, Hauptaktion
3. Markt-Chips           ← S&P 500, DAX, NASDAQ horizontal
4. Top Movers            ← Gewinner/Verlierer des Tages
5. News-Feed             ← personalisiert auf Watchlist
6. Upcoming Events       ← Earnings, Dividenden
```

### Stock Detail Sub-Tabs
```
Overview  |  Insights  |  Financials  |  News
```

### UX North Star
> **Time-to-insight unter 3 Sekunden.**
> Nutzer öffnen pondex um eine Frage zu beantworten. Das Dashboard muss sie beantworten bevor sie irgendetwas tippen.

---

## Offene Fragen

- [ ] Soll "Portfolio" ein eigener Tab sein oder Teil von Home?
- [ ] Soll "Calendar" ein eigener Tab sein oder Teil von Home?
- [ ] Settings: eigener Tab oder im Avatar-Menü?
- [ ] Desktop: Sidebar immer sichtbar oder collapsed?
