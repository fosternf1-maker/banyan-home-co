import { getPost } from "@/lib/hurricane";
import { createOgImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "Tampa Bay hurricane prep guide from Banyan Home Co.";
export const size = ogSize;
export const contentType = ogContentType;

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return createOgImage({
    kicker: "Banyan Home Co.",
    title: post?.ogTitle ?? "Tampa Bay hurricane prep",
    subtitle: "Official sources. Not coverage.",
  });
}
