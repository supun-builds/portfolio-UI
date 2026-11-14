"use client";

import { useState } from "react";
import { API_URL } from "@/lib/api";

const field =
  "w-full rounded-xl border border-line/70 bg-panel px-3.5 py-2.5 text-sm text-fog placeholder:text-mute/50 transition-all hover:border-mute/40 focus-visible:border-violet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/20";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setState("sending");
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.message ?? "Your message didn't send. Try again in a moment.");
      setSentTo(data.email);
      form.reset();
      setState("sent");
    } catch (err) {
      setError(err instanceof TypeError ? "Couldn't reach the server. Check your connection and try again." : (err as Error).message);
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="rounded-2xl border border-emerald/25 bg-emerald/5 p-8">
        <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-emerald/15">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5 text-emerald" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <p className="font-display text-2xl font-bold tracking-tight">Message sent.</p>
        <p className="mt-2 text-sm text-mute">Thanks for reaching out. I&apos;ll reply to {sentTo} soon.</p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-violet-soft transition hover:text-fog"
        >
          ← Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-line/60 bg-panel/40 p-5 sm:p-6 md:p-7" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs sm:text-sm font-medium">
          Name
          <input name="name" required maxLength={100} autoComplete="name" placeholder="Your full name" className={`${field} mt-1.5`} />
        </label>
        <label className="block text-xs sm:text-sm font-medium">
          Email
          <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@example.com" className={`${field} mt-1.5`} />
        </label>
      </div>
      <label className="block text-xs sm:text-sm font-medium">
        Subject <span className="font-normal text-mute">(optional)</span>
        <input name="subject" maxLength={150} placeholder="What's this about?" className={`${field} mt-1.5`} />
      </label>
      <label className="block text-xs sm:text-sm font-medium">
        Message
        <textarea
          name="message"
          required
          minLength={5}
          maxLength={4000}
          rows={3}
          placeholder="Tell me about the role, project or question."
          className={`${field} mt-1.5 resize-y`}
        />
      </label>
      {/* Honeypot: hidden from people, bots fill it in */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      {error && (
        <p role="alert" className="flex items-center gap-2 rounded-xl border border-amber/20 bg-amber/10 px-4 py-2.5 text-xs sm:text-sm text-amber">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="inline-flex h-11 items-center gap-2 rounded-full bg-violet px-7 text-sm font-medium text-white shadow-lg shadow-violet/25 transition hover:brightness-110 hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0 active:translate-y-0"
      >
        {state === "sending" ? (
          <>
            <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}
