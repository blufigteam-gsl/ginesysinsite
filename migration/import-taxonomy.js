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

async function importCategories() {

    const response = await axios.get(
        'https://ginesys.in/jsonapi/taxonomy_term/category'
    );

    console.log(
        `Found ${response.data.data.length} categories`
    );

    for (const item of response.data.data) {

        const title = item.attributes.name;

        const existing = await client.fetch(
            `*[_type=="category" && title==$title][0]`,
            { title }
        );

        if (existing) {
            console.log(`Skipped Category: ${title}`);
            continue;
        }

        // Categories import
        await client.create({
            _type: 'category',
            title,
            drupalId: String(item.attributes.drupal_internal__tid),
            slug: {
                current: title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
            }
        });

        console.log(`Created Category: ${title}`);
    }
}

async function importTags() {

    const response = await axios.get(
        'https://ginesys.in/jsonapi/taxonomy_term/tags'
    );

    console.log(
        `Found ${response.data.data.length} tags`
    );

    for (const item of response.data.data) {

        const title = item.attributes.name;

        const existing = await client.fetch(
            `*[_type=="tag" && title==$title][0]`,
            { title }
        );

        if (existing) {
            console.log(`Skipped Tag: ${title}`);
            continue;
        }

        // Tags import
        await client.create({
            _type: 'tag',
            title,
            drupalId: String(item.attributes.drupal_internal__tid),
            slug: {
                current: title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
            }
        });

        console.log(`Created Tag: ${title}`);
    }
}

async function run() {
    await importCategories();
    await importTags();

    console.log('Migration Completed');
}

run().catch(console.error);