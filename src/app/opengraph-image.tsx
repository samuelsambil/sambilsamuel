import { ImageResponse } from "next/og";
import { site } from "@/lib/content";

export const alt = `${site.name} — ${site.eyebrow}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const WORDS = ["LEARNING", "BUILDING", "SCALING"];

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
        {/* The card carries the name, since a reshared image loses the title. */}
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
          {site.name}
        </div>

        {/* Stacked rather than one line: three words plus separators run far
            wider than the card at a display size worth using. */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 34 }}>
          {WORDS.map((word) => (
            <div
              key={word}
              style={{
                display: "flex",
                fontSize: 92,
                letterSpacing: 10,
                lineHeight: 1.06,
                fontWeight: 700,
                color: "#7a5f12",
              }}
            >
              {word}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            marginTop: 38,
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
