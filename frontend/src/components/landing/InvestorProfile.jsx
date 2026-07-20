import { useState } from 'react'
import { motion } from 'framer-motion'
import { C } from '../../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

const strategies = [
  {
    id: 'value',
    label: 'Value Investor',
    description: 'You look for undervalued companies trading below intrinsic value. Low P/E, high FCF yield, margin of safety.',
    weights: { fundamentals: 70, valuation: 20, moat: 5, risk: 5 },
    example: { ticker: 'AAPL', score: 74, note: 'Fair value at P/E 28x — below sector avg' },
  },
  {
    id: 'growth',
    label: 'Growth Investor',
    description: 'You prioritize revenue growth and market expansion over current profitability. High P/E is acceptable.',
    weights: { fundamentals: 50, valuation: 10, moat: 30, risk: 10 },
    example: { ticker: 'NVDA', score: 82, note: '+122% YoY revenue — strong growth trajectory' },
  },
  {
    id: 'dividend',
    label: 'Dividend Investor',
    description: 'You focus on stable income through dividends. Consistent payouts, low volatility, strong cash flow.',
    weights: { fundamentals: 55, valuation: 10, moat: 10, risk: 25 },
    example: { ticker: 'MSFT', score: 88, note: '13 years of dividend growth, Beta 0.9' },
  },
  {
    id: 'momentum',
    label: 'Momentum Investor',
    description: 'You follow price trends and market signals. Valuation and technicals drive your decisions.',
    weights: { fundamentals: 50, valuation: 30, moat: 10, risk: 10 },
    example: { ticker: 'GOOGL', score: 79, note: 'P/E 22x — attractive momentum entry point' },
  },
]

export default function InvestorProfile() {
  const [active, setActive] = useState('value')
  const current = strategies.find(s => s.id === active)

  return (
    <section style={{ paddingTop: '80px', paddingBottom: '80px', background: C.white }}>
      <div className="bungee-container">

        <motion.div
          style={{ marginBottom: '48px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p style={{ ...M, fontSize: '13px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>[ Your score, your strategy ]</p>
          <h2 style={{ ...S, fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-1.5px', lineHeight: 1.05, color: C.black }}>
            Same stock.<br />Different verdict.
          </h2>
          <p style={{ ...S, fontSize: '17px', color: C[400], marginTop: '16px', maxWidth: '520px', lineHeight: 1.6 }}>
            Your score is weighted to your investing strategy. A value investor and a growth investor see different numbers for the same stock — because they should.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>

          {/* Strategy selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {strategies.map(s => (
              <motion.button
                key={s.id}
                onClick={() => setActive(s.id)}
                style={{
                  textAlign: 'left',
                  padding: '20px 24px',
                  borderRadius: '16px',
                  border: `1px solid ${active === s.id ? C.black : C[200]}`,
                  background: active === s.id ? C.black : C.white,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                whileHover={{ scale: 1.01 }}
              >
                <p style={{ ...S, fontSize: '15px', fontWeight: 500, color: active === s.id ? C.white : C.black, marginBottom: '4px' }}>
                  {s.label}
                </p>
                <p style={{ ...S, fontSize: '13px', color: active === s.id ? 'rgba(255,255,255,0.6)' : C[400], lineHeight: 1.5 }}>
                  {s.description}
                </p>
              </motion.button>
            ))}
          </div>

          {/* Score preview */}
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'sticky', top: '96px' }}
          >
            <div style={{ background: C[100], borderRadius: '20px', padding: '32px', border: `1px solid ${C[200]}` }}>
              <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>
                {current.example.ticker} · as a {current.label}
              </p>

              {/* Big score */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '8px' }}>
                <span style={{ ...S, fontSize: '72px', fontWeight: 500, lineHeight: 1, color: current.example.score >= 70 ? '#16a34a' : current.example.score >= 50 ? '#d97706' : '#dc2626' }}>
                  {current.example.score}
                </span>
                <span style={{ ...S, fontSize: '24px', color: C[200] }}>/100</span>
              </div>
              <p style={{ ...S, fontSize: '14px', color: C[500], marginBottom: '24px' }}>
                {current.example.note}
              </p>

              {/* Weight breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em' }}>Score weights</p>
                {Object.entries(current.weights).map(([key, pct]) => (
                  <div key={key}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ ...S, fontSize: '12px', color: C[500], textTransform: 'capitalize' }}>{key}</span>
                      <span style={{ ...M, fontSize: '11px', color: C[400] }}>{pct}%</span>
                    </div>
                    <div style={{ height: '3px', background: C[200], borderRadius: '50px', overflow: 'hidden' }}>
                      <motion.div
                        style={{ height: '100%', background: C[600], borderRadius: '50px' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
