import { useState } from 'react';
import { Plus, Trash2, ArrowUpRight } from 'lucide-react';
import { get, set } from '../lib/storage';

const WATCHLIST_KEY = 'pondex_watchlist';
export const getWatchlist = () => get(WATCHLIST_KEY) || [];
export const setWatchlist = (list) => set(WATCHLIST_KEY, list);
export const addToWatchlist = (ticker, note = '') => {
  const list = getWatchlist().filter(w => w.ticker !== ticker.toUpperCase());
  setWatchlist([{ ticker: ticker.toUpperCase(), note, addedAt: new Date().toISOString(), alerts: { fairValueDev: '', insiderBuy: false } }, ...list]);
};
export const isOnWatchlist = (ticker) => getWatchlist().some(w => w.ticker === ticker?.toUpperCase());

export default function Watchlist({ onAnalyze }) {
  const [list, setList] = useState(getWatchlist());
  const [input, setInput] = useState('');
  const [note, setNote] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const sync = () => setList(getWatchlist());
  const add = () => { if (!input.trim()) return; addToWatchlist(input.trim(), note.trim()); setInput(''); setNote(''); setShowAdd(false); sync(); };
  const remove = (ticker) => { setWatchlist(getWatchlist().filter(w => w.ticker !== ticker)); sync(); };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div style={{ padding: '60px 64px 40px', borderBottom: '0.5px solid var(--color-divider)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <p className="mono-label mb-3" style={{ opacity: 0.4 }}>Tracking</p>
          <h1 style={{ fontFamily: 'Instrument Serif', fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.05 }}>Watchlist</h1>
          <p style={{ fontFamily: 'Inter', fontSize: '14px', opacity: 0.45, marginTop: '8px' }}>{list.length} {list.length === 1 ? 'stock' : 'stocks'} tracked</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAdd(!showAdd)}><Plus size={13} />Add Stock</button>
      </div>
      {showAdd && (
        <div style={{ margin: '0 64px', padding: '28px', border: '0.5px solid var(--color-signal)', background: 'rgba(63,119,255,0.02)' }}>
          <div className="mono-label mb-4">Add to Watchlist</div>
          <div className="flex gap-3 mb-3">
            <input value={input} onChange={e => setInput(e.target.value.toUpperCase())} onKeyDown={e => e.key === 'Enter' && add()} placeholder="AAPL" className="settings-input" style={{ maxWidth: '160px', fontSize: '14px' }} />
            <input value={note} onChange={e => setNote(e.target.value)} placeholder="Why are you watching this? (optional)" className="settings-input" style={{ flex: 1, fontSize: '14px' }} />
          </div>
          <div className="flex gap-3"><button className="btn-primary" onClick={add}>Add</button><button className="btn-ghost" onClick={() => setShowAdd(false)}>Cancel</button></div>
        </div>
      )}
      <div style={{ padding: '0 64px 120px' }}>
        {list.length === 0 && !showAdd && (
          <div style={{ paddingTop: '80px' }}><p style={{ fontFamily: 'Instrument Serif', fontSize: '28px', opacity: 0.3 }}>Nothing on your watchlist.</p><p style={{ fontFamily: 'Inter', fontSize: '14px', opacity: 0.35, marginTop: '8px' }}>Add stocks you want to monitor before committing.</p></div>
        )}
        {list.length > 0 && (
          <>
            <div className="grid py-3" style={{ gridTemplateColumns: '1fr 2fr 120px 80px', borderBottom: '0.5px solid var(--color-divider)' }}>
              {['Ticker','Note','Added',''].map(h => <div key={h} className="mono-label" style={{ opacity: 0.4 }}>{h}</div>)}
            </div>
            {list.map(item => (
              <div key={item.ticker} className="grid items-center py-5" style={{ gridTemplateColumns: '1fr 2fr 120px 80px', borderBottom: '0.5px solid var(--color-divider)' }}>
                <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '15px', fontWeight: 500 }}>{item.ticker}</div>
                <div style={{ fontFamily: 'Inter', fontSize: '14px', opacity: item.note ? 0.7 : 0.3 }}>{item.note || 'No note'}</div>
                <div className="mono-label" style={{ opacity: 0.4 }}>{new Date(item.addedAt).toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })}</div>
                <div className="flex items-center gap-3">
                  <button onClick={() => onAnalyze(item.ticker)} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5, padding: '4px' }}><ArrowUpRight size={14} /></button>
                  <button onClick={() => remove(item.ticker)} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.3, padding: '4px' }}><Trash2 size={12} /></button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
