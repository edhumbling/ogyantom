import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  Broadcast,
  CalendarBlank,
  HandHeart,
  HandsPraying,
  Megaphone,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import {
  coreValues,
  ministryFacets,
  missionStatement,
  ministryType,
  opaninFullName,
  onlinePlatforms,
  prayerWatches,
  visionStatement,
  contactDetails,
} from "@/lib/site";
import { AutoScrollRail } from "@/components/AutoScrollRail";

const facetIcons = [
  Broadcast,
  Megaphone,
  ShieldCheck,
  HandsPraying,
  BookOpenText,
  CalendarBlank,
  HandHeart,
];

export default function Home() {
  return (
    <main className="home-stage">
      <section className="home-hero">
        <div className="home-hero-backdrop" />
        <div className="home-hero-grid">
          <div className="home-hero-copy">
            <p className="home-kicker">Prayer here, Prayer there</p>
            <h1>Ogya Ntom Prayer Army</h1>
            <p>
              A disciplined online prayer community for morning and evening
              intercession, spiritual covering, testimony, and formation under
              watchful leadership.
            </p>
            <div className="home-hero-actions">
              <Link
                href={contactDetails.prayerArmyWhatsapp}
                className="home-primary-action"
              >
                Join Prayer Army
                <ArrowRight size={18} weight="bold" />
              </Link>
              <Link href="/prayer-request" className="home-secondary-action">
                Send Prayer Request
              </Link>
            </div>
          </div>

          <div className="home-hero-portrait" aria-label={opaninFullName}>
            <Image
              src="/brand/watchman-opanin-thomas.png"
              alt={`Chief Prayer Warrior ${opaninFullName}`}
              width={853}
              height={1280}
              sizes="(min-width: 1024px) 42vw, 92vw"
              className="home-hero-image"
              priority
            />
            <div className="home-portrait-caption">
              <span>Chief Prayer Warrior</span>
              <strong>{opaninFullName}</strong>
            </div>
          </div>

        </div>
      </section>

      <section className="home-section home-reveal">
        <div className="home-section-grid">
          <div>
            <p className="home-kicker home-kicker-dark">{ministryType}</p>
            <h2 className="home-section-title">
              We connect the world through prayers online.
            </h2>
          </div>
          <AutoScrollRail
            ariaLabel="online platforms"
            className="home-platform-rail"
          >
            {onlinePlatforms.map((platform) => (
              <Link
                key={platform.name}
                href={platform.href}
                className="home-platform-card"
              >
                <Image
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  width={52}
                  height={52}
                  className="h-12 w-12"
                />
                <h3>{platform.name}</h3>
                <p>{platform.text}</p>
              </Link>
            ))}
          </AutoScrollRail>
        </div>
      </section>

      <section className="home-section home-declaration-band">
        <div className="home-declaration-shell">
          <div className="home-declaration-rule" aria-hidden="true" />
          <div className="home-vision-card">
            <p className="home-kicker home-kicker-dark">Vision</p>
            <h2>
              {visionStatement}
            </h2>
          </div>
          <div className="home-mission-card">
            <p className="home-kicker">Mission</p>
            <h3>Equip. Intercede. Cultivate.</h3>
            <p>
              {missionStatement}
            </p>
          </div>
        </div>
      </section>

      <section className="home-section home-reveal">
        <div className="home-section-shell">
          <div className="home-section-head">
            <div>
              <p className="home-kicker home-kicker-dark">Ministry facets</p>
              <h2 className="home-section-title">
                Built like a system. Moving like a family.
              </h2>
            </div>
            <p>
              Each facet has its own page so visitors can understand the rhythm,
              purpose, and next step without digging.
            </p>
          </div>

          <AutoScrollRail
            ariaLabel="ministry facets"
            className="home-facet-rail"
          >
            {ministryFacets.map((facet, index) => {
              const Icon = facetIcons[index];
              return (
                <Link
                  key={facet.href}
                  href={facet.href}
                  className="home-facet-card"
                >
                  <div>
                    <Icon size={28} weight="bold" />
                  </div>
                  <h3>{facet.title}</h3>
                  <p>{facet.text}</p>
                  <span>
                    Open facet
                    <ArrowRight size={18} weight="bold" />
                  </span>
                </Link>
              );
            })}
          </AutoScrollRail>
        </div>
      </section>

      <section className="home-section home-watch-band home-reveal">
        <div className="home-section-grid">
          <div>
            <p className="home-kicker">Prayer Army</p>
            <h2 className="home-section-title">
              Two watches. One disciplined army.
            </h2>
            <p className="home-watch-copy">
              Monday to Saturday at 6:30am and 8:00pm.
            </p>
          </div>

          <div className="home-watch-list">
            {prayerWatches.map((watch) => (
              <Link
                href="/prayer-army"
                key={watch.title}
                className="home-watch-card"
              >
                <div>
                  <CalendarBlank size={28} weight="bold" className="text-[#cfb45f]" />
                  <p>{watch.kicker}</p>
                </div>
                <div>
                  <h3>{watch.title}</h3>
                  <p>{watch.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-reveal">
        <div className="home-section-shell">
          <div className="home-section-head">
            <div>
              <p className="home-kicker home-kicker-dark">Core Values</p>
              <h2 className="home-section-title">
                The culture behind the prayer army.
              </h2>
            </div>
          </div>
          <AutoScrollRail
            ariaLabel="core values"
            className="home-values-rail"
          >
            {coreValues.map((value) => (
              <Link
                key={value.title}
                href={`/core-values/${value.slug}`}
                className="home-value-card"
              >
                <h3>{value.title}</h3>
                <p>{value.text}</p>
                <span>
                  Read Value
                  <ArrowRight size={17} weight="bold" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </AutoScrollRail>
        </div>
      </section>

      <section className="home-cta-section">
        <div className="home-cta-shell">
          <p className="home-kicker">Stand in agreement</p>
          <h2>Bring your request into the watch.</h2>
          <p>
            Join the prayer army rhythm or send a request for Watchman Opanin
            Thomas and the ministry team to cover with care.
          </p>
          <div className="home-cta-actions">
            <Link href="/prayer-army" className="home-primary-action">
              Prayer Army
              <ArrowRight size={18} weight="bold" />
            </Link>
            <Link href="/prayer-request" className="home-secondary-action">
              Send Prayer Request
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
