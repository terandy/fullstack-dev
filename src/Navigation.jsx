import React, {Component} from 'react'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import {connect} from 'react-redux'


class MainPage extends Component{
    render = () => {    
        return (<BrowserRouter>
        <nav class="desktopnav">
            <ul>
                <Link to="/">Home</Link>
            </ul>
        </nav>
                </BrowserRouter>)
    }
}


export default Navigation