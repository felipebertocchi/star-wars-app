const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/planetlist', (req, res) => {
    axios.get('https://www.swapi.tech/api/planets')
        .then(resp => {
            res.send(resp.data);
        });
});

router.get('/planetlist/:planetId', (req, res) => {
    let id = req.params.planetId;
    axios.get('https://www.swapi.tech/api/planets/' + id)
        .then(resp => {
            res.send(resp.data);
        });
});

module.exports = router;