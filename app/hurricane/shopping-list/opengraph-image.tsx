import { shoppingList } from "@/lib/hurricane";
import { createOgImage, ogContentType, ogSize } from "@/lib/og-image";

export const alt = "Hurricane shopping list from Banyan Home Co.";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpenGraphImage() {
  return createOgImage({
    kicker: "Banyan Home Co.",
    title: shoppingList.ogTitle,
    subtitle: "Water, light, papers, medicine. No brand names.",
  });
}
