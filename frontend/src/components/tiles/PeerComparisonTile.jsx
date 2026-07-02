import { useState } from 'react';
import { Plus, X, Loader2 } from 'lucide-react';
import { fetchAllData } from '../../lib/fmp';
import { calculateScore, getFitLabel } from '../../lib/scoring';
import { getProfile } from '../../lib/storage';

const MetricRow = ({ label, peers, field, format }) => {
  const fmt = (v) => {
    if (v === null || v === undefined || isNaN(v) || !isFinite(v)) return '—';
    if (format === 'pct') return `${(v * 100).toFixed(1)}%`;
    if (format === 'x') return `${v.toFixed(1)}x`;
    return v.toFixed(2);
  };
  return (
    <div className="grid py-3" style={{ gridTemplateColumns: `160px repeat(${peers.length}, 1fr)`, borderBottom: '0.5px solid var(--color-divider)' }}>
      <span style={{ fontFamily: 'Inter', fontSize: '13px', opacity: 0.55 }}>{label}</span>
      {peers.map(p => (
        <span key={p.ticker} style={{ fontFamily: 'IBM Plex Mono', fontSize: '13px' }}>{fmt(p.data?.[field])}</span>
      ))}
    </div>
  );
};

export default function PeerComparisonTile({ mainTicker, mainData, mainScore }) {
  const [peers, setPeers] = useState([{ ticker: mainTicker, data: flattenData(mainData), score: mainScore, loading: false }]);
  const [input, setInput] = useState('');
  const [adding, setAdding] = useState(false);

  function flattenData(d) {
    return {
      pe: d?.ratios?.peRatio,
      grossMargin: d?.ratios?.grossProfitMargin,
      operatingMargin: d?.ratios?.operatingProfitMargin,
      evEbitda: d?.ratios?.enterpriseValueMultiple,
      fcfYield: d?.keyMetrics?.freeCashFlowYield,
      dividendYield: d?.ratios?.dividendYield,
      roe: d?.ratios?.returnOnEquity,
      debtEquity: d?.ratios?.debtEquityRatio,
    };
  }

  const addPeer = async () => {
    const sym = input.trim().toUpperCase();
    if (!sym || peers.find(p => p.ticker === sym) || peers.length >= 4) return;
    setAdding(true);
    setInput('');
    try {
      const data = await fetchAllData(sym);
      const score = calculateScore(data, getProfile());
      setPeers(prev => [...prev, { ticker: sym, data: flattenData(data), score, loading: false }]);
    } catch { /* silently skip */ } finally {
      setAdding(false);
    }
  };

  return (
    <div style={{ borderTop: '0.5px solid var(--color-divider)' }}>
      <div className="tile-header">
        <span className="mono-label">Peer Comparison</span>
        {peers.length < 4 && (
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value.toUpperCase())}
              onKeyDown={e => e.key === 'Enter' && addPeer()}
              placeholder="Add ticker…"
              style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', padding: '6px 12px', border: '0.5px solid var(--color-divider)', background: 'white', outline: 'none', width: '120px', color: 'var(--color-ink)' }}
            />
            <button onClick={addPeer} disabled={adding || !input.trim()} style={{ background: 'none', border: '0.5px solid var(--color-divider)', padding: '6px 10px', cursor: 'pointer', opacity: adding ? 0.4 : 0.7 }}>
              {adding ? <Loader2 size={12} className="animate-spin" /> : <Plus size={12} />}
            </button>
          </div>
        )}
      </div>
      <div style={{ padding: '0 24px 24px', overflowX: 'auto' }}>
        <div className="grid py-3" style={{ gridTemplateColumns: `160px repeat(${peers.length}, 1fr)`, borderBottom: '0.5px solid var(--color-divider)' }}>
          <div />
          {peers.map(p => (
            <div key={p.ticker} className="flex items-center gap-2">
              <span style={{ fontFamily: 'IBM Plex Mono', fontSize: '13px', fontWeight: 500 }}>
                {p.ticker}{p.ticker === mainTicker && <span className="ml-2 mono-label" style={{ color: 'var(--color-signal)', opacity: 1 }}>●</span>}
              </span>
              {p.ticker !== mainTicker && (
                <button onClick={() => setPeers(prev => prev.filter(x => x.ticker !== p.ticker))} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.3, padding: '2px' }}>
                  <X size={10} />
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="grid py-3" style={{ gridTemplateColumns: `160px repeat(${peers.length}, 1fr)`, borderBottom: '0.5px solid var(--color-divider)' }}>
          <span style={{ fontFamily: 'Inter', fontSize: '13px', opacity: 0.55 }}>Fit Score</span>
          {peers.map(p => (
            <div key={p.ticker}>
              <span style={{ fontFamily: 'Instrument Serif', fontSize: '20px', lineHeight: 1, color: p.score?.fitScore >= 4 ? 'var(--color-signal)' : p.score?.fitScore >= 3.3 ? 'var(--color-ink)' : '#888' }}>
                {p.score?.fitScore?.toFixed(1) ?? '—'}
              </span>
              <span className="mono-label ml-2" style={{ fontSize: '10px', opacity: 0.5 }}>{getFitLabel(p.score?.fitScore)}</span>
            </div>
          ))}
        </div>
        <MetricRow label="P/E Ratio" peers={peers} field="pe" format="x" />
        <MetricRow label="EV/EBITDA" peers={peers} field="evEbitda" format="x" />
        <MetricRow label="Gross Margin" peers={peers} field="grossMargin" format="pct" />
        <MetricRow label="Operating Margin" peers={peers} field="operatingMargin" format="pct" />
        <MetricRow label="FCF Yield" peers={peers} field="fcfYield" format="pct" />
        <MetricRow label="Dividend Yield" peers={peers} field="dividendYield" format="pct" />
        <MetricRow label="Return on Equity" peers={peers} field="roe" format="pct" />
        <MetricRow label="Debt/Equity" peers={peers} field="debtEquity" format="x" />
        <p style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', opacity: 0.3, marginTop: '12px', marginBottom: '4px' }}>Source: Yahoo Finance TTM · Fit Score: pondex scoring model</p>
      </div>
    </div>
  );
}
