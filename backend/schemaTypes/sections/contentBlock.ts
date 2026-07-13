import { defineField, defineType } from "sanity";

export default defineType({
    name: "contentBlock",
    title: "Content Block",
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
            name: "content",
            title: "Content",
            type: "array",
            of: [{ type: "block" }],
        }),

        defineField({
            name: "textAlign",
            title: "Text Align",
            type: "string",
            options: {
                list: [
                    { title: "Left", value: "left" },
                    { title: "Center", value: "center" },
                    { title: "Right", value: "right" },
                ],
            },
            initialValue: "left",
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