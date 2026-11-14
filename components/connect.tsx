import type { Profile } from "@/lib/api";
import { ContactForm } from "./contact-form";
import { GithubIcon, LinkedinIcon } from "./icons";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line/60 py-2.5 sm:py-3">
      <dt className="text-[11px] font-medium uppercase tracking-wider text-mute/70">{label}</dt>
      <dd className="mt-0.5 text-sm sm:text-base">{children}</dd>
    </div>
  );
}

export function Connect({ profile }: { profile: Profile }) {
  const intro = profile.connectText || "Have a role, a project or a question? Send a message and I'll get back to you.";
  return (
    <section id="connect" className="border-t border-line/60">
      <div className="mx-auto w-full max-w-[88rem] px-5 py-10 md:px-10 md:py-14">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-fog">
          Let&apos;s connect.
        </h2>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-14">
          {/* Left column */}
          <div className="space-y-4 md:space-y-5">
            <p className="max-w-[44ch] text-sm sm:text-base leading-relaxed text-mute">{intro}</p>

            {profile.openToWork && (
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald/10 px-3.5 py-1.5 text-xs font-medium text-emerald">
                <span className="pulse-dot size-2 rounded-full bg-emerald" aria-hidden="true" />
                Open to new opportunities
              </p>
            )}

            <dl className="border-b border-line/60">
              {profile.email && (
                <Row label="Email">
                  <a href={`mailto:${profile.email}`} className="transition hover:text-violet-soft">
                    {profile.email}
                  </a>
                </Row>
              )}
              {profile.phone && (
                <Row label="Phone">
                  <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className="transition hover:text-violet-soft">
                    {profile.phone}
                  </a>
                </Row>
              )}
              {profile.location && <Row label="Based in">{profile.location}</Row>}
            </dl>

            <div className="flex gap-2.5">
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex size-10 items-center justify-center rounded-full border border-line/70 bg-panel text-mute transition hover:border-violet/50 hover:bg-raise hover:text-fog"
                >
                  <GithubIcon className="size-4" />
                </a>
              )}
              {profile.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  className="flex size-10 items-center justify-center rounded-full border border-line/70 bg-panel text-mute transition hover:border-violet/50 hover:bg-raise hover:text-fog"
                >
                  <LinkedinIcon className="size-4" />
                </a>
              )}
            </div>
          </div>

          {/* Right column: form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
