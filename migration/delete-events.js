require('dotenv').config();
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2025-06-05',
    useCdn: false,
});

async function deleteEvents() {

    const events = await client.fetch(
        '*[_type == "event"]{_id,title}'
    );

    console.log(`Found ${events.length} events`);

    for (const event of events) {

        await client.delete(event._id);

        console.log(
            `Deleted: ${event.title}`
        );
    }

    console.log('All events deleted');
}

deleteEvents().catch(console.error);