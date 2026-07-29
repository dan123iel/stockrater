import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { DEMO_QUOTES, DEMO_TICKERS, DEMO_WATCHLIST, DEMO_SCORES, DEMO_RATIOS, type DemoTicker } from "@/lib/demo-data";
import { Plus, Trash2, TrendingUp, TrendingDown } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/portfolio")({
  head: () => ({ meta: [{ title: "Portfolio — pondex_" }] }),
  component: PortfolioPage,
});

interface Holding { ticker: DemoTicker; shares: number; costBasis: number; }

const INITIAL_HOLDINGS: Holding[] = [
  { ticker: "AAPL", shares: 10, costBasis: 180 },
  { ticker: "NVDA", shares: 5,  costBasis: 95  },
  { ticker: "MSFT", shares: 3,  costBasis: 420 },
];

function PortfolioPage() {
  const [holdings, setHoldings] = useState<Holding[]>(INITIAL_HOLDINGS);
  const [watchlist] = useState<DemoTicker[]>(DEMO_WATCHLIST);
  const [tab, setTab] = useState<"holdings"|"watchlist">("holdings");
  const [showAdd, setShowAdd] = useState(false);
  const [newTicker, setNewTicker] = useState("");
  const [newShares, setNewShares] = useState("");
  const [newCost, setNewCost] = useState("");

  const totalValue = holdings.reduce((sum, h) => sum + (DEMO_QUOTES[h.ticker]?.price ?? 0) * h.shares, 0);
  const totalCost  = holdings.reduce((sum, h) => sum + h.costBasis * h.shares, 0);
  const totalPnL   = totalValue - totalCost;
  const pnlPct     = totalCost > 0 ? (totalPnL / totalCost) * 100 : 0;

  const addHolding = () => {
    const t = newTicker.toUpperCase() as DemoTicker;
    if (!DEMO_QUOTES[t]) return;
    setHoldings([...holdings, { ticker: t, shares: Number(newShares), costBasis: Number(newCost) }]);
    setNewTicker(""); setNewShares(""); setNewCost(""); setShowAdd(false);
  };

  const removeHolding = (i: number) => setHoldings(holdings.filter((_, idx) => idx !== i));

  const S = { card: { background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0" } };

  return (
    <AppShell>
      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Value",  value: `$${totalValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}` },
          { label: "Total P&L",    value: `${totalPnL >= 0 ? "+" : ""}$${Math.abs(totalPnL).toLocaleString("en-US", { maximumFractionDigits: 0 })}`, color: totalPnL >= 0 ? "#22c55e" : "#ef4444" },
          { label: "Return",       value: `${pnlPct >= 0 ? "+" : ""}${pnlPct.toFixed(1)}%`, color: pnlPct >= 0 ? "#22c55e" : "#ef4444" },
        ].map((s, i) => (
          <div key={i} style={{ ...S.card, padding: "20px 22px" }}>
            <p style={{ fontSize: 12, color: "#888", marginBottom: 6 }}>{s.label}</p>
            <p style={{ fontSize: 24, fontWeight: 700, color: s.color ?? "#1a1a1a" }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
        {(["holdings", "watchlist"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 20px", borderRadius: 20, border: "none", background: tab === t ? "#6366f1" : "#f0f0f0", color: tab === t ? "#fff" : "#555", fontWeight: 600, fontSize: 13, cursor: "pointer", textTransform: "capitalize" }}>
            {t === "holdings" ? `Holdings (${holdings.length})` : `Watchlist (${watchlist.length})`}
          </button>
        ))}
      </div>

      {tab === "holdings" && (
        <div style={S.card}>
          {/* Table header */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 40px", padding: "12px 20px", borderBottom: "1px solid #f0f0f0" }}>
            {["Stock", "Shares", "Cost Basis", "Current", "P&L", "Score", ""].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase" }}>{h}</span>
            ))}
          </div>
          {holdings.map((h, i) => {
            const q = DEMO_QUOTES[h.ticker];
            const s = DEMO_SCORES[h.ticker];
            if (!q) return null;
            const current = q.price * h.shares;
            const cost = h.costBasis * h.shares;
            const pnl = current - cost;
            const pnlP = (pnl / cost) * 100;
            return (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 40px", padding: "14px 20px", borderBottom: "1px solid #f8f8f8", alignItems: "center" }}>
                <Link to="/app/stock" search={{ ticker: h.ticker } as never} style={{ textDecoration: "none" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{h.ticker}</p>
                  <p style={{ fontSize: 11, color: "#888" }}>{q.companyName}</p>
                </Link>
                <span style={{ fontSize: 13, color: "#555" }}>{h.shares}</span>
                <span style={{ fontSize: 13, color: "#555" }}>${h.costBasis.toFixed(2)}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>${q.price.toFixed(2)}</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: pnl >= 0 ? "#22c55e" : "#ef4444" }}>{pnl >= 0 ? "+" : ""}${Math.abs(pnl).toFixed(0)}</p>
                  <p style={{ fontSize: 11, color: pnl >= 0 ? "#22c55e" : "#ef4444" }}>{pnlP >= 0 ? "+" : ""}{pnlP.toFixed(1)}%</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: s.score >= 70 ? "#22c55e" : s.score >= 50 ? "#f59e0b" : "#ef4444" }}>{s.score}</span>
                  {s.score >= 70 ? <TrendingUp size={13} color="#22c55e" /> : <TrendingDown size={13} color="#ef4444" />}
                </div>
                <button onClick={() => removeHolding(i)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#ccc" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
          <div style={{ padding: "14px 20px" }}>
            <button onClick={() => setShowAdd(!showAdd)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1px dashed #ccc", borderRadius: 8, padding: "8px 16px", fontSize: 13, color: "#888", cursor: "pointer" }}>
              <Plus size={14} /> Add holding
            </button>
          </div>
          {showAdd && (
            <div style={{ padding: "0 20px 16px", display: "flex", gap: 8, alignItems: "flex-end" }}>
              {[["Ticker (AAPL)", newTicker, setNewTicker], ["Shares", newShares, setNewShares], ["Cost basis ($)", newCost, setNewCost]].map(([label, val, setter], i) => (
                <div key={i}>
                  <p style={{ fontSize: 11, color: "#888", marginBottom: 4 }}>{label as string}</p>
                  <input value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)} style={{ padding: "8px 12px", border: "1px solid #e0e0e0", borderRadius: 8, fontSize: 13, width: 120 }} />
                </div>
              ))}
              <button onClick={addHolding} style={{ padding: "9px 18px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Add</button>
            </div>
          )}
        </div>
      )}

      {tab === "watchlist" && (
        <div style={S.card}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "12px 20px", borderBottom: "1px solid #f0f0f0" }}>
            {["Stock", "Price", "Change", "Score", "Verdict"].map(h => (
              <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase" }}>{h}</span>
            ))}
          </div>
          {watchlist.map((t, i) => {
            const q = DEMO_QUOTES[t];
            const s = DEMO_SCORES[t];
            const up = q.changePercent >= 0;
            return (
              <Link key={i} to="/app/stock" search={{ ticker: t } as never} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "14px 20px", borderBottom: "1px solid #f8f8f8", alignItems: "center", textDecoration: "none" }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{t}</p>
                  <p style={{ fontSize: 11, color: "#888" }}>{q.companyName}</p>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>${q.price.toFixed(2)}</span>
                <span style={{ fontSize: 13, color: up ? "#22c55e" : "#ef4444" }}>{up ? "+" : ""}{q.changePercent.toFixed(2)}%</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: s.score >= 70 ? "#22c55e" : s.score >= 50 ? "#f59e0b" : "#ef4444" }}>{s.score}/100</span>
                <span style={{ fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: s.verdict === "BUY" ? "#dcfce7" : s.verdict === "SELL" ? "#fee2e2" : "#fef9c3", color: s.verdict === "BUY" ? "#15803d" : s.verdict === "SELL" ? "#b91c1c" : "#a16207" }}>{s.verdict}</span>
              </Link>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
