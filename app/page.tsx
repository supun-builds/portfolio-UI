import { getPortfolio } from "@/lib/api";
import { Connect } from "@/components/connect";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Tools } from "@/components/tools";
import { Work } from "@/components/work";

export const revalidate = 60;

export default async function Home() {
  const { profile, projects, technologies } = await getPortfolio();
  return (
    <>
      <a href="#work" className="sr-only z-50 rounded-full bg-violet px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">Skip to projects</a>
      <Nav profile={profile} />
      <main>
        <Hero profile={profile} technologies={technologies} />
        <Tools technologies={technologies} />
        <Work projects={projects} />
        <Connect profile={profile} />
      </main>
      <footer className="border-t border-line/50">
        <div className="mx-auto flex w-full max-w-[88rem] flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-mute md:px-10">
          <p>© {new Date().getFullYear()} {profile.fullName} · Built with Next.js</p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition hover:text-fog">
            ↑ Back to top
          </a>
        </div>
      </footer>
    </>
  );
}
