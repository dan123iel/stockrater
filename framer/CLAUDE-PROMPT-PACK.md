# FintechX → pondex_ Rebuild — Claude Prompt Pack
_Stand: 2026-07-27 · Basierend auf Screenshots in framer/screenshots/_

---

## PROMPT 1 — Analyse (nur lesen, nichts bauen)

```
Analysiere diese UI-Screenshots des FintechX Framer Templates als Referenz.
BAUE NOCH NICHTS. Nur analysieren.

Erstelle eine vollständige Komponentenliste mit:
1. Alle Sektionen in Reihenfolge (Name + Zweck)
2. Pro Sektion: Layout-Typ (Grid/Flex/Stack), Anzahl Spalten, Abstände
3. Alle wiederverwendbaren Komponenten (Nav, Card, Button, Badge, etc.)
4. Farben (exakte Hex-Werte wenn erkennbar)
5. Typografie (Schriftgrößen, Gewichte, Line-Heights)
6. Animationen (was bewegt sich, wie)
7. Besondere Effekte (Gradient, Blur, Parallax, Shadow)

Screenshots: [screenshots einfügen]
```

---

## PROMPT 2 — Design-Spec

```
Basierend auf deiner Analyse: Erstelle eine vollständige Design-Spec für die
pondex_ Landing Page im FintechX-Stil.

WICHTIG: pondex_ hat bereits folgende Markenwerte:
- Primärfarbe: #5B5BD6 (Indigo Violet) — NICHT ändern
- Sekundärfarbe: #FF4D6D (Rose-Red) — nur für Marketing-Urgency
- Tertiärfarbe: #00C2A8 (Teal) — für Daten/Trust-Elemente
- Font: Inter
- Stil: Clean, minimal, data-first (Revolut/Trade Republic)

Erstelle:
1. Farb-Mapping: FintechX-Farben → pondex_-Farben
2. Komponenten-Spec: Pro Komponente exakte CSS-Werte (radius, shadow, padding)
3. Seiten-Struktur: Alle 15 Sektionen in Reihenfolge mit pondex_-Content
4. Typography-Scale: H1-H6, Body, Caption mit px-Werten
5. Grid-System: Container, Columns, Gaps für Desktop/Tablet/Mobile
```

---

## PROMPT 3 — Hero bauen

```
Baue den Hero-Bereich der pondex_ Landing Page im FintechX-Stil.

REFERENZ: [Hero Screenshot einfügen]

STACK: React + TypeScript + Tailwind CSS v4 + Framer Motion
DESIGN-SYSTEM: CSS Variables aus styles.css (--accent: #5B5BD6 etc.)

PONDEX_ HERO CONTENT:
- Headline: "Too much data. No clear answer. pondex_ ends that."
- Subtext: "A 0–100 score for any stock. Five factors. Every number sourced."
- CTA 1: "Analyse a stock — it's free" (Indigo bg)
- CTA 2: "See how it works" (ghost)
- Persona chips: "Value Investor" | "Passive Investor" | "Finance Professional"
- Visual rechts: Browser-Frame mit Score Card (AAPL 78/100 HOLD)

STYLE-REGELN:
- Floating Pill-Nav wie in framer/screenshots/desktop/fintechx-01-hero.png
- Background: Linear gradient white → #F5F3FF (sehr leicht)
- Hero ist 100vh
- Headline: clamp(36px, 5vw, 68px), fontWeight 800, letterSpacing -0.04em
- Keine Fotos/Illustrationen — nur das Browser-Mockup
```

---

## PROMPT 4 — Alle restlichen Sektionen

```
Baue jetzt alle restlichen Sektionen der pondex_ Landing Page.
Nutze dieselbe Designsprache wie der Hero.

SEKTIONEN in Reihenfolge:
1. Trust Bar — "Data from sources you can verify" + Yahoo Finance · SEC EDGAR · Groq AI
2. Before/After Toggle — (bereits implementiert, beibehalten)
3. Sticky Scroll Features — Links sticky: "One answer. Every number sourced."
                           Rechts scrollend: 4 Features mit großen Zahlen
4. How It Works — Lemonade-Style Phone SVG + 3 floating labels
5. Peer Comparison Teaser — AAPL 78 vs MSFT 84 vs Tech avg 71
6. Testimonials — 3 Karten + Stats (45 interviews, 71%, 5 factors, €0)
7. Stats Band — violett bg, 4 CountUp-Zahlen
8. Pricing — 3 Karten: Starter (free) | Pro €4.99 (Most Popular) | Lifetime €149
9. FAQ — Accordion, 5 Fragen
10. Final CTA — schwarz bg, "One ticker. One verdict."
11. Footer — 4 Spalten + Social Icons

PRO SEKTION liefere:
- Vollständige React-Komponente
- Alle Framer Motion Animationen
- Responsive (768px breakpoint)
- Exakte CSS-Werte für Farben, Spacing, Radius
```

---

## PROMPT 5 — Mobile & Tablet optimieren

```
Optimiere die pondex_ Landing Page für Mobile (375px) und Tablet (768px).

WICHTIGE MOBILE-REGELN:
- Nav: Floating Pill wird schmaler, links verstecken sich (nur Logo + CTA)
- Hero: Einspaltlg, Score Card unter CTAs (nicht rechts)
- Sticky Scroll: wird normal Scroll (kein sticky auf mobile)
- Pricing: 3 Karten werden gestapelt (1 Spalte)
- Bottom Nav in App: 5 Icons (Home | Markets | Search | Portfolio | Account)
- Touch Targets: min 44×44px
- Font-Sizes: clamp() Werte für smooth scaling
- Safe Area: padding-bottom: env(safe-area-inset-bottom) für iPhone

Teste jeden Breakpoint und melde Probleme.
```

---

## APP DASHBOARD (Separates Prompt-Pack)

Basierend auf FintechX Dashboard Screenshot [Image #72]:

```
Baue das pondex_ App Dashboard inspiriert vom FintechX Dashboard.

LAYOUT:
- Dark Sidebar links (260px): Logo + Nav + Upgrade CTA unten
- Top Bar: Seitentitel + Search + Avatar
- Main Content: KPI-Karten + Charts

SIDEBAR NAVIGATION:
- Home (Dashboard)
- Portfolio (Watchlist)
- Markets (Top Movers)
- Robo Advisor
- CFD

FARBSCHEMA SIDEBAR:
- Background: #0A0A0A
- Active item: #1A1A2E (leicht lila Tint) + linker Akzentbalken #5B5BD6
- Text: #9CA3AF inactive, #FFFFFF active
- Hover: #1F1F1F

KPI KARTEN (4 Stück, FintechX-Stil):
1. Watchlist — "4 stocks tracked" + Icon
2. Ø Score heute — z.B. "76/100" + Trend
3. Aktive Analysen — Zähler + Badge
4. Exit Signals — "0 active" oder Anzahl

CHART:
- Area Chart für Watchlist-Score-Verlauf
- Toggle: 1W / 1M / 3M / 1Y
- Farbe: Teal #00C2A8 für Linie

UPGRADE CTA (unten Sidebar, wie FintechX):
- Dark card mit Icon
- "Upgrade to Pro for unlimited verdicts"
- Button: "Get Pro Now" in Indigo
```

---

## CHECKLISTE — Was fertig sein muss

### Landing Page
- [ ] Floating Pill Nav (✅ done)
- [ ] Hero 2-Spalten mit Browser Mockup
- [ ] Trust Bar
- [ ] Before/After Toggle (✅ done)
- [ ] Sticky Scroll Features (✅ done)
- [ ] How It Works Phone SVG
- [ ] Peer Comparison
- [ ] Testimonials (✅ done)
- [ ] Stats CountUp (✅ done)
- [ ] Pricing 3-Spalten (✅ done)
- [ ] FAQ Accordion (✅ done)
- [ ] Final CTA (✅ done)
- [ ] Footer (✅ done)
- [ ] Mobile Responsive

### App Dashboard
- [ ] Dark Sidebar
- [ ] Top Bar
- [ ] 4 KPI Cards
- [ ] Area Chart
- [ ] Donut Chart / Asset Allocation
- [ ] Mobile Bottom Nav

---

## SCREENSHOT REFERENZEN

Alle Screenshots liegen in:
```
framer/screenshots/desktop/    ← 23 Screenshots
framer/screenshots/mobile/     ←  4 Screenshots
framer/screenshots/tablet/     ←  3 Screenshots
```

Wichtigste Referenzen:
- `fintechx-desktop-01-hero.png` → Floating Nav + Hero
- `fintechx-desktop-04-features.png` → Feature Grid
- `fintechx-desktop-05-dashboard.png` → Dashboard Preview
- `fintechx-desktop-12-pricing.png` → Pricing Cards
- `fintechx-desktop-14-footer.png` → Footer
