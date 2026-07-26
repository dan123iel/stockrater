import { Link } from "@tanstack/react-router";

export function LandingNav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center"
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #F3F4F6",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 md:px-8">
        {/* Logo */}
        <Link to="/" className="text-lg font-bold tracking-tight" style={{ color: "var(--text-primary)", letterSpacing: "-0.5px" }}>
          pondex_
        </Link>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
          <a href="#problem" className="hover:text-gray-900 transition-colors">Why pondex_</a>
          <a href="#how-it-works" className="hover:text-gray-900 transition-colors">How it works</a>
          <a href="#testimonials" className="hover:text-gray-900 transition-colors">Reviews</a>
          <a href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</a>
        </div>

        {/* Right CTAs */}
        <div className="flex items-center gap-3">
          <Link to="/login" className="text-sm font-medium hidden sm:inline" style={{ color: "var(--text-secondary)" }}>
            Log in
          </Link>
          <Link
            to="/signup"
            className="text-sm font-semibold px-4 py-2 rounded-lg"
            style={{ background: "var(--accent)", color: "#fff" }}
          >
            Start free
          </Link>
        </div>
      </div>
    </nav>
  );
}
