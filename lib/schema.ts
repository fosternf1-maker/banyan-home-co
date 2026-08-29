import { faqs, neighborhoods, site, year1Zips } from "@/lib/site";

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.telephone,
    description: site.description,
    areaServed: [
      ...neighborhoods.map((name) => ({
        "@type": "Place" as const,
        name: `${name}, Tampa, FL`,
      })),
      ...year1Zips.map((postalCode) => ({
        "@type": "Place" as const,
        name: `Tampa, FL ${postalCode}`,
      })),
      { "@type": "Place" as const, name: "South Tampa, FL" },
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
