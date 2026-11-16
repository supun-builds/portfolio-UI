export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

export interface Tech { id: string; name: string; logoUrl: string | null }
export interface Project {
  id: string; title: string; description: string; githubUrl: string; liveUrl: string;
  images: { id: string; url: string }[]; technologies: Tech[]; featured: boolean;
}
export interface ResearchItem {
  id: string;
  title: string;
  badge: string;
  authors: string;
  description: string;
  coverImageUrl: string | null;
  images: { id: string; url: string }[];
  thesisUrl: string;
  paperUrl: string;
  projectUrl: string;
  githubUrl: string;
  featured: boolean;
  order: number;
}
export interface Profile {
  fullName: string; headline: string; bio: string; avatarUrl: string | null; cvUrl: string | null;
  githubUrl: string; linkedinUrl: string;
  researchSubtitle?: string; researchGateUrl?: string; mediumUrl?: string;
  connectText: string; email: string; phone: string; location: string; openToWork: boolean;
}
export interface Portfolio { profile: Profile; projects: Project[]; technologies: Tech[]; research: ResearchItem[] }

const EMPTY: Portfolio = {
  profile: {
    fullName: "Supun Silva",
    headline: "Building Smart Solutions.",
    bio: "I'm Supun Silva, a full-stack developer passionate about building scalable web applications and AI-driven solutions. I focus on clean design, performance, and real-world problem solving.",
    avatarUrl: null,
    cvUrl: null,
    githubUrl: "",
    linkedinUrl: "",
    researchSubtitle: "My final-year thesis, two extended abstracts published at HIRS 2025, and the guides I write on Medium.",
    researchGateUrl: "",
    mediumUrl: "",
    connectText: "",
    email: "",
    phone: "",
    location: "Sri Lanka",
    openToWork: true,
  },
  projects: [],
  technologies: [],
  research: [
    {
      id: "default-thesis",
      title: "An AI-Powered Guide for Sustainable Eco & Cultural Tourism in Sri Lanka",
      badge: "🎓 Final-year thesis · October 2026",
      authors: "Supun Silva · BSc (Hons) Information Technology · Faculty of Information Technology, Horizon Campus",
      description:
        "My final-year dissertation, written around CEYLO: the research, design, AI models and user testing behind a mobile guide that helps travellers explore Sri Lanka sustainably and safely.",
      coverImageUrl: null,
      images: [],
      thesisUrl: "https://drive.google.com/file/d/1hOhyevcBc3neNGb1mmdn3NgWQSJHhy5I/view?usp=sharing",
      paperUrl: "",
      projectUrl: "",
      githubUrl: "",
      featured: true,
      order: 0,
    },
  ],
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
      research:
        data.research && data.research.length > 0
          ? data.research.map((r) => ({
              ...r,
              coverImageUrl: normalizeUrl(r.coverImageUrl),
              images: (r.images ?? []).map((img) => ({
                ...img,
                url: normalizeUrl(img.url) ?? img.url,
              })),
            }))
          : EMPTY.research,
    };
  } catch {
    return EMPTY;
  }
}
