import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BungeeButton } from './BungeeButton'
import { C } from '../../lib/colors'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

const faqs = [
  { q: 'Is pondex financial advice?', a: 'No. pondex is a research tool that helps you understand financial data. Every verdict includes a disclaimer. We show you what the numbers mean — the decision is always yours.' },
  { q: 'Where does the data come from?', a: 'Live data from Yahoo Finance and SEC EDGAR filings. Every number displays its source and retrieval date. No black-box algorithms — full audit trail.' },
  { q: 'How is the score calculated?', a: 'The 1–100 score is derived from P/E ratio, FCF yield, gross margin, operating margin, revenue growth, insider transaction ratios, and valuation multiples. Each metric is weighted by your investor strategy: value, growth, dividend, or momentum.' },
  { q: 'Do I need to create an account?', a: 'No. The free tier requires no account. Your investor profile is stored locally in your browser — nothing is sent to any server.' },
  { q: 'Is the free tier really free?', a: 'Permanently free — 1 full verdict per day, no credit card required. The Pro tier at €4.99/month unlocks unlimited verdicts, comparison, and portfolio tracking.' },
  { q: 'ChatGPT sometimes gives wrong numbers. How is pondex different?', a: 'Every number includes a source badge with the data provider and retrieval date. If a data point is stale (>24h old), we flag it visibly. We do not generate numbers — we retrieve and cite them.' },
]

function FAQItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom: `1px solid ${C[200]}` }}>
      <button
        onClick={onToggle}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span style={{ ...S, fontSize: '17.6px', fontWeight: 400, color: C.black, textAlign: 'left' }}>{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ ...S, fontSize: '24px', fontWeight: 300, color: C[400], flexShrink: 0, marginLeft: '24px', lineHeight: 1, display: 'inline-block' }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ ...S, fontSize: '16px', fontWeight: 400, color: C[400], lineHeight: '22.4px', padding: '0 0 20px' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" style={{ paddingTop: '32px', paddingBottom: '96px', background: C.white }}>
      <div className="bungee-container">

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
          <div>
            <p style={{ ...M, fontSize: '13px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>[ FAQ ]</p>
            <h2 style={{ ...S, fontSize: 'clamp(40px, 4vw, 60px)', fontWeight: 500, letterSpacing: '-1.2px', lineHeight: '1.05', color: C.black }}>
              FAQ.
            </h2>
          </div>
          <BungeeButton href="mailto:hi@pondex.app">Still curious?</BungeeButton>
        </div>

        <div style={{ borderTop: `1px solid ${C[200]}` }}>
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              q={item.q}
              a={item.a}
              open={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
