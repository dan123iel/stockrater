import { motion } from 'framer-motion'
import { BungeeButton } from './BungeeButton'
import { C } from '../../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

export default function FinalCTA() {
  return (
    <section style={{ paddingTop: '120px', paddingBottom: '120px', background: C.white, borderTop: `1px solid ${C[200]}` }}>
      <div className="bungee-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '48px', flexWrap: 'wrap' }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ ...S, fontSize: 'clamp(48px, 5vw, 70.08px)', fontWeight: 500, letterSpacing: '-2.1px', lineHeight: 1.0, color: C.black }}>
            Stop guessing.<br />Start verifying.
          </h2>
          <p style={{ ...S, fontSize: '17.6px', fontWeight: 400, color: C[400], marginTop: '24px', maxWidth: '420px', lineHeight: '1.5' }}>
            Your first verdict takes 60 seconds. No account. No credit card.
          </p>
        </motion.div>

        <motion.div
          style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          <BungeeButton href="#demo">Analyse a stock now — it's free</BungeeButton>
          <p style={{ ...M, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: C[300] }}>
            Europe &amp; Latin America · Built on real research · v1.0
          </p>
        </motion.div>
      </div>
    </section>
  )
}
