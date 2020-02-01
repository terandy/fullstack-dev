import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import Navigation from './Navigation.jsx';
import MainPage from './MainPage.jsx';
import Items from './Items.jsx';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import AddItem from './AddItem.jsx';
import ItemDetail from './ItemDetail.jsx';
import Cart from './Cart.jsx';
import SellerItemDetail from './SellerItemDetail.jsx';
import SellerItems from './SellerItems.jsx';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount = () => {
    let checkUser = async () => {
      console.log('check if user is logged in');
      let response = await fetch('/user', { method: 'POST' });
      let text = await response.text();
      let body = JSON.parse(text);
      this.props.dispatch({ type: 'login-sucess', content: body.user });
    };
    checkUser();
  };

  renderHomePage = routerData => {
    return (
      <div>
        <MainPage />
      </div>
    );
  };
  renderShopPage = routerData => {
    return (
      <div>
        <Items />
      </div>
    );
  };
  renderLoginPage = routerData => {
    return <LoginPage history={routerData.history} />;
  };
  renderSignupPage = routerData => {
    return <RegisterPage history={routerData.history} />;
  };
  renderSearchPage = renderdata => {
    return <SearchPage tags={renderdata.match.params.tags} />;
  };
  renderItemDetail = renderdata => {
    return <ItemDetail itemId={renderdata.match.params.itemId} />;
  };
  renderSellerItemDetail = renderdata => {
    return <SellerItemDetail itemId={renderdata.match.params.itemId} />;
  };
  renderAddItem = routerData => {
    return <AddItem history={routerData.history} />;
  };
  renderMenItems = () => {
    return <Items category="man" />;
  };
  renderWomenItems = () => {
    return <Items category="woman" />;
  };
  renderSellerItemPage = () => {
    return <SellerItems />;
  };
  renderCart = () => {
    return <Cart/>
  }

  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Route exact={true} path="/" render={this.renderHomePage}></Route>
          <Route exact={true} path="/shop" render={this.renderShopPage}></Route>
          <Route exact={true} path="/men" render={this.renderMenItems}></Route>
          <Route
            exact={true}
            path="/women"
            render={this.renderWomenItems}
          ></Route>
          <Route
            exact={true}
            path="/seller-items"
            render={this.renderSellerItemPage}
          ></Route>
          <Route
            exact={true}
            path="/login"
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
          <Route
            exact={true}
            path="/seller-item-detail/:itemId"
            render={this.renderSellerItemDetail}
          ></Route>
          <Route
            exact={true}
            path="/search/:tags"
            render={this.renderSearchPage}
          ></Route>
        </div>
      </BrowserRouter>
    );
  };
}

export default connect()(App);
