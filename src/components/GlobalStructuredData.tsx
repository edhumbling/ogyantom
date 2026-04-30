import {
  SITE_ALT_NAMES,
  SITE_DOMAIN,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_LOGO_PATH,
  SITE_NAME,
  SITE_SOCIAL_PROFILES,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";
import { contactDetails, navItems, opaninFullName, prayerWatches } from "@/lib/site";

export function GlobalStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        alternateName: SITE_ALT_NAMES,
        description: SITE_DESCRIPTION,
        url: `${SITE_URL}/`,
        inLanguage: "en",
        publisher: {
          "@id": `${SITE_URL}/#organization`,
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: SITE_ALT_NAMES,
        url: `${SITE_URL}/`,
        description: SITE_DESCRIPTION,
        identifier: SITE_DOMAIN,
        additionalType: "https://schema.org/Church",
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          url: absoluteUrl(SITE_LOGO_PATH),
          contentUrl: absoluteUrl(SITE_LOGO_PATH),
          width: 512,
          height: 512,
          caption: `${SITE_NAME} logo`,
        },
        image: [
          {
            "@id": `${SITE_URL}/#logo`,
          },
          absoluteUrl("/brand/ogya-ntom-prayer-logo.png"),
        ],
        founder: {
          "@type": "Person",
          name: opaninFullName,
          jobTitle: "Watchman and Chief Prayer Warrior",
        },
        email: contactDetails.email,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Prayer support",
          email: contactDetails.email,
          telephone: contactDetails.phones[0],
          url: absoluteUrl("/contact"),
          areaServed: "Worldwide",
          availableLanguage: ["English", "Ewe"],
        },
        areaServed: ["Worldwide", "Ghana"],
        knowsAbout: SITE_KEYWORDS.slice(0, 24),
        sameAs: SITE_SOCIAL_PROFILES,
      },
      {
        "@type": "SiteNavigationElement",
        "@id": `${SITE_URL}/#site-navigation`,
        name: navItems.map((item) => item.label),
        url: navItems.map((item) => absoluteUrl(item.href)),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: SITE_NAME,
            item: `${SITE_URL}/`,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#prayer-watches`,
        name: `${SITE_NAME} prayer watches`,
        itemListElement: prayerWatches.map((watch, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: watch.title,
          description: `${watch.kicker}. ${watch.text}`,
          url: absoluteUrl("/prayer-army"),
        })),
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
