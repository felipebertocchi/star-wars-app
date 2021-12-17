const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/character', (req, res) => {
    let id = req.query.id;
    axios.get('https://www.swapi.tech/api/people/' + id)
    .then(resp => {
        res.send(resp.data)
    });
})

module.exports = router;