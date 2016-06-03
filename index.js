'use strict';

const strava = require('strava-v3');

console.log('Strava hack');

/**
 * Athletes.
 * Me: 12730853
 * Simon: 385273
 */
strava.athletes.get({id: 12730853}, function(err, payload) {

  console.log('athlete', payload);

});
