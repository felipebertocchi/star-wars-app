const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/planet', (req, res) => {
    let id = req.params.character;
    axios.get('https://www.swapi.tech/api/planets/')
    .then(resp => {
        res.send(resp.data);
    });
});

module.exports = router;