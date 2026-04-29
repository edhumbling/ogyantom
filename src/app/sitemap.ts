import type { MetadataRoute } from "next";
import { sanityFetch } from "@/sanity/client";
import { coreValues, armyPillars } from "@/lib/site";
import { SITE_URL, absoluteUrl } from "@/lib/seo";

type SitemapContentItem = {
  slug?: string;
  publishedAt?: string;
  startDate?: string;
};

const contentSitemapQuery = `{
  "posts": *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    publishedAt
  },
  "events": *[_type == "event" && defined(slug.current)] | order(startDate desc) {
    "slug": slug.current,
    startDate
  },
  "philanthropy": *[_type == "philanthropy" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    publishedAt
  }
}`;

function route(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  lastModified = new Date(),
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  };
}

function datedRoute(
  path: string,
  value: string | undefined,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
) {
  return route(path, priority, changeFrequency, value ? new Date(value) : new Date());
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await sanityFetch<{
    posts: SitemapContentItem[];
    events: SitemapContentItem[];
    philanthropy: SitemapContentItem[];
  }>(contentSitemapQuery, {}, { posts: [], events: [], philanthropy: [] });

  return [
    route("/", 1, "weekly"),
    route("/prayer-army", 0.92, "weekly"),
    route("/prayer-request", 0.9, "monthly"),
    route("/support", 0.86, "monthly"),
    route("/ministry", 0.84, "monthly"),
    route("/testimonies", 0.82, "weekly"),
    route("/blog", 0.8, "weekly"),
    route("/events", 0.78, "weekly"),
    route("/philanthropy", 0.76, "weekly"),
    route("/contact", 0.62, "monthly"),
    route("/prayer-watch", 0.52, "yearly"),
    ...coreValues.map((value) => route(`/core-values/${value.slug}`, 0.68, "monthly")),
    ...armyPillars.map((pillar) => route(`/pillars/${pillar.slug}`, 0.68, "monthly")),
    ...content.posts.map((post) =>
      datedRoute(`/blog/${post.slug}`, post.publishedAt, 0.7, "monthly"),
    ),
    ...content.events.map((event) =>
      datedRoute(`/events/${event.slug}`, event.startDate, 0.68, "weekly"),
    ),
    ...content.philanthropy.map((item) =>
      datedRoute(`/philanthropy/${item.slug}`, item.publishedAt, 0.66, "monthly"),
    ),
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.42,
    },
    {
      url: `${SITE_URL}/ai.txt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
