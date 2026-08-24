import { SectionHeader } from "@/components/section-header";
import { faqs } from "@/lib/site";

export function Faq() {
  return (
    <section id="questions" className="band rise">
      <div className="wrap wrap--narrow">
        <SectionHeader
          eyebrow="Questions"
          title="The ones worth asking."
        />
        <div className="faq">
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              {item.a.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
