require('dotenv').config();
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2025-06-05',
    useCdn: false,
});

async function deleteTags() {

    const tags = await client.fetch('*[_type == "tag"]{_id}');

    console.log(`Found ${tags.length} tags`);

    for (const tag of tags) {
        await client.delete(tag._id);
        console.log(`Deleted: ${tag._id}`);
    }

    console.log('All tags deleted');
}

deleteTags().catch(console.error);