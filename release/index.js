'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

var _app = require('./components/app');

var _app2 = _interopRequireDefault(_app);

var _index = require('./components/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cool = require('cool-ascii-faces');
var express = require('express');
var pg = require('pg');
var app = express();
var Twitter = require('twitter-node-client').Twitter;
var https = require('https');
var bunyan = require('bunyan');
var strava = require('strava-v3');
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
var qs = require('qs');

var error = function error(err, response, body) {
  // console.log('ERROR [%s]', err);
  return err;
};
var success = function success(data) {
  // console.log(JSON.stringify(data, null, 2));
  console.log(typeof data === 'undefined' ? 'undefined' : _typeof(data));
  console.log(data.statuses);
};

var twitter = new Twitter();

//---React Routes ----\\

var routes = {
  path: '',
  component: _app2.default,
  childRoutes: [{
    path: '/',
    component: _index2.default
  }]
};

//---------------------\\

app.set('port', process.env.PORT || 5000);

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('*', function (request, response) {
  // routes is our object of React routes defined above
  (0, _reactRouter.match)({ routes: routes, location: req.url }, function (err, redirectLocation, props) {
    if (err) {
      // something went badly wrong, so 500 with a message
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      // we matched a ReactRouter redirect, so redirect from the server
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      // if we got props, that means we found a valid component to render
      // for the given route
      var routeContext = '<RoutingContext {...props} />';
      var markup = (0, _server.renderToString)(routeContext);

      // render `index.ejs`, but pass in the markup we want it to display
      res.render('index', { markup: markup });
    } else {
      // no route match, so 404. In a real app you might render a custom
      // 404 view here
      res.sendStatus(404);
    }
  });
});

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function (err, client, done) {
    client.query('SELECT * FROM test_table', function (err, result) {
      done();
      if (err) {
        console.error(err);response.send("Error " + err);
      } else {
        response.render('pages/db', { results: result.rows });
      }
    });
  });
});

// app.get('/cool', function(request, response){
// response.send(cool());
// });

// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });

// app.get('/twitter', function(request, response){
// 	twitter.getSearch({'q':'#feelthebern', 'geocode': '33.520796,-86.802709,100mi','count': 10, 'result_type': 'recent'},
// 		function(error){
// 			var errObj = JSON.parse(error);
// 	},  function(success){
// 			var successObj = JSON.parse(success);
// 			log.info(successObj.statuses[0].text);
// 			var statusesAsTexts = successObj.statuses.map(function(currentStatus, index){
// 				log.info(currentStatus.text);
// 				// var Status[index] = currentStatus.text;
// 			});
// 			response.render('pages/twitter', {results: successObj.statuses});
// 			// need to map all statuses array text to values and log'em out for now; render when I get the map working
// 	});
// 	// twitter.getUserTimeline({ screen_name: 'mcsharps', count: '10'}, error, success);
// });
// app.get('/strava', function(request, response){

// 	strava.athletes.stats({id:'7224264'},function(err, payload){
// 		if(err){
// 			log.info(err);
// 		}
// 		log.info(payload);
// 		log.info(payload.recent_ride_totals.count);
// 		log.info(payload.recent_ride_totals.distance);
// 		log.info(payload.recent_ride_totals.elevation_gain);
// 		response.render('pages/strava', {results: payload});
// 	});
// });