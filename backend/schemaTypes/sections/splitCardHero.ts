import { defineField, defineType } from "sanity";

export default defineType({
    name: "splitCardHero",
    title: "Split Card Hero",
    type: "object",

    fields: [
        defineField({
            name: "subHeading",
            title: "Sub Heading",
            type: "subHeading",
        }),

        defineField({
            name: "heading",
            title: "Heading",
            type: "heading",
        }),

        defineField({
            name: "description",
            title: "Description Text",
            type: "text",
            rows: 4,
        }),

        defineField({
            name: "buttonText",
            title: "Button Text",
            type: "string",
        }),

        defineField({
            name: "buttonLink",
            title: "Button Link",
            type: "string",
        }),

        defineField({
            name: "contentCardBg",
            title: "Content Card Background Color",
            type: "string",
            initialValue: "#0c453c", // Dark green
        }),

        defineField({
            name: "contentCardTextColor",
            title: "Content Card Text Color",
            type: "string",
            initialValue: "#ffffff",
        }),

        defineField({
            name: "image",
            title: "Media Card Image",
            type: "image",
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: "mediaCardBg",
            title: "Media Card Background Color",
            type: "string",
            initialValue: "#e5e7eb", // Light gray
        }),

        defineField({
            name: "reverse",
            title: "Reverse Layout (Media Card Left)",
            type: "boolean",
            initialValue: false,
        }),

        defineField({
            name: "paddingTop",
            title: "Padding Top (px)",
            type: "number",
            initialValue: 60,
        }),

        defineField({
            name: "paddingBottom",
            title: "Padding Bottom (px)",
            type: "number",
            initialValue: 60,
        }),
    ],
});
