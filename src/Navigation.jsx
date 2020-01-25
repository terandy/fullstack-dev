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
      toggleNav: 'toggle-nav mobileNavList-off'
    };
  }
  handleToggle = () => {
    if (this.state.checkToggle === false) {
      this.setState({
        hamburgerClass: 'hamburger hamburger--squeeze is-active',
        toggleNav: 'toggle-nav-on mobileNavList'
      });
    }
    if (this.state.checkToggle === true) {
      this.setState({
        hamburgerClass: 'hamburger hamburger--squeeze',
        toggleNav: 'toggle-nav mobileNavList-off'
      });
    }
    this.setState({ checkToggle: !this.state.checkToggle });
  };

  load = () => {
    if (window.innerWidth >= 968) {
      this.setState({toggleNav: ''})
    }
  }

  setClass = () => {
    if (window.innerWidth >= 968) {
      this.setState({toggleNav: ''})
    }
    if (window.innerWidth < 968) {
      this.setState({toggleNav: 'toggle-nav mobileNavList-off'})
      if (this.state.checkToggle === true) {
        this.setState({toggleNav: 'toggle-nav-on mobileNavList'})

      }
    }
  }

  render = () => {
    window.addEventListener('resize', this.setClass);
    window.addEventListener('load', this.load);

    return (
      <div className="nav">
        <div className="hideMobile mobileNav">
          <h1><Link to="/">AliBay</Link></h1>
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
