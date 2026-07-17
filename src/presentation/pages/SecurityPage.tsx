import "../styles/evidence.css";

import { EvidencePageHeader } from "../components/EvidencePageHeader";
import {
  GatewaySequence,
  HeaderEvidence,
  SecurityCaveat,
  SecuritySummary,
  ThreatModel,
} from "./security/SecuritySections";

export default function SecurityPage(): React.JSX.Element {
  return (
    <div className="page-shell">
      <EvidencePageHeader
        eyebrow="Evaluation evidence · security"
        title="The model proposes. It never commands."
        summary="StadiumPulse-90 treats every generated plan as untrusted. Controls protect credentials, decision integrity, accessibility, privacy, and human authority."
        status="0 known high / critical advisories"
      />
      <ThreatModel />
      <GatewaySequence />
      <SecuritySummary />
      <HeaderEvidence />
      <SecurityCaveat />
    </div>
  );
}
