# pondex_ — Design Grid & Layout System
> Research + Planning Dokument. Wird zur Ausrichtung aller Seiten genutzt.
> Implementierung: `frontend/src/lib/grid.js` + `frontend/src/components/DevGrid.jsx`
> Dev Grid ein/ausschalten: `DEV_GRID = true/false` in `frontend/src/App.jsx`

---

## 0. CSS Grid Konzepte — Referenz für pondex_ (Quelle: MDN)

### Kernkonzepte

| Begriff | Bedeutung | pondex_ Anwendung |
|---|---|---|
| **Grid Container** | `display: grid` auf dem Parent | Alle Section-Wrapper, Hero, Cards |
| **Grid Track** | Raum zwischen zwei Linien (Spalte oder Zeile) | 12 `1fr` Spalten = 12 Tracks |
| **Grid Line** | Nummerierte Linie (1 bis 13 bei 12 Spalten) | Hero: Text endet auf Linie 8, Card startet auf Linie 9 |
| **Grid Cell** | Kleinste Einheit (1 Spalte × 1 Zeile) | Einzelnes Element ohne span |
| **Grid Area** | Rechteck aus mehreren Cells | Hero-Card = Spalten 9–12 |
| **Gutter / Gap** | Abstand zwischen Tracks | pondex_: `gap: 24px` |
| **fr Unit** | Anteil am verfügbaren Platz | `repeat(12, 1fr)` = 12 gleiche Spalten |
| **Implicit Grid** | Auto-erstellte Zeilen/Spalten | Wird genutzt bei auto-placement von Cards |
| **Subgrid** | Kind erbt Tracks vom Parent | Für zukünftige Card-Komponenten |

### Placement Syntax (Kurzreferenz)

```css
/* Longhand */
grid-column-start: 1;
grid-column-end: 5;

/* Shorthand */
grid-column: 1 / 5;        /* Linie 1 bis Linie 5 */
grid-column: 1 / span 4;   /* Linie 1, 4 Tracks breit */
grid-column: col-start / col-start 5;  /* Named Lines */

/* grid-area: row-start / col-start / row-end / col-end */
grid-area: 1 / 1 / 3 / 8;
```

### Alignment Quick Reference

| Property | Achse | Auf was? | pondex_ Nutzung |
|---|---|---|---|
| `align-items` | Block (vertikal) | Alle Items im Container | Hero: `align-items: center` |
| `justify-items` | Inline (horizontal) | Alle Items im Container | Standard: `stretch` |
| `align-self` | Block (vertikal) | Einzelnes Item | Signup-Card: `align-self: center` |
| `justify-self` | Inline (horizontal) | Einzelnes Item | — |
| `align-content` | Block (vertikal) | Tracks im Container | Bei Leerraum zwischen Sektionen |
| `justify-content` | Inline (horizontal) | Tracks im Container | `space-between` für Feature-Grid |
| `place-items` | Beide | Shorthand für align+justify | Zentrierte Sections |
| `place-self` | Beide | Shorthand für align+justify self | — |

### Wichtige Regeln aus MDN

1. **`fr` rechnet nach Gutters** — 12 `1fr` Spalten mit `gap: 24px` = jede Spalte bekommt gleich viel vom Rest nach Abzug der Gaps.
2. **`grid-column: 1 / -1`** = fullwidth, von erster bis letzter Linie — ideal für Banner-Sektionen.
3. **`repeat(auto-fill, minmax(200px, 1fr))`** = responsive Card-Grids ohne Media Queries — für Feature/Pricing Cards.
4. **Named Lines** = wenn Column Lines einen Namen bekommen (`[col-start]`), können Items nach Namen platziert werden — robuster bei Responsive-Änderungen.
5. **`grid-auto-flow: dense`** = füllt Lücken auf — NUR für visuelle Grids ohne logische Reihenfolge (z.B. Foto-Galerie).
6. **`subgrid`** = Kind erbt Parent-Tracks — perfekt für Cards die intern am selben Grid ausgerichtet sein sollen.

### pondex_ Grid Template Areas (Landingpage)

```css
/* Konzeptuell — wie grid-template-areas für die LP aussehen würde */
.landing {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-areas:
    "nav  nav  nav  nav  nav  nav  nav  nav  nav  nav  nav  nav"
    "hero hero hero hero hero hero hero .    card card card card"
    "demo demo demo demo demo demo demo demo demo demo demo demo"
    "h1   h1   h1   h1   h2   h2   h2   h2   h3   h3   h3   h3";
}
```

---

---

## 1. Grid-Grundstruktur

### 12-Spalten-Grid (Desktop)
```
|  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  | 11  | 12  |
```
- **Max-Width Container:** 1280px, zentriert
- **Seitenabstand (Gutter):** 64px links + rechts
- **Spalten-Gap:** 24px
- **Nutzbare Breite:** 1280px − 128px = 1152px
- **Eine Spalte:** (1152px − 11×24px) ÷ 12 = **73.5px**

### Tablet (≥768px)
- Seitenabstand: 40px
- Gap: 16px
- Meist 6-Spalten-Layout

### Mobile (<768px)
- Seitenabstand: 24px
- Gap: 16px
- Meist 1–2-Spalten-Layout

---

## 2. Navbar

| Eigenschaft | Wert | Begründung |
|---|---|---|
| Höhe | 64px | Kompakter als 80px — mehr Content-Raum |
| Position | fixed, top 0 | Immer sichtbar beim Scrollen |
| Hintergrund | rgba(255,255,255,0.85) + blur(12px) | Frosted Glass — sieht professionell aus |
| Padding | 0 32px | Ausgerichtet an Grid-Gutter |
| z-index | 1000 | Über allem außer Modal/Toast |

**Navbar-Inhalt:**
```
[Logo (Spalte 1)]                    [Log in]  [+/× Menu]
```
- Logo: Spalte 1, linksbündig
- Rechts: Log in Link + Hamburger
- Kein Inline-Menü (Bungee-Overlay stattdessen)

---

## 3. Seitenstruktur — Landing Page

```
┌─────────────────────────────────────────────────┐
│  NAVBAR (fixed, 64px)                           │
├─────────────────────────────────────────────────┤
│                                                 │
│  HERO (100vh − 64px)                            │
│  Links: Headline (Spalte 1–7)                   │
│  Rechts: Signup Card (Spalte 9–12)              │
│                                                 │
├─────────────────────────────────────────────────┤
│  PRODUCT DEMO (Spalte 1–12, py 120px)           │
├─────────────────────────────────────────────────┤
│  HOW IT WORKS (3 Spalten je 4, py 120px)        │
├─────────────────────────────────────────────────┤
│  VERDICT BANNER (Fullwidth, schwarz)            │
├─────────────────────────────────────────────────┤
│  DIFFERENTIATION (2 Spalten: 5+7, py 120px)    │
├─────────────────────────────────────────────────┤
│  FEATURES (4 Spalten je 3, py 120px)            │
├─────────────────────────────────────────────────┤
│  COMPARISON TEASER (Spalte 1–12, py 120px)      │
├─────────────────────────────────────────────────┤
│  INVESTOR PROFIL (Spalte 1–12, py 120px)        │
├─────────────────────────────────────────────────┤
│  TESTIMONIALS (Stacking Cards, py 120px)        │
├─────────────────────────────────────────────────┤
│  PRICING (2 Karten: Free + Pro, py 120px)       │
├─────────────────────────────────────────────────┤
│  FAQ (2 Spalten: 4+8, py 120px)                 │
├─────────────────────────────────────────────────┤
│  FINAL CTA (Fullwidth, schwarz, py 120px)       │
├─────────────────────────────────────────────────┤
│  FOOTER (Spalte 1–12, py 48px)                  │
└─────────────────────────────────────────────────┘
```

---

## 4. Hero — Grid-Ausrichtung (Detailplan)

```
Spalte:  1    2    3    4    5    6    7    8    9   10   11   12
         ├────────────────────────────┤    ├────────────────────┤
         │  HEADLINE + SUBTEXT        │    │   SIGNUP CARD      │
         │  (Spalte 1–7)              │    │   (Spalte 9–12)    │
         └────────────────────────────┘    └────────────────────┘
```

**Headline-Block (Spalten 1–7):**
- "Still not sure" → grau, opacity 0.5
- Rotating line → grau, opacity 0.5, AnimatePresence
- "pondex_ gives you / one verdict." → weiß, pondex_ mit weißem Box-Highlight
- "How it works ↓" → klein, grau
- Trust line → Mono, uppercase, sehr klein

**Signup Card (Spalten 9–12):**
- Hintergrund: rgba(255,255,255,0.97)
- Blur: backdrop-filter blur(20px)
- Radius: 20px
- Shadow: 0 32px 80px rgba(0,0,0,0.45)
- Padding: 40px
- Inhalt: Titel + Subtitle + Email Input + CTA + Divider + Log in Link + Fine Print

**Video Background:**
- Startet bei y=64px (unter Navbar)
- Opacity: 0.88
- Grayscale: 40%
- Dark Overlay: linear-gradient(135deg, rgba(0,0,0,0.65) → rgba(0,0,0,0.35) → rgba(0,0,0,0.50))

---

## 5. Typografie-Hierarchie

| Ebene | Verwendung | Größe | Font | Weight | Tracking |
|---|---|---|---|---|---|
| Display | Hero Headline | clamp(56px, 7vw, 112px) | Interdisplay | 500 | −2px |
| H1 | Sektion-Titel | clamp(40px, 5vw, 80px) | Interdisplay | 500 | −1.5px |
| H2 | Sub-Sektion | clamp(28px, 3.5vw, 56px) | Interdisplay | 500 | −1px |
| H3 | Card-Titel | clamp(20px, 2.5vw, 36px) | Interdisplay | 500 | −0.5px |
| H4 | Small heading | 22px | Interdisplay | 500 | −0.5px |
| Body LG | Intro-Text | 18px | Interdisplay | 400 | 0 |
| Body MD | Fließtext | 16px | Interdisplay | 400 | 0 |
| Body SM | Labels, Captions | 14px | Interdisplay | 400 | 0 |
| Mono MD | Nav Labels, Tags | 13px | Chivo Mono | 400 | 0.02em |
| Mono SM | Trust Lines, Fine Print | 10px | Chivo Mono | 400 | 0.1em |

---

## 6. Spacing-Scale (8px Base)

```
1 →   4px   (micro gaps)
2 →   8px   (inline gaps)
3 →  12px   (tight gaps)
4 →  16px   (default gaps)
5 →  24px   (component padding)
6 →  32px   (card padding)
7 →  48px   (section sub-gap)
8 →  64px   (container padding)
9 →  96px   (section spacing klein)
10 → 128px  (section spacing mittel)
11 → 160px  (section spacing groß)
12 → 200px  (hero spacing)
```

---

## 7. Sektion-Regeln

| Regel | Wert |
|---|---|
| Sektion py (Desktop) | 120px |
| Sektion py (Tablet) | 80px |
| Sektion py (Mobile) | 64px |
| Abstand zwischen Sektionen | 0 (py trägt beide Seiten) |
| Sektion Label (Mono) | `[ LABEL ]` oben links, 12px, uppercase, Chivo Mono |
| Sektion H1 | direkt unter Label, kein margin-top |

---

## 8. Farb-System

Aus `frontend/src/lib/colors.js` — nur Graustufen:

```
white   #FFFFFF  → Hintergründe, Card-BG
100     #D6D6D6  → Borders light, Input-BG
200     #AFAFAF  → Borders, Dividers, Input-Border
300     #898989  → Secondary Text
400     #656565  → Muted Text, Placeholder
500     #434343  → Body Text
600     #242424  → Strong Text
black   #000000  → Headlines, Primary, CTA-BG
```

**Sonder-Farben (nur für Verdict):**
- BUY: grün (tonal, kein Hex in LP)
- HOLD: amber
- SELL: rot

---

## 9. Seiten-Übersicht — Alle Pages

| Seite | Route | Grid-Layout | Status |
|---|---|---|---|
| Landing | `/` | 12-col, Hero 7+4 split | ✅ Gebaut |
| Login | `/login` | Centered single card, max 480px | ✅ Gebaut |
| Signup | `/signup` | Centered single card, max 480px | ✅ Gebaut |
| App / Dashboard | `/app` | Sidebar + Main Content | ✅ Gebaut |
| Privacy Policy | `/privacy` | Single col, max 800px | ⬜ TODO |
| Terms of Service | `/terms` | Single col, max 800px | ⬜ TODO |

---

## 10. Komponenten-Grid-Regeln

### Cards (allgemein)
- Radius: 16px (md) oder 20px (xl für Hero-Card)
- Padding: 32px (Standard) oder 40px (Hero-Card)
- Border: 1.5px solid C[200]
- Shadow: sm oder md

### Buttons (BungeeButton)
- Höhe: 48px
- Padding: 0 24px
- Radius: 10px
- Font: Chivo Mono, 13px, uppercase
- Hintergrund: black
- Text: white

### Inputs
- Höhe: 48px (padding 14px 16px)
- Radius: 10px
- Border: 1.5px solid C[200]
- BG: C[100]
- Focus: border black

### Sektion-Labels
```
[ LABEL TEXT ]
```
- Font: Chivo Mono
- Size: 12px
- Color: C[400]
- Uppercase
- Brackets eckig: `[` + space + TEXT + space + `]`
- Margin-bottom: 16px

---

## 11. Dev Grid — Nutzung

Das 12-Spalten Dev-Overlay ist aktiv solange `DEV_GRID = true` in `App.jsx`.

**Beim Ausrichten prüfen:**
- Startet der Headline-Text auf Spalten-Kante 1?
- Startet die Signup-Card auf Spalten-Kante 9?
- Sind Card-Grids symmetrisch auf den Spalten?
- Stimmt der Gutter (64px) mit dem Container-Padding überein?

**Vor Production-Deploy:**
```js
// App.jsx
const DEV_GRID = false
```

---

## 12. Offene Todos (Grid-bezogen)

- [ ] Hero: Headline auf Spalte 1 ausrichten (aktuell leicht off)
- [ ] Hero: Signup-Card auf Spalte 9 ausrichten
- [ ] Alle Sektionen: Container-Padding auf 64px vereinheitlichen
- [ ] HowItWorks: 3-Spalten-Grid auf Spalten 1–4, 5–8, 9–12 ausrichten
- [ ] Pricing: Cards auf Spalten 2–6 und 7–11 (nicht fullwidth)
- [ ] Mobile Breakpoints testen (768px, 375px)
- [ ] Testimonials: Stacking Cards auf Container-Breite begrenzen
