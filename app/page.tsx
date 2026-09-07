import type { Metadata } from "next";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Membership } from "@/components/membership";
import { PromiseBand } from "@/components/promise-band";
import { ScheduledAndCoast } from "@/components/scheduled-and-coast";
import { SiteFooter } from "@/components/site-footer";
import { StandardAndArea } from "@/components/standard-and-area";
import { WhyExists } from "@/components/why-exists";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  return (
    <>
      <main id="content">
        <Hero />
        <WhyExists />
        <HowItWorks />
        <Membership />
        <ScheduledAndCoast />
        <PromiseBand />
        <StandardAndArea />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
