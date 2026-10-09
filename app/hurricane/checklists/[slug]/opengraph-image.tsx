import { getChecklist } from "@/lib/hurricane";
import { createOgImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "Printable Tampa Bay hurricane checklist from Banyan Home Co.";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const list = getChecklist(slug);

  return createOgImage({
    kicker: "Banyan Home Co.",
    title: list?.ogTitle ?? "Printable hurricane checklist",
    subtitle: "A list you can print. Not coverage.",
  });
}
