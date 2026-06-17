require('dotenv').config();
const axios = require('axios');

async function testEvents() {

    const response = await axios.get(
        'https://ginesys.in/jsonapi/node/events'
    );

    const event = response.data.data[0];

    console.log('TITLE:');
    console.log(event.attributes.title);

    console.log('\nSTART DATE:');
    console.log(event.attributes.field_start_date);

    console.log('\nVENUE:');
    console.log(event.attributes.field_venue_location);

    console.log('\nBODY:');
    console.log(event.attributes.body);

    console.log('\nFEATURED IMAGE:');
    console.log(
        JSON.stringify(
            event.relationships?.field_events_featured_image,
            null,
            2
        )
    );
}

testEvents();