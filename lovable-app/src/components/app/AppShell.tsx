import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, BarChart2, Clock, Settings, User, GitCompare,
  Briefcase, Zap, Bot, FolderKanban, Search, Bell, Plus, Share2,
} from "lucide-react";
import { useState, useRef, useEffect, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

// ── Design tokens ────────────────────────────────────────────────────────────
const BG       = "#eef0f6";       // page background — soft blue-grey
const CARD_BG  = "#ffffff";
const ACCENT   = "#c8f135";       // yellow-green active dot
const SIDEBAR_W = 72;             // icon-only sidebar

// ── Nav items ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { to: "/app",           Icon: LayoutDashboard, label: "Dashboard"      },
  { to: "/app/stock",     Icon: BarChart2,        label: "Stock Analysis" },
  { to: "/app/compare",   Icon: GitCompare,       label: "Compare"        },
  { to: "/app/portfolio", Icon: Briefcase,        label: "Portfolio"      },
  { to: "/app/markets",   Icon: Zap,              label: "Markets"        },
  { to: "/app/robo",      Icon: Bot,              label: "Robo Advisor"   },
  { to: "/app/cfd",       Icon: FolderKanban,     label: "CFD"            },
] as const;

const PAGE_TITLES: Record<string, string> = {
  "/app":           "Dashboard",
  "/app/stock":     "Stock Analysis",
  "/app/compare":   "Compare Stocks",
  "/app/portfolio": "Portfolio",
  "/app/markets":   "Markets",
  "/app/robo":      "Robo Advisor",
  "/app/cfd":       "CFD",
  "/app/account":   "Account",
};

// ── Sidebar nav icon ──────────────────────────────────────────────────────────
function NavIcon({ to, Icon, label, active }: {
  to: string; Icon: any; label: string; active: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={to}
      title={label}
      aria-label={label}
      aria-current={active ? "page" : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        width: 44, height: 44,
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: 14,
        background: active ? ACCENT : hover ? "rgba(0,0,0,0.06)" : "transparent",
        color: active ? "#1a1a1a" : hover ? "#333" : "#9ca3b0",
        textDecoration: "none",
        transition: "background 0.15s, color 0.15s",
        flexShrink: 0,
      }}
    >
      <Icon size={19} strokeWidth={active ? 2.2 : 1.8} />
    </Link>
  );
}

// ── AppShell ─────────────────────────────────────────────────────────────────
export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  const isActive = (to: string) =>
    pathname === to || (to !== "/app" && pathname.startsWith(to));

  const pageTitle = PAGE_TITLES[pathname] ?? "pondex_";

  const submitSearch = () => {
    const t = search.trim().toUpperCase();
    if (!t) return;
    navigate({ to: "/app/stock", search: { ticker: t } as never });
    setSearch("");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node))
        setAvatarOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setScrollPct(Math.min(100, (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: BG, fontFamily: "'Inter', sans-serif" }}>

      {/* ── Icon-only sidebar ── */}
      <aside
        role="navigation"
        aria-label="Main navigation"
        style={{
          width: SIDEBAR_W,
          minHeight: "100vh",
          background: BG,
          position: "fixed",
          top: 0, left: 0, bottom: 0,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px 0",
          gap: 0,
        }}
      >
        {/* Logo */}
        <Link to="/app" style={{ marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: ACCENT, fontSize: 16, fontWeight: 800 }}>p</span>
          </div>
        </Link>

        {/* Nav icons */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          {NAV_ITEMS.map(({ to, Icon, label }) => (
            <NavIcon key={to} to={to} Icon={Icon} label={label} active={isActive(to)} />
          ))}
        </nav>

        {/* Avatar at bottom */}
        <div ref={avatarRef} style={{ position: "relative", marginTop: "auto" }}>
          <button
            onClick={() => setAvatarOpen(!avatarOpen)}
            aria-label="Account menu"
            aria-expanded={avatarOpen}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(99,102,241,0.3)",
            }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>D</span>
            </div>
          </button>

          {avatarOpen && (
            <div
              role="menu"
              style={{
                position: "absolute", bottom: "calc(100% + 8px)", left: 0,
                background: CARD_BG, border: "1px solid #e8eaed",
                borderRadius: 14, boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                minWidth: 180, zIndex: 100, overflow: "hidden",
              }}
            >
              <div style={{ padding: "12px 14px", borderBottom: "1px solid #f0f0f0" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>Daniel</p>
                <span style={{ fontSize: 10, background: "#f0f0f0", padding: "2px 7px", borderRadius: 20, color: "#666", fontWeight: 600 }}>Free Plan</span>
              </div>
              <Link to="/app/account" onClick={() => setAvatarOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", fontSize: 13, color: "#333", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f8f9fa")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <User size={14} /> Account
              </Link>
              <Link to="/app/account" onClick={() => setAvatarOpen(false)}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", fontSize: 13, color: "#333", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#f8f9fa")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                <Settings size={14} /> Settings
              </Link>
              <div style={{ borderTop: "1px solid #f0f0f0" }}>
                <button onClick={signOut}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", fontSize: 13, color: "#ef4444", background: "none", border: "none", cursor: "pointer", width: "100%" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#fff5f5")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main content ── */}
      <div style={{ flex: 1, marginLeft: SIDEBAR_W, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Scroll progress */}
        <div style={{ height: 2, background: "transparent", position: "fixed", top: 0, left: SIDEBAR_W, right: 0, zIndex: 60 }}>
          <div style={{ height: "100%", width: `${scrollPct}%`, background: ACCENT, transition: "width 0.1s linear", borderRadius: 1 }} />
        </div>

        {/* Page header — inline (no sticky topbar, like the screenshots) */}
        <header style={{ padding: "28px 32px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-1px", margin: 0, lineHeight: 1.1 }}>
              {pageTitle}
            </h1>
            <p style={{ fontSize: 13, color: "#9ca3b0", marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              Live data · Yahoo Finance
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Search */}
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search size={14} style={{ position: "absolute", left: 12, color: "#aaa", pointerEvents: "none" }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === "Enter" && submitSearch()}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search ticker..."
                aria-label="Search stocks"
                style={{
                  paddingLeft: 34, paddingRight: 14, height: 36,
                  border: `1px solid ${searchFocused ? "#6366f1" : "#e0e0e0"}`,
                  borderRadius: 20, fontSize: 13, background: CARD_BG,
                  outline: "none", width: searchFocused ? 200 : 160,
                  color: "#333", transition: "width 0.2s, border-color 0.15s",
                  boxShadow: searchFocused ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
                }}
              />
            </div>

            {/* Bell */}
            <button
              aria-label="Notifications"
              style={{ width: 36, height: 36, borderRadius: 10, background: CARD_BG, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
            >
              <Bell size={16} color="#555" />
              <span style={{ position: "absolute", top: 6, right: 6, width: 7, height: 7, borderRadius: "50%", background: "#6366f1", border: "2px solid " + CARD_BG }} />
            </button>

            {/* Share */}
            <button
              aria-label="Share"
              style={{ width: 36, height: 36, borderRadius: 10, background: CARD_BG, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
            >
              <Share2 size={16} color="#555" />
            </button>

            {/* + button */}
            <button
              aria-label="Add"
              style={{ width: 36, height: 36, borderRadius: 10, background: "#1a1a1a", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <Plus size={18} color="#fff" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "20px 32px 80px" }}>
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav
        role="navigation"
        aria-label="Mobile navigation"
        className="md:hidden"
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          height: 68,
          background: "#fff",
          borderTop: "1px solid #e8eaed",
          display: "flex",
          zIndex: 50,
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {NAV_ITEMS.slice(0, 5).map(({ to, Icon, label }) => {
          const active = isActive(to);
          return (
            <Link key={to} to={to} aria-label={label}
              style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 4,
                color: active ? "#1a1a1a" : "#9ca3b0",
                textDecoration: "none",
              }}
            >
              <div style={{
                width: 44, height: 32,
                borderRadius: 20,
                background: active ? "#c8f135" : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}>
                <Icon size={18} strokeWidth={active ? 2.2 : 1.8} color={active ? "#1a1a1a" : "#9ca3b0"} />
              </div>
              <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, color: active ? "#1a1a1a" : "#9ca3b0" }}>
                {label.split(" ")[0]}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
