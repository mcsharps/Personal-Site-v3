import React from 'react';

export default class AboutComponent extends React.Component {
  render() {
    return (
      <div>
        <h3>Check out my resumé on <a href="https://www.linkedin.com/pub/madison-sharps/25/299/889">linkedin</a></h3>
        <p>Here is a few highlights:
        <ul>
        <li>Front End Web Developer at ISCS</li>
        <li>Quality Assurance Engineer at Whiteboard it</li>
        <li>Bachelors from University of Alabama in MIS with a specialization in Global Business</li>
        </ul>
        </p>
      </div>
    );
  }
}