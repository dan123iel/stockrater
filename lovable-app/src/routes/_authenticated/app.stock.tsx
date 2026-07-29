import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useRef } from "react";
import { z } from "zod";
import { Area, Line, ComposedChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/app/AppShell";
import {
  DEMO_CANDLES, DEMO_FINANCIALS, DEMO_QUOTES, DEMO_RATIOS, DEMO_SCORES,
  DEMO_TICKERS, PEER_MAP, computeExitAnalysis, fmt, isDemoTicker,
  pct, profileScore, profileSummary, verdictColor, verdictFromScore,
  type DemoTicker, type ExitSignal, type InvestorStyle,
} from "@/lib/demo-data";
import { toast } from "sonner";
import { Info } from "lucide-react";

// ── Term Tooltip ───────────────────────────────────────────────────────────────
const TERM_DEFINITIONS: Record<string, string> = {
  "P/E Ratio":        "Price divided by earnings per share. Higher = market pays more per dollar of profit. Compare within same sector.",
  "Forward P/E":      "Same as P/E but uses next year's estimated earnings. More forward-looking than trailing P/E.",
  "Price / Book":     "Market price vs. book value of assets. <1 may indicate undervaluation.",
  "Price / Sales":    "Market cap divided by revenue. Useful for companies without profits yet.",
  "FCF Yield":        "Free cash flow divided by market cap. Higher = more cash generated per dollar invested.",
  "Gross Margin":     "Revenue minus cost of goods, as a %. Higher = more efficient production.",
  "Operating Margin": "Profit after operating expenses, as a %. Shows core business profitability.",
  "Net Margin":       "Final profit after all costs and taxes, as a %. The bottom line.",
  "Revenue Growth":   "Year-over-year increase in total revenue. Key signal for growth stocks.",
  "Return on Equity": "Net income divided by shareholder equity. Measures how efficiently capital is used.",
  "Return on Assets": "Net income divided by total assets. Measures asset efficiency.",
  "Debt / Equity":    "Total debt divided by shareholder equity. Higher = more leveraged = more risk.",
  "Current Ratio":    "Current assets divided by current liabilities. >1 means company can cover short-term debts.",
  "Beta":             "Measures volatility vs. the market. Beta >1 = moves more than market. <1 = more stable.",
  "DCF":              "Discounted Cash Flow — estimates intrinsic value based on projected future cash flows.",
  "RSI":              "Relative Strength Index. >70 = potentially overbought, <30 = potentially oversold.",
  "MACD":             "Moving Average Convergence Divergence. A momentum indicator comparing two EMAs.",
  "SMA":              "Simple Moving Average. Average closing price over a period. 50/200-day are key levels.",
  "EPS":              "Earnings Per Share — net income divided by shares outstanding. Core profitability metric.",
  "Market Cap":       "Total market value = share price × shares outstanding.",
};

function TermTooltip({ term }: { term: string }) {
  const [open, setOpen] = useState(false);
  const def = TERM_DEFINITIONS[term];
  if (!def) return <span>{term}</span>;
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 3 }}>
      {term}
      <button
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#aaa", display: "inline-flex" }}
        aria-label={`Definition of ${term}`}
      >
        <Info size={12} />
      </button>
      {open && (
        <span style={{
          position: "absolute", bottom: "calc(100% + 6px)", left: 0,
          background: "#1a1a1a", color: "#fff", borderRadius: 10,
          padding: "8px 12px", fontSize: 11, lineHeight: 1.5,
          width: 220, zIndex: 200, boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        }}>
          {def}
          <span style={{ position: "absolute", bottom: -5, left: 10, width: 10, height: 10, background: "#1a1a1a", transform: "rotate(45deg)" }} />
        </span>
      )}
    </span>
  );
}

// ── Source Badge ───────────────────────────────────────────────────────────────
function SourceBadge({ source, date }: { source: string; date?: string }) {
  return (
    <span style={{ fontSize: 10, color: "#aaa", background: "#f4f6f9", padding: "2px 7px", borderRadius: 20, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 3 }}>
      📊 {source}{date ? ` · ${date}` : ""}
    </span>
  );
}

// ── SMA calculator ─────────────────────────────────────────────────────────────
function calcSMA(data: { close: number }[], period: number): (number | null)[] {
  return data.map((_, i) => {
    if (i < period - 1) return null;
    const slice = data.slice(i - period + 1, i + 1);
    return parseFloat((slice.reduce((s, d) => s + d.close, 0) / period).toFixed(2));
  });
}

const searchSchema = z.object({ ticker: z.string().optional() });

export const Route = createFileRoute("/_authenticated/app/stock")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({ meta: [{ title: "Stock Analysis — pondex_" }] }),
  component: StockPage,
});

// ── Gauge ──────────────────────────────────────────────────────────────────────
function Gauge({ score }: { score: number }) {
  const [d, setD] = useState(0);
  useEffect(() => {
    const start = performance.now(); const dur = 1200; let raf: number;
    const step = (t: number) => { const p = Math.min(1, (t - start) / dur); setD(Math.round(score * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf);
  }, [score]);
  const color = score >= 70 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const r = 80; const cx = 100; const cy = 100;
  const angle = (d / 100) * Math.PI;
  const x = cx - r * Math.cos(angle); const y = cy - r * Math.sin(angle);
  const circumference = Math.PI * r; const dash = (d / 100) * circumference;
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-full max-w-[200px]">
        <path d={`M 20 100 A ${r} ${r} 0 0 1 180 100`} stroke="#f0f0f0" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d={`M 20 100 A ${r} ${r} 0 0 1 180 100`} stroke={color} strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray={`${dash} ${circumference}`} />
        <line x1={cx} y1={cy} x2={x} y2={y} stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="4" fill="#1a1a1a" />
      </svg>
      <p className="mt-2 text-5xl font-bold tabular" style={{ letterSpacing: "-0.02em" }}>
        {d}<span className="text-xl" style={{ color: "#555555" }}>/100</span>
      </p>
    </div>
  );
}

// ── VerdictBadge ───────────────────────────────────────────────────────────────
function VerdictBadge({ score }: { score: number }) {
  const vc = verdictColor(score); const v = verdictFromScore(score);
  const cls = vc === "buy" ? "badge-buy" : vc === "hold" ? "badge-hold" : "badge-sell";
  return <span className={cls} style={{ padding: "4px 12px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{v}</span>;
}

function FitBadge({ score }: { score: number }) {
  const label = score >= 80 ? "STRONG FIT" : score >= 65 ? "GOOD FIT" : score >= 50 ? "MODERATE FIT" : "WEAK FIT";
  return <span className="badge-fit" style={{ padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em" }}>{label}</span>;
}

// ── ExitBadge ──────────────────────────────────────────────────────────────────
function ExitBadge({ signal }: { signal: ExitSignal }) {
  const styles: Record<ExitSignal, { bg: string; color: string }> = {
    HOLD: { bg: "#FEF9C3", color: "#92400E" },
    TRIM: { bg: "#FEE2E2", color: "#B91C1C" },
    EXIT: { bg: "#DC2626", color: "#FFFFFF" },
  };
  const s = styles[signal];
  return <span style={{ background: s.bg, color: s.color, padding: "4px 14px", borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{signal}</span>;
}

// ── Range selector ─────────────────────────────────────────────────────────────
function RangeSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-lg" style={{ background: "#f4f6f9" }}>
      {["1W","1M","3M","6M","1Y"].map(o => (
        <button key={o} onClick={() => onChange(o)} className="text-xs tabular font-medium" style={{ padding: "4px 10px", borderRadius: 6, background: value === o ? "#1a1a1a" : "transparent", color: value === o ? "#ffffff" : "#555555" }}>{o}</button>
      ))}
    </div>
  );
}

// ── FinancialsTab ──────────────────────────────────────────────────────────────
function FinancialsTab({ ticker }: { ticker: DemoTicker }) {
  const [sub, setSub] = useState<"income" | "balance" | "cashflow">("income");
  const data = DEMO_FINANCIALS[ticker];
  const years = data.map(d => d.date.slice(0, 4));

  const incomeRows = [
    { l: "Total Revenue",    k: "revenue" as const,            fmt: fmt },
    { l: "Gross Profit",     k: "grossProfit" as const,        fmt: fmt },
    { l: "Operating Income", k: "operatingIncome" as const,    fmt: fmt },
    { l: "Net Income",       k: "netIncome" as const,          fmt: fmt },
    { l: "Operating Margin", k: "operatingIncomeRatio" as const, fmt: (v: number) => pct(v) },
  ];
  const balanceRows = [
    { l: "Total Assets",      k: "totalAssets" as const,      fmt: fmt },
    { l: "Total Liabilities", k: "totalLiabilities" as const, fmt: fmt },
    { l: "Total Equity",      k: "totalEquity" as const,      fmt: fmt },
    { l: "Debt / Equity",     k: "debtToEquity" as const,     fmt: (v: number) => v.toFixed(2) + "x" },
  ];
  const cashRows = [
    { l: "Operating CF",    k: "operatingCashFlow" as const,   fmt: fmt },
    { l: "Investing CF",    k: "investingCashFlow" as const,   fmt: fmt },
    { l: "Financing CF",    k: "financingCashFlow" as const,   fmt: fmt },
    { l: "Free Cash Flow",  k: "freeCashFlow" as const,        fmt: fmt },
    { l: "CapEx",           k: "capitalExpenditure" as const,  fmt: fmt },
  ];
  const rows = sub === "income" ? incomeRows : sub === "balance" ? balanceRows : cashRows;

  return (
    <div className="mt-8 card-flat">
      {/* Sub-tabs */}
      <div className="flex gap-0 border-b mb-6" style={{ borderColor: "#f0f0f0" }}>
        {(["income","balance","cashflow"] as const).map(s => (
          <button key={s} onClick={() => setSub(s)} className="px-4 h-10 text-sm capitalize" style={{ color: sub === s ? "#1a1a1a" : "#555555", fontWeight: sub === s ? 600 : 400, borderBottom: sub === s ? "2px solid #1a1a1a" : "2px solid transparent" }}>
            {s === "income" ? "Income Statement" : s === "balance" ? "Balance Sheet" : "Cash Flow"}
          </button>
        ))}
        <span className="ml-auto text-xs self-center pr-2" style={{ color: "#888888" }}>Annual · Yahoo Finance / SEC EDGAR</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
              <th className="text-left pb-3 text-xs font-medium uppercase tracking-wide" style={{ color: "#888888", minWidth: 200 }}>Metric</th>
              {years.map(y => <th key={y} className="text-right pb-3 pl-6 text-xs font-medium uppercase tracking-wide" style={{ color: "#888888" }}>{y}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.l} style={{ borderBottom: "1px solid #f4f6f9", animationDelay: `${i * 50}ms` }}>
                <td className="py-3 text-sm font-medium">{row.l}</td>
                {data.map((d, j) => {
                  const v = d[row.k] as number;
                  const isNeg = v < 0;
                  return (
                    <td key={j} className="py-3 pl-6 text-right text-sm tabular" style={{ color: isNeg ? "#ef4444" : "#1a1a1a" }}>
                      {row.fmt(v)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── KeyMetricsTab ──────────────────────────────────────────────────────────────
function KeyMetricsTab({ ticker }: { ticker: DemoTicker }) {
  const r = DEMO_RATIOS[ticker];
  const q = DEMO_QUOTES[ticker];
  const sections = [
    { title: "Valuation", source: "Yahoo Finance", items: [
      { l: "P/E Ratio", v: r.peRatio.toFixed(1) + "x" }, { l: "Forward P/E", v: r.forwardPE.toFixed(1) + "x" },
      { l: "Price / Book", v: r.priceToBook.toFixed(1) + "x" }, { l: "Price / Sales", v: r.priceToSales.toFixed(1) + "x" },
      { l: "FCF Yield", v: pct(r.fcfYield) },
    ]},
    { title: "Profitability", source: "Yahoo Finance", items: [
      { l: "Gross Margin", v: pct(r.grossMargin) }, { l: "Operating Margin", v: pct(r.operatingMargin) },
      { l: "Net Margin", v: pct(r.netMargin) }, { l: "Revenue Growth", v: pct(r.revenueGrowth) },
    ]},
    { title: "Management", source: "Yahoo Finance", items: [
      { l: "Return on Equity", v: pct(r.returnOnEquity) }, { l: "Return on Assets", v: pct(r.returnOnAssets) },
      { l: "Debt / Equity", v: r.debtToEquity.toFixed(2) }, { l: "Current Ratio", v: r.currentRatio.toFixed(2) },
    ]},
    { title: "Price & Volume", source: "Yahoo Finance", items: [
      { l: "Current Price", v: `$${q.price.toFixed(2)}` }, { l: "52W High", v: `$${q["52wHigh"].toFixed(2)}` },
      { l: "52W Low", v: `$${q["52wLow"].toFixed(2)}` }, { l: "Beta", v: q.beta.toFixed(2) },
      { l: "Market Cap", v: fmt(q.marketCap) },
    ]},
  ];
  return (
    <div className="mt-8 grid md:grid-cols-2 gap-6">
      {sections.map(sec => (
        <div key={sec.title} className="card-flat">
          <div className="flex justify-between items-baseline border-b pb-3 mb-0" style={{ borderColor: "#1a1a1a" }}>
            <p className="section-label">{sec.title}</p>
            <SourceBadge source={sec.source} date="TTM" />
          </div>
          {sec.items.map(item => (
            <div key={item.l} className="flex justify-between items-baseline py-3" style={{ borderBottom: "1px solid #f4f6f9" }}>
              <span className="text-sm" style={{ color: "#555555" }}><TermTooltip term={item.l} /></span>
              <span className="text-sm font-semibold tabular">{item.v}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ── ExitCheckTab ───────────────────────────────────────────────────────────────
// ── CompareTab ─────────────────────────────────────────────────────────────────
function CompareTab({ ticker }: { ticker: DemoTicker }) {
  const [vsTickerInput, setVsTickerInput] = useState<DemoTicker>("MSFT");

  const a = ticker;
  const b = vsTickerInput;
  const qA = DEMO_QUOTES[a]; const sA = DEMO_SCORES[a]; const rA = DEMO_RATIOS[a];
  const qB = DEMO_QUOTES[b]; const sB = DEMO_SCORES[b]; const rB = DEMO_RATIOS[b];

  const ROWS = [
    { label: "pondex Score",    aVal: `${sA.score}/100`,                    bVal: `${sB.score}/100`,                    aWins: sA.score > sB.score },
    { label: "Price",           aVal: `$${qA.price.toFixed(2)}`,            bVal: `$${qB.price.toFixed(2)}`,            aWins: false },
    { label: "P/E Ratio",       aVal: `${rA.peRatio.toFixed(1)}x`,          bVal: `${rB.peRatio.toFixed(1)}x`,          aWins: rA.peRatio < rB.peRatio },
    { label: "FCF Yield",       aVal: pct(rA.fcfYield),                     bVal: pct(rB.fcfYield),                     aWins: rA.fcfYield > rB.fcfYield },
    { label: "Gross Margin",    aVal: pct(rA.grossMargin),                  bVal: pct(rB.grossMargin),                  aWins: rA.grossMargin > rB.grossMargin },
    { label: "Net Margin",      aVal: pct(rA.netMargin),                    bVal: pct(rB.netMargin),                    aWins: rA.netMargin > rB.netMargin },
    { label: "Revenue Growth",  aVal: pct(rA.revenueGrowth),               bVal: pct(rB.revenueGrowth),               aWins: rA.revenueGrowth > rB.revenueGrowth },
    { label: "Return on Equity",aVal: pct(rA.returnOnEquity),              bVal: pct(rB.returnOnEquity),              aWins: rA.returnOnEquity > rB.returnOnEquity },
    { label: "Debt / Equity",   aVal: `${rA.debtToEquity.toFixed(2)}x`,     bVal: `${rB.debtToEquity.toFixed(2)}x`,     aWins: rA.debtToEquity < rB.debtToEquity },
    { label: "Beta",            aVal: qA.beta.toFixed(2),                   bVal: qB.beta.toFixed(2),                   aWins: qA.beta < qB.beta },
  ];

  const aWins = ROWS.filter(r => r.aWins).length;
  const bWins = ROWS.filter(r => !r.aWins).length;

  return (
    <div className="mt-8 space-y-6">
      {/* Vs picker */}
      <div className="card-flat" style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span className="text-sm font-semibold">Compare {a} vs.</span>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {DEMO_TICKERS.filter(t => t !== a).map(t => (
            <button key={t} onClick={() => setVsTickerInput(t)}
              style={{ padding: "5px 14px", borderRadius: 20, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", background: b === t ? "#1a1a1a" : "#f4f6f9", color: b === t ? "#fff" : "#555", transition: "all 0.15s" }}
            >{t}</button>
          ))}
        </div>
        <span className="text-xs ml-auto" style={{ color: "#888888" }}>⚠ Research tool only · Not financial advice</span>
      </div>

      {/* Score summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 12, alignItems: "stretch" }}>
        {[{ t: a, q: qA, s: sA, wins: aWins, color: "#6366f1" }, { t: b, q: qB, s: sB, wins: bWins, color: "#22c55e" }].map((item, i) => (
          <div key={i} className="card-flat" style={{ textAlign: "center", border: `2px solid ${item.color}22` }}>
            <p style={{ fontSize: 22, fontWeight: 800, color: item.color }}>{item.t}</p>
            <p style={{ fontSize: 12, color: "#888", marginBottom: 8 }}>{item.q.companyName}</p>
            <p style={{ fontSize: 40, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-1px" }}>{item.s.score}<span style={{ fontSize: 16, color: "#aaa" }}>/100</span></p>
            <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 20, background: item.s.verdict === "BUY" ? "#dcfce7" : item.s.verdict === "SELL" ? "#fee2e2" : "#fef9c3", color: item.s.verdict === "BUY" ? "#15803d" : item.s.verdict === "SELL" ? "#b91c1c" : "#a16207" }}>{item.s.verdict}</span>
            <p style={{ fontSize: 12, color: item.color, fontWeight: 700, marginTop: 8 }}>{item.wins} metrics better</p>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#f4f6f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#888" }}>vs</div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="card-flat" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", padding: "12px 20px", background: "#f8f9fa", borderBottom: "1px solid #f0f0f0" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase" }}>Metric</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", textAlign: "center" }}>{a}</span>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", textAlign: "center" }}>{b}</span>
        </div>
        {ROWS.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", padding: "12px 20px", borderBottom: i < ROWS.length - 1 ? "1px solid #f8f8f8" : "none", alignItems: "center" }}>
            <span className="text-sm" style={{ color: "#555555", fontWeight: 500 }}>{row.label}</span>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: row.aWins ? "#6366f1" : "#1a1a1a", background: row.aWins ? "#eff0fe" : "transparent", padding: "2px 10px", borderRadius: 8 }}>
                {row.aVal}{row.aWins && " ✓"}
              </span>
            </div>
            <div style={{ textAlign: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: !row.aWins ? "#22c55e" : "#1a1a1a", background: !row.aWins ? "#dcfce7" : "transparent", padding: "2px 10px", borderRadius: 8 }}>
                {row.bVal}{!row.aWins && " ✓"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExitCheckTab({ ticker }: { ticker: DemoTicker }) {  const [purchasePrice, setPurchasePrice] = useState("");
  const [analysed, setAnalysed] = useState(false);

  const pp = parseFloat(purchasePrice) || undefined;
  const analysis = useMemo(() => computeExitAnalysis(ticker, pp), [ticker, pp, analysed]);

  const signalColor: Record<ExitSignal, string> = {
    HOLD: "#f59e0b", TRIM: "#ef4444", EXIT: "#ef4444",
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="card-flat">
        <p className="section-label">Exit Check</p>
        <p className="mt-2 text-sm" style={{ color: "#555555" }}>
          Enter your purchase price to get a personalised HOLD / TRIM / EXIT signal based on score and valuation.
        </p>
        <div className="mt-4 flex gap-3 items-end">
          <div>
            <label className="section-label block mb-1">Purchase price (optional)</label>
            <input
              type="number"
              placeholder="e.g. 185.00"
              value={purchasePrice}
              onChange={e => setPurchasePrice(e.target.value)}
              className="input-flat w-40"
            />
          </div>
          <button onClick={() => setAnalysed(true)} className="btn-dark">Check exit signal</button>
        </div>
      </div>

      {(analysed || !purchasePrice) && (
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 card-flat text-center">
            <p className="section-label">Exit signal</p>
            <div className="mt-6 mb-4 text-6xl font-bold tabular" style={{ color: signalColor[analysis.signal] }}>
              {analysis.exitScore}
              <span className="text-2xl" style={{ color: "#555555" }}>/100</span>
            </div>
            <ExitBadge signal={analysis.signal} />
            <p className="mt-4 text-sm" style={{ color: "#555555" }}>{analysis.framing}</p>
            <p className="mt-4 text-xs" style={{ color: "#888888" }}>
              Research signal only · Not a sell recommendation · Not financial advice
            </p>
          </div>
          <div className="lg:col-span-8 card-flat">
            <p className="section-label">Signal drivers</p>
            <div className="mt-4 space-y-4">
              {analysis.drivers.map((d, i) => (
                <div key={i} style={{ paddingBottom: 12, borderBottom: "1px solid #f4f6f9" }}>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm font-semibold">{d.label}</span>
                    <span className="text-xs" style={{ color: "#888888" }}>Source: {d.source}</span>
                  </div>
                  <p className="mt-1 text-sm" style={{ color: "#555555" }}>{d.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── ProfileScoreTab ────────────────────────────────────────────────────────────
function ProfileScoreTab({ ticker }: { ticker: DemoTicker }) {
  const [style, setStyle] = useState<InvestorStyle>("core");
  const defaultScore = DEMO_SCORES[ticker].score;
  const personalScore = profileScore(ticker, style);
  const summary = profileSummary(ticker, style);
  const diff = personalScore - defaultScore;

  const styles: { value: InvestorStyle; label: string; desc: string }[] = [
    { value: "value",  label: "Value Investor",  desc: "Valuation-weighted (+15%)" },
    { value: "growth", label: "Growth Investor", desc: "Fundamentals-weighted (+15%)" },
    { value: "core",   label: "Balanced",        desc: "Default equal weights" },
  ];

  return (
    <div className="mt-8 space-y-6">
      {/* Style selector */}
      <div className="card-flat">
        <p className="section-label">Your investor style</p>
        <p className="mt-2 text-sm mb-4" style={{ color: "#555555" }}>
          The same stock scores differently depending on your strategy. Select yours to see your personalised verdict.
        </p>
        <div className="flex flex-wrap gap-3">
          {styles.map(s => (
            <button
              key={s.value}
              onClick={() => setStyle(s.value)}
              className="text-left px-4 py-3 rounded-xl border text-sm"
              style={{
                borderColor: style === s.value ? "#1a1a1a" : "#f0f0f0",
                background: style === s.value ? "#1a1a1a" : "#ffffff",
                color: style === s.value ? "#ffffff" : "#1a1a1a",
                fontWeight: style === s.value ? 600 : 400,
              }}
            >
              <div className="font-semibold">{s.label}</div>
              <div className="text-xs mt-0.5 opacity-70">{s.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Score comparison */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-flat text-center">
          <p className="section-label">Default score</p>
          <p className="mt-4 text-6xl font-bold tabular" style={{ letterSpacing: "-0.02em" }}>{defaultScore}<span className="text-2xl" style={{ color: "#555555" }}>/100</span></p>
          <div className="mt-3 flex gap-2 justify-center">
            <VerdictBadge score={defaultScore} />
            <FitBadge score={defaultScore} />
          </div>
          <p className="mt-3 text-xs" style={{ color: "#888888" }}>Equal weights across all 5 factors</p>
        </div>
        <div className="card-flat text-center" style={{ border: "2px solid #1a1a1a" }}>
          <p className="section-label">Your score — {styles.find(s => s.value === style)?.label}</p>
          <p className="mt-4 text-6xl font-bold tabular" style={{ letterSpacing: "-0.02em" }}>{personalScore}<span className="text-2xl" style={{ color: "#555555" }}>/100</span></p>
          <div className="mt-3 flex gap-2 justify-center">
            <VerdictBadge score={personalScore} />
            <FitBadge score={personalScore} />
          </div>
          <p className="mt-2 text-sm font-semibold" style={{ color: diff > 0 ? "#22c55e" : diff < 0 ? "#ef4444" : "#555555" }}>
            {diff > 0 ? `+${diff}` : diff} vs. default
          </p>
        </div>
      </div>

      {/* Explanation */}
      <div className="card-flat">
        <p className="section-label">Why the difference?</p>
        <p className="mt-3 text-sm" style={{ color: "#555555" }}>{summary}</p>
        <div className="mt-4 space-y-3">
          {DEMO_SCORES[ticker].factors.map((f, i) => (
            <div key={f.name} className="flex items-center gap-4">
              <span className="text-sm w-28 shrink-0">{f.name}</span>
              <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: "#f4f6f9" }}>
                <div style={{ width: `${f.score}%`, height: "100%", borderRadius: 50, background: f.score >= 70 ? "#22c55e" : f.score >= 45 ? "#f59e0b" : "#ef4444", transition: `width 400ms cubic-bezier(0.16,1,0.3,1) ${i * 60}ms` }} />
              </div>
              <span className="text-xs tabular font-semibold w-12 text-right">{f.score}/100</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs" style={{ color: "#888888" }}>Source: Yahoo Finance · SEC EDGAR · Research tool only · Not financial advice</p>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
function StockPage() {
  const { ticker } = Route.useSearch();
  const [input, setInput] = useState((ticker ?? "").toUpperCase());
  const [current, setCurrent] = useState<string | null>(ticker?.toUpperCase() ?? null);
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState("6M");
  const [tab, setTab] = useState<"overview" | "metrics" | "financials" | "compare" | "exit" | "profile" | "learn">("overview");
  const [showBanner, setShowBanner] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  useEffect(() => { setInput((ticker ?? "").toUpperCase()); setCurrent(ticker?.toUpperCase() ?? null); }, [ticker]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem("pondex_onboarding_banner_seen") && ticker === "AAPL") {
      setShowBanner(true);
      const t = setTimeout(() => dismissBanner(), 8000);
      return () => clearTimeout(t);
    }
  }, [ticker]);

  const dismissBanner = () => {
    setShowBanner(false);
    if (typeof window !== "undefined") window.localStorage.setItem("pondex_onboarding_banner_seen", "1");
  };

  const runVerdict = async () => {
    const t = input.trim().toUpperCase();
    if (!t) return;
    if (!isDemoTicker(t)) { setError(t); setCurrent(null); return; }

    const today = new Date().toISOString().split("T")[0];
    try {
      const { data: rows } = await supabase.from("daily_verdicts").select("count").eq("date", today).maybeSingle();
      const count = rows?.count ?? 0;
      if (count >= 1 && current !== t) { setGateOpen(true); return; }
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) await supabase.from("daily_verdicts").upsert({ user_id: userData.user.id, date: today, count: count + 1 }, { onConflict: "user_id,date" });
    } catch { /* demo fallback */ }

    setError(null);
    setCurrent(t);
    setTab("overview");
  };

  const q = current && isDemoTicker(current) ? DEMO_QUOTES[current as DemoTicker] : null;
  const s = current && isDemoTicker(current) ? DEMO_SCORES[current as DemoTicker] : null;
  const candles = current && isDemoTicker(current) ? DEMO_CANDLES[current as DemoTicker] : [];
  const [showSMA50, setShowSMA50] = useState(true);
  const [showSMA200, setShowSMA200] = useState(true);

  const rangedCandles = useMemo(() => {
    const map: Record<string, number> = { "1W": 7, "1M": 30, "3M": 90, "6M": 180, "1Y": 252 };
    const sliced = candles.slice(-Math.min(candles.length, map[range] ?? 180));
    // Attach SMA values using full candle history for correct calculation
    const sma50all = calcSMA(candles, 50);
    const sma200all = calcSMA(candles, 200);
    const startIdx = candles.length - sliced.length;
    return sliced.map((c, i) => ({
      ...c,
      sma50: sma50all[startIdx + i],
      sma200: sma200all[startIdx + i],
    }));
  }, [candles, range]);

  const TABS = [
    { id: "overview",   label: "Overview" },
    { id: "metrics",    label: "Key Metrics" },
    { id: "financials", label: "Financials" },
    { id: "compare",    label: "Compare" },
    { id: "exit",       label: "Exit Check" },
    { id: "profile",    label: "My Profile Score" },
    { id: "learn",      label: "Learn" },
  ] as const;

  return (
    <AppShell>
      {showBanner && (
        <div className="flex items-center justify-between px-6 py-3 text-sm" style={{ background: "#1a1a1a", color: "#ffffff" }}>
          <span>Welcome to pondex_ — this is your first verdict. Every number cites its source.</span>
          <button onClick={dismissBanner} className="text-xl leading-none ml-4" style={{ color: "#888888" }}>×</button>
        </div>
      )}

      <div className="mx-auto max-w-[1280px] px-6 md:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
          <div>
            {q ? (
              <>
                <p className="section-label">{current} · {q.exchangeShortName} · {q.sector}</p>
                <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">{q.companyName}</h1>
                <p className="mt-2 text-2xl tabular font-semibold">
                  ${q.price.toFixed(2)}{" "}
                  <span className="text-base font-normal" style={{ color: q.change > 0 ? "#22c55e" : q.change < 0 ? "#ef4444" : "#555555" }}>
                    {q.change > 0 ? "+" : ""}{q.change.toFixed(2)} ({q.changePercent > 0 ? "+" : ""}{q.changePercent.toFixed(2)}%)
                  </span>
                </p>
              </>
            ) : (
              <><p className="section-label">Stock</p><h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">Get your verdict.</h1></>
            )}
          </div>
          <div className="flex gap-2" style={{ position: "relative", zIndex: 10 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && runVerdict()} placeholder="Ticker…" className="input-flat max-w-[180px] uppercase" style={{ pointerEvents: "auto" }} />
            <button onClick={runVerdict} className="btn-dark" style={{ pointerEvents: "auto" }}>GET VERDICT →</button>
          </div>
        </div>
        <p className="mt-2 text-xs" style={{ color: "#888888" }}>⚠ Research tool only · Not financial advice</p>

        {/* Empty / Error states */}
        {!current && !error && (
          <div className="mt-16 text-center" style={{ color: "#888888" }}>
            <p>Enter a ticker to see its verdict.</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {DEMO_TICKERS.map(t => (
                <button key={t} onClick={() => { setInput(t); setCurrent(t); setError(null); }} className="text-xs font-semibold tracking-wider px-3 py-1.5 rounded-full border" style={{ borderColor: "#f0f0f0" }}>{t}</button>
              ))}
            </div>
          </div>
        )}
        {error && (
          <div className="mt-10 card-flat text-center">
            <p className="text-sm">Ticker not found or not in demo set.</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {DEMO_TICKERS.map(t => (
                <button key={t} onClick={() => { setInput(t); setCurrent(t); setError(null); }} className="text-xs font-semibold tracking-wider px-3 py-1.5 rounded-full border" style={{ borderColor: "#f0f0f0" }}>{t}</button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {q && s && current && isDemoTicker(current) && (
          <>
            {/* Tabs */}
            <div className="mt-8 flex gap-0 border-b overflow-x-auto scrollbar-hide" style={{ borderColor: "#f0f0f0", position: "relative", zIndex: 10 }}>
              {TABS.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} className="px-4 h-11 text-sm whitespace-nowrap" style={{ color: tab === t.id ? "#1a1a1a" : "#555555", fontWeight: tab === t.id ? 600 : 400, borderBottom: tab === t.id ? "2px solid #1a1a1a" : "2px solid transparent" }}>{t.label}</button>
              ))}
            </div>

            {/* Overview */}
            {tab === "overview" && (
              <div className="mt-8 space-y-8">
                <div className="card-flat">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div><p className="section-label">Price chart</p><p className="mt-1 text-xs" style={{ color: "#888888" }}>Illustrative · Live chart requires backend</p></div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      {/* SMA toggles */}
                      <button onClick={() => setShowSMA50(!showSMA50)} style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, border: "none", cursor: "pointer", background: showSMA50 ? "#f59e0b" : "#f0f0f0", color: showSMA50 ? "#fff" : "#888", transition: "all 0.15s" }}>SMA 50</button>
                      <button onClick={() => setShowSMA200(!showSMA200)} style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, border: "none", cursor: "pointer", background: showSMA200 ? "#6366f1" : "#f0f0f0", color: showSMA200 ? "#fff" : "#888", transition: "all 0.15s" }}>SMA 200</button>
                      <RangeSelector value={range} onChange={setRange} />
                    </div>
                  </div>
                  <div className="mt-4" style={{ height: 260 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={rangedCandles} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                        <defs><linearGradient id="pfill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(10,10,10,0.08)" /><stop offset="100%" stopColor="rgba(10,10,10,0)" /></linearGradient></defs>
                        <CartesianGrid stroke="#F3F4F6" vertical={false} />
                        <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} minTickGap={40} />
                        <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} orientation="right" domain={["auto","auto"]} />
                        <Tooltip contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 12 }} formatter={(v: number, name: string) => v !== null ? [`$${v.toFixed(2)}`, name] : [null, name]} />
                        <Area type="monotone" dataKey="close" name="Price" stroke="#0A0A0A" strokeWidth={1.5} fill="url(#pfill)" dot={false} />
                        {showSMA50 && <Line type="monotone" dataKey="sma50" name="SMA 50" stroke="#f59e0b" strokeWidth={1.5} dot={false} strokeDasharray="4 2" connectNulls={false} />}
                        {showSMA200 && <Line type="monotone" dataKey="sma200" name="SMA 200" stroke="#6366f1" strokeWidth={1.5} dot={false} strokeDasharray="4 2" connectNulls={false} />}
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  {/* Legend */}
                  <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 11, color: "#888" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 16, height: 2, background: "#0A0A0A", display: "inline-block" }} /> Price</span>
                    {showSMA50 && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 16, height: 2, background: "#f59e0b", display: "inline-block" }} /> SMA 50</span>}
                    {showSMA200 && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 16, height: 2, background: "#6366f1", display: "inline-block" }} /> SMA 200</span>}
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-4 card-flat">
                    <p className="section-label">Verdict</p>
                    <div className="mt-4"><Gauge score={s.score} /></div>
                    <div className="mt-4 flex items-center gap-2 justify-center">
                      <VerdictBadge score={s.score} />
                      <FitBadge score={s.score} />
                    </div>
                    <p className="mt-4 text-sm" style={{ color: "#555555" }}>{s.summary}</p>
                    <p className="mt-3 text-xs" style={{ color: "#888888" }}>⚠ Research tool only · Not financial advice</p>
                  </div>
                  <div className="lg:col-span-8 card-flat">
                    <p className="section-label">Factor breakdown</p>
                    <div className="mt-6 space-y-5">
                      {s.factors.map((f, i) => (
                        <div key={f.name}>
                          <div className="flex items-baseline justify-between gap-3">
                            <p className="text-sm font-semibold">{f.name}</p>
                            <p className="text-sm tabular font-semibold">{f.score}<span style={{ color: "#555555" }}>/100</span></p>
                          </div>
                          <p className="mt-1 text-sm" style={{ color: "#555555" }}>{f.explanation}</p>
                          <div className="mt-2 h-[3px] rounded-full overflow-hidden" style={{ background: "#f4f6f9" }}>
                            <div style={{ width: `${f.score}%`, height: "100%", borderRadius: 50, background: f.score >= 70 ? "#22c55e" : f.score >= 45 ? "#f59e0b" : "#ef4444", transition: `width 400ms cubic-bezier(0.16,1,0.3,1) ${i * 70}ms` }} />
                          </div>
                          <p className="mt-1 text-xs" style={{ color: "#888888" }}>Source: {f.source}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {[{ l: "Market Cap", v: fmt(q.marketCap) },{ l: "Price", v: `$${q.price.toFixed(2)}` },{ l: "52W High", v: `$${q["52wHigh"].toFixed(2)}` },{ l: "52W Low", v: `$${q["52wLow"].toFixed(2)}` },{ l: "Beta", v: q.beta.toFixed(2) },{ l: "Sector", v: q.sector }].map(m => (
                    <div key={m.l} className="card-flat"><p className="section-label">{m.l}</p><p className="mt-2 text-lg font-semibold tabular">{m.v}</p></div>
                  ))}
                </div>

                <div>
                  <p className="section-label">Similar stocks</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(PEER_MAP[current as DemoTicker] ?? []).map(t => (
                      <Link key={t} to="/app/stock" search={{ ticker: t } as never} className="text-xs font-semibold tracking-wider px-3 py-1.5 rounded-full border hover:border-[#1a1a1a]" style={{ borderColor: "#f0f0f0" }}>{t}</Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "metrics" && <KeyMetricsTab ticker={current as DemoTicker} />}
            {tab === "financials" && <FinancialsTab ticker={current as DemoTicker} />}
            {tab === "compare" && <CompareTab ticker={current as DemoTicker} />}
            {tab === "exit" && <ExitCheckTab ticker={current as DemoTicker} />}
            {tab === "profile" && <ProfileScoreTab ticker={current as DemoTicker} />}

            {tab === "learn" && (
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="card-flat"><p className="section-label">About {current}</p><p className="mt-3 text-sm" style={{ color: "#555555" }}>{q.description}</p><div className="mt-4 space-y-1 text-xs" style={{ color: "#888888" }}><p>Sector: {q.sector}</p><p>Industry: {q.industry}</p><p>Country: {q.country}</p></div></div>
                <div className="card-flat"><p className="section-label">Glossary</p><dl className="mt-3 space-y-3 text-sm"><div><dt className="font-semibold">P/E</dt><dd style={{ color: "#555555" }}>Price-to-earnings ratio.</dd></div><div><dt className="font-semibold">Moat</dt><dd style={{ color: "#555555" }}>Sustainable competitive advantage.</dd></div><div><dt className="font-semibold">FCF Yield</dt><dd style={{ color: "#555555" }}>Free cash flow ÷ market cap.</dd></div><div><dt className="font-semibold">Beta</dt><dd style={{ color: "#555555" }}>Volatility vs. the market.</dd></div></dl></div>
                <div className="card-flat"><p className="section-label">Data sources</p><ul className="mt-3 text-sm space-y-2" style={{ color: "#555555" }}><li>Yahoo Finance — price, ratios, financials</li><li>SEC EDGAR — official filings: 10-K, 10-Q</li><li>Groq AI — plain-language summaries via Llama 3.3</li></ul><p className="mt-4 text-xs" style={{ color: "#888888" }}>pondex_ is a research tool. All investment decisions are yours.</p></div>
              </div>
            )}
          </>
        )}

        {/* Free tier gate modal */}
        {gateOpen && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }} onClick={() => setGateOpen(false)}>
            <div className="w-full md:max-w-md" style={{ background: "#ffffff", borderRadius: 16, padding: 24 }} onClick={e => e.stopPropagation()}>
              <p className="text-lg font-semibold">You've used your free verdict for today.</p>
              <p className="mt-2 text-sm" style={{ color: "#555555" }}>Upgrade to Pro for unlimited verdicts, peer comparison, and AI chat.</p>
              <ul className="mt-4 space-y-2 text-sm"><li>• Unlimited verdicts per day</li><li>• Peer comparison (2 stocks + sector average)</li><li>• AI chat with source attribution</li></ul>
              <div className="mt-6 flex flex-col md:flex-row gap-3">
                <button onClick={() => { setGateOpen(false); toast("Pro checkout coming soon."); }} className="btn-dark flex-1">Upgrade to Pro — €4.99/month</button>
                <button onClick={() => setGateOpen(false)} className="btn-outline flex-1">Remind me tomorrow</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
