import { profile, socials, codingProfiles, education } from "@/data/portfolio";

/** Preferred canonical origin for the portfolio. Change here only. */
export const siteUrl = "https://jaszportfolio.vercel.app";

export const canonical = (path: string) => `${siteUrl}${path === "/" ? "" : path}`;

type PageSeo = {
  path: string;
  title: string;
  description: string;
};

/** Builds unique title/description/canonical/OG/Twitter metadata for a page. */
export const pageSeo = ({ path, title, description }: PageSeo) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { name: "author", content: profile.fullName },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: `${profile.fullName} — Portfolio` },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: canonical(path) },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ],
  links: [{ rel: "canonical", href: canonical(path) }],
});

/** Schema.org Person structured data describing Jaswant Yuvarajan. */
export const personJsonLd = () =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.name,
    url: siteUrl,
    image: `${siteUrl}/profile.jpg`,
    jobTitle: profile.jobTitle,
    description: profile.seoDescription,
    email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chennai",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: education[0]?.org ?? "Amrita Vishwa Vidyapeetham, Chennai",
    },
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Amrita Vishwa Vidyapeetham, Chennai",
    },
    knowsAbout: [
      "Full-Stack Web Development",
      "JavaScript",
      "Python",
      "Java",
      "C",
      "Data Structures and Algorithms",
    ],
    sameAs: [
      ...socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
      ...codingProfiles.map((p) => p.href),
    ].filter((href, i, all) => all.indexOf(href) === i),
  });

export const websiteJsonLd = () =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${profile.fullName} — Portfolio`,
    url: siteUrl,
    author: { "@type": "Person", name: profile.fullName },
  });
