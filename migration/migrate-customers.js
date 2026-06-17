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

async function migrateCustomers() {

    try {

        let customers = [];

        let nextUrl =
            'https://www.ginesys.in/jsonapi/node/customers';

        while (nextUrl) {

            const response = await axios.get(nextUrl);

            customers.push(
                ...response.data.data
            );

            nextUrl =
                response.data.links?.next?.href || null;

            console.log(
                `Collected ${customers.length} customers`
            );
        }

        console.log(
            `Found ${customers.length} customers`
        );

        if (customers.length === 0) {
            console.log('No customers found');
            return;
        }

        for (const customer of customers) {

            console.log(
                `Processing: ${customer.attributes.title}`
            );

            let logo = null;

            const imageUuid =
                customer.relationships?.field_client_image?.data?.id;

            if (imageUuid) {

                try {

                    const imageResponse = await axios.get(
                        `https://www.ginesys.in/jsonapi/file/file/${imageUuid}`
                    );

                    const imageUrl =
                        imageResponse.data.data.attributes.uri.url;

                    const imageFile = await axios.get(
                        `https://www.ginesys.in${imageUrl}`,
                        {
                            responseType: 'arraybuffer',
                        }
                    );

                    const asset =
                        await client.assets.upload(
                            'image',
                            Buffer.from(imageFile.data),
                            {
                                filename: 'customer-logo.jpg',
                            }
                        );

                    logo = {
                        _type: 'image',
                        asset: {
                            _type: 'reference',
                            _ref: asset._id,
                        },
                    };

                } catch (err) {

                    console.log(
                        `Logo error for ${customer.attributes.title}`
                    );

                }
            }

            const slug =
                customer.attributes.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-');

            const existing = await client.fetch(
                `*[_type == "customer" && slug.current == $slug][0]`,
                { slug }
            );

            if (existing) {

                console.log(`Skipped: ${slug}`);
                continue;

            }

            async function getTaxonomyName(type, uuid) {

                const response = await axios.get(
                    `https://www.ginesys.in/jsonapi/taxonomy_term/${type}/${uuid}`
                );

                return response.data.data.attributes.name;
            }

            const locations = [];

            for (const item of customer.relationships?.field_customers_location?.data || []) {

                locations.push(
                    await getTaxonomyName(
                        'customers_locations',
                        item.id
                    )
                );
            }

            const zones = [];

            for (const item of customer.relationships?.field_customer_?.data || []) {

                zones.push(
                    await getTaxonomyName(
                        'customers',
                        item.id
                    )
                );
            }

            const departments = [];

            for (const item of customer.relationships?.field_customer_filter_by?.data || []) {

                departments.push(
                    await getTaxonomyName(
                        'custome_vertical',
                        item.id
                    )
                );
            }

            const useCases = [];

            for (const item of customer.relationships?.field_use_cases?.data || []) {

                useCases.push(
                    await getTaxonomyName(
                        'use_cases',
                        item.id
                    )
                );
            }

            const productCategories = [];

            for (const item of customer.relationships?.field_product_categories?.data || []) {

                productCategories.push(
                    await getTaxonomyName(
                        'product_category',
                        item.id
                    )
                );
            }

            const doc = {

                _type: 'customer',

                title:
                    customer.attributes.title || '',

                slug: {
                    current: slug,
                },

                description:
                    JSON.stringify(
                        customer.attributes.field_customer_description
                    ) || '',

                kudos:
                    customer.attributes.field_kudos || '',

                ...(logo && { logo }),

                logoAlt:
                    customer.relationships?.field_client_image?.data?.meta?.alt || '',

                caseStudyReference: '',

                videoUrl: '',

                videoText: '',

                zones,

                departments,

                locations,

                useCases,

                productCategories,

            };

            console.log('zones', zones);
            console.log('departments', departments);
            console.log('locations', locations);
            console.log('useCases', useCases);
            console.log('productCategories', productCategories);

            const result =
                await client.create(doc);

            console.log(
                `Imported: ${customer.attributes.title}`
            );

            console.log(
                `Sanity ID: ${result._id}`
            );

        }

        console.log('Customer Migration Completed');

    } catch (error) {

        console.error(
            error.response?.data ||
            error.message
        );

    }
}

migrateCustomers();