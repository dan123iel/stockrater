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

// ===== NAVIGATION =====
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  const pageEl = document.getElementById('page-' + page);
  if (!pageEl) return;
  pageEl.classList.add('active');
  currentPage = page;

  const navId = {
    'home': null, 'markets': 'nav-markets',
    'analytics-start': 'nav-analytics', 'analytics': 'nav-analytics',
    'comparison': 'nav-comparison', 'portfolio': null, 'profile': null
  }[page];
  if (navId) document.getElementById(navId)?.classList.add('active');

  const tape = document.getElementById('ticker-tape');
  if (tape) tape.style.display = 'block';

  if (page === 'markets') setTimeout(loadMarketsNews, 100);

  window.scrollTo(0, 0);
}

// ===== FINNHUB =====
const FINNHUB_KEY = 'd8k2199r01qjgd6qgrugd8k2199r01qjgd6qgrv0';
const TAPE_SYMBOLS = ['NVDA','AAPL','MSFT','TSLA','AMD','META','AMZN','GOOGL','JPM','NFLX'];
let tapeQuotes = {};
let finnhubWS = null;

function buildTape() {
  const inner = document.getElementById('tape-inner');
  if (!inner) return;
  renderTape(inner);
  connectFinnhubWS(inner);
}

function renderTape(inner) {
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
  };
  const items = TAPE_SYMBOLS.map(sym => {
    const q = tapeQuotes[sym] || fallback[sym] || {price:'—',pct:'0%',up:null};
    return `<div class="ticker-item" id="tape-${sym}">
      <span class="ticker-symbol">${sym}</span>
      <span class="ticker-price">$${q.price}</span>
      <span class="ticker-change ${q.up===true?'up':q.up===false?'dn':''}">${q.up===true?'▲':'▼'} ${q.pct}</span>
    </div>`;
  });
  inner.innerHTML = [...items, ...items].join('');
}

function connectFinnhubWS(inner) {
  if (finnhubWS) { try { finnhubWS.close(); } catch(e){} }
  try {
    finnhubWS = new WebSocket(`wss://ws.finnhub.io?token=${FINNHUB_KEY}`);
    finnhubWS.onopen = () => {
      TAPE_SYMBOLS.forEach(sym => finnhubWS.send(JSON.stringify({type:'subscribe', symbol:sym})));
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
  modal.classList.add('open');
}
function closeNewsModal() {
  const modal = document.getElementById('news-modal');
  if (modal) modal.classList.remove('open');
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
  if (wrap.classList.contains('open')) { closeNavSearch(); }
  else { wrap.classList.add('open'); setTimeout(() => inp && inp.focus(), 80); }
}
function closeNavSearch() {
  const wrap = document.getElementById('nav-search-wrap');
  const inp = document.getElementById('nav-search-input');
  const dd = document.getElementById('nav-search-dropdown');
  if (wrap) wrap.classList.remove('open');
  if (inp) inp.value = '';
  if (dd) dd.classList.remove('open');
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
  if (!q) { if (dd) dd.classList.remove('open'); return; }
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
  if (!items.length) { dd.classList.remove('open'); return; }
  dd.innerHTML = items.map(x => `
    <div class="sm-result-item" onmousedown="event.preventDefault();closeNavSearch();openTicker('${x.sym}')">
      <span class="sri-sym">${x.sym}</span>
      <span class="sri-name">${x.name}</span>
      <span class="sri-type">${x.type}</span>
    </div>`).join('');
  dd.classList.add('open');
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
