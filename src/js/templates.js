// ============================================================
// futara — templates.js  v2
//
// Renders all page HTML using SEMANTIC CSS classes only.
// Every class starts with "f-" (futara prefix).
//
// Design files define what these classes LOOK LIKE.
// This file defines what they MEAN and WHERE they go.
//
// Semantic class reference:
//   Layout:    .f-page, .f-page.is-active
//   Nav:       .f-nav, .f-nav-logo, .f-nav-links, .f-nav-item,
//              .f-nav-item.is-active, .f-nav-divider,
//              .f-nav-search-wrap, .f-nav-search-input,
//              .f-nav-search-dropdown, .f-nav-search-btn,
//              .f-nav-right, .f-nav-btn (portfolio/profile)
//   Tape:      .f-tape, .f-tape-inner, .f-tape-item,
//              .f-tape-sym, .f-tape-price, .f-tape-chg
//   Buttons:   .f-btn-primary, .f-btn-secondary, .f-btn-ghost
//   Cards:     .f-card, .f-card-head, .f-card-title, .f-card-body
//   Score:     .f-score-wrap, .f-score-num, .f-score-verdict,
//              .f-score-row, .f-score-bar, .f-score-bar-fill
//   Data:      .f-table, .f-badge, .f-badge--good, .f-badge--fair,
//              .f-badge--elite, .f-badge--danger
//   Lists:     .f-stock-row, .f-watch-item
//   Modals:    .f-modal, .f-modal-box, .f-modal-body, .f-modal-footer
//   Util:      .is-up, .is-dn, .f-mono, .f-label
//   News:      .f-news-grid, .f-news-card, .f-news-card-img,
//              .f-news-card-body, .f-news-card-source,
//              .f-news-card-title, .f-news-card-time
// ============================================================

(function renderApp() {

  // ── CHROME (nav, tape, modals) ──────────────────────────────
  document.body.insertAdjacentHTML('afterbegin', `

<div id="cursor-dot"></div>

<!-- Logo -->
<div id="nav-logo-pill" class="f-nav-logo-wrap" onclick="showPage('home')">
  <div class="f-nav-logo">
    <svg class="f-nav-logo-icon" width="28" height="28" viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="fl1" x1="0%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stop-color="#30c0e0"/>
          <stop offset="50%" stop-color="#3b6ef5"/>
          <stop offset="100%" stop-color="#9b30d0"/>
        </linearGradient>
        <linearGradient id="fl2" x1="50%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#30c0e0"/>
          <stop offset="60%" stop-color="#3b6ef5"/>
          <stop offset="100%" stop-color="#9b30d0"/>
        </linearGradient>
      </defs>
      <path d="M55 5 C45 25 25 30 25 58 C25 76 37 90 55 90 C73 90 85 76 85 58 C85 30 65 20 55 5Z" fill="url(#fl1)" opacity="0.9"/>
      <path d="M35 10 C22 32 5 38 5 60 C5 76 16 88 32 90 C20 82 14 72 14 60 C14 40 28 34 40 14Z" fill="url(#fl2)" opacity="0.65"/>
    </svg>
    <span class="f-nav-logo-text">fut<span class="f-nav-logo-accent">a</span>ra</span>
  </div>
</div>

<!-- Center nav -->
<nav id="nav" class="f-nav">
  <div class="f-nav-links">
    <button class="f-nav-item is-active" id="nav-markets" onclick="showPage('markets')">markets</button>
    <button class="f-nav-item" id="nav-analytics" onclick="showPage('analytics-start')">analytics</button>
    <button class="f-nav-item" id="nav-comparison" onclick="showPage('comparison')">comparison</button>
  </div>
  <div class="f-nav-divider"></div>
  <div class="f-nav-search-wrap" id="nav-search-wrap">
    <input class="f-nav-search-input" id="nav-search-input" placeholder="ticker or ISIN…"
      oninput="navFilterSearch(this.value)"
      onkeydown="navSearchKey(event)"
      onblur="setTimeout(()=>{ document.getElementById('nav-search-dropdown').classList.remove('is-open'); if(!this.value) closeNavSearch(); },200)">
    <div class="f-nav-search-dropdown" id="nav-search-dropdown"></div>
  </div>
  <button class="f-nav-search-btn" id="nav-search-toggle" onclick="toggleNavSearch()">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  </button>
</nav>

<!-- Right nav -->
<div id="nav-right-pill" class="f-nav-right">
  <button class="f-nav-btn f-nav-btn--portfolio" onclick="showPage('portfolio')" title="Portfolio">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  </button>
  <div class="f-nav-divider"></div>
  <button class="f-nav-btn f-nav-btn--profile" onclick="showPage('profile')" title="Profile">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  </button>
</div>

<!-- Ticker tape -->
<div id="ticker-tape" class="f-tape">
  <div class="f-tape-inner" id="tape-inner"></div>
</div>

<!-- News modal -->
<div id="news-modal" class="f-modal" onclick="if(event.target===this)closeNewsModal()">
  <div class="f-modal-box">
    <img id="news-modal-img" class="f-modal-img" src="" alt="" onerror="this.style.display='none'">
    <div class="f-modal-body">
      <div class="f-modal-source" id="news-modal-source"></div>
      <div class="f-modal-title" id="news-modal-title"></div>
      <div class="f-modal-summary" id="news-modal-summary"></div>
    </div>
    <div class="f-modal-footer">
      <span class="f-mono" id="news-modal-time"></span>
      <a id="news-modal-link" href="#" target="_blank" class="f-btn-primary">Read full article →</a>
      <button class="f-btn-ghost" onclick="closeNewsModal()">Close</button>
    </div>
  </div>
</div>

`);

  // ── PAGES ──────────────────────────────────────────────────
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `

<!-- ═══ HOME ═══ -->
<div class="f-page is-active f-page--home" id="page-home">
  <div class="f-home-deco-grid"></div>
  <div class="f-home-deco-blob"></div>
  <div class="f-home-deco-star">✦</div>
  <div class="f-home-content">
    <div class="f-hero">
      <div class="f-hero-left">
        <div class="f-label">Market Intelligence Platform</div>
        <h1 class="f-hero-title">Dive deeper<br>into <em>market</em><br><span class="f-hero-accent">intel.</span></h1>
        <p class="f-hero-sub">Analyze ratios, intrinsic value, and risk in real-time. Algorithmic scorecards powered by Damodaran-WACC benchmarks.</p>
        <div class="f-search-bar">
          <input type="text" class="f-search-bar-input" placeholder="Search stock, crypto, or ETF…" id="hero-search" onkeydown="heroSearchKey(event)">
          <button class="f-btn-primary" onclick="heroSearch()">Analyze →</button>
        </div>
        <div class="f-quick-tickers">
          <button class="f-btn-ghost" onclick="openTicker('NVDA')">NVDA</button>
          <button class="f-btn-ghost" onclick="openTicker('AAPL')">AAPL</button>
          <button class="f-btn-ghost" onclick="openTicker('MSFT')">MSFT</button>
          <button class="f-btn-ghost" onclick="openTicker('TSLA')">TSLA</button>
          <button class="f-btn-ghost" onclick="openTicker('AMD')">AMD</button>
        </div>
      </div>
      <div class="f-hero-right">
        <div class="f-card">
          <div class="f-card-head">
            <span class="f-card-title">Market Pulse</span>
            <span class="f-live-dot">● Live</span>
          </div>
          <div id="market-pulse-list"></div>
          <div class="f-sentiment-wrap">
            <div class="f-label">Aggregate Sentiment</div>
            <div class="f-sentiment-bar">
              <div class="f-sentiment-bar-bull" style="width:72%"></div>
              <div class="f-sentiment-bar-neu" style="width:18%"></div>
              <div class="f-sentiment-bar-bear" style="width:10%"></div>
            </div>
            <div class="f-sentiment-legend">
              <span class="is-up">72% Bullish</span>
              <span class="f-sentiment-neu">18% Neutral</span>
              <span class="is-dn">10% Bearish</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="f-home-grid">
      <div class="f-card">
        <div class="f-card-head"><span class="f-card-title">Top Gainers</span><button class="f-btn-ghost" onclick="showPage('markets')">All →</button></div>
        <div class="f-stock-list">
          <div class="f-stock-row" onclick="openTicker('NVDA')"><span class="f-stock-rank">1</span><div class="f-stock-info"><div class="f-stock-sym">NVDA</div><div class="f-stock-name">Nvidia Corp</div></div><span class="f-stock-price f-mono">$205.10</span><span class="f-stock-chg is-up">+46.51%</span></div>
          <div class="f-stock-row" onclick="openTicker('AMD')"><span class="f-stock-rank">2</span><div class="f-stock-info"><div class="f-stock-sym">AMD</div><div class="f-stock-name">Advanced Micro Devices</div></div><span class="f-stock-price f-mono">$160.40</span><span class="f-stock-chg is-up">+12.20%</span></div>
          <div class="f-stock-row" onclick="openTicker('INTC')"><span class="f-stock-rank">3</span><div class="f-stock-info"><div class="f-stock-sym">INTC</div><div class="f-stock-name">Intel Corp</div></div><span class="f-stock-price f-mono">$31.15</span><span class="f-stock-chg is-up">+5.10%</span></div>
        </div>
      </div>
      <div class="f-card">
        <div class="f-card-head"><span class="f-card-title">Most Active</span></div>
        <div class="f-stock-list">
          <div class="f-stock-row" onclick="openTicker('TSLA')"><span class="f-stock-rank">1</span><div class="f-stock-info"><div class="f-stock-sym">TSLA</div><div class="f-stock-name">Tesla Inc</div></div><span class="f-stock-price f-mono">$175.20</span><span class="f-stock-chg f-muted">12.4M vol</span></div>
          <div class="f-stock-row" onclick="openTicker('AAPL')"><span class="f-stock-rank">2</span><div class="f-stock-info"><div class="f-stock-sym">AAPL</div><div class="f-stock-name">Apple Inc</div></div><span class="f-stock-price f-mono">$182.10</span><span class="f-stock-chg f-muted">9.8M vol</span></div>
          <div class="f-stock-row" onclick="openTicker('NVDA')"><span class="f-stock-rank">3</span><div class="f-stock-info"><div class="f-stock-sym">NVDA</div><div class="f-stock-name">Nvidia Corp</div></div><span class="f-stock-price f-mono">$205.10</span><span class="f-stock-chg f-muted">8.2M vol</span></div>
        </div>
      </div>
      <div class="f-card">
        <div class="f-card-head"><span class="f-card-title">Top Scored</span></div>
        <div class="f-stock-list">
          <div class="f-stock-row" onclick="openTicker('MSFT')"><span class="f-stock-rank">1</span><div class="f-stock-info"><div class="f-stock-sym">MSFT</div><div class="f-stock-name">Microsoft</div></div><span></span><span class="f-stock-chg"><span class="f-badge f-badge--good">4.85</span></span></div>
          <div class="f-stock-row" onclick="openTicker('GOOGL')"><span class="f-stock-rank">2</span><div class="f-stock-info"><div class="f-stock-sym">GOOGL</div><div class="f-stock-name">Alphabet</div></div><span></span><span class="f-stock-chg"><span class="f-badge f-badge--good">4.62</span></span></div>
          <div class="f-stock-row" onclick="openTicker('NVDA')"><span class="f-stock-rank">3</span><div class="f-stock-info"><div class="f-stock-sym">NVDA</div><div class="f-stock-name">Nvidia Corp</div></div><span></span><span class="f-stock-chg"><span class="f-badge f-badge--good">4.57</span></span></div>
        </div>
      </div>
      <div class="f-card" onclick="showPage('portfolio')">
        <div class="f-card-head"><span class="f-card-title">Portfolio Snapshot</span></div>
        <div class="f-card-body"><div class="f-hero-price">$42,150</div><div class="is-up">+$1,240 (+3.0%) today</div><div class="f-muted" style="margin-top:10px;">Best: <span class="is-up f-mono">NVDA +46.51%</span></div></div>
      </div>
      <div class="f-card" onclick="showPage('analytics-start')">
        <div class="f-card-head"><span class="f-card-title">Value & Stresstest</span></div>
        <div class="f-card-body"><p class="f-muted">Simulate DCF models instantly. Adjust growth assumptions and test interest rate shocks.</p><div style="margin-top:14px;"><span class="f-btn-primary" style="font-size:12px;padding:7px 16px;">Launch Engine →</span></div></div>
      </div>
      <div class="f-card">
        <div class="f-card-head"><span class="f-card-title">Macro & Sentiment</span></div>
        <div class="f-card-body"><div class="f-macro-verdict is-up">🔥 BULLISH</div><div class="f-muted">74% Positive Buzz</div><div style="margin-top:8px;">Top Sector: <strong>Semiconductors</strong></div></div>
      </div>
    </div>

    <footer class="f-footer">
      <div class="f-footer-links"><a>About</a><a>Methodology</a><a>Terms</a><a>Privacy</a></div>
      <div>futara · 2026</div>
    </footer>
  </div>
</div>

<!-- ═══ MARKETS ═══ -->
<div class="f-page" id="page-markets">
  <div class="f-markets-layout">
    <div class="f-markets-left">
      <div class="f-card">
        <div class="f-card-head"><span class="f-card-title">My Watchlist</span><button class="f-btn-ghost">+ Add</button></div>
        <div class="f-card-body f-watch-list">
          <div class="f-watch-item" onclick="openTicker('NVDA')"><span class="f-watch-sym">NVDA</span><span class="f-mono">$205.10</span><span class="is-up f-mono">+46.51%</span><span class="is-up">▲ SMA</span></div>
          <div class="f-watch-item" onclick="openTicker('AAPL')"><span class="f-watch-sym">AAPL</span><span class="f-mono">$182.10</span><span class="is-up f-mono">+1.20%</span><span class="is-up">▲ SMA</span></div>
          <div class="f-watch-item"><span class="f-watch-sym f-muted">BTC</span><span class="f-mono">$68,400</span><span class="is-dn f-mono">−0.80%</span><span class="is-dn">▼ SMA</span></div>
        </div>
      </div>
      <div class="f-card">
        <div class="f-card-head"><span class="f-card-title">Sector Rotation</span></div>
        <div class="f-card-body">
          <div class="f-sector-row"><span class="f-sector-name">Tech & AI</span><div class="f-sector-track"><div class="f-sector-fill is-up" style="width:80%"></div></div><span class="is-up f-mono">+4.6%</span></div>
          <div class="f-sector-row"><span class="f-sector-name">Financials</span><div class="f-sector-track"><div class="f-sector-fill" style="width:40%"></div></div><span class="f-mono">+2.1%</span></div>
          <div class="f-sector-row"><span class="f-sector-name">Healthcare</span><div class="f-sector-track"><div class="f-sector-fill" style="width:28%"></div></div><span class="f-mono">+1.4%</span></div>
          <div class="f-sector-row"><span class="f-sector-name">Energy</span><div class="f-sector-track"><div class="f-sector-fill is-dn" style="width:22%"></div></div><span class="is-dn f-mono">−1.2%</span></div>
        </div>
      </div>
      <div class="f-card">
        <div class="f-card-head"><span class="f-card-title">Heatmap</span></div>
        <div class="f-heatmap">
          <div class="f-heatmap-cell is-up" onclick="openTicker('NVDA')"><div>NVDA</div><div>+4.6%</div></div>
          <div class="f-heatmap-cell is-up" onclick="openTicker('AAPL')"><div>AAPL</div><div>+1.2%</div></div>
          <div class="f-heatmap-cell is-up" onclick="openTicker('AMD')"><div>AMD</div><div>+3.1%</div></div>
          <div class="f-heatmap-cell is-dn" onclick="openTicker('TSLA')"><div>TSLA</div><div>−3.4%</div></div>
          <div class="f-heatmap-cell is-dn" onclick="openTicker('META')"><div>META</div><div>−0.5%</div></div>
          <div class="f-heatmap-cell is-dn" onclick="openTicker('BTC-USD')"><div>BTC</div><div>−0.8%</div></div>
        </div>
      </div>
    </div>
    <div class="f-markets-right">
      <div class="f-markets-headline">
        <div class="f-label">Live Markets</div>
        <div class="f-markets-title">market<br><span class="f-hero-accent">pulse.</span></div>
      </div>
      <div class="f-news-filters">
        <button class="f-btn-ghost is-active" onclick="filterNews('general',this)">All</button>
        <button class="f-btn-ghost" onclick="filterNews('forex',this)">Macro</button>
        <button class="f-btn-ghost" onclick="filterNews('merger',this)">M&A</button>
        <button class="f-btn-ghost" onclick="filterNews('crypto',this)">Crypto</button>
        <span class="f-live-dot" style="margin-left:auto;">● Live</span>
      </div>
      <div id="markets-news-feed" class="f-news-feed">
        <div class="f-loading">Loading news…</div>
      </div>
    </div>
  </div>
</div>

<!-- ═══ ANALYTICS START ═══ -->
<div class="f-page" id="page-analytics-start">
  <div class="f-analytics-start">
    <div class="f-label">Deep Fundamental Engine</div>
    <div class="f-section-title">Which company do<br>you want to analyze?</div>
    <div class="f-section-sub">Enter any ticker — our algorithmic scorecard deploys instantly.</div>
    <div class="f-search-bar f-search-bar--large">
      <input type="text" class="f-search-bar-input" placeholder="Apple (AAPL), Nvidia (NVDA), Bitcoin (BTC)…" id="analytics-search-input" onkeydown="analyticsSearchKey(event)">
      <button class="f-btn-primary" onclick="analyticsSearch()">Analyze →</button>
    </div>
    <div class="f-label" style="text-align:left;margin-top:24px;">Recently Analyzed</div>
    <div class="f-recent-pills">
      <div class="f-recent-pill" onclick="openTicker('NVDA')"><div class="f-recent-sym">NVDA</div><div class="f-recent-score">⭐ 4.57 · 2h ago</div></div>
      <div class="f-recent-pill" onclick="openTicker('TSLA')"><div class="f-recent-sym">TSLA</div><div class="f-recent-score">⭐ 3.10 · 1d ago</div></div>
      <div class="f-recent-pill" onclick="openTicker('AMD')"><div class="f-recent-sym">AMD</div><div class="f-recent-score">⭐ 3.82 · 3d ago</div></div>
    </div>
    <div class="f-label" style="text-align:left;margin-top:20px;">Sector Quick-Start</div>
    <div class="f-sectors-grid">
      <div class="f-sector-card" onclick="openTicker('MSFT')"><div class="f-sector-card-icon">💻</div><div class="f-sector-card-name">Technology & Semis</div><div class="f-muted f-mono">Avg P/E: 21.1x</div><div class="f-sector-card-top">Top: MSFT (4.85)</div></div>
      <div class="f-sector-card" onclick="openTicker('JPM')"><div class="f-sector-card-icon">🏦</div><div class="f-sector-card-name">Banking & Financials</div><div class="f-muted f-mono">Avg P/E: 11.4x</div><div class="f-sector-card-top">Top: JPM (4.12)</div></div>
      <div class="f-sector-card" onclick="openTicker('BYD')"><div class="f-sector-card-icon">🔋</div><div class="f-sector-card-name">Automotive & EV</div><div class="f-muted f-mono">Avg P/E: 15.8x</div><div class="f-sector-card-top">Top: BYD (3.95)</div></div>
      <div class="f-sector-card" onclick="openTicker('XOM')"><div class="f-sector-card-icon">🛢️</div><div class="f-sector-card-name">Energy & Infrastructure</div><div class="f-muted f-mono">Avg P/E: 9.8x</div><div class="f-sector-card-top">Top: XOM (3.70)</div></div>
      <div class="f-sector-card" onclick="openTicker('LLY')"><div class="f-sector-card-icon">💊</div><div class="f-sector-card-name">Healthcare & Pharma</div><div class="f-muted f-mono">Avg P/E: 18.2x</div><div class="f-sector-card-top">Top: LLY (4.30)</div></div>
      <div class="f-sector-card" onclick="openTicker('COST')"><div class="f-sector-card-icon">🛒</div><div class="f-sector-card-name">Consumer Retail</div><div class="f-muted f-mono">Avg P/E: 24.5x</div><div class="f-sector-card-top">Top: COST (4.25)</div></div>
    </div>
  </div>
</div>

<!-- ═══ ANALYTICS DETAIL ═══ -->
<div class="f-page" id="page-analytics">
  <div class="f-analytics-layout">
    <div id="analytics-loading" class="f-loading-screen" style="display:none;">
      <div class="f-loading-text">Loading <span id="loading-sym"></span>…</div>
      <div class="f-loading-bar-wrap"><div class="f-loading-bar"></div></div>
    </div>
    <div id="analytics-content">
      <!-- Ticker header -->
      <div class="f-ticker-hero">
        <div>
          <div class="f-label f-mono" id="a-ticker-sym">NVDA · NASDAQ</div>
          <div class="f-ticker-price" id="a-ticker-price">$205.10</div>
          <div class="f-ticker-change is-up" id="a-ticker-change">+$4.62 (+2.30%)</div>
          <div class="f-muted f-mono" id="a-ticker-meta">Nvidia Corporation · Semiconductor</div>
        </div>
        <div class="f-ticker-actions">
          <button class="f-btn-primary" onclick="addToPortfolio()">+ Portfolio</button>
          <button class="f-btn-secondary">+ Watchlist</button>
          <button class="f-btn-secondary" onclick="showPage('comparison')">Compare</button>
        </div>
      </div>
      <!-- Context dock -->
      <div class="f-dock">
        <div class="f-dock-tab is-active"><div class="f-dock-label">Scorecard</div><div class="f-dock-val" id="dock-score">4.57</div><div class="f-dock-sub">STRONG BUY</div></div>
        <div class="f-dock-tab"><div class="f-dock-label">Ratios</div><div class="f-dock-val" id="dock-pe">16.2x</div><div class="f-dock-sub">P/E · Cheap</div></div>
        <div class="f-dock-tab"><div class="f-dock-label">Valuation</div><div class="f-dock-val" id="dock-fair">$245</div><div class="f-dock-sub">MoS +19.4%</div></div>
        <div class="f-dock-tab"><div class="f-dock-label">Chart</div><div class="f-dock-val">↑ Up</div><div class="f-dock-sub">SMA 200 ✓</div></div>
        <div class="f-dock-tab"><div class="f-dock-label">Market</div><div class="f-dock-val">1.25x</div><div class="f-dock-sub">Beta</div></div>
        <div class="f-dock-tab"><div class="f-dock-label">Financials</div><div class="f-dock-val">$253B</div><div class="f-dock-sub">Q1/25 Rev.</div></div>
      </div>
      <!-- Row 1: Scorecard + Chart + Ratios -->
      <div class="f-analytics-row f-analytics-row--3col">
        <div class="f-card" id="sc-scorecard">
          <div class="f-card-head"><span class="f-card-title">Scorecard</span></div>
          <div class="f-card-body">
            <div class="f-score-wrap">
              <div class="f-score-num is-up" id="score-big">4.57 <span class="f-score-denom">/ 5.0</span></div>
              <div class="f-score-verdict is-up" id="score-verdict">Strong Buy</div>
              <div class="f-muted f-mono" style="font-size:11px;margin-top:8px;">WACC: 9.4% · Beta: 1.25</div>
            </div>
            <div class="f-score-breakdown">
              <div class="f-score-row"><span class="f-score-row-label">Financial Ratios</span><span class="f-muted">65%</span><div class="f-score-bar"><div class="f-score-bar-fill" style="width:84%"></div></div><span class="f-mono f-score-row-val">4.2/5</span></div>
              <div class="f-score-row"><span class="f-score-row-label">Management</span><span class="f-muted">12%</span><div class="f-score-bar"><div class="f-score-bar-fill f-score-bar-fill--warn" style="width:40%"></div></div><span class="f-mono f-score-row-val">2.0/5</span></div>
              <div class="f-score-row"><span class="f-score-row-label">Moat / Competitive</span><span class="f-muted">10%</span><div class="f-score-bar"><div class="f-score-bar-fill" style="width:60%"></div></div><span class="f-mono f-score-row-val">3.0/5</span></div>
              <div class="f-score-row"><span class="f-score-row-label">ESG & Risk</span><span class="f-muted">8%</span><div class="f-score-bar"><div class="f-score-bar-fill" style="width:80%"></div></div><span class="f-mono f-score-row-val">4.0/5</span></div>
              <div class="f-score-row"><span class="f-score-row-label">Valuation / DCF</span><span class="f-muted">5%</span><div class="f-score-bar"><div class="f-score-bar-fill f-score-bar-fill--warn" style="width:40%"></div></div><span class="f-mono f-score-row-val">2.0/5</span></div>
            </div>
            <div id="score-explanation" class="f-score-explanation" style="display:none;"></div>
          </div>
        </div>
        <div class="f-card" id="sc-chart">
          <div class="f-card-head"><span class="f-card-title">Price Chart</span>
            <div class="f-tab-group"><button class="f-tab is-active">1M</button><button class="f-tab">6M</button><button class="f-tab">1Y</button><button class="f-tab">5Y</button></div>
          </div>
          <div class="f-card-body">
            <div class="f-chart-area"><canvas id="price-chart-canvas"></canvas></div>
            <div class="f-chart-note is-up">🔥 Strong Uptrend — 8.7% above 200-day MA</div>
          </div>
        </div>
        <div class="f-card" id="sc-ratios">
          <div class="f-card-head"><span class="f-card-title">Key Financial Ratios</span></div>
          <table class="f-table">
            <thead><tr><th>Metric</th><th>Current</th><th>Sector</th><th></th></tr></thead>
            <tbody>
              <tr><td>P/E Ratio</td><td class="f-mono" id="ratio-pe">16.2x</td><td class="f-mono f-muted">21.1x</td><td><span class="f-badge f-badge--good">Cheap</span></td></tr>
              <tr><td>EV/EBITDA</td><td class="f-mono">29.7x</td><td class="f-mono f-muted">27.2x</td><td><span class="f-badge f-badge--fair">Fair</span></td></tr>
              <tr><td>Gross Margin</td><td class="f-mono" id="ratio-gm">74.1%</td><td class="f-mono f-muted">52.3%</td><td><span class="f-badge f-badge--elite">Elite</span></td></tr>
              <tr><td>Operating Margin</td><td class="f-mono">65.6%</td><td class="f-mono f-muted">38.0%</td><td><span class="f-badge f-badge--elite">Elite</span></td></tr>
              <tr><td>Net Margin</td><td class="f-mono">63.0%</td><td class="f-mono f-muted">31.4%</td><td><span class="f-badge f-badge--elite">Elite</span></td></tr>
              <tr><td>Rev. Growth YoY</td><td class="f-mono is-up">+85.2%</td><td class="f-mono f-muted">—</td><td><span class="f-badge f-badge--elite">Hyper</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Row 2: DCF + Peers -->
      <div class="f-analytics-row f-analytics-row--2col-wide">
        <div class="f-card" id="sc-dcf">
          <div class="f-card-head"><span class="f-card-title">Intrinsic Value & Stresstest</span></div>
          <div class="f-card-body">
            <div class="f-dcf-prices">
              <div><div class="f-label">Current Price</div><div class="f-dcf-price f-mono" id="dcf-current">$205.10</div></div>
              <div><div class="f-label">Fair Value (DCF)</div><div class="f-dcf-price f-dcf-price--fair f-mono is-up" id="dcf-fair">$245.00</div><div class="f-mono is-up" id="dcf-mos">MoS: +19.4% Underpriced</div></div>
            </div>
            <div class="f-sliders">
              <div class="f-slider-row"><div class="f-slider-head"><span>Revenue Growth (5Y)</span><span class="f-mono" id="sl-growth-val">8.5%</span></div><input type="range" min="1" max="20" value="8.5" step="0.5" id="sl-growth" oninput="updateDCF()"></div>
              <div class="f-slider-row"><div class="f-slider-head"><span>Operating Margin</span><span class="f-mono" id="sl-margin-val">65.6%</span></div><input type="range" min="20" max="80" value="65.6" step="0.5" id="sl-margin" oninput="updateDCF()"></div>
              <div class="f-slider-row"><div class="f-slider-head"><span>Discount Rate (WACC)</span><span class="f-mono" id="sl-wacc-val">9.4%</span></div><input type="range" min="5" max="18" value="9.4" step="0.1" id="sl-wacc" oninput="updateDCF()"></div>
            </div>
            <div class="f-stresstest">
              <div class="f-stress-item"><div class="f-label">Worst Case</div><div class="f-mono is-dn">$182 (−11%)</div></div>
              <div class="f-stress-item"><div class="f-label">Base Case</div><div class="f-mono" id="dcf-base-case">$245 (+19%)</div></div>
              <div class="f-stress-item"><div class="f-label">Best Case</div><div class="f-mono is-up">$298 (+45%)</div></div>
            </div>
          </div>
        </div>
        <div class="f-card" id="sc-context">
          <div class="f-card-head"><span class="f-card-title">Peer Performance (YTD)</span></div>
          <div class="f-card-body">
            <div class="f-peer-bar"><span class="f-peer-sym is-up">NVDA</span><div class="f-peer-track"><div class="f-peer-fill f-peer-fill--main" style="width:80%;">+46.5%</div></div></div>
            <div class="f-peer-bar"><span class="f-peer-sym f-warn">SOXX</span><div class="f-peer-track"><div class="f-peer-fill f-peer-fill--comp" style="width:46%;">+25.8%</div></div></div>
            <div class="f-peer-bar"><span class="f-peer-sym f-muted">AMD</span><div class="f-peer-track"><div class="f-peer-fill f-peer-fill--comp" style="width:40%;">+22.1%</div></div></div>
            <div class="f-peer-bar"><span class="f-peer-sym is-dn">INTC</span><div class="f-peer-track"><div class="f-peer-fill f-peer-fill--neg" style="width:22%;">−12.4%</div></div></div>
            <div class="f-insight">NVDA outperforming peers by <strong>+24.4%</strong></div>
          </div>
        </div>
      </div>
      <!-- Row 3: Financials + Insider -->
      <div class="f-analytics-row f-analytics-row--2col">
        <div class="f-card" id="sc-period">
          <div class="f-card-head"><span class="f-card-title">Financial Statements</span>
            <div class="f-tab-group"><button class="f-tab is-active">Quarterly</button><button class="f-tab">Annual</button></div>
          </div>
          <div class="f-card-body">
            <div class="f-peer-bar"><span class="f-muted f-mono" style="width:38px;">Q3/24</span><div class="f-peer-track" style="height:18px;"><div class="f-peer-fill f-peer-fill--comp" style="width:60%;font-size:10px;padding-left:6px;">$181B</div></div></div>
            <div class="f-peer-bar"><span class="f-muted f-mono" style="width:38px;">Q4/24</span><div class="f-peer-track" style="height:18px;"><div class="f-peer-fill f-peer-fill--comp" style="width:72%;font-size:10px;padding-left:6px;">$221B</div></div></div>
            <div class="f-peer-bar"><span class="f-mono" style="width:38px;">Q1/25</span><div class="f-peer-track" style="height:18px;"><div class="f-peer-fill f-peer-fill--main" style="width:90%;font-size:10px;padding-left:6px;">$253B</div></div></div>
            <div class="f-stats-mini">
              <div class="f-stat-mini"><div class="f-label">Net Income</div><div class="f-mono">$120B</div></div>
              <div class="f-stat-mini"><div class="f-label">Free Cash Flow</div><div class="f-mono">$46.3B</div></div>
            </div>
          </div>
        </div>
        <div class="f-card">
          <div class="f-card-head"><span class="f-card-title">Insider Trades (90d)</span></div>
          <div class="f-card-body">
            <div class="f-insider-sentiment is-up">🟢 Net Sentiment: Strongly Bullish</div>
            <div class="f-insider-row"><span class="f-badge f-badge--good">BUY</span><div class="f-insider-info"><div>Kress Colette</div><div class="f-muted f-mono">CFO · 2026-05-14</div></div><span class="f-mono f-muted">450K · $202</span></div>
            <div class="f-insider-row"><span class="f-badge f-badge--good">BUY</span><div class="f-insider-info"><div>Huang Jen-Hsun</div><div class="f-muted f-mono">CEO · 2026-04-28</div></div><span class="f-mono f-muted">1M · $198</span></div>
            <div class="f-insider-row"><span class="f-badge f-badge--danger">SELL</span><div class="f-insider-info"><div>Miller Jay</div><div class="f-muted f-mono">Director · 2026-03-12</div></div><span class="f-mono f-muted">210K · $211</span></div>
          </div>
        </div>
      </div>
      <!-- Row 4: News + Dividend -->
      <div class="f-analytics-row f-analytics-row--2col">
        <div class="f-card">
          <div class="f-card-head"><span class="f-card-title">News & Sentiment</span></div>
          <div class="f-card-body">
            <div class="f-sentiment-legend"><span class="is-up">72% Bull</span><span class="f-warn">18% Neutral</span><span class="is-dn">10% Bear</span></div>
            <div class="f-sentiment-bar" style="margin-bottom:14px;"><div class="f-sentiment-bar-bull" style="width:72%"></div><div class="f-sentiment-bar-neu" style="width:18%"></div><div class="f-sentiment-bar-bear" style="width:10%"></div></div>
            <div id="ticker-news-list"><div class="f-loading">Loading news…</div></div>
          </div>
        </div>
        <div class="f-card">
          <div class="f-card-head"><span class="f-card-title">Dividend Calendar</span></div>
          <div class="f-card-body">
            <div class="f-stats-mini">
              <div class="f-stat-mini"><div class="f-label">Yield</div><div class="f-mono">0.92%</div></div>
              <div class="f-stat-mini"><div class="f-label">Payout Ratio</div><div class="f-mono is-up">14.5%</div></div>
            </div>
            <div class="f-muted" style="margin:10px 0;">12 consecutive years · 5Y CAGR +14.2%</div>
            <div class="f-div-bar-row"><span class="f-mono f-muted">2026</span><div class="f-div-bar" style="flex:1;opacity:.9"></div><span class="f-mono">$1.88</span></div>
            <div class="f-div-bar-row"><span class="f-mono f-muted">2025</span><div class="f-div-bar" style="flex:.88;opacity:.65"></div><span class="f-mono">$1.65</span></div>
            <div class="f-div-bar-row"><span class="f-mono f-muted">2024</span><div class="f-div-bar" style="flex:.76;opacity:.4"></div><span class="f-mono">$1.42</span></div>
          </div>
        </div>
      </div>
      <!-- Management -->
      <div class="f-card" style="margin-bottom:16px;">
        <div class="f-card-head"><span class="f-card-title">Management & Ownership</span></div>
        <div class="f-card-body">
          <div class="f-ownership-stats">
            <div class="f-stat-mini"><div class="f-label">Institutional</div><div class="f-mono">68.4%</div></div>
            <div class="f-stat-mini"><div class="f-label">Insiders</div><div class="f-mono">14.2%</div></div>
            <div class="f-stat-mini"><div class="f-label">Retail</div><div class="f-mono">17.4%</div></div>
          </div>
          <table class="f-table">
            <thead><tr><th>Institution</th><th>Shares</th><th>%</th><th>Change</th></tr></thead>
            <tbody>
              <tr><td>Vanguard Group</td><td class="f-mono">82.45M</td><td class="f-mono">8.24%</td><td class="is-up">↑ +1.2%</td></tr>
              <tr><td>BlackRock Inc.</td><td class="f-mono">71.12M</td><td class="f-mono">7.11%</td><td class="is-up">↑ +0.5%</td></tr>
              <tr><td>State Street</td><td class="f-mono">42.90M</td><td class="f-mono">4.29%</td><td class="is-dn">↓ −0.3%</td></tr>
              <tr><td>Fidelity Mgmt.</td><td class="f-mono">38.10M</td><td class="f-mono">3.81%</td><td class="f-muted">— Unchanged</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ═══ COMPARISON ═══ -->
<div class="f-page" id="page-comparison">
  <div class="f-comparison-layout">
    <div class="f-section-title" style="margin-bottom:6px;">Peer-to-Peer Comparison</div>
    <div class="f-muted" style="margin-bottom:24px;">Build your side-by-side investment matrix</div>
    <div class="f-comp-setup">
      <div class="f-comp-slot"><div class="f-label">Slot 1 (Primary)</div><input type="text" value="NVDA" id="comp-slot1" class="f-comp-input"></div>
      <div class="f-comp-vs">vs</div>
      <div class="f-comp-slot"><div class="f-label">Slot 2</div><input type="text" value="AMD" id="comp-slot2" class="f-comp-input"></div>
      <div class="f-comp-vs">vs</div>
      <div class="f-comp-slot"><div class="f-label">Slot 3 (Optional)</div><input type="text" value="INTC" id="comp-slot3" class="f-comp-input"></div>
      <button class="f-btn-primary f-btn-primary--large" onclick="launchComparison()">Launch →</button>
    </div>
    <div class="f-comp-table" id="comp-results">
      <div class="f-comp-table-head">
        <div class="f-comp-col-header"><span class="f-label">Metric</span></div>
        <div class="f-comp-col-header"><div class="f-comp-sym" id="ch1">NVDA</div><div class="f-muted">Nvidia Corporation</div></div>
        <div class="f-comp-col-header"><div class="f-comp-sym" id="ch2">AMD</div><div class="f-muted">Advanced Micro Devices</div></div>
        <div class="f-comp-col-header"><div class="f-comp-sym" id="ch3">INTC</div><div class="f-muted">Intel Corporation</div></div>
      </div>
      <div class="f-comp-section">⭐ Scorecard Summary</div>
      <div class="f-comp-row"><div class="f-comp-cell f-muted">Overall Score</div><div class="f-comp-cell f-comp-best"><span class="f-badge f-badge--good">4.57 Strong Buy</span></div><div class="f-comp-cell"><span class="f-badge f-badge--fair">3.82 Buy</span></div><div class="f-comp-cell"><span class="f-badge f-badge--danger">2.10 Avoid</span></div></div>
      <div class="f-comp-section">🧮 Intrinsic Value</div>
      <div class="f-comp-row"><div class="f-comp-cell f-muted">Fair Value (DCF)</div><div class="f-comp-cell f-comp-best f-mono">$245.00</div><div class="f-comp-cell f-mono">$155.00</div><div class="f-comp-cell f-mono">$22.00</div></div>
      <div class="f-comp-row"><div class="f-comp-cell f-muted">Margin of Safety</div><div class="f-comp-cell f-comp-best f-mono is-up">+19.4%</div><div class="f-comp-cell f-mono f-warn">−3.3%</div><div class="f-comp-cell f-mono is-dn">−29.3%</div></div>
      <div class="f-comp-section">📊 Key Metrics</div>
      <div class="f-comp-row"><div class="f-comp-cell f-muted">P/E Ratio</div><div class="f-comp-cell f-comp-best f-mono">16.2x <span class="f-badge f-badge--good">Cheap</span></div><div class="f-comp-cell f-mono">28.4x</div><div class="f-comp-cell f-mono">19.5x</div></div>
      <div class="f-comp-row"><div class="f-comp-cell f-muted">Gross Margin</div><div class="f-comp-cell f-comp-best f-mono">74.1% <span class="f-badge f-badge--elite">Elite</span></div><div class="f-comp-cell f-mono">48.2%</div><div class="f-comp-cell f-mono">32.0%</div></div>
      <div class="f-comp-row"><div class="f-comp-cell f-muted">Rev. Growth YoY</div><div class="f-comp-cell f-comp-best f-mono is-up">+85.2%</div><div class="f-comp-cell f-mono is-up">+12.2%</div><div class="f-comp-cell f-mono is-dn">−5.1%</div></div>
      <div class="f-comp-row f-comp-row--actions">
        <div class="f-comp-cell"></div>
        <div class="f-comp-cell"><button class="f-btn-primary" onclick="openTicker('NVDA')">Full Analytics</button></div>
        <div class="f-comp-cell"><button class="f-btn-secondary" onclick="openTicker('AMD')">Full Analytics</button></div>
        <div class="f-comp-cell"><button class="f-btn-secondary" onclick="openTicker('INTC')">Full Analytics</button></div>
      </div>
    </div>
    <div class="f-label" style="margin-top:28px;margin-bottom:12px;">Popular Market Duels</div>
    <div class="f-battles-grid">
      <div class="f-battle-card" onclick="loadComparison('NVDA','AMD','INTC')"><div class="f-battle-icon">💻</div><div class="f-battle-title">The AI Chip War</div><div class="f-muted f-mono">NVDA vs AMD vs INTC</div><div class="is-dn">🔥 Active</div></div>
      <div class="f-battle-card" onclick="loadComparison('TSLA','BYD','RIVN')"><div class="f-battle-icon">🚗</div><div class="f-battle-title">EV Showdown</div><div class="f-muted f-mono">TSLA vs BYD vs RIVN</div></div>
      <div class="f-battle-card" onclick="loadComparison('MSFT','AMZN','GOOGL')"><div class="f-battle-icon">☁️</div><div class="f-battle-title">Cloud Infrastructure</div><div class="f-muted f-mono">MSFT vs AMZN vs GOOGL</div></div>
    </div>
  </div>
</div>

<!-- ═══ PORTFOLIO ═══ -->
<div class="f-page" id="page-portfolio">
  <div class="f-portfolio-layout">
    <div class="f-portfolio-header-row">
      <div><div class="f-section-title">Portfolio</div><div class="f-muted">Command Center</div></div>
      <button class="f-btn-primary">+ Add Position</button>
    </div>
    <div class="f-portfolio-stats">
      <div class="f-port-stat"><div class="f-label">Net Asset Value</div><div class="f-port-stat-val">$42,150</div><div class="is-up">+$1,240 (+3.0%) today</div></div>
      <div class="f-port-stat"><div class="f-label">Cash Buffer</div><div class="f-port-stat-val">$8,430</div><div class="f-muted">20.0% of portfolio</div></div>
      <div class="f-port-stat"><div class="f-label">Weighted Score</div><div class="f-port-stat-val is-up">4.12</div><div class="f-muted">/ 5.0 · Buy Signal</div></div>
      <div class="f-port-stat"><div class="f-label">Market Rule</div><div class="f-port-stat-val is-up">Bullish</div><div class="is-up">2/3 above SMA 200</div></div>
    </div>
    <div class="f-portfolio-grid">
      <div class="f-card">
        <div class="f-card-head"><span class="f-card-title">Holdings</span></div>
        <table class="f-table">
          <thead><tr><th>Asset</th><th>Allocation</th><th>Return</th><th>Score</th><th>Trend</th></tr></thead>
          <tbody>
            <tr onclick="openTicker('NVDA')"><td><div class="f-hold-sym">NVDA</div><div class="f-muted">Nvidia Corp</div></td><td class="f-mono">$19,050 · 45.2%</td><td class="is-up f-mono">+46.51%</td><td><span class="f-badge f-badge--good">4.57</span></td><td class="is-up">↑ SMA</td></tr>
            <tr><td><div class="f-hold-sym">BTC</div><div class="f-muted">Bitcoin</div></td><td class="f-mono">$9,310 · 22.1%</td><td class="is-dn f-mono">−0.80%</td><td><span class="f-badge f-badge--fair">3.40</span></td><td class="is-dn">↓ SMA</td></tr>
            <tr onclick="openTicker('COST')"><td><div class="f-hold-sym">COST</div><div class="f-muted">Costco</div></td><td class="f-mono">$5,360 · 12.7%</td><td class="is-up f-mono">+3.2%</td><td><span class="f-badge f-badge--good">4.25</span></td><td class="is-up">↑ SMA</td></tr>
            <tr><td><div class="f-hold-sym f-muted">Cash</div></td><td class="f-mono">$8,430 · 20.0%</td><td class="f-muted">—</td><td>—</td><td class="f-muted">—</td></tr>
          </tbody>
        </table>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div class="f-card">
          <div class="f-card-head"><span class="f-card-title">Asset Allocation</span></div>
          <div class="f-card-body">
            <svg viewBox="0 0 120 120" style="width:110px;height:110px;display:block;margin:0 auto 12px;">
              <circle cx="60" cy="60" r="48" fill="none" stroke="var(--f-bg-3,#1e1830)" stroke-width="18"/>
              <circle cx="60" cy="60" r="48" fill="none" stroke="var(--f-accent,#6f5ef5)" stroke-width="18" stroke-dasharray="136 165" stroke-dashoffset="0" transform="rotate(-90 60 60)"/>
              <circle cx="60" cy="60" r="48" fill="none" stroke="var(--f-warn,#f0a842)" stroke-width="18" stroke-dasharray="66 235" stroke-dashoffset="-136" transform="rotate(-90 60 60)"/>
              <circle cx="60" cy="60" r="48" fill="none" stroke="var(--f-up,#2dca72)" stroke-width="18" stroke-dasharray="38 263" stroke-dashoffset="-202" transform="rotate(-90 60 60)"/>
              <text x="60" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="700" fill="var(--f-text,#f0edf5)" font-family="monospace">45.2%</text>
              <text x="60" y="74" text-anchor="middle" dominant-baseline="central" font-size="9" fill="var(--f-muted,#888)" font-family="sans-serif">NVDA</text>
            </svg>
            <div class="f-alloc-list">
              <div class="f-alloc-item"><div class="f-alloc-dot f-alloc-dot--accent"></div><span>NVDA</span><span class="f-mono">45.2%</span></div>
              <div class="f-alloc-item"><div class="f-alloc-dot f-alloc-dot--warn"></div><span>BTC</span><span class="f-mono">22.1%</span></div>
              <div class="f-alloc-item"><div class="f-alloc-dot f-alloc-dot--up"></div><span>COST</span><span class="f-mono">12.7%</span></div>
              <div class="f-alloc-item"><div class="f-alloc-dot f-alloc-dot--muted"></div><span>Cash</span><span class="f-mono">20.0%</span></div>
            </div>
          </div>
        </div>
        <div class="f-card">
          <div class="f-card-head"><span class="f-card-title">Leverage Desk</span><span class="is-up f-mono">1 active</span></div>
          <div class="f-card-body">
            <div class="f-leverage-card">
              <div class="f-leverage-head"><span class="f-mono">NVDA LONG</span><span class="f-badge f-badge--good">×5</span></div>
              <div class="is-up f-mono" style="font-size:20px;font-weight:700;">+$900 <span style="font-size:13px;">(+8.9%)</span></div>
              <div class="f-leverage-levels"><span class="f-muted">SL: <span class="f-mono">$195</span></span><span class="f-muted">TP1: <span class="f-mono">$210</span></span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ═══ PROFILE ═══ -->
<div class="f-page" id="page-profile">
  <div class="f-profile-layout">
    <div class="f-section-title" style="margin-bottom:24px;">Settings & Profile</div>
    <div class="f-profile-section">
      <div class="f-profile-section-head">Appearance & Display</div>
      <div class="f-profile-section-body">
        <div class="f-setting-row"><div><div class="f-setting-label">Interface Theme</div><div class="f-muted">Dark · Light</div></div><div class="f-toggle-group"><button class="f-toggle is-active" id="theme-dark-btn" onclick="setTheme('dark')">Dark</button><button class="f-toggle" id="theme-light-btn" onclick="setTheme('light')">Light</button></div></div>
        <div class="f-setting-row"><div class="f-setting-label">Language</div><select class="f-select" id="lang-select"><option>English (US)</option><option>Deutsch</option><option>Español</option></select></div>
        <div class="f-setting-row"><div class="f-setting-label">Currency</div><select class="f-select"><option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option></select></div>
      </div>
    </div>
    <div class="f-profile-section">
      <div class="f-profile-section-head">Investment Strategy</div>
      <div class="f-profile-section-body" id="strategy-profile-section">
        <div class="f-setting-row"><div><div class="f-setting-label">Investment Horizon</div><div class="f-muted">Affects scoring weights</div></div><select class="f-select" id="profile-horizon" onchange="updateStrategyProfile()"><option value="long">Long-term (5+ years)</option><option value="medium">Medium-term (1–5 years)</option><option value="short">Short-term (&lt;1 year)</option></select></div>
        <div class="f-setting-row"><div class="f-setting-label">Risk Tolerance</div><select class="f-select" id="profile-risk" onchange="updateStrategyProfile()"><option value="moderate">Moderate</option><option value="conservative">Conservative</option><option value="aggressive">Aggressive</option></select></div>
        <div class="f-setting-row"><div><div class="f-setting-label">Investment Focus</div><div class="f-muted">Shifts scorecard weights</div></div><select class="f-select" id="profile-focus" onchange="updateStrategyProfile()"><option value="growth">Growth</option><option value="value">Value</option><option value="dividend">Dividend</option><option value="momentum">Momentum</option></select></div>
        <div class="f-insight" id="strategy-summary" style="margin-top:12px;">Your profile: Growth investor · Moderate risk · Long-term</div>
      </div>
    </div>
    <div class="f-profile-section">
      <div class="f-profile-section-head">Scorecard Weights</div>
      <div class="f-profile-section-body">
        <div class="f-muted" style="margin-bottom:14px;">Manually override scoring weights. Total should equal 100%.</div>
        <div id="weight-sliders"></div>
        <button class="f-btn-secondary" style="margin-top:12px;" onclick="resetWeightsToProfile()">↺ Reset to Profile Defaults</button>
      </div>
    </div>
    <div class="f-profile-section">
      <div class="f-profile-section-head">API Credentials</div>
      <div class="f-profile-section-body">
        <div class="f-setting-label">FMP Key</div>
        <div class="f-api-field"><span class="f-api-dot is-up"></span><span class="f-mono" id="api-key-display">•••••••••••••••••••••••••</span><button class="f-btn-ghost" onclick="toggleApiKey()">Show</button></div>
        <div class="f-muted f-mono" style="margin-top:6px;">🟢 Stored locally only</div>
        <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap;">
          <button class="f-btn-secondary">📥 Export</button>
          <button class="f-btn-secondary">📤 Import</button>
          <button class="f-btn-ghost f-btn-ghost--danger">🗑 Wipe Cache</button>
        </div>
      </div>
    </div>
    <div class="f-profile-section">
      <div class="f-profile-section-head">System</div>
      <div class="f-profile-section-body">
        <div class="f-setting-row"><div><div class="f-setting-label">Plan</div><div class="f-muted">Free Personal Tier</div></div><span class="f-badge">FREE</span></div>
        <div class="f-setting-row"><div class="f-setting-label">Build</div><span class="f-mono f-muted">v2.7.0</span></div>
      </div>
    </div>
  </div>
</div>

`;

  // Cursor
  const s = document.createElement('script');
  s.textContent = `(function(){const d=document.getElementById('cursor-dot');if(!d)return;document.addEventListener('mousemove',e=>{d.style.left=e.clientX+'px';d.style.top=e.clientY+'px'},{passive:true});})();`;
  document.body.appendChild(s);

})();

// Profile page helpers (unchanged)
function updateStrategyProfile() {
  const horizon = document.getElementById('profile-horizon')?.value;
  const risk    = document.getElementById('profile-risk')?.value;
  const focus   = document.getElementById('profile-focus')?.value;
  if (!horizon) return;
  const profile = getStrategyProfile();
  profile.horizon = horizon; profile.risk = risk; profile.focus = focus;
  saveStrategyProfile(profile);
  renderWeightSliders(getEffectiveWeights(profile));
  const s = document.getElementById('strategy-summary');
  if (s) s.textContent = `Your profile: ${focus} investor · ${risk} risk · ${horizon} horizon`;
}
function renderWeightSliders(weights) {
  const c = document.getElementById('weight-sliders');
  if (!c) return;
  const L = {ratios:'Financial Ratios',management:'Management',moat:'Moat / Competitive',esg:'ESG & Risk',valuation:'DCF / Valuation'};
  c.innerHTML = Object.entries(weights).map(([k,v])=>`<div style="margin-bottom:12px;"><div style="display:flex;justify-content:space-between;margin-bottom:5px;font-size:12px;"><span>${L[k]||k}</span><span class="f-mono" id="wlabel-${k}">${v}%</span></div><input type="range" min="0" max="50" value="${v}" oninput="onWeightSlider('${k}',this.value)"></div>`).join('');
}
function onWeightSlider(key, val) {
  const el = document.getElementById('wlabel-'+key); if(el) el.textContent=val+'%';
  const p = getStrategyProfile(); p.scoreWeights[key]=parseInt(val); saveStrategyProfile(p);
}
function resetWeightsToProfile() {
  const p = getStrategyProfile(); delete p.scoreWeights; saveStrategyProfile(p);
  renderWeightSliders(getEffectiveWeights(p));
}
function initProfilePage() {
  const p = getStrategyProfile();
  const sv = (id,v)=>{const e=document.getElementById(id);if(e)e.value=v;};
  sv('profile-horizon',p.horizon); sv('profile-risk',p.risk); sv('profile-focus',p.focus);
  renderWeightSliders(getEffectiveWeights(p));
  const s=document.getElementById('strategy-summary');
  if(s) s.textContent=`Your profile: ${p.focus} investor · ${p.risk} risk · ${p.horizon} horizon`;
}
