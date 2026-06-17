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

async function updateEventType() {

    let url =
        'https://ginesys.in/jsonapi/node/events';

    let events = [];

    while (url) {

        const response = await axios.get(url);

        events.push(...response.data.data);

        url =
            response.data.links?.next?.href || null;
    }

    console.log(
        `Found ${events.length} events`
    );

    for (const event of events) {

        const slug =
            event.attributes.path?.alias
                ?.replace('/event/', '')
                ?.replace(/^\/+/, '') ||
            event.attributes.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-');

        const sanityEvent =
            await client.fetch(
                `*[_type == "event" && slug.current == $slug][0]`,
                { slug }
            );

        if (!sanityEvent) {

            console.log(
                `Not Found In Sanity: ${slug}`
            );

            continue;
        }

        const eventTypeId =
            event.relationships?.field_event?.data?.id;

        let eventType = '';

        if (
            eventTypeId ===
            '26cfb802-805f-4be9-a69c-4c3a5b3f89c6'
        ) {

            eventType = 'ginesys-events';

        } else if (
            eventTypeId ===
            'b342e724-0f65-4928-861c-58b40160b988'
        ) {

            eventType = 'external-events';
        }

        await client
            .patch(sanityEvent._id)
            .set({
                eventType,
            })
            .commit();

        console.log(
            `Updated: ${event.attributes.title} -> ${eventType}`
        );
    }

    console.log(
        'Event Type Update Completed'
    );
}

updateEventType().catch(console.error);