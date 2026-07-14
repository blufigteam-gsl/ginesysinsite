import { defineField, defineType } from "sanity";

export default defineType({
    name: "requestDemoForm",
    title: "Request Demo Form",
    type: "object",

    fields: [
        // Left Content Block
        defineField({
            name: "leftSubHeading",
            title: "Left Column Sub Heading",
            type: "subHeading",
        }),

        defineField({
            name: "leftHeading",
            title: "Left Column Heading",
            type: "heading",
        }),

        defineField({
            name: "leftDescription",
            title: "Left Column Description",
            type: "text",
            rows: 4,
        }),

        defineField({
            name: "leftImage",
            title: "Left Column Image (e.g. Phone Illustration)",
            type: "image",
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: "leftBgColor",
            title: "Left Column Background Color",
            type: "string",
            initialValue: "#0c453c", // Dark green
        }),

        defineField({
            name: "leftTextColor",
            title: "Left Column Text Color",
            type: "string",
            initialValue: "#ffffff",
        }),

        defineField({
            name: "bgImage",
            title: "Background Pattern Image Overlay",
            description: "Upload a background image pattern (e.g. geometric grid overlay) for the parent section.",
            type: "image",
            options: {
                hotspot: true,
            },
        }),

        // Form Content Settings
        defineField({
            name: "formHeading",
            title: "Form Heading",
            type: "string",
            initialValue: "Request For Demo",
        }),

        defineField({
            name: "formSubHeading",
            title: "Form Sub Heading",
            type: "string",
            initialValue: "Please enter your details to explore the Ginesys suite.",
        }),

        // Layout Padding Settings
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
