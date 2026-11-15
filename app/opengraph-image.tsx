import { ImageResponse } from "next/og";
import { getPortfolio } from "@/lib/api";

export const alt = "Supun Silva · Full-Stack Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const { profile } = await getPortfolio();
  const name = profile.fullName || "Supun Silva";
  const headline = profile.headline || "Building Smart Solutions.";
  const avatarUrl = profile.avatarUrl;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "50px 70px",
          backgroundColor: "#07091a",
          backgroundImage:
            "radial-gradient(circle at 20% 25%, rgba(124, 92, 252, 0.32) 0%, transparent 55%), radial-gradient(circle at 85% 75%, rgba(56, 189, 248, 0.22) 0%, transparent 55%)",
        }}
      >
        {/* Left Column: Info & Details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            flex: 1,
            paddingRight: "50px",
          }}
        >
          {/* Top: Status Badge */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 18px",
                borderRadius: "9999px",
                backgroundColor: "rgba(52, 211, 153, 0.12)",
                border: "1px solid rgba(52, 211, 153, 0.35)",
                color: "#34d399",
                fontSize: "16px",
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
          </div>

          {/* Middle: Name & Titles */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div
              style={{
                fontSize: "58px",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
              }}
            >
              {name}
            </div>
            <div
              style={{
                fontSize: "30px",
                fontWeight: 700,
                color: "#9b80ff",
                lineHeight: 1.15,
              }}
            >
              {headline}
            </div>
            <div
              style={{
                fontSize: "15px",
                color: "#7a80a8",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                fontWeight: 600,
                marginTop: "6px",
              }}
            >
              Full-Stack Developer · Next.js, Flutter, React · Sri Lanka
            </div>
          </div>

          {/* Bottom: Tech Stack Pills */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            {["Next.js", "Flutter", "React", "Node.js", "MongoDB", "AI Solutions"].map(
              (tech) => (
                <div
                  key={tech}
                  style={{
                    padding: "7px 16px",
                    borderRadius: "10px",
                    backgroundColor: "rgba(19, 23, 41, 0.85)",
                    border: "1px solid rgba(30, 36, 64, 0.8)",
                    color: "#eceaf8",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  {tech}
                </div>
              )
            )}
          </div>
        </div>

        {/* Right Column: Framed Developer Portrait Card */}
        <div
          style={{
            width: "360px",
            height: "490px",
            borderRadius: "28px",
            border: "2px solid rgba(124, 92, 252, 0.35)",
            backgroundColor: "#0d1228",
            overflow: "hidden",
            display: "flex",
            position: "relative",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
          }}
        >
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 30%",
              }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                color: "#7c5cfc",
                fontSize: "72px",
                fontWeight: 800,
              }}
            >
              {name[0]}
            </div>
          )}

          {/* Bottom Bar inside the portrait */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              padding: "20px 24px",
              background:
                "linear-gradient(to top, rgba(7, 9, 26, 0.95) 0%, rgba(7, 9, 26, 0.6) 70%, transparent 100%)",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: 700, color: "#ffffff" }}>
              {name}
            </div>
            <div style={{ fontSize: "14px", color: "#7a80a8", marginTop: "2px" }}>
              Full-Stack Developer
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
