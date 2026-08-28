import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `${site.name} is pre-launch. This page is how we treat a message you send, not a live membership product.`,
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy">
      <p>
        This website is a brochure for a company that has not launched.
        Membership is not for sale. There is no account, no checkout, and no
        waitlist form.
      </p>
      <h2>What we collect</h2>
      <p>
        If you write to{" "}
        <a className="link-liquid" href={`mailto:${site.email}`}>
          {site.email}
        </a>{" "}
        or call {site.phoneDisplay}, that correspondence goes to Nathan Foster
        while the business is being formed. We do not run a name-capture form
        on this site.
      </p>
      <p>
        We do not ask for payment information. We do not sell lists. There is
        no membership file yet, because there are no members yet.
      </p>
      <h2>What this is not</h2>
      <p>
        This is not a privacy policy for a live product, an app, or a
        contracted service. When an entity exists and membership opens, this
        page will be rewritten for that.
      </p>
      <p>
        Questions:{" "}
        <a className="link-liquid" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        .
      </p>
    </LegalPage>
  );
}
