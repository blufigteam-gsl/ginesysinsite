require('dotenv').config();
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2025-06-05',
    useCdn: false,
});

async function deleteCategories() {

    const categories = await client.fetch('*[_type == "category"]{_id}');

    console.log(`Found ${categories.length} categories`);

    for (const category of categories) {
        await client.delete(category._id);
        console.log(`Deleted: ${category._id}`);
    }

    console.log('All categories deleted');
}

deleteCategories().catch(console.error);