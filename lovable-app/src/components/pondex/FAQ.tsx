import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "./Reveal";

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
    q: "Is there a trial available before subscribing?",
    a: "Yes. You can explore the platform with a trial period before choosing a paid plan. No credit card required to start.",
  },
  {
    q: "Do you offer plans for financial teams?",
    a: "Yes. We offer enterprise solutions for financial teams and institutions, including SSO, dedicated support, and custom integrations.",
  },
];

export function FAQ() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <h2 className="text-4xl font-bold tracking-tight text-ink md:text-5xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-ink-mid">
            Find quick answers about the platform, pricing, and security.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="overflow-hidden rounded-3xl border border-border-soft bg-white"
          >
            {items.map((it, i) => (
              <AccordionItem
                key={it.q}
                value={`item-${i}`}
                className="border-b border-border-soft last:border-b-0"
              >
                <AccordionTrigger className="px-6 py-5 text-left text-base font-semibold text-ink hover:no-underline">
                  {it.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-sm leading-relaxed text-ink-mid">
                  {it.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-border-soft bg-white p-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <div className="text-sm font-semibold text-ink">Still have questions?</div>
            <div className="text-sm text-ink-mid">Reach out, and our team will guide you.</div>
          </div>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-pill bg-ink px-4 py-2.5 text-sm font-semibold text-white hover:bg-ink/90"
          >
            Talk to our team
          </a>
        </Reveal>
      </div>
    </section>
  );
}
