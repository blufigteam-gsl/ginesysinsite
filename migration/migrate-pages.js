require('dotenv').config();
const axios = require('axios');
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2025-06-05',
    useCdn: false,
});

async function migratePages() {

    try {

        let pages = [];
        let nextUrl =
            'https://www.ginesys.in/jsonapi/node/page?page[limit]=50';

        while (nextUrl) {

            const response = await axios.get(nextUrl);

            pages = [
                ...pages,
                ...response.data.data
            ];

            nextUrl =
                response.data.links?.next?.href || null;

            console.log(
                `Collected ${pages.length} pages`
            );
        }

        console.log(`Found ${pages.length} pages`);

        for (const page of pages) {

            const slug =
                page.attributes.path?.alias
                    ?.replace(/^\/+/, '') ||
                page.attributes.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-');

            const existing = await client.fetch(
                `*[_type == "page" && slug.current == $slug][0]`,
                { slug }
            );

            if (existing) {

                console.log(`Skipped: ${page.attributes.title}`);
                continue;

            }

            const metaTitle =
                page.attributes.metatag?.find(
                    item => item.attributes?.name === 'title'
                )?.attributes?.content || '';

            const metaDescription =
                page.attributes.metatag?.find(
                    item => item.attributes?.name === 'description'
                )?.attributes?.content || '';

            const doc = {

                _type: 'page',

                title:
                    page.attributes.title || '',

                slug: {
                    current: slug,
                },

                pageType: 'standard',

                publishDate:
                    page.attributes.created || null,

                metaTitle,

                metaDescription,

            };

            const result =
                await client.create(doc);

            console.log(
                `Imported: ${page.attributes.title}`
            );

            console.log(
                `Sanity ID: ${result._id}`
            );
        }

        console.log('Page Migration Completed');

    } catch (error) {

        console.error(
            error.response?.data ||
            error.message
        );

    }
}

migratePages();