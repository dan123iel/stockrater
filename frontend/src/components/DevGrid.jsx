// DEV ONLY — 12-column grid overlay for layout alignment
// Remove import in main.jsx before shipping to production

export default function DevGrid() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      pointerEvents: 'none',
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1440px',
        padding: '0 32px',
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '24px',
        height: '100%',
      }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{
            background: 'rgba(255, 0, 80, 0.06)',
            borderLeft: '1px solid rgba(255, 0, 80, 0.2)',
            borderRight: '1px solid rgba(255, 0, 80, 0.2)',
            height: '100%',
          }} />
        ))}
      </div>
    </div>
  )
}
