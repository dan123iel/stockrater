import { Lock, Server, EyeOff, BadgeCheck, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  { icon: <Lock className="size-5" />, title: "End-to-end encryption", body: "Every data point in transit and at rest is encrypted.", from: "var(--research-from)", to: "var(--research-to)" },
  { icon: <Server className="size-5" />, title: "Secure data infrastructure", body: "Isolated, monitored, and audited environments.", from: "var(--portfolio-from)", to: "var(--portfolio-to)" },
  { icon: <EyeOff className="size-5" />, title: "Privacy-first approach", body: "We never sell your data. Ever.", from: "var(--ai-from)", to: "var(--ai-to)" },
  { icon: <BadgeCheck className="size-5" />, title: "Compliance standards", body: "Aligned with SOC 2 & GDPR practices.", from: "var(--risk-from)", to: "var(--risk-to)" },
];

export function Security() {
  return (
    <section className="bg-surface/60 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-border-soft bg-white px-3 py-1 text-xs font-medium text-ink-mid">
            Security & compliance
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Your data is protected at every level
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06}>
              <div className="h-full rounded-3xl border border-border-soft bg-white p-6">
                <div
                  className="inline-grid size-11 place-items-center rounded-xl text-white"
                  style={{ background: `linear-gradient(135deg, ${it.from}, ${it.to})` }}
                >
                  {it.icon}
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">{it.title}</h3>
                <p className="mt-1.5 text-sm text-ink-mid">{it.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-pill bg-brand px-5 py-3 text-sm font-semibold text-brand-foreground hover:bg-brand/95"
          >
            Get started now <ArrowRight className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
