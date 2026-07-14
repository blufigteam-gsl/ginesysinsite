import { defineField, defineType } from "sanity";

export default defineType({
    name: "contactForm",
    title: "Contact Form",
    type: "object",

    fields: [
        defineField({
            name: "layoutType",
            title: "Layout Type",
            type: "string",
            options: {
                list: [
                    { title: "Centered Form Only", value: "centered" },
                    { title: "Split (Left Content, Right Form)", value: "split" },
                ],
            },
            initialValue: "split",
        }),

        // Left Column Content (Only used in split layout)
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

        // Form Content Settings
        defineField({
            name: "formHeading",
            title: "Form Heading",
            type: "string",
            initialValue: "How can we help you today?",
        }),

        defineField({
            name: "formSubHeading",
            title: "Form Sub Heading",
            type: "string",
            initialValue: "Please select the reason for reaching out so we can connect you with the right team.",
        }),

        // Support Tab Portal Redirect Card
        defineField({
            name: "supportPortalHeading",
            title: "Support Portal Heading",
            type: "string",
            initialValue: "Need After Sale Support?",
        }),

        defineField({
            name: "supportPortalText",
            title: "Support Portal Text",
            type: "text",
            rows: 3,
            initialValue: "Our dedicated team is here to help with quick ticket resolution and responsive assistance to ensure your experience stays smooth and hassle-free.",
        }),

        defineField({
            name: "supportPortalBtnText",
            title: "Support Portal Button Text",
            type: "string",
            initialValue: "Support Portal",
        }),

        defineField({
            name: "supportPortalBtnLink",
            title: "Support Portal Button Link",
            type: "string",
            initialValue: "https://support.ginesys.in",
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
