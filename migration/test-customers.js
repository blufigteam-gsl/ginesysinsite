require('dotenv').config();
const axios = require('axios');

async function testCustomers() {

    const response = await axios.get(
        'https://www.ginesys.in/jsonapi/node/customers?page[limit]=100'
    );

    console.log('Customers Found:', response.data.data.length);

    if (response.data.links?.next) {
        console.log('Next Page Exists');
    }

    console.log(
        JSON.stringify(response.data.meta, null, 2)
    );
}

testCustomers().catch(console.error);