// Macro Dashboard — static snapshot with indicative data
const INDICES = [
  { name: 'S&P 500', value: '5,420', change: '+0.4%', up: true },
  { name: 'NASDAQ', value: '18,650', change: '+1.2%', up: true },
  { name: 'DAX', value: '18,820', change: '+0.6%', up: true },
  { name: 'FTSE 100', value: '8,250', change: '−0.2%', up: false },
  { name: 'Nikkei 225', value: '38,900', change: '+0.8%', up: true },
  { name: 'BTC/USD', value: '$68,400', change: '−0.8%', up: false },
];
const RATES = [
  { label: 'Fed Funds Rate', value: '4.25–4.50%', sub: 'Unchanged · June FOMC', signal: null },
  { label: 'ECB Deposit Rate', value: '3.75%', sub: 'Cut 25bps · June 2025', signal: 'down' },
  { label: 'US 10Y Yield', value: '4.32%', sub: '+4bps this week', signal: 'up' },
  { label: 'DE 10Y Bund', value: '2.51%', sub: '+2bps this week', signal: 'up' },
  { label: 'USD/EUR', value: '0.924', sub: '+0.2%', signal: 'up' },
  { label: 'USD/JPY', value: '157.4', sub: '+0.5%', signal: 'up' },
];
const MACRO_DATA = [
  { label: 'US Core CPI (YoY)', value: '3.1%', sub: 'vs. 2.9% forecast', signal: 'up' },
  { label: 'US GDP Growth (Q1)', value: '+1.3%', sub: 'annualized', signal: null },
  { label: 'US Unemployment', value: '3.9%', sub: 'April 2025', signal: null },
  { label: 'Eurozone CPI', value: '2.4%', sub: 'May 2025', signal: null },
  { label: 'VIX', value: '17.4', sub: 'Fear gauge — low', signal: 'down' },
  { label: 'Put/Call Ratio', value: '0.82', sub: 'Mildly bullish', signal: null },
];
const SECTORS_PERF = [
  { name: 'Technology', perf: '+1.8%', up: true }, { name: 'Healthcare', perf: '+0.4%', up: true },
  { name: 'Financials', perf: '+0.9%', up: true }, { name: 'Energy', perf: '−0.7%', up: false },
  { name: 'Consumer Discr.', perf: '+1.1%', up: true }, { name: 'Utilities', perf: '−0.3%', up: false },
  { name: 'Real Estate', perf: '−0.5%', up: false }, { name: 'Materials', perf: '+0.2%', up: true },
];
const NEWS = [
  { tag: 'MACRO', time: '10:15 AM', imp: 'High', text: 'US Core CPI MoM 0.3% vs. 0.2% expected. Volatility expected across equity markets.' },
  { tag: 'EQUITIES', time: '09:45 AM', imp: 'Medium', text: 'Institutional block buying at NVDA $201.50 support level detected.' },
  { tag: 'ECB', time: '08:30 AM', imp: 'High', text: 'Lagarde signals Q3 rate cut timeline at Frankfurt press conference.' },
  { tag: 'DIVIDENDS', time: '07:00 AM', imp: 'Low', text: 'MSFT declares $0.85/share quarterly dividend. Ex-date July 15.' },
];
const MKT = { pe: 21.4, avg: 18.2, label: 'Overvalued', pct: 68 };

function DataCard({ label, value, sub, signal }) {
  const c = signal === 'up' ? 'var(--color-warning)' : signal === 'down' ? 'var(--color-intact)' : 'var(--color-ink)';
  return (
    <div style={{ padding: '20px 24px', borderBottom: '0.5px solid var(--color-divider)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div><div className="mono-label" style={{ opacity: 0.4, marginBottom: '6px' }}>{label}</div><div style={{ fontFamily: 'IBM Plex Mono', fontSize: '18px', fontWeight: 500 }}>{value}</div></div>
      <div style={{ fontFamily: 'Inter', fontSize: '12px', color: c, opacity: signal ? 0.8 : 0.45, textAlign: 'right', marginTop: '4px' }}>{signal === 'up' ? '▲ ' : signal === 'down' ? '▼ ' : ''}{sub}</div>
    </div>
  );
}

export default function Macro() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ padding: '60px 64px 40px', borderBottom: '0.5px solid var(--color-divider)' }}>
        <p className="mono-label mb-3" style={{ opacity: 0.4 }}>Global Economy</p>
        <h1 style={{ fontFamily: 'Instrument Serif', fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05 }}>Macro Dashboard</h1>
        <p style={{ fontFamily: 'Inter', fontSize: '14px', opacity: 0.4, marginTop: '8px' }}>Static snapshot · indicative data · live feeds in a future phase</p>
      </div>
      <div style={{ padding: '48px 64px 120px' }}>
        {/* Market Barometer */}
        <div className="mb-12">
          <p className="mono-label mb-5" style={{ opacity: 0.4 }}>Market Barometer — S&P 500</p>
          <div style={{ border: '0.5px solid var(--color-divider)', background: 'white', padding: '28px 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div><div style={{ fontFamily: 'Instrument Serif', fontSize: '36px' }}>{MKT.label}</div><div className="mono-label mt-1" style={{ opacity: 0.4 }}>S&P 500 aggregate P/E vs. 20-year historical average</div></div>
              <div style={{ display: 'flex', gap: '32px', textAlign: 'right' }}>
                <div><div className="mono-label" style={{ opacity: 0.4 }}>Current P/E</div><div style={{ fontFamily: 'IBM Plex Mono', fontSize: '20px', fontWeight: 500 }}>{MKT.pe}×</div></div>
                <div><div className="mono-label" style={{ opacity: 0.4 }}>20Y Avg</div><div style={{ fontFamily: 'IBM Plex Mono', fontSize: '20px', fontWeight: 500 }}>{MKT.avg}×</div></div>
                <div><div className="mono-label" style={{ opacity: 0.4 }}>Premium</div><div style={{ fontFamily: 'IBM Plex Mono', fontSize: '20px', color: 'var(--color-warning)', fontWeight: 500 }}>+{(((MKT.pe / MKT.avg) - 1) * 100).toFixed(0)}%</div></div>
              </div>
            </div>
            <div style={{ position: 'relative', marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                {['Deep Value', 'Undervalued', 'Fair', 'Overvalued', 'Bubble'].map(l => <span key={l} className="mono-label" style={{ opacity: 0.35, fontSize: '9px' }}>{l}</span>)}
              </div>
              <div style={{ height: '4px', background: 'linear-gradient(to right, #27AE60, #DDF781, #FFC107, #E63946, #8B0000)', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-4px', left: `${MKT.pct}%`, width: '2px', height: '12px', background: 'var(--color-ink)' }} />
              </div>
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: '12px', opacity: 0.4, marginTop: '12px' }}>⚠ Not a timing signal — markets can remain overvalued for years. Use as context for position sizing and margin of safety.</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0', border: '0.5px solid var(--color-divider)' }}>
          <div style={{ borderRight: '0.5px solid var(--color-divider)' }}>
            <div style={{ padding: '16px 24px', borderBottom: '0.5px solid var(--color-divider)' }}><span className="mono-label" style={{ opacity: 0.5 }}>Major Indices</span></div>
            {INDICES.map(idx => (
              <div key={idx.name} style={{ padding: '16px 24px', borderBottom: '0.5px solid var(--color-divider)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '14px' }}>{idx.name}</div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '14px', fontWeight: 500 }}>{idx.value}</div>
                  <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: idx.up ? 'var(--color-intact)' : 'var(--color-warning)' }}>{idx.change}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderRight: '0.5px solid var(--color-divider)' }}>
            <div style={{ padding: '16px 24px', borderBottom: '0.5px solid var(--color-divider)' }}><span className="mono-label" style={{ opacity: 0.5 }}>Rates & FX</span></div>
            {RATES.map(r => <DataCard key={r.label} {...r} />)}
          </div>
          <div>
            <div style={{ padding: '16px 24px', borderBottom: '0.5px solid var(--color-divider)' }}><span className="mono-label" style={{ opacity: 0.5 }}>Economic Indicators</span></div>
            {MACRO_DATA.map(m => <DataCard key={m.label} {...m} />)}
          </div>
        </div>
        <div className="mt-12 mb-12">
          <p className="mono-label mb-5" style={{ opacity: 0.4 }}>Sector Performance (1D)</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, border: '0.5px solid var(--color-divider)' }}>
            {SECTORS_PERF.map((s, i) => (
              <div key={s.name} style={{ padding: '20px 24px', borderRight: (i + 1) % 4 !== 0 ? '0.5px solid var(--color-divider)' : 'none', borderBottom: i < 4 ? '0.5px solid var(--color-divider)' : 'none', background: s.up ? 'rgba(39,174,96,0.03)' : 'rgba(230,57,70,0.03)' }}>
                <div style={{ fontFamily: 'Inter', fontSize: '13px', opacity: 0.7, marginBottom: '8px' }}>{s.name}</div>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '18px', fontWeight: 500, color: s.up ? 'var(--color-intact)' : 'var(--color-warning)' }}>{s.perf}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="mono-label mb-5" style={{ opacity: 0.4 }}>Market Pulse — Today</p>
          <div style={{ border: '0.5px solid var(--color-divider)', background: 'white' }}>
            {NEWS.map((n, i) => (
              <div key={i} style={{ padding: '16px 24px', borderBottom: i < NEWS.length - 1 ? '0.5px solid var(--color-divider)' : 'none', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', minWidth: '180px' }}>
                  <span style={{ fontFamily: 'IBM Plex Mono', fontSize: '9px', letterSpacing: '0.1em', padding: '2px 8px', border: `0.5px solid ${n.imp === 'High' ? 'var(--color-warning)' : 'var(--color-divider)'}`, color: n.imp === 'High' ? 'var(--color-warning)' : 'var(--color-ink)', opacity: n.imp === 'High' ? 1 : 0.5 }}>{n.tag}</span>
                  <span className="mono-label" style={{ opacity: 0.35 }}>{n.time}</span>
                </div>
                <p style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: 1.5, opacity: 0.75 }}>{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
