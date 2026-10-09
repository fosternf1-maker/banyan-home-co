import { ButtonLink } from "@/components/button-link";
import { site } from "@/lib/site";

export function HurricaneCta() {
  return (
    <section className="band hurr-cta rise" id="pre-storm-check">
      <div className="wrap">
        <p className="eyebrow">Pre-storm home check</p>
        <h2>A look at the house, on a calendar.</h2>
        <p>
          Membership is not open yet. When it is, Signature and Platinum
          include hurricane-season readiness: a scheduled walkthrough before
          the rush, and a post-storm inspection afterward. That is
          coordination for South Tampa — 33606, 33609, 33611, and 33629. It
          does not prevent damage, it is not coverage, and it is not a promise
          about the storm.
        </p>
        <div className="cta__actions">
          <ButtonLink href={site.phoneHref} variant="primary">
            Contact us · {site.phoneDisplay}
          </ButtonLink>
          <ButtonLink href="/#membership" variant="ghost">
            Membership
          </ButtonLink>
        </div>
        <p className="hurr-cta__quiet">
          Or write{" "}
          <a className="link-liquid" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
