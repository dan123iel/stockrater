# pondex_ Website Council

> Dieses Dokument definiert das 3-Ebenen-Council-System für alle Website- und Landing-Page-Entscheidungen.
> Einberufen bei: neue Seiten, größere Änderungen, Conversion-Optimierung, Design-Entscheidungen.
> Nicht einberufen bei: Bugfixes, Typos, kleine Farb-/Text-Tweaks.

---

## Architektur-Prinzip

```
Executive Council          ← Entscheidungen & Priorisierung
        │
        ▼
Domain Councils            ← Fachliche Arbeit pro Domäne
        │
        ▼
Specialist Agents          ← Temporäre Task-spezifische Councils
```

Councils sind **dynamisch**: Der Orchestrator stellt für jede Aufgabe automatisch
das passende Team zusammen. Keine festen Silos.

---

## Ebene 1 — Executive Council

Trifft strategische Entscheidungen. Diskutiert nicht jedes Detail.

| Rolle | Aufgabe |
|---|---|
| CEO | Vision & Produktrichtung |
| Chief Product Officer | Produkt-Prioritäten |
| Chief Marketing Officer | Positionierung & Growth |
| Chief Technology Officer | Tech-Stack & Machbarkeit |
| Chief Design Officer | Design-Qualität & Konsistenz |
| Chief Strategy Officer | Business & Pricing |
| Chief Data Officer | Analytics & Metriken |

**Wann einberufen:** Neue Seiten-Typen, Pivot-Entscheidungen, Pricing-Änderungen,
grundlegende Design-System-Änderungen.

---

## Ebene 2 — Domain Councils

### Product Council
- Product Manager
- UX Researcher
- JTBD Expert
- Feature Strategist
- Roadmap Planner

### Design Council
- Brand Designer
- UI Designer
- UX Designer
- Design System Architect
- Motion Designer
- Accessibility Expert

### Engineering Council
- Frontend Architect
- Backend Architect
- AI Engineer
- DevOps
- Security Engineer

### Marketing Council
- Growth Lead
- SEO Expert
- CRO Specialist
- Copywriter
- Email Marketing

### Analytics Council
- Product Analyst
- Experimentation Expert
- Funnel Expert
- Behavioral Analytics

### Business Council
- Pricing Strategist
- Finance
- Investor Relations

### Legal Council
- GDPR / Datenschutz
- Compliance
- Terms & Conditions

---

## Ebene 3 — Specialist Councils (dynamisch)

Werden für eine spezifische Aufgabe zusammengestellt, danach aufgelöst.

---

### Landing Page Council
**Trigger:** Neue Landing Page, oder Conversion-Rate < Benchmark

```
UX Designer
Copywriter
SEO Expert
Frontend Engineer
Performance Engineer
Behavioral Psychologist
Growth Expert
Product Marketing Manager
Accessibility Expert
Analytics Expert
```

**Ablauf:**
1. Jeder Specialist analysiert unabhängig
2. Runde 1: Findings ohne Diskussion
3. Runde 2: Kritik + Gegenargumente
4. Scoring (0–10 pro Dimension)
5. Executive Summary + konkrete To-Dos

---

### Homepage Council
**Trigger:** Homepage-Redesign, neuer Hero, strukturelle Änderungen

```
Brand Designer
UX Designer
Frontend Engineer
Marketing Lead
Product Manager
```

---

### Pricing Page Council
**Trigger:** Pricing-Änderung, neuer Tier, Conversion-Optimierung

```
Pricing Strategist
Behavioral Economist
Copywriter
CRO Specialist
Product Marketing
Finance
```

---

### Demo / ProductDemo Council
**Trigger:** Neue Demo-Sektion, interaktive Änderungen

```
UX Designer
Frontend Engineer
Product Manager
Analytics Expert
Growth Expert
```

---

### Onboarding Council
**Trigger:** Neuer Onboarding-Flow, Auth-Integration

```
UX Researcher
Behavioral Psychologist
Gamification Expert
Product Manager
Analytics Expert
Growth Expert
```

---

### Investment Intelligence Council
**Trigger:** Score-Änderungen, neue Datenquellen, Verdict-Logik

```
Equity Research Analyst
Quantitative Analyst
Fundamental Analyst
Behavioral Finance Expert
Valuation Specialist
Risk Manager
Regulatory & Accounting Expert
```

---

## Council Builder — Orchestrator-Logik

Für jede neue Aufgabe wird automatisch das passende Council zusammengestellt:

```
Aufgabe eingeben
      ↓
Orchestrator klassifiziert: Design / Copy / Tech / Strategy / Analytics
      ↓
Relevante Specialists werden ausgewählt (3–10 Agenten)
      ↓
Runde 1: Unabhängige Analyse (kein Groupthink)
      ↓
Runde 2: Kritische Diskussion
      ↓
Voting + Scoring
      ↓
Executive Summary mit konkreten Handlungsempfehlungen
      ↓
Council aufgelöst
```

---

## Protokoll-Format

Jede Council-Sitzung wird dokumentiert als:

```markdown
## Council: [Name] — [Datum]
**Aufgabe:** [Was wurde entschieden]
**Teilnehmer:** [Welche Agenten]
**Runde 1 Findings:** [Stichpunkte pro Agent]
**Kritik Runde 2:** [Gegenargumente]
**Scoring:** [0–10 pro Dimension]
**Entscheidung:** [Was wird umgesetzt]
**Offene Fragen:** [Was bleibt unklar]
```

Protokolle landen in: `docs/product/council-logs/`

---

## Trivialitäts-Check

**Council einberufen wenn:**
- Neue Seite / Section wird gebaut
- Conversion-Rate unter Benchmark fällt
- Grundlegende Design-Entscheidung
- Copy-Strategie ändert sich
- Pricing oder CTA-Struktur ändert sich

**Kein Council nötig bei:**
- Typos / Formulierungskleinigkeiten
- Farb-Tweaks innerhalb der Palette
- Bugfixes
- Dependency-Updates
- Responsive-Fixes

---

## Verweis

- Playbook: `docs/specs/LANDING-PAGE-PLAYBOOK.md`
- Allgemeines Council-Protokoll: `docs/product/COUNCIL-METHODOLOGY.md`
- Council-Logs: `docs/product/council-logs/`
