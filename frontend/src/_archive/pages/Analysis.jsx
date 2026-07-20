import { useState, useCallback, useEffect, Suspense } from 'react';
import { Search, X } from 'lucide-react';
import { getProfile, getPortfolio, getThesis } from '../lib/storage';
import { fetchAllData, fetchScore } from '../lib/fmp';
import {
  TabScorecard, TabChart, TabValuation, TabDCF,
  TabNews, TabInsider, TabAI, TabOwnership, TabProfile,
} from '../components/tabs/index.js';
import ThesisDrawer from '../components/ThesisDrawer';
import AnalysisLanding from '../components/AnalysisLanding';
import InvestmentMemo from '../components/InvestmentMemo';

const RECENT_KEY = 'pondex_recent';
const getRecent = () => { try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch { return []; } };
const addRecent = (t) => { const r = getRecent().filter(x => x !== t.toUpperCase()); localStorage.setItem(RECENT_KEY, JSON.stringify([t.toUpperCase(), ...r].slice(0, 6))); };

const TABS = [
  { id: 'scorecard',  label: 'Scorecard' },
  { id: 'chart',      label: 'Chart' },
  { id: 'valuation',  label: 'Valuation' },
  { id: 'dcf',        label: 'DCF' },
  { id: 'news',       label: 'News' },
  { id: 'insider',    label: 'Insider' },
  { id: 'ai',         label: 'AI' },
  { id: 'ownership',  label: 'Ownership' },
  { id: 'profile',    label: 'Profile' },
  { id: 'financials', label: 'Financials', soon: true },
  { id: 'dividends',  label: 'Dividends',  soon: true },
  { id: 'analysts',   label: 'Analysts',   soon: true },
];

function ComingSoon({ label }) {
  return <div style={{ padding: '32px 20px', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: .35 }}>{label} — coming soon</div>;
}

function TabFallback() {
  return <div style={{ padding: '32px 20px', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: .3 }}>Loading…</div>;
}

export default function Analysis({ initialTicker }) {
  const [query, setQuery]           = useState('');
  const [ticker, setTicker]         = useState('');
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);
  const [stockData, setStockData]   = useState(null);
  const [scoreResult, setScore]     = useState(null);
  const [activeTab, setActiveTab]   = useState('scorecard');
  const [showThesis, setShowThesis] = useState(false);
  const [showMemo, setShowMemo]     = useState(false);
  const [recent, setRecent]         = useState(getRecent());

  const profile = getProfile();

  useEffect(() => { if (initialTicker) analyze(initialTicker); }, [initialTicker]); // eslint-disable-line

  const analyze = useCallback(async (t) => {
    const sym = t.trim().toUpperCase();
    if (!sym) return;
    setTicker(sym); setLoading(true); setError(null);
    setStockData(null); setScore(null); setQuery(sym); setActiveTab('scorecard');
    try {
      const [data, score] = await Promise.all([fetchAllData(sym), fetchScore(sym, profile?.strategy)]);
      if (!data.profile && !data.ratios) { setError(`No data found for "${sym}".`); setLoading(false); return; }
      setStockData(data); setScore(score);
      addRecent(sym); setRecent(getRecent());
    } catch (err) {
      setError(err.message || 'Data temporarily unavailable. Make sure the backend is running.');
    } finally { setLoading(false); }
  }, [profile]);

  const hasResults = stockData && scoreResult && !loading && !error;

  const renderTab = () => {
    if (!hasResults) return null;
    const d = stockData;
    switch (activeTab) {
      case 'scorecard': return <TabScorecard scoreResult={scoreResult} ticker={ticker} company={d.profile} onWriteThesis={() => setShowThesis(true)} onGenerateMemo={() => setShowMemo(true)} />;
      case 'chart':     return <TabChart ticker={ticker} />;
      case 'valuation': return <TabValuation ratios={d.ratios} keyMetrics={d.keyMetrics} error={d.errors?.ratios} />;
      case 'dcf':       return <TabDCF profile={d.profile} keyMetrics={d.keyMetrics} incomeStatements={d.incomeStatements} />;
      case 'news':      return <TabNews ticker={ticker} />;
      case 'insider':   return <TabInsider trades={d.insiderTrades || []} error={d.errors?.insider} />;
      case 'ai':        return <TabAI ticker={ticker} scoreResult={scoreResult} profile={profile} portfolio={getPortfolio()} thesis={getThesis(ticker)} />;
      case 'ownership': return <TabOwnership profile={d.profile} />;
      case 'profile':   return <TabProfile profile={d.profile} />;
      default:          return <ComingSoon label={TABS.find(t => t.id === activeTab)?.label} />;
    }
  };

  return (
    <div style={{ paddingTop: '52px', minHeight: '100vh', background: 'var(--color-surface)' }}>

      {/* Search */}
      <div className="analysis-search-bar">
        <Search size={12} style={{ opacity: .35, flexShrink: 0 }} />
        <input className="analysis-search-input" value={query}
          onChange={e => setQuery(e.target.value.toUpperCase())}
          onKeyDown={e => e.key === 'Enter' && query.trim() && analyze(query.trim())}
          placeholder="AAPL · SAP.DE · ASML.AS · TSM"
        />
        {query && <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: .35, padding: '0 6px' }}><X size={11} /></button>}
        <button onClick={() => query.trim() && analyze(query.trim())}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', background: 'var(--color-ink)', color: '#fff', border: 'none', cursor: 'pointer', padding: '0 20px', height: '100%', flexShrink: 0 }}>
          Analyze
        </button>
      </div>

      {/* Meta strip */}
      {hasResults && (
        <div style={{ display: 'flex', alignItems: 'center', height: '40px', padding: '0 28px', borderBottom: '1px solid var(--color-divider)', gap: '10px', background: 'var(--color-surface)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 500 }}>{ticker}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-muted)' }}>{stockData.profile?.companyName}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', marginLeft: 'auto' }}>{stockData.profile?.price ? `$${parseFloat(stockData.profile.price).toFixed(2)}` : ''}</span>
        </div>
      )}

      {/* Landing */}
      {!stockData && !loading && !error && (
        <>
          {recent.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 28px', borderBottom: '1px solid var(--color-divider)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', opacity: .35 }}>Recent</span>
              {recent.map(t => (
                <button key={t} onClick={() => analyze(t)} style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', padding: '3px 10px', border: '1px solid var(--color-divider)', background: 'transparent', cursor: 'pointer', color: 'var(--color-ink)', opacity: .6 }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'} onMouseLeave={e => e.currentTarget.style.opacity = '.6'}>{t}</button>
              ))}
            </div>
          )}
          <AnalysisLanding onAnalyze={analyze} recent={[]} />
        </>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ padding: '48px 28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '240px' }}>
            <div className="skeleton" style={{ height: '72px', width: '140px' }} />
            <div className="skeleton" style={{ height: '12px', width: '180px' }} />
          </div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase', opacity: .3, marginTop: '20px' }}>Loading…</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div style={{ padding: '48px 28px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-warning)', marginBottom: '6px' }}>Data not available</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', opacity: .55 }}>{error}</p>
        </div>
      )}

      {/* Dashboard */}
      {hasResults && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* Tab bar */}
          <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid var(--color-divider)', scrollbarWidth: 'none', background: 'var(--color-surface)' }}>
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => !tab.soon && setActiveTab(tab.id)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.1em', textTransform: 'uppercase',
                  padding: '10px 16px', border: 'none', background: 'none', cursor: tab.soon ? 'default' : 'pointer',
                  color: activeTab === tab.id ? 'var(--color-ink)' : 'var(--color-muted)',
                  opacity: tab.soon ? .35 : 1,
                  borderBottom: activeTab === tab.id ? '2px solid var(--color-ink)' : '2px solid transparent',
                  whiteSpace: 'nowrap', flexShrink: 0, transition: 'color .15s, border-color .15s',
                }}
                onMouseEnter={e => { if (!tab.soon && activeTab !== tab.id) e.currentTarget.style.color = 'var(--color-ink)'; }}
                onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--color-muted)'; }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content — Suspense for lazy-loaded components */}
          <div style={{ minHeight: '400px' }}>
            <Suspense fallback={<TabFallback />}>
              {renderTab()}
            </Suspense>
          </div>

          {/* Disclaimer */}
          <div style={{ padding: '14px 20px', borderTop: '1px solid var(--color-divider)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', opacity: .55, lineHeight: 1.6, letterSpacing: '.03em' }}>
              Algorithmic signals, not financial advice. Data: Yahoo Finance + SEC EDGAR.
              {stockData._isDemo && ' · Demo data — start the backend for live data.'}
            </p>
          </div>
        </div>
      )}

      {showThesis && <ThesisDrawer ticker={ticker} scoreResult={scoreResult} onClose={() => setShowThesis(false)} />}
      {showMemo && stockData && <InvestmentMemo ticker={ticker} company={stockData.profile} scoreResult={scoreResult} profile={profile} onClose={() => setShowMemo(false)} />}
    </div>
  );
}
