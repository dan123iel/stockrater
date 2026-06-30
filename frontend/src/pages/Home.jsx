import { useState, useEffect } from 'react';
import { getProfile } from '../lib/storage';
import Nav from '../components/Nav';
import SettingsPanel from '../components/SettingsPanel';
import Onboarding from './Onboarding';
import Analysis from './Analysis';
import Portfolio from './Portfolio';
import Ideas from './Ideas';
import Macro from './Macro';
import Watchlist from './Watchlist';
import Markets from './Markets';

export default function Home() {
  const [profile, setProfileState] = useState(() => getProfile());
  const [showOnboarding, setShowOnboarding] = useState(() => !getProfile());
  const [view, setView] = useState('analysis');
  const [showSettings, setShowSettings] = useState(false);
  const [analyzeTarget, setAnalyzeTarget] = useState(null);

  useEffect(() => {
    const handleSettings = () => setShowSettings(true);
    const handleAnalyze = (e) => { setView('analysis'); setAnalyzeTarget(e.detail); };
    const handleMacro = () => setView('macro');
    document.addEventListener('open-settings', handleSettings);
    document.addEventListener('analyze-ticker', handleAnalyze);
    document.addEventListener('navigate-macro', handleMacro);
    return () => {
      document.removeEventListener('open-settings', handleSettings);
      document.removeEventListener('analyze-ticker', handleAnalyze);
      document.removeEventListener('navigate-macro', handleMacro);
    };
  }, []);

  if (showOnboarding) return <Onboarding onComplete={() => { setProfileState(getProfile()); setShowOnboarding(false); }} />;

  const handleAnalyzeFromIdeas = (ticker) => { setView('analysis'); setAnalyzeTarget(ticker); setTimeout(() => setAnalyzeTarget(null), 100); };

  return (
    <div style={{ background: 'var(--color-surface)', minHeight: '100vh' }}>
      <Nav currentView={view} onNavigate={(v) => { setView(v); setAnalyzeTarget(null); }} onSettings={() => setShowSettings(true)} />
      <main>
        {view === 'analysis'  && <Analysis key={analyzeTarget} initialTicker={analyzeTarget} />}
        {view === 'markets'   && <Markets onAnalyze={handleAnalyzeFromIdeas} />}
        {view === 'macro'     && <Macro />}
        {view === 'ideas'     && <Ideas onAnalyze={handleAnalyzeFromIdeas} />}
        {view === 'watchlist' && <Watchlist onAnalyze={handleAnalyzeFromIdeas} />}
        {view === 'portfolio' && <Portfolio />}
      </main>
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} onEditProfile={() => { setShowSettings(false); setShowOnboarding(true); }} />}
    </div>
  );
}
