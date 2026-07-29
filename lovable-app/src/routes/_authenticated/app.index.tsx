import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app/AppShell";
import { DEMO_QUOTES, DEMO_TICKERS, DEMO_WATCHLIST, DEMO_EVENTS, type DemoTicker } from "@/lib/demo-data";
import { Download, Settings2, ArrowUpRight, ArrowDownRight, X, GripVertical, Plus } from "lucide-react";
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
  { id: "stats",       label: "Market Stats",        description: "Sentiment, top sector, volatility" },
  { id: "trending",    label: "Trending Assets",      description: "Top 4 movers with sparklines" },
  { id: "scanner",     label: "Opportunity Scanner",  description: "AI trade signals" },
  { id: "allocation",  label: "Asset Allocation",     description: "Portfolio donut chart" },
  { id: "watchlist",   label: "Watchlist",            description: "Your saved stocks" },
  { id: "events",      label: "Upcoming Events",      description: "Earnings & dividends" },
];

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

// ── Sub-components ──────────────────────────────────────────────────────────

const STAT_CARDS = [
  { icon: "⭐", label: "Global Market Sentiment", value: "Bullish (74%)", change: "+12.4%", up: true },
  { icon: "⭐", label: "Top Performing Sector",   value: "Technology",    change: "+4.8%",  up: true },
  { icon: "⭐", label: "Market Volatility Index", value: "14.28 VIX",     change: "-2.4%",  up: false },
];

const OPPORTUNITIES = [
  { asset: "Ethereum (ETH)", signal: "Trend Reversal", confidence: 82, trend: "Bullish", action: "Buy" },
  { asset: "Apple Inc. (AAPL)", signal: "Momentum",    confidence: 76, trend: "Bullish", action: "Buy" },
  { asset: "Tesla (TSLA)",     signal: "Mean Reversion",confidence: 61, trend: "Bearish", action: "Sell" },
];

function SparkLine({ up }: { up: boolean }) {
  const color = up ? "#22c55e" : "#ef4444";
  const path = up ? "M0,20 C10,18 20,10 30,12 C40,14 50,6 60,4" : "M0,4 C10,6 20,14 30,12 C40,10 50,18 60,20";
  return <svg width="60" height="24" viewBox="0 0 60 24"><path d={path} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" /></svg>;
}

function WidgetStats() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
      {STAT_CARDS.map((c, i) => (
        <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", border: "1px solid #f0f0f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, background: "#eff0fe", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{c.icon}</div>
            <span style={{ fontSize: 13, fontWeight: 600, color: c.up ? "#22c55e" : "#ef4444", display: "flex", alignItems: "center", gap: 2 }}>
              {c.change} {c.up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            </span>
          </div>
          <p style={{ fontSize: 12, color: "#888", marginBottom: 4 }}>{c.label}</p>
          <p style={{ fontSize: 22, fontWeight: 700, color: "#1a1a1a" }}>{c.value}</p>
        </div>
      ))}
    </div>
  );
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
  stats: WidgetStats,
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
