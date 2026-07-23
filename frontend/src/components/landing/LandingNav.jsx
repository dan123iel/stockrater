import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { C } from '../../lib/colors'
import { G, S, M } from '../../lib/grid'

const navLinks = [
  { label: 'Product',   href: '#features' },
  { label: 'Solutions', href: '#how-it-works' },
  { label: 'Resources', href: '#demo' },
  { label: 'Company',   href: '#testimonials' },
  { label: 'Pricing',   href: '#pricing' },
]

export default function LandingNav() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <>
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
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  ...S, fontSize: '14px', color: C[500],
                  textDecoration: 'none', padding: '6px 14px',
                  borderRadius: '8px', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = C.black; e.currentTarget.style.background = C[100] }}
                onMouseLeave={e => { e.currentTarget.style.color = C[500]; e.currentTarget.style.background = 'transparent' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right — Log in + Free Trial */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link to="/login" style={{
              ...S, fontSize: '14px', color: C[600],
              textDecoration: 'none', padding: '8px 16px', borderRadius: '8px',
            }}
              onMouseEnter={e => e.currentTarget.style.background = C[100]}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Log in
            </Link>
            <Link to="/signup" style={{
              ...S, fontSize: '14px', fontWeight: 600,
              background: C.black, color: C.white,
              textDecoration: 'none', padding: '8px 20px',
              borderRadius: '8px',
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              Free Trial
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile overlay — only on small screens */}
      <AnimatePresence>
        {open && (
          <motion.div style={{
            position: 'fixed', inset: 0, zIndex: G.nav.zIndex - 1,
            backgroundColor: 'rgba(255,255,255,0.98)',
          }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', padding: '120px 32px 48px', gap: '8px' }}>
              {navLinks.map(link => (
                <Link key={link.href} to={link.href} onClick={() => setOpen(false)} style={{
                  ...S, fontSize: '32px', fontWeight: 500, color: C.black,
                  textDecoration: 'none', padding: '12px 0',
                  borderBottom: `1px solid ${C[100]}`, letterSpacing: '-0.5px',
                }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
