import { defineField, defineType } from "sanity";

export default defineType({
    name: "easeMyGstForm",
    title: "EaseMyGST Form",
    type: "object",

    fields: [
        defineField({
            name: "leftHeading",
            title: "Left Column Heading",
            type: "string",
            initialValue: "A comprehensive, all-in-one solution for your end-to-end GST requirements.",
        }),

        defineField({
            name: "leftDescription",
            title: "Left Column Description",
            type: "text",
            rows: 5,
            initialValue: "Remain unconcerned by evolving GST regulations—stay informed and fully GST compliant with EaseMyGST, the comprehensive GST software solution by Ginesys. It is also seamlessly integrated with the Ginesys One omni retail Suite built for online and offline retail.",
        }),

        defineField({
            name: "bgImage",
            title: "Background Pattern Image Overlay",
            description: "Upload a background pattern image (e.g. geometric lines) for the section.",
            type: "image",
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: "bgColor",
            title: "Right Column / Section Background Color",
            type: "string",
            initialValue: "#f8fafc",
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
