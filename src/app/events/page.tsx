import Link from "next/link";
import {
  CalendarBlank,
  GoogleLogo,
  LinkSimple,
  TelegramLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { SanityImage } from "@/components/SanityImage";
import { sanityFetch } from "@/sanity/client";
import { eventsQuery } from "@/sanity/queries";
import type { Event } from "@/sanity/types";

export const metadata = {
  title: "Upcoming Events | Ogya Ntom Prayer Army",
  description:
    "Upcoming online prayer gatherings, vigils, and ministry events from Ogya Ntom Prayer Army.",
};

export const revalidate = 60;

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

export default async function EventsPage() {
  const events = await sanityFetch<Event[]>(eventsQuery, {}, []);

  return (
    <main className="bg-[#e6ebe7] pt-36 text-[#07120d] lg:pt-48">
      <section className="relative overflow-hidden px-5 pb-16 sm:px-8 lg:px-10 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(207,180,95,0.28),transparent_30%),linear-gradient(135deg,#07120d,#0d3a27_58%,#030604)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 text-white lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#cfb45f]">
              Upcoming Events
            </p>
            <h1 className="font-display mt-5 text-6xl font-light leading-none tracking-tighter sm:text-7xl lg:text-8xl">
              Online watches for the prayer army.
            </h1>
          </div>
          <p className="glass-panel-dark p-7 text-xl leading-9 text-[#edf1ee]">
            Publish vigils, special prayer meetings, Google Meet sessions, and
            ministry announcements in Sanity. The site will keep this page fresh.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          {events.length === 0 ? (
            <div className="glass-panel p-8 lg:p-12">
              <CalendarBlank size={42} weight="bold" className="text-[#0d3a27]" />
              <h2 className="font-display mt-8 text-5xl font-light leading-none tracking-tighter">
                Events are ready for Sanity.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#53635a]">
                Create an Upcoming Event in Studio with a date, platform, and
                meeting link. Published events will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              {events.map((event, index) => {
                const PlatformIcon =
                  platformIcons[event.platform || "Online"] || LinkSimple;

                return (
                  <article
                    key={event._id}
                    className="glass-panel grid overflow-hidden lg:grid-cols-[0.82fr_1.18fr]"
                  >
                    <div className="relative min-h-[22rem] overflow-hidden bg-[#07120d]">
                      <SanityImage
                        image={event.image}
                        altFallback={event.title}
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(3,6,4,0.72))]" />
                    </div>

                    <div className="p-7 lg:p-10">
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-2 border border-[#0d3a27] bg-[#0d3a27] px-4 py-2 text-sm font-bold text-white">
                          <CalendarBlank size={18} weight="bold" />
                          {formatDate(event.startDate)}
                        </span>
                        <span className="inline-flex items-center gap-2 border border-[rgba(7,18,13,0.12)] bg-white/70 px-4 py-2 text-sm font-bold text-[#0d3a27]">
                          <PlatformIcon size={18} weight="bold" />
                          {event.platform || "Online"}
                        </span>
                      </div>

                      <h2 className="font-display mt-8 text-5xl font-light leading-none tracking-tighter">
                        {event.title}
                      </h2>
                      {event.summary ? (
                        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#53635a]">
                          {event.summary}
                        </p>
                      ) : null}
                      <div className="mt-7 grid gap-3 text-base font-bold text-[#21372c] sm:grid-cols-2">
                        <span className="border border-[rgba(7,18,13,0.12)] bg-white/62 px-4 py-3">
                          {event.location || "Online ministry gathering"}
                        </span>
                        <span className="border border-[rgba(7,18,13,0.12)] bg-white/62 px-4 py-3">
                          {event.status || "upcoming"}
                        </span>
                      </div>
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
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
