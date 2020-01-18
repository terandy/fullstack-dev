import React, { Component } from 'react';
class OneItem extends Component {
  constructor(props) {
    super(props);
  }
  render = () => {
    return (
      <div className="one-item">
        <img src={'..' + this.props.item.imgPaths[0]} />;
        <h1>{this.props.item.item}</h1>
        <p>{this.props.item.description}</p>
      </div>
    );
  };
}
export default OneItem;
