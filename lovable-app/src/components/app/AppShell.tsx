import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Home, TrendingUp, Search, Briefcase, User, LogOut } from "lucide-react";
import { useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

const NAV_TOP = [
  { to: "/app", label: "Home" },
  { to: "/app/portfolio", label: "Portfolio" },
  { to: "/app/markets", label: "Markets" },
  { to: "/app/robo", label: "Robo Advisor" },
  { to: "/app/cfd", label: "CFD" },
] as const;

const NAV_BOTTOM = [
  { to: "/app", label: "Home", Icon: Home },
  { to: "/app/markets", label: "Markets", Icon: TrendingUp },
  { to: "/app/stock", label: "Search", Icon: Search },
  { to: "/app/portfolio", label: "Portfolio", Icon: Briefcase },
  { to: "/app/account", label: "Account", Icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

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

  const isActive = (to: string) => pathname === to || (to !== "/app" && pathname.startsWith(to));

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)" }}>
      {/* Top nav — hidden on mobile */}
      <header
        className="fixed top-0 left-0 right-0 z-40 hidden md:flex items-center h-16"
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-8">
          <div className="flex items-center gap-8">
            <Link to="/app" className="text-lg font-bold">pondex_</Link>
            <nav className="flex items-center gap-6">
              {NAV_TOP.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="text-sm h-16 flex items-center"
                  style={{
                    color: isActive(n.to) ? "var(--text-primary)" : "var(--text-secondary)",
                    fontWeight: isActive(n.to) ? 600 : 400,
                    borderBottom: isActive(n.to) ? "2px solid var(--text-primary)" : "2px solid transparent",
                  }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitSearch()}
              placeholder="Search ticker…"
              className="input-flat max-w-[180px] uppercase"
              style={{ height: 36, padding: "6px 12px", fontSize: 13 }}
            />
            <button onClick={submitSearch} className="btn-dark" style={{ padding: "8px 16px", fontSize: 13 }}>Go</button>
            <button onClick={signOut} aria-label="Log out" className="p-2 rounded-lg hover:bg-[var(--bg-subtle)]" title="Log out">
              <LogOut size={18} />
            </button>
            <Link to="/app/account" aria-label="Account" className="p-2 rounded-lg hover:bg-[var(--bg-subtle)]">
              <User size={18} />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile top */}
      <header className="fixed top-0 left-0 right-0 z-40 md:hidden flex items-center h-14 px-4" style={{ background: "var(--bg-primary)", borderBottom: "1px solid var(--border-color)" }}>
        <Link to="/app" className="text-base font-bold">pondex_</Link>
      </header>

      <main className="pt-16 md:pt-16 pb-24 md:pb-16 mt-0" style={{ paddingTop: 64 }}>
        {children}
      </main>

      {/* Bottom nav — mobile only */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex"
        style={{
          height: 60,
          background: "var(--bg-primary)",
          borderTop: "1px solid var(--border-color)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        {NAV_BOTTOM.map(({ to, label, Icon }) => {
          const active = isActive(to);
          return (
            <Link
              key={to}
              to={to}
              className="flex-1 flex flex-col items-center justify-center gap-1"
              style={{
                color: active ? "var(--text-primary)" : "var(--text-muted)",
                borderTop: active ? "2px solid var(--text-primary)" : "2px solid transparent",
              }}
            >
              <Icon size={20} strokeWidth={1.5} />
              <span style={{ fontSize: 10, fontWeight: 500 }}>{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
