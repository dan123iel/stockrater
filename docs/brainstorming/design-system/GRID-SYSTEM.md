# pondex — Invisible Grid System

_Basiert auf Bungee-Inspektion (computed styles, 2026-07-17). Alle Sections richten sich nach diesem Grid._

---

## Das Grid

```
Max-width:  1520px
Gutter:     32px links + rechts (= padding: 0 32px)
Hintergrund: immer weiß (#ffffff), außer Footer (#eef0f6)
```

Kein Column-Grid (keine 12-Spalten). Bungee verwendet ein **Flow-basiertes Grid**:
- Volle Breite mit 32px Seitenabstand
- Inhalte füllen die verfügbare Breite aus
- Ausnahme: Projekt-Grid = 2 Spalten à 676px mit 24px Gap

---

## Section Spacing (vertikal)

| Section | Padding Top | Padding Bottom |
|---|---|---|
| Hero | 105px (+ 48px inner top-block) | 32px |
| Alle anderen | 32px | 120px (oder 128px) |
| FAQ | 32px | 96px |
| Blog | 32px | 48px |
| Footer | 32px | 32px |

**Regel:** Fast alle Sections haben **32px oben**, nicht 120px. Die 120px sind unten.

---

## Horizontal Container

Alle Sections außer Hero und About verwenden:
```css
.bungee-container {
  padding: 0 32px;
  max-width: 1520px;
  width: 100%;
}
```

Hero und About haben eigenes padding direkt auf der Section.

---

## Typografie-Hierarchie im Grid

```
Section Label (eyebrow):  Chivo Mono, 14px, uppercase, #5a6271   → margin-bottom: 16px
Section H2:               Interdisplay, 60px, 500, -1.2px        → margin-bottom: 48px
Content H3:               Interdisplay, 48px, 500
Body:                     Interdisplay, 17.6px, 400, #5a6271
Mono label:               Chivo Mono, 14px, 400, #5a6271
```

---

## Abstände zwischen Elementen

```
Section-Header → Content:    48px margin-bottom
Divider-Listen (gap):        0px (border-top trennt)
Card-Grid gap:               24px (Services: 450px cards)
Projekt-Grid gap:            12px vertikal, 24px horizontal
Testimonial-Cards gap:       16px
Stats-Grid gap:              32px
```

---

## Farben im Grid-Kontext

```
Section-BG:          #ffffff  (immer, keine Ausnahme)
Footer-BG:           #eef0f6
Card-BG (neutral):   #eef0f6  (Testimonials, Pricing Free)
Card-BG (brand):     #e5daf6  (Lavender — einzige Pastelfarbe)
Card-BG (dark):      #1e1e1e  (Pricing Pro)
Divider/Border:      #d0d8e4
```

**Regel:** Nur 2 Pastel-Töne erlaubt: `#eef0f6` (neutral) und `#e5daf6` (Lavender/Brand).

---

## Border-Radius im Grid

| Kontext | Radius |
|---|---|
| Cards (groß) | 40px (Service Cards) |
| Cards (standard) | 32px (Testimonials, Pricing, ScoreDemo) |
| Tags/Badges | 50px (Pill) |
| Hero Marquee Items | 80px 0px (asymmetrisch — oben-links rund) |
| Blog Images | 20px |
| Newsletter Button | 12px |
| Projekt-Cards | 0px |
| FAQ, Divider-Listen | 0px |

---

## Logo & Nav im Grid

```
Nav height:       80px, fixed
Nav padding:      0 32px (gleich wie .bungee-container)
Logo (p_):        SVG-Mark, 24px Höhe, #1a2040
Hamburger:        32×32px, "+" Kreuz (2px Linien)
```

---

_Dieses Dokument ist die Referenz für alle Layout-Entscheidungen._
_Keine Section darf von diesem Grid abweichen ohne explizite Begründung._
