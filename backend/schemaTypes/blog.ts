import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'blog',
    title: 'Blogs',
    type: 'document',

    fields: [
        // Basic Information
        defineField({
            name: 'title',
            title: 'Blog Title',
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
            name: 'excerpt',
            title: 'Excerpt / Short Description',
            type: 'text',
            rows: 3,
        }),

        defineField({
            name: 'content',
            title: 'Blog Content',
            type: 'text',
            rows: 20,
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'portableContent',
            title: 'New Blog Content',
            type: 'array',
            of: [{ type: 'block' }],
        }),

        // Images
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

        defineField({
            name: 'bannerImage',
            title: 'Banner Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),

        // Author
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }],
        }),

        // Category & Tags
        defineField({
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'category' }],
                },
            ],
        }),

        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'tag' }],
                },
            ],
        }),

        // Publishing
        defineField({
            name: 'publishDate',
            title: 'Publish Date',
            type: 'datetime',
        }),

        defineField({
            name: 'featuredBlog',
            title: 'Featured Blog',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'readingTime',
            title: 'Reading Time',
            type: 'string',
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
            description: 'Separate keywords with commas',
        }),

        defineField({
            name: 'canonicalUrl',
            title: 'Canonical URL',
            type: 'url',
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

        // Advanced Fields
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

        defineField({
            name: 'schemaMarkup',
            title: 'Schema Markup (JSON-LD)',
            type: 'text',
            rows: 10,
        }),
    ],

    preview: {
        select: {
            title: 'title',
            media: 'featuredImage',
            subtitle: 'authorName',
        },
    },
})