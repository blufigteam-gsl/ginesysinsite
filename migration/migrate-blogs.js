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

        let url =
            'https://ginesys.in/jsonapi/node/article';

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

            const existing = await client.fetch(
                `*[_type == "blog" && slug.current == $slug][0]`,
                { slug }
            );

            if (existing) {
                console.log(`Skipped: ${slug}`);
                continue;
            }

            /*
            ======================
            CATEGORY REFERENCES
            ======================
            */

            const categoryRefs = [];

            const categoryId =
                article.relationships?.field_post_category?.data?.meta?.drupal_internal__target_id;

            if (categoryId) {

                const category = await client.fetch(
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
            ======================
            TAG REFERENCES
            ======================
            */

            const tagRefs = [];

            const tags =
                article.relationships?.field_tags?.data || [];

            for (const tag of tags) {

                const tagId =
                    tag.meta?.drupal_internal__target_id;

                if (!tagId) {
                    continue;
                }

                const sanityTag = await client.fetch(
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

            /*
            ======================
            FEATURED IMAGE
            ======================
            */

            let featuredImage = null;

            const imageUuid =
                article.relationships?.field_image?.data?.id;

            if (imageUuid) {

                try {

                    const imageResponse = await axios.get(
                        `https://www.ginesys.in/jsonapi/file/file/${imageUuid}`
                    );

                    const imageUrl =
                        imageResponse.data.data.attributes.uri.url;

                    const fullImageUrl =
                        `https://www.ginesys.in${imageUrl}`;

                    const imageFile = await axios.get(
                        fullImageUrl,
                        {
                            responseType: 'arraybuffer',
                        }
                    );

                    const asset =
                        await client.assets.upload(
                            'image',
                            Buffer.from(imageFile.data),
                            {
                                filename:
                                    article.relationships.field_image.data.meta.alt ||
                                    'blog-image.jpg',
                            }
                        );

                    featuredImage = {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: asset._id,
                        },
                    };

                } catch (err) {

                    console.log('====================');
                    console.log('IMAGE ERROR');
                    console.log(article.attributes.title);
                    console.log(err.message);

                    if (err.response) {
                        console.log(err.response.status);
                        console.log(err.response.data);
                    }

                    console.log('====================');
                }
            }

            const doc = {

                _type: 'blog',

                title: article.attributes.title || '',

                // author: {
                //     _type: 'reference',
                //     _ref: '038cff64-a110-46d3-b247-06348050ec19'
                // },

                slug: {
                    current: slug,
                },

                content:
                    article.attributes.body?.value || '',

                ...(featuredImage && {
                    featuredImage,
                }),

                featuredImageAlt:
                    article.relationships?.field_image?.data?.meta?.alt || '',

                excerpt:
                    article.attributes.body?.summary || '',

                publishDate:
                    article.attributes.created || null,

                categories: categoryRefs,

                tags: tagRefs,

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