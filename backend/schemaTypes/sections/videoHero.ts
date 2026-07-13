import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'videoHero',
    title: 'Video Hero',
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
            name: 'videoType',
            title: 'Video Type',
            type: 'string',
            options: {
                list: [
                    {
                        title: 'YouTube',
                        value: 'youtube',
                    },
                    {
                        title: 'Vimeo',
                        value: 'vimeo',
                    },
                    {
                        title: 'Uploaded Video',
                        value: 'uploaded',
                    },
                ],
            },
            initialValue: 'youtube',
        }),

        defineField({
            name: 'videoUrl',
            title: 'Video URL',
            type: 'url',
        }),

        defineField({
            name: 'uploadedVideo',
            title: 'Uploaded Video',
            type: 'file',
            options: {
                accept: 'video/*',
            },
        }),

        defineField({
            name: 'posterImage',
            title: 'Poster Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: 'autoplay',
            title: 'Autoplay Video',
            type: 'boolean',
            initialValue: true,
        }),

        defineField({
            name: 'muteVideo',
            title: 'Mute Video',
            type: 'boolean',
            initialValue: true,
        }),

        defineField({
            name: 'loopVideo',
            title: 'Loop Video',
            type: 'boolean',
            initialValue: true,
        }),

        defineField({
            name: 'overlayColor',
            title: 'Overlay Color',
            type: 'string',
            initialValue: '#000000',
        }),

        defineField({
            name: 'overlayOpacity',
            title: 'Overlay Opacity',
            type: 'number',
            initialValue: 50,
        }),

        defineField({
            name: 'paddingTop',
            title: 'Padding Top',
            type: 'number',
            initialValue: 150,
        }),

        defineField({
            name: 'paddingBottom',
            title: 'Padding Bottom',
            type: 'number',
            initialValue: 150,
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
            initialValue: 'center',
        }),

    ],
});