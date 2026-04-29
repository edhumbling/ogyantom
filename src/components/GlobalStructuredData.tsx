import {
  SITE_DOMAIN,
  SITE_NAME,
  SITE_SHORT_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";

export function GlobalStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: [SITE_SHORT_NAME, "Ogya Ntom", SITE_DOMAIN],
        url: `${SITE_URL}/`,
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: [SITE_SHORT_NAME, "Ogya Ntom"],
        url: `${SITE_URL}/`,
        logo: absoluteUrl("/brand/ogya-ntom-prayer-logo.png"),
        additionalType: "https://schema.org/Church",
        founder: {
          "@type": "Person",
          name: "Watchman Opanin Thomas",
        },
        sameAs: [
          "https://www.tiktok.com/@opaninnie?_r=1&_t=ZS-95wZ5cjczd2",
          "https://www.facebook.com/share/1BFv2UEMJZ/",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
