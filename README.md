# Strava hack

## Add your Strava config

    mkdir data
    cp node_modules/strava-v3/strava_config data/
    [Update the variables appropriately]

See [node-strava-v3](https://github.com/UnbounDev/node-strava-v3) for more info.

## Download your Strava data

To generate the data files:

    node strava

*Temporarily!* Just for now, you will have to copy activities.json into the public folder.

## Now run up the server

    npm start
