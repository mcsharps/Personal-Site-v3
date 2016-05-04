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
 exports.getResume = (request, response) => {
     // routes is our object of React routes defined above
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

                 const markup = renderToString( < RouterContext {...props
                     }
                     />);
                     // /)

                     // render `index.ejs`, but pass in the markup we want it to display
                     response.render('index', {
                         markup
                     })

                 }
                 else {
                     // no route match, so 404. In a real app you might render a custom
                     // 404 view here
                     response.sendStatus(404);
                 }
             });
     }