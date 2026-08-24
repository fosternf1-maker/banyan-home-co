import { SectionHeader } from "@/components/section-header";
import { neighborhoods, site, vettingItems } from "@/lib/site";

export function StandardAndArea() {
  return (
    <section id="standard" className="band rise">
      <div className="wrap two-col">
        <div>
          <SectionHeader
            eyebrow="The standard"
            title='What "vetted" actually means.'
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
            We serve a tight radius on purpose. Fifteen minutes between members
            is what lets us promise same-day attendance and actually mean it.
            We&apos;d rather be excellent across a few neighbourhoods than
            adequate across a metro.
          </p>
          <ul className="neighborhoods">
            {neighborhoods.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <p className="fine-print">
            Founding members are also being taken in FishHawk Ranch. Outside
            these areas,{" "}
            <a href={site.waitlistMailto}>join the waitlist</a> — we expand by
            neighbourhood, not by advertisement.
          </p>
        </div>
      </div>
    </section>
  );
}
