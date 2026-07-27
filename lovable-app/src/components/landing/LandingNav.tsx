import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowCTA(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
      style={{ padding: scrolled ? "8px 24px" : "16px 24px", transition: "padding 0.3s ease" }}
    >
      {/* Floating pill container */}
      <nav
        style={{
          width: "100%",
          maxWidth: 900,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(16px)",
          borderRadius: 999,
          padding: "8px 8px 8px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: scrolled
            ? "0 4px 24px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.05)"
            : "0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
          transition: "box-shadow 0.3s ease",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}
        >
          {/* Logo icon */}
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "#0A0A0A",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M8 3v10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
              <path d="M5 5l6 6M11 5l-6 6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
            </svg>
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#0A0A0A", letterSpacing: "-0.3px" }}>
            pondex_
          </span>
        </Link>

        {/* Nav links — center */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { label: "Why pondex_", href: "#problem" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Reviews", href: "#testimonials" },
            { label: "Pricing", href: "#pricing" },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "#6B7280",
                textDecoration: "none",
                padding: "6px 14px",
                borderRadius: 999,
                transition: "color 0.15s, background 0.15s",
              }}
              onMouseEnter={e => {
                (e.target as HTMLElement).style.color = "#0A0A0A";
                (e.target as HTMLElement).style.background = "#F3F4F6";
              }}
              onMouseLeave={e => {
                (e.target as HTMLElement).style.color = "#6B7280";
                (e.target as HTMLElement).style.background = "transparent";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Link
            to="/login"
            className="hidden sm:block"
            style={{
              fontSize: 14, fontWeight: 500, color: "#6B7280",
              textDecoration: "none", padding: "6px 14px",
              borderRadius: 999, transition: "color 0.15s",
            }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = "#0A0A0A"}
            onMouseLeave={e => (e.target as HTMLElement).style.color = "#6B7280"}
          >
            My Account
          </Link>

          {/* CTA — slides in after scroll */}
          <div
            style={{
              overflow: "hidden",
              maxWidth: showCTA ? "200px" : "0px",
              opacity: showCTA ? 1 : 0,
              transition: "max-width 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
              marginRight: showCTA ? 0 : -4,
            }}
          >
            <Link
              to="/signup"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "#0A0A0A", color: "#fff",
                fontSize: 14, fontWeight: 600,
                padding: "8px 18px",
                borderRadius: 999,
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Try it free
              <span style={{ fontSize: 14 }}>→</span>
            </Link>
          </div>

          {/* Always visible small CTA on mobile */}
          <Link
            to="/signup"
            className="block md:hidden"
            style={{
              display: "inline-flex", alignItems: "center",
              background: "#0A0A0A", color: "#fff",
              fontSize: 13, fontWeight: 600,
              padding: "7px 14px", borderRadius: 999,
              textDecoration: "none",
            }}
          >
            Free →
          </Link>
        </div>
      </nav>
    </div>
  );
}
