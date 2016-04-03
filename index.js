import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';

import AppComponent from '../components/app';
import IndexComponent from '../components/index';
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

var error = function (err, response, body) {
    // console.log('ERROR [%s]', err);
    return err;
};
var success = function (data) {
    // console.log(JSON.stringify(data, null, 2));
    console.log(typeof data);
    console.log(data.statuses);
};

var twitter = new Twitter();

//---React Routes ----\\

const routes = {
    path: '',
    component: AppComponent,
    childRoutes: [
        {
            path: '/',
            component: IndexComponent
        }
    ]
}

//---------------------\\



app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
app.get('*', function(request, response) {
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
         const routeContext = '<RoutingContext {...props} />';
         const markup = renderToString(routeContext);

         // render `index.ejs`, but pass in the markup we want it to display
         res.render('index', { markup })

       } else {
         // no route match, so 404. In a real app you might render a custom
         // 404 view here
         res.sendStatus(404);
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
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

// app.get('/cool', function(request, response){
// response.send(cool());
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