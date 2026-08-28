import { SectionHeader } from "@/components/section-header";
import { neighborhoods, site, vettingItems } from "@/lib/site";

export function StandardAndArea() {
  return (
    <section id="standard" className="band rise">
      <div className="wrap two-col">
        <div>
          <SectionHeader
            eyebrow="The standard"
            title='What "vetted" means.'
            lede="The bar we will hold for trades. It is not a live roster — no vendors are signed yet."
          />
          <ul className="checks">
            {vettingItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div id="service-area">
          <SectionHeader
            eyebrow="Service area"
            title="Deliberately small."
          />
          <p className="prose">
            Year 1 is South Tampa only — 33606, 33609, 33611, and 33629,
            including Beach Park and Davis Islands. A tight radius on purpose.
            We would rather be excellent across a few neighbourhoods than
            adequate across a metro.
          </p>
          <ul className="neighborhoods">
            {neighborhoods.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <p className="fine-print">
            If you are outside this area, email{" "}
            <a className="link-liquid" href={site.areaMailto}>
              {site.email}
            </a>. We expand by neighbourhood, not by advertisement.
          </p>
        </div>
      </div>
    </section>
  );
}
