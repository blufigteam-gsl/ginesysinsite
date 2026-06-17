const axios = require('axios');

async function test() {

    const response = await axios.get(
        'https://www.ginesys.in/jsonapi/node/page?page[limit]=100'
    );

    console.log(response.data.links);

}

test();