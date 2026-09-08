import { SectionHeader } from "@/components/section-header";
import { foundingHrefForTier, membershipRows, tiers } from "@/lib/site";

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

  if (value.includes(" · ")) {
    const [main, note] = value.split(" · ");
    return (
      <>
        {main}
        <br />
        <em>{note}</em>
      </>
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
          lede="Planned pricing — membership opens mid-January 2027. Pay monthly, or pay for the year and get two months back."
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
                    <a className="tier-ask" href={foundingHrefForTier(tier.id)}>
                      Ask about this tier
                    </a>
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
              <a className="tier-ask" href={foundingHrefForTier(tier.id)}>
                Ask about {tier.name}
              </a>
            </article>
          ))}
        </div>

        <p className="tiers-note">
          A one-time $350 initiation is planned for the first Home Health Audit
          and the build of the home&apos;s file. Independent licensed trades do
          the work. Banyan pays them as your disclosed agent within five
          business days of an approved invoice, never marks the work up, and
          takes nothing from the trade.
        </p>
      </div>
    </section>
  );
}
