import { Link2, Brain, CheckCircle2 } from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  {
    n: "01",
    icon: <Link2 className="size-5" />,
    title: "Connect your accounts",
    body: "Securely link your bank, trading, and investment accounts.",
    from: "var(--portfolio-from)", to: "var(--portfolio-to)",
  },
  {
    n: "02",
    icon: <Brain className="size-5" />,
    title: "Get AI analysis",
    body: "Our system analyzes market data, your portfolio, and risk factors.",
    from: "var(--ai-from)", to: "var(--ai-to)",
  },
  {
    n: "03",
    icon: <CheckCircle2 className="size-5" />,
    title: "Make confident decisions",
    body: "Receive clear buy / hold / sell recommendations.",
    from: "var(--research-from)", to: "var(--research-to)",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div className="inline-flex items-center rounded-full border border-border-soft bg-surface px-3 py-1 text-xs font-medium text-ink-mid">
              How it works
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink md:text-5xl">
              Start investing in minutes
            </h2>
            <p className="mt-4 max-w-md text-lg text-ink-mid">
              Connect your accounts, let AI analyze your data, get clear insights.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold tracking-tight text-brand">100%</div>
                <div className="mt-1 text-sm text-ink-mid">Secure, encrypted data</div>
              </div>
              <div>
                <div className="text-3xl font-bold tracking-tight text-brand">2 min</div>
                <div className="mt-1 text-sm text-ink-mid">To set up</div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="group flex gap-5 rounded-3xl border border-border-soft bg-white p-6 transition-shadow hover:shadow-[0_20px_50px_-25px_rgba(29,29,29,0.2)]">
                  <div className="shrink-0">
                    <div
                    className="grid size-14 place-items-center rounded-2xl font-mono text-lg font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}
                  >
                      {s.n}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-ink">
                      {s.icon}
                      <h3 className="text-lg font-semibold">{s.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-ink-mid">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
