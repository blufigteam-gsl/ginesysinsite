require('dotenv').config();
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2025-06-05',
    useCdn: false,
});

async function deleteCustomer() {

    try {

        const customer = await client.fetch(
            `*[_type == "customer" && slug.current == "kisah"][0]{
                _id,
                title
            }`
        );

        if (!customer) {

            console.log('Customer not found');
            return;

        }

        await client.delete(customer._id);

        console.log(`Deleted: ${customer.title}`);
        console.log(`ID: ${customer._id}`);

    } catch (error) {

        console.error(error);

    }

}

deleteCustomer();