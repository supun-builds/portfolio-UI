"use client";

import { useState } from "react";
import type { Profile, ResearchItem } from "@/lib/api";
import { BookOpenIcon, DownloadIcon, ExternalIcon, GithubIcon, PencilIcon } from "./icons";

export function Research({
  research,
  profile,
}: {
  research: ResearchItem[];
  profile: Profile;
}) {
  if (!research || research.length === 0) return null;

  return (
    <section id="research" className="border-t border-line/60">
      <div className="mx-auto w-full max-w-[88rem] px-5 py-12 md:px-10 md:py-20">
        {/* ── Section Header ────────────────────────────────────────── */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-fog/60">
              RESEARCH &amp; WRITING
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-fog md:text-5xl">
              Research and writing.
            </h2>
            {/* Quick links: ResearchGate / Medium */}
            <div className="mt-5 flex flex-wrap items-center gap-2.5">
              {profile.researchGateUrl ? (
                <a
                  href={profile.researchGateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-line/70 bg-panel px-3.5 py-1.5 text-xs font-semibold text-fog transition hover:border-violet/60 hover:bg-raise hover:text-white"
                >
                  <BookOpenIcon className="size-3.5 text-violet-soft" />
                  <span>ResearchGate</span>
                  <ExternalIcon className="size-3 text-mute" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-line/70 bg-panel px-3.5 py-1.5 text-xs font-semibold text-fog/90">
                  <BookOpenIcon className="size-3.5 text-violet-soft" />
                  <span>ResearchGate</span>
                  <ExternalIcon className="size-3 text-mute" />
                </span>
              )}

              {profile.mediumUrl ? (
                <a
                  href={profile.mediumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-line/70 bg-panel px-3.5 py-1.5 text-xs font-semibold text-fog transition hover:border-violet/60 hover:bg-raise hover:text-white"
                >
                  <PencilIcon className="size-3.5 text-violet-soft" />
                  <span>Medium</span>
                  <ExternalIcon className="size-3 text-mute" />
                </a>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-xl border border-line/70 bg-panel px-3.5 py-1.5 text-xs font-semibold text-fog/90">
                  <PencilIcon className="size-3.5 text-violet-soft" />
                  <span>Medium</span>
                  <ExternalIcon className="size-3 text-mute" />
                </span>
              )}
            </div>
          </div>

          <p className="max-w-[46ch] text-sm text-mute md:text-base leading-relaxed">
            {profile.researchSubtitle ||
              "My final-year thesis, two extended abstracts published at HIRS 2025, and the guides I write on Medium."}
          </p>
        </div>

        {/* ── Research Cards List ───────────────────────────────────── */}
        <div className="space-y-10">
          {research.map((item) => (
            <ResearchCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchCard({ item }: { item: ResearchItem }) {
  // Combine cover image and additional system screenshots
  const allImages: { label: string; url: string }[] = [];
  if (item.coverImageUrl) {
    allImages.push({ label: "Thesis Book", url: item.coverImageUrl });
  }
  (item.images || []).forEach((img, idx) => {
    allImages.push({
      label: `System Screen ${idx + 1}`,
      url: img.url,
    });
  });

  const [activeIdx, setActiveIdx] = useState(0);
  const currentImg = allImages[activeIdx];

  const thesisDownloadLink =
    item.thesisUrl ||
    "https://drive.google.com/file/d/1hOhyevcBc3neNGb1mmdn3NgWQSJHhy5I/view?usp=sharing";

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-line/70 bg-panel shadow-2xl transition-all duration-300 hover:border-violet/40 hover:shadow-violet/10">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr]">
        {/* ── Left Column: Image Showcase / Gallery ─────────────────── */}
        <div className="relative flex flex-col justify-between border-b border-line/60 bg-raise/50 p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line/60 bg-ink">
            {currentImg ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={currentImg.url}
                src={currentImg.url}
                alt={currentImg.label}
                loading="lazy"
                className="size-full object-cover object-center transition-transform duration-500 hover:scale-[1.03]"
              />
            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-3 p-6 text-center text-mute">
                <BookOpenIcon className="size-16 text-line" />
                <span className="text-xs font-mono tracking-wider uppercase">
                  Thesis Hardbound Book
                </span>
              </div>
            )}

            {/* Active view label badge */}
            {currentImg && (
              <span className="absolute bottom-3 left-3 rounded-full bg-ink/80 px-3 py-1 text-xs font-medium text-fog backdrop-blur-md border border-line/50">
                {currentImg.label}
              </span>
            )}
          </div>

          {/* Thumbnail / Image Switcher if multiple images (thesis book + system screenshots) */}
          {allImages.length > 1 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-mute font-medium mr-1">Views:</span>
              {allImages.map((img, i) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
                    activeIdx === i
                      ? "border-violet bg-violet/20 text-white"
                      : "border-line/60 bg-raise text-mute hover:border-line hover:text-fog"
                  }`}
                >
                  {img.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Right Column: Research & Dissertation Content ─────────── */}
        <div className="flex flex-col justify-between p-6 sm:p-9 lg:p-11">
          <div className="space-y-4">
            {/* Category / Date Badge */}
            {item.badge && (
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3.5 py-1 text-xs font-medium text-sky-300">
                  {item.badge}
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="font-display text-2xl font-bold leading-snug tracking-tight text-fog md:text-3xl">
              {item.title}
            </h3>

            {/* Authors & Institution */}
            {item.authors && (
              <p className="text-sm font-medium text-mute/90">
                {item.authors}
              </p>
            )}

            {/* Abstract / Description */}
            <p className="text-sm sm:text-base leading-relaxed text-mute">
              {item.description}
            </p>
          </div>

          {/* ── Action Buttons ────────────────────────────────────────── */}
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line/60 pt-6">
            {/* Download Thesis Link */}
            {thesisDownloadLink && (
              <a
                href={thesisDownloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-violet px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet/25 transition-all hover:bg-violet-soft active:scale-[0.98]"
              >
                <DownloadIcon className="size-4" />
                <span>Download Thesis</span>
                <ExternalIcon className="size-3.5 opacity-80" />
              </a>
            )}

            {/* Live System Demo (if available) */}
            {item.projectUrl && (
              <a
                href={item.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-line/70 bg-raise px-4 py-2.5 text-sm font-semibold text-fog transition hover:border-violet/60 hover:text-white active:scale-[0.98]"
              >
                <span>See System</span>
                <ExternalIcon className="size-3.5 text-mute" />
              </a>
            )}

            {/* Source Code (if available) */}
            {item.githubUrl && (
              <a
                href={item.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-line/70 bg-raise px-4 py-2.5 text-sm font-semibold text-fog transition hover:border-violet/60 hover:text-white active:scale-[0.98]"
              >
                <GithubIcon className="size-4 text-mute" />
                <span>Source code</span>
                <ExternalIcon className="size-3.5 text-mute" />
              </a>
            )}

            {/* Research Paper Link (if available) */}
            {item.paperUrl && (
              <a
                href={item.paperUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-line/70 bg-raise px-4 py-2.5 text-sm font-semibold text-fog transition hover:border-violet/60 hover:text-white active:scale-[0.98]"
              >
                <BookOpenIcon className="size-4 text-mute" />
                <span>Paper</span>
                <ExternalIcon className="size-3.5 text-mute" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
