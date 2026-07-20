# pondex — Bungee Design System

_Live-DOM-Inspektion bungee-pro.webflow.io — 2026-07-17_
_Computed styles, HTML-Struktur, Animationen direkt aus dem Browser ausgelesen._
_Single source of truth. Kein Raten, keine Annahmen._

---

## 1. FONTS

| Font | Computed | Verwendung |
|---|---|---|
| **Interdisplay** | `Interdisplay, Arial, sans-serif` | ALLES — Headlines, Body, Nav, Buttons |
| **Chivo Mono** | `Chivo Mono, monospace` | Nur: Mono-Labels, Tags `( _01 )`, kleine Beschriftungen |

**Google Fonts Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400;14..32,500;14..32,600&family=Chivo+Mono:wght@300;400;500&display=swap');
```

---

## 2. FARBEN

Direkt aus Style Guide DOM ausgelesen:

| Name | Hex | Computed | Verwendung |
|---|---|---|---|
| **Black** | `#1e1e1e` | `rgb(30, 30, 30)` | Primärer Text, alle Buttons, Nav-Links |
| **White** | `#ffffff` | `rgb(255, 255, 255)` | Hintergrund aller Sections |
| **Light Gray** | `#eef0f6` | `rgb(238, 240, 246)` | Footer-Hintergrund, Testimonial-Cards |
| **Text** | `#5a6271` | — | Muted Text, Subtitles |
| **Gray** | `#8a919b` | — | Weitere muted Elemente |
| **Border** | `#d0d8e4` | `rgb(208, 216, 228)` | FAQ Divider, Blog-Card Borders |

### Pastel-Akzentfarben (nur Cards, nie Section-Backgrounds)
| Name | Hex | Verwendung |
|---|---|---|
| **Lavender** | `#e5daf6` | Service Card 01 Background |
| **Mint** | `#cfffb2` | Card-Hintergründe |
| **Rose** | `#ffc9c9` | Card-Hintergründe |
| **Peach** | `#fedca6` | Card-Hintergründe |

### pondex Brand Additions
```css
--color-accent: #00ff88;    /* Score-Zahlen, Verdict-Labels */
--gradient-brand: linear-gradient(
  180deg,
  #0a0a0a 0%, #1a1f3a 15%, #2d3a8c 30%, #5b4fd4 45%,
  #9b3fc8 57%, #e03090 68%, #f0304a 80%, #f5612a 90%, #f07020 100%
);
```

---

## 3. TYPOGRAFIE

### Heading Scale (aus Style Guide gemessen)
| Tag | rem | px | Weight | Letter-Spacing | Line-Height |
|---|---|---|---|---|---|
| H1 | 4.38rem | ~70px | 500 | -0.03em (-2.1px) | 1.0 |
| H2 | 3.75rem | ~60px | 500 | -0.02px (fast 0) | 1.1 |
| H3 | 3rem | ~48px | 500 | -0.02px | 1.1 (52.8px) |
| H4 | 2rem | ~32px | 500 | — | 1.2 |
| H5 | 1.5rem | 24px | 500 | -0.01em (-0.24px) | 1.2 (28.8px) |
| H6 | 1.25rem | ~20px | 500 | — | 1.4 |

### Body / Paragraph Scale
| Class | Size | Weight | Font |
|---|---|---|---|
| `paragraph-xl-medium` | 1.13rem (18px) | 500 | Interdisplay |
| `paragraph-l-medium` | 1.1rem (17.6px) | 500 | Interdisplay |
| `paragraph-l-regular` | 1.1rem (17.6px) | 400 | Interdisplay |
| `paragraph-m-regular` | 0.88rem (14px) | 400 | Interdisplay |
| `paragraph-s-medium` | 0.75rem (12px) | 500 | Interdisplay |
| `paragraph-text-mono` | 14px | 400 | Chivo Mono |

**Wichtig:** Headlines sind **mixed-case mit Punkt am Ende** — "Latest Projects." / "FAQ." / "Services." — KEIN uppercase.

---

## 4. NAVIGATION — EXAKT

### Struktur (aus navContainerHtml ausgelesen)
```html
<nav class="navbar">
  <div class="nav-container">
    <!-- Logo links -->
    <a class="nav-brand"><img class="nav-logo" /></a>

    <!-- Nav Menu — SICHTBAR AUF DESKTOP (nicht nur Hamburger!) -->
    <nav class="nav-menu-block">
      <div class="nav-menu-block-inner">
        <div class="nav-links-wrapper">
          <!-- Nav Links MIT Nummer-Prefix -->
          <a class="nav-link">
            <div class="nav-link-inner">
              <div class="nav-link-number-block">
                <div class="paragraph-text-mono">( _01 )</div>
              </div>
              <div>Homepage</div>
            </div>
            <div class="nav-hover-line"></div>  <!-- Underline-Animation -->
          </a>
          <!-- ... weitere Links -->
        </div>
        <!-- Unten: Mail + Social -->
        <div class="nav-bottom-block">
          <a class="mail-link">hi@bungee.io</a>
          <div class="social-links-block">BE / DR / X</div>
        </div>
      </div>
    </nav>

    <!-- Hamburger (Mobile) -->
    <div class="nav-menu-button">
      <div class="nav-open-button-line-v1"></div>
      <div class="nav-open-button-line-v2"></div>
    </div>
  </div>
</nav>
```

### Nav Computed Styles
```css
.navbar {
  position: fixed;
  height: 80px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  padding: 16px 0;
  /* KEIN border-bottom */
}
```

### Nav-Link Styles (im Offcanvas/Menu)
```css
.nav-link {
  font-size: 60px;       /* sehr groß! */
  font-weight: 500;
  letter-spacing: -1.2px;
  color: rgb(30, 30, 30);
  padding: 0 0 10px 0;
  text-transform: none;  /* mixed-case */
  display: block;
}
.nav-link-number-block {
  /* Chivo Mono, klein */
  font-size: 14px; /* paragraph-text-mono */
}
```

### Nav Hover-Line Animation
```css
.nav-hover-line {
  height: 2px;
  background: rgb(30, 30, 30);
  width: 0%;           /* startet bei 0 */
  position: absolute;
  bottom: 0;
  /* Animiert per GSAP/Webflow: width 0% → 100% on hover */
}
```

**KORREKTUR zu früherer Doku:** Das Nav-Menu ist NICHT nur Hamburger. Es ist ein Offcanvas/Overlay-Menu das bei Klick auf Hamburger aufgeht — mit 60px Links. Auf Desktop ist es versteckt und öffnet per Hamburger.

---

## 5. BUTTONS — EXAKT

### Button Primary (`button-primary`) — "Let's Talk"
```html
<a class="button-primary">
  <div>Let's Talk</div>
  <img class="primary-button-icon" />  <!-- Plus-Icon SVG -->
  <div class="button-primary-bottom-line"></div>  <!-- Underline-Animation -->
</a>
```
```css
.button-primary {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 0 4px 0;
  font-size: 17.6px;      /* paragraph-l-medium */
  font-weight: 500;
  color: rgb(30, 30, 30);
  background: transparent;
  border-radius: 0;
  position: relative;
}
.button-primary-bottom-line {
  height: 1px;
  background: rgb(30, 30, 30);
  position: absolute;
  bottom: 0;
  width: ~15%;            /* animiert per GSAP on hover: 15% → 100% */
}
```

### Button Primary V2 (`button-primary-v2`) — "Get in touch"
```css
/* Identisch zu button-primary aber ohne bottom-line div — direkt border-bottom */
.button-primary-v2 {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 0 4px 0;
  font-size: 17.6px;
  font-weight: 500;
  background: transparent;
  border-radius: 0;
}
```

**Kein Pill-Button für CTAs. Kein Hintergrund. Kein border-radius.**
Die "Pill"-Shapes kommen nur vor als: Hamburger-Linien (border-radius: 50px), Hero-Items (border-radius: 80px 0px).

### pondex CTA Adaptation
Da pondex ein Finanz-Tool ist, darf der primäre CTA ("Get free access") ein Pill-Button sein — aber sparsam eingesetzt. Bungee-Style CTAs (Text + Underline + Plus-Icon) für sekundäre Actions.

---

## 6. HERO SECTION — EXAKT

### Struktur
```
.hero (padding: 105px 0 32px)
  └── .hero-content-wrapper (flex, column, justify: space-between)
        ├── .hero-top-block (flex, column, align: center, padding: 48px 32px 0)
        │     ├── .hero-large-logo (IMG, width: 704px — großes Bild/SVG)
        │     └── .heading-style-h5 (Tagline, 24px, 500)
        └── .hero-bottom-block (flex, column, gap: 34px)
              ├── .hero-bottom-top-block (flex, row, justify: flex-end, padding: 0 32px)
              │     ├── .hero-left-time-block  "(HAILNY)"
              │     └── .social-links-block    "BE / DR / X"
              └── .hero-marquee-wrapper-outer-block
                    └── Marquee mit .hero-item-single (Videos/Bilder)
                          border-radius: 80px 0px  ← asymmetrisch!
                          width: 181px, height: 520px
```

### Hero Items (Marquee)
- 32 Items, alle mit `border-radius: 80px 0px` — charakteristisches Bungee-Muster
- Jedes Item ist ein Video-Loop oder Bild (Projekt-Vorschau)
- Width: 181px, Height: 520px — hochformatig

### pondex Hero Adaptation
- Kein "hero-large-logo" → stattdessen großes H1 ("Confident verdict. / 60 seconds.")
- Tagline als H5 (24px, 500)
- Hero-Marquee: Pastel-Cards mit Score-Mockups statt Video-Items
- Asymmetrischer border-radius: `80px 0px` auf den Marquee-Cards übernehmen
- padding: 105px oben, 32px unten — exakt übernehmen

---

## 7. SECTIONS — EXAKT

### Alle Section-Hintergründe
```
.hero          → transparent (= weiß)
.home-about    → transparent (= weiß)
.home-projects → transparent (= weiß)
.services      → transparent (= weiß)
.matrics       → transparent (= weiß)
.testimonials  → transparent (= weiß)
.faq           → transparent (= weiß)
.home-blog     → transparent (= weiß)
.footer        → #eef0f6  ← EINZIGE farbige Section
```

**Alle Sections weiß. Kein color-blocking. Footer = `#eef0f6`.**

### Section Padding
| Section | Padding Top | Padding Bottom |
|---|---|---|
| Hero | 105px | 32px |
| Home About | 120px | 120px |
| Home Projects | 32px | 128px |
| Services | 32px | 120px |
| Matrics/Stats | 32px | 120px |
| Testimonials | 32px | 120px |
| FAQ | 32px | 96px |
| Home Blog | 32px | 48px |
| Footer | 32px | 32px |

---

## 8. PROJECTS SECTION — EXAKT

### Layout
- **KEIN** Text-Zeilen-mit-border-top (das war falsch in der alten Doku!)
- Stattdessen: **Grid aus Project-Cards** — `display: grid, gap: 12px 24px`

### Project Card Struktur
```html
<a class="project-card">
  <div class="project-card-image-block">
    <img class="project-card-image" />         <!-- Bild, width: 676px -->
    <div class="project-card-logo-block">
      <img class="project-card-logo-image" />  <!-- Logo over image -->
    </div>
  </div>
  <div class="project-card-info-block">
    <div class="paragraph-s-medium">THINGS®</div>
    <div class="project-card-date-block-2">...</div>
  </div>
</a>
```
```css
.project-card {
  display: inline-block;
  border-radius: 0px;   /* keine abgerundeten Ecken */
}
```

---

## 9. SERVICES SECTION — EXAKT

### Layout
- **Slider/Carousel** (`w-slider`) — NICHT statisches Grid
- Cards nebeneinander, Pfeil-Navigation rechts

### Service Card
```css
.service-slider-card {
  background: rgb(229, 218, 246);  /* Lavender — erste Card */
  border-radius: 40px;
  padding: 40px;
  width: 450px;
}
```
Struktur:
```html
<div class="service-slider-card">
  <div class="paragraph-text-mono">( 001 )</div>
  <img class="service-icon" />
  <div class="service-info-block">
    <div class="paragraph-text-mono">BRANDING</div>
    <div>We craft logos...</div>
  </div>
</div>
```

---

## 10. ABOUT / MATRICS SECTION — EXAKT

### About (home-about)
- Großer Statement-Text H3 (48px, 500) — zentriert, volle Breite
- Darunter: Partner-Logos-Marquee (horizontaler Scroll, kein Marquee-Text)
- GSAP Split-Text-Effect: Zeilen gleiten von unten rein (`translate(0%, 100%) → 0%`)

### Matrics/Stats
- H3 Statement (48px): "Bungee® is a creative studio..."
- Video-Block mit Lightbox-Play-Button (zentriert)
- Stats-Zahlen: 3m+, 289, 56, 97% — in einem Grid
- Kein großer Zahlen-Counter-Animation dokumentiert im DOM

---

## 11. TESTIMONIALS — EXAKT

### Card Styles
```css
.testimonial-card {
  background: rgb(238, 240, 246);  /* #eef0f6 — Light Gray! Nicht Ink */
  border-radius: 32px;
  padding: 0px;  /* Padding ist innen auf child-elements */
  display: grid;
}
```
- **Hintergrund ist `#eef0f6` (Light Gray) — NICHT dunkel!**
- Struktur: Bild oben + Quote + Author unten
- 3 Cards nebeneinander (auf Desktop)

---

## 12. FAQ — EXAKT

### Struktur (Webflow Dropdown)
```css
.faq-question-block {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  font-size: 16px;
  border-bottom: 1px solid rgb(208, 216, 228);  /* #d0d8e4 */
  /* kein border-top */
}
```
- Chevron-Icon dreht sich bei Open
- Answer-Wrapper: `.faq-answer-wrapper.w-dropdown-list` — slideDown

---

## 13. BLOG SECTION — EXAKT

### Blog Card
```css
.blog-card {
  display: inline-block;
  border-top: 1px solid rgb(208, 216, 228);
  border-bottom: 1px solid rgb(208, 216, 228);
}
```
- Bild + Datum + Titel
- Border-top und border-bottom als Divider

---

## 14. FOOTER — EXAKT

```css
.footer {
  background: rgb(238, 240, 246);  /* #eef0f6 */
  padding: 32px;
  display: block;
}
```
Struktur:
```
footer-top-block:
  footer-top-bar: Logo | BE/DR/X
  footer-content: Text + Newsletter Form
footer-bottom: Nav-Links | Copyright
```

---

## 15. ANIMATIONEN — EXAKT

### GSAP (Webflow Interactions)
Alle Elemente haben initial `style="opacity: 0;"` im DOM — werden per GSAP eingeblendet.

**Scroll-Trigger (fade-in):**
```js
// Alle data-w-id Elemente
opacity: 0 → 1
y: 30px → 0
duration: 0.6s, ease: easeOut
stagger: 0.1s (bei Gruppen)
```

**GSAP Split-Text (About Section):**
```css
/* Jede Zeile wrapped in .gsap_split_line */
transform: translate(0%, 100%)  /* initial — kommt von unten */
→ transform: translate(0%, 0%)  /* on scroll */
```

**Button Hover (bottom-line):**
```js
.button-primary-bottom-line: width 15% → 100%, duration 0.3s
```

**Nav-Hover-Line:**
```js
.nav-hover-line: width 0% → 100%, opacity 0 → 1, duration 0.3s
```

**Hero Marquee:**
- GSAP continuous scroll (kein CSS animation)
- `translate3d(-56.946%, 0px, 0px)` — live im DOM sichtbar
- Will-change: transform

**Framer Motion Equivalents für pondex:**
```jsx
// Scroll fade-up
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, ease: 'easeOut' }}

// Stagger
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}
const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

// Button bottom-line hover
initial={{ scaleX: 0.15, originX: 0 }}
whileHover={{ scaleX: 1 }}
transition={{ duration: 0.3 }}

// Nav-hover-line
initial={{ width: '0%', opacity: 0 }}
whileHover={{ width: '100%', opacity: 1 }}
transition={{ duration: 0.3 }}

// Hero Marquee
animate={{ x: ['0%', '-50%'] }}
transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
```

---

## 16. WHAT IS REAL vs. WAS ICH FRÜHER FALSCH HAD

| Frühere Annahme | Realität |
|---|---|
| Nav: nur Logo + Hamburger | Nav: Logo + Offcanvas-Menu mit 60px-Links (per Hamburger geöffnet) |
| Testimonial Cards: dunkel (#0a0a0a) | Testimonial Cards: **#eef0f6** (Light Gray) |
| Projects: Text-Zeilen mit border-top | Projects: **Card-Grid** mit Bild + Info |
| Alle CTAs: Text + Underline | CTA "Let's Talk": Text + Plus-Icon + animated bottom-line |
| Stats: große Zahlen-Counter | Stats: Zahlen in kompaktem Grid + Video-Block |
| Footer: dunkel | Footer: **#eef0f6** (Light Gray) |
| Nav-Links: nur im Offcanvas sichtbar | Nav-Links: **immer im Offcanvas** — öffnen per Hamburger |

---

## 17. CSS VARIABLES (vollständig, verifiziert)

```css
:root {
  /* Fonts */
  --font-display: 'Interdisplay', 'Inter', Arial, sans-serif;
  --font-mono: 'Chivo Mono', monospace;

  /* Colors */
  --color-ink: #1e1e1e;
  --color-white: #ffffff;
  --color-light: #eef0f6;      /* Footer + Testimonial Cards */
  --color-text: #5a6271;
  --color-gray: #8a919b;
  --color-border: #d0d8e4;

  /* Pastels — nur für Cards */
  --color-lavender: #e5daf6;   /* Service Card */
  --color-mint: #cfffb2;
  --color-rose: #ffc9c9;
  --color-peach: #fedca6;

  /* pondex Brand */
  --color-accent: #00ff88;
  --gradient-brand: linear-gradient(
    180deg,
    #0a0a0a 0%, #1a1f3a 15%, #2d3a8c 30%, #5b4fd4 45%,
    #9b3fc8 57%, #e03090 68%, #f0304a 80%, #f5612a 90%, #f07020 100%
  );

  /* Nav */
  --nav-height: 80px;
  --nav-bg: rgba(255, 255, 255, 0.7);
  --nav-blur: blur(10px);

  /* Spacing */
  --hero-padding: 105px 0 32px;
  --section-padding: 120px 0;
  --container-padding: 0 32px;

  /* Border Radius */
  --radius-card-lg: 40px;      /* Service Cards */
  --radius-card: 32px;         /* Testimonial Cards */
  --radius-hero-item: 80px 0px; /* Asymmetrisch — Hero-Marquee-Items */

  /* Typography */
  --text-h1: 4.38rem;          /* 70px */
  --text-h2: 3.75rem;          /* 60px */
  --text-h3: 3rem;             /* 48px */
  --text-h4: 2rem;             /* 32px */
  --text-h5: 1.5rem;           /* 24px */
  --text-body-l: 1.1rem;       /* 17.6px */
  --text-body-m: 0.88rem;      /* 14px */
  --text-mono: 14px;           /* Chivo Mono */
}
```

---

_Quelle: Live-DOM-Inspektion bungee-pro.webflow.io, 2026-07-17_
_Methode: computed styles, innerHTML, outerHTML direkt aus Browser-JS ausgelesen_
