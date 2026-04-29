import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import { PrayerRequestForm } from "@/components/PrayerRequestForm";
import { contactDetails, opaninFullName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Prayer Request",
  description:
    "Submit a prayer request directly to Ogya Ntom Prayer Army for confidential prayer covering and follow-up.",
};

export default function PrayerRequestPage() {
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
            <p className="testimony-kicker">Prayer Request</p>
            <h1>Share the matter for prayer covering.</h1>
            <p>
              Send your request directly to the ministry team. Your details stay
              private and are used only for prayer care and appropriate follow-up.
            </p>
            <div className="testimony-hero-actions">
              <a href="#send-prayer-request" className="testimony-glow-cta">
                <span className="relative z-10 flex items-center gap-2">
                  Start Prayer Request
                  <ArrowDown size={17} weight="bold" />
                </span>
              </a>
              <Link href="/prayer-army" className="testimony-secondary-cta">
                Prayer Army
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="send-prayer-request" className="testimony-submit-section">
        <div className="testimony-submit-shell">
          <div className="testimony-submit-copy">
            <p className="testimony-kicker">Dedicated Request Route</p>
            <h2>Let the army stand with you.</h2>
            <p>
              Share only what you are comfortable sharing. The request is routed
              for prayerful attention, confidentiality, and ministry follow-up
              where needed.
            </p>
          </div>

          <div className="testimony-form-panel">
            <PrayerRequestForm />
          </div>
        </div>
      </section>

      <section className="testimony-ledger-section">
        <div className="testimony-section-head">
          <div>
            <p className="testimony-kicker testimony-kicker-dark">
              Direct Contact
            </p>
            <h2>Need to reach the team another way?</h2>
          </div>
          <p>
            Use the form for prayer requests. Use email or phone for general
            contact, ministry coordination, or follow-up.
          </p>
        </div>

        <div className="mt-5">
          <div className="glass-panel p-7">
            <div className="grid gap-4">
              <a className="contact-row" href={`mailto:${contactDetails.email}`}>
                <EnvelopeSimple size={27} weight="bold" />
                <span>
                  <strong>Email</strong>
                  <span>{contactDetails.email}</span>
                </span>
              </a>
              {contactDetails.phones.map((phone) => (
                <a className="contact-row" href={`tel:${phone}`} key={phone}>
                  <Phone size={27} weight="bold" />
                  <span>
                    <strong>Tel</strong>
                    <span>{phone}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
