/**
 * Unique identifier for an incident.
 */
export type IncidentId = string;

/**
 * Unique identifier for a piece of evidence.
 */
export type EvidenceId = string;

/**
 * Indicates how recently the evidence was collected or verified.
 */
export type EvidenceFreshness = "fresh" | "stale";

/**
 * The high-level category of an operational signal.
 */
export type SignalCategory =
  "accessibility" | "crowd" | "operations" | "sustainability" | "transport";

/**
 * Represents a piece of evidence supporting an incident context.
 */
export interface EvidenceItem {
  /** Unique ID for the evidence. */
  readonly id: EvidenceId;
  /** Human-readable title of the evidence. */
  readonly title: string;
  /** The origin system or sensor that produced the evidence. */
  readonly source: string;
  /** Timestamp when the evidence was observed. */
  readonly observedAt: string;
  /** Freshness state of the evidence. */
  readonly freshness: EvidenceFreshness;
  /** A short excerpt or summary of the evidence data. */
  readonly excerpt: string;
}

/**
 * An individual operational signal contributing to an incident.
 */
export interface IncidentSignal {
  /** Unique ID for the signal. */
  readonly id: string;
  /** The operational category of the signal. */
  readonly category: SignalCategory;
  /** Descriptive label for the signal. */
  readonly label: string;
  /** The measured or observed value. */
  readonly value: string;
  /** The severity level of the signal. */
  readonly severity: "critical" | "elevated" | "watch";
  /** ID of the evidence supporting this signal. */
  readonly evidenceId: EvidenceId;
}

/**
 * Absolute constraints that any proposed decision must satisfy.
 */
export interface OperationalConstraints {
  /** The absolute maximum allowable crowd pressure ratio. */
  readonly maximumPressureRatio: number;
  /** The absolute minimum acceptable accessible route percentage. */
  readonly minimumAccessibleRoutePercent: number;
  /** The target accessible route percentage. */
  readonly targetAccessibleRoutePercent: number;
  /** The minimum acceptable transport fit percentage. */
  readonly minimumTransportFitPercent: number;
  /** Maximum allowable seconds to make a decision. */
  readonly maximumDecisionLatencySeconds: number;
}

/**
 * Expected baseline impacts if no action is taken.
 */
export interface BaselineImpact {
  /** The decision latency in seconds at baseline. */
  readonly decisionLatencySeconds: number;
  /** The peak pressure ratio at baseline. */
  readonly peakPressureRatio: number;
  /** The percentage of accessible routes at baseline. */
  readonly accessibleRoutePercent: number;
  /** The percentage of transport fit at baseline. */
  readonly transportFitPercent: number;
  /** The clarity of instructions at baseline. */
  readonly instructionClarityPercent: number;
  /** The operational carbon footprint in Kg at baseline. */
  readonly operationalCarbonKg: number;
}

/**
 * The complete, aggregated context of a stadium incident.
 */
export interface IncidentContext {
  /** Unique ID of the incident. */
  readonly id: IncidentId;
  /** Short operational code representing the incident type. */
  readonly code: string;
  /** Human-readable title of the incident. */
  readonly title: string;
  /** A detailed summary of what is happening. */
  readonly summary: string;
  /** The name of the venue. */
  readonly venue: string;
  /** The name of the current event. */
  readonly event: string;
  /** Timestamp when the incident was initially received. */
  readonly receivedAt: string;
  /** The physical zone in the stadium where the incident occurred. */
  readonly zone: string;
  /** Estimated number of people affected. */
  readonly affectedPeople: number;
  /** A collection of signals detecting the incident. */
  readonly signals: readonly IncidentSignal[];
  /** Supporting evidence items. */
  readonly evidence: readonly EvidenceItem[];
  /** The non-negotiable constraints for resolving the incident. */
  readonly constraints: OperationalConstraints;
  /** Projected metrics if no action is taken. */
  readonly baseline: BaselineImpact;
}
