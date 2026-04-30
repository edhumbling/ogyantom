import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export const alt = `${SITE_NAME} online prayer ministry`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 56,
          background:
            "linear-gradient(135deg, #03180f 0%, #062816 48%, #101006 100%)",
          color: "#fff8e8",
          padding: "64px 76px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
          <div
            style={{
              color: "#cfb45f",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Fire here! Fire there!
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 78,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -1,
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              marginTop: 28,
              color: "rgba(255, 248, 232, 0.78)",
              fontSize: 28,
              lineHeight: 1.35,
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>

        <div
          style={{
            width: 292,
            height: 292,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(207, 180, 95, 0.45)",
            borderRadius: 160,
            background: "rgba(255, 248, 232, 0.95)",
            boxShadow: "0 0 64px rgba(207, 180, 95, 0.28)",
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://ogyantomprayer.works/icon.png"
            alt=""
            width={236}
            height={236}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    ),
    size,
  );
}
