import { defaultOgImage, siteName, siteUrl } from "../../config/seo";

const title = "Sobre | Calvin Soares";
const description =
  "Conheça a trajetória de Calvin Soares, sua experiência em engenharia full stack, arquitetura de software, integrações e evolução de produtos digitais.";
const canonical = `${siteUrl}/About`;

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
