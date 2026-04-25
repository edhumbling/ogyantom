import Image from "next/image";
import { HandHeart, MapPin } from "@phosphor-icons/react/dist/ssr";
import { SanityImage } from "@/components/SanityImage";
import { sanityFetch } from "@/sanity/client";
import { philanthropyQuery } from "@/sanity/queries";
import type { PhilanthropyUpdate } from "@/sanity/types";

export const metadata = {
  title: "Philanthropy | Ogya Ntom Prayer Army",
  description:
    "Giving updates from Ogya Ntom Prayer Army highlighting support to widows, orphans, and vulnerable families.",
};

export const revalidate = 60;

function formatDate(value?: string) {
  if (!value) return "Recent update";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function PhilanthropyPage() {
  const updates = await sanityFetch<PhilanthropyUpdate[]>(philanthropyQuery, {}, []);

  return (
    <main className="bg-[#e6ebe7] text-[#07120d]">
      <section className="hero-shell hero-start hero-wine-accent border-b border-white/10 px-5 pb-16 sm:px-8 lg:px-10 lg:pb-28">
        <div className="hero-media">
          <Image
            src="/brand/watchman-opanin-thomas.png"
            alt="Watchman Opanin Thomas"
            fill
            sizes="100vw"
            className="object-cover object-[52%_top] lg:object-contain lg:object-right lg:scale-[0.94]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_14%_10%,rgba(109,18,55,0.38),rgba(109,18,55,0.08)_30%,transparent_58%),linear-gradient(138deg,rgba(7,18,13,0.34),rgba(13,58,39,0.36)_56%,rgba(3,6,4,0.72))]" />
        </div>
        <div className="hero-content mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="inline-flex border border-[rgba(207,180,95,0.58)] bg-[#07120d]/55 px-3 py-2 text-[0.7rem] font-bold tracking-[0.16em] text-[#f4e7b5]">
              Philanthropy
            </p>
            <p className="hero-script mt-5">Love in action beyond the altar</p>
            <h1 className="font-display mt-5 max-w-[12ch] text-5xl font-light leading-[0.9] text-white sm:text-7xl">
              Giving updates for widows, orphans, and families.
            </h1>
          </div>
          <p className="max-w-2xl text-xl leading-8 text-[#deebe4]">
            This is where Thomas and the prayer family document practical compassion:
            food support, care packages, medical help, school needs, and outreach.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 pt-16 sm:px-8 lg:px-10 lg:pb-32 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          {updates.length === 0 ? (
            <div className="glass-panel-dark p-8 text-white lg:p-12">
              <HandHeart size={42} weight="fill" className="text-[var(--gold)]" />
              <h2 className="font-display mt-8 text-5xl font-light leading-none tracking-tighter">
                Philanthropy updates are ready for Sanity.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#dfe6e1]">
                Publish a Philanthropy Update in Sanity Studio to show each act of giving
                and community impact here.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              {updates.map((item, index) => (
                <article
                  key={item._id}
                  className="glass-panel grid overflow-hidden lg:grid-cols-[0.86fr_1.14fr]"
                >
                  <div className="relative min-h-[22rem] overflow-hidden bg-[#07120d]">
                    <SanityImage
                      image={item.image}
                      altFallback={item.title}
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(3,6,4,0.72))]" />
                  </div>

                  <div className="p-7 lg:p-10">
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-2 border border-[rgba(7,18,13,0.14)] bg-white/70 px-4 py-2 text-sm font-bold text-[#0d3a27]">
                        <HandHeart size={18} weight="fill" />
                        {item.beneficiary || "Community"}
                      </span>
                      <span className="inline-flex items-center gap-2 border border-[rgba(7,18,13,0.14)] bg-white/70 px-4 py-2 text-sm font-bold text-[#0d3a27]">
                        {formatDate(item.publishedAt)}
                      </span>
                    </div>

                    <h2 className="font-display mt-7 text-5xl font-light leading-none tracking-tighter">
                      {item.title}
                    </h2>

                    {item.summary ? (
                      <p className="mt-5 max-w-2xl text-lg leading-8 text-[#53635a]">
                        {item.summary}
                      </p>
                    ) : null}

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <span className="inline-flex items-center gap-2 border border-[rgba(7,18,13,0.14)] bg-white/72 px-4 py-3 text-sm font-semibold text-[#1e352b]">
                        <MapPin size={18} weight="bold" />
                        {item.location || "Community outreach location"}
                      </span>
                      <span className="inline-flex items-center gap-2 border border-[rgba(7,18,13,0.14)] bg-white/72 px-4 py-3 text-sm font-semibold text-[#1e352b]">
                        {item.donationValue || "Donation details published by ministry"}
                      </span>
                    </div>

                    {item.impact ? (
                      <p className="mt-6 border-l-2 border-[var(--wine)] pl-4 text-base leading-8 text-[#31473d]">
                        {item.impact}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
