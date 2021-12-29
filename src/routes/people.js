const express = require('express');
const axios = require('axios');
const verify = require('../auth/verifyToken');
const router = express.Router();

router.get('/character', verify, (req, res) => {
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
        axios.get('https://www.swapi.tech/api/people?page=1&limit=null')
        .then(resp => {
            res.send(resp.data);
        });
    }
});

module.exports = router;