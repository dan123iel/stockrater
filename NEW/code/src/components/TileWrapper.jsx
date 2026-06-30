export default function TileWrapper({ title, label, children, loading, error, className = '', action }) {
  return (
    <div className={`tile ${className}`} style={{ animationFillMode: 'both' }}>
      <div className="tile-header">
        <div className="flex items-center gap-3">
          <span className="mono-label">{title}</span>
          {label && <span className="mono-label-signal">{label}</span>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <div className="relative">
        {loading && (
          <div className="p-6 space-y-3">
            <div className="skeleton h-4 w-3/4" style={{ borderRadius: 0 }} />
            <div className="skeleton h-4 w-1/2" style={{ borderRadius: 0 }} />
            <div className="skeleton h-4 w-2/3" style={{ borderRadius: 0 }} />
            <div className="skeleton h-20 w-full mt-4" style={{ borderRadius: 0 }} />
          </div>
        )}
        {error && !loading && (
          <div className="p-6">
            <p className="mono-label mb-1" style={{ textDecoration: 'line-through', opacity: 0.4 }}>Data not available</p>
            <p className="text-sm" style={{ color: 'var(--color-muted-foreground)', fontFamily: 'IBM Plex Mono', fontSize: '11px', opacity: 0.5 }}>{typeof error === 'string' ? error : 'Data temporarily unavailable'}</p>
          </div>
        )}
        {!loading && !error && children}
      </div>
    </div>
  );
}
