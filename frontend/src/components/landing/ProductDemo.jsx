import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { C } from '../../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

const stockData = {
  AAPL:  { company: 'Apple Inc.',       score: 78, verdict: 'Good Fit',   color: '#16a34a', factors: [{ name: 'Fundamentals', score: '3.8/5', note: 'Revenue $383B, gross margin 44.1%', source: 'Yahoo Finance · TTM' }, { name: 'Valuation', score: '3.2/5', note: 'P/E 28.4x — below sector avg 34x', source: 'Yahoo Finance · TTM' }, { name: 'Management', score: '4.1/5', note: 'Insider buying 3:1 over selling', source: 'SEC EDGAR · Form 4' }] },
  NVDA:  { company: 'NVIDIA Corp.',     score: 71, verdict: 'Good Fit',   color: '#16a34a', factors: [{ name: 'Fundamentals', score: '4.2/5', note: 'Revenue +122% YoY, GM 72.7%', source: 'Yahoo Finance · TTM' }, { name: 'Valuation', score: '2.1/5', note: 'P/E 68x — elevated, priced for growth', source: 'Yahoo Finance · TTM' }, { name: 'Risk', score: '2.8/5', note: 'Beta 1.68 — high volatility', source: 'Yahoo Finance' }] },
  MSFT:  { company: 'Microsoft Corp.',  score: 84, verdict: 'Strong Fit', color: '#16a34a', factors: [{ name: 'Fundamentals', score: '4.5/5', note: 'Operating margin 44%, FCF $74B', source: 'SEC EDGAR · FY2024' }, { name: 'Moat', score: '4.8/5', note: 'Cloud growth +29% YoY', source: 'Yahoo Finance · TTM' }, { name: 'Valuation', score: '3.1/5', note: 'P/E 32x — fair for quality', source: 'Yahoo Finance · TTM' }] },
  AMZN:  { company: 'Amazon.com Inc.',  score: 65, verdict: 'Moderate',   color: '#d97706', factors: [{ name: 'Fundamentals', score: '3.9/5', note: 'AWS revenue +17% YoY', source: 'SEC EDGAR · Q4 2024' }, { name: 'Valuation', score: '2.4/5', note: 'P/E 42x — reflects high expectations', source: 'Yahoo Finance · TTM' }, { name: 'Risk', score: '3.0/5', note: 'Regulatory exposure in EU + US', source: 'SEC EDGAR · 10-K' }] },
  TSLA:  { company: 'Tesla Inc.',       score: 45, verdict: 'Weak Fit',   color: '#dc2626', factors: [{ name: 'Valuation', score: '1.2/5', note: 'P/E 78x — extreme premium', source: 'Yahoo Finance · TTM' }, { name: 'Fundamentals', score: '2.8/5', note: 'Margin compression -5pp YoY', source: 'SEC EDGAR · FY2024' }, { name: 'Risk', score: '1.8/5', note: 'Beta 2.4 — very high volatility', source: 'Yahoo Finance' }] },
  GOOGL: { company: 'Alphabet Inc.',    score: 76, verdict: 'Good Fit',   color: '#16a34a', factors: [{ name: 'Fundamentals', score: '4.1/5', note: 'Search revenue +14%, Cloud +28%', source: 'SEC EDGAR · FY2024' }, { name: 'Valuation', score: '3.3/5', note: 'P/E 22x — attractive vs. peers', source: 'Yahoo Finance · TTM' }, { name: 'Moat', score: '4.6/5', note: 'Search monopoly + AI infrastructure', source: 'Yahoo Finance' }] },
  META:  { company: 'Meta Platforms',   score: 73, verdict: 'Good Fit',   color: '#16a34a', factors: [{ name: 'Fundamentals', score: '4.3/5', note: 'Margin expansion to 35%, ad revenue +27%', source: 'SEC EDGAR · FY2024' }, { name: 'Valuation', score: '3.0/5', note: 'P/E 26x — reasonable for growth', source: 'Yahoo Finance · TTM' }, { name: 'Risk', score: '2.5/5', note: 'Regulatory + AI capex risk', source: 'SEC EDGAR · 10-K' }] },
  ASML:  { company: 'ASML Holding',     score: 81, verdict: 'Strong Fit', color: '#16a34a', factors: [{ name: 'Moat', score: '5.0/5', note: 'Monopoly on EUV lithography', source: 'Yahoo Finance · TTM' }, { name: 'Fundamentals', score: '4.2/5', note: 'Order backlog €36B, GM 51%', source: 'SEC EDGAR · FY2024' }, { name: 'Valuation', score: '3.4/5', note: 'P/E 38x — premium for quality', source: 'Yahoo Finance · TTM' }] },
}

function scoreColor(s) {
  if (s >= 70) return '#16a34a'
  if (s >= 45) return '#d97706'
  return '#dc2626'
}

function verdictBadgeColor(v) {
  if (v === 'Strong Fit' || v === 'Good Fit') return '#16a34a'
  if (v === 'Moderate') return '#d97706'
  return '#dc2626'
}

function GaugeMini({ score }) {
  const color = scoreColor(score)
  const R = 58, cx = 70, cy = 70
  const angle = 180 - (score / 100) * 180
  const toRad = d => (d * Math.PI) / 180
  const arcPath = (from, to) => {
    const x1 = cx + R * Math.cos(toRad(from)), y1 = cy - R * Math.sin(toRad(from))
    const x2 = cx + R * Math.cos(toRad(to)),   y2 = cy - R * Math.sin(toRad(to))
    const large = Math.abs(to - from) > 180 ? 1 : 0
    const sweep = to < from ? 1 : 0
    return `M ${x1} ${y1} A ${R} ${R} 0 ${large} ${sweep} ${x2} ${y2}`
  }
  const nx = cx + (R - 10) * Math.cos(toRad(angle))
  const ny = cy - (R - 10) * Math.sin(toRad(angle))
  return (
    <svg width="140" height="78" viewBox="0 0 140 78" style={{ overflow: 'visible' }}>
      <path d={arcPath(180, 0)} fill="none" stroke={C[100]} strokeWidth="9" strokeLinecap="round" />
      <motion.path d={arcPath(180, angle)} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.1, ease: 'easeOut' }} />
      <motion.line x1={cx} y1={cy} x2={nx} y2={ny} stroke={color} strokeWidth="2.5" strokeLinecap="round"
        initial={{ rotate: -180 }} animate={{ rotate: 0 }} transition={{ duration: 1.1, ease: 'easeOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }} />
      <circle cx={cx} cy={cy} r="5" fill={color} />
      <text x="14" y="76" style={{ fontFamily: 'Chivo Mono, monospace', fontSize: '9px', fill: C[400] }}>0</text>
      <text x="64" y="14" style={{ fontFamily: 'Chivo Mono, monospace', fontSize: '9px', fill: C[400] }}>50</text>
      <text x="120" y="76" style={{ fontFamily: 'Chivo Mono, monospace', fontSize: '9px', fill: C[400] }}>100</text>
    </svg>
  )
}

function AnimatedScore({ target, color }) {
  const [display, setDisplay] = useState(0)
  const started = useRef(false)
  useEffect(() => { started.current = false; setDisplay(0) }, [target])
  useEffect(() => {
    if (started.current) return
    started.current = true
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / 1000, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(e * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target])
  return <span style={{ color }}>{display}</span>
}

export default function ProductDemo() {
  const [ticker, setTicker] = useState('AAPL')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  // Pre-load AAPL on mount
  useEffect(() => { analyse('AAPL') }, [])

  const analyse = (t) => {
    const key = t.toUpperCase().trim()
    if (!key) return
    setError(null)
    const data = stockData[key]
    if (!data) {
      setError(`"${key}" — try AAPL, NVDA, MSFT, TSLA, GOOGL, META, ASML`)
      return
    }
    setLoading(true)
    setResult(null)
    setTimeout(() => { setResult({ ticker: key, ...data }); setLoading(false) }, 500)
  }

  return (
    <section id="demo" style={{ paddingTop: '80px', paddingBottom: '120px', background: C.white }}>
      <div className="bungee-container">

        {/* Label */}
        <p style={{ ...M, fontSize: '13px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '40px' }}>[ Try it — see a real verdict ]</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', maxWidth: '720px' }}>

          {/* Input row */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <input
              ref={inputRef}
              value={ticker}
              onChange={e => { setTicker(e.target.value.toUpperCase()); setError(null) }}
              onKeyDown={e => e.key === 'Enter' && analyse(ticker)}
              placeholder="Enter ticker — AAPL, NVDA, MSFT..."
              maxLength={6}
              style={{ flex: 1, background: C[100], border: `1px solid ${C[200]}`, borderRadius: '12px', padding: '13px 18px', ...S, fontSize: '17px', fontWeight: 500, color: C.black, outline: 'none', letterSpacing: '0.04em' }}
            />
            <button
              onClick={() => analyse(ticker)}
              disabled={loading}
              style={{ background: C.black, color: C.white, border: 'none', borderRadius: '12px', padding: '13px 24px', ...S, fontSize: '15px', fontWeight: 600, cursor: 'pointer', opacity: loading ? 0.6 : 1, whiteSpace: 'nowrap' }}
            >
              {loading ? '...' : 'Get verdict →'}
            </button>
          </div>

          {/* Quick picks */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
            {['AAPL', 'NVDA', 'MSFT', 'AMZN', 'TSLA', 'GOOGL', 'META', 'ASML'].map(s => (
              <button key={s} onClick={() => { setTicker(s); analyse(s) }}
                style={{ background: ticker === s ? C.black : C[100], color: ticker === s ? C.white : C[400], border: `1px solid ${ticker === s ? C.black : C[200]}`, borderRadius: '8px', padding: '5px 13px', ...M, fontSize: '11px', cursor: 'pointer', transition: 'all 0.15s' }}>
                {s}
              </button>
            ))}
          </div>

          {error && <p style={{ ...M, fontSize: '11px', color: '#dc2626', marginBottom: '16px' }}>⚠ {error}</p>}

          {/* Result card */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                key={result.ticker}
                style={{ border: `1px solid ${C[200]}`, borderRadius: '24px', overflow: 'hidden' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 32px', borderBottom: `1px solid ${C[200]}` }}>
                  <div>
                    <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '2px' }}>{result.ticker} · {result.company}</p>
                    <p style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.08em' }}>Demo · Illustration only</p>
                  </div>
                  <span style={{ ...M, fontSize: '9px', color: C[300], border: `1px solid ${C[200]}`, borderRadius: '50px', padding: '3px 10px', textTransform: 'uppercase' }}>DEMO</span>
                </div>

                {/* Score + Gauge */}
                <div style={{ padding: '24px 32px', borderBottom: `1px solid ${C[200]}`, display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <GaugeMini score={result.score} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span style={{ ...S, fontSize: '64px', fontWeight: 500, lineHeight: 1 }}>
                        <AnimatedScore target={result.score} color={scoreColor(result.score)} />
                      </span>
                      <span style={{ ...S, fontSize: '22px', color: C[200] }}>/100</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                      <span style={{
                        ...M, fontSize: '10px', fontWeight: 600,
                        color: C.white,
                        background: verdictBadgeColor(result.verdict),
                        padding: '3px 10px', borderRadius: '50px',
                        textTransform: 'uppercase', letterSpacing: '0.08em'
                      }}>
                        {result.score >= 70 ? 'BUY' : result.score >= 50 ? 'HOLD' : 'SELL'}
                      </span>
                      <span style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em' }}>{result.verdict}</span>
                    </div>
                  </div>
                </div>

                {/* Factors */}
                <div>
                  {result.factors.map((f, i) => (
                    <motion.div key={f.name}
                      style={{ display: 'flex', gap: '32px', padding: '16px 32px', borderBottom: i < result.factors.length - 1 ? `1px solid ${C[200]}` : 'none' }}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.07 }}
                    >
                      <div style={{ width: '140px', flexShrink: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span style={{ ...S, fontSize: '13px', fontWeight: 500, color: C.black }}>{f.name}</span>
                          <span style={{ ...M, fontSize: '11px', color: C[400] }}>{f.score}</span>
                        </div>
                        <div style={{ height: '3px', background: C[100], borderRadius: '50px', overflow: 'hidden' }}>
                          <motion.div
                            style={{ height: '100%', background: scoreColor(result.score), borderRadius: '50px' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${parseFloat(f.score) / 5 * 100}%` }}
                            transition={{ delay: 0.2 + i * 0.07, duration: 0.6 }}
                          />
                        </div>
                      </div>
                      <div>
                        <p style={{ ...S, fontSize: '13px', color: C.black, marginBottom: '3px' }}>{f.note}</p>
                        <p style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.08em' }}>Source · {f.source}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer */}
                <div style={{ padding: '12px 32px', background: C[100] }}>
                  <p style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    ⚠ Research tool only · Not financial advice · Demo data
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
