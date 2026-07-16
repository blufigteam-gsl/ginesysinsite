import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'The title of the website (used for SEO and page titles).',
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      description: 'The default meta description for the website (used for SEO).',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      description: 'The primary site logo displayed in the header.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for accessibility and SEO.',
        }
      ]
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon / Shortcut Icon',
      type: 'image',
      description: 'Upload a square icon (e.g. 512x512px) to generate the browser tab icon.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image (Social Sharing)',
      type: 'image',
      description: 'Fallback image shown when sharing the site link on social media or ads.',
      options: {
        hotspot: true,
      },
    }),
  ],
})
