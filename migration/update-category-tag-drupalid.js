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

async function updateCategories() {

    const response = await axios.get(
        'https://ginesys.in/jsonapi/taxonomy_term/category'
    );

    for (const item of response.data.data) {

        const title =
            item.attributes.name;

        const drupalId =
            String(
                item.attributes.drupal_internal__tid
            );

        const category =
            await client.fetch(
                `*[_type == "category" && title == $title][0]`,
                { title }
            );

        if (!category) continue;

        await client
            .patch(category._id)
            .set({
                drupalId,
            })
            .commit();

        console.log(
            `Updated Category: ${title}`
        );
    }
}

async function updateTags() {

    const response = await axios.get(
        'https://ginesys.in/jsonapi/taxonomy_term/tags'
    );

    for (const item of response.data.data) {

        const title =
            item.attributes.name;

        const drupalId =
            String(
                item.attributes.drupal_internal__tid
            );

        const tag =
            await client.fetch(
                `*[_type == "tag" && title == $title][0]`,
                { title }
            );

        if (!tag) continue;

        await client
            .patch(tag._id)
            .set({
                drupalId,
            })
            .commit();

        console.log(
            `Updated Tag: ${title}`
        );
    }
}

async function run() {

    await updateCategories();

    await updateTags();

    console.log(
        'Category & Tag Update Completed'
    );
}

run().catch(console.error);