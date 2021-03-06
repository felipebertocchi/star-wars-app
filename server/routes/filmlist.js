const express = require('express');
const axios = require('axios');
const verify = require('../auth/verifyToken');
const router = express.Router();

router.get('/filmlist', verify, (req, res) => {
    axios.get('https://www.swapi.tech/api/films')
        .then(resp => {
            res.send(resp.data);
        });
});

router.get('/filmlist/:filmId', verify, (req, res) => {
    let id = req.params.filmId;
    axios.get('https://www.swapi.tech/api/films/' + id)
        .then(resp => {
            res.send(resp.data);
        });
});

module.exports = router;