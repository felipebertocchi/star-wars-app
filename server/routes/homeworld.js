const express = require('express');
const axios = require('axios');
const verify = require('../auth/verifyToken');
const router = express.Router();

router.get('/planet/:character', verify, (req, res) => {
    let id = req.params.character;
    axios.get('https://www.swapi.tech/api/people/' + id)
    .then(resp => {
        axios.get(resp.data.result.properties.homeworld)
        .then(resp => {
            res.send(resp.data);
        });
    });
});

module.exports = router;