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

async function updateReadingTime() {

    let url =
        'https://www.ginesys.in/jsonapi/node/article';

    let articles = [];

    while (url) {

        const response = await axios.get(url);

        articles.push(...response.data.data);

        url =
            response.data.links?.next?.href || null;
    }

    console.log(`Found ${articles.length} blogs`);

    for (const article of articles) {

        const slug =
            article.attributes.path?.alias
                ?.replace('/blog/', '')
                ?.replace(/^\/+/, '') ||
            article.attributes.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-');

        const blog = await client.fetch(
            `*[_type == "blog" && slug.current == $slug][0]{
                _id
            }`,
            { slug }
        );

        if (!blog) continue;

        await client
            .patch(blog._id)
            .set({
                readingTime:
                    article.attributes.field_time_to_read || '',
            })
            .commit();

        console.log(
            `Updated: ${article.attributes.title}`
        );
    }

    console.log(
        'Reading Time Update Completed'
    );
}

updateReadingTime().catch(console.error);