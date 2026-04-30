import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bank,
  CurrencyCircleDollar,
  Gift,
  HandHeart,
  Package,
} from "@phosphor-icons/react/dist/ssr";
import { AutoScrollRail } from "@/components/AutoScrollRail";
import { givingOptions } from "@/lib/giving";
import { contactDetails, opaninFullName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Give / Support",
  description:
    "Support Ogya Ntom Prayer Army through cash, digital giving, or gifts in kind.",
};

const supportWays = [
  {
    title: "Cash Support",
    text: "Give toward ministry coordination, online prayer operations, outreach, and care for vulnerable families.",
    icon: CurrencyCircleDollar,
  },
  {
    title: "Digital Giving",
    text: "Give securely through Paystack with one-time and recurring giving options.",
    icon: Bank,
  },
  {
    title: "Support in Kind",
    text: "Give practical items, service support, media help, logistics, or resources that strengthen the work.",
    icon: Package,
  },
];

export default function SupportPage() {
  return (
    <main className="testimony-page support-page">
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
            <p className="testimony-kicker">Give / Support</p>
            <h1>Stand behind the work of prayer.</h1>
            <p>
              Choose a giving rhythm first, then see the ways your support
              strengthens prayer, outreach, care, and ministry operations.
            </p>
            <div className="testimony-hero-actions">
              <a href="#support-options" className="testimony-glow-cta">
                <span className="relative z-10 flex items-center gap-2">
                  <Gift size={16} weight="fill" />
                  View Support Options
                </span>
              </a>
              <Link href="/contact" className="testimony-secondary-cta">
                Discuss Support
                <ArrowRight size={17} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section
        id="support-options"
        className="support-paystack-section support-priority-giving px-5 py-16 sm:px-8 lg:px-10"
      >
        <div className="support-paystack-shell support-paystack-shell-priority mx-auto max-w-7xl">
          <AutoScrollRail
            ariaLabel="Paystack giving options"
            className="support-giving-options support-giving-rail"
            shellClassName="support-giving-rail-shell"
          >
            {givingOptions.map((option) => (
              <Link
                key={option.kind}
                href={option.href}
                className="support-giving-card support-giving-card-priority"
              >
                <span className="support-giving-icon" aria-hidden="true">
                  {option.kind === "one-time" ? (
                    <HandHeart size={28} weight="bold" />
                  ) : (
                    <CurrencyCircleDollar size={28} weight="bold" />
                  )}
                </span>
                <span className="support-giving-copy">
                  <strong>{option.title}</strong>
                  <span>{option.text}</span>
                </span>
                <span className="support-giving-action">
                  {option.label}
                  <ArrowRight size={17} weight="bold" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </AutoScrollRail>

          <div className="support-priority-copy">
            <p className="ministry-community-kicker">Paystack Giving</p>
            <h2 className="font-display">Choose your giving rhythm.</h2>
            <p>
              Members and partners can support according to capacity: a single
              gift for immediate ministry needs, or recurring support that helps
              the prayer army serve consistently month after month.
            </p>
          </div>
        </div>
      </section>

      <section className="support-options-section px-5 pb-16 sm:px-8 lg:px-10">
        <div className="support-options-head mx-auto max-w-7xl">
          <p className="testimony-kicker testimony-kicker-dark">Ways Support Helps</p>
          <h2>Give in the way that matches your burden.</h2>
          <p>
            Every gift is received as partnership in the work of prayer: online
            gatherings, outreach, family care, and the practical structure that
            keeps the ministry moving.
          </p>
        </div>

        <AutoScrollRail
          ariaLabel="ways support helps"
          className="support-architecture-list"
          shellClassName="mx-auto mt-5 max-w-7xl"
        >
          {supportWays.map((way) => {
            const Icon = way.icon;
            return (
              <article key={way.title} className="support-arch-row">
                <div className="ministry-card-icon" aria-hidden="true">
                  <Icon size={32} weight="bold" />
                </div>
                <h2>{way.title}</h2>
                <p>{way.text}</p>
              </article>
            );
          })}
        </AutoScrollRail>
      </section>

      <section className="support-social-section px-5 pb-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="testimony-section-head">
            <div>
              <p className="testimony-kicker testimony-kicker-dark">
                Ministry Handles
              </p>
              <h2>Follow the prayer army online.</h2>
            </div>
            <p>
              Stay close to ministry updates, prayer moments, and public
              teaching through the official social channels.
            </p>
          </div>
          <AutoScrollRail
            ariaLabel="ministry handles"
            className="support-social-rail"
            shellClassName="mt-5"
          >
            <a href={contactDetails.tiktok} target="_blank" rel="noreferrer">
              <strong>TikTok</strong>
              <span>@opaninnie</span>
            </a>
            <a href={contactDetails.facebook} target="_blank" rel="noreferrer">
              <strong>Facebook</strong>
              <span>Watchman Opanin Thomas</span>
            </a>
          </AutoScrollRail>
        </div>
      </section>
    </main>
  );
}
