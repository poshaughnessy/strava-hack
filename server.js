'use strict';

const express = require('express');
const PORT = process.env.PORT || 9000;

let app = express();

app.use( '/css', express.static('public/css') );
app.use( '/img', express.static('public/img') );

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT);

console.log('Strava hack server started', PORT);

