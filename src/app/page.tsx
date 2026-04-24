import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  Broadcast,
  CalendarBlank,
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
];

const heroStats = [
  { value: "3", label: "daily prayer watches" },
  { value: "Online", label: "community across platforms" },
  { value: "Faithful", label: "covering for urgent needs" },
];

export default function Home() {
  return (
    <main className="bg-[#e6ebe7] text-[#07120d]">
      <section className="relative overflow-hidden border-b border-white/10 bg-[#05110c] px-5 pb-12 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pb-16 lg:pt-36">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#08140f_0%,#0d3a27_42%,#07120d_72%,#030604_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]" />

        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className="flex flex-col justify-between py-2 lg:py-6">
            <div>
            <p className="inline-flex border border-white/15 bg-white/5 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.26em] text-[#f5e7b6]">
              Chief Prayer Warrior Watchman Opanin Thomas
            </p>
            <h1 className="font-display mt-6 max-w-[10ch] text-5xl font-light leading-[0.9] tracking-tight text-white sm:text-7xl lg:text-[5.5rem]">
              A disciplined prayer army for people who stand watch.
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg leading-8 text-[#d6e1db] sm:text-xl">
              Ogya Ntom Prayer Army gathers believers for daily intercession,
              spiritual covering, testimonies, and formation in a structured
              online prayer community.
            </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/prayer-watch"
                className="site-button-primary text-sm uppercase tracking-[0.16em] sm:text-base"
              >
                Join Prayer Watch
                <ArrowRight size={20} weight="bold" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-14 items-center justify-center border border-white/18 bg-white/5 px-6 text-sm font-bold uppercase tracking-[0.16em] text-white transition duration-[180ms] ease-out hover:bg-white/10 active:scale-[0.98] sm:text-base"
              >
                Send Prayer Request
              </Link>
            </div>

            <div className="mt-10 grid gap-4 border-t border-white/12 pt-5 sm:grid-cols-3 sm:gap-6">
              {heroStats.map((item) => (
                <div key={item.label} className="min-h-[4.75rem] border-l border-white/12 pl-4 first:border-l-0 first:pl-0">
                  <p className="font-display text-2xl font-bold leading-none text-[#f3e1a6] sm:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-2 max-w-[16ch] text-sm leading-6 text-[#d0dbd5]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.24)] sm:p-3">
              <div className="relative min-h-[26rem] overflow-hidden bg-[#09160f] sm:min-h-[40rem]">
                <Image
                  src="/brand/watchman-opanin-thomas.png"
                  alt="Chief Prayer Warrior Watchman Opanin Thomas"
                  fill
                  priority
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,8,0.08)_0%,rgba(4,10,8,0.28)_40%,rgba(4,10,8,0.88)_100%),linear-gradient(90deg,rgba(3,6,4,0.38),rgba(3,6,4,0.02)_42%,rgba(3,6,4,0.5))]" />

                <div className="absolute left-4 top-4 border border-white/15 bg-[#07120d]/72 px-3 py-2 text-[0.68rem] font-bold uppercase tracking-[0.24em] text-white sm:left-6 sm:top-6">
                  Watchful leadership
                </div>

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="border border-white/12 bg-[#07120d]/82 p-4 text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:p-5">
                    <div className="mb-5">
                      <p className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#cfb45f]">
                        Watchman Opanin Thomas
                      </p>
                      <p className="mt-2 max-w-[26rem] text-sm leading-6 text-[#d6e1db] sm:text-base">
                        Guiding a prayer culture built on consistency,
                        agreement, and spiritual discipline.
                      </p>
                    </div>

                    <div className="grid gap-4 border-t border-white/12 pt-4 sm:grid-cols-3 sm:gap-0 sm:pt-5">
                      {prayerWatches.map((watch, index) => (
                        <div
                          key={watch.title}
                          className={
                            "sm:px-4 " +
                            (index === 0
                              ? "sm:pl-0"
                              : "sm:border-l sm:border-white/12")
                          }
                        >
                          <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#cfb45f]">
                            {watch.kicker}
                          </p>
                          <h2 className="mt-2 text-lg font-bold leading-tight text-white">
                            {watch.title}
                          </h2>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-white/10 bg-[#06100c] px-5 py-16 text-white lg:py-24 sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(6,16,12,0.98),rgba(13,58,39,0.78)),url('/brand/watchman-opanin-thomas.png')] bg-[length:auto,520px] bg-[position:center,right_10%_top_10%] bg-no-repeat opacity-100" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#cfb45f]">
              Thomas Bio
            </p>
            <h2 className="font-display tracking-tighter mt-4 text-5xl font-light leading-none sm:text-6xl">
              Prayer changes things. Prayer changes us.
            </h2>
          </div>
          <div className="glass-panel-dark p-7 lg:p-10">
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
            <h2 className="font-display tracking-tighter mt-3 text-5xl font-light leading-none sm:text-6xl">
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
                  className="h-14 w-14"
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
            <h2 className="font-display tracking-tighter mt-5 text-4xl font-light leading-none sm:text-5xl">
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
              <h2 className="font-display tracking-tighter mt-3 max-w-3xl text-5xl font-light leading-none sm:text-6xl">
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
                    <ArrowRight
                      size={18}
                      weight="bold"
                      className="transition group-hover:translate-x-1"
                    />
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
            <h2 className="font-display tracking-tighter mt-3 text-5xl font-light leading-none sm:text-6xl">
              Three watches. One disciplined covering.
            </h2>
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
            <h2 className="font-display tracking-tighter mt-3 text-5xl font-light leading-none sm:text-6xl">
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
