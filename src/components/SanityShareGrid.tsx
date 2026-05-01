"use client";

import { useMemo, useState } from "react";
import {
  CopySimple,
  EnvelopeSimple,
  FacebookLogo,
  LinkedinLogo,
  Printer,
  TelegramLogo,
  ThreadsLogo,
  WhatsappLogo,
  XLogo,
} from "@phosphor-icons/react";

type SanityShareGridProps = {
  title: string;
  text?: string;
  url: string;
};

async function copyText(value: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

export function SanityShareGrid({ title, text, url }: SanityShareGridProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text || title);

  const shareLinks = useMemo(
    () => [
      {
        label: "WhatsApp",
        href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
        Icon: WhatsappLogo,
      },
      {
        label: "Telegram",
        href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
        Icon: TelegramLogo,
      },
      {
        label: "Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        Icon: FacebookLogo,
      },
      {
        label: "X",
        href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
        Icon: XLogo,
      },
      {
        label: "LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        Icon: LinkedinLogo,
      },
      {
        label: "Threads",
        href: `https://www.threads.net/intent/post?text=${encodedText}%20${encodedUrl}`,
        Icon: ThreadsLogo,
      },
      {
        label: "Email",
        href: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
        Icon: EnvelopeSimple,
      },
    ],
    [encodedText, encodedTitle, encodedUrl],
  );

  return (
    <aside className="sanity-share-grid" aria-label="Share this page">
      <p>Share</p>
      <div>
        <button
          type="button"
          aria-label="Copy page link"
          title="Copy link"
          onClick={async () => {
            await copyText(url);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
          }}
        >
          <CopySimple size={18} weight="bold" aria-hidden="true" />
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
        <button
          type="button"
          aria-label="Print this page"
          title="Print"
          onClick={() => window.print()}
        >
          <Printer size={18} weight="bold" aria-hidden="true" />
          <span>Print</span>
        </button>
        {shareLinks.map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            aria-label={`Share on ${label}`}
            title={`Share on ${label}`}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          >
            <Icon size={18} weight="bold" aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? "Page link copied." : ""}
      </span>
    </aside>
  );
}
