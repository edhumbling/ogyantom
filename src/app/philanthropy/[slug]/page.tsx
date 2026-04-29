import Link from "next/link";
import { ArrowLeft, HandHeart, MapPin } from "@phosphor-icons/react/dist/ssr";
import { RichPortableText } from "@/components/RichPortableText";
import { SanityImage } from "@/components/SanityImage";
import { sanityFetch } from "@/sanity/client";
import { buildContentMetadata } from "@/sanity/metadata";
import { philanthropyBySlugQuery } from "@/sanity/queries";
import type { PhilanthropyUpdate } from "@/sanity/types";

export const revalidate = 60;

type PhilanthropyUpdatePageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value?: string) {
  if (!value) return "Recent update";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export async function generateMetadata({ params }: PhilanthropyUpdatePageProps) {
  const { slug } = await params;
  const update = await sanityFetch<PhilanthropyUpdate | null>(
    philanthropyBySlugQuery,
    { slug },
    null,
  );
  const title = update?.title || "Philanthropy Update";

  return buildContentMetadata({
    title: `${title} | Ogya Ntom Prayer Army`,
    description: update?.summary,
    image: update?.image,
    imageAlt: title,
    path: `/philanthropy/${slug}`,
  });
}

export default async function PhilanthropyUpdatePage({ params }: PhilanthropyUpdatePageProps) {
  const { slug } = await params;
  const update = await sanityFetch<PhilanthropyUpdate | null>(
    philanthropyBySlugQuery,
    { slug },
    null,
  );

  if (!update) {
    return (
      <main className="bg-[#e6ebe7] px-5 pb-20 pt-36 text-[#07120d] sm:px-8 lg:px-10 lg:pt-48">
        <div className="glass-panel mx-auto max-w-4xl p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0d3a27]">
            Philanthropy
          </p>
          <h1 className="font-display mt-5 text-5xl font-light leading-none tracking-tighter">
            This philanthropy update is not published yet.
          </h1>
          <Link
            href="/philanthropy"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0d3a27]"
          >
            <ArrowLeft size={18} weight="bold" />
            Back to philanthropy
          </Link>
        </div>
      </main>
    );
  }

  const title = update.title || "Untitled philanthropy update";

  return (
    <main className="bg-[#e6ebe7] text-[#07120d]">
      <article>
        <section className="hero-shell hero-start hero-wine-accent overflow-hidden border-b border-white/10">
          <div className="hero-media">
            <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_90%_0%,rgba(207,180,95,0.22),transparent_32%),linear-gradient(135deg,#07120d_0%,#0d3a27_52%,#030604_100%)]" />
          </div>
          <div className="hero-content mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:px-10">
            <div>
              <Link
                href="/philanthropy"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#cfb45f]"
              >
                <ArrowLeft size={18} weight="bold" />
                Philanthropy
              </Link>
              <p className="hero-script mt-5">Love in action</p>
              <h1 className="font-display mt-6 text-6xl font-light leading-none tracking-tighter text-white sm:text-7xl">
                {title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 border border-white/15 bg-white/8 px-4 py-2 text-sm font-bold text-white/82">
                  <HandHeart size={18} weight="fill" />
                  {update.beneficiary || "Community"}
                </span>
                <span className="inline-flex items-center gap-2 border border-white/15 bg-white/8 px-4 py-2 text-sm font-bold text-white/82">
                  {formatDate(update.publishedAt)}
                </span>
              </div>
              {update.summary ? (
                <p className="mt-6 max-w-2xl text-xl leading-8 text-white/86">
                  {update.summary}
                </p>
              ) : null}
            </div>

            <div className="architectural-band relative min-h-[34rem] overflow-hidden bg-[#07120d]">
              <SanityImage image={update.image} altFallback={title} priority />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(3,6,4,0.68))]" />
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 pt-12 sm:px-8 lg:px-10 lg:pb-32 lg:pt-16">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.68fr_0.32fr] lg:items-start">
            <div className="glass-panel p-7 sm:p-10">
              <div className="prose-prayer">
                <RichPortableText
                  value={update.body}
                  emptyText="This update has been published without full body content."
                />
              </div>
            </div>

            <aside className="glass-panel p-6">
              <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-[#0d3a27]">
                Update details
              </h2>
              <div className="mt-5 grid gap-3 text-sm leading-6 text-[#31473d]">
                <p className="flex gap-2 border-b border-[var(--line)] pb-3">
                  <MapPin size={18} weight="bold" className="mt-1 shrink-0 text-[#0d3a27]" />
                  <span>{update.location || "Location not specified"}</span>
                </p>
                <p className="border-b border-[var(--line)] pb-3">
                  <strong className="block text-[#07120d]">Donation value</strong>
                  {update.donationValue || "Donation details not specified"}
                </p>
                {update.impact ? (
                  <p>
                    <strong className="block text-[#07120d]">Impact</strong>
                    {update.impact}
                  </p>
                ) : null}
              </div>
            </aside>
          </div>
        </section>
      </article>
    </main>
  );
}
