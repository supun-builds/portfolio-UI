"use client";

import type { Tech } from "@/lib/api";
import { SectionTitle } from "./section-title";

// ── Brand colour map ──────────────────────────────────────────────────────────
// Keys are lowercase substrings of the tech name; first match wins.
const BRAND_COLORS: Record<string, { bg: string; glow: string }> = {
  react:        { bg: "rgba(97,218,251,0.12)",   glow: "rgba(97,218,251,0.35)" },
  next:         { bg: "rgba(255,255,255,0.08)",   glow: "rgba(255,255,255,0.25)" },
  typescript:   { bg: "rgba(49,120,198,0.15)",    glow: "rgba(49,120,198,0.40)" },
  javascript:   { bg: "rgba(247,223,30,0.12)",    glow: "rgba(247,223,30,0.35)" },
  node:         { bg: "rgba(51,153,51,0.12)",     glow: "rgba(51,153,51,0.35)" },
  python:       { bg: "rgba(55,118,171,0.15)",    glow: "rgba(55,118,171,0.40)" },
  vue:          { bg: "rgba(79,192,141,0.12)",    glow: "rgba(79,192,141,0.35)" },
  angular:      { bg: "rgba(221,0,49,0.12)",      glow: "rgba(221,0,49,0.35)" },
  tailwind:     { bg: "rgba(6,182,212,0.12)",     glow: "rgba(6,182,212,0.35)" },
  mongo:        { bg: "rgba(71,162,72,0.12)",     glow: "rgba(71,162,72,0.35)" },
  postgres:     { bg: "rgba(51,103,145,0.15)",    glow: "rgba(51,103,145,0.40)" },
  mysql:        { bg: "rgba(68,121,161,0.15)",    glow: "rgba(68,121,161,0.40)" },
  docker:       { bg: "rgba(36,150,237,0.12)",    glow: "rgba(36,150,237,0.35)" },
  aws:          { bg: "rgba(255,153,0,0.12)",     glow: "rgba(255,153,0,0.35)" },
  firebase:     { bg: "rgba(255,202,40,0.12)",    glow: "rgba(255,202,40,0.35)" },
  graphql:      { bg: "rgba(225,0,152,0.12)",     glow: "rgba(225,0,152,0.35)" },
  git:          { bg: "rgba(240,80,50,0.12)",     glow: "rgba(240,80,50,0.35)" },
  github:       { bg: "rgba(255,255,255,0.07)",   glow: "rgba(255,255,255,0.20)" },
  prisma:       { bg: "rgba(42,189,163,0.12)",    glow: "rgba(42,189,163,0.35)" },
  redux:        { bg: "rgba(118,74,188,0.15)",    glow: "rgba(118,74,188,0.40)" },
  express:      { bg: "rgba(255,255,255,0.07)",   glow: "rgba(255,255,255,0.20)" },
  figma:        { bg: "rgba(242,78,30,0.12)",     glow: "rgba(242,78,30,0.35)" },
  vercel:       { bg: "rgba(255,255,255,0.07)",   glow: "rgba(255,255,255,0.20)" },
  supabase:     { bg: "rgba(62,207,142,0.12)",    glow: "rgba(62,207,142,0.35)" },
  svelte:       { bg: "rgba(255,62,0,0.12)",      glow: "rgba(255,62,0,0.35)" },
  nuxt:         { bg: "rgba(0,197,142,0.12)",     glow: "rgba(0,197,142,0.35)" },
  laravel:      { bg: "rgba(255,45,32,0.12)",     glow: "rgba(255,45,32,0.35)" },
  php:          { bg: "rgba(119,123,180,0.15)",   glow: "rgba(119,123,180,0.40)" },
  flutter:      { bg: "rgba(2,86,155,0.15)",      glow: "rgba(2,86,155,0.40)" },
  dart:         { bg: "rgba(1,117,194,0.15)",     glow: "rgba(1,117,194,0.40)" },
  swift:        { bg: "rgba(240,81,56,0.12)",     glow: "rgba(240,81,56,0.35)" },
  kotlin:       { bg: "rgba(127,82,255,0.12)",    glow: "rgba(127,82,255,0.35)" },
  rust:         { bg: "rgba(222,165,132,0.12)",   glow: "rgba(222,165,132,0.35)" },
  go:           { bg: "rgba(0,173,216,0.12)",     glow: "rgba(0,173,216,0.35)" },
  java:         { bg: "rgba(237,117,0,0.12)",     glow: "rgba(237,117,0,0.35)" },
  redis:        { bg: "rgba(220,50,47,0.12)",     glow: "rgba(220,50,47,0.35)" },
  linux:        { bg: "rgba(252,200,0,0.12)",     glow: "rgba(252,200,0,0.35)" },
  sass:         { bg: "rgba(204,102,153,0.12)",   glow: "rgba(204,102,153,0.35)" },
  scss:         { bg: "rgba(204,102,153,0.12)",   glow: "rgba(204,102,153,0.35)" },
  stripe:       { bg: "rgba(99,91,255,0.12)",     glow: "rgba(99,91,255,0.35)" },
  vite:         { bg: "rgba(100,108,255,0.12)",   glow: "rgba(100,108,255,0.35)" },
  astro:        { bg: "rgba(255,93,1,0.12)",      glow: "rgba(255,93,1,0.35)" },
};

function getBrand(name: string) {
  const key = name.toLowerCase();
  for (const [token, colors] of Object.entries(BRAND_COLORS)) {
    if (key.includes(token)) return colors;
  }
  // fallback: violet theme
  return { bg: "rgba(124,92,252,0.10)", glow: "rgba(124,92,252,0.30)" };
}

// ── Component ─────────────────────────────────────────────────────────────────
export function Tools({ technologies }: { technologies: Tech[] }) {
  if (!technologies.length) return null;

  return (
    <section id="tools" className="border-t border-line/60">
      <div className="mx-auto w-full max-w-[88rem] px-5 py-24 md:px-10 md:py-32">

        {/* Header */}
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionTitle title="Tools I build with" count={technologies.length} />
          <p className="max-w-[36ch] text-sm text-mute leading-relaxed">
            The languages, frameworks and services I reach for most.
          </p>
        </div>

        {/* Grid */}
        <ul className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8">
          {technologies.map((t) => {
            const brand = getBrand(t.name);
            return (
              <li
                key={t.id}
                className="group relative flex flex-col items-center gap-3 rounded-2xl border border-line/60 px-3 py-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl"
                style={{
                  background: brand.bg,
                  // border glow on hover via box-shadow
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 1.5px ${brand.glow}, 0 8px 32px ${brand.bg}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                {/* Inner ambient glow blob */}
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: brand.glow }}
                  aria-hidden="true"
                />

                {/* Logo */}
                {t.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={t.logoUrl}
                    alt=""
                    loading="lazy"
                    width={40}
                    height={40}
                    style={{ width: "2.5rem", height: "2.5rem", maxWidth: "2.5rem", maxHeight: "2.5rem" }}
                    className="relative z-10 size-10 object-contain drop-shadow-lg transition-all duration-300 group-hover:scale-110"
                  />
                ) : (
                  <span
                    className="relative z-10 flex size-10 items-center justify-center rounded-xl font-display text-xl font-bold"
                    style={{ color: brand.glow, background: brand.bg }}
                  >
                    {t.name[0]}
                  </span>
                )}

                {/* Name */}
                <span className="relative z-10 text-xs font-medium leading-tight text-mute transition-colors duration-200 group-hover:text-fog">
                  {t.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
