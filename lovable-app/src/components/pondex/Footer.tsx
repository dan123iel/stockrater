import { Instagram, Linkedin, Facebook, Twitter, Mail } from "lucide-react";
import { Wordmark } from "./Wordmark";

const cols = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "mailto:support@pondex.app" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Stock Score", href: "#features" },
      { label: "Portfolio Analysis", href: "#features" },
      { label: "AI Signals", href: "#features" },
      { label: "Risk Analysis", href: "#features" },
      { label: "Insider Data", href: "#features" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQs", href: "#" },
      { label: "Contact", href: "mailto:support@pondex.app" },
      { label: "Changelog", href: "#" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const socials = [
  { icon: <Instagram className="size-4" />, href: "#" },
  { icon: <Linkedin className="size-4" />, href: "#" },
  { icon: <Facebook className="size-4" />, href: "#" },
  { icon: <Twitter className="size-4" />, href: "#" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background landscape image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/stockrater/hero-landscape.png')" }}
        aria-hidden
      />
      {/* Gradient overlay — fades image to white at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white/10" aria-hidden />

      {/* Footer card — white floating panel */}
      <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-32">
        <div className="rounded-3xl bg-white/95 shadow-[0_32px_80px_rgba(0,0,0,0.12)] backdrop-blur-sm px-10 py-10">

          {/* Main grid */}
          <div className="grid gap-8 md:grid-cols-4">

            {/* Brand */}
            <div>
              <Wordmark />
              <p className="mt-3 text-sm text-ink-mid leading-relaxed">
                A 0–100 score for any stock. Every number sourced.
              </p>
              <a
                href="mailto:support@pondex.app"
                className="mt-5 inline-flex items-center gap-2 rounded-pill bg-ink px-4 py-2.5 text-sm font-medium text-white hover:bg-ink/90 transition-colors"
              >
                <Mail className="size-4" /> support@pondex.app
              </a>
            </div>

            {/* Link columns */}
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-sm font-semibold text-ink mb-4">{c.title}</div>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-sm text-ink-mid hover:text-ink transition-colors">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border-soft pt-6 md:flex-row">
            <p className="text-xs text-ink-mid">
              © 2026 pondex_. Not financial advice. Research tool only.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="grid size-8 place-items-center rounded-full border border-border-soft text-ink-mid hover:bg-surface hover:text-ink transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
