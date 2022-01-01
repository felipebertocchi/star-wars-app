const express = require('express');
const axios = require('axios');
const verify = require('../auth/verifyToken');
const router = express.Router();

router.get('/residents/:planetId', verify, (req, res) => {
  let planetId = req.params.planetId;
  axios.get('https://www.swapi.tech/api/people?page=1&limit=null')
    .then(resp => {
      const residentes = []
      const listaPersonajes = (resp.data.results);
      for (let i = 0; i < listaPersonajes.length; i++) {
        axios.get(listaPersonajes[i].url)
          .then(resp => {
            let UrlPlanetaNatal = resp.data.result.properties.homeworld;
            if (UrlPlanetaNatal === ("https://www.swapi.tech/api/planets/" + planetId)) {
              residentes.push({
                charId: listaPersonajes[i].uid,
                charName: listaPersonajes[i].name
              })
            }
          });
        }
        res.send(residentes);
    });
});

module.exports = router;