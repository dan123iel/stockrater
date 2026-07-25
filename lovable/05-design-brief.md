# pondex_ — Design Brief
**Style direction: Revolut / Trade Republic — clean, minimal, data-first**

Paste this file content into Lovable together with 01-master-prompt.md.

---

## Design Philosophy

**One word: clarity.**

pondex_ shows financial data. Every design decision must make the data easier to read, not harder. No decoration for decoration's sake. No gradients to look modern. No illustrations to look friendly. The product is trustworthy because it looks precise — not because it looks fun.

**References (in priority order):**
1. **Trade Republic web app** — clean white, large numbers, minimal color, bottom nav on mobile
2. **Revolut web app** — white dashboard, subtle card borders, green/red only for numbers
3. **Linear.app landing page** — dark hero section with large tight typography, then clean white below

---

## Color Palette

```css
/* Backgrounds */
--bg-primary:    #FFFFFF;   /* main background */
--bg-secondary:  #FAFAFA;   /* sidebar, secondary panels */
--bg-subtle:     #F3F4F6;   /* input backgrounds, tags */
--bg-dark:       #0A0A0A;   /* hero section, dark CTAs */

/* Borders */
--border:        #E5E7EB;   /* default card/input borders */
--border-strong: #D1D5DB;   /* table headers, strong dividers */

/* Text */
--text-primary:  #0A0A0A;   /* headlines, important values */
--text-secondary:#6B7280;   /* labels, secondary info */
--text-muted:    #9CA3AF;   /* timestamps, footnotes */
--text-inverse:  #FFFFFF;   /* text on dark backgrounds */

/* Functional (finance) — do not use for decoration */
--color-up:      #16A34A;   /* gains, BUY signal, positive change */
--color-down:    #DC2626;   /* losses, SELL signal, negative change */
--color-hold:    #D97706;   /* HOLD signal, neutral/warning */

/* Verdict Badges */
--badge-buy-bg:  #DCFCE7;   /* light green background */
--badge-buy-text:#15803D;   /* dark green text */
--badge-hold-bg: #FEF9C3;   /* light amber background */
--badge-hold-text:#92400E;  /* dark amber text */
--badge-sell-bg: #FEE2E2;   /* light red background */
--badge-sell-text:#B91C1C;  /* dark red text */
```

**What NOT to use:**
- No blue (#3B82F6 etc.) — this is not a SaaS tool
- No purple / violet
- No gradients (linear or radial) on any element
- No colored section backgrounds (all sections white/near-white, except hero)
- Green/red ONLY for financial up/down data, never for decoration

---

## Typography

**Font family: Inter** (Google Fonts)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
```

**Scale:**
```css
/* Landing page headlines */
h1: clamp(48px, 6vw, 88px), weight 700, letter-spacing -0.04em, line-height 1.0
h2: clamp(32px, 4vw, 56px), weight 600, letter-spacing -0.03em, line-height 1.1
h3: clamp(20px, 2.5vw, 32px), weight 600, letter-spacing -0.02em, line-height 1.2

/* App UI */
section-label: 11px, weight 500, letter-spacing 0.08em, UPPERCASE, color: var(--text-secondary)
value-large:   48px, weight 600, letter-spacing -0.02em  /* scores, big numbers */
value-medium:  24px, weight 600, letter-spacing -0.01em
body:          15px, weight 400, line-height 1.6
caption:       12px, weight 400, color: var(--text-muted)

/* Financial numbers — always monospaced */
prices, percentages, scores:
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
```

---

## Component Styles

### Buttons

```css
/* Primary — black pill */
.btn-primary {
  background: #0A0A0A;
  color: #FFFFFF;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  border: none;
}
.btn-primary:hover { background: #1F1F1F; }

/* Secondary — outlined */
.btn-secondary {
  background: transparent;
  color: #0A0A0A;
  border: 1.5px solid #E5E7EB;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
}

/* Ghost / text link */
.btn-ghost {
  background: none;
  border: none;
  color: #0A0A0A;
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
}
```

### Cards

```css
.card {
  background: #FFFFFF;
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  padding: 24px;
  /* NO box-shadow on default cards */
}

/* Slightly elevated (modals, dropdowns only) */
.card-elevated {
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04);
}
```

### Inputs / Search

```css
.input {
  background: #F3F4F6;
  border: 1.5px solid transparent;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 15px;
  color: #0A0A0A;
  outline: none;
}
.input:focus {
  border-color: #0A0A0A;
  background: #FFFFFF;
}
```

### Score Gauge

- SVG semicircle (180° arc)
- Track color: #E5E7EB
- Fill color: var(--color-up) / var(--color-hold) / var(--color-down) based on score
- Score ≥ 70 → green, 45–69 → amber, < 45 → red
- Needle: line from center to arc position
- Score number below: 56px, weight 700, tabular-nums

### Verdict Badge

```
BUY:  bg #DCFCE7, text #15803D, rounded-full, 10px 16px padding
HOLD: bg #FEF9C3, text #92400E
SELL: bg #FEE2E2, text #B91C1C
```

### Factor Bars

- Container: height 3px, background #E5E7EB, border-radius 50px
- Fill: same color as verdict (green/amber/red) based on factor score
- Animate from 0% to final width on mount

### Tables (Markets, Portfolio, Financials)

```css
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6B7280;
  padding: 10px 16px;
  border-bottom: 1px solid #E5E7EB;
  text-align: left;
}
td {
  padding: 14px 16px;
  font-size: 14px;
  color: #0A0A0A;
  border-bottom: 1px solid #F3F4F6;  /* very subtle row divider */
}
tr:hover td { background: #F9FAFB; }
```

---

## Navigation

### Desktop — Top Bar (fixed, height 64px)

```
[pondex_ logo]   [Home  Portfolio  Markets  Robo Advisor  CFD]   [Search input]  [Log out]  [Profile →]

background: rgba(255,255,255,0.95)
backdrop-filter: blur(12px)
border-bottom: 1px solid #E5E7EB
```

- Active nav item: font-weight 600, color #0A0A0A, small dot or bottom border
- Inactive: color #6B7280
- Logo: "pondex_" in Inter 600, #0A0A0A

### Mobile — Bottom Tab Bar (fixed, height 60px)

```
[🏠 Home]  [📊 Markets]  [🔍 Search]  [💼 Portfolio]  [👤 Account]

background: #FFFFFF
border-top: 1px solid #E5E7EB
```

- Active: icon + label both #0A0A0A, 2px top border on active item
- Inactive: #9CA3AF

---

## Landing Page Layout

### Hero (dark section — inspired by Linear.app)

```
background: #0A0A0A
padding: 120px 0 80px

content:
  - Small pill label: "Free · Every source cited"
    → bg: #1F1F1F, text: #9CA3AF, border: 1px solid #2D2D2D
  - H1: "Stop guessing. / Get one verdict."
    → white, 88px, weight 700, letter-spacing -0.04em
  - Subtext: "A 0–100 score for any stock..."
    → #9CA3AF, 18px, max-width 520px
  - CTAs: [Start free →] (white bg, black text) + [See demo] (ghost, white text)
  - Hero visual: Score card mockup with subtle glow effect
    → card: #1A1A1A background, border: 1px solid #2D2D2D
```

### Below hero (white sections)

All sections: `background: #FFFFFF`, `padding: 96px 0`
Max container width: 1280px, padding: 0 32px

Section labels: `[ LABEL ]` in Inter 500, 11px, uppercase, #6B7280

---

## What NOT to Do

| Avoid | Why |
|---|---|
| Colored section backgrounds (blue, purple, green) | Looks like generic SaaS, not fintech |
| Card shadows everywhere | Looks dated, use borders instead |
| Gradients on buttons or backgrounds | Cheap, not Revolut-level |
| Serif fonts | Editorial, not data-dashboard |
| Rounded corners > 16px | Too playful for financial tool |
| Green/red for anything non-financial | Confuses financial signal meaning |
| Illustrations or icons as decoration | Use real app screenshots instead |
| "AI-powered" messaging | Generic, not our brand |
| Animations that delay data display | Users want data fast |
| Dark mode as default | Revolut/Trade Republic are light-first |

---

## Responsive Breakpoints

```
Mobile:  < 640px  — single column, bottom nav
Tablet:  640-1024px — simplified nav, 2-column grids
Desktop: > 1024px — full layout, sidebar or top nav
```

---

## Quick Reference — shadcn/ui component mapping

If using shadcn/ui in Lovable:
- `Button` → variant="default" (black) or variant="outline"
- `Card` → no shadow, 1px border
- `Badge` → custom colors per verdict
- `Table` → minimal striping
- `Input` → gray background, no border, focus border black
- `Tabs` → underline style, not pill style

---

## Checklist before submitting to Lovable

- [ ] Hero section: dark (#0A0A0A), large headline, score card mockup
- [ ] All other landing sections: white background
- [ ] App dashboard: white, subtle borders, no color accents except financial data
- [ ] Score gauge: SVG, animated, green/amber/red based on score
- [ ] Verdict badges: pill shape, correct colors per BUY/HOLD/SELL
- [ ] Mobile: bottom tab bar with 5 items
- [ ] Desktop: top fixed nav
- [ ] Tables: clean, minimal, hover on row
- [ ] Font: Inter everywhere
- [ ] No gradients, no illustrations, no shadows on cards
