import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AppNav from '../components/AppNav'
import { C } from '../lib/colors'
import { G, S, M } from '../lib/grid'
import { headline, stat, card, btn, row, divider } from '../lib/bungee'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const TOP_TICKERS = ['AAPL', 'NVDA', 'MSFT', 'TSLA', 'GOOGL', 'META']
const WATCHLIST   = ['AAPL', 'NVDA', 'MSFT', 'TSLA']

export default function Home() {
  const navigate = useNavigate()
  const user = (() => { try { return JSON.parse(localStorage.getItem('pondex_user')) } catch { return null } })()
  const logout = () => { localStorage.removeItem('pondex_user'); navigate('/') }
  const [quotes, setQuotes] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const all = [...new Set([...TOP_TICKERS, ...WATCHLIST])]
    Promise.all(all.map(t => fetch(`${API}/quote/${t}`).then(r => r.json()).catch(() => null)))
      .then(res => {
        const map = {}
        res.forEach((q, i) => { if (q) map[all[i]] = q })
        setQuotes(map)
        setLoading(false)
      })
  }, [])

  const portfolioValue  = WATCHLIST.reduce((s, t) => s + (quotes[t]?.price || 0), 0)
  const portfolioChange = WATCHLIST.reduce((s, t) => s + (quotes[t]?.change || 0), 0)

  const events = [
    { date: 'Jul 29', ticker: 'AAPL', event: 'Earnings Call',    type: 'earnings' },
    { date: 'Jul 30', ticker: 'META', event: 'Earnings Call',    type: 'earnings' },
    { date: 'Aug 15', ticker: 'NVDA', event: 'Ex-Dividend Date', type: 'dividend' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: C.white }}>
      <AppNav userEmail={user?.email} onLogout={logout} />
      <main style={{ paddingTop: G.nav.height, maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>

        {/* Header */}
        <div style={{ padding: '56px 32px 40px', borderBottom: `1px solid ${C[100]}` }}>
          <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 12px' }}>[ Home ]</p>
          <h1 style={{ ...headline.xl, margin: 0 }}>
            Good morning{user?.email ? `, ${user.email.split('@')[0]}` : ''}.
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', minHeight: 'calc(100vh - 200px)' }}>

          {/* Left */}
          <div style={{ borderRight: `1px solid ${C[100]}` }}>

            {/* Portfolio strip */}
            <div style={{ padding: '32px 32px', borderBottom: `1px solid ${C[100]}`, display: 'flex', gap: '64px', alignItems: 'flex-end' }}>
              <div>
                <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>Watchlist value</p>
                <p style={{ ...headline.xl, margin: 0, fontSize: '48px' }}>{loading ? '—' : `$${portfolioValue.toFixed(2)}`}</p>
              </div>
              <div style={{ paddingBottom: '6px' }}>
                <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>Today</p>
                <p style={{ ...headline.lg, margin: 0, color: portfolioChange >= 0 ? '#16a34a' : '#dc2626' }}>
                  {loading ? '—' : `${portfolioChange >= 0 ? '+' : ''}$${portfolioChange.toFixed(2)}`}
                </p>
              </div>
              <button onClick={() => navigate('/app/portfolio')} style={{ ...btn.link, marginBottom: '8px', marginLeft: 'auto' }}>
                View portfolio →
              </button>
            </div>

            {/* Top movers */}
            <div style={{ padding: '32px 32px', borderBottom: `1px solid ${C[100]}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
                <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>[ Top movers ]</p>
                <button onClick={() => navigate('/app/markets')} style={{ ...btn.link }}>Markets →</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {TOP_TICKERS.map((ticker, i) => {
                  const q = quotes[ticker]
                  const up = (q?.changePercent || 0) >= 0
                  return (
                    <motion.div key={ticker}
                      style={{ ...card.base, cursor: 'pointer', padding: '20px' }}
                      whileHover={{ borderColor: C.black }}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                      onClick={() => navigate(`/app/stock?ticker=${ticker}`)}
                    >
                      <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px' }}>{ticker}</p>
                      <p style={{ ...S, fontSize: '15px', fontWeight: 500, color: C.black, margin: '0 0 12px' }}>{q?.companyName?.split(' ')[0] || '—'}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <span style={{ ...M, fontSize: '13px', color: C[600] }}>{q?.price ? `$${parseFloat(q.price).toFixed(2)}` : '—'}</span>
                        <span style={{ ...M, fontSize: '14px', fontWeight: 600, color: up ? '#16a34a' : '#dc2626' }}>
                          {q?.changePercent != null ? `${up ? '+' : ''}${parseFloat(q.changePercent).toFixed(2)}%` : '—'}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Watchlist */}
            <div style={{ padding: '32px 32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0' }}>
                <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>[ Watchlist ]</p>
                <button onClick={() => navigate('/app/portfolio')} style={{ ...btn.link }}>Edit →</button>
              </div>
              {WATCHLIST.map((ticker, i) => {
                const q = quotes[ticker]
                const up = (q?.changePercent || 0) >= 0
                return (
                  <motion.div key={ticker}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: `1px solid ${C[100]}`, cursor: 'pointer' }}
                    onClick={() => navigate(`/app/stock?ticker=${ticker}`)}
                    whileHover={{ paddingLeft: '8px', transition: 'padding 0.15s' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 + i * 0.05 }}
                  >
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <span style={{ ...M, fontSize: '13px', fontWeight: 600, color: C.black, width: '48px' }}>{ticker}</span>
                      <span style={{ ...S, fontSize: '14px', color: C[500] }}>{q?.companyName?.split(' ').slice(0, 2).join(' ') || '—'}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                      <span style={{ ...M, fontSize: '14px', color: C.black, fontWeight: 500 }}>{q?.price ? `$${parseFloat(q.price).toFixed(2)}` : '—'}</span>
                      <span style={{ ...M, fontSize: '13px', fontWeight: 600, color: up ? '#16a34a' : '#dc2626', minWidth: '72px', textAlign: 'right' }}>
                        {q?.changePercent != null ? `${up ? '+' : ''}${parseFloat(q.changePercent).toFixed(2)}%` : '—'}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right sidebar */}
          <div>
            {/* Robo teaser */}
            <div style={{ ...card.dark, borderRadius: 0, padding: '32px' }}>
              <p style={{ ...M, fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 16px' }}>[ Robo Advisor ]</p>
              <p style={{ ...headline.md, color: C.white, margin: '0 0 8px' }}>Investing on autopilot.</p>
              <p style={{ ...S, fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: '0 0 24px', lineHeight: 1.6 }}>
                Set your goal — pondex builds and rebalances automatically.
              </p>
              <button onClick={() => navigate('/app/robo')} style={{ ...btn.primary, background: C.white, color: C.black, fontSize: '12px' }}>
                Get started →
              </button>
            </div>

            {/* Events */}
            <div style={{ padding: '28px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
                <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>[ Upcoming events ]</p>
                <button onClick={() => navigate('/app/markets')} style={{ ...btn.link }}>Calendar →</button>
              </div>
              {events.map((ev, i) => (
                <motion.div key={i}
                  style={{ padding: '14px 0', borderBottom: `1px solid ${C[100]}` }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.07 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ ...M, fontSize: '12px', fontWeight: 600, color: C.black }}>{ev.ticker}</span>
                    <span style={{ ...M, fontSize: '11px', color: C[400] }}>{ev.date}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ ...S, fontSize: '13px', color: C[500] }}>{ev.event}</span>
                    <span style={{
                      ...M, fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.1em',
                      color: ev.type === 'earnings' ? '#7c3aed' : '#16a34a',
                      background: ev.type === 'earnings' ? '#f5f3ff' : '#f0fdf4',
                      padding: '2px 8px', borderRadius: '50px',
                    }}>{ev.type}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
