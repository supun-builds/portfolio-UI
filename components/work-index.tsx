"use client";

import { useState } from "react";
import type { Project } from "@/lib/api";
import { cn } from "@/lib/cn";
import { ExternalIcon, GithubIcon } from "./icons";

function ProjectCard({ p }: { p: Project }) {
  const [shot, setShot] = useState(0);
  const hasMultiple = p.images.length > 1;

  function next(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setShot((s) => (s + 1) % p.images.length);
  }

  function prev(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setShot((s) => (s - 1 + p.images.length) % p.images.length);
  }

  const img = p.images[shot];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line/70 bg-panel transition-all duration-300 hover:border-violet/40 hover:shadow-2xl hover:shadow-violet/10 hover:-translate-y-1">

      {/* ── Screenshot area ───────────────────────────── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-line/60 bg-raise">
        {/* Image counter (if multiple) */}
        {hasMultiple && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-ink/75 px-2.5 py-0.5 text-[11px] font-medium text-mute backdrop-blur-md">
            {shot + 1} / {p.images.length}
          </span>
        )}

        {/* Image */}
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={img.url}
            src={img.url}
            alt={`${p.title} screenshot ${shot + 1}`}
            loading="lazy"
            style={{ maxHeight: "360px" }}
            className="swap size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex size-full items-center justify-center font-display text-6xl font-bold text-line">
            {p.title[0]}
          </div>
        )}

        {/* Prev / Next click zones — only when multiple images */}
        {hasMultiple && (
          <>
            {/* Left zone */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute inset-y-0 left-0 z-20 flex w-1/3 cursor-w-resize items-center justify-start pl-3 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-ink/70 text-fog backdrop-blur-sm transition hover:bg-violet/80">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </span>
            </button>

            {/* Right zone */}
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute inset-y-0 right-0 z-20 flex w-1/3 cursor-e-resize items-center justify-end pr-3 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-ink/70 text-fog backdrop-blur-sm transition hover:bg-violet/80">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="size-4" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </span>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {p.images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShot(i); }}
                  aria-label={`Go to image ${i + 1}`}
                  className={cn(
                    "rounded-full transition-all duration-200",
                    i === shot
                      ? "w-4 h-1.5 bg-violet"
                      : "w-1.5 h-1.5 bg-fog/40 hover:bg-fog/70"
                  )}
                />
              ))}
            </div>
          </>
        )}

        {/* Featured badge */}
        {p.featured && (
          <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-amber/20 border border-amber/30 px-2.5 py-0.5 text-xs font-medium text-amber backdrop-blur-sm">
            Featured
          </span>
        )}
      </div>

      {/* ── Card content ──────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3.5 p-4 sm:p-5">
        <div>
          <h3 className="font-display text-lg font-bold tracking-tight text-fog md:text-xl">
            {p.title}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-mute line-clamp-2">
            {p.description}
          </p>
        </div>

        {/* Tech chips */}
        {p.technologies.length > 0 && (
          <ul className="flex flex-wrap gap-2" aria-label="Built with">
            {p.technologies.map((t) => (
              <li
                key={t.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-line/70 bg-raise/60 px-2.5 py-1 text-xs text-mute"
              >
                {t.logoUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.logoUrl} alt="" className="size-3.5 object-contain" />
                )}
                {t.name}
              </li>
            ))}
          </ul>
        )}

        {/* Links */}
        {(p.githubUrl || p.liveUrl) && (
          <div className="mt-auto flex items-center gap-3 pt-2">
            {p.githubUrl && (
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line/70 bg-raise/50 px-4 py-2 text-sm text-mute transition hover:border-violet/40 hover:text-fog"
              >
                <GithubIcon className="size-4" /> Source
              </a>
            )}
            {p.liveUrl && (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-violet px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet/25 transition hover:brightness-110"
              >
                <ExternalIcon className="size-4" /> Live demo
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export function WorkIndex({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((p) => (
        <ProjectCard key={p.id} p={p} />
      ))}
    </div>
  );
}
