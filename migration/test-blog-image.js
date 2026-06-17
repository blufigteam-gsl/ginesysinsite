require('dotenv').config();
const axios = require('axios');

async function test() {

    const response = await axios.get(
        'https://ginesys.in/jsonapi/node/article'
    );

    console.log(
        JSON.stringify(
            response.data.data[0].relationships,
            null,
            2
        )
    );
}

test().catch(console.error);