import { Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import { Wordmark } from "./Wordmark";

const cols = [
  { title: "Quick links", links: ["Features", "Use Cases", "Pricing", "Score"] },
  { title: "Pages", links: ["About", "Blog", "Pricing", "Contact"] },
  { title: "Support", links: ["FAQs", "Privacy Policy", "Changelog"] },
];

export function Footer() {
  return (
    <footer className="bg-ink pt-16 pb-8 text-white/70">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Wordmark className="text-white [&_span:first-child]:bg-white [&_span:first-child]:text-ink" />
            <p className="mt-4 max-w-xs text-sm text-white/60">
              A modern platform for smarter portfolio tracking and financial insights.
            </p>
            <a
              href="mailto:support@pondex.app"
              className="mt-5 inline-flex items-center gap-2 rounded-pill bg-white/5 px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
            >
              <Mail className="size-4" /> support@pondex.app
            </a>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-sm font-semibold text-white">{c.title}</div>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/60 transition-colors hover:text-white">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <div className="text-xs text-white/50">
            © {new Date().getFullYear()} pondex_ — All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            {[
              { icon: <Twitter className="size-4" />, label: "X" },
              { icon: <Linkedin className="size-4" />, label: "LinkedIn" },
              { icon: <Instagram className="size-4" />, label: "Instagram" },
            ].map((s) => (
              <a
                key={s.label}
                aria-label={s.label}
                href="#"
                className="grid size-9 place-items-center rounded-full bg-white/5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
