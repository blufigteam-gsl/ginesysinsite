require('axios')
    .get('https://www.ginesys.in/jsonapi/taxonomy_term/category')
    .then(r => {
        console.log(r.data.data[0]);
    });