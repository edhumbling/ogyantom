import Link from "next/link";
import { ArrowRight, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { prayerWatches } from "@/lib/site";

export default function PrayerWatchPage() {
  return (
    <main className="bg-[#e6ebe7] pt-36 lg:pt-48 text-[#07120d]">
      <section className="px-5 pb-16 lg:pb-32 sm:px-8 lg:px-10 ">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0d3a27]">
              Prayer Watch
            </p>
            <h1 className="font-display tracking-tighter mt-4 max-w-4xl text-6xl font-light leading-none sm:text-7xl">
              A clear rhythm for the prayer army.
            </h1>
          </div>
          <p className="max-w-2xl text-xl leading-8 text-[#4f5d55]">
            The watch is structured so people know when to gather, what to carry,
            and how to stay spiritually alert through the day.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 lg:pb-32 sm:px-8 lg:px-10 ">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">
          {prayerWatches.map((watch, index) => (
            <article
              key={watch.title}
              className={`min-h-96 rounded-[2.5rem] border p-7 ${
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

      <section className="bg-[#07120d] px-5 py-16 lg:py-32 text-white sm:px-8 lg:px-10 ">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-display tracking-tighter max-w-2xl text-5xl font-light leading-none">
            Bring your request into the watch.
          </h2>
          <Link
            href="/contact"
            className="inline-flex h-16 w-fit items-center gap-2 rounded-[40px_8px_40px_8px] bg-[#cfb45f] px-10 font-bold text-[#07120d]"
          >
            Send Prayer Request
            <ArrowRight size={20} weight="bold" />
          </Link>
        </div>
      </section>
    </main>
  );
}
