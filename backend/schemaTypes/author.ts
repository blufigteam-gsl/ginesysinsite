import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'author',
    title: 'Authors',
    type: 'document',

    fields: [
        defineField({
            name: 'name',
            title: 'Author Name',
            type: 'string',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'drupalId',
            title: 'Drupal ID',
            type: 'string',
        }),

        defineField({
            name: 'designation',
            title: 'Designation',
            type: 'string',
        }),

        defineField({
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'array',
            of: [{ type: 'block' }],
        }),

        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
        }),

        defineField({
            name: 'linkedinUrl',
            title: 'LinkedIn URL',
            type: 'url',
        }),

        defineField({
            name: 'twitterUrl',
            title: 'Twitter / X URL',
            type: 'url',
        }),

        defineField({
            name: 'websiteUrl',
            title: 'Website URL',
            type: 'url',
        }),

        defineField({
            name: 'featuredAuthor',
            title: 'Featured Author',
            type: 'boolean',
            initialValue: false,
        }),

        // SEO
        defineField({
            name: 'metaTitle',
            title: 'Meta Title',
            type: 'string',
        }),

        defineField({
            name: 'metaDescription',
            title: 'Meta Description',
            type: 'text',
            rows: 3,
        }),

        defineField({
            name: 'metaKeywords',
            title: 'Meta Keywords',
            type: 'string',
        }),

        defineField({
            name: 'noIndex',
            title: 'No Index',
            type: 'boolean',
            initialValue: false,
        }),

        defineField({
            name: 'ogTitle',
            title: 'OG Title',
            type: 'string',
        }),

        defineField({
            name: 'ogDescription',
            title: 'OG Description',
            type: 'text',
            rows: 3,
        }),

        defineField({
            name: 'ogImage',
            title: 'OG Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
    ],

    preview: {
        select: {
            title: 'name',
            subtitle: 'designation',
            media: 'profileImage',
        },
    },
})