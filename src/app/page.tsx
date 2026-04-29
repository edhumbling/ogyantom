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
  onlinePlatforms,
  prayerWatches,
  thomasBio,
  visionStatement,
} from "@/lib/site";

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
    <main className="bg-[#e6ebe7] text-[#07120d]">
      <section className="hero-shell hero-start hero-wine-accent border-b border-white/10">
        <div className="hero-content mx-auto grid w-full max-w-7xl gap-8 px-4 pb-10 pt-8 sm:px-8 lg:min-h-[calc(100svh-4.75rem)] lg:grid-cols-[minmax(0,0.95fr)_minmax(22rem,0.72fr)] lg:items-center lg:px-10 lg:pb-14 lg:pt-10">
          <div className="motion-rise">
            <div className="max-w-3xl">
              <p className="inline-flex border border-[rgba(207,180,95,0.5)] bg-[#07120d]/55 px-3 py-2 text-[0.7rem] font-bold tracking-[0.16em] text-[#f4e7b5]">
                Prayer here, Prayer there
              </p>
              <p className="hero-script mt-5">Watch and pray without ceasing</p>
              <h1 className="font-display mt-5 max-w-[10ch] text-5xl font-light leading-[0.9] text-white sm:text-7xl">
                Ogya Ntom Prayer Army
              </h1>
            </div>

            <div className="hero-description-panel mt-8 max-w-2xl">
              <p className="hero-description-label">Online Prayer Community</p>
              <p className="mt-4 text-base leading-8 text-[#ecf4ef] sm:text-lg">
                A disciplined online prayer community for Monday to Saturday
                morning and evening intercession, spiritual covering,
                testimony, and formation under watchful leadership.
              </p>
              <div className="mt-7 grid gap-2 sm:grid-cols-2">
                <Link
                  href="/prayer-watch"
                  className="site-button-primary min-h-11 rounded-md px-4 text-[0.68rem] tracking-[0.12em] sm:px-5 sm:text-xs"
                >
                  Join Prayer Watch
                  <ArrowRight size={18} weight="bold" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 items-center justify-center rounded-md border border-white/24 bg-white/8 px-4 text-[0.68rem] font-bold tracking-[0.12em] text-white transition duration-[180ms] ease-out hover:-translate-y-[1px] hover:bg-white/14 sm:px-5 sm:text-xs"
                >
                  Send Prayer Request
                </Link>
              </div>
            </div>
          </div>

          <div className="hero-portrait-panel motion-rise">
            <Image
              src="/brand/watchman-opanin-thomas.png"
              alt="Chief Prayer Warrior Watchman Opanin Thomas"
              width={853}
              height={1280}
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="hero-portrait-image"
            />
            <div className="hero-portrait-caption">
              <span>Chief Prayer Warrior</span>
              <strong>Watchman Opanin Thomas</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#07120d] px-5 py-16 text-white lg:py-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#cfb45f]">
              Thomas Bio
            </p>
            <h2 className="font-display mt-4 text-5xl font-light leading-none sm:text-6xl">
              Prayer changes things. Prayer changes us.
            </h2>
          </div>
          <div className="border border-white/14 bg-[#0a1a13] p-7 lg:p-10">
            <p className="text-xl leading-9 text-[#f3f6f3]">{thomasBio}</p>
          </div>
        </div>
      </section>

      <section className="section-rule px-5 py-16 lg:py-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0d3a27]">
              {ministryType}
            </p>
            <h2 className="font-display mt-3 text-5xl font-light leading-none sm:text-6xl">
              We connect the world through prayers online.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {onlinePlatforms.map((platform) => (
              <Link
                key={platform.name}
                href={platform.href}
                className="glass-panel p-6 transition duration-[180ms] ease-out hover:-translate-y-1"
              >
                <Image
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  width={52}
                  height={52}
                  className="h-12 w-12"
                />
                <h3 className="mt-8 text-2xl font-bold">{platform.name}</h3>
                <p className="mt-3 text-base leading-7 text-[#53635a]">
                  {platform.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-rule relative overflow-hidden px-5 py-16 lg:py-24 sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#cdd8d0,#e6ebe7_45%,#bfcac3)]" />
        <div className="relative mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="glass-panel p-7 lg:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0d3a27]">
              Vision
            </p>
            <h2 className="font-display mt-5 text-4xl font-light leading-none sm:text-5xl">
              {visionStatement}
            </h2>
          </div>
          <div className="glass-panel-dark p-7 text-white lg:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#cfb45f]">
              Mission
            </p>
            <p className="mt-5 max-w-4xl text-xl leading-9 text-[#edf1ee]">
              {missionStatement}
            </p>
          </div>
        </div>
      </section>

      <section className="section-rule px-5 py-16 lg:py-24 sm:px-8 lg:px-10 ">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0d3a27]">
                Ministry facets
              </p>
            <h2 className="font-display mt-3 max-w-3xl text-5xl font-light leading-none sm:text-6xl">
                Built like a system. Moving like a family.
              </h2>
            </div>
            <p className="max-w-md text-lg leading-8 text-[#4f5d55]">
              Each facet has its own page so visitors can understand the rhythm,
              purpose, and next step without digging.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {ministryFacets.map((facet, index) => {
              const Icon = facetIcons[index];
              return (
                <Link
                  key={facet.href}
                  href={facet.href}
                  className="glass-panel group min-h-80 p-6 transition duration-[180ms] ease-out hover:-translate-y-1 hover:border-[#cfb45f]"
                >
                  <div className="flex h-14 w-14 items-center justify-center border border-[rgba(7,18,13,0.12)] bg-[#edf1ee] text-[#0d3a27]">
                    <Icon size={28} weight="bold" />
                  </div>
                  <h3 className="mt-10 text-2xl font-bold">{facet.title}</h3>
                  <p className="mt-4 text-base leading-7 text-[#53635a]">
                    {facet.text}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0d3a27]">
                    Open facet
                    <ArrowRight size={18} weight="bold" className="transition group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-rule bg-[linear-gradient(135deg,#07120d,#0d3a27_58%,#030604)] px-5 py-16 lg:py-24 text-white sm:px-8 lg:px-10 ">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#cfb45f]">
              Prayer Watch
            </p>
            <h2 className="font-display mt-3 text-5xl font-light leading-none sm:text-6xl">
              Two watches. One disciplined covering.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#dfe6e1]">
              Monday to Saturday at 6:30am and 8:00pm.
            </p>
          </div>

          <div className="grid gap-3">
            {prayerWatches.map((watch) => (
              <Link
                href="/prayer-watch"
                key={watch.title}
                className="glass-panel-dark grid gap-4 p-5 transition duration-[180ms] ease-out hover:bg-white/[0.08] sm:grid-cols-[12rem_1fr]"
              >
                <div>
                  <CalendarBlank size={28} weight="bold" className="text-[#cfb45f]" />
                  <p className="mt-4 text-sm font-bold uppercase tracking-[0.25em] text-[#cfd8d2]">
                    {watch.kicker}
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{watch.title}</h3>
                  <p className="mt-2 max-w-xl leading-7 text-[#dfe6e1]">
                    {watch.text}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-rule px-5 py-16 lg:py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0d3a27]">
              Core Values
            </p>
            <h2 className="font-display mt-3 text-5xl font-light leading-none sm:text-6xl">
              The culture behind the prayer army.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {coreValues.map((value) => (
              <article
                key={value.title}
                className="glass-panel min-h-72 p-6"
              >
                <h3 className="text-xl font-bold text-[#07120d]">
                  {value.title}
                </h3>
                <p className="mt-5 text-base leading-7 text-[#53635a]">
                  {value.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
