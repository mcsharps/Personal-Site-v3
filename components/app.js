import React from 'react';
import { Link } from 'react-router';

export default class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <h1><a href='/' className='headerLink'>Madison Sharps</a></h1>
        <div className="myFace"></div>
        <ul>
          <li><a href='/'>Home</a></li>
          <li><a href='/resume'>Resumé</a></li>
          <li><a href='/twitter'>Twitter</a></li>
          <li><a href='/biking'>Biking</a></li>
        </ul>
        { this.props.children }
      </div>
    );
  }
}