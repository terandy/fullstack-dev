import React, { Component } from 'react';
class OneItem extends Component {
  constructor(props) {
    super(props);
  }
  render = () => {
    return (
      <div className="one-item">
        <div className="one-item-image">
          <img src={'..' + this.props.item.imgPaths[0]} />
        </div>
        <div className="one-item-text">
          <h1>{this.props.item.item}</h1>
          <p>${this.props.item.price}</p>
        </div>
      </div>
    );
  };
}
export default OneItem;
