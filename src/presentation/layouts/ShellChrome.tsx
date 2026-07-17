import { AppLink } from "../../shared/components/AppLink";
import { Brand } from "../../shared/components/Brand";

const NAVIGATION = [
  ["/", "Decision demo"],
  ["/challenge-alignment", "Alignment"],
  ["/quality", "Quality"],
  ["/architecture", "Architecture"],
  ["/security", "Security"],
  ["/testing", "Testing"],
  ["/accessibility", "Accessibility"],
] as const;

function NavigationLink({
  href,
  label,
  pathname,
}: {
  readonly href: string;
  readonly label: string;
  readonly pathname: string;
}): React.JSX.Element {
  const current = pathname === href;
  return (
    <AppLink
      href={href}
      aria-current={current ? "page" : undefined}
      className={current ? "site-nav__link is-current" : "site-nav__link"}
    >
      {label}
    </AppLink>
  );
}

function ProductIdentity(): React.JSX.Element {
  return (
    <div className="shell-width site-header__inner">
      <Brand />
      <div className="identity-line" aria-label="Product description">
        <span>AI stadium incident command by Shivam Maurya</span>
        <span className="mode-pill">
          <span className="mode-pill__dot" aria-hidden="true" />
          Replay mode
        </span>
      </div>
    </div>
  );
}

export function SiteHeader({
  pathname,
}: {
  readonly pathname: string;
}): React.JSX.Element {
  return (
    <header className="site-header">
      <ProductIdentity />
      <nav className="site-nav" aria-label="Evidence and product navigation">
        <div className="shell-width site-nav__scroll">
          {NAVIGATION.map(([href, label]) => (
            <NavigationLink
              href={href}
              key={href}
              label={label}
              pathname={pathname}
            />
          ))}
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter(): React.JSX.Element {
  return (
    <footer className="site-footer">
      <div className="shell-width site-footer__inner">
        <div>
          <strong>StadiumPulse-90</strong>
          <span>
            Human-controlled AI for inclusive stadium operations · Developed by
            Shivam Maurya
          </span>
        </div>
        <div className="site-footer__links">
          <AppLink href="/challenge-alignment">Challenge evidence</AppLink>
          <AppLink href="/quality">Quality evidence</AppLink>
        </div>
        <p>
          Synthetic replay · Modeled impact · No FIFA affiliation or live venue
          claim
        </p>
      </div>
    </footer>
  );
}
