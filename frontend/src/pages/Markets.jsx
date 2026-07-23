import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AppNav from '../components/AppNav'
import { C } from '../lib/colors'
import { G, S, M } from '../lib/grid'
import { headline, btn, card } from '../lib/bungee'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const TICKERS = ['AAPL', 'NVDA', 'MSFT', 'TSLA', 'GOOGL', 'AMZN']

const POPULAR = ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'AMZN', 'TSLA']

const COLLECTIONS = [
  { name: 'Big Tech',       tickers: ['AAPL', 'MSFT', 'GOOGL', 'META', 'AMZN'] },
  { name: 'Semiconductors', tickers: ['NVDA', 'AMD', 'INTC', 'ASML'] },
  { name: 'EV & Energy',    tickers: ['TSLA'] },
  { name: 'Streaming',      tickers: ['NFLX', 'META'] },
]

const EVENTS = [
  { date: 'Jul 29', ticker: 'AAPL', event: 'Earnings Call',    type: 'earnings' },
  { date: 'Jul 30', ticker: 'META', event: 'Earnings Call',    type: 'earnings' },
  { date: 'Aug 1',  ticker: 'AMZN', event: 'Earnings Call',    type: 'earnings' },
  { date: 'Aug 15', ticker: 'NVDA', event: 'Ex-Dividend Date', type: 'dividend' },
  { date: 'Aug 26', ticker: 'NVDA', event: 'Earnings Call',    type: 'earnings' },
]

// ── Calendar View ─────────────────────────────────────────────────────────
function CalendarView({ events }) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear]   = useState(today.getFullYear())

  const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const DAY_NAMES   = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

  // Parse events into {day-month-year: [events]} lookup
  const eventMap = {}
  const allEvents = [
    ...events,
    { date: 'Jul 22', ticker: 'MSFT', event: 'Earnings Call',    type: 'earnings' },
    { date: 'Jul 25', ticker: 'AMZN', event: 'Earnings Call',    type: 'earnings' },
    { date: 'Aug 1',  ticker: 'AMZN', event: 'Ex-Dividend',      type: 'dividend' },
    { date: 'Aug 26', ticker: 'NVDA', event: 'Earnings Call',    type: 'earnings' },
    { date: 'Sep 7',  ticker: 'US',   event: 'Market Closed',    type: 'holiday' },
    { date: 'Sep 15', ticker: 'AAPL', event: 'Ex-Dividend Date', type: 'dividend' },
  ]

  allEvents.forEach(ev => {
    const parts = ev.date.split(' ')
    const month = MONTH_NAMES.findIndex(m => m.startsWith(parts[0]))
    const day   = parseInt(parts[1])
    const key   = `${currentYear}-${month}-${day}`
    if (!eventMap[key]) eventMap[key] = []
    eventMap[key].push(ev)
  })

  // Build days array for the month
  const firstDay = new Date(currentYear, currentMonth, 1)
  const lastDay  = new Date(currentYear, currentMonth + 1, 0)
  const startDow = (firstDay.getDay() + 6) % 7 // Mon=0
  const totalDays = lastDay.getDate()
  const cells = []

  for (let i = 0; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= totalDays; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const typeColor = {
    earnings: { bg: '#f5f3ff', text: '#7c3aed', dot: '#7c3aed' },
    dividend: { bg: '#f0fdf4', text: '#16a34a', dot: '#16a34a' },
    holiday:  { bg: C[100],    text: C[400],    dot: C[400] },
  }

  const prevMonth = () => { if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y-1) } else setCurrentMonth(m => m-1) }
  const nextMonth = () => { if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y+1) } else setCurrentMonth(m => m+1) }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 4px' }}>[ Calendar ]</p>
          <h2 style={{ ...S, fontSize: '28px', fontWeight: 500, letterSpacing: '-1px', color: C.black, margin: 0 }}>
            {MONTH_NAMES[currentMonth]} {currentYear}
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Legend */}
          <div style={{ display: 'flex', gap: '16px', marginRight: '24px' }}>
            {[['earnings','#7c3aed','E Earnings'],['dividend','#16a34a','D Dividend'],['holiday',C[400],'Holiday']].map(([type,color,label]) => (
              <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color }} />
                <span style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
              </div>
            ))}
          </div>
          <button onClick={prevMonth} style={{ ...M, fontSize: '16px', background: C[100], border: 'none', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', color: C.black }}>←</button>
          <button onClick={nextMonth} style={{ ...M, fontSize: '16px', background: C[100], border: 'none', borderRadius: '8px', padding: '8px 14px', cursor: 'pointer', color: C.black }}>→</button>
        </div>
      </div>

      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '0', borderBottom: `2px solid ${C.black}` }}>
        {DAY_NAMES.map(d => (
          <div key={d} style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 0 12px 12px' }}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {cells.map((day, i) => {
          const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
          const dayEvents = day ? (eventMap[`${currentYear}-${currentMonth}-${day}`] || []) : []
          const isWeekend = (i % 7) >= 5

          return (
            <div key={i} style={{
              minHeight: '100px',
              padding: '10px 12px',
              borderBottom: `1px solid ${C[100]}`,
              borderRight: (i % 7) < 6 ? `1px solid ${C[100]}` : 'none',
              background: day ? (isWeekend ? '#fafafa' : C.white) : C[100],
              position: 'relative',
            }}>
              {day && (
                <>
                  <span style={{
                    ...M, fontSize: '12px', fontWeight: isToday ? 700 : 400,
                    color: isToday ? C.white : isWeekend ? C[300] : C[600],
                    background: isToday ? C.black : 'transparent',
                    width: '22px', height: '22px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: '50%',
                  }}>{day}</span>

                  <div style={{ marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {dayEvents.map((ev, ei) => {
                      const colors = typeColor[ev.type] || typeColor.holiday
                      return (
                        <div key={ei} style={{
                          background: colors.bg,
                          borderRadius: '4px',
                          padding: '2px 6px',
                          display: 'flex', alignItems: 'center', gap: '4px',
                        }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: colors.dot, flexShrink: 0 }} />
                          <span style={{ ...M, fontSize: '9px', color: colors.text, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {ev.ticker} {ev.event.split(' ')[0]}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Markets() {
  const navigate = useNavigate()
  const user = (() => { try { return JSON.parse(localStorage.getItem('pondex_user')) } catch { return null } })()
  const logout = () => { localStorage.removeItem('pondex_user'); navigate('/') }
  const [quotes, setQuotes]   = useState({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ['Top Movers', 'Popular Stocks', 'Collections', 'News', 'Calendar']

  useEffect(() => {
    Promise.all(TICKERS.map(t => fetch(`${API}/quote/${t}`).then(r => r.json()).catch(() => null)))
      .then(res => {
        const map = {}
        res.forEach((q, i) => { if (q) map[TICKERS[i]] = q })
        setQuotes(map)
        setLoading(false)
      })
  }, [])

  const sorted  = Object.entries(quotes).sort((a, b) => Math.abs(b[1].changePercent) - Math.abs(a[1].changePercent))
  const gainers = sorted.filter(([, q]) => q.changePercent >= 0)
  const losers  = sorted.filter(([, q]) => q.changePercent < 0)
  const popularDisplay = POPULAR.map(t => quotes[t] ? [t, quotes[t]] : null).filter(Boolean)
  const display = activeTab === 0 ? [...gainers.slice(0, 6), ...losers.slice(0, 6)]
                : activeTab === 1 ? popularDisplay
                : []

  return (
    <div style={{ minHeight: '100vh', background: C.white }}>
      <AppNav userEmail={user?.email} onLogout={logout} />
      <main style={{ paddingTop: G.nav.height, maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>

        {/* Header */}
        <div style={{ padding: '56px 32px 0', borderBottom: `1px solid ${C[100]}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '32px' }}>
            <div>
              <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 12px' }}>[ Markets ]</p>
              <h1 style={{ ...headline.xl, margin: 0 }}>What's moving today.</h1>
            </div>
            {!loading && (
              <div style={{ display: 'flex', gap: '32px', paddingBottom: '8px' }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ ...M, fontSize: '10px', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>Gainers</p>
                  <p style={{ ...headline.lg, color: '#16a34a', margin: 0 }}>{gainers.length}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ ...M, fontSize: '10px', color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>Losers</p>
                  <p style={{ ...headline.lg, color: '#dc2626', margin: 0 }}>{losers.length}</p>
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex' }}>
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

        <AnimatePresence mode="wait">

          {activeTab <= 1 && (
            <motion.div key="movers" style={{ padding: '40px 32px' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
                  {[...Array(12)].map((_, i) => <div key={i} style={{ height: '110px', background: C[100], borderRadius: '12px' }} />)}
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
                  {display.map(([ticker, q], i) => {
                    const up = q.changePercent >= 0
                    return (
                      <motion.div key={ticker}
                        style={{ ...card.base, padding: '20px', cursor: 'pointer' }}
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                        whileHover={{ borderColor: C.black }}
                        onClick={() => navigate(`/app/stock?ticker=${ticker}`)}
                      >
                        <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 6px' }}>{ticker}</p>
                        <p style={{ ...S, fontSize: '14px', fontWeight: 500, color: C.black, margin: '0 0 12px' }}>{q.companyName?.split(' ')[0]}</p>
                        <p style={{ ...M, fontSize: '15px', fontWeight: 600, color: up ? '#16a34a' : '#dc2626', margin: '0 0 4px' }}>
                          {up ? '+' : ''}{parseFloat(q.changePercent).toFixed(2)}%
                        </p>
                        <p style={{ ...M, fontSize: '12px', color: C[400], margin: 0 }}>${parseFloat(q.price).toFixed(2)}</p>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          )}

          {/* Collections */}
          {activeTab === 2 && (
            <motion.div key="col" style={{ padding: '40px 32px' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
                {COLLECTIONS.map((col, i) => (
                  <motion.div key={col.name}
                    style={{ ...card.muted, cursor: 'pointer', padding: '32px 24px' }}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                    whileHover={{ background: C[200] }}
                  >
                    <p style={{ ...headline.sm, margin: '0 0 16px' }}>{col.name}</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {col.tickers.map(t => (
                        <span key={t} style={{ ...M, fontSize: '10px', color: C[500], background: C.white, padding: '3px 8px', borderRadius: '4px' }}>{t}</span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* News */}
          {activeTab === 3 && (
            <motion.div key="news" style={{ padding: '80px 32px', textAlign: 'center' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>[ Market News ]</p>
              <p style={{ ...headline.md, color: C[300], margin: '0 0 12px' }}>News coming in Phase 2.</p>
              <p style={{ ...S, fontSize: '14px', color: C[400] }}>Requires NewsAPI key.</p>
            </motion.div>
          )}

          {/* Calendar */}
          {activeTab === 4 && (
            <motion.div key="cal" style={{ padding: '40px 32px' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <CalendarView events={EVENTS} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
