import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'heading',
    title: 'Heading',
    type: 'object',

    fields: [

        defineField({
            name: 'text',
            title: 'Heading Text',
            type: 'string',
        }),

        defineField({
            name: 'tag',
            title: 'HTML Tag',
            type: 'string',
            options: {
                list: [
                    { title: 'H1', value: 'h1' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'H4', value: 'h4' },
                    { title: 'H5', value: 'h5' },
                    { title: 'H6', value: 'h6' },
                ],
            },
            initialValue: 'h2',
        }),

        defineField({
            name: 'color',
            title: 'Text Color',
            type: 'string',
            initialValue: '#222222',
        }),

        // defineField({
        //     name: 'alignment',
        //     title: 'Alignment',
        //     type: 'string',
        //     options: {
        //         list: [
        //             { title: 'Left', value: 'left' },
        //             { title: 'Center', value: 'center' },
        //             { title: 'Right', value: 'right' },
        //         ],
        //     },
        //     initialValue: 'left',
        // }),

    ],
});