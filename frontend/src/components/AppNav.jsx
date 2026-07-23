// AppNav — used on all authenticated pages (/app, /app/portfolio, etc.)
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { C } from '../lib/colors'
import { G, S, M } from '../lib/grid'

const navLinks = [
  { label: 'Home',         to: '/app',           key: 'home' },
  { label: 'Portfolio',    to: '/app/portfolio',  key: 'portfolio' },
  { label: 'Markets',      to: '/app/markets',    key: 'markets' },
  { label: 'Robo Advisor', to: '/app/robo',       key: 'robo' },
  { label: 'CFD',          to: '/app/cfd',        key: 'cfd' },
]

export default function AppNav({ onLogout, userEmail }) {
  const [searchVal, setSearchVal] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (to) => {
    if (to === '/app') return location.pathname === '/app'
    return location.pathname.startsWith(to.split('?')[0])
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const ticker = searchVal.trim().toUpperCase()
    if (ticker) {
      navigate(`/app/stock?ticker=${ticker}`)
      setSearchVal('')
    }
  }

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: G.nav.zIndex,
      height: G.nav.height,
      backgroundColor: G.nav.bg,
      backdropFilter: G.nav.blur,
      borderBottom: G.nav.borderBottom,
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center',
        height: '100%',
        padding: `0 ${G.nav.px}`,
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <img src="/stockrater/pondex-logo.png" alt="pondex_" style={{ height: '28px', width: 'auto' }} />
        </Link>

        {/* Nav links — center */}
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
          {navLinks.map(link => {
            const active = isActive(link.to)
            return (
            <Link key={link.key} to={link.to} style={{
              ...S, fontSize: '14px',
              color: active ? C.black : C[500],
              textDecoration: 'none',
              padding: '6px 14px',
              borderRadius: '8px',
              fontWeight: active ? 600 : 400,
              background: active ? C[100] : 'transparent',
              transition: 'all 0.15s',
            }}
              onMouseEnter={e => { if (!active) { e.currentTarget.style.color = C.black; e.currentTarget.style.background = C[100] }}}
              onMouseLeave={e => { if (!active) { e.currentTarget.style.color = C[500]; e.currentTarget.style.background = 'transparent' }}}
            >
              {link.label}
            </Link>
            )
          })}
        </nav>

        {/* Right — Search + Log out + Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

          {/* Search — always visible */}
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              value={searchVal}
              onChange={e => setSearchVal(e.target.value.toUpperCase())}
              placeholder="AAPL, NVDA..."
              maxLength={6}
              style={{
                ...M, fontSize: '13px', width: '120px',
                background: C[100], border: `1px solid ${C[200]}`,
                borderRadius: '8px', padding: '7px 12px',
                color: C.black, outline: 'none',
              }}
            />
            <button type="submit" style={{ ...M, fontSize: '12px', background: C.black, color: C.white, border: 'none', borderRadius: '7px', padding: '7px 14px', cursor: 'pointer' }}>
              Go
            </button>
          </form>

          {onLogout && (
            <button onClick={onLogout} style={{
              ...S, fontSize: '14px', color: C[600],
              background: 'none', border: 'none',
              padding: '8px 14px', borderRadius: '8px', cursor: 'pointer',
            }}
              onMouseEnter={e => e.currentTarget.style.background = C[100]}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Log out
            </button>
          )}

          <Link to="/app/portfolio" style={{
            ...S, fontSize: '14px', fontWeight: 600,
            background: C.black, color: C.white,
            textDecoration: 'none', padding: '8px 18px',
            borderRadius: '8px',
          }}>
            Profile
          </Link>
        </div>
      </div>
    </header>
  )
}
