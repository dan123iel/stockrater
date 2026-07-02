import TileWrapper from '../TileWrapper';

const formatValue = (v) => {
  if (!v) return '—';
  const n = Math.abs(v);
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n.toFixed(0)}`;
};

const formatDate = (d) => {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en', { month: 'short', day: 'numeric' });
};

export default function InsiderTile({ trades = [], loading, error }) {
  const buys = trades.filter(t => t.transactionType?.toLowerCase().includes('purchase') || t.transactionType === 'P-Purchase');
  const sells = trades.filter(t => t.transactionType?.toLowerCase().includes('sale') || t.transactionType === 'S-Sale');
  const netSentiment = buys.length > sells.length ? 'buying' : buys.length < sells.length ? 'selling' : 'neutral';

  return (
    <TileWrapper title="Insider Activity" loading={loading} error={error}>
      {trades.length > 0 && (
        <div style={{ padding: '12px 24px', borderBottom: '0.5px solid var(--color-divider)', display: 'flex', gap: '24px', background: 'var(--color-surface)' }}>
          <div>
            <div className="mono-label" style={{ opacity: 0.4, marginBottom: '2px' }}>Buys (90d)</div>
            <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '16px', color: 'var(--color-intact)' }}>{buys.length}</div>
          </div>
          <div>
            <div className="mono-label" style={{ opacity: 0.4, marginBottom: '2px' }}>Sells (90d)</div>
            <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '16px', color: 'var(--color-warning)' }}>{sells.length}</div>
          </div>
          <div>
            <div className="mono-label" style={{ opacity: 0.4, marginBottom: '2px' }}>Signal</div>
            <div style={{
              fontFamily: 'IBM Plex Mono', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase',
              color: netSentiment === 'buying' ? 'var(--color-intact)' : netSentiment === 'selling' ? 'var(--color-warning)' : 'var(--color-ink)',
            }}>
              {netSentiment}
            </div>
          </div>
        </div>
      )}

      <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
        {trades.length === 0 ? (
          <div style={{ padding: '32px 24px' }}>
            <p className="mono-label" style={{ opacity: 0.35 }}>No insider transactions found</p>
          </div>
        ) : (
          trades.slice(0, 12).map((t, i) => {
            const isBuy = t.transactionType?.toLowerCase().includes('purchase') || t.transactionType === 'P-Purchase';
            return (
              <div key={i} style={{ padding: '12px 24px', borderBottom: '0.5px solid var(--color-divider)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 500 }}>
                    {t.reportingName || t.insiderName || 'Unknown'}
                  </div>
                  <div className="mono-label" style={{ opacity: 0.4, marginTop: '2px' }}>
                    {t.typeOfOwner || 'Insider'} · {formatDate(t.transactionDate || t.filingDate)}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontFamily: 'IBM Plex Mono', fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: isBuy ? 'var(--color-intact)' : 'var(--color-warning)',
                  }}>
                    {isBuy ? '▲ Buy' : '▼ Sell'}
                  </div>
                  <div style={{ fontFamily: 'IBM Plex Mono', fontSize: '12px', opacity: 0.6, marginTop: '2px' }}>
                    {formatValue(t.value || (t.securitiesTransacted * t.price))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <p style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', opacity: 0.3, padding: '8px 24px 12px', margin: 0 }}>Source: SEC EDGAR Form 4</p>
    </TileWrapper>
  );
}
