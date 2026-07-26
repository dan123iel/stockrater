import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowCTA(window.scrollY > 400); // CTA appears after scrolling past hero
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #F3F4F6" : "none",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link to="/" className="text-lg font-bold" style={{ color: "#0A0A0A", letterSpacing: "-0.5px" }}>
          pondex_
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium" style={{ color: "#6B7280" }}>
          <a href="#problem" className="hover:text-gray-900 transition-colors">Why pondex_</a>
          <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How it works</a>
          <a href="#testimonials" className="hover:text-gray-900 transition-colors">Reviews</a>
          <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
        </div>

        {/* Right side: My Account + scroll-triggered CTA */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium hidden sm:inline transition-colors hover:text-gray-900"
            style={{ color: "#6B7280" }}
          >
            My Account
          </Link>

          {/* CTA slides down from nav after scroll */}
          <div
            style={{
              overflow: "hidden",
              maxHeight: showCTA ? "44px" : "0px",
              opacity: showCTA ? 1 : 0,
              transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
            }}
          >
            <Link
              to="/signup"
              className="text-sm font-bold px-4 py-2 rounded-lg block whitespace-nowrap"
              style={{ background: "#5B5BD6", color: "#fff", textDecoration: "none" }}
            >
              Check our prices
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
