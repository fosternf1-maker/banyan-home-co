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

export function faqPageJsonLd(
  items: readonly { q: string; a: readonly string[] }[] = faqs,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question" as const,
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: item.a.join(" "),
      },
    })),
  };
}

export function articleJsonLd(article: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}) {
  const pageUrl = absoluteUrl(article.path);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Organization" as const,
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization" as const,
      name: site.name,
      url: site.url,
      logo: {
        "@type": "ImageObject" as const,
        url: absoluteUrl("/icon.svg"),
      },
    },
    mainEntityOfPage: pageUrl,
    image: [absoluteUrl(`${article.path}/opengraph-image`)],
  };
}

export function howToJsonLd(howTo: {
  name: string;
  description: string;
  path: string;
  steps: readonly { name: string; text: string }[];
  sections?: readonly {
    name: string;
    steps: readonly { name: string; text: string }[];
  }[];
}) {
  const sections = howTo.sections ?? [];
  const step =
    sections.length > 0
      ? sections.map((section) => ({
          "@type": "HowToSection" as const,
          name: section.name,
          itemListElement: section.steps.map((item) => ({
            "@type": "HowToStep" as const,
            name: item.name,
            text: item.text,
          })),
        }))
      : howTo.steps.map((item) => ({
          "@type": "HowToStep" as const,
          name: item.name,
          text: item.text,
        }));

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    url: absoluteUrl(howTo.path),
    step,
  };
}
