// pondex_ Bungee Design System
// All app pages import from here — single source of truth for style

import { C } from './colors'

export const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
export const M = { fontFamily: 'Chivo Mono, monospace' }

// Page wrapper — max-width container
export const page = {
  wrapper: { minHeight: '100vh', background: C.white },
  main: { maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' },
  pad: { padding: '0 32px' },
}

// Section label like [ MARKETS ]
export const label = (text) => ({
  text,
  style: { ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em' },
})

// Bold display headline
export const headline = {
  xl:  { ...S, fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 500, letterSpacing: '-2.5px', lineHeight: 1.0, color: C.black },
  lg:  { ...S, fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 500, letterSpacing: '-1.5px', lineHeight: 1.05, color: C.black },
  md:  { ...S, fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 500, letterSpacing: '-1px',   lineHeight: 1.1,  color: C.black },
  sm:  { ...S, fontSize: '20px', fontWeight: 500, letterSpacing: '-0.5px', color: C.black },
}

// Dividers
export const divider = { height: '1px', background: C[100], width: '100%' }
export const dividerStrong = { height: '1px', background: C.black, width: '100%' }

// Stat block — big number + label
export const stat = {
  wrapper: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label:   { ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em' },
  value:   { ...S, fontSize: '36px', fontWeight: 500, letterSpacing: '-1.5px', color: C.black },
  sub:     { ...M, fontSize: '12px', color: C[400] },
}

// Tab bar item
export const tab = (active) => ({
  ...M,
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: active ? C.black : C[400],
  background: 'none',
  border: 'none',
  borderBottom: active ? `2px solid ${C.black}` : '2px solid transparent',
  padding: '20px 24px 18px',
  cursor: 'pointer',
  marginBottom: '-1px',
})

// Row — used in tables/lists
export const row = {
  base: {
    display: 'grid',
    padding: '16px 0',
    borderBottom: `1px solid ${C[100]}`,
    alignItems: 'center',
  },
  header: {
    ...M, fontSize: '10px', color: C[400],
    textTransform: 'uppercase', letterSpacing: '0.08em',
    paddingBottom: '12px', borderBottom: `1px solid ${C[200]}`,
  },
}

// Card
export const card = {
  base: {
    border: `1px solid ${C[200]}`,
    borderRadius: '16px',
    padding: '28px 24px',
    background: C.white,
  },
  dark: {
    background: C.black,
    borderRadius: '16px',
    padding: '28px 24px',
  },
  muted: {
    background: C[100],
    borderRadius: '16px',
    padding: '28px 24px',
  },
}

// Verdict badge
export const verdictBadge = (verdict) => {
  const colors = { BUY: ['#16a34a', '#f0fdf4'], HOLD: ['#d97706', '#fef3c7'], SELL: ['#dc2626', '#fef2f2'] }
  const [fg, bg] = colors[verdict] || [C.black, C[100]]
  return {
    ...M, fontSize: '10px', fontWeight: 600,
    color: fg, background: bg,
    padding: '4px 12px', borderRadius: '50px',
    textTransform: 'uppercase', letterSpacing: '0.1em',
    display: 'inline-block',
  }
}

// Button styles
export const btn = {
  primary: {
    ...S, fontSize: '14px', fontWeight: 600,
    background: C.black, color: C.white,
    border: 'none', borderRadius: '8px',
    padding: '10px 22px', cursor: 'pointer',
  },
  ghost: {
    ...S, fontSize: '14px',
    background: 'none', color: C[600],
    border: `1px solid ${C[200]}`,
    borderRadius: '8px', padding: '10px 22px', cursor: 'pointer',
  },
  link: {
    ...M, fontSize: '11px', color: C[400],
    background: 'none', border: 'none',
    cursor: 'pointer', textDecoration: 'underline',
    textTransform: 'uppercase', letterSpacing: '0.08em',
  },
}
