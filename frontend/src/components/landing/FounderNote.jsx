import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { C } from '../../lib/colors'
import { G, S, M } from '../../lib/grid'

export default function FounderNote() {
  return (
    <section style={{ paddingTop: '120px', paddingBottom: '120px', background: C[100] }}>
      <div className="bungee-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

          {/* Left — avatar placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            {/* Avatar */}
            <div style={{
              width: '96px', height: '96px', borderRadius: '50%',
              background: C[600], display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ ...S, fontSize: '36px', fontWeight: 500, color: C[200], letterSpacing: '-2px' }}>D</span>
            </div>

            {/* Name + role */}
            <div>
              <p style={{ ...S, fontSize: '22px', fontWeight: 500, color: C.black, margin: '0 0 4px' }}>Daniel</p>
              <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Founder · pondex_</p>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '40px', paddingTop: '8px', borderTop: `1px solid ${C[200]}` }}>
              {[
                { num: '45', label: 'Investors interviewed' },
                { num: '3', label: 'Months building' },
              ].map(s => (
                <div key={s.label}>
                  <p style={{ ...S, fontSize: '28px', fontWeight: 500, color: C.black, margin: '0 0 4px', letterSpacing: '-1px' }}>{s.num}</p>
                  <p style={{ ...M, fontSize: '10px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — story */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 24px' }}>[ Why I built this ]</p>

            <p style={{ ...S, fontSize: 'clamp(18px, 1.8vw, 24px)', fontWeight: 500, lineHeight: 1.4, color: C.black, letterSpacing: '-0.3px', margin: '0 0 24px' }}>
              "I spent hours reading analyst reports, Reddit threads, and earnings calls — only to still feel unsure. Too much noise. No clear signal."
            </p>

            <p style={{ ...S, fontSize: '16px', color: C[500], lineHeight: 1.7, margin: '0 0 16px' }}>
              I built pondex_ because I kept asking: <em>is this stock actually a good fit for me right now?</em> Every source gave me a different answer. None of them cited their sources. None of them cared about my strategy.
            </p>

            <p style={{ ...S, fontSize: '16px', color: C[500], lineHeight: 1.7, margin: '0 0 32px' }}>
              After 45 investor interviews, one thing was clear: the problem isn't access to data — it's too much of it. pondex_ gives you one number, one verdict, every source cited. That's it.
            </p>

            <Link to="/signup" style={{
              ...M, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em',
              color: C.black, textDecoration: 'none',
              borderBottom: `1px solid ${C.black}`, paddingBottom: '2px',
            }}>
              Try it free →
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
