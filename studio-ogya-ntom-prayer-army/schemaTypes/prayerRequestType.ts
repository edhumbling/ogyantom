import { defineField, defineType } from "sanity";

export const prayerRequestType = defineType({
  name: "prayerRequest",
  title: "Prayer Request",
  type: "document",
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "new",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "In prayer", value: "inPrayer" },
          { title: "Followed up", value: "followedUp" },
          { title: "Answered", value: "answered" },
          { title: "Closed", value: "closed" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "assignedTo",
      title: "Assigned to",
      type: "string",
      readOnly: true,
      initialValue: "Watchman Opanin",
    }),
    defineField({
      name: "name",
      title: "Name",
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
      name: "category",
      title: "Prayer focus",
      type: "string",
      options: {
        list: [
          "Family",
          "Healing",
          "Deliverance",
          "Direction",
          "Provision",
          "Thanksgiving",
          "Other",
        ],
      },
    }),
    defineField({
      name: "urgency",
      title: "Urgency",
      type: "string",
      initialValue: "normal",
      options: {
        list: [
          { title: "Normal watch", value: "normal" },
          { title: "Urgent attention", value: "urgent" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "contactPreference",
      title: "Preferred contact",
      type: "string",
      initialValue: "whatsapp",
      options: {
        list: [
          { title: "WhatsApp", value: "whatsapp" },
          { title: "Phone call", value: "phone" },
          { title: "Email", value: "email" },
          { title: "No follow-up needed", value: "none" },
        ],
      },
    }),
    defineField({
      name: "confidential",
      title: "Confidential",
      type: "boolean",
      initialValue: false,
      description: "Marked by the sender for private handling.",
    }),
    defineField({
      name: "request",
      title: "Prayer request",
      type: "text",
      rows: 9,
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
      name: "attendedAt",
      title: "Attended at",
      type: "datetime",
      description: "Set this after Watchman Opanin has attended to the request.",
    }),
    defineField({
      name: "ministryNotes",
      title: "Ministry notes",
      type: "text",
      rows: 4,
      description: "Private notes for Watchman Opanin or the ministry team.",
    }),
  ],
  preview: {
    select: {
      title: "name",
      category: "category",
      status: "status",
      urgency: "urgency",
    },
    prepare({ title, category, status, urgency }) {
      const urgencyLabel = urgency === "urgent" ? "Urgent" : "Normal";

      return {
        title: title || "Prayer request",
        subtitle: `${category || "Prayer"} - ${urgencyLabel} - ${status || "new"}`,
      };
    },
  },
});
