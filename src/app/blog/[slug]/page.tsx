import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { RichPortableText } from "@/components/RichPortableText";
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
  const title = post ? post.title : "Blog Post";

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
    <main className="testimony-page">
      <article>
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
              <Link
                href="/blog"
                className="testimony-kicker"
              >
                <ArrowLeft size={18} weight="bold" />
                Blog
              </Link>
              <h1>{post.title}</h1>
              {post.excerpt ? (
                <p>{post.excerpt}</p>
              ) : null}
              <p className="testimony-hero-meta">{formatDate(post.publishedAt)}</p>
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
