require('dotenv').config();
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2025-06-05',
    useCdn: false,
});

async function updateBlogs() {

    const author = await client.fetch(`
        *[_type == "author" && name == "Rohit Khetan"][0]{
            _id
        }
    `);

    if (!author) {
        console.log('Author not found');
        return;
    }

    const blogs = await client.fetch(`
        *[_type == "blog"]{
            _id,
            title
        }
    `);

    console.log(`Found ${blogs.length} blogs`);

    for (const blog of blogs) {

        await client
            .patch(blog._id)
            .set({
                author: {
                    _type: 'reference',
                    _ref: author._id
                }
            })
            .commit();

        console.log(`Updated: ${blog.title}`);
    }

    console.log('All blogs updated');
}

updateBlogs().catch(console.error);