import React, { Component } from 'react'

class Register extends Component {
    constructor() { 
        super() 
        this.state = {
            usernameRegisterInput: "",
            passwordRegisterInput: "", 
        } 
    } 
    usernameRegisterChange = evt => {
        this.setState({ usernameRegisterInput: evt.target.value })
    }
    passwordRegisterChange = evt => {
        this.setState({ passwordRegisterInput: evt.target.value })
    }

    submitRegisterHandler = async evt => {
        evt.preventDefault()
        let name = this.state.usernameRegisterInput
        let data = new FormData()
        data.append("username", name)
        data.append("password", this.state.passwordRegisterInput)
        let response = await fetch('/register', { method: "POST", body: data })
        let body = await response.text()
        console.log("/register response", body)
        body = JSON.parse(body)
        if (body.success) {
            this.setState({ 
                usernameRegisterInput: "",
                passwordRegisterInput: "" })
        } 

    }
    render = () => {
        return (
        <form onSubmit={this.submitRegisterHandler}>
            <h2>Register</h2>
            <div>Username <input type="text" onChange={this.usernameRegisterChange} value={this.state.usernameRegisterInput}/> </div>
            <div>Password <input type="text" onChange={this.passwordRegisterChange} value={this.state.passwordRegisterInput}/> </div>
            <input type="submit" value="register" />
        </form>
        )
    }
}

export default Register