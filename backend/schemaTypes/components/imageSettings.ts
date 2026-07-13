import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'imageSettings',
    title: 'Image Settings',
    type: 'object',

    fields: [

        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),

        defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
        }),

        defineField({
            name: 'borderRadius',
            title: 'Border Radius',
            type: 'number',
            initialValue: 0,
        }),

        defineField({
            name: 'objectFit',
            title: 'Object Fit',
            type: 'string',
            options: {
                list: [
                    {
                        title: 'Cover',
                        value: 'cover',
                    },
                    {
                        title: 'Contain',
                        value: 'contain',
                    },
                    {
                        title: 'Fill',
                        value: 'fill',
                    },
                ],
            },
            initialValue: 'cover',
        }),

        defineField({
            name: 'shadow',
            title: 'Enable Shadow',
            type: 'boolean',
            initialValue: false,
        }),

    ],
});