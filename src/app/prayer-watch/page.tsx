import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { prayerWatches } from "@/lib/site";

export default function PrayerWatchPage() {
  return (
    <main className="bg-[#e6ebe7] text-[#07120d]">
      <section className="hero-shell hero-start hero-wine-accent overflow-hidden border-b border-white/10">
        <div className="hero-media">
          <Image
            src="/brand/watchman-opanin-thomas.png"
            alt="Watchman Opanin Thomas"
            fill
            sizes="100vw"
            className="object-cover object-[52%_top] lg:object-contain lg:object-right lg:scale-[0.94]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(7,18,13,0.38),rgba(13,58,39,0.4),rgba(3,6,4,0.75))]" />
        </div>
        <div className="hero-content mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:px-10 lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#cfb45f]">
              Prayer Watch
            </p>
            <p className="hero-script mt-4">Stand in the gap</p>
            <h1 className="font-display tracking-tighter mt-4 max-w-4xl text-6xl font-light leading-none text-white sm:text-7xl">
              A clear rhythm for the prayer army.
            </h1>
          </div>
          <p className="max-w-2xl text-xl leading-8 text-[#dfe7e2]">
            The watch is structured so people know when to gather, what to carry,
            and how to stay spiritually alert through the day.
          </p>
        </div>
      </section>

      <section className="section-rule px-5 pb-20 pt-16 lg:pb-24 lg:pt-20 sm:px-8 lg:px-10 ">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {prayerWatches.map((watch, index) => (
            <article
              key={watch.title}
              className={`min-h-96 border p-7 ${
                index === 1
                  ? "glass-panel-dark text-white"
                  : "glass-panel text-[#07120d]"
              }`}
            >
              <CalendarBlank
                size={36}
                weight="bold"
                className={index === 1 ? "text-[#cfb45f]" : "text-[#0d3a27]"}
              />
              <p
                className={`mt-10 text-sm font-bold uppercase tracking-[0.25em] ${
                  index === 1 ? "text-[#cfb45f]" : "text-[#627069]"
                }`}
              >
                {watch.kicker}
              </p>
              <h2 className="mt-3 text-3xl font-bold">{watch.title}</h2>
              <p
                className={`mt-5 leading-7 ${
                  index === 1 ? "text-[#dfe6e1]" : "text-[#53635a]"
                }`}
              >
                {watch.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-rule bg-[#07120d] px-5 py-16 lg:py-24 text-white sm:px-8 lg:px-10 ">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-display tracking-tighter max-w-2xl text-5xl font-light leading-none">
            Bring your request into the watch.
          </h2>
          <Link
            href="/contact"
            className="site-button-primary w-fit text-sm uppercase tracking-[0.16em] sm:text-base"
          >
            Send Prayer Request
            <ArrowRight size={20} weight="bold" />
          </Link>
        </div>
      </section>
    </main>
  );
}
