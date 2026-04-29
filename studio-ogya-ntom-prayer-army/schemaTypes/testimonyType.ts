import { defineField, defineType } from "sanity";

export const testimonyType = defineType({
  name: "testimony",
  title: "Member Testimony",
  type: "document",
  fields: [
    defineField({
      name: "reviewStatus",
      title: "Review status",
      type: "string",
      initialValue: "pending",
      options: {
        list: [
          { title: "Pending review", value: "pending" },
          { title: "Published", value: "published" },
          { title: "Rejected", value: "rejected" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Testimony title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "highlight",
      title: "Short highlight",
      type: "string",
      description: "Example: Healing, restoration, protection, provision.",
    }),
    defineField({
      name: "name",
      title: "Member name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Private contact detail. Not shown publicly.",
    }),
    defineField({
      name: "phone",
      title: "Phone or WhatsApp",
      type: "string",
      description: "Private contact detail. Not shown publicly.",
    }),
    defineField({
      name: "content",
      title: "Testimony",
      type: "text",
      rows: 8,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      description: "Set this when approving the testimony for the website.",
    }),
    defineField({
      name: "reviewNotes",
      title: "Review notes",
      type: "text",
      rows: 3,
      description: "Private notes for Watchman Opanin or the ministry team.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "reviewStatus",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle === "published" ? "Published" : "Pending review",
      };
    },
  },
});
