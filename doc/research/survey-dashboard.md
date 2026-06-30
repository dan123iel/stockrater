# Survey Dashboard — pondex_ Wave 1

> Wie die Survey gebaut wurde, wo sie läuft, wie man sie liest, und wie man sie für Wave 2 erweitert.

---

## Links

| Was | URL |
|---|---|
| Survey (Tally) | https://tally.so/r/QKXBEG |
| Live Dashboard | https://dan123iel.github.io/survey/ |
| Dashboard Repo | https://github.com/dan123iel/survey |
| Rohdaten (Google Sheets) | https://docs.google.com/spreadsheets/d/1Y6UaYRc0lWz7TTdhzLFDuVsk-T7wowrWExAhiUsquew/edit |

---

## Wie das Dashboard funktioniert

Das Dashboard ist eine einzelne `index.html` Datei im Repo `dan123iel/survey`, deployed via GitHub Pages.

**Datenfluss:**
```
Google Sheets (Tally-Antworten)
    → "Publish to web" als CSV
    → Dashboard fetcht CSV on load
    → Client-side JS parst + rendert alles
    → Live bei jedem Refresh
```

**Kein Backend nötig.** Alles passiert im Browser. Google Sheets ist die einzige Datenquelle.

**Wo die CSV-URL steht:**
```javascript
// dashboard/index.html, Zeile 321
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=0&single=true&output=csv";
```

Um die Datenquelle zu wechseln (z.B. für Wave 2): nur diese URL austauschen.

---

## Struktur des Dashboards (5 Parts)

| Part | Inhalt |
|---|---|
| Executive Summary | Verdict-Hero + 3 Signal-Kacheln (Problem strength, WTP, Sample quality) |
| Part 1 — The Opportunity | Marktsegmente, Pain-Chart, Tool-Stack der Investoren |
| Part 2 — The User | Demographie, ICP-Profile (Churner + Paying), AI-Trust-Split |
| Part 3 — What to Build | Non-Investor-Barriers, Produktanforderungen (aus Daten abgeleitet) |
| Part 4 — The Risks | 6 Risiken mit Schweregrad-Badges |
| Part 5 — The Evidence | Cross-Tabs, Verbatims (Q9), Follow-up-Kontakte, Wave 2 Spec, Methodology |

---

## Survey-Fragen (Tally, 16 Seiten)

**Branching:**
- Q1 → Investor? → Sektion A (Investoren-Fragen)
- Q1 → "Nein, will anfangen" → Sektion B (Aspirer-Fragen)
- Q1 → "Nein, kein Interesse" → Exit

**Investoren (Sektion A):**
- Q2A: Wöchentliche Research-Zeit
- Q3A: Welche Tools (Multi-Select)
- Q4A: Größte Frustration (Single)
- Q5A: Paid for tools? + Wie viel?

**Aspirers (Sektion B):**
- Q2B: Hauptbarrier (Multi-Select)
- Q3B: Was würde ersten Schritt ermöglichen (Multi-Select)

**Alle:**
- Q6: AI-Trust-Level
- Q7: Beruf
- Q8: Region
- Q9: "Magic Wand" — offene Frage
- Q10: Follow-up-Kontakt OK?

---

## Wave 2 — Geplante Verbesserungen

Bekannte Schwächen von Wave 1 die Wave 2 beheben soll:

| Problem Wave 1 | Lösung Wave 2 |
|---|---|
| Multi-Select bei Barriers → kein primärer Pain erkennbar | Forced single choice |
| Feature-Fragen vor Konzept-Präsentation → inflated demand | Konzept zeigen, dann fragen |
| Kein WTP-Preispunkt | Direkte Preis-Frage ($9/$19/$49) |
| Warm-Network-Sample | Deployment auf r/eupersonalfinance + r/finanzen |
| Inkonsistente Skalen | Überall 5-Punkt-Likert |

**Wave 2 starten sobald:** Gunnar Leu Interview abgeschlossen, Phase 1 MVP deployed.

---

## Dashboard updaten (für Wave 2)

1. Neue Tally-Survey erstellen (Wave 2 Spec → `survey-wave1.md` Ende)
2. Tally → Google Sheets verbinden
3. Neues Sheet als CSV publishen (File → Share → Publish to web → CSV)
4. In `dashboard/index.html` die `CSV_URL` ersetzen
5. Commit + push → GitHub Pages deployed automatisch

Alternativ: separates Dashboard für Wave 2, um Wave 1 als historischen Snapshot zu erhalten.

---

## Methodologische Einschränkungen

- n=45, Warm-Network (WhatsApp-Blast)
- 25/45 Antworten in 2h-Fenster → kein repräsentativer Querschnitt
- Wave 2 (n=10) zeigt 44% AI-Skepsis vs. 21% in Wave 1 → cold audiences konservativer
- Alle Zahlen sind **direktionale Signale**, keine statistisch signifikanten Befunde
- Nicht für externe Präsentation geeignet ohne Cold-Audience-Replikation
