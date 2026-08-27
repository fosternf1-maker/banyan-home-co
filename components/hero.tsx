import { ButtonLink } from "@/components/button-link";
import { HouseDrawing } from "@/components/house-drawing";
import { Wordmark } from "@/components/wordmark";
import { site } from "@/lib/site";

const roots = [
  { left: "7%", delay: "0.05s", height: "100%" },
  { left: "13%", delay: "0.32s", height: "74%" },
  { left: "26%", delay: "0.14s", height: "88%" },
  { left: "38%", delay: "0.46s", height: "61%" },
  { left: "52%", delay: "0.22s", height: "100%" },
  { left: "61%", delay: "0.58s", height: "70%" },
  { left: "74%", delay: "0.09s", height: "92%" },
  { left: "83%", delay: "0.40s", height: "66%" },
  { left: "94%", delay: "0.26s", height: "100%" },
];

export function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="roots" aria-hidden="true">
        {roots.map((root) => (
          <i
            key={root.left}
            style={{
              left: root.left,
              animationDelay: root.delay,
              height: root.height,
            }}
          />
        ))}
      </div>
      <div className="wrap hero__inner">
        <Wordmark size="lg" mark="living" href="#top" />
        <div className="hero__copy">
          <h1>
            Owning the house was supposed to be the <em>reward.</em>
          </h1>
          <p className="hero__lede">
            Banyan is a private membership for Tampa homeowners who are done
            vetting contractors at nine at night. One number. A network of trades
            we&apos;ve already checked. And someone from our team standing in your
            kitchen when they arrive.
          </p>
          <div className="hero__actions">
            <ButtonLink href={site.auditMailto} variant="primary">
              Book a home health audit
            </ButtonLink>
            <ButtonLink href="#membership" variant="ghost">
              See membership
            </ButtonLink>
          </div>
        </div>
        <div className="hero__drawing" aria-hidden="true">
          <HouseDrawing />
        </div>
        <ul className="hero__meta">
          <li>South Tampa</li>
          <li>Founding members now</li>
          <li>Est. 2026</li>
        </ul>
      </div>
    </section>
  );
}
