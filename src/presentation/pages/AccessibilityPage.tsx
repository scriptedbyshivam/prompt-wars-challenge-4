import "../styles/evidence.css";

import { QUALITY_REPORT } from "../../generated/qualityReport";
import { EvidencePageHeader } from "../components/EvidencePageHeader";
import {
  AccessibilityCaveat,
  AuditFixes,
  AuditSummary,
  WcagTable,
} from "./accessibility/AccessibilitySections";

const STATUS_COPY = {
  pass: "Automated + code audit complete",
  fail: "Final audit in progress",
} as const;
const STATUS_TONE = { pass: "pass", fail: "warn" } as const;

export default function AccessibilityPage(): React.JSX.Element {
  const status = QUALITY_REPORT.accessibility.status;
  return (
    <div className="page-shell">
      <EvidencePageHeader
        eyebrow="Evaluation evidence · accessibility"
        title="Accessibility is a UI standard—and an operational veto."
        summary="StadiumPulse-90 targets WCAG 2.2 AA while preventing recommendations that reduce protected step-free capacity below 90%."
        status={STATUS_COPY[status]}
        tone={STATUS_TONE[status]}
      />
      <AuditSummary />
      <WcagTable />
      <AuditFixes />
      <AccessibilityCaveat />
    </div>
  );
}
