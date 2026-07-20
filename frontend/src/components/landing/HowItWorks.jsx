import { motion } from 'framer-motion'
import { BungeeButton } from './BungeeButton'
import { C } from '../../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

const steps = [
  { num: '( 001 )', title: 'Enter any ticker.', body: 'Type AAPL, NVDA, or any stock. pondex pulls live data from Yahoo Finance and SEC filings — not a cached database.', bg: C[100] },
  { num: '( 002 )', title: 'Get a plain-language verdict.', body: 'Every factor is explained before the score. No P/E without an explanation of what P/E means. Explanation first — score as conclusion.', bg: C[200] },
  { num: '( 003 )', title: 'See every source.', body: '"Yahoo Finance – TTM." "SEC 10-K – 2024." Not "our algorithm says so." Every number. Every source. Every time.', bg: C[300] },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ paddingTop: '32px', paddingBottom: '120px', background: C.white }}>
      <div className="bungee-container">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
          <div>
            <p style={{ ...M, fontSize: '14px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>[ How pondex works ]</p>
            <h2 style={{ ...S, fontSize: 'clamp(40px, 4vw, 60px)', fontWeight: 500, letterSpacing: '-1.2px', lineHeight: '1.05', color: C.black }}>
              Three steps.<br />Under 60 seconds.
            </h2>
          </div>
          <BungeeButton href="#demo">Try it now</BungeeButton>
        </div>

        <div style={{ display: 'flex', gap: '24px', overflowX: 'auto' }}>
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              style={{
                backgroundColor: s.bg,
                borderRadius: '40px',
                padding: '40px',
                width: '450px',
                minWidth: '320px',
                height: '500px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
            >
              <div>
                <p style={{ ...M, fontSize: '14px', color: C.black, marginBottom: '32px' }}>{s.num}</p>
              </div>
              <div>
                <h3 style={{ ...S, fontSize: '24px', fontWeight: 500, color: C.black, marginBottom: '16px' }}>{s.title}</h3>
                <p style={{ ...S, fontSize: '17.6px', fontWeight: 400, color: C[600], lineHeight: '1.5' }}>{s.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
