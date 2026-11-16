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
        <div className="space-y-12">
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

  return (
    <>
      <article className="group relative overflow-hidden rounded-3xl border border-line/70 bg-panel shadow-2xl transition-all duration-300 hover:border-violet/40 hover:shadow-violet/10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1.35fr]">
          {/* ── Left Column: Dual Showcase (Thesis Photo + System Slider) ──────────────── */}
          <div className="flex flex-col justify-between gap-5 border-b border-line/60 bg-raise/40 p-5 sm:p-7 lg:border-b-0 lg:border-r">
            {/* 1. Top Section: Thesis Hardbound Book Photo */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-mute">
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
                className={`group/book relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line/70 bg-ink ${
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
                    <span className="absolute top-3 right-3 flex size-7 items-center justify-center rounded-full bg-ink/75 text-fog opacity-0 backdrop-blur-md transition-opacity group-hover/book:opacity-100">
                      <MaximizeIcon className="size-3.5" />
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
            </div>

            {/* 2. Bottom Section: System Prototype & Architecture Slider (utilizing the empty space) */}
            <div className="space-y-2.5 rounded-2xl border border-line/60 bg-panel/90 p-4 shadow-inner">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-fog">
                  <LayersIcon className="size-3.5 text-sky-400" />
                  <span>System Prototype &amp; Architecture</span>
                </div>

                {hasSystemImages && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-mute">
                      {activeSystemIdx + 1} / {systemImages.length}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={prevSystem}
                        aria-label="Previous system screen"
                        className="flex size-6 items-center justify-center rounded-md border border-line/60 bg-raise text-mute transition hover:border-violet/60 hover:text-white"
                      >
                        <ChevronLeftIcon className="size-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={nextSystem}
                        aria-label="Next system screen"
                        className="flex size-6 items-center justify-center rounded-md border border-line/60 bg-raise text-mute transition hover:border-violet/60 hover:text-white"
                      >
                        <ChevronRightIcon className="size-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Slider Canvas */}
              {hasSystemImages && currentSystemImg ? (
                <div className="space-y-2">
                  <div
                    onClick={() =>
                      setModalImg({
                        url: currentSystemImg.url,
                        title: `${item.title} — System Screen ${activeSystemIdx + 1}`,
                      })
                    }
                    className="group/slide relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-xl border border-line/70 bg-ink"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      key={currentSystemImg.url}
                      src={currentSystemImg.url}
                      alt={`System Screen ${activeSystemIdx + 1}`}
                      loading="lazy"
                      className="size-full object-cover object-top transition-transform duration-500 group-hover/slide:scale-[1.03]"
                    />

                    {/* Overlay badge */}
                    <span className="absolute bottom-2.5 left-2.5 rounded-full border border-line/60 bg-ink/80 px-2.5 py-0.5 text-[11px] font-medium text-fog backdrop-blur-md">
                      System Screen {activeSystemIdx + 1}
                    </span>

                    <span className="absolute top-2.5 right-2.5 flex size-7 items-center justify-center rounded-full bg-ink/75 text-fog opacity-0 backdrop-blur-md transition-opacity group-hover/slide:opacity-100">
                      <MaximizeIcon className="size-3.5" />
                    </span>
                  </div>

                  {/* Dot Indicators */}
                  {systemImages.length > 1 && (
                    <div className="flex items-center justify-center gap-1.5 pt-1">
                      {systemImages.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveSystemIdx(i)}
                          aria-label={`Go to slide ${i + 1}`}
                          className={`h-1.5 rounded-full transition-all ${
                            activeSystemIdx === i
                              ? "w-5 bg-sky-400"
                              : "w-1.5 bg-line hover:bg-mute"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex aspect-[16/8] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line/70 bg-ink/40 p-4 text-center text-mute">
                  <LayersIcon className="size-7 text-mute/50" />
                  <p className="text-xs text-mute/80">
                    System prototype UI screenshots and architecture diagrams can be added in the Admin Dashboard.
                  </p>
                </div>
              )}
            </div>
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
              <div className="max-h-[380px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-line">
                <p className="text-sm sm:text-base leading-relaxed text-mute whitespace-pre-line">
                  {item.description}
                </p>
              </div>
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

      {/* ── High-Resolution Lightbox Zoom Modal ──────────────────────── */}
      {modalImg && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setModalImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md transition-opacity"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-5xl overflow-hidden rounded-2xl border border-line/80 bg-panel shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line/60 bg-raise px-4 py-3 text-sm font-medium text-fog">
              <span>{modalImg.title}</span>
              <button
                type="button"
                onClick={() => setModalImg(null)}
                aria-label="Close image preview"
                className="flex size-7 items-center justify-center rounded-lg border border-line/60 text-mute transition hover:bg-line hover:text-white"
              >
                <XIcon className="size-4" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-auto p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={modalImg.url}
                alt={modalImg.title}
                className="max-h-[75vh] w-auto rounded-lg object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
