import type { Profile } from "@/lib/api";

export function Nav({ profile }: { profile: Profile }) {
  const links = [["Tools", "#tools"], ["Work", "#work"], ["Connect", "#connect"]];
  return (
    <header className="sticky top-0 z-30 border-b border-line/50 bg-ink/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[88rem] items-center justify-between px-5 md:px-10">
        {/* Logo / name */}
        <a
          href="#top"
          className="font-display text-lg font-bold tracking-tight text-fog transition-colors hover:text-violet-soft"
        >
          {profile.fullName || "Portfolio"}
        </a>

        {/* Links */}
        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="nav-link rounded-full px-3 py-2 text-sm text-mute transition-colors hover:text-fog"
            >
              {label}
            </a>
          ))}
          {/* CTA */}
          <a
            href="#connect"
            className="ml-2 inline-flex h-9 items-center rounded-full bg-violet/15 border border-violet/30 px-4 text-sm font-medium text-violet-soft transition hover:bg-violet/25 hover:border-violet/50"
          >
            Hire me
          </a>
        </nav>
      </div>
    </header>
  );
}
