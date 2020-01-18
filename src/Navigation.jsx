import React, {Component} from 'react'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import {connect} from 'react-redux'


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
}


export default Navigation