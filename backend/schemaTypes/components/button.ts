import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'button',
    title: 'Button',
    type: 'object',

    fields: [

        defineField({
            name: 'text',
            title: 'Button Text',
            type: 'string',
        }),

        defineField({
            name: 'link',
            title: 'Button Link',
            type: 'string',
        }),

        defineField({
            name: 'backgroundColor',
            title: 'Background Color',
            type: 'string',
            initialValue: '#6CC24A',
        }),

        defineField({
            name: 'textColor',
            title: 'Text Color',
            type: 'string',
            initialValue: '#FFFFFF',
        }),

        defineField({
            name: 'borderColor',
            title: 'Border Color',
            type: 'string',
            initialValue: '#6CC24A',
        }),

        defineField({
            name: 'borderRadius',
            title: 'Border Radius',
            type: 'number',
            initialValue: 6,
        }),

        defineField({
            name: 'hoverBackgroundColor',
            title: 'Hover Background Color',
            type: 'string',
            initialValue: '#FFFFFF',
        }),

        defineField({
            name: 'hoverTextColor',
            title: 'Hover Text Color',
            type: 'string',
            initialValue: '#6CC24A',
        }),

        defineField({
            name: 'hoverBorderColor',
            title: 'Hover Border Color',
            type: 'string',
            initialValue: '#6CC24A',
        }),

        defineField({
            name: 'openInNewTab',
            title: 'Open In New Tab',
            type: 'boolean',
            initialValue: false,
        }),
    ],
});