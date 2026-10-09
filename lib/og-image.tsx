import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const ogAlt = `${site.name} — South Tampa home management, opening 2027`;
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

type OgImageCopy = {
  kicker?: string;
  title?: string;
  subtitle?: string;
};

export function createOgImage(copy: OgImageCopy = {}) {
  const kicker = copy.kicker ?? "Banyan Home Co.";
  const title = copy.title ?? "Owning the house was supposed to be the reward.";
  const subtitle =
    copy.subtitle ?? "Private membership for South Tampa. Opening mid-January 2027.";
  const titleSize = title.length > 42 ? 54 : 72;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0E1714",
          color: "#EFF1ED",
          padding: "72px 80px",
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0, transparent 71px, rgba(127,179,160,0.12) 71px, rgba(127,179,160,0.12) 72px)",
        }}
      >
        <div
          style={{
            display: "flex",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontSize: 22,
            color: "#7FB3A0",
          }}
        >
          {kicker}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: titleSize,
              lineHeight: 1.08,
              maxWidth: 980,
              letterSpacing: "-0.03em",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#A9BCB2",
              maxWidth: 860,
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
