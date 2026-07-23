import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import AppNav from '../components/AppNav'
import { C } from '../lib/colors'
import { G, S, M } from '../lib/grid'
import { headline, btn, card } from '../lib/bungee'

const STEPS = [
  { num: '( 01 )', title: 'Define your goal.', body: 'Retirement, wealth building, or a major purchase — your goal shapes your allocation.' },
  { num: '( 02 )', title: 'Set your risk profile.', body: 'How would you react to a 20% drop? Your answer determines the portfolio structure.' },
  { num: '( 03 )', title: 'We build the portfolio.', body: 'pondex assembles a diversified portfolio matched to your strategy and horizon.' },
  { num: '( 04 )', title: 'Automated rebalancing.', body: 'Your portfolio stays on track automatically. No manual intervention needed.' },
]

const PORTFOLIO_TYPES = [
  { name: 'Core',         risk: 'Moderate', alloc: '80% Equities · 20% Bonds', est: '+8.2% p.a.' },
  { name: 'Growth',       risk: 'High',     alloc: '95% Equities · 5% Bonds',  est: '+11.4% p.a.' },
  { name: 'Conservative', risk: 'Low',      alloc: '50% Equities · 50% Bonds', est: '+5.1% p.a.' },
]

const QUESTIONS = [
  { q: 'What is your investment goal?',    opts: ['Wealth building', 'Retirement', 'Large purchase', 'Income'] },
  { q: 'What is your investment horizon?', opts: ['< 1 year', '1–5 years', '5–10 years', '10+ years'] },
  { q: 'If your portfolio drops 20%:',     opts: ['Sell immediately', 'Hold and wait', 'Buy more'] },
  { q: 'Your investing experience:',       opts: ['Just starting', '1–3 years', '3+ years'] },
]

const ROBO_TABS = ['Portfolio', 'Savings Plans', 'Round-up', 'Forecasts']

export default function RoboAdvisor() {
  const navigate = useNavigate()
  const user = (() => { try { return JSON.parse(localStorage.getItem('pondex_user')) } catch { return null } })()
  const logout = () => { localStorage.removeItem('pondex_user'); navigate('/') }
  const [activeTab, setActiveTab] = useState(0)
  const [onboarding, setOnboarding] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})

  return (
    <div style={{ minHeight: '100vh', background: C.white }}>
      <AppNav userEmail={user?.email} onLogout={logout} />
      <main style={{ paddingTop: G.nav.height, maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>

        {/* Header */}
        <div style={{ padding: '56px 32px 0', borderBottom: `1px solid ${C[100]}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '32px' }}>
            <div>
              <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 12px' }}>[ Robo Advisor ]</p>
              <h1 style={{ ...headline.xl, margin: 0 }}>Investing on autopilot.</h1>
            </div>
            <p style={{ ...S, fontSize: '15px', color: C[400], maxWidth: '360px', lineHeight: 1.6, paddingBottom: '8px', margin: 0 }}>
              Set your goal. Define your risk. pondex builds and rebalances your portfolio automatically.
            </p>
          </div>
          <div style={{ display: 'flex' }}>
            {ROBO_TABS.map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(i)} style={{
                ...M, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em',
                color: activeTab === i ? C.black : C[400],
                background: 'none', border: 'none',
                borderBottom: activeTab === i ? `2px solid ${C.black}` : '2px solid transparent',
                padding: '18px 24px 16px', cursor: 'pointer', marginBottom: '-1px',
              }}>{tab}</button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">

          {/* Portfolio tab */}
          {activeTab === 0 && !onboarding && (
            <motion.div key="portfolio" style={{ padding: '48px 32px' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

              {/* How it works */}
              <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '32px' }}>[ How it works ]</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', marginBottom: '64px', borderTop: `2px solid ${C.black}` }}>
                {STEPS.map((s, i) => (
                  <motion.div key={s.num}
                    style={{ padding: '28px 24px 28px 0', borderRight: i < 3 ? `1px solid ${C[200]}` : 'none', paddingLeft: i > 0 ? '24px' : 0 }}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  >
                    <p style={{ ...M, fontSize: '11px', color: C[400], margin: '0 0 20px' }}>{s.num}</p>
                    <p style={{ ...headline.sm, margin: '0 0 12px' }}>{s.title}</p>
                    <p style={{ ...S, fontSize: '14px', color: C[400], lineHeight: 1.6, margin: 0 }}>{s.body}</p>
                  </motion.div>
                ))}
              </div>

              {/* Portfolio types */}
              <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '24px' }}>[ Portfolio types ]</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
                {PORTFOLIO_TYPES.map((p, i) => (
                  <motion.div key={p.name}
                    style={{ ...card.base, padding: '32px' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}
                  >
                    <p style={{ ...headline.sm, margin: '0 0 6px' }}>{p.name} Portfolio</p>
                    <p style={{ ...M, fontSize: '11px', color: C[400], margin: '0 0 20px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Risk: {p.risk}</p>
                    <p style={{ ...S, fontSize: '14px', color: C[500], margin: '0 0 16px' }}>{p.alloc}</p>
                    <div style={{ height: '1px', background: C[100], margin: '0 0 16px' }} />
                    <p style={{ ...M, fontSize: '16px', fontWeight: 600, color: '#16a34a', margin: 0 }}>{p.est}</p>
                    <p style={{ ...M, fontSize: '10px', color: C[300], margin: '4px 0 0' }}>estimated annual return</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA banner */}
              <motion.div
                style={{ ...card.dark, display: 'grid', gridTemplateColumns: '1fr auto', gap: '48px', alignItems: 'center', padding: '40px 48px' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              >
                <div>
                  <p style={{ ...M, fontSize: '10px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 12px' }}>Coming in Phase 3</p>
                  <p style={{ ...headline.lg, color: C.white, margin: 0 }}>Your automated portfolio.<br />Sourced. Transparent. Yours.</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '200px' }}>
                  <button onClick={() => setOnboarding(true)} style={{ ...btn.primary, background: C.white, color: C.black, textAlign: 'center' }}>
                    Start onboarding →
                  </button>
                  <p style={{ ...M, fontSize: '10px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', margin: 0 }}>Preview only · Not yet active</p>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Onboarding flow */}
          {activeTab === 0 && onboarding && (
            <motion.div key="onboarding" style={{ maxWidth: '600px', margin: '80px auto', padding: '0 32px' }}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              {/* Progress */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '56px' }}>
                {QUESTIONS.map((_, i) => (
                  <div key={i} style={{ flex: 1, height: '2px', background: i <= step ? C.black : C[200], borderRadius: '2px', transition: 'background 0.3s' }} />
                ))}
              </div>
              {step < QUESTIONS.length ? (
                <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 16px' }}>
                    Question {step + 1} of {QUESTIONS.length}
                  </p>
                  <h2 style={{ ...headline.lg, margin: '0 0 40px' }}>{QUESTIONS[step].q}</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {QUESTIONS[step].opts.map(opt => (
                      <button key={opt}
                        onClick={() => { setAnswers(a => ({ ...a, [step]: opt })); setStep(s => s + 1) }}
                        style={{ ...S, fontSize: '16px', color: C.black, background: C.white, border: `1.5px solid ${C[200]}`, borderRadius: '10px', padding: '18px 24px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = C.black; e.currentTarget.style.background = C[100] }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = C[200]; e.currentTarget.style.background = C.white }}
                      >{opt}</button>
                    ))}
                  </div>
                  <button onClick={() => { setOnboarding(false); setStep(0) }} style={{ ...btn.link, marginTop: '32px' }}>← Back</button>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                  <p style={{ ...M, fontSize: '11px', color: '#16a34a', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 16px' }}>[ Profile complete ]</p>
                  <h2 style={{ ...headline.lg, margin: '0 0 12px' }}>Your profile is ready.</h2>
                  <p style={{ ...S, fontSize: '15px', color: C[400], lineHeight: 1.6, margin: '0 0 40px' }}>
                    Based on your answers, we'd recommend the <strong>Growth Portfolio</strong>. Portfolio building is coming in Phase 3.
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => { setOnboarding(false); setStep(0) }} style={{ ...btn.primary }}>Back to overview</button>
                    <button onClick={() => { setStep(0); setAnswers({}) }} style={{ ...btn.ghost }}>Start over</button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Savings Plans */}
          {activeTab === 1 && (
            <motion.div key="savings" style={{ padding: '80px 32px', textAlign: 'center' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>[ Savings Plans ]</p>
              <p style={{ ...headline.md, color: C[300], margin: '0 0 12px' }}>Recurring investments coming in Phase 3.</p>
              <p style={{ ...S, fontSize: '14px', color: C[400] }}>Set up automatic monthly investments into your Robo portfolio.</p>
            </motion.div>
          )}

          {/* Round-up */}
          {activeTab === 2 && (
            <motion.div key="roundup" style={{ padding: '80px 32px', textAlign: 'center' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>[ Round-up ]</p>
              <p style={{ ...headline.md, color: C[300], margin: '0 0 12px' }}>Spare change investing coming in Phase 3.</p>
              <p style={{ ...S, fontSize: '14px', color: C[400] }}>Round up every transaction and invest the difference automatically.</p>
            </motion.div>
          )}

          {/* Forecasts */}
          {activeTab === 3 && (
            <motion.div key="forecasts" style={{ padding: '80px 32px', textAlign: 'center' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p style={{ ...M, fontSize: '11px', color: C[400], textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>[ Forecasts ]</p>
              <p style={{ ...headline.md, color: C[300], margin: '0 0 12px' }}>Portfolio projections coming in Phase 3.</p>
              <p style={{ ...S, fontSize: '14px', color: C[400] }}>See how your portfolio could grow over 5, 10, 20 years.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
