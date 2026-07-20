import { useState } from 'react'
import { motion } from 'framer-motion'
import { BungeeButton } from './BungeeButton'
import { C } from '../../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

const plans = {
  monthly: { free: '€0', pro: '€4.99', period: '/month', original: null },
  yearly:  { free: '€0', pro: '€49.99', period: '/year', original: '€59.88' },
}
const freeFeatures = ['1 full verdict per day', 'Source attribution on every number', 'Plain-language explanations', 'Price chart (1d/1m/3m/1y/max)', 'No account required']
const proFeatures  = ['Unlimited verdicts', 'Peer comparison (2 companies + sector avg)', 'DCF model + stress test', 'Watchlist + portfolio tracker', 'Weekly digest email', 'AI chat with source attribution']

export default function Pricing() {
  const [billing, setBilling] = useState('monthly')

  return (
    <section id="pricing" style={{ paddingTop: '32px', paddingBottom: '120px', background: C.white }}>
      <div className="bungee-container">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <p style={{ ...M, fontSize: '14px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>[ Pricing ]</p>
            <h2 style={{ ...S, fontSize: 'clamp(40px, 4vw, 60px)', fontWeight: 500, letterSpacing: '-1.2px', lineHeight: '1.05', color: C.black }}>
              Start free.<br />Upgrade when you need more.
            </h2>
          </div>
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
          {['monthly', 'yearly'].map(b => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              style={{
                ...M, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em',
                padding: '8px 20px', borderRadius: '50px', cursor: 'pointer',
                background: billing === b ? C.black : 'transparent',
                color: billing === b ? C.white : C[400],
                border: `1px solid ${billing === b ? C.black : C[200]}`,
                transition: 'all 0.2s',
              }}
            >
              {b === 'yearly' ? 'Yearly −17%' : 'Monthly'}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Free */}
          <motion.div
            style={{ padding: '40px', border: `1px solid ${C[200]}`, borderRadius: '40px', display: 'flex', flexDirection: 'column' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p style={{ ...M, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: C[400], marginBottom: '24px' }}>Free</p>
            <div style={{ marginBottom: '32px' }}>
              <span style={{ ...S, fontSize: '48px', fontWeight: 500, color: C.black, lineHeight: 1 }}>{plans[billing].free}</span>
              <span style={{ ...S, fontSize: '18px', color: C[400] }}>{plans[billing].period}</span>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px', flex: 1 }}>
              {freeFeatures.map(f => (
                <li key={f} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: C[400], marginTop: '2px' }}>—</span>
                  <span style={{ ...S, fontSize: '15px', color: C[400] }}>{f}</span>
                </li>
              ))}
            </ul>
            <BungeeButton href="/signup">Start for free</BungeeButton>
          </motion.div>

          {/* Pro */}
          <motion.div
            style={{ padding: '40px', background: C.black, borderRadius: '40px', display: 'flex', flexDirection: 'column' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <p style={{ ...M, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: `rgba(255,255,255,0.4)` }}>Pro</p>
              <span style={{ ...M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em', background: C[200], color: C.black, padding: '4px 12px', borderRadius: '50px' }}>Most popular</span>
            </div>
            <div style={{ marginBottom: '32px' }}>
              {plans[billing].original && <span style={{ ...S, fontSize: '18px', color: 'rgba(255,255,255,0.25)', textDecoration: 'line-through', marginRight: '8px' }}>{plans[billing].original}</span>}
              <span style={{ ...S, fontSize: '48px', fontWeight: 500, color: C.white, lineHeight: 1 }}>{plans[billing].pro}</span>
              <span style={{ ...S, fontSize: '18px', color: 'rgba(255,255,255,0.4)' }}>{plans[billing].period}</span>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px', flex: 1 }}>
              {proFeatures.map(f => (
                <li key={f} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ color: C[200], marginTop: '2px' }}>—</span>
                  <span style={{ ...S, fontSize: '15px', color: 'rgba(255,255,255,0.8)' }}>{f}</span>
                </li>
              ))}
            </ul>
            <motion.a
              href="/signup"
              style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '16px', ...S, fontSize: '17.6px', fontWeight: 500, color: C.white, paddingBottom: '4px' }}
              whileHover="hover"
            >
              Start 7-day trial
              <motion.span variants={{ hover: { rotate: 90 } }} transition={{ duration: 0.2 }} style={{ fontSize: '20px', lineHeight: 1 }}>+</motion.span>
              <motion.div
                style={{ position: 'absolute', bottom: 0, left: 0, height: '1px', background: C.white, width: '0%' }}
                variants={{ rest: { width: '0%' }, hover: { width: '100%' } }}
                initial="initial"
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>
        </div>

        <p style={{ ...M, marginTop: '24px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: C[400] }}>
          No credit card required for free tier. Cancel anytime.
        </p>
      </div>
    </section>
  )
}
