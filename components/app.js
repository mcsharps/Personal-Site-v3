import React from 'react';
import { Link } from 'react-router';
//
export default class AppComponent extends React.Component {
  render() {
    return (
      <div>
        <div id="triangle-topright"></div>
        <h1><a href='/' className='headerLink'>Madison Sharps</a></h1>
        <div className="myFace"></div>
        <ul>
          <li className="menu-list"><a href='/'>Home</a></li>
          <li className="menu-list"><a href='/resume'>Resumé</a></li>
          <li className="menu-list"><a href='/twitter'>Twitter</a></li>
          <li className="menu-list"><a href='/biking'>Biking</a></li>
        </ul>
        { this.props.children }
      </div>
    );
  }
}