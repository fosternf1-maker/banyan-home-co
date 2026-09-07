import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `${site.name} is pre-launch. Visiting this site does not create a membership or any other contract.`,
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms">
      <p>
        This website is information about a planned South Tampa home-management
        membership. It is not an offer to sell. Neither visiting it, joining
        the founding list, nor sending the trade form creates a contract,
        reserves a membership, or places anyone on a roster.
      </p>
      <h2>No membership yet</h2>
      <p>
        {site.name} is not open. Pricing on the homepage is planned: Essentials
        $149 / month, Signature $299 / month, Platinum $499 / month, plus a
        $350 initiation. Those figures are not a live offer.
      </p>
      <p>
        Cancellation, refund, and attendance notes on the homepage are planned
        terms for when membership is actually for sale. They are not in force
        today. There is no member agreement yet.
      </p>
      <h2>The founding list and the trade form</h2>
      <p>
        The founding list records who would like to hear from us when
        membership opens in mid-January 2027. It is not a queue position, not a
        reservation, and not a price lock. The trade form is an expression of
        interest in a vendor network that does not exist yet; no vendors are
        signed and no roster has been built. How either set of details is
        handled is set out in our{" "}
        <a className="link-liquid" href="/privacy">
          privacy page
        </a>
        .
      </p>
      <h2>What Banyan is not</h2>
      <p>
        Banyan is not an insurer and does not pay to repair or replace home
        systems. Independent licensed trades would do that work. Banyan would
        pay them as the member&apos;s disclosed agent, without markup, and
        without taking money from the trade.
      </p>
      <h2>The mark</h2>
      <p>
        The name and the tree lockup are not a registered trademark. Nothing
        here should be read as a claim that they are.
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
