import { useState, useEffect } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { C } from '../lib/colors'
import { S, M } from '../lib/grid'

// Generate synthetic 252-day price series from a seed price with realistic drift + noise
function generateCandles(startPrice, drift, volatility, days = 252) {
  const candles = []
  let price = startPrice
  const now = new Date()
  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const change = price * (drift / 252 + volatility * (Math.sin(i * 2.3) * 0.4 + Math.cos(i * 1.7) * 0.3 + Math.sin(i * 0.8) * 0.3))
    price = Math.max(price + change, 1)
    candles.push({ date: date.toISOString().split('T')[0], close: parseFloat(price.toFixed(2)), volume: Math.floor(50000000 + Math.sin(i) * 20000000) })
  }
  return candles
}

const DEMO_CANDLES = {
  AAPL:  generateCandles(164, 0.30, 0.018),
  NVDA:  generateCandles(87,  0.82, 0.032),
  MSFT:  generateCandles(386, 0.22, 0.015),
  TSLA:  generateCandles(214, 0.48, 0.042),
  GOOGL: generateCandles(156, 0.27, 0.017),
  AMZN:  generateCandles(167, 0.33, 0.019),
}

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const RANGES = [
  { label: '1W',  days: 7 },
  { label: '1M',  days: 30 },
  { label: '3M',  days: 90 },
  { label: '6M',  days: 180 },
  { label: '1Y',  days: 252 },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const val = payload[0]?.value
  return (
    <div style={{ background: C.black, color: C.white, padding: '8px 14px', borderRadius: '8px', ...M, fontSize: '12px' }}>
      <div style={{ marginBottom: '2px' }}>{label}</div>
      <div style={{ fontWeight: 600, fontSize: '14px' }}>${val?.toFixed(2)}</div>
    </div>
  )
}

export default function StockChart({ ticker, currentPrice }) {
  const [candles, setCandles] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDemo, setIsDemo] = useState(false)
  const [range, setRange] = useState('3M')

  useEffect(() => {
    if (!ticker) return
    setLoading(true)
    setIsDemo(false)
    fetch(`${API}/history/${ticker}`)
      .then(r => r.json())
      .then(data => {
        setCandles(data.candles || [])
        setLoading(false)
      })
      .catch(() => {
        const demo = DEMO_CANDLES[ticker.toUpperCase()]
        setCandles(demo || [])
        setIsDemo(true)
        setLoading(false)
      })
  }, [ticker])

  const selectedDays = RANGES.find(r => r.label === range)?.days || 90
  const filtered = candles.slice(-selectedDays)

  const firstClose = filtered[0]?.close || 0
  const lastClose  = filtered[filtered.length - 1]?.close || currentPrice || 0
  const change     = firstClose ? ((lastClose - firstClose) / firstClose) * 100 : 0
  const isUp       = change >= 0
  const lineColor  = isUp ? C.up : C.down

  const minVal = filtered.length ? Math.min(...filtered.map(c => c.close)) * 0.995 : 0
  const maxVal = filtered.length ? Math.max(...filtered.map(c => c.close)) * 1.005 : 100

  const chartData = filtered.map(c => ({
    date: new Date(c.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: parseFloat(c.close.toFixed(2)),
    volume: c.volume,
  }))

  return (
    <div>
      {/* Range selector */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', alignItems: 'center' }}>
        {RANGES.map(r => (
          <button key={r.label} onClick={() => setRange(r.label)} style={{
            ...M, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em',
            background: range === r.label ? C.black : 'transparent',
            color: range === r.label ? C.white : C[400],
            border: `1px solid ${range === r.label ? C.black : C[200]}`,
            borderRadius: '6px', padding: '5px 12px', cursor: 'pointer',
            transition: 'all 0.15s',
          }}>{r.label}</button>
        ))}
        {filtered.length > 0 && (
          <span style={{ ...M, fontSize: '13px', fontWeight: 600, color: isUp ? C.up : C.down, marginLeft: '16px' }}>
            {isUp ? '+' : ''}{change.toFixed(2)}% ({range})
          </span>
        )}
        {isDemo && (
          <span style={{ ...M, fontSize: '10px', color: C[300], marginLeft: 'auto', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Illustrative · Live chart requires backend
          </span>
        )}
      </div>

      {/* Chart */}
      {loading ? (
        <div style={{ height: '280px', background: C[100], borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...M, fontSize: '12px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}>Loading chart…</span>
        </div>
      ) : chartData.length === 0 ? (
        <div style={{ height: '280px', background: C[100], borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...M, fontSize: '12px', color: C[400] }}>Chart unavailable</span>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${ticker}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={lineColor} stopOpacity={0.15} />
                <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" tick={{ ...M, fontSize: 10, fill: C[400] }} tickLine={false} axisLine={false} interval={Math.floor(chartData.length / 5)} />
            <YAxis domain={[minVal, maxVal]} tick={{ ...M, fontSize: 10, fill: C[400] }} tickLine={false} axisLine={false} tickFormatter={v => `$${v.toFixed(0)}`} width={56} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="price" stroke={lineColor} strokeWidth={2} fill={`url(#grad-${ticker})`} dot={false} activeDot={{ r: 4, fill: lineColor, strokeWidth: 0 }} />
          </AreaChart>
        </ResponsiveContainer>
      )}

      {/* Volume */}
      {!loading && chartData.length > 0 && (
        <div style={{ marginTop: '8px' }}>
          <ResponsiveContainer width="100%" height={40}>
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <YAxis domain={['auto', 'auto']} hide />
              <XAxis dataKey="date" hide />
              <Area type="monotone" dataKey="volume" stroke="none" fill={C[200]} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <p style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '4px' }}>
            Volume · {isDemo ? 'Illustrative data' : 'Source: Yahoo Finance'}
          </p>
        </div>
      )}
    </div>
  )
}


const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const RANGES = [
  { label: '1W',  days: 7 },
  { label: '1M',  days: 30 },
  { label: '3M',  days: 90 },
  { label: '6M',  days: 180 },
  { label: '1Y',  days: 252 },
]

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const val = payload[0]?.value
  return (
    <div style={{ background: C.black, color: C.white, padding: '8px 14px', borderRadius: '8px', ...M, fontSize: '12px' }}>
      <div style={{ marginBottom: '2px' }}>{label}</div>
      <div style={{ fontWeight: 600, fontSize: '14px' }}>${val?.toFixed(2)}</div>
    </div>
  )
}

export default function StockChart({ ticker, currentPrice }) {
  const [candles, setCandles] = useState([])
  const [loading, setLoading] = useState(true)
  const [range, setRange] = useState('3M')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!ticker) return
    setLoading(true)
    setError(null)
    fetch(`${API}/history/${ticker}`)
      .then(r => r.json())
      .then(data => {
        setCandles(data.candles || [])
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [ticker])

  const selectedDays = RANGES.find(r => r.label === range)?.days || 90
  const filtered = candles.slice(-selectedDays)

  const firstClose = filtered[0]?.close || 0
  const lastClose  = filtered[filtered.length - 1]?.close || currentPrice || 0
  const change     = firstClose ? ((lastClose - firstClose) / firstClose) * 100 : 0
  const isUp       = change >= 0
  const lineColor  = isUp ? '#16a34a' : '#dc2626'

  const minVal = Math.min(...filtered.map(c => c.close)) * 0.995
  const maxVal = Math.max(...filtered.map(c => c.close)) * 1.005

  const chartData = filtered.map(c => ({
    date: new Date(c.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: parseFloat(c.close.toFixed(2)),
    volume: c.volume,
  }))

  const earningsEvents = getEarningsEvents(filtered)

  return (
    <div>
      {/* Range selector + legend */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '24px', alignItems: 'center' }}>
        {RANGES.map(r => (
          <button key={r.label} onClick={() => setRange(r.label)} style={{
            ...M, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em',
            background: range === r.label ? C.black : 'transparent',
            color: range === r.label ? C.white : C[400],
            border: `1px solid ${range === r.label ? C.black : C[200]}`,
            borderRadius: '6px', padding: '5px 12px', cursor: 'pointer',
            transition: 'all 0.15s',
          }}>{r.label}</button>
        ))}
        <span style={{ ...M, fontSize: '13px', fontWeight: 600, color: isUp ? '#16a34a' : '#dc2626', marginLeft: '16px' }}>
          {isUp ? '+' : ''}{change.toFixed(2)}% ({range})
        </span>
        {/* Event legend */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '2px', height: '14px', background: '#7c3aed', borderRadius: '1px' }} />
            <span style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em' }}>E Earnings</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <div style={{ width: '2px', height: '14px', background: '#16a34a', borderRadius: '1px' }} />
            <span style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em' }}>D Dividend</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      {loading ? (
        <div style={{ height: '280px', background: C[100], borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...M, fontSize: '12px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}>Loading chart…</span>
        </div>
      ) : error ? (
        <div style={{ height: '280px', background: C[100], borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...M, fontSize: '12px', color: C[400] }}>Chart unavailable</span>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`grad-${ticker}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={lineColor} stopOpacity={0.15} />
                <stop offset="100%" stopColor={lineColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ ...M, fontSize: 10, fill: C[400] }}
              tickLine={false}
              axisLine={false}
              interval={Math.floor(chartData.length / 5)}
            />
            <YAxis
              domain={[minVal, maxVal]}
              tick={{ ...M, fontSize: 10, fill: C[400] }}
              tickLine={false}
              axisLine={false}
              tickFormatter={v => `$${v.toFixed(0)}`}
              width={56}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Earnings event markers */}
            {earningsEvents.map((ev, i) => (
              <ReferenceLine
                key={`e-${i}`}
                x={ev.date}
                stroke={ev.color}
                strokeWidth={1.5}
                strokeDasharray="4 3"
                label={{
                  value: ev.type,
                  position: 'top',
                  style: { ...M, fontSize: 9, fill: ev.color, fontWeight: 700 },
                }}
              />
            ))}
            <Area
              type="monotone"
              dataKey="price"
              stroke={lineColor}
              strokeWidth={2}
              fill={`url(#grad-${ticker})`}
              dot={false}
              activeDot={{ r: 4, fill: lineColor, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}

      {/* Volume bar below */}
      {!loading && !error && chartData.length > 0 && (
        <div style={{ marginTop: '8px' }}>
          <ResponsiveContainer width="100%" height={40}>
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <YAxis domain={['auto', 'auto']} hide />
              <XAxis dataKey="date" hide />
              <Area type="monotone" dataKey="volume" stroke="none" fill={C[200]} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <p style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '4px' }}>
            Volume · Source: Yahoo Finance
          </p>
        </div>
      )}
    </div>
  )
}
