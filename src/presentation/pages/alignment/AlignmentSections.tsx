import { Icon } from "../../../shared/components/Icon";
import { ALIGNMENT_ROWS } from "./data";

const SUMMARY = [
  ["17/17", "challenge terms mapped"],
  ["4/4", "user groups served"],
  ["7", "operational domains joined"],
  ["1", "human approval boundary"],
] as const;

export function AlignmentSummary(): React.JSX.Element {
  return (
    <div className="alignment-summary" aria-label="Alignment summary">
      {SUMMARY.map(([value, label]) => (
        <article key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </article>
      ))}
    </div>
  );
}

function AlignmentIntro(): React.JSX.Element {
  return (
    <div className="section-intro">
      <div>
        <p className="section-kicker">Requirement traceability</p>
        <h2 id="alignment-title">Challenge → feature → evidence → impact</h2>
      </div>
      <p>
        Rows use exact challenge vocabulary for fast automated and human review.
      </p>
    </div>
  );
}

function AlignmentRow({
  row,
}: {
  readonly row: (typeof ALIGNMENT_ROWS)[number];
}): React.JSX.Element {
  const [keyword, feature, implementation, evidence, impact] = row;
  return (
    <tr>
      <td>{keyword}</td>
      <td>{feature}</td>
      <td>{implementation}</td>
      <td>
        <span className="table-evidence">
          <Icon name="check" size={15} />
          {evidence}
        </span>
      </td>
      <td>{impact}</td>
    </tr>
  );
}

function TraceabilityTable(): React.JSX.Element {
  return (
    <div className="evidence-table-wrap">
      <table className="evidence-table alignment-table">
        <caption className="visually-hidden">
          Complete challenge keyword alignment matrix
        </caption>
        <thead>
          <tr>
            <th scope="col">Challenge keyword</th>
            <th scope="col">Feature</th>
            <th scope="col">Technical implementation</th>
            <th scope="col">Visible evidence</th>
            <th scope="col">Expected impact</th>
          </tr>
        </thead>
        <tbody>
          {ALIGNMENT_ROWS.map((row) => (
            <AlignmentRow key={row[0]} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AlignmentTable(): React.JSX.Element {
  return (
    <section className="content-section" aria-labelledby="alignment-title">
      <AlignmentSummary />
      <AlignmentIntro />
      <TraceabilityTable />
      <aside className="audit-note">
        <Icon name="evidence" />
        <p>
          <strong>Evidence rule:</strong> replay data and outcomes are synthetic
          or modeled. StadiumPulse-90 does not claim FIFA affiliation,
          certification, live venue integration, or measured impact.
        </p>
      </aside>
    </section>
  );
}
