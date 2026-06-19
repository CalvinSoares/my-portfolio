import {
  defaultDescription,
  defaultOgImage,
  defaultTitle,
  siteName,
  siteUrl,
} from "../config/seo";

export default function Head() {
  return (
    <>
      <title>{defaultTitle}</title>
      <meta name="description" content={defaultDescription} />
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={defaultDescription} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={`${siteUrl}${defaultOgImage}`} />
      <meta name="twitter:title" content={defaultTitle} />
      <meta name="twitter:description" content={defaultDescription} />
      <meta name="twitter:image" content={`${siteUrl}${defaultOgImage}`} />
      <link rel="canonical" href={siteUrl} />
    </>
  );
}
