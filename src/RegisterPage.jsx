import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter, Link } from 'react-router-dom';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      usernameRegisterInput: '',
      passwordRegisterInput: '',
      message: ''
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
    if (this.props.cart === []) {
      data.append('cart', this.props.cart)
    } 
    else {
      this.props.cart.forEach(item => {
        data.append('cart', item)
      })
    }
    let response = await fetch('/register', { method: 'POST', body: data });
    let body = await response.text();
    console.log('/register response', body);
    let registerBody = JSON.parse(body);
    if (registerBody.success) {
      let loginResponse = await fetch('/login', { method: 'POST', body: data });
      let loginText = await loginResponse.text();
      console.log('/login response', body);
      let loginBody = JSON.parse(loginText);
      //now login
      if (loginBody.success) {
        console.log('logging in now..');
        this.props.dispatch({ type: 'login-sucess', content: name });
        this.setState({
          usernameRegisterInput: '',
          passwordRegisterInput: ''
        });
        this.props.history.push('/');
      }
    } else {
      this.setState({
        message: 'Sorry username already taken. Try again!',
        usernameRegisterInput: '',
        passwordRegisterInput: ''
      });
    }
  };

  render = () => {
    return (
      <div className="page1-container">
        <div className="page1-form-container">
          <div className="page1-form-subcontainer">
            <h1>
              <Link to="/">AliBay</Link>
            </h1>
            <h2>Sign up</h2>
            <form onSubmit={this.submitRegisterHandler}>
              <div>
                <input
                  className="page1-form-input"
                  type="text"
                  onChange={this.usernameRegisterChange}
                  value={this.state.usernameRegisterInput}
                  placeholder="Username"
                />{' '}
              </div>
              <div>
                <input
                  className="page1-form-input"
                  type="text"
                  onChange={this.passwordRegisterChange}
                  value={this.state.passwordRegisterInput}
                  placeholder="Password"
                />{' '}
              </div>
              <button className="page1-botton">Create Account</button>
            </form>
            <Link to="/login" className="page1-redirect">
              Already a user? <span>Log in</span>
            </Link>
            <div>{this.state.message}</div>
          </div>
        </div>
        <div className="page1-image1-container">
          <img src="../uploads/register-image1.webp" className="page1-image1" />
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Register);
