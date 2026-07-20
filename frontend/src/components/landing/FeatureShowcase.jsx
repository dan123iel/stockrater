import { motion } from 'framer-motion'
import { BungeeButton } from './BungeeButton'
import { C } from '../../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

const features = [
  { num: '01', title: 'The Verdict Card.', quote: 'Not just what the numbers are — what they mean.', body: 'A single 1–100 score, weighted to your investor strategy. Every component explained in plain language before the number.', tag: 'Score' },
  { num: '02', title: 'Source on Every Number.', quote: "I don't trust anyone — I need to do my own research.", body: '58% of investors only use AI output when the exact source is shown inline. Every number. Every source. Every time.', tag: 'Attribution' },
  { num: '03', title: 'Plain Language.', quote: "Don't assume everyone knows what DCF means.", body: 'Every metric has an inline plain-language explanation. No prior finance knowledge assumed.', tag: 'Clarity' },
  { num: '04', title: 'Peer Comparison.', quote: "That's how you can actually make a decision.", body: 'Two companies side by side, with sector average as a third column. Strongest positive reaction in all user tests.', tag: 'Compare' },
]

export default function FeatureShowcase() {
  return (
    <section id="features" style={{ paddingTop: '32px', paddingBottom: '128px', background: C.white }}>
      <div className="bungee-container">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
          <div>
            <p style={{ ...M, fontSize: '14px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>[ What you get ]</p>
            <h2 style={{ ...S, fontSize: 'clamp(40px, 4vw, 60px)', fontWeight: 500, letterSpacing: '-1.2px', lineHeight: '1.05', color: C.black }}>
              Built for the way<br />you actually decide.
            </h2>
          </div>
          <BungeeButton href="#demo">See it in action</BungeeButton>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {features.map((f, i) => (
            <motion.div
              key={f.num}
              style={{ display: 'flex', gap: '64px', alignItems: 'flex-start', padding: '40px 0', borderTop: `1px solid ${C[200]}`, cursor: 'default' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0, width: '120px' }}>
                <span style={{ ...M, fontSize: '14px', color: C[400] }}>{f.num}</span>
                <span style={{ ...M, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.08em', border: `1px solid ${C[200]}`, color: C[400], padding: '2px 8px', borderRadius: '50px' }}>{f.tag}</span>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ ...S, fontSize: 'clamp(20px, 2vw, 32px)', fontWeight: 500, color: C.black, marginBottom: '8px', letterSpacing: '-0.01em' }}>{f.title}</h3>
                <p style={{ ...M, fontSize: '13px', color: C[400], fontStyle: 'italic', marginBottom: '12px' }}>"{f.quote}"</p>
                <p style={{ ...S, fontSize: '17.6px', fontWeight: 400, color: C[400], lineHeight: '1.6', maxWidth: '520px' }}>{f.body}</p>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: `1px solid ${C[200]}` }} />
        </div>
      </div>
    </section>
  )
}
