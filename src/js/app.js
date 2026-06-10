// ============================================================
// futara — app.js  (Logik, komplett design-unabhängig)
// Einbinden: <script src="/src/js/app.js"></script>
//
// Voraussetzungen im HTML:
//   - id="tape-inner"            → Ticker-Tape Inhalt
//   - id="ticker-tape"           → Tape-Wrapper (display toggle)
//   - id="market-pulse-list"     → Home Market-Pulse
//   - id="markets-news-feed"     → Markets News-Grid
//   - id="news-modal"            → News-Modal Overlay
//   - id="news-modal-img/source/title/summary/time/link"
//   - id="nav-search-wrap"       → Suche Container
//   - id="nav-search-input"      → Suche Input
//   - id="nav-search-dropdown"   → Suche Dropdown
//   - id="analytics-loading"     → Loading-Anzeige Analytics
//   - id="analytics-content"     → Analytics Inhalt
//   - id="loading-sym"           → Ticker im Loading
//   - id="a-ticker-sym/price/change/meta"
//   - id="dcf-current/fair/mos/dock-fair/dcf-base-case"
//   - id="sl-growth/sl-margin/sl-wacc" + sl-*-val
//   - id="price-chart-canvas"    → Chart
//   - id="comp-slot1/2/3"        → Comparison Inputs
//   - id="ticker-news-list"      → Ticker News in Analytics
//   - id="theme-dark-btn/theme-light-btn"
//   - id="api-key-display"
//   - class="page"               → Seiten-Divs
//   - class="nav-link"           → Nav-Links
// ============================================================

// ===== STATE =====
let currentPage = 'home';
let currentTicker = 'NVDA';
let apiKeyRevealed = false;

// ===== STRATEGY PROFILE =====
// Stored in localStorage as 'strategy_profile'
// Score is always live-calculated — profile only shifts the weights
// scoreAtTime is stored once when a trade is logged

const STRATEGY_DEFAULTS = {
  horizon:      'long',      // 'short' | 'medium' | 'long'
  risk:         'moderate',  // 'conservative' | 'moderate' | 'aggressive'
  focus:        'growth',    // 'value' | 'growth' | 'dividend' | 'momentum'
  scoreWeights: {
    ratios:     65,
    management: 12,
    moat:       10,
    esg:        8,
    valuation:  5
  }
};

// Weight adjustments per focus — applied on top of defaults
const FOCUS_WEIGHT_ADJUSTMENTS = {
  value:    { ratios: +10, valuation: +10, management: -5,  esg: -5,  moat:  0  },
  growth:   { ratios: +5,  valuation: -10, management: -5,  esg:  0,  moat: +10 },
  dividend: { ratios: +5,  valuation: +5,  management: -5,  esg: +10, moat: -5  },
  momentum: { ratios: -10, valuation: 0,   management:  0,  esg: -5,  moat: +15 }
};

function getStrategyProfile() {
  try {
    const saved = localStorage.getItem('strategy_profile');
    return saved ? JSON.parse(saved) : { ...STRATEGY_DEFAULTS };
  } catch(e) { return { ...STRATEGY_DEFAULTS }; }
}

function saveStrategyProfile(profile) {
  localStorage.setItem('strategy_profile', JSON.stringify(profile));
}

// Returns effective weights after applying focus adjustments
function getEffectiveWeights(profile) {
  const base = { ...STRATEGY_DEFAULTS.scoreWeights, ...(profile.scoreWeights || {}) };
  const adj = FOCUS_WEIGHT_ADJUSTMENTS[profile.focus] || {};
  const w = {};
  let total = 0;
  for (const k in base) {
    w[k] = Math.max(0, (base[k] || 0) + (adj[k] || 0));
    total += w[k];
  }
  // Normalise to 100
  if (total !== 100) {
    for (const k in w) w[k] = Math.round(w[k] / total * 100);
  }
  return w;
}

// ===== LIVE SCORE ENGINE =====
// Score is ALWAYS recalculated fresh from live data + current profile.
// The only thing stored is scoreAtTime when logging a trade.

function calculateScore(fundamentals, profile) {
  // fundamentals: { pe, grossMargin, opMargin, netMargin, revGrowth,
  //                 evEbitda, beta, insiderSentiment, mosPercent }
  // Returns: { total: 0-5, breakdown: { ratios, management, moat, esg, valuation } }

  const weights = getEffectiveWeights(profile || getStrategyProfile());

  // --- Financial Ratios sub-score (0–5) ---
  let ratioScore = 3.0; // baseline
  const { pe, grossMargin, opMargin, netMargin, revGrowth } = fundamentals;
  if (pe !== null && pe !== undefined) {
    if (pe < 15)       ratioScore += 0.6;
    else if (pe < 20)  ratioScore += 0.3;
    else if (pe > 35)  ratioScore -= 0.5;
    else if (pe > 50)  ratioScore -= 1.0;
  }
  if (grossMargin > 70) ratioScore += 0.5;
  else if (grossMargin > 50) ratioScore += 0.2;
  else if (grossMargin < 25) ratioScore -= 0.4;
  if (revGrowth > 50)  ratioScore += 0.6;
  else if (revGrowth > 20) ratioScore += 0.3;
  else if (revGrowth < 0)  ratioScore -= 0.5;
  ratioScore = Math.min(5, Math.max(0, ratioScore));

  // --- Management sub-score (0–5) ---
  let mgmtScore = fundamentals.insiderSentiment ?? 3.0;
  mgmtScore = Math.min(5, Math.max(0, mgmtScore));

  // --- Moat sub-score (0–5) ---
  let moatScore = 3.0;
  if (opMargin > 25) moatScore += 0.6;
  else if (opMargin > 15) moatScore += 0.2;
  else if (opMargin < 5) moatScore -= 0.5;
  moatScore = Math.min(5, Math.max(0, moatScore));

  // --- ESG & Risk sub-score (0–5) ---
  let esgScore = 3.0;
  const beta = fundamentals.beta;
  if (beta !== null && beta !== undefined) {
    if (beta < 0.8)    esgScore += 0.4;
    else if (beta < 1.2) esgScore += 0.1;
    else if (beta > 1.8) esgScore -= 0.5;
    else if (beta > 2.5) esgScore -= 1.0;
  }
  esgScore = Math.min(5, Math.max(0, esgScore));

  // --- Valuation / DCF sub-score (0–5) ---
  let valScore = 3.0;
  const mos = fundamentals.mosPercent;
  if (mos !== null && mos !== undefined) {
    if (mos > 30)       valScore = 5.0;
    else if (mos > 15)  valScore = 4.2;
    else if (mos > 0)   valScore = 3.5;
    else if (mos > -15) valScore = 2.5;
    else                valScore = 1.5;
  }

  // --- Weighted total ---
  const W = weights;
  const total = (
    ratioScore  * (W.ratios     / 100) +
    mgmtScore   * (W.management / 100) +
    moatScore   * (W.moat       / 100) +
    esgScore    * (W.esg        / 100) +
    valScore    * (W.valuation  / 100)
  );

  return {
    total: Math.round(total * 100) / 100,
    breakdown: {
      ratios:     { score: ratioScore, weight: W.ratios },
      management: { score: mgmtScore, weight: W.management },
      moat:       { score: moatScore, weight: W.moat },
      esg:        { score: esgScore,  weight: W.esg },
      valuation:  { score: valScore,  weight: W.valuation }
    }
  };
}

function scoreVerdict(score) {
  if (score >= 4.5) return 'Strong Buy';
  if (score >= 3.5) return 'Buy';
  if (score >= 2.5) return 'Hold';
  if (score >= 1.5) return 'Reduce';
  return 'Avoid';
}

// Score explanation — Layer 1 (rule-based, no AI needed)
function explainScore(fundamentals, breakdown, profile) {
  const lines = [];
  const { pe, grossMargin, revGrowth, beta, mosPercent } = fundamentals;
  const focus = profile?.focus || 'growth';

  if (pe < 15)        lines.push(`P/E ${pe}x is well below market average — undervalued on earnings.`);
  else if (pe > 35)   lines.push(`P/E ${pe}x is elevated — growth expectations are already priced in.`);

  if (grossMargin > 70) lines.push(`Gross margin ${grossMargin}% is elite — strong pricing power.`);
  else if (grossMargin < 30) lines.push(`Gross margin ${grossMargin}% is below average — margin pressure risk.`);

  if (revGrowth > 30) lines.push(`Revenue growth ${revGrowth}% YoY is exceptional.`);
  else if (revGrowth < 0) lines.push(`Revenue is declining ${revGrowth}% YoY — negative signal.`);

  if (beta > 1.8)     lines.push(`Beta ${beta}x — high volatility, not suited for conservative profiles.`);
  else if (beta < 0.8) lines.push(`Beta ${beta}x — low volatility, stable for conservative profiles.`);

  if (mosPercent > 15)  lines.push(`DCF shows ${mosPercent}% margin of safety — stock appears underpriced.`);
  else if (mosPercent < -10) lines.push(`DCF shows stock is ${Math.abs(mosPercent)}% above fair value.`);

  // Strategy fit note
  const fitMap = {
    value:    pe < 20   ? 'Fits your value strategy well.' : 'Valuation is stretched for a value investor.',
    growth:   revGrowth > 15 ? 'Strong growth aligns with your strategy.' : 'Growth is below your target threshold.',
    dividend: 'Check dividend yield and payout consistency in the dividend panel.',
    momentum: 'Check SMA 200 and trend signals in the chart panel.'
  };
  if (fitMap[focus]) lines.push(fitMap[focus]);

  return lines.join(' ');
}

// ===== LOCALSTORAGE HELPERS =====
function loadPortfolio() {
  try { return JSON.parse(localStorage.getItem('sr_portfolio') || '[]'); } catch(e) { return []; }
}
function savePortfolio(data) { localStorage.setItem('sr_portfolio', JSON.stringify(data)); }

function loadTrades() {
  try { return JSON.parse(localStorage.getItem('sr_trades') || '[]'); } catch(e) { return []; }
}
function saveTrades(data) { localStorage.setItem('sr_trades', JSON.stringify(data)); }

function loadWatchlist() {
  try { return JSON.parse(localStorage.getItem('sr_watchlist') || '[]'); } catch(e) { return []; }
}
function saveWatchlist(data) { localStorage.setItem('sr_watchlist', JSON.stringify(data)); }

// Add trade — stores scoreAtTime so user can compare later
function logTrade({ sym, price, qty, side, reason, currentFundamentals }) {
  const trades = loadTrades();
  const profile = getStrategyProfile();
  const scored = currentFundamentals ? calculateScore(currentFundamentals, profile) : null;
  trades.unshift({
    id:            Date.now(),
    sym:           sym.toUpperCase(),
    date:          new Date().toISOString(),
    price:         parseFloat(price),
    qty:           parseFloat(qty),
    side:          side,           // 'buy' | 'sell'
    reason:        reason || '',
    scoreAtTime:   scored ? scored.total : null,
    verdictAtTime: scored ? scoreVerdict(scored.total) : null,
    profileSnapshot: { focus: profile.focus, risk: profile.risk }
  });
  saveTrades(trades);
}

// ===== NAVIGATION =====
function showPage(page) {
  document.querySelectorAll('.f-page').forEach(p => p.classList.remove('is-active'));
  document.querySelectorAll('.f-nav-item').forEach(l => l.classList.remove('is-active'));

  const pageEl = document.getElementById('page-' + page);
  if (!pageEl) return;
  pageEl.classList.add('is-active');
  currentPage = page;

  const navId = {
    'home': null, 'markets': 'nav-markets',
    'analytics-start': 'nav-analytics', 'analytics': 'nav-analytics',
    'comparison': 'nav-comparison', 'portfolio': null, 'profile': null
  }[page];
  if (navId) document.getElementById(navId)?.classList.add('is-active');

  const tape = document.getElementById('ticker-tape');
  if (tape) tape.style.display = 'block';

  if (page === 'markets') setTimeout(loadMarketsNews, 100);
  if (page === 'profile') setTimeout(initProfilePage, 50);

  window.scrollTo(0, 0);
}

// ===== TAPE SYMBOL LOGIC =====
// Priority: portfolio symbols → watchlist → onboarding picks → empty (no fallback)
const FINNHUB_KEY = 'd8k2199r01qjgd6qgrugd8k2199r01qjgd6qgrv0';
let tapeQuotes = {};
let finnhubWS = null;

function getTapeSymbols() {
  // 1. Portfolio symbols
  const portfolio = loadPortfolio();
  const portfolioSyms = portfolio.map(p => p.sym).filter(Boolean);

  // 2. Watchlist
  const watchlist = loadWatchlist();

  // 3. Onboarding picks
  let onboarding = [];
  try { onboarding = JSON.parse(localStorage.getItem('tape_symbols') || '[]'); } catch(e) {}

  // Merge: portfolio first, then watchlist, then onboarding — deduplicated, max 12
  const merged = [...new Set([...portfolioSyms, ...watchlist, ...onboarding])].slice(0, 12);
  return merged;
}

// Onboarding categories — shown when tape is empty
const ONBOARDING_CATEGORIES = {
  'Tech & AI':    ['NVDA','AAPL','MSFT','GOOGL','META','AMD','TSLA','AMZN'],
  'Finance':      ['JPM','GS','BAC','V','MA','BRK.B','MS','AXP'],
  'Consumer':     ['COST','WMT','MCD','SBUX','NKE','AMZN','TGT','HD'],
  'Healthcare':   ['JNJ','UNH','PFE','ABBV','MRK','LLY','BMY','GILD'],
  'Energy':       ['XOM','CVX','COP','SLB','EOG','PXD','OXY','MPC'],
  'Crypto':       ['BTC','ETH','SOL','BNB','XRP','DOGE','ADA','AVAX'],
  'Index & ETF':  ['SPY','QQQ','DIA','VTI','IWM','GLD','TLT','VNQ'],
};

function saveOnboardingSymbols(syms) {
  localStorage.setItem('tape_symbols', JSON.stringify(syms));
  localStorage.setItem('tape_onboarding_done', '1');
}

function isOnboardingDone() {
  return !!localStorage.getItem('tape_onboarding_done');
}

function showTapeOnboarding() {
  // Check if modal already exists
  if (document.getElementById('tape-onboarding-modal')) return;

  const selected = new Set();

  const modal = document.createElement('div');
  modal.id = 'tape-onboarding-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:2000;background:rgba(0,0,0,.6);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:20px';

  modal.innerHTML = `
    <div style="background:var(--bg,#fff);color:var(--ink,#000);max-width:600px;width:100%;border-radius:16px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.3)">
      <div style="padding:24px 28px;border-bottom:1px solid var(--bdr,rgba(0,0,0,.1))">
        <div style="font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;opacity:.5;margin-bottom:6px">Personalise your ticker</div>
        <div style="font-size:1.4rem;font-weight:700;letter-spacing:-.03em">Which markets do you follow?</div>
        <div style="font-size:13px;opacity:.5;margin-top:4px">Select up to 12 symbols to show in your live ticker.</div>
      </div>
      <div style="padding:20px 28px;max-height:60vh;overflow-y:auto" id="tob-categories">
        ${Object.entries(ONBOARDING_CATEGORIES).map(([cat, syms]) => `
          <div style="margin-bottom:18px">
            <div style="font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;opacity:.4;margin-bottom:8px">${cat}</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px">
              ${syms.map(s => `
                <button onclick="tobToggle(this,'${s}')" data-sym="${s}"
                  style="padding:5px 13px;border-radius:999px;border:1.5px solid var(--bdr,rgba(0,0,0,.15));font-size:12px;font-weight:600;background:transparent;color:var(--ink,#000);cursor:pointer;transition:all .15s;font-family:inherit">
                  ${s}
                </button>`).join('')}
            </div>
          </div>`).join('')}
      </div>
      <div style="padding:16px 28px;border-top:1px solid var(--bdr,rgba(0,0,0,.1));display:flex;align-items:center;justify-content:space-between">
        <div style="font-size:12px;opacity:.4" id="tob-count">0 / 12 selected</div>
        <div style="display:flex;gap:10px">
          <button onclick="tobSkip()" style="padding:8px 18px;border-radius:999px;border:1.5px solid var(--bdr,rgba(0,0,0,.15));font-size:13px;font-weight:600;background:transparent;color:var(--ink,#000);cursor:pointer;font-family:inherit">Skip</button>
          <button onclick="tobConfirm()" id="tob-confirm" style="padding:8px 20px;border-radius:999px;border:none;font-size:13px;font-weight:600;background:var(--ink,#000);color:var(--bg,#fff);cursor:pointer;font-family:inherit;opacity:.4" disabled>Confirm →</button>
        </div>
      </div>
    </div>`;

  document.body.appendChild(modal);

  window.tobToggle = function(btn, sym) {
    if (selected.has(sym)) {
      selected.delete(sym);
      btn.style.background = 'transparent';
      btn.style.borderColor = 'var(--bdr,rgba(0,0,0,.15))';
      btn.style.color = 'var(--ink,#000)';
    } else {
      if (selected.size >= 12) return;
      selected.add(sym);
      btn.style.background = 'var(--ink,#000)';
      btn.style.borderColor = 'var(--ink,#000)';
      btn.style.color = 'var(--bg,#fff)';
    }
    const count = document.getElementById('tob-count');
    const confirm = document.getElementById('tob-confirm');
    if (count) count.textContent = `${selected.size} / 12 selected`;
    if (confirm) { confirm.disabled = selected.size === 0; confirm.style.opacity = selected.size > 0 ? '1' : '.4'; }
  };

  window.tobConfirm = function() {
    const syms = [...selected];
    saveOnboardingSymbols(syms);
    modal.remove();
    buildTape();
  };

  window.tobSkip = function() {
    localStorage.setItem('tape_onboarding_done', '1');
    modal.remove();
  };
}

function buildTape() {
  const inner = document.getElementById('tape-inner');
  if (!inner) return;

  const syms = getTapeSymbols();

  // Nothing selected yet — show onboarding if not done
  if (syms.length === 0) {
    if (!isOnboardingDone()) {
      setTimeout(showTapeOnboarding, 800);
    }
    inner.innerHTML = '';
    return;
  }

  renderTape(inner, syms);
  connectFinnhubWS(inner, syms);
}

function renderTape(inner, syms) {
  const fallback = {
    'NVDA':{price:'205.10',pct:'+2.30%',up:true},
    'AAPL':{price:'182.10',pct:'+0.66%',up:true},
    'MSFT':{price:'431.20',pct:'+0.79%',up:true},
    'TSLA':{price:'175.20',pct:'-3.36%',up:false},
    'AMD': {price:'160.40',pct:'+3.10%',up:true},
    'META':{price:'511.80',pct:'-0.49%',up:false},
    'AMZN':{price:'185.40',pct:'+0.60%',up:true},
    'GOOGL':{price:'175.80',pct:'+0.74%',up:true},
    'JPM': {price:'201.50',pct:'+0.40%',up:true},
    'NFLX':{price:'680.20',pct:'+0.75%',up:true},
    'BTC': {price:'68,400',pct:'-0.80%',up:false},
    'ETH': {price:'3,820',pct:'+1.20%',up:true},
  };
  const items = syms.map(sym => {
    const q = tapeQuotes[sym] || fallback[sym] || {price:'—',pct:'—',up:null};
    return `<div class="ticker-item" id="tape-${sym}">
      <span class="ticker-symbol">${sym}</span>
      <span class="ticker-price">$${q.price}</span>
      <span class="ticker-change ${q.up===true?'up':q.up===false?'dn':''}">${q.up===true?'▲':q.up===false?'▼':''} ${q.pct}</span>
    </div>`;
  });
  inner.innerHTML = [...items, ...items].join('');
}
}

function connectFinnhubWS(inner, syms) {
  if (finnhubWS) { try { finnhubWS.close(); } catch(e){} }
  try {
    finnhubWS = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_KEY}`);
    finnhubWS.onopen = () => {
      syms.forEach(sym => {
        const fsym = sym === 'BTC' ? 'BINANCE:BTCUSDT' : sym === 'ETH' ? 'BINANCE:ETHUSDT' : sym;
        finnhubWS.send(JSON.stringify({type:'subscribe', symbol: fsym}));
      });
    };
    finnhubWS.onmessage = e => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === 'trade' && msg.data) {
          msg.data.forEach(trade => {
            const sym = trade.s;
            const price = trade.p.toFixed(2);
            const prev = tapeQuotes[sym];
            const prevPrice = prev ? parseFloat(prev.price) : trade.p;
            const pct = ((trade.p - prevPrice) / prevPrice * 100).toFixed(2) + '%';
            tapeQuotes[sym] = { price, pct, up: trade.p >= prevPrice };
            const el = document.getElementById('tape-' + sym);
            if (el) {
              el.querySelector('.ticker-price').textContent = '$' + price;
              const chgEl = el.querySelector('.ticker-change');
              chgEl.textContent = (trade.p >= prevPrice ? '▲ ' : '▼ ') + Math.abs(parseFloat(pct)).toFixed(2) + '%';
              chgEl.className = 'ticker-change ' + (trade.p >= prevPrice ? 'up' : 'dn');
            }
          });
        }
      } catch(err){}
    };
    finnhubWS.onerror = () => {};
  } catch(e) {}
}

function buildMarketPulse() {
  const el = document.getElementById('market-pulse-list');
  if (!el) return;
  const syms = ['NVDA','AAPL','TSLA','MSFT','AMD'];
  el.innerHTML = syms.map(sym => {
    const q = tapeQuotes[sym];
    const price = q ? '$'+q.price : '—';
    const pct = q ? q.pct : '—';
    const cls = q ? (q.up ? 'up' : 'dn') : '';
    return `<div class="stock-row" style="padding:9px 16px;">
      <div class="sr-info"><div class="sr-sym">${sym}</div></div>
      <span class="sr-price val-mono" style="font-size:12px;">${price}</span>
      <span class="sr-chg ${cls}">${pct}</span>
    </div>`;
  }).join('');
}

// ===== FINNHUB NEWS =====
let _currentNewsCategory = 'general';
let _currentNewsArticles = [];

async function loadMarketsNews(category) {
  category = category || _currentNewsCategory;
  _currentNewsCategory = category;
  const el = document.getElementById('markets-news-feed');
  if (!el) return;
  el.innerHTML = '<div style="padding:20px;text-align:center;font-size:12px;opacity:.5;">Loading…</div>';
  try {
    const res = await fetch(`https://finnhub.io/api/v1/news?category=${category}&token=${FINNHUB_KEY}`);
    const articles = await res.json();
    if (!Array.isArray(articles) || !articles.length) throw new Error('no data');
    _currentNewsArticles = articles;
    el.innerHTML = '<div class="news-grid">' + articles.slice(0, 12).map((a, i) => {
      const date = new Date(a.datetime * 1000).toLocaleDateString([], {month:'short', day:'numeric'});
      const time = new Date(a.datetime * 1000).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
      const img = a.image
        ? `<img class="news-card-img" src="${a.image}" alt="" onerror="this.style.display='none'">`
        : `<div class="news-card-img" style="display:flex;align-items:center;justify-content:center;font-size:28px;opacity:.3;">📰</div>`;
      return `<div class="news-card" onclick="openNewsModal(${i})">
        ${img}
        <div class="news-card-body">
          <div class="news-card-source">${a.source}</div>
          <div class="news-card-title">${a.headline}</div>
          <div class="news-card-time">${date} · ${time}</div>
        </div>
      </div>`;
    }).join('') + '</div>';
  } catch(e) {
    el.innerHTML = '<div style="padding:20px;text-align:center;font-size:12px;opacity:.5;">News temporarily unavailable</div>';
  }
}

function filterNews(category, btn) {
  document.querySelectorAll('.markets-right .toggle-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  loadMarketsNews(category);
}

function openNewsModal(idx) {
  const a = _currentNewsArticles[idx];
  if (!a) return;
  const modal = document.getElementById('news-modal');
  if (!modal) return;
  const img = document.getElementById('news-modal-img');
  if (img) { img.src = a.image || ''; img.style.display = a.image ? '' : 'none'; }
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('news-modal-source', a.source);
  set('news-modal-title', a.headline);
  set('news-modal-summary', a.summary || '');
  set('news-modal-time', new Date(a.datetime * 1000).toLocaleString());
  const link = document.getElementById('news-modal-link');
  if (link) link.href = a.url;
  modal.classList.add('is-open');
}
function closeNewsModal() {
  const modal = document.getElementById('news-modal');
  if (modal) modal.classList.remove('is-open');
}

async function loadTickerNews(sym) {
  const el = document.getElementById('ticker-news-list');
  if (!el) return;
  const now = new Date().toISOString().split('T')[0];
  const from = new Date(Date.now() - 7*24*3600*1000).toISOString().split('T')[0];
  try {
    const res = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${sym}&from=${from}&to=${now}&token=${FINNHUB_KEY}`);
    const articles = await res.json();
    if (!Array.isArray(articles) || !articles.length) throw new Error('no data');
    el.innerHTML = articles.slice(0, 5).map(a => {
      const date = new Date(a.datetime * 1000).toLocaleDateString([], {month:'short', day:'numeric'});
      return `<div style="padding:9px 0;border-bottom:1px solid var(--border);">
        <div style="font-size:10px;opacity:.5;margin-bottom:3px;">${date} · ${a.source}</div>
        <a href="${a.url}" target="_blank" style="font-size:12px;text-decoration:none;line-height:1.5;display:block;">${a.headline}</a>
      </div>`;
    }).join('');
  } catch(e) {
    el.innerHTML = '<div style="font-size:11px;opacity:.5;padding:8px 0;">News unavailable</div>';
  }
}

// ===== NAV SEARCH =====
let _navSearchDebounce = null;

function toggleNavSearch() {
  const wrap = document.getElementById('nav-search-wrap');
  const inp = document.getElementById('nav-search-input');
  if (!wrap) return;
  if (wrap.classList.contains('is-open')) { closeNavSearch(); }
  else { wrap.classList.add('is-open'); setTimeout(() => inp && inp.focus(), 80); }
}
function closeNavSearch() {
  const wrap = document.getElementById('nav-search-wrap');
  const inp = document.getElementById('nav-search-input');
  const dd = document.getElementById('nav-search-dropdown');
  if (wrap) wrap.classList.remove('is-open');
  if (inp) inp.value = '';
  if (dd) dd.classList.remove('is-open');
}
function navSearchKey(e) {
  if (e.key === 'Escape') closeNavSearch();
  if (e.key === 'Enter') {
    const v = e.target.value.trim().toUpperCase();
    if (v) { closeNavSearch(); openTicker(v); }
  }
}
function navFilterSearch(q) {
  clearTimeout(_navSearchDebounce);
  const dd = document.getElementById('nav-search-dropdown');
  if (!q) { if (dd) dd.classList.remove('is-open'); return; }
  const local = SEARCH_DB.filter(x =>
    x.sym.toLowerCase().includes(q.toLowerCase()) ||
    x.name.toLowerCase().includes(q.toLowerCase())
  ).slice(0, 6);
  renderNavDropdown(local);
  _navSearchDebounce = setTimeout(async () => {
    try {
      const w = getWorkerUrl();
      const res = await fetch(`${w}/yahoo/search?q=${encodeURIComponent(q)}&limit=8`);
      if (!res.ok) return;
      const data = await res.json();
      const quotes = (data.quotes || data.results || []).filter(r => r.symbol).slice(0, 8)
        .map(r => ({ sym: r.symbol, name: r.shortname || r.longname || r.symbol, type: r.quoteType || 'Stock' }));
      if (quotes.length) renderNavDropdown(quotes);
    } catch(e) {}
  }, 250);
}
function renderNavDropdown(items) {
  const dd = document.getElementById('nav-search-dropdown');
  if (!dd) return;
  if (!items.length) { dd.classList.remove('is-open'); return; }
  dd.innerHTML = items.map(x => `
    <div class="sm-result-item" onmousedown="event.preventDefault();closeNavSearch();openTicker('${x.sym}')">
      <span class="sri-sym">${x.sym}</span>
      <span class="sri-name">${x.name}</span>
      <span class="sri-type">${x.type}</span>
    </div>`).join('');
  dd.classList.add('is-open');
}

// Legacy aliases
function openSearch() { toggleNavSearch(); }
function closeSearch(e) { if (e && e.target && e.target.id === 'search-modal') closeNavSearch(); }
function filterSearch(q) { navFilterSearch(q); }
function renderSearchResults(items) { renderNavDropdown(items); }
function selectResult(sym) { closeNavSearch(); openTicker(sym); }
function handleSearchKey(e) { navSearchKey(e); }

document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); toggleNavSearch(); }
  if (e.key === 'Escape') { closeNavSearch(); closeNewsModal(); }
});

// ===== WORKER =====
function getWorkerUrl() {
  return (localStorage.getItem('sr_workerurl') || 'https://fragrant-wave-6bd7.d-lenz-contact.workers.dev').replace(/\/+$/, '');
}

// ===== SEARCH DB =====
const SEARCH_DB = [
  {sym:'NVDA', name:'Nvidia Corporation', type:'Stock'},
  {sym:'AAPL', name:'Apple Inc.', type:'Stock'},
  {sym:'MSFT', name:'Microsoft Corporation', type:'Stock'},
  {sym:'AMD', name:'Advanced Micro Devices', type:'Stock'},
  {sym:'TSLA', name:'Tesla Inc.', type:'Stock'},
  {sym:'GOOGL', name:'Alphabet Inc.', type:'Stock'},
  {sym:'META', name:'Meta Platforms', type:'Stock'},
  {sym:'AMZN', name:'Amazon.com', type:'Stock'},
  {sym:'COST', name:'Costco Wholesale', type:'Stock'},
  {sym:'INTC', name:'Intel Corporation', type:'Stock'},
  {sym:'JPM', name:'JPMorgan Chase', type:'Stock'},
  {sym:'LLY', name:'Eli Lilly', type:'Stock'},
  {sym:'BTC-USD', name:'Bitcoin USD', type:'Crypto'},
];

// ===== OPEN TICKER =====
function openTicker(sym) {
  currentTicker = sym;
  showPage('analytics');
  loadTickerData(sym);
}

// ===== TICKER DATA (FMP + Yahoo fallback) =====
let fmpCache = {};

async function loadTickerData(sym) {
  const loading = document.getElementById('analytics-loading');
  const content = document.getElementById('analytics-content');
  const loadingSym = document.getElementById('loading-sym');
  if (loadingSym) loadingSym.textContent = sym;
  if (loading) loading.style.display = 'block';
  if (content) content.style.display = 'none';

  try {
    const apiKey = localStorage.getItem('fmpApiKey') || 'demo';
    let quoteData = null;
    if (fmpCache[sym] && Date.now() - fmpCache[sym].ts < 3600000) {
      quoteData = fmpCache[sym].data;
    } else {
      try {
        const res = await fetch(`https://financialmodelingprep.com/api/v3/quote/${sym}?apikey=${apiKey}`);
        const json = await res.json();
        if (Array.isArray(json) && json.length > 0) {
          quoteData = json[0];
          fmpCache[sym] = { data: quoteData, ts: Date.now() };
        }
      } catch(e) {}
    }
    updateAnalyticsUI(sym, quoteData);
    setTimeout(() => loadTickerNews(sym), 200);
  } catch(e) {
    updateAnalyticsUI(sym, null);
  }

  if (loading) loading.style.display = 'none';
  if (content) content.style.display = 'block';
  drawPriceChart(sym);
}

const _priceMap = {
  'NVDA': {price:205.10,chg:4.62,pct:2.30,name:'Nvidia Corporation',exch:'NASDAQ',sector:'Semiconductor'},
  'AAPL': {price:182.10,chg:1.20,pct:0.66,name:'Apple Inc.',exch:'NASDAQ',sector:'Consumer Electronics'},
  'MSFT': {price:431.20,chg:3.40,pct:0.79,name:'Microsoft Corporation',exch:'NASDAQ',sector:'Software'},
  'AMD':  {price:160.40,chg:4.80,pct:3.10,name:'Advanced Micro Devices',exch:'NASDAQ',sector:'Semiconductor'},
  'TSLA': {price:175.20,chg:-6.10,pct:-3.36,name:'Tesla Inc.',exch:'NASDAQ',sector:'Automotive'},
  'INTC': {price:31.15,chg:1.58,pct:5.10,name:'Intel Corporation',exch:'NASDAQ',sector:'Semiconductor'},
  'COST': {price:918.40,chg:5.20,pct:0.57,name:'Costco Wholesale',exch:'NASDAQ',sector:'Retail'},
};

function updateAnalyticsUI(sym, data) {
  let p = _priceMap[sym] || {price:100.00,chg:1.00,pct:1.00,name:sym,exch:'NYSE',sector:'Equity'};
  if (data && data.price) {
    p = {...p, price:data.price, chg:data.change, pct:data.changesPercentage, name:data.name||p.name};
  }
  const up = p.chg >= 0;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('a-ticker-sym', `${sym} · ${p.exch}`);
  set('a-ticker-price', `$${p.price.toFixed(2)}`);
  set('a-ticker-change', `${up?'+':''}$${p.chg.toFixed(2)} (${up?'+':''}${p.pct.toFixed(2)}%)`);
  const chgEl = document.getElementById('a-ticker-change');
  if (chgEl) chgEl.className = 'ticker-change-big ' + (up ? 'up' : 'dn');
  set('a-ticker-meta', `${p.name} · ${p.sector} · Live`);
  set('dcf-current', `$${p.price.toFixed(2)}`);
}

// ===== PRICE CHART =====
function drawPriceChart(sym) {
  const canvas = document.getElementById('price-chart-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';
  ctx.scale(dpr, dpr);
  const W = rect.width, H = rect.height;

  const seed = sym.charCodeAt(0) + sym.charCodeAt(Math.min(1, sym.length - 1));
  const pts = [];
  let v = 150 + (seed % 80);
  for (let i = 0; i < 60; i++) { v += (Math.random() - 0.44) * (v * 0.03); pts.push(v); }
  const mn = Math.min(...pts) * 0.97, mx = Math.max(...pts) * 1.03;
  const toX = i => (i / (pts.length - 1)) * (W - 16) + 8;
  const toY = v => H - 12 - ((v - mn) / (mx - mn)) * (H - 24);

  const sma = pts.slice(0, 40).reduce((a,b) => a+b, 0) / 40;
  ctx.beginPath(); ctx.strokeStyle = 'rgba(124,108,252,0.35)'; ctx.lineWidth = 1;
  ctx.setLineDash([4,3]); ctx.moveTo(8, toY(sma)); ctx.lineTo(W-8, toY(sma)); ctx.stroke();
  ctx.setLineDash([]);

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, isDark ? 'rgba(45,202,114,0.2)' : 'rgba(45,202,114,0.15)');
  grad.addColorStop(1, 'rgba(45,202,114,0)');
  ctx.beginPath();
  pts.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
  ctx.lineTo(toX(pts.length-1), H); ctx.lineTo(toX(0), H); ctx.closePath();
  ctx.fillStyle = grad; ctx.fill();

  ctx.beginPath(); ctx.strokeStyle = '#2dca72'; ctx.lineWidth = 2; ctx.lineJoin = 'round';
  pts.forEach((v, i) => i === 0 ? ctx.moveTo(toX(i), toY(v)) : ctx.lineTo(toX(i), toY(v)));
  ctx.stroke();
  ctx.beginPath(); ctx.arc(toX(pts.length-1), toY(pts[pts.length-1]), 4, 0, Math.PI*2);
  ctx.fillStyle = '#2dca72'; ctx.fill();
}

// ===== DCF SLIDERS =====
function updateDCF() {
  const get = id => parseFloat(document.getElementById(id)?.value || 0);
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  const g = get('sl-growth'), m = get('sl-margin'), w = get('sl-wacc');
  set('sl-growth-val', g.toFixed(1) + '%');
  set('sl-margin-val', m.toFixed(1) + '%');
  set('sl-wacc-val', w.toFixed(1) + '%');
  const fv = Math.round((253490 * (m/100) * (1 + g/100) * 5) / (w/100) / 1000);
  const mos = ((fv - 205.10) / 205.10 * 100).toFixed(1);
  const pos = parseFloat(mos) >= 0;
  const fvEl = document.getElementById('dcf-fair');
  if (fvEl) { fvEl.textContent = `$${fv}`; fvEl.style.color = pos ? 'var(--green)' : 'var(--red)'; }
  const mosEl = document.getElementById('dcf-mos');
  if (mosEl) { mosEl.textContent = `MoS: ${pos?'+':''}${mos}% ${pos?'Underpriced':'Overpriced'}`; mosEl.style.color = pos ? 'var(--green)' : 'var(--red)'; }
  const dockFair = document.getElementById('dock-fair');
  if (dockFair) dockFair.textContent = `$${fv}`;
  const base = document.getElementById('dcf-base-case');
  if (base) { base.textContent = `$${fv} (${pos?'+':''}${mos}%)`; base.style.color = pos ? 'var(--green)' : 'var(--red)'; }
}

// ===== COMPARISON =====
function launchComparison() {
  const s1 = document.getElementById('comp-slot1')?.value.toUpperCase();
  const s2 = document.getElementById('comp-slot2')?.value.toUpperCase();
  const s3 = document.getElementById('comp-slot3')?.value.toUpperCase();
  const headers = document.querySelectorAll('.comp-col-sym');
  if (headers[1]) headers[1].textContent = s1 || '—';
  if (headers[2]) headers[2].textContent = s2 || '—';
  if (headers[3]) headers[3].textContent = s3 || '—';
}
function loadComparison(s1, s2, s3) {
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
  set('comp-slot1', s1); set('comp-slot2', s2); set('comp-slot3', s3);
  launchComparison();
}

// ===== HERO / ANALYTICS SEARCH =====
function heroSearch() {
  const v = document.getElementById('hero-search')?.value.trim().toUpperCase();
  if (v) openTicker(v);
}
function heroSearchKey(e) { if (e.key === 'Enter') heroSearch(); }
function analyticsSearch() {
  const v = document.getElementById('analytics-search-input')?.value.trim().toUpperCase();
  if (v) openTicker(v);
}
function analyticsSearchKey(e) { if (e.key === 'Enter') analyticsSearch(); }

// ===== THEME =====
function toggleTheme() {
  const cur = document.documentElement.getAttribute('data-theme');
  setTheme(cur === 'dark' ? 'light' : 'dark');
}
function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  document.getElementById('theme-dark-btn')?.classList.toggle('active', t === 'dark');
  document.getElementById('theme-light-btn')?.classList.toggle('active', t !== 'dark');
}

// ===== API KEY =====
function toggleApiKey() {
  apiKeyRevealed = !apiKeyRevealed;
  const stored = localStorage.getItem('fmpApiKey') || '';
  const el = document.getElementById('api-key-display');
  if (el) el.textContent = apiKeyRevealed ? (stored || '(no key set)') : '•••••••••••••••••••••••••••';
}

// ===== PROFILE PAGE =====
function initProfilePage() {
  const profile = getStrategyProfile();

  // Find the profile container — works across all designs
  const container = document.getElementById('strategy-profile-ui')
    || document.getElementById('pg-profile')
    || document.getElementById('view-profile');
  if (!container) return;

  // Check if already rendered
  if (container.querySelector('.sp-rendered')) return;

  const weights = getEffectiveWeights(profile);

  const html = `<div class="sp-rendered" style="margin-top:24px">
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.14em;opacity:.5;margin-bottom:16px">Strategy Profile</div>

    <!-- Investor Type -->
    <div style="margin-bottom:20px">
      <div style="font-size:12px;opacity:.6;margin-bottom:8px">Investment Focus</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap" id="sp-focus-btns">
        ${['value','growth','dividend','momentum'].map(f => `
          <button onclick="spSetFocus('${f}')" id="sp-focus-${f}"
            style="padding:6px 16px;border-radius:999px;border:1px solid currentColor;font-size:12px;font-weight:600;cursor:pointer;background:${profile.focus===f?'var(--ink,#000)':'transparent'};color:${profile.focus===f?'var(--bg,#fff)':'inherit'};opacity:${profile.focus===f?'1':'.5'};transition:all .15s">
            ${f.charAt(0).toUpperCase()+f.slice(1)}
          </button>`).join('')}
      </div>
      <div id="sp-focus-desc" style="font-size:11px;opacity:.5;margin-top:8px">${spFocusDesc(profile.focus)}</div>
    </div>

    <!-- Horizon -->
    <div style="margin-bottom:20px">
      <div style="font-size:12px;opacity:.6;margin-bottom:8px">Investment Horizon</div>
      <div style="display:flex;gap:8px" id="sp-horizon-btns">
        ${['short','medium','long'].map(h => `
          <button onclick="spSetHorizon('${h}')" id="sp-horizon-${h}"
            style="padding:6px 16px;border-radius:999px;border:1px solid currentColor;font-size:12px;font-weight:600;cursor:pointer;background:${profile.horizon===h?'var(--ink,#000)':'transparent'};color:${profile.horizon===h?'var(--bg,#fff)':'inherit'};opacity:${profile.horizon===h?'1':'.5'};transition:all .15s">
            ${h.charAt(0).toUpperCase()+h.slice(1)}
          </button>`).join('')}
      </div>
    </div>

    <!-- Risk -->
    <div style="margin-bottom:24px">
      <div style="font-size:12px;opacity:.6;margin-bottom:8px">Risk Tolerance</div>
      <div style="display:flex;gap:8px" id="sp-risk-btns">
        ${['conservative','moderate','aggressive'].map(r => `
          <button onclick="spSetRisk('${r}')" id="sp-risk-${r}"
            style="padding:6px 16px;border-radius:999px;border:1px solid currentColor;font-size:12px;font-weight:600;cursor:pointer;background:${profile.risk===r?'var(--ink,#000)':'transparent'};color:${profile.risk===r?'var(--bg,#fff)':'inherit'};opacity:${profile.risk===r?'1':'.5'};transition:all .15s">
            ${r.charAt(0).toUpperCase()+r.slice(1)}
          </button>`).join('')}
      </div>
    </div>

    <!-- Weight Sliders -->
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.14em;opacity:.5;margin-bottom:14px">Score Weights (auto-adjusted by focus)</div>
    ${[
      ['ratios',    'Financial Ratios'],
      ['management','Management'],
      ['moat',      'Moat & Competitive'],
      ['esg',       'ESG & Risk'],
      ['valuation', 'Valuation / DCF']
    ].map(([k,label]) => `
      <div style="margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px">
          <span style="opacity:.7">${label}</span>
          <span id="sp-w-val-${k}" style="font-weight:700">${weights[k]}%</span>
        </div>
        <input type="range" id="sp-w-${k}" min="0" max="80" value="${weights[k]}"
          oninput="spUpdateWeight('${k}', this.value)"
          style="width:100%;height:3px;accent-color:var(--accent,var(--P,#6f5ef5))">
      </div>`).join('')}

    <div style="font-size:11px;opacity:.4;margin-top:4px" id="sp-weight-total">Total: ${Object.values(weights).reduce((a,b)=>a+b,0)}%</div>
    <button onclick="spResetWeights()" style="margin-top:14px;padding:7px 18px;border-radius:999px;border:1px solid currentColor;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;background:transparent;cursor:pointer;opacity:.6">Reset to Focus Defaults</button>
  </div>`;

  container.insertAdjacentHTML('beforeend', html);
}

function spFocusDesc(focus) {
  return {
    value:    'Rewards low P/E, penalises high multiples. Boosts Ratios & Valuation weights.',
    growth:   'Rewards revenue growth, tolerates high multiples. Boosts Ratios & Moat.',
    dividend: 'Rewards yield and payout consistency. Boosts ESG & Valuation.',
    momentum: 'Rewards trend strength and market position. Boosts Moat, reduces Ratios.'
  }[focus] || '';
}

function spSetFocus(focus) {
  const p = getStrategyProfile(); p.focus = focus; saveStrategyProfile(p);
  // Update buttons
  ['value','growth','dividend','momentum'].forEach(f => {
    const btn = document.getElementById('sp-focus-' + f);
    if (!btn) return;
    btn.style.background = f === focus ? 'var(--ink,#000)' : 'transparent';
    btn.style.color      = f === focus ? 'var(--bg,#fff)'  : 'inherit';
    btn.style.opacity    = f === focus ? '1' : '.5';
  });
  const desc = document.getElementById('sp-focus-desc');
  if (desc) desc.textContent = spFocusDesc(focus);
  // Refresh weight sliders to show new auto-weights
  const w = getEffectiveWeights(p);
  ['ratios','management','moat','esg','valuation'].forEach(k => {
    const sl = document.getElementById('sp-w-' + k); if (sl) sl.value = w[k];
    const vl = document.getElementById('sp-w-val-' + k); if (vl) vl.textContent = w[k] + '%';
  });
  const tot = document.getElementById('sp-weight-total');
  if (tot) tot.textContent = 'Total: ' + Object.values(w).reduce((a,b)=>a+b,0) + '%';
}

function spSetHorizon(horizon) {
  const p = getStrategyProfile(); p.horizon = horizon; saveStrategyProfile(p);
  ['short','medium','long'].forEach(h => {
    const btn = document.getElementById('sp-horizon-' + h); if (!btn) return;
    btn.style.background = h === horizon ? 'var(--ink,#000)' : 'transparent';
    btn.style.color      = h === horizon ? 'var(--bg,#fff)'  : 'inherit';
    btn.style.opacity    = h === horizon ? '1' : '.5';
  });
}

function spSetRisk(risk) {
  const p = getStrategyProfile(); p.risk = risk; saveStrategyProfile(p);
  ['conservative','moderate','aggressive'].forEach(r => {
    const btn = document.getElementById('sp-risk-' + r); if (!btn) return;
    btn.style.background = r === risk ? 'var(--ink,#000)' : 'transparent';
    btn.style.color      = r === risk ? 'var(--bg,#fff)'  : 'inherit';
    btn.style.opacity    = r === risk ? '1' : '.5';
  });
}

function spUpdateWeight(key, val) {
  const p = getStrategyProfile();
  if (!p.scoreWeights) p.scoreWeights = {};
  p.scoreWeights[key] = parseInt(val);
  saveStrategyProfile(p);
  const vl = document.getElementById('sp-w-val-' + key);
  if (vl) vl.textContent = val + '%';
  // Update total display
  const w = getEffectiveWeights(p);
  const tot = document.getElementById('sp-weight-total');
  if (tot) tot.textContent = 'Total: ' + Object.values(w).reduce((a,b)=>a+b,0) + '%';
}

function spResetWeights() {
  const p = getStrategyProfile();
  delete p.scoreWeights;
  saveStrategyProfile(p);
  const w = getEffectiveWeights(p);
  ['ratios','management','moat','esg','valuation'].forEach(k => {
    const sl = document.getElementById('sp-w-' + k); if (sl) sl.value = w[k];
    const vl = document.getElementById('sp-w-val-' + k); if (vl) vl.textContent = w[k] + '%';
  });
  const tot = document.getElementById('sp-weight-total');
  if (tot) tot.textContent = 'Total: ' + Object.values(w).reduce((a,b)=>a+b,0) + '%';
}

// ===== MISC =====
function addToPortfolio() { alert(`${currentTicker} added to portfolio!`); }
function scrollToSection(id) { document.getElementById(id)?.scrollIntoView({behavior:'smooth', block:'start'}); }
function quickSearch(sym) { openTicker(sym); }

// ===== TOGGLE BTN GROUPS =====
document.addEventListener('click', e => {
  const btn = e.target.closest('.toggle-btn');
  if (!btn) return;
  const group = btn.closest('.panel-head');
  if (!group) return;
  group.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
});

// ===== INIT =====
(function init() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.getElementById('theme-dark-btn')?.classList.toggle('active', savedTheme === 'dark');
  document.getElementById('theme-light-btn')?.classList.toggle('active', savedTheme === 'light');

  buildTape();
  buildMarketPulse();
  showPage('home');

  window.addEventListener('resize', () => {
    if (currentPage === 'analytics') drawPriceChart(currentTicker);
  });
})();
