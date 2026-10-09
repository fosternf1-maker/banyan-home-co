import {
  createOgImage,
  ogContentType,
  ogSize,
} from "@/lib/og-image";

export const alt = "Tampa Bay hurricane prep from Banyan Home Co.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return createOgImage({
    kicker: "Banyan Home Co.",
    title: "Do the quiet work first.",
    subtitle: "Zones, a kit, and a plan for Tampa Bay. Not coverage.",
  });
}
