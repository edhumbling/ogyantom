import Image from "next/image";
import {
  ArrowDown,
  Play,
} from "@phosphor-icons/react/dist/ssr";
import { TestimonyBrowser, type TestimonyEntry } from "@/components/TestimonyBrowser";
import { TestimonyForm } from "@/components/TestimonyForm";
import { sanityFetch } from "@/sanity/client";
import { publishedTestimoniesQuery } from "@/sanity/queries";
import type { Testimony } from "@/sanity/types";

const baselineTestimonies: TestimonyEntry[] = [
  {
    name: "Elizabeth Nkansah",
    title: "Finding Faith and Financial Freedom",
    highlight: "Faith and provision",
    content: [
      "I joined this community at a time when I felt lost, both spiritually and professionally. I was struggling to keep my head above water, and my heart was heavy with worry. But through our consistent community of prayers, something shifted inside me. I found a deep, personal faith in God that I never knew was possible.",
      "As my relationship with Him grew, He began to open doors I thought were permanently locked. Today, I stand here not just spiritually renewed, but with great financial freedom. God has provided for me in ways that exceed my expectations, and I am so grateful for the power of agreement in prayer!",
    ],
  },
  {
    name: "Abigail Acquah",
    title: "The God of Restoration",
    highlight: "Restoration and joy",
    content: [
      "For a long time, my heart was broken. I went through the pain of several miscarriages, and there were days when I wondered if I would ever hold a child of my own. It was a season of deep tears and testing. But I held onto the word of God and the prayers of this ministry.",
      "By the grace of God, the story has changed. The Lord has restored my joy and blessed me with two beautiful baby girls. He is truly the giver of life, and what He did for me, He can do for anyone. My arms are full, and my heart is overflowing with gratitude.",
    ],
  },
  {
    name: "Hannah Mensah",
    title: "An Unshakable Foundation",
    highlight: "Depth in prayer",
    content: [
      "Before I became part of this ministry, my prayer life was inconsistent and my faith was easily shaken by the storms of life. I wanted to be closer to God, but I didn't know how to stay grounded.",
      "Through the teachings and the fire of this community, I have gained a great prayer root. I no longer pray out of habit, but out of a deep connection with my Creator. My faith has become unshakable; no matter what comes my way, I know who I belong to. I am firm, I am focused, and I am deeply rooted in the Lord.",
    ],
  },
  {
    name: "Belinda Asantewaa",
    title: "Preserved by Prophecy",
    highlight: "Protection and prophecy",
    content: [
      "I am standing here today as a living testimony of God’s protective power. The enemy had a plan for my life through a terrible accident, but God went ahead of me. The danger was revealed by prophecy in this house, and because of that word, I was delivered from the snare of the enemy.",
      "Since that day, my life has not been the same. I feel a much deeper connection to God; I know now more than ever that He is watching over me. I am grateful for the gift of prophecy and the divine insurance I have through my walk with Him!",
    ],
  },
];

export const revalidate = 60;

export default async function TestimoniesPage() {
  const sanityTestimonies = await sanityFetch<Testimony[]>(
    publishedTestimoniesQuery,
    {},
    [],
  );
  const testimonies = [
    ...baselineTestimonies,
    ...sanityTestimonies.map((item) => ({
      name: item.name,
      title: item.title,
      highlight: item.highlight || "Member testimony",
      content: item.content
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
    })),
  ];
  return (
    <main className="testimony-page testimony-index-page">
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
            <p className="testimony-kicker">Member testimony wall</p>
            <h1>Proof of prayer, told by the people who lived it.</h1>
            <p>
              Stories from members who found God’s help, healing, depth, and
              preservation through this prayer community.
            </p>
            <div className="testimony-hero-actions">
              <a href="#share-testimony" className="testimony-glow-cta">
                <span className="relative z-10 flex items-center gap-2">
                  <Play size={16} weight="fill" />
                  Share testimony
                </span>
              </a>
              <a href="#testimony-ledger" className="testimony-secondary-cta">
                Browse testimonies
                <ArrowDown size={17} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="testimony-ledger" className="testimony-ledger-section">
        <div className="testimony-section-head">
          <div>
            <p className="testimony-kicker testimony-kicker-dark">Testimonies</p>
            <h2>Read the testimony ledger.</h2>
          </div>
          <p>
            Stories from the prayer family, shared for faith and encouragement.
          </p>
        </div>

        <TestimonyBrowser testimonies={testimonies} />
      </section>

      <section id="share-testimony" className="testimony-submit-section">
        <div className="testimony-submit-shell">
          <div className="testimony-submit-copy">
            <p className="testimony-kicker">Share testimony</p>
            <h2>If God has done it, let the house hear it.</h2>
            <p>
              Share your testimony with the ministry. Contact details are kept
              private and are not shown on the public page.
            </p>
          </div>

          <div className="testimony-form-panel">
            <TestimonyForm />
          </div>
        </div>
      </section>
    </main>
  );
}
