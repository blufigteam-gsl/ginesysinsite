require('dotenv').config();
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2025-06-05',
    useCdn: false,
});

async function updateAuthor() {

    const adminAuthor = await client.fetch(`
        *[_type == "author" && name == "Admin"][0]{
            _id
        }
    `);

    if (!adminAuthor) {
        console.log('Admin author not found');
        return;
    }

    await client
        .patch(adminAuthor._id)
        .set({
            name: 'Rohit Khetan',
            drupalId: '111',
            slug: {
                _type: 'slug',
                current: 'rohit-khetan'
            }
        })
        .commit();

    console.log('Admin updated to Rohit Khetan');
}

updateAuthor().catch(console.error);