import { defaultOgImage, siteName, siteUrl } from "../../config/seo";

const title = "Projetos | Calvin Soares";
const description =
  "Explore projetos de Calvin Soares em produtos web e mobile, com foco em full stack engineering, performance, arquitetura e experiências digitais escaláveis.";
const canonical = `${siteUrl}/projects`;

export default function Head() {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={`${siteUrl}${defaultOgImage}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${defaultOgImage}`} />
      <link rel="canonical" href={canonical} />
    </>
  );
}
