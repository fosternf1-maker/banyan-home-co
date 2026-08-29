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
  );
}
