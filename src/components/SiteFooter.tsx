import Image from "next/image";
import Link from "next/link";
import { EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import { contactDetails, navItems, onlinePlatforms } from "@/lib/site";
import { ArmyMarquee } from "./ArmyMarquee";
import { LogoMark } from "./LogoMark";

export function SiteFooter() {
  return (
    <footer className="bg-[#030604] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div className="lg:pr-8">
          <LogoMark />
          <p className="mt-6 max-w-xl text-base leading-8 text-[#c7d0ca] sm:text-lg">
            An online prayer army led by Chief Prayer Warrior Watchman Opanin
            Thomas, connecting the world through prayers with structure,
            covering, and consistency.
          </p>

          <div className="mt-8 grid gap-4 text-[0.95rem] text-[#dfe6e1]">
            <a className="inline-flex items-center gap-3 text-[#dfe6e1] transition duration-[150ms] ease-out hover:text-[var(--gold)]" href={`mailto:${contactDetails.email}`}>
              <EnvelopeSimple size={18} weight="bold" />
              {contactDetails.email}
            </a>
            {contactDetails.phones.map((phone) => (
              <a className="inline-flex items-center gap-3 text-[#dfe6e1] transition duration-[150ms] ease-out hover:text-[var(--gold)]" href={`tel:${phone}`} key={phone}>
                <Phone size={18} weight="bold" />
                {phone}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:gap-10">
          <div>
            <h2 className="text-sm font-semibold tracking-[0.01em] text-[var(--gold)]">Ministry</h2>
            <div className="mt-5 grid gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[0.95rem] text-[#d2dbd6] transition duration-[150ms] ease-out hover:text-[var(--gold)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.01em] text-[var(--gold)]">Prayer rhythm</h2>
            <div className="mt-5 grid gap-3 text-[0.95rem] text-[#d2dbd6]">
              <Link className="transition duration-[150ms] ease-out hover:text-[var(--gold)]" href="/prayer-watch">
                Morning Watch
              </Link>
              <Link className="transition duration-[150ms] ease-out hover:text-[var(--gold)]" href="/prayer-watch">
                Evening Watch
              </Link>
              <Link className="transition duration-[150ms] ease-out hover:text-[var(--gold)]" href="/testimonies">
                Answered Prayer
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-5 py-7 text-center sm:px-8 lg:px-10">
        {onlinePlatforms.map((platform) => (
          <a key={platform.name} href={platform.href} className="inline-flex min-h-12 items-center gap-3 text-[0.95rem] text-[#d2dbd6] transition duration-[150ms] ease-out hover:text-[var(--gold)]">
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

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-5 py-6 text-center text-sm text-[#8d9a93] sm:px-8 lg:px-10">
        <p>© 2026 Ogya Ntom Prayer Army</p>
        <p className="text-[#a7b4ad]">Built for prayer, formation, and faithful covering.</p>
      </div>
    </footer>
  );
}
