import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  FacebookLogo,
  HandsPraying,
  Phone,
  TiktokLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react/dist/ssr";
import { contactDetails, ministryType, onlinePlatforms, opaninFullName } from "@/lib/site";

export default function ContactPage() {
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
            <p className="testimony-kicker">Contact</p>
            <h1>We are here to pray with you.</h1>
            <p>
              Reach out for prayer support, pastoral guidance, and community
              connection across our online prayer channels.
            </p>
            <div className="testimony-hero-actions">
              <Link href="/prayer-request" className="testimony-glow-cta">
                <span className="relative z-10 flex items-center gap-2">
                  <HandsPraying size={16} weight="fill" />
                  Send Prayer Request
                </span>
              </Link>
              <a href="#contact-channels" className="testimony-secondary-cta">
                Contact details
                <ArrowDown size={17} weight="bold" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-channels" className="testimony-ledger-section">
        <div className="testimony-section-head">
          <div>
            <p className="testimony-kicker testimony-kicker-dark">Direct contact</p>
            <h2>Reach the ministry team.</h2>
          </div>
          <p>
            {ministryType}. We connect the world through prayer by WhatsApp,
            Telegram, Google Meet, phone, and email.
          </p>
        </div>
        <div className="contact-architecture-panel mt-5">
          <a className="contact-arch-line contact-arch-line-strong" href={`mailto:${contactDetails.email}`}>
            <EnvelopeSimple size={30} weight="bold" aria-hidden="true" />
            <strong>Email</strong>
            <span>{contactDetails.email}</span>
          </a>
          {contactDetails.phones.map((phone) => (
            <a className="contact-arch-line" href={`tel:${phone}`} key={phone}>
              <Phone size={30} weight="bold" aria-hidden="true" />
              <strong>Tel</strong>
              <span>{phone}</span>
            </a>
          ))}
          <a className="contact-arch-line" href={contactDetails.tiktok} target="_blank" rel="noreferrer">
            <TiktokLogo size={30} weight="bold" aria-hidden="true" />
            <strong>TikTok</strong>
            <span>@opaninnie</span>
          </a>
          <a className="contact-arch-line" href={contactDetails.facebook} target="_blank" rel="noreferrer">
            <FacebookLogo size={30} weight="bold" aria-hidden="true" />
            <strong>Facebook</strong>
            <span>Watchman Opanin Thomas</span>
          </a>
          <div className="contact-arch-line contact-arch-line-static">
            <HandsPraying size={30} weight="bold" aria-hidden="true" />
            <strong>Ministry</strong>
            <span>{ministryType}</span>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 pt-16 lg:pb-32 lg:pt-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0d3a27]">
              Online prayer channels
            </p>
            <h2 className="font-display tracking-tighter mt-3 text-5xl font-light leading-none sm:text-6xl">
              Connected through prayer, wherever people are.
            </h2>
          </div>
          <div className="platform-architecture-band">
            {onlinePlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                className="platform-arch-link"
              >
                <Image
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  width={54}
                  height={54}
                  className="h-10 w-10"
                />
                <strong>{platform.name}</strong>
                <span>{platform.text}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
