import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  ShieldCheck,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import {
  armyPillars,
  contactDetails,
  coreValues,
  missionStatement,
  ministryType,
  opaninBio,
  opaninFullName,
  visionStatement,
} from "@/lib/site";
import { AutoScrollRail } from "@/components/AutoScrollRail";

const pillarIcons = [ShieldCheck, UsersThree];

export default function MinistryPage() {
  return (
    <main className="testimony-page ministry-page">
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
            <p className="testimony-kicker">Ministry</p>
            <h1>Formation under watchful covering.</h1>
            <p>
              {ministryType}. Ogya Ntom Prayer Army is shaped around discipline,
              care, testimony, spiritual growth, and clear leadership.
            </p>
          </div>
        </div>
      </section>

      <section className="ministry-depth-section ministry-arch-section ministry-arch-section-dark section-rule px-5 text-white sm:px-8 lg:px-10">
        <div className="ministry-watchman-arch mx-auto max-w-7xl">
          <div className="ministry-media-card ministry-portrait-slab relative min-h-[420px] overflow-hidden bg-[#07120d]">
            <Image
              src="/brand/watchman-opanin-thomas.png"
              alt={opaninFullName}
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="ministry-media-card-image object-cover object-top"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(6,16,12,0.82))]" />
          </div>
          <div className="ministry-watchman-copy">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#cfb45f]">
              {opaninFullName}
            </p>
            <h2 className="font-display tracking-tighter mt-4 text-5xl font-light leading-none sm:text-6xl">
              Prayer changes things. Prayer changes us.
            </h2>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-[#f3f6f3]">
              {opaninBio}
            </p>
          </div>
        </div>
      </section>

      <section className="ministry-card-section ministry-arch-section ministry-arch-section-light section-rule px-5 sm:px-8 lg:px-10">
        <div className="ministry-manifesto-arch mx-auto max-w-7xl">
          <div className="ministry-statement-card ministry-statement-card-light ministry-arch-panel ministry-vision-panel p-8">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0d3a27]">
              Vision
            </p>
            <h2 className="font-display mt-5 text-4xl font-light leading-none tracking-tighter sm:text-5xl">
              {visionStatement}
            </h2>
          </div>
          <div className="ministry-statement-card ministry-statement-card-dark ministry-arch-panel ministry-mission-panel p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#cfb45f]">
              Mission
            </p>
            <p className="mt-5 text-xl leading-9 text-[#edf1ee]">
              {missionStatement}
            </p>
          </div>
        </div>
      </section>

      <section className="ministry-card-section ministry-arch-section ministry-arch-section-light section-rule px-5 sm:px-8 lg:px-10 ">
        <AutoScrollRail
          ariaLabel="ministry pillars"
          className="ministry-pillar-rail"
          shellClassName="mx-auto max-w-7xl"
        >
          {armyPillars.map((pillar, index) => {
            const Icon = pillarIcons[index] ?? ShieldCheck;
            return (
              <Link
                key={pillar.slug}
                href={`/pillars/${pillar.slug}`}
                className={`ministry-principle-card ministry-pillar-cell p-8 ${
                  index === 1
                    ? "ministry-principle-card-dark text-white"
                    : "ministry-principle-card-light"
                }`}
              >
                <div className="ministry-card-icon">
                  <Icon size={36} weight="bold" />
                </div>
                <span className="ministry-card-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="mt-10 text-3xl font-bold">{pillar.title}</h2>
                <p className="mt-4 max-w-xl text-lg leading-8">
                  {pillar.text}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-bold">
                  Read Pillar
                  <ArrowRight size={17} weight="bold" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </AutoScrollRail>
      </section>

      <section className="ministry-card-section ministry-arch-section ministry-arch-section-light section-rule px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="ministry-section-head mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0d3a27]">
              Core Values
            </p>
            <h2 className="font-display tracking-tighter mt-3 text-5xl font-light leading-none sm:text-6xl">
              What shapes the prayer culture.
            </h2>
          </div>
          <AutoScrollRail
            ariaLabel="core values"
            className="ministry-value-grid ministry-value-ribbon"
          >
            {coreValues.map((value, index) => (
              <Link
                key={value.title}
                href={`/core-values/${value.slug}`}
                className="ministry-value-card ministry-value-line p-6"
              >
                <span className="ministry-value-count">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="mt-5 text-base leading-7 text-[#53635a]">
                  {value.text}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#6d1237]">
                  Read Value
                  <ArrowRight size={17} weight="bold" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </AutoScrollRail>
        </div>
      </section>

      <section className="ministry-community-cta ministry-arch-section px-5 sm:px-8 lg:px-10">
        <div className="ministry-community-cta-shell ministry-community-arch-shell mx-auto max-w-7xl">
          <div>
            <p className="ministry-community-kicker">Prayer Community</p>
            <h2 className="font-display">
              Stand with the prayer army.
            </h2>
            <p>
              Join the prayer community on WhatsApp and stay connected to the
              watch rhythm, covering, and ministry updates.
            </p>
          </div>

          <Link
            href={contactDetails.prayerArmyWhatsapp}
            className="ministry-community-action"
            aria-label="Join the prayer community on WhatsApp"
          >
            <span className="ministry-play-glow" aria-hidden="true">
              <Play size={20} weight="fill" />
            </span>
            <span>Join Prayer Community</span>
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
