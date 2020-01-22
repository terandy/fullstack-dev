import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Navigation from './Navigation.jsx';
import MainPage from './MainPage.jsx';
import Login from './Login.jsx';
import LoginPage from './LoginPage.jsx';
import Register from './register.jsx';
import AddItem from './AddItem.jsx';
import ItemDetail from './ItemDetail.jsx';

class App extends Component {
  renderHomePage = () => {
    return (
      <div>
        <Navigation />
        <MainPage />
      </div>
    );
  };
  renderLoginPage = () => {
    return <Login />;
  };
  renderSignupPage = () => {
    return <Register />;
  };
  renderItemDetail = renderdata => {
    return <ItemDetail itemId={renderdata.match.params.itemId} />;
  };
  renderAddItem = () => {
    return <AddItem />;
  };
  renderMenItems = () => {
    return <MenItems />;
  };
  renderWomenItems = () => {
    return <WomenItems />;
  };

  renderHomePage = () => {
    return (
      <div>
        <MainPage />
      </div>
    );
  };
  renderLoginPage = () => {
    return <LoginPage />;
  };
  renderSignupPage = () => {
    return <Register />;
  };
  renderAddItem = () => {
    return <AddItem />;
  };
  renderMenItems = () => {
    return <MenItems />;
  };
  renderWomenItems = () => {
    return <WomenItems />;
  };

  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Route exact={true} path="/" render={this.renderHomePage}></Route>
          <Route exact={true} path="/men" render={this.renderMenItems}></Route>
          <Route
            exact={true}
            path="/women"
            render={this.renderWomenItems}
          ></Route>
          <Route
            exact={true}
            path="/login-page"
            render={this.renderLoginPage}
          ></Route>
          <Route
            exact={true}
            path="/register"
            render={this.renderSignupPage}
          ></Route>
          <Route exact={true} path="/cart/" render={this.renderCart}></Route>
          <Route
            exact={true}
            path="/add-item/"
            render={this.renderAddItem}
          ></Route>
          <Route
            exact={true}
            path="/checkout/"
            render={this.renderCheckout}
          ></Route>
          <Route
            exact={true}
            path="/item-detail/:itemId"
            render={this.renderItemDetail}
          ></Route>
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
