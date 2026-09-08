import { ButtonLink } from "@/components/button-link";
import { BanyanMark } from "@/components/banyan-mark";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <>
      <main className="not-found" id="content">
        <BanyanMark title={site.name} className="mx-auto w-16 text-sage" />
        <h1>This page is not on the grounds.</h1>
        <p>
          The address may have moved. The house is still on South Tampa time.
        </p>
        <div className="not-found__actions">
          <ButtonLink href="/" variant="ink">
            Return home
          </ButtonLink>
          <ButtonLink href={site.foundingHref} variant="outline">
            Join the founding list
          </ButtonLink>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
