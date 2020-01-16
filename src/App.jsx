import React, { Component } from 'react'
import LoginPage from './LoginPage.jsx'
import MainPage from './MainPage.jsx'

let loggedIn = !true

class App extends Component {
    render = () => {
        if(!loggedIn){
            return <LoginPage/>
        }
        return <MainPage/>
    }
}


export default App
