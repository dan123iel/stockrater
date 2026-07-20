import { motion } from 'framer-motion'
import { C } from '../../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

const factors = [
  { label: 'Fundamentals', score: 82, bar: 0.82, source: 'Yahoo Finance · TTM' },
  { label: 'Valuation',    score: 74, bar: 0.74, source: 'Yahoo Finance · TTM' },
  { label: 'Management',   score: 91, bar: 0.91, source: 'SEC EDGAR · Form 4'  },
]

function gaugeColor(score) {
  if (score >= 70) return '#16a34a'
  if (score >= 45) return '#d97706'
  return '#dc2626'
}

function GaugeArc({ score }) {
  const R = 70, cx = 90, cy = 90
  const targetAngle = 180 - (score / 100) * 180
  const color = gaugeColor(score)
  const toRad = deg => (deg * Math.PI) / 180
  const arcPath = (from, to) => {
    const x1 = cx + R * Math.cos(toRad(from)), y1 = cy - R * Math.sin(toRad(from))
    const x2 = cx + R * Math.cos(toRad(to)),   y2 = cy - R * Math.sin(toRad(to))
    const large = Math.abs(to - from) > 180 ? 1 : 0
    const sweep = to < from ? 1 : 0
    return `M ${x1} ${y1} A ${R} ${R} 0 ${large} ${sweep} ${x2} ${y2}`
  }
  const nx = cx + (R - 8) * Math.cos(toRad(targetAngle))
  const ny = cy - (R - 8) * Math.sin(toRad(targetAngle))

  return (
    <svg width="180" height="100" viewBox="0 0 180 100" style={{ overflow: 'visible' }}>
      <path d={arcPath(180, 0)} fill="none" stroke={C[100]} strokeWidth="10" strokeLinecap="round" />
      <motion.path d={arcPath(180, targetAngle)} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }} />
      <motion.line x1={cx} y1={cy} x2={nx} y2={ny} stroke={color} strokeWidth="2.5" strokeLinecap="round"
        initial={{ rotate: -180 }} whileInView={{ rotate: 0 }} viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }} />
      <circle cx={cx} cy={cy} r="5" fill={color} />
      <text x="18" y="98" style={{ fontFamily: 'Chivo Mono, monospace', fontSize: '9px', fill: C[400] }}>0</text>
      <text x="83" y="18" style={{ fontFamily: 'Chivo Mono, monospace', fontSize: '9px', fill: C[400] }}>50</text>
      <text x="152" y="98" style={{ fontFamily: 'Chivo Mono, monospace', fontSize: '9px', fill: C[400] }}>100</text>
    </svg>
  )
}

export default function ScoreCardSection() {
  const score = 78
  const color = gaugeColor(score)

  return (
    <section style={{ paddingTop: '80px', paddingBottom: '80px', background: C.white }}>
      <div className="bungee-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px' }}>

        {/* Label */}
        <motion.p
          style={{ ...M, fontSize: '13px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          [ This is what a verdict looks like ]
        </motion.p>

        {/* Score Card */}
        <motion.div
          style={{
            width: '100%',
            maxWidth: '520px',
            border: `1px solid ${C[200]}`,
            borderRadius: '24px',
            overflow: 'hidden',
            background: C.white,
            boxShadow: '0 4px 40px rgba(0,0,0,0.06)',
          }}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Header */}
          <div style={{ padding: '20px 28px 16px', borderBottom: `1px solid ${C[200]}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>AAPL · Apple Inc.</p>
              <p style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.08em' }}>Demo · Illustration only</p>
            </div>
            <span style={{ ...M, fontSize: '9px', color: C[300], border: `1px solid ${C[200]}`, borderRadius: '50px', padding: '2px 10px', textTransform: 'uppercase' }}>DEMO</span>
          </div>

          {/* Gauge + Score */}
          <div style={{ padding: '24px 28px', borderBottom: `1px solid ${C[200]}`, display: 'flex', alignItems: 'center', gap: '24px' }}>
            <GaugeArc score={score} />
            <div>
              <motion.div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                <span style={{ ...S, fontSize: '64px', fontWeight: 500, lineHeight: 1, color }}>{score}</span>
                <span style={{ ...S, fontSize: '20px', color: C[200] }}>/100</span>
              </motion.div>
              <p style={{ ...M, fontSize: '11px', color, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '6px' }}>Good Fit</p>
            </div>
          </div>

          {/* Factors */}
          {factors.map((f, i) => (
            <motion.div key={f.label}
              style={{ padding: '14px 28px', borderBottom: i < factors.length - 1 ? `1px solid ${C[200]}` : 'none', display: 'flex', gap: '16px', alignItems: 'center' }}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span style={{ ...S, fontSize: '13px', fontWeight: 500, color: C.black }}>{f.label}</span>
                  <span style={{ ...M, fontSize: '12px', color: C[500] }}>{f.score}</span>
                </div>
                <div style={{ height: '3px', background: C[100], borderRadius: '50px', overflow: 'hidden' }}>
                  <motion.div style={{ height: '100%', background: C[600], borderRadius: '50px' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${f.bar * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.7 }} />
                </div>
              </div>
              <span style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>{f.source}</span>
            </motion.div>
          ))}

          {/* Footer */}
          <div style={{ padding: '10px 28px', background: C[100] }}>
            <p style={{ ...M, fontSize: '9px', color: C[300], textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              ⚠ Research tool only · Not financial advice
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
