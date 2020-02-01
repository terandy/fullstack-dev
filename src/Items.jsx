import React, { Component } from 'react';
import OneItem from './OneItem.jsx';
import { connect } from 'react-redux';
import styled from 'styled-components';

let Button = styled.button`
  border: 1px solid lightgrey;
  padding: 1em 2em;
  font-size: 1.5em;
  font-family: helvetica;
  text-transform: uppercase;
  font-weight: lighter;
  color: purple;
  width: 100%;
  &:hover {
    cursor: pointer;
    color: violet;
  }
  &:focus {
    outline: 0;
  }
`;

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount = () => {
    let updateItems = async () => {
      // console.log(this.props.items);
      let responseBody = await fetch('/all-items', { method: 'POST' });
      let responseText = await responseBody.text();
      let itemsArray = JSON.parse(responseText);
      this.props.dispatch({
        type: 'set-items',
        content: itemsArray
      });
      this.setState({ items: this.props.items });
    };
    updateItems();
  };

  render = () => {
    let results = this.state.items.filter(item => {
      if (this.state.items === '') return true;
      return item.tag.includes(
        this.props.category ? this.props.category : this.props.searchTag
      );
    });
    if (results.length === 0) {
      return <div style={{ marginTop: '5em' }}>No contents to display</div>;
    }
    return (
      <div style={{ marginTop: '5em' }}>
        <div className="all-items-display">
          {results.map((item, index) => {
            return (
              <div key={index}>
                {<OneItem item={item} link="/item-detail/" />}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return {
    items: state.items,
    searchTag: state.searchTag
  };
};

export default connect(mapStateToProps)(Items);
