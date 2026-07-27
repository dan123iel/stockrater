import { Mail } from "lucide-react";
import { Wordmark } from "./Wordmark";

const cols = [
  {
    title: "COMPANY",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact", href: "mailto:support@pondex.app" },
    ],
  },
  {
    title: "FEATURES",
    links: [
      { label: "Stock Score", href: "#features" },
      { label: "Portfolio Analysis", href: "#features" },
      { label: "AI Signals", href: "#features" },
      { label: "Risk Analysis", href: "#features" },
      { label: "Insider Data", href: "#features" },
    ],
  },
  {
    title: "USE CASES",
    links: [
      { label: "Passive Investor", href: "#use-cases" },
      { label: "Aspiring Investor", href: "#use-cases" },
      { label: "Active Researcher", href: "#use-cases" },
      { label: "Value Investor", href: "#use-cases" },
    ],
  },
  {
    title: "RESOURCES",
    links: [
      { label: "FAQ", href: "#" },
      { label: "Pricing", href: "#pricing" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Changelog", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink pt-16 pb-8 text-white/70">
      <div className="mx-auto max-w-6xl px-6">

        {/* Top: Logo + cols */}
        <div className="grid gap-10 md:grid-cols-5">

          {/* Brand col */}
          <div className="md:col-span-1">
            <Wordmark className="text-white [&_span:first-child]:bg-white [&_span:first-child]:text-ink" />
            <p className="mt-4 max-w-xs text-sm text-white/50 leading-relaxed">
              A 0–100 score for any stock. Five factors. Every number sourced.
            </p>
            <a
              href="mailto:support@pondex.app"
              className="mt-5 inline-flex items-center gap-2 rounded-pill bg-white/5 px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
            >
              <Mail className="size-4" /> support@pondex.app
            </a>
          </div>

          {/* Link cols */}
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-xs font-bold tracking-widest text-white/40 uppercase mb-5">
                {c.title}
              </div>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/30">
            © 2026 pondex_. Not financial advice. Research tool only.
          </p>
          <div className="flex gap-6 text-xs text-white/30">
            <a href="/privacy" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-white/60 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/60 transition-colors">Imprint</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
