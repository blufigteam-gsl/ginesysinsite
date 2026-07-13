import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'hero',
    title: 'Hero Banner',
    type: 'object',

    fields: [

        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'heading',
        }),

        defineField({
            name: 'subHeading',
            title: 'Sub Heading',
            type: 'subHeading',
        }),

        defineField({
            name: 'description',
            title: 'Description',
            type: 'description',
        }),

        defineField({
            name: 'listBlock',
            title: 'List Block',
            type: 'listBlock',
        }),

        defineField({
            name: 'primaryButton',
            title: 'Primary Button',
            type: 'button',
        }),

        defineField({
            name: 'secondaryButton',
            title: 'Secondary Button',
            type: 'button',
        }),

        defineField({
            name: 'contentAlignment',
            title: 'Content Alignment',
            type: 'string',
            options: {
                list: [
                    { title: 'Left', value: 'left' },
                    { title: 'Center', value: 'center' },
                    { title: 'Right', value: 'right' },
                ],
            },
            initialValue: 'left',
        }),

        defineField({
            name: 'backgroundImage',
            title: 'Background Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: 'backgroundColor',
            title: 'Background Color',
            type: 'string',
            initialValue: '#ffffff',
        }),

        defineField({
            name: 'paddingTop',
            title: 'Padding Top',
            type: 'number',
            initialValue: 100,
        }),

        defineField({
            name: 'paddingBottom',
            title: 'Padding Bottom',
            type: 'number',
            initialValue: 100,
        }),

        defineField({
            name: 'layoutType',
            title: 'Layout Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Full Width', value: 'fullWidth' },
                    { title: 'Contained', value: 'contained' },
                ],
            },
            initialValue: 'fullWidth',
        }),

        defineField({
            name: 'innerPaddingTop',
            title: 'Inner Padding Top (Contained Layout)',
            type: 'number',
            initialValue: 80,
        }),

        defineField({
            name: 'innerPaddingBottom',
            title: 'Inner Padding Bottom (Contained Layout)',
            type: 'number',
            initialValue: 80,
        }),

    ]
});