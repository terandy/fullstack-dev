import React, { Component } from 'react'

let loggedIn = true

class App extends Component {
    render = () => {
        if(!loggedIn){
            return <div>Login Page</div>
        }
        return <div>Main Page</div>
    }
}


export default App
