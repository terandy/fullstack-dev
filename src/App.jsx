import React, { Component } from 'react'
import {connect} from 'react-redux'
import LoginPage from './LoginPage.jsx'
import MainPage from './MainPage.jsx'

let loggedIn = !true

class App extends Component {
    render = () => {
        if(loggedIn){
            return <MainPage/>
        }
        return <LoginPage/>
    }
}


export default connect()(App)
