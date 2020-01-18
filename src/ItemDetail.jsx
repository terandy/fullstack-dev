import React, { Component } from 'react';
class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => {
    return (
      <div>
        Item detail
        <div>id {this.props.itemId}</div>
      </div>
    );
  };
}
export default ItemDetail;
