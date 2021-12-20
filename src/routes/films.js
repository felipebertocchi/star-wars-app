const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/film/:character', (req, res) => {
    let id = req.params.character;
    axios.get('https://www.swapi.tech/api/people/' + id)
    .then(resp => {
        axios.get(resp.data.result.properties.films)
        .then(resp => {
            res.send(resp.data);
        });
    });
});

module.exports = router;