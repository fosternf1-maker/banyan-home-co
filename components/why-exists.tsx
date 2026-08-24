import { SectionHeader } from "@/components/section-header";
import { friction } from "@/lib/site";

export function WhyExists() {
  return (
    <section id="why" className="band rise">
      <div className="wrap">
        <SectionHeader
          eyebrow="Why this exists"
          title="You don't have a money problem. You have a Tuesday problem."
        />
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
