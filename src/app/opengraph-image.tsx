import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.eyebrow}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          backgroundColor: "#050507",
          backgroundImage:
            "radial-gradient(90% 80% at 78% 15%, rgba(201,162,39,0.24), transparent 60%)",
          color: "#f4f1e8",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 22,
            letterSpacing: 8,
            color: "#e8c87e",
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 56, height: 2, backgroundColor: "#c9a227" }} />
          {site.eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 34,
            letterSpacing: 14,
            marginTop: 42,
            color: "rgba(244,241,232,0.8)",
          }}
        >
          THE WORK OF
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 132,
            letterSpacing: 12,
            marginTop: 10,
            fontWeight: 700,
            color: "#e8c87e",
          }}
        >
          SAMBIL
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 40,
            maxWidth: 820,
            lineHeight: 1.5,
            color: "rgba(157,152,145,1)",
            fontFamily: "sans-serif",
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    size
  );
}
