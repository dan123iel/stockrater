import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/cfd")({
  head: () => ({ meta: [{ title: "CFD — pondex_" }] }),
  component: CfdPage,
});

const INSTRUMENTS = [
  { name: "EUR/USD",   category: "Forex",     spread: "0.6 pips", leverage: "1:30", up: true  },
  { name: "GBP/USD",   category: "Forex",     spread: "0.9 pips", leverage: "1:30", up: false },
  { name: "Gold",      category: "Commodity", spread: "0.3$",     leverage: "1:20", up: true  },
  { name: "Oil (WTI)", category: "Commodity", spread: "0.5$",     leverage: "1:10", up: false },
  { name: "S&P 500",   category: "Index",     spread: "0.4 pts",  leverage: "1:20", up: true  },
  { name: "NASDAQ",    category: "Index",     spread: "1.0 pts",  leverage: "1:20", up: true  },
  { name: "BTC/USD",   category: "Crypto",    spread: "50$",      leverage: "1:2",  up: true  },
  { name: "ETH/USD",   category: "Crypto",    spread: "4$",       leverage: "1:2",  up: false },
];

const CATEGORIES = ["All", "Forex", "Commodity", "Index", "Crypto"];

function CfdPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = activeFilter === "All" ? INSTRUMENTS : INSTRUMENTS.filter(i => i.category === activeFilter);

  return (
    <AppShell>
      <div style={{ background: "#fff8f0", border: "1px solid #fed7aa", borderRadius: 12, padding: "14px 18px", marginBottom: 24, display: "flex", gap: 12, alignItems: "flex-start" }}>
        <AlertTriangle size={18} color="#ea580c" style={{ flexShrink: 0, marginTop: 1 }} />
        <div>
          <p style={{ fontSize: 13, fontWeight: 700, color: "#ea580c", marginBottom: 2 }}>Risk Warning</p>
          <p style={{ fontSize: 12, color: "#9a3412", lineHeight: 1.5 }}>74% of retail investor accounts lose money when trading CFDs. CFDs are complex instruments with a high risk of losing money due to leverage. <strong>Not financial advice.</strong></p>
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>CFD Trading</h1>
        <p style={{ fontSize: 13, color: "#888" }}>Forex, Commodities, Indices & Crypto. Preview only — live trading coming Q4 2026.</p>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setActiveFilter(c)} style={{ padding: "6px 16px", borderRadius: 20, border: "none", background: activeFilter === c ? "#6366f1" : "#f0f0f0", color: activeFilter === c ? "#fff" : "#555", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>{c}</button>
        ))}
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 100px", padding: "12px 20px", borderBottom: "1px solid #f0f0f0" }}>
          {["Instrument", "Category", "Spread", "Max Leverage", ""].map(h => (
            <span key={h} style={{ fontSize: 11, fontWeight: 600, color: "#888", textTransform: "uppercase" }}>{h}</span>
          ))}
        </div>
        {filtered.map((inst, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 100px", padding: "14px 20px", borderBottom: i < filtered.length - 1 ? "1px solid #f8f8f8" : "none", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#555" }}>{inst.name.slice(0, 2)}</span>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{inst.name}</p>
                <p style={{ fontSize: 11, color: inst.up ? "#22c55e" : "#ef4444" }}>{inst.up ? "▲ Trending up" : "▼ Trending down"}</p>
              </div>
            </div>
            <span style={{ fontSize: 12, color: "#555", background: "#f8f8f8", padding: "3px 10px", borderRadius: 20, display: "inline-block" }}>{inst.category}</span>
            <span style={{ fontSize: 13, color: "#1a1a1a" }}>{inst.spread}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#6366f1" }}>{inst.leverage}</span>
            <button style={{ padding: "7px 16px", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Trade</button>
          </div>
        ))}
      </div>
      <p style={{ marginTop: 16, fontSize: 11, color: "#aaa", fontStyle: "italic" }}>⚠ Research tool only. Not financial advice. Data is illustrative — not live.</p>
    </AppShell>
  );
}
