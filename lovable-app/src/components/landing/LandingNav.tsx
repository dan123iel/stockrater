import { Link } from "@tanstack/react-router";

export function LandingNav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center"
      style={{
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 md:px-8">
        <Link to="/" className="text-lg font-bold" style={{ color: "var(--text-inverse)" }}>
          pondex_
        </Link>
        <div
          className="hidden md:flex items-center gap-6 text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#demo" className="hover:text-white transition-colors">Demo</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium hidden sm:inline"
            style={{ color: "var(--text-muted)" }}
          >
            Log in
          </Link>
          <Link to="/signup" className="btn-light text-sm">Free trial</Link>
        </div>
      </div>
    </nav>
  );
}
