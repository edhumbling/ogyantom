import Image from "next/image";
import Link from "next/link";
import { EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import { contactDetails, navItems, onlinePlatforms } from "@/lib/site";
import { ArmyMarquee } from "./ArmyMarquee";
import { LogoMark } from "./LogoMark";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#030604] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10">
        <div className="border-b border-white/10 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-10">
          <LogoMark />
          <p className="mt-6 max-w-xl text-base leading-8 text-[#c7d0ca] sm:text-lg">
            An online prayer army led by Chief Prayer Warrior Watchman Opanin
            Thomas, connecting the world through prayers with structure,
            covering, and consistency.
          </p>

          <div className="mt-8 grid gap-3 text-sm font-bold text-[#dfe6e1] sm:grid-cols-2">
            <a className="footer-contact" href={`mailto:${contactDetails.email}`}>
              <EnvelopeSimple size={18} weight="bold" />
              {contactDetails.email}
            </a>
            {contactDetails.phones.map((phone) => (
              <a className="footer-contact" href={`tel:${phone}`} key={phone}>
                <Phone size={18} weight="bold" />
                {phone}
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[var(--gold)]">
              Ministry links
            </h2>
            <div className="mt-5 grid gap-0">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-white/8 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#dfe6e1] transition duration-[150ms] ease-out hover:text-[var(--gold)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[var(--gold)]">
              Prayer rhythm
            </h2>
            <div className="mt-5 grid gap-0 text-sm font-bold uppercase tracking-[0.14em] text-[#dfe6e1]">
              <Link className="border-b border-white/8 py-3 transition duration-[150ms] ease-out hover:text-[var(--gold)]" href="/prayer-watch">
                Morning Watch
              </Link>
              <Link className="border-b border-white/8 py-3 transition duration-[150ms] ease-out hover:text-[var(--gold)]" href="/prayer-watch">
                Midday Intercession
              </Link>
              <Link className="border-b border-white/8 py-3 transition duration-[150ms] ease-out hover:text-[var(--gold)]" href="/prayer-watch">
                Night Vigil
              </Link>
              <Link className="border-b border-white/8 py-3 transition duration-[150ms] ease-out hover:text-[var(--gold)]" href="/testimonies">
                Answered Prayer
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-3 border-t border-white/10 px-5 py-6 sm:grid-cols-3 sm:px-8 lg:px-10">
        {onlinePlatforms.map((platform) => (
          <a key={platform.name} href={platform.href} className="footer-contact min-h-14">
            <Image
              src={platform.logo}
              alt={`${platform.name} logo`}
              width={24}
              height={24}
              className="h-6 w-6"
            />
            {platform.name}
          </a>
        ))}
      </div>

      <ArmyMarquee />

      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs uppercase tracking-[0.16em] text-[#8d9a93] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <p>© 2026 Ogya Ntom Prayer Army</p>
        <p>Built for prayer, formation, and faithful covering.</p>
      </div>
    </footer>
  );
}
