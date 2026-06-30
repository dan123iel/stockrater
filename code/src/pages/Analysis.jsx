import { useState, useCallback, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { getProfile, getPortfolio, getThesis } from '../lib/storage';
import { fetchAllData, fetchScore } from '../lib/fmp';
import ScoreHero from '../components/ScoreHero';
import ThesisDrawer from '../components/ThesisDrawer';
import ValuationTile from '../components/tiles/ValuationTile';
import DCFTile from '../components/tiles/DCFTile';
import ChartTile from '../components/tiles/ChartTile';
import NewsTile from '../components/tiles/NewsTile';
import AIInsightsTile from '../components/tiles/AllInsightsTile';
import InsiderTile from '../components/tiles/InsiderTile';
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
  { id: 'dividends',  label: 'Dividends', soon: true },
  { id: 'analysts',   label: 'Analysts', soon: true },
];

function ComingSoon({ label }) {
  return (
    <div style={{ padding: '32px 20px', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: .35 }}>
      {label} — coming soon
    </div>
  );
}

function OwnershipTile({ profile }) {
  if (!profile) return <ComingSoon label="Ownership" />;
  const rows = [
    { label: 'Market Cap', value: profile.marketCap ? `$${(profile.marketCap / 1e9).toFixed(1)}B` : null },
    { label: 'Shares Outstanding', value: profile.sharesOutstanding ? `${(profile.sharesOutstanding / 1e6).toFixed(0)}M` : null },
    { label: '52W High', value: profile['52wHigh'] ? `$${parseFloat(profile['52wHigh']).toFixed(2)}` : null },
    { label: '52W Low', value: profile['52wLow'] ? `$${parseFloat(profile['52wLow']).toFixed(2)}` : null },
    { label: 'Beta', value: profile.beta ? parseFloat(profile.beta).toFixed(2) : null },
    { label: 'Sector', value: profile.sector || null },
    { label: 'Country', value: profile.country || null },
  ];
  return (
    <div style={{ padding: '16px 20px' }}>
      {rows.map(r => r.value && (
        <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid var(--color-divider)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-muted)' }}>{r.label}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function Analysis({ initialTicker }) {
  const [query, setQuery] = useState('');
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [scoreResult, setScoreResult] = useState(null);
  const [activeTab, setActiveTab] = useState('scorecard');
  const [showThesis, setShowThesis] = useState(false);
  const [showMemo, setShowMemo] = useState(false);
  const [recent, setRecent] = useState(getRecent());

  const profile = getProfile();

  useEffect(() => { if (initialTicker) analyze(initialTicker); }, [initialTicker]); // eslint-disable-line

  const analyze = useCallback(async (t) => {
    const sym = t.trim().toUpperCase();
    if (!sym) return;
    setTicker(sym); setLoading(true); setError(null);
    setStockData(null); setScoreResult(null); setQuery(sym); setActiveTab('scorecard');
    try {
      const [data, score] = await Promise.all([
        fetchAllData(sym),
        fetchScore(sym, profile?.strategy),
      ]);
      if (!data.profile && !data.ratios) { setError(`No data found for "${sym}".`); setLoading(false); return; }
      setStockData(data);
      setScoreResult(score);
      addRecent(sym); setRecent(getRecent());
    } catch (err) {
      setError(err.message || 'Data temporarily unavailable. Make sure the backend is running.');
    } finally { setLoading(false); }
  }, [profile]);

  const hasResults = stockData && scoreResult && !loading && !error;

  const renderTabContent = () => {
    if (!hasResults) return null;
    switch (activeTab) {
      case 'scorecard':
        return (
          <ScoreHero
            result={scoreResult}
            ticker={ticker}
            company={stockData.profile}
            onWriteThesis={() => setShowThesis(true)}
            onGenerateMemo={() => setShowMemo(true)}
          />
        );
      case 'chart':
        return <ChartTile ticker={ticker} compact />;
      case 'valuation':
        return <ValuationTile ratios={stockData.ratios} keyMetrics={stockData.keyMetrics} loading={false} error={stockData.errors?.ratios} />;
      case 'dcf':
        return <DCFTile profile={stockData.profile} keyMetrics={stockData.keyMetrics} incomeStatements={stockData.incomeStatements} loading={false} error={!stockData.profile ? 'Insufficient data' : null} />;
      case 'news':
        return <NewsTile ticker={ticker} />;
      case 'insider':
        return <InsiderTile trades={stockData.insiderTrades || []} loading={false} error={stockData.errors?.insider} />;
      case 'ai':
        return <AIInsightsTile ticker={ticker} scoreResult={scoreResult} profile={profile} portfolio={getPortfolio()} thesis={getThesis(ticker)} />;
      case 'ownership':
        return <OwnershipTile profile={stockData.profile} />;
      case 'profile':
        return (
          <div style={{ padding: '20px', fontFamily: 'var(--font-body)', fontSize: '13px', lineHeight: 1.7, color: 'var(--color-ink)', opacity: .75 }}>
            {stockData.profile?.description || 'No company description available.'}
          </div>
        );
      case 'financials':
        return <ComingSoon label="Financials" />;
      case 'dividends':
        return <ComingSoon label="Dividends" />;
      case 'analysts':
        return <ComingSoon label="Analysts" />;
      default:
        return null;
    }
  };

  return (
    <div style={{ paddingTop: '52px', minHeight: '100vh', background: 'var(--color-surface)' }}>

      {/* Search bar */}
      <div className="analysis-search-bar">
        <Search size={12} style={{ opacity: .35, flexShrink: 0 }} />
        <input
          className="analysis-search-input"
          value={query}
          onChange={e => setQuery(e.target.value.toUpperCase())}
          onKeyDown={e => e.key === 'Enter' && query.trim() && analyze(query.trim())}
          placeholder="AAPL · SAP.DE · ASML.AS · TSM"
        />
        {query && (
          <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: .35, padding: '0 6px' }}>
            <X size={11} />
          </button>
        )}
        <button
          onClick={() => query.trim() && analyze(query.trim())}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', background: 'var(--color-ink)', color: '#fff', border: 'none', cursor: 'pointer', padding: '0 20px', height: '100%', flexShrink: 0 }}
        >
          Analyze
        </button>
      </div>

      {/* Ticker meta strip */}
      {hasResults && (
        <div style={{ display: 'flex', alignItems: 'center', height: '40px', padding: '0 28px', borderBottom: '1px solid var(--color-divider)', gap: '10px', background: 'var(--color-surface)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 500 }}>{ticker}</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-muted)' }}>{stockData.profile?.companyName}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', marginLeft: 'auto' }}>
            {stockData.profile?.price ? `$${parseFloat(stockData.profile.price).toFixed(2)}` : ''}
          </span>
        </div>
      )}

      {/* Landing */}
      {!stockData && !loading && !error && (
        <>
          {recent.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 28px', borderBottom: '1px solid var(--color-divider)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '.14em', textTransform: 'uppercase', opacity: .35 }}>Recent</span>
              {recent.map(t => (
                <button key={t} onClick={() => analyze(t)}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', padding: '3px 10px', border: '1px solid var(--color-divider)', background: 'transparent', cursor: 'pointer', color: 'var(--color-ink)', opacity: .6, transition: 'opacity .15s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '.6'}>
                  {t}
                </button>
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
            <div className="skeleton" style={{ height: '12px', width: '120px' }} />
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

      {/* Tab layout */}
      {hasResults && (
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* Tab bar — 12 tabs */}
          <div style={{
            display: 'flex', overflowX: 'auto', borderBottom: '1px solid var(--color-divider)',
            scrollbarWidth: 'none', background: 'var(--color-surface)',
          }}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => !tab.soon && setActiveTab(tab.id)}
                style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px', letterSpacing: '.1em',
                  textTransform: 'uppercase', padding: '10px 16px',
                  border: 'none', background: 'none', cursor: tab.soon ? 'default' : 'pointer',
                  color: activeTab === tab.id ? 'var(--color-ink)' : 'var(--color-muted)',
                  opacity: tab.soon ? .35 : 1,
                  borderBottom: activeTab === tab.id ? '2px solid var(--color-ink)' : '2px solid transparent',
                  whiteSpace: 'nowrap', flexShrink: 0,
                  transition: 'color .15s, border-color .15s',
                }}
                onMouseEnter={e => { if (!tab.soon && activeTab !== tab.id) e.currentTarget.style.color = 'var(--color-ink)'; }}
                onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = 'var(--color-muted)'; }}
              >
                {tab.label}
                {tab.soon && <span style={{ marginLeft: '4px', fontSize: '8px' }}>·</span>}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ minHeight: '400px' }}>
            {renderTabContent()}
          </div>

          {/* Disclaimer */}
          <div style={{ padding: '14px 20px', borderTop: '1px solid var(--color-divider)' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', opacity: .22, lineHeight: 1.6, letterSpacing: '.03em' }}>
              Algorithmic signals, not financial advice. Data sourced from Yahoo Finance and SEC EDGAR. For informational purposes only.
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
