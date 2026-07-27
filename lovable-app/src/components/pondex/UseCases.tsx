import { User, Search, TrendingUp, BarChart2 } from "lucide-react";
import { Reveal } from "./Reveal";

const cases = [
  {
    icon: <User className="size-5" />,
    title: "Passive Investor",
    body: "Too many conflicting signals, not enough time. One score, one verdict — in 60 seconds.",
    stat: "+32%",
    statLabel: "Faster decisions",
    from: "var(--portfolio-from)",
    to:   "var(--portfolio-to)",
  },
  {
    icon: <Search className="size-5" />,
    title: "Aspiring Investor",
    body: "Too complex — don't know where to start. pondex_ explains every score in plain language. Zero prior knowledge needed.",
    stat: "0",
    statLabel: "Prior knowledge needed",
    from: "var(--ai-from)",
    to:   "var(--ai-to)",
  },
  {
    icon: <BarChart2 className="size-5" />,
    title: "Active Researcher",
    body: "93% say their research process is broken. Portfolio analysis + exit signals automated.",
    stat: "93%",
    statLabel: "Say process is broken",
    from: "var(--research-from)",
    to:   "var(--research-to)",
  },
  {
    icon: <TrendingUp className="size-5" />,
    title: "Value Investor",
    body: "Can't find undervalued stocks systematically. Strategy-match scoring + peer comparison.",
    stat: "5",
    statLabel: "Factors, fully sourced",
    from: "var(--value-from)",
    to:   "var(--value-to)",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-border-soft bg-surface px-3 py-1 text-xs font-medium text-ink-mid">
            Use cases
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Who this platform is built for
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <div
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 p-6 text-white transition-transform hover:-translate-y-1"
                style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})` }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 80% 0%, rgba(255,255,255,0.35), transparent 55%)",
                  }}
                />
                <div className="relative">
                  <div className="inline-grid size-10 place-items-center rounded-xl bg-white/15 backdrop-blur">
                    {c.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{c.body}</p>
                </div>
                <div className="relative mt-6 border-t border-white/15 pt-4">
                  <div className="text-2xl font-bold tracking-tight">{c.stat}</div>
                  <div className="text-xs text-white/70">{c.statLabel}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
