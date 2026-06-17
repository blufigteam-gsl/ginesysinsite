require('dotenv').config();
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2025-06-05',
    useCdn: false,
});

async function check() {

    const tags = await client.fetch(`
        *[_type == "tag"][0...5]
    `);

    console.log(
        JSON.stringify(
            tags,
            null,
            2
        )
    );
}

check();