import { ArrowRight, Bell, ShieldCheck, TrendingUp, LineChart, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { Sparkline } from "./Sparkline";

function Card({
  children,
  className = "",
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark" | "brand";
}) {
  const toneClass =
    tone === "dark"
      ? "bg-ink text-white border-white/5"
      : tone === "brand"
        ? "bg-brand text-brand-foreground border-brand/20"
        : "bg-white text-ink border-border-soft";
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(29,29,29,0.25)] ${toneClass} ${className}`}
    >
      {children}
    </div>
  );
}

function Icon({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" | "brand" }) {
  const bg =
    tone === "dark" ? "bg-white/10 text-white" : tone === "brand" ? "bg-white/15 text-white" : "bg-brand-soft text-brand";
  return <div className={`inline-grid size-10 place-items-center rounded-xl ${bg}`}>{children}</div>;
}

export function Features() {
  return (
    <section id="features" className="bg-surface/50 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-border-soft bg-white px-3 py-1 text-xs font-medium text-ink-mid">
            Core features
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Everything you need to invest confidently
          </h2>
          <p className="mt-4 text-lg text-ink-mid">
            Professional tools designed for active traders and long-term investors.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-[220px_220px_220px]">
          {/* 1 — Advanced risk analysis (dark, tall left) */}
          <Reveal className="md:col-span-2 md:row-span-2">
            <Card tone="dark" className="h-full">
              <Icon tone="dark"><ShieldCheck className="size-5" /></Icon>
              <h3 className="mt-4 text-xl font-semibold">Advanced risk analysis</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li>· Real-time risk scoring</li>
                <li>· Portfolio volatility tracking</li>
                <li>· Predictive risk alerts</li>
              </ul>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Risk score</span>
                  <span className="text-data">Low</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-1/4 rounded-full bg-data" />
                </div>
                <div className="mt-3 text-xs text-white/50">18 / 100 — well below your threshold</div>
              </div>
            </Card>
          </Reveal>

          {/* 2 — Market insights (brand, wide) */}
          <Reveal delay={0.05} className="md:col-span-4">
            <Card tone="brand" className="h-full">
              <div className="flex h-full items-center gap-6">
                <div className="flex-1">
                  <Icon tone="brand"><LineChart className="size-5" /></Icon>
                  <h3 className="mt-4 text-xl font-semibold">Market insights</h3>
                  <p className="mt-2 text-sm text-white/80">
                    Live sparkline signals track sentiment shifts across your watchlist.
                  </p>
                </div>
                <div className="hidden w-1/2 sm:block">
                  <Sparkline />
                </div>
              </div>
            </Card>
          </Reveal>

          {/* 3 — AI powered (light, wide-ish) */}
          <Reveal delay={0.1} className="md:col-span-2">
            <Card className="h-full">
              <Icon><Sparkles className="size-5" /></Icon>
              <h3 className="mt-3 text-lg font-semibold">AI-powered insights</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight text-data">BUY</span>
                <span className="text-xs text-ink-mid">signal</span>
              </div>
              <p className="mt-2 text-sm text-ink-mid">Real-time market data and predictive analysis.</p>
            </Card>
          </Reveal>

          {/* 4 — Portfolio tracking */}
          <Reveal delay={0.15} className="md:col-span-2">
            <Card className="h-full">
              <Icon><TrendingUp className="size-5" /></Icon>
              <h3 className="mt-3 text-lg font-semibold">Portfolio tracking</h3>
              <p className="mt-2 text-sm text-ink-mid">
                See your entire financial picture in one place.
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-2xl font-bold tabular-nums">$58,420</span>
                <span className="text-xs font-semibold text-data">+12.4%</span>
              </div>
            </Card>
          </Reveal>

          {/* 5 — Smart alerts */}
          <Reveal delay={0.2} className="md:col-span-6">
            <Card className="h-full !p-6">
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <Icon><Bell className="size-5" /></Icon>
                  <div>
                    <h3 className="text-lg font-semibold">Smart alerts</h3>
                    <p className="mt-1 text-sm text-ink-mid">
                      Only the signals that matter — no noise.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-brand-soft px-3 py-1.5 text-xs font-medium text-brand">
                    AAPL crossed HOLD → BUY
                  </span>
                  <span className="rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-ink-mid">
                    Portfolio risk +8%
                  </span>
                  <span className="rounded-full bg-data/10 px-3 py-1.5 text-xs font-medium text-data">
                    TSLA earnings tomorrow
                  </span>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-10 text-center">
          <a
            href="#features"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
          >
            View all features <ArrowRight className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
