import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BungeeButton } from './BungeeButton'
import { C } from '../../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

const rotatingLines = [
  'where to invest.',
  'which stock to pick.',
  'if the price is right.',
  'what the numbers mean.',
  'after hours of research.',
  'which source to trust.',
]

// Subtle animated background — floating particles
function ParticleBackground() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * -20,
  }))

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: C[300],
            opacity: 0.4,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
      {/* Subtle grid lines */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04 }}>
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke={C.black} strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  )
}

export default function Hero() {
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setLineIndex(i => (i + 1) % rotatingLines.length)
    }, 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <section style={{
      position: 'relative',
      paddingTop: '80px',
      background: C.white,
      overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>

      <ParticleBackground />

      {/* Content — vertically centered in viewport */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '0 32px',
        gap: '20px',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Line 1 — rotating */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <p style={{
            ...S,
            fontSize: 'clamp(56px, 9vw, 128px)',
            fontWeight: 500,
            color: C.black,
            letterSpacing: '-1.5px',
            lineHeight: 1.15,
            margin: 0,
            display: 'flex',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0 0.25em',
            overflow: 'hidden',
          }}>
            <span style={{ flexShrink: 0 }}>Still not sure</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={lineIndex}
                style={{ display: 'inline-block', whiteSpace: 'nowrap', color: C[500] }}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {rotatingLines[lineIndex]}
              </motion.span>
            </AnimatePresence>
          </p>
        </div>

        {/* Line 2 — pondex_ verdict */}
        <motion.p
          style={{
            ...S,
            fontSize: 'clamp(56px, 9vw, 128px)',
            fontWeight: 500,
            letterSpacing: '-1.5px',
            lineHeight: 1.1,
            margin: 0,
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
        >
          <span style={{
            background: C.black,
            color: C.white,
            display: 'inline',
            WebkitBoxDecorationBreak: 'clone',
            boxDecorationBreak: 'clone',
            padding: '0.04em 0.18em',
            borderRadius: '6px',
          }}>
            pondex_
          </span>
          {' '}
          <span style={{ color: C.black }}>gives you one verdict.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <BungeeButton href="/signup">Analyse a stock — it's free</BungeeButton>
          <a href="#how-it-works" style={{ ...S, fontSize: '16px', color: C[400], textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
            How it works ↓
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          style={{ ...M, fontSize: '10px', color: C[300], letterSpacing: '0.1em', textTransform: 'uppercase' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
        >
          No account required · Free forever · Every source cited
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)' }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 8l5 5 5-5" stroke={C[300]} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: 'relative', zIndex: 1, padding: '0 32px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', ...M, fontSize: '13px', color: C[400] }}>
          <span>(</span><span>EUROPE</span><span>)</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', ...M, fontSize: '13px', color: C[400] }}>
          <span>LI</span><span>/</span><span>GH</span><span>/</span><span>X</span>
        </div>
      </div>
    </section>
  )
}
