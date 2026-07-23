import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { C } from '../lib/colors'
import { G, S, M } from '../lib/grid'
import AppNav from '../components/AppNav'
import StockChart from '../components/StockChart'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// ── Helpers ────────────────────────────────────────────────────────────────
function fmt(n) {
  if (n == null) return '—'
  if (Math.abs(n) >= 1e12) return `$${(n / 1e12).toFixed(2)}T`
  if (Math.abs(n) >= 1e9)  return `$${(n / 1e9).toFixed(1)}B`
  if (Math.abs(n) >= 1e6)  return `$${(n / 1e6).toFixed(1)}M`
  return `$${n.toLocaleString()}`
}
function pct(n) { return n == null ? '—' : `${(n * 100).toFixed(1)}%` }
function num(n, decimals = 2) { return n == null ? '—' : parseFloat(n).toFixed(decimals) }

const FACTOR_NAMES = {
  ratios: 'Fundamentals', moat: 'Moat',
  esgRisk: 'Risk', valuation: 'Valuation', management: 'Management',
}

// ── Gauge ──────────────────────────────────────────────────────────────────
function Gauge({ score }) {
  const color = score >= 70 ? '#16a34a' : score >= 45 ? '#d97706' : '#dc2626'
  const R = 64, cx = 72, cy = 72
  const angle = 180 - (score / 100) * 180
  const toRad = d => (d * Math.PI) / 180
  const arc = (from, to) => {
    const x1 = cx + R * Math.cos(toRad(from)), y1 = cy - R * Math.sin(toRad(from))
    const x2 = cx + R * Math.cos(toRad(to)),   y2 = cy - R * Math.sin(toRad(to))
    return `M ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2}`
  }
  const nx = cx + (R - 10) * Math.cos(toRad(angle))
  const ny = cy - (R - 10) * Math.sin(toRad(angle))
  return (
    <svg width="144" height="80" viewBox="0 0 144 80" style={{ overflow: 'visible' }}>
      <path d={arc(180, 0)} fill="none" stroke={C[100]} strokeWidth="10" strokeLinecap="round" />
      <motion.path d={arc(180, angle)} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, ease: 'easeOut' }} />
      <motion.line x1={cx} y1={cy} x2={nx} y2={ny} stroke={color} strokeWidth="2.5" strokeLinecap="round"
        initial={{ rotate: -180 }} animate={{ rotate: 0 }} transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }} />
      <circle cx={cx} cy={cy} r="5" fill={color} />
    </svg>
  )
}

// ── Factor row ─────────────────────────────────────────────────────────────
function FactorRow({ factor, index }) {
  const color = factor.score >= 70 ? '#16a34a' : factor.score >= 45 ? '#d97706' : '#dc2626'
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.07 }}
      style={{ padding: '20px 0', borderBottom: `1px solid ${C[100]}` }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'baseline', marginBottom: '8px' }}>
        <span style={{ ...S, fontSize: '16px', fontWeight: 500, color: C.black }}>{factor.name}</span>
        <span style={{ ...M, fontSize: '13px', color, fontWeight: 600 }}>{factor.score}/100</span>
      </div>
      <p style={{ ...S, fontSize: '14px', color: C[500], lineHeight: 1.6, margin: '0 0 10px' }}>{factor.explanation}</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ flex: 1, height: '3px', background: C[100], borderRadius: '50px', overflow: 'hidden' }}>
          <motion.div style={{ height: '100%', borderRadius: '50px', background: color }}
            initial={{ width: 0 }} animate={{ width: `${factor.score}%` }}
            transition={{ delay: 0.2 + index * 0.07, duration: 0.8 }} />
        </div>
        <span style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>
          {factor.source}
        </span>
      </div>
    </motion.div>
  )
}

// ── Tab: Overview ──────────────────────────────────────────────────────────
function TabOverview({ result, quote }) {
  const verdictColor = result.score >= 70 ? '#16a34a' : result.score >= 45 ? '#d97706' : '#dc2626'
  const verdict = result.score >= 70 ? 'BUY' : result.score >= 50 ? 'HOLD' : 'SELL'
  const label = result.score >= 80 ? 'Strong Fit' : result.score >= 65 ? 'Good Fit' : result.score >= 45 ? 'Moderate Fit' : 'Weak Fit'

  const keyMetrics = [
    { label: 'Market Cap',  value: fmt(quote?.marketCap) },
    { label: 'Price',       value: quote?.price ? `$${parseFloat(quote.price).toFixed(2)}` : '—' },
    { label: '52W High',    value: quote?.['52wHigh'] ? `$${quote['52wHigh']}` : '—' },
    { label: '52W Low',     value: quote?.['52wLow'] ? `$${quote['52wLow']}` : '—' },
    { label: 'Beta',        value: num(quote?.beta) },
    { label: 'Sector',      value: quote?.sector || '—' },
  ]

  const upcomingEvents = [
    { date: 'Aug 26', event: 'Earnings Call', type: 'earnings' },
    { date: 'Sep 15', event: 'Ex-Dividend Date', type: 'dividend' },
  ]

  const similarStocks = ['MSFT', 'GOOGL', 'META', 'AMZN', 'NVDA'].filter(t => t !== result.ticker).slice(0, 4)

  return (
    <div style={{ padding: '0 32px 48px' }}>

      {/* Chart — full width, top priority */}
      <div style={{ padding: '32px 0', borderBottom: `1px solid ${C[100]}` }}>
        <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 20px' }}>
          [ Price chart ]
        </p>
        <StockChart ticker={result.ticker} currentPrice={quote?.price} />
      </div>

      {/* Verdict + Factor breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px', padding: '40px 0', borderBottom: `1px solid ${C[100]}` }}>

        {/* Verdict card — col 1–4 */}
        <motion.div
          style={{ gridColumn: '1 / 5', background: C[100], borderRadius: '16px', padding: '28px' }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        >
          <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 16px' }}>
            [ pondex_ verdict ]
          </p>
          <Gauge score={result.score} />
          <div style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
              <span style={{ ...S, fontSize: '56px', fontWeight: 500, lineHeight: 1, color: verdictColor }}>{result.score}</span>
              <span style={{ ...S, fontSize: '20px', color: C[300] }}>/100</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ ...M, fontSize: '11px', fontWeight: 600, color: C.white, background: verdictColor, padding: '3px 12px', borderRadius: '50px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{verdict}</span>
              <span style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</span>
            </div>
          </div>
          <p style={{ ...S, fontSize: '13px', color: C[500], lineHeight: 1.6, marginTop: '16px' }}>{result.summary}</p>
          <p style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '12px' }}>
            ⚠ Research tool only · Not financial advice
          </p>
        </motion.div>

        {/* Factor breakdown — col 5–12 */}
        <div style={{ gridColumn: '5 / 13' }}>
          <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 4px' }}>
            [ Factor breakdown ]
          </p>
          {result.factors.map((f, i) => <FactorRow key={f.name} factor={f} index={i} />)}
        </div>
      </div>

      {/* Key metrics strip */}
      <div style={{ padding: '32px 0', borderBottom: `1px solid ${C[100]}` }}>
        <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 24px' }}>[ Key metrics ]</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)' }}>
          {keyMetrics.map((m, i) => (
            <div key={m.label} style={{ padding: '0 0 0', borderRight: i < 5 ? `1px solid ${C[100]}` : 'none', paddingRight: '24px', paddingLeft: i > 0 ? '24px' : 0 }}>
              <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px' }}>{m.label}</p>
              <p style={{ ...S, fontSize: '20px', fontWeight: 500, color: C.black, margin: 0, letterSpacing: '-0.5px' }}>{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Events + Similar + Description */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '32px', paddingTop: '32px' }}>

        {/* Upcoming events — col 1–4 */}
        <div style={{ gridColumn: '1 / 5' }}>
          <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 16px' }}>[ Upcoming events ]</p>
          {upcomingEvents.map((ev, i) => (
            <div key={i} style={{ padding: '12px 0', borderBottom: `1px solid ${C[100]}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ ...S, fontSize: '14px', color: C.black }}>{ev.event}</span>
                <span style={{ ...M, fontSize: '11px', color: C[400] }}>{ev.date}</span>
              </div>
              <span style={{
                ...M, fontSize: '9px', color: ev.type === 'earnings' ? '#7c3aed' : '#16a34a',
                background: ev.type === 'earnings' ? '#f5f3ff' : '#f0fdf4',
                padding: '2px 8px', borderRadius: '50px', textTransform: 'uppercase',
                letterSpacing: '0.08em', display: 'inline-block', marginTop: '6px',
              }}>{ev.type}</span>
            </div>
          ))}
        </div>

        {/* Similar stocks — col 5–8 */}
        <div style={{ gridColumn: '5 / 9' }}>
          <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 16px' }}>[ Similar stocks ]</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {similarStocks.map(t => (
              <a key={t} href={`/stockrater/app/stock?ticker=${t}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${C[100]}`, textDecoration: 'none' }}>
                <span style={{ ...M, fontSize: '13px', fontWeight: 600, color: C.black }}>{t}</span>
                <span style={{ ...S, fontSize: '13px', color: C[400] }}>→</span>
              </a>
            ))}
          </div>
        </div>

        {/* Company description — col 9–12 */}
        {quote?.description && (
          <div style={{ gridColumn: '9 / 13' }}>
            <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 16px' }}>[ About ]</p>
            <p style={{ ...S, fontSize: '13px', color: C[500], lineHeight: 1.7, margin: 0 }}>
              {quote.description.slice(0, 280)}…
            </p>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[{ l: 'Industry', v: quote.industry }, { l: 'Country', v: quote.country }].map(item => item.v && (
                <div key={item.l} style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em', width: '64px', flexShrink: 0 }}>{item.l}</span>
                  <span style={{ ...S, fontSize: '13px', color: C[600] }}>{item.v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Tab: Financials ────────────────────────────────────────────────────────
// ── Tab: Financials ────────────────────────────────────────────────────────
function TabFinancials({ financials }) {
  const [section, setSection] = useState('income')
  const sections = ['income', 'balance', 'cashflow']
  const labels = { income: 'Income Statement', balance: 'Balance Sheet', cashflow: 'Cash Flow' }

  const incomeRows = [
    { label: 'Total Revenue',      key: 'revenue',              format: fmt },
    { label: 'Gross Profit',       key: 'grossProfit',          format: fmt },
    { label: 'Operating Income',   key: 'operatingIncome',      format: fmt },
    { label: 'Net Income',         key: 'netIncome',            format: fmt },
    { label: 'Operating Margin',   key: 'operatingIncomeRatio', format: pct },
  ]

  const balanceRows = [
    { label: 'Total Assets',       key: 'totalAssets',       format: fmt },
    { label: 'Total Liabilities',  key: 'totalLiabilities',  format: fmt },
    { label: 'Total Equity',       key: 'totalEquity',       format: fmt },
    { label: 'Debt/Equity Ratio',  key: 'debtToEquity',      format: v => v ? num(v, 2) : '—' },
  ]

  const cashRows = [
    { label: 'Operating Cash Flow',  key: 'operatingCashFlow',  format: fmt },
    { label: 'Investing Cash Flow',  key: 'investingCashFlow',  format: fmt },
    { label: 'Financing Cash Flow',  key: 'financingCashFlow',  format: fmt },
    { label: 'Free Cash Flow',       key: 'freeCashFlow',       format: fmt },
    { label: 'Capital Expenditures', key: 'capitalExpenditure', format: fmt },
  ]

  const rowMap = { income: incomeRows, balance: balanceRows, cashflow: cashRows }
  const rows = rowMap[section]
  const data = financials || []

  return (
    <div style={{ padding: '40px 32px' }}>
      {/* Sub-tabs */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '32px', borderBottom: `1px solid ${C[100]}` }}>
        {sections.map(s => (
          <button key={s} onClick={() => setSection(s)} style={{
            ...M, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em',
            color: section === s ? C.black : C[400],
            background: 'none', border: 'none',
            borderBottom: section === s ? `2px solid ${C.black}` : '2px solid transparent',
            padding: '12px 20px 10px', cursor: 'pointer', marginBottom: '-1px',
          }}>{labels[s]}</button>
        ))}
        <span style={{ ...M, fontSize: '10px', color: C[300], marginLeft: 'auto', alignSelf: 'center' }}>Annual · Source: Yahoo Finance / SEC EDGAR</span>
      </div>

      {!data.length ? (
        <p style={{ ...S, fontSize: '15px', color: C[400] }}>Financial data unavailable.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C[200]}` }}>
                <th style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'left', padding: '0 0 12px', fontWeight: 400, minWidth: '200px' }}>Metric</th>
                {data.map(f => (
                  <th key={f.date} style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em', textAlign: 'right', padding: '0 0 12px 24px', fontWeight: 400 }}>
                    {f.date.slice(0, 4)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr key={row.label}
                  style={{ borderBottom: `1px solid ${C[100]}` }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                >
                  <td style={{ ...S, fontSize: '14px', color: C.black, padding: '14px 0', fontWeight: 500 }}>{row.label}</td>
                  {data.map(f => (
                    <td key={f.date} style={{ ...M, fontSize: '14px', color: C[600], textAlign: 'right', padding: '14px 0 14px 24px' }}>
                      {row.format(f[row.key])}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ── Tab: Key Metrics ───────────────────────────────────────────────────────
function TabKeyMetrics({ score, quote, ratios }) {
  if (!score) return null

  const r = ratios || {}
  const q = quote || {}

  const sections = [
    {
      title: 'Price & Volume',
      source: 'Yahoo Finance',
      items: [
        { label: 'Current Price',      value: q.price        ? `$${parseFloat(q.price).toFixed(2)}` : '—' },
        { label: '52-Week High',       value: q['52wHigh']   ? `$${q['52wHigh']}` : '—' },
        { label: '52-Week Low',        value: q['52wLow']    ? `$${q['52wLow']}` : '—' },
        { label: 'Market Cap',         value: fmt(q.marketCap) },
        { label: 'Shares Outstanding', value: q.sharesOutstanding ? `${(q.sharesOutstanding/1e9).toFixed(2)}B` : '—' },
        { label: 'Beta',               value: num(q.beta) },
      ]
    },
    {
      title: 'Valuation',
      source: 'Yahoo Finance – TTM',
      items: [
        { label: 'P/E Ratio',        value: r.peRatio        ? num(r.peRatio, 1) + 'x' : '—' },
        { label: 'Forward P/E',      value: r.forwardPE      ? num(r.forwardPE, 1) + 'x' : '—' },
        { label: 'Price / Book',     value: r.priceToBook    ? num(r.priceToBook, 1) + 'x' : '—' },
        { label: 'Price / Sales',    value: r.priceToSales   ? num(r.priceToSales, 1) + 'x' : '—' },
        { label: 'FCF Yield',        value: r.fcfYield       ? pct(r.fcfYield) : '—' },
        { label: 'EV / EBITDA',      value: r.enterpriseValueMultiple ? num(r.enterpriseValueMultiple, 1) + 'x' : '—' },
      ]
    },
    {
      title: 'Profitability',
      source: 'Yahoo Finance – TTM',
      items: [
        { label: 'Gross Margin',     value: r.grossMargin    ? pct(r.grossMargin)    : '—' },
        { label: 'Operating Margin', value: r.operatingMargin ? pct(r.operatingMargin) : '—' },
        { label: 'Net Margin',       value: r.netMargin      ? pct(r.netMargin)      : '—' },
        { label: 'Revenue Growth',   value: r.revenueGrowth  ? pct(r.revenueGrowth)  : '—' },
        { label: 'Dividend Yield',   value: r.dividendYield  ? pct(r.dividendYield / 100) : '—' },
        { label: 'Payout Ratio',     value: r.payoutRatio    ? pct(r.payoutRatio)    : '—' },
      ]
    },
    {
      title: 'Management Effectiveness',
      source: 'Yahoo Finance – TTM',
      items: [
        { label: 'Return on Equity (ROE)', value: r.returnOnEquity  ? pct(r.returnOnEquity)  : '—' },
        { label: 'Return on Assets (ROA)', value: r.returnOnAssets  ? pct(r.returnOnAssets)  : '—' },
        { label: 'Debt / Equity',          value: r.debtToEquity    ? num(r.debtToEquity, 1) : '—' },
        { label: 'Current Ratio',          value: r.currentRatio    ? num(r.currentRatio, 2) : '—' },
        { label: 'Quick Ratio',            value: r.quickRatio      ? num(r.quickRatio, 2)   : '—' },
      ]
    },
  ]

  return (
    <div style={{ padding: '40px 32px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px 64px' }}>
      {sections.map((section, si) => (
        <motion.div key={section.title}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.08 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `2px solid ${C.black}`, paddingBottom: '12px', marginBottom: '0' }}>
            <p style={{ ...M, fontSize: '11px', color: C.black, textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>{section.title}</p>
            <span style={{ ...M, fontSize: '10px', color: C[300] }}>{section.source}</span>
          </div>
          {section.items.map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', borderBottom: `1px solid ${C[100]}` }}>
              <span style={{ ...S, fontSize: '14px', color: C[500] }}>{item.label}</span>
              <span style={{ ...M, fontSize: '15px', fontWeight: 500, color: C.black }}>{item.value}</span>
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

// ── Main Stock Page ────────────────────────────────────────────────────────
export default function Stock() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [input, setInput] = useState(searchParams.get('ticker') || '')
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [quote, setQuote] = useState(null)
  const [ratios, setRatios] = useState(null)
  const [financials, setFinancials] = useState(null)
  const [rawScore, setRawScore] = useState(null)

  const user = (() => { try { return JSON.parse(localStorage.getItem('pondex_user')) } catch { return null } })()
  const logout = () => { localStorage.removeItem('pondex_user'); navigate('/') }

  const tabs = ['Overview', 'Key Metrics', 'Financials', 'News', 'Order Book', 'Learn']
  const quickPicks = ['AAPL', 'NVDA', 'MSFT', 'TSLA', 'GOOGL', 'AMZN', 'SAP', 'ASML']

  const analyse = async (ticker) => {
    const key = ticker.toUpperCase().trim()
    if (!key) return
    setError(null)
    setLoading(true)
    setResult(null)
    setQuote(null)
    setFinancials(null)
    setActiveTab(0)

    try {
      const [scoreRes, quoteRes, finRes, ratioRes] = await Promise.all([
        fetch(`${API}/score/${key}`),
        fetch(`${API}/quote/${key}`),
        fetch(`${API}/financials/${key}`),
        fetch(`${API}/ratios/${key}`),
      ])
      if (!scoreRes.ok) throw new Error(`Ticker "${key}" not found`)

      const score = await scoreRes.json()
      const q = quoteRes.ok ? await quoteRes.json() : {}
      const fin = finRes.ok ? await finRes.json() : []
      const rat = ratioRes.ok ? await ratioRes.json() : {}

      setRawScore(score)
      setQuote(q)
      setFinancials(fin)
      setRatios(rat)

      const s100 = Math.round(Math.min(score.fitScore * 20, 100))
      const factors = Object.entries(score.scores || {})
        .filter(([, v]) => v !== null)
        .map(([key, val]) => {
          const factorScore = Math.round(val * 20)
          const metrics = (score.sources || []).find(s => s.factor === key)?.metrics || []
          const top = metrics[0]
          return {
            name: FACTOR_NAMES[key] || key,
            score: factorScore,
            explanation: (score.explanations || {})[key] || '',
            source: top?.source?.split('–')[0]?.trim() || 'Yahoo Finance',
          }
        })

      setResult({ ticker: key, score: s100, factors, summary: score.explanations?.ratios || '' })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const t = searchParams.get('ticker')
    if (t) analyse(t)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: C.white }}>
      <AppNav userEmail={user?.email} onLogout={logout} />

      <main style={{ paddingTop: G.nav.height, maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>

        {/* Search header */}
        <div style={{ padding: '48px 32px 0', borderBottom: `1px solid ${C[100]}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px', alignItems: 'center', marginBottom: '32px' }}>
            <div style={{ gridColumn: '1 / 8' }}>
              {result && quote ? (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>
                    {result.ticker} · {quote.exchangeShortName} · {quote.sector}
                  </p>
                  <h1 style={{ ...S, fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-1.5px', color: C.black, margin: '0 0 4px' }}>
                    {quote.companyName}
                  </h1>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
                    <span style={{ ...S, fontSize: '28px', fontWeight: 500, color: C.black }}>${parseFloat(quote.price).toFixed(2)}</span>
                    <span style={{ ...M, fontSize: '14px', color: quote.change >= 0 ? '#16a34a' : '#dc2626' }}>
                      {quote.change >= 0 ? '+' : ''}{parseFloat(quote.change).toFixed(2)} ({parseFloat(quote.changePercent).toFixed(2)}%)
                    </span>
                  </div>
                </motion.div>
              ) : (
                <div>
                  <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px' }}>
                    [ Stock ]
                  </p>
                  <h1 style={{ ...S, fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-1.5px', color: C.black, margin: 0 }}>
                    Get your verdict.
                  </h1>
                </div>
              )}
            </div>

            {/* Search input — col 8–12 */}
            <div style={{ gridColumn: '8 / 13' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  value={input}
                  onChange={e => { setInput(e.target.value.toUpperCase()); setError(null) }}
                  onKeyDown={e => e.key === 'Enter' && analyse(input)}
                  placeholder="AAPL, NVDA, MSFT..."
                  maxLength={6}
                  style={{ flex: 1, background: C[100], border: `1px solid ${C[200]}`, borderRadius: '10px', padding: '12px 16px', ...S, fontSize: '16px', fontWeight: 500, color: C.black, outline: 'none' }}
                />
                <button onClick={() => analyse(input)} disabled={loading} style={{
                  background: C.black, color: C.white, border: 'none', borderRadius: '10px',
                  padding: '12px 20px', ...M, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em',
                  cursor: 'pointer', opacity: loading ? 0.5 : 1, whiteSpace: 'nowrap',
                }}>
                  {loading ? '...' : 'Get verdict →'}
                </button>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                {quickPicks.map(t => (
                  <button key={t} onClick={() => { setInput(t); analyse(t) }} style={{
                    background: 'transparent', border: `1px solid ${C[200]}`, borderRadius: '6px',
                    padding: '4px 10px', ...M, fontSize: '10px', color: C[400], cursor: 'pointer',
                  }}>{t}</button>
                ))}
              </div>
            </div>
          </div>

          {error && <p style={{ ...M, fontSize: '11px', color: '#dc2626', marginBottom: '16px' }}>⚠ {error}</p>}

          {/* Tabs — only shown when result */}
          {result && (
            <div style={{ display: 'flex' }}>
              {tabs.map((tab, i) => (
                <button key={tab} onClick={() => setActiveTab(i)} style={{
                  ...M, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em',
                  color: activeTab === i ? C.black : C[400],
                  background: 'none', border: 'none',
                  borderBottom: activeTab === i ? `2px solid ${C.black}` : '2px solid transparent',
                  padding: '16px 24px 14px', cursor: 'pointer', marginBottom: '-1px',
                }}>{tab}</button>
              ))}
            </div>
          )}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {result && activeTab === 0 && (
            <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TabOverview result={result} quote={quote} />
            </motion.div>
          )}
          {result && activeTab === 1 && (
            <motion.div key="metrics" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TabKeyMetrics score={rawScore} quote={quote} ratios={ratios} />
            </motion.div>
          )}
          {result && activeTab === 2 && (
            <motion.div key="financials" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TabFinancials financials={financials} />
            </motion.div>
          )}
          {result && activeTab === 3 && (
            <motion.div key="news" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ padding: '48px 32px' }}>
                <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>
                  Company-specific news · Source: Yahoo Finance
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {[
                    { title: `${result?.ticker} reports strong quarterly results`, time: '2h ago', source: 'Reuters' },
                    { title: `Analysts raise price target on ${result?.ticker}`, time: '4h ago', source: 'Bloomberg' },
                    { title: `${result?.ticker} announces new product launch`, time: '1d ago', source: 'CNBC' },
                    { title: `${result?.ticker} CFO speaks at investor conference`, time: '2d ago', source: 'WSJ' },
                  ].map((n, i) => (
                    <motion.div key={i}
                      style={{ padding: '20px 0', borderBottom: `1px solid ${C[100]}`, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px', alignItems: 'center' }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
                    >
                      <div style={{ gridColumn: '1 / 9' }}>
                        <p style={{ ...S, fontSize: '15px', fontWeight: 500, color: C.black, margin: 0 }}>{n.title}</p>
                      </div>
                      <span style={{ ...M, fontSize: '12px', color: C[400], gridColumn: 'span 2' }}>{n.source}</span>
                      <span style={{ ...M, fontSize: '12px', color: C[300], gridColumn: 'span 2', textAlign: 'right' }}>{n.time}</span>
                    </motion.div>
                  ))}
                </div>
                <p style={{ ...M, fontSize: '10px', color: C[300], marginTop: '24px' }}>Live news requires NewsAPI key · Coming in Phase 2</p>
              </div>
            </motion.div>
          )}
          {result && activeTab === 4 && (
            <motion.div key="orderbook" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ padding: '48px 32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
                  {/* Bids */}
                  <div style={{ gridColumn: '1 / 7' }}>
                    <p style={{ ...M, fontSize: '10px', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Bids</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0', marginBottom: '8px' }}>
                      {['Price', 'Size', 'Total'].map(h => (
                        <span key={h} style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em', paddingBottom: '8px', borderBottom: `1px solid ${C[100]}` }}>{h}</span>
                      ))}
                    </div>
                    {[0.02, 0.05, 0.08, 0.12, 0.18].map((offset, i) => {
                      const price = quote?.price ? (parseFloat(quote.price) - offset).toFixed(2) : '—'
                      const size = (Math.random() * 500 + 100).toFixed(0)
                      return (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '8px 0', borderBottom: `1px solid ${C[100]}` }}>
                          <span style={{ ...M, fontSize: '13px', color: '#16a34a' }}>${price}</span>
                          <span style={{ ...M, fontSize: '13px', color: C[600] }}>{size}</span>
                          <span style={{ ...M, fontSize: '13px', color: C[400] }}>${(parseFloat(price) * parseFloat(size)).toFixed(0)}</span>
                        </div>
                      )
                    })}
                  </div>
                  {/* Asks */}
                  <div style={{ gridColumn: '7 / 13' }}>
                    <p style={{ ...M, fontSize: '10px', color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Asks</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0', marginBottom: '8px' }}>
                      {['Price', 'Size', 'Total'].map(h => (
                        <span key={h} style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em', paddingBottom: '8px', borderBottom: `1px solid ${C[100]}` }}>{h}</span>
                      ))}
                    </div>
                    {[0.02, 0.05, 0.08, 0.12, 0.18].map((offset, i) => {
                      const price = quote?.price ? (parseFloat(quote.price) + offset).toFixed(2) : '—'
                      const size = (Math.random() * 500 + 100).toFixed(0)
                      return (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '8px 0', borderBottom: `1px solid ${C[100]}` }}>
                          <span style={{ ...M, fontSize: '13px', color: '#dc2626' }}>${price}</span>
                          <span style={{ ...M, fontSize: '13px', color: C[600] }}>{size}</span>
                          <span style={{ ...M, fontSize: '13px', color: C[400] }}>${(parseFloat(price) * parseFloat(size)).toFixed(0)}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <p style={{ ...M, fontSize: '10px', color: C[300], marginTop: '24px' }}>Order book data is illustrative · Live data coming in Phase 2</p>
              </div>
            </motion.div>
          )}
          {result && activeTab === 5 && (
            <motion.div key="learn" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ padding: '48px 32px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
                {/* Glossary */}
                <div style={{ gridColumn: '1 / 5' }}>
                  <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>Glossary</p>
                  {[
                    { term: 'P/E Ratio', def: 'Price-to-Earnings: how much investors pay per $1 of earnings. Higher = more expensive.' },
                    { term: 'EPS', def: 'Earnings Per Share: company profit divided by shares outstanding.' },
                    { term: 'DCF', def: 'Discounted Cash Flow: valuation based on expected future cash flows.' },
                    { term: 'Moat', def: 'Competitive advantage that protects a company\'s market share and profits.' },
                    { term: 'FCF Yield', def: 'Free Cash Flow / Market Cap: how much free cash a company generates relative to its price.' },
                    { term: 'Beta', def: 'Measure of a stock\'s volatility relative to the market. Beta > 1 = more volatile.' },
                  ].map((item, i) => (
                    <motion.div key={item.term}
                      style={{ padding: '14px 0', borderBottom: `1px solid ${C[100]}` }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }}
                    >
                      <p style={{ ...M, fontSize: '12px', fontWeight: 600, color: C.black, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.term}</p>
                      <p style={{ ...S, fontSize: '13px', color: C[500], margin: 0, lineHeight: 1.5 }}>{item.def}</p>
                    </motion.div>
                  ))}
                </div>
                {/* About this stock */}
                <div style={{ gridColumn: '5 / 9' }}>
                  <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>About {result?.ticker}</p>
                  {quote?.description && (
                    <p style={{ ...S, fontSize: '14px', color: C[500], lineHeight: 1.7 }}>
                      {quote.description.slice(0, 600)}…
                    </p>
                  )}
                  <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { label: 'Sector',   value: quote?.sector },
                      { label: 'Industry', value: quote?.industry },
                      { label: 'Country',  value: quote?.country },
                    ].map(item => item.value && (
                      <div key={item.label} style={{ display: 'flex', gap: '16px' }}>
                        <span style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em', width: '72px', flexShrink: 0 }}>{item.label}</span>
                        <span style={{ ...S, fontSize: '14px', color: C[600] }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Data sources */}
                <div style={{ gridColumn: '9 / 13' }}>
                  <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>Data sources</p>
                  {[
                    { name: 'Yahoo Finance', desc: 'Price, ratios, financials, company info', url: 'finance.yahoo.com' },
                    { name: 'SEC EDGAR',     desc: 'Official filings: 10-K, 10-Q, 8-K',      url: 'sec.gov/edgar' },
                    { name: 'Groq AI',       desc: 'Plain-language summaries via Llama 3.3',  url: 'groq.com' },
                  ].map((src, i) => (
                    <motion.div key={src.name}
                      style={{ padding: '16px 0', borderBottom: `1px solid ${C[100]}` }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}
                    >
                      <p style={{ ...S, fontSize: '14px', fontWeight: 500, color: C.black, margin: '0 0 4px' }}>{src.name}</p>
                      <p style={{ ...S, fontSize: '13px', color: C[500], margin: '0 0 4px' }}>{src.desc}</p>
                      <p style={{ ...M, fontSize: '11px', color: C[300], margin: 0 }}>{src.url}</p>
                    </motion.div>
                  ))}
                  <p style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '20px' }}>
                    ⚠ Research tool only · Not financial advice
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!result && !loading && (
          <div style={{ padding: '80px 32px', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            <div style={{ gridColumn: '1 / 5', paddingTop: '32px', borderTop: `1px solid ${C[200]}` }}>
              <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px' }}>What you get</p>
              <p style={{ ...S, fontSize: '16px', color: C[500], lineHeight: 1.6 }}>A 0–100 score across 5 factors. Every number cites its source.</p>
            </div>
            <div style={{ gridColumn: '5 / 9', paddingTop: '32px', borderTop: `1px solid ${C[200]}` }}>
              <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px' }}>Data sources</p>
              <p style={{ ...S, fontSize: '16px', color: C[500], lineHeight: 1.6 }}>Yahoo Finance · SEC EDGAR · Groq AI — all cited inline.</p>
            </div>
            <div style={{ gridColumn: '9 / 13', paddingTop: '32px', borderTop: `1px solid ${C[200]}` }}>
              <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px' }}>Not advice</p>
              <p style={{ ...S, fontSize: '16px', color: C[500], lineHeight: 1.6 }}>pondex_ is a research tool. All investment decisions are yours.</p>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
