import { motion } from 'framer-motion'
import { BungeeButton } from './BungeeButton'

const S = { fontFamily: 'Interdisplay, Inter, Arial, sans-serif' }
const M = { fontFamily: 'Chivo Mono, monospace' }

// Real stats from Wave 1 + Wave 2 + interviews
const stats = [
  { num: '58%', label: 'only trust AI output when every number cites its exact source' },
  { num: '4–5', label: 'tools the average investor opens before a single trade' },
  { num: '91', label: 'investors validated every insight on this page' },
]

// Real user quotes from interviews
const quotes = [
  { text: '"I have 5 tabs open and still don\'t know what to do."', name: 'Wave 1, n=56' },
  { text: '"ChatGPT gives numbers with no source."', name: 'Wave 1, n=56' },
  { text: '"2 hours of research. Gut decision anyway."', name: 'Wave 1, n=56' },
]

const problems = [
  {
    num: '01',
    title: 'Data without context.',
    body: "Yahoo Finance shows P/E: 28x. Cheap or expensive? No free tool answers that. They display — they don't interpret.",
  },
  {
    num: '02',
    title: 'No audit trail.',
    body: '58% of investors only trust output when every number cites its exact source. No tool does this by default.',
  },
  {
    num: '03',
    title: 'Research fragmentation.',
    body: 'ChatGPT → Yahoo Finance → broker → YouTube. Then a gut call. The information exists — it\'s just scattered.',
  },
]

export default function ProblemSection() {
  return (
    <section id="problem" style={{ paddingTop: '120px', paddingBottom: '120px', background: '#ffffff' }}>
      <div className="bungee-container">

        {/* Stats row — from real research */}
        <motion.div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', borderTop: '1px solid #d0d8e4', borderBottom: '1px solid #d0d8e4', marginBottom: '80px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{ padding: '32px 40px', borderRight: i < 2 ? '1px solid #d0d8e4' : 'none' }}>
              <p style={{ ...S, fontSize: 'clamp(40px, 4vw, 60px)', fontWeight: 500, letterSpacing: '-1.2px', lineHeight: 1, color: '#1e1e1e', marginBottom: '8px' }}>{s.num}</p>
              <p style={{ ...S, fontSize: '15px', color: '#5a6271', lineHeight: 1.4, maxWidth: '220px' }}>{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
          <div>
            <p style={{ ...M, fontSize: '13px', color: '#5a6271', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>[ The Problem ]</p>
            <h2 style={{ ...S, fontSize: 'clamp(40px, 4vw, 60px)', fontWeight: 500, letterSpacing: '-1.2px', lineHeight: '1.05', color: '#1e1e1e' }}>
              Five tabs.<br />Two hours.<br />One gut decision.
            </h2>
          </div>
          <BungeeButton href="#demo">See the solution</BungeeButton>
        </div>

        {/* Problem list */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {problems.map((p, i) => (
            <motion.div
              key={p.num}
              style={{ display: 'flex', gap: '64px', alignItems: 'flex-start', padding: '40px 0', borderTop: '1px solid #d0d8e4' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
            >
              <span style={{ ...M, fontSize: '13px', color: '#5a6271', flexShrink: 0, width: '32px' }}>{p.num}</span>
              <div style={{ flex: 1 }}>
                <h3 style={{ ...S, fontSize: 'clamp(20px, 2vw, 28px)', fontWeight: 500, color: '#1e1e1e', marginBottom: '10px' }}>{p.title}</h3>
                <p style={{ ...S, fontSize: '17.6px', fontWeight: 400, color: '#5a6271', lineHeight: '1.5', maxWidth: '560px' }}>{p.body}</p>
              </div>
              {/* User quote aligned right */}
              <div style={{ flexShrink: 0, maxWidth: '280px', opacity: 0.5 }}>
                <p style={{ ...M, fontSize: '12px', color: '#1e1e1e', fontStyle: 'italic', lineHeight: 1.5 }}>{quotes[i].text}</p>
                <p style={{ ...M, fontSize: '10px', color: '#5a6271', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '6px' }}>— {quotes[i].name}</p>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid #d0d8e4' }} />
        </div>

        <p style={{ ...M, marginTop: '24px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(30,30,30,0.3)' }}>
          Based on Survey Wave 1 (n=56), Wave 2 (n=35) + 3 depth interviews · July 2026
        </p>
      </div>
    </section>
  )
}
