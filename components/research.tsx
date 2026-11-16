"use client";

import { useState } from "react";
import type { Profile, ResearchItem } from "@/lib/api";
import {
  BookOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  ExternalIcon,
  GithubIcon,
  LayersIcon,
  MaximizeIcon,
  PencilIcon,
  XIcon,
} from "./icons";

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
        <div className="space-y-14">
          {research.map((item) => (
            <ResearchCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ResearchCard({ item }: { item: ResearchItem }) {
  const [activeSystemIdx, setActiveSystemIdx] = useState(0);
  const [modalImg, setModalImg] = useState<{ url: string; title: string } | null>(null);

  const systemImages = item.images || [];
  const hasSystemImages = systemImages.length > 0;
  const currentSystemImg = hasSystemImages ? systemImages[activeSystemIdx] : null;

  function nextSystem() {
    if (!hasSystemImages) return;
    setActiveSystemIdx((prev) => (prev + 1) % systemImages.length);
  }

  function prevSystem() {
    if (!hasSystemImages) return;
    setActiveSystemIdx((prev) => (prev - 1 + systemImages.length) % systemImages.length);
  }

  const thesisDownloadLink =
    item.thesisUrl ||
    "https://drive.google.com/file/d/1hOhyevcBc3neNGb1mmdn3NgWQSJHhy5I/view?usp=sharing";

  // Collage items: active item on left, other items on right stack
  const secondaryImages = systemImages.filter((_, idx) => idx !== activeSystemIdx);

  return (
    <>
      <article className="group relative overflow-hidden rounded-3xl border border-line/70 bg-panel shadow-2xl transition-all duration-300 hover:border-violet/40 hover:shadow-violet/10">
        {/* ── 1. Top Section: Thesis Photo & Academic Dissertation Details ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr]">
          {/* Left Column: Thesis Hardbound Book Photo */}
          <div className="flex flex-col border-b border-line/60 bg-raise/40 p-5 sm:p-7 lg:border-b-0 lg:border-r">
            <div className="mb-2.5 flex items-center justify-between text-xs text-mute">
              <span className="flex items-center gap-1.5 font-semibold text-fog/90">
                <BookOpenIcon className="size-3.5 text-violet-soft" />
                <span>Dissertation &amp; Thesis Book</span>
              </span>
              <span className="font-mono text-[11px] text-mute/80">Physical Copy</span>
            </div>

            <div
              onClick={() =>
                item.coverImageUrl &&
                setModalImg({ url: item.coverImageUrl, title: `${item.title} — Thesis Book` })
              }
              className={`group/book relative flex-1 w-full min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] overflow-hidden rounded-2xl border border-line/70 bg-ink ${
                item.coverImageUrl ? "cursor-pointer" : ""
              }`}
            >
              {item.coverImageUrl ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.coverImageUrl}
                    alt={`${item.title} - Thesis Book`}
                    loading="lazy"
                    className="size-full object-cover object-center transition-transform duration-500 group-hover/book:scale-[1.03]"
                  />
                  {/* Badge on photo */}
                  <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-line/60 bg-ink/85 px-3 py-1 text-xs font-medium text-fog backdrop-blur-md">
                    <BookOpenIcon className="size-3 text-violet-soft" />
                    <span>Thesis Book</span>
                  </span>
                  <span className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-ink/80 text-fog opacity-0 backdrop-blur-md transition-opacity group-hover/book:opacity-100">
                    <MaximizeIcon className="size-4" />
                  </span>
                </>
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-2 p-6 text-center text-mute">
                  <BookOpenIcon className="size-12 text-line" />
                  <span className="text-xs font-mono uppercase tracking-wider">
                    Thesis Book Photo
                  </span>
                </div>
              )}
            </div>

            {hasSystemImages && (
              <div className="mt-3 flex items-center justify-between rounded-xl border border-line/60 bg-panel/80 px-3.5 py-2.5 text-xs text-mute">
                <span className="flex items-center gap-2 text-fog font-medium">
                  <LayersIcon className="size-4 text-sky-400" />
                  <span>{systemImages.length} System Screens Available</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById(`system-showcase-${item.id}`)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="font-medium text-sky-400 hover:text-sky-300 transition"
                >
                  View collage showcase ↓
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Research & Dissertation Content */}
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
              <div className="max-h-[340px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-line">
                <p className="text-sm sm:text-base leading-relaxed text-mute whitespace-pre-line">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line/60 pt-6">
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

        {/* ── 2. Bottom Section: Full-Width Collage of Images (Interactive 1-Large + 3-Stacked) ── */}
        {hasSystemImages && (
          <div
            id={`system-showcase-${item.id}`}
            className="border-t border-line/70 bg-raise/20 p-5 sm:p-8 lg:p-10"
          >
            {/* Collage Header */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-sky-400/10 text-sky-400 border border-sky-400/20">
                    <LayersIcon className="size-4" />
                  </span>
                  <h4 className="font-display text-lg font-bold text-fog md:text-xl">
                    System Prototype &amp; Architecture Collage
                  </h4>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-mute">
                  Click any thumbnail on the right to focus, or click the main preview to view full size.
                </p>
              </div>

              {/* Navigation Counter & Buttons */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-mute">
                  Active Screen <strong className="text-fog">{activeSystemIdx + 1}</strong> of {systemImages.length}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={prevSystem}
                    aria-label="Previous system screen"
                    className="flex size-9 items-center justify-center rounded-xl border border-line/70 bg-panel text-fog transition hover:border-violet hover:bg-raise active:scale-95"
                  >
                    <ChevronLeftIcon className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSystem}
                    aria-label="Next system screen"
                    className="flex size-9 items-center justify-center rounded-xl border border-line/70 bg-panel text-fog transition hover:border-violet hover:bg-raise active:scale-95"
                  >
                    <ChevronRightIcon className="size-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* ── The Collage Grid: 1 Large Left Feature + 3 Stacked Right Tiles ── */}
            {currentSystemImg && (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr] h-auto lg:h-[580px]">
                {/* 1. Large Main Featured Screen (Left - 60% Width) */}
                <div
                  onClick={() =>
                    setModalImg({
                      url: currentSystemImg.url,
                      title: `${item.title} — System Screen ${activeSystemIdx + 1}`,
                    })
                  }
                  className="group/main relative flex h-[440px] sm:h-[500px] lg:h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border border-line/80 bg-ink/90 p-4 pb-14 shadow-2xl transition hover:border-sky-400/50"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.08)_0%,transparent_75%)] pointer-events-none" />

                  {/* Main Display Image - guaranteed 100% visible, zero cropping */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={currentSystemImg.url}
                    src={currentSystemImg.url}
                    alt={`Main Screen ${activeSystemIdx + 1}`}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover/main:scale-[1.01]"
                  />

                  {/* Badge & Zoom Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="rounded-full border border-line/70 bg-ink/85 px-3 py-1 text-xs font-medium text-fog backdrop-blur-md">
                      Featured: Screen {activeSystemIdx + 1} of {systemImages.length}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full border border-line/70 bg-ink/85 px-3 py-1 text-xs font-medium text-sky-300 backdrop-blur-md">
                      <MaximizeIcon className="size-3" />
                      <span>Click to view full size</span>
                    </span>
                  </div>
                </div>

                {/* 2. Stack of 3 Compact Tiles on the Right (fits 100% into view) */}
                {secondaryImages.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 h-28 sm:h-36 lg:grid-cols-1 lg:grid-rows-3 lg:h-full lg:gap-3">
                    {secondaryImages.map((img) => {
                      const realIndex = systemImages.findIndex((orig) => orig.url === img.url);
                      return (
                        <div
                          key={img.url}
                          onClick={() => setActiveSystemIdx(realIndex)}
                          className="group/tile relative h-full w-full cursor-pointer overflow-hidden rounded-xl border border-line/70 bg-ink/75 p-2 shadow-md transition-all duration-300 hover:border-sky-400/80 hover:bg-ink hover:scale-[1.01]"
                        >
                          {/* Thumbnail with object-contain */}
                          <div className="relative flex size-full items-center justify-center overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={img.url}
                              alt={`System Screen ${realIndex + 1}`}
                              loading="lazy"
                              className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-300 group-hover/tile:scale-[1.02]"
                            />
                          </div>

                          {/* Hover action overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 backdrop-blur-[2px] transition-opacity group-hover/tile:opacity-100 rounded-xl">
                            <span className="rounded-full border border-sky-400/40 bg-sky-400/20 px-2.5 py-0.5 text-[11px] font-semibold text-sky-200">
                              View as main ↖
                            </span>
                          </div>

                          {/* Screen Index badge */}
                          <span className="absolute top-1.5 left-1.5 rounded-md bg-black/80 px-1.5 py-0.5 font-mono text-[10px] text-fog/90 border border-line/50">
                            #{realIndex + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}
      </article>

      {/* ── High-Resolution Lightbox Zoom Modal ──────────────────────── */}
      {modalImg && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-md transition-opacity"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-line/80 bg-panel shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line/60 bg-raise px-5 py-3.5 text-sm font-medium text-fog">
              <span>{modalImg.title}</span>
              <button
                type="button"
                onClick={() => setModalImg(null)}
                aria-label="Close image preview"
                className="flex size-8 items-center justify-center rounded-lg border border-line/60 text-mute transition hover:bg-line hover:text-white"
              >
                <XIcon className="size-4" />
              </button>
            </div>
            <div className="flex max-h-[85vh] items-center justify-center overflow-auto p-4 bg-ink/95">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={modalImg.url}
                alt={modalImg.title}
                className="max-h-[80vh] w-auto rounded-lg object-contain mx-auto shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
