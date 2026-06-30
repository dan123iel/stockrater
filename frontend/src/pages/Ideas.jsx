import { useState, useMemo } from 'react';
import { ArrowUpRight, Filter } from 'lucide-react';
import { getProfile } from '../lib/storage';
import { UNIVERSE, SECTORS, REGIONS, LAST_UPDATED } from '../lib/ideasData';
import { getFitLabel } from '../lib/scoring';

const PROFILE_SCORE_ADJUSTMENTS = {
  value:    { pe: -1, dividendYield: 1 },
  growth:   { pe: 1, dividendYield: -1 },
  dividend: { dividendYield: 2, pe: -0.5 },
  momentum: {},
};

export default function Ideas({ onAnalyze }) {
  const profile = getProfile();
  const [regions, setRegions] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [maxPE, setMaxPE] = useState('');
  const [minDiv, setMinDiv] = useState('');
  const [marketCap, setMarketCap] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (arr, setArr, val) => setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);

  const filtered = useMemo(() => {
    let results = UNIVERSE;
    if (regions.length > 0) results = results.filter(s => regions.includes(s.region));
    if (sectors.length > 0) results = results.filter(s => sectors.includes(s.sector));
    if (maxPE) results = results.filter(s => s.pe === null || s.pe <= parseFloat(maxPE));
    if (minDiv) results = results.filter(s => s.dividendYield >= parseFloat(minDiv));
    if (marketCap) results = results.filter(s => s.marketCap === marketCap);
    const strategy = profile?.strategy?.toLowerCase();
    const adj = PROFILE_SCORE_ADJUSTMENTS[strategy] || {};
    results = results.map(s => {
      let adjustedScore = s.fitScore;
      if (adj.pe && s.pe !== null) adjustedScore = Math.min(5, Math.max(0, adjustedScore + (20 - s.pe) / 20 * adj.pe * 0.1));
      if (adj.dividendYield) adjustedScore = Math.min(5, Math.max(0, adjustedScore + s.dividendYield * adj.dividendYield * 0.05));
      return { ...s, adjustedScore: parseFloat(adjustedScore.toFixed(2)) };
    });
    return results.sort((a, b) => b.adjustedScore - a.adjustedScore);
  }, [regions, sectors, maxPE, minDiv, marketCap, profile]);

  const activeFilterCount = regions.length + sectors.length + (maxPE ? 1 : 0) + (minDiv ? 1 : 0) + (marketCap ? 1 : 0);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ padding: '60px 64px 40px', borderBottom: '0.5px solid var(--color-divider)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <p className="mono-label mb-3" style={{ opacity: 0.4 }}>Discovery</p>
          <h1 style={{ fontFamily: 'Instrument Serif', fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05 }}>Ideas</h1>
          <p style={{ fontFamily: 'Inter', fontSize: '14px', opacity: 0.45, marginTop: '8px' }}>{filtered.length} stocks · scored for {profile?.strategy || 'your'} strategy</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="mono-label" style={{ opacity: 0.35 }}>Last updated: {LAST_UPDATED}</span>
          <button className={`btn-ghost ${showFilters ? 'btn-primary' : ''}`} style={{ background: showFilters ? 'var(--color-ink)' : 'transparent', color: showFilters ? 'white' : 'var(--color-ink)' }} onClick={() => setShowFilters(!showFilters)}>
            <Filter size={13} />Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
          </button>
        </div>
      </div>
      {showFilters && (
        <div style={{ padding: '24px 64px', borderBottom: '0.5px solid var(--color-divider)', background: 'white' }}>
          <div className="grid grid-cols-4 gap-8">
            <div><div className="mono-label mb-3">Region</div><div className="flex flex-wrap gap-2">{REGIONS.map(r => <button key={r} className={`filter-chip ${regions.includes(r) ? 'active' : ''}`} onClick={() => toggleFilter(regions, setRegions, r)}>{r}</button>)}</div></div>
            <div><div className="mono-label mb-3">Sector</div><div className="flex flex-wrap gap-2">{SECTORS.map(s => <button key={s} className={`filter-chip ${sectors.includes(s) ? 'active' : ''}`} onClick={() => toggleFilter(sectors, setSectors, s)}>{s}</button>)}</div></div>
            <div><div className="mono-label mb-3">Max P/E</div><input type="number" value={maxPE} onChange={e => setMaxPE(e.target.value)} placeholder="e.g. 25" className="settings-input" style={{ fontSize: '13px' }} /></div>
            <div><div className="mono-label mb-3">Min Dividend Yield</div><input type="number" value={minDiv} onChange={e => setMinDiv(e.target.value)} placeholder="e.g. 2" className="settings-input" style={{ fontSize: '13px' }} /></div>
          </div>
          {activeFilterCount > 0 && <button className="mono-label mt-4" onClick={() => { setRegions([]); setSectors([]); setMaxPE(''); setMinDiv(''); setMarketCap(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-warning)', opacity: 0.7 }}>Clear all filters</button>}
        </div>
      )}
      <div style={{ padding: '0 64px' }}>
        <div className="grid py-3" style={{ gridTemplateColumns: '2fr 1.2fr 1fr 0.8fr 0.8fr 1fr 40px', borderBottom: '0.5px solid var(--color-divider)' }}>
          {['Company', 'Sector', 'Region', 'P/E', 'Div Yield', 'Fit Score', ''].map(h => <div key={h} className="mono-label" style={{ opacity: 0.4 }}>{h}</div>)}
        </div>
        {filtered.map(stock => (
          <div key={stock.ticker} onClick={() => onAnalyze(stock.ticker)} style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr 0.8fr 0.8fr 1fr 40px', alignItems: 'center', padding: '16px 0', borderBottom: '0.5px solid var(--color-divider)', cursor: 'pointer', background: 'white', transition: 'background 0.1s ease' }} onMouseEnter={e => e.currentTarget.style.background='var(--color-surface)'} onMouseLeave={e => e.currentTarget.style.background='white'}>
            <div><span style={{ fontFamily: 'IBM Plex Mono', fontSize: '14px', fontWeight: 500 }}>{stock.ticker}</span><span style={{ fontFamily: 'Inter', fontSize: '13px', opacity: 0.5, marginLeft: '10px' }}>{stock.name}</span></div>
            <div className="mono-label" style={{ opacity: 0.6 }}>{stock.sector}</div>
            <div className="mono-label" style={{ opacity: 0.6 }}>{stock.region}</div>
            <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '13px' }}>{stock.pe !== null ? `${stock.pe}x` : '—'}</div>
            <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '13px' }}>{stock.dividendYield > 0 ? `${stock.dividendYield}%` : '—'}</div>
            <div className="flex items-center gap-3">
              <span style={{ fontFamily: 'Instrument Serif', fontSize: '22px', lineHeight: 1, color: stock.adjustedScore >= 4 ? 'var(--color-signal)' : stock.adjustedScore >= 3.3 ? 'var(--color-ink)' : '#888' }}>{(stock.adjustedScore || stock.fitScore).toFixed(1)}</span>
              <span className="mono-label" style={{ fontSize: '10px', opacity: 0.5 }}>{getFitLabel(stock.adjustedScore || stock.fitScore)}</span>
            </div>
            <div style={{ opacity: 0.3, display: 'flex', justifyContent: 'flex-end' }}><ArrowUpRight size={14} /></div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ padding: '80px 0' }}><p style={{ fontFamily: 'Instrument Serif', fontSize: '24px', opacity: 0.3 }}>No stocks match your filters.</p></div>}
      </div>
    </div>
  );
}
