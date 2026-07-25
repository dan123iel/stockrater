# pondex_ — Design Brief
**Style direction: Revolut / Trade Republic — clean, minimal, data-first**
_Reviewed by 4 specialists (UI/Fintech, Lovable Expert, Trade Republic/Revolut Analyst, Mobile UX) — 2026-07-25_

Paste this file content into Lovable together with 01-master-prompt.md.

---

## IMPORTANT: Tech Stack Clarification

**Use Tailwind CSS v3 with shadcn/ui.** This overrides any "no Tailwind" instruction elsewhere.

All component default colors MUST be overridden via CSS variables in `globals.css`. Do NOT use Tailwind color utility classes (text-blue-500, bg-gray-100 etc.) directly in components — use ONLY the custom CSS variable tokens defined in this brief.

**Hero headline:** Use the rotating headline variant from `02-ux-structure.md` ("Still not sure where to invest..."). Ignore the static headline in this brief.

**Breakpoint:** One canonical mobile breakpoint = `768px`. This overrides any other value in any other document.

---

## Design Philosophy

**One word: clarity.**

pondex_ shows financial data. Every design decision must make the data easier to read, not harder. No decoration for decoration's sake. No gradients to look modern. No illustrations to look friendly. The product is trustworthy because it looks precise — not because it looks fun.

**References (in priority order):**
1. **Trade Republic web app** — clean white, large numbers, minimal color, bottom nav on mobile
2. **Revolut web app** — white dashboard, subtle card borders, green/red only for numbers
3. **Linear.app landing page** — dark hero section with large tight typography, then clean white below

---

## Notation Convention

Section labels written as `[ LABEL ]` throughout this brief are rendered in the final UI as plain uppercase text with `letter-spacing: 0.1em`. No bracket characters appear in the delivered UI. Example: `[ HOW IT WORKS ]` renders as `HOW IT WORKS`.

---

## Color Palette

```css
/* globals.css — paste into Tailwind config and CSS root */
:root {
  /* Backgrounds */
  --bg-primary:    #FFFFFF;
  --bg-secondary:  #FAFAFA;
  --bg-subtle:     #F3F4F6;
  --bg-dark:       #0A0A0A;

  /* Borders */
  --border:        #E5E7EB;
  --border-strong: #D1D5DB;

  /* Text */
  --text-primary:  #0A0A0A;
  --text-secondary:#6B7280;
  --text-muted:    #9CA3AF;
  --text-inverse:  #FFFFFF;

  /* Functional finance — do NOT use for decoration */
  --color-up:      #16A34A;
  --color-down:    #DC2626;
  --color-hold:    #D97706;

  /* Verdict badges */
  --badge-buy-bg:   #DCFCE7;
  --badge-buy-text: #15803D;
  --badge-hold-bg:  #FEF9C3;
  --badge-hold-text:#92400E;
  --badge-sell-bg:  #FEE2E2;
  --badge-sell-text:#B91C1C;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
}
```

**Value color rules:**
- Positive (> 0): `var(--color-up)` #16A34A
- Negative (< 0): `var(--color-down)` #DC2626
- Zero / unchanged (0.00%): `#6B7280` — **never green, never red**

**What NOT to use:**
- No blue (#3B82F6 etc.)
- No purple / violet (including earnings calendar — use amber instead)
- No gradients on any element
- No colored section backgrounds (all sections white, except hero which is #0A0A0A)
- Green/red ONLY for financial up/down data

---

## Typography

**Font family: Inter** (Google Fonts)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
```

**Scale:**

| Use | Size | Weight | Tracking | Line-height |
|---|---|---|---|---|
| Landing H1 | clamp(48px, 6vw, 88px) | 700 | -0.04em | 1.0 |
| Landing H2 | clamp(32px, 4vw, 56px) | 600 | -0.03em | 1.1 |
| Landing H3 | clamp(20px, 2.5vw, 32px) | 600 | -0.02em | 1.2 |
| App section label | 11px | 500 | 0.08em UPPERCASE | — |
| Score / big value | 48px | 700 | -0.02em | 1.0 |
| Value medium | 24px | 600 | -0.01em | — |
| Body | 15px | 400 | 0 | 1.6 |
| Caption / footnote | 12px | 400 | 0 | — |
| Table header | 11px | 500 | 0.06em UPPERCASE | — |

**Financial numbers — always tabular:**
```css
.financial-value {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
}
/* Apply to: all prices, percentages, scores, table cells with numbers */
```

---

## Spacing System

Base grid: 4px. All spacing must be a multiple of 4px.

- App page horizontal padding: 24px mobile / 32px desktop
- Card gap in grid layouts: 16px
- Section gap between card groups: 32px
- Home Dashboard right sidebar: 360px wide
- Stock Analysis / Portfolio content column max-width: 900px
- Landing section padding: 96px 0 desktop / 64px 0 mobile

---

## Component Styles

### Buttons

```css
/* Primary — rounded rectangle (8px, NOT a pill) */
.btn-primary {
  background: #0A0A0A; color: #FFFFFF;
  border-radius: 8px; padding: 12px 24px;
  font-size: 14px; font-weight: 600; border: none; cursor: pointer;
}
.btn-primary:hover { background: #1F1F1F; }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; pointer-events: none; }

/* Primary on dark background (hero section) */
.btn-primary-dark {
  background: #FFFFFF; color: #0A0A0A;
  border-radius: 8px; padding: 12px 24px;
  font-size: 14px; font-weight: 600; border: none; cursor: pointer;
}
.btn-primary-dark:hover { background: #F3F4F6; }

/* Secondary — outlined */
.btn-secondary {
  background: transparent; color: #0A0A0A;
  border: 1.5px solid #E5E7EB; border-radius: 8px;
  padding: 12px 24px; font-size: 14px; font-weight: 500; cursor: pointer;
}
.btn-secondary:hover { border-color: #0A0A0A; background: #F9FAFB; }

/* Ghost on light background */
.btn-ghost {
  background: none; border: none; color: #0A0A0A;
  font-size: 14px; font-weight: 500;
  text-decoration: underline; text-underline-offset: 3px; cursor: pointer;
}
.btn-ghost:hover { color: #6B7280; }

/* Ghost on dark background (hero "See demo" button) */
.btn-ghost-dark {
  background: transparent; color: #FFFFFF;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 8px; padding: 12px 24px;
  font-size: 14px; font-weight: 500; cursor: pointer;
}
.btn-ghost-dark:hover { background: rgba(255,255,255,0.05); }

/* Loading state */
.btn-loading { opacity: 0.4; cursor: not-allowed; }
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
/* Elevated: modals and dropdowns only */
.card-elevated {
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04);
}
```

### Inputs

```css
.input {
  background: #F3F4F6; border: 1.5px solid transparent;
  border-radius: 8px; padding: 10px 16px;
  font-size: 15px; color: #0A0A0A; outline: none; width: 100%;
}
.input:focus { border-color: #0A0A0A; background: #FFFFFF; }
.input-error { border-color: #DC2626; }
.input-error-message { font-size: 12px; color: #DC2626; margin-top: 4px; display: block; }
```

### Tabs

```css
.tab-container {
  border-bottom: 1px solid #E5E7EB;
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
}
.tab-item {
  height: 44px; padding: 0 16px;
  font-size: 14px; font-weight: 400; color: #6B7280;
  border-bottom: 2px solid transparent;
  cursor: pointer; white-space: nowrap; flex-shrink: 0;
}
.tab-item.active {
  color: #0A0A0A; font-weight: 600;
  border-bottom: 2px solid #0A0A0A;
}
.tab-item:hover:not(.active) { color: #374151; }
```

### Tables

```css
table { width: 100%; border-collapse: collapse; }
th {
  font-size: 11px; font-weight: 500; text-transform: uppercase;
  letter-spacing: 0.06em; color: #6B7280;
  padding: 10px 16px; border-bottom: 1px solid #E5E7EB; text-align: left;
}
td {
  padding: 14px 16px; font-size: 14px; color: #0A0A0A;
  border-bottom: 1px solid #F3F4F6;
}
tr:hover td { background: #F9FAFB; }
```

### Score Gauge

- SVG semicircle, 180° arc
- Track: #E5E7EB, Fill: green/amber/red based on score (≥70/45–69/<45)
- Needle: line from center to arc position
- Score number below: 48px, weight 700, tabular-nums
- Animate needle + arc fill on mount: `transition: 1.2s ease-out`

### Verdict Badges

```css
.badge-buy  { background: #DCFCE7; color: #15803D; }
.badge-hold { background: #FEF9C3; color: #92400E; }
.badge-sell { background: #FEE2E2; color: #B91C1C; }
.badge-fit  { background: #F3F4F6; color: #6B7280; } /* "GOOD FIT", "MODERATE FIT" etc. */

/* Shared badge styles */
.badge { font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
  padding: 4px 10px; border-radius: 9999px; text-transform: uppercase; }
```

### Factor Bars

```css
.factor-bar-track {
  height: 3px; background: #E5E7EB; border-radius: 50px; overflow: hidden;
}
.factor-bar-fill {
  height: 100%; border-radius: 50px;
  width: 0%;
  transition: width 400ms cubic-bezier(0.16, 1, 0.3, 1);
  animation-delay: calc(var(--row-index, 0) * 70ms);
}
/* Set style="--row-index: 0" through "5" on each factor row */
/* Color: same as score — green ≥70, amber 45-69, red <45 */
```

### Toast Notification

```css
.toast {
  background: #FFFFFF; border: 1px solid #E5E7EB;
  border-radius: 12px; padding: 12px 16px;
  font-size: 14px; color: #0A0A0A;
  max-width: 360px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
/* Position: bottom-center on mobile (<768px), top-right on desktop */
/* Auto-dismiss: 3 seconds. No icon. No progress bar. */
```

### Modal / Dialog

```css
.modal-overlay { background: rgba(0,0,0,0.4); }
.modal {
  background: #FFFFFF; border-radius: 16px;
  max-width: 400px; padding: 24px; width: 100%;
}
.modal-title { font-size: 18px; font-weight: 600; color: #0A0A0A; }
/* Destructive confirm button: background #DC2626, color white */
/* Mobile: render as bottom sheet — position fixed, bottom 0, full width,
   border-radius: 16px 16px 0 0 */
```

### Empty State

```css
.empty-state {
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  min-height: 120px; color: #9CA3AF;
  font-size: 14px; text-align: center;
}
/* Text only — no illustration, no icon, no CTA inside empty state */
/* Example: "No open positions." / "Available in Phase C." */
```

---

## Navigation

### Desktop Top Bar (fixed, height 64px)

```
[pondex_ logo]  [Home  Portfolio  Markets  Robo Advisor  CFD]  [Search input + Go]  [Log out]  [Account →]

background: rgba(255,255,255,0.95)
backdrop-filter: blur(12px)
border-bottom: 1px solid #E5E7EB
max-width: none (full width)
inner container: max-width 1280px, margin: 0 auto
```

**Active nav item:** `border-bottom: 2px solid #0A0A0A`, `font-weight: 600`, `color: #0A0A0A`
**Inactive:** `font-weight: 400`, `color: #6B7280`
**No dot.** Bottom border only.

### Mobile Bottom Tab Bar (fixed, height 60px, visible < 768px)

```
[Home]  [Markets]  [Search]  [Portfolio]  [Account]
```

Icons: Lucide React (included in shadcn/ui)
- Home → `<Home />` · Markets → `<TrendingUp />` · Search → `<Search />` · Portfolio → `<Briefcase />` · Account → `<User />`
- Icon size: 20px, stroke-width: 1.5px
- Label: 10px, font-weight: 500

Active: icon + label `color: #0A0A0A`, `border-top: 2px solid #0A0A0A`
Inactive: `color: #9CA3AF`

```css
.bottom-nav {
  position: fixed; bottom: 0; left: 0; right: 0;
  height: 60px; background: #FFFFFF;
  border-top: 1px solid #E5E7EB;
  display: flex; align-items: stretch;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  z-index: 100;
}
.app-content-wrapper {
  padding-bottom: calc(60px + env(safe-area-inset-bottom, 0px));
}
```

Touch targets: minimum 44×44px on all interactive elements.

---

## Landing Page Layout

### Hero (dark — #0A0A0A background)

```
padding: 120px 0 80px (desktop) / 80px 0 60px (mobile)

[Pill label]: "Free · Every source cited"
  → bg: #1F1F1F, color: #9CA3AF, border: 1px solid #2D2D2D, font-size: 13px

[H1]: Rotating headline (from 02-ux-structure.md — NOT the static headline below)
  → color: #FFFFFF, 88px desktop / 48px mobile, weight 700, letter-spacing: -0.04em

[Subtext]
  → color: #9CA3AF, 18px, max-width: 520px

[CTAs — side by side]:
  → Primary: .btn-primary-dark (white bg, black text)
  → Secondary: .btn-ghost-dark (transparent, white border)

[Score card mockup — below CTAs on mobile, right-side on desktop]:
  → background: #1A1A1A, border: 1px solid rgba(255,255,255,0.08)
  → NO glow, NO shadow
  → border-radius: 16px
```

**Mobile hero (< 768px):**
- Hide the two floating stat cards (71% / 60s)
- Move those stats to a 2-column strip below the CTA buttons
- Stack score card below CTAs, full width

### All other landing sections

Background: `#FFFFFF`, padding: `var(--space-24) 0`
Container: max-width 1280px, padding: 0 32px

---

## Chart Styling (Recharts)

### Area Chart (Price Line)

- Container height: 280px desktop / 200px mobile
- Area fill: `rgba(10,10,10,0.04)` — extremely subtle
- Line stroke: `#0A0A0A`, stroke-width: 1.5px
- No dot markers on line
- Horizontal grid lines only: `1px solid #F3F4F6` — no vertical grid, no axis border lines
- X-axis labels: 11px, color `#9CA3AF`, no axis line
- Y-axis labels: 11px, color `#9CA3AF`, no axis line, inside chart right-aligned

### Tooltip

```css
.chart-tooltip {
  background: #FFFFFF; border: 1px solid #E5E7EB;
  border-radius: 8px; padding: 8px 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  font-size: 14px; font-weight: 600; color: #0A0A0A;
}
/* Format: "$213.49 · Jul 25" — date in 12px #6B7280 below */
```

### Volume Bars (40px container)

- Positive: fill `#DCFCE7`, stroke `#16A34A`, stroke-width 1px
- Negative: fill `#FEE2E2`, stroke `#DC2626`, stroke-width 1px
- Border-radius: 2px top corners only

### Crosshair

1px dashed `#D1D5DB` vertical line. No horizontal crosshair.

### Range Selector (1W / 1M / 3M / 6M / 1Y)

Button group (not dropdown), height 28px, padding 0 10px, font-size 12px
- Active: `background: #0A0A0A; color: #FFFFFF; border-radius: 6px`
- Inactive: `background: transparent; color: #6B7280`
- Container gap: 4px

### Mobile Chart (< 768px)

- Height: 200px (not 280px), volume bars: 32px
- Touch: tap-and-hold shows crosshair + price callout pinned to top of chart
- No pinch-to-zoom

---

## Calendar Events

```
Earnings:  background #FEF9C3, text #92400E, dot #D97706  (amber — same as --color-hold)
Dividend:  background #DCFCE7, text #15803D, dot #16A34A  (green)
Holiday:   background #F3F4F6, text #6B7280, dot #9CA3AF  (gray)
```

**No purple anywhere in the product.**

---

## Mobile-Specific Overrides

```css
@media (max-width: 768px) {
  /* Type scale */
  .section-label { font-size: 12px; }
  .caption { font-size: 13px; }

  /* Tables */
  /* Top Movers: 2-column card grid (not 6-column) */
  /* Portfolio Watchlist: hide Sector column */
  /* Financials table: overflow-x scroll, first column sticky */
  .financials-table-container { overflow-x: auto; }
  .financials-sticky-col { position: sticky; left: 0; background: #FFFFFF; z-index: 1; }

  /* Landing comparison table: stacked cards, one per column */
}
```

---

## shadcn/ui Component Mapping

Override shadcn defaults via CSS variables in `globals.css`. Do not use Tailwind color classes directly.

| shadcn component | Usage | Override needed |
|---|---|---|
| `Button` | variant="default" (black) or variant="outline" | Override `--primary` → `#0A0A0A` |
| `Card` | No shadow, 1px border | Remove shadow in globals.css |
| `Badge` | Custom per verdict | Override with `.badge-buy/hold/sell` |
| `Table` | Minimal striping | Override via table CSS above |
| `Input` | Gray bg, no border, focus border black | Override `--input` bg |
| `Tabs` | Underline style, NOT pill | Use `.tab-item` spec above |
| `Dialog` | Modal spec above | Override border-radius |
| `Toast` / Sonner | Toast spec above | Override colors |

---

## What NOT to Do

| Avoid | Why |
|---|---|
| Colored section backgrounds | Generic SaaS look |
| Card shadows everywhere | Dated — use borders |
| Gradients on buttons or backgrounds | Not Revolut-level |
| Rounded corners > 16px | Too playful |
| Green/red for non-financial elements | Confuses signal meaning |
| Purple anywhere | Banned — use amber for earnings |
| Emoji icons in nav or UI | Breaks premium aesthetic |
| Illustrations or decorative icons | Use real screenshots / data |
| Glow or colored shadows | Contradicts minimal design |
| Animations that delay data display | Users want data fast |
| Dark mode as default | Light-first (Revolut/Trade Republic) |
| Tailwind color utilities directly | Use CSS variable tokens only |

---

## Pre-Submit Checklist

- [ ] globals.css has all CSS variables from Color Palette section
- [ ] Inter font loaded
- [ ] Hero: dark (#0A0A0A), rotating headline, .btn-primary-dark, .btn-ghost-dark, score card with border only (no glow)
- [ ] All other landing sections: white background
- [ ] App dashboard: white, subtle borders
- [ ] Score gauge: SVG, animated, green/amber/red
- [ ] Verdict badges: .badge-buy/hold/sell + .badge-fit for secondary
- [ ] Factor bars: staggered animation with --row-index
- [ ] Tabs: underline style, 44px height, scroll on mobile
- [ ] Tables: clean, hover on row, mobile handling per section above
- [ ] Bottom nav: Lucide icons, safe area padding, 44px touch targets
- [ ] Desktop nav: active = bottom border 2px black, no dot
- [ ] Charts: Recharts, area fill near-transparent, grid lines horizontal only
- [ ] Calendar events: amber/green/gray — NO purple
- [ ] Toasts: white card, auto-dismiss 3s, bottom-center mobile / top-right desktop
- [ ] Empty states: text only, no icon, no illustration
- [ ] 0.00% values: #6B7280, never green or red
- [ ] All interactive elements: min 44×44px touch target
