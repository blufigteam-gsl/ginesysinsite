require('dotenv').config();
const axios = require('axios');

async function check() {

    const response = await axios.get(
        'https://www.ginesys.in/jsonapi/node/article'
    );

    const article = response.data.data[0];

    console.log(
        JSON.stringify(
            article.relationships,
            null,
            2
        )
    );
}

check();