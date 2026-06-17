import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'hero',
    title: 'Hero Banner',
    type: 'object',

    fields: [

        defineField({
            name: 'title',
            title: 'Heading',
            type: 'string',
        }),

        defineField({
            name: 'subtitle',
            title: 'Sub Heading',
            type: 'string',
        }),

        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
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
        }),

        defineField({
            name: 'leftImage',
            title: 'Left Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: 'rightImage',
            title: 'Right Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: 'ctaText',
            title: 'Button Text',
            type: 'string',
        }),

        defineField({
            name: 'ctaLink',
            title: 'Button Link',
            type: 'string',
        }),

        defineField({
            name: 'layout',
            title: 'Layout',
            type: 'string',
            options: {
                list: [
                    {
                        title: 'Content Left - Image Right',
                        value: 'content-left-image-right',
                    },
                    {
                        title: 'Image Left - Content Right',
                        value: 'image-left-content-right',
                    },
                    {
                        title: 'Centered Content',
                        value: 'center-content',
                    },
                    {
                        title: 'Text Over Background',
                        value: 'text-over-background',
                    },
                    {
                        title: 'Two Column',
                        value: 'two-column',
                    },
                ],
            },
        }),

        defineField({
            name: 'container',
            title: 'Use Container',
            type: 'boolean',
            initialValue: true,
        }),

        defineField({
            name: 'paddingTop',
            title: 'Padding Top',
            type: 'number',
            initialValue: 80,
        }),

        defineField({
            name: 'paddingBottom',
            title: 'Padding Bottom',
            type: 'number',
            initialValue: 80,
        }),

        defineField({
            name: 'marginTop',
            title: 'Margin Top',
            type: 'number',
            initialValue: 0,
        }),

        defineField({
            name: 'marginBottom',
            title: 'Margin Bottom',
            type: 'number',
            initialValue: 0,
        }),

        defineField({
            name: 'textAlign',
            title: 'Text Align',
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
            name: 'overlay',
            title: 'Background Overlay',
            type: 'boolean',
            initialValue: false,
        }),

    ],
});