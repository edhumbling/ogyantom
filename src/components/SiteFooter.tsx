import Link from "next/link";
import {
  ArrowRight,
  EnvelopeSimple,
  FacebookLogo,
  HandHeart,
  Phone,
  TiktokLogo,
  WhatsappLogo,
} from "@phosphor-icons/react/dist/ssr";
import { contactDetails, navItems } from "@/lib/site";
import { ArmyMarquee } from "./ArmyMarquee";
import { LogoMark } from "./LogoMark";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

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

          <div className="footer-contact-mesh mt-7" aria-label="Footer contact and social links">
            <a className="footer-contact-primary" href={`mailto:${contactDetails.email}`}>
              <EnvelopeSimple size={18} weight="bold" aria-hidden="true" />
              <span>{contactDetails.email}</span>
            </a>
            <div className="footer-contact-mini">
              {contactDetails.phones.map((phone) => (
                <a href={`tel:${phone}`} key={phone} aria-label={`Call ${phone}`}>
                  <Phone size={16} weight="bold" aria-hidden="true" />
                  <span>{phone}</span>
                </a>
              ))}
              <a href={contactDetails.whatsapp} aria-label="Open WhatsApp">
                <WhatsappLogo size={16} weight="bold" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>
              <a href={contactDetails.tiktok} target="_blank" rel="noreferrer" aria-label="Open TikTok">
                <TiktokLogo size={16} weight="bold" aria-hidden="true" />
                <span>TikTok</span>
              </a>
              <a href={contactDetails.facebook} target="_blank" rel="noreferrer" aria-label="Open Facebook">
                <FacebookLogo size={16} weight="bold" aria-hidden="true" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:gap-10">
          <div>
            <h2 className="text-sm font-semibold tracking-[0.01em] text-[var(--gold)]">Ministry</h2>
            <div className="mt-5 grid gap-3">
              {navItems.filter((item) => item.href !== "/global-prayer-coverage").map((item) => (
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
            <h2 className="text-sm font-semibold tracking-[0.01em] text-[var(--gold)]">Prayer Army</h2>
            <div className="mt-5 grid gap-3 text-[0.95rem] text-[#d2dbd6]">
              <Link className="transition duration-[150ms] ease-out hover:text-[var(--gold)]" href="/prayer-army">
                Morning Watch
              </Link>
              <Link className="transition duration-[150ms] ease-out hover:text-[var(--gold)]" href="/prayer-army">
                Evening Watch
              </Link>
              <Link className="transition duration-[150ms] ease-out hover:text-[var(--gold)]" href="/global-prayer-coverage">
                Global Prayer Coverage
              </Link>
              <Link className="transition duration-[150ms] ease-out hover:text-[var(--gold)]" href="/prayer-request">
                Prayer Request
              </Link>
              <Link className="transition duration-[150ms] ease-out hover:text-[var(--gold)]" href="/support">
                Give / Support
              </Link>
              <Link className="transition duration-[150ms] ease-out hover:text-[var(--gold)]" href="/testimonies">
                Answered Prayer
              </Link>
              <Link className="transition duration-[150ms] ease-out hover:text-[var(--gold)]" href="/privacy">
                Privacy Policy
              </Link>
              <Link className="transition duration-[150ms] ease-out hover:text-[var(--gold)]" href="/terms">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ArmyMarquee />

      <div className="footer-support-arc mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">
        <div className="footer-support-copy">
          <p>Give / Support</p>
          <span>Support the prayer army through cash, digital giving, or gifts in kind.</span>
        </div>
        <Link href="/support" className="footer-support-button">
          <HandHeart size={18} weight="bold" aria-hidden="true" />
          Support Ministry
          <ArrowRight size={16} weight="bold" aria-hidden="true" />
        </Link>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-5 py-6 text-center text-sm text-[#8d9a93] sm:px-8 lg:px-10">
        <p>© {currentYear} Ogya Ntom Prayer Army</p>
        <div className="footer-utility-links">
          <p className="text-[#a7b4ad]">Built for prayer, formation, and faithful covering.</p>
          <p className="footer-made-label">
            Made with eternal love ❤️ by{" "}
            <a
              href="https://www.linkedin.com/in/edhumbling"
              className="footer-aidel-link"
              target="_blank"
              rel="noreferrer"
            >
              AIDEL
            </a>
          </p>
          <div className="footer-policy-links" aria-label="Footer policy links">
            <Link href="/sitemap" className="footer-sitemap-link">
              Sitemap
            </Link>
            <Link href="/privacy" className="footer-sitemap-link">
              Privacy
            </Link>
            <Link href="/terms" className="footer-sitemap-link">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
