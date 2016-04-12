import React from 'react';
import { Link } from 'react-router';

export default class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <h2>Welcome to my App</h2>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/about'>About</Link></li>
          <li><Link to='/twitter'>Twitter</Link></li>
          <li><Link to='/strava'>Strava</Link></li>
        </ul>
        { this.props.children }
      </div>
    );
  }
}