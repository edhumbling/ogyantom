import Image from "next/image";
import { BookOpenText } from "@phosphor-icons/react/dist/ssr";
import { SanityCardGrid, type SanityCardGridItem } from "@/components/SanityCardGrid";
import {
  buildSearchIndex,
  normalizeListSearchParams,
} from "@/lib/sanity-browser";
import {
  formatDevotionalDate,
} from "@/lib/dailyDevotionalContent";
import { seededDailyDevotionals } from "@/lib/dailyDevotionalSeed";
import { sanityFetch } from "@/sanity/client";
import { dailyDevotionalsQuery } from "@/sanity/queries";
import type { DailyDevotional } from "@/sanity/types";

export const metadata = {
  title: "Daily Fire",
  description:
    "Daily Fire devotionals with Scripture, reflection, prayer, and practice from Ogya Ntom Prayer Army.",
};

export const revalidate = 60;

type DailyDevotionalsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function withSeedFallback(items: DailyDevotional[]) {
  return items.length > 0 ? items : seededDailyDevotionals;
}

export default async function DailyDevotionalsPage({
  searchParams,
}: DailyDevotionalsPageProps) {
  const { page, query } = normalizeListSearchParams(await searchParams);
  const devotionals = withSeedFallback(
    await sanityFetch<DailyDevotional[]>(dailyDevotionalsQuery, {}, []),
  );
  const cards: SanityCardGridItem[] = devotionals.map((devotional) => ({
    id: devotional._id,
    href: `/Daily-Devotionals/${devotional.slug}`,
    title: devotional.title,
    eyebrow: formatDevotionalDate(devotional.devotionalDate),
    summary: devotional.excerpt,
    meta: devotional.theme,
    detailStrip:
      devotional.shareLine ||
      ["Share", devotional.readTime, devotional.scripture].filter(Boolean).join(" / "),
    coAuthor: devotional.coAuthor || "Watchman Opanin Thomas",
    actionLabel: "Read Devotional",
    cover: devotional.mainImage,
    searchText: buildSearchIndex([
      "daily devotional scripture prayer reflection practice",
      devotional.title,
      devotional.excerpt,
      devotional.theme,
      devotional.scripture,
      devotional.shareLine,
      devotional.coAuthor,
      formatDevotionalDate(devotional.devotionalDate),
    ]),
  }));

  return (
    <main className="testimony-page">
      <section className="testimony-hero">
        <div className="testimony-hero-media">
          <Image
            src="/brand/ogya-ntom-prayer-logo.png"
            alt="Ogya Ntom Prayer Army logo"
            fill
            sizes="100vw"
            className="object-contain object-center p-10 opacity-90 lg:object-contain lg:object-right lg:p-16"
            priority
          />
        </div>
        <div className="testimony-hero-inner">
          <div className="testimony-hero-copy">
            <p className="testimony-kicker">Daily Fire</p>
            <h1>Daily Fire for the watch.</h1>
            <p>
              Scripture, reflection, prayer, and a practical step for each day,
              co-written with Watchman Opanin Thomas for the Ogya Ntom Prayer Army.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          {cards.length === 0 ? (
            <div className="glass-panel-dark p-8 text-white lg:p-12">
              <BookOpenText size={40} weight="bold" className="text-[#cfb45f]" />
              <h2 className="font-display mt-8 text-5xl font-light leading-none tracking-normal">
                The first devotional is being prepared.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#dfe6e1]">
                A fresh devotional will appear here after the daily midnight automation runs.
              </p>
            </div>
          ) : (
            <SanityCardGrid
              items={cards}
              ariaLabel="daily devotionals"
              search={{
                basePath: "/Daily-Devotionals",
                label: "Search Daily Fire devotionals",
                placeholder: "Search devotionals...",
                query,
                resultLabel: "devotionals",
                totalCount: cards.length,
                quickSearches: ["Prayer", "Grace", "Faith", "Healing"],
              }}
              pagination={{
                page,
              }}
            />
          )}
        </div>
      </section>
    </main>
  );
}
