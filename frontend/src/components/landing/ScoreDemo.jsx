import { animate } from 'framer-motion'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { BungeeButton } from './BungeeButton'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

const factors = [
  { name: 'Fundamentals', score: 3.8, fill: 76, explanation: 'Revenue growing 122% YoY. Gross margin 72.7% — above sector avg of 48%.', source: 'Yahoo Finance · TTM' },
  { name: 'Valuation', score: 2.1, fill: 42, explanation: 'P/E of 68x is elevated. Priced for continued hyper-growth.', source: 'Yahoo Finance · TTM' },
  { name: 'Management', score: 4.2, fill: 84, explanation: 'Insider buying exceeded insider selling 3:1 over the past 6 months.', source: 'SEC EDGAR · Form 4' },
  { name: 'Economic Moat', score: 4.5, fill: 90, explanation: 'Gross margin trending upward for 5 consecutive quarters.', source: 'Yahoo Finance · TTM' },
  { name: 'Risk Profile', score: 3.0, fill: 60, explanation: 'Beta 1.68 — moderate-high volatility.', source: 'Yahoo Finance · Market Data' },
]

function AnimatedScore({ target }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        animate(0, target, {
          duration: 1.2,
          ease: 'easeOut',
          onUpdate: v => setDisplay(Math.round(v)),
        })
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref}>{display}</span>
}

export default function ScoreDemo() {
  return (
    <section id="demo" style={{ paddingTop: '32px', paddingBottom: '120px', background: '#ffffff' }}>
      <div className="bungee-container">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
          <div>
            <p style={{ ...M, fontSize: '14px', color: '#5a6271', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>[ Try it ]</p>
            <h2 style={{ ...S, fontSize: 'clamp(40px, 4vw, 60px)', fontWeight: 500, letterSpacing: '-1.2px', lineHeight: '1.05', color: '#1e1e1e' }}>
              See what a real<br />verdict looks like.
            </h2>
          </div>
          <BungeeButton href="#">Analyse your first stock</BungeeButton>
        </div>

        <motion.div
          style={{ border: '1px solid #d0d8e4', borderRadius: '32px', overflow: 'hidden' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 40px', borderBottom: '1px solid #d0d8e4' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <p style={{ ...M, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#5a6271' }}>NVDA · NVIDIA Corporation</p>
                <span style={{ ...M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', border: '1px solid #d0d8e4', color: 'rgba(30,30,30,0.3)', padding: '2px 8px', borderRadius: '50px' }}>[DEMO]</span>
              </div>
              <p style={{ ...S, fontSize: '15px', color: '#5a6271' }}>$207.06 · <span style={{ color: '#16a34a' }}>▲ 2.1%</span></p>
            </div>
          </div>

          {/* Score */}
          <div style={{ padding: '32px 40px', borderBottom: '1px solid #d0d8e4' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '8px' }}>
              <span style={{ ...S, fontSize: '80px', fontWeight: 500, color: '#F4B183', lineHeight: 1 }}>
                <AnimatedScore target={71} />
              </span>
              <span style={{ ...S, fontSize: '32px', color: 'rgba(30,30,30,0.2)' }}>/100</span>
            </div>
            <p style={{ ...M, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F4B183' }}>
              Good Fit — Value Strategy
            </p>
          </div>

          {/* Factors */}
          <div>
            {factors.map((f, i) => (
              <motion.div
                key={f.name}
                style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', padding: '20px 40px', borderBottom: i < factors.length - 1 ? '1px solid #d0d8e4' : 'none' }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <div style={{ width: '200px', flexShrink: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ ...S, fontSize: '15px', fontWeight: 500, color: '#1e1e1e' }}>{f.name}</span>
                    <span style={{ ...M, fontSize: '12px', color: '#5a6271' }}>{f.score}/5</span>
                  </div>
                  <div style={{ height: '3px', background: '#d0d8e4', borderRadius: '50px', overflow: 'hidden' }}>
                    <motion.div
                      style={{ height: '100%', borderRadius: '50px', background: 'var(--gradient-brand)' }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${f.fill}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 + 0.2, duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>
                <div>
                  <p style={{ ...S, fontSize: '14px', color: 'rgba(30,30,30,0.8)', marginBottom: '4px' }}>{f.explanation}</p>
                  <p style={{ ...M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(30,30,30,0.3)' }}>Source · {f.source}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ padding: '16px 40px', background: '#f5f5f5' }}>
            <p style={{ ...M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(30,30,30,0.3)' }}>
              Data: Yahoo Finance · SEC EDGAR · Updated: July 2026 · ⚠ Research tool only. Not financial advice.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
