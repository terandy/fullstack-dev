import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      usernameRegisterInput: '',
      passwordRegisterInput: ''
    };
  }
  usernameRegisterChange = evt => {
    this.setState({ usernameRegisterInput: evt.target.value });
  };
  passwordRegisterChange = evt => {
    this.setState({ passwordRegisterInput: evt.target.value });
  };

  submitRegisterHandler = async evt => {
    evt.preventDefault();
    let name = this.state.usernameRegisterInput;
    let data = new FormData();
    data.append('username', name);
    data.append('password', this.state.passwordRegisterInput);
    let response = await fetch('/register', { method: 'POST', body: data });
    let body = await response.text();
    console.log('/register response', body);
    body = JSON.parse(body);
    if (body.success) {
      this.setState({
        usernameRegisterInput: '',
        passwordRegisterInput: ''
      });
    }
  };
  render = () => {
    return (
      <div className="registration-container">
        <div className="registration-form-container">
          <Link to="/">
            <h1>AliBay</h1>
          </Link>
          <form onSubmit={this.submitRegisterHandler}>
            <h2>Register</h2>
            <div>
              <input
                className="registration-form-input"
                type="text"
                onChange={this.usernameRegisterChange}
                value={this.state.usernameRegisterInput}
                placeholder="Username"
              />{' '}
            </div>
            <div>
              <input
                className="registration-form-input"
                type="text"
                onChange={this.passwordRegisterChange}
                value={this.state.passwordRegisterInput}
                placeholder="Password"
              />{' '}
            </div>
            <button className="registration-botton">Sign up</button>
            <Link to="/login">
              <div className="registration-login-redirect">
                Already a user? <span>Log in</span>
              </div>
            </Link>
          </form>
        </div>
        <div className="registration-image1-container">
          <img
            src="../uploads/register-image1.webp"
            className="registration-image1"
          />
        </div>
      </div>
    );
  };
}

export default Register;
