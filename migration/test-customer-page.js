const axios = require('axios');
const cheerio = require('cheerio');

async function test() {

    const response = await axios.get(
        'https://ginesys.in/node/2091'
    );

    const $ = cheerio.load(response.data);

    console.log('PAGE TITLE');
    console.log($('title').text());

    console.log('\n========== H1 TAGS ==========');

    $('h1').each((i, el) => {
        console.log(i, $(el).text().trim());
    });

    console.log('\n========== H2 TAGS ==========');

    $('h2').each((i, el) => {
        console.log(i, $(el).text().trim());
    });

    console.log('\n========== IMAGES ==========');

    $('img').each((i, el) => {
        console.log(i, $(el).attr('src'));
    });

    console.log('\n========== LINKS ==========');

    $('a').each((i, el) => {

        const href = $(el).attr('href');

        if (href) {
            console.log(i, href);
        }

    });

}

test().catch(console.error);