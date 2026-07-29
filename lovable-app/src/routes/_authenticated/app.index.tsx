import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { DEMO_QUOTES, DEMO_TICKERS, DEMO_WATCHLIST, DEMO_EVENTS, DEMO_CANDLES, type DemoTicker } from "@/lib/demo-data";
import { Download, Settings2, ArrowUpRight, ArrowDownRight, X, GripVertical, Plus } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import {
  DndContext, closestCenter, KeyboardSensor, PointerSensor,
  useSensor, useSensors, type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove, SortableContext, sortableKeyboardCoordinates,
  useSortable, rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Route = createFileRoute("/_authenticated/app/")({
  head: () => ({ meta: [{ title: "Dashboard — pondex_" }] }),
  component: Dashboard,
});

// ── Widget definitions ──────────────────────────────────────────────────────

const ALL_WIDGETS = [
  { id: "hero",        label: "Financial Command",   description: "Portfolio summary + 4 stat cards" },
  { id: "performance", label: "Investment Performance", description: "Portfolio chart over 6 months" },
  { id: "trending",    label: "Trending Assets",     description: "Top 4 movers with sparklines" },
  { id: "scanner",     label: "Opportunity Scanner", description: "AI trade signals" },
  { id: "allocation",  label: "Asset Allocation",    description: "Portfolio donut chart" },
  { id: "watchlist",   label: "Watchlist",           description: "Your saved stocks" },
  { id: "events",      label: "Upcoming Events",     description: "Earnings & dividends" },
];

const DEFAULT_WIDGETS = ["hero", "performance", "trending", "scanner", "allocation", "watchlist", "events"];

const DEFAULT_WIDGETS = ALL_WIDGETS.map(w => w.id);

function useWidgets() {
  const [widgets, setWidgets] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("pondex_dashboard_widgets");
      return saved ? JSON.parse(saved) : DEFAULT_WIDGETS;
    } catch { return DEFAULT_WIDGETS; }
  });

  const save = (next: string[]) => {
    setWidgets(next);
    localStorage.setItem("pondex_dashboard_widgets", JSON.stringify(next));
  };

  return { widgets, save };
}

// ── Sortable wrapper ────────────────────────────────────────────────────────

function SortableWidget({ id, customize, onRemove, children }: {
  id: string; customize: boolean; onRemove: () => void; children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        position: "relative",
      }}
    >
      {customize && (
        <div style={{ position: "absolute", top: 8, right: 8, zIndex: 10, display: "flex", gap: 4 }}>
          <button
            {...attributes} {...listeners}
            style={{ background: "#e8eaed", border: "none", borderRadius: 6, padding: "4px 6px", cursor: "grab", display: "flex", alignItems: "center" }}
          >
            <GripVertical size={14} color="#555" />
          </button>
          <button
            onClick={onRemove}
            style={{ background: "#fee2e2", border: "none", borderRadius: 6, padding: "4px 6px", cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <X size={14} color="#ef4444" />
          </button>
        </div>
      )}
      {children}
    </div>
  );
}

// ── Hero Widget — FintechX "Financial Command" style ───────────────────────

const STAT_4 = [
  { icon: "⭐", iconBg: "#eff0fe", label: "Total Portfolio Value",  value: "$58,420.00", change: "+12.4%", up: true },
  { icon: "📊", iconBg: "#fff3e0", label: "Today's Gain/Loss",      value: "+$1,240.50", change: "+2.1%",  up: true, highlight: true },
  { icon: "💼", iconBg: "#e0f7f6", label: "Active Investments",     value: "24 Assets",  change: "6",      up: true },
  { icon: "🎯", iconBg: "#fce4ec", label: "Risk Score",             value: "18 / 100",   change: "low",    up: true, badge: true },
];

function WidgetHero() {
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>Financial Command</h1>
          <p style={{ fontSize: 13, color: "#888" }}>Welcome back, Daniel. Your portfolio is up 12.4% this quarter.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ padding: "8px 16px", border: "1px solid #e0e0e0", borderRadius: 10, background: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#333" }}>Export CSV</button>
          <button style={{ padding: "8px 16px", border: "1px solid #e0e0e0", borderRadius: 10, background: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#333" }}>Share Insights</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {STAT_4.map((s, i) => (
          <div key={i} style={{
            background: s.highlight ? "#f8f9ff" : "#fff",
            borderRadius: 16, padding: "18px 20px",
            border: s.highlight ? "1px solid #e8eaff" : "1px solid #f0f0f0",
            boxShadow: s.highlight ? "0 2px 12px rgba(99,102,241,0.08)" : "none",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 38, height: 38, background: s.iconBg, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{s.icon}</div>
              {s.badge ? (
                <span style={{ fontSize: 10, fontWeight: 700, background: "#dcfce7", color: "#15803d", padding: "2px 8px", borderRadius: 20 }}>low ✓</span>
              ) : (
                <span style={{ fontSize: 12, fontWeight: 600, color: s.up ? "#22c55e" : "#ef4444", display: "flex", alignItems: "center", gap: 2 }}>
                  {s.change} <ArrowUpRight size={12} />
                </span>
              )}
            </div>
            <p style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{s.label}</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a" }}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Performance Chart Widget ────────────────────────────────────────────────

const CHART_TABS = ["Daily", "Weekly", "Monthly"] as const;

function WidgetPerformance() {
  const [tab, setTab] = useState<typeof CHART_TABS[number]>("Monthly");

  // Use AAPL candles as portfolio proxy, slice to ~6 months
  const raw = DEMO_CANDLES["AAPL"];
  const pts = tab === "Daily" ? raw.slice(-30) : tab === "Weekly" ? raw.slice(-90) : raw.slice(-180);
  const data = pts.filter((_, i) => i % (tab === "Daily" ? 1 : tab === "Weekly" ? 7 : 14) === 0).map(c => ({
    date: c.date.slice(5), // MM-DD
    portfolio: Math.round(c.close * 274),  // ~$58k baseline
    benchmark: Math.round(c.close * 230),
  }));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 16 }}>
      {/* Chart */}
      <div style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid #f0f0f0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <div>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>Investment Performance</h2>
            <p style={{ fontSize: 12, color: "#888" }}>Portfolio value over the last 6 months</p>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {CHART_TABS.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "4px 12px", border: "none", borderRadius: 20, fontSize: 12, fontWeight: 500, cursor: "pointer",
                background: "none", color: tab === t ? "#6366f1" : "#888",
                borderBottom: tab === t ? "2px solid #6366f1" : "2px solid transparent",
              }}>{t}</button>
            ))}
          </div>
        </div>
        <div style={{ height: 220, marginTop: 16 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#aaa" }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#aaa" }} tickLine={false} axisLine={false} tickFormatter={v => `$${Math.round(v/1000)}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} contentStyle={{ borderRadius: 10, border: "1px solid #f0f0f0", fontSize: 12 }} />
              <Area type="monotone" dataKey="portfolio" stroke="#22c55e" strokeWidth={2} fill="url(#grad1)" name="Portfolio" />
              <Area type="monotone" dataKey="benchmark" stroke="#6366f1" strokeWidth={2} fill="url(#grad2)" name="Benchmark" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Asset Allocation */}
      <WidgetAllocation />
    </div>
  );
}
  { asset: "Ethereum (ETH)", signal: "Trend Reversal", confidence: 82, trend: "Bullish", action: "Buy" },
  { asset: "Apple Inc. (AAPL)", signal: "Momentum",    confidence: 76, trend: "Bullish", action: "Buy" },
  { asset: "Tesla (TSLA)",     signal: "Mean Reversion",confidence: 61, trend: "Bearish", action: "Sell" },
];

function SparkLine({ up }: { up: boolean }) {
  const color = up ? "#22c55e" : "#ef4444";
  const path = up ? "M0,20 C10,18 20,10 30,12 C40,14 50,6 60,4" : "M0,4 C10,6 20,14 30,12 C40,10 50,18 60,20";
  return <svg width="60" height="24" viewBox="0 0 60 24"><path d={path} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" /></svg>;
}

function WidgetTrending() {
  const topMovers = DEMO_TICKERS.slice(0, 4);
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid #f0f0f0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700 }}>Trending Assets</h2>
        <Link to="/app/markets" style={{ fontSize: 13, color: "#6366f1", textDecoration: "none" }}>View all →</Link>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {topMovers.map((t) => {
          const q = DEMO_QUOTES[t];
          const up = q.changePercent >= 0;
          return (
            <Link key={t} to="/app/stock" search={{ ticker: t } as never} style={{ textDecoration: "none", border: "1px solid #f0f0f0", borderRadius: 12, padding: "14px 16px", display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, background: "#1a1a1a", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>{t.slice(0, 2)}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: up ? "#22c55e" : "#ef4444" }}>{up ? "+" : ""}{q.changePercent.toFixed(1)}%</span>
              </div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", marginBottom: 2 }}>{t}</p>
              <p style={{ fontSize: 11, color: "#888", marginBottom: 8 }}>{q.companyName}</p>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>${q.price.toFixed(2)}</p>
              <SparkLine up={up} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function WidgetScanner() {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid #f0f0f0" }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>Opportunity Scanner</h2>
      <p style={{ fontSize: 12, color: "#888", marginBottom: 16 }}>AI-identified trade opportunities based on pattern recognition</p>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
            {["Asset", "Signal Type", "Confidence", "Trend", "Action"].map(h => (
              <th key={h} style={{ textAlign: "left", fontSize: 11, color: "#888", fontWeight: 600, paddingBottom: 10, paddingRight: 12 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {OPPORTUNITIES.map((o, i) => (
            <tr key={i} style={{ borderBottom: "1px solid #f9f9f9" }}>
              <td style={{ padding: "12px 12px 12px 0", fontSize: 13, fontWeight: 600 }}>{o.asset}</td>
              <td style={{ padding: "12px 12px 12px 0", fontSize: 13, color: "#555" }}>{o.signal}</td>
              <td style={{ padding: "12px 12px 12px 0" }}>
                <span style={{ background: "#eff0fe", color: "#6366f1", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{o.confidence}%</span>
              </td>
              <td style={{ padding: "12px 12px 12px 0", fontSize: 13, color: o.trend === "Bullish" ? "#22c55e" : "#ef4444", fontWeight: 500 }}>{o.trend}</td>
              <td style={{ fontSize: 13, fontWeight: 700, color: o.action === "Buy" ? "#22c55e" : "#ef4444" }}>{o.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function WidgetAllocation() {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid #f0f0f0" }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 20 }}>Asset Allocation</h2>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
        <div style={{ position: "relative", width: 140, height: 140 }}>
          <svg width="140" height="140" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="54" fill="none" stroke="#e8eaed" strokeWidth="22" />
            <circle cx="70" cy="70" r="54" fill="none" stroke="#6366f1" strokeWidth="22" strokeDasharray="169 170" strokeDashoffset="0" strokeLinecap="round" />
            <circle cx="70" cy="70" r="54" fill="none" stroke="#22c55e" strokeWidth="22" strokeDasharray="85 254" strokeDashoffset="-169" strokeLinecap="round" />
            <circle cx="70" cy="70" r="54" fill="none" stroke="#f59e0b" strokeWidth="22" strokeDasharray="85 254" strokeDashoffset="-254" strokeLinecap="round" />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a" }}>$58.4k</span>
          </div>
        </div>
      </div>
      {[{ label: "Stocks", pct: 50, color: "#6366f1" }, { label: "Crypto", pct: 25, color: "#22c55e" }, { label: "Other", pct: 25, color: "#f59e0b" }].map(a => (
        <div key={a.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: a.color }} />
            <span style={{ fontSize: 13, color: "#555" }}>{a.label}</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{a.pct}%</span>
        </div>
      ))}
    </div>
  );
}

function WidgetWatchlist() {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid #f0f0f0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700 }}>Watchlist</h2>
        <Link to="/app/portfolio" style={{ fontSize: 13, color: "#6366f1", textDecoration: "none" }}>View all →</Link>
      </div>
      {DEMO_WATCHLIST.map((t, i) => {
        const q = DEMO_QUOTES[t as DemoTicker];
        if (!q) return null;
        const up = q.changePercent >= 0;
        return (
          <Link key={t} to="/app/stock" search={{ ticker: t } as never} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: i === 0 ? "none" : "1px solid #f5f5f5", textDecoration: "none" }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{t}</p>
              <p style={{ fontSize: 12, color: "#888" }}>{q.companyName}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>${q.price.toFixed(2)}</p>
              <p style={{ fontSize: 12, color: up ? "#22c55e" : "#ef4444" }}>{up ? "+" : ""}{q.changePercent.toFixed(2)}%</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function WidgetEvents() {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid #f0f0f0" }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Upcoming Events</h2>
      {DEMO_EVENTS.map((e, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: i === 0 ? "none" : "1px solid #f5f5f5" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "#888", width: 36 }}>{e.date}</span>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{e.ticker}</p>
              <p style={{ fontSize: 12, color: "#888" }}>{e.event}</p>
            </div>
          </div>
          <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", padding: "3px 8px", borderRadius: 6, background: e.type === "earnings" ? "#fef9c3" : "#dcfce7", color: e.type === "earnings" ? "#a16207" : "#15803d" }}>{e.type}</span>
        </div>
      ))}
    </div>
  );
}

const WIDGET_COMPONENTS: Record<string, () => React.ReactElement> = {
  hero: WidgetHero,
  performance: WidgetPerformance,
  trending: WidgetTrending,
  scanner: WidgetScanner,
  allocation: WidgetAllocation,
  watchlist: WidgetWatchlist,
  events: WidgetEvents,
};

// ── Dashboard ───────────────────────────────────────────────────────────────

function Dashboard() {
  const { widgets, save } = useWidgets();
  const [customize, setCustomize] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = widgets.indexOf(active.id as string);
      const newIndex = widgets.indexOf(over.id as string);
      save(arrayMove(widgets, oldIndex, newIndex));
    }
  };

  const removeWidget = (id: string) => save(widgets.filter(w => w !== id));
  const addWidget = (id: string) => save([...widgets, id]);
  const hiddenWidgets = ALL_WIDGETS.filter(w => !widgets.includes(w.id));

  return (
    <AppShell>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>Market Intelligence Center</h1>
          <p style={{ fontSize: 13, color: "#888" }}>AI-powered insights across global markets • Last updated 2m ago</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => setCustomize(!customize)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 16px", border: "none", borderRadius: 10,
              background: customize ? "#6366f1" : "#eff0fe",
              color: customize ? "#fff" : "#6366f1",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            <Settings2 size={14} /> {customize ? "Done" : "Customize"}
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", border: "1px solid #e0e0e0", borderRadius: 10, background: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", color: "#333" }}>
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* Add widget panel */}
      {customize && hiddenWidgets.length > 0 && (
        <div style={{ background: "#f8f9ff", border: "1px dashed #6366f1", borderRadius: 16, padding: "16px 20px", marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#6366f1", marginBottom: 12 }}>Add widgets</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {hiddenWidgets.map(w => (
              <button
                key={w.id}
                onClick={() => addWidget(w.id)}
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "#fff", border: "1px solid #6366f1", borderRadius: 20, fontSize: 13, color: "#6366f1", fontWeight: 500, cursor: "pointer" }}
              >
                <Plus size={13} /> {w.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Widgets */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={widgets} strategy={rectSortingStrategy}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {widgets.map(id => {
              const Component = WIDGET_COMPONENTS[id];
              if (!Component) return null;
              return (
                <SortableWidget key={id} id={id} customize={customize} onRemove={() => removeWidget(id)}>
                  <Component />
                </SortableWidget>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </AppShell>
  );
}
