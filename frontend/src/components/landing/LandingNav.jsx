import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { C } from '../../lib/colors'

const navLinks = [
  { num: '( _01 )', label: 'How it works', href: '#how-it-works' },
  { num: '( _02 )', label: 'Features', href: '#features' },
  { num: '( _03 )', label: 'Pricing', href: '#pricing' },
  { num: '( _04 )', label: 'FAQ', href: '#faq' },
  { num: '( _05 )', label: 'Contact', href: 'mailto:hi@pondex.app' },
]

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

export default function LandingNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: '80px',
        backgroundColor: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(10px)',
        padding: '16px 0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', padding: '0 32px' }}>

          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', zIndex: 1002 }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M4 3 L4 25" stroke={C.black} strokeWidth="3.5" strokeLinecap="round"/>
              <circle cx="13" cy="11" r="6.5" stroke={C.black} strokeWidth="3.5" fill="none"/>
              <path d="M13 25 L24 25" stroke={C.black} strokeWidth="3.5" strokeLinecap="round"/>
            </svg>
          </a>

          {/* Right side — Log in + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', zIndex: 1001 }}>
            <a
              href="/login"
              style={{ ...M, fontSize: '13px', color: C.black, textDecoration: 'none', letterSpacing: '0.02em' }}
            >
              Log in
            </a>

            <button
              onClick={() => setOpen(v => !v)}
              aria-label="menu"
              style={{ width: '32px', height: '32px', position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
            >
              <AnimatePresence mode="wait">
                {!open ? (
                  <motion.div key="plus"
                    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div style={{ position: 'absolute', width: '2px', height: '32px', borderRadius: '50px', backgroundColor: C.black }} />
                    <div style={{ position: 'absolute', width: '32px', height: '2px', borderRadius: '50px', backgroundColor: C.black }} />
                  </motion.div>
                ) : (
                  <motion.div key="x"
                    style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    initial={{ opacity: 0, rotate: -45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div style={{ position: 'absolute', width: '2px', height: '32px', borderRadius: '50px', backgroundColor: C.black, transform: 'rotate(45deg)' }} />
                    <div style={{ position: 'absolute', width: '2px', height: '32px', borderRadius: '50px', backgroundColor: C.black, transform: 'rotate(-45deg)' }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            style={{
              position: 'fixed', inset: 0,
              zIndex: 999,
              backgroundColor: 'rgba(255,255,255,0.96)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div style={{
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              height: '100%',
              padding: '160px 32px 48px',
            }}>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    style={{ position: 'relative', display: 'block', padding: '0 0 10px', textDecoration: 'none' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: 'easeOut' }}
                    whileHover="hover"
                  >
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        ...M,
                        fontSize: 'clamp(9px, 1vw, 13px)',
                        fontWeight: 400,
                        lineHeight: 1,
                        color: C.black,
                      }}>
                        {link.num}
                      </span>
                      <span style={{
                        ...S,
                        fontSize: 'clamp(40px, 7vw, 80px)',
                        fontWeight: 500,
                        letterSpacing: '-2px',
                        lineHeight: 1.05,
                        color: C.black,
                      }}>
                        {link.label}
                      </span>
                    </div>
                    <motion.div
                      style={{ position: 'absolute', bottom: 0, left: 0, height: '2px', background: C.black }}
                      variants={{ hover: { width: '100%' } }}
                      initial={{ width: '0%' }}
                      transition={{ duration: 0.25 }}
                    />
                  </motion.a>
                ))}
              </div>

              <motion.div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.a
                  href="mailto:hi@pondex.app"
                  style={{ position: 'relative', display: 'block', textDecoration: 'none', paddingBottom: '2px' }}
                  whileHover="hover"
                >
                  <span style={{ ...S, fontSize: 'clamp(18px, 2.2vw, 32px)', fontWeight: 500, color: C.black }}>
                    hi@pondex.app
                  </span>
                  <motion.div
                    style={{ height: '2px', background: C.black, position: 'absolute', bottom: 0, left: 0 }}
                    variants={{ hover: { width: '100%' } }}
                    initial={{ width: '15%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', ...S, fontSize: '14px', color: C.black }}>
                  {[['LI','#'],['/',null],['GH','#'],['/',null],['X','#']].map(([label, href], i) =>
                    href ? (
                      <a key={i} href={href} style={{ ...S, fontSize: '14px', color: C.black, textDecoration: 'none' }}>{label}</a>
                    ) : (
                      <span key={i} style={{ color: C[400] }}>{label}</span>
                    )
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
