import { defineField, defineType } from "sanity";

export default defineType({
    name: "logoCarousel",
    title: "Logo Carousel",
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
            name: "logos",
            title: "Logos",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "logoItem",
                    title: "Logo Item",
                    fields: [
                        defineField({
                            name: "image",
                            title: "Logo Image",
                            type: "image",
                            options: {
                                hotspot: true,
                            },
                        }),
                        defineField({
                            name: "altText",
                            title: "Alt Text",
                            type: "string",
                        }),
                        defineField({
                            name: "link",
                            title: "Link (Optional)",
                            type: "string",
                        }),
                    ],
                },
            ],
        }),

        defineField({
            name: "ctaText",
            title: "CTA Button Text",
            type: "string",
            initialValue: "See all customers",
        }),

        defineField({
            name: "ctaLink",
            title: "CTA Button Link",
            type: "string",
        }),

        defineField({
            name: "backgroundColor",
            title: "Background Color",
            type: "string",
            initialValue: "#0c453c", // Sleek dark green color matching the design
        }),

        defineField({
            name: "textColor",
            title: "Text Color",
            type: "string",
            initialValue: "#ffffff",
        }),

        defineField({
            name: "paddingTop",
            title: "Padding Top",
            type: "number",
            initialValue: 60,
        }),

        defineField({
            name: "paddingBottom",
            title: "Padding Bottom",
            type: "number",
            initialValue: 60,
        }),

        defineField({
            name: "speed",
            title: "Scroll Duration (Seconds)",
            description: "How long it takes for a full loop. Lower numbers scroll faster.",
            type: "number",
            initialValue: 30,
        }),
    ],
});
