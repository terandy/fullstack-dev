import React, { Component } from 'react';
import { connect } from 'react-redux';
import Items from './Items.jsx';

class MainPage extends Component {
  render = () => {
    return (
      <div style={{ margin: '5em 0 0 0' }}>
        <Items />
      </div>
    );
  };
}

export default MainPage;
