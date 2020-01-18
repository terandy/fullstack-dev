import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navigation extends Component {
  render = () => {
    return (
      <div className="desktopnav">
        <div>Navigation</div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/add-item">Add item</Link>
          </li>
        </ul>
      </div>
    );
  };
}

export default Navigation;
