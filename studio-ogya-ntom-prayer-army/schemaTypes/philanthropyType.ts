import { defineField, defineType } from "sanity";
import { richBodyField } from "./richBodyField";

export const philanthropyType = defineType({
  name: "philanthropy",
  title: "Philanthropy Update",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Used to generate the public URL slug.",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Generate this from the title so the URL uses readable words.",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "beneficiary",
      title: "Beneficiary group",
      type: "string",
      options: {
        list: ["Widows", "Orphans", "Families", "Elderly", "Community"],
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "donationValue",
      title: "Donation value",
      type: "string",
      description: "Example: GHS 8,500 worth of food and supplies",
    }),
    defineField({
      name: "impact",
      title: "Impact note",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Cover image",
      type: "image",
      description: "Used as the page image and Open Graph preview image.",
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
      title: "Full update content",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "beneficiary",
      media: "image",
    },
  },
});
