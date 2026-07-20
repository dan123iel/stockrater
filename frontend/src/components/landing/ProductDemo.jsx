import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { C } from '../../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

const WHITELIST = ['AAPL', 'NVDA', 'MSFT', 'AMZN', 'TSLA', 'GOOGL', 'META', 'ASML', 'SAP', 'NOVO B']

const stockData = {
  AAPL:  { company: 'Apple Inc.',       score: 78, verdict: 'Good Fit',   color: C[500], factors: [{ name: 'Fundamentals', score: '3.8/5', note: 'Revenue $383B, gross margin 44.1%', source: 'Yahoo Finance · TTM' }, { name: 'Valuation', score: '3.2/5', note: 'P/E 28.4x — below sector avg 34x', source: 'Yahoo Finance · TTM' }, { name: 'Management', score: '4.1/5', note: 'Insider buying 3:1 over selling', source: 'SEC EDGAR · Form 4' }] },
  NVDA:  { company: 'NVIDIA Corp.',     score: 71, verdict: 'Good Fit',   color: C[400], factors: [{ name: 'Fundamentals', score: '4.2/5', note: 'Revenue +122% YoY, GM 72.7%', source: 'Yahoo Finance · TTM' }, { name: 'Valuation', score: '2.1/5', note: 'P/E 68x — elevated, priced for growth', source: 'Yahoo Finance · TTM' }, { name: 'Risk', score: '2.8/5', note: 'Beta 1.68 — high volatility', source: 'Yahoo Finance' }] },
  MSFT:  { company: 'Microsoft Corp.',  score: 84, verdict: 'Strong Fit', color: C[600], factors: [{ name: 'Fundamentals', score: '4.5/5', note: 'Operating margin 44%, FCF $74B', source: 'SEC EDGAR · FY2024' }, { name: 'Moat', score: '4.8/5', note: 'Cloud growth +29% YoY', source: 'Yahoo Finance · TTM' }, { name: 'Valuation', score: '3.1/5', note: 'P/E 32x — fair for quality', source: 'Yahoo Finance · TTM' }] },
  AMZN:  { company: 'Amazon.com Inc.',  score: 65, verdict: 'Moderate',   color: C[400], factors: [{ name: 'Fundamentals', score: '3.9/5', note: 'AWS revenue +17% YoY', source: 'SEC EDGAR · Q4 2024' }, { name: 'Valuation', score: '2.4/5', note: 'P/E 42x — reflects high expectations', source: 'Yahoo Finance · TTM' }, { name: 'Risk', score: '3.0/5', note: 'Regulatory exposure in EU + US', source: 'SEC EDGAR · 10-K' }] },
  TSLA:  { company: 'Tesla Inc.',       score: 45, verdict: 'Weak Fit',   color: C[300], factors: [{ name: 'Valuation', score: '1.2/5', note: 'P/E 78x — extreme premium', source: 'Yahoo Finance · TTM' }, { name: 'Fundamentals', score: '2.8/5', note: 'Margin compression -5pp YoY', source: 'SEC EDGAR · FY2024' }, { name: 'Risk', score: '1.8/5', note: 'Beta 2.4 — very high volatility', source: 'Yahoo Finance' }] },
  GOOGL: { company: 'Alphabet Inc.',    score: 76, verdict: 'Good Fit',   color: C[500], factors: [{ name: 'Fundamentals', score: '4.1/5', note: 'Search revenue +14%, Cloud +28%', source: 'SEC EDGAR · FY2024' }, { name: 'Valuation', score: '3.3/5', note: 'P/E 22x — attractive vs. peers', source: 'Yahoo Finance · TTM' }, { name: 'Moat', score: '4.6/5', note: 'Search monopoly + AI infrastructure', source: 'Yahoo Finance' }] },
  META:  { company: 'Meta Platforms',   score: 73, verdict: 'Good Fit',   color: C[500], factors: [{ name: 'Fundamentals', score: '4.3/5', note: 'Margin expansion to 35%, ad revenue +27%', source: 'SEC EDGAR · FY2024' }, { name: 'Valuation', score: '3.0/5', note: 'P/E 26x — reasonable for growth', source: 'Yahoo Finance · TTM' }, { name: 'Risk', score: '2.5/5', note: 'Regulatory + AI capex risk', source: 'SEC EDGAR · 10-K' }] },
  ASML:  { company: 'ASML Holding',     score: 81, verdict: 'Strong Fit', color: C[600], factors: [{ name: 'Moat', score: '5.0/5', note: 'Monopoly on EUV lithography', source: 'Yahoo Finance · TTM' }, { name: 'Fundamentals', score: '4.2/5', note: 'Order backlog €36B, GM 51%', source: 'SEC EDGAR · FY2024' }, { name: 'Valuation', score: '3.4/5', note: 'P/E 38x — premium for quality', source: 'Yahoo Finance · TTM' }] },
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
  const [ticker, setTicker] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const inputRef = useRef(null)

  const analyse = (t) => {
    const key = t.toUpperCase().trim()
    if (!key) return
    setError(null)
    const data = stockData[key]
    if (!data) {
      setError(`"${key}" — try ${WHITELIST.slice(0,5).join(', ')} or similar S&P 500 stocks`)
      return
    }
    setLoading(true)
    setResult(null)
    setTimeout(() => { setResult({ ticker: key, ...data }); setLoading(false) }, 700)
  }

  return (
    <section id="demo" style={{ paddingTop: '32px', paddingBottom: '120px', background: C.white }}>
      <div className="bungee-container">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
          <div>
            <p style={{ ...M, fontSize: '13px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>[ Try it ]</p>
            <h2 style={{ ...S, fontSize: 'clamp(40px, 4vw, 60px)', fontWeight: 500, letterSpacing: '-1.2px', lineHeight: 1.05, color: C.black }}>
              See a real verdict.
            </h2>
          </div>
        </div>

        {/* Input */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', maxWidth: '640px' }}>
          <input
            ref={inputRef}
            value={ticker}
            onChange={e => { setTicker(e.target.value.toUpperCase()); setError(null) }}
            onKeyDown={e => e.key === 'Enter' && analyse(ticker)}
            placeholder="Enter ticker — AAPL, NVDA, MSFT..."
            maxLength={6}
            style={{ flex: 1, background: C[100], border: `1px solid ${C[200]}`, borderRadius: '12px', padding: '14px 18px', ...S, fontSize: '18px', fontWeight: 500, color: C.black, outline: 'none', letterSpacing: '0.04em' }}
          />
          <button
            onClick={() => analyse(ticker)}
            disabled={loading}
            style={{ background: C.black, color: C.white, border: 'none', borderRadius: '12px', padding: '14px 28px', ...S, fontSize: '15px', fontWeight: 600, cursor: 'pointer', opacity: loading ? 0.6 : 1, whiteSpace: 'nowrap' }}
          >
            {loading ? '...' : 'Get verdict →'}
          </button>
        </div>

        {/* Quick picks */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {['AAPL', 'NVDA', 'MSFT', 'AMZN', 'TSLA', 'GOOGL', 'META', 'ASML'].map(s => (
            <button key={s} onClick={() => { setTicker(s); analyse(s) }}
              style={{ background: C[100], border: `1px solid ${C[200]}`, borderRadius: '8px', padding: '6px 14px', ...M, fontSize: '12px', color: C[400], cursor: 'pointer' }}>
              {s}
            </button>
          ))}
        </div>

        {error && (
          <p style={{ ...M, fontSize: '12px', color: C[400], marginBottom: '24px' }}>⚠ {error}</p>
        )}

        <AnimatePresence>
          {result && (
            <motion.div
              style={{ border: `1px solid ${C[200]}`, borderRadius: '32px', overflow: 'hidden' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 40px', borderBottom: `1px solid ${C[200]}` }}>
                <div>
                  <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '4px' }}>{result.ticker} · {result.company}</p>
                  <p style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.08em' }}>Demo · Data for illustration only</p>
                </div>
                <span style={{ ...M, fontSize: '9px', color: C[300], border: `1px solid ${C[200]}`, borderRadius: '50px', padding: '3px 10px', textTransform: 'uppercase' }}>[DEMO]</span>
              </div>

              {/* Score */}
              <div style={{ padding: '32px 40px', borderBottom: `1px solid ${C[200]}`, display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ ...S, fontSize: '80px', fontWeight: 500, lineHeight: 1 }}>
                  <AnimatedScore target={result.score} color={result.color} />
                </span>
                <span style={{ ...S, fontSize: '28px', color: C[200] }}>/100</span>
                <span style={{ ...M, fontSize: '12px', color: result.color, textTransform: 'uppercase', letterSpacing: '0.12em', marginLeft: '16px' }}>{result.verdict}</span>
              </div>

              {/* Factors */}
              <div>
                {result.factors.map((f, i) => (
                  <motion.div key={f.name}
                    style={{ display: 'flex', gap: '40px', padding: '20px 40px', borderBottom: i < result.factors.length - 1 ? `1px solid ${C[200]}` : 'none' }}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                  >
                    <div style={{ width: '160px', flexShrink: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ ...S, fontSize: '14px', fontWeight: 500, color: C.black }}>{f.name}</span>
                        <span style={{ ...M, fontSize: '12px', color: C[400] }}>{f.score}</span>
                      </div>
                      <div style={{ height: '3px', background: C[200], borderRadius: '50px', overflow: 'hidden' }}>
                        <motion.div
                          style={{ height: '100%', background: result.color, borderRadius: '50px' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${parseFloat(f.score) / 5 * 100}%` }}
                          transition={{ delay: 0.3 + i * 0.08, duration: 0.7 }}
                        />
                      </div>
                    </div>
                    <div>
                      <p style={{ ...S, fontSize: '14px', color: C.black, marginBottom: '4px' }}>{f.note}</p>
                      <p style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.08em' }}>Source · {f.source}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div style={{ padding: '14px 40px', background: C[100] }}>
                <p style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  ⚠ Research tool only. Not financial advice. Not a buy/sell recommendation.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
