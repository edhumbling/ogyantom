import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  alt?: string;
  caption?: string;
  asset?: { _ref?: string; _type?: "reference" };
  crop?: unknown;
  hotspot?: unknown;
  _type?: "image";
};

export type SanityMediaAsset = {
  _ref?: string;
  _type?: "reference";
  url?: string;
  originalFilename?: string;
};

export type SanityMediaFile = {
  _type?: "videoFile" | "audioFile";
  title?: string;
  caption?: string;
  asset?: SanityMediaAsset;
};

export type SanityMediaEmbed = {
  _type?: "videoEmbed" | "audioEmbed";
  title?: string;
  url?: string;
  caption?: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  categories?: string[];
  mainImage?: SanityImage;
  body?: RichContentBlock[];
};

export type Event = {
  _id: string;
  title?: string;
  slug?: string;
  summary?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  platform?: "WhatsApp" | "Telegram" | "Google Meet" | "Online";
  meetingLink?: string;
  status?: "upcoming" | "featured" | "completed";
  image?: SanityImage;
  body?: RichContentBlock[];
};

export type RichContentBlock =
  | PortableTextBlock
  | SanityImage
  | SanityMediaFile
  | SanityMediaEmbed;

export type PhilanthropyUpdate = {
  _id: string;
  title?: string;
  slug?: string;
  summary?: string;
  publishedAt?: string;
  beneficiary?: "Widows" | "Orphans" | "Families" | "Elderly" | "Community";
  location?: string;
  donationValue?: string;
  impact?: string;
  image?: SanityImage;
  body?: RichContentBlock[];
};

export type Testimony = {
  _id: string;
  title: string;
  highlight?: string;
  name: string;
  content: string;
  publishedAt?: string;
  submittedAt?: string;
};
