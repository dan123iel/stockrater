import { Settings } from 'lucide-react';

export default function Nav({ currentView, onNavigate, onSettings }) {
  const links = [
    { id: 'analysis', label: 'Analyze' },
    { id: 'markets', label: 'Markets' },
    { id: 'macro', label: 'Macro' },
    { id: 'ideas', label: 'Ideas' },
    { id: 'watchlist', label: 'Watchlist' },
    { id: 'portfolio', label: 'Portfolio' },
  ];
  return (
    <nav className="nav-compact">
      <button className="nav-wordmark" onClick={() => onNavigate('analysis')}>pondex_</button>
      {links.map(l => (
        <button key={l.id} onClick={() => onNavigate(l.id)}
          className={`nav-link ${currentView === l.id ? 'active' : ''}`}
          style={{ background: 'none', border: 'none', padding: '4px 0' }}>
          {l.label}
        </button>
      ))}
      <button onClick={onSettings} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', opacity: .4, display: 'flex', alignItems: 'center' }}>
        <Settings size={14} />
      </button>
    </nav>
  );
}
