import { useState, useEffect } from 'react';
import { runDCF, calcReverseDCF, getDefaultInputs } from '../../lib/dcf';

const SliderRow = ({ label, value, min, max, step, format, onChange }) => {
  const display = format === 'pct' ? `${(value * 100).toFixed(1)}%` : value;
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', opacity: 0.65 }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-signal)' }}>{display}</span>
      </div>
      <input type="range" className="custom-slider" min={min} max={max} step={step} value={value} onChange={e => onChange(parseFloat(e.target.value))} style={{ minHeight: '36px' }} />
    </div>
  );
};

export default function DCFTile({ profile, keyMetrics, incomeStatements, loading, error, compact }) {
  const [inputs, setInputs] = useState(null);
  const [results, setResults] = useState({ bear: null, base: null, bull: null });
  const [impliedGrowth, setImpliedGrowth] = useState(null);

  useEffect(() => {
    if (!profile || !keyMetrics) return;
    setInputs(getDefaultInputs(profile, keyMetrics, incomeStatements));
  }, [profile, keyMetrics, incomeStatements]);

  useEffect(() => {
    if (!inputs) return;
    const revenue = incomeStatements?.[0]?.revenue;
    setResults({ bear: runDCF(inputs, 'bear', revenue), base: runDCF(inputs, 'base', revenue), bull: runDCF(inputs, 'bull', revenue) });
    setImpliedGrowth(calcReverseDCF(profile?.price, inputs, revenue));
  }, [inputs, profile, incomeStatements]);

  if (loading || !inputs) return <div style={{ padding: '20px', opacity: 0.4 }}>Loading…</div>;
  if (error) return <div style={{ padding: '20px', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: 0.4 }}>{error}</div>;

  const price = profile?.price;

  if (compact) {
    return (
      <div style={{ padding: '8px 0' }}>
        {/* Scenarios */}
        <div style={{ display: 'flex', borderBottom: '0.5px solid var(--color-divider)' }}>
          {[['Bear', results.bear, 'var(--color-warning)'], ['Base', results.base, 'var(--color-ink)'], ['Bull', results.bull, 'var(--color-signal)']].map(([label, val, color]) => (
            <div key={label} className="dcf-scenario">
              <div className="dcf-scenario-label">{label}</div>
              <div className="dcf-scenario-value" style={{ color }}>
                {val ? `$${val.toFixed(0)}` : '—'}
              </div>
              {price && val && (
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', marginTop: '4px', opacity: 0.5, color: val > price ? 'var(--color-intact)' : 'var(--color-warning)' }}>
                  {val > price ? '+' : ''}{(((val - price) / price) * 100).toFixed(0)}%
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Implied growth */}
        {impliedGrowth !== null && (
          <div style={{ padding: '12px 20px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.4, marginBottom: '4px' }}>Implied Growth Rate</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', lineHeight: 1 }}>{impliedGrowth}% <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: 0.4 }}>p.a.</span></div>
            {price && <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: 0.4, marginTop: '4px' }}>Current ${price.toFixed(2)} · {results.base ? `~${(((results.base - price) / price) * 100).toFixed(0)}% vs base` : ''}</div>}
          </div>
        )}
      </div>
    );
  }

  const update = (key) => (val) => setInputs(prev => ({ ...prev, [key]: val }));
  return (
    <div style={{ padding: '16px 20px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {[['Bear', results.bear, 'var(--color-warning)'], ['Base', results.base, 'var(--color-ink)'], ['Bull', results.bull, 'var(--color-signal)']].map(([label, val, color]) => (
          <div key={label} style={{ flex: 1, padding: '12px 16px', border: '0.5px solid var(--color-divider)', background: 'var(--color-surface)' }}>
            <div className="mono-label mb-2">{label}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', lineHeight: 1, color }}>{val ? `$${val.toFixed(0)}` : '—'}</div>
          </div>
        ))}
      </div>
      {impliedGrowth !== null && <div style={{ marginBottom: '20px', padding: '12px', background: 'rgba(63,119,255,0.04)', border: '0.5px solid rgba(63,119,255,0.2)' }}><div className="mono-label mb-1">Implied Growth Rate</div><div style={{ fontFamily: 'var(--font-display)', fontSize: '24px' }}>{impliedGrowth}% p.a.</div></div>}
      <div style={{ borderTop: '0.5px solid var(--color-divider)', paddingTop: '16px' }}>
        <SliderRow label="Revenue Growth" value={inputs.revenueGrowth} min={-0.2} max={0.5} step={0.01} format="pct" onChange={update('revenueGrowth')} />
        <SliderRow label="Operating Margin" value={inputs.operatingMargin} min={-0.1} max={0.6} step={0.01} format="pct" onChange={update('operatingMargin')} />
        <SliderRow label="WACC" value={inputs.wacc} min={0.05} max={0.2} step={0.005} format="pct" onChange={update('wacc')} />
      </div>
    </div>
  );
}
