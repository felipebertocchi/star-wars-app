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
const people = require('./routes/people');
const planets = require('./routes/planets');
const films = require('./routes/films');
const signup = require('./routes/signup');
const login = require('./routes/login');
const favorite = require('./routes/favorite');

// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(apiRoute, people);
app.use(apiRoute, planets);
app.use(apiRoute, films);
app.use(apiRoute, signup);
app.use(apiRoute, login);
app.use(apiRoute, favorite);

// SERVER LISTENING
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});