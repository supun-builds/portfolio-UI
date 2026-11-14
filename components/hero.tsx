import type { Profile, Tech } from "@/lib/api";
import { DownloadIcon, GithubIcon, LinkedinIcon } from "./icons";

interface HeroProps {
  profile: Profile;
  technologies?: Tech[];
}

export function Hero({ profile, technologies = [] }: HeroProps) {
  // Display name fallbacks
  const fullName = profile.fullName?.trim() || "Kestroy Stephan";
  const firstName = fullName.split(/\s+/)[0] || "Kestroy";

  // Location and timezone
  const location = (profile.location?.trim() || "Sri Lanka").toUpperCase();
  const timezone = "GMT+5:30";

  // Headline lines
  let headlineL1 = `Hi, I'm ${firstName}.`;
  let headlineL2 = "I build software";
  let headlineL3 = "that ships.";

  // If a custom headline is set that doesn't match default, adapt it gracefully
  if (
    profile.headline &&
    profile.headline !== "Building smart solutions." &&
    profile.headline !== "Building Smart Solutions."
  ) {
    const parts = profile.headline.trim().split(/\s+/);
    if (parts.length >= 4) {
      const mid = Math.ceil(parts.length / 2);
      headlineL2 = parts.slice(0, mid).join(" ");
      headlineL3 = parts.slice(mid).join(" ");
    } else {
      headlineL2 = profile.headline;
      headlineL3 = "";
    }
  }

  // Tech stack summary
  const topTech =
    technologies.length > 0
      ? technologies.slice(0, 3).map((t) => t.name).join(", ").toUpperCase()
      : "PYTHON, FLUTTER & REACT";

  // Focus badge text
  const focusText =
    technologies.length >= 2
      ? `${technologies[0].name} · ${technologies[1].name}`
      : "Python backend · Applied AI";

  // Bio description fallback to reference
  const bio =
    profile.bio?.trim() ||
    "Most recently I built AgenticHR, an AI hiring platform, at Xaltrix. Before that I led CEYLO, my final-year travel app for Sri Lanka. I like Python backends, Flutter and React, and putting AI to work on problems people actually have.";

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

            {/* Main Title */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-[4.75rem] font-bold tracking-tight text-white leading-[1.08]">
              <span className="block">{headlineL1}</span>
              <span className="block mt-1 text-[#38bdf8] drop-shadow-[0_0_35px_rgba(56,189,248,0.25)]">
                {headlineL2}
              </span>
              {headlineL3 && <span className="block text-white">{headlineL3}</span>}
            </h1>

            {/* Sub-meta tags line */}
            <div className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              SOFTWARE ENGINEER · {topTech} · {location}
            </div>

            {/* Bio paragraph */}
            <p className="max-w-xl text-base sm:text-lg leading-relaxed text-slate-300/85">
              {bio}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#work"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-sky-500 px-7 font-medium text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-400 hover:shadow-sky-500/40 hover:-translate-y-0.5 active:translate-y-0"
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
            <div className="relative w-full max-w-[420px]">
              {/* Overlapping Focus Glass Badge (Top Left) */}
              <div className="absolute -left-3 -top-3 sm:-left-5 sm:-top-4 z-20 rounded-2xl border border-white/10 bg-[#0c101d]/95 px-4 py-2.5 shadow-2xl backdrop-blur-md">
                <span className="block text-[9.5px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  FOCUS
                </span>
                <span className="mt-0.5 block text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                  {focusText}
                </span>
              </div>

              {/* Overlapping Circular Rotating Stamp Badge (Top Right) */}
              <div className="absolute -right-4 -top-6 sm:-right-6 sm:-top-7 z-20 size-24 sm:size-28 select-none pointer-events-none">
                <div className="relative size-full flex items-center justify-center">
                  {/* Rotating SVG text */}
                  <svg
                    viewBox="0 0 100 100"
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
                        • OPEN TO WORK • SOFTWARE ENGINEER
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
              <div className="relative overflow-hidden rounded-[2.2rem] border border-white/[0.08] bg-[#0c101d]/90 p-3 sm:p-3.5 shadow-2xl shadow-sky-950/30 backdrop-blur-xl">
                {/* Image Frame */}
                <div className="relative aspect-[3.9/4.8] w-full overflow-hidden rounded-[1.8rem] bg-gradient-to-b from-slate-800 to-slate-950">
                  {profile.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={profile.avatarUrl}
                      alt={fullName}
                      className="size-full object-cover object-top transition duration-500 hover:scale-[1.02]"
                    />
                  ) : (
                    /* Default stylized portrait presentation */
                    <div className="relative size-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 via-slate-900 to-[#070a14] p-6 text-center">
                      <div className="size-28 rounded-full border border-white/10 bg-slate-800/80 flex items-center justify-center shadow-inner mb-4">
                        <span className="font-display text-4xl font-bold text-sky-400">
                          {firstName[0]}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-300">
                        {fullName}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Upload your photo in Admin Profile
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
                        Software Engineer
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block text-[10.5px] sm:text-[11.5px] font-mono uppercase tracking-wider text-slate-400/90">
                        {location} · {timezone}
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
