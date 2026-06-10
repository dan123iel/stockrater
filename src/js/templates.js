// ============================================================
// futara — templates.js
// Renders all page HTML into #app and all chrome (nav, tape, modals)
// into document.body. Called once at DOMContentLoaded.
//
// Design files (index.html, test2-4) only need:
//   <body>
//     <div id="app"></div>
//     <script src="/src/js/templates.js"></script>
//     <script src="/src/js/app.js"></script>
//   </body>
// ============================================================

(function renderApp() {

  // ── CHROME (injected directly into body, before #app) ──────────────────

  document.body.insertAdjacentHTML('afterbegin', `

<!-- cursor -->
<div id="cursor-dot"></div>

<!-- NAV logo pill left -->
<div id="nav-logo-pill" onclick="showPage('home')">
  <a class="nav-logo">
    <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
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
    <span>fut<span style="color:#5b21f5">a</span>ra</span>
  </a>
</div>

<!-- NAV center pill -->
<nav id="nav">
  <div class="nav-links">
    <button class="nav-link active" id="nav-markets" onclick="showPage('markets')">markets</button>
    <button class="nav-link" id="nav-analytics" onclick="showPage('analytics-start')">analytics</button>
    <button class="nav-link" id="nav-comparison" onclick="showPage('comparison')">comparison</button>
  </div>
  <div class="nav-div"></div>
  <div id="nav-search-wrap">
    <input id="nav-search-input" placeholder="ticker or ISIN…"
      oninput="navFilterSearch(this.value)"
      onkeydown="navSearchKey(event)"
      onblur="setTimeout(()=>{ document.getElementById('nav-search-dropdown').classList.remove('open'); if(!this.value) closeNavSearch(); },200)">
    <div id="nav-search-dropdown"></div>
  </div>
  <button class="nav-search-btn" id="nav-search-toggle" onclick="toggleNavSearch()" title="Search (⌘K)">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  </button>
</nav>

<!-- NAV right pill -->
<div id="nav-right-pill">
  <button class="nav-icon-btn" onclick="showPage('portfolio')" title="Portfolio">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  </button>
  <div class="nav-icon-div"></div>
  <button class="nav-icon-btn" onclick="showPage('profile')" title="Profile">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  </button>
</div>

<!-- TICKER TAPE -->
<div id="ticker-tape">
  <div class="ticker-inner" id="tape-inner"></div>
</div>

<!-- NEWS MODAL -->
<div id="news-modal" onclick="if(event.target===this)closeNewsModal()">
  <div class="news-modal-box">
    <img id="news-modal-img" class="news-modal-img" src="" alt="" onerror="this.style.display='none'">
    <div class="news-modal-body">
      <div class="news-modal-source" id="news-modal-source"></div>
      <div class="news-modal-title" id="news-modal-title"></div>
      <div class="news-modal-summary" id="news-modal-summary"></div>
    </div>
    <div class="news-modal-footer">
      <span id="news-modal-time"></span>
      <a id="news-modal-link" href="#" target="_blank" class="btn-primary" style="font-size:12px;padding:7px 16px;">Read full article →</a>
      <button onclick="closeNewsModal()">Close</button>
    </div>
  </div>
</div>

`);

  // ── PAGES (injected into #app) ──────────────────────────────────────────

  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `

<!-- HOME -->
<div class="page active page-home-bg" id="page-home">
  <div class="dot-grid" style="top:4rem;right:2.5rem;width:160px;height:160px;opacity:.6"></div>
  <div class="dot-grid" style="bottom:8rem;left:2rem;width:100px;height:100px;opacity:.35"></div>
  <div class="deco-blob"></div>
  <div class="deco-star">✦</div>
  <div style="position:relative;z-index:1;">
    <div class="hero">
      <div>
        <div class="hero-label">Market Intelligence Platform</div>
        <h1 class="hero-title">Dive deeper<br>into <em>market</em><br><span style="color:var(--lime)">intel.</span></h1>
        <p class="hero-subtitle">Analyze ratios, intrinsic value, and risk in real-time. Algorithmic scorecards powered by Damodaran-WACC benchmarks.</p>
        <div class="search-hero">
          <input type="text" placeholder="Search stock, crypto, or ETF…" id="hero-search" onkeydown="heroSearchKey(event)">
          <button onclick="heroSearch()">Analyze →</button>
        </div>
        <div class="hero-quick">
          <button onclick="openTicker('NVDA')">NVDA</button>
          <button onclick="openTicker('AAPL')">AAPL</button>
          <button onclick="openTicker('MSFT')">MSFT</button>
          <button onclick="openTicker('TSLA')">TSLA</button>
          <button onclick="openTicker('AMD')">AMD</button>
        </div>
      </div>
      <div>
        <div style="background:var(--bg-2);border:1px solid var(--border);border-radius:var(--r-lg);overflow:hidden;">
          <div class="card-header">
            <span class="card-title">Market Pulse</span>
            <span style="font-size:11px;color:var(--green);font-family:var(--font-mono);">● Live</span>
          </div>
          <div class="card-body" style="padding:0;"><div id="market-pulse-list"></div></div>
          <div style="padding:12px 20px;border-top:1px solid var(--border);">
            <div class="section-label" style="margin-bottom:8px;">Aggregate Sentiment</div>
            <div class="sentiment-bar">
              <div class="sentiment-bull" style="width:72%"></div>
              <div class="sentiment-neu" style="width:18%"></div>
              <div class="sentiment-bear" style="width:10%"></div>
            </div>
            <div style="display:flex;gap:16px;font-size:11px;font-family:var(--font-mono);">
              <span style="color:var(--green)">72% Bullish</span>
              <span style="color:var(--amber)">18% Neutral</span>
              <span style="color:var(--red)">10% Bearish</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="home-grid">
      <div class="home-card">
        <div class="card-header"><span class="card-title">Top Gainers</span><a onclick="showPage('markets')">View all →</a></div>
        <div class="card-body" style="padding:0 20px;">
          <div class="stock-row" onclick="openTicker('NVDA')"><span class="sr-rank">1</span><div class="sr-info"><div class="sr-sym">NVDA</div><div class="sr-name">Nvidia Corp</div></div><span class="sr-price val-mono">$205.10</span><span class="sr-chg up">+46.51%</span></div>
          <div class="stock-row" onclick="openTicker('AMD')"><span class="sr-rank">2</span><div class="sr-info"><div class="sr-sym">AMD</div><div class="sr-name">Advanced Micro Devices</div></div><span class="sr-price val-mono">$160.40</span><span class="sr-chg up">+12.20%</span></div>
          <div class="stock-row" onclick="openTicker('INTC')"><span class="sr-rank">3</span><div class="sr-info"><div class="sr-sym">INTC</div><div class="sr-name">Intel Corp</div></div><span class="sr-price val-mono">$31.15</span><span class="sr-chg up">+5.10%</span></div>
        </div>
      </div>
      <div class="home-card">
        <div class="card-header"><span class="card-title">Most Active</span></div>
        <div class="card-body" style="padding:0 20px;">
          <div class="stock-row" onclick="openTicker('TSLA')"><span class="sr-rank">1</span><div class="sr-info"><div class="sr-sym">TSLA</div><div class="sr-name">Tesla Inc</div></div><span class="sr-price val-mono">$175.20</span><span class="sr-chg" style="color:var(--text-2);">12.4M vol</span></div>
          <div class="stock-row" onclick="openTicker('AAPL')"><span class="sr-rank">2</span><div class="sr-info"><div class="sr-sym">AAPL</div><div class="sr-name">Apple Inc</div></div><span class="sr-price val-mono">$182.10</span><span class="sr-chg" style="color:var(--text-2);">9.8M vol</span></div>
          <div class="stock-row" onclick="openTicker('NVDA')"><span class="sr-rank">3</span><div class="sr-info"><div class="sr-sym">NVDA</div><div class="sr-name">Nvidia Corp</div></div><span class="sr-price val-mono">$205.10</span><span class="sr-chg" style="color:var(--text-2);">8.2M vol</span></div>
        </div>
      </div>
      <div class="home-card">
        <div class="card-header"><span class="card-title">Top Scored</span></div>
        <div class="card-body" style="padding:0 20px;">
          <div class="stock-row" onclick="openTicker('MSFT')"><span class="sr-rank">1</span><div class="sr-info"><div class="sr-sym">MSFT</div><div class="sr-name">Microsoft</div></div><span></span><span class="sr-chg"><span class="score-badge">4.85</span></span></div>
          <div class="stock-row" onclick="openTicker('GOOGL')"><span class="sr-rank">2</span><div class="sr-info"><div class="sr-sym">GOOGL</div><div class="sr-name">Alphabet</div></div><span></span><span class="sr-chg"><span class="score-badge">4.62</span></span></div>
          <div class="stock-row" onclick="openTicker('NVDA')"><span class="sr-rank">3</span><div class="sr-info"><div class="sr-sym">NVDA</div><div class="sr-name">Nvidia Corp</div></div><span></span><span class="sr-chg"><span class="score-badge">4.57</span></span></div>
        </div>
      </div>
      <div class="home-card"><div class="card-header"><span class="card-title">Portfolio Snapshot</span><a onclick="showPage('portfolio')">Open →</a></div><div class="card-body"><div style="font-family:var(--font-display);font-size:30px;font-weight:800;letter-spacing:-0.04em;margin-bottom:4px;">$42,150<span style="font-size:16px;color:var(--text-3)">.00</span></div><div class="up" style="font-size:13px;font-family:var(--font-mono);">+$1,240.00 (+3.0%) today</div><div style="margin-top:14px;font-size:12px;color:var(--text-3);">Best: <span style="font-family:var(--font-mono);color:var(--green)">NVDA +46.51%</span></div></div></div>
      <div class="home-card" onclick="showPage('analytics-start')"><div class="card-header"><span class="card-title">Value & Stresstest</span></div><div class="card-body"><p style="font-size:13px;color:var(--text-2);line-height:1.6;">Simulate DCF models instantly. Adjust growth assumptions and test interest rate shocks.</p><div style="margin-top:14px;"><span class="btn-primary" style="font-size:12px;padding:7px 16px;">Launch Engine →</span></div></div></div>
      <div class="home-card"><div class="card-header"><span class="card-title">Macro & Sentiment</span></div><div class="card-body"><div style="font-size:20px;font-weight:800;color:var(--green);margin-bottom:8px;">🔥 BULLISH</div><div style="font-size:12px;color:var(--text-2);">74% Positive Buzz</div><div style="margin-top:8px;font-size:12px;">Top Sector: <span style="color:var(--accent);font-weight:600;">Semiconductors</span></div><div style="margin-top:4px;font-size:11px;color:var(--text-3);">CPI: 0.3% MoM (hot) · ECB conf. today</div></div></div>
    </div>

    <footer><div class="fl"><a>About</a><a>Methodology</a><a>Terms</a><a>Privacy</a></div><div>futara · 2026</div></footer>
  </div>
</div>

<!-- MARKETS -->
<div class="page" id="page-markets">
  <div class="markets-layout">
    <div class="markets-left">
      <div class="panel">
        <div class="panel-head"><span class="panel-title">My Watchlist</span><button class="expand-btn">+ Add</button></div>
        <div class="panel-body" style="padding:4px 20px;">
          <div class="watchlist-item" onclick="openTicker('NVDA')"><span class="wi-sym">NVDA</span><span class="wi-price val-mono">$205.10</span><span class="up" style="font-size:12px;font-family:var(--font-mono);">+46.51%</span><span class="wi-sma up">▲ SMA</span></div>
          <div class="watchlist-item" onclick="openTicker('AAPL')"><span class="wi-sym">AAPL</span><span class="wi-price val-mono">$182.10</span><span class="up" style="font-size:12px;font-family:var(--font-mono);">+1.20%</span><span class="wi-sma up">▲ SMA</span></div>
          <div class="watchlist-item"><span class="wi-sym" style="color:var(--text-2);">BTC</span><span class="wi-price val-mono">$68,400</span><span class="dn" style="font-size:12px;font-family:var(--font-mono);">−0.80%</span><span class="wi-sma dn">▼ SMA</span></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-head"><span class="panel-title">Sector Rotation</span></div>
        <div class="panel-body">
          <div class="sector-row"><span class="sector-name">Tech & AI</span><div class="sector-track"><div class="sector-fill" style="width:80%"></div></div><span class="sector-val up">+4.6%</span></div>
          <div class="sector-row"><span class="sector-name">Financials</span><div class="sector-track"><div class="sector-fill" style="width:40%"></div></div><span class="sector-val up">+2.1%</span></div>
          <div class="sector-row"><span class="sector-name">Healthcare</span><div class="sector-track"><div class="sector-fill" style="width:28%"></div></div><span class="sector-val up">+1.4%</span></div>
          <div class="sector-row"><span class="sector-name">Energy</span><div class="sector-track"><div class="sector-fill neg" style="width:22%"></div></div><span class="sector-val dn">−1.2%</span></div>
        </div>
      </div>
      <div class="panel">
        <div class="panel-head"><span class="panel-title">Heatmap</span></div>
        <div class="heatmap">
          <div class="hmap-cell hmap-pos" onclick="openTicker('NVDA')"><div class="hmap-sym">NVDA</div><div class="hmap-chg">+4.6%</div></div>
          <div class="hmap-cell hmap-pos" onclick="openTicker('AAPL')"><div class="hmap-sym">AAPL</div><div class="hmap-chg">+1.2%</div></div>
          <div class="hmap-cell hmap-pos" onclick="openTicker('AMD')"><div class="hmap-sym">AMD</div><div class="hmap-chg">+3.1%</div></div>
          <div class="hmap-cell hmap-neg" onclick="openTicker('TSLA')"><div class="hmap-sym">TSLA</div><div class="hmap-chg">−3.4%</div></div>
          <div class="hmap-cell hmap-neg" onclick="openTicker('META')"><div class="hmap-sym">META</div><div class="hmap-chg">−0.5%</div></div>
          <div class="hmap-cell hmap-neg" onclick="openTicker('BTC-USD')"><div class="hmap-sym">BTC</div><div class="hmap-chg">−0.8%</div></div>
        </div>
      </div>
    </div>
    <div class="markets-right" style="display:flex;flex-direction:column;">
      <div style="margin-bottom:16px;flex-shrink:0;">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.18em;color:var(--accent);margin-bottom:8px;">Live Markets</div>
        <div style="font-family:var(--font-display);font-size:clamp(32px,3.5vw,52px);font-weight:700;line-height:.95;letter-spacing:-.04em;">market<br><span style="color:var(--lime)">pulse.</span></div>
      </div>
      <div style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap;flex-shrink:0;align-items:center;">
        <button class="toggle-btn active" style="font-size:11px;" onclick="filterNews('general',this)">All</button>
        <button class="toggle-btn" style="font-size:11px;" onclick="filterNews('forex',this)">Macro</button>
        <button class="toggle-btn" style="font-size:11px;" onclick="filterNews('merger',this)">M&A</button>
        <button class="toggle-btn" style="font-size:11px;" onclick="filterNews('crypto',this)">Crypto</button>
        <span style="margin-left:auto;font-size:10px;font-family:var(--font-mono);color:var(--green);">● Live</span>
      </div>
      <div id="markets-news-feed" style="flex:1;overflow-y:auto;">
        <div style="padding:20px;text-align:center;font-size:12px;opacity:.5;">Loading news…</div>
      </div>
    </div>
  </div>
</div>

<!-- ANALYTICS START -->
<div class="page" id="page-analytics-start">
  <div class="analytics-start-layout">
    <div class="hero-label">Deep Fundamental Engine</div>
    <div class="start-title">Which company do<br>you want to analyze?</div>
    <div class="start-sub">Enter any ticker — our algorithmic scorecard deploys instantly.</div>
    <div class="search-analytics">
      <input type="text" placeholder="Apple (AAPL), Nvidia (NVDA), Bitcoin (BTC)…" id="analytics-search-input" onkeydown="analyticsSearchKey(event)">
      <button onclick="analyticsSearch()">Analyze →</button>
    </div>
    <div class="section-label" style="text-align:left;">Recently Analyzed</div>
    <div class="recent-pills">
      <div class="recent-pill" onclick="openTicker('NVDA')"><div class="rp-sym">NVDA</div><div class="rp-score">⭐ 4.57 · 2h ago</div></div>
      <div class="recent-pill" onclick="openTicker('TSLA')"><div class="rp-sym">TSLA</div><div class="rp-score">⭐ 3.10 · 1d ago</div></div>
      <div class="recent-pill" onclick="openTicker('AMD')"><div class="rp-sym">AMD</div><div class="rp-score">⭐ 3.82 · 3d ago</div></div>
    </div>
    <div class="section-label" style="text-align:left;margin-top:16px;">Sector Quick-Start</div>
    <div class="sectors-grid">
      <div class="sector-card" onclick="openTicker('MSFT')"><div class="sc-icon">💻</div><div class="sc-name">Technology & Semis</div><div class="sc-pe">Avg P/E: 21.1x</div><div class="sc-top">Top: MSFT (4.85)</div></div>
      <div class="sector-card" onclick="openTicker('JPM')"><div class="sc-icon">🏦</div><div class="sc-name">Banking & Financials</div><div class="sc-pe">Avg P/E: 11.4x</div><div class="sc-top">Top: JPM (4.12)</div></div>
      <div class="sector-card" onclick="openTicker('BYD')"><div class="sc-icon">🔋</div><div class="sc-name">Automotive & EV</div><div class="sc-pe">Avg P/E: 15.8x</div><div class="sc-top">Top: BYD (3.95)</div></div>
      <div class="sector-card" onclick="openTicker('XOM')"><div class="sc-icon">🛢️</div><div class="sc-name">Energy & Infrastructure</div><div class="sc-pe">Avg P/E: 9.8x</div><div class="sc-top">Top: XOM (3.70)</div></div>
      <div class="sector-card" onclick="openTicker('LLY')"><div class="sc-icon">💊</div><div class="sc-name">Healthcare & Pharma</div><div class="sc-pe">Avg P/E: 18.2x</div><div class="sc-top">Top: LLY (4.30)</div></div>
      <div class="sector-card" onclick="openTicker('COST')"><div class="sc-icon">🛒</div><div class="sc-name">Consumer Retail</div><div class="sc-pe">Avg P/E: 24.5x</div><div class="sc-top">Top: COST (4.25)</div></div>
    </div>
  </div>
</div>

<!-- ANALYTICS DETAIL -->
<div class="page" id="page-analytics">
  <div class="analytics-layout">
    <div id="analytics-loading" style="display:none;text-align:center;padding:80px 0;">
      <div style="font-size:14px;color:var(--text-3);font-family:var(--font-mono);">Loading <span id="loading-sym"></span>…</div>
      <div style="width:200px;height:3px;background:var(--bg-4);border-radius:2px;margin:16px auto;overflow:hidden;">
        <div style="height:100%;background:var(--accent);border-radius:2px;animation:loadAnim 1.5s ease-in-out infinite;"></div>
      </div>
    </div>
    <div id="analytics-content">
      <div class="ticker-hero">
        <div>
          <div class="ticker-name" id="a-ticker-sym">NVDA · NASDAQ</div>
          <div class="ticker-price-big" id="a-ticker-price">$205.10</div>
          <div class="ticker-change-big up" id="a-ticker-change">+$4.62 (+2.30%)</div>
          <div style="font-size:12px;color:var(--text-3);margin-top:6px;font-family:var(--font-mono);" id="a-ticker-meta">Nvidia Corporation · Semiconductor</div>
        </div>
        <div class="ticker-actions">
          <button class="btn-primary" onclick="addToPortfolio()">+ Portfolio</button>
          <button class="btn-secondary">+ Watchlist</button>
          <button class="btn-secondary" onclick="showPage('comparison')">Compare</button>
        </div>
      </div>
      <div class="context-dock">
        <div class="dock-tab active"><div class="dock-tab-label">Scorecard</div><div class="dock-tab-val" id="dock-score">4.57</div><div class="dock-tab-sub">STRONG BUY</div></div>
        <div class="dock-tab"><div class="dock-tab-label">Ratios</div><div class="dock-tab-val" id="dock-pe">16.2x</div><div class="dock-tab-sub">P/E · Cheap</div></div>
        <div class="dock-tab"><div class="dock-tab-label">Valuation</div><div class="dock-tab-val" id="dock-fair">$245</div><div class="dock-tab-sub">MoS +19.4%</div></div>
        <div class="dock-tab"><div class="dock-tab-label">Chart</div><div class="dock-tab-val">↑ Up</div><div class="dock-tab-sub">SMA 200 ✓</div></div>
        <div class="dock-tab"><div class="dock-tab-label">Market</div><div class="dock-tab-val">1.25x</div><div class="dock-tab-sub">Beta</div></div>
        <div class="dock-tab"><div class="dock-tab-label">Financials</div><div class="dock-tab-val">$253B</div><div class="dock-tab-sub">Q1/25 Rev.</div></div>
      </div>
      <!-- Scorecard + Chart + Ratios -->
      <div class="analytics-grid">
        <div class="panel" id="sc-scorecard">
          <div class="panel-head"><span class="panel-title">Scorecard</span></div>
          <div class="panel-body">
            <div class="score-display">
              <div class="score-big" id="score-big">4.57 <span class="score-total">/ 5.0</span></div>
              <div class="score-verdict" id="score-verdict">Strong Buy</div>
              <div style="font-size:11px;color:var(--text-3);margin-top:10px;font-family:var(--font-mono);">WACC: 9.4% · Beta: 1.25 · Risk: Moderate</div>
            </div>
            <div class="score-breakdown">
              <div class="sb-row"><span class="sb-label">Financial Ratios</span><span style="font-size:10px;color:var(--text-3);">65%</span><div class="sb-track"><div class="sb-fill" style="width:84%"></div></div><span class="sb-val">4.2/5</span></div>
              <div class="sb-row"><span class="sb-label">Management</span><span style="font-size:10px;color:var(--text-3);">12%</span><div class="sb-track"><div class="sb-fill" style="width:40%;background:var(--amber)"></div></div><span class="sb-val">2.0/5</span></div>
              <div class="sb-row"><span class="sb-label">Moat / Competitive</span><span style="font-size:10px;color:var(--text-3);">10%</span><div class="sb-track"><div class="sb-fill" style="width:60%"></div></div><span class="sb-val">3.0/5</span></div>
              <div class="sb-row"><span class="sb-label">ESG & Risk</span><span style="font-size:10px;color:var(--text-3);">8%</span><div class="sb-track"><div class="sb-fill" style="width:80%"></div></div><span class="sb-val">4.0/5</span></div>
              <div class="sb-row"><span class="sb-label">Valuation / DCF</span><span style="font-size:10px;color:var(--text-3);">5%</span><div class="sb-track"><div class="sb-fill" style="width:40%;background:var(--amber)"></div></div><span class="sb-val">2.0/5</span></div>
            </div>
            <div id="score-explanation" style="margin-top:12px;padding:10px 12px;background:var(--bg-3);border-radius:var(--r);font-size:12px;color:var(--text-2);line-height:1.6;display:none;"></div>
          </div>
        </div>
        <div class="panel" id="sc-chart">
          <div class="panel-head"><span class="panel-title">Price Chart</span><div style="display:flex;gap:4px;"><button class="toggle-btn active" style="font-size:10px;padding:3px 8px;">1M</button><button class="toggle-btn" style="font-size:10px;padding:3px 8px;">6M</button><button class="toggle-btn" style="font-size:10px;padding:3px 8px;">1Y</button><button class="toggle-btn" style="font-size:10px;padding:3px 8px;">5Y</button></div></div>
          <div class="panel-body">
            <div class="chart-area" style="height:160px;"><canvas id="price-chart-canvas"></canvas></div>
            <div style="margin-top:10px;padding:8px 10px;background:var(--green-dim);border-radius:var(--r);font-size:12px;color:var(--green);">🔥 Strong Uptrend — 8.7% above 200-day MA</div>
          </div>
        </div>
        <div class="panel" id="sc-ratios">
          <div class="panel-head"><span class="panel-title">Key Financial Ratios</span></div>
          <div class="panel-body" style="padding:0;">
            <table class="ratio-table" style="width:100%;"><thead><tr><th>Metric</th><th>Current</th><th>Sector</th><th></th></tr></thead>
            <tbody id="ratio-table-body">
              <tr><td>P/E Ratio</td><td class="val-mono" id="ratio-pe">16.2x</td><td class="val-mono" style="color:var(--text-3)">21.1x</td><td><span class="ratio-status rs-good">Cheap</span></td></tr>
              <tr><td>EV/EBITDA</td><td class="val-mono">29.7x</td><td class="val-mono" style="color:var(--text-3)">27.2x</td><td><span class="ratio-status rs-fair">Fair</span></td></tr>
              <tr><td>Gross Margin</td><td class="val-mono" id="ratio-gm">74.1%</td><td class="val-mono" style="color:var(--text-3)">52.3%</td><td><span class="ratio-status rs-elite">Elite</span></td></tr>
              <tr><td>Operating Margin</td><td class="val-mono">65.6%</td><td class="val-mono" style="color:var(--text-3)">38.0%</td><td><span class="ratio-status rs-elite">Elite</span></td></tr>
              <tr><td>Net Margin</td><td class="val-mono">63.0%</td><td class="val-mono" style="color:var(--text-3)">31.4%</td><td><span class="ratio-status rs-elite">Elite</span></td></tr>
              <tr><td>Rev. Growth YoY</td><td class="val-mono up">+85.2%</td><td class="val-mono" style="color:var(--text-3)">—</td><td><span class="ratio-status rs-elite">Hyper</span></td></tr>
            </tbody></table>
          </div>
        </div>
      </div>
      <!-- DCF + Peers -->
      <div class="analytics-grid-2">
        <div class="panel" id="sc-dcf">
          <div class="panel-head"><span class="panel-title">Intrinsic Value & Stresstest</span></div>
          <div class="panel-body">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
              <div class="dcf-display" style="text-align:left;"><div class="dcf-price">Current Price</div><div style="font-family:var(--font-mono);font-size:22px;font-weight:700;" id="dcf-current">$205.10</div></div>
              <div class="dcf-display" style="text-align:left;"><div class="dcf-price">Fair Value (DCF)</div><div class="dcf-fair" id="dcf-fair">$245.00</div><div class="dcf-mos" id="dcf-mos">MoS: +19.4% Underpriced</div></div>
            </div>
            <div class="dcf-sliders">
              <div class="slider-row"><div class="slider-head"><span class="slider-label">Revenue Growth (5Y)</span><span class="slider-val" id="sl-growth-val">8.5%</span></div><input type="range" min="1" max="20" value="8.5" step="0.5" id="sl-growth" oninput="updateDCF()"></div>
              <div class="slider-row"><div class="slider-head"><span class="slider-label">Operating Margin</span><span class="slider-val" id="sl-margin-val">65.6%</span></div><input type="range" min="20" max="80" value="65.6" step="0.5" id="sl-margin" oninput="updateDCF()"></div>
              <div class="slider-row"><div class="slider-head"><span class="slider-label">Discount Rate (WACC)</span><span class="slider-val" id="sl-wacc-val">9.4%</span></div><input type="range" min="5" max="18" value="9.4" step="0.1" id="sl-wacc" oninput="updateDCF()"></div>
            </div>
            <div class="stresstest">
              <div class="st-item"><div class="st-label">Worst Case</div><div class="st-val neg">$182.00 (−11%)</div></div>
              <div class="st-item"><div class="st-label">Base Case</div><div class="st-val" id="dcf-base-case">$245.00 (+19%)</div></div>
              <div class="st-item"><div class="st-label">Best Case</div><div class="st-val pos">$298.00 (+45%)</div></div>
            </div>
          </div>
        </div>
        <div class="panel" id="sc-context">
          <div class="panel-head"><span class="panel-title">Peer Performance (YTD)</span></div>
          <div class="panel-body">
            <div class="peer-bar"><span class="pb-label up">NVDA</span><div class="pb-track"><div class="pb-fill main" style="width:80%;">+46.5%</div></div></div>
            <div class="peer-bar"><span class="pb-label" style="color:var(--amber)">SOXX</span><div class="pb-track"><div class="pb-fill comp" style="width:46%;">+25.8%</div></div></div>
            <div class="peer-bar"><span class="pb-label" style="color:var(--text-2)">AMD</span><div class="pb-track"><div class="pb-fill comp" style="width:40%;background:rgba(240,168,66,0.3);">+22.1%</div></div></div>
            <div class="peer-bar"><span class="pb-label dn">INTC</span><div class="pb-track"><div class="pb-fill neg" style="width:22%;">−12.4%</div></div></div>
            <div style="margin-top:12px;padding:10px;background:var(--bg-3);border-radius:var(--r);font-size:12px;color:var(--text-2);">NVDA outperforming peers by <span style="color:var(--green);font-weight:600;">+24.4%</span></div>
          </div>
        </div>
      </div>
      <!-- Financials + Insider -->
      <div class="analytics-grid-3">
        <div class="panel" id="sc-period">
          <div class="panel-head"><span class="panel-title">Financial Statements</span><div style="display:flex;gap:4px;"><button class="toggle-btn active" style="font-size:10px;padding:3px 8px;">Quarterly</button><button class="toggle-btn" style="font-size:10px;padding:3px 8px;">Annual</button></div></div>
          <div class="panel-body">
            <div class="peer-bar" style="margin:6px 0;"><span class="pb-label" style="font-size:10px;color:var(--text-3);width:40px;">Q3/24</span><div class="pb-track" style="height:16px;"><div class="pb-fill comp" style="width:60%;font-size:10px;padding-left:6px;">$181B</div></div></div>
            <div class="peer-bar" style="margin:6px 0;"><span class="pb-label" style="font-size:10px;color:var(--text-3);width:40px;">Q4/24</span><div class="pb-track" style="height:16px;"><div class="pb-fill comp" style="width:72%;font-size:10px;padding-left:6px;">$221B</div></div></div>
            <div class="peer-bar" style="margin:6px 0;"><span class="pb-label" style="font-size:10px;color:var(--accent);width:40px;">Q1/25</span><div class="pb-track" style="height:16px;"><div class="pb-fill main" style="width:90%;font-size:10px;padding-left:6px;">$253B</div></div></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;">
              <div style="padding:10px;background:var(--bg-3);border-radius:var(--r);"><div style="font-size:10px;color:var(--text-3);margin-bottom:4px;">Net Income</div><div style="font-family:var(--font-mono);font-size:13px;font-weight:600;">$120B</div></div>
              <div style="padding:10px;background:var(--bg-3);border-radius:var(--r);"><div style="font-size:10px;color:var(--text-3);margin-bottom:4px;">Free Cash Flow</div><div style="font-family:var(--font-mono);font-size:13px;font-weight:600;">$46.3B</div></div>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-head"><span class="panel-title">Insider Trades (90d)</span></div>
          <div class="panel-body">
            <div style="padding:7px 10px;background:var(--green-dim);border-radius:var(--r);font-size:12px;color:var(--green);margin-bottom:12px;">🟢 Net Sentiment: Strongly Bullish</div>
            <div class="insider-row"><span class="ins-type ins-buy">BUY</span><div class="ins-name"><div style="font-weight:600;font-size:12px;">Kress Colette</div><div class="ins-pos">CFO · 2026-05-14</div></div><span class="ins-shares val-mono" style="font-size:11px;">450K sh</span><span class="ins-val" style="font-size:11px;">$202.10</span></div>
            <div class="insider-row"><span class="ins-type ins-buy">BUY</span><div class="ins-name"><div style="font-weight:600;font-size:12px;">Huang Jen-Hsun</div><div class="ins-pos">CEO · 2026-04-28</div></div><span class="ins-shares val-mono" style="font-size:11px;">1M sh</span><span class="ins-val" style="font-size:11px;">$198.50</span></div>
            <div class="insider-row"><span class="ins-type ins-sell">SELL</span><div class="ins-name"><div style="font-weight:600;font-size:12px;">Miller Jay</div><div class="ins-pos">Director · 2026-03-12</div></div><span class="ins-shares val-mono" style="font-size:11px;">210K sh</span><span class="ins-val" style="font-size:11px;">$211.00</span></div>
          </div>
        </div>
      </div>
      <!-- News + Dividend -->
      <div class="analytics-grid-3">
        <div class="panel">
          <div class="panel-head"><span class="panel-title">News & Sentiment</span></div>
          <div class="panel-body" style="padding:0 20px;">
            <div style="display:flex;gap:8px;margin:12px 0 8px;font-size:12px;font-family:var(--font-mono);"><span style="color:var(--green)">Bull 72%</span><span style="color:var(--text-3)">·</span><span style="color:var(--amber)">Neutral 18%</span><span style="color:var(--text-3)">·</span><span style="color:var(--red)">Bear 10%</span></div>
            <div class="sentiment-bar" style="margin-bottom:14px;"><div class="sentiment-bull" style="width:72%"></div><div class="sentiment-neu" style="width:18%"></div><div class="sentiment-bear" style="width:10%"></div></div>
            <div id="ticker-news-list"><div style="font-size:11px;color:var(--text-3);padding:8px 0;">Loading news…</div></div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-head"><span class="panel-title">Dividend Calendar</span></div>
          <div class="panel-body">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
              <div style="padding:10px;background:var(--bg-3);border-radius:var(--r);"><div style="font-size:10px;color:var(--text-3);margin-bottom:4px;">Yield</div><div style="font-family:var(--font-mono);font-size:15px;font-weight:700;">0.92%</div></div>
              <div style="padding:10px;background:var(--bg-3);border-radius:var(--r);"><div style="font-size:10px;color:var(--text-3);margin-bottom:4px;">Payout Ratio</div><div style="font-family:var(--font-mono);font-size:15px;font-weight:700;color:var(--green);">14.5%</div></div>
            </div>
            <div style="font-size:12px;color:var(--text-2);margin-bottom:8px;">12 consecutive years · 5Y CAGR +14.2%</div>
            <div style="font-size:11px;color:var(--text-3);"><div style="margin:4px 0;">Ex-Div: <span style="font-family:var(--font-mono);color:var(--text);">2026-07-01</span></div><div style="margin:4px 0;">Payment: <span style="font-family:var(--font-mono);color:var(--text);">2026-07-15</span></div></div>
          </div>
        </div>
      </div>
      <!-- Management -->
      <div class="panel" style="margin-bottom:16px;">
        <div class="panel-head"><span class="panel-title">Management & Ownership</span></div>
        <div class="panel-body">
          <div style="display:flex;gap:8px;margin-bottom:16px;">
            <div style="flex:1;padding:10px;background:var(--bg-3);border-radius:var(--r);text-align:center;"><div style="font-size:11px;color:var(--text-3);margin-bottom:4px;">Institutional</div><div style="font-family:var(--font-mono);font-size:16px;font-weight:700;">68.4%</div></div>
            <div style="flex:1;padding:10px;background:var(--bg-3);border-radius:var(--r);text-align:center;"><div style="font-size:11px;color:var(--text-3);margin-bottom:4px;">Insiders</div><div style="font-family:var(--font-mono);font-size:16px;font-weight:700;">14.2%</div></div>
            <div style="flex:1;padding:10px;background:var(--bg-3);border-radius:var(--r);text-align:center;"><div style="font-size:11px;color:var(--text-3);margin-bottom:4px;">Retail</div><div style="font-family:var(--font-mono);font-size:16px;font-weight:700;">17.4%</div></div>
          </div>
          <table class="ratio-table"><thead><tr><th>Institution</th><th>Shares</th><th>%</th><th>Change</th></tr></thead><tbody>
            <tr><td>Vanguard Group</td><td class="val-mono">82.45M</td><td class="val-mono">8.24%</td><td style="color:var(--green);font-size:12px;">↑ +1.2%</td></tr>
            <tr><td>BlackRock Inc.</td><td class="val-mono">71.12M</td><td class="val-mono">7.11%</td><td style="color:var(--green);font-size:12px;">↑ +0.5%</td></tr>
            <tr><td>State Street</td><td class="val-mono">42.90M</td><td class="val-mono">4.29%</td><td style="color:var(--red);font-size:12px;">↓ −0.3%</td></tr>
            <tr><td>Fidelity Mgmt.</td><td class="val-mono">38.10M</td><td class="val-mono">3.81%</td><td style="color:var(--text-3);font-size:12px;">— Unchanged</td></tr>
          </tbody></table>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- COMPARISON -->
<div class="page" id="page-comparison">
  <div class="comparison-layout">
    <div style="margin-bottom:28px;"><div style="font-family:var(--font-display);font-size:28px;font-weight:800;letter-spacing:-0.04em;margin-bottom:6px;">Peer-to-Peer Comparison</div><div style="font-size:14px;color:var(--text-3);">Build your side-by-side investment matrix</div></div>
    <div class="comp-setup">
      <div class="comp-slot"><div class="comp-slot-label">Slot 1 (Primary)</div><input type="text" value="NVDA" id="comp-slot1"></div>
      <div class="comp-vs">vs</div>
      <div class="comp-slot"><div class="comp-slot-label">Slot 2</div><input type="text" value="AMD" id="comp-slot2"></div>
      <div class="comp-vs">vs</div>
      <div class="comp-slot"><div class="comp-slot-label">Slot 3 (Optional)</div><input type="text" value="INTC" id="comp-slot3"></div>
      <button class="btn-launch" onclick="launchComparison()">Launch →</button>
    </div>
    <div class="comp-table" id="comp-results">
      <div class="comp-table-head">
        <div class="comp-col-header"><span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-3);">Metric</span></div>
        <div class="comp-col-header"><div class="comp-col-sym" id="ch1">NVDA</div><div class="comp-col-name">Nvidia Corporation</div></div>
        <div class="comp-col-header"><div class="comp-col-sym" id="ch2">AMD</div><div class="comp-col-name">Advanced Micro Devices</div></div>
        <div class="comp-col-header"><div class="comp-col-sym" id="ch3">INTC</div><div class="comp-col-name">Intel Corporation</div></div>
      </div>
      <div class="comp-section-label">⭐ Scorecard Summary</div>
      <div class="comp-row"><div class="comp-cell metric">Overall Score</div><div class="comp-cell val best"><span class="score-badge">4.57 Strong Buy</span></div><div class="comp-cell val"><span class="score-badge med">3.82 Buy</span></div><div class="comp-cell val"><span class="score-badge lo">2.10 Avoid</span></div></div>
      <div class="comp-section-label">🧮 Intrinsic Value</div>
      <div class="comp-row"><div class="comp-cell metric">Current Price</div><div class="comp-cell val">$205.10</div><div class="comp-cell val">$160.40</div><div class="comp-cell val">$31.15</div></div>
      <div class="comp-row"><div class="comp-cell metric">Fair Value (DCF)</div><div class="comp-cell val best">$245.00</div><div class="comp-cell val">$155.00</div><div class="comp-cell val">$22.00</div></div>
      <div class="comp-row"><div class="comp-cell metric">Margin of Safety</div><div class="comp-cell val best"><span style="color:var(--green);font-family:var(--font-mono);font-weight:600;">+19.4%</span></div><div class="comp-cell val"><span style="color:var(--amber);font-family:var(--font-mono);">−3.3%</span></div><div class="comp-cell val"><span style="color:var(--red);font-family:var(--font-mono);">−29.3%</span></div></div>
      <div class="comp-section-label">📊 Key Metrics</div>
      <div class="comp-row"><div class="comp-cell metric">P/E Ratio</div><div class="comp-cell val best"><span class="val-mono">16.2x</span> <span class="ratio-status rs-good" style="font-size:10px;">Cheap</span></div><div class="comp-cell val"><span class="val-mono">28.4x</span></div><div class="comp-cell val"><span class="val-mono">19.5x</span></div></div>
      <div class="comp-row"><div class="comp-cell metric">Gross Margin</div><div class="comp-cell val best"><span class="val-mono">74.1%</span> <span class="ratio-status rs-elite" style="font-size:10px;">Elite</span></div><div class="comp-cell val"><span class="val-mono">48.2%</span></div><div class="comp-cell val"><span class="val-mono">32.0%</span></div></div>
      <div class="comp-row"><div class="comp-cell metric">Rev. Growth YoY</div><div class="comp-cell val best"><span class="up val-mono">+85.2%</span></div><div class="comp-cell val"><span class="up val-mono">+12.2%</span></div><div class="comp-cell val"><span class="dn val-mono">−5.1%</span></div></div>
      <div class="comp-row" style="background:var(--bg-3);">
        <div class="comp-cell metric"></div>
        <div class="comp-cell"><button class="btn-primary" style="font-size:11px;padding:6px 12px;" onclick="openTicker('NVDA')">Full Analytics</button></div>
        <div class="comp-cell"><button class="btn-secondary" style="font-size:11px;padding:6px 12px;" onclick="openTicker('AMD')">Full Analytics</button></div>
        <div class="comp-cell"><button class="btn-secondary" style="font-size:11px;padding:6px 12px;" onclick="openTicker('INTC')">Full Analytics</button></div>
      </div>
    </div>
    <div style="margin-top:32px;"><div class="section-label">Popular Market Duels</div>
      <div class="battles-grid">
        <div class="battle-card" onclick="loadComparison('NVDA','AMD','INTC')"><div class="battle-icon">💻</div><div class="battle-title">The AI Chip War</div><div class="battle-tickers">NVDA vs AMD vs INTC</div><div class="battle-tag">🔥 Active</div></div>
        <div class="battle-card" onclick="loadComparison('TSLA','BYD','RIVN')"><div class="battle-icon">🚗</div><div class="battle-title">EV Showdown</div><div class="battle-tickers">TSLA vs BYD vs RIVN</div><div class="battle-tag">⚡ Margins vs Volume</div></div>
        <div class="battle-card" onclick="loadComparison('MSFT','AMZN','GOOGL')"><div class="battle-icon">☁️</div><div class="battle-title">Cloud Infrastructure</div><div class="battle-tickers">MSFT vs AMZN vs GOOGL</div></div>
      </div>
    </div>
  </div>
</div>

<!-- PORTFOLIO -->
<div class="page" id="page-portfolio">
  <div class="portfolio-layout">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;">
      <div><div style="font-family:var(--font-display);font-size:28px;font-weight:800;letter-spacing:-0.04em;">Portfolio</div><div style="font-size:13px;color:var(--text-3);margin-top:4px;">Command Center</div></div>
      <button class="btn-primary">+ Add Position</button>
    </div>
    <div class="portfolio-header">
      <div class="port-stat"><div class="port-stat-label">Net Asset Value</div><div class="port-stat-val">$42,150</div><div class="port-stat-sub up">+$1,240 (+3.0%) today</div></div>
      <div class="port-stat"><div class="port-stat-label">Cash Buffer</div><div class="port-stat-val">$8,430</div><div class="port-stat-sub" style="color:var(--text-3);">20.0% of portfolio</div></div>
      <div class="port-stat"><div class="port-stat-label">Weighted Score</div><div class="port-stat-val" style="color:var(--green);">4.12</div><div class="port-stat-sub" style="color:var(--text-3);">/ 5.0 · Buy Signal</div></div>
      <div class="port-stat"><div class="port-stat-label">Market Rule</div><div class="port-stat-val" style="color:var(--green);">Bullish</div><div class="port-stat-sub up">2/3 above SMA 200</div></div>
    </div>
    <div class="portfolio-grid">
      <div class="panel">
        <div class="panel-head"><span class="panel-title">Holdings</span></div>
        <div class="panel-body" style="padding:0;">
          <table class="holdings-table">
            <thead><tr><th>Asset</th><th>Allocation</th><th>Return</th><th>Score</th><th>Trend</th></tr></thead>
            <tbody>
              <tr onclick="openTicker('NVDA')"><td><div class="hold-sym">NVDA</div><div class="hold-name">Nvidia Corp</div></td><td class="val-mono">$19,050 · 45.2%</td><td class="up val-mono">+46.51%</td><td><span class="score-badge">4.57</span></td><td style="color:var(--green);font-size:12px;">↑ SMA</td></tr>
              <tr><td><div class="hold-sym">BTC</div><div class="hold-name">Bitcoin</div></td><td class="val-mono">$9,310 · 22.1%</td><td class="dn val-mono">−0.80%</td><td><span class="score-badge med">3.40</span></td><td style="color:var(--red);font-size:12px;">↓ SMA</td></tr>
              <tr onclick="openTicker('COST')"><td><div class="hold-sym">COST</div><div class="hold-name">Costco</div></td><td class="val-mono">$5,360 · 12.7%</td><td class="up val-mono">+3.2%</td><td><span class="score-badge">4.25</span></td><td style="color:var(--green);font-size:12px;">↑ SMA</td></tr>
              <tr><td><div class="hold-sym">Cash</div><div class="hold-name">USD Buffer</div></td><td class="val-mono">$8,430 · 20.0%</td><td class="val-mono" style="color:var(--text-3);">—</td><td>—</td><td style="color:var(--text-3);font-size:12px;">—</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px;">
        <div class="panel">
          <div class="panel-head"><span class="panel-title">Asset Allocation</span></div>
          <div class="panel-body">
            <svg viewBox="0 0 120 120" style="width:120px;height:120px;display:block;margin:0 auto 12px;">
              <circle cx="60" cy="60" r="48" fill="none" stroke="var(--bg-4)" stroke-width="20"/>
              <circle cx="60" cy="60" r="48" fill="none" stroke="var(--accent)" stroke-width="20" stroke-dasharray="136 165" stroke-dashoffset="0" transform="rotate(-90 60 60)"/>
              <circle cx="60" cy="60" r="48" fill="none" stroke="var(--amber)" stroke-width="20" stroke-dasharray="66 235" stroke-dashoffset="-136" transform="rotate(-90 60 60)"/>
              <circle cx="60" cy="60" r="48" fill="none" stroke="var(--green)" stroke-width="20" stroke-dasharray="38 263" stroke-dashoffset="-202" transform="rotate(-90 60 60)"/>
              <text x="60" y="60" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="700" fill="var(--text)" font-family="'DM Mono',monospace">45.2%</text>
              <text x="60" y="74" text-anchor="middle" dominant-baseline="central" font-size="9" fill="var(--text-3)" font-family="'DM Sans',sans-serif">NVDA</text>
            </svg>
            <div class="alloc-list">
              <div class="alloc-item"><div class="alloc-dot" style="background:var(--accent)"></div><span class="alloc-name">Tech & AI (NVDA)</span><span class="alloc-pct" style="color:var(--accent)">45.2%</span></div>
              <div class="alloc-item"><div class="alloc-dot" style="background:var(--amber)"></div><span class="alloc-name">Crypto (BTC)</span><span class="alloc-pct" style="color:var(--amber)">22.1%</span></div>
              <div class="alloc-item"><div class="alloc-dot" style="background:var(--green)"></div><span class="alloc-name">Retail (COST)</span><span class="alloc-pct" style="color:var(--green)">12.7%</span></div>
              <div class="alloc-item"><div class="alloc-dot" style="background:var(--bg-4);border:1px solid var(--border-mid)"></div><span class="alloc-name">Cash Buffer</span><span class="alloc-pct" style="color:var(--text-2)">20.0%</span></div>
            </div>
          </div>
        </div>
        <div class="panel">
          <div class="panel-head"><span class="panel-title">Leverage Desk</span><span style="font-size:11px;color:var(--green);font-family:var(--font-mono);">1 active</span></div>
          <div class="panel-body">
            <div class="leverage-card">
              <div class="lev-head"><span class="lev-sym">NVDA <span style="font-size:11px;color:var(--text-2)">LONG</span></span><span class="lev-badge">x5 Leverage</span></div>
              <div style="font-size:22px;font-weight:700;font-family:var(--font-mono);color:var(--green);">+$900 <span style="font-size:14px;">(+8.9%)</span></div>
              <div class="lev-levels"><div class="lev-level">SL: <span>$195.00</span></div><div class="lev-level">TP1: <span>$210.00</span></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- PROFILE -->
<div class="page" id="page-profile">
  <div class="profile-layout">
    <div style="font-family:var(--font-display);font-size:28px;font-weight:800;letter-spacing:-0.04em;margin-bottom:28px;">Settings & Profile</div>
    <div class="profile-section">
      <div class="profile-section-head">Appearance & Display</div>
      <div class="profile-section-body">
        <div class="setting-row"><div><div class="setting-label">Interface Theme</div><div class="setting-desc">Dark saves battery · Light for daylight</div></div><div class="toggle-wrap"><button class="toggle-btn active" id="theme-dark-btn" onclick="setTheme('dark')">Dark</button><button class="toggle-btn" id="theme-light-btn" onclick="setTheme('light')">Light</button></div></div>
        <div class="setting-row"><div><div class="setting-label">Language</div></div><select class="select-field"><option>English (US)</option><option>Deutsch</option><option>Español</option></select></div>
        <div class="setting-row"><div><div class="setting-label">Currency</div></div><select class="select-field"><option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option></select></div>
      </div>
    </div>
    <div class="profile-section">
      <div class="profile-section-head">Investment Strategy</div>
      <div class="profile-section-body" id="strategy-profile-section">
        <div class="setting-row"><div><div class="setting-label">Investment Horizon</div><div class="setting-desc">Affects scoring weights for growth vs. stability</div></div><select class="select-field" id="profile-horizon" onchange="updateStrategyProfile()"><option value="long">Long-term (5+ years)</option><option value="medium">Medium-term (1–5 years)</option><option value="short">Short-term (&lt;1 year)</option></select></div>
        <div class="setting-row"><div><div class="setting-label">Risk Tolerance</div></div><select class="select-field" id="profile-risk" onchange="updateStrategyProfile()"><option value="moderate">Moderate</option><option value="conservative">Conservative</option><option value="aggressive">Aggressive</option></select></div>
        <div class="setting-row"><div><div class="setting-label">Investment Focus</div><div class="setting-desc">Shifts scorecard weights accordingly</div></div><select class="select-field" id="profile-focus" onchange="updateStrategyProfile()"><option value="growth">Growth</option><option value="value">Value</option><option value="dividend">Dividend</option><option value="momentum">Momentum</option></select></div>
        <div style="margin-top:16px;padding:12px;background:var(--bg-3);border-radius:var(--r);font-size:12px;color:var(--text-2);" id="strategy-summary">Your current profile: Growth investor · Moderate risk · Long-term horizon</div>
      </div>
    </div>
    <div class="profile-section">
      <div class="profile-section-head">Scorecard Weights</div>
      <div class="profile-section-body">
        <div style="font-size:12px;color:var(--text-3);margin-bottom:14px;">Manually override the scoring weights. Total must equal 100%.</div>
        <div id="weight-sliders"></div>
        <div style="display:flex;gap:8px;margin-top:14px;">
          <button class="btn-secondary" style="font-size:12px;padding:7px 14px;" onclick="resetWeightsToProfile()">↺ Reset to Profile</button>
        </div>
      </div>
    </div>
    <div class="profile-section">
      <div class="profile-section-head">API Credentials</div>
      <div class="profile-section-body">
        <div class="setting-label">FMP (Financial Modeling Prep) Key</div>
        <div class="api-field" style="margin-top:8px;"><div class="api-status-dot"></div><div class="api-key-val" id="api-key-display">•••••••••••••••••••••••••••</div><button class="expand-btn" onclick="toggleApiKey()">Show</button></div>
        <div style="margin-top:8px;font-size:12px;color:var(--text-3);">🟢 Connected · Stored locally only</div>
        <div style="margin-top:10px;display:flex;gap:8px;"><button class="btn-secondary" style="font-size:12px;padding:7px 14px;">📥 Export</button><button class="btn-secondary" style="font-size:12px;padding:7px 14px;">📤 Import</button><button style="padding:7px 14px;background:var(--red-dim);color:var(--red);border:1px solid rgba(252,80,80,0.2);border-radius:var(--r);font-size:12px;">🗑 Wipe Cache</button></div>
      </div>
    </div>
    <div class="profile-section">
      <div class="profile-section-head">System</div>
      <div class="profile-section-body">
        <div class="setting-row"><div><div class="setting-label">Plan</div><div class="setting-desc">Free Personal Tier</div></div><span class="plan-badge">FREE</span></div>
        <div class="setting-row"><div><div class="setting-label">Build</div></div><span style="font-family:var(--font-mono);font-size:12px;color:var(--text-3);">v2.7.0</span></div>
      </div>
    </div>
  </div>
</div>

`;

  // ── CURSOR ──────────────────────────────────────────────────────────────
  const cursorScript = document.createElement('script');
  cursorScript.textContent = `(function(){
    const dot = document.getElementById('cursor-dot');
    if (!dot) return;
    document.addEventListener('mousemove', e => {
      dot.style.left = e.clientX + 'px';
      dot.style.top  = e.clientY + 'px';
    }, { passive: true });
  })();`;
  document.body.appendChild(cursorScript);

})();

// ── STRATEGY PROFILE UI HELPERS (called from profile page) ──────────────

function updateStrategyProfile() {
  const horizon = document.getElementById('profile-horizon')?.value;
  const risk    = document.getElementById('profile-risk')?.value;
  const focus   = document.getElementById('profile-focus')?.value;
  if (!horizon) return;

  const profile = getStrategyProfile();
  profile.horizon = horizon;
  profile.risk    = risk;
  profile.focus   = focus;
  saveStrategyProfile(profile);

  const weights = getEffectiveWeights(profile);
  renderWeightSliders(weights);

  const summary = document.getElementById('strategy-summary');
  if (summary) {
    summary.textContent = `Your profile: ${focus.charAt(0).toUpperCase()+focus.slice(1)} investor · ${risk.charAt(0).toUpperCase()+risk.slice(1)} risk · ${horizon} horizon`;
  }
}

function renderWeightSliders(weights) {
  const container = document.getElementById('weight-sliders');
  if (!container) return;
  const labels = { ratios:'Financial Ratios', management:'Management', moat:'Moat / Competitive', esg:'ESG & Risk', valuation:'DCF / Valuation' };
  container.innerHTML = Object.entries(weights).map(([k, v]) => `
    <div style="margin-bottom:12px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:5px;font-size:12px;">
        <span style="color:var(--text-2);">${labels[k] || k}</span>
        <span style="font-family:var(--font-mono);color:var(--accent);" id="wlabel-${k}">${v}%</span>
      </div>
      <input type="range" min="0" max="50" value="${v}" oninput="onWeightSlider('${k}', this.value)">
    </div>`).join('');
}

function onWeightSlider(key, val) {
  const el = document.getElementById('wlabel-' + key);
  if (el) el.textContent = val + '%';
  const profile = getStrategyProfile();
  profile.scoreWeights[key] = parseInt(val);
  saveStrategyProfile(profile);
}

function resetWeightsToProfile() {
  const profile = getStrategyProfile();
  delete profile.scoreWeights;
  saveStrategyProfile(profile);
  renderWeightSliders(getEffectiveWeights(profile));
}

function initProfilePage() {
  const profile = getStrategyProfile();
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  setVal('profile-horizon', profile.horizon);
  setVal('profile-risk', profile.risk);
  setVal('profile-focus', profile.focus);
  renderWeightSliders(getEffectiveWeights(profile));
  const summary = document.getElementById('strategy-summary');
  if (summary) summary.textContent = `Your profile: ${profile.focus} investor · ${profile.risk} risk · ${profile.horizon} horizon`;
}
