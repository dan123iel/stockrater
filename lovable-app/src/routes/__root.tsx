import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/pondex/Nav";
import { FinalCTA } from "@/components/pondex/FinalCTA";
import { Footer } from "@/components/pondex/Footer";

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <div className="mx-auto max-w-4xl px-6 pt-32 pb-24">
        <div className="rounded-3xl overflow-hidden bg-surface/60 border border-border-soft">
          <div className="px-8 pt-12 pb-8 text-center">
            <span className="inline-flex items-center rounded-full border border-border-soft bg-white px-3 py-1 text-xs font-medium text-ink-mid">
              Something went wrong
            </span>
            <p className="mt-6 text-[clamp(5rem,15vw,9rem)] font-black leading-none tracking-tighter text-ink">
              404
            </p>
            <h1 className="mt-2 text-2xl font-bold text-ink">Page not found</h1>
            <p className="mt-2 text-base text-ink-mid">
              The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 rounded-pill bg-brand pl-3 pr-5 py-2.5 text-sm font-semibold text-white hover:bg-brand/90 transition-colors"
            >
              <span className="grid size-7 place-items-center rounded-full bg-white/20">
                <ArrowLeft className="size-3.5" />
              </span>
              Back to home
            </Link>
          </div>
          <div
            className="h-48 w-full"
            style={{
              backgroundImage: "url('/stockrater/hero-landscape.png')",
              backgroundSize: "cover",
              backgroundPosition: "center 60%",
            }}
          />
        </div>
      </div>
      <div style={{ backgroundImage: "url('/stockrater/hero-landscape.png')", backgroundSize: "cover", backgroundPosition: "center 30%", backgroundRepeat: "no-repeat" }}>
        <FinalCTA />
        <Footer />
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
