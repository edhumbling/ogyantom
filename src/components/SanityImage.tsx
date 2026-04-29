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
          "relative flex h-full min-h-[18rem] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(207,180,95,0.28),transparent_34%),linear-gradient(135deg,#07120d,#030604)] p-6 " +
          (className ?? "")
        }
      >
        <Image
          src="/brand/ogya-ntom-prayer-logo.png"
          alt={`${altFallback} cover`}
          width={420}
          height={291}
          className="h-auto w-2/3 max-w-[16rem] object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,0.32)]"
        />
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
