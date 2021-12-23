const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/filmlist', (req, res) => {
    axios.get('https://www.swapi.tech/api/films')
        .then(resp => {
            res.send(resp.data);
        });
});

router.get('/filmlist/:filmId', (req, res) => {
    let id = req.params.filmId;
    axios.get('https://www.swapi.tech/api/films/' + id)
        .then(resp => {
            res.send(resp.data);
        });
});

module.exports = router;