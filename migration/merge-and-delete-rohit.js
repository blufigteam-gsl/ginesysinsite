require('dotenv').config();
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2025-06-05',
    useCdn: false,
});

const KEEP_AUTHOR =
    'MDh7A306aO3hJzqrDujGRD';

const DELETE_AUTHOR =
    'tnyYlxYwVJ82BGNx9Df5ya';

async function mergeAndDelete() {

    const blogs = await client.fetch(
        `*[
            _type == "blog" &&
            author._ref == $authorId
        ]{
            _id,
            title
        }`,
        {
            authorId: DELETE_AUTHOR
        }
    );

    console.log(
        `Found ${blogs.length} blogs`
    );

    for (const blog of blogs) {

        await client
            .patch(blog._id)
            .set({
                author: {
                    _type: 'reference',
                    _ref: KEEP_AUTHOR
                }
            })
            .commit();

        console.log(
            `Updated: ${blog.title}`
        );
    }

    const remaining = await client.fetch(
        `count(*[
            _type == "blog" &&
            author._ref == $authorId
        ])`,
        {
            authorId: DELETE_AUTHOR
        }
    );

    if (remaining === 0) {

        await client.delete(
            DELETE_AUTHOR
        );

        console.log(
            'Duplicate author deleted successfully'
        );

    } else {

        console.log(
            `Cannot delete author. ${remaining} blogs still reference it.`
        );
    }
}

mergeAndDelete().catch(console.error);