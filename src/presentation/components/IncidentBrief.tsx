import type { IncidentContext } from "../../domain/entities/incident";
import { Icon } from "../../shared/components/Icon";
import { Button } from "../../shared/components/ui";
import type { DecisionWorkflowState } from "../hooks/useDecisionWorkflow";
import { HeroEvidence, IncidentCard, TrustLine } from "./IncidentBriefSections";

const ACTION_LABEL: Record<DecisionWorkflowState["status"], string> = {
  idle: "Compile guarded response",
  compiling: "Compiling and validating…",
  compiled: "Response ready below",
  approved: "Response approved",
  error: "Retry stable replay",
};

interface IncidentBriefProps {
  readonly incident: IncidentContext;
  readonly state: DecisionWorkflowState;
  readonly onCompile: () => Promise<void>;
  readonly onReset: () => void;
}

function HeroActions({
  state,
  onCompile,
  onReset,
}: Omit<IncidentBriefProps, "incident">): React.JSX.Element {
  const canCompile = state.status === "idle" || state.status === "error";
  function compile(): void {
    if (state.status === "error") onReset();
    void onCompile();
  }
  return (
    <div className="incident-hero__actions">
      <Button
        type="button"
        busy={state.status === "compiling"}
        disabled={!canCompile}
        onClick={compile}
      >
        <Icon name={state.status === "compiling" ? "clock" : "spark"} />
        {ACTION_LABEL[state.status]}
      </Button>
      <a className="button button--quiet" href="#operational-flow">
        See how it works
        <Icon name="arrow" />
      </a>
    </div>
  );
}

function HeroCopy(
  props: Omit<IncidentBriefProps, "incident">,
): React.JSX.Element {
  return (
    <div className="incident-hero__copy">
      <p className="eyebrow">
        StadiumPulse-90 · AI stadium incident command by Shivam Maurya
      </p>
      <h1 id="product-title">
        Stadium disruption in. <em>Safe plan out.</em>
      </h1>
      <p className="incident-hero__lede">
        Grounded GenAI compiles crowd, accessibility, transit, and venue signals
        into one explainable action packet—then code challenges it before a
        human approves anything.
      </p>
      <HeroActions {...props} />
      <TrustLine />
      <HeroEvidence />
      {props.state.status === "error" ? (
        <p className="inline-error" role="alert">
          {props.state.message}
        </p>
      ) : null}
    </div>
  );
}

export function IncidentBrief({
  incident,
  ...workflow
}: IncidentBriefProps): React.JSX.Element {
  return (
    <section className="incident-hero" aria-labelledby="product-title">
      <HeroCopy {...workflow} />
      <IncidentCard incident={incident} />
    </section>
  );
}
