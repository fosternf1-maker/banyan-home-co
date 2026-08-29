import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";

type Props = {
  title: string;
  children: ReactNode;
};

export function LegalPage({ title, children }: Props) {
  return (
    <>
      <main id="content" className="legal">
        <article className="wrap legal__article">
          <p className="eyebrow">{site.name}</p>
          <h1>{title}</h1>
          {children}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
