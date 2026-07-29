import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Wordmark } from "./Wordmark";

const links = [
  { label: "How it works", to: "/", hash: "#how-it-works" },
  { label: "Features",     to: "/", hash: "#features" },
  { label: "Pricing",      to: "/", hash: "#pricing" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowCta(window.scrollY > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavLink = (to: string, hash: string) => {
    if (window.location.pathname.replace(/\/$/, "").endsWith("/stockrater") ||
        window.location.pathname === "/" ||
        window.location.pathname === "/stockrater/") {
      // Already on landing page — just scroll
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to landing page then scroll
      navigate({ to }).then(() => {
        setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 100);
      });
    }
    setOpen(false);
  };

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`flex w-full max-w-4xl items-center gap-2 rounded-pill border border-border-soft/70 px-2 py-2 backdrop-blur-2xl transition-all duration-300 ${
          scrolled
            ? "bg-white/90 shadow-[0_8px_32px_-12px_rgba(29,29,29,0.18)]"
            : "bg-white/70 shadow-[0_2px_12px_rgba(29,29,29,0.06)]"
        }`}
      >
        {/* Logo → back to landing */}
        <Link to="/" className="pl-3 pr-2">
          <Wordmark className="text-[15px]" />
        </Link>

        <ul className="ml-2 hidden items-center gap-1 md:flex">
          {links.map((l, i) => (
            <li key={l.label}>
              <button
                onClick={() => handleNavLink(l.to, l.hash)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-surface hover:text-ink ${
                  i === 0 ? "bg-surface text-ink font-semibold" : "text-ink-mid"
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1">
          <Link
            to="/app"
            className="hidden rounded-full px-3 py-1.5 text-sm font-medium text-ink-mid transition-colors hover:text-ink sm:inline-block"
          >
            My Account
          </Link>
          <AnimatePresence>
            {showCta && (
              <motion.div
                key="cta"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to="/app"
                  className="hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-ink/90 md:inline-flex"
                >
                  Try it free <ArrowRight className="size-3.5" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full bg-ink text-white md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute inset-x-4 top-20 rounded-3xl border border-border-soft bg-white p-4 shadow-xl md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => handleNavLink(l.to, l.hash)}
                    className="block w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink hover:bg-surface"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li className="mt-2">
                <Link
                  to="/app"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Try it free <ArrowRight className="size-3.5" />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
