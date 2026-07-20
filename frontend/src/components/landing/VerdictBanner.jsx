import { motion } from 'framer-motion'
import { C } from '../../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

const verdicts = [
  { label: 'BUY', color: '#16a34a', bg: 'rgba(22,163,74,0.08)', description: 'Strong fundamentals, fair valuation, positive momentum. The data supports adding this to your portfolio.' },
  { label: 'HOLD', color: '#d97706', bg: 'rgba(217,119,6,0.08)', description: 'Mixed signals. Not compelling enough to buy more, but no clear reason to sell. Monitor closely.' },
  { label: 'SELL', color: '#dc2626', bg: 'rgba(220,38,38,0.08)', description: 'Weak fundamentals, overvalued, or deteriorating business. The data suggests reducing exposure.' },
]

export default function VerdictBanner() {
  return (
    <section style={{ paddingTop: '80px', paddingBottom: '80px', background: C.white, borderTop: `1px solid ${C[100]}` }}>
      <div className="bungee-container">

        <motion.div
          style={{ marginBottom: '48px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p style={{ ...M, fontSize: '13px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>[ What the verdict means ]</p>
          <h2 style={{ ...S, fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-1.5px', lineHeight: 1.05, color: C.black }}>
            One clear direction.<br />Always sourced.
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {verdicts.map((v, i) => (
            <motion.div
              key={v.label}
              style={{
                padding: '32px',
                borderRadius: '20px',
                background: v.bg,
                border: `1px solid ${v.color}22`,
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div style={{
                display: 'inline-block',
                background: v.color,
                color: C.white,
                ...M, fontSize: '13px', fontWeight: 700,
                letterSpacing: '0.1em',
                padding: '5px 14px',
                borderRadius: '50px',
                marginBottom: '20px',
                textTransform: 'uppercase',
              }}>
                {v.label}
              </div>
              <p style={{ ...S, fontSize: '15px', color: C[600], lineHeight: 1.6 }}>
                {v.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          style={{ ...M, fontSize: '10px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '24px' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          ⚠ Not financial advice · Every verdict is based on publicly available data with named sources
        </motion.p>
      </div>
    </section>
  )
}
