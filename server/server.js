const express = require('express');
const app = express();
const bodyParser = require('body-parser');



/** ---------- MIDDLEWARE ---------- **/
app.use(express.static('server/public/'));
app.use(bodyParser.json()); // needed for angular requests

/** ---------- EXPRESS ROUTES ---------- **/


/** ---------- MONGOOSE ------------ **/
const mongoose = require('mongoose');
// hr-app is the name of our database
// 27017 is the default mongo port number
// const databaseUrl = 'mongodb://localhost:27017/**CHANGE ME**';

// connect to mongoDB
// mongoose.connect(databaseUrl);

// // optional output from connectione events
// mongoose.connection.on('connected', () => {
//     console.log('mongoose is connected');    
// });

// mongoose.connection.on('error', () => {
//     console.log('mongoose connection failed'); 
// });


/** ---------- START SERVER ---------- **/
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
    console.log('Listening on port: ', app.get('port'));
});