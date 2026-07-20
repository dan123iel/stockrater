import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { C } from '../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// ── API call ─────────────────────────────────────────────────────────────────
async function fetchScore(ticker) {
  const [scoreRes, quoteRes] = await Promise.all([
    fetch(`${API}/score/${ticker}`),
    fetch(`${API}/quote/${ticker}`),
  ])
  if (!scoreRes.ok) throw new Error(`Ticker "${ticker}" not found`)
  const score = await scoreRes.json()
  const quote = quoteRes.ok ? await quoteRes.json() : {}

  const s100 = Math.round(Math.min(score.fitScore * 20, 100))
  const verdict = s100 >= 70 ? 'BUY' : s100 >= 50 ? 'HOLD' : 'SELL'
  const label = s100 >= 80 ? 'Strong Fit' : s100 >= 65 ? 'Good Fit' : s100 >= 45 ? 'Moderate Fit' : 'Weak Fit'

  const FACTOR_NAMES = {
    ratios: 'Fundamentals', moat: 'Moat',
    esgRisk: 'Risk', valuation: 'Valuation', management: 'Management',
  }

  const factors = Object.entries(score.scores || {})
    .filter(([, v]) => v !== null && v !== undefined)
    .map(([key, val]) => {
      const factorScore = Math.round(val * 20)
      const sourceEntries = (score.sources || []).find(s => s.factor === key)?.metrics || []
      const topSource = sourceEntries[0]
      return {
        name: FACTOR_NAMES[key] || key,
        score: factorScore,
        explanation: (score.explanations || {})[key] || '',
        source: topSource?.source?.split('–')[0]?.trim() || 'Yahoo Finance',
        date: topSource?.source?.split('–')[1]?.trim() || 'TTM',
      }
    })

  const price = quote.price ? `$${parseFloat(quote.price).toFixed(2)}` : '—'

  return {
    ticker: ticker.toUpperCase(),
    name: quote.companyName || ticker.toUpperCase(),
    exchange: quote.exchangeShortName || '',
    price,
    score: s100,
    verdict,
    label,
    color: s100 >= 70 ? '#16a34a' : s100 >= 45 ? '#d97706' : '#dc2626',
    summary: score.explanations?.ratios || '',
    factors,
    confidence: score.confidence,
  }
}

function verdictColor(v) {
  if (v === 'BUY')  return '#16a34a'
  if (v === 'HOLD') return '#d97706'
  return '#dc2626'
}

function GaugeMini({ score }) {
  const color = score >= 70 ? '#16a34a' : score >= 45 ? '#d97706' : '#dc2626'
  const R = 52, cx = 60, cy = 60
  const angle = 180 - (score / 100) * 180
  const toRad = d => (d * Math.PI) / 180
  const arcPath = (from, to) => {
    const x1 = cx + R * Math.cos(toRad(from)), y1 = cy - R * Math.sin(toRad(from))
    const x2 = cx + R * Math.cos(toRad(to)),   y2 = cy - R * Math.sin(toRad(to))
    return `M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`
  }
  const nx = cx + (R - 8) * Math.cos(toRad(angle))
  const ny = cy - (R - 8) * Math.sin(toRad(angle))
  return (
    <svg width="120" height="65" viewBox="0 0 120 65" style={{ overflow: 'visible' }}>
      <path d={arcPath(180, 0)} fill="none" stroke={C[100]} strokeWidth="8" strokeLinecap="round" />
      <motion.path d={arcPath(180, angle)} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, ease: 'easeOut' }} />
      <motion.line x1={cx} y1={cy} x2={nx} y2={ny} stroke={color} strokeWidth="2" strokeLinecap="round"
        initial={{ rotate: -180 }} animate={{ rotate: 0 }} transition={{ duration: 1, ease: 'easeOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }} />
      <circle cx={cx} cy={cy} r="4" fill={color} />
    </svg>
  )
}

function FactorRow({ factor, index }) {
  const pct = (factor.score / 100) * 100
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.08 }}
      style={{ padding: '16px 0', borderBottom: `1px solid ${C[100]}` }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'baseline' }}>
        <span style={{ ...S, fontSize: '15px', fontWeight: 500, color: C.black }}>{factor.name}</span>
        <span style={{ ...M, fontSize: '12px', color: C[400] }}>{factor.score}/100</span>
      </div>
      <p style={{ ...S, fontSize: '13px', color: C[500], lineHeight: 1.5, marginBottom: '8px' }}>
        {factor.explanation}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ flex: 1, height: '3px', background: C[100], borderRadius: '50px', overflow: 'hidden' }}>
          <motion.div
            style={{ height: '100%', borderRadius: '50px', background: factor.score >= 70 ? '#16a34a' : factor.score >= 45 ? '#d97706' : '#dc2626' }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ delay: 0.4 + index * 0.08, duration: 0.7 }}
          />
        </div>
        <span style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>
          {factor.source} · {factor.date}
        </span>
      </div>
    </motion.div>
  )
}

export default function App() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('pondex_user')
    navigate('/')
  }

  const user = (() => { try { return JSON.parse(localStorage.getItem('pondex_user')) } catch { return null } })()

  const analyse = async (ticker) => {
    const key = ticker.toUpperCase().trim()
    if (!key) return
    setError(null)
    setLoading(true)
    setResult(null)
    try {
      const data = await fetchScore(key)
      setResult(data)
    } catch (e) {
      setError(e.message || `Could not fetch data for "${key}"`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: C.white }}>

      {/* Nav */}
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: '64px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)', borderBottom: `1px solid ${C[100]}`, display: 'flex', alignItems: 'center', padding: '0 32px', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
            <path d="M4 3 L4 25" stroke={C.black} strokeWidth="3.5" strokeLinecap="round"/>
            <circle cx="13" cy="11" r="6.5" stroke={C.black} strokeWidth="3.5" fill="none"/>
            <path d="M13 25 L24 25" stroke={C.black} strokeWidth="3.5" strokeLinecap="round"/>
          </svg>
          <span style={{ ...M, fontSize: '12px', color: C[400], letterSpacing: '0.06em' }}>pondex_</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {user && <span style={{ ...M, fontSize: '11px', color: C[400] }}>{user.email}</span>}
          <button
            onClick={logout}
            style={{ ...M, fontSize: '11px', color: C[400], background: 'none', border: `1px solid ${C[200]}`, borderRadius: '8px', padding: '5px 12px', cursor: 'pointer' }}
          >
            Log out
          </button>
        </div>
      </header>

      {/* Main */}
      <main style={{ paddingTop: '64px', maxWidth: '680px', margin: '0 auto', padding: '96px 32px 80px' }}>

        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 style={{ ...S, fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 500, letterSpacing: '-1.5px', lineHeight: 1.1, color: C.black, marginBottom: '32px' }}>
            What's your verdict on this stock?
          </h1>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <input
              value={input}
              onChange={e => { setInput(e.target.value.toUpperCase()); setError(null) }}
              onKeyDown={e => e.key === 'Enter' && analyse(input)}
              placeholder="Enter ticker — AAPL, NVDA, MSFT..."
              maxLength={6}
              autoFocus
              style={{ flex: 1, background: C[100], border: `1px solid ${C[200]}`, borderRadius: '12px', padding: '14px 18px', ...S, fontSize: '17px', fontWeight: 500, color: C.black, outline: 'none', letterSpacing: '0.04em' }}
            />
            <button
              onClick={() => analyse(input)}
              disabled={loading}
              style={{ background: C.black, color: C.white, border: 'none', borderRadius: '12px', padding: '14px 28px', ...S, fontSize: '15px', fontWeight: 600, cursor: 'pointer', opacity: loading ? 0.5 : 1, whiteSpace: 'nowrap', transition: 'opacity 0.2s' }}
            >
              {loading ? '...' : 'Get verdict →'}
            </button>
          </div>

          {/* Quick picks */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['AAPL', 'NVDA', 'MSFT', 'TSLA', 'GOOGL', 'AMZN', 'SAP', 'ASML'].map(t => (
              <button key={t} onClick={() => { setInput(t); analyse(t) }}
                style={{ background: 'transparent', border: `1px solid ${C[200]}`, borderRadius: '8px', padding: '5px 12px', ...M, fontSize: '11px', color: C[400], cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { e.target.style.borderColor = C.black; e.target.style.color = C.black }}
                onMouseLeave={e => { e.target.style.borderColor = C[200]; e.target.style.color = C[400] }}
              >
                {t}
              </button>
            ))}
          </div>

          {error && <p style={{ ...M, fontSize: '11px', color: '#dc2626', marginTop: '12px' }}>⚠ {error}</p>}
        </motion.div>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginTop: '48px' }}
            >
              {/* Company header */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
                      {result.ticker} · {result.exchange}
                    </p>
                    <h2 style={{ ...S, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 500, letterSpacing: '-0.5px', color: C.black, marginBottom: '4px' }}>
                      {result.name}
                    </h2>
                    <p style={{ ...M, fontSize: '14px', color: C[400] }}>{result.price}</p>
                  </div>
                  <span style={{ ...M, fontSize: '9px', color: C[300], border: `1px solid ${C[200]}`, borderRadius: '50px', padding: '3px 10px', textTransform: 'uppercase', flexShrink: 0, marginTop: '4px' }}>BETA</span>
                </div>
              </div>

              {/* Verdict — main score */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '32px', padding: '24px', background: C[100], borderRadius: '20px', marginBottom: '24px' }}>
                <GaugeMini score={result.score} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
                    <span style={{ ...S, fontSize: '56px', fontWeight: 500, lineHeight: 1, color: result.color }}>{result.score}</span>
                    <span style={{ ...S, fontSize: '20px', color: C[200] }}>/100</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      ...M, fontSize: '12px', fontWeight: 600,
                      color: C.white,
                      background: verdictColor(result.verdict),
                      padding: '3px 10px', borderRadius: '50px',
                      textTransform: 'uppercase', letterSpacing: '0.08em'
                    }}>
                      {result.verdict}
                    </span>
                    <span style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {result.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <p style={{ ...S, fontSize: '15px', color: C[500], lineHeight: 1.6, marginBottom: '32px', padding: '0 4px' }}>
                {result.summary}
              </p>

              {/* Factors */}
              <div style={{ borderTop: `1px solid ${C[100]}` }}>
                <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', padding: '16px 0 4px' }}>
                  Factor breakdown
                </p>
                {result.factors.map((f, i) => <FactorRow key={f.name} factor={f} index={i} />)}
              </div>

              {/* Disclaimer */}
              <div style={{ marginTop: '32px', padding: '14px 16px', background: C[100], borderRadius: '12px' }}>
                <p style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  ⚠ Research tool only · Not financial advice · Demo data for illustration
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
