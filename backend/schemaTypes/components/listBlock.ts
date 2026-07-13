import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'listBlock',
    title: 'List Block',
    type: 'object',

    fields: [

        defineField({
            name: 'heading',
            title: 'List Heading',
            type: 'string',
        }),

        defineField({
            name: 'headingTag',
            title: 'Heading Tag',
            type: 'string',
            options: {
                list: [
                    { title: 'H3', value: 'h3' },
                    { title: 'H4', value: 'h4' },
                    { title: 'H5', value: 'h5' },
                    { title: 'H6', value: 'h6' },
                ],
            },
            initialValue: 'h4',
        }),

        defineField({
            name: 'headingColor',
            title: 'Heading Color',
            type: 'string',
            initialValue: '#222222',
        }),

        defineField({
            name: 'items',
            title: 'List Items',
            type: 'array',
            of: [
                {
                    type: 'string',
                },
            ],
        }),

        defineField({
            name: 'listColor',
            title: 'List Color',
            type: 'string',
            initialValue: '#666666',
        }),

        defineField({
            name: 'iconType',
            title: 'List Icon',
            type: 'string',
            options: {
                list: [
                    {
                        title: 'Checkmark',
                        value: 'check',
                    },
                    {
                        title: 'Arrow',
                        value: 'arrow',
                    },
                    {
                        title: 'Dot',
                        value: 'dot',
                    },
                    {
                        title: 'None',
                        value: 'none',
                    },
                ],
            },
            initialValue: 'check',
        }),

    ],
});