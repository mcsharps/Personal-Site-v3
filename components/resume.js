import React from 'react';

export default class AboutComponent extends React.Component {
  render() {
    return (
      <div>
        <h3>Check out my Resumé on <a href="https://www.linkedin.com/pub/madison-sharps/25/299/889">linkedin</a></h3>
        <span>Here is a few highlights:</span>
        <ul>
        <li>Front End Web Developer at ISCS February 2015 - Present
            <ul>
            <li>Created sandbox for developer portal enabling developers to make standard http (GET, POST, PUT, DELETE) calls to the api.</li>
            <li>Utilized open source editor to allow developers to manipulate api responses creating an interactive space for api calls and responses, including allowances for path and query parameters.</li>
            <li>Refactored all controllers in web consumer application to IIFE style reducing global variable scope, and removing chances for variable collisions.</li>
            <li>Created and maintain a proof of concept application utilizing node, angular, third party api interaction, and oauth</li>
            <li>Refactored views folder to eliminate inconsistent naming patterns and follow the routing convention used to dictate routing throughout the rest of the app.</li>
            <li>Created Utility service to reduce duplicate functions across controllers as well as moving api calls into service reducing app load time by 5 seconds an 80% improvement.</li>
            </ul>
        </li>
        <li>Quality Assurance Engineer at Whiteboard it</li>
        <li>Bachelors from University of Alabama in MIS with a specialization in Global Business</li>
        </ul>
      </div>
    );
  }
}