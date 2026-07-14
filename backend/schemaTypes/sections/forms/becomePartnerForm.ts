import { defineField, defineType } from "sanity";

export default defineType({
    name: "becomePartnerForm",
    title: "Become A Partner Form",
    type: "object",

    fields: [
        defineField({
            name: "leftSubHeading",
            title: "Left Column Subheading",
            type: "string",
            initialValue: "Become A Partner",
        }),

        defineField({
            name: "leftHeading",
            title: "Left Column Heading",
            type: "string",
            initialValue: "Opening Up New Opportunities Together",
        }),

        defineField({
            name: "leftDescription",
            title: "Left Column Description",
            type: "text",
            rows: 5,
            initialValue: "Ginesys is a fast growing company with a wide network and being a part of this has its own rewards for partners.",
        }),

        defineField({
            name: "bgImage",
            title: "Background Pattern Image Overlay",
            description: "Upload a background pattern image (e.g. circles outline pattern) for the section.",
            type: "image",
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: "bgColor",
            title: "Section Background Color",
            type: "string",
            initialValue: "#ffffff",
        }),

        defineField({
            name: "formBgColor",
            title: "Form Block Background Color",
            description: "If you want to set a background color specifically for the form card area (e.g. #8cc63f). Leave empty for transparent.",
            type: "string",
            initialValue: "",
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
