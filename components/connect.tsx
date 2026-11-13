import type { Profile } from "@/lib/api";
import { ContactForm } from "./contact-form";
import { GithubIcon, LinkedinIcon } from "./icons";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line/60 py-5">
      <dt className="text-xs font-medium uppercase tracking-widest text-mute/70">{label}</dt>
      <dd className="mt-1.5 text-base">{children}</dd>
    </div>
  );
}

export function Connect({ profile }: { profile: Profile }) {
  const intro = profile.connectText || "Have a role, a project or a question? Send a message and I'll get back to you.";
  return (
    <section id="connect" className="border-t border-line/60">
      <div className="mx-auto w-full max-w-[88rem] px-5 py-24 md:px-10 md:py-32">
        <h2 className="font-display text-[clamp(3rem,11vw,9.5rem)] leading-[0.92] font-extrabold tracking-[-0.035em]">
          Let&apos;s connect.
        </h2>

        <div className="mt-16 grid gap-14 lg:grid-cols-[minmax(0,28rem)_1fr] lg:gap-24">
          {/* Left column */}
          <div className="space-y-8">
            <p className="max-w-[44ch] text-lg leading-relaxed text-mute">{intro}</p>

            {profile.openToWork && (
              <p className="inline-flex items-center gap-2.5 rounded-full border border-emerald/25 bg-emerald/10 px-4 py-2 text-sm text-emerald">
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

            <div className="flex gap-3">
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="flex size-11 items-center justify-center rounded-full border border-line/70 bg-panel text-mute transition hover:border-violet/50 hover:bg-raise hover:text-fog"
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
                  className="flex size-11 items-center justify-center rounded-full border border-line/70 bg-panel text-mute transition hover:border-violet/50 hover:bg-raise hover:text-fog"
                >
                  <LinkedinIcon className="size-5" />
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
