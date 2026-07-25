import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Sign up — pondex_" },
      { name: "description", content: "Start for free. Get one clear verdict for any stock. No credit card required." },
      { property: "og:title", content: "Sign up — pondex_" },
      { property: "og:description", content: "Start for free. No credit card required." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
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
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate({ to: "/app/stock", search: { ticker: "AAPL" } as never });
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
        <h1 className="mt-8 text-3xl font-semibold tracking-tight">Start for free.</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>No credit card required.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="section-label">Email</label>
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-flat mt-2" placeholder="you@example.com" />
          </div>
          <div>
            <label className="section-label">Password</label>
            <input required type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="input-flat mt-2" placeholder="min. 8 characters" />
          </div>
          <button type="submit" disabled={loading} className="btn-dark w-full" style={{ opacity: loading ? 0.5 : 1 }}>
            {loading ? "…" : "Create account →"}
          </button>
        </form>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>OR</span>
          <div className="flex-1 h-px" style={{ background: "var(--border-color)" }} />
        </div>

        <button onClick={handleGoogle} className="btn-outline w-full mt-4">Continue with Google</button>

        <p className="mt-6 text-sm" style={{ color: "var(--text-secondary)" }}>
          Already have an account?{" "}
          <Link to="/login" className="font-medium underline underline-offset-4" style={{ color: "var(--text-primary)" }}>
            Log in →
          </Link>
        </p>
        <p className="mt-6 text-xs" style={{ color: "var(--text-muted)" }}>
          By creating an account you agree to our{" "}
          <Link to="/terms" className="underline underline-offset-2">Terms of Service</Link> and{" "}
          <Link to="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}
