import Image from "next/image";
import { CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { SanityCardGrid, type SanityCardGridItem } from "@/components/SanityCardGrid";
import {
  buildSearchIndex,
  filterSanityCards,
  normalizeListSearchParams,
  paginateSanityCards,
} from "@/lib/sanity-browser";
import { sanityFetch } from "@/sanity/client";
import { eventsQuery } from "@/sanity/queries";
import type { Event } from "@/sanity/types";

export const metadata = {
  title: "Upcoming Events",
  description:
    "Upcoming online prayer gatherings, vigils, and ministry events from Ogya Ntom Prayer Army.",
};

export const revalidate = 60;

type EventsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function formatDate(value?: string) {
  if (!value) return "Date to be announced";
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const { page, query } = normalizeListSearchParams(await searchParams);
  const events = await sanityFetch<Event[]>(eventsQuery, {}, []);
  const cards: SanityCardGridItem[] = events.map((event) => ({
    id: event._id,
    href: event.slug ? `/events/${event.slug}` : undefined,
    title: event.title || "Untitled Event",
    eyebrow: formatDate(event.startDate),
    summary: event.summary,
    meta: [event.platform || "Online", event.location || "Ministry gathering"]
      .filter(Boolean)
      .join(" / "),
    actionLabel: "View Details",
    cover: event.image,
    searchText: buildSearchIndex([
      "event online watch vigil prayer meeting gathering",
      event.title,
      event.summary,
      event.platform,
      event.location,
      event.status,
      formatDate(event.startDate),
    ]),
  }));
  const filteredCards = filterSanityCards(cards, query);
  const pagedCards = paginateSanityCards(filteredCards, page);

  return (
    <main className="testimony-page">
      <section className="testimony-hero">
        <div className="testimony-hero-media">
          <Image
            src="/brand/watchman-opanin-thomas.png"
            alt="Watchman Opanin Thomas"
            fill
            sizes="100vw"
            className="object-cover object-[50%_top] lg:object-contain lg:object-right"
            priority
          />
        </div>
        <div className="testimony-hero-inner">
          <div className="testimony-hero-copy">
            <p className="testimony-kicker">Upcoming Events</p>
            <h1>Online watches for the prayer army.</h1>
            <p>
              Vigils, special prayer meetings, online gatherings, and ministry
              moments for the prayer family.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          {events.length === 0 ? (
            <div className="glass-panel p-8 lg:p-12">
              <CalendarBlank size={42} weight="bold" className="text-[#0d3a27]" />
              <h2 className="font-display mt-8 text-5xl font-light leading-none tracking-tighter">
                New events will be announced soon.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#53635a]">
                Upcoming vigils, prayer meetings, and online gatherings will be
                shared here as dates are confirmed.
              </p>
            </div>
          ) : (
            <SanityCardGrid
              items={pagedCards.pageItems}
              ariaLabel="upcoming events"
              search={{
                basePath: "/events",
                label: "Search upcoming events",
                placeholder: "Search online watches…",
                query,
                resultLabel: "events",
                totalCount: filteredCards.length,
              }}
              pagination={{
                page: pagedCards.page,
                pageCount: pagedCards.pageCount,
              }}
            />
          )}
        </div>
      </section>
    </main>
  );
}
