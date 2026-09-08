import { SectionHeader } from "@/components/section-header";
import { auditCalendar, auditPunchList, auditSystems } from "@/lib/site";

const statusLabel: Record<string, string> = {
  Good: "No action",
  Monitor: "Watch",
  Act: "Needs work",
};

/**
 * A specimen of the report a member receives on day one. It is not tied to a
 * real address and is not a licensed home inspection — both stated on the
 * page, not just here, because the distinction is the same Ch. 634 / Ch. 489
 * line the rest of the copy is careful about.
 */
export function SampleAudit() {
  return (
    <section id="sample-audit" className="band sample rise">
      <div className="wrap">
        <SectionHeader
          eyebrow="What you get on day one"
          title="The Home Health Audit."
          lede="Membership opens with a full walkthrough, a written report on every system, and a maintenance calendar built for that specific house. This is the format."
        />

        <figure className="audit">
          <figcaption className="audit__head">
            <div>
              <p className="audit__title">Home Health Audit</p>
              <p className="audit__sub">Sample property · South Tampa</p>
            </div>
            <p className="audit__stamp">
              Sample · planned format
            </p>
          </figcaption>

          <div className="audit__body">
            <section className="audit__block">
              <h3 className="audit__h">Systems</h3>
              <table className="audit__table">
                <thead>
                  <tr>
                    <th scope="col">System</th>
                    <th scope="col">Finding</th>
                    <th scope="col">Status</th>
                    <th scope="col">Next</th>
                  </tr>
                </thead>
                <tbody>
                  {auditSystems.map((row) => (
                    <tr key={row.system}>
                      <th scope="row">{row.system}</th>
                      <td className="audit__detail">{row.detail}</td>
                      <td>
                        <span
                          className={`audit__status audit__status--${row.status.toLowerCase()}`}
                        >
                          {row.status}
                          <span className="sr-only"> — {statusLabel[row.status]}</span>
                        </span>
                      </td>
                      <td className="audit__next">{row.due}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <div className="audit__split">
              <section className="audit__block">
                <h3 className="audit__h">Punch list</h3>
                <ol className="audit__punch">
                  {auditPunchList.map((row) => (
                    <li key={row.item}>
                      <span className="audit__punch-no">{row.priority}</span>
                      <span>
                        <b>{row.item}</b>
                        <span className="audit__why">{row.why}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="audit__block">
                <h3 className="audit__h">Calendar</h3>
                <dl className="audit__cal">
                  {auditCalendar.map((row) => (
                    <div key={row.month}>
                      <dt>{row.month}</dt>
                      <dd>{row.work}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          </div>
        </figure>

        <p className="tiers-note">
          A specimen, not a report for a real address, and not a licensed home
          inspection. Banyan documents condition and schedules maintenance; it
          does not perform inspections that require a Florida home inspector
          licence, and it does not pay for repairs. Independent licensed trades
          do the work.
        </p>
      </div>
    </section>
  );
}
