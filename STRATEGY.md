# pondex_ — Go-to-Market Strategie
_Aktualisiert nach Survey Wave 1 · n=45 · 29.–30. Juni 2026_

> Die goldene Regel: Nie mehr als 2 Wochen bauen ohne mit echten Menschen zu reden.

---

## Was die Survey gezeigt hat (die 3 wichtigsten Shifts)

**1. Der Pain ist Signal/Noise — nicht "zu viele Tabs"**
35% nennen Signal/Noise als #1 Frustration. Auch Single-Tool-User haben dieses Problem.
→ Kein Aggregator bauen. Einen Noise-Filter bauen.

**2. AI-Trust ist eine buildable UX-Anforderung, kein Marketing-Problem**
58% (wortgleich): "only if the AI displays the exact primary source and formula used."
→ Jede Zahl muss ihre Quelle sehen lassen. Default, nicht Tooltip.

**3. ICP ist klar: Value Investor, EU-NW, hat bereits bezahlt, churnte wegen Noise**
Gunnar Leu (churned $15–50/mo): "geopolitics + fundamentals + charts in one place."
→ Nicht auf Beginner optimieren. Auf ihn optimieren.

---

## Messaging / Positioning

| Zielgruppe | Pitch |
|---|---|
| Active Investors (ICP) | "Bloomberg-quality signal. Fraction of the cost." |
| Passive Investors | "Tells you what matters in 60 seconds." |
| Aspirer | "Research with a clear audit trail — no jargon." |

**Was wir NICHT pitchen:** "AI-powered analysis"
**Was wir pitchen:** "Research with a clear audit trail" — AI ist der Mechanismus, nicht die Message

---

## ICP (Ideal Customer Profile)

Basierend auf den 5 WTP-Profilen aus der Survey:

**Primär:** Value/Semi-active Investor · EU-NW · Business/Finance · hat bereits $15–50/Mo bezahlt · churnte weil Signal noch noisig war · nutzt kein AI, aber würde es bei nachgewiesenen Quellen akzeptieren

**Sekundär:** Active Trader · NA · Finance Professional · priced out von Bloomberg · $50–200/Mo Budget · Full AI trust

---

## Roadmap (Survey-kalibriert)

### Phase 1 — MVP (aktuell)
Noise-Filter-Core mit Quellennachweis

```
✓ Ticker → Scorecard (5 Kategorien)
✓ Candlestick Chart
✓ AI-Kommentar (Groq Llama)
✓ Kein Login erforderlich

NEUE Anforderungen aus Survey:
✓ Jede Score-Zahl zeigt Quelle (Yahoo Finance, SEC EDGAR)
✓ Score = Schlussfolgerung, nicht Einstieg — Explanation first
✓ Plain-language Erklärung pro Faktor (kein Jargon)
✓ 60-Sekunden-Default-Flow, Drill-down optional

✗ Kein Portfolio
✗ Kein PDF Export
✗ Kein Login
```

### Phase 2 — Pro (nach 10 zahlenden Nutzern)
```
✓ Macro Hub (Geopolitik + externe Faktoren) — Gunnar Leu's #1 Request
✓ Multilingual: Deutsch + Spanisch (EU-NW 53%, Spanisch in Verbatims)
✓ Watchlist / Portfolio-Tracking
✓ Login (Google Sign-In) + Stripe

✗ PDF Export (kein Signal)
✗ API für Dritte
```

### Phase 3 — Growth
```
✓ SEO: Jede Aktie bekommt eigene Seite
✓ Newsletter: "3 unterbewertete Aktien diese Woche"
✓ Affiliate-Programm (30% für YouTuber/Blogger)
✓ Mobile App
✓ API für Dritte
```

---

## Nächste Schritte (sequenziell, bevor Marketing beginnt)

### Jetzt — Produkt fertigstellen (Phase 1)
1. Quellenangaben in Backend + Frontend implementieren
2. Score-UX auf Explanation-first umstellen
3. Plain-language Texte pro Faktor schreiben (EN + DE)

### Nach Phase 1 — Validierung
4. **Gunnar Leu kontaktieren** (LinkedIn: "Gunnar Leu") — detailliertestes Q9 im Datensatz
   - Produkt zeigen, ehrliches Feedback einholen
   - Gesprächsziel: Was würde ihn zum Bleiben bewegen?
5. **Wave 2 Survey** auf r/eupersonalfinance + r/finanzen
   - Gleiche Fragen, cold audience, forced-choice Barriers
6. **5 Follow-up Kontakte** aus Survey anschreiben (LinkedIn-Links in Survey-Memory)

### Nach Validierung — Monetarisierung
7. Van Westendorp Pricing Test ($9/$19/$49)
8. Stripe integrieren
9. 10 zahlende Kunden durch direkte Ansprache (kein Marketing)

---

## Die eine Metrik die zählt

> Nicht Registrierungen. Nicht Page Views.
> **Wie viele kommen nach 30 Tagen zurück?**
> Das ist der einzige Beweis dass du etwas gebaut hast das Wert hat.

Ziel für Phase 1 Ende: 30-Day-Retention > 40%

---

## Was ein Profi NICHT tut

```
✗ 6 Monate bauen bevor jemand es sieht
✗ Auf perfektes Design warten
✗ Alle Features gleichzeitig
✗ "Wenn ich es baue kommen sie"
✗ Signal/Noise-Problem mit mehr Daten lösen (macht es schlimmer)
✗ AI als USP pitchen — als Infrastruktur behandeln
✗ Preis ohne Daten festlegen
```
