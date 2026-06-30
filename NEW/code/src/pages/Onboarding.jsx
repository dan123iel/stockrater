import { useState } from 'react';
import { setProfile } from '../lib/storage';

const QUESTIONS = [
  { id: 'strategy', question: 'What is your investment strategy?', subtext: 'pondex recalibrates the Fit Score weights to match how you actually invest.', options: [{ value: 'value', label: 'Value', sub: 'Low multiples. Margin of safety. Long horizon.' }, { value: 'growth', label: 'Growth', sub: 'Revenue expansion. Competitive moat. High reinvestment.' }, { value: 'dividend', label: 'Dividend', sub: 'Consistent income. Stable cash flows. Lower volatility.' }, { value: 'momentum', label: 'Momentum', sub: 'Price strength. Trend following. Shorter holds.' }] },
  { id: 'horizon', question: 'What is your typical holding period?', subtext: 'This affects how pondex weights near-term vs. structural factors.', options: [{ value: 'short', label: 'Short', sub: 'Under 1 year.' }, { value: 'medium', label: 'Medium', sub: '1 to 5 years.' }, { value: 'long', label: 'Long', sub: '5 years or more.' }] },
  { id: 'risk', question: 'How do you think about risk?', subtext: 'Not your tolerance for volatility — your approach to permanent capital loss.', options: [{ value: 'conservative', label: 'Conservative', sub: 'Preservation first. Return second.' }, { value: 'moderate', label: 'Moderate', sub: 'Balanced approach. Some drawdown is acceptable.' }, { value: 'aggressive', label: 'Aggressive', sub: 'Maximum return potential. High drawdown tolerance.' }] },
  { id: 'regions', question: 'Where do you prefer to invest?', subtext: 'Used to surface relevant Ideas and flag data coverage gaps.', options: [{ value: 'global', label: 'Global', sub: 'No geographic constraint.' }, { value: 'us', label: 'US Only', sub: 'NYSE, NASDAQ.' }, { value: 'europe', label: 'Europe', sub: 'XETRA, Euronext, LSE.' }, { value: 'asia', label: 'Asia', sub: 'TSE, KRX, SGX and others.' }, { value: 'mix', label: 'US + Europe', sub: 'Primary focus on developed markets.' }] },
];

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [transitioning, setTransitioning] = useState(false);

  const totalSteps = QUESTIONS.length;
  const currentQ = QUESTIONS[step];

  const advance = () => {
    setTransitioning(true);
    setTimeout(() => {
      setSelected(null); setTransitioning(false);
      if (step < QUESTIONS.length - 1) setStep(s => s + 1);
      else { setProfile({ ...answers }); onComplete(); }
    }, 200);
  };

  const selectOption = (val) => {
    setSelected(val);
    setAnswers(prev => ({ ...prev, [currentQ.id]: val }));
    setTimeout(advance, 350);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-surface)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '28px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '0.5px solid var(--color-divider)' }}>
        <span style={{ fontFamily: 'IBM Plex Mono', fontSize: '18px', fontWeight: 500, letterSpacing: '-0.02em' }}>pondex</span>
        <span className="mono-label">{step + 1} / {totalSteps}</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 10vw', maxWidth: '900px', margin: '0 auto', width: '100%', opacity: transitioning ? 0 : 1, transform: transitioning ? 'translateY(8px)' : 'translateY(0)', transition: 'opacity 0.2s ease, transform 0.2s ease' }}>
        <div className="mb-12">
          <p className="mono-label mb-4" style={{ opacity: 0.4 }}>Question {step + 1}</p>
          <h1 style={{ fontFamily: 'Instrument Serif', fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.05, marginBottom: '16px' }}>{currentQ.question}</h1>
          <p style={{ fontFamily: 'Inter', fontSize: '16px', opacity: 0.5, lineHeight: 1.6 }}>{currentQ.subtext}</p>
        </div>
        <div className="grid grid-cols-2 gap-3" style={{ maxWidth: '640px' }}>
          {currentQ.options.map(opt => (
            <button key={opt.value} className={`onboarding-option text-left ${selected === opt.value ? 'selected' : ''}`} onClick={() => selectOption(opt.value)}>
              <div style={{ fontFamily: 'Instrument Serif', fontSize: '24px', marginBottom: '6px' }}>{opt.label}</div>
              <div style={{ fontFamily: 'Inter', fontSize: '13px', opacity: 0.5 }}>{opt.sub}</div>
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding: '24px 48px', borderTop: '0.5px solid var(--color-divider)' }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} style={{ height: '2px', flex: 1, background: i <= step ? 'var(--color-signal)' : 'var(--color-divider)', transition: 'background 0.3s ease' }} />
          ))}
        </div>
      </div>
    </div>
  );
}
