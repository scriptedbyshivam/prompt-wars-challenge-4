import type { EvidenceId, IncidentContext } from "./incident";

/**
 * Represents the allowed operational roles responsible for executing an action.
 */
export type OperationalRole =
  | "Accessibility lead"
  | "Crowd lead"
  | "Gate supervisor"
  | "Mobility lead"
  | "Transport liaison"
  | "Volunteer captain";

/**
 * Defines the supported locales for multilingual fan communication.
 */
export type MessageLocale = "en" | "es" | "fr";

/**
 * Confidence level of the AI-generated decision candidate.
 */
export type DecisionConfidence = "high" | "medium" | "low";

/**
 * Indicates whether the decision was generated live via the AI provider or loaded from a replay.
 */
export type GenerationMode = "live" | "replay";

/**
 * Represents a single operational action within a broader candidate plan.
 */
export interface PlanAction {
  /** Unique identifier for the action. */
  readonly id: string;
  /** Execution order of the action. */
  readonly sequence: number;
  /** The operational role responsible for executing the action. */
  readonly owner: OperationalRole;
  /** The physical location where the action takes place. */
  readonly location: string;
  /** Detailed instruction for the owner. */
  readonly instruction: string;
  /** Time limit in seconds for action completion. */
  readonly dueInSeconds: number;
  /** Contingency plan if the primary instruction fails. */
  readonly fallback: string;
  /** References to the evidence supporting this action. */
  readonly evidenceIds: readonly EvidenceId[];
}

/**
 * Represents a localized communication message intended for stadium fans.
 */
export interface FanMessage {
  /** The locale code for the message (e.g., 'en', 'es'). */
  readonly locale: MessageLocale;
  /** Human-readable label for the locale. */
  readonly localeLabel: string;
  /** The main headline of the message. */
  readonly headline: string;
  /** The detailed body content of the message. */
  readonly body: string;
  /** Information regarding accessible alternatives for fans. */
  readonly accessibleAlternative: string;
  /** Flag indicating if human review is mandatory before broadcasting. */
  readonly humanReviewRequired: boolean;
}

/**
 * Projections of the operational impact resulting from the decision candidate.
 */
export interface ImpactProjection {
  /** Estimated time required to make and execute the decision. */
  readonly decisionLatencySeconds: number;
  /** Ratio of peak crowd pressure expected. */
  readonly peakPressureRatio: number;
  /** Percentage of accessible routes maintained. */
  readonly accessibleRoutePercent: number;
  /** Percentage of transport capacity correctly utilized. */
  readonly transportFitPercent: number;
  /** Projected clarity of the instruction to staff and fans. */
  readonly instructionClarityPercent: number;
  /** Estimated carbon impact of the operational changes. */
  readonly operationalCarbonKg: number;
}

/**
 * Represents a complete decision plan proposed by the AI provider.
 */
export interface GeneratedCandidate {
  /** Unique identifier for the candidate. */
  readonly id: string;
  /** Concise title summarizing the candidate's strategy. */
  readonly title: string;
  /** Detailed description of the proposed strategy. */
  readonly strategy: string;
  /** The AI's confidence in this candidate. */
  readonly confidence: DecisionConfidence;
  /** The logical reasoning behind proposing this candidate. */
  readonly rationale: string;
  /** Sequence of actions required to execute the strategy. */
  readonly actions: readonly PlanAction[];
  /** Proposed communications for fans. */
  readonly messages: readonly FanMessage[];
  /** Expected operational impact metrics. */
  readonly impact: ImpactProjection;
  /** References to incident evidence supporting the candidate. */
  readonly evidenceIds: readonly EvidenceId[];
}

/**
 * Metadata capturing the origin and context of the generated decision.
 */
export interface GenerationReceipt {
  /** Mode of generation (live or replay). */
  readonly mode: GenerationMode;
  /** The name of the AI provider used. */
  readonly provider: string;
  /** The specific model version used for generation. */
  readonly model: string;
  /** The version of the prompt template used. */
  readonly promptVersion: string;
  /** Timestamp when the decision was generated. */
  readonly generatedAt: string;
  /** Additional notes or caveats regarding the generation. */
  readonly note: string;
}

/**
 * The full response payload containing all candidates and the generation receipt.
 */
export interface GeneratedResponse {
  /** The list of generated candidates. */
  readonly candidates: readonly GeneratedCandidate[];
  /** Metadata regarding the generation process. */
  readonly receipt: GenerationReceipt;
}

/**
 * Categories of deterministic guardrails applied to generated candidates.
 */
export type GuardrailCategory =
  "accessibility" | "actionability" | "evidence" | "safety" | "transport";

/**
 * Represents the result of a single guardrail check applied to a candidate.
 */
export interface GuardrailCheck {
  /** Unique identifier for the check. */
  readonly id: string;
  /** The category this check belongs to. */
  readonly category: GuardrailCategory;
  /** Human-readable label for the check. */
  readonly label: string;
  /** The result status of the check. */
  readonly status: "pass" | "warn" | "fail";
  /** Detailed explanation of the check outcome. */
  readonly detail: string;
}

/**
 * A generated candidate that has been processed by deterministic guardrails.
 */
export interface EvaluatedCandidate extends GeneratedCandidate {
  /** Results of all applied guardrail checks. */
  readonly checks: readonly GuardrailCheck[];
  /** The final calculated score based on guardrail performance. */
  readonly score: number;
  /** Final eligibility determination based on guardrail checks. */
  readonly disposition: "eligible" | "rejected";
  /** The reason for rejection if disposition is 'rejected', otherwise null. */
  readonly rejectionReason: string | null;
}

/**
 * A complete, compiled decision ready for human review and approval.
 */
export interface CompiledDecision {
  /** Unique identifier for the compiled decision. */
  readonly id: string;
  /** The source incident context. */
  readonly incident: IncidentContext;
  /** The primary recommended candidate. */
  readonly selected: EvaluatedCandidate;
  /** Alternative evaluated candidates. */
  readonly alternatives: readonly EvaluatedCandidate[];
  /** Metadata regarding the generation process. */
  readonly receipt: GenerationReceipt;
  /** Timestamp when compilation completed. */
  readonly compiledAt: string;
  /** Current state of the decision. */
  readonly state: "awaiting-approval";
}

/**
 * Acknowledgements required from the human commander before approval.
 */
export interface ApprovalAcknowledgement {
  /** Confirmation that modeled impacts are understood. */
  readonly understandsModeledImpact: boolean;
  /** Confirmation that accessibility constraints were reviewed. */
  readonly reviewedAccessibility: boolean;
}

/**
 * An audit log entry recording the approval of a decision.
 */
export interface AuditEvent {
  /** Unique identifier for the audit event. */
  readonly id: string;
  /** The ID of the approved decision. */
  readonly decisionId: string;
  /** The type of audit event. */
  readonly type: "decision-approved";
  /** Timestamp of the event. */
  readonly at: string;
  /** A textual summary of the audit event. */
  readonly summary: string;
}

/**
 * A fully approved decision containing the audit trail.
 */
export interface ApprovedDecision extends Omit<CompiledDecision, "state"> {
  /** Current state of the decision. */
  readonly state: "approved";
  /** Timestamp when the decision was approved. */
  readonly approvedAt: string;
  /** The associated audit event. */
  readonly auditEvent: AuditEvent;
}
