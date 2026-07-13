import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'subHeading',
    title: 'Sub Heading',
    type: 'object',

    fields: [

        defineField({
            name: 'text',
            title: 'Text',
            type: 'string',
        }),

        defineField({
            name: 'color',
            title: 'Text Color',
            type: 'string',
            initialValue: '#666666',
        }),

        defineField({
            name: 'opacity',
            title: 'Opacity',
            type: 'number',
            initialValue: 100,
            validation: Rule =>
                Rule.min(0).max(100),
        }),

        // defineField({
        //     name: 'alignment',
        //     title: 'Alignment',
        //     type: 'string',
        //     options: {
        //         list: [
        //             {
        //                 title: 'Left',
        //                 value: 'left',
        //             },
        //             {
        //                 title: 'Center',
        //                 value: 'center',
        //             },
        //             {
        //                 title: 'Right',
        //                 value: 'right',
        //             },
        //         ],
        //     },
        //     initialValue: 'left',
        // }),

    ],
});