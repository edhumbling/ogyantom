import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  CalendarBlank,
  Fire,
  HandsPraying,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import { AutoScrollRail } from "@/components/AutoScrollRail";
import { opaninFullName, prayerWatches } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prayer Army",
  description:
    "Join the Ogya Ntom Prayer Army rhythm for morning and evening intercession, covering, and spiritual formation.",
};

const armyScriptures = [
  {
    reference: "Acts 1:14",
    quote: "These all continued with one accord in prayer.",
    meaning:
      "The army gathers online with one accord, not as spectators, but as believers carrying one burden before God.",
  },
  {
    reference: "Isaiah 62:6-7",
    quote: "You who make mention of the Lord, keep not silence.",
    meaning:
      "The remnant keeps watch with holy persistence until the purposes of God are established.",
  },
  {
    reference: "James 5:16",
    quote: "The effectual fervent prayer of a righteous man availeth much.",
    meaning:
      "Fervent prayer is not noise; it is faith, purity, and fire directed toward God.",
  },
  {
    reference: "Matthew 18:19-20",
    quote: "Where two or three are gathered together in my name.",
    meaning:
      "Online mediums do not limit agreement when the gathering is centered on Christ.",
  },
];

export default function PrayerArmyPage() {
  return (
    <main className="testimony-page prayer-watch-page">
      <section className="testimony-hero">
        <div className="testimony-hero-media">
          <Image
            src="/brand/watchman-opanin-thomas.png"
            alt={opaninFullName}
            fill
            sizes="100vw"
            className="object-cover object-[50%_top] lg:object-contain lg:object-right"
            priority
          />
        </div>
        <div className="testimony-hero-inner">
          <div className="testimony-hero-copy">
            <p className="testimony-kicker">Prayer Army</p>
            <h1>A disciplined army of prayer.</h1>
            <p className="prayer-army-hero-long mobile-flow-long">
              A remnant of hundreds of prayer warriors covenanting together
              through WhatsApp, Telegram, Google Meet, and other online mediums
              for fervent intercession under watchful leadership.
            </p>
            <p className="mobile-flow-summary">
              Twice-daily online watches for focused prayer, covering, and agreement.
            </p>
            <div className="testimony-hero-actions">
              <Link href="/prayer-request" className="testimony-glow-cta">
                <span className="relative z-10 flex items-center gap-2">
                  <HandsPraying size={16} weight="fill" />
                  Send Prayer Request
                </span>
              </Link>
              <a href="#army-rhythm" className="testimony-secondary-cta">
                View Army Rhythm
                <ArrowDown size={17} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="prayer-army-remnant-section px-5 py-16 sm:px-8 lg:px-10">
        <div className="prayer-army-architecture mx-auto max-w-7xl">
          <article className="prayer-army-arch-panel prayer-army-arch-panel-dark">
            <div className="ministry-card-icon" aria-hidden="true">
              <UsersThree size={34} weight="bold" />
            </div>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-[#cfb45f]">
              The Remnant
            </p>
            <h2 className="font-display mt-5 text-5xl font-light leading-none tracking-tighter sm:text-6xl">
              Hundreds covenanting together in prayer.
            </h2>
            <p className="mobile-flow-long mt-6 text-lg leading-8">
              Ogya Ntom Prayer Army is more than a meeting time. It is a
              covenant rhythm where hundreds of members gather through online
              channels to carry families, urgent needs, testimonies, nations,
              and spiritual growth before God. The army is scattered by
              location, but united by burden.
            </p>
          </article>

          <article className="prayer-army-arch-panel">
            <div className="ministry-card-icon" aria-hidden="true">
              <Fire size={34} weight="bold" />
            </div>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-[#0d3a27]">
              Fervent Prayer
            </p>
            <h2 className="font-display mt-5 text-4xl font-light leading-none tracking-tighter sm:text-5xl">
              The fire is carried with order, humility, and faith.
            </h2>
            <p className="mobile-flow-long mt-6 text-lg leading-8 text-[#506157]">
              This remnant is not built on performance. It is built on believers
              who return to the watch with faith when others grow tired, who
              pray with compassion when needs are heavy, and who believe that
              distance cannot weaken agreement when Christ is the center.
            </p>
          </article>
        </div>

        <AutoScrollRail
          ariaLabel="army scriptures"
          className="prayer-army-scripture-ribbon"
          shellClassName="mx-auto mt-5 max-w-7xl"
        >
          {armyScriptures.map((scripture) => (
            <article key={scripture.reference} className="prayer-army-scripture-line">
              <p>{scripture.reference}</p>
              <blockquote>{scripture.quote}</blockquote>
              <span>{scripture.meaning}</span>
            </article>
          ))}
        </AutoScrollRail>
      </section>

      <section id="army-rhythm" className="testimony-ledger-section">
        <div className="testimony-section-head">
          <div>
            <p className="testimony-kicker testimony-kicker-dark">
              Prayer Rhythm
            </p>
            <h2>Morning and evening coverage.</h2>
          </div>
          <p className="mobile-flow-long">
            The army rhythm gives people a clear time to gather, a shared
            language for agreement, and a steady covering for requests carried
            by the ministry.
          </p>
        </div>

        <AutoScrollRail
          ariaLabel="prayer watch rhythm"
          className="prayer-watch-grid"
        >
          {prayerWatches.map((watch, index) => (
            <article
              key={watch.title}
              className={`prayer-watch-card ${
                index === 1 ? "prayer-watch-card-dark" : ""
              }`}
            >
              <CalendarBlank
                size={36}
                weight="bold"
                className={index === 1 ? "text-[#d4af5d]" : "text-[#6d1237]"}
              />
              <p>{watch.kicker}</p>
              <h3>{watch.title}</h3>
              <span>{watch.text}</span>
            </article>
          ))}
        </AutoScrollRail>
      </section>

      <section className="ministry-community-cta px-5 py-16 sm:px-8 lg:px-10">
        <div className="ministry-community-cta-shell mx-auto max-w-7xl">
          <div>
            <p className="ministry-community-kicker">Prayer Covering</p>
            <h2 className="font-display">Bring the matter to the army.</h2>
            <p className="mobile-flow-long">
              Prayer requests now have a dedicated route so people can submit
              needs clearly without mixing them into general contact.
            </p>
          </div>

          <Link
            href="/prayer-request"
            className="ministry-community-action"
            aria-label="Open the prayer request page"
          >
            <span>Send Prayer Request</span>
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
