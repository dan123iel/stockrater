import { motion } from 'framer-motion'
import { BungeeButton } from './BungeeButton'
import { C } from '../../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

const competitors = [
  { name: 'Yahoo Finance', what: 'Shows P/E: 28x', missing: 'Is that cheap or expensive? No answer.' },
  { name: 'ChatGPT', what: 'Gives a number', missing: 'No source. No formula. No audit trail.' },
  { name: 'Bloomberg', what: 'Everything', missing: '$340/month. 4 tabs open anyway.' },
  { name: 'Reddit / YouTube', what: 'Opinions', missing: 'No data. No accountability.' },
]

export default function Differentiation() {
  return (
    <section style={{ paddingTop: '32px', paddingBottom: '120px', background: C.white }}>
      <div className="bungee-container">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
          <div>
            <p style={{ ...M, fontSize: '13px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>[ Why not just use... ]</p>
            <h2 style={{ ...S, fontSize: 'clamp(40px, 4vw, 60px)', fontWeight: 500, letterSpacing: '-1.2px', lineHeight: 1.05, color: C.black }}>
              Every tool is missing<br />one thing.
            </h2>
          </div>
          <BungeeButton href="#demo">See what pondex_ does differently</BungeeButton>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {competitors.map((c, i) => (
            <motion.div key={c.name}
              style={{ display: 'flex', gap: '64px', alignItems: 'flex-start', padding: '32px 0', borderTop: `1px solid ${C[200]}` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <div style={{ width: '160px', flexShrink: 0 }}>
                <p style={{ ...S, fontSize: '17.6px', fontWeight: 500, color: C.black }}>{c.name}</p>
                <p style={{ ...S, fontSize: '14px', color: C[400], marginTop: '4px' }}>{c.what}</p>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ ...M, fontSize: '18px', color: C[300], flexShrink: 0 }}>→</span>
                <p style={{ ...S, fontSize: '17.6px', color: C.black }}>{c.missing}</p>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: `1px solid ${C[200]}`, paddingTop: '32px' }}>
            <motion.div
              style={{ display: 'flex', gap: '64px', alignItems: 'flex-start' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div style={{ width: '160px', flexShrink: 0 }}>
                <p style={{ ...S, fontSize: '17.6px', fontWeight: 500, color: C.black }}>pondex_</p>
                <p style={{ ...S, fontSize: '14px', color: C[400], marginTop: '4px' }}>One verdict</p>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ ...M, fontSize: '18px', color: C[500], flexShrink: 0 }}>→</span>
                <p style={{ ...S, fontSize: '17.6px', color: C.black }}>Plain language. Every metric sourced. Weighted to your strategy. 60 seconds.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
