import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/app/AppShell";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/app/account")({
  head: () => ({ meta: [{ title: "Account — pondex_" }, { name: "description", content: "Your pondex_ account." }, { name: "robots", content: "noindex" }] }),
  component: AccountPage,
});

function AccountPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [verdicts, setVerdicts] = useState<number>(0);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      const u = data.user;
      if (!u) return;
      setEmail(u.email ?? "");
      setCreatedAt(u.created_at ?? "");
      const today = new Date().toISOString().split("T")[0];
      const { data: rows } = await supabase.from("daily_verdicts").select("count").eq("date", today).maybeSingle();
      setVerdicts(rows?.count ?? 0);
    });
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login", replace: true });
  };

  const deleteAccount = async () => {
    if (!confirm("Delete account permanently? This clears all your data.")) return;
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    // Delete profile row — cascade removes related data.
    await supabase.from("profiles").delete().eq("id", data.user.id);
    await supabase.auth.signOut();
    toast.success("Account deleted.");
    navigate({ to: "/", replace: true });
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-[720px] px-6 md:px-8 py-16">
        <p className="section-label">Account</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">{email || "Your account"}</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>Free tier</p>

        <div className="mt-10 card-flat p-0">
          {[
            { l: "Email", v: email },
            { l: "Plan", v: "Free" },
            { l: "Member since", v: createdAt ? new Date(createdAt).getFullYear().toString() : "—" },
            { l: "Verdicts today", v: `${verdicts} / 1` },
          ].map((row, i) => (
            <div key={row.l} className="flex items-center justify-between px-6 py-4" style={{ borderTop: i === 0 ? "none" : "1px solid var(--border-color)" }}>
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{row.l}</span>
              <span className="text-sm font-semibold tabular">{row.v}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-3">
          <button onClick={() => toast("Pro checkout coming soon.")} className="btn-dark">Upgrade to Pro →</button>
          <button onClick={signOut} className="btn-outline">Log out</button>
        </div>
        <button onClick={deleteAccount} className="mt-6 text-sm underline underline-offset-4" style={{ color: "var(--color-down)" }}>
          Delete account
        </button>
      </div>
    </AppShell>
  );
}
