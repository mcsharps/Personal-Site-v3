var express = require('express');
var pg = require('pg');
var app = express();
var https = require('https');
var DarkSky = require('forecast.io');
var fs = require('fs');
var configPath = 'data/forecast_config';
var config = fs.readFileSync(configPath, {encoding: 'utf-8'});
config = JSON.parse(config);
var options = {
  APIKey: config.APIKey,
  timeout: config.timeout
};
var forecast = new DarkSky(options);
var babel = require("babel-register")({
  // This will override `node_modules` ignoring - you can alternatively pass
  // an array of strings to be explicitly matched or a regex / glob
  // ignore: false
});

/* Express Routes */
var resume = require('./routes/resume');
var twitterRoute = require('./routes/twitter');
var indexRoute = require('./routes/indexRoute');
// var dbRoute = require('./routes/dbRoute');
var bikingRoute = require('./routes/bikingRoute');
/* ------ */

app.set('port', ( process.env.PORT || 5000));
app.set('views', __dirname + '/views'); //ejs templates
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

/* Routes */
app.get('/resume', resume.getResume);
app.get('/twitter', twitterRoute.getTwitterResults);
app.get('/', indexRoute.indexResults);
// app.get('/db', dbRoute.dbResults);
app.get('/biking', bikingRoute.getBikingResults);
/* ---- */