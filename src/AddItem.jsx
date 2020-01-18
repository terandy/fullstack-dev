import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      description: '',
      seller: this.props.seller,
      item: '',
      price: ''
    };
  }
  descChangeHandler = e => {
    this.setState({ description: e.target.value });
  };
  itemChangeHandler = e => {
    this.setState({ item: e.target.value });
  };
  usernameChangeHandler = e => {
    this.setState({ username: e.target.value });
  };
  priceChangeHandler = e => {
    this.setState({ price: e.target.value });
  };
  fileChangeHandler = e => {
    this.setState({ files: [...e.target.files] });
  };
  submitHandler = evt => {
    evt.preventDefault();
    let data = new FormData();
    this.state.files.forEach(file => data.append('images', file));
    console.log('data', data);
    console.log('state', this.state);
    data.append('item', this.state.item);
    data.append('description', this.state.description);
    data.append('price', this.state.price);
    data.append('seller', this.state.seller);
    fetch('/add-item', { method: 'POST', body: data });
  };
  render = () => {
    return (
      <form onSubmit={this.submitHandler}>
        images <input type="file" multiple onChange={this.fileChangeHandler} />
        seller{' '}
        <input
          type="text"
          value={this.state.seller}
          onChange={this.usernameChangeHandler}
        />
        item{' '}
        <input
          type="text"
          value={this.state.item}
          onChange={this.itemChangeHandler}
        />
        description{' '}
        <input
          type="text"
          value={this.state.description}
          onChange={this.descChangeHandler}
        />
        price{' '}
        <input
          type="text"
          value={this.state.price}
          onChange={this.priceChangeHandler}
        />
        <input type="submit" value="add item" />
      </form>
    );
  };
}

let mapStateToProps = state => {
  return { seller: state.username };
};

export default connect(mapStateToProps)(AddItem);
