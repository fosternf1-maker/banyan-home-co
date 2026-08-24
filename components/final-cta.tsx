import { ButtonLink } from "@/components/button-link";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section id="audit" className="band cta rise">
      <div className="wrap">
        <p className="eyebrow">Founding members</p>
        <h2>
          Start with the audit.
          <br />
          Decide afterwards.
        </h2>
        <p>
          We&apos;ll walk your home for an hour, document every system, and
          hand you a written report on what needs attention in the next twelve
          months. No charge, no obligation. Take the list and hire whoever you
          like — or let us take it from there.
        </p>
        <div className="cta__actions">
          <ButtonLink href={site.auditMailto} variant="ink">
            Book your home health audit
          </ButtonLink>
          <ButtonLink href={site.phoneHref} variant="outline">
            {site.phoneDisplay}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
