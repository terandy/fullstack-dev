import React, { Component } from 'react';
import { Route, BrowserRouter, Link } from 'react-router-dom';
class OneItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0
    };
  }
  toggleImage = () => {
    if (this.state.imageIndex === 0) {
      this.setState({ imageIndex: 1 });
      return;
    } else {
      this.setState({ imageIndex: 0 });
      return;
    }
  };
  render = () => {
    return (
      <Link to={this.props.link + this.props.item._id}>
        <div className="one-item">
          <div
            onMouseEnter={this.toggleImage}
            onMouseLeave={this.toggleImage}
            className="one-item-image"
          >
            <img src={'..' + this.props.item.imgPaths[this.state.imageIndex]} />
          </div>
          <div className="one-item-text">
            <h1>{this.props.item.item}</h1>
            <p>{this.props.item.price}</p>
          </div>
        </div>
      </Link>
    );
  };
}
export default OneItem;
