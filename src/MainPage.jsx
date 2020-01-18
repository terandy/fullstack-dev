import React, { Component } from 'react';
import { connect } from 'react-redux';
import Items from './Items.jsx';

class MainPage extends Component {
  render = () => {
    return (
      <div>
        Main Page
        <Items />
      </div>
    );
  };
}

export default MainPage;
