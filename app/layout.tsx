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
  const title = `${name} | Software Engineer & Full-Stack Developer`;
  const description = `${name} is a Software Engineer and Full-Stack Developer from Sri Lanka building scalable web apps, Flutter products and intelligent solutions.`;
  const photoUrl = profile.avatarUrl || `${SITE_URL}/opengraph-image?v=2`;

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
      "Software Engineer",
      "Full-Stack Developer",
      "Next.js Developer",
      "Flutter Developer",
      "React Developer",
      "Node.js Developer",
      "Web Developer Sri Lanka",
      "AI Solutions Developer",
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
          url: photoUrl,
          width: 1200,
          height: 630,
          alt: `${name} - Software Engineer & Full-Stack Developer`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@supunsilva",
      images: [photoUrl],
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
    other: {
      thumbnail: photoUrl,
      image_src: photoUrl,
    },
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
    `${name} is a Software Engineer and Full-Stack Developer from Sri Lanka building scalable web apps, Flutter products and intelligent solutions.`;
  const photoUrl = profile.avatarUrl || `${SITE_URL}/opengraph-image?v=2`;

  const techNames =
    technologies.length > 0
      ? ["Next.js", "Flutter", "React", ...technologies.map((t) => t.name).filter((n) => !["Next.js", "Flutter", "React"].includes(n))]
      : ["Next.js", "Flutter", "React", "Node.js", "MongoDB", "Tailwind CSS", "AI Solutions"];

  // Schema.org Structured Data (JSON-LD for Google Rich Search, Thumbnail & Knowledge Graph)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: name,
        url: SITE_URL,
        image: {
          "@type": "ImageObject",
          url: photoUrl,
          caption: `${name} - Software Engineer & Full-Stack Developer`,
        },
        jobTitle: "Software Engineer & Full-Stack Developer",
        description: bio,
        address: {
          "@type": "PostalAddress",
          addressCountry: "Sri Lanka",
        },
        sameAs: [
          profile.githubUrl,
          profile.linkedinUrl,
          profile.researchGateUrl,
          profile.mediumUrl,
        ].filter(Boolean),
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
        name: `${name} | Software Engineer & Full-Stack Developer`,
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: photoUrl,
        },
        mainEntity: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <html lang="en" className={`${bricolage.variable} ${instrument.variable}`}>
      <head>
        <meta name="thumbnail" content={photoUrl} />
        <link rel="image_src" href={photoUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
