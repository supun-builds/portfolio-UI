import type { Profile, Tech } from "@/lib/api";
import { DownloadIcon, GithubIcon, LinkedinIcon } from "./icons";

interface HeroProps {
  profile: Profile;
  technologies?: Tech[];
}

export function Hero({ profile, technologies = [] }: HeroProps) {
  // Display name fallbacks
  const fullName = profile.fullName?.trim() || "Supun Silva";
  const firstName = fullName.split(/\s+/)[0] || "Supun";

  // Location
  const location = (profile.location?.trim() || "Sri Lanka").toUpperCase();

  // Dynamic Headline parsing: default to "Building Smart Solutions."
  const headline = profile.headline?.trim() || "Building Smart Solutions.";
  let headlineL1 = "Building";
  let headlineL2 = "Smart";
  let headlineL3 = "Solutions.";

  if (headline.toLowerCase() === "building smart solutions." || headline.toLowerCase() === "building smart solutions") {
    headlineL1 = "Building";
    headlineL2 = "Smart";
    headlineL3 = "Solutions.";
  } else {
    const words = headline.split(/\s+/);
    if (words.length >= 3) {
      headlineL1 = words[0];
      headlineL2 = words.slice(1, -1).join(" ");
      headlineL3 = words[words.length - 1];
    } else if (words.length === 2) {
      headlineL1 = words[0];
      headlineL2 = "";
      headlineL3 = words[1];
    } else {
      headlineL1 = headline;
      headlineL2 = "";
      headlineL3 = "";
    }
  }

  // Tech stack summary
  const topTech = "NEXT JS, FLUTTER, REACT";

  // Bio description
  const bio =
    profile.bio?.trim() ||
    "I'm Supun Silva, a full-stack developer passionate about building scalable web applications and AI-driven solutions. I focus on clean design, performance, and real-world problem solving.";

  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-[88rem] overflow-hidden px-5 pb-24 pt-12 md:px-10 md:pb-32 md:pt-20"
    >
      {/* Ambient background glow */}
      <div className="hero-glow" aria-hidden="true" />

      <div className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ── Left Column: Intro + Copy + CTAs ────────────────────────── */}
          <div className="space-y-6 lg:col-span-7">
            {/* Open to work pill badge */}
            {profile.openToWork && (
              <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400 backdrop-blur-md shadow-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                </span>
                <span>Open to work · Available immediately</span>
              </div>
            )}

            {/* Main Title: Building Smart Solutions. */}
            <h1 className="font-display text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white leading-[0.98]">
              <span className="block">{headlineL1}</span>
              {headlineL2 && <span className="block">{headlineL2}</span>}
              {headlineL3 && (
                <span className="block text-[#7c5cfc] drop-shadow-[0_0_35px_rgba(124,92,252,0.35)]">
                  {headlineL3}
                </span>
              )}
            </h1>

            {/* Sub-meta tags line */}
            <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              FULL-STACK DEVELOPER · {topTech} · {location}
            </div>

            {/* Bio paragraph */}
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-slate-300/85">
              {bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#work"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-violet px-7 font-medium text-white shadow-lg shadow-violet/30 transition-all hover:bg-violet-soft hover:shadow-violet/50 hover:-translate-y-0.5 active:translate-y-0"
              >
                View projects
              </a>

              {profile.cvUrl && (
                <a
                  href={`${profile.cvUrl}?download=1`}
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-6 font-medium text-slate-200 backdrop-blur-sm transition-all hover:bg-slate-800/80 hover:border-white/20 hover:text-white hover:-translate-y-0.5"
                >
                  <DownloadIcon className="size-4" /> Download CV
                </a>
              )}

              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-slate-300 backdrop-blur-sm transition-all hover:bg-slate-800/80 hover:border-white/20 hover:text-white hover:-translate-y-0.5"
                >
                  <GithubIcon className="size-5" />
                </a>
              )}

              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex size-12 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-slate-300 backdrop-blur-sm transition-all hover:bg-slate-800/80 hover:border-white/20 hover:text-white hover:-translate-y-0.5"
                >
                  <LinkedinIcon className="size-5" />
                </a>
              )}
            </div>
          </div>

          {/* ── Right Column: Developer Photo Card ─────────────────────── */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative w-full max-w-[420px]" style={{ maxWidth: "420px" }}>
              {/* Overlapping Circular Rotating Stamp Badge (Top Right) */}
              <div
                className="absolute -right-4 -top-6 sm:-right-6 sm:-top-7 z-20 size-24 sm:size-28 select-none pointer-events-none"
                style={{ width: "6.5rem", height: "6.5rem" }}
              >
                <div className="relative size-full flex items-center justify-center">
                  {/* Rotating SVG text */}
                  <svg
                    viewBox="0 0 100 100"
                    style={{ width: "100%", height: "100%" }}
                    className="size-full animate-[spin_20s_linear_infinite]"
                  >
                    <defs>
                      <path
                        id="circle-badge-path"
                        d="M 50, 50 m -35, 0 a 35,35 0 1, 1 70, 0 a 35,35 0 1, 1 -70, 0"
                      />
                    </defs>
                    <text className="text-[8.5px] font-mono font-bold uppercase tracking-[0.22em] fill-slate-300">
                      <textPath href="#circle-badge-path" startOffset="0%">
                        • OPEN TO WORK • FULL-STACK DEVELOPER
                      </textPath>
                    </text>
                  </svg>
                  {/* Center Dot Container */}
                  <div className="absolute size-9 rounded-full border border-white/10 bg-[#080b15] shadow-lg flex items-center justify-center">
                    <span className="relative flex size-2.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Card */}
              <div className="relative overflow-hidden rounded-[2.2rem] border border-white/[0.08] bg-[#0c101d]/90 p-3 sm:p-3.5 shadow-2xl shadow-violet-950/30 backdrop-blur-xl">
                {/* Image Frame */}
                <div className="relative aspect-[3.9/4.8] w-full overflow-hidden rounded-[1.8rem] bg-gradient-to-b from-slate-800 to-slate-950">
                  {profile.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.avatarUrl}
                      alt={fullName}
                      style={{ maxHeight: "520px" }}
                      className="size-full object-cover object-[center_35%] transition duration-500 hover:scale-[1.03]"
                    />
                  ) : (
                    /* Default stylized portrait presentation */
                    <div className="relative size-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 via-slate-900 to-[#070a14] p-6 text-center">
                      <div className="size-28 rounded-full border border-violet/30 bg-violet/10 flex items-center justify-center shadow-inner mb-4 ring-2 ring-violet/20">
                        <span className="font-display text-4xl font-bold text-violet">
                          {firstName[0]}
                        </span>
                      </div>
                      <p className="text-base font-semibold text-slate-200">
                        {fullName}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Full-stack Developer
                      </p>
                    </div>
                  )}

                  {/* Gradient Scrim for text readability */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070a13] via-[#070a13]/40 to-transparent" />

                  {/* Bottom Info Bar inside the photo */}
                  <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-5 sm:p-6">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
                        {fullName}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-slate-400">
                        Full-stack Developer
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block text-[10.5px] sm:text-[11.5px] font-mono uppercase tracking-wider text-slate-400/90">
                        {location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
