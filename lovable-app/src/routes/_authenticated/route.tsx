import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    // Dev bypass: allow access if pondex_dev_user is set in localStorage
    if (typeof window !== 'undefined' && localStorage.getItem('pondex_dev_user')) {
      return { user: { email: localStorage.getItem('pondex_dev_user'), id: 'dev' } }
    }
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/login" });
    return { user: data.user };
  },
  component: () => <Outlet />,
});
