import type { Metadata } from "next";
import { urlFor } from "./image";
import type { SanityImage } from "./types";

type ContentMetadataOptions = {
  title: string;
  description?: string;
  image?: SanityImage;
  imageAlt?: string;
  path: string;
  type?: "article" | "website";
};

const fallbackImage = {
  url: "/brand/ogya-ntom-prayer-logo.png",
  width: 1039,
  height: 719,
  alt: "Ogya Ntom Prayer Army logo",
};

export function getContentOpenGraphImage(image?: SanityImage, altFallback?: string) {
  const imageUrl = image ? urlFor(image)?.width(1200).height(630).fit("crop").url() : null;

  if (!imageUrl) {
    return fallbackImage;
  }

  return {
    url: imageUrl,
    width: 1200,
    height: 630,
    alt: image?.alt || altFallback || "Ogya Ntom Prayer Army",
  };
}

export function buildContentMetadata({
  title,
  description,
  image,
  imageAlt,
  path,
  type = "article",
}: ContentMetadataOptions): Metadata {
  const openGraphImage = getContentOpenGraphImage(image, imageAlt || title);

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      type,
      url: path,
      images: [openGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [openGraphImage.url],
    },
  };
}
