import type { Metadata } from "next";
import Link from "next/link";
import { armyPillars, coreValues } from "@/lib/site";
import { givingOptions } from "@/lib/giving";
import { seededDailyDevotionals } from "@/lib/dailyDevotionalSeed";
import { sanityFetch } from "@/sanity/client";
import {
  dailyDevotionalsQuery,
  eventsQuery,
  philanthropyQuery,
  postsQuery,
} from "@/sanity/queries";
import type { DailyDevotional, Event, PhilanthropyUpdate, Post } from "@/sanity/types";

export const metadata: Metadata = {
  title: "HTML Sitemap",
  description:
    "A categorized HTML sitemap for Ogya Ntom Prayer Army pages, teachings, events, outreach updates, legal pages, and crawler resources.",
  alternates: {
    canonical: "/sitemap",
  },
};

export const revalidate = 60;

type SitemapLink = {
  href: string;
  label: string;
  text?: string;
};

type SitemapGroup = {
  title: string;
  description: string;
  links: SitemapLink[];
};

function groupId(title: string) {
  return `sitemap-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

const mainRoutes: SitemapLink[] = [
  {
    href: "/",
    label: "Home",
    text: "Ogya Ntom Prayer Army overview, prayer rhythm, and ministry pathways.",
  },
  {
    href: "/prayer-army",
    label: "Prayer Army",
    text: "Morning and evening watch details for the online prayer army.",
  },
  {
    href: "/global-prayer-coverage",
    label: "Global Prayer Coverage",
    text: "Interactive OpenFreeMap coverage view of prayer pings across represented nations.",
  },
  {
    href: "/prayer-request",
    label: "Prayer Request",
    text: "Submit a prayer request for careful ministry covering.",
  },
  {
    href: "/testimonies",
    label: "Testimonies",
    text: "Published answered-prayer stories from the ministry.",
  },
  {
    href: "/ministry",
    label: "Ministry",
    text: "Mission, vision, leadership, and formation context.",
  },
  {
    href: "/philanthropy",
    label: "Philanthropy",
    text: "Care outreach and practical compassion updates.",
  },
  {
    href: "/blog",
    label: "Blog",
    text: "Prayer teachings, devotionals, and ministry notes.",
  },
  {
    href: "/Daily-Devotionals",
    label: "Daily Fire",
    text: "Daily Scripture, reflection, prayer, and practice.",
  },
  {
    href: "/events",
    label: "Upcoming Events",
    text: "Online vigils, watches, and ministry gatherings.",
  },
  {
    href: "/support",
    label: "Give / Support",
    text: "Ways to support the prayer army and outreach work.",
  },
  {
    href: "/contact",
    label: "Contact",
    text: "Official contact channels and online platforms.",
  },
];

const utilityRoutes: SitemapLink[] = [
  {
    href: "/prayer-watch",
    label: "Prayer Watch",
    text: "Prayer watch route for ministry rhythm and discovery.",
  },
  ...givingOptions.map((option) => ({
    href: option.href,
    label: option.title,
    text: option.text,
  })),
  {
    href: "/support/give/success",
    label: "Giving Success",
    text: "Thank-you page after a completed gift.",
  },
  {
    href: "/privacy",
    label: "Privacy Policy",
    text: "How ministry data, requests, testimonies, and contact details are handled.",
  },
  {
    href: "/terms",
    label: "Terms of Use",
    text: "Use terms and ministry limitations for the website.",
  },
  {
    href: "/sitemap.xml",
    label: "XML Sitemap",
    text: "Machine-readable sitemap submitted through robots.txt.",
  },
  {
    href: "/llms.txt",
    label: "LLMs.txt",
    text: "AI crawler guidance for public ministry content.",
  },
  {
    href: "/ai.txt",
    label: "AI.txt",
    text: "AI usage and public-content boundaries.",
  },
];

function formatDate(value?: string) {
  if (!value) {
    return undefined;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function renderGroup(group: SitemapGroup, index: number) {
  const id = groupId(group.title);

  return (
    <section
      key={group.title}
      className="sitemap-group"
      data-theme={index % 2 === 0 ? "paper" : "dark"}
      aria-labelledby={id}
    >
      <div className="sitemap-group-head">
        <p>{String(index + 1).padStart(2, "0")}</p>
        <h2 id={id}>{group.title}</h2>
        <span>{group.description}</span>
      </div>

      <ul className="sitemap-link-list">
        {group.links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="sitemap-route-link">
              <span className="sitemap-route-label">{item.label}</span>
              {item.text ? <span className="sitemap-route-text">{item.text}</span> : null}
              <span className="sitemap-route-path">{item.href}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function HtmlSitemapPage() {
  const [posts, dailyDevotionalsResult, events, philanthropy] = await Promise.all([
    sanityFetch<Post[]>(postsQuery, {}, []),
    sanityFetch<DailyDevotional[]>(dailyDevotionalsQuery, {}, []),
    sanityFetch<Event[]>(eventsQuery, {}, []),
    sanityFetch<PhilanthropyUpdate[]>(philanthropyQuery, {}, []),
  ]);
  const dailyDevotionals =
    dailyDevotionalsResult.length > 0 ? dailyDevotionalsResult : seededDailyDevotionals;

  const groups: SitemapGroup[] = [
    {
      title: "Main Pages",
      description: "Primary pages for visitors, search engines, and AI crawlers.",
      links: mainRoutes,
    },
    {
      title: "Formation",
      description: "Core values and prayer-army pillars with individual detail pages.",
      links: [
        ...coreValues.map((value) => ({
          href: `/core-values/${value.slug}`,
          label: value.title,
          text: value.text,
        })),
        ...armyPillars.map((pillar) => ({
          href: `/pillars/${pillar.slug}`,
          label: pillar.title,
          text: pillar.text,
        })),
      ],
    },
    {
      title: "Support & Legal",
      description: "Giving, policy, and crawler-resource routes.",
      links: utilityRoutes,
    },
    {
      title: "Prayer Teachings",
      description: "Published teaching and devotional routes from the blog.",
      links: posts.map((post) => ({
        href: `/blog/${post.slug}`,
        label: post.title,
        text: [formatDate(post.publishedAt), post.excerpt].filter(Boolean).join(" - "),
      })),
    },
    {
      title: "Daily Fire",
      description: "Automated daily Scripture, reflection, prayer, and practice routes.",
      links: dailyDevotionals.map((devotional) => ({
        href: `/Daily-Devotionals/${devotional.slug}`,
        label: devotional.title,
        text: [formatDate(devotional.devotionalDate), devotional.excerpt]
          .filter(Boolean)
          .join(" - "),
      })),
    },
    {
      title: "Events",
      description: "Published event detail routes for online watches and gatherings.",
      links: events
        .filter((event) => event.slug)
        .map((event) => ({
          href: `/events/${event.slug}`,
          label: event.title || "Ministry Event",
          text: [formatDate(event.startDate), event.summary].filter(Boolean).join(" - "),
        })),
    },
    {
      title: "Outreach Updates",
      description: "Published philanthropy and care-outreach detail routes.",
      links: philanthropy
        .filter((item) => item.slug)
        .map((item) => ({
          href: `/philanthropy/${item.slug}`,
          label: item.title || "Philanthropy Update",
          text: [formatDate(item.publishedAt), item.summary].filter(Boolean).join(" - "),
        })),
    },
  ];
  const normalizedGroups = groups.map((group) =>
    group.links.length > 0
      ? group
      : {
          ...group,
          links: [
            {
              href:
                group.title === "Prayer Teachings"
                  ? "/blog"
                  : group.title === "Events"
                    ? "/events"
                    : "/philanthropy",
              label: `${group.title} Index`,
              text: "No published detail pages are available yet. The index route is available for updates.",
            },
          ],
        },
  );
  const totalRoutes = normalizedGroups.reduce((count, group) => count + group.links.length, 0);

  return (
    <main className="sitemap-page">
      <section className="sitemap-hero">
        <div className="sitemap-hero-copy">
          <p className="sitemap-kicker">Crawlable Route Index</p>
          <h1>HTML Sitemap</h1>
          <p>
            All public Ogya Ntom Prayer Army routes are grouped here so visitors,
            search engines, and AI crawlers can reach the full site from a single
            plain HTML page.
          </p>
        </div>
        <div className="sitemap-hero-stats" aria-label="Sitemap summary">
          <div>
            <strong>{normalizedGroups.length}</strong>
            <span>Route groups</span>
          </div>
          <div>
            <strong>{totalRoutes}</strong>
            <span>Public links</span>
          </div>
          <div>
            <strong>HTML</strong>
            <span>Readable index</span>
          </div>
        </div>
      </section>

      <nav className="sitemap-index" aria-label="Sitemap groups">
        {normalizedGroups.map((group, index) => (
          <a key={group.title} href={`#${groupId(group.title)}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {group.title}
          </a>
        ))}
      </nav>

      <section className="sitemap-groups" aria-label="Sitemap route groups">
        {normalizedGroups.map((group, index) => renderGroup(group, index))}
      </section>
    </main>
  );
}
