# pondex — Repository Structure Rules

> This document is permanent. The folder structure defined here must be maintained forever.
> When in doubt: put things where they belong, not where they are easiest to create.

---

## The Structure (canonical, do not deviate)

```
pondex/
│
├── context/                          ← AI + tooling context (was: .project-context)
│   ├── MASTER.md                     ← Entry point for Claude — rules, milestone, workspace map
│   └── context/
│       ├── architecture.md
│       ├── tech-stack.md
│       └── coding-guidelines.md
│
├── docs/                             ← All documentation (was: doc/)
│   ├── glossary.md                   ← Single source of truth for terminology
│   ├── CURRENT-TODOS.md              ← Active tasks (short-term, reviewed weekly)
│   ├── PROJECT-BRIEF.md
│   ├── RISK-REGISTER.md
│   │
│   ├── product/                      ← Product strategy and governance
│   │   ├── PRODUCT-JOURNEY.md        ← Cagan journey — the master process doc
│   │   ├── PRODUCT-COUNCIL.md        ← Go/No-Go governance
│   │   ├── COUNCIL-METHODOLOGY.md
│   │   ├── vision.md
│   │   ├── strategy.md               ← GTM, ICP, TAM/SAM/SOM, pricing hypothesis
│   │   ├── personas.md
│   │   ├── metrics.md                ← OKRs, retention targets
│   │   ├── principles.md
│   │   ├── assumptions.md            ← Tracked beliefs with validation status
│   │   └── decision-log.md           ← Product decisions with rationale + review dates
│   │
│   ├── discovery/                    ← Qualitative discovery (What is the problem?)
│   │   ├── user-interviews.md        ← Contact list, outreach template, session notes
│   │   ├── problem-validation.md     ← Problem tree, 5-Whys, IMMPACT Wirkungstreppe
│   │   └── opportunity-scorecard.md
│   │
│   ├── research/                     ← Quantitative + market research (What do we know?)
│   │   ├── surveys/
│   │   │   └── [wave-date]/          ← One subfolder per survey wave
│   │   ├── competitors/
│   │   │   └── competitor-analysis.md
│   │   ├── market/                   ← TAM/SAM/SOM, market reports
│   │   ├── analytics/                ← Funnel data, heatmaps, retention cohorts
│   │   ├── experiments/              ← A/B tests, pricing tests, Van Westendorp
│   │   │   └── EXP-template.md
│   │   └── _playbooks/               ← Reusable analysis templates
│   │
│   ├── specs/                        ← Feature specs (only after validation)
│   │   ├── PRD.md
│   │   ├── ROADMAP.md
│   │   ├── USER-STORIES.md
│   │   └── [feature-name].md
│   │
│   ├── architecture/                 ← All technical decisions and guidelines
│   │   ├── adr/                      ← Architecture Decision Records (ADR-001 → ...)
│   │   ├── ARCHITECTURE.md
│   │   ├── ENGINEERING-PRINCIPLES.md
│   │   ├── CODING-CONVENTIONS.md
│   │   ├── DEFINITION-OF-DONE.md
│   │   ├── DATA-GOVERNANCE.md
│   │   ├── DATA-COVERAGE.md
│   │   ├── INTELLIGENCE-ARCHITECTURE.md
│   │   ├── SECURITY.md
│   │   └── TECH-DEBT.md
│   │
│   ├── regulatory/
│   │   └── REGULATORY.md             ← MiFID II, GDPR, EU AI Act, action plan
│   │
│   └── brand/
│       ├── positioning.md
│       ├── tone-of-voice.md
│       └── naming-conventions.md
│
├── docs/brainstorming/               ← Design exploration (NOT in docs/ rules above — exception)
│   ├── design-system/
│   │   ├── BUNGEE-DESIGN-SYSTEM.md   ← Vollständige Bungee-Analyse (DOM-verifiziert)
│   │   └── DESIGN-TOKENS.md          ← Alle exakten Werte: Farben, Type, Spacing, Animationen
│   ├── app-structure.md              ← Nav-Struktur, Screens
│   └── landing-page-content.md       ← Content für Landing Page
│
├── backend/
│   └── app/
│       ├── main.py                   ← Init + CORS + include_router() ONLY
│       ├── api/                      ← One file per domain (endpoints)
│       ├── services/                 ← External API integrations
│       └── core/                     ← Config + cache
│
├── frontend/
│   └── src/
│       ├── pages/                    ← Eine Datei pro Route
│       │   ├── Landing.jsx           ← Öffentliche Marketing-Seite (/)
│       │   ├── Home.jsx              ← App-Dashboard (/app)
│       │   └── ...                   ← weitere App-Screens
│       ├── components/
│       │   ├── landing/              ← Alle Landing-Page-Komponenten
│       │   │   ├── LandingNav.jsx
│       │   │   ├── Hero.jsx
│       │   │   ├── PainMarquee.jsx
│       │   │   ├── ProblemSection.jsx
│       │   │   ├── HowItWorks.jsx
│       │   │   ├── FeatureShowcase.jsx
│       │   │   ├── ScoreDemo.jsx
│       │   │   ├── Testimonials.jsx
│       │   │   ├── Pricing.jsx
│       │   │   ├── FAQ.jsx
│       │   │   ├── FinalCTA.jsx
│       │   │   ├── LandingFooter.jsx
│       │   │   └── BungeeButton.jsx  ← Wiederverwendbarer CTA-Button
│       │   ├── tabs/                 ← Tab-Inhalte (lazy-loaded)
│       │   ├── tiles/                ← Wiederverwendbare Datenkacheln
│       │   └── ui/                   ← Shadcn (nie manuell bearbeiten)
│       ├── lib/
│       │   └── ...
│       ├── index.css                 ← Bungee Design Tokens als CSS Variables
│       └── main.jsx
│
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## Rules That Never Change

### 1. `docs/` is the single source for all documentation
Never create markdown files outside of `docs/` (except `README.md`, `CLAUDE.md`, `context/MASTER.md`).

### 2. Discovery ≠ Research
- `docs/discovery/` answers: **What is the problem? Who has it?** (qualitative, interviews, problem trees)
- `docs/research/` answers: **What do we know about the market?** (surveys, competitor data, analytics, experiments)

### 3. Specs only after validation
Files in `docs/specs/` are written only after a feature has passed all 4 Cagan risk gates (Value, Usability, Feasibility, Viability). No spec before validation.

### 4. ADRs belong in `docs/architecture/adr/`
Every significant architectural decision gets an ADR. Naming: `ADR-010-[short-title].md`.

### 5. Assumptions are tracked
Every new feature or product decision that rests on an unproven belief gets an entry in `docs/product/assumptions.md` before any code is written.

### 6. Experiments are documented
Every A/B test, pricing test, or validation experiment gets an `EXP-XXX.md` in `docs/research/experiments/` using the template.

### 7. Terminology is in the glossary
Before introducing a new term in code or docs, check `docs/glossary.md`. If it's not there, add it first.

### 8. `context/` is not hidden
The `context/` folder (formerly `.project-context/`) is not prefixed with a dot — it should be visible in file trees and IDEs.

---

## What Goes Where — Quick Reference

| Thing | Location |
|-------|----------|
| New feature spec | `docs/specs/[feature].md` |
| New ADR | `docs/architecture/adr/ADR-XXX-[title].md` |
| New survey wave | `docs/research/surveys/[YYYY-MM-DD_waveN]/` |
| New experiment | `docs/research/experiments/EXP-XXX.md` |
| Competitor update | `docs/research/competitors/competitor-analysis.md` |
| Interview notes | `docs/discovery/user-interviews.md` |
| New assumption | `docs/product/assumptions.md` |
| Product decision | `docs/product/decision-log.md` |
| New term | `docs/glossary.md` |
| Market size data | `docs/research/market/` |
| Funnel / analytics data | `docs/research/analytics/` |

---

*This document was last updated: 2026-07-03 after structural review.*
*Do not rename or reorganize folders without updating this document, MASTER.md, and CLAUDE.md simultaneously.*
