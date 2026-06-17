const axios = require('axios');

async function check() {

    const response = await axios.get(
        'https://www.ginesys.in/jsonapi/user/user'
    );

    console.log(
        JSON.stringify(
            response.data.data,
            null,
            2
        )
    );
}

check().catch(console.error);