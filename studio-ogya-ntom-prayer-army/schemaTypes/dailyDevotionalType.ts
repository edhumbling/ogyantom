import { defineArrayMember, defineField, defineType } from "sanity";
import { richBodyField } from "./richBodyField";

export const dailyDevotionalType = defineType({
  name: "dailyDevotional",
  title: "Daily Devotional",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "devotionalDate",
      title: "Devotional date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "string",
    }),
    defineField({
      name: "scripture",
      title: "Scripture reference",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "scriptureText",
      title: "Scripture text",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "shareLine",
      title: "Share detail strip",
      type: "string",
      description: "One-line card detail shown near the bottom of devotional cards.",
    }),
    defineField({
      name: "coAuthor",
      title: "Co-author line",
      type: "string",
      initialValue: "Watchman Opanin Thomas",
    }),
    defineField({
      name: "readTime",
      title: "Read time",
      type: "string",
      initialValue: "5 min read",
    }),
    defineField({
      name: "actionSteps",
      title: "Practice steps",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "prayer",
      title: "Prayer",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "generationStatus",
      title: "Generation status",
      type: "string",
      options: {
        list: [
          { title: "AI generated", value: "aiGenerated" },
          { title: "Deterministic fallback", value: "fallback" },
          { title: "Edited", value: "edited" },
        ],
      },
      initialValue: "aiGenerated",
    }),
    defineField({
      name: "modelUsed",
      title: "Model used",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "mainImage",
      title: "Cover image",
      type: "image",
      description: "Optional. The website uses the Ogya Ntom logo when this is empty.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
    }),
    richBodyField({
      description:
        "Devotional body with Scripture, reflection, prayer, and practice steps.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      subtitle: "devotionalDate",
    },
  },
});
