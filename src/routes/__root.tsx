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
import experienceCss from "../experience.css?url";
import { ReservationLayer } from "../components/baristo/ReservationLayer";
import { FirstPourLayer } from "../components/baristo/FirstPourLayer";

const brandDescription =
  "Single-origin Indian Arabica from mountain coffee landscapes, developed into Noble Dark and Truly Dark for espresso-minded homes and private rituals of distinction.";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page does not exist or has moved.</p>
        <Link to="/" className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    console.error("Baristo route error");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">This page did not load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Refresh the page or return home.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
            Try again
          </button>
          <a href="/" className="rounded-md border border-input px-4 py-2 text-sm">Go home</a>
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
      { title: "Baristo.Online — Born at Altitude. Roasted for Ascent." },
      { name: "description", content: brandDescription },
      { name: "author", content: "Baristo.Online" },
      { name: "theme-color", content: "#11100e" },
      { property: "og:title", content: "Baristo.Online — Born at Altitude. Roasted for Ascent." },
      { property: "og:description", content: brandDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://baristo.online" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Baristo.Online — Born at Altitude. Roasted for Ascent." },
      { name: "twitter:description", content: brandDescription },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: experienceCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Manrope:wght@300;400;500;600;700;800&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "alternate icon", href: "/favicon.svg" },
      { rel: "canonical", href: "https://baristo.online" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://baristo.online/#organization",
              name: "Baristo.Online",
              url: "https://baristo.online",
              logo: "https://baristo.online/favicon.svg",
              description: brandDescription,
            },
            {
              "@type": "WebSite",
              "@id": "https://baristo.online/#website",
              url: "https://baristo.online",
              name: "Baristo.Online",
              publisher: { "@id": "https://baristo.online/#organization" },
            },
          ],
        }),
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
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function HeaderSloganSync() {
  useEffect(() => {
    const apply = () => {
      document.querySelectorAll("header a").forEach((anchor) => {
        const spans = anchor.querySelectorAll("span");
        if (spans.length < 2) return;
        const brandText = spans[0]?.textContent?.replace(/\s+/g, "").toLowerCase();
        if (brandText !== "baristo.online") return;
        const slogan = spans[spans.length - 1];
        if (slogan) slogan.textContent = "Experience Your Nobility.";
      });
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <HeaderSloganSync />
      <Outlet />
      <ReservationLayer />
      <FirstPourLayer />
    </QueryClientProvider>
  );
}
