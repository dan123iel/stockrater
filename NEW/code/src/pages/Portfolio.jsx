import { useState, useEffect } from 'react';
import { Plus, Trash2, ArrowUpRight, AlertTriangle } from 'lucide-react';
import { getPortfolio, setPortfolio, getThesis, getFmpKey } from '../lib/storage';
import { fetchCurrentPrice } from '../lib/fmp';

function ThesisStatusBadge({ ticker }) {
  const thesis = getThesis(ticker);
  if (!thesis?.status) return null;
  if (thesis.status === 'intact') return <span className="badge-intact">✓ Intact</span>;
  if (thesis.status === 'partial') return <span className="badge-partial">⚠ Partial</span>;
  if (thesis.status === 'broken') return <span className="badge-broken">✗ Broken</span>;
  return null;
}

const EMPTY_TRADE = { ticker: '', type: 'buy', price: '', quantity: '', date: new Date().toISOString().slice(0, 10), currency: 'USD' };

export default function Portfolio() {
  const [trades, setTrades] = useState(getPortfolio());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_TRADE);
  const [prices, setPrices] = useState({});
  const [loadingPrices, setLoadingPrices] = useState(false);
  const fmpKey = getFmpKey();

  const positions = trades.reduce((acc, trade) => {
    const t = trade.ticker.toUpperCase();
    if (!acc[t]) acc[t] = { ticker: t, trades: [], currency: trade.currency || 'USD' };
    acc[t].trades.push(trade);
    return acc;
  }, {});

  useEffect(() => {
    if (!fmpKey || !Object.keys(positions).length) return;
    setLoadingPrices(true);
    Promise.allSettled(Object.keys(positions).map(t => fetchCurrentPrice(t, fmpKey).then(d => ({ ticker: t, price: d?.price })))).then(results => {
      const map = {};
      results.forEach(r => { if (r.status === 'fulfilled' && r.value) map[r.value.ticker] = r.value.price; });
      setPrices(map); setLoadingPrices(false);
    });
  }, [trades, fmpKey]);

  const calcPosition = (pos) => {
    const buys = pos.trades.filter(t => t.type === 'buy');
    const totalShares = buys.reduce((s, t) => s + parseFloat(t.quantity || 0), 0);
    const totalCost = buys.reduce((s, t) => s + parseFloat(t.price || 0) * parseFloat(t.quantity || 0), 0);
    const avgCost = totalShares > 0 ? totalCost / totalShares : 0;
    const currentPrice = prices[pos.ticker];
    const currentValue = currentPrice ? currentPrice * totalShares : null;
    const pnl = currentValue !== null ? currentValue - totalCost : null;
    const pnlPct = totalCost > 0 && pnl !== null ? (pnl / totalCost) * 100 : null;
    return { totalShares, avgCost, currentPrice, currentValue, pnl, pnlPct, totalCost };
  };

  const totalValue = Object.values(positions).reduce((sum, pos) => sum + (calcPosition(pos).currentValue || 0), 0);
  const hasMixedCurrencies = [...new Set(Object.values(positions).map(p => p.currency))].length > 1;

  const addTrade = () => {
    if (!form.ticker.trim() || !form.price || !form.quantity) return;
    const updated = [...trades, { ...form, ticker: form.ticker.toUpperCase(), id: Date.now() }];
    setTrades(updated); setPortfolio(updated); setForm(EMPTY_TRADE); setShowForm(false);
  };

  const removeTrade = (id) => { const updated = trades.filter(t => t.id !== id); setTrades(updated); setPortfolio(updated); };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ padding: '60px 64px 40px', borderBottom: '0.5px solid var(--color-divider)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <p className="mono-label mb-3" style={{ opacity: 0.4 }}>Your Holdings</p>
          <h1 style={{ fontFamily: 'Instrument Serif', fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05 }}>Portfolio</h1>
          {totalValue > 0 && <div className="flex items-baseline gap-3 mt-4"><span style={{ fontFamily: 'Instrument Serif', fontSize: '40px', lineHeight: 1 }}>{totalValue.toLocaleString('en', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span><span className="mono-label" style={{ opacity: 0.4 }}>total value{hasMixedCurrencies ? ' — mixed currencies*' : ''}</span></div>}
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}><Plus size={13} />Log Trade</button>
      </div>
      {hasMixedCurrencies && <div style={{ margin: '0 64px', padding: '12px 16px', background: 'rgba(217,119,6,0.06)', border: '0.5px solid rgba(217,119,6,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}><AlertTriangle size={13} style={{ color: '#D97706' }} /><p style={{ fontFamily: 'IBM Plex Mono', fontSize: '11px', color: '#D97706', letterSpacing: '0.04em' }}>*Cross-currency totals are approximate. FX conversion not available in MVP.</p></div>}
      {showForm && (
        <div style={{ margin: '24px 64px 0', padding: '28px', border: '0.5px solid var(--color-signal)', background: 'rgba(63,119,255,0.02)' }}>
          <div className="mono-label mb-5">Log a Trade</div>
          <div className="grid grid-cols-6 gap-3">
            {[['Ticker','ticker','text','AAPL'],['Price','price','number','0.00'],['Shares','quantity','number','0'],['Date','date','date','']].map(([label, field, type, ph]) => (
              <div key={field} className="col-span-1"><label className="mono-label mb-1 block" style={{ opacity: 0.5 }}>{label}</label><input type={type} value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: field === 'ticker' ? e.target.value.toUpperCase() : e.target.value }))} placeholder={ph} className="settings-input" style={{ fontSize: '14px' }} /></div>
            ))}
            <div className="col-span-1"><label className="mono-label mb-1 block" style={{ opacity: 0.5 }}>Type</label><select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="settings-input" style={{ fontSize: '14px', cursor: 'pointer' }}><option value="buy">Buy</option><option value="sell">Sell</option></select></div>
            <div className="col-span-1"><label className="mono-label mb-1 block" style={{ opacity: 0.5 }}>Currency</label><select value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))} className="settings-input" style={{ fontSize: '14px', cursor: 'pointer' }}><option>USD</option><option>EUR</option><option>GBP</option><option>JPY</option><option>CHF</option></select></div>
          </div>
          <div className="flex gap-3 mt-5"><button className="btn-primary" onClick={addTrade}>Add Trade</button><button className="btn-ghost" onClick={() => setShowForm(false)}>Cancel</button></div>
        </div>
      )}
      <div style={{ padding: '40px 64px 120px' }}>
        {Object.keys(positions).length === 0 && <div style={{ paddingTop: '80px' }}><p style={{ fontFamily: 'Instrument Serif', fontSize: '28px', opacity: 0.3 }}>No positions logged yet.</p><p style={{ fontFamily: 'Inter', fontSize: '14px', opacity: 0.35, marginTop: '8px' }}>Log your first trade to track your portfolio here.</p></div>}
        {Object.keys(positions).length > 0 && (
          <div style={{ borderBottom: '0.5px solid var(--color-divider)', marginBottom: '0' }}>
            <div className="grid py-3" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 80px', borderBottom: '0.5px solid var(--color-divider)' }}>
              {['Ticker','Shares','Avg Cost','Current','P&L','P&L %','Thesis',''].map(h => <div key={h} className="mono-label" style={{ opacity: 0.4 }}>{h}</div>)}
            </div>
          </div>
        )}
        {Object.values(positions).map(pos => {
          const { totalShares, avgCost, currentPrice, pnl, pnlPct } = calcPosition(pos);
          return (
            <div key={pos.ticker}>
              <div className="grid gap-4 py-5 items-center" style={{ borderBottom: '0.5px solid var(--color-divider)', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 80px' }}>
                <div><div style={{ fontFamily: 'IBM Plex Mono', fontSize: '16px', fontWeight: 500 }}>{pos.ticker}</div><div className="mono-label" style={{ opacity: 0.4 }}>{pos.currency}</div></div>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '14px' }}>{totalShares.toFixed(2)}</div>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '14px' }}>{avgCost.toFixed(2)}</div>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '14px' }}>{loadingPrices ? <span className="skeleton" style={{ display: 'inline-block', width: '60px', height: '14px' }} /> : currentPrice ? currentPrice.toFixed(2) : '—'}</div>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '14px' }} className={pnl !== null ? (pnl >= 0 ? 'pnl-positive' : 'pnl-negative') : ''}>{pnl !== null ? `${pnl >= 0 ? '+' : ''}${pnl.toFixed(0)}` : '—'}</div>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '14px' }} className={pnlPct !== null ? (pnlPct >= 0 ? 'pnl-positive' : 'pnl-negative') : ''}>{pnlPct !== null ? `${pnlPct >= 0 ? '+' : ''}${pnlPct.toFixed(1)}%` : '—'}</div>
                <div><ThesisStatusBadge ticker={pos.ticker} /></div>
                <div className="flex gap-2"><button onClick={() => document.dispatchEvent(new CustomEvent('analyze-ticker', { detail: pos.ticker }))} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.4, padding: '4px' }}><ArrowUpRight size={13} /></button></div>
              </div>
              {pos.trades.map(trade => (
                <div key={trade.id} className="grid gap-4 py-2 items-center" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr 1fr 1fr 80px', borderBottom: '0.5px solid rgba(232,231,227,0.5)', background: 'rgba(247,246,242,0.5)' }}>
                  <div className="mono-label" style={{ opacity: 0.35, paddingLeft: '16px' }}>{trade.type === 'buy' ? '↑ Buy' : '↓ Sell'} · {trade.date}</div>
                  <div className="mono-label" style={{ opacity: 0.5 }}>{parseFloat(trade.quantity).toFixed(2)}</div>
                  <div className="mono-label" style={{ opacity: 0.5 }}>{parseFloat(trade.price).toFixed(2)}</div>
                  <div /><div /><div /><div />
                  <button onClick={() => removeTrade(trade.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.3, padding: '4px' }}><Trash2 size={11} /></button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
