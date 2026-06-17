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

    for (const item of response.data.data) {

        const title = item.attributes.name;

        const existing = await client.fetch(
            `*[_type == "category" && title == $title][0]`,
            { title }
        );

        if (existing) {
            console.log(`Category exists: ${title}`);
            continue;
        }

        await client.create({
            _type: 'category',
            title,
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

    for (const item of response.data.data) {

        const title = item.attributes.name;

        const existing = await client.fetch(
            `*[_type == "tag" && title == $title][0]`,
            { title }
        );

        if (existing) {
            console.log(`Tag exists: ${title}`);
            continue;
        }

        await client.create({
            _type: 'tag',
            title,
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

    console.log('Completed');
}

run().catch(console.error);