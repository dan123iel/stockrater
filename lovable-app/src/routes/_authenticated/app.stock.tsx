import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/app/AppShell";
import {
  DEMO_CANDLES,
  DEMO_QUOTES,
  DEMO_SCORES,
  DEMO_TICKERS,
  PEER_MAP,
  isDemoTicker,
  verdictColor,
  type DemoTicker,
} from "@/lib/demo-data";
import { toast } from "sonner";

const searchSchema = z.object({ ticker: z.string().optional() });

export const Route = createFileRoute("/_authenticated/app/stock")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Stock Analysis — pondex_" },
      { name: "description", content: "Get a 0–100 score, verdict, and cited factor breakdown for any stock." },
      { property: "og:title", content: "Stock Analysis — pondex_" },
      { property: "og:description", content: "0–100 score with sources for any stock." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StockPage,
});

function Gauge({ score }: { score: number }) {
  const [displayed, setDisplayed] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 1200;
    let raf: number;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplayed(Math.round(score * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  const color =
    score >= 70 ? "var(--color-up)" : score >= 50 ? "var(--color-hold)" : "var(--color-down)";
  const r = 80;
  const cx = 100;
  const cy = 100;
  const angle = (displayed / 100) * Math.PI; // 0..π
  const x = cx - r * Math.cos(angle);
  const y = cy - r * Math.sin(angle);
  const circumference = Math.PI * r;
  const dash = (displayed / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-full max-w-[200px]">
        <path d={`M 20 100 A ${r} ${r} 0 0 1 180 100`} stroke="var(--border-color)" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path
          d={`M 20 100 A ${r} ${r} 0 0 1 180 100`}
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          style={{ transition: "stroke-dasharray 400ms ease-out" }}
        />
        <line x1={cx} y1={cy} x2={x} y2={y} stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="4" fill="var(--text-primary)" />
      </svg>
      <p className="mt-2 text-5xl font-bold tabular" style={{ letterSpacing: "-0.02em" }}>
        {displayed}
        <span className="text-xl" style={{ color: "var(--text-secondary)" }}>/100</span>
      </p>
    </div>
  );
}

function RangeSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const opts = ["1W", "1M", "3M", "6M", "1Y"];
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-lg" style={{ background: "var(--bg-subtle)" }}>
      {opts.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className="text-xs tabular font-medium"
          style={{
            padding: "4px 10px",
            borderRadius: 6,
            background: value === o ? "var(--bg-dark)" : "transparent",
            color: value === o ? "var(--text-inverse)" : "var(--text-secondary)",
          }}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function StockPage() {
  const { ticker } = Route.useSearch();
  const [input, setInput] = useState((ticker ?? "").toUpperCase());
  const [current, setCurrent] = useState<string | null>(ticker?.toUpperCase() ?? null);
  const [error, setError] = useState<string | null>(null);
  const [range, setRange] = useState("6M");
  const [tab, setTab] = useState<"overview" | "financials" | "learn">("overview");
  const [showBanner, setShowBanner] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);

  useEffect(() => {
    setInput((ticker ?? "").toUpperCase());
    setCurrent(ticker?.toUpperCase() ?? null);
  }, [ticker]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = window.localStorage.getItem("pondex_onboarding_banner_seen");
    if (!seen && ticker === "AAPL") {
      setShowBanner(true);
      const t = setTimeout(() => dismissBanner(), 8000);
      return () => clearTimeout(t);
    }
  }, [ticker]);

  const dismissBanner = () => {
    setShowBanner(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("pondex_onboarding_banner_seen", "1");
    }
  };

  const runVerdict = async () => {
    const t = input.trim().toUpperCase();
    if (!t) return;
    if (!isDemoTicker(t)) {
      setError(t);
      setCurrent(null);
      return;
    }

    // Free tier gate: 1 verdict per day
    const today = new Date().toISOString().split("T")[0];
    try {
      const { data: rows } = await supabase
        .from("daily_verdicts")
        .select("count")
        .eq("date", today)
        .maybeSingle();
      const count = rows?.count ?? 0;
      if (count >= 1 && current !== t) {
        setGateOpen(true);
        return;
      }
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        await supabase.from("daily_verdicts").upsert(
          { user_id: userData.user.id, date: today, count: count + 1 },
          { onConflict: "user_id,date" },
        );
      }
    } catch {
      // ignore – demo fallback
    }

    setError(null);
    setCurrent(t);
  };

  const emptyState = !current && !error;
  const q = current && isDemoTicker(current) ? DEMO_QUOTES[current as DemoTicker] : null;
  const s = current && isDemoTicker(current) ? DEMO_SCORES[current as DemoTicker] : null;
  const candles = current && isDemoTicker(current) ? DEMO_CANDLES[current as DemoTicker] : [];
  const rangedCandles = useMemo(() => {
    const map: Record<string, number> = { "1W": 7, "1M": 30, "3M": 90, "6M": 180, "1Y": 252 };
    return candles.slice(-Math.min(candles.length, map[range] ?? 180));
  }, [candles, range]);

  const changeColor = (n: number) => (n > 0 ? "var(--color-up)" : n < 0 ? "var(--color-down)" : "var(--text-secondary)");

  return (
    <AppShell>
      {showBanner && (
        <div
          className="flex items-center justify-between px-6 py-3 text-sm"
          style={{ background: "var(--bg-dark)", color: "var(--text-inverse)" }}
        >
          <span>Welcome to pondex_ — this is your first verdict. Every number cites its source.</span>
          <button onClick={dismissBanner} aria-label="Dismiss" className="text-xl leading-none" style={{ color: "var(--text-muted)" }}>×</button>
        </div>
      )}

      <div className="mx-auto max-w-[1280px] px-6 md:px-8 py-8">
        {/* Header search */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
          <div>
            {q && (
              <>
                <p className="section-label">{current} · {q.exchangeShortName} · {q.sector}</p>
                <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">{q.companyName}</h1>
                <p className="mt-2 text-2xl tabular font-semibold">
                  ${q.price.toFixed(2)}{" "}
                  <span className="text-base font-normal" style={{ color: changeColor(q.change) }}>
                    {q.change > 0 ? "+" : ""}{q.change.toFixed(2)} ({q.changePercent > 0 ? "+" : ""}{q.changePercent.toFixed(2)}%)
                  </span>
                </p>
              </>
            )}
            {!q && (
              <>
                <p className="section-label">Stock</p>
                <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">Get your verdict.</h1>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runVerdict()}
              placeholder="Ticker…"
              className="input-flat max-w-[200px] uppercase"
            />
            <button onClick={runVerdict} className="btn-dark">GET VERDICT →</button>
          </div>
        </div>

        <p className="mt-3 text-xs" style={{ color: "var(--text-muted)" }}>
          ⚠ Research tool only · Not financial advice
        </p>

        {emptyState && (
          <div className="mt-16 text-center" style={{ color: "var(--text-muted)" }}>
            <p>Enter a ticker to see its verdict.</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {DEMO_TICKERS.map((t) => (
                <button
                  key={t}
                  onClick={() => { setInput(t); setCurrent(t); setError(null); }}
                  className="text-xs font-semibold tracking-wider px-3 py-1.5 rounded-full border"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-10 card-flat text-center">
            <p className="text-sm">Ticker not found or not in demo set.</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {DEMO_TICKERS.map((t) => (
                <button
                  key={t}
                  onClick={() => { setInput(t); setCurrent(t); setError(null); }}
                  className="text-xs font-semibold tracking-wider px-3 py-1.5 rounded-full border"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {q && s && current && (
          <>
            {/* Tabs */}
            <div className="mt-8 flex gap-0 border-b overflow-x-auto" style={{ borderColor: "var(--border-color)" }}>
              {(["overview", "financials", "learn"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-4 h-11 text-sm capitalize whitespace-nowrap"
                  style={{
                    color: tab === t ? "var(--text-primary)" : "var(--text-secondary)",
                    fontWeight: tab === t ? 600 : 400,
                    borderBottom: tab === t ? "2px solid var(--text-primary)" : "2px solid transparent",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {tab === "overview" && (
              <div className="mt-8 space-y-8">
                {/* Chart */}
                <div className="card-flat">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="section-label">Price chart</p>
                      <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                        Illustrative · Live chart requires backend
                      </p>
                    </div>
                    <RangeSelector value={range} onChange={setRange} />
                  </div>
                  <div className="mt-4" style={{ height: 260 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={rangedCandles} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                        <defs>
                          <linearGradient id="pfill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(10,10,10,0.08)" />
                            <stop offset="100%" stopColor="rgba(10,10,10,0)" />
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="#F3F4F6" vertical={false} />
                        <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} minTickGap={40} />
                        <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} orientation="right" domain={["auto", "auto"]} />
                        <Tooltip
                          contentStyle={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, fontSize: 13, fontWeight: 600 }}
                          formatter={(v: number) => [`$${v.toFixed(2)}`, "Close"]}
                        />
                        <Area type="monotone" dataKey="close" stroke="#0A0A0A" strokeWidth={1.5} fill="url(#pfill)" dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-4 card-flat">
                    <p className="section-label">Verdict</p>
                    <div className="mt-4">
                      <Gauge score={s.score} />
                    </div>
                    <div className="mt-4 flex items-center gap-2 justify-center">
                      <span
                        className={
                          verdictColor(s.score) === "buy" ? "badge-buy" : verdictColor(s.score) === "hold" ? "badge-hold" : "badge-sell"
                        }
                        style={{ padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}
                      >
                        {s.verdict}
                      </span>
                      <span className="badge-fit" style={{ padding: "4px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: "0.08em" }}>
                        {s.score >= 80 ? "STRONG FIT" : s.score >= 65 ? "GOOD FIT" : s.score >= 50 ? "MODERATE FIT" : "WEAK FIT"}
                      </span>
                    </div>
                    <p className="mt-4 text-sm" style={{ color: "var(--text-secondary)" }}>{s.summary}</p>
                    <p className="mt-4 text-[11px]" style={{ color: "var(--text-muted)" }}>
                      ⚠ Research tool only · Not financial advice
                    </p>
                  </div>

                  <div className="lg:col-span-8 card-flat">
                    <p className="section-label">Factor breakdown</p>
                    <div className="mt-6 space-y-5">
                      {s.factors.map((f, i) => (
                        <div key={f.name}>
                          <div className="flex items-baseline justify-between gap-3">
                            <p className="text-sm font-semibold">{f.name}</p>
                            <p className="text-sm tabular font-semibold">{f.score}<span style={{ color: "var(--text-secondary)" }}>/100</span></p>
                          </div>
                          <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>{f.explanation}</p>
                          <div className="mt-2 h-[3px] rounded-full overflow-hidden" style={{ background: "var(--bg-subtle)" }}>
                            <div
                              style={{
                                width: `${f.score}%`,
                                height: "100%",
                                borderRadius: 50,
                                background: f.score >= 70 ? "var(--color-up)" : f.score >= 45 ? "var(--color-hold)" : "var(--color-down)",
                                transition: "width 400ms cubic-bezier(0.16,1,0.3,1)",
                                transitionDelay: `${i * 70}ms`,
                              }}
                            />
                          </div>
                          <p className="mt-1 text-[11px]" style={{ color: "var(--text-muted)" }}>Source: {f.source}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Key metrics strip */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {[
                    { l: "Market Cap", v: `$${(q.marketCap / 1e12).toFixed(2)}T` },
                    { l: "Price", v: `$${q.price.toFixed(2)}` },
                    { l: "52W High", v: `$${q["52wHigh"].toFixed(2)}` },
                    { l: "52W Low", v: `$${q["52wLow"].toFixed(2)}` },
                    { l: "Beta", v: q.beta.toFixed(2) },
                    { l: "Sector", v: q.sector },
                  ].map((m) => (
                    <div key={m.l} className="card-flat">
                      <p className="section-label">{m.l}</p>
                      <p className="mt-2 text-lg font-semibold tabular">{m.v}</p>
                    </div>
                  ))}
                </div>

                {/* Similar stocks */}
                <div>
                  <p className="section-label">Similar stocks</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(PEER_MAP[current as DemoTicker] ?? []).map((t) => (
                      <Link
                        key={t}
                        to="/app/stock"
                        search={{ ticker: t } as never}
                        className="text-xs font-semibold tracking-wider px-3 py-1.5 rounded-full border hover:border-[var(--text-primary)]"
                        style={{ borderColor: "var(--border-color)" }}
                      >
                        {t}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "financials" && (
              <div className="mt-8 card-flat text-center py-16">
                <p className="section-label">Financials</p>
                <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                  Financial statements coming Q4 2026.
                </p>
              </div>
            )}

            {tab === "learn" && (
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="card-flat">
                  <p className="section-label">About {current}</p>
                  <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>{q.description}</p>
                  <div className="mt-4 space-y-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    <p>Sector: {q.sector}</p>
                    <p>Industry: {q.industry}</p>
                    <p>Country: {q.country}</p>
                  </div>
                </div>
                <div className="card-flat">
                  <p className="section-label">Glossary</p>
                  <dl className="mt-3 space-y-3 text-sm">
                    <div><dt className="font-semibold">P/E</dt><dd style={{ color: "var(--text-secondary)" }}>Price-to-earnings ratio.</dd></div>
                    <div><dt className="font-semibold">Moat</dt><dd style={{ color: "var(--text-secondary)" }}>Sustainable competitive advantage.</dd></div>
                    <div><dt className="font-semibold">FCF Yield</dt><dd style={{ color: "var(--text-secondary)" }}>Free cash flow ÷ market cap.</dd></div>
                    <div><dt className="font-semibold">Beta</dt><dd style={{ color: "var(--text-secondary)" }}>Volatility vs. the market.</dd></div>
                  </dl>
                </div>
                <div className="card-flat">
                  <p className="section-label">Data sources</p>
                  <ul className="mt-3 text-sm space-y-2" style={{ color: "var(--text-secondary)" }}>
                    <li>Yahoo Finance — price, ratios, financials</li>
                    <li>SEC EDGAR — official filings: 10-K, 10-Q</li>
                    <li>Groq AI — plain-language summaries via Llama 3.3</li>
                  </ul>
                  <p className="mt-4 text-xs" style={{ color: "var(--text-muted)" }}>
                    pondex_ is a research tool. All investment decisions are yours.
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {gateOpen && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" style={{ background: "rgba(0,0,0,0.4)" }} onClick={() => setGateOpen(false)}>
            <div className="w-full md:max-w-md" style={{ background: "var(--bg-primary)", borderRadius: 16, padding: 24 }} onClick={(e) => e.stopPropagation()}>
              <p className="text-lg font-semibold">You've used your free verdict for today.</p>
              <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>Upgrade to Pro for unlimited verdicts, peer comparison, and AI chat.</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• Unlimited verdicts per day</li>
                <li>• Peer comparison (2 stocks + sector average)</li>
                <li>• AI chat with source attribution</li>
              </ul>
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
