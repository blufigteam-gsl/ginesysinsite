require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2025-06-05',
    useCdn: false,
});

const CACHE_FILE = './image-cache.json';

let imageCache = {};

if (fs.existsSync(CACHE_FILE)) {
    imageCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
}

async function saveCache() {
    fs.writeFileSync(
        CACHE_FILE,
        JSON.stringify(imageCache, null, 2)
    );
}

async function uploadImageToSanity(imageUrl) {

    if (imageCache[imageUrl]) {
        console.log(`Using cached image`);
        return imageCache[imageUrl];
    }

    console.log(`Downloading: ${imageUrl}`);

    const response = await axios({
        url: imageUrl,
        method: 'GET',
        responseType: 'stream',
    });

    const filename =
        path.basename(imageUrl.split('?')[0]);

    const asset = await client.assets.upload(
        'image',
        response.data,
        {
            filename,
        }
    );

    imageCache[imageUrl] = asset.url;

    await saveCache();

    console.log(`Uploaded: ${asset.url}`);

    return asset.url;
}

async function updateImages() {

    const blogs = await client.fetch(`
        *[_type == "blog"]{
            _id,
            title,
            content
        }
    `);

    // const blogs = await client.fetch(`
    //     *[_type == "blog" && title == "Retail POS System Strategy: Build, Buy, or Upgrade with Cloud, Mobile, and Web POS"]{
    //         _id,
    //         title,
    //         content
    //     }
    // `);

    console.log(`Found ${blogs.length} blogs`);

    for (const blog of blogs) {

        if (!blog.content) continue;

        console.log(`\nProcessing: ${blog.title}`);

        const $ = cheerio.load(blog.content);

        let changed = false;

        const images = $('img');

        for (let i = 0; i < images.length; i++) {

            const img = images[i];

            let src = $(img).attr('src');

            if (!src) continue;

            if (src.startsWith('/sites/default/files')) {
                src = `https://www.ginesys.in${src}`;
            }

            if (
                src.includes('cdn.sanity.io')
            ) {
                continue;
            }

            try {

                const sanityUrl =
                    await uploadImageToSanity(src);

                $(img).attr(
                    'src',
                    sanityUrl
                );

                changed = true;

            } catch (err) {

                console.error(
                    `Failed image: ${src}`
                );

                console.error(err.message);
            }
        }

        if (changed) {

            await client
                .patch(blog._id)
                .set({
                    content: $.html(),
                })
                .commit();

            console.log(
                `Updated: ${blog.title}`
            );
        }
    }

    console.log(
        '\nAll blogs processed successfully.'
    );
}

updateImages().catch(console.error);