import { defineField, defineType } from "sanity";

export const philanthropyType = defineType({
  name: "philanthropy",
  title: "Philanthropy Update",
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "beneficiary",
      title: "Beneficiary group",
      type: "string",
      options: {
        list: ["Widows", "Orphans", "Families", "Elderly", "Community"],
      },
      validation: (rule) => rule.required(),
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
      title: "Update image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
      ],
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
