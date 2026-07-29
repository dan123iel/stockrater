import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Briefcase, Zap, BarChart2, Bot, FolderKanban,
  Bell, ChevronDown, Search, ChevronLeft, ChevronRight,
  User, Settings, LogOut,
} from "lucide-react";
import { useState, useRef, useEffect, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

// ── Constants ────────────────────────────────────────────────────────────────

const ACCENT = "#6366f1";
const SIDEBAR_BG = "#0f1117";
const SIDEBAR_BORDER = "#1e2130";
const SIDEBAR_TEXT_INACTIVE = "#8b8fa8";
const SIDEBAR_TEXT_ACTIVE = "#ffffff";
const SIDEBAR_HOVER_BG = "rgba(99,102,241,0.12)";

const NAV_ITEMS = [
  { to: "/app",           label: "Dashboard",     Icon: LayoutDashboard },
  { to: "/app/portfolio", label: "Portfolio",     Icon: Briefcase },
  { to: "/app/markets",   label: "Markets",       Icon: Zap },
  { to: "/app/stock",     label: "Stock Analysis",Icon: BarChart2 },
  { to: "/app/robo",      label: "Robo Advisor",  Icon: Bot },
  { to: "/app/cfd",       label: "CFD",           Icon: FolderKanban },
] as const;

const PAGE_TITLES: Record<string, string> = {
  "/app":           "Dashboard",
  "/app/portfolio": "Portfolio",
  "/app/markets":   "Markets",
  "/app/stock":     "Stock Analysis",
  "/app/robo":      "Robo Advisor",
  "/app/cfd":       "CFD",
  "/app/account":   "Account",
};

// ── NavLink with hover ────────────────────────────────────────────────────────

function NavLink({ to, label, Icon, active, collapsed }: {
  to: string; label: string; Icon: any; active: boolean; collapsed: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={to}
      title={collapsed ? label : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: collapsed ? "10px 0" : "10px 12px",
        justifyContent: collapsed ? "center" : "flex-start",
        borderRadius: 10,
        background: active ? ACCENT : hover ? SIDEBAR_HOVER_BG : "transparent",
        color: active ? SIDEBAR_TEXT_ACTIVE : hover ? "#fff" : SIDEBAR_TEXT_INACTIVE,
        fontWeight: active ? 600 : 400,
        fontSize: 14,
        textDecoration: "none",
        transition: "background 0.15s, color 0.15s",
      }}
    >
      <Icon size={18} strokeWidth={1.8} />
      {!collapsed && <span>{label}</span>}
    </Link>
  );
}

// ── AppShell ─────────────────────────────────────────────────────────────────

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node))
        setAvatarOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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

  const isActive = (to: string) =>
    pathname === to || (to !== "/app" && pathname.startsWith(to));

  const pageTitle = PAGE_TITLES[pathname] ?? "pondex_";

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6f9", fontFamily: "'Inter', sans-serif" }}>

      {/* ── Sidebar (desktop) ── */}
      <aside style={{
        width: collapsed ? 72 : 220,
        minHeight: "100vh",
        background: SIDEBAR_BG,
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s ease",
        flexShrink: 0,
        position: "fixed",
        top: 0, left: 0, bottom: 0,
        zIndex: 50,
        // Hide on mobile
        ...(typeof window !== "undefined" && window.innerWidth < 768 ? { display: "none" } : {}),
      }}
        className="hidden md:flex"
      >
        {/* Logo */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "20px 8px" : "20px 16px",
          borderBottom: `1px solid ${SIDEBAR_BORDER}`,
        }}>
          {!collapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, background: ACCENT, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>p</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px", color: "#fff" }}>pondex_</span>
            </div>
          )}
          {collapsed && (
            <div style={{ width: 32, height: 32, background: ACCENT, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>p</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{ background: "#1e2130", border: "none", borderRadius: 6, padding: 4, cursor: "pointer", display: "flex", alignItems: "center", color: "#666" }}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Nav items */}
        <nav role="navigation" aria-label="Main navigation" style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV_ITEMS.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} label={label} Icon={Icon} active={isActive(to)} collapsed={collapsed} />
          ))}
        </nav>

        {/* Upgrade banner */}
        {!collapsed && (
          <div style={{ margin: "12px", background: "#1a1d2e", borderRadius: 14, padding: "16px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>⭐</div>
            <p style={{ fontSize: 12, color: SIDEBAR_TEXT_INACTIVE, marginBottom: 12, lineHeight: 1.5 }}>
              Upgrade to <strong style={{ color: "#fff" }}>PRO</strong> for unlimited access
            </p>
            <button
              style={{ background: ACCENT, color: "#fff", border: "none", borderRadius: 20, padding: "8px 20px", fontSize: 12, fontWeight: 700, cursor: "pointer", width: "100%", transition: "opacity 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Get Pro Now
            </button>
          </div>
        )}
      </aside>

      {/* ── Main area ── */}
      <div style={{ flex: 1, marginLeft: collapsed ? 72 : 220, display: "flex", flexDirection: "column", transition: "margin-left 0.2s ease", minWidth: 0 }}
        className="md:ml-[220px]"
      >
        {/* Topbar */}
        <header style={{
          position: "sticky", top: 0, zIndex: 40,
          background: "#fff",
          borderBottom: "1px solid #e8eaed",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          gap: 16,
        }}>
          <span style={{ fontWeight: 700, fontSize: 18, color: "#1a1a1a", whiteSpace: "nowrap" }}>{pageTitle}</span>

          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, justifyContent: "flex-end" }}>
            {/* Search — Revolut-style: expands on focus */}
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search size={15} style={{ position: "absolute", left: 12, color: "#aaa", pointerEvents: "none" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search anything..."
                style={{
                  paddingLeft: 36, paddingRight: 16, height: 38,
                  border: `1px solid ${searchFocused ? ACCENT : "#e8eaed"}`,
                  borderRadius: 20,
                  fontSize: 13, background: "#f8f9fa", outline: "none",
                  width: searchFocused ? 280 : 220,
                  color: "#333",
                  transition: "width 0.2s, border-color 0.15s",
                  boxShadow: searchFocused ? `0 0 0 3px rgba(99,102,241,0.12)` : "none",
                }}
              />
            </div>

            {/* Bell */}
            <button
              aria-label="Notifications (2 unread)"
              style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: 8, borderRadius: 10, transition: "background 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f4f6f9")}
              onMouseLeave={e => (e.currentTarget.style.background = "none")}
            >
              <Bell size={20} color="#555" />
              <span style={{
                position: "absolute", top: 4, right: 4,
                background: ACCENT, color: "#fff",
                borderRadius: "50%", width: 16, height: 16,
                fontSize: 9, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>2</span>
            </button>

            {/* Avatar dropdown */}
            <div ref={avatarRef} style={{ position: "relative" }}>
              <div
                role="button"
                tabIndex={0}
                aria-label="Account menu"
                aria-expanded={avatarOpen}
                aria-haspopup="menu"
                onClick={() => setAvatarOpen(!avatarOpen)}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setAvatarOpen(!avatarOpen); } if (e.key === "Escape") setAvatarOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", gap: 6, cursor: "pointer",
                  padding: "4px 8px", borderRadius: 10,
                  background: avatarOpen ? "#f0f0f0" : "transparent",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => { if (!avatarOpen) e.currentTarget.style.background = "#f4f6f9"; }}
                onMouseLeave={e => { if (!avatarOpen) e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>D</span>
                </div>
                <ChevronDown size={13} color="#888" style={{ transition: "transform 0.15s", transform: avatarOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
              </div>

              {avatarOpen && (
                <div
                  role="menu"
                  aria-label="Account options"
                  style={{
                  position: "absolute", top: "calc(100% + 8px)", right: 0,
                  background: "#fff", border: "1px solid #e8eaed",
                  borderRadius: 14, boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
                  minWidth: 200, zIndex: 100, overflow: "hidden",
                }}>
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid #f0f0f0" }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>Daniel</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                      <span style={{ fontSize: 11, background: "#f0f0f0", padding: "2px 8px", borderRadius: 20, color: "#555", fontWeight: 600 }}>Free Plan</span>
                    </div>
                  </div>
                  {[
                    { Icon: User, label: "Account", to: "/app/account" },
                    { Icon: Settings, label: "Settings", to: "/app/account" },
                  ].map(({ Icon, label, to }) => (
                    <Link
                      key={label} to={to}
                      onClick={() => setAvatarOpen(false)}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", fontSize: 13, color: "#333", textDecoration: "none", transition: "background 0.12s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#f8f9fa")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <Icon size={15} color="#666" /> {label}
                    </Link>
                  ))}
                  <div style={{ borderTop: "1px solid #f0f0f0" }}>
                    <button
                      onClick={signOut}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", fontSize: 13, color: "#ef4444", background: "none", border: "none", cursor: "pointer", width: "100%", transition: "background 0.12s" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#fff5f5")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <LogOut size={15} /> Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "24px 28px", paddingBottom: 80 }}>
          {children}
        </main>
      </div>

      {/* ── Bottom Tab Bar (mobile only) ── */}
      <nav
        role="navigation"
        aria-label="Mobile navigation"
        className="md:hidden"
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          height: 60,
          background: SIDEBAR_BG,
          borderTop: `1px solid ${SIDEBAR_BORDER}`,
          display: "flex",
          zIndex: 50,
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {NAV_ITEMS.slice(0, 5).map(({ to, label, Icon }) => {
          const active = isActive(to);
          return (
            <Link
              key={to} to={to}
              style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 3,
                color: active ? ACCENT : SIDEBAR_TEXT_INACTIVE,
                textDecoration: "none",
                borderTop: active ? `2px solid ${ACCENT}` : "2px solid transparent",
                transition: "color 0.15s",
              }}
            >
              <Icon size={20} strokeWidth={1.8} />
              <span style={{ fontSize: 10, fontWeight: active ? 600 : 400 }}>{label.split(" ")[0]}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
