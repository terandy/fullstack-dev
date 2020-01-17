import React, { Component } from 'react'
import {connect} from 'react-redux'

class Login extends Component {
    constructor() {
        super()
        this.state = {
            usernameLoginInput: "",
            passwordLoginInput: "",
        }
    }

    usernameLoginChange = evt => {
        this.setState({ usernameLoginInput: evt.target.value })
    }
    passwordLoginChange = evt => {
        this.setState({ passwordLoginInput: evt.target.value })
    }

    submitLoginHandler = async evt => {
        evt.preventDefault()
        console.log("password", this.state.passwordLoginInput)
        let name = this.state.usernameLoginInput
        let data = new FormData()
        data.append("username", name)
        data.append("password", this.state.passwordLoginInput)
        let response = await fetch('/login', { method: "POST", body: data })
        let body = await response.text()
        console.log("/login response", body)
        body = JSON.parse(body)
        if (body.success) {
            console.log('logging in now..')
            this.props.dispatch( {type:"login-sucess",content: name })
        }
    }

    render = () => {
        return (
        <form onSubmit={this.submitLoginHandler}>
            <h2>Log In</h2>
            <div>Username <input type="text" onChange={this.usernameLoginChange} /> </div> 
            <div>Password <input type="text" onChange={this.passwordLoginChange} /> </div>
            <input type="submit" value="login" />
        </form>
        )
    }
}

export default connect()(Login)