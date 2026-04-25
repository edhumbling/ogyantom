import Image from "next/image";
import { EnvelopeSimple, HandsPraying, Phone } from "@phosphor-icons/react/dist/ssr";
import { contactDetails, ministryType, onlinePlatforms } from "@/lib/site";

export default function ContactPage() {
  return (
    <main className="bg-[#e6ebe7] text-[#07120d]">
      <section className="hero-shell hero-start hero-wine-accent overflow-hidden border-b border-white/10">
        <div className="hero-media">
          <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_90%_0%,rgba(207,180,95,0.34),transparent_30%),linear-gradient(135deg,#07120d_0%,#0d3a27_52%,#030604_100%)]" />
        </div>
        <div className="hero-content mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:px-10 lg:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#cfb45f]">
              Contact
            </p>
            <p className="hero-script mt-4">We are here to pray with you</p>
            <h1 className="font-display tracking-tighter mt-4 max-w-4xl text-6xl font-light leading-none text-white sm:text-7xl">
              Send the request. Join the watch.
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-[#d7e3dc]">
              {ministryType}. We connect the world through prayers via
              WhatsApp, Telegram, and Google Meet.
            </p>
          </div>

          <p className="max-w-2xl text-xl leading-8 text-[#d7e3dc]">
            Reach out for prayer support, pastoral guidance, and community connection.
            Our channels remain open for urgent requests and ongoing intercession.
          </p>
        </div>
      </section>

      <section className="px-5 pb-10 pt-12 sm:px-8 lg:px-10 lg:pt-16">
        <div className="mx-auto max-w-7xl">
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
              <div className="contact-row">
                <HandsPraying size={27} weight="bold" />
                <span>
                  <strong>Type of ministry</strong>
                  <span>{ministryType}</span>
                </span>
              </div>
            </div>
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
          <div className="grid gap-4 md:grid-cols-3">
            {onlinePlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                className="glass-panel p-6 transition duration-[180ms] ease-out hover:-translate-y-1"
              >
                <Image
                  src={platform.logo}
                  alt={`${platform.name} logo`}
                  width={54}
                  height={54}
                  className="h-14 w-14"
                />
                <h3 className="mt-8 text-2xl font-bold">{platform.name}</h3>
                <p className="mt-3 text-base leading-7 text-[#53635a]">
                  {platform.text}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
