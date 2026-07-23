import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
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

  const upcomingEvents = []

  const PEER_MAP = {
    AAPL:  ['MSFT', 'GOOGL', 'AMZN'],
    NVDA:  ['AMD', 'INTC', 'MSFT'],
    MSFT:  ['AAPL', 'GOOGL', 'AMZN'],
    TSLA:  ['AMZN', 'GOOGL', 'NVDA'],
    GOOGL: ['MSFT', 'AAPL', 'AMZN'],
    AMZN:  ['MSFT', 'GOOGL', 'AAPL'],
  }
  const similarStocks = (PEER_MAP[result.ticker] || ['AAPL', 'MSFT', 'NVDA'].filter(t => t !== result.ticker)).slice(0, 4)

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
          {upcomingEvents.length === 0 ? (
            <p style={{ ...S, fontSize: '13px', color: C[300] }}>Calendar data coming in Phase C.</p>
          ) : upcomingEvents.map((ev, i) => (
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
              <Link key={t} to={`/app/stock?ticker=${t}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${C[100]}`, textDecoration: 'none' }}>
                <span style={{ ...M, fontSize: '13px', fontWeight: 600, color: C.black }}>{t}</span>
                <span style={{ ...S, fontSize: '13px', color: C[400] }}>→</span>
              </Link>
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

  const DEMO_QUOTES = {
    AAPL:  { companyName: 'Apple Inc.', price: 213.49, change: 1.15, changePercent: 0.54, marketCap: 3280000000000, beta: 1.21, sector: 'Technology', industry: 'Consumer Electronics', country: 'US', exchangeShortName: 'NASDAQ', '52wHigh': 237.23, '52wLow': 164.08, sharesOutstanding: 15204000000, description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, Mac, iPad, and wearables, home and accessories product lines.' },
    NVDA:  { companyName: 'NVIDIA Corporation', price: 131.38, change: 2.44, changePercent: 1.89, marketCap: 3210000000000, beta: 1.66, sector: 'Technology', industry: 'Semiconductors', country: 'US', exchangeShortName: 'NASDAQ', '52wHigh': 153.13, '52wLow': 86.52, sharesOutstanding: 24420000000, description: 'NVIDIA Corporation provides graphics and compute and networking solutions worldwide. The company operates through two segments, Graphics and Compute & Networking.' },
    MSFT:  { companyName: 'Microsoft Corporation', price: 471.16, change: 3.22, changePercent: 0.69, marketCap: 3500000000000, beta: 0.90, sector: 'Technology', industry: 'Software—Infrastructure', country: 'US', exchangeShortName: 'NASDAQ', '52wHigh': 497.74, '52wLow': 385.58, sharesOutstanding: 7430000000, description: 'Microsoft Corporation develops and supports software, services, devices, and solutions worldwide. Its Productivity and Business Processes segment offers Office, Exchange, SharePoint, and Teams.' },
    TSLA:  { companyName: 'Tesla, Inc.', price: 316.06, change: -4.82, changePercent: -1.50, marketCap: 1010000000000, beta: 2.31, sector: 'Consumer Cyclical', industry: 'Auto Manufacturers', country: 'US', exchangeShortName: 'NASDAQ', '52wHigh': 488.54, '52wLow': 214.11, sharesOutstanding: 3200000000, description: 'Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, energy generation and storage systems, and related services.' },
    GOOGL: { companyName: 'Alphabet Inc.', price: 198.12, change: 1.08, changePercent: 0.55, marketCap: 2410000000000, beta: 1.03, sector: 'Communication Services', industry: 'Internet Content & Information', country: 'US', exchangeShortName: 'NASDAQ', '52wHigh': 208.70, '52wLow': 155.63, sharesOutstanding: 12170000000, description: 'Alphabet Inc. provides various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America.' },
    AMZN:  { companyName: 'Amazon.com, Inc.', price: 222.50, change: 0.88, changePercent: 0.40, marketCap: 2360000000000, beta: 1.14, sector: 'Consumer Cyclical', industry: 'Internet Retail', country: 'US', exchangeShortName: 'NASDAQ', '52wHigh': 242.52, '52wLow': 166.88, sharesOutstanding: 10610000000, description: 'Amazon.com, Inc. engages in the retail sale of consumer products, advertising, and subscriptions service through online and physical stores.' },
  }

  const DEMO_RATIOS = {
    AAPL:  { peRatio: 32.4, forwardPE: 28.1, priceToBook: 48.2, priceToSales: 8.1, fcfYield: 0.031, enterpriseValueMultiple: 24.8, grossMargin: 0.461, operatingMargin: 0.311, netMargin: 0.261, revenueGrowth: 0.042, dividendYield: 50, payoutRatio: 0.152, returnOnEquity: 1.601, returnOnAssets: 0.281, debtToEquity: 1.81, currentRatio: 1.04, quickRatio: 0.98 },
    NVDA:  { peRatio: 54.2, forwardPE: 38.8, priceToBook: 38.1, priceToSales: 25.4, fcfYield: 0.018, enterpriseValueMultiple: 42.1, grossMargin: 0.752, operatingMargin: 0.618, netMargin: 0.552, revenueGrowth: 0.942, dividendYield: 3, payoutRatio: 0.015, returnOnEquity: 1.242, returnOnAssets: 0.582, debtToEquity: 0.41, currentRatio: 4.17, quickRatio: 3.81 },
    MSFT:  { peRatio: 38.1, forwardPE: 31.4, priceToBook: 13.4, priceToSales: 14.2, fcfYield: 0.026, enterpriseValueMultiple: 27.8, grossMargin: 0.698, operatingMargin: 0.442, netMargin: 0.362, revenueGrowth: 0.151, dividendYield: 68, payoutRatio: 0.242, returnOnEquity: 0.362, returnOnAssets: 0.162, debtToEquity: 0.71, currentRatio: 1.28, quickRatio: 1.21 },
    TSLA:  { peRatio: 88.4, forwardPE: 72.1, priceToBook: 14.8, priceToSales: 8.2, fcfYield: 0.008, enterpriseValueMultiple: 64.2, grossMargin: 0.178, operatingMargin: 0.062, netMargin: 0.058, revenueGrowth: 0.021, dividendYield: 0, payoutRatio: 0, returnOnEquity: 0.118, returnOnAssets: 0.042, debtToEquity: 0.11, currentRatio: 1.84, quickRatio: 1.42 },
    GOOGL: { peRatio: 24.8, forwardPE: 20.4, priceToBook: 7.2, priceToSales: 6.8, fcfYield: 0.038, enterpriseValueMultiple: 17.4, grossMargin: 0.582, operatingMargin: 0.322, netMargin: 0.282, revenueGrowth: 0.122, dividendYield: 0, payoutRatio: 0, returnOnEquity: 0.314, returnOnAssets: 0.162, debtToEquity: 0.08, currentRatio: 1.94, quickRatio: 1.88 },
    AMZN:  { peRatio: 42.1, forwardPE: 34.8, priceToBook: 9.4, priceToSales: 3.8, fcfYield: 0.022, enterpriseValueMultiple: 28.4, grossMargin: 0.482, operatingMargin: 0.108, netMargin: 0.088, revenueGrowth: 0.111, dividendYield: 0, payoutRatio: 0, returnOnEquity: 0.224, returnOnAssets: 0.072, debtToEquity: 0.48, currentRatio: 1.06, quickRatio: 0.84 },
  }

  const DEMO_FINANCIALS = {
    AAPL: [
      { date: '2024-09-30', revenue: 391035000000, grossProfit: 180683000000, operatingIncome: 123216000000, netIncome: 93736000000, operatingIncomeRatio: 0.315, totalAssets: 364980000000, totalLiabilities: 308030000000, totalEquity: 56950000000, debtToEquity: 1.87, operatingCashFlow: 118254000000, investingCashFlow: -4031000000, financingCashFlow: -121983000000, freeCashFlow: 108807000000, capitalExpenditure: -9447000000 },
      { date: '2023-09-30', revenue: 383285000000, grossProfit: 169148000000, operatingIncome: 114301000000, netIncome: 96995000000, operatingIncomeRatio: 0.298, totalAssets: 352583000000, totalLiabilities: 290437000000, totalEquity: 62146000000, debtToEquity: 1.96, operatingCashFlow: 110543000000, investingCashFlow: 3705000000, financingCashFlow: -108488000000, freeCashFlow: 99584000000, capitalExpenditure: -10959000000 },
      { date: '2022-09-30', revenue: 394328000000, grossProfit: 170782000000, operatingIncome: 119437000000, netIncome: 99803000000, operatingIncomeRatio: 0.303, totalAssets: 352755000000, totalLiabilities: 302083000000, totalEquity: 50672000000, debtToEquity: 2.37, operatingCashFlow: 122151000000, investingCashFlow: -22354000000, financingCashFlow: -110749000000, freeCashFlow: 111443000000, capitalExpenditure: -10708000000 },
    ],
    NVDA: [
      { date: '2025-01-31', revenue: 130497000000, grossProfit: 98148000000, operatingIncome: 81507000000, netIncome: 72880000000, operatingIncomeRatio: 0.624, totalAssets: 111601000000, totalLiabilities: 30002000000, totalEquity: 81599000000, debtToEquity: 0.37, operatingCashFlow: 64089000000, investingCashFlow: -11029000000, financingCashFlow: -15308000000, freeCashFlow: 60352000000, capitalExpenditure: -3737000000 },
      { date: '2024-01-31', revenue: 60922000000, grossProfit: 44301000000, operatingIncome: 32972000000, netIncome: 29760000000, operatingIncomeRatio: 0.541, totalAssets: 65728000000, totalLiabilities: 22643000000, totalEquity: 43085000000, debtToEquity: 0.53, operatingCashFlow: 28608000000, investingCashFlow: -8014000000, financingCashFlow: -14027000000, freeCashFlow: 27021000000, capitalExpenditure: -1587000000 },
      { date: '2023-01-31', revenue: 26914000000, grossProfit: 15356000000, operatingIncome: 4224000000, netIncome: 4368000000, operatingIncomeRatio: 0.157, totalAssets: 41193000000, totalLiabilities: 18390000000, totalEquity: 22803000000, debtToEquity: 0.81, operatingCashFlow: 5641000000, investingCashFlow: 2292000000, financingCashFlow: -10412000000, freeCashFlow: 3808000000, capitalExpenditure: -1833000000 },
    ],
    MSFT: [
      { date: '2024-06-30', revenue: 245122000000, grossProfit: 171008000000, operatingIncome: 109433000000, netIncome: 88136000000, operatingIncomeRatio: 0.447, totalAssets: 512163000000, totalLiabilities: 243686000000, totalEquity: 268477000000, debtToEquity: 0.91, operatingCashFlow: 118548000000, investingCashFlow: -78866000000, financingCashFlow: -42175000000, freeCashFlow: 74071000000, capitalExpenditure: -44477000000 },
      { date: '2023-06-30', revenue: 211915000000, grossProfit: 146052000000, operatingIncome: 88523000000, netIncome: 72361000000, operatingIncomeRatio: 0.418, totalAssets: 411976000000, totalLiabilities: 205753000000, totalEquity: 206223000000, debtToEquity: 1.00, operatingCashFlow: 87582000000, investingCashFlow: -22680000000, financingCashFlow: -43935000000, freeCashFlow: 59475000000, capitalExpenditure: -28107000000 },
      { date: '2022-06-30', revenue: 198270000000, grossProfit: 135620000000, operatingIncome: 83383000000, netIncome: 72738000000, operatingIncomeRatio: 0.421, totalAssets: 364840000000, totalLiabilities: 198298000000, totalEquity: 166542000000, debtToEquity: 1.19, operatingCashFlow: 89035000000, investingCashFlow: -30311000000, financingCashFlow: -58876000000, freeCashFlow: 65149000000, capitalExpenditure: -23886000000 },
    ],
    TSLA: [
      { date: '2024-12-31', revenue: 97690000000, grossProfit: 17385000000, operatingIncome: 7076000000, netIncome: 7263000000, operatingIncomeRatio: 0.072, totalAssets: 122669000000, totalLiabilities: 51956000000, totalEquity: 70713000000, debtToEquity: 0.11, operatingCashFlow: 14923000000, investingCashFlow: -13990000000, financingCashFlow: -2877000000, freeCashFlow: 3580000000, capitalExpenditure: -11343000000 },
      { date: '2023-12-31', revenue: 96773000000, grossProfit: 17660000000, operatingIncome: 8891000000, netIncome: 14997000000, operatingIncomeRatio: 0.092, totalAssets: 106618000000, totalLiabilities: 43009000000, totalEquity: 62609000000, debtToEquity: 0.07, operatingCashFlow: 13256000000, investingCashFlow: -12269000000, financingCashFlow: 204000000, freeCashFlow: 4358000000, capitalExpenditure: -8898000000 },
      { date: '2022-12-31', revenue: 81462000000, grossProfit: 20853000000, operatingIncome: 13656000000, netIncome: 12556000000, operatingIncomeRatio: 0.168, totalAssets: 82338000000, totalLiabilities: 36440000000, totalEquity: 44898000000, debtToEquity: 0.11, operatingCashFlow: 14724000000, investingCashFlow: -11973000000, financingCashFlow: -3624000000, freeCashFlow: 7571000000, capitalExpenditure: -7158000000 },
    ],
    GOOGL: [
      { date: '2024-12-31', revenue: 350018000000, grossProfit: 210352000000, operatingIncome: 112389000000, netIncome: 100118000000, operatingIncomeRatio: 0.321, totalAssets: 450861000000, totalLiabilities: 119162000000, totalEquity: 331699000000, debtToEquity: 0.10, operatingCashFlow: 125294000000, investingCashFlow: -50948000000, financingCashFlow: -57695000000, freeCashFlow: 72764000000, capitalExpenditure: -52530000000 },
      { date: '2023-12-31', revenue: 307394000000, grossProfit: 174062000000, operatingIncome: 84293000000, netIncome: 73795000000, operatingIncomeRatio: 0.274, totalAssets: 402392000000, totalLiabilities: 107633000000, totalEquity: 294759000000, debtToEquity: 0.06, operatingCashFlow: 101746000000, investingCashFlow: -22752000000, financingCashFlow: -61380000000, freeCashFlow: 69495000000, capitalExpenditure: -32251000000 },
      { date: '2022-12-31', revenue: 282836000000, grossProfit: 156633000000, operatingIncome: 74842000000, netIncome: 59972000000, operatingIncomeRatio: 0.265, totalAssets: 359268000000, totalLiabilities: 107633000000, totalEquity: 251635000000, debtToEquity: 0.06, operatingCashFlow: 91495000000, investingCashFlow: -35523000000, financingCashFlow: -69757000000, freeCashFlow: 60010000000, capitalExpenditure: -31485000000 },
    ],
    AMZN: [
      { date: '2024-12-31', revenue: 637959000000, grossProfit: 326971000000, operatingIncome: 68588000000, netIncome: 59248000000, operatingIncomeRatio: 0.108, totalAssets: 624894000000, totalLiabilities: 337873000000, totalEquity: 287021000000, debtToEquity: 0.55, operatingCashFlow: 115877000000, investingCashFlow: -77134000000, financingCashFlow: -15497000000, freeCashFlow: 38521000000, capitalExpenditure: -77356000000 },
      { date: '2023-12-31', revenue: 574785000000, grossProfit: 270279000000, operatingIncome: 36852000000, netIncome: 30425000000, operatingIncomeRatio: 0.064, totalAssets: 527854000000, totalLiabilities: 296800000000, totalEquity: 231054000000, debtToEquity: 0.57, operatingCashFlow: 84946000000, investingCashFlow: -49830000000, financingCashFlow: -15879000000, freeCashFlow: 32004000000, capitalExpenditure: -52729000000 },
      { date: '2022-12-31', revenue: 513983000000, grossProfit: 225152000000, operatingIncome: 12248000000, netIncome: -2722000000, operatingIncomeRatio: 0.024, totalAssets: 462675000000, totalLiabilities: 316633000000, totalEquity: 146042000000, debtToEquity: 1.14, operatingCashFlow: -794000000, investingCashFlow: -37601000000, financingCashFlow: 9718000000, freeCashFlow: -19364000000, capitalExpenditure: -58321000000 },
    ],
  }

  const DEMO_DATA = {
    AAPL:  { score: 78, summary: 'Apple shows strong fundamentals with consistent cash flow and a wide moat, but trades at a premium valuation.', factors: [{ name: 'Fundamentals', score: 82, explanation: 'Strong revenue growth and healthy margins.', source: 'Yahoo Finance' }, { name: 'Moat', score: 88, explanation: 'Ecosystem lock-in and brand loyalty.', source: 'SEC EDGAR' }, { name: 'Risk', score: 71, explanation: 'Low ESG risk, stable governance.', source: 'Yahoo Finance' }, { name: 'Valuation', score: 62, explanation: 'Trades at premium vs. sector peers.', source: 'Yahoo Finance' }, { name: 'Management', score: 85, explanation: 'Consistent capital allocation and buybacks.', source: 'SEC EDGAR' }] },
    NVDA:  { score: 71, summary: 'NVIDIA leads AI infrastructure but valuation reflects extreme growth expectations.', factors: [{ name: 'Fundamentals', score: 91, explanation: 'Explosive revenue growth driven by AI demand.', source: 'Yahoo Finance' }, { name: 'Moat', score: 90, explanation: 'CUDA ecosystem creates high switching costs.', source: 'SEC EDGAR' }, { name: 'Risk', score: 55, explanation: 'High concentration risk in data center segment.', source: 'Yahoo Finance' }, { name: 'Valuation', score: 38, explanation: 'Extremely elevated P/E relative to history.', source: 'Yahoo Finance' }, { name: 'Management', score: 82, explanation: 'Visionary leadership with strong execution.', source: 'SEC EDGAR' }] },
    MSFT:  { score: 84, summary: 'Microsoft combines cloud dominance, AI integration, and disciplined capital allocation.', factors: [{ name: 'Fundamentals', score: 88, explanation: 'Azure growth and Office 365 recurring revenue.', source: 'Yahoo Finance' }, { name: 'Moat', score: 92, explanation: 'Enterprise software dominance and switching costs.', source: 'SEC EDGAR' }, { name: 'Risk', score: 78, explanation: 'Well-diversified with low regulatory risk.', source: 'Yahoo Finance' }, { name: 'Valuation', score: 71, explanation: 'Premium but justified by growth trajectory.', source: 'Yahoo Finance' }, { name: 'Management', score: 90, explanation: 'Nadella-era transformation continues to deliver.', source: 'SEC EDGAR' }] },
    TSLA:  { score: 42, summary: 'Tesla faces margin compression, intensifying competition, and CEO distraction risk.', factors: [{ name: 'Fundamentals', score: 48, explanation: 'Margins declining as EV price war intensifies.', source: 'Yahoo Finance' }, { name: 'Moat', score: 55, explanation: 'Brand strength but narrowing tech lead.', source: 'SEC EDGAR' }, { name: 'Risk', score: 35, explanation: 'High CEO concentration risk and governance concerns.', source: 'Yahoo Finance' }, { name: 'Valuation', score: 28, explanation: 'Still priced for perfection despite slowing growth.', source: 'Yahoo Finance' }, { name: 'Management', score: 40, explanation: 'Distraction risk from multiple CEO ventures.', source: 'SEC EDGAR' }] },
    GOOGL: { score: 76, summary: 'Alphabet offers AI leadership, search dominance, and YouTube at a reasonable valuation.', factors: [{ name: 'Fundamentals', score: 85, explanation: 'Strong ad revenue recovery and cloud growth.', source: 'Yahoo Finance' }, { name: 'Moat', score: 88, explanation: 'Search monopoly and data network effects.', source: 'SEC EDGAR' }, { name: 'Risk', score: 62, explanation: 'Regulatory antitrust risk in multiple jurisdictions.', source: 'Yahoo Finance' }, { name: 'Valuation', score: 72, explanation: 'Reasonable P/E given earnings growth outlook.', source: 'Yahoo Finance' }, { name: 'Management', score: 74, explanation: 'Solid execution but AI transition creates uncertainty.', source: 'SEC EDGAR' }] },
    AMZN:  { score: 65, summary: 'Amazon benefits from AWS and advertising but retail margins remain under pressure.', factors: [{ name: 'Fundamentals', score: 72, explanation: 'AWS and ads drive margin expansion.', source: 'Yahoo Finance' }, { name: 'Moat', score: 85, explanation: 'Prime ecosystem and logistics network.', source: 'SEC EDGAR' }, { name: 'Risk', score: 60, explanation: 'Regulatory scrutiny and labor cost headwinds.', source: 'Yahoo Finance' }, { name: 'Valuation', score: 55, explanation: 'Fair value; limited near-term upside.', source: 'Yahoo Finance' }, { name: 'Management', score: 68, explanation: 'Post-Bezos transition progressing steadily.', source: 'SEC EDGAR' }] },
  }

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
      const demo = DEMO_DATA[key]
      if (demo) {
        setResult({ ticker: key, score: demo.score, factors: demo.factors, summary: demo.summary })
        setQuote(DEMO_QUOTES[key] || null)
        setFinancials(DEMO_FINANCIALS[key] || [])
        setRatios(DEMO_RATIOS[key] || {})
        setRawScore(null)
      } else {
        setError(`Ticker "${key}" not found or not in demo set.`)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const t = searchParams.get('ticker')
    if (t) analyse(t)
  }, [searchParams])

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
            </div>
          </div>

          {error && (
          <div style={{ padding: '0 32px 24px' }}>
            <p style={{ ...M, fontSize: '11px', color: C.down, marginBottom: '12px' }}>Ticker not found or not in demo set.</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ ...M, fontSize: '10px', color: C[400], alignSelf: 'center' }}>Try a demo ticker:</span>
              {['AAPL','NVDA','MSFT','TSLA','GOOGL','AMZN'].map(t => (
                <button key={t} onClick={() => { setInput(t); analyse(t) }} style={{
                  ...M, fontSize: '11px', background: C[100], border: `1px solid ${C[200]}`,
                  borderRadius: '6px', padding: '4px 12px', cursor: 'pointer', color: C.black,
                }}>{t}</button>
              ))}
            </div>
          </div>
        )}

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
              <div style={{ padding: '80px 32px', textAlign: 'center' }}>
                <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>[ News ]</p>
                <p style={{ ...S, fontSize: '22px', fontWeight: 500, color: C[300], margin: '0 0 12px' }}>News feed coming in Phase C.</p>
                <p style={{ ...S, fontSize: '14px', color: C[400] }}>Requires NewsAPI integration · no placeholder data shown.</p>
              </div>
            </motion.div>
          )}
          {result && activeTab === 4 && (
            <motion.div key="orderbook" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div style={{ padding: '80px 32px', textAlign: 'center' }}>
                <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>[ Order Book ]</p>
                <p style={{ ...S, fontSize: '22px', fontWeight: 500, color: C[300], margin: '0 0 12px' }}>Live order book coming in Phase C.</p>
                <p style={{ ...S, fontSize: '14px', color: C[400] }}>Requires real-time market data feed.</p>
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
