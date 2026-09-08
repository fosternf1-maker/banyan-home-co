import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `${site.name} is pre-launch. This page is how we treat a message you send or a name you leave, not a live membership product.`,
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy">
      <p>
        This website is a brochure for a company that has not launched.
        Membership is not for sale. There is no account and no checkout. There
        is a founding list, and this page explains what happens to what you put
        in it.
      </p>

      <h2>What we collect</h2>
      <p>
        The founding list asks for your name, email, mobile number and ZIP code,
        and optionally your neighbourhood, home type, who we should contact, and
        a short note. If you arrived from a pricing card, we also record which
        tier prompted the enquiry.
      </p>
      <p>
        The trade form asks for your company name, Florida licence number,
        trades, years in residential work, service ZIPs, whether general
        liability and workers&apos; compensation are in force, and a contact
        name, email and phone.
      </p>
      <p>
        If you write to{" "}
        <a className="link-liquid" href={`mailto:${site.email}`}>
          {site.email}
        </a>{" "}
        or call{" "}
        <a className="link-liquid" href={site.phoneHref}>
          {site.phoneDisplay}
        </a>{" "}
        instead, that correspondence is treated the same way.
      </p>

      <h2>Why we collect it</h2>
      <p>
        The founding list is how we decide who to call when membership opens in
        mid-January 2027, and how we tell you it has opened. The trade form is
        how we build a roster that does not exist yet. Nothing else.
      </p>

      <h2>Who receives it</h2>
      <p>
        Nathan Foster, while the business is being formed. Submissions are
        delivered by email to{" "}
        <a className="link-liquid" href={`mailto:${site.email}`}>
          {site.email}
        </a>{" "}
        through Resend, our email provider, and are held in that mailbox. We do
        not sell lists, share them with the trades, or pass them to any
        marketplace.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Until launch and for twelve months after it, or until you ask us to
        remove you — whichever comes first. To be removed, write to{" "}
        <a className="link-liquid" href={`mailto:${site.email}`}>
          {site.email}
        </a>{" "}
        and say so. You do not need to give a reason and we will not ask for
        one.
      </p>

      <h2>What we do not do</h2>
      <p>
        We do not ask for payment information, and no field on this site accepts
        it. We do not set marketing cookies. There is no membership file yet,
        because there are no members yet.
      </p>

      <h2>What this is not</h2>
      <p>
        This is not a privacy policy for a live product, an app, or a contracted
        service. Joining the founding list does not create a membership
        agreement. When an entity exists and membership opens, this page will be
        rewritten for that.
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
