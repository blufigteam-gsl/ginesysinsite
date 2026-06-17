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

async function updateBlogAuthors() {

    let url =
        'https://www.ginesys.in/jsonapi/node/article';

    let articles = [];

    while (url) {

        const response = await axios.get(url);

        articles.push(...response.data.data);

        url =
            response.data.links?.next?.href || null;
    }

    console.log(
        `Found ${articles.length} blogs`
    );

    for (const article of articles) {

        const slug =
            article.attributes.path?.alias
                ?.replace('/blog/', '')
                ?.replace(/^\/+/, '') ||
            article.attributes.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-');

        const blog =
            await client.fetch(
                `*[_type == "blog" && slug.current == $slug][0]`,
                { slug }
            );

        if (!blog) continue;

        const authorId =
            article.relationships?.field_author_name?.data?.meta?.drupal_internal__target_id;

        if (!authorId) continue;

        const author =
            await client.fetch(
                `*[_type == "author" && drupalId == $id][0]{
                    _id
                }`,
                {
                    id: String(authorId),
                }
            );

        if (!author) {
            console.log(
                `Author not found for: ${article.attributes.title}`
            );
            continue;
        }

        await client
            .patch(blog._id)
            .set({
                author: {
                    _type: 'reference',
                    _ref: author._id,
                },
            })
            .commit();

        console.log(
            `Updated: ${article.attributes.title}`
        );
    }

    console.log(
        'Blog Author Update Completed'
    );
}

updateBlogAuthors().catch(console.error);