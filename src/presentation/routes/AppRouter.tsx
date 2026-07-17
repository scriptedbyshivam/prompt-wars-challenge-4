import { lazy, Suspense, useEffect, type ComponentType } from "react";

import { AppLink } from "../../shared/components/AppLink";
import { AppShell } from "../layouts/AppShell";
import HomePage from "../pages/HomePage";
import { usePathname } from "./router";

const QualityPage = lazy(() => import("../pages/QualityPage"));
const ArchitecturePage = lazy(() => import("../pages/ArchitecturePage"));
const SecurityPage = lazy(() => import("../pages/SecurityPage"));
const TestingPage = lazy(() => import("../pages/TestingPage"));
const AccessibilityPage = lazy(() => import("../pages/AccessibilityPage"));
const ChallengeAlignmentPage = lazy(
  () => import("../pages/ChallengeAlignmentPage"),
);

interface RouteDefinition {
  readonly component: ComponentType;
  readonly title: string;
}

const ROUTES: Readonly<Record<string, RouteDefinition>> = {
  "/": { component: HomePage, title: "Decision demo" },
  "/quality": { component: QualityPage, title: "Quality dashboard" },
  "/architecture": { component: ArchitecturePage, title: "Architecture" },
  "/security": { component: SecurityPage, title: "Security" },
  "/testing": { component: TestingPage, title: "Testing" },
  "/accessibility": {
    component: AccessibilityPage,
    title: "Accessibility audit",
  },
  "/challenge-alignment": {
    component: ChallengeAlignmentPage,
    title: "Challenge alignment",
  },
};

function RouteLoader(): React.JSX.Element {
  return (
    <div className="route-loader" role="status" aria-live="polite">
      <span aria-hidden="true" />
      Loading evidence…
    </div>
  );
}

function NotFoundPage(): React.JSX.Element {
  return (
    <section className="page-shell empty-page">
      <p className="eyebrow">404 · Route not found</p>
      <h1>The requested evidence page is unavailable.</h1>
      <p>No operational action has been affected.</p>
      <AppLink className="button button--primary" href="/">
        Return to decision demo
      </AppLink>
    </section>
  );
}

function routeFor(pathname: string): React.JSX.Element {
  const Page = ROUTES[pathname]?.component;
  return Page === undefined ? <NotFoundPage /> : <Page />;
}

export function AppRouter(): React.JSX.Element {
  const pathname = usePathname();
  useEffect(() => {
    document.title = `${ROUTES[pathname]?.title ?? "Not found"} — StadiumPulse-90`;
  }, [pathname]);
  return (
    <AppShell>
      <Suspense fallback={<RouteLoader />}>{routeFor(pathname)}</Suspense>
    </AppShell>
  );
}
