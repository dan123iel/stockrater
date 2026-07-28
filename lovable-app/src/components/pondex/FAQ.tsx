import { useState } from "react";
import { Plus, Minus, ArrowRight, Users } from "lucide-react";
import { Reveal } from "./Reveal";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  {
    q: "How secure is my financial data?",
    a: "Your data is protected with industry-standard encryption and secure infrastructure. We follow SOC 2 and GDPR practices, and never sell your data.",
  },
  {
    q: "Can I connect multiple investment accounts?",
    a: "Yes. You can securely connect multiple bank, trading, and investment accounts and see everything in one unified view.",
  },
  {
    q: "How do the AI insights work?",
    a: "Our AI analyzes market trends, portfolio performance, and risk signals to generate insights. Every number is sourced so you can verify it.",
  },
  {
    q: "Is a trial available before subscribing?",
    a: "Yes. You can explore the platform with a free trial before choosing a paid plan. No credit card required to start.",
  },
  {
    q: "Do you offer plans for financial teams or organizations?",
    a: "Yes. We offer enterprise solutions for teams and institutions, including SSO, dedicated support, and custom integrations.",
  },
];

function FAQItem({ item, open, onToggle }: { item: typeof items[0]; open: boolean; onToggle: () => void }) {
  return (
    <div
      className={`rounded-2xl border transition-colors cursor-pointer ${open ? "border-border-soft bg-surface/60" : "border-border-soft bg-white hover:bg-surface/40"}`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-5">
        <span className={`text-base font-medium ${open ? "text-ink font-semibold" : "text-ink"}`}>
          {item.q}
        </span>
        <span
          className={`shrink-0 grid size-8 place-items-center rounded-full transition-colors ${open ? "bg-ink text-white" : "bg-surface text-ink-mid"}`}
        >
          {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
        </span>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-ink-mid">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-[360px_1fr] lg:items-start">

          {/* Left — title + support card */}
          <Reveal>
            <h2 className="text-4xl font-bold tracking-tight text-ink md:text-5xl leading-tight">
              Frequently<br />asked questions
            </h2>
            <p className="mt-4 text-base text-ink-mid leading-relaxed">
              Find quick answers to common questions about the platform, pricing, and security.
            </p>

            {/* Still have questions card */}
            <div className="mt-10 rounded-3xl bg-surface/60 border border-border-soft p-6">
              {/* Avatar stack */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-2">
                  {["#0F9D94", "#4338CA", "#EA580C"].map((color, i) => (
                    <div
                      key={i}
                      className="size-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: color }}
                    >
                      {["A", "B", "C"][i]}
                    </div>
                  ))}
                </div>
                <span className="text-sm font-medium text-ink-mid">+ You</span>
              </div>
              <p className="text-base font-bold text-ink mb-1">Still have questions?</p>
              <p className="text-sm text-ink-mid mb-5">Reach out, and our team will guide you.</p>
              <a
                href="mailto:support@pondex.app"
                className="inline-flex items-center gap-2 rounded-pill bg-ink pl-5 pr-2 py-2 text-sm font-semibold text-white hover:bg-ink/85 transition-colors"
              >
                Talk to our team
                <span className="grid size-7 place-items-center rounded-full bg-white text-ink">
                  <ArrowRight className="size-3.5" />
                </span>
              </a>
            </div>
          </Reveal>

          {/* Right — accordion */}
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-3">
              {items.map((item, i) => (
                <FAQItem
                  key={item.q}
                  item={item}
                  open={open === i}
                  onToggle={() => setOpen(open === i ? -1 : i)}
                />
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
