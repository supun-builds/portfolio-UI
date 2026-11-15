import { ImageResponse } from "next/og";
import { getPortfolio } from "@/lib/api";

export const runtime = "edge";
export const alt = "Supun Silva · Full-Stack Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const { profile } = await getPortfolio();
  const name = profile.fullName || "Supun Silva";
  const headline = profile.headline || "Building Smart Solutions.";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#07091a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(124, 92, 252, 0.28) 0%, transparent 50%), radial-gradient(circle at 85% 75%, rgba(56, 189, 248, 0.22) 0%, transparent 50%)",
        }}
      >
        {/* Top bar: Badge & Portfolio label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 22px",
              borderRadius: "9999px",
              backgroundColor: "rgba(52, 211, 153, 0.12)",
              border: "1px solid rgba(52, 211, 153, 0.35)",
              color: "#34d399",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "9999px",
                backgroundColor: "#34d399",
              }}
            />
            Open to opportunities
          </div>
          <div
            style={{
              color: "#7a80a8",
              fontSize: "18px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            PORTFOLIO
          </div>
        </div>

        {/* Center: Name & Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "#9b80ff",
              lineHeight: 1.2,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#7a80a8",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontWeight: 600,
              marginTop: "8px",
            }}
          >
            Full-Stack Developer · Next.js, Flutter, React · Sri Lanka
          </div>
        </div>

        {/* Bottom Bar: Tech Stack Chips */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {["Next.js", "Flutter", "React", "Node.js", "MongoDB", "Tailwind CSS", "AI Solutions"].map(
            (tech) => (
              <div
                key={tech}
                style={{
                  padding: "8px 18px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(19, 23, 41, 0.8)",
                  border: "1px solid rgba(30, 36, 64, 0.8)",
                  color: "#eceaf8",
                  fontSize: "16px",
                  fontWeight: 500,
                }}
              >
                {tech}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
