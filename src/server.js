const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); 

const app = express();

// SETTINGS
app.set('port', process.env.PORT || 8080);
dotenv.config();
mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("MongoDB connected successfully"));

// ROUTES
const apiRoute = '/v1'
const people = require('./routes/people'); // Lista de personajes
const homeworld = require('./routes/homeworld'); // Planeta natal
const appearsOn = require('./routes/appearsOn'); // Peliculas donde aparece
const planetlist = require('./routes/planetlist'); // Lista de planetas, se puede usar un param ID para uno especifico
const filmlist = require('./routes/filmlist'); // Lista de peliculas, se puede usar un param ID para una especifica
const favorite = require('./routes/favorite');

// AUTH
const login = require('./auth/login');
const signup = require('./auth/signup');

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(apiRoute, people);
app.use(apiRoute, homeworld);
app.use(apiRoute, appearsOn);
app.use(apiRoute, planetlist);
app.use(apiRoute, filmlist);
app.use(apiRoute, favorite);

app.use(apiRoute, login);
app.use(apiRoute, signup);

// SERVER LISTENING
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});