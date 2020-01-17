import React, {Component} from 'react'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import Navigation from './Navigation.jsx'

class MainPage extends Component{

    renderHomePage = () => {
        return <MainPage/>
    }
    renderLoginPage = () => {
        return <LoginPage/>
    }
    renderSignupPage = () => {
        return <SignupPage/>
    }

    render = () => {    
        return (<BrowserRouter>
        <div>
            <h1>Main Page</h1>

            <MobileNavigation/>
            <Navigation/>
            
            <Route exact={true} path='/' render={this.renderHomePage}></Route>
            <Route exact={true} path='/login' render={this.renderLoginPage}></Route>
            <Route exact={true} path='/signup' render={this.renderSignupPage}></Route>
            <Route exact={true} path='/cart/' render={this.renderCart}></Route>
            <Route exact={true} path='/checkout/' render={this.renderCheckout}></Route>
        </div>
        </BrowserRouter>)
    }
}


export default MainPage