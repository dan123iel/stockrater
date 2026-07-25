import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/app/AppShell";
import { DEMO_QUOTES, DEMO_TICKERS, DEMO_WATCHLIST, DEMO_EVENTS, type DemoTicker } from "@/lib/demo-data";

export const Route = createFileRoute("/_authenticated/app/")({
  head: () => ({
    meta: [
      { title: "Dashboard — pondex_" },
      { name: "description", content: "Your watchlist, top movers, and upcoming events." },
      { property: "og:title", content: "Dashboard — pondex_" },
      { property: "og:description", content: "Your watchlist and top movers." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function greet() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function Dashboard() {
  const [name, setName] = useState<string>("");
  const [watchlist, setWatchlist] = useState<string[]>(DEMO_WATCHLIST);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const email = data.user?.email ?? "";
      setName(email.split("@")[0] || "there");
    });
    supabase
      .from("watchlist")
      .select("ticker")
      .order("added_at", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setWatchlist(data.map((r) => r.ticker));
      });
  }, []);

  const topMovers = DEMO_TICKERS.slice().sort(
    (a, b) => Math.abs(DEMO_QUOTES[b].changePercent) - Math.abs(DEMO_QUOTES[a].changePercent),
  );

  const changeColor = (n: number) => (n > 0 ? "var(--color-up)" : n < 0 ? "var(--color-down)" : "var(--text-secondary)");

  return (
    <AppShell>
      <div className="mx-auto max-w-[1280px] px-6 md:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {greet()}, {name}.
        </h1>

        <div className="mt-8 grid lg:grid-cols-[1fr_360px] gap-8">
          <div className="space-y-6">
            <div className="card-flat flex flex-wrap items-baseline justify-between gap-3">
              <div>
                <p className="section-label">Watchlist</p>
                <p className="mt-1 text-lg font-semibold">{watchlist.length} stocks</p>
              </div>
              <p className="text-sm tabular" style={{ color: "var(--text-secondary)" }}>Today: —</p>
              <Link to="/app/portfolio" className="text-sm font-medium underline underline-offset-4">View portfolio →</Link>
            </div>

            <div>
              <p className="section-label">Top movers</p>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                {topMovers.map((t) => {
                  const q = DEMO_QUOTES[t];
                  return (
                    <Link key={t} to="/app/stock" search={{ ticker: t } as never} className="card-flat hover:border-[var(--text-primary)] transition-colors">
                      <p className="text-sm font-semibold">{t}</p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{q.companyName}</p>
                      <p className="mt-3 text-lg tabular font-semibold">${q.price.toFixed(2)}</p>
                      <p className="text-xs tabular mt-0.5" style={{ color: changeColor(q.changePercent) }}>
                        {q.changePercent > 0 ? "+" : ""}
                        {q.changePercent.toFixed(2)}%
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="section-label">Watchlist</p>
              <div className="mt-4 card-flat p-0 overflow-hidden">
                {watchlist.map((t, i) => {
                  const q = DEMO_QUOTES[t as DemoTicker];
                  if (!q) return null;
                  return (
                    <Link key={t} to="/app/stock" search={{ ticker: t } as never} className="flex items-center justify-between px-6 py-4 hover:bg-[var(--bg-subtle)]" style={{ borderTop: i === 0 ? "none" : "1px solid var(--border-color)" }}>
                      <div>
                        <p className="text-sm font-semibold">{t}</p>
                        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{q.companyName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold tabular">${q.price.toFixed(2)}</p>
                        <p className="text-xs tabular" style={{ color: changeColor(q.changePercent) }}>
                          {q.changePercent > 0 ? "+" : ""}{q.changePercent.toFixed(2)}%
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card-flat" style={{ background: "var(--bg-dark)", borderColor: "var(--bg-dark)", color: "var(--text-inverse)" }}>
              <p className="section-label" style={{ color: "var(--text-muted)" }}>Robo Advisor</p>
              <p className="mt-3 text-xl font-semibold">Investing on autopilot.</p>
              <Link to="/app/robo" className="btn-light mt-6 inline-flex text-sm">Get started →</Link>
            </div>

            <div>
              <p className="section-label">Upcoming events</p>
              <div className="mt-4 card-flat p-0">
                {DEMO_EVENTS.map((e, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-4" style={{ borderTop: i === 0 ? "none" : "1px solid var(--border-color)" }}>
                    <div className="flex items-center gap-4">
                      <span className="text-xs tabular w-12" style={{ color: "var(--text-secondary)" }}>{e.date}</span>
                      <div>
                        <p className="text-sm font-semibold">{e.ticker}</p>
                        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{e.event}</p>
                      </div>
                    </div>
                    <span
                      className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        background: e.type === "earnings" ? "var(--badge-hold-bg)" : "var(--badge-buy-bg)",
                        color: e.type === "earnings" ? "var(--badge-hold-text)" : "var(--badge-buy-text)",
                      }}
                    >
                      {e.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
