import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { TrendingUp, Shield, Zap, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/robo")({
  head: () => ({ meta: [{ title: "Robo Advisor — pondex_" }] }),
  component: RoboPage,
});

const PORTFOLIOS = [
  {
    id: "conservative",
    label: "Conservative",
    icon: Shield,
    color: "#22c55e",
    bg: "#dcfce7",
    return: "~5.1% p.a.",
    risk: "Low",
    description: "Capital preservation with steady income. 70% bonds, 20% dividend stocks, 10% cash.",
    allocation: [{ label: "Bonds", pct: 70, color: "#22c55e" }, { label: "Dividend Stocks", pct: 20, color: "#86efac" }, { label: "Cash", pct: 10, color: "#d1fae5" }],
  },
  {
    id: "core",
    label: "Core",
    icon: TrendingUp,
    color: "#6366f1",
    bg: "#eff0fe",
    return: "~8.2% p.a.",
    risk: "Medium",
    description: "Balanced growth and income. 50% global equities, 30% bonds, 20% alternatives.",
    allocation: [{ label: "Global Equities", pct: 50, color: "#6366f1" }, { label: "Bonds", pct: 30, color: "#a5b4fc" }, { label: "Alternatives", pct: 20, color: "#c7d2fe" }],
  },
  {
    id: "growth",
    label: "Growth",
    icon: Zap,
    color: "#f59e0b",
    bg: "#fef9c3",
    return: "~11.4% p.a.",
    risk: "High",
    description: "Maximum long-term growth. 80% global equities, 15% emerging markets, 5% alternatives.",
    allocation: [{ label: "Global Equities", pct: 80, color: "#f59e0b" }, { label: "Emerging Markets", pct: 15, color: "#fcd34d" }, { label: "Alternatives", pct: 5, color: "#fef08a" }],
  },
];

function RoboPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<"pick"|"confirm"|"done">("pick");

  const S = { card: { background: "#fff", borderRadius: 16, border: "1px solid #f0f0f0", padding: "24px" } };

  return (
    <AppShell>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>Robo Advisor</h1>
        <p style={{ fontSize: 13, color: "#888" }}>Automated portfolio management — investing on autopilot.</p>
      </div>

      {step === "pick" && (
        <>
          <p style={{ fontSize: 14, color: "#555", marginBottom: 20 }}>Choose a portfolio strategy that matches your goals:</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
            {PORTFOLIOS.map(p => {
              const Icon = p.icon;
              const isSelected = selected === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelected(p.id)}
                  style={{ ...S.card, cursor: "pointer", border: isSelected ? `2px solid ${p.color}` : "1px solid #f0f0f0", transition: "all 0.15s" } as React.CSSProperties}
                >
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: p.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                    <Icon size={20} color={p.color} />
                  </div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>{p.label}</p>
                  <p style={{ fontSize: 13, color: "#888", marginBottom: 14, lineHeight: 1.5 }}>{p.description}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                    <div>
                      <p style={{ fontSize: 11, color: "#888" }}>Est. Return</p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: p.color }}>{p.return}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 11, color: "#888" }}>Risk Level</p>
                      <p style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>{p.risk}</p>
                    </div>
                  </div>
                  {/* Allocation bar */}
                  <div style={{ display: "flex", height: 6, borderRadius: 4, overflow: "hidden", gap: 1 }}>
                    {p.allocation.map(a => (
                      <div key={a.label} style={{ width: `${a.pct}%`, background: a.color }} />
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                    {p.allocation.map(a => (
                      <div key={a.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color }} />
                        <span style={{ fontSize: 10, color: "#888" }}>{a.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            disabled={!selected}
            onClick={() => setStep("confirm")}
            style={{ padding: "12px 32px", background: selected ? "#6366f1" : "#e0e0e0", color: selected ? "#fff" : "#aaa", border: "none", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: selected ? "pointer" : "not-allowed", display: "flex", alignItems: "center", gap: 8 }}
          >
            Continue <ChevronRight size={16} />
          </button>
        </>
      )}

      {step === "confirm" && selected && (() => {
        const p = PORTFOLIOS.find(x => x.id === selected)!;
        return (
          <div style={{ maxWidth: 480 }}>
            <div style={S.card as React.CSSProperties}>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>Selected Strategy</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>{p.label} Portfolio</p>
              <p style={{ fontSize: 14, color: "#555", marginBottom: 20 }}>{p.description}</p>
              <div style={{ background: "#fef9c3", border: "1px solid #fde68a", borderRadius: 10, padding: "12px 16px", marginBottom: 20 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#a16207" }}>⚠ Historical estimate only</p>
                <p style={{ fontSize: 12, color: "#a16207" }}>Past performance is not a reliable indicator of future results. Not financial advice.</p>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep("pick")} style={{ flex: 1, padding: "11px", border: "1px solid #e0e0e0", borderRadius: 10, background: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Back</button>
                <button onClick={() => setStep("done")} style={{ flex: 2, padding: "11px", border: "none", borderRadius: 10, background: "#6366f1", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Activate Portfolio</button>
              </div>
            </div>
          </div>
        );
      })()}

      {step === "done" && (
        <div style={{ ...S.card, maxWidth: 480, textAlign: "center" } as React.CSSProperties}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
          <p style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>Portfolio Activated!</p>
          <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>Your Robo Advisor portfolio is set up. Live investing features coming Q4 2026.</p>
          <button onClick={() => { setStep("pick"); setSelected(null); }} style={{ padding: "10px 24px", border: "1px solid #e0e0e0", borderRadius: 10, background: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Change Strategy</button>
        </div>
      )}
    </AppShell>
  );
}
