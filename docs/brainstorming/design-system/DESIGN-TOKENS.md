# pondex — Design Tokens
_Quelle: Live-DOM-Inspektion bungee-pro.webflow.io, 2026-07-17. Alle Werte computed, nicht geraten._

---

## FARBEN

### Core (einzige erlaubte Farben — keine Ausnahmen)
```
--color-ink:         #1e1e1e   — Text, Borders, schwarze Hintergründe
--color-white:       #ffffff   — Alle Section-Hintergründe
```

### Brand Accents (drei Farben, semantisch benannt)
```
--color-valuation:   #F093A2   — Rosa/Rose  — Valuation-Faktor, Tags, Highlights
--color-growth:      #8FD8C8   — Mint/Teal  — Growth-Faktor, positive Signale
--color-profit:      #F4B183   — Peach      — Profitability-Faktor, CTAs, Scores
```

### Verwendungsregeln
- Schwarz/Weiß: Hintergründe, Text, Borders — alles strukturelle
- #F093A2 Valuation: Valuation-bezogene Tags, Highlights, Pricing-Cards
- #8FD8C8 Growth: Growth/positive Signale, Score-Bars, Marquee-Items
- #F4B183 Profit: Profitability, Score-Zahlen, primäre CTAs, Highlights
- **Kein #00ff88, kein #e5daf6, kein #eef0f6, kein #1a2040 als Akzent** — nur obige 5 Farben

### Was fällt weg
```
#00ff88  (altes Accent-Grün)     → ersetzt durch #8FD8C8 (Growth)
#e5daf6  (Lavender)              → ersetzt durch #F093A2 (Valuation)
#eef0f6  (Light Gray)            → ersetzt durch #ffffff (White)
#1a2040  (Dark Navy)             → ersetzt durch #1e1e1e (Ink)
```
--color-text:     #5a6271                    — Subtitles, Muted Text
--color-border:   #d0d8e4   (rgb 208,216,228) — FAQ-Divider, Blog-Borders

Pastels (nur Cards, nie Section-BG):
--color-lavender: #e5daf6   — Service Card 01
--color-mint:     #cfffb2
--color-rose:     #ffc9c9
--color-peach:    #fedca6

pondex Brand:
--color-accent:   #00ff88   — Score-Zahlen, Verdict-Labels
--gradient-brand: linear-gradient(180deg, #0a0a0a 0%, #1a1f3a 15%, #2d3a8c 30%,
                  #5b4fd4 45%, #9b3fc8 57%, #e03090 68%, #f0304a 80%, #f5612a 90%, #f07020 100%)
```

## FONTS
```
--font-display: 'Interdisplay', 'Inter', Arial, sans-serif
--font-mono:    'Chivo Mono', monospace
```

## TYPOGRAFIE (computed)
```
H1:  70.08px / 500 / tracking -2.1px  / lh 1.0
H2:  60px    / 500 / tracking -1.2px  / lh 1.1
H3:  48px    / 500 / tracking ~0px    / lh 1.1 (52.8px)
H4:  32px    / 500
H5:  24px    / 500 / tracking -0.24px / lh 28.8px
H6:  20px    / 500

paragraph-l-medium:  17.6px / 500
paragraph-l-regular: 17.6px / 400
paragraph-m-regular: 14px   / 400
paragraph-text-mono: 14px   / 400  Chivo Mono
paragraph-s-medium:  12px   / 500
```

## NAV
```
height:           80px
background:       rgba(255,255,255,0.7)
backdrop-filter:  blur(10px)
padding:          16px 0
position:         fixed
z-index:          1000
border-bottom:    none

.nav-container:
  display:         flex
  justify-content: space-between
  align-items:     center
  padding:         0 32px

.nav-logo:         width 24px, height 34px

Hamburger (.nav-menu-button):
  width: 32px, height: 32px
  .nav-open-button-line-v1: width 2px,  height 32px, border-radius 50px  ← VERTIKAL
  .nav-open-button-line-v2: width 32px, height 2px,  border-radius 50px  ← HORIZONTAL
  → Zusammen bilden sie ein "+" / Kreuz
```

## NAV OVERLAY (offen)
```
.nav-menu-block:
  background:  rgba(255,255,255,0.7)  ← GLEICH wie Nav!
  backdrop-filter: blur(10px)
  position:    fixed
  width:       100%
  height:      100vh
  z-index:     4

.nav-menu-block-inner:
  display:         flex
  flex-direction:  column
  justify-content: space-between  ← Links oben, Bottom-Block unten
  padding:         160px 32px 48px  ← 160px top (unter Nav)
  height:          100%
  gap:             120px

.nav-links-wrapper:
  display:        flex
  flex-direction: column
  gap:            10px

.nav-link:
  font-size:      60px
  font-weight:    500
  letter-spacing: -1.2px
  line-height:    66px
  padding:        0 0 10px
  color:          #1e1e1e
  text-transform: none

.nav-link-inner:
  display:     flex
  flex-direction: row
  align-items: center
  gap:         (kein expliziter gap — Nummer und Text direkt nebeneinander)

.nav-link-number-block:
  font-size:    60px  ← GLEICH GROSSE wie der Link-Text
  font-family:  Interdisplay  ← NICHT Chivo Mono!
  color:        #1e1e1e

.nav-hover-line:
  height:    2px
  background: #1e1e1e
  width:     0%  → animiert zu 100% on hover
  position:  absolute
  bottom:    0

.nav-bottom-block:
  display:         flex
  justify-content: space-between
  align-items:     flex-end
  padding:         0
  border-top:      none

.mail-link:
  font-size:   32px
  font-weight: 500
  display:     block
  padding:     0

.mail-link-bottom-line:
  height:     2px
  background: #1e1e1e
  width:      15%  → animiert zu 100% on hover

.social-links-block:
  display: flex
  gap:     12px

.social-link:
  font-size:   14px
  font-weight: 400
```

## HERO
```
.hero:
  padding-top:    105px
  padding-bottom: 32px
  background:     transparent
  overflow:       hidden

.hero-content-wrapper:
  display:         flex
  flex-direction:  column
  justify-content: space-between
  height:          763px (auf 1440px viewport)

.hero-top-block:
  display:         flex
  flex-direction:  column
  align-items:     center
  padding:         48px 32px 0
  gap:             32px
  → Logo-Bild (704px × 188px) + Tagline (24px/500, zentriert)

.hero-bottom-top-block:
  display:         flex
  flex-direction:  row
  justify-content: flex-end  ← Social rechts
  align-items:     center
  padding:         0 32px
  position:        relative

.hero-left-time-block:
  position: absolute
  left:     0    ← links absolute positioniert!
  bottom:   45px
  display:  flex
  gap:      10px
  font-size: 14px (paragraph-text-mono, Chivo Mono)

.hero-marquee-wrapper-outer-block:
  overflow: hidden

.hero-marquee-block:
  display: flex
  gap:     10px
  will-change: transform  ← GSAP continuous

.hero-item-single:
  width:        181px
  height:       520px
  border-radius: 80px 0px  ← asymmetrisch!
  overflow:     hidden
  flex-shrink:  0
```

## ABOUT SECTION
```
padding: 120px 0

.home-about-content-wrapper:
  display:        flex
  flex-direction: column
  max-width:      650px
  margin:         0 363px  ← rechts positioniert, nicht zentriert!
  gap:            24px

h2 (heading-style-h3):
  font-size:      48px
  font-weight:    500
  line-height:    52.8px
  text-align:     center
  letter-spacing: ~0px
```

## PROJECTS SECTION
```
padding: 32px 0 128px

.container: padding 0 32px, max-width 1520px

h2: 60px / 500 / tracking -1.2px

.projects-collection-list:
  display:               grid
  grid-template-columns: 676px 676px
  gap:                   12px 24px

.project-card:
  display:       inline-block
  border-radius: 0px  ← keine abgerundeten Ecken!
  overflow:      visible

.project-card-image:
  width:      676px
  height:     750px
  object-fit: cover
  border-radius: 0px

.project-card-info-block:
  display:         flex
  justify-content: space-between
  align-items:     center
  padding:         12px 0 12px 12px
```

## SERVICES SECTION
```
padding: 32px 0 120px

.service-top-block:
  display:         flex
  justify-content: space-between
  align-items:     flex-end

h2: 60px / 500 / tracking -1.2px

.service-slider-card:
  background:      #e5daf6 (lavender für Card 01)
  border-radius:   40px
  padding:         40px
  width:           450px
  height:          500px
  display:         flex
  flex-direction:  column
  justify-content: space-between

  .paragraph-text-mono (Nummer):  14px, Chivo Mono
  .service-icon:                  width 56px, height 56px
  service title (.paragraph-text-mono): 14px
```

## TESTIMONIALS SECTION
```
padding: 32px 0 120px

h2: 48px / 500

.testimonial-cards-block:
  display: flex
  gap:     32px

.testimonial-card:
  background:            #eef0f6
  border-radius:         32px
  display:               grid
  grid-template-columns: 688px 688px  ← Bild links, Text rechts!
  padding:               0

.testimonial-image-block:
  height:        826px
  overflow:      hidden
  border-radius: 32px 0 0 32px  ← nur links abgerundet

Content (heading-style-h4): Quote-Text als H4!
  font-size:   32px
  font-weight: 500

Author name (paragraph-l-medium): 17.6px / 500
Author role (paragraph-l-regular): 17.6px / 400, color: #5a6271
```

## FAQ SECTION
```
padding: 32px 0 96px

h2: 60px / 500

.faq-question-block:
  display:         flex
  justify-content: space-between
  padding:         12px 0
  font-size:       16px / 400
  border-bottom:   1px solid #d0d8e4

.faq-icon: width 20px, rotiert 180° bei open

.faq-answer-block:
  font-size:   16px
  padding:     16px 0
  line-height: 22.4px
```

## BLOG SECTION
```
padding: 32px 0 48px

h2 (heading-style-h1): 70.08px / 500  ← SEHR GROSS wie H1!

.blog-card:
  display:       inline-block
  border-top:    1px solid #d0d8e4
  border-bottom: 1px solid #d0d8e4
  padding:       0

.blog-card image: height 500px, border-radius 20px
title: 16px / 400
```

## FOOTER
```
background: #eef0f6
padding:    32px

.footer-content-wrapper:
  display:        flex
  flex-direction: column
  gap:            250px  ← sehr großer gap zwischen top und bottom

.footer-top-block:
  display:        flex
  flex-direction: column
  gap:            96px

.footer-top-bar:
  display:         flex
  justify-content: space-between
  align-items:     center

h3 (newsletter): 48px / 500

Newsletter Input:
  background:    transparent
  border-radius: 0
  font-size:     16px

Newsletter Button:
  background:    #1e1e1e
  color:         white
  border-radius: 12px
  padding:       9px 15px
  font-size:     16px

.footer-bottom-block:
  display:         flex
  justify-content: space-between
  align-items:     center
```

## BUTTONS
```
.button-primary ("Let's Talk"):
  display:     flex
  align-items: center
  gap:         16px
  font-size:   17.6px (paragraph-l-medium)
  font-weight: 500
  padding:     0 0 4px
  position:    relative
  background:  transparent
  border:      none
  border-radius: 0

  .button-primary-bottom-line:
    height:    1px
    background: #1e1e1e
    position:  absolute
    bottom:    0
    width:     ~15%  → animiert zu 100% on hover/load

  Plus icon (SVG): rechts neben Text, ca. 16px

.button-primary-v2 ("Get in touch"):
  Identisch zu button-primary, aber ohne bottom-line div
  (border-bottom direkt am Element)
```

## ANIMATIONEN (GSAP → Framer Motion Equivalents)
```
Page Load (alle Elemente starten opacity: 0):
  initial:    { opacity: 0, y: 30 }
  animate:    { opacity: 1, y: 0 }
  transition: { duration: 0.6, ease: 'easeOut' }
  stagger:    0.1s

Hero Logo/Tagline:
  initial: opacity: 0, transform: translate3d(0,0,0)
  → fade in on load

GSAP Split Text (About H2):
  Jede Zeile: transform translate(0%, 100%) → translate(0%, 0%)
  → In Framer: clipPath oder y: 40 → 0

Marquee (Hero + About):
  GSAP continuous: will-change: transform, translate3d
  → Framer: animate={{ x: ['0%', '-50%'] }}, repeat: Infinity, linear

Button Bottom-Line Hover:
  width: ~15% → 100%, duration 0.3s ease

Nav-Link Hover-Line:
  width: 0% → 100%, opacity 0 → 1, duration 0.3s
  position: absolute, bottom: 0

Nav Open Animation (Webflow default):
  Overlay: display none → flex, fade in
  Links: stagger fade-in from bottom

FAQ Chevron:
  On open: rotate 0° → 180° (transform)
  Answer: height 0 → auto, opacity 0 → 1

Scroll Sections:
  opacity: 0 (data-w-id="..." style="opacity: 0")
  → whileInView: opacity 1, y 0
  viewport: { once: true }
```
