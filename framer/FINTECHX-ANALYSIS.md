# FintechX Template — Design System Research
_Gesammelt: 2026-07-27 · Quelle: https://fintechx.framer.website/_
_Zweck: Referenz für pondex_ Framer-Neuaufbau_

---

## Screenshots

```
framer/screenshots/
├── desktop/    23 screenshots (Hero → Footer + vollständige Page)
├── mobile/      4 screenshots (Hero, Features, Pricing, Footer)
└── tablet/      3 screenshots (Hero, Features, Pricing)
```

---

## Sektionen (in Reihenfolge)

| # | Sektion | Zweck |
|---|---|---|
| 1 | Navigation | Sticky, Logo + Links + CTA |
| 2 | Hero | Headline + Subtext + 2 CTAs + Dashboard Mockup |
| 3 | Client Logos | Social Proof — 11 Marken-Logos |
| 4 | Before/After | Toggle-Karte: Problem vs. Lösung |
| 5 | Core Features | 5 Feature-Karten in asymmetrischem Grid |
| 6 | Platform Overview | Dashboard-Demo mit 3 Callout-Karten |
| 7 | How It Works | 3 Schritte mit Step-Badges + Stats |
| 8 | Security | Cloud-Illustration + 4 Compliance-Punkte |
| 9 | Use Cases | 4 Persona-Karten mit Gradient-Overlay |
| 10 | Integrations | 4×4 Icon-Grid + "100+ integrations" Badge |
| 11 | Platform Stats | 5 Kennzahlen (10K+ Users, $250M+, 99.9%...) |
| 12 | Testimonials | Rating-Karten + 4.9/5 + 75+ Reviews |
| 13 | Pricing | 3 Pläne ($19/$39/Custom) + Monthly/Yearly Toggle |
| 14 | FAQ | Accordion + "Still have questions?" |
| 15 | Footer + CTA | Dunkel, 4-Spalten, Social Links |

---

## Farb-Palette

| Farbe | Hex | Verwendung |
|---|---|---|
| Primary Blue | `#4A90E2` | CTAs, Akzente, Highlights |
| Dark Navy | `#1A1A1A` | Text, dunkle BGs, Hero-Elemente |
| White | `#FFFFFF` | Hintergründe, Text, Karten |
| Light Gray | `#F0F0F0`, `#F5F5F5` | Section-BGs, Karten-BGs |
| Medium Gray | `#6B6B6B` | Sekundärer Text |
| Light Blue | `#D4E8F7` | Feature-Karten BG |
| Red/Coral | `#FF4444` | Negative Indikatoren (Before) |
| Sky Blue | `#87CEEB` | Hero Background Gradient |

---

## Typografie

| Element | Größe | Gewicht |
|---|---|---|
| H1 Hero | 48–56px | Bold |
| H2 Section | 36–42px | Bold |
| H3 Card | 24–28px | Semi-bold |
| Stats-Zahlen | 32–40px | Bold |
| Body Text | 16–18px | Regular |
| Caption | 12–14px | Regular |
| Button | 14–16px | Semi-bold |
| Nav | 14–16px | Medium |

Font-Familie: Sans-serif (Inter oder ähnlich)

---

## Komponenten-Inventar

### Navigation
- Logo links
- Links: Products, Features, Use Cases, Pricing
- CTA rechts: "Try it free" (dunkler Pill-Button)
- Mobile: Hamburger

### Buttons
```
Primary:   bg #4A90E2, white text, border-radius 24px, arrow icon rechts
Secondary: transparent bg, text link, underline on hover
Dark:      bg #2C2C2C, white text, same radius
```

### Cards
```
Feature Card:    bg #F0F0F0 / #D4E8F7 / #1A1A1A, radius 12-16px, padding 24-32px
Testimonial:     white bg, 1px border, padding 20-24px, stars + quote + avatar
Pricing Card:    white bg, padding 32-40px, featured = border emphasis
Use Case Card:   Bild + Gradient-Overlay, bottom-aligned content
```

### Badges / Pills
```
Step Badge:     bg #2C2C2C, white text, radius 16-20px
Feature Badge:  light gray, radius 4-6px
Popular Badge:  farbig, top-corner Pricing Card
```

---

## Animationen

| Animation | Wo | Wie |
|---|---|---|
| Parallax Scroll | Hero Landscape BG | BG bewegt sich langsamer als FG |
| Scroll-Fade-Up | Alle Karten | Cards fade+slide beim Eintreten |
| Counter-Animation | Stats Section | Zahlen zählen von 0 hoch |
| Hover Cards | Feature Karten | scale(1.02) + shadow |
| Hover Buttons | CTAs | Dunklere Farbe + shadow |
| FAQ Accordion | FAQ | Smooth height transition |
| Pricing Toggle | Monthly/Yearly | Smooth Switch-Animation |
| Before/After Dial | Section 4 | Dreht sich, Karte wechselt hell↔dunkel |

---

## Responsive Breakpoints

| Viewport | Grid | Besonderheiten |
|---|---|---|
| Desktop (1920px+) | 12-col, 24-32px gaps | Volle Multi-Column Layouts |
| Tablet (768px) | 8-col | 2-column statt 3-4 |
| Mobile (375px) | 4-col | Single Column, Hamburger Nav |

Container max-width: ~1200–1400px
Section padding desktop: 60–100px top/bottom
Section padding mobile: 24–40px

---

## Besondere Effekte

- **Parallax:** Hero-Landscape bewegt sich beim Scrollen
- **Gradient Overlays:** Use-Case Karten, Hero Sky
- **Subtle Shadows:** Karten (nicht zu schwer)
- **Background Images:** Hero-Landschaft (Grüne Hügel, Himmel)
- **Floating Elements:** Dashboard-Mockup ragt aus Sektion
- **Glassmorphism:** Möglicherweise auf Dashboard-Overlay-Elemente

---

## Design-Sprache Zusammenfassung

**Stil:** Modern, clean, professionelles Fintech
**Ästhetik:** Minimalistisch mit natürlichen Elementen (Landschaften, Grün)
**Ton:** Vertrauenswürdig, zukunftsorientiert, zugänglich
**Zielgruppe:** Privatanleger, Wealth Manager, Financial Teams, Active Traders

**Was pondex_ übernehmen kann:**
- Asymmetrisches Feature-Grid (nicht alle gleich groß)
- Dashboard-Mockup prominent im Hero
- Before/After Toggle-Karte (schon eingebaut!)
- Step-Badges für "How it works"
- Stats-Sektion mit CountUp
- Gradient Use-Case Karten (für Investor-Profile)
- Parallax-Hero-Background
- Dark Footer mit prominentem CTA

**Was pondex_ NICHT übernehmen soll:**
- Blue als Primärfarbe → pondex_ nutzt Indigo #5B5BD6
- Generic finance Stockfotos
- "AI Finance Platform" — pondex_ positioniert sich als Research Tool, nicht AI-Hype
