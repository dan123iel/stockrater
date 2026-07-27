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
  { icon: <Instagram className="size-5" />, href: "#" },
  { icon: <Linkedin className="size-5" />, href: "#" },
  { icon: <Facebook className="size-5" />, href: "#" },
  { icon: <Twitter className="size-5" />, href: "#" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden pb-20 pt-4">

      {/* Floating white card — wider + more padding like FintechX */}
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="rounded-3xl bg-white/95 shadow-[0_32px_80px_rgba(0,0,0,0.14)] backdrop-blur-sm px-16 py-14">

          {/* Main grid */}
          <div className="grid gap-12 md:grid-cols-4">

            {/* Brand — wider */}
            <div className="md:col-span-1">
              {/* Logo block like FintechX — icon + wordmark */}
              <div className="flex items-center gap-3 mb-5">
                <div className="size-10 rounded-xl bg-ink flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm font-mono">p_</span>
                </div>
                <span className="text-xl font-bold text-ink tracking-tight">pondex_</span>
              </div>
              <p className="text-sm text-ink-mid leading-relaxed max-w-[200px]">
                A modern platform for smarter stock research and financial insights.
              </p>
              <a
                href="mailto:support@pondex.app"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-white hover:bg-ink/85 transition-colors"
              >
                <Mail className="size-4" /> support@pondex.app
              </a>
            </div>

            {/* Link columns */}
            {cols.map((c) => (
              <div key={c.title}>
                <div className="text-base font-semibold text-ink mb-5">{c.title}</div>
                <ul className="space-y-4">
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
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-soft pt-8 md:flex-row">
            <p className="text-sm text-ink-mid">
              © 2026 pondex_. Not financial advice. Research tool only.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="grid size-10 place-items-center rounded-full border border-border-soft text-ink-mid hover:bg-surface hover:text-ink transition-colors"
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
