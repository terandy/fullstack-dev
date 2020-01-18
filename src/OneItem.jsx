import React, { Component } from 'react';
class OneItem extends Component {
  constructor(props) {
    super(props);
  }
  render = () => {
    console.log('props item', this.props.item);
    return (
      <div>
        title: <div>{this.props.item.item}</div>
        description: <div>{this.props.item.description}</div>
        images:
        <img src={'..' + this.props.item.imgPaths[0]} />;
      </div>
    );
  };
}
export default OneItem;
