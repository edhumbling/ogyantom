import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpenText } from "@phosphor-icons/react/dist/ssr";
import { coreValues, getCoreValueBySlug, opaninFullName } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return coreValues.map((value) => ({ slug: value.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const value = getCoreValueBySlug(slug);

  if (!value) {
    return {
      title: "Core Value",
    };
  }

  return {
    title: `${value.title} | Core Values`,
    description: value.armyResonance,
  };
}

export default async function CoreValuePage({ params }: PageProps) {
  const { slug } = await params;
  const value = getCoreValueBySlug(slug);

  if (!value) {
    notFound();
  }

  return (
    <main className="testimony-page mobile-focus-detail">
      <section className="testimony-hero">
        <div className="testimony-hero-media">
          <Image
            src="/brand/watchman-opanin-thomas.png"
            alt={opaninFullName}
            fill
            sizes="100vw"
            className="object-cover object-[50%_top] lg:object-contain lg:object-right"
            priority
          />
        </div>
        <div className="testimony-hero-inner">
          <div className="testimony-hero-copy">
            <p className="testimony-kicker">Core Value</p>
            <h1>{value.deepTitle}</h1>
            <p className="mobile-flow-long">{value.text}</p>
            <p className="mobile-flow-summary">{value.scripture}</p>
            <div className="testimony-hero-actions">
              <Link href="/ministry" className="testimony-secondary-cta">
                <ArrowLeft size={17} weight="bold" />
                Back to Ministry
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="ministry-detail-section px-5 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="ministry-statement-card ministry-statement-card-light p-8">
            <div className="ministry-card-icon" aria-hidden="true">
              <BookOpenText size={32} weight="bold" />
            </div>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-[#0d3a27]">
              Why It Matters
            </p>
            <h2 className="font-display mt-5 text-4xl font-light leading-none tracking-tighter sm:text-5xl">
              {value.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#506157]">
              {value.scripture}
            </p>
          </aside>

          <article className="mobile-focus-resonance ministry-statement-card ministry-statement-card-dark p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#cfb45f]">
              Resonance With the Army
            </p>
            <p className="mobile-flow-long mt-5 text-xl leading-9">{value.armyResonance}</p>

            <div className="mt-8 grid gap-3">
              {value.principles.map((principle) => (
                <div key={principle} className="ministry-detail-point">
                  {principle}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="ministry-card-section section-rule px-5 pb-20 sm:px-8 lg:px-10">
        <div className="ministry-community-cta-shell mx-auto max-w-7xl">
          <div>
            <p className="ministry-community-kicker">Army Practice</p>
            <h2 className="font-display">How this value lives in the army.</h2>
            <p className="mobile-flow-long">{value.practice}</p>
          </div>
          <Link
            href="/prayer-army"
            className="ministry-community-action"
            aria-label="Open the Prayer Army page"
          >
            <span>Prayer Army</span>
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
