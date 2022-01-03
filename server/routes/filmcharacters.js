const express = require('express');
const axios = require('axios');
const verify = require('../auth/verifyToken');
const router = express.Router();

router.get('/filmcharacters/:filmId', (req, res) => {
  let id = req.params.filmId;
  axios.get('https://www.swapi.tech/api/films/' + id)
    .then(resp => {
      const PersonajesEnLaPeli = [];
      const UrlPersonajesEnLaPeli = (resp.data.result.properties.characters);
      axios.get('https://www.swapi.tech/api/people?page=1&limit=null')
        .then(resp => {
          const listaPersonajes = resp.data.results
          for (let i = 0; i < UrlPersonajesEnLaPeli.length; i++) {
            for (let j = 0; j < listaPersonajes.length; j++) {
              if (UrlPersonajesEnLaPeli[i] === listaPersonajes[j].url) {
                PersonajesEnLaPeli.push({
                  charId: listaPersonajes[j].uid,
                  charName: listaPersonajes[j].name
                })
                break
              }
            }
          }
          res.send(PersonajesEnLaPeli);
        })
    });
});

module.exports = router;