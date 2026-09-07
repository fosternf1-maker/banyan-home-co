import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { TradeForm } from "@/components/trade-form";

export const metadata: Metadata = {
  title: "For licensed trades",
  description:
    "Banyan Home Co. takes no commission from the trades it recommends. If you are a licensed Florida trade working in South Tampa, this is how to reach us.",
  alternates: { canonical: "/trades" },
  openGraph: { url: "/trades" },
};

export default function TradesPage() {
  return (
    <>
      <main id="content">
        <section className="band trades-band">
          <div className="wrap wrap--narrow">
            <p className="eyebrow">If you are a licensed trade</p>
            <h1>We are not taking a cut of your invoice.</h1>
            <p className="trades-band__lede">
              Every lead marketplace sells your name to whoever paid the most
              that week. We do the opposite: members pay us, you invoice for
              your work, and we pay you as the member&apos;s disclosed agent
              within five business days of an approved invoice. We never mark it
              up and we take nothing from you.
            </p>
            <p className="trades-band__lede">
              There is no roster yet. No vendors are signed, and membership does
              not open until mid-January 2027. Write us if you want on it when
              it exists.
            </p>
            <TradeForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
