# ZINVE — Webflow Designer Variables (Ground Truth)

Direkt aus dem Webflow Designer extrahiert — 100% akkurat.

---

## Color Variables

```css
:root {
  --color-transparent:    rgba(255, 255, 255, 0);
  --color-black-100:      rgba(0, 0, 0, 0.12);
  --color-black-700:      rgba(0, 0, 0, 0.7);
  --color-black-1000:     black;          /* #000000 */
  --color-white-1000:     white;          /* #ffffff */
  --color-whitesmoke-1000: whitesmoke;    /* #f5f5f5 */
}
```

---

## Typography Variables

### Font Families
```css
--font-body:    "Kanit", sans-serif;
--font-heading: "Khand", sans-serif;
```

### Type Scale (responsive)

| Style     | Base      | Tablet    | Mobile L  | Mobile S  | Desktop L |
|-----------|-----------|-----------|-----------|-----------|-----------|
| H1 Large  | 12.1875rem| 9.25rem   | 7.5rem    | 4.6875rem | 16.5rem   |
| H1        | 12.5rem   | 10rem     | 6.25rem   | 4.6875rem | 15rem     |
| H2        | 7.9375rem | 5.625rem  | 3.75rem   | 3.75rem   | 7.9375rem |
| H3        | 5rem      | 3.75rem   | 3rem      | 2.5rem    | 5rem      |
| H4        | 3.75rem   | 3rem      | 2.5rem    | 2.25rem   | 3.75rem   |
| H5        | 2.5rem    | 2.5rem    | 2.5rem    | 2.25rem   | 2.5rem    |
| H6        | 1.875rem  | 1.875rem  | 1.875rem  | 1.5rem    | 1.875rem  |
| H6 Small  | 1.5rem    | 1.5rem    | 1.5rem    | 1.25rem   | 1.5rem    |
| Body Large| 1.125rem  | 1.125rem  | 1.125rem  | 1.125rem  | 1.125rem  |
| Body Small| 1rem      | 1rem      | 1rem      | 1rem      | 1rem      |

### Line Heights
| Style     | Line Height |
|-----------|-------------|
| H1 Large  | 1em         |
| H1        | 1em         |
| H2        | 1em         |
| H3        | 1.05em      |
| H4        | 1.0667em    |
| H5        | 1.1em       |
| H6        | 1.1333em    |
| H6 Small  | 1.1667em    |
| Body Large| 1.4em       |
| Body Small| 1.625em     |

### Font Weights
```css
--font-weight-regular:   400;
--font-weight-medium:    500;
--font-weight-semibold:  600;
--font-weight-bold:      700;
```

**Heading weights:** H1–H5 = Bold (700), H6/H6 Small = Semi Bold (600)

### Border Radius
```css
--radius-xl: 100px;
--radius-lg: 30px;   /* Tablet/Desktop: 30px, Mobile: 20px */
--radius-md: 20px;   /* Mobile S: 15px */
--radius-sm: 15px;
--radius-xs: 10px;
```

---

## Spacing Variables (Section padding)

| Token      | Base  | Tablet | Mobile L | Mobile S |
|------------|-------|--------|----------|----------|
| Spacing XL | 160px | 100px  | 80px     | 60px     |
| Spacing Lg | 120px | 100px  | 80px     | 60px     |
| Spacing Md | 100px | 100px  | 80px     | 60px     |
| Spacing Sm | 80px  | 80px   | 80px     | 60px     |
| Spacing Xs | 60px  | 60px   | 60px     | 40px     |

## Gap Variables (Component gaps)

| Token   | Base | Tablet | Mobile L | Mobile S |
|---------|------|--------|----------|----------|
| Gap 2XL | 50px | 50px   | 40px     | 30px     |
| Gap XL  | 40px | 40px   | 40px     | 30px     |
| Gap Lg  | 30px | 30px   | 30px     | 30px     |
| Gap Md  | 24px | 24px   | 24px     | 24px     |
| Gap Sm  | 15px | 15px   | 15px     | 15px     |

---

## Component Structure (Webflow Navigator)

### Page Structure
```
Body
└── Page Wrapper
    ├── Navigation Top
    │   └── Header [Component]
    └── Main Wrap
        ├── Hero Section
        │   └── Hero Agency
        │       └── Grid Hero Agency
        │           └── Hero Content Block
        │               └── Main Container
        │                   ├── Hero Top
        │                   │   ├── Hero Thumb Box → Hero Thumb [img]
        │                   │   └── Hero Content
        │                   │       ├── Heading Style H6 [text]
        │                   │       └── Mt40
        │                   │           └── Primary Button [Component]
        │                   ├── Hero Bottom
        │                   │   ├── Hero Author Box
        │                   │   │   └── Hero Author Wrap
        │                   │   │       ├── Hero Author Thumb Box → Hero Author Thumb [img]
        │                   │   │       ├── Hero Author Thumb Box → Hero Author Thumb [img]
        │                   │   │       └── Hero Avata Icon Box → Hero Avata Icon [img]
        │                   │   ├── Body Large [p]
        │                   │   └── Light Color [p]
        │                   └── Hero Link Wrapper
        │                       ├── Hero Link Block → "Interface Design" + Arrow Top Angle [img]
        │                       ├── Hero Link Block → "Product Design" + Arrow Top Angle [img]
        │                       └── Hero Link Block → "UI/UX Design" + Arrow Top Angle [img]
        │               ├── Hero Content (duplicate)
        │               │   ├── Heading Style H6
        │               │   └── Mt40 → Primary Button [Component]
        │               └── Hero Footer
        │                   └── H1 Large → Gray Color [text]
        ├── Hero Line Shape Wrap
        │   ├── Hero Line Shape
        │   ├── Hero Line Shape
        │   └── Hero Line Shape
        ├── Ovveflow Hidden [sic]
        │   └── Hero Thumb Slider
        │       └── Thumb Slider Grid
        │           └── [3x Thumb Slider Block]
        │               └── [2x Thumb Slider Row]
        │                   └── [3x Thumb Slider Box → Thumb Slider img]
        ├── About Section
        │   └── Main Container
        │       └── About Column
        │           ├── Left Column
        │           │   └── Counter Wrapper
        │           │       └── Counter Content
        │           │           ├── H2 Counter Value
        │           │           ├── T Counter Plus
        │           │           └── P Body Large
        │           └── Right Column
        │               └── About Content
        │                   ├── P Body Large
        │                   ├── T Heading Style H6
        │                   └── About Text Thumb Column
        │                       ├── About Thumb Box → About Thumb [img]
        │                       └── About Content Block
        │                           ├── P Body Large
        │                           └── Mt40 → Primary Button [Component]
        └── Brandlogo Section
            └── Brandlogo Slider
                └── Brandlogo Row
                    └── [Brandlogo Box → Brandlogo img] × N
```

---

## Interactions / Animations (GSAP)

Alle Animationen sind mit GSAP implementiert (Webflow zeigt "Only showing interactions created with GSAP").

### Hover Interactions
| Name                    | Trigger | Actions |
|-------------------------|---------|---------|
| Button Hover interaction| Hover   | 2       |
| Social Hover Interaction| Hover   | 2       |
| Service Hover           | Hover   | 3       |
| Hover interaction       | Hover   | 2       |
| Blog Hover              | Hover   | Custom  |
| Team Hover              | Hover   | 4       |
| Cta Footer Author Hover | Hover   | 4       |
| Menu Hover Circle       | Hover   | 2       |
| Offcanvas Icon Hover    | Hover   | 2       |
| Offcanvas Menu Close Hover | Hover | Custom |

### Page Load Animations
| Name                    | Trigger    | Actions |
|-------------------------|------------|---------|
| Page load interaction   | Page Load  | Custom  |
| Load Split Animation    | Page Load  | Custom  |
| Page load Up            | Page Load  | Custom  |

### Scroll Animations
| Name                         | Trigger | Actions |
|------------------------------|---------|---------|
| Scroll Split Animation       | Scroll  | Custom  |
| Scroll Up Animation          | Scroll  | Custom  |
| Service Scroll Animation     | Scroll  | 3       |
| Video Scroll Animation       | Scroll  | Custom  |
| Large Thumb Scroll Animation | Scroll  | 11      |

### Click / Toggle Interactions
| Name                    | Trigger | Actions |
|-------------------------|---------|---------|
| Offcanvas Menu Body     | Click   | Custom  |
| Offcanvas Menu Open Close| Click  | Custom  |
| Pricing Switer One      | Click   | Custom  |
| Pricing Toggle Starter  | Click   | 3       |
| Pricing Toggle Growth   | Click   | 3       |
| Pricing Toggle Premium  | Click   | 3       |
| Step Button Click Event 1 | Click | 3       |
| Step Button Click Event 2 | Click | 3       |
| Step Button Click Event 3 | Click | 3       |

### Infinite / Continuous Animations
| Name                         | Type            |
|------------------------------|-----------------|
| Infinite Slider Bottom To Top| Infinite Slider |
| Infinite Slider Right To Left| 2 actions       |

### Special: Hero Border Animation
- Page load trigger, Custom Animation

---

## Global CSS Classes (Webflow Style Manager)

### Body (All Pages)
```css
body {
  background-color: var(--whitesmoke-1000);   /* #f5f5f5 */
  font-family: var(----typography---font-family--body-font);  /* Kanit */
  color: var(--black-700);                    /* rgba(0,0,0,0.7) */
  font-size: var(--typography---body-small--font-size);       /* 1rem */
  line-height: var(--typography---body-small--line-height);   /* 1.625em */
  font-weight: var(--typography--font-weight--regular);       /* 400 */
}
```

### All H1 Headings
```css
h1 {
  margin-top: 0px;
  margin-bottom: 0px;
  font-family: var(----typography---font-family--heading-font);  /* Khand */
  color: var(--black-1000);           /* black */
  font-size: var(--typography---h1--font-size);
  line-height: var(--typography---h1--line-height);
  font-weight: var(--typography---h1--font-weight);  /* Bold 700 */
  text-transform: uppercase;
}
```

### All H2 Headings
```css
h2 {
  margin-top: 0px;
  margin-bottom: 0px;
  font-family: var(----typography---font-family--heading-font);
  color: var(--black-1000);
  font-size: var(--typography---h2--font-size);
  line-height: var(--typography---h2--line-height);
  font-weight: var(--typography---h2--font-weight);
  text-transform: uppercase;
}
```

### All H3 Headings
```css
h3 {
  margin-top: 0px;
  margin-bottom: 0px;
  font-family: var(----typography---font-family--heading-font);
  color: var(--black-1000);
  font-size: var(--typography---h3--font-size);
  line-height: var(--typography---h3--line-height);
  font-weight: var(--typography---h3--font-weight);
  text-transform: uppercase;
}
```

### All H4 Headings
```css
h4 {
  margin-top: 0px;
  margin-bottom: 0px;
  font-family: var(----typography---font-family--heading-font);
  color: var(--black-1000);
  font-size: var(--typography---h4--font-size);
  line-height: var(--typography---h5--line-height);  /* Note: uses H5 line-height */
  font-weight: var(--typography---h4--font-weight);
  text-transform: uppercase;
}
```

### All H5 Headings
```css
h5 {
  margin-top: 0px;
  margin-bottom: 0px;
  font-family: var(----typography---font-family--heading-font);
  color: var(--black-1000);
  font-size: var(--typography---h5--font-size);
  line-height: var(--typography---h5--line-height);
  font-weight: var(--typography---h5--font-weight);
  text-transform: uppercase;
}
```

### All H6 Headings
```css
h6 {
  margin-top: 0px;
  margin-bottom: 0px;
  font-family: var(----typography---font-family--heading-font);
  color: var(--black-1000);
  font-size: var(--typography---h6--font-size);
  line-height: var(--typography---h6--line-height);
  font-weight: var(--typography---h6--font-weight);  /* Semi Bold 600 */
  text-transform: uppercase;
}
```

**IMPORTANT:** ALL headings (H1–H6) use `text-transform: uppercase`

### All Paragraphs
```css
p {
  margin-bottom: 0px;
}
```

### All Unordered Lists
```css
ul {
  margin-top: 0px;
  margin-bottom: 10px;
  padding-left: 40px;
}
```

### All Images
```css
img {
  display: inline-block;
  max-width: 100%;
}
```

### All Block Quotes
```css
blockquote {
  margin-bottom: 10px;
  padding: 10px 20px;
  border-left: 5px solid #E2E2E2;
  font-size: 18px;
  line-height: 22px;
}
```

### Footer Logo Block
```css
.footer-logo-block {
  margin-bottom: var(--spacing--gap--gap-xl);  /* 40px */
}
```

---

## Components

Only 5 reusable components in the entire site:

| Component       | Instances | Notes |
|-----------------|-----------|-------|
| Footer          | 22        | Used on every page |
| Header          | 21        | Default dark nav |
| Header White    | 2         | White variant nav |
| Primary Button  | 26        | Main CTA button |
| Scocenday Button| 7         | Secondary button (typo in name) |

---

## Key Implementation Notes

1. **Fonts:** Khand (headings) + Kanit (body) — beide Google Fonts
2. **Farben:** Minimales Palette — schwarz, weiß, whitesmoke + transparente Varianten
3. **H1 Large Desktop:** 16.5rem = 264px — extrem groß, dominiert den Hero
4. **Alle Headings:** Bold (700), außer H6/H6 Small = Semi Bold (600)
5. **GSAP wird für ALLE Interaktionen verwendet** — kein Webflow IX2
6. **Offcanvas Navigation** (nicht Standard-Dropdown)
7. **Thumb Slider:** Custom infinite scroll (nicht Webflow native slider)
8. **Pricing hat Toggle** (Starter/Growth/Premium) mit 3 separaten Click-Events
9. **Steps-Sektion** hat Click-basierte Tab-Interaktion (3 Buttons)
10. **Breakpoints:** Mobile S / Mobile L / Tablet / Base / Desktop L (5 Breakpoints)
