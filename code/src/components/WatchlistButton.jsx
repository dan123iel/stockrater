import { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { isOnWatchlist, addToWatchlist, setWatchlist, getWatchlist } from '../pages/Watchlist';

export default function WatchlistButton({ ticker }) {
  const [on, setOn] = useState(() => isOnWatchlist(ticker));

  const toggle = () => {
    if (on) { setWatchlist(getWatchlist().filter(w => w.ticker !== ticker)); setOn(false); }
    else { addToWatchlist(ticker); setOn(true); }
  };

  return (
    <button onClick={toggle} className="btn-ghost" style={{ gap: '6px', fontSize: '12px' }} title={on ? 'Remove from Watchlist' : 'Add to Watchlist'}>
      {on ? <BookmarkCheck size={13} style={{ color: 'var(--color-signal)' }} /> : <Bookmark size={13} />}
      {on ? 'Watching' : 'Watch'}
    </button>
  );
}
