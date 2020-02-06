import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
const Container = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  height: 1.5em;
  border-radius: 1em;
  padding: 0.25em;
  border: ${props => (props.toggle ? '1px solid lightgrey' : 'none')};
  @media screen and (max-width: 968px) {
    border: 1px solid lightgrey;
  }
`;
const Form = styled.form`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  input {
    width: ${props => (props.toggle ? '200px' : '0')};
    transition: 1s;
    margin: 0;
    padding: 0;
    padding-left: 1em;
    height: 2em;
    border: none;
    &:focus {
      outline: 0;
    }
    @media screen and (max-width: 968px) {
      width: 100%;
    }
  }
  button {
    margin: 0;
    padding: 0;
    height: 2em;
    border: none;
    &:focus {
      outline: 0;
    }
  }
`;
const SearchIcon = styled.img`
  max-height: 90%;
  width: auto;

  &:hover {
    cursor: pointer;
  }
`;

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      toggle: false
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
    this.setState({ searchInput: '' });
  };
  displaySearch = () => {
    this.setState({ toggle: !this.state.toggle });
  };
  render = () => {
    return (
      <Container toggle={this.state.toggle}>
        <Form onSubmit={this.handleSubmit} toggle={this.state.toggle}>
          <input
            type="text"
            value={this.state.searchInput}
            onChange={this.handleSearchInput}
          ></input>
          <button type="submit">
            <SearchIcon
              src="/../uploads/search.png"
              onClick={this.displaySearch}
            />
          </button>
        </Form>
      </Container>
    );
  };
}

export default connect()(SearchBar);
