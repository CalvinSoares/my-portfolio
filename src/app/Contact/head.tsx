import { defaultOgImage, siteName, siteUrl } from "../../config/seo";

const title = "Contato | Calvin Soares";
const description =
  "Entre em contato com Calvin Soares para projetos, oportunidades e conversas sobre engenharia full stack, arquitetura, performance e produtos digitais.";
const canonical = `${siteUrl}/Contact`;

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
