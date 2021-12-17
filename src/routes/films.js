const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/film/:character', (req, res) => {
    let id = req.params.character;
    axios.get('https://www.swapi.tech/api/films/' + id)
    .then(resp => {
        res.send(resp.data)
    });
})

module.exports = router;