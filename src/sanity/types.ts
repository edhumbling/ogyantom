import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  alt?: string;
  asset?: { _ref?: string; _type?: "reference" };
  crop?: unknown;
  hotspot?: unknown;
  _type?: "image";
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  categories?: string[];
  mainImage?: SanityImage;
  body?: PortableTextBlock[];
};

export type Event = {
  _id: string;
  title: string;
  slug?: string;
  summary?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  platform?: "WhatsApp" | "Telegram" | "Google Meet" | "Online";
  meetingLink?: string;
  status?: "upcoming" | "featured" | "completed";
  image?: SanityImage;
};
