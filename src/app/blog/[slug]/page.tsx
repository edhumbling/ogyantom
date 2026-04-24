import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { SanityImage } from "@/components/SanityImage";
import { sanityFetch } from "@/sanity/client";
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

  return {
    title: post ? `${post.title} | Ogya Ntom Prayer Army` : "Blog Post",
    description: post?.excerpt,
  };
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
    <main className="bg-[#e6ebe7] pt-36 text-[#07120d] lg:pt-48">
      <article>
        <section className="px-5 pb-12 sm:px-8 lg:px-10">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#0d3a27]"
              >
                <ArrowLeft size={18} weight="bold" />
                Blog
              </Link>
              <h1 className="font-display mt-6 text-6xl font-light leading-none tracking-tighter sm:text-7xl">
                {post.title}
              </h1>
              <p className="mt-6 text-base font-bold uppercase tracking-[0.18em] text-[#53635a]">
                {formatDate(post.publishedAt)}
              </p>
              {post.excerpt ? (
                <p className="mt-6 max-w-2xl text-xl leading-8 text-[#405247]">
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

        <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-32">
          <div className="glass-panel mx-auto max-w-4xl rounded-[2.25rem] p-7 sm:p-10">
            <div className="prose-prayer">
              {post.body ? (
                <PortableText value={post.body} />
              ) : (
                <p>This post has been published without body content.</p>
              )}
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
