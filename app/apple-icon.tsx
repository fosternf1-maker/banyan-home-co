import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0E1714",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "relative",
            width: 132,
            height: 132,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 28,
              top: 8,
              width: 76,
              height: 52,
              borderRadius: 999,
              background: "#7FB3A0",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 4,
              top: 28,
              width: 58,
              height: 40,
              borderRadius: 999,
              background: "#7FB3A0",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 4,
              top: 28,
              width: 58,
              height: 40,
              borderRadius: 999,
              background: "#7FB3A0",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 56,
              top: 46,
              width: 20,
              height: 72,
              background: "#7FB3A0",
            }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
