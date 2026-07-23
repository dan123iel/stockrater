// pondex_ Design Grid — Master Layout System
// Single source of truth for spacing, layout, breakpoints across ALL pages.
// Usage: import { G } from '../lib/grid'

export const G = {

  // ─── Navbar ───────────────────────────────────────────────────────────────
  nav: {
    height: '72px',
    heightPx: 72,
    zIndex: 1000,
    bg: 'rgba(255,255,255,0.75)',
    blur: 'blur(12px)',
    px: '32px',              // logo/+ at viewport edges — no maxWidth on nav
    borderBottom: 'none',
  },

  // ─── Page Container ───────────────────────────────────────────────────────
  container: {
    maxWidth: '1440px',
    px: {
      default: '24px',
      md: '40px',
      lg: '32px',            // tighter gutter = wider grid feel like Bungee
    },
    mx: 'auto',
  },

  // ─── 12-Column Grid ───────────────────────────────────────────────────────
  // Use gridTemplateColumns from these presets
  cols: {
    1:    '1fr',
    2:    'repeat(2, 1fr)',
    3:    'repeat(3, 1fr)',
    4:    'repeat(4, 1fr)',
    14:   'repeat(14, 1fr)',   // master grid — 14 columns
    hero: '1fr 400px',
    '2-3': '2fr 3fr',
    '3-2': '3fr 2fr',
  },
  gap: {
    sm:  '16px',
    md:  '24px',
    lg:  '40px',
    xl:  '64px',
  },

  // ─── Spacing Scale ────────────────────────────────────────────────────────
  space: {
    1:   '4px',
    2:   '8px',
    3:   '12px',
    4:   '16px',
    5:   '24px',
    6:   '32px',
    7:   '48px',
    8:   '64px',
    9:   '96px',
    10:  '128px',
    11:  '160px',
    12:  '200px',
  },

  // ─── Section Padding ──────────────────────────────────────────────────────
  section: {
    py:  '120px',            // vertical padding for full sections
    pyMd: '80px',            // tablet
    pySm: '64px',            // mobile
    gap: '80px',             // gap between sections
  },

  // ─── Typography Scale ─────────────────────────────────────────────────────
  text: {
    // Display / Hero headlines
    display: 'clamp(56px, 7vw, 112px)',
    h1:      'clamp(40px, 5vw, 80px)',
    h2:      'clamp(28px, 3.5vw, 56px)',
    h3:      'clamp(20px, 2.5vw, 36px)',
    h4:      '22px',
    // Body
    lg:      '18px',
    md:      '16px',
    sm:      '14px',
    xs:      '12px',
    xxs:     '10px',
    // Mono / labels
    mono:    '13px',
    monoSm:  '10px',
  },

  // ─── Letter Spacing ───────────────────────────────────────────────────────
  tracking: {
    tight:   '-2px',
    tighter: '-1.5px',
    normal:  '0px',
    wide:    '0.05em',
    wider:   '0.1em',
    widest:  '0.15em',
  },

  // ─── Line Height ──────────────────────────────────────────────────────────
  leading: {
    none:   1,
    tight:  1.05,
    snug:   1.2,
    normal: 1.5,
    loose:  1.75,
  },

  // ─── Border Radius ────────────────────────────────────────────────────────
  radius: {
    sm:   '6px',
    md:   '12px',
    lg:   '16px',
    xl:   '24px',
    full: '9999px',
  },

  // ─── Shadows ──────────────────────────────────────────────────────────────
  shadow: {
    sm:  '0 2px 8px rgba(0,0,0,0.08)',
    md:  '0 8px 24px rgba(0,0,0,0.12)',
    lg:  '0 16px 48px rgba(0,0,0,0.18)',
    xl:  '0 24px 64px rgba(0,0,0,0.28)',
    dark:'0 24px 64px rgba(0,0,0,0.5)',
  },

  // ─── Breakpoints (for reference — use CSS media queries) ─────────────────
  bp: {
    sm:  '640px',
    md:  '768px',
    lg:  '1024px',
    xl:  '1280px',
    '2xl': '1536px',
  },

  // ─── Z-Index Stack ────────────────────────────────────────────────────────
  z: {
    below:   -1,
    base:    0,
    card:    10,
    sticky:  100,
    overlay: 500,
    nav:     1000,
    modal:   1100,
    toast:   1200,
  },

  // ─── Animation ────────────────────────────────────────────────────────────
  motion: {
    fadeUp: {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.4 },
    },
    slideRight: {
      initial: { opacity: 0, x: 32 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  },
}

// ─── Font Stacks (use as style object spread) ─────────────────────────────
export const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
export const M = { fontFamily: 'Chivo Mono, monospace' }
