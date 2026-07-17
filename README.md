# StadiumPulse-90 — AI Stadium Incident Command by Shivam Maurya

[![CI workflow](https://img.shields.io/badge/CI-workflow%20configured-176b5b?style=flat-square&logo=githubactions&logoColor=white)](.github/workflows/ci.yml)
[![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178c6?style=flat-square&logo=typescript&logoColor=white)](tsconfig.app.json)
[![WCAG 2.2 AA](https://img.shields.io/badge/accessibility-WCAG%202.2%20AA-7646ff?style=flat-square)](ACCESSIBILITY.md)

**Stadium disruption in. Safe plan out.**

A grounded GenAI incident-to-action compiler for inclusive stadium operations.

StadiumPulse-90 turns fragmented match-day signals into a coordinated decision packet that a human commander can inspect and approve in under 90 seconds. It explicitly prevents a “safe” crowd action from silently breaking accessible routes, transit capacity, multilingual communication, or sustainability constraints.

> **Honest demo contract:** The included scenario runs in clearly labeled **Replay mode**, so judging is fast, offline, and reproducible. Production mode routes structured generation to Gemini through a server-side gateway. Generated plans are untrusted until schema validation and deterministic policy guardrails pass.

## Why this is not another chatbot or dashboard

The product performs one consequential operational job:

`signals → grounding → generated candidate → guardrail challenge → counterfactuals → human approval → role relay → audit receipt`

The interface is a decision narrative, not a wall of generic KPIs. Every recommendation carries evidence, assumptions, confidence, ownership, accessible alternatives, and a fallback.

## Quick start

Requirements: Node.js 20.19+ and npm 10+.

```bash
npm ci
npm run dev
```

Open `http://localhost:5173`. Select **Compile response** to run the stable East Concourse incident replay.

## Quality gate

```bash
npm run quality
```

This single command checks formatting, lint, strict TypeScript, coverage, production build, bundle budgets, Lighthouse thresholds, dependency advisories, Playwright, report generation, and the final production build.

Latest locally generated evidence is stored in [`public/quality/latest.json`](public/quality/latest.json) and rendered by `/quality`; the page does not contain hand-entered statistics. The current verified snapshot contains **78 Vitest checks, 11 Playwright checks, 97.38% branch coverage, Lighthouse 100/100/100/100, CLS 0, and zero dependency advisories**. The public GitHub repository is configured. Production is live at https://resolve-90.vercel.app with direct-refresh evidence routes, canonical metadata, robots, sitemap, and ten verified security headers; remote CI status is verified independently from local report data.

| Check                       | Command                    | Enforced by CI |
| --------------------------- | -------------------------- | -------------- |
| Formatting                  | `npm run format:check`     | Yes            |
| ESLint, zero warnings       | `npm run lint`             | Yes            |
| Strict TypeScript           | `npm run typecheck`        | Yes            |
| Unit/integration/a11y tests | `npm run test:coverage`    | Yes            |
| End-to-end critical path    | `npm run test:e2e`         | Yes            |
| Production build            | `npm run build`            | Yes            |
| JS/CSS performance budget   | `npm run test:performance` | Yes            |
| Lighthouse thresholds       | `npm run lighthouse`       | Yes            |
| Dependency audit            | `npm run security:audit`   | Yes            |
| Generated quality report    | `npm run quality:report`   | Yes            |

## Architecture at a glance

```text
presentation ──calls──▶ application ──depends on──▶ domain
     │                       │                         ▲
     │                       └── ports ◀── adapters ──┘
     └──── never imports provider SDKs or business rules
```

- `src/domain`: pure incident, plan, route, and impact invariants.
- `src/application`: use cases and provider/repository ports.
- `src/infrastructure`: replay/live adapters, schemas, telemetry.
- `src/presentation`: accessible React components and lazy routes.
- `src/shared`: non-domain utilities and primitives.
- `api`: server-only Gemini gateway with validation and rate limiting.

See [ARCHITECTURE.md](ARCHITECTURE.md) and the in-product `/architecture` route.

## Responsible AI boundary

- No autonomous gate, evacuation, medical, or security action.
- No biometrics, individual tracking, or personal profiles.
- Gemini output is schema-validated and policy-checked.
- Evidence references and rejected alternatives are visible.
- Low-confidence and safety-critical actions require explicit approval.
- Replay data and modeled impact are labeled; no live-integration claim is made.

## Evidence index

- [Concept selection](docs/CONCEPT_EVALUATION.md)
- [Challenge traceability](docs/REQUIREMENT_TRACEABILITY.md)
- [Architecture](ARCHITECTURE.md)
- [Security and threat model](SECURITY.md)
- [Accessibility](ACCESSIBILITY.md)
- [Testing](TESTING.md)
- [Evaluation evidence](EVALUATION.md)
- [Contribution guide](CONTRIBUTING.md)
- [Changelog](CHANGELOG.md)

## Affiliation

“FIFA” is referenced only as part of the supplied challenge context. StadiumPulse-90 is not affiliated with or endorsed by FIFA.
