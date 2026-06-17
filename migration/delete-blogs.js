// delete-blogs.js

require('dotenv').config();
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2025-06-05',
    useCdn: false,
});

async function deleteBlogs() {

    const blogs = await client.fetch(
        '*[_type == "blog"]{_id,title}'
    );

    console.log(`Found ${blogs.length} blogs`);

    for (const blog of blogs) {

        await client.delete(blog._id);

        console.log(`Deleted: ${blog.title}`);
    }

    console.log('All blogs deleted');
}

deleteBlogs().catch(console.error);