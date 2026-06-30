import { useState, useEffect, useRef } from 'react';
import TileWrapper from '../TileWrapper';
import { fetchHistoricalPrice } from '../../lib/fmp';

export default function ChartTile({ ticker, apiKey, loading: parentLoading, error: parentError, compact }) {
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [period, setPeriod] = useState('1Y');
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!ticker || !apiKey) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    fetchHistoricalPrice(ticker, apiKey)
      .then(data => {
        setPriceData(data.slice(0, 252).reverse());
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [ticker, apiKey]);

  useEffect(() => {
    if (!priceData.length || !canvasRef.current) return;
    drawChart(canvasRef.current, priceData, period);
  }, [priceData, period]);

  const drawChart = (canvas, data, p) => {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;

    let filtered = data;
    if (p === '3M') filtered = data.slice(-63);
    else if (p === '6M') filtered = data.slice(-126);
    else if (p === '1Y') filtered = data.slice(-252);

    if (!filtered.length) return;

    ctx.clearRect(0, 0, w, h);

    const prices = filtered.map(d => d.close);
    const minP = Math.min(...prices) * 0.97;
    const maxP = Math.max(...prices) * 1.03;
    const pad = { top: 20, right: 20, bottom: 40, left: 55 };
    const chartW = w - pad.left - pad.right;
    const chartH = h - pad.top - pad.bottom;

    const xScale = (i) => pad.left + (i / (filtered.length - 1)) * chartW;
    const yScale = (p) => pad.top + (1 - (p - minP) / (maxP - minP)) * chartH;

    ctx.strokeStyle = 'rgba(232,231,227,0.8)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 4; i++) {
      const y = pad.top + (i / 4) * chartH;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.stroke();
      const val = maxP - (i / 4) * (maxP - minP);
      ctx.fillStyle = 'rgba(15,15,14,0.4)';
      ctx.font = '10px IBM Plex Mono';
      ctx.textAlign = 'right';
      ctx.fillText(val.toFixed(0), pad.left - 6, y + 4);
    }

    const sma50 = prices.map((_, i) => {
      if (i < 49) return null;
      return prices.slice(i - 49, i + 1).reduce((a, b) => a + b, 0) / 50;
    });

    ctx.strokeStyle = 'rgba(63,119,255,0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    let started50 = false;
    sma50.forEach((v, i) => {
      if (v === null) return;
      if (!started50) { ctx.moveTo(xScale(i), yScale(v)); started50 = true; }
      else ctx.lineTo(xScale(i), yScale(v));
    });
    ctx.stroke();
    ctx.setLineDash([]);

    const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    const isPositive = prices[prices.length - 1] >= prices[0];
    gradient.addColorStop(0, isPositive ? 'rgba(63,119,255,0.12)' : 'rgba(230,57,70,0.08)');
    gradient.addColorStop(1, 'rgba(247,246,242,0)');

    ctx.beginPath();
    ctx.moveTo(xScale(0), yScale(prices[0]));
    filtered.forEach((d, i) => ctx.lineTo(xScale(i), yScale(d.close)));
    ctx.lineTo(xScale(filtered.length - 1), pad.top + chartH);
    ctx.lineTo(pad.left, pad.top + chartH);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = isPositive ? 'var(--color-signal, #3F77FF)' : 'var(--color-warning, #E63946)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    filtered.forEach((d, i) => {
      if (i === 0) ctx.moveTo(xScale(i), yScale(d.close));
      else ctx.lineTo(xScale(i), yScale(d.close));
    });
    ctx.stroke();

    ctx.fillStyle = 'rgba(15,15,14,0.4)';
    ctx.font = '10px IBM Plex Mono';
    ctx.textAlign = 'center';
    const labelInterval = Math.floor(filtered.length / 4);
    for (let i = 0; i < 5; i++) {
      const idx = Math.min(i * labelInterval, filtered.length - 1);
      const d = filtered[idx];
      if (d) {
        const dateStr = new Date(d.date).toLocaleDateString('en', { month: 'short', year: '2-digit' });
        ctx.fillText(dateStr, xScale(idx), h - 8);
      }
    }
  };

  const periods = ['3M', '6M', '1Y'];

  if (compact) {
    return (
      <div style={{ padding: '0 0 4px' }}>
        {error && <div style={{ padding: '20px', fontFamily: 'var(--font-mono)', fontSize: '11px', opacity: 0.4 }}>{error}</div>}
        {!error && <canvas ref={canvasRef} style={{ width: '100%', height: '180px', display: 'block' }} />}
      </div>
    );
  }

  return (
    <TileWrapper
      title="Chart"
      loading={loading}
      error={error}
      action={
        <div className="flex gap-1">
          {periods.map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                fontFamily: 'IBM Plex Mono', fontSize: '10px', letterSpacing: '0.08em',
                padding: '3px 8px',
                background: period === p ? 'var(--color-ink)' : 'transparent',
                color: period === p ? 'white' : 'var(--color-ink)',
                border: '0.5px solid var(--color-divider)',
                cursor: 'pointer', opacity: period === p ? 1 : 0.5,
                transition: 'all 0.15s ease',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      }
    >
      <div className="p-4">
        <canvas ref={canvasRef} style={{ width: '100%', height: '220px', display: 'block' }} />
        <p className="mt-2" style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', opacity: 0.35, textAlign: 'right' }}>
          SMA 50 — dashed blue
        </p>
      </div>
    </TileWrapper>
  );
}
