import { OakDrawing } from "@/components/house-drawing";
import { SectionHeader } from "@/components/section-header";
import { friction } from "@/lib/site";

export function WhyExists() {
  return (
    <section id="why" className="band rise">
      <div className="wrap why">
        <div className="why__head">
          <SectionHeader
            eyebrow="Why this exists"
            title="You don't have a money problem. You have a Tuesday problem."
          />
          <div className="why__oak" aria-hidden="true">
            <OakDrawing />
          </div>
        </div>
        <div className="friction">
          {friction.map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
