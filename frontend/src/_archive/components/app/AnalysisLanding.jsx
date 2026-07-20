// Rich landing state shown on the Analysis page before a ticker is searched

const SECTORS = [
  { icon: '💻', label: 'Tech & Semis', pe: '21.1×', top: 'MSFT', tickers: ['MSFT', 'NVDA', 'AAPL', 'AMD', 'ASML'] },
  { icon: '🏦', label: 'Banking', pe: '11.4×', top: 'JPM', tickers: ['JPM', 'BAC', 'GS', 'BRK-B'] },
  { icon: '🔋', label: 'Automotive & EV', pe: '15.8×', top: 'BYD', tickers: ['TSLA', 'BYD', 'TM', 'RIVN'] },
  { icon: '🛢️', label: 'Energy', pe: '9.8×', top: 'XOM', tickers: ['XOM', 'CVX', 'SHEL', 'TTE'] },
  { icon: '💊', label: 'Healthcare', pe: '18.2×', top: 'LLY', tickers: ['LLY', 'JNJ', 'NVO', 'PFE'] },
  { icon: '🛒', label: 'Consumer', pe: '24.5×', top: 'COST', tickers: ['COST', 'AMZN', 'WMT', 'MCD'] },
];

const MACRO = [
  { label: 'Fed Funds', value: '4.25–4.50%', sub: 'Unchanged · June FOMC', dir: null },
  { label: 'US 10Y Yield', value: '4.32%', sub: '+4bps this week', dir: 'up' },
  { label: 'US Core CPI', value: '3.1%', sub: 'vs. 2.9% forecast', dir: 'up' },
  { label: 'DXY', value: '104.2', sub: '+0.3%', dir: 'up' },
];

export default function AnalysisLanding({ onAnalyze, recent }) {
  return (
    <div>
      <div style={{ padding: '0 64px', borderBottom: '0.5px solid var(--color-divider)', background: 'white', display: 'flex', gap: 0, overflowX: 'auto' }}>
        {MACRO.map((m, i) => (
          <div key={m.label} style={{ padding: '14px 32px 14px 0', marginRight: '32px', borderRight: i < MACRO.length - 1 ? '0.5px solid var(--color-divider)' : 'none', minWidth: '160px' }}>
            <div className="mono-label" style={{ opacity: 0.4, marginBottom: '4px' }}>{m.label}</div>
            <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '15px', fontWeight: 500 }}>{m.value}</div>
            <div style={{ fontFamily: 'Inter', fontSize: '11px', opacity: 0.45, marginTop: '2px', color: m.dir === 'up' ? 'var(--color-warning)' : 'var(--color-intact)' }}>{m.sub}</div>
          </div>
        ))}
        <div style={{ padding: '14px 0', marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <button onClick={() => document.dispatchEvent(new CustomEvent('navigate-macro'))} className="mono-label" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-signal)', opacity: 0.8 }}>
            Full Macro Overview →
          </button>
        </div>
      </div>

      <div style={{ padding: '48px 64px 0' }}>
        <p className="mono-label mb-5" style={{ opacity: 0.4 }}>Browse by Sector</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', border: '0.5px solid var(--color-divider)' }}>
          {SECTORS.map((s, i) => (
            <div key={s.label} style={{ padding: '20px 24px', borderRight: (i + 1) % 3 !== 0 ? '0.5px solid var(--color-divider)' : 'none', borderBottom: i < 3 ? '0.5px solid var(--color-divider)' : 'none', cursor: 'default' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '18px' }}>{s.icon}</span>
                <span style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 500 }}>{s.label}</span>
              </div>
              <div className="mono-label mb-3" style={{ opacity: 0.35 }}>Avg P/E: {s.pe} · Top: {s.top}</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {s.tickers.map(t => (
                  <button key={t} onClick={() => onAnalyze(t)} style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', letterSpacing: '0.04em', padding: '4px 10px', border: '0.5px solid var(--color-divider)', background: 'var(--color-surface)', cursor: 'pointer', color: 'var(--color-ink)', transition: 'border-color 0.15s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-signal)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-divider)'}>{t}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '48px 64px 0' }}>
        <p className="mono-label mb-5" style={{ opacity: 0.4 }}>Popular Duels</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { label: 'AI Chip War', tickers: ['NVDA', 'AMD', 'INTC'] },
            { label: 'Cloud Giants', tickers: ['MSFT', 'AMZN', 'GOOGL'] },
            { label: 'EV Showdown', tickers: ['TSLA', 'BYD', 'RIVN'] },
            { label: 'Dividend Duel', tickers: ['KO', 'PEP'] },
            { label: 'Payments', tickers: ['V', 'MA', 'PYPL'] },
          ].map(d => (
            <button key={d.label} onClick={() => onAnalyze(d.tickers[0])} style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', letterSpacing: '0.06em', padding: '8px 16px', border: '0.5px solid var(--color-divider)', background: 'white', cursor: 'pointer', color: 'var(--color-ink)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'border-color 0.15s' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-ink)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--color-divider)'}>
              <span style={{ opacity: 0.5 }}>{d.label}</span>
              <span style={{ color: 'var(--color-signal)' }}>{d.tickers.join(' · ')}</span>
            </button>
          ))}
        </div>
      </div>

      {recent.length > 0 && (
        <div style={{ padding: '40px 64px 64px' }}>
          <p className="mono-label mb-4" style={{ opacity: 0.4 }}>Recently Analyzed</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {recent.map(t => (
              <button key={t} onClick={() => onAnalyze(t)} style={{ fontFamily: 'IBM Plex Mono', fontSize: '13px', padding: '10px 18px', border: '0.5px solid var(--color-divider)', background: 'white', cursor: 'pointer', color: 'var(--color-ink)', letterSpacing: '0.04em', transition: 'all 0.15s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-ink)'; e.currentTarget.style.background = 'var(--color-ink)'; e.currentTarget.style.color = 'white'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-divider)'; e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--color-ink)'; }}>{t}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
