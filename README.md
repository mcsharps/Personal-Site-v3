# My Personal Site - version 3
This was created using Heroku's template project, a chance for me to explore
Express JS, Embedded Javascript Templates, React, as well as various API integrations including:
Twitter, Darksky (formerly forecast.io), and Strava.



## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```sh
$ git clone git@github.com:mcsharps/Personal-Site-v3.git
$ cd Personal-Site-v3
$ npm install
Add a .env file that looks something like this:

TIMES=XXX
twitterConsumerKey=XXXXXX
twitterConsumerSecret=XXXXX
twitterAccessToken=XXXX
twitterAccessTokenSecret=XXXXX
twitterCallBackUrl=XXX

Add a data directory with a forecast_config file, strava_config file, and a twitter_config file.

Each file should be a json like this:
forecast_config

{
  "APIKey": "XXXX",
  "timeout": XXXX
}

strava_config

{
    "access_token"    :"XXXXX"
    , "client_id"     :"XXXX"
    , "client_secret" :"XXXXX"
    , "redirect_uri"  :"XXXXXXX"
}

twitter_config

{
       "consumerKey": "XXXXX",
       "consumerSecret": "XXXXX",
       "accessToken": "XXXXXX",
       "accessTokenSecret": "XXXXXXX",
       "callBackUrl": "XXXXX"
}

after those are configured with keys run
$ gulp

//gulp to digest latest changes

$ heroku local
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

