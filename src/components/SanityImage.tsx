import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { SanityImage as SanityImageType } from "@/sanity/types";

type SanityImageProps = {
  image?: SanityImageType;
  altFallback: string;
  className?: string;
  priority?: boolean;
  height?: number;
  width?: number;
};

export function SanityImage({
  image,
  altFallback,
  className,
  height = 720,
  priority,
  width = 1120,
}: SanityImageProps) {
  const url = image ? urlFor(image)?.width(width).height(height).fit("crop").url() : null;

  if (!url) {
    return (
      <div
        className={
          "flex h-full min-h-[18rem] items-end bg-[radial-gradient(circle_at_20%_10%,rgba(207,180,95,0.35),transparent_34%),linear-gradient(135deg,#0d3a27,#030604)] p-6 text-white " +
          (className ?? "")
        }
      >
        <span className="max-w-xs font-display text-4xl font-light leading-none">
          Ogya Ntom Prayer Army
        </span>
      </div>
    );
  }

  return (
    <Image
      src={url}
      alt={image?.alt || altFallback}
      fill
      priority={priority}
      sizes="(min-width: 1024px) 620px, 100vw"
      className={"object-cover " + (className ?? "")}
    />
  );
}
