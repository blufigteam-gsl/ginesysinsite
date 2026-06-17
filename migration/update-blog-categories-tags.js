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

async function updateBlogs() {

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

        if (!blog) {

            console.log(
                `Blog not found: ${slug}`
            );

            continue;
        }

        /*
        =====================
        CATEGORY
        =====================
        */

        const categoryRefs = [];

        const categoryId =
            article.relationships?.field_post_category?.data?.meta?.drupal_internal__target_id;

        if (categoryId) {

            const category =
                await client.fetch(
                    `*[_type == "category" && drupalId == $id][0]{
                        _id
                    }`,
                    {
                        id: String(categoryId),
                    }
                );

            if (category) {

                categoryRefs.push({
                    _key: category._id,
                    _type: 'reference',
                    _ref: category._id,
                });
            }
        }

        /*
        =====================
        TAGS
        =====================
        */

        const tagRefs = [];

        const tags =
            article.relationships?.field_tags?.data || [];

        for (const tag of tags) {

            const tagId =
                tag.meta?.drupal_internal__target_id;

            if (!tagId) continue;

            const sanityTag =
                await client.fetch(
                    `*[_type == "tag" && drupalId == $id][0]{
                        _id
                    }`,
                    {
                        id: String(tagId),
                    }
                );

            if (sanityTag) {

                tagRefs.push({
                    _key: sanityTag._id,
                    _type: 'reference',
                    _ref: sanityTag._id,
                });
            }
        }

        await client
            .patch(blog._id)
            .set({
                categories: categoryRefs,
                tags: tagRefs,
            })
            .commit();

        console.log(
            `Updated: ${article.attributes.title}`
        );
    }

    console.log(
        'Blog Category & Tag Update Completed'
    );
}

updateBlogs().catch(console.error);