import type {
  EvaluatedCandidate,
  GeneratedCandidate,
} from "../entities/decision";
import type { IncidentContext } from "../entities/incident";
import {
  checkAccessibility,
  checkActionability,
  checkEvidence,
  checkSafety,
  checkTransport,
} from "./candidateChecks";
import { calculateCandidateScore } from "./candidateScore";

/**
 * Evaluates an AI-generated decision candidate against strict deterministic guardrails.
 *
 * This function is a critical part of the Responsible AI boundary. It ensures that
 * the unstructured output from the LLM is checked against predefined safety,
 * accessibility, transport, actionability, and evidence constraints before being
 * presented to a human commander. Any candidate failing a critical check is immediately rejected.
 *
 * @param candidate - The raw generated candidate from the AI provider.
 * @param incident - The incident context containing operational constraints and baselines.
 * @returns An EvaluatedCandidate containing the computed score, check results, and eligibility disposition.
 */
export function evaluateCandidate(
  candidate: GeneratedCandidate,
  incident: IncidentContext,
): EvaluatedCandidate {
  const checks = [
    checkSafety(candidate, incident),
    checkAccessibility(candidate, incident),
    checkTransport(candidate, incident),
    checkActionability(candidate),
    checkEvidence(candidate, incident),
  ];
  const failed = checks.find(({ status }) => status === "fail");
  return {
    ...candidate,
    checks,
    score: calculateCandidateScore(candidate, incident),
    disposition: failed === undefined ? "eligible" : "rejected",
    rejectionReason: failed?.detail ?? null,
  };
}
