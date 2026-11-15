import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import { getPortfolio } from "@/lib/api";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-ui-tau-one.vercel.app";

// Bricolage has a width axis; the hero alternates wide and condensed lines with it.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  display: "swap",
});
const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07091a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getPortfolio();
  const name = profile.fullName || "Supun Silva";
  const title = `${name} · Full-Stack Developer`;
  const description =
    "Full-stack developer building scalable web applications and AI-driven solutions. Explore featured projects and contact info.";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: `%s | ${name}`,
    },
    description,
    keywords: [
      name,
      "Supun Silva",
      "Full-Stack Developer",
      "Software Engineer",
      "React Developer",
      "Next.js Portfolio",
      "Node.js Developer",
      "Web Developer Sri Lanka",
      "AI Solutions Developer",
      "Frontend Developer",
      "Backend Developer",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "MongoDB",
    ],
    authors: [{ name, url: SITE_URL }],
    creator: name,
    publisher: name,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "profile",
      locale: "en_US",
      url: SITE_URL,
      title,
      description,
      siteName: `${name} Portfolio`,
      firstName: name.split(" ")[0],
      lastName: name.split(" ").slice(1).join(" "),
      gender: "male",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${name} - Full-Stack Developer Portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@supunsilva",
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "technology",
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile, technologies } = await getPortfolio();
  const name = profile.fullName || "Supun Silva";
  const bio =
    profile.bio ||
    "Full-stack developer passionate about building scalable web applications and AI-driven solutions.";

  const techNames =
    technologies.length > 0
      ? technologies.map((t) => t.name)
      : ["React", "Next.js", "Node.js", "MongoDB", "Tailwind CSS", "Flutter"];

  // Schema.org Structured Data (JSON-LD for Google Rich Search & Knowledge Graph)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: name,
        url: SITE_URL,
        image: profile.avatarUrl || undefined,
        jobTitle: "Full-Stack Developer",
        description: bio,
        address: {
          "@type": "PostalAddress",
          addressCountry: "Sri Lanka",
        },
        sameAs: [profile.githubUrl, profile.linkedinUrl].filter(Boolean),
        knowsAbout: techNames,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${name} Portfolio`,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: `${name} - Full-Stack Developer Portfolio`,
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
