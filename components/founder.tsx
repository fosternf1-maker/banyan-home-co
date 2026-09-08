import { site } from "@/lib/site";

/**
 * TODO — founder letter. Nathan should replace this in his own words before
 * launch. Everything below is drawn from claims the site already makes: the
 * no-kickback promise, the year-one radius, and the fact that membership is
 * not open. Deliberately no biography — nothing here asserts anything about
 * him that is not already published.
 *
 * There is no photograph in /public. Per the production brief, a typographic
 * letter stands in rather than a generated headshot.
 */
export function Founder() {
  return (
    <section id="founder" className="band founder rise">
      <div className="wrap founder__grid">
        <div className="founder__aside">
          <p className="eyebrow">From the founder</p>
          <p className="founder__mark" aria-hidden="true">
            NF
          </p>
          <p className="founder__name">Nathan Foster</p>
          <p className="founder__role">Banyan Home Co. · South Tampa</p>
        </div>

        <div className="founder__letter">
          <h2>A person, not a marketplace.</h2>
          <p>
            Every service that promises to find you a contractor is paid by the
            contractor. That is the whole reason the recommendations are
            worthless — the name you get is the name that bought the placement
            that week, and you find out which it was after the work is done.
          </p>
          <p>
            Banyan is built the other way around. Members pay us. Trades invoice
            for their work and we pay them as your disclosed agent, without a
            markup and without taking a cent from them. That single decision is
            what makes everything else on this page worth reading, and it only
            holds if it is absolute.
          </p>
          <p>
            It is also why the map is so small. Four ZIP codes is not modesty —
            it is the largest area where I can answer the phone myself and know
            the roof we are talking about. We would rather be excellent across a
            few neighbourhoods than adequate across a metro.
          </p>
          <p>
            Membership does not open until mid-January 2027. Until then, nothing
            here is for sale, and the founding list is simply how I decide who
            to call first.
          </p>
          <p className="founder__sign">Nathan Foster</p>
          <p className="founder__contact">
            <a className="link-liquid" href={site.foundingHref}>
              Join the founding list
            </a>
            <span aria-hidden="true"> · </span>
            <a className="link-liquid" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
