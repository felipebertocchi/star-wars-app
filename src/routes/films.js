const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/film', (req, res) => {
    axios.get('https://www.swapi.tech/api/films')
    .then(resp => {
        res.send(resp.data);
    });
});

module.exports = router;