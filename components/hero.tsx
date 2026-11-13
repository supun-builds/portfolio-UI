import type { Profile } from "@/lib/api";
import { DownloadIcon, GithubIcon, LinkedinIcon } from "./icons";

function Portrait({ profile }: { profile: Profile }) {
  const initials = (profile.fullName || "?")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="relative shrink-0">
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full bg-violet/20 blur-2xl scale-110"
        aria-hidden="true"
      />
      {/* Rotating dashed border */}
      <div
        className="absolute -inset-2 rounded-full border-2 border-dashed border-violet/30"
        aria-hidden="true"
      />
      {/* Photo */}
      <div className="relative size-56 overflow-hidden rounded-full ring-4 ring-violet/50 ring-offset-4 ring-offset-ink shadow-2xl shadow-violet/30 md:size-72 lg:size-96">
        {profile.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatarUrl}
            alt={profile.fullName ? `Portrait of ${profile.fullName}` : "Portrait"}
            className="size-full object-cover object-top"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-raise font-display text-5xl font-bold text-violet">
            {initials}
          </div>
        )}
      </div>
      {/* Open-to-work floating badge */}
      {profile.openToWork && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-ink/90 px-3 py-1.5 text-xs font-medium text-emerald backdrop-blur-sm shadow-lg">
          <span className="pulse-dot size-1.5 rounded-full bg-emerald" aria-hidden="true" />
          Available for hire
        </div>
      )}
    </div>
  );
}

export function Hero({ profile }: { profile: Profile }) {
  const headline = profile.headline || "Building Smart Solutions.";
  const bio =
    profile.bio ||
    "Full-stack developer building web and mobile products, from the database to the interface.";

  // Split headline into individual words for the rise animation
  const words = headline.trim().split(/\s+/);

  return (
    <section
      id="top"
      className="relative mx-auto w-full max-w-[88rem] overflow-hidden px-5 pb-28 pt-16 md:px-10 md:pb-36 md:pt-24"
    >
      {/* Ambient background glow */}
      <div className="hero-glow" aria-hidden="true" />

      <div className="relative z-10">
        {/* ── Main hero grid ───────────────────────────────────────── */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">

          {/* Left: headline + bio + CTAs */}
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-[clamp(3rem,11vw,10rem)] leading-[0.88] font-extrabold tracking-[0.04em]">
              {words.map((word, i) => (
                <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                  <span
                    className="rise inline-block"
                    style={{
                      fontStretch: i % 2 === 0 ? "100%" : "75%",
                      animationDelay: `${i * 100}ms`,
                    }}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            {/* Bio + buttons */}
            <div className="mt-10 space-y-6 fade-up" style={{ animationDelay: "400ms" }}>
              <p className="max-w-[50ch] text-lg leading-relaxed text-mute md:text-xl">{bio}</p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#work"
                  className="inline-flex h-12 items-center rounded-full bg-violet px-7 font-medium text-white shadow-lg shadow-violet/30 transition hover:brightness-110 hover:shadow-violet/50 hover:-translate-y-0.5 active:translate-y-0"
                >
                  View projects
                </a>
                {profile.cvUrl && (
                  <a
                    href={`${profile.cvUrl}?download=1`}
                    className="inline-flex h-12 items-center gap-2 rounded-full border border-line bg-raise/60 px-6 font-medium backdrop-blur-sm transition hover:border-violet/50 hover:bg-raise hover:-translate-y-0.5 active:translate-y-0"
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
                    className="flex size-12 items-center justify-center rounded-full border border-line bg-raise/60 text-mute backdrop-blur-sm transition hover:border-violet/50 hover:text-fog hover:-translate-y-0.5"
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
                    className="flex size-12 items-center justify-center rounded-full border border-line bg-raise/60 text-mute backdrop-blur-sm transition hover:border-violet/50 hover:text-fog hover:-translate-y-0.5"
                  >
                    <LinkedinIcon className="size-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right: large portrait */}
          <div
            className="flex justify-center lg:justify-end fade-up"
            style={{ animationDelay: "200ms" }}
          >
            <Portrait profile={profile} />
          </div>
        </div>
      </div>
    </section>
  );
}
