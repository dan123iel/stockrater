import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

type Plan = {
  name: string;
  tag: string;
  monthly: number | null;
  yearly: number | null;
  desc: string;
  features: string[];
  cta: string;
  featured?: boolean;
  custom?: boolean;
  trust?: string;
};

const plans: Plan[] = [
  {
    name: "Starter",
    tag: "Individual investors",
    monthly: 19,
    yearly: 16,
    desc: "Get started with essential research tools.",
    features: [
      "Connect up to 5 accounts",
      "Portfolio tracking",
      "Basic AI insights",
      "Market alerts",
      "Email support",
    ],
    cta: "Get started",
  },
  {
    name: "Pro",
    tag: "Popular",
    monthly: 39,
    yearly: 32,
    desc: "Everything serious investors need.",
    features: [
      "Unlimited connections",
      "Advanced AI insights",
      "Risk analysis",
      "Smart automation",
      "Priority support",
    ],
    cta: "Get started",
    featured: true,
    trust: "7-day free trial · No credit card · Cancel anytime",
  },
  {
    name: "Enterprise",
    tag: "Organizations",
    monthly: null,
    yearly: null,
    desc: "Need a custom solution? Talk with our team.",
    features: [
      "Custom integrations",
      "Dedicated account manager",
      "SSO & advanced security",
      "SLA & audit logs",
      "Onboarding support",
    ],
    cta: "Contact sales",
    custom: true,
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="bg-white py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-border-soft bg-surface px-3 py-1 text-xs font-medium text-ink-mid">
            Subscription plans
          </div>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Transparent pricing without hidden fees
          </h2>

          <div className="mt-8 inline-flex items-center gap-2 rounded-pill border border-border-soft bg-surface p-1">
            {(["monthly", "yearly"] as const).map((k) => {
              const active = (k === "yearly") === yearly;
              return (
                <button
                  key={k}
                  onClick={() => setYearly(k === "yearly")}
                  className={`relative rounded-pill px-4 py-1.5 text-sm font-semibold transition-colors ${
                    active ? "text-white" : "text-ink-mid"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="price-pill"
                      className="absolute inset-0 rounded-pill bg-ink"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative inline-flex items-center gap-2">
                    {k === "monthly" ? "Monthly" : "Yearly"}
                    {k === "yearly" && (
                      <span className="rounded-full bg-data/15 px-1.5 py-0.5 text-[10px] font-bold text-data">
                        20% off
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.06}>
              <div
                className={`relative flex h-full flex-col rounded-3xl border p-7 ${
                  p.featured
                    ? "border-brand bg-ink text-white shadow-[0_30px_80px_-30px_rgba(91,91,214,0.5)]"
                    : "border-border-soft bg-white text-ink"
                }`}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Popular
                  </div>
                )}
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-lg font-semibold">{p.name}</div>
                    <div className={`text-xs ${p.featured ? "text-white/60" : "text-ink-mid"}`}>
                      {p.tag}
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  {p.custom ? (
                    <div className="text-4xl font-bold tracking-tight">Custom</div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold tracking-tight tabular-nums">
                        ${yearly ? p.yearly : p.monthly}
                      </span>
                      <span className={`text-sm ${p.featured ? "text-white/60" : "text-ink-mid"}`}>
                        /month
                      </span>
                    </div>
                  )}
                  {!p.custom && yearly && (
                    <div className={`mt-1 text-xs ${p.featured ? "text-data" : "text-data"}`}>
                      Billed yearly — save 20%
                    </div>
                  )}
                </div>

                <p className={`mt-4 text-sm ${p.featured ? "text-white/70" : "text-ink-mid"}`}>
                  {p.desc}
                </p>

                <ul className={`mt-6 flex-1 space-y-3 border-t pt-6 text-sm ${p.featured ? "border-white/10" : "border-border-soft"}`}>
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className={`mt-0.5 size-4 shrink-0 ${p.featured ? "text-data" : "text-brand"}`} />
                      <span className={p.featured ? "text-white/85" : "text-ink"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#top"
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-pill px-4 py-3 text-sm font-semibold transition-colors ${
                    p.featured
                      ? "bg-brand text-brand-foreground hover:bg-brand/90"
                      : p.custom
                        ? "bg-ink text-white hover:bg-ink/90"
                        : "border border-border-soft bg-white text-ink hover:bg-surface"
                  }`}
                >
                  {p.cta} <ArrowRight className="size-4" />
                </a>

                {p.trust && (
                  <div className={`mt-3 text-center text-[11px] ${p.featured ? "text-white/50" : "text-ink-mid"}`}>
                    {p.trust}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
