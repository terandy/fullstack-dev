import React, { Component } from 'react';
import Login from './Login.jsx';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchBar from './SearchBar.jsx';
import './dist/hamburgers.css';
import Dropdown from './Dropdown.jsx';
import styled from 'styled-components';

var scrollPos = 0;

let NavDiv = styled.div`
  position: fixed;
  width: 100%;
  z-index: 50;
  top: ${props => props.top};

  transition-duration: 0.5s;
  -webkit-transition-duration: 0.5s;
  -moz-transition-duration: 0.5s;
  -o-transition-duration: 0.5s;
  transition-timing-function: ease-in-out;
`;

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      checkToggle: false,
      hamburgerClass: 'hamburger hamburger--squeeze',
      toggleNav: 'toggle-nav',
      top: "0",
    };
  }
  componentDidMount = () => {
    window.addEventListener('resize', this.setClass);
    window.addEventListener('load', this.load);
    window.addEventListener('scroll', this.navScroll);
  };
  logoutHandler = () => {
    fetch('/logout', { method: 'POST' });
    this.props.dispatch({ type: 'logout' });
  };
  handleToggle = () => {
    if (this.state.checkToggle === false) {
      this.setState({
        hamburgerClass: 'hamburger hamburger--squeeze is-active',
        toggleNav: 'toggle-nav-on',
      });
    }
    if (this.state.checkToggle === true) {
      this.setState({
        hamburgerClass: 'hamburger hamburger--squeeze',
        toggleNav: 'toggle-nav'
      });
    }
    this.setState({ checkToggle: !this.state.checkToggle });
  };

  load = () => {
    if (window.innerWidth >= 968) {
      this.setState({ toggleNav: '' });
    }
  };

  setClass = () => {
    if (window.innerWidth >= 968) {
      this.setState({ toggleNav: '' });
    }
    if (window.innerWidth < 968) {
      this.setState({toggleNav: 'toggle-nav'})
      if (this.state.checkToggle === true) {
        this.setState({toggleNav: 'toggle-nav-on'})

      }
    }
  };

  navScroll = () => {
    if (
      document.body.getBoundingClientRect().top > scrollPos ||
      this.state.checkToggle === true
    ) {
      // scrolling up show nav
      this.setState({ top: '0%' });
    } else this.setState({ top: '-9%' }); //scrolling down hide nav
    scrollPos = document.body.getBoundingClientRect().top;
  };

  render = () => {
    var scrollPos = 0;
    return (
      <NavDiv top={this.state.top} className="nav">
        <div className="hideMobile mobileNav">
          <h1>
            <Link to="/">AliBay</Link>
          </h1>
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
              {this.props.user ? (
                <li>
                  <Link to="/add-item">Sell</Link>
                </li>
              ) : (
                ''
              )}
            </div>
            <div className="navRight">
              <SearchBar />
              {this.props.user ? (
                <li>
                  {'Welcome back ' + this.props.user}
                  <button onClick={this.logoutHandler}>Logout</button>{' '}
                </li>
              ) : (
                ''
              )}
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </div>
          </ul>
        </div>
      </NavDiv>
    );
  };
}

let mapStateToProps = state => {
  return { user: state.username };
};

export default connect(mapStateToProps)(Navigation);
