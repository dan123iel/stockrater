import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { DEMO_QUOTES, DEMO_TICKERS, DEMO_SCORES, DEMO_EVENTS, type DemoTicker } from "@/lib/demo-data";
import { TrendingUp, TrendingDown } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/markets")({
  head: () => ({ meta: [{ title: "Markets — pondex_" }] }),
  component: MarketsPage,
});

const COLLECTIONS = [
  { label: "AI & Chips",     tickers: ["NVDA", "MSFT", "GOOGL"] as DemoTicker[] },
  { label: "Big Tech",       tickers: ["AAPL", "MSFT", "GOOGL", "AMZN"] as DemoTicker[] },
  { label: "EV & Future",    tickers: ["TSLA", "AMZN"] as DemoTicker[] },
  { label: "Value Picks",    tickers: ["GOOGL", "AMZN", "AAPL"] as DemoTicker[] },
];

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function MarketsPage() {
  const [filter, setFilter] = useState<"winners"|"losers">("winners");
  const [calMonth] = useState(7); // August (0-indexed)

  const sorted = [...DEMO_TICKERS].sort((a, b) =>
    filter === "winners"
      ? DEMO_QUOTES[b].changePercent - DEMO_QUOTES[a].changePercent
      : DEMO_QUOTES[a].changePercent - DEMO_QUOTES[b].changePercent
  );

  const S = { card: { background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", padding: "20px 22px" } };

  return (
    <AppShell>
      {/* Top Movers */}
      <div style={S.card as React.CSSProperties}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700 }}>Top Movers</h2>
          <div style={{ display: "flex", gap: 4 }}>
            {(["winners","losers"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: "6px 16px", borderRadius: 20, border: "none", background: filter === f ? "#6366f1" : "#f0f0f0", color: filter === f ? "#fff" : "#555", fontWeight: 600, fontSize: 12, cursor: "pointer", textTransform: "capitalize" }}>{f}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {sorted.map(t => {
            const q = DEMO_QUOTES[t];
            const s = DEMO_SCORES[t];
            const up = q.changePercent >= 0;
            return (
              <Link key={t} to="/app/stock" search={{ ticker: t } as never} style={{ textDecoration: "none", border: "1px solid #f0f0f0", borderRadius: 12, padding: "14px 16px", display: "block" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>{t}</p>
                    <p style={{ fontSize: 11, color: "#888" }}>{q.companyName}</p>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: up ? "#22c55e" : "#ef4444", display: "flex", alignItems: "center", gap: 2 }}>
                    {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                    {up ? "+" : ""}{q.changePercent.toFixed(2)}%
                  </span>
                </div>
                <p style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", marginTop: 8 }}>${q.price.toFixed(2)}</p>
                <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 11, color: "#888" }}>Score:</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: s.score >= 70 ? "#22c55e" : s.score >= 50 ? "#f59e0b" : "#ef4444" }}>{s.score}/100</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Collections */}
      <div style={{ ...S.card, marginTop: 20 } as React.CSSProperties}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Collections</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
          {COLLECTIONS.map((col, i) => (
            <div key={i} style={{ border: "1px solid #f0f0f0", borderRadius: 12, padding: "14px 16px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", marginBottom: 10 }}>{col.label}</p>
              <div style={{ display: "flex", gap: 8 }}>
                {col.tickers.map(t => {
                  const q = DEMO_QUOTES[t];
                  const up = q.changePercent >= 0;
                  return (
                    <Link key={t} to="/app/stock" search={{ ticker: t } as never} style={{ textDecoration: "none", flex: 1, background: "#f8f9fa", borderRadius: 8, padding: "8px 10px" }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a" }}>{t}</p>
                      <p style={{ fontSize: 11, color: up ? "#22c55e" : "#ef4444" }}>{up ? "+" : ""}{q.changePercent.toFixed(1)}%</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events Calendar */}
      <div style={{ ...S.card, marginTop: 20 } as React.CSSProperties}>
        <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Market Calendar</h2>
        <p style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>{MONTHS[calMonth]} 2026 — Earnings & Dividends</p>
        {DEMO_EVENTS.map((e, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: i === 0 ? "none" : "1px solid #f5f5f5" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: e.type === "earnings" ? "#eff0fe" : "#dcfce7", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: e.type === "earnings" ? "#6366f1" : "#15803d" }}>{e.date.split(" ")[0].toUpperCase()}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: e.type === "earnings" ? "#6366f1" : "#15803d" }}>{e.date.split(" ")[1]}</span>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{e.ticker}</p>
                <p style={{ fontSize: 12, color: "#888" }}>{e.event}</p>
              </div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", padding: "4px 10px", borderRadius: 6, background: e.type === "earnings" ? "#eff0fe" : "#dcfce7", color: e.type === "earnings" ? "#6366f1" : "#15803d" }}>{e.type}</span>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
