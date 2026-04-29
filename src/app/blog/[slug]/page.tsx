import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { RichPortableText } from "@/components/RichPortableText";
import { SanityImage } from "@/components/SanityImage";
import { sanityFetch } from "@/sanity/client";
import { buildContentMetadata } from "@/sanity/metadata";
import { postBySlugQuery } from "@/sanity/queries";
import type { Post } from "@/sanity/types";

export const revalidate = 60;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value?: string) {
  if (!value) return "Ministry note";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>(postBySlugQuery, { slug }, null);
  const title = post ? `${post.title} | Ogya Ntom Prayer Army` : "Blog Post";

  return buildContentMetadata({
    title,
    description: post?.excerpt,
    image: post?.mainImage,
    imageAlt: post?.title,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await sanityFetch<Post | null>(postBySlugQuery, { slug }, null);

  if (!post) {
    return (
      <main className="bg-[#e6ebe7] px-5 pt-36 pb-20 text-[#07120d] sm:px-8 lg:px-10 lg:pt-48">
        <div className="glass-panel mx-auto max-w-4xl rounded-[2.25rem] p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0d3a27]">
            Blog
          </p>
          <h1 className="font-display mt-5 text-5xl font-light leading-none tracking-tighter">
            This teaching is not published yet.
          </h1>
          <Link
            href="/blog"
            className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0d3a27]"
          >
            <ArrowLeft size={18} weight="bold" />
            Back to blog
          </Link>
        </div>
      </main>
    );
  }

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
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#cfb45f]"
              >
                <ArrowLeft size={18} weight="bold" />
                Blog
              </Link>
              <p className="hero-script mt-5">Teaching from the watch</p>
              <h1 className="font-display mt-6 text-6xl font-light leading-none tracking-tighter text-white sm:text-7xl">
                {post.title}
              </h1>
              <p className="mt-6 text-base font-bold uppercase tracking-[0.18em] text-white/72">
                {formatDate(post.publishedAt)}
              </p>
              {post.excerpt ? (
                <p className="mt-6 max-w-2xl text-xl leading-8 text-white/86">
                  {post.excerpt}
                </p>
              ) : null}
            </div>

            <div className="architectural-band relative min-h-[34rem] overflow-hidden bg-[#07120d]">
              <SanityImage image={post.mainImage} altFallback={post.title} priority />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(3,6,4,0.68))]" />
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 pt-12 sm:px-8 lg:px-10 lg:pb-32 lg:pt-16">
          <div className="glass-panel mx-auto max-w-4xl rounded-[2.25rem] p-7 sm:p-10">
            <div className="prose-prayer">
              <RichPortableText
                value={post.body}
                emptyText="This post has been published without body content."
              />
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
