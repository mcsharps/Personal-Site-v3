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
var indexRoute = require('./routes/indexRoute');
// var dbRoute = require('./routes/dbRoute');
var bikingRoute = require('./routes/bikingRoute');

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
app.get('/twitter', twitterRoute.getTwitterResults);
app.get('/', indexRoute.indexResults);
// app.get('/db', dbRoute.dbResults);
app.get('/biking', bikingRoute.getBikingResults);