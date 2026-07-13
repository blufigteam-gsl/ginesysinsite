import { defineField, defineType } from "sanity";

export default defineType({
    name: "htmlBlock",
    title: "HTML Block",
    type: "object",

    fields: [
        defineField({
            name: "htmlCode",
            title: "HTML Code",
            type: "text",
            rows: 15,
            description: "Write raw HTML code here. Ensure it is valid and secure.",
        }),

        defineField({
            name: "layoutType",
            title: "Layout Type",
            type: "string",
            options: {
                list: [
                    { title: "Full Width", value: "fullWidth" },
                    { title: "Contained", value: "contained" },
                ],
            },
            initialValue: "fullWidth",
        }),

        defineField({
            name: "innerPaddingTop",
            title: "Inner Padding Top (Contained Layout)",
            type: "number",
            initialValue: 80,
        }),

        defineField({
            name: "innerPaddingBottom",
            title: "Inner Padding Bottom (Contained Layout)",
            type: "number",
            initialValue: 80,
        }),

        defineField({
            name: "paddingTop",
            title: "Padding Top",
            type: "number",
            initialValue: 80,
        }),

        defineField({
            name: "paddingBottom",
            title: "Padding Bottom",
            type: "number",
            initialValue: 80,
        }),
    ],
});
