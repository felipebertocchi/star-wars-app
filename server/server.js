const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); 
const cookieParser = require('cookie-parser');

const app = express();

// SETTINGS
dotenv.config();
app.set('port', process.env.PORT || 8080);

// ROUTES
const apiRoute = '/v1'
const people = require('./routes/people'); // Lista de personajes
const homeworld = require('./routes/homeworld'); // Planeta natal
const appearsOn = require('./routes/appearsOn'); // Peliculas donde aparece
const planetlist = require('./routes/planetlist'); // Lista de planetas, se puede usar un param ID para uno especifico
const residents = require('./routes/residents'); // Lista de personajes que nacieron en determinado planeta
const filmlist = require('./routes/filmlist'); // Lista de peliculas, se puede usar un param ID para una especifica
const filmcharacters = require('./routes/filmcharacters'); // Lista de personajes que aparecen en una pelicula
const favorite = require('./routes/favorite');

// AUTH
const login = require('./auth/login');
const signup = require('./auth/signup');

// MIDDLEWARE
app.use(cookieParser());
app.use(cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: ['http://localhost:3000']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(apiRoute, people);
app.use(apiRoute, homeworld);
app.use(apiRoute, appearsOn);
app.use(apiRoute, planetlist);
app.use(apiRoute, residents);
app.use(apiRoute, filmlist);
app.use(apiRoute, filmcharacters);
app.use(apiRoute, favorite);

app.use(apiRoute, login);
app.use(apiRoute, signup);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../client/build/index.html"));
    })
} else {
    app.get('/', (req, res) => {
        res.send("Running in development env");
});
}

// SERVER LISTENING
mongoose.connect(process.env.DATABASE_ACCESS, () => {
    console.log("MongoDB connected successfully");
    
    app.listen(app.get('port'), () => {
        console.log('Server on port', app.get('port'));
    });
});