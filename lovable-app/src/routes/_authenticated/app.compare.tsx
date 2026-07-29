import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { DEMO_QUOTES, DEMO_SCORES, DEMO_RATIOS, DEMO_TICKERS, type DemoTicker } from "@/lib/demo-data";
import { ArrowUpRight, ArrowDownRight, Search } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/compare")({
  head: () => ({ meta: [{ title: "Compare Stocks — pondex_" }] }),
  component: ComparePage,
});

// ── Sector averages (static reference) ───────────────────────────────────────
const SECTOR_AVG = {
  peRatio: 26.4, forwardPE: 22.1, priceToBook: 8.2, priceToSales: 5.1,
  fcfYield: 0.028, grossMargin: 0.52, operatingMargin: 0.21, netMargin: 0.16,
  revenueGrowth: 0.12, dividendYield: 0.012, returnOnEquity: 0.28,
  returnOnAssets: 0.12, debtToEquity: 0.85, currentRatio: 1.4,
};

// ── Comparison rows ───────────────────────────────────────────────────────────
const ROWS = [
  { label: "pondex Score",   key: "score",          fmt: (v: number) => `${v}/100`,       higherBetter: true,  source: "pondex_" },
  { label: "P/E Ratio",      key: "peRatio",         fmt: (v: number) => `${v.toFixed(1)}x`, higherBetter: false, source: "Yahoo Finance" },
  { label: "Forward P/E",    key: "forwardPE",       fmt: (v: number) => `${v.toFixed(1)}x`, higherBetter: false, source: "Yahoo Finance" },
  { label: "Price/Book",     key: "priceToBook",     fmt: (v: number) => `${v.toFixed(1)}x`, higherBetter: false, source: "Yahoo Finance" },
  { label: "Price/Sales",    key: "priceToSales",    fmt: (v: number) => `${v.toFixed(1)}x`, higherBetter: false, source: "Yahoo Finance" },
  { label: "FCF Yield",      key: "fcfYield",        fmt: (v: number) => `${(v*100).toFixed(1)}%`, higherBetter: true,  source: "Yahoo Finance" },
  { label: "Gross Margin",   key: "grossMargin",     fmt: (v: number) => `${(v*100).toFixed(1)}%`, higherBetter: true,  source: "Yahoo Finance" },
  { label: "Operating Margin",key: "operatingMargin",fmt: (v: number) => `${(v*100).toFixed(1)}%`, higherBetter: true,  source: "Yahoo Finance" },
  { label: "Net Margin",     key: "netMargin",       fmt: (v: number) => `${(v*100).toFixed(1)}%`, higherBetter: true,  source: "Yahoo Finance" },
  { label: "Revenue Growth", key: "revenueGrowth",   fmt: (v: number) => `${(v*100).toFixed(1)}%`, higherBetter: true,  source: "Yahoo Finance" },
  { label: "Return on Equity",key: "returnOnEquity", fmt: (v: number) => `${(v*100).toFixed(1)}%`, higherBetter: true,  source: "Yahoo Finance" },
  { label: "Debt/Equity",    key: "debtToEquity",    fmt: (v: number) => `${v.toFixed(2)}x`,       higherBetter: false, source: "Yahoo Finance" },
  { label: "Dividend Yield", key: "dividendYield",   fmt: (v: number) => v > 0 ? `${(v*100).toFixed(2)}%` : "—", higherBetter: true, source: "Yahoo Finance" },
];

function getValue(ticker: DemoTicker, key: string): number {
  if (key === "score") return DEMO_SCORES[ticker].score;
  return (DEMO_RATIOS[ticker] as any)[key] ?? 0;
}

function getSectorAvg(key: string): number {
  if (key === "score") return 65;
  return (SECTOR_AVG as any)[key] ?? 0;
}

// ── Ticker search input ───────────────────────────────────────────────────────
function TickerInput({ value, onChange, label }: { value: DemoTicker | null; onChange: (t: DemoTicker) => void; label: string }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const filtered = DEMO_TICKERS.filter(t =>
    t.includes(q.toUpperCase()) || DEMO_QUOTES[t].companyName.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => setOpen(!open)}
        style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: 14, padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", minWidth: 260 }}
      >
        {value ? (
          <div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a" }}>{value}</p>
            <p style={{ fontSize: 12, color: "#888" }}>{DEMO_QUOTES[value].companyName}</p>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#aaa" }}>
            <Search size={16} />
            <span style={{ fontSize: 14 }}>{label}</span>
          </div>
        )}
      </div>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#fff", border: "1px solid #e0e0e0", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 100, overflow: "hidden" }}>
          <div style={{ padding: "8px 12px", borderBottom: "1px solid #f0f0f0" }}>
            <input
              autoFocus
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search ticker..."
              style={{ width: "100%", border: "none", outline: "none", fontSize: 14, color: "#333" }}
            />
          </div>
          {filtered.map(t => (
            <div
              key={t}
              onClick={() => { onChange(t); setOpen(false); setQ(""); }}
              style={{ padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f8f9fa")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{t}</p>
                <p style={{ fontSize: 11, color: "#888" }}>{DEMO_QUOTES[t].companyName}</p>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: DEMO_SCORES[t].score >= 70 ? "#22c55e" : DEMO_SCORES[t].score >= 50 ? "#f59e0b" : "#ef4444" }}>{DEMO_SCORES[t].score}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
function ComparePage() {
  const [stockA, setStockA] = useState<DemoTicker | null>("AAPL");
  const [stockB, setStockB] = useState<DemoTicker | null>("MSFT");

  const ready = stockA && stockB;

  return (
    <AppShell>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>Stock Comparison</h1>
        <p style={{ fontSize: 13, color: "#888" }}>Side-by-side analysis across valuation, profitability, and pondex score.</p>
      </div>

      {/* Stock pickers */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
        <TickerInput value={stockA} onChange={setStockA} label="Select first stock..." />
        <div style={{ fontSize: 18, fontWeight: 700, color: "#aaa" }}>vs</div>
        <TickerInput value={stockB} onChange={setStockB} label="Select second stock..." />
        <div style={{ marginLeft: "auto", fontSize: 11, color: "#aaa", fontStyle: "italic" }}>⚠ Research tool only. Not financial advice.</div>
      </div>

      {ready && (
        <>
          {/* Stock header cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 16, marginBottom: 28, alignItems: "stretch" }}>
            {[stockA, stockB].map((t, i) => {
              const q = DEMO_QUOTES[t!];
              const s = DEMO_SCORES[t!];
              const up = q.changePercent >= 0;
              return (
                <div key={t} style={{ background: "#fff", borderRadius: 16, border: `2px solid ${i === 0 ? "#6366f1" : "#22c55e"}`, padding: "20px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <p style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a" }}>{t}</p>
                      <p style={{ fontSize: 12, color: "#888" }}>{q.companyName}</p>
                      <p style={{ fontSize: 11, color: "#aaa", marginTop: 2 }}>{q.sector}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a" }}>{s.score}<span style={{ fontSize: 13, color: "#aaa" }}>/100</span></p>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 20, background: s.verdict === "BUY" ? "#dcfce7" : s.verdict === "SELL" ? "#fee2e2" : "#fef9c3", color: s.verdict === "BUY" ? "#15803d" : s.verdict === "SELL" ? "#b91c1c" : "#a16207" }}>{s.verdict}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a" }}>${q.price.toFixed(2)}</p>
                  <p style={{ fontSize: 12, color: up ? "#22c55e" : "#ef4444", display: "flex", alignItems: "center", gap: 3, marginTop: 4 }}>
                    {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {up ? "+" : ""}{q.changePercent.toFixed(2)}% today
                  </p>
                  <Link to="/app/stock" search={{ ticker: t! } as never} style={{ display: "inline-block", marginTop: 12, fontSize: 12, color: "#6366f1", textDecoration: "none", fontWeight: 600 }}>
                    View full analysis →
                  </Link>
                </div>
              );
            })}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#f4f6f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#888" }}>vs</div>
            </div>
          </div>

          {/* Comparison table */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", overflow: "hidden" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", padding: "14px 20px", background: "#f8f9fa", borderBottom: "1px solid #f0f0f0" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase" }}>Metric</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#6366f1", textTransform: "uppercase", textAlign: "center" }}>{stockA}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", textTransform: "uppercase", textAlign: "center" }}>{stockB}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#aaa", textTransform: "uppercase", textAlign: "center" }}>Sector Avg</span>
            </div>

            {ROWS.map((row, i) => {
              const vA = getValue(stockA!, row.key);
              const vB = getValue(stockB!, row.key);
              const vS = getSectorAvg(row.key);
              // Winner = better value
              const aWins = row.higherBetter ? vA > vB : vA < vB;
              const bWins = row.higherBetter ? vB > vA : vB < vA;

              return (
                <div key={row.key} style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", padding: "13px 20px", borderBottom: i < ROWS.length - 1 ? "1px solid #f8f8f8" : "none", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{row.label}</p>
                    <p style={{ fontSize: 10, color: "#aaa" }}>Source: {row.source}</p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <span style={{
                      fontSize: 14, fontWeight: 700,
                      color: aWins ? "#6366f1" : "#1a1a1a",
                      background: aWins ? "#eff0fe" : "transparent",
                      padding: aWins ? "3px 10px" : "3px 10px",
                      borderRadius: 8,
                    }}>
                      {row.fmt(vA)}
                      {aWins && <span style={{ marginLeft: 4, fontSize: 10 }}>✓</span>}
                    </span>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <span style={{
                      fontSize: 14, fontWeight: 700,
                      color: bWins ? "#22c55e" : "#1a1a1a",
                      background: bWins ? "#dcfce7" : "transparent",
                      padding: "3px 10px",
                      borderRadius: 8,
                    }}>
                      {row.fmt(vB)}
                      {bWins && <span style={{ marginLeft: 4, fontSize: 10 }}>✓</span>}
                    </span>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <span style={{ fontSize: 13, color: "#aaa" }}>{row.fmt(vS)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <p style={{ marginTop: 14, fontSize: 11, color: "#aaa", fontStyle: "italic" }}>
            ⚠ Research tool only. Not financial advice. Data: Yahoo Finance · pondex_ score. Past performance not indicative of future results.
          </p>
        </>
      )}
    </AppShell>
  );
}
