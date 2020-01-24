import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import Login from './Login.jsx';

class LoginPage extends Component {
  render = () => {
    return (
      <div className="page1-container">
        <div className="page1-form-container">
          <div className="page1-form-subcontainer">
            <h1>
              <Link to="/">AliBay</Link>
            </h1>
            <h2>Login</h2>
            <Login inputClass="page1-form-input" buttonClass="page1-botton" />
            <div>
              <Link to="/register" className="page1-redirect">
                Create an account
              </Link>
              <span>|</span>
              <a className="page1-redirect">Forgot you password?</a>
            </div>
          </div>
        </div>
        <div className="page1-image1-container">
          <img src="../uploads/register-image1.webp" className="page1-image1" />
        </div>
      </div>
    );
  };
}

export default LoginPage;
