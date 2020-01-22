import React, { Component } from 'react';
class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: []
    };
  }
  componentDidMount = async () => {
    let data = new FormData();
    data.append('itemId', this.props.itemId);
    let responseBody = await fetch('/one-item', { method: 'POST', body: data });
    let responseText = await responseBody.text();
    let itemObject = JSON.parse(responseText);
    console.log('itemObject', itemObject);
    this.setState({ item: itemObject });
  };
  render = () => {
    console.log(this.state.item);
    return (
      <div>
        Item detail
        <div>id {this.props.itemId}</div>
        <div>Description</div>
        <div>{this.state.item.description}</div>
        <button>Add to Cart</button>
      </div>
    );
  };
}
export default ItemDetail;
