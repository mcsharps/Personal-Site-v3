var strava = require('strava-v3');
var DarkSky = require('forecast.io');
var fs = require('fs');
try {
var configPath = 'data/forecast_config';
var config = fs.readFileSync(configPath, {encoding: 'utf-8'});
config = JSON.parse(config);
var options = {
  APIKey: config.APIKey,
  timeout: config.timeout
};
var forecast = new DarkSky(options);
}
catch (err) {
var options = {
  APIKey: process.env.forecastAPIKey,
  timeout: 1000
};
var forecast = new DarkSky(options);

}
var moment = require('moment-timezone');
var bunyan = require('bunyan');
var log = bunyan.createLogger({
    name: 'twitterAndStrava',
    streams: [{
        level: 'info',
        // stream: process.stdout,
        path: './myAppInfo.log' // log INFO and above to stdout
    }, {
        level: 'error',
        path: './myAppErrors.log' // log ERROR and above to a file
    }]
});

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { routes } from '../routes';

exports.getBikingResults = (request, response) => {

           var getIcon = (currentValue) => {
                if(currentValue.icon === 'clear-day') {
                currentValue.icon = 'wi-day-sunny';
                }
                else if(currentValue.icon === 'clear-night') {
                    currentValue.icon = 'wi-night-clear';
                }
                else if(currentValue.icon === 'rain') {
                    currentValue.icon = 'wi-rain'
                }
                else if(currentValue.icon === 'snow') {
                    currentValue.icon = 'wi-snow'
                }
                else if(currentValue.icon === 'sleet') {
                    currentValue.icon = 'wi-sleet';
                }
                else if(currentValue.icon === 'wind') {
                    currentValue.icon = 'wi-wind';
                }
                else if(currentValue.icon === 'fog') {
                    currentValue.icon = 'wi-fog';
                }
                else if(currentValue.icon === 'cloudy') {
                    currentValue.icon = 'wi-cloudy'
                }
                else if(currentValue.icon === 'partly-cloudy-day') {
                    currentValue.icon = 'wi-day-cloudy'
                }
                else if(currentValue.icon === 'partly-cloudy-night') {
                    currentValue.icon =  'wi-night-alt-cloudy'
                }
            }

            match({ routes, location: request.url }, (err, redirectLocation, props) => {
              if (err) {
        // something went badly wrong, so 500 with a message
        response.status(500).send(err.message);
    } else if (redirectLocation) {
        // we matched a ReactRouter redirect, so redirect from the server
        response.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
        // if we got props, that means we found a valid component to render
        // for the given route

        strava.athletes.stats({id:'7224264'},function(err, payload){
          if(err){
             log.error(err);
         }
         payload.recent_ride_totals.distance = Math.trunc(payload.recent_ride_totals.distance / 1609.344);
         payload.recent_ride_totals.elevation_gain = Math.trunc(payload.recent_ride_totals.elevation_gain * 3.2808);
         var latitude = 40.005919; //Boulder
         var longitude = -105.255260;
            forecast.get(latitude, longitude, function (err, res, data) {
                if (err) {
                    log.error(err);
                    var forecast = err;
                }
                else if(data) {
                    var forecast = data.hourly.data;
                    forecast.forEach(function(currentValue){
                        currentValue.time = moment.unix(currentValue.time).tz('America/Denver').format('MMMM Do, h a');
                        currentValue.precipProbability = Math.trunc(currentValue.precipProbability * 100);
                        getIcon(currentValue);
                        log.info(currentValue.time);
                    })
                        // log.info(data.hourly.data);
                        const markup = renderToString(<RouterContext {...props} />); // /)
                        response.render('biking', {results: payload, forecast: forecast, markup: markup});
                }
            });
        });
     } else {
        // no route match, so 404. Need to render a custom
        // 404 view here
        response.sendStatus(404);
        }
    })
}