import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import { Nav } from "@/components/pondex/Nav";
import { BlurMask } from "@/components/pondex/BlurMask";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — pondex_" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/app" });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    navigate({ to: "/app" });
  };

  const handleGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) { toast.error("Sign-in with Google failed."); return; }
    if (result.redirected) return;
    navigate({ to: "/app" });
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/stockrater/hero-mountains.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <div className="absolute inset-0 bg-white/60" />
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-white to-transparent" />
      <Nav />
      <BlurMask />

      <div className="relative flex min-h-screen items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-3xl border border-border-soft bg-white/90 backdrop-blur-xl shadow-[0_24px_64px_rgba(0,0,0,0.1)] px-10 py-10">
            <img src="/stockrater/pondex-logo.png" alt="pondex_" style={{ height: "24px", width: "auto", marginBottom: "32px" }} />

            <h1 className="text-2xl font-bold tracking-tight text-ink">Welcome back.</h1>
            <p className="mt-1 text-sm text-ink-mid">Log in to your pondex_ account.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <div>
                <label className="text-xs font-semibold text-ink-mid uppercase tracking-wider">Email</label>
                <input
                  required type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-border-soft bg-surface/60 px-4 py-3 text-sm text-ink placeholder:text-ink-mid/50 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-ink-mid uppercase tracking-wider">Password</label>
                <input
                  required type="password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-2 w-full rounded-xl border border-border-soft bg-surface/60 px-4 py-3 text-sm text-ink placeholder:text-ink-mid/50 outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all"
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-pill bg-brand py-3 text-sm font-semibold text-white hover:bg-brand/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Logging in…" : <>Log in <ArrowRight className="size-4" /></>}
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-border-soft" />
              <span className="text-xs text-ink-mid">OR</span>
              <div className="flex-1 h-px bg-border-soft" />
            </div>

            <button
              onClick={handleGoogle}
              className="flex w-full items-center justify-center gap-2 rounded-pill border border-border-soft bg-white py-3 text-sm font-semibold text-ink hover:bg-surface transition-colors"
            >
              <svg className="size-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm text-ink-mid">
              No account?{" "}
              <Link to="/signup" className="font-semibold text-brand hover:underline">
                Sign up →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
