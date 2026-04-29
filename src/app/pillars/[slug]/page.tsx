import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { armyPillars, getArmyPillarBySlug, opaninFullName } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return armyPillars.map((pillar) => ({ slug: pillar.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pillar = getArmyPillarBySlug(slug);

  if (!pillar) {
    return {
      title: "Pillar",
    };
  }

  return {
    title: `${pillar.title} | Pillars`,
    description: pillar.armyResonance,
  };
}

export default async function PillarPage({ params }: PageProps) {
  const { slug } = await params;
  const pillar = getArmyPillarBySlug(slug);

  if (!pillar) {
    notFound();
  }

  return (
    <main className="testimony-page">
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
            <p className="testimony-kicker">Prayer Army Pillar</p>
            <h1>{pillar.deepTitle}</h1>
            <p>{pillar.text}</p>
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
          <aside className="ministry-principle-card ministry-principle-card-light p-8">
            <div className="ministry-card-icon" aria-hidden="true">
              <ShieldCheck size={32} weight="bold" />
            </div>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-[#0d3a27]">
              Pillar
            </p>
            <h2 className="mt-5 text-4xl font-bold">{pillar.title}</h2>
            <p className="mt-5 text-lg leading-8">{pillar.text}</p>
          </aside>

          <article className="ministry-principle-card ministry-principle-card-dark p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#cfb45f]">
              Resonance With the Army
            </p>
            <p className="mt-5 text-xl leading-9">{pillar.armyResonance}</p>

            <div className="mt-8 grid gap-3">
              {pillar.principles.map((principle) => (
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
            <p className="ministry-community-kicker">How It Works</p>
            <h2 className="font-display">How this pillar carries the army.</h2>
            <p>{pillar.practice}</p>
          </div>
          <Link
            href="/prayer-request"
            className="ministry-community-action"
            aria-label="Open the prayer request page"
          >
            <span>Prayer Request</span>
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
