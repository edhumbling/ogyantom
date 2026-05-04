import {
  buildDailyDevotionalBody,
  type GeneratedDailyDevotional,
} from "@/lib/dailyDevotionalContent";
import type { DailyDevotional } from "@/sanity/types";

export const firstDailyDevotionalDate = "2026-05-04";

export const firstGeneratedDailyDevotional: GeneratedDailyDevotional = {
  title: "Grace for the First Watch",
  theme: "Begin the day by receiving God's mercy before carrying the day's weight.",
  scripture: "Lamentations 3:22-23",
  scriptureText:
    "It is of the LORD'S mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
  excerpt:
    "Before the day makes its demands, the mercy of God is already present. Stand in the first watch with a heart that receives before it strives.",
  reflectionParagraphs: [
    "A new day is not proof that yesterday was perfect. It is proof that the Lord is merciful. Before messages arrive, before responsibilities gather, before the mind begins to calculate what is missing, the Father has already set fresh compassion before His people.",
    "The morning watch teaches the soul to receive before it reacts. Many people wake up and immediately rehearse pressure, fear, money, family tension, sickness, and unfinished work. But Scripture calls us to begin from another place: the mercies of the Lord have not failed.",
    "This is why prayer is not an escape from real problems. Prayer is the place where those problems are brought under the faithfulness of God. When the heart remembers that the Lord is faithful, it stops treating every burden as final.",
    "Today, do not measure the strength of your day by the size of your need. Measure it by the compassion of the Lord that met you before sunrise. The same God who renewed mercy for you this morning is able to give wisdom, open a door, heal what is wounded, and steady what feels unstable.",
  ],
  prayer:
    "Father, thank You for new mercies this morning. I bring this day under Your faithfulness. Teach me to receive Your compassion before I carry my responsibilities. Let my heart be steady, my decisions be wise, and my prayers be full of trust. In Jesus' name, amen.",
  actionSteps: [
    "Name one burden you are tempted to carry alone, and surrender it to the Lord in prayer.",
    "Speak Lamentations 3:22-23 aloud before checking your messages.",
    "Encourage one person today with the truth that God's mercy has not failed.",
  ],
  shareLine: "Share / 5 min read / Morning Watch",
  readTime: "5 min read",
};

export const firstDailyDevotional: DailyDevotional = {
  _id: `daily-devotional-${firstDailyDevotionalDate}`,
  title: firstGeneratedDailyDevotional.title,
  slug: "grace-for-the-first-watch",
  devotionalDate: firstDailyDevotionalDate,
  publishedAt: `${firstDailyDevotionalDate}T00:00:00.000Z`,
  theme: firstGeneratedDailyDevotional.theme,
  scripture: firstGeneratedDailyDevotional.scripture,
  scriptureText: firstGeneratedDailyDevotional.scriptureText,
  excerpt: firstGeneratedDailyDevotional.excerpt,
  shareLine: firstGeneratedDailyDevotional.shareLine,
  coAuthor: "Watchman Opanin Thomas",
  readTime: firstGeneratedDailyDevotional.readTime,
  actionSteps: firstGeneratedDailyDevotional.actionSteps,
  prayer: firstGeneratedDailyDevotional.prayer,
  generationStatus: "fallback",
  modelUsed: "local-seed",
  body: buildDailyDevotionalBody(firstGeneratedDailyDevotional),
};

export const seededDailyDevotionals: DailyDevotional[] = [firstDailyDevotional];
