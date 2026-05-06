import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
} from "@phosphor-icons/react/dist/ssr";
import { coreValues, getCoreValueBySlug, opaninFullName } from "@/lib/site";
import styles from "./core-value-detail.module.css";

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

  const valueNumber = coreValues.findIndex((item) => item.slug === value.slug) + 1;

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="core-value-title">
        <div className={styles.heroMedia} aria-hidden="true">
          <Image
            src="/brand/watchman-opanin-thomas.png"
            alt={opaninFullName}
            fill
            sizes="100vw"
            className="object-cover object-[50%_top] lg:object-contain lg:object-right"
            priority
          />
        </div>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>
              Core Value {valueNumber} of {coreValues.length}
            </p>
            <h1 id="core-value-title">{value.deepTitle}</h1>
            <p className={styles.heroLede}>{value.text}</p>
            <p className={styles.scriptureLine}>{value.scripture}</p>
            <div className={styles.actions} aria-label="Core value navigation">
              <Link href="/prayer-army" className={styles.primaryAction}>
                <span>Enter Prayer Army</span>
                <ArrowRight size={18} weight="bold" aria-hidden="true" />
              </Link>
              <Link href="/ministry" className={styles.secondaryAction}>
                <ArrowLeft size={17} weight="bold" aria-hidden="true" />
                <span>Back to Ministry</span>
              </Link>
            </div>
          </div>

          <aside className={styles.heroPanel} aria-label="Core value summary">
            <span>Value Focus</span>
            <p>{value.title}</p>
          </aside>
        </div>
      </section>

      <section
        className={styles.detailBand}
        aria-labelledby="core-value-why-title"
      >
        <div className={styles.detailGrid}>
          <aside className={styles.whyCard}>
            <div className={styles.icon} aria-hidden="true">
              <BookOpenText size={32} weight="bold" />
            </div>
            <p className={styles.sectionKicker}>Why It Matters</p>
            <h2 id="core-value-why-title">{value.title}</h2>
            <p className={styles.cardCopy}>
              {value.scripture}
            </p>
          </aside>

          <article
            className={styles.resonanceCard}
            aria-labelledby="core-value-resonance-title"
          >
            <p className={styles.sectionKicker}>Resonance With the Army</p>
            <h2 id="core-value-resonance-title">
              The conviction behind this value.
            </h2>
            <p className={styles.resonanceCopy}>{value.armyResonance}</p>

            <ul
              className={styles.principleList}
              aria-label={`${value.title} principles`}
            >
              {value.principles.map((principle, index) => (
                <li key={principle}>
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <p>{principle}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section
        className={styles.practiceBand}
        aria-labelledby="core-value-practice-title"
      >
        <div className={styles.practiceShell}>
          <div>
            <p className={styles.sectionKicker}>Army Practice</p>
            <h2 id="core-value-practice-title">
              How this value lives in the army.
            </h2>
            <p>{value.practice}</p>
          </div>
          <div className={styles.practiceActions}>
            <Link
              href="/prayer-army"
              className={`${styles.primaryAction} ${styles.primaryActionDark}`}
            >
              <span>Prayer Army</span>
              <ArrowRight size={18} weight="bold" aria-hidden="true" />
            </Link>
            <Link href="/ministry" className={styles.secondaryAction}>
              <ArrowLeft size={17} weight="bold" aria-hidden="true" />
              <span>Ministry</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
