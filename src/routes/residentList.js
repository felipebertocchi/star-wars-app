const express = require('express');
const axios = require('axios');
const verify = require('../auth/verifyToken');
const router = express.Router();

router.get('/residents/:planetId', verify, (req, res) => {
    let planetId = req.params.planetId;

    axios.get('http://localhost:8080/v1/planetlist/' + planetId)
        .then(resp => {
            const planetaNatal = (resp.data.result.properties.name);
        });

    axios.get('https://www.swapi.tech/api/people')
        .then(resp => {
            const numPersonas = (resp.data.total_records);
            const residentes = [];
            for (let i = 1; i <= numPersonas; i++) {
                axios.get('http://localhost:8080/v1/character?id=' + i)
                    .then(res => {
                        if (res.data.result.properties.homeworld == planetaNatal){
                            residentes.push()
                        }
                    });
                }
                res.send(residentes);
        });
});

module.exports = router;