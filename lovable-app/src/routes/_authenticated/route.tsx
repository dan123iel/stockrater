import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    return { user: { email: "demo@pondex.app", id: "demo" } };
  },
  component: () => <Outlet />,
});
