import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — pondex_" },
      { name: "description", content: "Log in to your pondex_ account." },
      { property: "og:title", content: "Log in — pondex_" },
      { property: "og:description", content: "Log in to your pondex_ account." },
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
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate({ to: "/app" });
  };

  const handleGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (result.error) {
      toast.error("Sign-in with Google failed.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/app" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Link to="/" className="text-lg font-bold">pondex_</Link>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight">Welcome back.</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>Log in to your pondex_ account.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="section-label">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-flat mt-2" placeholder="you@example.com" />
          </div>
          <div>
            <label className="section-label">Password</label>
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-flat mt-2" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="btn-dark w-full" style={{ opacity: loading ? 0.5 : 1 }}>
            {loading ? "…" : "Log in →"}
          </button>
        </form>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>OR</span>
          <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
        </div>

        <button onClick={handleGoogle} className="btn-outline w-full mt-4">Continue with Google</button>

        <p className="mt-6 text-sm" style={{ color: "var(--text-secondary)" }}>
          No account?{" "}
          <Link to="/signup" className="font-medium underline underline-offset-4" style={{ color: "var(--text-primary)" }}>
            Sign up →
          </Link>
        </p>
      </div>
    </div>
  );
}
