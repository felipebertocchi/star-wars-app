const express = require('express');
const axios = require('axios');
const verify = require('../auth/verifyToken');
const router = express.Router();

router.get('/film/:character', verify, (req, res) => {
    let id = req.params.character;
    axios.get('https://www.swapi.tech/api/films')
        .then(resp => {
            const PelisDondeAparece = [];
            const listaPeliculas = (resp.data.result);
            for (let i = 0; i < listaPeliculas.length; i++) {
                let listaPersonajes = (listaPeliculas[i].properties.characters);
                if (listaPersonajes.includes("https://www.swapi.tech/api/people/" + id)) {
                    PelisDondeAparece.push(listaPeliculas[i])
                }
            }
            res.send(PelisDondeAparece);
        });
});

module.exports = router;