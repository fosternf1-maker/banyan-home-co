import { ButtonLink } from "@/components/button-link";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section id="audit" className="band cta rise">
      <div className="wrap">
        <p className="eyebrow">Mid-January 2027</p>
        <h2>
          Contact us.
          <br />
          Decide afterwards.
        </h2>
        <p>
          Membership is not open yet. When it is, it begins with a Home Health
          Audit — a walkthrough, a written report, and a calendar for that
          house. Until then,{" "}
          <a className="link-liquid" href={site.phoneHref}>
            {site.phoneDisplay}
          </a>{" "}
          is the main door.
        </p>
        <div className="cta__actions">
          <ButtonLink href={site.phoneHref} variant="ink">
            Contact us
          </ButtonLink>
        </div>
        <p className="cta__quiet">
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
