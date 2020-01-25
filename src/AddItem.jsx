import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
//---styles
const Form = styled.form`
  display: grid;
  max-width: 500px;
  min-width: 300px;
  font-family: 'Quicksand', sans-serif;
  margin: auto;
  box-shadow: 5px 5px 10px grey;
  padding: 3em;
`;
const DetailsContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1.5em 5em 1em;
  grid-column-gap: 0.5em;
  grid-row-gap: 1.5em;
  label {
    display: flex;
    justify-content: flex-end;
    :after {
      content: ':';
    }
  }
`;
const Title = styled.h2`
  font-size: 1.25em;
  margin: 3.5em 0 2em 0;
  div {
    font-size: 50%;
  }
`;
const Images = styled.div`
  display: grid;
  justify-items: center;
`;
const Tags = styled.div`
  display: grid;
  justify-items: center;
  div input {
    height: 2em;
    border: none;
    border-bottom: 1px lightgrey solid;
    margin-right: 2em;
    &:focus {
      outline: 0;
      border-bottom: black 1px solid;
    }
  }
  div button {
    height: 2em;
    font-family: 'Quicksand', sans-serif;
  }
`;
const SubmitButton = styled.input`
  background-color: purple;
  width: 50%;
  border-radius: 2em;
  font-size: 1em;
  color: white;
  margin: 4em 25% 2em 25%;
  padding: 0.75em;
  border: none;
`;
const Button = styled.button`
  background-color: teal;
  border-radius: 2em;
  color: white;
  border: none;
  font-size: em;
  &:focus {
    outline: none;
  }
`;

//------Component------
class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      description: '',
      seller: this.props.seller,
      item: '',
      price: '',
      tag: '',
      tags: ['']
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
  tagChangeHandler = e => {
    this.setState({ tag: e.target.value });
  };
  fileChangeHandler = e => {
    this.setState({ files: [...e.target.files] });
  };
  addTagSubmit = e => {
    e.preventDefault();
    this.setState({ tags: this.state.tags.concat(this.state.tag), tag: '' });
  };

  submitHandler = evt => {
    evt.preventDefault();
    let data = new FormData();
    this.state.files.forEach(file => data.append('images', file));
    data.append('item', this.state.item);
    data.append('description', this.state.description);
    data.append('price', this.state.price);
    data.append('seller', this.state.seller);
    data.append('tag', this.state.tags);
    fetch('/add-item', { method: 'POST', body: data });
    this.setState({
      files: [],
      description: '',
      seller: this.props.seller,
      item: '',
      price: '',
      tag: '',
      tags: ['']
    });
  };
  render = () => {
    return (
      <div>
        <Form onSubmit={this.submitHandler}>
          <Title>
            Step 1: Describe Item
            <div>Include here all information related to your item.</div>
          </Title>
          <DetailsContent>
            <label>Title</label>
            <input
              type="text"
              value={this.state.item}
              onChange={this.itemChangeHandler}
            />
            <label>Description</label>
            <input
              type="text"
              value={this.state.description}
              onChange={this.descChangeHandler}
            />
            <label>Price</label>
            <input
              type="text"
              value={this.state.price}
              onChange={this.priceChangeHandler}
            />
          </DetailsContent>
          <Title>
            Step 2: Upload Images<div>Upload multiple images at once!</div>
          </Title>
          <Images>
            <input type="file" multiple onChange={this.fileChangeHandler} />
          </Images>
          <Title>
            Step 3: Include Tags<div>Tags help users find your item.</div>
          </Title>

          <Tags>
            <div>
              <input
                type="text"
                value={this.state.tag}
                onChange={this.tagChangeHandler}
              />
              <Button onClick={this.addTagSubmit}>Add Tag </Button>
              {this.state.tags.map((tag, index) => (
                <div key={index}>{tag}</div>
              ))}
            </div>
          </Tags>
          <SubmitButton type="submit" value="Add Item" />
        </Form>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { seller: state.username };
};

export default connect(mapStateToProps)(AddItem);
