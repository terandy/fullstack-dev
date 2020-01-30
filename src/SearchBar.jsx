import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: ''
    };
  }
  handleSearchInput = evt => {
    console.log(this.props.items);
    this.setState({ searchInput: evt.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    // if (this.state.searchInput === "") return

    let lowercased = this.state.searchInput.toLowerCase();
    this.props.dispatch({
      type: 'filter',
      content: lowercased
    });
  };
  render = () => {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleSearchInput}></input>
          <input type="submit"></input>
        </form>
      </div>
    );
  };
}

export default connect()(SearchBar);
