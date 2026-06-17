import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'page',
    title: 'Pages',
    type: 'document',

    fields: [
        // Basic Information
        defineField({
            name: 'title',
            title: 'Page Title',
            type: 'string',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'pageType',
            title: 'Page Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Home', value: 'home' },
                    { title: 'Standard Page', value: 'standard' },
                    { title: 'Landing Page', value: 'landing' },
                ],
            },
            initialValue: 'standard',
        }),

        defineField({
            name: 'excerpt',
            title: 'Short Description',
            type: 'text',
            rows: 3,
        }),

        defineField({
            name: 'pageBuilder',
            title: 'Page Builder',
            type: 'array',
            of: [
                { type: 'hero' },
            ],
        }),

        // Banner
        defineField({
            name: 'bannerTitle',
            title: 'Banner Title',
            type: 'string',
        }),

        defineField({
            name: 'bannerDescription',
            title: 'Banner Description',
            type: 'text',
            rows: 3,
        }),

        defineField({
            name: 'bannerImage',
            title: 'Banner Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),

        // Featured Image
        defineField({
            name: 'featuredImage',
            title: 'Featured Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: 'featuredImageAlt',
            title: 'Featured Image Alt Text',
            type: 'string',
        }),

        // Main Content
        defineField({
            name: 'content',
            title: 'Page Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),

        // Gallery
        defineField({
            name: 'gallery',
            title: 'Gallery Images',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                },
            ],
        }),

        // CTA
        defineField({
            name: 'ctaTitle',
            title: 'CTA Title',
            type: 'string',
        }),

        defineField({
            name: 'ctaDescription',
            title: 'CTA Description',
            type: 'text',
            rows: 3,
        }),

        defineField({
            name: 'ctaButtonText',
            title: 'CTA Button Text',
            type: 'string',
        }),

        defineField({
            name: 'ctaButtonUrl',
            title: 'CTA Button URL',
            type: 'string',
        }),

        // Publishing
        defineField({
            name: 'featuredPage',
            title: 'Featured Page',
            type: 'boolean',
            initialValue: false,
        }),

        defineField({
            name: 'showInMenu',
            title: 'Show In Menu',
            type: 'boolean',
            initialValue: true,
        }),

        defineField({
            name: 'publishDate',
            title: 'Publish Date',
            type: 'datetime',
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

        // Open Graph
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

        // Advanced
        defineField({
            name: 'customCss',
            title: 'Custom CSS',
            type: 'text',
            rows: 10,
        }),

        defineField({
            name: 'customJs',
            title: 'Custom JavaScript',
            type: 'text',
            rows: 10,
        }),
    ],

    preview: {
        select: {
            title: 'title',
            media: 'featuredImage',
            subtitle: 'pageType',
        },
    },
})