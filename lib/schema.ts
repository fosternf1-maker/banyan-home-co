import { faqs, neighborhoods, site, year1Zips } from "@/lib/site";
import { absoluteUrl } from "@/lib/hosts";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: site.url,
    image: [absoluteUrl("/opengraph-image"), absoluteUrl("/icon.svg")],
    logo: absoluteUrl("/icon.svg"),
    email: site.email,
    telephone: site.telephone,
    description: site.description,
    priceRange: "$149–$499/mo (planned; not a live offer)",
    areaServed: [
      {
        "@type": "City" as const,
        name: "Tampa",
        containedInPlace: {
          "@type": "State" as const,
          name: "Florida",
        },
      },
      { "@type": "Place" as const, name: "Tampa, FL" },
      { "@type": "Place" as const, name: "South Tampa, FL" },
      ...neighborhoods.map((name) => ({
        "@type": "Place" as const,
        name: `${name}, Tampa, FL`,
      })),
      ...year1Zips.map((postalCode) => ({
        "@type": "Place" as const,
        name: `Tampa, FL ${postalCode}`,
      })),
    ],
  };
}

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question" as const,
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: item.a.join(" "),
      },
    })),
  };
}
