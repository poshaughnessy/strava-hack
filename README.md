# Strava hack

This was my effort for the [pebble {code}](http://pebblecode.com/) "health and fitness" hackathon in June 2016. 
I'm hoping to keep working a bit more on this afterwards too.

## The idea

I wanted to help answer the question "am I getting fitter?" by reading your [Strava](https://www.strava.com/) activities 
and graphing them. Strava is great, but it doesn't have an easy way to chart your progress over time.

Here's the quick design I came up with on the day:

<img src="docs/strava-hack-design.png?raw=true" width="200px" alt="Design"/>


## Getting started

### Install dependencies

    npm install

### Add your Strava config

    mkdir config
    cp node_modules/strava-v3/strava_config data/
    [Edit strava_config and update the variables appropriately]

You will need to create an application at [labs.strava.com](http://labs.strava.com/developers/) if you haven't already.
See [node-strava-v3](https://github.com/UnbounDev/node-strava-v3) for more info.

### Download your Strava data and run up the server

    npm start

This will download your activities data into `public/activities.json`. You can also do this independently with:

    node strava
