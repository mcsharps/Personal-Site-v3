var cool = require('cool-ascii-faces');
var express = require('express');
var pg = require('pg');
var app = express();
var Twitter = require('twitter-node-client').Twitter;
var https = require('https');

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


	var options = {
	  hostname: 'api.twitter.com',
	  port: 443,
	  path: '/oauth2/token',
	  method: 'POST',
	  headers: 'OAuth oauth_consumer_key="LoZY48uym9VIk4tiCncSara3H", oauth_nonce="14b4d90a50a930d42634dcdf9fd2d782", oauth_signature="Cu0dv7kpCEpARH3us%2BaJR9WNxrg%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1457849580", oauth_token="23732632-ycuS2xbqiyMMxJXAU5VRno5zkLtJdofn57USN9RPG", oauth_version="1.0"',
	  //auth: user:password,

	};

	var req = https.request(function(options, res){
	  console.log('statusCode: ', res.statusCode);
	  console.log('headers: ', res.headers);

	  res.on(function(data, d){
	    process.stdout.write(d);
	  });
	});
	req.end();

	req.on(function(error, e){
	  console.error(e);
	});
});