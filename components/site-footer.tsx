import Link from "next/link";
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
              Private home management for South Tampa.
              <br />
              Opening mid-January 2027
            </p>
          </div>
          <div>
            <strong>Contact</strong>
            <a href={site.phoneHref}>{site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div>
            <strong>Membership</strong>
            <Link href="/#membership">Tiers &amp; pricing</Link>
            <a href={site.vendorMailto}>Write about the trade network</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
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
