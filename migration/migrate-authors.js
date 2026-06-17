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

async function migrateAuthors() {

    let url =
        'https://www.ginesys.in/jsonapi/user/user';

    let users = [];

    while (url) {

        const response = await axios.get(url);

        users.push(...response.data.data);

        url =
            response.data.links?.next?.href || null;
    }

    console.log(`Found ${users.length} authors`);

    for (const user of users) {

        const drupalId =
            String(
                user.attributes.drupal_internal__uid
            );

        const name =
            user.attributes.display_name ||
            user.attributes.name ||
            'Unknown Author';

        const existing =
            await client.fetch(
                `*[_type == "author" && drupalId == $id][0]`,
                {
                    id: drupalId,
                }
            );

        if (existing) {

            await client
                .patch(existing._id)
                .set({
                    name,
                    drupalId,
                })
                .commit();

            console.log(
                `Updated: ${name}`
            );

            continue;
        }

        await client.create({
            _type: 'author',

            name,

            drupalId,

            slug: {
                _type: 'slug',
                current: name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, ''),
            },

            featuredAuthor: false,
        });

        console.log(
            `Created: ${name}`
        );
    }

    console.log(
        'Author Migration Completed'
    );
}

migrateAuthors().catch(console.error);