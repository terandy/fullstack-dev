import React, { Component } from 'react';
import Login from './Login.jsx';
import LoginPopup from './LoginPopup.jsx';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchBar from './SearchBar.jsx'
import './dist/hamburgers.css';
import Dropdown from './Dropdown.jsx';

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      checkToggle: false,
      hamburgerClass: 'hamburger hamburger--squeeze',
      toggleNav: 'toggle-nav'
    };
  }
  handleToggle = () => {
    if (this.state.checkToggle === false) {
      this.setState({
        hamburgerClass: 'hamburger hamburger--squeeze',
        toggleNav: 'toggle-nav'
      });
    }
    if (this.state.checkToggle === true) {
      this.setState({
        hamburgerClass: 'hamburger hamburger--squeeze is-active',
        toggleNav: 'toggle-nav-on'
      });
    }
    this.setState({ checkToggle: !this.state.checkToggle });
  };

  render = () => {
    return (
      <div className="nav">
        <div className="hideBurger">
          <button
            className={this.state.hamburgerClass}
            type="button"
            onClick={this.handleToggle}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
        <div id="navItems" className={this.state.toggleNav}>
          <ul>
            <div className="navLeft">
              <li>
                <Link to="/">AliBay</Link>
              </li>
              <li>
                <Link to="/men">Men</Link>
              </li>
              <li>
                <Link to="/women">Women</Link>
              </li>
              <li>
                <Link to="/add-item">Sell</Link>
              </li>
            </div>
            <div className="navRight">
                <SearchBar/>
              <li>
                {' '}
                {this.props.user ? 'Welcome back ' + this.props.user : ''}
              </li>
              <li>{Dropdown('Login', <Login />)}</li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return { user: state.username };
};

export default connect(mapStateToProps)(Navigation);
