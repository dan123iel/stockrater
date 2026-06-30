import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { fetchNews } from '../../lib/fmp';

export default function NewsTile({ ticker, compact }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ticker) return;
    setLoading(true); setError(null);
    fetchNews(ticker)
      .then(items => { setNews(Array.isArray(items) ? items : []); setLoading(false); })
      .catch(() => { setError('News temporarily unavailable'); setLoading(false); });
  }, [ticker]);

  const fmtDate = (str) => {
    try { return new Date(str).toLocaleDateString('en', { month: 'short', day: 'numeric' }); }
    catch { return ''; }
  };

  if (loading) return <div style={{ padding: '20px', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: .35 }}>Loading…</div>;

  return (
    <div style={{ overflowY: 'auto', maxHeight: compact ? '280px' : '400px' }}>
      {error && <div style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: .4 }}>{error}</div>}
      {!error && news.length === 0 && <div style={{ padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: .35 }}>No recent headlines</div>}
      {news.map((item, i) => (
        <a key={i} href={item.link} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', padding: '12px 20px', borderBottom: '1px solid var(--color-divider)', textDecoration: 'none', color: 'inherit', transition: 'background .12s' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--color-panel)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.5, flex: 1 }}>{item.title}</p>
            <ArrowUpRight size={11} style={{ opacity: .3, flexShrink: 0, marginTop: '2px' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
            {item.pubDate && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', opacity: .4 }}>{fmtDate(item.pubDate)}</span>}
            {item.source && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', opacity: .4 }}>{item.source}</span>}
          </div>
        </a>
      ))}
    </div>
  );
}
