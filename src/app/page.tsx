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

export default function Home() {
  return (
    <main className="bg-[#e6ebe7] text-[#07120d]">
      <section className="relative overflow-hidden bg-[#e6ebe7] px-5 pb-20 lg:pb-32 pt-36 lg:pt-48 sm:px-8 lg:px-10 ">
        <div className="absolute inset-x-0 top-0 h-[55%] bg-[linear-gradient(135deg,#e6ebe7_0%,#cdd8d0_46%,#0b2b1c_46%,#06100c_100%)] sm:h-[62%] lg:h-[72%]" />
        <div className="absolute right-[-12%] top-28 h-[620px] w-[58%] rounded-[44%_56%_52%_48%/38%_42%_58%_62%] border border-white/25 bg-white/[0.08]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.94fr_1.06fr] lg:items-end">
          <div className="pt-10 lg:pb-32 ">
            <p className="glass-chip mb-7 inline-flex rounded-full px-4 py-2 text-sm font-bold text-[#0d3a27]">
              Chief Prayer Warrior Watchman Opanin Thomas
            </p>
            <div className="rounded-[2.25rem] border border-white/75 bg-[#f6f8f5]/[0.94] p-5 shadow-[0_22px_60px_rgba(8,20,15,0.08)] backdrop-blur-xl sm:p-6 md:border-transparent md:bg-transparent md:p-0 md:shadow-none md:backdrop-blur-none">
              <h1 className="font-display tracking-tighter max-w-4xl text-6xl font-light leading-[0.94] text-[#06100c] sm:text-7xl lg:text-8xl">
                A prayer army for the watch.
              </h1>
              <p className="mt-7 max-w-2xl text-xl leading-8 text-[#31483b]">
                Ogya Ntom Prayer Army gathers disciplined prayer warriors for
                intercession, testimonies, covering, and spiritual formation.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/prayer-watch"
                  className="inline-flex h-16 items-center justify-center gap-2 rounded-[40px_8px_40px_8px] bg-[#0d3a27] px-10 text-base font-bold text-white transition duration-[400ms] ease-out hover:bg-[#071f15] active:scale-[0.98]"
                >
                  Join Prayer Watch
                  <ArrowRight size={20} weight="bold" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-16 items-center justify-center rounded-[40px_8px_40px_8px] border border-[#b8c1bb] bg-white px-10 text-base font-bold text-[#07120d] transition duration-[400ms] ease-out hover:border-[#cfb45f] active:scale-[0.98]"
                >
                  Send Prayer Request
                </Link>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="architectural-band relative -my-10 lg:-my-20 z-10 min-h-[620px] overflow-hidden bg-[#07120d] shadow-[0_40px_100px_rgba(6,16,12,0.3)]">
              <Image
                src="/brand/watchman-opanin-thomas.png"
                alt="Chief Prayer Warrior Watchman Opanin Thomas"
                fill
                priority
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,12,0.78),rgba(6,16,12,0.1)_48%,rgba(6,16,12,0.76)),linear-gradient(180deg,transparent_45%,rgba(6,16,12,0.9))]" />
              <div className="absolute bottom-10 left-8 right-12 text-white sm:left-12">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#cfb45f]">
                  Watchful leadership
                </p>
                <h2 className="font-display tracking-tighter mt-3 max-w-xl text-5xl font-bold leading-none sm:text-6xl">
                  Watchman Opanin Thomas
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#06100c] px-5 py-16 text-white lg:py-32 sm:px-8 lg:px-10">
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
          <div className="glass-panel-dark rounded-[2.25rem] p-7 lg:p-10">
            <p className="text-xl leading-9 text-[#f3f6f3]">{thomasBio}</p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:py-32 sm:px-8 lg:px-10">
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
                className="glass-panel rounded-[2rem] p-6 transition duration-[400ms] ease-out hover:-translate-y-1"
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

      <section className="relative overflow-hidden px-5 py-16 lg:py-32 sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#cdd8d0,#e6ebe7_45%,#bfcac3)]" />
        <div className="relative mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="glass-panel rounded-[2.25rem] p-7 lg:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0d3a27]">
              Vision
            </p>
            <h2 className="font-display tracking-tighter mt-5 text-4xl font-light leading-none sm:text-5xl">
              {visionStatement}
            </h2>
          </div>
          <div className="glass-panel-dark rounded-[2.25rem] p-7 text-white lg:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#cfb45f]">
              Mission
            </p>
            <p className="mt-5 max-w-4xl text-xl leading-9 text-[#edf1ee]">
              {missionStatement}
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:py-32 sm:px-8 lg:px-10 ">
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
                  className="glass-panel group min-h-80 rounded-[2rem] p-6 transition duration-[400ms] ease-out hover:-translate-y-1 hover:border-[#cfb45f]"
                >
                  <div className="flex h-16 w-14 items-center justify-center rounded-[40px_8px_40px_8px] bg-[#edf1ee] text-[#0d3a27]">
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

      <section className="bg-[linear-gradient(135deg,#07120d,#0d3a27_58%,#030604)] px-5 py-16 lg:py-32 text-white sm:px-8 lg:px-10 ">
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
                className="glass-panel-dark grid gap-4 rounded-[1.75rem] p-5 transition duration-[400ms] ease-out hover:bg-white/[0.14] sm:grid-cols-[12rem_1fr]"
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

      <section className="px-5 py-16 lg:py-32 sm:px-8 lg:px-10">
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
                className="glass-panel min-h-72 rounded-[2rem] p-6"
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
