import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { getThesis, setThesis } from '../lib/storage';

const CONDITION_TEMPLATES = [
  'Revenue growth stays above 15%',
  'Gross margin stays above 60%',
  'Net margin remains positive',
  'Debt/equity stays below 1.0x',
  'CEO remains in role',
];

export default function ThesisDrawer({ ticker, scoreResult, onClose }) {
  const [conditions, setConditions] = useState(['', '', '']);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = getThesis(ticker);
    if (existing) {
      setConditions(existing.conditions?.length ? [...existing.conditions, ...Array(3).fill('')].slice(0, 3) : ['', '', '']);
      setNote(existing.note || '');
    }
  }, [ticker]);

  const updateCondition = (idx, val) => setConditions(prev => { const next = [...prev]; next[idx] = val; return next; });

  const save = () => {
    const validConditions = conditions.filter(c => c.trim().length > 0);
    setThesis(ticker, { ticker, conditions: validConditions, note, savedAt: new Date().toISOString(), scoreAtSave: scoreResult?.fitScore, status: 'intact' });
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 800);
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="thesis-drawer open">
        <div style={{ padding: '32px 36px 24px', borderBottom: '0.5px solid var(--color-divider)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div className="mono-label mb-2">{ticker.toUpperCase()}</div>
            <h2 style={{ fontFamily: 'Instrument Serif', fontSize: '28px', lineHeight: 1.1, margin: 0 }}>Investment Thesis</h2>
            {scoreResult && <p style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', marginTop: '8px', opacity: 0.5 }}>Fit Score at time of writing: {scoreResult.fitScore.toFixed(1)}</p>}
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', opacity: 0.5 }}><X size={18} /></button>
        </div>
        <div style={{ padding: '32px 36px' }}>
          <div className="mb-8">
            <div className="mono-label mb-1">Quantifiable Conditions</div>
            <p style={{ fontFamily: 'Inter', fontSize: '13px', opacity: 0.5, marginBottom: '16px', lineHeight: 1.5 }}>Define up to 3 measurable conditions. pondex will check these against current data on future visits.</p>
            {conditions.map((cond, idx) => (
              <div key={idx} className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="mono-label" style={{ opacity: 0.4, minWidth: '16px' }}>{idx + 1}</span>
                  <span className="mono-label" style={{ opacity: 0.4 }}>Condition</span>
                </div>
                <input value={cond} onChange={e => updateCondition(idx, e.target.value)} placeholder={CONDITION_TEMPLATES[idx] || 'Enter a measurable condition…'} className="settings-input" style={{ paddingLeft: '16px' }} />
              </div>
            ))}
            <div className="mt-3">
              <div className="mono-label mb-2" style={{ opacity: 0.4 }}>Suggestions</div>
              <div className="flex flex-wrap gap-2">
                {CONDITION_TEMPLATES.map((t, i) => (
                  <button key={i} onClick={() => { const emptyIdx = conditions.findIndex(c => !c.trim()); if (emptyIdx !== -1) updateCondition(emptyIdx, t); }} style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', letterSpacing: '0.04em', padding: '4px 10px', border: '0.5px solid var(--color-divider)', background: 'var(--color-surface)', cursor: 'pointer', color: 'var(--color-ink)', opacity: 0.6, transition: 'opacity 0.15s' }} onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '0.6'}>{t}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-8">
            <div className="mono-label mb-1">Thesis Note</div>
            <p style={{ fontFamily: 'Inter', fontSize: '13px', opacity: 0.5, marginBottom: '12px' }}>Why are you investing? What would change your mind?</p>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Write your investment thesis here…" rows={6} className="settings-input" style={{ resize: 'vertical', lineHeight: 1.6, fontFamily: 'Inter', fontSize: '14px' }} />
          </div>
          <button onClick={save} disabled={!note.trim() && conditions.every(c => !c.trim())} className="btn-primary w-full justify-center" style={{ width: '100%' }}>{saved ? '✓ Saved' : 'Save Investment Thesis'}</button>
          <p style={{ fontFamily: 'Inter', fontSize: '12px', opacity: 0.4, marginTop: '12px', textAlign: 'center' }}>Stored locally in your browser. Never transmitted anywhere.</p>
        </div>
      </div>
    </>
  );
}
