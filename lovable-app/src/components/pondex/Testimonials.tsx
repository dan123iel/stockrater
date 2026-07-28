import { Star, Heart, Users, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const quotes = [
  {
    quote:
      "Finally one number that tells me what to do. I used to spend hours comparing data across 4 different tools.",
    name: "Survey Respondent",
    role: "Passive Investor",
    initials: "PI",
  },
  {
    quote:
      "The source attribution is what convinced me. I don't trust AI blindly — but when I can verify every number, I do.",
    name: "Survey Respondent",
    role: "Value Investor",
    initials: "VI",
  },
  {
    quote:
      "I showed my friend and he signed up 10 minutes later. That's the best review I can give.",
    name: "Survey Respondent",
    role: "Active Researcher",
    initials: "AR",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="bg-surface/50 py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-ink md:text-5xl">
            What investors say about the platform
          </h2>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-mid">
            <span className="inline-flex items-center gap-1.5">
              <Star className="size-4 fill-amber-400 text-amber-400" /> 4.9/5 Rating
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Heart className="size-4 fill-urgency text-urgency" /> 91 Investors surveyed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="size-4 text-brand" /> 45 In-depth interviews
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.08}>
              <figure className="flex h-full flex-col rounded-3xl border border-border-soft bg-white p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
                  "{q.quote}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border-soft pt-4">
                  <div className="grid size-10 place-items-center rounded-full bg-brand-soft text-sm font-semibold text-brand">
                    {q.initials}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">{q.name}</div>
                    <div className="text-xs text-ink-mid">{q.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 rounded-pill bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-ink/90"
          >
            Get started today <ArrowRight className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
