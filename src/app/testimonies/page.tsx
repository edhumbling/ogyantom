import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const testimonies = [
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

export default function TestimoniesPage() {
  return (
    <main className="bg-[#f7f4ee] text-[#0b1d16]">
      <section className="hero-shell hero-start hero-wine-accent px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        <div className="hero-media">
          <Image
            src="/brand/watchman-opanin-thomas.png"
            alt="Watchman Opanin Thomas"
            fill
            sizes="100vw"
            className="object-cover object-[52%_top] lg:object-contain lg:object-right lg:scale-[0.94]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_12%_8%,rgba(109,18,55,0.42),rgba(109,18,55,0.08)_32%,transparent_58%),linear-gradient(140deg,rgba(7,18,13,0.34),rgba(15,92,70,0.34)_56%,rgba(3,6,4,0.74))]" />
        </div>
        <div className="hero-content mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="inline-flex border border-[#d4af5d]/55 bg-white/78 px-4 py-2 text-sm font-bold uppercase tracking-[0.24em] text-[#6d1237] shadow-[0_10px_30px_rgba(109,18,55,0.08)]">
              Member love & testimonies
            </p>
            <p className="hero-script mt-4">Every testimony carries light</p>
            <h1 className="font-display mt-6 max-w-4xl text-6xl font-light leading-[0.92] tracking-tight text-white sm:text-7xl">
              Stories of answered prayer, restoration, and divine covering.
            </h1>
          </div>
          <p className="max-w-2xl text-xl leading-8 text-white/86">
              These are not slogans. They are lived encounters from members who
              found God’s help, healing, depth, and preservation through this
              prayer community.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-32">
        <div className="mx-auto grid max-w-7xl gap-6 xl:grid-cols-2">
          {testimonies.map((item, index) => (
            <article
              key={item.name}
              className={`relative overflow-hidden border p-7 shadow-[0_24px_80px_rgba(14,34,25,0.08)] lg:p-9 ${
                index % 2 === 0
                  ? "border-[#eadfc8] bg-[linear-gradient(180deg,#ffffff_0%,#fcf8f0_100%)]"
                  : "border-[#d1dbc9] bg-[linear-gradient(180deg,#ffffff_0%,#f1f7f2_100%)]"
              }`}
            >
              <div
                className={`absolute right-0 top-0 h-28 w-28 rounded-bl-[2rem] ${
                  index % 2 === 0 ? "bg-[#6d1237]" : "bg-[#0f5c46]"
                }`}
              />
              <div className="relative">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#6d1237]">
                      {item.highlight}
                    </p>
                    <h2 className="font-display mt-4 max-w-2xl text-4xl font-light leading-none tracking-tight text-[#10251d] sm:text-5xl">
                      {item.title}
                    </h2>
                  </div>
                  <div className="border border-[#d4af5d]/70 bg-[#fff8e8] px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#8c6a18]">
                    Member testimony
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center border border-[#d4af5d]/50 bg-[linear-gradient(135deg,#d4af5d,#f4e7bf)] text-lg font-bold text-[#6d1237]">
                    {item.name
                      .split(" ")
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-xl font-bold text-[#10251d]">{item.name}</p>
                    <p className="text-sm uppercase tracking-[0.22em] text-[#4f665c]">
                      Loved by grace. Held by prayer.
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-5 text-[1.05rem] leading-8 text-[#31453c]">
                  {item.content.map((paragraph) => (
                    <p key={paragraph}>&quot;{paragraph}&quot;</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-32">
        <div className="mx-auto max-w-7xl overflow-hidden bg-[linear-gradient(135deg,#5f0f31_0%,#7a1842_26%,#d4af5d_26%,#d4af5d_29%,#0f5c46_29%,#0a3a2d_100%)] p-[1px] shadow-[0_30px_100px_rgba(27,47,36,0.16)]">
          <div className="grid gap-8 bg-[#fffdf8] px-6 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#6d1237]">
                Share your own
              </p>
              <h2 className="font-display mt-4 text-5xl font-light leading-none tracking-tight text-[#10251d] sm:text-6xl">
                If God has done it, let the house hear it.
              </h2>
            </div>

            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
              <p className="max-w-2xl text-lg leading-8 text-[#41574d]">
                Your testimony can strengthen someone else’s faith, encourage
                someone in waiting, and remind the next person that God still
                answers prayer.
              </p>
              <Link
                href="/contact"
                className="inline-flex min-h-14 items-center gap-2 border border-[#6d1237] bg-[#6d1237] px-8 text-base font-bold uppercase tracking-[0.16em] text-white transition duration-[180ms] ease-out hover:bg-[#541028] active:scale-[0.98]"
              >
                Send your testimony
                <ArrowRight size={20} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
