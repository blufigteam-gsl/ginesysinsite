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

async function migrateEvents() {

    let url =
        'https://ginesys.in/jsonapi/node/events';

    let events = [];

    while (url) {

        const response = await axios.get(url);

        events.push(...response.data.data);

        url =
            response.data.links?.next?.href || null;
    }

    console.log(`Found ${events.length} events`);

    for (const event of events) {

        const slug =
            event.attributes.path?.alias
                ?.replace('/event/', '')
                ?.replace(/^\/+/, '') ||
            event.attributes.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-');

        const existing = await client.fetch(
            `*[_type == "event" && slug.current == $slug][0]`,
            { slug }
        );

        if (existing) {
            console.log(`Skipped: ${slug}`);
            continue;
        }

        const imageField =
            event.relationships?.field_events_featured_image?.data;

        let featuredImage = null;

        let featuredImageAlt =
            imageField?.meta?.alt || '';

        if (imageField?.id) {

            try {

                const fileResponse = await axios.get(
                    `https://ginesys.in/jsonapi/file/file/${imageField.id}`
                );

                const fileData =
                    fileResponse.data.data;

                const imageUrl =
                    'https://ginesys.in' +
                    fileData.attributes.uri.url;

                console.log(
                    'Uploading image:',
                    imageUrl
                );

                const imageBuffer = await axios.get(
                    imageUrl,
                    {
                        responseType: 'arraybuffer',
                    }
                );

                const uploadedImage =
                    await client.assets.upload(
                        'image',
                        Buffer.from(imageBuffer.data),
                        {
                            filename:
                                fileData.attributes.filename,
                        }
                    );

                featuredImage = {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: uploadedImage._id,
                    },
                };

            } catch (error) {

                console.log(
                    'Image upload failed:',
                    event.attributes.title,
                    error.message
                );
            }
        }

        await client.create({

            _type: 'event',

            title:
                event.attributes.title || '',

            slug: {
                current: slug,
            },

            featuredImage,

            featuredImageAlt,

            shortDescription:
                event.attributes.metatag?.find(
                    item =>
                        item.attributes?.name ===
                        'description'
                )?.attributes?.content || '',

            eventStartDate:
                event.attributes.field_start_date ||
                null,

            eventEndDate:
                event.attributes.field_start_date ||
                null,

            metaTitle:
                event.attributes.metatag?.find(
                    item =>
                        item.attributes?.name ===
                        'title'
                )?.attributes?.content || '',

            metaDescription:
                event.attributes.metatag?.find(
                    item =>
                        item.attributes?.name ===
                        'description'
                )?.attributes?.content || '',

            canonicalUrl:
                event.attributes.metatag?.find(
                    item =>
                        item.attributes?.rel ===
                        'canonical'
                )?.attributes?.href || '',

        });

        console.log(
            `Imported: ${event.attributes.title}`
        );
    }

    console.log(
        'Events Migration Completed'
    );
}

migrateEvents().catch(console.error);