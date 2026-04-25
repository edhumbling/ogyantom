import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenText } from "@phosphor-icons/react/dist/ssr";
import { SanityImage } from "@/components/SanityImage";
import { sanityFetch } from "@/sanity/client";
import { postsQuery } from "@/sanity/queries";
import type { Post } from "@/sanity/types";

export const metadata = {
  title: "Blog | Ogya Ntom Prayer Army",
  description:
    "Prayer teachings, devotionals, and ministry notes from Ogya Ntom Prayer Army.",
};

export const revalidate = 60;

function formatDate(value?: string) {
  if (!value) return "Ministry note";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function BlogPage() {
  const posts = await sanityFetch<Post[]>(postsQuery, {}, []);

  return (
    <main className="bg-[#e6ebe7] text-[#07120d]">
      <section className="hero-shell hero-start hero-wine-accent px-5 pb-16 sm:px-8 lg:px-10 lg:pb-28">
        <div className="hero-media">
          <Image
            src="/brand/watchman-opanin-thomas.png"
            alt="Watchman Opanin Thomas"
            fill
            sizes="100vw"
            className="object-cover object-[52%_top] lg:object-contain lg:object-right lg:scale-[0.94]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_12%_8%,rgba(109,18,55,0.34),rgba(109,18,55,0.08)_30%,transparent_56%),linear-gradient(135deg,rgba(7,18,13,0.32),rgba(13,58,39,0.34)_58%,rgba(3,6,4,0.62))]" />
        </div>
        <div className="hero-content mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="glass-chip inline-flex px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-[#0d3a27]">
              Prayer Blog
            </p>
            <p className="hero-script mt-5">Words from the prayer watch</p>
            <h1 className="font-display mt-7 max-w-4xl text-6xl font-light leading-none tracking-tighter sm:text-7xl">
              Teachings from the watch.
            </h1>
          </div>
          <p className="max-w-2xl text-xl leading-8 text-white/88">
            Devotionals, ministry letters, and practical encouragement for a
            life of intimacy, persistence, and bold prayer.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <div className="glass-panel-dark p-8 text-white lg:p-12">
              <BookOpenText size={40} weight="bold" className="text-[#cfb45f]" />
              <h2 className="font-display mt-8 text-5xl font-light leading-none tracking-tighter">
                Blog content is ready for Sanity.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#dfe6e1]">
                Open the local Studio, create a Blog Post, publish it, and it
                will appear here automatically.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug}`}
                  className={
                    "glass-panel group overflow-hidden transition duration-[180ms] ease-out hover:-translate-y-1 hover:border-[#cfb45f] " +
                    (index === 0 ? "lg:col-span-2" : "")
                  }
                >
                  <div className="relative min-h-[20rem] overflow-hidden bg-[#07120d]">
                    <SanityImage
                      image={post.mainImage}
                      altFallback={post.title}
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(3,6,4,0.78))]" />
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0d3a27]">
                      {formatDate(post.publishedAt)}
                    </p>
                    <h2 className="mt-4 text-3xl font-bold leading-tight text-[#07120d]">
                      {post.title}
                    </h2>
                    {post.excerpt ? (
                      <p className="mt-4 text-base leading-7 text-[#53635a]">
                        {post.excerpt}
                      </p>
                    ) : null}
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0d3a27]">
                      Read teaching
                      <ArrowRight
                        size={18}
                        weight="bold"
                        className="transition group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
