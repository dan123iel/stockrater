import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { C } from '../../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

export default function MidCTA() {
  return (
    <section style={{ paddingTop: '80px', paddingBottom: '80px', background: C.black }}>
      <div className="bungee-container">
        <motion.div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '48px', flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p style={{ ...M, fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 12px' }}>
              [ 71% of investors only trust sourced data ]
            </p>
            <h2 style={{ ...S, fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 500, letterSpacing: '-1px', lineHeight: 1.1, color: C.white, margin: 0 }}>
              Every number pondex_ shows<br />cites its source. Always.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
            <Link to="/signup" style={{
              ...S, fontSize: '15px', fontWeight: 600,
              background: C.white, color: C.black,
              textDecoration: 'none', padding: '14px 32px',
              borderRadius: '10px', whiteSpace: 'nowrap',
            }}>
              Start free — no card needed
            </Link>
            <p style={{ ...M, fontSize: '10px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>
              1 verdict/day free · Pro from €4.99/mo
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
