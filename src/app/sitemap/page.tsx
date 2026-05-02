import type { Metadata } from "next";
import Link from "next/link";
import { armyPillars, coreValues } from "@/lib/site";
import { givingOptions } from "@/lib/giving";
import { sanityFetch } from "@/sanity/client";
import { eventsQuery, philanthropyQuery, postsQuery } from "@/sanity/queries";
import type { Event, PhilanthropyUpdate, Post } from "@/sanity/types";

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

function renderGroup(group: SitemapGroup) {
  return (
    <section
      key={group.title}
      className="border border-[#10251d]/12 bg-[#fffdf8]/80 p-5 shadow-[0_18px_42px_rgba(14,34,25,0.06)] sm:p-6"
      aria-labelledby={`sitemap-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
    >
      <h2
        id={`sitemap-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
        className="font-display text-3xl font-bold leading-none text-[#10251d]"
      >
        {group.title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-[#53635a]">{group.description}</p>
      <ul className="mt-5 grid gap-3">
        {group.links.map((item) => (
          <li key={item.href} className="min-w-0 border-t border-[#10251d]/10 pt-3">
            <Link
              href={item.href}
              className="inline-flex min-h-10 items-center break-words text-base font-bold text-[#6d1237] underline decoration-[#cfb45f]/70 underline-offset-[0.22em] transition-colors duration-[150ms] ease-out hover:text-[#10251d] focus-visible:text-[#10251d]"
            >
              {item.label}
            </Link>
            {item.text ? (
              <p className="mt-1 text-sm leading-6 text-[#53635a]">{item.text}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function HtmlSitemapPage() {
  const [posts, events, philanthropy] = await Promise.all([
    sanityFetch<Post[]>(postsQuery, {}, []),
    sanityFetch<Event[]>(eventsQuery, {}, []),
    sanityFetch<PhilanthropyUpdate[]>(philanthropyQuery, {}, []),
  ]);

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

  return (
    <main className="bg-[#e6ebe7] text-[#07120d]">
      <section className="bg-[#030604] px-5 pb-12 pt-28 text-white sm:px-8 lg:px-10 lg:pb-16 lg:pt-36">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#cfb45f]">
            Crawlable Route Index
          </p>
          <h1 className="font-display mt-4 max-w-4xl text-5xl font-bold leading-none tracking-normal sm:text-6xl lg:text-7xl">
            HTML Sitemap
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#c7d0ca] sm:text-lg">
            All public Ogya Ntom Prayer Army routes are grouped here so visitors,
            search engines, and AI crawlers can reach the full site from a single
            plain HTML page.
          </p>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16" aria-label="Sitemap route groups">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {groups.map((group) =>
            group.links.length > 0
              ? renderGroup(group)
              : renderGroup({
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
                }),
          )}
        </div>
      </section>
    </main>
  );
}
