import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter, Link } from 'react-router-dom';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      usernameLoginInput: '',
      passwordLoginInput: ''
    };
  }

  usernameLoginChange = evt => {
    this.setState({ usernameLoginInput: evt.target.value });
  };
  passwordLoginChange = evt => {
    this.setState({ passwordLoginInput: evt.target.value });
  };

  submitLoginHandler = async evt => {
    evt.preventDefault();
    console.log('password', this.state.passwordLoginInput);
    let name = this.state.usernameLoginInput;
    let data = new FormData();
    data.append('username', name);
    data.append('password', this.state.passwordLoginInput);
    let response = await fetch('/login', { method: 'POST', body: data });
    let body = await response.text();
    console.log('/login response', body);
    body = JSON.parse(body);
    if (body.success) {
      console.log('logging in now..');
      this.props.dispatch({ type: 'login-sucess', content: name });
    }
  };

  render = () => {
    return (
      <div className="login-form-container">
        <form onSubmit={this.submitLoginHandler}>
          <h2>Log in</h2>
          <div>
            <input
              className="registration-form-input login"
              type="text"
              onChange={this.usernameLoginChange}
              value={this.state.usernameLoginInput}
              placeholder="Username"
            />{' '}
          </div>
          <div>
            <input
              className="registration-form-input login"
              type="text"
              onChange={this.passwordLoginChange}
              value={this.state.passwordLoginInput}
              placeholder="Password"
            />{' '}
          </div>
          <button className="registration-botton login-botton login">
            Log in
          </button>
        </form>
      </div>
    );
  };
}

export default connect()(Login);
