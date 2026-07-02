# Personas

> Letzte Aktualisierung: 2026-07-02 · Basis: Survey Wave 1 (n=56, 29. Juni 2026)
> Alle Personas sind datenbasiert, nicht hypothetisch.
> Vollständige Analyse → `doc/research/surveys/2026-06-29_wave1/2026-06-29_survey-wave1-analysis.md`

---

## Primär-Persona — "The Passive Noise-Reducer" (Phase 1 ICP)

**Datenbasis:** 41% des Samples (n=23 passive Investoren)

**Profil**
- Investiert passiv: ETFs + vereinzelt Einzelaktien, checkt selten
- Verbringt < 1h/Woche mit Stock Research (80% der Investoren gesamt)
- Nutzt Broker-Tool (60%) und AI-Tools wie ChatGPT (47%) — beides kostenlos
- Bezahlt €0 für Research-Tools (85% der Investoren insgesamt nie bezahlt)
- EU-NW dominant (41% des Gesamtsamples)

**Jobs-to-be-done**

| Typ | Job |
|-----|-----|
| Funktional | "Ich will in 60 Sekunden wissen ob dieser Stock es wert ist, ihn genauer anzuschauen." |
| Funktional | "Ich will sicher sein dass die Zahlen stimmen — nicht vom AI halluziniert." |
| Emotional | "Ich will mich nicht dumm fühlen wenn ich Zahlen sehe die ich nicht einordnen kann." |
| Social | "Ich will erklären können warum ich einen Stock gekauft habe." |

**Größte Frustrationen (aus Survey)**
1. Complexity / Noise (52% der passiven Investoren): *"Remove noise and get actual data to analyse"*
2. Data Trust (24%): *"AI tools make things up or hallucinate numbers"*
3. Fragmentation (35%): *"Everything is scattered — too many open tabs"*

**Aktuelles Tool-Setup & Spend**
- Broker-Tool (gratis), AI-Tools (gratis), gelegentlich Yahoo Finance
- Monatlicher Spend: €0

**Realistisches Budget für pondex**
- €9–19/Monat — niedrige Konfidenz (abgeleitet aus 2 Churner-Profilen bei $15–50/mo; kein direkter Preistest)

**Kaufauslöser**
Probiert pondex für einen Stock den er/sie sowieso analysieren wollte. Bekommt in <60s ein Verdict mit erkennbarer Quelle. Realisiert: kein Yahoo Finance mehr nötig.

**Dealbreaker**
- Score ohne Erklärung
- AI-Output ohne Quellenangabe
- Noch ein Tab — muss ersetzen, nicht ergänzen
- Mehr als 2 Minuten Setup

**Evidenz-Konfidenz:** Pain: Hoch · Verhalten: Mittel · Budget: Niedrig (kein Preistest)

---

## Sekundär-Persona — "The Overwhelmed Aspirer" (Onboarding / Phase 2)

**Datenbasis:** 32% des Samples (n=18 Aspirers)

**Profil**
- Hat noch nicht investiert
- 61% sagen "zu kompliziert" ist die Hauptbarriere
- 0% Zahlungshistorie in dieser Gruppe
- Braucht Plain Language + Einfachheit, keinen Score auf Screen 1

**Jobs-to-be-done**

| Typ | Job |
|-----|-----|
| Funktional | "Ich will verstehen ob ein Unternehmen gesund ist — ohne Finanz-Jargon." |
| Emotional | "Ich will mich nicht blöd fühlen wenn ich mit Aktien anfange." |

**Enabler (was würde helfen, aus Survey)**
1. Plain-language Erklärungen (50%)
2. Einfacher Score (44%)
3. Micro-Investing ab $5 (44%)

**Phase-1-Relevanz:** Informiert UX-Sprache und Onboarding-Ton. Keine Features für diese Gruppe vor Phase 1 Launch.

---

## Tertärer ICP — "The Churned Value Investor" (Zahlungs-Signal)

**Datenbasis:** 2 Churner im Sample (davon 1 identifiziert: Gunnar Leu)

**Profil — Gunnar Leu (Prototyp)**
- Value Investor mit basis Trading, NYSE inkl. Options
- EU-NW, Business/Finance-Hintergrund
- Hat $15–50/mo bezahlt, abgebrochen weil Noise-Problem nicht gelöst
- Conditional AI Trust (nur mit Quellenattribution)
- Braucht: Chart-Basics + Geopolitik + Fundamentals + Branchen-News in einem Place

**Warum dieser Persona wichtig ist**
Das ist der einzige Profil-Typ mit bewiesener Zahlungsbereitschaft UND identischem Kündigungsgrund wie das pondex-Versprechen. Zwei Churner mit gleichem Reason ist das stärkste qualitative WTP-Signal im Dataset.

**Status:** Interview steht aus — Gunnar Leu auf LinkedIn kontaktiert (2026-07-02)

---

## Nicht in Scope

| Segment | Warum nicht |
|---------|-------------|
| Day Trader | Falscher Zeithorizont, braucht Real-Time, andere Feature-Set |
| Institutionelle Investoren | Falscher Maßstab, falsche Tooling-Anforderungen |
| ETF-Pure-Passive (kein Interesse an Einzelaktien) | 5% "Not interested" im Sample — kein Markt |
| Bloomberg-Tier ($50–200/mo, NA) | Anderes Problem (Cost, nicht Noise), out of Phase-1-ICP |
