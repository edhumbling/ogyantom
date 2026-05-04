import type { RichContentBlock } from "@/sanity/types";

export type GeneratedDailyDevotional = {
  title: string;
  theme: string;
  scripture: string;
  scriptureText: string;
  excerpt: string;
  reflectionParagraphs: string[];
  prayer: string;
  actionSteps: string[];
  shareLine: string;
  readTime: string;
};

type PortableBlockStyle = "normal" | "h2" | "blockquote";

function key(prefix: string, index: number) {
  return `${prefix}-${index.toString(36)}`;
}

function block(text: string, style: PortableBlockStyle, index: number): RichContentBlock {
  return {
    _key: key(style, index),
    _type: "block",
    style,
    markDefs: [],
    children: [
      {
        _key: key("span", index),
        _type: "span",
        text,
        marks: [],
      },
    ],
  };
}

function bullet(text: string, index: number): RichContentBlock {
  return {
    _key: key("practice", index),
    _type: "block",
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [
      {
        _key: key("practice-span", index),
        _type: "span",
        text,
        marks: [],
      },
    ],
  };
}

export function buildDailyDevotionalBody(devotional: GeneratedDailyDevotional): RichContentBlock[] {
  const blocks: RichContentBlock[] = [
    block("Today's Scripture", "h2", 1),
    block(`${devotional.scriptureText} (${devotional.scripture})`, "blockquote", 2),
    block("Reflection", "h2", 3),
  ];

  devotional.reflectionParagraphs.forEach((paragraph, index) => {
    blocks.push(block(paragraph, "normal", index + 4));
  });

  blocks.push(block("Prayer", "h2", 20), block(devotional.prayer, "normal", 21));
  blocks.push(block("Practice Today", "h2", 30));

  devotional.actionSteps.forEach((step, index) => {
    blocks.push(bullet(step, index + 31));
  });

  return blocks;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function formatDevotionalDate(value?: string) {
  if (!value) return "Daily Devotional";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00.000Z`));
}
