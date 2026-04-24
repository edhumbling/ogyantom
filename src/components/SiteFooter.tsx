import Image from "next/image";
import Link from "next/link";
import { EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import { contactDetails, navItems, onlinePlatforms } from "@/lib/site";
import { ArmyMarquee } from "./ArmyMarquee";
import { LogoMark } from "./LogoMark";

export function SiteFooter() {
  return (
    <footer className="bg-[#030604] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-14 pb-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10">
        <div>
          <LogoMark />
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#cdd5cf]">
            An online prayer army led by Chief Prayer Warrior Watchman Opanin
            Thomas, connecting the world through prayers.
          </p>
          <div className="mt-7 grid gap-3 text-sm font-bold text-[#dfe6e1] sm:grid-cols-2">
            <a className="footer-contact" href={`mailto:${contactDetails.email}`}>
              <EnvelopeSimple size={20} weight="bold" />
              {contactDetails.email}
            </a>
            {contactDetails.phones.map((phone) => (
              <a className="footer-contact" href={`tel:${phone}`} key={phone}>
                <Phone size={20} weight="bold" />
                {phone}
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
              Ministry links
            </h2>
            <div className="mt-5 grid gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-3 py-2 text-base font-bold text-[#dfe6e1] transition hover:bg-white/[0.06] hover:text-[var(--gold)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--gold)]">
              Facets
            </h2>
            <div className="mt-5 grid gap-3 text-base font-bold text-[#dfe6e1]">
              <Link className="rounded-2xl px-3 py-2 transition hover:bg-white/[0.06]" href="/prayer-watch">Morning Watch</Link>
              <Link className="rounded-2xl px-3 py-2 transition hover:bg-white/[0.06]" href="/prayer-watch">Midday Intercession</Link>
              <Link className="rounded-2xl px-3 py-2 transition hover:bg-white/[0.06]" href="/prayer-watch">Night Vigil</Link>
              <Link className="rounded-2xl px-3 py-2 transition hover:bg-white/[0.06]" href="/testimonies">Answered Prayer</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-3 px-5 pb-8 sm:grid-cols-3 sm:px-8 lg:px-10">
        {onlinePlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.href}
            className="footer-contact min-h-16 rounded-[1.25rem]"
          >
            <Image
              src={platform.logo}
              alt={`${platform.name} logo`}
              width={28}
              height={28}
              className="h-7 w-7"
            />
            {platform.name}
          </a>
        ))}
      </div>

      <ArmyMarquee />

      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-sm text-[#8d9a93] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>© 2026 Ogya Ntom Prayer Army. All rights reserved.</p>
      </div>
    </footer>
  );
}
