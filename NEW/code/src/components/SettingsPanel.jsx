import { useState } from 'react';
import { X, Download, Upload } from 'lucide-react';
import { getFmpKey, setFmpKey, getGroqKey, setGroqKey, getPortfolio, setPortfolio, getTheses, set, KEYS, getProfile, setProfile } from '../lib/storage';
import { getWatchlist, setWatchlist } from '../pages/Watchlist';

export default function SettingsPanel({ onClose, onEditProfile }) {
  const [fmpKey, setFmpKeyState] = useState(getFmpKey());
  const [groqKey, setGroqKeyState] = useState(getGroqKey());
  const [saved, setSaved] = useState(false);

  const save = () => {
    setFmpKey(fmpKey.trim());
    setGroqKey(groqKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const exportAll = () => {
    const backup = { version: 1, exportedAt: new Date().toISOString(), portfolio: getPortfolio(), theses: getTheses(), watchlist: getWatchlist(), profile: getProfile() };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pondex-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importAll = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        if (data.version === 1) {
          if (data.portfolio) setPortfolio(data.portfolio);
          if (data.theses) set(KEYS.THESES, data.theses);
          if (data.watchlist) setWatchlist(data.watchlist);
          if (data.profile) setProfile(data.profile);
          alert('Backup restored successfully. Reload to see all changes.');
        } else if (Array.isArray(data)) {
          setPortfolio(data);
          alert('Portfolio imported successfully.');
        } else {
          alert('Unrecognized file format.');
        }
      } catch { alert('Invalid file format.'); }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="thesis-drawer open" style={{ width: '480px' }}>
        <div style={{ padding: '32px 36px 24px', borderBottom: '0.5px solid var(--color-divider)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: 'Instrument Serif', fontSize: '28px', lineHeight: 1 }}>Settings</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}><X size={18} /></button>
        </div>
        <div style={{ padding: '32px 36px' }} className="space-y-10">
          <div>
            <div className="mono-label mb-3">FMP API Key</div>
            <p style={{ fontFamily: 'Inter', fontSize: '13px', opacity: 0.5, marginBottom: '10px', lineHeight: 1.5 }}>Required for all stock data. Get a free key at <a href="https://financialmodelingprep.com/developer/docs" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-signal)', textDecoration: 'underline' }}>financialmodelingprep.com</a> — free tier covers 250 requests/day.</p>
            <input type="password" value={fmpKey} onChange={e => setFmpKeyState(e.target.value)} placeholder="Enter your FMP API key…" className="settings-input" />
          </div>
          <div>
            <div className="mono-label mb-3">Groq API Key</div>
            <p style={{ fontFamily: 'Inter', fontSize: '13px', opacity: 0.5, marginBottom: '10px', lineHeight: 1.5 }}>Required for AI Insights chat. Get a free key at <a href="https://console.groq.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-signal)', textDecoration: 'underline' }}>console.groq.com</a>.</p>
            <input type="password" value={groqKey} onChange={e => setGroqKeyState(e.target.value)} placeholder="Enter your Groq API key…" className="settings-input" />
          </div>
          <button onClick={save} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>{saved ? '✓ Keys saved' : 'Save API Keys'}</button>
          <div style={{ borderTop: '0.5px solid var(--color-divider)', paddingTop: '28px' }}>
            <div className="mono-label mb-3">Your Profile</div>
            <button onClick={onEditProfile} className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>Edit Strategy Profile</button>
          </div>
          <div style={{ borderTop: '0.5px solid var(--color-divider)', paddingTop: '28px' }}>
            <div className="mono-label mb-1">Backup & Restore</div>
            <p style={{ fontFamily: 'Inter', fontSize: '13px', opacity: 0.45, marginBottom: '12px', lineHeight: 1.5 }}>Exports portfolio, watchlist, theses, and profile in one file.</p>
            <div className="flex gap-3">
              <button onClick={exportAll} className="btn-ghost flex-1 justify-center"><Download size={13} />Export Backup</button>
              <label className="btn-ghost flex-1 justify-center" style={{ cursor: 'pointer' }}><Upload size={13} />Import Backup<input type="file" accept=".json" onChange={importAll} style={{ display: 'none' }} /></label>
            </div>
          </div>
          <p style={{ fontFamily: 'Inter', fontSize: '12px', opacity: 0.35, textAlign: 'center', lineHeight: 1.5 }}>All data is stored locally in your browser.<br />Nothing is transmitted to pondex servers.</p>
        </div>
      </div>
    </>
  );
}
