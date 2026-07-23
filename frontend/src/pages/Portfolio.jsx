import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import AppNav from '../components/AppNav'
import { C } from '../lib/colors'
import { G, S, M } from '../lib/grid'
import { headline, btn, card } from '../lib/bungee'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const WATCHLIST = ['AAPL', 'NVDA', 'MSFT', 'TSLA']

export default function Portfolio() {
  const navigate = useNavigate()
  const user = (() => { try { return JSON.parse(localStorage.getItem('pondex_user')) } catch { return null } })()
  const logout = () => { localStorage.removeItem('pondex_user'); navigate('/') }
  const [quotes, setQuotes] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ['Positions', 'Watchlist', 'Transactions', 'Account']

  useEffect(() => {
    Promise.all(WATCHLIST.map(t => fetch(`${API}/quote/${t}`).then(r => r.json()).catch(() => null)))
      .then(res => {
        const map = {}
        res.forEach((q, i) => { if (q) map[WATCHLIST[i]] = q })
        setQuotes(map)
        setLoading(false)
      })
  }, [])

  const totalValue  = WATCHLIST.reduce((s, t) => s + (quotes[t]?.price || 0), 0)
  const totalChange = WATCHLIST.reduce((s, t) => s + (quotes[t]?.change || 0), 0)

  return (
    <div style={{ minHeight: '100vh', background: C.white }}>
      <AppNav userEmail={user?.email} onLogout={logout} />
      <main style={{ paddingTop: G.nav.height, maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>

        {/* Header */}
        <div style={{ padding: '56px 32px 0', borderBottom: `1px solid ${C[100]}` }}>
          <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 12px' }}>[ Portfolio ]</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '32px' }}>
            <h1 style={{ ...headline.xl, margin: 0 }}>Your investments.</h1>
            <div style={{ display: 'flex', gap: '40px', paddingBottom: '8px' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>Watchlist</p>
                <p style={{ ...headline.lg, margin: 0 }}>{loading ? '—' : WATCHLIST.length + ' stocks'}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>Today</p>
                <p style={{ ...headline.lg, margin: 0, color: totalChange >= 0 ? '#16a34a' : '#dc2626' }}>
                  {loading ? '—' : `${totalChange >= 0 ? '+' : ''}$${totalChange.toFixed(2)}`}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0' }}>
            {tabs.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)} style={{
                ...M, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em',
                color: activeTab === i ? C.black : C[400],
                background: 'none', border: 'none',
                borderBottom: activeTab === i ? `2px solid ${C.black}` : '2px solid transparent',
                padding: '18px 24px 16px', cursor: 'pointer', marginBottom: '-1px',
              }}>{tab}</button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '0 32px' }}>

          {/* Positions */}
          {activeTab === 0 && (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>[ No positions ]</p>
              <p style={{ ...headline.md, color: C[300], margin: '0 0 32px' }}>You have no open positions.</p>
              <button onClick={() => navigate('/app/stock?ticker=AAPL')} style={{ ...btn.primary }}>Analyse a stock →</button>
            </div>
          )}

          {/* Watchlist */}
          {activeTab === 1 && (
            <div style={{ marginTop: '0' }}>
              {/* Column headers */}
              <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px 160px 120px 100px', gap: '0', padding: '16px 0 12px', borderBottom: `1px solid ${C[200]}` }}>
                {['Ticker', 'Company', 'Price', 'Change', 'Sector', ''].map(h => (
                  <span key={h} style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</span>
                ))}
              </div>
              {WATCHLIST.map((ticker, i) => {
                const q = quotes[ticker]
                const up = (q?.changePercent || 0) >= 0
                return (
                  <motion.div key={ticker}
                    style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px 160px 120px 100px', gap: '0', padding: '18px 0', borderBottom: `1px solid ${C[100]}`, alignItems: 'center', cursor: 'pointer' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    onClick={() => navigate(`/app/stock?ticker=${ticker}`)}
                    whileHover={{ background: C[100], paddingLeft: '8px' }}
                  >
                    <span style={{ ...M, fontSize: '13px', fontWeight: 600, color: C.black }}>{ticker}</span>
                    <span style={{ ...S, fontSize: '14px', color: C[600] }}>{q?.companyName || '—'}</span>
                    <span style={{ ...M, fontSize: '14px', fontWeight: 500, color: C.black }}>{q?.price ? `$${parseFloat(q.price).toFixed(2)}` : '—'}</span>
                    <span style={{ ...M, fontSize: '13px', fontWeight: 600, color: up ? '#16a34a' : '#dc2626' }}>
                      {q?.change != null ? `${up ? '+' : ''}${parseFloat(q.change).toFixed(2)} (${parseFloat(q.changePercent).toFixed(2)}%)` : '—'}
                    </span>
                    <span style={{ ...M, fontSize: '12px', color: C[400] }}>{q?.sector || '—'}</span>
                    <button onClick={e => { e.stopPropagation(); navigate(`/app/stock?ticker=${ticker}`) }} style={{ ...btn.primary, fontSize: '11px', padding: '6px 14px' }}>
                      Analyse
                    </button>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Transactions */}
          {activeTab === 2 && (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>[ No transactions ]</p>
              <p style={{ ...headline.md, color: C[300], margin: 0 }}>No buy/sell history yet.</p>
            </div>
          )}

          {/* Account */}
          {activeTab === 3 && (
            <div style={{ padding: '48px 0', maxWidth: '480px' }}>
              <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 24px' }}>[ Account ]</p>
              <div style={{ ...card.base, padding: '32px' }}>
                <p style={{ ...S, fontSize: '18px', fontWeight: 500, color: C.black, margin: '0 0 4px' }}>{user?.email || '—'}</p>
                <p style={{ ...M, fontSize: '12px', color: C[400], margin: '0 0 32px' }}>Free tier</p>
                <div style={{ height: '1px', background: C[100], margin: '0 0 24px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { label: 'Available balance', value: '—' },
                    { label: 'Plan', value: 'Free' },
                    { label: 'Member since', value: '2026' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ ...M, fontSize: '12px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</span>
                      <span style={{ ...S, fontSize: '14px', color: C.black }}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ height: '1px', background: C[100], margin: '24px 0' }} />
                <button onClick={logout} style={{ ...btn.primary, width: '100%' }}>Log out</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
