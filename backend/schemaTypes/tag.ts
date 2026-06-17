import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'tag',
    title: 'Tags',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Tag Name',
            type: 'string',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
            },
        }),

        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
        }),

        defineField({
            name: 'drupalId',
            title: 'Drupal ID',
            type: 'string',
            // hidden: true,
        })
    ],

    preview: {
        select: {
            title: 'title',
        },
    },
})