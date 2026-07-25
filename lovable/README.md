# pondex_ — Lovable Start Guide

Schritt-für-Schritt Anleitung um pondex_ in Lovable neu zu bauen.

---

## Vorbereitung

Alle Dateien liegen in diesem Ordner (`lovable/`):

| Datei | Inhalt |
|---|---|
| `01-master-prompt.md` | Stack, alle Seiten, Auth-Verhalten, UX-Regeln |
| `02-ux-structure.md` | Jede Seite im Detail — Content, Flows, Empty States |
| `03-data-model.md` | Supabase Schema, Score-Formel, API Response Shapes |
| `04-demo-data.md` | Vollständige Demo-Daten für 6 Ticker + Chart-Fallback |
| `05-design-brief.md` | Design-Direktive: Farben, Fonts, Komponenten, Don'ts |
| `06-regulatory.md` | Pflicht-Disclaimer, GDPR-Consent, MiFID II CFD Warning |

---

## Schritt 1 — Lovable öffnen

1. Gehe zu **lovable.dev**
2. Klick "New Project"
3. Wähle: React + Supabase (wenn Option verfügbar)

---

## Schritt 2 — Master Prompt (erste Nachricht)

Kopiere den **gesamten Inhalt** von `01-master-prompt.md` und schicke ihn als erste Nachricht.

> Tipp: Cmd+A im Texteditor → Cmd+C → in Lovable einfügen

---

## Schritt 3 — Design Brief

Schicke als nächste Nachricht:

```
Here is the design brief for pondex_. Follow these design rules exactly:

[gesamter Inhalt von 05-design-brief.md]
```

---

## Schritt 4 — UX Struktur

Schicke als nächste Nachricht:

```
Here is the full UX structure — every page, every tab, every state:

[gesamter Inhalt von 02-ux-structure.md]
```

---

## Schritt 5 — Daten & Demo

Schicke als nächste Nachricht:

```
Here is the data model (Supabase schema + API shapes) and complete demo data for all 6 tickers:

[gesamter Inhalt von 03-data-model.md]

---

[gesamter Inhalt von 04-demo-data.md]
```

---

## Schritt 6 — Regulatorik

Schicke als letzte Setup-Nachricht:

```
Here are all regulatory requirements. These are non-negotiable — some are EU legal requirements:

[gesamter Inhalt von 06-regulatory.md]
```

---

## Schritt 7 — Build starten

Sage Lovable:

```
Now build the complete pondex_ application following all the above specifications.
Start with:
1. The landing page (/)
2. Login (/login) and Signup (/signup)
3. The Stock Analysis page (/app/stock) — this is the core feature
4. Then the remaining app pages
```

---

## Tipps während des Builds

- **Wenn das Design nicht stimmt:** Verweise auf `05-design-brief.md` Sektion "What NOT to Do"
- **Wenn eine Seite fehlt:** Verweise auf `02-ux-structure.md` und nenne die Seitennummer
- **Wenn Demo-Daten fehlen:** Verweise auf `04-demo-data.md` und nenne den Ticker
- **Wenn ein Disclaimer fehlt:** Verweise auf `06-regulatory.md`

---

## Backend API

Das Backend existiert bereits auf Railway. Lovable muss es **nicht** neu bauen.

```
Base URL: https://stockrater-production.up.railway.app
Env var:  VITE_API_URL

Endpoints:
GET /score/{ticker}
GET /quote/{ticker}
GET /financials/{ticker}
GET /ratios/{ticker}
GET /history/{ticker}
```

Wenn der Backend-Call fehlschlägt → Demo-Daten aus `04-demo-data.md` als Fallback verwenden.

---

## GitHub Deploy

Nach dem Build in Lovable:
- Export als React + Vite Projekt
- In `frontend/` Ordner des bestehenden Repos ersetzen
- `vite.config.js`: `base: '/stockrater/'` setzen
- GitHub Actions deployed automatisch auf GitHub Pages
