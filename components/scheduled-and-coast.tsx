import { SectionHeader } from "@/components/section-header";
import { coastItems, scheduledServices } from "@/lib/site";

export function ScheduledAndCoast() {
  return (
    <section id="scheduled" className="band rise">
      <div className="wrap two-col">
        <div>
          <SectionHeader
            eyebrow="Scheduled services"
            title="The jobs everybody puts off."
            lede="Performed by our own technicians, on a calendar, so you never have to remember them."
          />
          <ul className="services">
            {scheduledServices.map((service) => (
              <li key={service.name}>
                <span>{service.name}</span>
                <span>{service.price}</span>
              </li>
            ))}
          </ul>
        </div>
        <div id="coast">
          <SectionHeader
            eyebrow="Built for this coast"
            title="June to November, we work differently."
          />
          <p className="prose">
            A home maintenance company from California doesn&apos;t know what
            October does to a Tampa house. We do. Hurricane service isn&apos;t
            an add-on we bolted on — it&apos;s half of why this business exists
            here.
          </p>
          <ul className="checks">
            {coastItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
