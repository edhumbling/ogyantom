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
    title: `${title} | Ogya Ntom Prayer Army`,
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

  return (
    <main className="bg-[#e6ebe7] text-[#07120d]">
      <article>
        <section className="hero-shell hero-start hero-wine-accent overflow-hidden border-b border-white/10">
          <div className="hero-media">
            <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_90%_0%,rgba(207,180,95,0.22),transparent_32%),linear-gradient(135deg,#07120d_0%,#0d3a27_52%,#030604_100%)]" />
          </div>
          <div className="hero-content mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:px-10">
            <div>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#cfb45f]"
              >
                <ArrowLeft size={18} weight="bold" />
                Upcoming Events
              </Link>
              <p className="hero-script mt-5">Gathering for intercession</p>
              <h1 className="font-display mt-6 text-6xl font-light leading-none tracking-tighter text-white sm:text-7xl">
                {title}
              </h1>
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
                <p className="mt-6 max-w-2xl text-xl leading-8 text-white/86">
                  {event.summary}
                </p>
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

            <div className="architectural-band relative min-h-[34rem] overflow-hidden bg-[#07120d]">
              <SanityImage image={event.image} altFallback={title} priority />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(3,6,4,0.68))]" />
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 pt-12 sm:px-8 lg:px-10 lg:pb-32 lg:pt-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.68fr_0.32fr] lg:items-start">
            <div className="glass-panel p-7 sm:p-10">
              <div className="prose-prayer">
                <RichPortableText
                  value={event.body}
                  emptyText="This event has been published without full event details."
                />
              </div>
            </div>

            <aside className="glass-panel p-6">
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
