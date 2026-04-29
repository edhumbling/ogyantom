import Image from "next/image";
import { HandHeart } from "@phosphor-icons/react/dist/ssr";
import { SanityCardGrid, type SanityCardGridItem } from "@/components/SanityCardGrid";
import {
  buildSearchIndex,
  filterSanityCards,
  normalizeListSearchParams,
  paginateSanityCards,
} from "@/lib/sanity-browser";
import { sanityFetch } from "@/sanity/client";
import { philanthropyQuery } from "@/sanity/queries";
import type { PhilanthropyUpdate } from "@/sanity/types";

export const metadata = {
  title: "Philanthropy",
  description:
    "Giving updates from Ogya Ntom Prayer Army highlighting support to widows, orphans, and vulnerable families.",
};

export const revalidate = 60;

type PhilanthropyPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function formatDate(value?: string) {
  if (!value) return "Recent update";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function PhilanthropyPage({ searchParams }: PhilanthropyPageProps) {
  const { page, query } = normalizeListSearchParams(await searchParams);
  const updates = await sanityFetch<PhilanthropyUpdate[]>(philanthropyQuery, {}, []);
  const cards: SanityCardGridItem[] = updates.map((item) => ({
    id: item._id,
    href: item.slug ? `/philanthropy/${item.slug}` : undefined,
    title: item.title || "Untitled Philanthropy Update",
    eyebrow: item.beneficiary || "Community",
    summary: item.summary,
    meta: [formatDate(item.publishedAt), item.location, item.donationValue]
      .filter(Boolean)
      .join(" / "),
    actionLabel: "Read Update",
    cover: item.image,
    searchText: buildSearchIndex([
      "philanthropy giving outreach widows orphans families elderly community",
      item.title,
      item.summary,
      item.beneficiary,
      item.location,
      item.donationValue,
      item.impact,
      formatDate(item.publishedAt),
    ]),
  }));
  const filteredCards = filterSanityCards(cards, query);
  const pagedCards = paginateSanityCards(filteredCards, page);

  return (
    <main className="testimony-page">
      <section className="testimony-hero">
        <div className="testimony-hero-media">
          <Image
            src="/brand/watchman-opanin-thomas.png"
            alt="Watchman Opanin Thomas"
            fill
            sizes="100vw"
            className="object-cover object-[50%_top] lg:object-contain lg:object-right"
            priority
          />
        </div>
        <div className="testimony-hero-inner">
          <div className="testimony-hero-copy">
            <p className="testimony-kicker">Philanthropy</p>
            <h1>Giving updates for widows, orphans, and families.</h1>
            <p>
              Practical compassion through food support, care packages, medical
              help, school needs, and community outreach.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 pt-16 sm:px-8 lg:px-10 lg:pb-32 lg:pt-20">
        <div className="mx-auto max-w-7xl">
          {updates.length === 0 ? (
            <div className="glass-panel-dark p-8 text-white lg:p-12">
              <HandHeart size={42} weight="fill" className="text-[var(--gold)]" />
              <h2 className="font-display mt-8 text-5xl font-light leading-none tracking-tighter">
                Giving updates are being prepared.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#dfe6e1]">
                Stories of support, care, and community impact will be shared
                here as ministry outreach continues.
              </p>
            </div>
          ) : (
            <SanityCardGrid
              items={pagedCards.pageItems}
              ariaLabel="philanthropy updates"
              search={{
                basePath: "/philanthropy",
                label: "Search philanthropy updates",
                placeholder: "Search giving updates…",
                query,
                resultLabel: "updates",
                totalCount: filteredCards.length,
              }}
              pagination={{
                page: pagedCards.page,
                pageCount: pagedCards.pageCount,
              }}
            />
          )}
        </div>
      </section>
    </main>
  );
}
