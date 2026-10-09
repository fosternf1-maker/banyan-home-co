import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckList } from "@/components/hurricane/checklist";
import { HurricaneDisclaimer } from "@/components/hurricane/disclaimer";
import { PrintButton } from "@/components/hurricane/print-button";
import { RelatedLinks } from "@/components/hurricane/related";
import { SourceList } from "@/components/hurricane/sources";
import { JsonLdScript } from "@/components/json-ld";
import { guideMetadata } from "@/lib/guide-metadata";
import {
  HURRICANE_UPDATED,
  checklists,
  getChecklist,
  howToFromPrintable,
} from "@/lib/hurricane";
import { howToJsonLd } from "@/lib/schema";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return checklists.map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const list = getChecklist(slug);
  if (!list) notFound();

  return guideMetadata({
    title: list.title,
    description: list.description,
    path: list.path,
  });
}

export default async function ChecklistPage({ params }: Props) {
  const { slug } = await params;
  const list = getChecklist(slug);
  if (!list) notFound();
  const howTo = howToFromPrintable(list);

  return (
    <main id="content" className="hurr hurr-sheet">
      <JsonLdScript data={howToJsonLd(howTo)} />
      <article>
        <header className="hurr-hero">
          <div className="wrap wrap--narrow">
            <p className="eyebrow">
              <Link className="link-liquid" href="/hurricane">
                Hurricane prep
              </Link>
            </p>
            <h1>{list.title}</h1>
            <p className="hurr-dek">{list.dek}</p>
            <HurricaneDisclaimer />
            <p className="hurr-updated">Updated {HURRICANE_UPDATED}.</p>
            <div className="hurr-toolbar hurr-no-print">
              <PrintButton label="Print this list" />
              <a className="btn btn--ink" href={list.pdfPath}>
                Download PDF
              </a>
            </div>
          </div>
        </header>
        <div className="wrap wrap--narrow">
          <CheckList groups={list.groups} />
          <RelatedLinks
            links={[
              { href: "/hurricane", label: "Back to the hub" },
              { href: "/hurricane/shopping-list", label: "Shopping list" },
              { href: "/hurricane/72-hour-home-checklist", label: "72-hour checklist" },
              { href: "/hurricane/florida-supply-kit", label: "Supply kit guide" },
            ]}
          />
          <SourceList sources={list.sources} />
        </div>
      </article>
    </main>
  );
}
