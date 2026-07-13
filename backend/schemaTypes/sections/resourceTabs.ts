import { defineField, defineType } from "sanity";

export default defineType({
    name: "resourceTabs",
    title: "Resource Tabs",
    type: "object",

    fields: [
        defineField({
            name: "heading",
            title: "Heading",
            type: "heading",
        }),

        defineField({
            name: "subHeading",
            title: "Sub Heading",
            type: "subHeading",
        }),

        defineField({
            name: "limit",
            title: "Number of Items per Tab",
            description: "How many recent blogs/events to display. Default is 3.",
            type: "number",
            initialValue: 3,
        }),

        defineField({
            name: "backgroundColor",
            title: "Background Color",
            type: "string",
            initialValue: "#ffffff",
        }),

        defineField({
            name: "textColor",
            title: "Text Color",
            type: "string",
            initialValue: "#111111",
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
