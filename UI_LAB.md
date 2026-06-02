# vistaclara — UI Lab Documentation

> **Status:** Pre-implementation reference document  
> **Purpose:** Structured specification for the UI Lab — a dedicated testing environment where all design elements, layout variants, and interaction patterns can be explored before being applied to the production app.  
> **Background:** White `#ffffff` — fixed. No exceptions.

---

## Table of Contents

1. [What is the UI Lab?](#1-what-is-the-ui-lab)
2. [Design Reference Index](#2-design-reference-index)
3. [Section 01 — Themes & Color Tokens](#3-section-01--themes--color-tokens)
4. [Section 02 — Typography Playground](#4-section-02--typography-playground)
5. [Section 03 — Component Gallery](#5-section-03--component-gallery)
6. [Section 04 — Layout Experiments](#6-section-04--layout-experiments)
7. [Section 05 — Navigation Variants](#7-section-05--navigation-variants)
8. [Section 06 — Hero Variants](#8-section-06--hero-variants)
9. [Section 07 — Background Experiments](#9-section-07--background-experiments)
10. [Section 08 — Animation Lab](#10-section-08--animation-lab)
11. [Section 09 — Dark Mode](#11-section-09--dark-mode)
12. [Section 10 — Grid & Spacing System](#12-section-10--grid--spacing-system)
13. [Implementation Notes](#13-implementation-notes)

---

## 1. What is the UI Lab?

The UI Lab is a standalone tab inside vistaclara — accessible via the sidebar navigation — that serves as a living design system and experimentation environment.

**Goals:**
- Test visual changes without touching production code
- Preview all components in isolation
- Switch between layout/navigation/hero variants instantly
- Validate dark mode, color tokens, and typography choices
- Serve as a design reference for future development

**Access:** Sidebar nav → "UI Lab" (last item, marked with ⚗ icon)

**Data:** UI Lab uses mock/dummy data only. No worker connection required.

---

## 2. Design Reference Index

All design decisions in the UI Lab trace back to one or more of these reference sites. Each reference is tagged with a short code used throughout this document.

| Code | Source | Key Takeaway |
|------|--------|-------------|
| `[NV]` | nvrmndstudio.com | 4-column grid lines, top-bar nav, section badges, fullscreen menu overlay, footer typography |
| `[LC]` | locomotive.ca | Centered serif list with dividers, inline thumbnails, minimal 3-zone nav |
| `[OL]` | theoutline.com | Split-screen nav overlay, neo-brutalist nav items with dividers, floating stickers |
| `[SF]` | starface.world | Bento grid with per-tile background colors, vertical brand name, tight grid gap |
| `[GL]` | glossier.com | Bleed typography over image, oversized brand name, floating badge circles |
| `[ST]` | stripe.com | Live counter, gradient blob hero, text in gradient color, two-button nav CTA |
| `[LP]` | ensemblelapalatine.com | Collage / mixed-media, radiating line element, cutout illustrations |
| `[HM]` | Harmony Festival | Radial gradient overlays, deep organic color blobs on dark |
| `[KN]` | kerna.xyz | Full-bleed display typography, dot-grid background pattern, bottom center nav |
| `[IM]` | impossible→possible | Bento editorial grid, oversized numbers, circular colored card |
| `[RL]` | Meta Smart Glasses | Floating annotation boxes on product, white bg with max airiness |
| `[FR]` | francouvertes.ca | Horizontal marquee ticker, per-section background colors, full-bleed color bands |
| `[RD]` | THE RED / Inquire | Monochrome section, repeating text as background pattern, large ↗ CTA |
| `[FT]` | Figma Trends 2026 | Bold typography, neumorphism, scroll animations, dark mode, gamification |
| `[FF]` | Figma Font Library | Futuristic font reference list |

---

## 3. Section 01 — Themes & Color Tokens

### 3.1 Purpose
Live preview of all design tokens. Changes here cascade to the entire UI Lab preview.

### 3.2 Controls

**Theme Mode** `[FT]`
- Toggle: `Light` / `Dark`
- Shortcut: `T` key
- All CSS variables under `[data-theme="light"]` and `[data-theme="dark"]`

**Accent Color** — choose one:
- `Green #059669` — current default, positive/financial
- `Blue #2626FF` — NVRMND electric blue, bold/editorial `[NV]`
- `Amber #d97706` — warm, cautious
- `Red #dc2626` — alert, avoid

**Grid Lines** `[NV]`
- Toggle: on / off
- Intensity slider: `0%` (invisible) → `100%` (strong, `rgba(0,0,0,0.12)`)
- Line count: 4 vertical lines at 25% / 50% / 75% of viewport width

### 3.3 Token Display

All tokens displayed as labeled swatches with hex value + CSS variable name. Click to copy.

**Surface tokens:**
```
--bg      #ffffff   Base background
--bg2     #f9fafb   Slightly off-white (cards, inputs)
--bg3     #f3f4f6   Light gray (hover states)
--bg4     #e9eaec   Medium gray (disabled, borders)
--bg5     #d1d5db   Dark gray (strong borders)
```

**Semantic color tokens:**
```
--green        #059669   Positive, score ≥ 3.5, uptrend
--green-dim    rgba(5,150,105,.07)
--red          #dc2626   Negative, score < 2.5, downtrend
--red-dim      rgba(220,38,38,.07)
--amber        #d97706   Neutral, score 2.5–3.5, flat
--amber-dim    rgba(217,119,6,.07)
```

**Typography tokens:**
```
--text    #111827   Primary text
--text2   #374151   Secondary text
--text3   #6b7280   Muted/label text
```

**Accent tokens (per chosen accent color):**
```
--accent         Current accent color
--accent-dim     rgba(accent, 0.07)
--accent-light   10% lighter variant
```

### 3.4 Dark Mode Token Mapping `[FT]`

When `[data-theme="dark"]` is active:

```
--bg      #0D0D10   Near-black
--bg2     #141418
--bg3     #1c1c22
--bg4     #26262e
--bg5     #32323c
--text    #f0f0f0
--text2   #b0b0b8
--text3   #70707a
--border  rgba(255,255,255,.08)
--border2 rgba(255,255,255,.14)
```

Semantic colors (green/red/amber) stay the same — only slightly brighter in dark mode.

---

## 4. Section 02 — Typography Playground

### 4.1 Purpose
Test all type sizes, weights, and fonts live with real vistaclara content (ticker symbols, company names, scores).

### 4.2 Font Stack Options `[FF]`

**Option A — Current Stack (default)**
- Display: `Inter 900`
- Body: `Inter 400/500`
- Mono: `JetBrains Mono 400/500`

**Option B — Editorial Stack** `[LC]`
- Display: `Playfair Display 700` (serif, like Locomotive)
- Body: `Inter 400`
- Mono: `Space Mono 400`
- Notes: High elegance, editorial, not techy

**Option C — Bold Tech Stack** `[NV]` `[KN]`
- Display: `Russo One 400` (already bold, no weight needed)
- Body: `Inter 400`
- Mono: `Space Mono 400`
- Notes: Sci-fi edge, very strong on large sizes

**Option D — Variable Stack** `[FT]`
- Display: `Unbounded` (variable font, weight 100–900)
- Body: `Inter 400`
- Mono: `JetBrains Mono`
- Notes: Most flexible, responds to interaction

**Controls:**
- Font selector dropdown (A/B/C/D)
- Weight slider: `100 → 900` (variable fonts only)
- Letter spacing: `-0.05em → +0.1em`
- Line height: `0.8 → 1.6`

### 4.3 Type Scale Preview

Each level shown with example vistaclara content:

```
Display     clamp(4rem, 8vw, 12rem)   "AAPL"
H1          clamp(2rem, 4vw, 5rem)    "Apple Inc."
H2          1.5rem / 600              "Company Rating"
H3          1.125rem / 600            "Financial Ratios"
Body        1rem / 400                "Current Ratio measures..."
Body Small  0.875rem / 400            "Score 1–5 · 5 = best"
Label       0.7rem / 500 uppercase    "MARKET CAP"
Mono        JetBrains Mono 0.875rem   "189.30 USD"
Mono Small  JetBrains Mono 0.7rem     "TTM · LIVE"
```

### 4.4 Bleed Typography Demo `[GL]`

- Large company name/ticker overlaying a chart placeholder
- `position: absolute, bottom: 0, font-size: 15vw, opacity: 0.08–0.15`
- Opacity slider: `0.05 → 0.3`
- Can toggle: show/hide, adjust size, choose color (accent or black)

### 4.5 Section Badge System `[NV]`

Small rectangular labels that appear top-left of each section:

```
SCORECARD     — blue fill, white text
MARKET DATA   — green fill, white text
RATIOS        — black fill, white text
QUALITATIVE   — amber fill, white text
DCF           — outline only, no fill
```

- No border-radius (0px) or max 2px
- Font: uppercase, 0.65rem, letter-spacing: 0.1em, monospace
- Padding: 3px 8px

---

## 5. Section 03 — Component Gallery

### 5.1 Buttons

**All variants displayed side-by-side with code:**

```
Primary       background: var(--text),    color: white,  no border-radius
Ghost         background: transparent,    border: 1px,   color: --text3
Outline       background: transparent,    border: 1px solid --accent
Filled Accent background: var(--accent),  color: white
Icon Only     32×32px, centered icon
Pill          border-radius: 99px (only for status indicators)
```

**NVRMND-style CTA pair** `[NV]`:
- `[ ANALYSE ]` (filled) + `[ ↗ ]` (icon-only, same border)
- Same height, side by side, no gap between (touching borders merge)

**Hover states:** All buttons show transform on hover — `translateY(-1px)`, no glow, no shadow change.

### 5.2 Tags & Badges

```
tag-live     green-dim bg, green text,  "● LIVE"
tag-auto     green-dim bg, green text,  "⚡ auto"
tag-manual   amber-dim bg, amber text,  "✎ manual"
tag-section  accent bg,   white text    uppercase label
tag-new      black bg,    white text,   "new"   [SF]
```

### 5.3 Verdict Pills

```
STRONG BUY   green-dim bg,  green text,  bold uppercase
BUY          bg4 bg,        text2,       bold uppercase
HOLD         amber-dim bg,  amber text,  bold uppercase
AVOID        red-dim bg,    red text,    bold uppercase
```

### 5.4 Cards — 4 Variants

**Standard Card**
- border: 1px solid --border
- border-radius: 8px
- padding: 1.25rem 1.5rem
- box-shadow: 0 1px 3px rgba(0,0,0,.04)

**Neumorphic Card** `[FT]`
- No border
- box-shadow: `4px 4px 10px rgba(0,0,0,.08), -2px -2px 6px rgba(255,255,255,.85)`
- border-radius: 12px
- Looks raised from the background

**Bento Tile** `[SF]` `[IM]`
- No border-radius or 4px max
- Each tile has its own background color (from token set)
- Available tile colors: `--bg2`, `--green-dim`, `--amber-dim`, `--red-dim`, `--accent-dim`
- Dense: no shadow, no gap between tiles (1px border only)

**Annotation Box** `[RL]`
- position: absolute (demo shows floating over a chart)
- background: #111 (dark) or white with 1px border
- padding: 4px 8px
- font-size: 0.7rem, monospace
- No border-radius or 2px max
- Thin 1px line connecting to annotation point

### 5.5 Score Components

**Gauge**
- SVG circle, r=40, viewBox 0 0 110 110
- Track: `rgba(0,0,0,.06)`, stroke-width: 11
- Fill: animated stroke-dashoffset on mount
- Color: green ≥3.5 / amber ≥2.5 / red <2.5
- Center: score number + "/5.0"
- Demo: slider 0.0 → 5.0, gauge animates in real-time

**Score Row (Scorecard)**
- Label left, weight % center-right, bar + number far right
- Bar: 120px wide, 4px height, colored fill
- No border-left (removed — was distracting)

**Ratio Bar (T/S system)**
- Two bars stacked
- Each bar: full-width flex container
- T circle (outline, top): positioned at score% from left, above bar
- S circle (outline, bottom): positioned at score% from left, below bar
- Bar segments: green fill → colored marker (~8% width) → gray remainder
- Score display: `T 4.0 · S 3.0` right-aligned below bars

### 5.6 Navigation Components

**Top Bar** `[NV]`
- Height: 52px
- Zone 1 (left): Logo in bordered box `[NV]` or plain text `[LC]`
- Zone 2 (center): Empty or centered nav links `[LC]`
- Zone 3 (right): Status indicator + action button
- No background — sits on page background

**Status Indicator** `[NV]`
- `■ WORKER CONNECTED` — small filled square (not circle), accent color
- `■ NO WORKER` — amber
- Font: monospace, 0.65rem, uppercase, letter-spacing: 0.08em

**Menu Button** `[NV]`
- `[ + MENU ]` closed / `[ × MENU ]` open
- Filled accent background, white text
- No border-radius
- Transforms to X when open

**Sidebar (current)**
- Width: 216px
- All current nav items
- Used as alternative in Layout Experiments

### 5.7 Search Bar

- Background: --bg2
- Border: 1px solid --border
- On focus: border color → --border2
- Input font-size: 1rem
- Placeholder: `Ticker, Name, ISIN, WKN`
- Right side: `[ Analyse ]` primary button

**Dropdown** (history):
- Each item: ticker bold mono + name normal + `✕` right
- `onmousedown` to prevent blur-before-click bug
- Max 10 history items

### 5.8 Metric Tile

Three display sizes:
- **Standard**: label 0.6rem uppercase mono, value 1rem bold mono, sub 0.58rem
- **Large**: label 0.65rem, value 1.5rem, sub 0.65rem — for Market Cap, Revenue
- **Bento XL**: label small, value 2rem+, takes 2 column widths `[IM]`

### 5.9 Price Display

```
[ 189.30 ]  [ USD ]
[ ▲ 2.20 +1.18% ]
```

- Big number: 2rem, `font-weight:500`, monospace
- Currency: 1rem, muted, same baseline
- Change: colored (green/red), monospace, 0.7rem
- Direction: ▲/▼ (not arrow emoji, actual triangle character)

---

## 6. Section 04 — Layout Experiments

### 6.1 Purpose
Toggle between different structural arrangements of the analysis page content. All use the same data, just different visual organization.

### 6.2 Content Order Options

**Order A — Current (optimized)**
```
Hero → Scorecard → Market Context → Price Chart →
Period Overview → Financial Ratios → Qualitative →
DCF → [Margins + Financials side-by-side]
```

**Order B — Scorecard First**
```
Hero → Scorecard (full width, large gauge) →
Key Metrics Strip → Price Chart →
Market Context → Financial Ratios → Qualitative → DCF
```

**Order C — Chart First** `[RL]`
```
Hero → Price Chart (full height, annotated) →
Scorecard + Market Context (side by side) →
Financial Ratios → Qualitative → DCF
```

### 6.3 Key Metrics Grid Variants

**Variant A — Equal tiles (current)**
- `repeat(auto-fit, minmax(110px, 1fr))`
- All tiles same size
- 8 metrics in one row

**Variant B — Bento** `[SF]` `[IM]`
- Market Cap: 2×2 tile (large)
- Revenue + EBITDA: 1×2 each (tall)
- FCF + Forward P/E: 1×1 each (small)
- 52W Range: 2×1 (wide)
- Different tile background colors per metric

**Variant C — List** `[LC]`
- Each metric on its own row with divider line
- Label left, value right
- Very clean, editorial

### 6.4 Margin Profile + Key Financials

**Desktop (>800px):**
- Side by side: `grid-template-columns: 1fr 1fr`
- Both cards same height

**Mobile (<800px):**
- Stacked: `grid-template-columns: 1fr`

**Toggle in UI Lab:** Force mobile layout on desktop for preview.

### 6.5 Ratio Table Variants

**Variant A — Current (T/S bars, full width)**
- Table with 4 columns: Ratio / Value / Target / Score bars

**Variant B — Compact List** `[LC]`
- No table, just rows with dividers
- Ratio name + value right-aligned + colored dot indicator
- No score bars — just color coding

**Variant C — Card Grid**
- Each ratio as its own small card
- Color-coded border-left (green/amber/red)
- Score number prominent

---

## 7. Section 05 — Navigation Variants

### 7.1 Variant A — NVRMND Top Bar + Menu Overlay `[NV]`

**Top Bar (always visible):**
```
[vistaclara]              [■ WORKER CONNECTED]  [+ MENU]
```
- Logo: text in bordered rectangle, left
- Center: empty (or optional live market ticker)
- Right: status indicator + menu button

**Menu Overlay (fullscreen on click):**
- Background: `var(--accent)` (Electric Blue `#2626FF` or chosen accent)
- 4 vertical grid lines remain visible (dimmed in accent color)
- Left section (60% width): numbered nav items
  ```
  01  ANALYSIS
  02  COMPARE
  03  RISK ENGINE
  04  PORTFOLIO
  05  WATCHLIST
  06  SETTINGS
  07  UI LAB ⚗
  ```
  - Active item: white + bordered rectangle (like logo box)
  - Inactive items: 40% opacity, smaller font
  - Font: `clamp(2.5rem, 5vw, 5rem)`, bold, uppercase
  - Spacing between items: generous, each item its own row
- Right section (40% width):
  ```
  WORKER URL
  [ https://... ]
  
  STATUS
  ■ CONNECTED
  
  QUICK LINKS
  Clear Cache  |  Export Data
  ```
- Bottom strip: `© vistaclara  |  EQUITY ANALYSIS  |  YAHOO FINANCE`
- Close button: `× MENU` replaces `+ MENU` in top bar

### 7.2 Variant B — Locomotive 3-Zone `[LC]`

```
vistaclara®      Analysis · Compare · Risk · Portfolio      Let's analyse →
```
- Logo left with `®` superscript and small decorative `✦` symbol
- Nav links centered, `font-size: 0.875rem`, normal weight, separated by ` · `
- CTA right: `Let's analyse →` as text link, not button
- Ultra-thin `1px` border-bottom separating nav from content
- Second line (optional): `■ Worker connected` very small, left-aligned

### 7.3 Variant C — Current Left Sidebar

- Width: 216px, fixed
- All current nav items with badges
- Status dot bottom left
- Kept as fallback / mobile remains unchanged

### 7.4 Variant D — Minimal Top + Bottom Footer Nav `[KN]`

- Top: just the logo, centered, + `≡` hamburger left + `■ status` right
- Bottom (fixed): `ANALYSIS · COMPARE · RISK · PORTFOLIO · WATCHLIST · SETTINGS` centered, separated by ` · `
- Very clean, all content uses full width
- Footer nav fades in on scroll-up, hides on scroll-down

---

## 8. Section 06 — Hero Variants

> The "hero" = the first visible section before any company is loaded. After search + load, it becomes the Company Hero.

### 8.1 Variant A — NVRMND Editorial `[NV]`

**Empty state (no company loaded):**
```
[vertical grid lines across full page]

                                    [small text block]
                                    Real-time fundamental
                                    analysis. Score any
                                    company in seconds.

    ANALYSE ANY
    COMPANY IN
    SECONDS.

    [ ENTER TICKER ]   [ ↗ ]

RECENTLY ANALYSED: AAPL, AMD, BMW.DE    ↓ SCROLL DOWN    YAHOO FINANCE
```

- Headline: `clamp(4rem, 8vw, 10rem)`, `font-weight: 900`, uppercase, left-aligned from ~column-2
- Line 3 (SECONDS.) is lighter weight (400) — contrast within headline `[NV]`
- One word/phrase has blue outline box: `[ COMPANY ]` — 1px accent border
- Small body text upper-right of headline, max-width 200px
- Two buttons: `[ ENTER TICKER ]` filled + `[ ↗ ]` icon-only, touching
- Bottom strip: three zones, like NVRMND footer

**After company loaded:**
- Headline replaced by Company Name in same scale
- Ticker symbol in bordered box
- Price + change right

### 8.2 Variant B — Locomotive List `[LC]`

```
[thin top nav]
[1px divider]

Theory Verse
Scout [img] Motors
Populous
Mate Libre
Destigmatize
∆ All Analysis ∆

[1px divider]
Design and code are only tools for understanding value.
```

Adapted for vistaclara:
```
[1px divider]
Apple Inc.
Advanced [▲ +1.2%] Micro Devices
Bayerische Motoren Werke AG
Alphabet Inc.
SAP SE
→ Search any company
[1px divider]
```

- Font: **serif** (Playfair Display), `8vw`, centered, normal weight
- Tiny inline mini-chart spark or percentage badge within the text
- Each row has `1px` top border
- Hover: subtle color tint on the row

### 8.3 Variant C — Stripe Gradient `[ST]`

```
[clean top nav]

■ S&P 500: 5,847.82 ▲ +0.31%  |  DAX: 23,441.10 ▲ +0.18%

Fundamental analysis
for every equity.                    [gradient blob top-right]
Score, value, and compare
any publicly traded company.

[ Analyse now → ]   [ Sign in with Worker ]

[BMW] [AAPL] [SAP] [AMD] [NVDA] [ASML]   ← recently analysed logos/tickers
```

- Live market ticker strip at very top (monospace, 0.75rem, scrolling)
- Headline: large but **not oversized** — `2.5rem–4rem`, normal sentence case
- Second line of headline in gradient color (matching the blob)
- Gradient blob: `position: absolute, right: 0, top: 0, width: 50vw` — conic or multi-radial gradient, orange/pink/blue/purple
- Six recently-analysed ticker chips below CTA

### 8.4 Variant D — Glossier Bleed `[GL]`

```
[nav]

[AAPL in 15vw bold, bottom of hero, bleeding past right edge]

[below: small content block]
Apple Inc. · Technology
189.30 USD ▲ +1.18%
```

- After search: company name or ticker bleeds as massive background text
- `position: relative; overflow: hidden` on hero container
- Text: `position: absolute; bottom: -0.1em; left: 0; font-size: 15vw; font-weight: 900; opacity: 0.08; color: var(--text)`
- On top: normal price + name at regular size
- Toggle opacity: `0.04 → 0.20`

---

## 9. Section 07 — Background Experiments

### 9.1 Option A — Pure White (default)
- `background: #ffffff`
- No texture, no pattern
- Maximum contrast

### 9.2 Option B — White + Grid Lines `[NV]`
- Pure white + 4 vertical lines `[NV-GRID]`
- Lines: `1px solid rgba(0,0,0,0.06)` at 25%/50%/75% viewport width
- Extends full page height
- `pointer-events: none`, `position: fixed`, `z-index: 0`

### 9.3 Option C — White + Dot Grid `[KN]`
- CSS background pattern:
  ```css
  background-image: radial-gradient(circle, rgba(0,0,0,0.10) 1px, transparent 1px);
  background-size: 24px 24px;
  ```
- Very subtle — only visible on close inspection
- Some dots in accent color for visual interest (JS-rendered subset)

### 9.4 Option D — White + Stripe Gradient `[ST]`
- White page
- Top-right: decorative gradient blob
  ```css
  background: conic-gradient(from 45deg at 80% 0%, 
    rgba(5,150,105,0.12), 
    rgba(217,119,6,0.08), 
    rgba(79,70,229,0.10), 
    rgba(5,150,105,0.06));
  ```
- Blob is `position: fixed, top: 0, right: 0, width: 50vw, height: 60vh`
- Does not scroll with content

### 9.5 Option E — White + Radial Harmony `[HM]`
- Multiple soft radial gradient circles
  ```css
  background:
    radial-gradient(ellipse 600px 400px at 90% 10%, rgba(5,150,105,0.05) 0%, transparent 70%),
    radial-gradient(ellipse 800px 600px at 10% 80%, rgba(79,70,229,0.04) 0%, transparent 70%),
    radial-gradient(ellipse 400px 300px at 50% 50%, rgba(217,119,6,0.03) 0%, transparent 70%);
  ```
- Very subtle — adds warmth without being obvious
- `position: fixed` — doesn't scroll

### 9.6 Option F — White + Radiating Lines `[LP]`
- SVG background element: thin lines radiating from a single point (off-screen, like behind the logo)
- `stroke: rgba(0,0,0,0.03)`, many lines
- Creates a sense of energy/focus
- `position: fixed, pointer-events: none`

---

## 10. Section 08 — Animation Lab

### 10.1 Scroll Animations `[FT]`

**Pattern:** Elements animate in when they enter the viewport.

```js
// IntersectionObserver triggers:
.animate-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.animate-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Controls in UI Lab:**
- Enable/disable toggle
- Delay between staggered items: `0ms → 200ms`
- Easing: `ease / ease-out / cubic-bezier`
- Distance: `10px → 50px`

**Elements that animate:**
- Cards (stagger: each card 50ms later)
- Metric tiles (stagger: each tile 30ms later)
- Ratio table rows (stagger: each row 20ms later)
- Score bars (fill animation on enter)

### 10.2 Gauge Fill Animation

- On mount: stroke-dashoffset animates from `251.3` (empty) to target value
- Duration: `0.9s`
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (Material standard)
- Controls: duration slider, easing selector, trigger button to replay

### 10.3 Ratio Bar Fill Animation

- On enter viewport: bars animate from 0% to actual width
- Duration: `0.6s`
- Stagger: T bar first, S bar 150ms later
- Controls: duration, stagger delay, replay button

### 10.4 Marquee/Ticker `[FR]`

**Content:** `— EQUITY ANALYSIS — FUNDAMENTAL SCORING — DCF VALUATION — YAHOO FINANCE —`

**CSS:**
```css
.marquee {
  display: flex;
  overflow: hidden;
  white-space: nowrap;
}
.marquee-inner {
  display: flex;
  animation: marquee 20s linear infinite;
}
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

**Controls:**
- Speed: `5s → 60s` (duration)
- Direction: left / right
- Content: editable text
- Background color: --bg3 (default) or any bg token
- Text color: --text3 (default) or accent
- Pause on hover: on/off

### 10.5 Chart Crosshair

- Demo chart with mock data (sine wave, 260 points)
- Crosshair: vertical line + tooltip showing price + date
- Tooltip format: `"02. Jun 25  189.30 USD"`
- Controls: tooltip style (light/dark), date format, show/hide date, show/hide time

### 10.6 Score Gauge — Live Demo

- Large gauge (200px)
- Slider below: 0.0 → 5.0
- Gauge animates smoothly as slider moves
- Color transitions: green → amber → red
- Verdict pill updates: Strong Buy / Buy / Hold / Avoid
- Score rows update simultaneously

### 10.7 Page Transitions

- Current: `fadein` (opacity 0→1 + translateY 4px→0, 180ms)
- Option B: slide from right (`translateX(20px)→0`)
- Option C: no animation (instant)
- Controls: select variant, adjust duration

---

## 11. Section 09 — Dark Mode

### 11.1 Toggle Behavior

- Toggle button: top-right of UI Lab, or `T` key shortcut
- Sets `document.documentElement.setAttribute('data-theme', 'dark')`
- Saves to `localStorage('vc_theme')`
- Applied immediately on page load (no flash)

### 11.2 Split Preview

- Left half: light mode
- Right half: dark mode
- Both update simultaneously when any token changes
- Useful for checking contrast and color consistency

### 11.3 Dark Mode Token Values

Full mapping in Section 3.4. Key differences:

- All backgrounds invert to near-black
- Borders become white-alpha instead of black-alpha
- Semantic colors (green/red/amber) stay the same hue, slightly brighter
- Shadows become `rgba(0,0,0,0.4)` (stronger, more visible on dark)
- Gauge track: `rgba(255,255,255,.08)` instead of `rgba(0,0,0,.06)`

### 11.4 Dark Mode Checklist

Before any dark mode token change, verify:
- [ ] Text contrast ≥ 4.5:1 on all backgrounds
- [ ] Green/red/amber visible on dark bg (not too dim)
- [ ] Borders visible but not harsh
- [ ] Score bars readable (track visible, fill not washed out)
- [ ] Gauge arc visible on dark track
- [ ] Chart line visible (green/red still works)
- [ ] Crosshair tooltip readable
- [ ] Buttons have enough contrast (primary button stays accent-colored)

---

## 12. Section 10 — Grid & Spacing System

### 12.1 Spacing Scale

All spacing uses a base-8 scale:

```
--space-1    4px     Tight (between label and value)
--space-2    8px     Small (badge padding, icon gap)
--space-3    12px    Medium-small (within card sections)
--space-4    16px    Medium (card padding vertical)
--space-5    24px    Medium-large (between cards)
--space-6    32px    Large (section padding)
--space-7    48px    XL (between major sections)
--space-8    64px    XXL (hero vertical padding)
```

### 12.2 Column Grid `[NV]`

4 vertical guide lines creating 5 columns:

```
|   col 1   |   col 2   |   col 3   |   col 4   |   col 5   |
0%         20%         40%         60%         80%         100%
```

Note: NVRMND uses lines at ~25/50/75%, creating 4 equal columns. vistaclara adapts to 5 columns to account for the sidebar width.

With sidebar (216px):
```
[sidebar 216px] | main content area
                |  col 1  |  col 2  |  col 3  |  col 4  |
```

**CSS Implementation:**
```css
.grid-lines::before {
  content: '';
  position: fixed;
  top: 0; left: 216px; /* after sidebar */
  width: calc(100% - 216px);
  height: 100%;
  background-image: repeating-linear-gradient(
    to right,
    rgba(0,0,0,0.05) 0px,
    rgba(0,0,0,0.05) 1px,
    transparent 1px,
    transparent 25%
  );
  pointer-events: none;
  z-index: 0;
}
```

### 12.3 Border Radius Scale

```
--radius-none   0px     Buttons (NVRMND style), badges
--radius-sm     4px     Small inputs, tags
--radius-md     8px     Cards, dropdowns (current default)
--radius-lg     12px    Large cards, modals
--radius-full   9999px  Pill badges only
```

Toggle in UI Lab: apply `--radius-none` globally to see NVRMND-style sharp corners everywhere.

### 12.4 Shadow Scale

**Current (soft):**
```css
box-shadow: 0 1px 3px rgba(0,0,0,.04);
```

**Neumorphic** `[FT]`:
```css
box-shadow: 4px 4px 10px rgba(0,0,0,.08), -2px -2px 6px rgba(255,255,255,.85);
```

**Editorial (none)**:
```css
box-shadow: none;
border: 1px solid var(--border);
```

**Controls:** Select shadow style, applied to all cards simultaneously.

---

## 13. Implementation Notes

### 13.1 File Location

```
src/pages/ui-lab.html       Main UI Lab page
src/css/ui-lab.css          UI Lab specific styles (does not affect main app)
src/js/ui-lab.js            UI Lab controls, token overrides, variant switching
```

### 13.2 Token Override System

UI Lab writes CSS custom property overrides to `:root` in real time:

```js
function setToken(name, value) {
  document.documentElement.style.setProperty(name, value);
  localStorage.setItem('vc_lab_' + name, value);
}
```

On main app load, persisted tokens from UI Lab are NOT applied — UI Lab is isolated.

### 13.3 Navigation to UI Lab

- Sidebar: last item `⚗ UI Lab`
- Or top-bar (if top-bar nav is active): hidden in menu overlay, item 07
- URL: `/#ui-lab` or `src/pages/ui-lab.html`

### 13.4 Data in UI Lab

All UI Lab demos use hardcoded mock data:

```js
const MOCK_COMPANY = {
  ticker: 'AAPL',
  name: 'Apple Inc.',
  sector: 'Technology',
  price: 189.30,
  change: 2.20,
  changePct: 1.18,
  currency: 'USD',
  score: 4.19,
  ratioScore: 4.4,
  mgmtScore: 3.5,
  moatScore: 2.5,
  esgScore: 4.0,
  verdict: 'BUY',
  isin: 'US0378331005',
  wkn: '865985',
  marketCap: 2.94e12,
  revenue: 385.6e9,
  grossMargin: 0.453,
  operatingMargin: 0.298,
  netMargin: 0.262,
};
```

### 13.5 Export

Each section of the UI Lab has an "Apply to App" button that writes the chosen variant/token to `CLAUDE.md` as a note — so future Claude sessions know which variant was selected.

---

*Last updated: 2026-06-02*  
*Maintained by: vistaclara project*
