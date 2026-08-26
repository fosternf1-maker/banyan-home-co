import type { Metadata } from "next";
import Link from "next/link";
import { ExplodedHouse } from "@/components/sketch/exploded-house";
import { ButtonLink } from "@/components/button-link";
import { SiteFooter } from "@/components/site-footer";
import { neighborhoods, site, tiers } from "@/lib/site";
import { sketchIntro } from "@/lib/sketch";
import "./sketch.css";

export const metadata: Metadata = {
  title: "Sketch of the house",
  description:
    "A visual sketch of the Banyan Home Co. membership as a South Tampa house taken apart into the jobs we coordinate. Not the live site.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Sketch of the house",
    description:
      "A prototype of the membership pitch as a house coming apart into the work. Not a launch.",
    url: "/sketch",
  },
};

export default function SketchPage() {
  return (
    <>
      <main id="content" className="sketch">
        <section id="hero" className="sketch-hero">
          <p className="sketch-banner">
            This is a sketch — not the live site.{" "}
            <Link className="link-liquid" href="/">
              Return to Banyan Home Co.
            </Link>
          </p>
          <div className="sketch-hero__grid" aria-hidden="true" />
          <div className="wrap sketch-hero__inner">
            <p className="eyebrow">{sketchIntro.eyebrow}</p>
            <h1>
              {sketchIntro.titleStart} <em>{sketchIntro.titleEm}</em>
            </h1>
            <p className="sketch-hero__lede">{sketchIntro.lede}</p>
            <p className="sketch-hero__hint sketch-hero__hint--scroll">
              {sketchIntro.scrollHint}
            </p>
            <p className="sketch-hero__hint sketch-hero__hint--simple">
              {sketchIntro.simpleHint}
            </p>
            <p className="sketch-hero__hint sketch-hero__hint--static">
              {sketchIntro.staticHint}
            </p>
          </div>
        </section>

        <ExplodedHouse />

        <section className="band sketch-close rise" id="audit">
          <div className="wrap">
            <div className="band-head">
              <p className="eyebrow">Membership, quietly</p>
              <h2>The house is the product. Remembering it is the work.</h2>
              <p className="band-head__lede">
                Three monthly tiers, a one-time initiation, and a Year 1 map we
                stay inside on purpose. Attendance at any visit is yours to ask
                for. We coordinate. Licensed trades do the work and invoice you
                directly.
              </p>
            </div>

            <ul className="sketch-tiers">
              {tiers.map((tier) => (
                <li key={tier.id}>
                  <span>{tier.name}</span>
                  <b>{tier.price} / mo</b>
                </li>
              ))}
              <li>
                <span>Initiation</span>
                <b>$350</b>
              </li>
            </ul>

            <p className="sketch-note">
              Year 1: {neighborhoods.join(", ")}. FishHawk is charter-only, and
              not part of the public radius yet.
            </p>

            <div className="cta__actions">
              <ButtonLink href={site.auditMailto} variant="ink">
                Book a home health audit
              </ButtonLink>
              <ButtonLink href={site.phoneHref} variant="outline">
                {site.phoneDisplay}
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
