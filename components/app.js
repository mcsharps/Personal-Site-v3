import React from 'react';
import { Link } from 'react-router';

export default class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <h2>Welcome to my App</h2>
        <ul>
          <li><a href='/'>Home</a></li>
          <li><a href='/about'>About</a></li>
          <li><a href='/twitter'>Twitter</a></li>
          <li><a href='/strava'>Strava</a></li>
        </ul>
        { this.props.children }
      </div>
    );
  }
}