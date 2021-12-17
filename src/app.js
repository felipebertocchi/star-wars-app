const express = require('express');
const path = require('path'); 


const app = express();

// SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

// ROUTES
const apiRoute = '/v1'
const people = require('./routes/people');
const planets = require('./routes/planets');
const films = require('./routes/films');

// MIDDLEWARE
app.use(apiRoute, people);
app.use(apiRoute, planets);
app.use(apiRoute, films);

// SERVER LISTENING
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});