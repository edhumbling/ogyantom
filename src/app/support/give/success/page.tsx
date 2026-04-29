import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle, HandHeart } from "@phosphor-icons/react/dist/ssr";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Thank You for Giving",
  description:
    "Thank you for supporting Ogya Ntom Prayer Army. May God bless you abundantly.",
  alternates: {
    canonical: "/support/give/success",
  },
};

export const successGivingUrl = absoluteUrl("/support/give/success");

export default function GivingSuccessPage() {
  return (
    <main className="giving-success-page">
      <header className="giving-embed-header">
        <Link href="/support" className="giving-embed-back">
          <ArrowLeft size={18} weight="bold" aria-hidden="true" />
          Back to Giving
        </Link>
      </header>

      <section className="giving-success-section" aria-labelledby="giving-success-title">
        <div className="giving-success-shell">
          <div className="giving-success-mark" aria-hidden="true">
            <CheckCircle size={46} weight="fill" />
          </div>
          <p className="giving-success-kicker">Payment Successful</p>
          <h1 id="giving-success-title" className="font-display">
            Thank you for standing with Ogya Ntom Prayer Army.
          </h1>
          <p>
            Your giving has been received with gratitude. May the Lord bless
            you abundantly, increase you on every side, and let your seed bring
            lasting fruit.
          </p>
          <div className="giving-success-actions">
            <Link href="/support" className="giving-success-primary">
              <HandHeart size={18} weight="bold" aria-hidden="true" />
              Back to Support
            </Link>
            <Link href="/" className="giving-success-secondary">
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
