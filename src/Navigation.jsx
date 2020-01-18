import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './dist/hamburgers.css'


class Navigation extends Component{
    constructor() {
        super() 
            this.state = {
                checkToggle: false,
                hamburgerClass: "hamburger hamburger--squeeze",
                toggleNav: {display: "none"}
            }
    }
    handleToggle = () => {
        if (this.state.checkToggle === false) {
            this.setState({ hamburgerClass: "hamburger hamburger--squeeze", toggleNav: {display: "none"} })
        }
        if (this.state.checkToggle === true) {
            this.setState({ hamburgerClass: "hamburger hamburger--squeeze is-active",  toggleNav: {display: "block"} })
        }
        this.setState({ checkToggle: !this.state.checkToggle })
    }
    render = () => {
        return (
        <div className="nav">
            <div className="hideBurger">            
                <button className={this.state.hamburgerClass} type="button" onClick={this.handleToggle}>
                <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                </span>
                </button> 
            </div>

            <ul style={this.state.toggleNav}>
                <div className="navLeft">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/men">Men</Link></li>
                    <li><Link to="/women">Women</Link></li>
                    <li><Link to="/add-item">Sell</Link></li>
                </div>
                <div className="navRight">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </div>
            </ul>
        </div>)
    }     
}

export default Navigation;
