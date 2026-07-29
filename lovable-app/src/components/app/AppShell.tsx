import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Briefcase, Zap, BarChart2, Bot, FolderKanban,
  Bell, ChevronDown, Search, ChevronLeft, ChevronRight, User, Settings, LogOut,
} from "lucide-react";
import { useState, useRef, useEffect, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

const NAV_ITEMS = [
  { to: "/app",            label: "Dashboard",       Icon: LayoutDashboard },
  { to: "/app/portfolio",  label: "Portfolio",        Icon: Briefcase },
  { to: "/app/markets",    label: "Markets",          Icon: Zap },
  { to: "/app/stock",      label: "Stock Analysis",   Icon: BarChart2 },
  { to: "/app/robo",       label: "Robo Advisor",     Icon: Bot },
  { to: "/app/cfd",        label: "CFD",              Icon: FolderKanban },
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

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
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
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6f9", fontFamily: "Inter, sans-serif" }}>

      {/* Sidebar — dark */}
      <aside style={{
        width: collapsed ? 72 : 220,
        minHeight: "100vh",
        background: "#0f1117",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.2s ease",
        flexShrink: 0,
        position: "fixed",
        top: 0, left: 0, bottom: 0,
        zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between", padding: collapsed ? "20px 8px" : "20px 16px", borderBottom: "1px solid #1e2130" }}>
          {!collapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, background: "#6366f1", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>p</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px", color: "#fff" }}>pondex_</span>
            </div>
          )}
          {collapsed && (
            <div style={{ width: 32, height: 32, background: "#6366f1", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>p</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{ background: "#1e2130", border: "none", borderRadius: 6, padding: 4, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#666" }}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          {NAV_ITEMS.map(({ to, label, Icon }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: collapsed ? "10px 0" : "10px 12px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  borderRadius: 10,
                  background: active ? "#6366f1" : "transparent",
                  color: active ? "#fff" : "#8b8fa8",
                  fontWeight: active ? 600 : 400,
                  fontSize: 14,
                  textDecoration: "none",
                  transition: "background 0.15s",
                }}
                title={collapsed ? label : undefined}
              >
                <Icon size={18} strokeWidth={1.8} />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Upgrade banner */}
        {!collapsed && (
          <div style={{ margin: "12px", background: "#1a1d2e", borderRadius: 14, padding: "16px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>⭐</div>
            <p style={{ fontSize: 12, color: "#8b8fa8", marginBottom: 12, lineHeight: 1.5 }}>
              Upgrade to <strong style={{ color: "#fff" }}>PRO</strong> to get access to all features!
            </p>
            <button style={{
              background: "#fff", color: "#0f1117", border: "none", borderRadius: 20,
              padding: "8px 20px", fontSize: 12, fontWeight: 700, cursor: "pointer", width: "100%",
            }}>
              Get Pro Now
            </button>
          </div>
        )}
      </aside>

      {/* Main area */}
      <div style={{ flex: 1, marginLeft: collapsed ? 72 : 220, display: "flex", flexDirection: "column", transition: "margin-left 0.2s ease" }}>

        {/* Topbar */}
        <header style={{
          position: "sticky", top: 0, zIndex: 40,
          background: "#fff",
          borderBottom: "1px solid #e8eaed",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
        }}>
          <span style={{ fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>{pageTitle}</span>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Search */}
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <Search size={15} style={{ position: "absolute", left: 12, color: "#aaa" }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submitSearch()}
                placeholder="Search anything..."
                style={{
                  paddingLeft: 36, paddingRight: 16, height: 38,
                  border: "1px solid #e8eaed", borderRadius: 20,
                  fontSize: 13, background: "#f8f9fa", outline: "none",
                  width: 220, color: "#333",
                }}
              />
            </div>

            {/* Bell */}
            <button style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 8 }}>
              <Bell size={20} color="#555" />
              <span style={{
                position: "absolute", top: 4, right: 4,
                background: "#6366f1", color: "#fff",
                borderRadius: "50%", width: 16, height: 16,
                fontSize: 9, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>2</span>
            </button>

            {/* Avatar + dropdown */}
            <div ref={avatarRef} style={{ position: "relative" }}>
              <div
                onClick={() => setAvatarOpen(!avatarOpen)}
                style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", padding: "4px 8px", borderRadius: 10, background: avatarOpen ? "#f0f0f0" : "transparent" }}
              >
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>D</span>
                </div>
                <ChevronDown size={14} color="#888" />
              </div>
              {avatarOpen && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, background: "#fff", border: "1px solid #e8eaed", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,0.12)", minWidth: 180, zIndex: 100, overflow: "hidden" }}>
                  <div style={{ padding: "12px 16px", borderBottom: "1px solid #f0f0f0" }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>Daniel</p>
                    <p style={{ fontSize: 11, color: "#888" }}>Free Plan</p>
                  </div>
                  {[
                    { icon: User, label: "Account", to: "/app/account" },
                    { icon: Settings, label: "Settings", to: "/app/account" },
                  ].map(({ icon: Icon, label, to }) => (
                    <Link key={label} to={to} onClick={() => setAvatarOpen(false)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", fontSize: 13, color: "#333", textDecoration: "none" }}
                      onMouseEnter={e => (e.currentTarget.style.background = "#f8f9fa")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <Icon size={15} color="#666" /> {label}
                    </Link>
                  ))}
                  <div style={{ borderTop: "1px solid #f0f0f0" }}>
                    <button
                      onClick={signOut}
                      style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", fontSize: 13, color: "#ef4444", background: "none", border: "none", cursor: "pointer", width: "100%" }}
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
        <main style={{ flex: 1, padding: "28px 28px" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
