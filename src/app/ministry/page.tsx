import Image from "next/image";
import { ShieldCheck, UsersThree } from "@phosphor-icons/react/dist/ssr";
import {
  coreValues,
  missionStatement,
  ministryType,
  thomasBio,
  visionStatement,
} from "@/lib/site";

export default function MinistryPage() {
  return (
    <main className="bg-[#e6ebe7] text-[#07120d]">
      <section className="hero-shell hero-start hero-wine-accent overflow-hidden border-b border-white/10">
        <div className="hero-media">
          <Image
            src="/brand/watchman-opanin-thomas.png"
            alt="Watchman Opanin Thomas"
            fill
            sizes="100vw"
            className="object-cover object-[52%_top] lg:object-contain lg:object-right lg:scale-[0.94]"
          />
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_85%_8%,rgba(207,180,95,0.26),transparent_36%),linear-gradient(140deg,rgba(7,18,13,0.36),rgba(13,58,39,0.38),rgba(3,6,4,0.84))]" />
        </div>
        <div className="hero-content mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:px-10 lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#cfb45f]">
              Ministry
            </p>
            <p className="hero-script mt-4">Formation and covering</p>
            <h1 className="font-display tracking-tighter mt-4 max-w-4xl text-6xl font-light leading-none text-white sm:text-7xl">
              Formation under watchful covering.
            </h1>
          </div>
          <p className="max-w-2xl text-xl leading-8 text-[#dce7e1]">
            {ministryType}. Ogya Ntom Prayer Army is shaped around discipline,
            care, testimony, spiritual growth, and leadership that keeps the watch clear.
          </p>
        </div>
      </section>

      <section className="section-rule bg-[#06100c] px-5 py-16 text-white lg:py-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="architectural-band relative min-h-[420px] overflow-hidden bg-[#07120d]">
            <Image
              src="/brand/watchman-opanin-thomas.png"
              alt="Watchman Opanin Thomas"
              fill
              sizes="(min-width: 1024px) 520px, 100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(6,16,12,0.82))]" />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#cfb45f]">
              Thomas Bio
            </p>
            <h2 className="font-display tracking-tighter mt-4 text-5xl font-light leading-none sm:text-6xl">
              Prayer changes things. Prayer changes us.
            </h2>
            <p className="mt-7 max-w-3xl text-xl leading-9 text-[#f3f6f3]">
              {thomasBio}
            </p>
          </div>
        </div>
      </section>

      <section className="section-rule px-5 pb-20 lg:pb-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="glass-panel p-8">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0d3a27]">
              Vision
            </p>
            <h2 className="font-display tracking-tighter mt-5 text-4xl font-light leading-none sm:text-5xl">
              {visionStatement}
            </h2>
          </div>
          <div className="glass-panel-dark p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#cfb45f]">
              Mission
            </p>
            <p className="mt-5 text-xl leading-9 text-[#edf1ee]">
              {missionStatement}
            </p>
          </div>
        </div>
      </section>

      <section className="section-rule px-5 pb-20 lg:pb-24 sm:px-8 lg:px-10 ">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
          <article className="glass-panel p-8">
            <ShieldCheck size={36} weight="bold" className="text-[#0d3a27]" />
            <h2 className="mt-10 text-3xl font-bold">Covering</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[#53635a]">
              Prayer requests are carried with order, confidentiality, and
              pastoral sensitivity.
            </p>
          </article>
          <article className="glass-panel-dark p-8 text-white">
            <UsersThree size={36} weight="bold" className="text-[#cfb45f]" />
            <h2 className="mt-10 text-3xl font-bold">Formation</h2>
            <p className="mt-4 max-w-xl text-lg leading-8 text-[#dfe6e1]">
              Warriors are encouraged to grow in consistency, humility, faith,
              and shared responsibility.
            </p>
          </article>
        </div>
      </section>

      <section className="section-rule px-5 pb-20 lg:pb-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0d3a27]">
              Core Values
            </p>
            <h2 className="font-display tracking-tighter mt-3 text-5xl font-light leading-none sm:text-6xl">
              What shapes the prayer culture.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {coreValues.map((value) => (
              <article
                key={value.title}
                className="glass-panel min-h-72 p-6"
              >
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="mt-5 text-base leading-7 text-[#53635a]">
                  {value.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
