import { BanyanMark } from "@/components/banyan-mark";
import { legalDisclaimer, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer id="footer" className="site-footer">
      <div className="wrap">
        <div className="site-footer__cols">
          <div>
            <BanyanMark className="site-footer__mark" />
            <strong className="site-footer__name">{site.name}</strong>
            <p>
              Private home management for Tampa homeowners.
              <br />
              South Tampa · FishHawk Ranch
            </p>
          </div>
          <div>
            <strong>Contact</strong>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={site.phoneHref}>{site.phoneDisplay}</a>
          </div>
          <div>
            <strong>Membership</strong>
            <a href="#membership">Tiers &amp; pricing</a>
            <a href={site.vendorMailto}>Join the vendor network</a>
          </div>
        </div>
        <div className="site-footer__fine">
          <p>{legalDisclaimer}</p>
          <p className="site-footer__copy">© 2026 {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
