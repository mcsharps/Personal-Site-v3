var cool = require('cool-ascii-faces');
var express = require('express');
var pg = require('pg');
var app = express();
var https = require('https');
var bunyan = require('bunyan');
var strava = require('strava-v3');
var Forecast = require('forecast.io');
var moment = require('moment-timezone');
var Twitter = require('twitter-node-client').Twitter;
var twitter = new Twitter();
var babel = require("babel-register")({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  ignore: false
});
var log = bunyan.createLogger({
  name: 'twitterAndStrava',
  streams: [
  {
      level: 'info',
      // stream: process.stdout,
      path: './myAppInfo.log'            // log INFO and above to stdout
  },
  {
      level: 'error',
      path: './myAppErrors.log'  // log ERROR and above to a file
  }
  ]
});
var qs = require('qs');

var options = {
  APIKey: process.env.FORECAST_API_KEY,
  timeout: 1000
};
var forecast = new Forecast();
var resume = require('./routes/resume');
var twitterRoute = require('./routes/twitter');

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { routes } from './routes';

app.set('port', (5000 || process.env.PORT));

app.use(express.static(__dirname + '/public'));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/resume', resume.getResume);
app.get('/twitter', twitterRoute.getTwitterResults)
app.get('/', function(request, response) {
    // routes is our object of React routes defined above
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

         const markup = renderToString(<RouterContext {...props} />); //

         // render `index.ejs`, but pass in the markup we want it to display
         response.render('index', { markup })

     } else {
         // no route match, so 404. In a real app you might render a custom
         // 404 view here
         response.sendStatus(404);
     }
 });


     });
    app.get('/db', function (request, response) {
      pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM test_table', function(err, result) {
          done();
          if (err)
             { console.error(err); response.send("Error " + err); }
         else
             { response.render('db', {results: result.rows} ); }
     });
    });
  });

        app.get('/biking', (request, response) => {
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
             log.info(err);
         }
         payload.recent_ride_totals.distance = Math.trunc(payload.recent_ride_totals.distance / 1609.344);
         payload.recent_ride_totals.elevation_gain = Math.trunc(payload.recent_ride_totals.elevation_gain * 3.2808);
         var latitude = 33.508385;
         var longitude = -86.783255;
            forecast.get(latitude, longitude, function (err, res, data) {
                if (err) {
                    log.info(err);
                    var forecast = err;
                }
                else if(data) {
                    var forecast = data.hourly.data;
                    forecast.forEach(function(currentValue){
                        currentValue.time = moment.unix(currentValue.time).tz('America/Chicago').format('MMMM Do YYYY, h:mm:ss a');
                        currentValue.precipProbability = Math.trunc(currentValue.precipProbability * 100);
                        log.info(currentValue.time);
                    })
                        // log.info(data.hourly.data);
                        const markup = renderToString(<RouterContext {...props} />); // /)
                        response.render('biking', {results: payload, forecast: forecast, markup: markup});
                }
            });
        });
     } else {
        // no route match, so 404. In a real app you might render a custom
        // 404 view here
        response.sendStatus(404);
        }
    })
});