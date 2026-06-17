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

async function migrateBlogs() {
    try {

        const response = await axios.get(
            'https://ginesys.in/jsonapi/node/article'
        );

        const articles = response.data.data.slice(0, 10);

        console.log(`Found ${articles.length} blogs`);

        for (const article of articles) {

            const slug =
                article.attributes.path?.alias
                    ?.replace('/blog/', '')
                    ?.replace(/^\/+/, '') ||
                article.attributes.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-');

            const existing = await client.fetch(
                `*[_type == "blog" && slug.current == $slug][0]`,
                { slug }
            );

            if (existing) {
                console.log(`Skipped: ${slug}`);
                continue;
            }

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
                        item => item.attributes?.name === 'title'
                    )?.attributes?.content || '',

                metaDescription:
                    article.attributes.metatag?.find(
                        item => item.attributes?.name === 'description'
                    )?.attributes?.content || '',

                canonicalUrl:
                    article.attributes.metatag?.find(
                        item => item.attributes?.rel === 'canonical'
                    )?.attributes?.href || '',
            };

            const result = await client.create(doc);

            console.log(`Imported: ${article.attributes.title}`);
            console.log(`ID: ${result._id}`);
        }

        console.log('Migration Completed');

    } catch (error) {

        console.error('Migration Error');

        console.error(
            error.response?.data ||
            error.message
        );
    }
}

migrateBlogs();