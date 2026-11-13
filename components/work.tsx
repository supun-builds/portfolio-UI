import type { Project } from "@/lib/api";
import { SectionTitle } from "./section-title";
import { WorkIndex } from "./work-index";

export function Work({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="border-t border-line/60">
      <div className="mx-auto w-full max-w-[88rem] px-5 py-24 md:px-10 md:py-32">
        <div className="mb-14">
          <SectionTitle title="Selected work" count={projects.length} />
        </div>
        {projects.length ? (
          <WorkIndex projects={projects} />
        ) : (
          <p className="max-w-[44ch] text-lg text-mute">Projects are on the way. Check back soon, or get in touch below.</p>
        )}
      </div>
    </section>
  );
}
