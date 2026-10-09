import Link from "next/link";
import { CheckList } from "@/components/hurricane/checklist";
import { HurricaneDisclaimer } from "@/components/hurricane/disclaimer";
import { PrintButton } from "@/components/hurricane/print-button";
import { RelatedLinks } from "@/components/hurricane/related";
import { SourceList } from "@/components/hurricane/sources";
import { JsonLdScript } from "@/components/json-ld";
import { guideMetadata } from "@/lib/guide-metadata";
import {
  HURRICANE_UPDATED,
  howToFromPrintable,
  shoppingList,
} from "@/lib/hurricane";
import { howToJsonLd } from "@/lib/schema";

export const metadata = guideMetadata({
  title: shoppingList.title,
  description: shoppingList.description,
  path: shoppingList.path,
});

export default function ShoppingListPage() {
  return (
    <main id="content" className="hurr hurr-sheet">
      <JsonLdScript data={howToJsonLd(howToFromPrintable(shoppingList))} />
      <article>
        <header className="hurr-hero">
          <div className="wrap wrap--narrow">
            <p className="eyebrow">
              <Link className="link-liquid" href="/hurricane">
                Hurricane prep
              </Link>
            </p>
            <h1>{shoppingList.title}</h1>
            <p className="hurr-dek">{shoppingList.dek}</p>
            <HurricaneDisclaimer />
            <p className="hurr-updated">Updated {HURRICANE_UPDATED}.</p>
            <div className="hurr-toolbar hurr-no-print">
              <PrintButton label="Print this list" />
              <a className="btn btn--ink" href={shoppingList.pdfPath}>
                Download PDF
              </a>
            </div>
          </div>
        </header>
        <div className="wrap wrap--narrow">
          <CheckList groups={shoppingList.groups} />
          <RelatedLinks
            links={[
              { href: "/hurricane", label: "Back to the hub" },
              { href: "/hurricane/checklists/supply-kit", label: "Supply kit checklist" },
              { href: "/hurricane/florida-supply-kit", label: "Supply kit guide" },
              { href: "/hurricane/checklists/home-prep", label: "Home prep checklist" },
            ]}
          />
          <SourceList sources={shoppingList.sources} />
        </div>
      </article>
    </main>
  );
}
