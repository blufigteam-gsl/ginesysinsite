import { defineField, defineType } from "sanity";

export default defineType({
    name: "owlCarousel",
    title: "Owl Carousel",
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
            title: "Carousel Items",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "carouselItem",
                    title: "Carousel Item",
                    fields: [
                        defineField({
                            name: "image",
                            title: "Image / Logo / Badge",
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
                            name: "title",
                            title: "Title / Award Name",
                            type: "string",
                        }),
                        defineField({
                            name: "subtitle",
                            title: "Subtitle / Role / Organization",
                            type: "string",
                        }),
                        defineField({
                            name: "detailText",
                            title: "Detail Text (e.g. Year / Event / Context)",
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
            name: "autoplay",
            title: "Autoplay",
            type: "boolean",
            initialValue: true,
        }),

        defineField({
            name: "autoplayTimeout",
            title: "Autoplay Interval (ms)",
            description: "Time delay between slides (default 5000ms)",
            type: "number",
            initialValue: 5000,
        }),

        defineField({
            name: "loop",
            title: "Infinite Loop",
            type: "boolean",
            initialValue: true,
        }),

        defineField({
            name: "showNav",
            title: "Show Navigation Arrows",
            type: "boolean",
            initialValue: true,
        }),

        defineField({
            name: "showDots",
            title: "Show Pagination Dots",
            type: "boolean",
            initialValue: true,
        }),

        defineField({
            name: "itemsDesktop",
            title: "Items per view (Desktop)",
            type: "number",
            initialValue: 4,
        }),

        defineField({
            name: "itemsTablet",
            title: "Items per view (Tablet)",
            type: "number",
            initialValue: 2,
        }),

        defineField({
            name: "itemsMobile",
            title: "Items per view (Mobile)",
            type: "number",
            initialValue: 1,
        }),

        defineField({
            name: "gap",
            title: "Gap between items (px)",
            type: "number",
            initialValue: 24,
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
