import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { C } from '../../lib/colors'
import { G, S, M } from '../../lib/grid'

const rotatingLines = [
  'where to invest.',
  'which stock to pick.',
  'if the price is right.',
  'what the numbers mean.',
  'after hours of research.',
  'which source to trust.',
]

// Score card preview with stat overlays — like Jasper's hero visual
function HeroVisual() {
  const factors = [
    { name: 'Fundamentals', score: 58, color: '#d97706' },
    { name: 'Moat',         score: 73, color: '#16a34a' },
    { name: 'Risk',         score: 66, color: '#d97706' },
    { name: 'Valuation',    score: 38, color: '#dc2626' },
  ]

  return (
    <motion.div
      style={{ position: 'relative', maxWidth: '680px', margin: '0 auto' }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Stat overlay — top left */}
      <motion.div
        style={{
          position: 'absolute', top: '-24px', left: '-32px', zIndex: 2,
          background: C.black, color: C.white,
          borderRadius: '14px', padding: '16px 20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        }}
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <p style={{ ...M, fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>Survey · Wave 1</p>
        <p style={{ ...S, fontSize: '28px', fontWeight: 500, color: C.white, margin: 0, letterSpacing: '-1px' }}>71%</p>
        <p style={{ ...M, fontSize: '11px', color: 'rgba(255,255,255,0.6)', margin: '4px 0 0' }}>trust only sourced data</p>
      </motion.div>

      {/* Stat overlay — top right */}
      <motion.div
        style={{
          position: 'absolute', top: '-16px', right: '-24px', zIndex: 2,
          background: C.white, border: `1px solid ${C[200]}`,
          borderRadius: '14px', padding: '16px 20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
        }}
        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>Time to verdict</p>
        <p style={{ ...S, fontSize: '28px', fontWeight: 500, color: C.black, margin: 0, letterSpacing: '-1px' }}>60s</p>
        <p style={{ ...M, fontSize: '11px', color: C[400], margin: '4px 0 0' }}>any stock, always sourced</p>
      </motion.div>

      {/* Main score card */}
      <div style={{
        background: C.white,
        border: `1px solid ${C[200]}`,
        borderRadius: '20px',
        padding: '32px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.10)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
          <div>
            <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>AAPL · NMS · Technology</p>
            <p style={{ ...S, fontSize: '24px', fontWeight: 500, color: C.black, margin: '0 0 4px', letterSpacing: '-0.5px' }}>Apple Inc.</p>
            <p style={{ ...M, fontSize: '14px', color: C[400], margin: 0 }}>$327.74 · <span style={{ color: '#16a34a' }}>+1.15 (0.35%)</span></p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ ...M, fontSize: '10px', color: '#d97706', background: '#fef3c7', padding: '4px 12px', borderRadius: '50px', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>HOLD</span>
            <p style={{ ...S, fontSize: '48px', fontWeight: 500, color: '#d97706', margin: 0, lineHeight: 1, letterSpacing: '-2px' }}>
              59<span style={{ fontSize: '20px', color: C[300] }}>/100</span>
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {factors.map((f, i) => (
            <motion.div key={f.name}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.08 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ ...S, fontSize: '13px', color: C[600] }}>{f.name}</span>
                <span style={{ ...M, fontSize: '12px', color: f.color, fontWeight: 600 }}>{f.score}/100</span>
              </div>
              <div style={{ height: '3px', background: C[100], borderRadius: '50px', overflow: 'hidden' }}>
                <motion.div style={{ height: '100%', background: f.color, borderRadius: '50px' }}
                  initial={{ width: 0 }} animate={{ width: `${f.score}%` }}
                  transition={{ delay: 0.7 + i * 0.08, duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        <p style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '20px', textAlign: 'center' }}>
          Source: Yahoo Finance · SEC EDGAR · Not financial advice
        </p>
      </div>
    </motion.div>
  )
}

// Logos trust bar
function LogosBar() {
  const logos = [
    'Morningstar', 'Bloomberg', 'Yahoo Finance', 'SEC EDGAR', 'Reuters', 'Groq AI'
  ]
  return (
    <div style={{ borderTop: `1px solid ${C[100]}`, paddingTop: '48px', marginTop: '80px' }}>
      <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginBottom: '32px' }}>
        Data sourced from trusted providers
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
        {logos.map(name => (
          <span key={name} style={{ ...S, fontSize: '16px', fontWeight: 600, color: C[300], letterSpacing: '-0.3px' }}>
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  const [lineIndex, setLineIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const id = setInterval(() => setLineIndex(i => (i + 1) % rotatingLines.length), 3000)
    return () => clearInterval(id)
  }, [])

  return (
    <section style={{
      paddingTop: `calc(${G.nav.height} + 80px)`,
      paddingBottom: '80px',
      background: C.white,
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px', boxSizing: 'border-box' }}>

        {/* Announcement pill */}
        <motion.div
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span style={{
            ...M, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em',
            background: C.black, color: C.white, padding: '3px 10px', borderRadius: '50px',
          }}>New</span>
          <span style={{ ...S, fontSize: '14px', color: C[600] }}>
            Source-cited analysis for every stock.{' '}
            <Link to="/app" style={{ color: C.black, fontWeight: 600, textDecoration: 'none' }}>Try it free →</Link>
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          style={{
            ...S,
            fontSize: 'clamp(44px, 6.5vw, 96px)',
            fontWeight: 500,
            letterSpacing: '-3px',
            lineHeight: 1.0,
            color: C.black,
            maxWidth: '900px',
            margin: '0 auto 24px',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Still not sure{' '}
          <span style={{ color: C[300], fontStyle: 'italic', display: 'inline-block', minWidth: '420px', textAlign: 'left' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={lineIndex}
                style={{ display: 'inline-block' }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {rotatingLines[lineIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          <br />
          <span style={{
            background: C.black, color: C.white,
            padding: '0 0.12em', borderRadius: '8px',
            display: 'inline-block', marginRight: '16px',
          }}>pondex_</span>
          gives you one verdict.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          style={{
            ...S, fontSize: '18px', color: C[400], lineHeight: 1.6,
            maxWidth: '560px', margin: '0 auto 40px',
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          A 0–100 score for any stock. Every number cites its source.
          No noise — just a clear verdict in under 60 seconds.
        </motion.p>

        {/* CTAs */}
        <motion.div
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '80px' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button
            onClick={() => navigate('/signup')}
            style={{
              ...S, fontSize: '15px', fontWeight: 600,
              background: C.black, color: C.white,
              border: 'none', borderRadius: '10px',
              padding: '14px 32px', cursor: 'pointer',
            }}
          >
            Start free trial
          </button>
          <button
            onClick={() => navigate('/app')}
            style={{
              ...S, fontSize: '15px', fontWeight: 400,
              background: 'transparent', color: C.black,
              border: `1.5px solid ${C[200]}`, borderRadius: '10px',
              padding: '14px 32px', cursor: 'pointer',
            }}
          >
            Get a demo
          </button>
        </motion.div>

        {/* Hero visual */}
        <HeroVisual />

        {/* Logos bar */}
        <LogosBar />

      </div>
    </section>
  )
}
