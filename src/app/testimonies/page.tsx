import Link from "next/link";
import { ArrowRight, Megaphone } from "@phosphor-icons/react/dist/ssr";

const testimonies = [
  "Answered prayer strengthens the whole army.",
  "Testimonies are recorded with care and shared with wisdom.",
  "Every story points people back to faithful prayer.",
];

export default function TestimoniesPage() {
  return (
    <main className="bg-[#e6ebe7] pt-36 lg:pt-48 text-[#07120d]">
      <section className="px-5 pb-16 lg:pb-32 sm:px-8 lg:px-10 ">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0d3a27]">
            Testimonies
          </p>
          <h1 className="font-display tracking-tighter mt-4 max-w-5xl text-6xl font-light leading-none sm:text-7xl">
            Answered prayer deserves a designed place.
          </h1>
        </div>
      </section>

      <section className="px-5 pb-20 lg:pb-32 sm:px-8 lg:px-10 ">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {testimonies.map((item) => (
            <article
              key={item}
              className="glass-panel min-h-72 rounded-[2.25rem] p-7"
            >
              <Megaphone size={34} weight="bold" className="text-[#0d3a27]" />
              <p className="mt-12 text-2xl font-bold leading-8">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,#cdd8d0,#e6ebe7)] px-5 py-16 lg:py-32 sm:px-8 lg:px-10 ">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-display tracking-tighter max-w-3xl text-5xl font-light leading-none">
            Have a testimony from the watch?
          </h2>
          <Link
            href="/contact"
            className="inline-flex h-16 w-fit items-center gap-2 rounded-[40px_8px_40px_8px] bg-[#0d3a27] px-10 font-bold text-white"
          >
            Share it
            <ArrowRight size={20} weight="bold" />
          </Link>
        </div>
      </section>
    </main>
  );
}
