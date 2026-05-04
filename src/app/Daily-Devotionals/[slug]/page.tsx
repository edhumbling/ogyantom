import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { RichPortableText } from "@/components/RichPortableText";
import { SanityImage } from "@/components/SanityImage";
import { SanityShareGrid } from "@/components/SanityShareGrid";
import { absoluteUrl } from "@/lib/seo";
import { formatDevotionalDate } from "@/lib/dailyDevotionalContent";
import { seededDailyDevotionals } from "@/lib/dailyDevotionalSeed";
import { sanityFetch } from "@/sanity/client";
import { buildContentMetadata } from "@/sanity/metadata";
import { dailyDevotionalBySlugQuery } from "@/sanity/queries";
import type { DailyDevotional } from "@/sanity/types";

export const revalidate = 60;

type DailyDevotionalPageProps = {
  params: Promise<{ slug: string }>;
};

async function getDailyDevotional(slug: string) {
  const devotional = await sanityFetch<DailyDevotional | null>(
    dailyDevotionalBySlugQuery,
    { slug },
    null,
  );

  return devotional || seededDailyDevotionals.find((item) => item.slug === slug) || null;
}

export async function generateMetadata({ params }: DailyDevotionalPageProps) {
  const { slug } = await params;
  const devotional = await getDailyDevotional(slug);
  const title = devotional ? devotional.title : "Daily Devotional";

  return buildContentMetadata({
    title,
    description: devotional?.excerpt,
    image: devotional?.mainImage,
    imageAlt: devotional?.title,
    path: `/Daily-Devotionals/${slug}`,
  });
}

export default async function DailyDevotionalPage({ params }: DailyDevotionalPageProps) {
  const { slug } = await params;
  const devotional = await getDailyDevotional(slug);

  if (!devotional) {
    return (
      <main className="bg-[#e6ebe7] px-5 pt-36 pb-20 text-[#07120d] sm:px-8 lg:px-10 lg:pt-48">
        <div className="glass-panel mx-auto max-w-4xl p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0d3a27]">
            Daily Devotional
          </p>
          <h1 className="font-display mt-5 text-5xl font-light leading-none tracking-normal">
            This devotional is not published yet.
          </h1>
          <Link
            href="/Daily-Devotionals"
            className="mt-8 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-[#0d3a27]"
          >
            <ArrowLeft size={18} weight="bold" />
            Back to Daily Fire
          </Link>
        </div>
      </main>
    );
  }

  const devotionalUrl = absoluteUrl(`/Daily-Devotionals/${slug}`);

  return (
    <main className="testimony-page">
      <article>
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
              <Link href="/Daily-Devotionals" className="testimony-kicker">
                <ArrowLeft size={18} weight="bold" />
                Daily Fire
              </Link>
              <h1>{devotional.title}</h1>
              {devotional.excerpt ? <p>{devotional.excerpt}</p> : null}
              <p className="testimony-hero-meta">
                {[
                  formatDevotionalDate(devotional.devotionalDate),
                  devotional.readTime,
                  devotional.scripture,
                ]
                  .filter(Boolean)
                  .join(" / ")}
              </p>
            </div>
          </div>
        </section>

        <section className="sanity-detail-section">
          <div className="sanity-detail-shell sanity-detail-shell-single">
            <SanityShareGrid
              title={devotional.title}
              text={devotional.excerpt}
              url={devotionalUrl}
            />

            <p className="daily-devotional-coauthor">
              Co-Written with {devotional.coAuthor || "Watchman Opanin Thomas"}
            </p>

            <figure className="sanity-detail-media">
              <SanityImage
                image={devotional.mainImage}
                altFallback={devotional.title}
                width={1400}
                height={820}
              />
            </figure>

            <div className="prose-prayer sanity-detail-prose">
              <RichPortableText
                value={devotional.body}
                emptyText="This devotional has been published without body content."
              />
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
