import { useState } from 'react'
import { motion } from 'framer-motion'
import { C } from '../../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

const stocks = {
  AAPL: {
    name: 'Apple Inc.', score: 78, verdict: 'HOLD', color: '#d97706',
    metrics: [
      { label: 'Score',         value: '78/100',  sector: '71/100' },
      { label: 'P/E Ratio',     value: '28.4x',   sector: '34.1x'  },
      { label: 'Gross Margin',  value: '44.1%',   sector: '31.2%'  },
      { label: 'Revenue Growth',value: '+6.1%',   sector: '+8.4%'  },
      { label: 'FCF Yield',     value: '4.2%',    sector: '3.1%'   },
    ],
  },
  MSFT: {
    name: 'Microsoft', score: 84, verdict: 'BUY', color: '#16a34a',
    metrics: [
      { label: 'Score',         value: '84/100',  sector: '71/100' },
      { label: 'P/E Ratio',     value: '32.1x',   sector: '34.1x'  },
      { label: 'Gross Margin',  value: '69.4%',   sector: '31.2%'  },
      { label: 'Revenue Growth',value: '+17.6%',  sector: '+8.4%'  },
      { label: 'FCF Yield',     value: '3.8%',    sector: '3.1%'   },
    ],
  },
}

function verdictBg(v) {
  if (v === 'BUY')  return '#16a34a'
  if (v === 'HOLD') return '#d97706'
  return '#dc2626'
}

export default function ComparisonTeaser() {
  const [left, setLeft] = useState('AAPL')
  const [right, setRight] = useState('MSFT')
  const tickers = Object.keys(stocks)

  const sectorAvg = {
    name: 'Sector Avg', score: 71, verdict: null,
    metrics: stocks[left].metrics.map(m => ({ label: m.label, value: m.sector })),
  }

  const cols = [stocks[left], stocks[right], sectorAvg]

  return (
    <section style={{ paddingTop: '80px', paddingBottom: '80px', background: C[100] }}>
      <div className="bungee-container">

        <motion.div
          style={{ marginBottom: '48px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p style={{ ...M, fontSize: '13px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>[ Compare stocks ]</p>
          <h2 style={{ ...S, fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 500, letterSpacing: '-1.5px', lineHeight: 1.05, color: C.black }}>
            Side by side.<br />With sector context.
          </h2>
        </motion.div>

        {/* Ticker selectors */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em' }}>Stock A:</span>
            {tickers.map(t => (
              <button key={t} onClick={() => setLeft(t)}
                style={{ ...M, fontSize: '11px', padding: '5px 12px', borderRadius: '8px', cursor: 'pointer', border: `1px solid ${left === t ? C.black : C[200]}`, background: left === t ? C.black : C.white, color: left === t ? C.white : C[400], transition: 'all 0.15s' }}>
                {t}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em' }}>Stock B:</span>
            {tickers.map(t => (
              <button key={t} onClick={() => setRight(t)}
                style={{ ...M, fontSize: '11px', padding: '5px 12px', borderRadius: '8px', cursor: 'pointer', border: `1px solid ${right === t ? C.black : C[200]}`, background: right === t ? C.black : C.white, color: right === t ? C.white : C[400], transition: 'all 0.15s' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison table */}
        <motion.div
          style={{ background: C.white, borderRadius: '20px', overflow: 'hidden', border: `1px solid ${C[200]}` }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr 1fr', borderBottom: `1px solid ${C[200]}` }}>
            <div style={{ padding: '20px 24px' }} />
            {cols.map((col, i) => (
              <div key={i} style={{ padding: '20px 24px', borderLeft: `1px solid ${C[200]}` }}>
                <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                  {col.name}
                </p>
                {col.verdict && (
                  <span style={{ ...M, fontSize: '10px', background: verdictBg(col.verdict), color: C.white, padding: '2px 8px', borderRadius: '50px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {col.verdict}
                  </span>
                )}
                {!col.verdict && (
                  <span style={{ ...M, fontSize: '10px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.06em' }}>Benchmark</span>
                )}
              </div>
            ))}
          </div>

          {/* Rows */}
          {stocks[left].metrics.map((metric, ri) => (
            <div key={metric.label} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 1fr 1fr', borderBottom: ri < stocks[left].metrics.length - 1 ? `1px solid ${C[100]}` : 'none' }}>
              <div style={{ padding: '16px 24px' }}>
                <span style={{ ...S, fontSize: '13px', fontWeight: 500, color: C[500] }}>{metric.label}</span>
              </div>
              {cols.map((col, ci) => (
                <div key={ci} style={{ padding: '16px 24px', borderLeft: `1px solid ${C[100]}` }}>
                  <span style={{ ...M, fontSize: '14px', color: ci === 2 ? C[400] : C.black, fontWeight: ci < 2 ? 500 : 400 }}>
                    {col.metrics[ri].value}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        <motion.p
          style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '16px' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Comparison available in Pro · Sources: Yahoo Finance · TTM
        </motion.p>
      </div>
    </section>
  )
}
