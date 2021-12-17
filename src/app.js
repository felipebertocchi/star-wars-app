const express = require('express');
const path = require('path'); 


const app = express();

// SETTINGS
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

// ROUTES

// MIDDLEWARE

// SERVER LISTENING
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});