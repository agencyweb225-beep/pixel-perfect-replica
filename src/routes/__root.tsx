import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContext } from "@/components/auth/AuthContext";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollTop } from "@/components/layout/ScrollTop";
import { Dido } from "@/components/brand/Dido";
import { brandButton } from "@/components/brand/BrandButton";

function NotFoundComponent() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-ink pattern-sock-dark px-5 pt-24 text-paper">
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-hand text-3xl text-sun">Hmm. This one's gone missing.</p>
          <h1 className="mt-4 text-[7rem] leading-none sm:text-[10rem] text-brand">404</h1>
          <h2 className="mt-2 text-4xl sm:text-5xl">Lost sock alert.</h2>
          <p className="mt-4 max-w-md text-paper/80">Like the other half of your favourite pair, this page has vanished. Let's get you back somewhere useful.</p>
          <Link to="/" className={`${brandButton({ variant: "brand", size: "lg" })} mt-8 border-paper`}>Take me home</Link>
        </div>
        <Dido say="HEY! YOU FOUND… NOTHING." className="mx-auto w-48 sm:w-64" />
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
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
      { title: "ODD SOCKS | Creative Social Media Marketing Agency" },
      { name: "description", content: "ODD SOCKS helps businesses grow their digital presence through creative social media marketing. Odd stands out." },
      { name: "theme-color", content: "#FF1B1B" },
      { property: "og:site_name", content: "ODD SOCKS" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&family=Gochi+Hand&family=Noto+Serif:ital,wght@0,400;0,600;1,400&family=Hind+Siliguri:wght@400;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
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
  const router = useRouter();
  const [auth, setAuth] = useState<{ user: User | null; ready: boolean }>({ user: null, ready: false });
  useEffect(() => {
    let active = true;
    let revision = 0;
    async function refreshUser() {
      const current = ++revision;
      const { data } = await supabase.auth.getUser();
      if (active && revision === current) setAuth({ user: data.user, ready: true });
    }
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      if (event === "SIGNED_OUT") { revision++; setAuth({ user: null, ready: true }); }
      else setTimeout(() => { if (active) void refreshUser(); }, 0);
      void router.invalidate();
      if (event !== "SIGNED_OUT") void queryClient.invalidateQueries();
    });
    void refreshUser();
    return () => { active = false; subscription.unsubscribe(); };
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={auth}>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-sun focus:px-4 focus:py-2 focus:text-ink">Skip to content</a>
      <Navbar />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <ScrollTop />
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}
