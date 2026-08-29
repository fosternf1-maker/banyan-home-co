import { SectionHeader } from "@/components/section-header";
import { steps } from "@/lib/site";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="band rise">
      <div className="wrap">
        <SectionHeader
          eyebrow="How it works"
          title="Four steps, and then you stop thinking about it."
        />
        <ol className="steps">
          {steps.map((step, index) => (
            <li key={step.title} className="step">
              <span className="step__num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
