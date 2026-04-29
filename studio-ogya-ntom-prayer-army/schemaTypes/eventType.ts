import { defineField, defineType } from "sanity";
import { richBodyField } from "./richBodyField";

export const eventType = defineType({
  name: "event",
  title: "Upcoming Event",
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
      name: "startDate",
      title: "Start date",
      type: "datetime",
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
      title: "Cover image",
      type: "image",
      description: "Used as the event page image and Open Graph preview image.",
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
      title: "Full event content",
      description:
        "Optional event details with agenda, directions, links, images, video, and audio.",
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
