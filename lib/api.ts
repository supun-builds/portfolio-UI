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

// Revalidated every minute, so edits made in the admin show up without a redeploy.
export async function getPortfolio(): Promise<Portfolio> {
  try {
    const res = await fetch(`${API_URL}/api/public/portfolio`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(String(res.status));
    return (await res.json()) as Portfolio;
  } catch {
    return EMPTY;
  }
}
