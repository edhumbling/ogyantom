import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { getGivingOption, givingKinds } from "@/lib/giving";

type GivingEmbedPageProps = {
  params: Promise<{ kind: string }>;
};

export function generateStaticParams() {
  return givingKinds.map((kind) => ({ kind }));
}

export async function generateMetadata({
  params,
}: GivingEmbedPageProps): Promise<Metadata> {
  const { kind } = await params;
  const option = getGivingOption(kind);

  if (!option) {
    return {
      title: "Give / Support",
    };
  }

  return {
    title: option.title,
    description: option.text,
    alternates: {
      canonical: option.href,
    },
  };
}

export default async function GivingEmbedPage({
  params,
}: GivingEmbedPageProps) {
  const { kind } = await params;
  const option = getGivingOption(kind);

  if (!option) {
    notFound();
  }

  return (
    <main className="giving-embed-page">
      <header className="giving-embed-header">
        <Link href="/support" className="giving-embed-back">
          <ArrowLeft size={18} weight="bold" aria-hidden="true" />
          Back to Giving
        </Link>
      </header>

      <h1 className="sr-only">{option.title}</h1>
      <iframe
        src={option.paystackUrl}
        title={`${option.title} Paystack checkout`}
        className="giving-embed-frame"
        allow="payment *; clipboard-write"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </main>
  );
}
