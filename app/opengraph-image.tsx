import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — private home management for Tampa homeowners`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
            flexDirection: "column",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            fontSize: 22,
            color: "#7FB3A0",
          }}
        >
          Banyan Home Co.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              maxWidth: 900,
              letterSpacing: "-0.03em",
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}
          >
            Owning the house was supposed to be the reward.
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#A9BCB2",
              maxWidth: 760,
              lineHeight: 1.4,
            }}
          >
            Private membership for Tampa homeowners. One number. A vetted
            network. Someone from our team at the house.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
