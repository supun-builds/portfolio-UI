export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export interface Tech { id: string; name: string; logoUrl: string | null }
export interface Project {
  id: string; title: string; description: string; githubUrl: string; liveUrl: string;
  images: { id: string; url: string }[]; technologies: Tech[]; featured: boolean;
}
export interface Profile {
  fullName: string; headline: string; bio: string; avatarUrl: string | null; cvUrl: string | null;
  githubUrl: string; linkedinUrl: string; connectText: string; email: string; phone: string; location: string; openToWork: boolean;
}
export interface Portfolio { profile: Profile; projects: Project[]; technologies: Tech[] }

const EMPTY: Portfolio = {
  profile: {
    fullName: "Supun Silva",
    headline: "Building Smart Solutions.",
    bio: "I'm Supun Silva, a full-stack developer passionate about building scalable web applications and AI-driven solutions. I focus on clean design, performance, and real-world problem solving.",
    avatarUrl: null,
    cvUrl: null,
    githubUrl: "",
    linkedinUrl: "",
    connectText: "",
    email: "",
    phone: "",
    location: "Sri Lanka",
    openToWork: true,
  },
  projects: [],
  technologies: [],
};

export function normalizeUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  let baseUrl = API_URL.trim().replace(/\/+$/, "");
  if (baseUrl && !baseUrl.startsWith("http://") && !baseUrl.startsWith("https://")) {
    baseUrl = `https://${baseUrl}`;
  }
  // If backend returned localhost, swap it to the live API_URL
  if (url.startsWith("http://localhost:3000")) {
    return url.replace("http://localhost:3000", baseUrl);
  }
  // If URL was rendered without protocol (e.g. portfolio-backend-xxx.vercel.app/api/files/...)
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    if (url.startsWith("/")) {
      return `${baseUrl}${url}`;
    }
    return `https://${url}`;
  }
  return url;
}

// Revalidated every minute, so edits made in the admin show up without a redeploy.
export async function getPortfolio(): Promise<Portfolio> {
  try {
    const res = await fetch(`${API_URL}/api/public/portfolio`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as Portfolio;
    return {
      profile: {
        ...data.profile,
        avatarUrl: normalizeUrl(data.profile.avatarUrl),
        cvUrl: normalizeUrl(data.profile.cvUrl),
      },
      technologies: (data.technologies ?? []).map((t) => ({
        ...t,
        logoUrl: normalizeUrl(t.logoUrl),
      })),
      projects: (data.projects ?? []).map((p) => ({
        ...p,
        images: (p.images ?? []).map((img) => ({
          ...img,
          url: normalizeUrl(img.url) ?? img.url,
        })),
        technologies: (p.technologies ?? []).map((t) => ({
          ...t,
          logoUrl: normalizeUrl(t.logoUrl),
        })),
      })),
    };
  } catch {
    return EMPTY;
  }
}
