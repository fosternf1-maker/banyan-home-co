import { ButtonLink } from "@/components/button-link";
import { BanyanMark } from "@/components/banyan-mark";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="not-found">
      <BanyanMark
        title={site.name}
        className="mx-auto w-16 text-sage"
      />
      <h1>This page is not on the grounds.</h1>
      <p>
        The address may have moved. The house is still on South Tampa time.
      </p>
      <ButtonLink href="/" variant="primary">
        Return home
      </ButtonLink>
    </main>
  );
}
