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

const factors = [
  { label: 'Fundamentals', score: 82, bar: 0.82, source: 'Yahoo Finance · TTM' },
  { label: 'Valuation',    score: 74, bar: 0.74, source: 'Yahoo Finance · TTM' },
  { label: 'Management',   score: 91, bar: 0.91, source: 'SEC EDGAR · Form 4'  },
]

function ScoreCard() {
  return (
    <motion.div
      style={{
        width: '100%',
        maxWidth: '480px',
        border: `1px solid ${C[200]}`,
        borderRadius: '24px',
        overflow: 'hidden',
        background: C.white,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.7, ease: 'easeOut' }}
    >
      {/* Header */}
      <div style={{ padding: '20px 28px 16px', borderBottom: `1px solid ${C[200]}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>AAPL · Apple Inc.</p>
          <p style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.08em' }}>Demo · Illustration only</p>
        </div>
        <span style={{ ...M, fontSize: '9px', color: C[300], border: `1px solid ${C[200]}`, borderRadius: '50px', padding: '2px 8px', textTransform: 'uppercase' }}>DEMO</span>
      </div>

      {/* Score */}
      <div style={{ padding: '20px 28px', borderBottom: `1px solid ${C[200]}`, display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span style={{ ...S, fontSize: '64px', fontWeight: 500, lineHeight: 1, color: C[600] }}>78</span>
        <span style={{ ...S, fontSize: '22px', color: C[200] }}>/100</span>
        <span style={{ ...M, fontSize: '11px', color: C[500], textTransform: 'uppercase', letterSpacing: '0.1em', marginLeft: '8px' }}>Good Fit</span>
      </div>

      {/* Factors */}
      {factors.map((f, i) => (
        <motion.div
          key={f.label}
          style={{ padding: '14px 28px', borderBottom: i < factors.length - 1 ? `1px solid ${C[200]}` : 'none', display: 'flex', gap: '16px', alignItems: 'center' }}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 + i * 0.1 }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ ...S, fontSize: '13px', fontWeight: 500, color: C.black }}>{f.label}</span>
              <span style={{ ...M, fontSize: '12px', color: C[500] }}>{f.score}</span>
            </div>
            <div style={{ height: '3px', background: C[100], borderRadius: '50px', overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', background: C[600], borderRadius: '50px' }}
                initial={{ width: 0 }}
                animate={{ width: `${f.bar * 100}%` }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.7 }}
              />
            </div>
          </div>
          <span style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>{f.source}</span>
        </motion.div>
      ))}

      {/* Footer */}
      <div style={{ padding: '10px 28px', background: C[100] }}>
        <p style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          ⚠ Research tool only · Not financial advice
        </p>
      </div>
    </motion.div>
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
    <section style={{ paddingTop: '105px', paddingBottom: '32px', background: C.white, overflow: 'hidden' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 'calc(100vh - 105px - 32px)' }}>

        <div style={{ padding: '48px 32px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>

          {/* Line 1 — rotating */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <p style={{ ...S, fontSize: 'clamp(40px, 5.5vw, 80px)', fontWeight: 500, color: C.black, letterSpacing: '-1.5px', lineHeight: 1.2, margin: 0, display: 'flex', alignItems: 'baseline', overflow: 'hidden' }}>
              <span style={{ flexShrink: 0 }}>Still not sure&nbsp;</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={lineIndex}
                  style={{ display: 'inline-block', whiteSpace: 'nowrap', color: C.black }}
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 40, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {rotatingLines[lineIndex]}
                </motion.span>
              </AnimatePresence>
            </p>
          </div>

          {/* Line 2 — pondex_ highlight */}
          <motion.p
            style={{ ...S, fontSize: 'clamp(40px, 5.5vw, 80px)', fontWeight: 500, letterSpacing: '-1.5px', lineHeight: 1.0, margin: 0 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span style={{
              background: C.black, color: C.white, display: 'inline',
              WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone',
              padding: '0.04em 0.18em', borderRadius: '6px',
            }}>
              pondex_
            </span>
            {' '}
            <span style={{ color: C.black }}>gives you one verdict for your investments.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <BungeeButton href="#demo">Analyse a stock — it's free</BungeeButton>
            <a href="#how-it-works" style={{ ...S, fontSize: '17.6px', color: C[400], textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              How it works ↓
            </a>
          </motion.div>

          <motion.p
            style={{ ...M, fontSize: '11px', color: C[300], letterSpacing: '0.08em', textTransform: 'uppercase' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            No account required · Free forever · Every source cited
          </motion.p>

          {/* Score Card Visual */}
          <div style={{ marginTop: '32px', width: '100%', display: 'flex', justifyContent: 'center' }}>
            <ScoreCard />
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0 32px', marginBottom: '32px', position: 'relative' }}>
            <div style={{ position: 'absolute', left: '32px', display: 'flex', gap: '10px', ...M, fontSize: '14px', color: C[400] }}>
              <span>(</span><span>EUROPE</span><span>)</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', ...M, fontSize: '14px', color: C[400] }}>
              <span>LI</span><span>/</span><span>GH</span><span>/</span><span>X</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
