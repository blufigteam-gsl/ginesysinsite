const axios = require('axios');

async function test() {

    const response = await axios.get(
        'https://www.ginesys.in/jsonapi'
    );

    console.log(
        JSON.stringify(response.data, null, 2)
    );

}

test().catch(console.error);