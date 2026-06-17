require('axios');
const axios = require('axios');

async function test() {

    const response = await axios.get(
        'https://www.ginesys.in/jsonapi/node/customers'
    );

    for (const customer of response.data.data) {

        if (customer.attributes.field_customer_description) {

            console.log(customer.attributes.title);

            console.log(
                JSON.stringify(
                    customer.attributes.field_customer_description,
                    null,
                    2
                )
            );

            break;
        }
    }
}

test();