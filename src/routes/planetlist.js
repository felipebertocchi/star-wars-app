const express = require('express');
const axios = require('axios');
const verify = require('../auth/verifyToken');
const router = express.Router();

router.get('/planetlist', verify, (req, res) => {
    axios.get('https://www.swapi.tech/api/planets?page=1&limit=null')
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