import { User, Users, Briefcase, Activity } from "lucide-react";
import { Reveal } from "./Reveal";

const cases = [
  {
    icon: <User className="size-5" />,
    title: "Individual investors",
    body: "Track your portfolio, get AI insights, make smarter decisions.",
    stat: "+32%",
    statLabel: "Faster decision-making",
    gradient: "from-brand/90 to-brand/60",
  },
  {
    icon: <Users className="size-5" />,
    title: "Financial teams",
    body: "Collaborate, monitor investments, make data-driven decisions.",
    stat: "Real-time",
    statLabel: "Collaboration",
    gradient: "from-ink to-ink/80",
  },
  {
    icon: <Briefcase className="size-5" />,
    title: "Wealth managers",
    body: "Manage multiple client portfolios efficiently.",
    stat: "10+",
    statLabel: "Portfolios from one dashboard",
    gradient: "from-data to-data/70",
  },
  {
    icon: <Activity className="size-5" />,
    title: "Active traders",
    body: "Stay ahead with real-time alerts and AI signals.",
    stat: "2×",
    statLabel: "Better goal tracking",
    gradient: "from-urgency to-urgency/70",
  },
];

export function UseCases() {
  return (
    <section className="bg-white py-24">
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
              <div className={`group relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br ${c.gradient} p-6 text-white transition-transform hover:-translate-y-1`}>
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
