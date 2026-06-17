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

async function migrateOneBlog() {
    try {

        const response = await axios.get(
            'https://ginesys.in/jsonapi/node/article'
        );

        const article = response.data.data[0];
        // for (const article of response.data.data) {
        // create blog
        // }

        if (!article) {
            console.log('No article found');
            return;
        }

        const slug =
            article.attributes.path?.alias
                ?.replace('/blog/', '')
                ?.replace(/^\/+/, '') ||
            article.attributes.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-');

        const doc = {
            _type: 'blog',

            title: article.attributes.title || '',

            slug: {
                current: slug,
            },

            content: article.attributes.body?.value || '',

            excerpt: article.attributes.body?.summary || '',

            publishDate: article.attributes.created || null,

            metaTitle:
                article.attributes.metatag?.find(
                    item =>
                        item.attributes?.name === 'title'
                )?.attributes?.content || '',

            metaDescription:
                article.attributes.metatag?.find(
                    item =>
                        item.attributes?.name === 'description'
                )?.attributes?.content || '',

            canonicalUrl:
                article.attributes.metatag?.find(
                    item =>
                        item.attributes?.rel === 'canonical'
                )?.attributes?.href || '',
        };

        const result = await client.create(doc);

        console.log('Imported Successfully');
        console.log(result._id);

    } catch (error) {

        console.error('Migration Error');

        console.error(
            error.response?.data ||
            error.message
        );
    }
}

migrateOneBlog();