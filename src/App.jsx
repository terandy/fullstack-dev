import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import Navigation from './Navigation.jsx';
import MainPage from './MainPage.jsx';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import AddItem from './AddItem.jsx';
import ItemDetail from './ItemDetail.jsx';

class App extends Component {
  renderHomePage = routerData => {
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
    return <RegisterPage />;
  };
  renderSearchPage = renderdata => {
    return <SearchPage tags={renderdata.match.params.tags} />;
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
            path="/search/:tags"
            render={this.renderSearchPage}
          ></Route>
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
