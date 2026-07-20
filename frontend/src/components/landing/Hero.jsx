import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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

// Subtle grid overlay
function GridOverlay() {
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none' }}>
      <defs>
        <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#ffffff" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  )
}

export default function Hero() {
  const [lineIndex, setLineIndex] = useState(0)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const id = setInterval(() => setLineIndex(i => (i + 1) % rotatingLines.length), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>

      {/* Background image */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'grayscale(40%)',
      }} />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.55) 100%)',
      }} />

      <GridOverlay />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 420px',
        gap: '48px',
        alignItems: 'center',
        padding: '120px 64px 64px',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}>

        {/* Left — Headline */}
        <div>
          {/* Rotating line */}
          <div style={{ overflow: 'hidden', marginBottom: '0' }}>
            <motion.p style={{
              ...S,
              fontSize: 'clamp(48px, 7vw, 108px)',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '-2px',
              lineHeight: 1.05,
              margin: 0,
            }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Still not sure
            </motion.p>
            <div style={{ height: 'clamp(52px, 7.5vw, 116px)', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={lineIndex}
                  style={{
                    ...S,
                    fontSize: 'clamp(48px, 7vw, 108px)',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: '-2px',
                    lineHeight: 1.05,
                    margin: 0,
                  }}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {rotatingLines[lineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Main headline */}
          <motion.p
            style={{
              ...S,
              fontSize: 'clamp(48px, 7vw, 108px)',
              fontWeight: 500,
              color: C.white,
              letterSpacing: '-2px',
              lineHeight: 1.05,
              margin: '0 0 32px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span style={{
              background: C.white,
              color: C.black,
              padding: '0.02em 0.16em',
              borderRadius: '6px',
            }}>pondex_</span>
            {' '}gives you<br />one verdict.
          </motion.p>

          <motion.div
            style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <a href="#demo" style={{ ...S, fontSize: '15px', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              How it works ↓
            </a>
          </motion.div>

          {/* Trust line */}
          <motion.p
            style={{ ...M, fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '48px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            No account required · Free forever · Every source cited
          </motion.p>
        </div>

        {/* Right — Signup Card */}
        <motion.div
          style={{
            background: 'rgba(255,255,255,0.96)',
            backdropFilter: 'blur(16px)',
            borderRadius: '24px',
            padding: '36px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
          }}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p style={{ ...S, fontSize: '22px', fontWeight: 500, color: C.black, marginBottom: '6px', letterSpacing: '-0.5px' }}>
            Start for free.
          </p>
          <p style={{ ...S, fontSize: '14px', color: C[400], marginBottom: '28px' }}>
            Get your first verdict in 60 seconds.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                background: C[100],
                border: `1px solid ${C[200]}`,
                borderRadius: '12px',
                padding: '13px 16px',
                ...S, fontSize: '15px',
                color: C.black,
                outline: 'none',
                width: '100%',
                boxSizing: 'border-box',
              }}
            />
            <BungeeButton href="/signup" style={{ width: '100%' }}>
              Create free account
            </BungeeButton>
          </div>

          <div style={{ height: '1px', background: C[200], margin: '20px 0' }} />

          <p style={{ ...S, fontSize: '14px', color: C[400], textAlign: 'center' }}>
            Already have an account?{' '}
            <a href="/login" onClick={e => { e.preventDefault(); navigate('/login') }}
              style={{ color: C.black, fontWeight: 500, textDecoration: 'none' }}>
              Log in →
            </a>
          </p>

          <p style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '20px', textAlign: 'center' }}>
            No credit card required · Cancel anytime
          </p>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: 'relative', zIndex: 1, padding: '0 64px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', ...M, fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>
          <span>(</span><span>EUROPE</span><span>)</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', ...M, fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>
          <span>LI</span><span>/</span><span>GH</span><span>/</span><span>X</span>
        </div>
      </div>
    </section>
  )
}
