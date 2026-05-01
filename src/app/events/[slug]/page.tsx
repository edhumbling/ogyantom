import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarBlank,
  GoogleLogo,
  LinkSimple,
  TelegramLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { RichPortableText } from "@/components/RichPortableText";
import { SanityImage } from "@/components/SanityImage";
import { SanityShareGrid } from "@/components/SanityShareGrid";
import { absoluteUrl } from "@/lib/seo";
import { sanityFetch } from "@/sanity/client";
import { buildContentMetadata } from "@/sanity/metadata";
import { eventBySlugQuery } from "@/sanity/queries";
import type { Event } from "@/sanity/types";

export const revalidate = 60;

type EventPageProps = {
  params: Promise<{ slug: string }>;
};

const platformIcons = {
  WhatsApp: WhatsappLogo,
  Telegram: TelegramLogo,
  "Google Meet": GoogleLogo,
  Online: LinkSimple,
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

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await sanityFetch<Event | null>(eventBySlugQuery, { slug }, null);
  const title = event?.title || "Upcoming Event";

  return buildContentMetadata({
    title,
    description: event?.summary,
    image: event?.image,
    imageAlt: title,
    path: `/events/${slug}`,
  });
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await sanityFetch<Event | null>(eventBySlugQuery, { slug }, null);

  if (!event) {
    return (
      <main className="bg-[#e6ebe7] px-5 pb-20 pt-36 text-[#07120d] sm:px-8 lg:px-10 lg:pt-48">
        <div className="glass-panel mx-auto max-w-4xl p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0d3a27]">
            Upcoming Event
          </p>
          <h1 className="font-display mt-5 text-5xl font-light leading-none tracking-tighter">
            This event is not published yet.
          </h1>
          <Link
            href="/events"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0d3a27]"
          >
            <ArrowLeft size={18} weight="bold" />
            Back to events
          </Link>
        </div>
      </main>
    );
  }

  const title = event.title || "Untitled event";
  const PlatformIcon = platformIcons[event.platform || "Online"] || LinkSimple;
  const eventUrl = absoluteUrl(`/events/${slug}`);

  return (
    <main className="testimony-page">
      <article>
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
              <Link
                href="/events"
                className="testimony-kicker"
              >
                <ArrowLeft size={18} weight="bold" />
                Upcoming Events
              </Link>
              <h1>{title}</h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 border border-white/15 bg-white/8 px-4 py-2 text-sm font-bold text-white/82">
                  <CalendarBlank size={18} weight="bold" />
                  {formatDate(event.startDate)}
                </span>
                <span className="inline-flex items-center gap-2 border border-white/15 bg-white/8 px-4 py-2 text-sm font-bold text-white/82">
                  <PlatformIcon size={18} weight="bold" />
                  {event.platform || "Online"}
                </span>
              </div>
              {event.summary ? (
                <p>{event.summary}</p>
              ) : null}
              {event.meetingLink ? (
                <Link
                  href={event.meetingLink}
                  className="site-button-primary mt-8 text-sm uppercase tracking-[0.16em]"
                >
                  Join event
                  <LinkSimple size={18} weight="bold" />
                </Link>
              ) : null}
            </div>
          </div>
        </section>

        <section className="sanity-detail-section">
          <div className="sanity-detail-shell">
            <div className="sanity-detail-main">
              <SanityShareGrid
                title={title}
                text={event.summary}
                url={eventUrl}
              />

              <figure className="sanity-detail-media">
                <SanityImage
                  image={event.image}
                  altFallback={title}
                  width={1400}
                  height={820}
                />
              </figure>

              <div className="prose-prayer sanity-detail-prose">
                <RichPortableText
                  value={event.body}
                  emptyText="This event has been published without full event details."
                />
              </div>
            </div>

            <aside className="sanity-detail-aside">
              <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#0d3a27]">
                Event details
              </h2>
              <div className="mt-5 grid gap-3 text-sm leading-6 text-[#31473d]">
                <p className="border-b border-[var(--line)] pb-3">
                  <strong className="block text-[#07120d]">Start</strong>
                  {formatDate(event.startDate)}
                </p>
                {event.endDate ? (
                  <p className="border-b border-[var(--line)] pb-3">
                    <strong className="block text-[#07120d]">End</strong>
                    {formatDate(event.endDate)}
                  </p>
                ) : null}
                <p className="border-b border-[var(--line)] pb-3">
                  <strong className="block text-[#07120d]">Location</strong>
                  {event.location || "Online ministry gathering"}
                </p>
                <p>
                  <strong className="block text-[#07120d]">Status</strong>
                  {event.status || "upcoming"}
                </p>
              </div>
            </aside>
          </div>
        </section>
      </article>
    </main>
  );
}
