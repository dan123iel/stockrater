# MOBILE-NAV-SPEC.md — pondex_ Mobile Navigation

**Entscheidung:** Bottom Navigation Bar
**Datum:** 2026-07-24
**Status:** Accepted — implement in Phase C

---

## Entscheidung

Bottom Navigation Bar für alle authentifizierten App-Seiten unter 900px.

**Begründung:**
- Trade Republic, Revolut, Robinhood — alle nutzen Bottom Nav
- Daumen-erreichbar auf Smartphones
- 5 klare Destinationen ohne Hamburger-Overhead
- Kein Overflow-Problem der aktuellen Top-Nav

---

## Struktur

```
Breakpoint: < 900px → AppNav (top) wird ausgeblendet, Bottom Nav erscheint

Bottom Navigation Bar (fixed, bottom: 0, height: 60px):
┌─────────────────────────────────────────────────────┐
│  🏠       📊       🔍       💼       👤           │
│ Home   Markets  Search  Portfolio  Account          │
└─────────────────────────────────────────────────────┘
```

**5 Items:**
| Icon | Label | Route | Aktiv-Kondition |
|---|---|---|---|
| Home | Home | `/app` | pathname === '/app' |
| Markets | Markets | `/app/markets` | startsWith('/app/markets') |
| Search | Search | `/app/stock` | startsWith('/app/stock') |
| Portfolio | Portfolio | `/app/portfolio` | startsWith('/app/portfolio') |
| Account | Account | `/app/portfolio` (Tab Account) | — |

**Search-Item:** Öffnet kein Menü — navigiert zu `/app/stock` mit leerem Input (Fokus auf Suchfeld)

---

## Top-Nav auf Desktop (≥ 900px)

Unverändert — Logo | Home Portfolio Markets Robo Advisor CFD | Search + Logout + Profile

**Robo Advisor und CFD** auf Mobile:
- Nicht in Bottom Nav (zu wenig Platz)
- Erreichbar über Portfolio-Seite oder direkte URL
- Phase C: kein Blocker — beide Seiten sind Previews

---

## Implementierung

```jsx
// components/BottomNav.jsx — neue Datei
import { Link, useLocation } from 'react-router-dom'
import { C } from '../lib/colors'
import { M } from '../lib/grid'

const items = [
  { label: 'Home',      to: '/app',           icon: '⌂' },
  { label: 'Markets',   to: '/app/markets',   icon: '◈' },
  { label: 'Search',    to: '/app/stock',     icon: '⊕' },
  { label: 'Portfolio', to: '/app/portfolio', icon: '▤' },
  { label: 'Account',   to: '/app/portfolio', icon: '◉' },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: '60px', background: C.white,
      borderTop: `1px solid ${C[100]}`,
      display: 'flex', alignItems: 'stretch',
      zIndex: 100,
    }}>
      {items.map(item => {
        const active = item.to === '/app'
          ? pathname === '/app'
          : pathname.startsWith(item.to.split('?')[0])
        return (
          <Link key={item.label} to={item.to} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '2px',
            textDecoration: 'none',
            color: active ? C.black : C[400],
            borderTop: active ? `2px solid ${C.black}` : '2px solid transparent',
          }}>
            <span style={{ fontSize: '18px', lineHeight: 1 }}>{item.icon}</span>
            <span style={{ ...M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {item.label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
```

**In AppNav.jsx:**
```jsx
// AppNav.jsx — Top Nav auf Mobile ausblenden
<header style={{
  ...
  display: window.innerWidth < 900 ? 'none' : 'block',
  // besser: CSS media query via style tag oder className
}}>
```

**In App.jsx — BottomNav einbinden:**
```jsx
// Nur auf /app/* Routen, nicht auf Landing/Login/Signup
<Route path="/app" element={<AuthGuard><Home /><BottomNav /></AuthGuard>} />
// etc. für alle app-Routen
```

**Padding-Bottom auf App-Seiten:**
```jsx
// Alle app pages brauchen paddingBottom: '60px' damit Content nicht hinter BottomNav verschwindet
<main style={{ paddingTop: G.nav.height, paddingBottom: '60px', ... }}>
```

---

## Icons (Text-basiert, kein Icon-Library-Dependency)

Aktuelle Hero-Icons oder einfache Unicode-Symbole:
- Home: ⌂ oder SVG house icon
- Markets: ◈ oder SVG chart icon
- Search: ⊕ oder SVG magnifying glass
- Portfolio: ▤ oder SVG briefcase
- Account: ◉ oder SVG person circle

**Empfehlung:** Eigene SVG-Inline-Icons um keinen Dependency hinzuzufügen.

---

## LandingNav auf Mobile (öffentliche Seiten)

LandingNav hat bereits ein Hamburger-Overlay (AnimatePresence).
**Problem:** Hamburger-Button existiert in JSX aber ist mit `display: none` in der aktuellen Implementierung nicht sichtbar auf allen Viewport-Größen.

**Fix (bereits teilweise implementiert in LandingNav.jsx):**
```jsx
// Hamburger-Button immer sichtbar unter 900px
<button
  onClick={() => setOpen(true)}
  style={{
    display: 'none', // default
    // via inline style für <900px: display: 'flex'
  }}
  className="hamburger" // CSS-Klasse für Media Query
>
  ☰
</button>
```

**In index.css hinzufügen:**
```css
@media (max-width: 900px) {
  .landing-nav-links { display: none; }
  .hamburger { display: flex !important; }
  .app-nav-desktop { display: none; }
  .bottom-nav { display: flex; }
}
@media (min-width: 901px) {
  .bottom-nav { display: none; }
}
```
