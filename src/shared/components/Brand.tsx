import { AppLink } from "./AppLink";

export function Brand(): React.JSX.Element {
  return (
    <AppLink className="brand" href="/">
      <span className="brand__mark" aria-hidden="true">
        <span>SP</span>
        <span>90</span>
      </span>
      <span className="brand__name">
        StadiumPulse <strong>90</strong>
      </span>
    </AppLink>
  );
}
