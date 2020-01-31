import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';

class MainPage extends Component {
  render = () => {
    return (
      <div style={{ margin: '5em 0 0 0' }}>
        <Link to="/shop">Shop All</Link>
        <br />
        <Link to="/women">women</Link>
        <br />
        <Link to="/men">men</Link>
      </div>
    );
  };
}

export default MainPage;
