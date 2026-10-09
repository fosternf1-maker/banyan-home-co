import type { Metadata } from "next";
import Link from "next/link";
import { CheckList } from "@/components/hurricane/checklist";
import { HurricaneCta } from "@/components/hurricane/cta";
import { HurricaneDisclaimer } from "@/components/hurricane/disclaimer";
import { PrintButton } from "@/components/hurricane/print-button";
import { SourceList } from "@/components/hurricane/sources";
import { JsonLdScript } from "@/components/json-ld";
import { guideMetadata } from "@/lib/guide-metadata";
import {
  HURRICANE_UPDATED,
  checklists,
  hubFaqs,
  hubZones,
  official,
  posts,
  shoppingList,
} from "@/lib/hurricane";
import { faqPageJsonLd } from "@/lib/schema";

const description =
  "Tampa Bay hurricane prep for Hillsborough, Pinellas, and Pasco: evacuation zones, a 72-hour plan, supply lists, and a pre-storm home check. Not insurance.";

export const metadata: Metadata = guideMetadata({
  title: "Tampa Bay hurricane prep",
  description,
  path: "/hurricane",
  type: "website",
});

const jumps = [
  { href: "#why-now", label: "Why now" },
  { href: "#your-zone", label: "Your zone" },
  { href: "#seventy-two", label: "72 hours" },
  { href: "#guides", label: "Guides" },
  { href: "#lists", label: "Checklists" },
  { href: "#shopping", label: "Get your stuff" },
  { href: "#pre-storm-check", label: "Home check" },
  { href: "#questions", label: "Questions" },
];

export default function HurricaneHubPage() {
  return (
    <main id="content" className="hurr">
      <JsonLdScript data={faqPageJsonLd(hubFaqs)} />
      <header className="hurr-hero">
        <div className="wrap">
          <p className="eyebrow">Tampa Bay · June through November</p>
          <h1>Do the quiet work first.</h1>
          <p className="hurr-dek">
            Zones, a kit that lasts at least a week, and a short list for the
            house. For Hillsborough, Pinellas, and Pasco. Nothing on these
            pages prevents a storm, and nothing on them is coverage.
          </p>
          <HurricaneDisclaimer />
          <nav className="hurr-jump hurr-no-print" aria-label="On this page">
            {jumps.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <p className="hurr-updated">Updated {HURRICANE_UPDATED}.</p>
        </div>
      </header>

      <section className="band rise" id="why-now">
        <div className="wrap wrap--narrow">
          <header className="band-head">
            <p className="eyebrow">Why prep now</p>
            <h2>The useful afternoon is the one before anyone is in a hurry.</h2>
          </header>
          <div className="hurr-prose">
            <p>
              <a className="link-liquid" href={official.readyHurricanes.href} rel="noreferrer">
                Ready.gov
              </a>{" "}
              puts the Atlantic hurricane season at June 1 through November 30,
              and says storm surge is historically the leading cause of
              hurricane-related deaths in the United States. Tampa Bay sits in
              that water. The forecast lives at the{" "}
              <a className="link-liquid" href={official.nhc.href} rel="noreferrer">
                National Hurricane Center
              </a>{" "}
              and{" "}
              <a className="link-liquid" href={official.nwsTbw.href} rel="noreferrer">
                NWS Tampa Bay
              </a>
              . The order to leave lives with your county.
            </p>
            <p>
              <a className="link-liquid" href={official.fdemPlan.href} rel="noreferrer">
                Florida&apos;s Division of Emergency Management
              </a>{" "}
              asks every household to know its zone and to keep a supply kit
              for at least seven days. That is a Saturday job. It is not a
              promise that the house will be fine.
            </p>
          </div>
        </div>
      </section>

      <section className="band rise" id="your-zone">
        <div className="wrap">
          <header className="band-head">
            <p className="eyebrow">Know your zone</p>
            <h2>Look up the address. Then follow that county&apos;s order.</h2>
            <p className="band-head__lede">
              Statewide map:{" "}
              <a className="link-liquid" href={official.fdemZone.href} rel="noreferrer">
                Florida Know Your Zone
              </a>
              . A zone letter is not an order until your county issues one.
            </p>
          </header>
          <div className="hurr-cards">
            {hubZones.map((zone) => (
              <article key={zone.county} className="hurr-card">
                <h3>{zone.county}</h3>
                <p>{zone.body}</p>
                <p className="hurr-card__links">
                  {zone.links.map((link) => (
                    <a key={link.href} href={link.href} rel="noreferrer">
                      {link.label}
                    </a>
                  ))}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="band rise" id="seventy-two">
        <div className="wrap">
          <header className="band-head">
            <p className="eyebrow">72 hours</p>
            <h2>Three days of work. Supplies that last longer.</h2>
            <p className="band-head__lede">
              The full write-up is the{" "}
              <Link className="link-liquid" href="/hurricane/72-hour-home-checklist">
                72-hour home checklist
              </Link>
              . This is the short version.
            </p>
          </header>
          <ol className="hurr-timeline">
            <li>
              <strong>Three days out</strong>
              <span>
                Confirm the zone, name where you would go, refill medicine
                toward two weeks, and stock water and food for at least seven
                days. Keep a gas tank at least half full during the season.
              </span>
            </li>
            <li>
              <strong>The day before</strong>
              <span>
                Bring in anything that can fly. Clear gutters. Cover openings
                with rated shutters or properly secured 5/8-inch plywood, after
                you ask the local building official. Charge the phones.
              </span>
            </li>
            <li>
              <strong>If they order your zone out</strong>
              <span>
                Leave. Ready.gov says to do it immediately. Do not wait to see
                the water. The{" "}
                <Link className="link-liquid" href="/hurricane/checklists/go-bag">
                  go-bag
                </Link>{" "}
                is what you carry.
              </span>
            </li>
            <li>
              <strong>If they do not</strong>
              <span>
                The order can still change. An interior room, not a closed
                attic, is what Ready.gov describes for wind. Stay with the
                county&apos;s updates.
              </span>
            </li>
          </ol>
        </div>
      </section>

      <section className="band rise" id="guides">
        <div className="wrap">
          <header className="band-head">
            <p className="eyebrow">Guides</p>
            <h2>Read the one you need tonight.</h2>
          </header>
          <div className="hurr-index">
            {posts.map((item) => (
              <Link key={item.path} className="hurr-index__item" href={item.path}>
                <span>{item.title}</span>
                <small>{item.dek}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="band rise" id="lists">
        <div className="wrap">
          <header className="band-head">
            <p className="eyebrow">Checklists</p>
            <h2>Print them. Or take the PDF.</h2>
          </header>
          <ul className="hurr-files">
            {checklists.map((item) => (
              <li key={item.path}>
                <Link href={item.path}>{item.title}</Link>
                <a href={item.pdfPath}>PDF</a>
              </li>
            ))}
            <li>
              <Link href={shoppingList.path}>{shoppingList.title}</Link>
              <a href={shoppingList.pdfPath}>PDF</a>
            </li>
          </ul>
        </div>
      </section>

      <section className="band rise" id="shopping">
        <div className="wrap">
          <header className="band-head">
            <p className="eyebrow">Get your stuff</p>
            <h2>A cart, not a brand list.</h2>
            <p className="band-head__lede">
              Generic items, grouped. Check them off here, or open the{" "}
              <Link className="link-liquid" href={shoppingList.path}>
                printable shopping list
              </Link>{" "}
              and the{" "}
              <a className="link-liquid" href={shoppingList.pdfPath}>
                PDF
              </a>
              .
            </p>
          </header>
          <div className="hurr-toolbar hurr-no-print">
            <PrintButton label="Print this list" />
          </div>
          <CheckList groups={shoppingList.groups} />
        </div>
      </section>

      <HurricaneCta />

      <section className="band rise" id="questions">
        <div className="wrap wrap--narrow">
          <header className="band-head">
            <p className="eyebrow">Questions</p>
            <h2>The ones that come up every June.</h2>
          </header>
          <div className="faq">
            {hubFaqs.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <div className="faq__panel">
                  <div className="faq__panel-inner">
                    {item.a.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap hurr-sources-wrap">
        <SourceList
          sources={[
            official.readyHurricanes,
            official.readyKit,
            official.fdemZone,
            official.fdemPlan,
            official.hillsboroughEm,
            official.hillsboroughHeat,
            official.pinellasZone,
            official.pinellasFinder,
            official.pascoFinder,
            official.nhc,
            official.nwsTbw,
            official.cfoStorm,
            official.floir,
          ]}
        />
      </div>
    </main>
  );
}
