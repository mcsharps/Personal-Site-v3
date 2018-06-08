var Twitter = require('twitter-node-client').Twitter;
var twitter = new Twitter();
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
import {
    renderToString
} from 'react-dom/server';
import {
    match,
    RouterContext
} from 'react-router';
import {
    routes
} from '../routes';
exports.getTwitterResults = (request, response) => {
    match({
            routes,
            location: request.url
        }, (err, redirectLocation, props) => {
            if (err) {
                // something went badly wrong, so 500 with a message
                response.status(500).send(err.message);
            } else if (redirectLocation) {
                // we matched a ReactRouter redirect, so redirect from the server
                response.redirect(302, redirectLocation.pathname + redirectLocation.search);
            } else if (props) {
                // if we got props, that means we found a valid component to render
                // for the given route
                twitter.getSearch({
                        'q': '#programming',
                        'geocode': '40.005919,-105.255260,100mi',
                        'count': 10,
                        'result_type': 'both'
                    },
                    function(error) {
                        log.error(error);
                        var errObj = JSON.parse(error);
                    },
                    function(success) {
                        var successObj = JSON.parse(success);
                        var statusesAsTexts = successObj.statuses.map(function(currentStatus, index) {
                            log.info(currentStatus.text);
                            log.info(currentStatus.screen_name);
                        });
                        const markup = renderToString( < RouterContext {...props
                            }
                            />);
                            //)
                            response.render('twitter', {
                                results: successObj.statuses,
                                markup: markup
                            });
                            // need to map all statuses array text to values and log'em out for now; render when I get the map working
                        });

                }
                else {
                    // no route match, so 404. In a real app you might render a custom
                    // 404 view here
                    response.sendStatus(404);
                }
            });
            // twitter.getUserTimeline({ screen_name: 'mcsharps', count: '10'}, error, success);
        }