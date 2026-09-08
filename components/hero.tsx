import { ButtonLink } from "@/components/button-link";
import { BanyanLivingMark } from "@/components/banyan-living-mark";
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
        <BanyanLivingMark className="hero__mark" />
        <h1>
          Owning the house was supposed to be the <em>reward.</em>
        </h1>
        <p className="hero__lede">
          Banyan is a private membership for South Tampa homeowners who are
          done vetting contractors at nine at night. One number. Independent
          licensed trades, introduced as your disclosed agent. And a Home
          Manager at the house when they arrive — if you want us there.
        </p>
        <div className="hero__actions">
          <ButtonLink href={site.foundingHref} variant="primary">
            Join the founding list
          </ButtonLink>
          <ButtonLink href="/#membership" variant="ghost">
            See planned membership
          </ButtonLink>
        </div>
        <ul className="hero__meta">
          <li>South Tampa</li>
          <li>Opens mid-January 2027</li>
          <li>Planned pricing</li>
        </ul>
      </div>
    </section>
  );
}
