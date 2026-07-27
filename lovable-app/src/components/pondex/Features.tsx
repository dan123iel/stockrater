import { ArrowRight, Bell, ShieldCheck, TrendingUp, LineChart, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { Sparkline } from "./Sparkline";

function GradientCard({
  children,
  from,
  to,
  className = "",
}: {
  children: React.ReactNode;
  from: string;
  to: string;
  className?: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/10 p-7 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] ${className}`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {children}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl border border-border-soft bg-white p-7 text-ink transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(29,29,29,0.18)] ${className}`}>
      {children}
    </div>
  );
}

function Icon({ children, gradient }: { children: React.ReactNode; gradient?: string }) {
  return (
    <div
      className="inline-grid size-10 place-items-center rounded-xl text-white"
      style={{ background: gradient ?? "rgba(255,255,255,0.15)" }}
    >
      {children}
    </div>
  );
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

          {/* 1 — Risk Analysis (dark gradient: #059669 → #84cc16) */}
          <Reveal className="md:col-span-2 md:row-span-2">
            <GradientCard from="var(--risk-from)" to="var(--risk-to)" className="h-full">
              <Icon><ShieldCheck className="size-5" /></Icon>
              <h3 className="mt-4 text-xl font-semibold">Risk Analysis</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                <li>· Real-time risk scoring</li>
                <li>· Portfolio volatility tracking</li>
                <li>· Predictive risk alerts</li>
              </ul>
              <div className="mt-6 rounded-2xl border border-white/15 bg-white/10 p-4">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>Risk score</span>
                  <span className="font-semibold text-white">Low</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full w-1/4 rounded-full bg-white/80" />
                </div>
                <div className="mt-3 text-xs text-white/60">18 / 100 — well below your threshold</div>
              </div>
            </GradientCard>
          </Reveal>

          {/* 2 — Research / Market insights (#14b8a6 → #2dd4bf) */}
          <Reveal delay={0.05} className="md:col-span-4">
            <GradientCard from="var(--research-from)" to="var(--research-to)" className="h-full">
              <div className="flex h-full items-center gap-6">
                <div className="flex-1">
                  <Icon><LineChart className="size-5" /></Icon>
                  <h3 className="mt-4 text-xl font-semibold">Research</h3>
                  <p className="mt-2 text-sm text-white/80">
                    Live signals track sentiment shifts across your watchlist in real time.
                  </p>
                </div>
                <div className="hidden w-1/2 sm:block">
                  <Sparkline />
                </div>
              </div>
            </GradientCard>
          </Reveal>

          {/* 3 — AI Signals (#4338ca → #8b5cf6) */}
          <Reveal delay={0.1} className="md:col-span-2">
            <GradientCard from="var(--ai-from)" to="var(--ai-to)" className="h-full">
              <Icon><Sparkles className="size-5" /></Icon>
              <h3 className="mt-3 text-lg font-semibold">AI Signals</h3>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight">BUY</span>
                <span className="text-xs text-white/60">signal</span>
              </div>
              <p className="mt-2 text-sm text-white/70">Real-time market data and predictive analysis.</p>
            </GradientCard>
          </Reveal>

          {/* 4 — Portfolio (#2563eb → #06b6d4) */}
          <Reveal delay={0.15} className="md:col-span-2">
            <GradientCard from="var(--portfolio-from)" to="var(--portfolio-to)" className="h-full">
              <Icon><TrendingUp className="size-5" /></Icon>
              <h3 className="mt-3 text-lg font-semibold">Portfolio</h3>
              <p className="mt-2 text-sm text-white/75">See your entire financial picture in one place.</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-2xl font-bold tabular-nums">$58,420</span>
                <span className="text-xs font-semibold text-white/80">+12.4%</span>
              </div>
            </GradientCard>
          </Reveal>

          {/* 5 — Insider Data (#f97316 → #fb7185) — full width */}
          <Reveal delay={0.2} className="md:col-span-6">
            <GradientCard from="var(--insider-from)" to="var(--insider-to)" className="!p-6">
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <Icon><Bell className="size-5" /></Icon>
                  <div>
                    <h3 className="text-lg font-semibold">Insider Data & Smart Alerts</h3>
                    <p className="mt-1 text-sm text-white/75">Only the signals that matter — no noise.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                    AAPL crossed HOLD → BUY
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80">
                    Portfolio risk +8%
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                    TSLA earnings tomorrow
                  </span>
                </div>
              </div>
            </GradientCard>
          </Reveal>

        </div>

        <Reveal delay={0.1} className="mt-10 text-center">
          <a href="#features" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
            View all features <ArrowRight className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
