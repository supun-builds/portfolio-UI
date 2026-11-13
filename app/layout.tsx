import type { Metadata } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { getPortfolio } from "@/lib/api";
import "./globals.css";

// Bricolage has a width axis; the hero alternates wide and condensed lines with it.
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], axes: ["wdth", "opsz"] });
const instrument = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getPortfolio();
  const name = profile.fullName || "Portfolio";
  return {
    title: `${name} · Full-stack developer`,
    description: profile.bio || `${name}’s portfolio: projects, tools and contact details.`,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable}`}>
      <body>{children}</body>
    </html>
  );
}
