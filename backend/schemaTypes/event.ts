import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'event',
    title: 'Events',
    type: 'document',

    fields: [
        // Basic Information
        defineField({
            name: 'title',
            title: 'Event Title',
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
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
            rows: 3,
        }),

        defineField({
            name: 'description',
            title: 'Event Description',
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
            title: 'Featured Image Alt',
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

        defineField({
            name: 'galleryImages',
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

        // Dates
        defineField({
            name: 'eventStartDate',
            title: 'Event Start Date',
            type: 'datetime',
            validation: Rule => Rule.required(),
        }),

        defineField({
            name: 'eventEndDate',
            title: 'Event End Date',
            type: 'datetime',
            validation: Rule => Rule.required(),
        }),

        // Event Type
        defineField({
            name: 'eventMode',
            title: 'Event Mode',
            type: 'string',
            options: {
                list: [
                    { title: 'Online', value: 'online' },
                    { title: 'Offline', value: 'offline' },
                    { title: 'Hybrid', value: 'hybrid' },
                ],
            },
        }),

        defineField({
            name: 'eventType',
            title: 'Event Type',
            type: 'string',
            options: {
                list: [
                    {
                        title: 'Ginesys Events',
                        value: 'ginesys-events',
                    },
                    {
                        title: 'External Events',
                        value: 'external-events',
                    },
                ],
            },
        }),

        // Location
        defineField({
            name: 'venueName',
            title: 'Venue Name',
            type: 'string',
        }),

        defineField({
            name: 'address',
            title: 'Address',
            type: 'text',
            rows: 3,
        }),

        defineField({
            name: 'city',
            title: 'City',
            type: 'string',
        }),

        defineField({
            name: 'state',
            title: 'State',
            type: 'string',
        }),

        defineField({
            name: 'country',
            title: 'Country',
            type: 'string',
        }),

        defineField({
            name: 'googleMapUrl',
            title: 'Google Map URL',
            type: 'url',
        }),

        // Registration
        defineField({
            name: 'showRegistrationButton',
            title: 'Show Registration Button',
            type: 'boolean',
            initialValue: true,
        }),

        defineField({
            name: 'registrationButtonText',
            title: 'Registration Button Text',
            type: 'string',
            initialValue: 'Register Now',
        }),

        defineField({
            name: 'registrationUrl',
            title: 'Registration URL',
            type: 'url',
        }),

        defineField({
            name: 'registrationDeadline',
            title: 'Registration Deadline',
            type: 'datetime',
        }),

        // Event Settings
        defineField({
            name: 'featuredEvent',
            title: 'Featured Event',
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
        },
    },
})