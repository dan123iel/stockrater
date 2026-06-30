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

export default function Analysis({ initialTicker }) {
  const [query, setQuery] = useState('');
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [scoreResult, setScoreResult] = useState(null);
  const [showThesis, setShowThesis] = useState(false);
  const [showMemo, setShowMemo] = useState(false);
  const [recent, setRecent] = useState(getRecent());
  const [activeMore, setActiveMore] = useState(null);

  const profile = getProfile();

  useEffect(() => { if (initialTicker) analyze(initialTicker); }, [initialTicker]); // eslint-disable-line

  const analyze = useCallback(async (t) => {
    const sym = t.trim().toUpperCase();
    if (!sym) return;
    setTicker(sym); setLoading(true); setError(null);
    setStockData(null); setScoreResult(null); setQuery(sym); setActiveMore(null);
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

  const MORE_TILES = [
    { id: 'insider', label: 'Insider', component: <InsiderTile trades={stockData?.insiderTrades || []} loading={false} error={stockData?.errors?.insider} /> },
    { id: 'financials', label: 'Financials', component: <div style={{ padding: '20px', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: .4 }}>Financials coming soon</div> },
    { id: 'dividends', label: 'Dividends', component: <div style={{ padding: '20px', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: .4 }}>Dividends coming soon</div> },
    { id: 'analysts', label: 'Analysts', component: <div style={{ padding: '20px', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: .4 }}>Analysts coming soon</div> },
    { id: 'profile', label: 'Profile', component: <div style={{ padding: '20px', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: .4 }}>{stockData?.profile?.description || 'No description available.'}</div> },
  ];

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
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', marginLeft: 'auto' }}>${parseFloat(stockData.profile?.price || 0).toFixed(2)}</span>
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

      {/* Dashboard */}
      {hasResults && (
        <div className="dashboard-layout">

          {/* Left: Score panel (sticky) */}
          <ScoreHero
            result={scoreResult}
            ticker={ticker}
            company={stockData.profile}
            onWriteThesis={() => setShowThesis(true)}
            onGenerateMemo={() => setShowMemo(true)}
          />

          {/* Right: Content */}
          <div className="content-panel">

            {/* Chart — full width */}
            <div style={{ borderBottom: '1px solid var(--color-divider)' }}>
              <div className="dash-tile-label">
                <span>Price · 1Y</span>
                {stockData.profile?.price && <span>${parseFloat(stockData.profile.price).toFixed(2)}</span>}
              </div>
              <ChartTile ticker={ticker} compact />
            </div>

            {/* 2×2 grid */}
            <div className="data-grid-2x2">
              <div>
                <div className="dash-tile-label">Valuation</div>
                <ValuationTile ratios={stockData.ratios} keyMetrics={stockData.keyMetrics} loading={false} error={stockData.errors?.ratios} compact />
              </div>
              <div>
                <div className="dash-tile-label">DCF · Fair Value</div>
                <DCFTile profile={stockData.profile} keyMetrics={stockData.keyMetrics} incomeStatements={stockData.incomeStatements} loading={false} error={!stockData.profile ? 'Insufficient data' : null} compact />
              </div>
              <div>
                <div className="dash-tile-label">News</div>
                <NewsTile ticker={ticker} compact />
              </div>
              <div>
                <div className="dash-tile-label">AI Insights</div>
                <AIInsightsTile ticker={ticker} scoreResult={scoreResult} profile={profile} portfolio={getPortfolio()} thesis={getThesis(ticker)} compact />
              </div>
            </div>

            {/* More tiles strip */}
            <div className="more-tiles">
              {MORE_TILES.map(t => (
                <button
                  key={t.id}
                  className="more-tile"
                  style={{ background: activeMore === t.id ? 'var(--color-panel)' : 'transparent' }}
                  onClick={() => setActiveMore(activeMore === t.id ? null : t.id)}
                >
                  <div className="more-tile-label">{t.label}</div>
                </button>
              ))}
            </div>

            {/* Expanded more tile */}
            {activeMore && (
              <div style={{ borderTop: '1px solid var(--color-divider)', animation: 'fadeIn .2s ease' }}>
                <div className="dash-tile-label">
                  <span>{MORE_TILES.find(t => t.id === activeMore)?.label}</span>
                  <button onClick={() => setActiveMore(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: .4, fontSize: '16px', lineHeight: 1 }}>×</button>
                </div>
                {MORE_TILES.find(t => t.id === activeMore)?.component}
              </div>
            )}

            {/* Disclaimer */}
            <div style={{ padding: '14px 20px', borderTop: '1px solid var(--color-divider)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', opacity: .22, lineHeight: 1.6, letterSpacing: '.03em' }}>
                Algorithmic signals, not financial advice. Data sourced from Yahoo Finance and SEC EDGAR. For informational purposes only.
                {stockData._isDemo && ' · Demo data — start the backend for live data.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {showThesis && <ThesisDrawer ticker={ticker} scoreResult={scoreResult} onClose={() => setShowThesis(false)} />}
      {showMemo && stockData && <InvestmentMemo ticker={ticker} company={stockData.profile} scoreResult={scoreResult} profile={profile} onClose={() => setShowMemo(false)} />}
    </div>
  );
}
