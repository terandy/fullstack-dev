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
        {/* <div>
          {this.state.item.imgPaths.map(img => {
            return <img src={img} />;
          })}
        </div> */}
        <h1>{this.state.item.item}</h1>
        <div>{this.state.item.price}</div>
        <h2>Product Details</h2>
        <div>{this.state.item.description}</div>
        <button>Add to Cart</button>
      </div>
    );
  };
}
export default ItemDetail;
