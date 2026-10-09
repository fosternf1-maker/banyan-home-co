import { localBusinessJsonLd } from "@/lib/schema";

function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLdScript({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  );
}

export function JsonLd() {
  return <JsonLdScript data={localBusinessJsonLd()} />;
}
