import { defineField, defineType } from "sanity";

export default defineType({
    name: "featuresGrid",
    title: "Features Grid",
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
            name: "items",
            title: "Grid Items",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "gridItem",
                    title: "Grid Item",
                    fields: [
                        defineField({
                            name: "icon",
                            title: "Icon",
                            type: "image",
                            options: {
                                hotspot: true,
                            },
                        }),
                        defineField({
                            name: "title",
                            title: "Title",
                            type: "string",
                        }),
                        defineField({
                            name: "description",
                            title: "Description",
                            type: "text",
                            rows: 3,
                        }),
                    ],
                },
            ],
        }),

        defineField({
            name: "primaryButton",
            title: "Primary Button",
            type: "button",
        }),

        defineField({
            name: "secondaryButton",
            title: "Secondary Button",
            type: "button",
        }),

        defineField({
            name: "backgroundColor",
            title: "Background Color",
            type: "string",
            initialValue: "#ffffff",
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
            name: "iconStyle",
            title: "Icon Style / Position",
            type: "string",
            options: {
                list: [
                    { title: "Left Icon (Horizontal)", value: "left" },
                    { title: "Top Left Icon (Vertical)", value: "topLeft" },
                    { title: "Top Center Icon (Centered)", value: "topCenter" },
                ],
            },
            initialValue: "left",
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
    ],
});
