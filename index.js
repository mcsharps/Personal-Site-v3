var cool = require('cool-ascii-faces');
var express = require('express');
var pg = require('pg');
var app = express();
var Twitter = require('twitter-node-client').Twitter;
var https = require('https');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "twitterAndStrava"});

var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    console.log(JSON.stringify(data, 2, 2));
};

var config = {
       "consumerKey": "xyUPXQu2SEcOsxWlkT0Lf502z",
       "consumerSecret": "jSX68nEnziiL6sqOlNx6RgygEWvyjpPANSZg4ocH3pfc7N7Nxv",
       "accessToken": "23732632-UBDfIaeMkLoRVWhJFAOYWproZV1WxlQDGGAHzkWLV",
       "accessTokenSecret": "QgDPaGbue2TcBDjmVUZ1M5U29q1hyCkim9iytGDZGbTt6",
       "callBackUrl": "127.0.0.1:5000"
   };

var twitter = new Twitter(config);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
 response.render('pages/index');
//  var result = '';
//  var times = process.env.TIMES || 5;
//  for (var i=0; i < times; i++)
//	result += cool();
//  response.send(result);

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

app.get('/cool', function(request, response){
response.send(cool());
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/twitter', function(request, response){
	//https call to oauth2 token request
	//log response and check


	twitter.getSearch({'q':'#feelthebern', 'geocode': '33.520796,-86.802709,100mi','count': 10}, 
		function(error){
			response.render('pages/twitter', {error: error});
		}, 
		function(success){
			response.render('pages/twitter', {results: success});
			log.info(success.text);
		});
	// twitter.getUserTimeline({ screen_name: 'mcsharps', count: '10'}, error, success);
});