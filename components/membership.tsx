import { SectionHeader } from "@/components/section-header";
import { membershipRows, tiers } from "@/lib/site";

function Cell({ value }: { value: string }) {
  if (value === "yes") {
    return (
      <span className="yes" aria-label="Included">
        ✓
      </span>
    );
  }

  if (value === "—") {
    return (
      <span className="no" aria-label="Not included">
        —
      </span>
    );
  }

  return value;
}

export function Membership() {
  return (
    <section id="membership" className="band rise">
      <div className="wrap">
        <SectionHeader
          eyebrow="Membership"
          title="Three tiers. No contracts longer than a month."
          lede="Pay monthly, or pay for the year and get two months back."
        />

        <div className="tiers-desktop">
          <table className="tiers">
            <thead>
              <tr>
                <th className="col-feature" scope="col">
                  <span className="eyebrow">What&apos;s included</span>
                </th>
                {tiers.map((tier) => (
                  <th
                    key={tier.id}
                    scope="col"
                    className={tier.featured ? "featured" : undefined}
                  >
                    <span className="tier-name">{tier.name}</span>
                    <span className="tier-price">
                      <b>{tier.price}</b> / mo
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {membershipRows.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">
                    {row.feature}
                    {row.note ? <em> — {row.note}</em> : null}
                  </th>
                  {tiers.map((tier) => (
                    <td
                      key={tier.id}
                      className={tier.featured ? "featured" : undefined}
                    >
                      <Cell value={row.values[tier.id]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="tiers-mobile">
          {tiers.map((tier) => (
            <article
              key={tier.id}
              className={`tier-card${tier.featured ? " tier-card--featured" : ""}`}
            >
              <header>
                <h3 className="tier-name">{tier.name}</h3>
                <p className="tier-price">
                  <b>{tier.price}</b> / mo
                </p>
              </header>
              <dl>
                {membershipRows.map((row) => (
                  <div key={row.feature}>
                    <dt>
                      {row.feature}
                      {row.note ? <em> — {row.note}</em> : null}
                    </dt>
                    <dd>
                      <Cell value={row.values[tier.id]} />
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>

        <p className="tiers-note">
          A one-time $350 initiation covers your first Home Health Audit and
          the build of your home&apos;s file. Contractor work is quoted and
          invoiced to you directly by the licensed trade performing it — Banyan
          never marks it up.
        </p>
      </div>
    </section>
  );
}
