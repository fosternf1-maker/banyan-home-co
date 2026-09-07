import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Founder } from "@/components/founder";
import { FoundingListSection } from "@/components/founding-list-section";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Membership } from "@/components/membership";
import { PromiseBand } from "@/components/promise-band";
import { SampleAudit } from "@/components/sample-audit";
import { ScheduledAndCoast } from "@/components/scheduled-and-coast";
import { SiteFooter } from "@/components/site-footer";
import { StandardAndArea } from "@/components/standard-and-area";
import { WhyExists } from "@/components/why-exists";

export default function Home() {
  return (
    <>
      <main id="content">
        <Hero />
        <WhyExists />
        <HowItWorks />
        <SampleAudit />
        <FoundingListSection />
        <Membership />
        <ScheduledAndCoast />
        <Founder />
        <PromiseBand />
        <StandardAndArea />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
