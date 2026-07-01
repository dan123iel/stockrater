export default function TabOwnership({ profile }) {
  if (!profile) return <div style={{ padding: '32px 20px', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: .35 }}>Ownership data unavailable.</div>;

  const rows = [
    { label: 'Market Cap',         value: profile.marketCap         ? `$${(profile.marketCap / 1e9).toFixed(1)}B` : null },
    { label: 'Shares Outstanding', value: profile.sharesOutstanding  ? `${(profile.sharesOutstanding / 1e6).toFixed(0)}M` : null },
    { label: '52W High',           value: profile['52wHigh']         ? `$${parseFloat(profile['52wHigh']).toFixed(2)}` : null },
    { label: '52W Low',            value: profile['52wLow']          ? `$${parseFloat(profile['52wLow']).toFixed(2)}` : null },
    { label: 'Beta',               value: profile.beta               ? parseFloat(profile.beta).toFixed(2) : null },
    { label: 'Sector',             value: profile.sector             || null },
    { label: 'Country',            value: profile.country            || null },
  ];

  return (
    <div style={{ padding: '16px 20px' }}>
      {rows.filter(r => r.value).map(r => (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid var(--color-divider)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-muted)' }}>{r.label}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}
