import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'customer',
    title: 'Customers',
    type: 'document',

    fields: [

        defineField({
            name: 'title',
            title: 'Customer Name',
            type: 'string',
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
            name: 'logo',
            title: 'Customer Logo',
            type: 'image',
        }),

        defineField({
            name: 'logoAlt',
            title: 'Logo Alt Text',
            type: 'string',
        }),

        defineField({
            name: 'description',
            title: 'Customer Description',
            type: 'text',
        }),

        defineField({
            name: 'zones',
            title: 'Customer Zones',
            type: 'array',
            of: [{ type: 'string' }],
        }),

        defineField({
            name: 'departments',
            title: 'Departments',
            type: 'array',
            of: [{ type: 'string' }],
        }),

        defineField({
            name: 'locations',
            title: 'Locations',
            type: 'array',
            of: [{ type: 'string' }],
        }),

        defineField({
            name: 'useCases',
            title: 'Use Cases',
            type: 'array',
            of: [{ type: 'string' }],
        }),

        // defineField({
        //     name: 'sequence',
        //     title: 'Sequence',
        //     type: 'number',
        // }),

        defineField({
            name: 'videoUrl',
            title: 'Video URL',
            type: 'url',
        }),

        defineField({
            name: 'videoText',
            title: 'Video Text',
            type: 'string',
        }),

        defineField({
            name: 'kudos',
            title: 'Kudos',
            type: 'string',
        }),

        defineField({
            name: 'caseStudyReference',
            title: 'Case Study Reference',
            type: 'string',
        }),

        defineField({
            name: 'caseStudyPdf',
            title: 'Case Study PDF',
            type: 'file',
        }),

        defineField({
            name: 'productCategories',
            title: 'Product Categories',
            type: 'array',
            of: [{ type: 'string' }],
        }),


    ],
})