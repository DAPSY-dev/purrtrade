import { Helmet } from "react-helmet-async";

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
};

function SEO({ title, description, keywords, image, url }: SEOProps) {
  const titleText = title
    ? `${import.meta.env.VITE_APP_TITLE} - ${title}`
    : import.meta.env.VITE_APP_TITLE;

  const metaDescription = description
    ? description
    : import.meta.env.VITE_APP_DESCRIPTION;

  const metaKeywords = keywords
    ? `${import.meta.env.VITE_APP_KEYWORDS}, ${keywords}`
    : import.meta.env.VITE_APP_KEYWORDS;

  const metaImage = image
    ? image
    : `${import.meta.env.VITE_FRONTEND_URL}/images/og/og.png`;

  const metaUrl = url ? url : window.location.href;

  return (
    <Helmet>
      <title>{titleText}</title>

      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta property="og:title" content={titleText} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta name="twitter:title" content={titleText} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
}

export default SEO;
