import { defineField, defineType } from "sanity";

export default defineType({
    name: "accordionTabsShowcase",
    title: "Accordion Tabs Showcase",
    type: "object",

    fields: [
        defineField({
            name: "heading",
            title: "Section Heading",
            type: "string",
            initialValue: "One omnichannel cloud suite that works for you",
        }),

        defineField({
            name: "items",
            title: "Showcase Items",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "showcaseItem",
                    title: "Showcase Item",
                    fields: [
                        defineField({
                            name: "tabName",
                            title: "Tab Name / Heading",
                            type: "string",
                            validation: Rule => Rule.required(),
                        }),
                        defineField({
                            name: "description",
                            title: "Description Text",
                            type: "text",
                            rows: 4,
                            validation: Rule => Rule.required(),
                        }),
                        defineField({
                            name: "image",
                            title: "Dashboard Screenshot",
                            type: "image",
                            options: {
                                hotspot: true,
                            },
                            validation: Rule => Rule.required(),
                        }),
                        defineField({
                            name: "links",
                            title: "CTA Links",
                            type: "array",
                            of: [
                                {
                                    type: "object",
                                    name: "ctaLink",
                                    title: "CTA Link",
                                    fields: [
                                        defineField({
                                            name: "labelText",
                                            title: "Link Label",
                                            type: "string",
                                            validation: Rule => Rule.required(),
                                        }),
                                        defineField({
                                            name: "url",
                                            title: "Link URL",
                                            type: "string",
                                            validation: Rule => Rule.required(),
                                        }),
                                    ],
                                },
                            ],
                        }),
                    ],
                },
            ],
        }),

        // Padding Options
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
