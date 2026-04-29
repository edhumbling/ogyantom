import Image from "next/image";
import { BookOpenText } from "@phosphor-icons/react/dist/ssr";
import { SanityCardGrid, type SanityCardGridItem } from "@/components/SanityCardGrid";
import {
  buildSearchIndex,
  filterSanityCards,
  normalizeListSearchParams,
  paginateSanityCards,
} from "@/lib/sanity-browser";
import { sanityFetch } from "@/sanity/client";
import { postsQuery } from "@/sanity/queries";
import type { Post } from "@/sanity/types";

export const metadata = {
  title: "Blog",
  description:
    "Prayer teachings, devotionals, and ministry notes from Ogya Ntom Prayer Army.",
};

export const revalidate = 60;

type BlogPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function formatDate(value?: string) {
  if (!value) return "Ministry note";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page, query } = normalizeListSearchParams(await searchParams);
  const posts = await sanityFetch<Post[]>(postsQuery, {}, []);
  const cards: SanityCardGridItem[] = posts.map((post) => ({
    id: post._id,
    href: `/blog/${post.slug}`,
    title: post.title,
    eyebrow: formatDate(post.publishedAt),
    summary: post.excerpt,
    meta: post.categories?.join(" / "),
    actionLabel: "Read Teaching",
    cover: post.mainImage,
    searchText: buildSearchIndex([
      "prayer teaching devotional blog ministry note",
      post.title,
      post.excerpt,
      post.categories,
      formatDate(post.publishedAt),
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
            <p className="testimony-kicker">Prayer Blog</p>
            <h1>Teachings from the watch.</h1>
            <p>
              Devotionals, ministry letters, and practical encouragement for a
              life of intimacy, persistence, and bold prayer.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <div className="glass-panel-dark p-8 text-white lg:p-12">
              <BookOpenText size={40} weight="bold" className="text-[#cfb45f]" />
              <h2 className="font-display mt-8 text-5xl font-light leading-none tracking-tighter">
                New teachings are being prepared.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#dfe6e1]">
                Prayer teachings, devotionals, and ministry notes will be shared
                here as they are released.
              </p>
            </div>
          ) : (
            <SanityCardGrid
              items={pagedCards.pageItems}
              ariaLabel="blog posts"
              search={{
                basePath: "/blog",
                label: "Search prayer teachings",
                placeholder: "Search prayer teachings…",
                query,
                resultLabel: "teachings",
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
