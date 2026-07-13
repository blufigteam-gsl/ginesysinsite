import { defineField, defineType } from "sanity";

export default defineType({
    name: "counter",
    title: "Counter Section",
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
            title: "Counter Items",
            type: "array",
            of: [
                {
                    type: "object",
                    name: "counterItem",
                    title: "Counter Item",
                    fields: [
                        defineField({
                            name: "stat",
                            title: "Stat (e.g., 80%, 7X)",
                            type: "string",
                            validation: Rule => Rule.required(),
                        }),
                        defineField({
                            name: "description",
                            title: "Description",
                            type: "text",
                            rows: 3,
                            validation: Rule => Rule.required(),
                        }),
                    ],
                },
            ],
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
            initialValue: "#333333",
        }),

        defineField({
            name: "statColor",
            title: "Stat Number Color",
            type: "string",
            initialValue: "#6cc24a",
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
