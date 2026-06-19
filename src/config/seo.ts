export const siteUrl = "https://calvinsoares.vercel.app";
export const siteName = "Calvin Soares Portfolio";
export const defaultTitle = "Calvin Soares | Full Stack Engineer";
export const defaultDescription =
  "Portfolio de Calvin Soares com foco em full stack engineering, arquitetura de sistemas, performance e evolução de produtos digitais.";
export const defaultOgImage = "/images/devImg.jpg";

export const defaultKeywords = [
  "Calvin Soares",
  "portfolio",
  "full stack engineer",
  "fullstack developer",
  "software engineer",
  "next.js",
  "react",
  "typescript",
  "node.js",
  "arquitetura de software",
];

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Calvin Soares",
  url: siteUrl,
  image: `${siteUrl}${defaultOgImage}`,
  jobTitle: "Full Stack Engineer",
  sameAs: [
    "https://github.com/CalvinSoares",
    "https://www.linkedin.com/in/calvinsoares/",
    "https://www.tiktok.com/@pato_programador?lang=pt-BR",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Calvin Soares Portfolio",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  inLanguage: "pt-BR",
  publisher: {
    "@type": "Person",
    name: "Calvin Soares",
  },
};
