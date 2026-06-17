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

    const count1 = await client.fetch(`
        count(*[
            _type == "blog" &&
            author._ref == "MDh7A306aO3hJzqrDujGRD"
        ])
    `);

    const count2 = await client.fetch(`
        count(*[
            _type == "blog" &&
            author._ref == "tnyYlxYwVJ82BGNx9Df5ya"
        ])
    `);

    console.log('Author 1:', count1);
    console.log('Author 2:', count2);
}

check();