import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

<<<<<<< HEAD

class Navigation extends Component{
    render = () => {    
        return (
        <div className="nav">
            <ul>
                <div className="navLeft">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/">Men</Link></li>
                    <li><Link to="/">Women</Link></li>
                    <li><Link to="/">Sell</Link></li>
                </div>
                <div className="navRight">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </div>
            </ul>
        </div>)
    }     
=======
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
>>>>>>> db03cac0c1ccbdbceaa79b38a308310eea4570a3
}

export default Navigation;
