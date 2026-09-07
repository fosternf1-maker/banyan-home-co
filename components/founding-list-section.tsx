import { FoundingList } from "@/components/founding-list";
import { SectionHeader } from "@/components/section-header";

export function FoundingListSection() {
  return (
    <section id="founding-list" className="band band--dark rise">
      <div className="wrap founding">
        <div className="founding__intro">
          <SectionHeader
            eyebrow="The founding list"
            title="Get in before we open the door."
            lede="Membership is not for sale yet. This list is how we decide who to call in January 2027. Joining it does not create an agreement and does not reserve a slot we haven't promised."
            tone="dark"
          />
        </div>
        <div className="founding__form">
          <FoundingList />
        </div>
      </div>
    </section>
  );
}
