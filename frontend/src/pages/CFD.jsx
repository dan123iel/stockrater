import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import AppNav from '../components/AppNav'
import { C } from '../lib/colors'
import { G, S, M } from '../lib/grid'
import { headline, btn, card } from '../lib/bungee'

const STATS = [
  { label: 'Max Leverage', value: '1:30' },
  { label: 'Markets',      value: '500+' },
  { label: 'Min Spread',   value: '0.1 pip' },
  { label: 'Execution',    value: '<10ms' },
]

const INSTRUMENTS = [
  { name: 'S&P 500',   type: 'Index',     lev: '1:20', spread: '0.4', change: '+0.82%', up: true },
  { name: 'NASDAQ',    type: 'Index',     lev: '1:20', spread: '0.5', change: '+1.24%', up: true },
  { name: 'EUR/USD',   type: 'Forex',     lev: '1:30', spread: '0.1', change: '-0.12%', up: false },
  { name: 'Gold',      type: 'Commodity', lev: '1:20', spread: '0.3', change: '+0.44%', up: true },
  { name: 'Oil (WTI)', type: 'Commodity', lev: '1:10', spread: '0.5', change: '-1.02%', up: false },
  { name: 'BTC/USD',   type: 'Crypto',    lev: '1:2',  spread: '0.8', change: '+2.18%', up: true },
]

export default function CFD() {
  const navigate = useNavigate()
  const user = (() => { try { return JSON.parse(localStorage.getItem('pondex_user')) } catch { return null } })()
  const logout = () => { localStorage.removeItem('pondex_user'); navigate('/') }

  return (
    <div style={{ minHeight: '100vh', background: C.white }}>
      <AppNav userEmail={user?.email} onLogout={logout} />
      <main style={{ paddingTop: G.nav.height, maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>

        {/* Header */}
        <div style={{ padding: '56px 32px 40px', borderBottom: `1px solid ${C[100]}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 12px' }}>[ CFD ]</p>
              <h1 style={{ ...headline.xl, margin: 0 }}>Trade with leverage.</h1>
            </div>
            <p style={{ ...S, fontSize: '15px', color: C[400], maxWidth: '320px', lineHeight: 1.6, margin: 0 }}>
              Contracts for Difference on stocks, indices, forex, and commodities.
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: `1px solid ${C[100]}` }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ padding: '32px 32px', borderRight: i < 3 ? `1px solid ${C[100]}` : 'none' }}>
              <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 10px' }}>{s.label}</p>
              <p style={{ ...headline.lg, margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>

        <div style={{ padding: '40px 32px' }}>

          {/* Risk warning */}
          <motion.div
            style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '14px 20px', marginBottom: '40px' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <p style={{ ...M, fontSize: '11px', color: '#dc2626', letterSpacing: '0.02em', margin: 0, lineHeight: 1.7 }}>
              ⚠ <strong>Risk Warning:</strong> CFDs are complex instruments with a high risk of losing money due to leverage.
              Most retail investors lose money trading CFDs. pondex_ does not provide investment advice.
            </p>
          </motion.div>

          {/* Instruments table */}
          <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '20px' }}>[ Available instruments ]</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px 100px 120px', gap: '0', borderBottom: `1px solid ${C[200]}`, paddingBottom: '12px', marginBottom: '0' }}>
            {['Instrument', 'Type', 'Leverage', 'Spread', 'Change', ''].map(h => (
              <span key={h} style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</span>
            ))}
          </div>
          {INSTRUMENTS.map((inst, i) => (
            <motion.div key={inst.name}
              style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 100px 100px 120px', gap: '0', padding: '18px 0', borderBottom: `1px solid ${C[100]}`, alignItems: 'center' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
            >
              <span style={{ ...S, fontSize: '15px', fontWeight: 500, color: C.black }}>{inst.name}</span>
              <span style={{ ...M, fontSize: '11px', color: C[400], background: C[100], padding: '3px 8px', borderRadius: '4px', display: 'inline-block' }}>{inst.type}</span>
              <span style={{ ...M, fontSize: '13px', color: C[600] }}>{inst.lev}</span>
              <span style={{ ...M, fontSize: '13px', color: C[600] }}>{inst.spread}</span>
              <span style={{ ...M, fontSize: '14px', fontWeight: 600, color: inst.up ? '#16a34a' : '#dc2626' }}>{inst.change}</span>
              <span style={{ ...M, fontSize: '11px', color: C[300] }}>Coming soon</span>
            </motion.div>
          ))}

          {/* Phase CTA */}
          <motion.div
            style={{ ...card.dark, display: 'grid', gridTemplateColumns: '1fr auto', gap: '48px', alignItems: 'center', padding: '40px 48px', marginTop: '48px' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          >
            <div>
              <p style={{ ...M, fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 12px' }}>Coming in Phase 4</p>
              <p style={{ ...headline.lg, color: C.white, margin: 0 }}>Full CFD execution engine.<br />Real leverage. Coming soon.</p>
            </div>
            <Link to="/signup" style={{ ...btn.primary, background: C.white, color: C.black, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
              Join waitlist →
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
