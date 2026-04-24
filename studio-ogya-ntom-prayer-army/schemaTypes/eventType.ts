import { defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Upcoming Event",
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
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "startDate",
      title: "Start date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End date",
      type: "datetime",
    }),
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: ["WhatsApp", "Telegram", "Google Meet", "Online"],
      },
      initialValue: "Google Meet",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Online ministry gathering",
    }),
    defineField({
      name: "meetingLink",
      title: "Meeting link",
      type: "url",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["upcoming", "featured", "completed"],
      },
      initialValue: "upcoming",
    }),
    defineField({
      name: "image",
      title: "Event image",
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
      subtitle: "startDate",
      media: "image",
    },
  },
});
