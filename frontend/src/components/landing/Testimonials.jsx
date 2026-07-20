import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { C } from '../../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

const quotes = [
  {
    text: "The score is much better than a raw price. Undervalued/overvalued with a number — that's what I need.",
    name: 'Gunnar', role: 'Value Investor',
    initial: 'G',
  },
  {
    text: "I find it amazing. Gen-Z mindset — rate everything out of ten. That's how I think.",
    name: 'Patricia', role: 'Passive Investor',
    initial: 'P',
  },
  {
    text: "I really like the comparison part. That's how you can actually make a decision.",
    name: 'José', role: 'Finance Professional',
    initial: 'J',
  },
]

function TestimonialCard({ quote, index, total }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  // Card slides up from bottom and stops — next card will slide over it
  const y = useTransform(scrollYProgress, [0, 1], ['100%', '0%'])

  return (
    <div ref={ref} style={{ height: '55vh', position: 'sticky', top: '80px' }}>
      <motion.div
        style={{
          y,
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          borderRadius: '24px',
          overflow: 'hidden',
          height: '100%',
          zIndex: index + 1,
        }}
      >
        {/* Avatar */}
        <div style={{
          background: C[600],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            ...S,
            fontSize: 'clamp(60px, 8vw, 100px)',
            fontWeight: 500,
            color: C[200],
            lineHeight: 1,
            letterSpacing: '-4px',
            userSelect: 'none',
          }}>
            {quote.initial}
          </span>
        </div>

        {/* Text */}
        <div style={{
          backgroundColor: C[100],
          padding: '48px 48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: '48px',
          gap: '16px',
        }}>
          <p style={{ ...S, fontSize: 'clamp(15px, 1.4vw, 20px)', fontWeight: 500, lineHeight: 1.45, color: C.black, letterSpacing: '-0.01em' }}>
            "{quote.text}"
          </p>
          <div>
            <p style={{ ...S, fontSize: '17.6px', fontWeight: 500, color: C.black }}>{quote.name}</p>
            <p style={{ ...S, fontSize: '15px', fontWeight: 400, color: C[400], marginTop: '4px' }}>{quote.role}</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <section style={{ paddingTop: '32px', paddingBottom: '120px', background: C.white }}>
      <div className="bungee-container">

        {/* Header */}
        <div style={{ marginBottom: '64px' }}>
          <p style={{ ...M, fontSize: '14px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>( TESTIMONIALS )</p>
          <h2 style={{ ...S, fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: '1.1', color: C.black, maxWidth: '640px' }}>
            Trusted by investors who aren't afraid to question the data.
          </h2>
        </div>

        {/* Stacking cards */}
        <div style={{ position: 'relative' }}>
          {quotes.map((q, i) => (
            <TestimonialCard key={i} quote={q} index={i} total={quotes.length} />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          style={{ marginTop: '80px', paddingTop: '40px', borderTop: `1px solid ${C[200]}`, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { num: '45', label: 'Investors interviewed' },
            { num: '71%', label: 'Trust only sourced data' },
            { num: '60s', label: 'To your first verdict' },
            { num: '€0', label: 'To start — no card needed' },
          ].map(s => (
            <div key={s.label}>
              <p style={{ ...S, fontSize: 'clamp(32px, 3vw, 48px)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1, color: C.black }}>{s.num}</p>
              <p style={{ ...M, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', color: C[400], marginTop: '8px' }}>{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
