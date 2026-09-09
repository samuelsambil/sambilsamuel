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
          backgroundColor: "#faf8f3",
          backgroundImage:
            "radial-gradient(90% 80% at 78% 15%, rgba(168,135,29,0.20), transparent 60%)",
          color: "#1a1917",
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
            color: "#7a5f12",
            textTransform: "uppercase",
          }}
        >
          <div style={{ width: 56, height: 2, backgroundColor: "#a8871d" }} />
          {site.eyebrow}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 34,
            letterSpacing: 14,
            marginTop: 42,
            color: "rgba(26,25,23,0.72)",
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
            color: "#7a5f12",
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
            color: "rgba(90,87,81,1)",
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
