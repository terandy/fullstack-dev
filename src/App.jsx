import React, {Component} from 'react'
import { Route, BrowserRouter, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import Navigation from './Navigation.jsx'
import MainPage from './MainPage.jsx'
import Login from './Login.jsx'
import Register from './register.jsx'
import AddItem from './AddItem.jsx'

class App extends Component{

    renderHomePage = () => {
        return <div>
            <Navigation/>
            <MainPage/>
            </div>
    }
    renderLoginPage = () => {
        return <Login/>
    }
    renderSignupPage = () => {
        return <Register/>
    }
    renderAddItem = () => {
        return <AddItem/>
    }
    renderMenItems = () => {
        return <MenItems/>
    }
    renderWomenItems = () => {
        return <WomenItems/>
    }
    renderSellPage = () => {
        return <WomenItems/>
    }

    render = () => {    
        return (<BrowserRouter>
        <div>
            <Route exact={true} path='/' render={this.renderHomePage}></Route>
            <Route exact={true} path='/men' render={this.renderMenItems}></Route>
            <Route exact={true} path='/women' render={this.renderWomenItems}></Route>
            <Route exact={true} path='/sell' render={this.renderSellPage}></Route>
            <Route exact={true} path='/login' render={this.renderLoginPage}></Route>
            <Route exact={true} path='/register' render={this.renderSignupPage}></Route>
            <Route exact={true} path='/cart/' render={this.renderCart}></Route>
            <Route exact={true} path='/add-item/' render={this.renderAddItem}></Route>
            <Route exact={true} path='/checkout/' render={this.renderCheckout}></Route>
        </div>
        </BrowserRouter>)
    }
}


export default App
