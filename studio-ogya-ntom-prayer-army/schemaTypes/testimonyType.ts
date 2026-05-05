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
      name: "testimonyFormat",
      title: "Testimony format",
      type: "string",
      initialValue: "written",
      options: {
        list: [
          { title: "Written testimony", value: "written" },
          { title: "Video testimony", value: "video" },
        ],
        layout: "radio",
      },
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
      name: "videoTestimonyUrl",
      title: "Video testimony URL",
      type: "url",
      description:
        "Optional public video link from TikTok, YouTube, Instagram, Facebook, Vimeo, or another platform.",
      validation: (rule) =>
        rule.uri({
          allowRelative: false,
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "testimonyImages",
      title: "Testimony pictures",
      type: "array",
      description:
        "Optional public pictures connected to the testimony. Review privacy before publishing.",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              description: "Short description for accessibility.",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
      ],
      validation: (rule) => rule.max(3),
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
      format: "testimonyFormat",
      media: "testimonyImages.0",
    },
    prepare({ title, subtitle, format, media }) {
      return {
        title,
        subtitle: `${format === "video" ? "Video" : "Written"} - ${
          subtitle === "published" ? "Published" : "Pending review"
        }`,
        media,
      };
    },
  },
});
