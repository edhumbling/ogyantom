import { defineArrayMember, defineField } from "sanity";

type RichBodyFieldOptions = {
  name?: string;
  title?: string;
  description?: string;
};

export function richBodyField({
  name = "body",
  title = "Body",
  description = "Optional blog-style content with headings, links, lists, quotes, images, video, and audio.",
}: RichBodyFieldOptions = {}) {
  return defineField({
    name,
    title,
    type: "array",
    description,
    of: [
      defineArrayMember({
        type: "block",
        styles: [
          { title: "Normal", value: "normal" },
          { title: "Heading 1", value: "h1" },
          { title: "Heading 2", value: "h2" },
          { title: "Heading 3", value: "h3" },
          { title: "Heading 4", value: "h4" },
          { title: "Quote", value: "blockquote" },
        ],
        lists: [
          { title: "Bullet", value: "bullet" },
          { title: "Numbered", value: "number" },
        ],
        marks: {
          decorators: [
            { title: "Bold", value: "strong" },
            { title: "Italic", value: "em" },
            { title: "Underline", value: "underline" },
            { title: "Strike-through", value: "strike-through" },
            { title: "Code", value: "code" },
          ],
          annotations: [
            {
              name: "link",
              title: "Link",
              type: "object",
              fields: [
                defineField({
                  name: "href",
                  title: "URL",
                  type: "url",
                }),
                defineField({
                  name: "openInNewTab",
                  title: "Open in new tab",
                  type: "boolean",
                  initialValue: true,
                }),
              ],
            },
          ],
        },
      }),
      defineArrayMember({
        type: "image",
        title: "Image",
        options: { hotspot: true },
        fields: [
          defineField({
            name: "alt",
            title: "Alternative text",
            type: "string",
          }),
          defineField({
            name: "caption",
            title: "Caption",
            type: "string",
          }),
        ],
      }),
      defineArrayMember({
        name: "videoEmbed",
        title: "Video embed",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
          }),
          defineField({
            name: "url",
            title: "Video URL",
            type: "url",
            description: "Use a YouTube, Vimeo, Facebook, or direct video link.",
          }),
          defineField({
            name: "caption",
            title: "Caption",
            type: "string",
          }),
        ],
      }),
      defineArrayMember({
        name: "videoFile",
        title: "Video upload",
        type: "file",
        options: { accept: "video/*" },
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
          }),
          defineField({
            name: "caption",
            title: "Caption",
            type: "string",
          }),
        ],
      }),
      defineArrayMember({
        name: "audioEmbed",
        title: "Audio embed",
        type: "object",
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
          }),
          defineField({
            name: "url",
            title: "Audio URL",
            type: "url",
            description: "Use a podcast, SoundCloud, or direct audio link.",
          }),
          defineField({
            name: "caption",
            title: "Caption",
            type: "string",
          }),
        ],
      }),
      defineArrayMember({
        name: "audioFile",
        title: "Audio upload",
        type: "file",
        options: { accept: "audio/*" },
        fields: [
          defineField({
            name: "title",
            title: "Title",
            type: "string",
          }),
          defineField({
            name: "caption",
            title: "Caption",
            type: "string",
          }),
        ],
      }),
    ],
  });
}
