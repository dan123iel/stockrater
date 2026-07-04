import { useState, useEffect, useRef, useCallback } from 'react';
import TileWrapper from '../TileWrapper';
import { fetchHistoricalPrice } from '../../lib/fmp';

const PERIODS = ['1M', '3M', '6M', '1Y'];

function filterByPeriod(data, period) {
  const days = { '1M': 21, '3M': 63, '6M': 126, '1Y': 252 };
  return data.slice(-(days[period] || 252));
}

function formatPrice(v) {
  return v >= 1000 ? v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                   : v.toFixed(2);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ChartTile({ ticker, compact }) {
  const [priceData, setPriceData]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [period, setPeriod]         = useState('1Y');
  const [tooltip, setTooltip]       = useState(null); // { x, y, price, date, change, changePct }
  const canvasRef  = useRef(null);
  const layoutRef  = useRef(null); // stores last draw layout for hit-testing

  useEffect(() => {
    if (!ticker) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    fetchHistoricalPrice(ticker)
      .then(data => { setPriceData(data.slice(0, 252).reverse()); setLoading(false); })
      .catch(err  => { setError(err.message); setLoading(false); });
  }, [ticker]);

  const draw = useCallback((canvas, data, p) => {
    const filtered = filterByPeriod(data, p);
    if (!filtered.length || !canvas) return;

    const ctx  = canvas.getContext('2d');
    const dpr  = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width  = rect.width  * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const W = rect.width;
    const H = rect.height;

    const prices    = filtered.map(d => d.close);
    const first     = prices[0];
    const last      = prices[prices.length - 1];
    const isPos     = last >= first;
    const lineColor = isPos ? '#16a34a' : '#dc2626';
    const fillColor = isPos ? 'rgba(22,163,74,0.06)' : 'rgba(220,38,38,0.06)';

    const minP = Math.min(...prices);
    const maxP = Math.max(...prices);
    const pad  = { minP: minP * 0.995, maxP: maxP * 1.005 };

    const PAD = { top: 44, right: 64, bottom: 32, left: 12 };
    const cW  = W - PAD.left - PAD.right;
    const cH  = H - PAD.top  - PAD.bottom;

    const xOf = i  => PAD.left + (i / (filtered.length - 1)) * cW;
    const yOf = v  => PAD.top  + (1 - (v - pad.minP) / (pad.maxP - pad.minP)) * cH;

    // store layout for hover
    layoutRef.current = { filtered, PAD, cW, cH, xOf, yOf, W, H };

    // ── background
    ctx.clearRect(0, 0, W, H);

    // ── header: current price + change
    const change    = last - first;
    const changePct = (change / first) * 100;
    ctx.font        = 'bold 18px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle   = '#0f0f0e';
    ctx.textAlign   = 'left';
    ctx.fillText('$' + formatPrice(last), PAD.left, 22);

    const tag = `${change >= 0 ? '+' : ''}${formatPrice(change)}  (${changePct >= 0 ? '+' : ''}${changePct.toFixed(2)}%)  ${p}`;
    ctx.font      = '11px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.fillStyle = lineColor;
    ctx.fillText(tag, PAD.left + 4 + ctx.measureText('$' + formatPrice(last)).width + 6, 21);

    // ── horizontal grid lines (5 levels) + right-axis price labels
    ctx.lineWidth   = 0.5;
    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.fillStyle   = 'rgba(0,0,0,0.35)';
    ctx.font        = '10px "IBM Plex Mono", monospace';
    ctx.textAlign   = 'left';

    for (let i = 0; i <= 4; i++) {
      const y   = PAD.top + (i / 4) * cH;
      const val = pad.maxP - (i / 4) * (pad.maxP - pad.minP);
      ctx.beginPath();
      ctx.moveTo(PAD.left, y);
      ctx.lineTo(PAD.left + cW, y);
      ctx.stroke();
      ctx.fillText('$' + formatPrice(val), PAD.left + cW + 6, y + 4);
    }

    // ── fill area
    const grad = ctx.createLinearGradient(0, PAD.top, 0, PAD.top + cH);
    grad.addColorStop(0, fillColor);
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.moveTo(xOf(0), yOf(prices[0]));
    filtered.forEach((d, i) => ctx.lineTo(xOf(i), yOf(d.close)));
    ctx.lineTo(xOf(filtered.length - 1), PAD.top + cH);
    ctx.lineTo(PAD.left, PAD.top + cH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // ── price line
    ctx.strokeStyle = lineColor;
    ctx.lineWidth   = 1.5;
    ctx.lineJoin    = 'round';
    ctx.beginPath();
    filtered.forEach((d, i) => {
      if (i === 0) ctx.moveTo(xOf(i), yOf(d.close));
      else         ctx.lineTo(xOf(i), yOf(d.close));
    });
    ctx.stroke();

    // ── last price marker (dot)
    const lx = xOf(filtered.length - 1);
    const ly = yOf(last);
    ctx.beginPath();
    ctx.arc(lx, ly, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = lineColor;
    ctx.fill();

    // ── x-axis date labels
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.font      = '10px "IBM Plex Mono", monospace';
    ctx.textAlign = 'center';
    const steps   = Math.min(5, filtered.length);
    for (let i = 0; i < steps; i++) {
      const idx = Math.round((i / (steps - 1)) * (filtered.length - 1));
      const d   = filtered[idx];
      if (!d) continue;
      const label = new Date(d.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      ctx.fillText(label, xOf(idx), H - 8);
    }
  }, []);

  useEffect(() => {
    if (!priceData.length || !canvasRef.current) return;
    draw(canvasRef.current, priceData, period);
  }, [priceData, period, draw]);

  // ── hover handler
  const onMouseMove = useCallback((e) => {
    const layout = layoutRef.current;
    if (!layout || !priceData.length) return;
    const { filtered, PAD, cW, xOf, yOf } = layout;
    const rect  = canvasRef.current.getBoundingClientRect();
    const mx    = e.clientX - rect.left;
    const my    = e.clientY - rect.top;

    if (mx < PAD.left || mx > PAD.left + cW) { setTooltip(null); return; }

    // find nearest candle
    const idx    = Math.round(((mx - PAD.left) / cW) * (filtered.length - 1));
    const clamped = Math.max(0, Math.min(idx, filtered.length - 1));
    const d      = filtered[clamped];
    if (!d) return;

    const first     = filtered[0].close;
    const change    = d.close - first;
    const changePct = (change / first) * 100;

    setTooltip({
      x: xOf(clamped),
      y: yOf(d.close),
      price: d.close,
      date: d.date,
      change,
      changePct,
    });

    // draw crosshair
    if (!canvasRef.current) return;
    draw(canvasRef.current, priceData, period);
    const ctx  = canvasRef.current.getContext('2d');
    const dpr  = window.devicePixelRatio || 1;
    const cx   = xOf(clamped) * dpr;
    const cy   = yOf(d.close) * dpr;
    const H    = layout.H * dpr;
    const top  = PAD.top * dpr;

    ctx.save();
    ctx.strokeStyle = 'rgba(0,0,0,0.18)';
    ctx.lineWidth   = 1 * dpr;
    ctx.setLineDash([4 * dpr, 4 * dpr]);
    ctx.beginPath();
    ctx.moveTo(cx, top);
    ctx.lineTo(cx, H - PAD.bottom * dpr);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.arc(cx, cy, 5 * dpr, 0, Math.PI * 2);
    const isPos     = filtered[filtered.length - 1].close >= filtered[0].close;
    ctx.fillStyle   = isPos ? '#16a34a' : '#dc2626';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth   = 2 * dpr;
    ctx.stroke();
    ctx.restore();
  }, [priceData, period, draw]);

  const onMouseLeave = useCallback(() => {
    setTooltip(null);
    if (canvasRef.current && priceData.length) draw(canvasRef.current, priceData, period);
  }, [priceData, period, draw]);

  // compact mode (used in scorecard overview)
  if (compact) return (
    <div style={{ position: 'relative', padding: '0 0 4px' }}>
      {error && <div style={{ padding: '20px', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: 0.4 }}>{error}</div>}
      {!error && <canvas ref={canvasRef} style={{ width: '100%', height: '160px', display: 'block' }} />}
    </div>
  );

  return (
    <TileWrapper
      title="Price Chart"
      loading={loading}
      error={error}
      action={
        <div className="flex gap-1">
          {PERIODS.map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              fontFamily: 'IBM Plex Mono', fontSize: '10px', letterSpacing: '0.08em',
              padding: '3px 8px',
              background: period === p ? '#0f0f0e' : 'transparent',
              color:      period === p ? '#fff'    : '#0f0f0e',
              border: '0.5px solid rgba(0,0,0,0.15)',
              borderRadius: '2px',
              cursor: 'pointer',
              opacity: period === p ? 1 : 0.45,
              transition: 'all 0.12s ease',
            }}>{p}</button>
          ))}
        </div>
      }
    >
      <div style={{ padding: '12px 16px 8px', position: 'relative' }}>
        <canvas
          ref={canvasRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{ width: '100%', height: '240px', display: 'block', cursor: 'crosshair' }}
        />

        {/* Hover tooltip */}
        {tooltip && (
          <div style={{
            position:   'absolute',
            left:       Math.min(tooltip.x + 12, 999),
            top:        Math.max(tooltip.y - 40, 48),
            background: '#0f0f0e',
            color:      '#fff',
            padding:    '6px 10px',
            borderRadius: '3px',
            fontSize:   '11px',
            fontFamily: 'IBM Plex Mono, monospace',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            zIndex: 10,
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
          }}>
            <div style={{ fontWeight: 700, marginBottom: 2 }}>${formatPrice(tooltip.price)}</div>
            <div style={{ opacity: 0.6, fontSize: '10px' }}>{formatDate(tooltip.date)}</div>
            <div style={{
              marginTop: 3,
              color: tooltip.change >= 0 ? '#4ade80' : '#f87171',
              fontSize: '10px',
            }}>
              {tooltip.change >= 0 ? '+' : ''}{formatPrice(tooltip.change)} ({tooltip.changePct >= 0 ? '+' : ''}{tooltip.changePct.toFixed(2)}%)
            </div>
          </div>
        )}

        <p style={{
          marginTop: '6px', fontFamily: 'IBM Plex Mono', fontSize: '10px',
          opacity: 0.3, textAlign: 'right', letterSpacing: '0.03em',
        }}>
          Price data: Yahoo Finance · Adjusted close
        </p>
      </div>
    </TileWrapper>
  );
}
