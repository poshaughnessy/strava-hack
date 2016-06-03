'use strict';

const strava = require('strava-v3');
const jsonfile = require('jsonfile');

const FILE_PATH_ACTIVITIES = 'data/activities.json';

/**
 * Athletes.
 * Me: 12730853
 * Simon: 385273
 */
//strava.athletes.get({id: 12730853}, function(err, data) {
//  console.log('athlete', data);
//});

strava.athlete.listActivities({per_page: 100}, function(err, data) {

  console.log('Number of activities', data.length);

  jsonfile.writeFile(FILE_PATH_ACTIVITIES, data, function (err) {

    if (err) {
      console.error(err);
      return;
    }

    console.log('Generated', FILE_PATH_ACTIVITIES);

  })

});
