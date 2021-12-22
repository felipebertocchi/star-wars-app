const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/character', (req, res) => {
    let id = req.query.id;
    let name = req.query.name;
    if (id !== undefined) {
        axios.get('https://www.swapi.tech/api/people/' + id)
        .then(resp => {
            res.send(resp.data);
        });
    } else if (name !== undefined) {
        axios.get('https://www.swapi.tech/api/people/?name=' + name)
        .then(resp => {
            res.send(resp.data);
        });
    } else {
        axios.get('https://www.swapi.tech/api/people')
        .then(resp => {
            res.send(resp.data);
        });
    }
});

module.exports = router;