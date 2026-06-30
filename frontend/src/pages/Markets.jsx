const MARKET_INDICES = [
  { symbol: 'SPY',  label: 'S&P 500',     region: 'US' },
  { symbol: 'QQQ',  label: 'Nasdaq 100',  region: 'US' },
  { symbol: 'IWM',  label: 'Russell 2000', region: 'US' },
  { symbol: 'EZU',  label: 'Euro Stoxx',  region: 'EU' },
  { symbol: 'EWG',  label: 'DAX',         region: 'EU' },
  { symbol: 'EWL',  label: 'SMI',         region: 'EU' },
  { symbol: 'EWJ',  label: 'Nikkei',      region: 'Asia' },
  { symbol: 'FXI',  label: 'CSI 300',     region: 'Asia' },
];

const WATCHLIST_DEFAULTS = [
  'NVDA', 'AAPL', 'MSFT', 'ASML', 'SAP', 'TSM', 'NOVO-B.CO', 'MC.PA',
];

export default function Markets({ onAnalyze }) {
  return (
    <div style={{ paddingTop: '52px', minHeight: '100vh', background: 'var(--color-surface)' }}>

      {/* Header */}
      <div style={{ padding: '20px 28px 16px', borderBottom: '1px solid var(--color-divider)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '6px' }}>
          Markets
        </div>
        <div style={{ fontFamily: 'Instrument Serif', fontSize: '28px', lineHeight: 1.1 }}>
          Global Overview
        </div>
      </div>

      {/* Indices */}
      <div style={{ padding: '24px 28px 0' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '12px' }}>
          Major Indices
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1px', border: '1px solid var(--color-divider)' }}>
          {MARKET_INDICES.map(idx => (
            <button
              key={idx.symbol}
              onClick={() => onAnalyze(idx.symbol)}
              style={{
                padding: '14px 16px', background: 'var(--color-surface)',
                border: 'none', cursor: 'pointer', textAlign: 'left',
                transition: 'background .15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-panel)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--color-surface)'}
            >
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 500, marginBottom: '2px' }}>{idx.label}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--color-muted)', letterSpacing: '.06em' }}>{idx.symbol} · {idx.region}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Analyze */}
      <div style={{ padding: '28px 28px 0' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '12px' }}>
          Quick Analyze
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {WATCHLIST_DEFAULTS.map(sym => (
            <button
              key={sym}
              onClick={() => onAnalyze(sym)}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '11px',
                padding: '5px 12px', border: '1px solid var(--color-divider)',
                background: 'transparent', cursor: 'pointer', color: 'var(--color-ink)',
                opacity: .7, transition: 'opacity .15s, border-color .15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.borderColor = 'var(--color-ink)'; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '.7'; e.currentTarget.style.borderColor = 'var(--color-divider)'; }}
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      {/* Coming soon note */}
      <div style={{ padding: '32px 28px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', opacity: .25, letterSpacing: '.06em' }}>
          Live price data · sector heatmap · macro context — Phase 2
        </p>
      </div>

    </div>
  );
}
