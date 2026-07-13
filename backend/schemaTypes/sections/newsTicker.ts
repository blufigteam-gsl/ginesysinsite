import { defineField, defineType } from "sanity";

export default defineType({
    name: "newsTicker",
    title: "News Ticker",
    type: "object",

    fields: [
        defineField({
            name: "messages",
            title: "Ticker Messages",
            description: "List of alert messages or news items that scroll in the marquee.",
            type: "array",
            of: [{ type: "string" }],
        }),

        defineField({
            name: "speed",
            title: "Scroll Duration (Seconds)",
            description: "How many seconds it takes for the full loop. Lower numbers scroll faster.",
            type: "number",
            initialValue: 20,
        }),

        defineField({
            name: "backgroundColor",
            title: "Background Color",
            type: "string",
            initialValue: "#f3f4f6",
        }),

        defineField({
            name: "textColor",
            title: "Text Color",
            type: "string",
            initialValue: "#374151",
        }),

        defineField({
            name: "fontSize",
            title: "Font Size (px)",
            type: "number",
            initialValue: 14,
        }),

        defineField({
            name: "pauseOnHover",
            title: "Pause on Mouse Hover",
            type: "boolean",
            initialValue: true,
        }),

        defineField({
            name: "paddingTop",
            title: "Padding Top (px)",
            type: "number",
            initialValue: 12,
        }),

        defineField({
            name: "paddingBottom",
            title: "Padding Bottom (px)",
            type: "number",
            initialValue: 12,
        }),
    ],
});
