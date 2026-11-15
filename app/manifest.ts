import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Supun Silva · Full-Stack Developer",
    short_name: "Supun Silva",
    description:
      "Full-stack developer building scalable web applications and AI-driven solutions.",
    start_url: "/",
    display: "standalone",
    background_color: "#07091a",
    theme_color: "#7c5cfc",
  };
}
