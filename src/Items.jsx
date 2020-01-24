import React, { Component } from 'react';
import OneItem from './OneItem.jsx';
import { connect } from "react-redux" 


class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items
    };
  }
  updateItems = async () => {
    console.log(this.props.items)
    let responseBody = await fetch('/all-items', { method: 'POST' });
    let responseText = await responseBody.text();
    let itemsArray = JSON.parse(responseText);
    this.props.dispatch({ 
      type: "set-items", 
      content: itemsArray
  }) 
    this.setState({ items: this.props.items})
  };

  render = () => {
    let results = this.state.items.filter(item => {
      if (this.state.items === '') return true
      return item.tag.includes(this.props.searchTag)
    })
    return (
      <div>
        <button onClick={this.updateItems}>Reload items</button>
        <div className="all-items-display">
          {results.map((item, index) => {
            return <div key={index}>{<OneItem item={item} />}</div>;
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
  }
}

export default connect(mapStateToProps)(Items)
