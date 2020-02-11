import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
//---styles
const Form = styled.form`
  display: grid;
  max-width: 800px;
  min-width: 300px;
  font-family: sans-serif;
  margin: auto;
  border: lightgrey solid 1px;
  padding: 3em;
`;
const DetailsContent = styled.div`
  font-family: 'sans-serif';
  font-weight:600;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1.5em 5em 1em;
  grid-column-gap: 0.5em;
  grid-row-gap: 1.5em;
  label {
    font-family: 'Work Sans';
    display: flex;
    justify-content: flex-start;
    :after {
      content: ':';
    }
  }
`;
const Title = styled.h2`
  font-size: 1.25em;
  margin: 3.5em 0 2em 0;
  font-weight: normal;
  text-transform: uppercase;
  div {
    font-size: 50%;
    font-weight: lighter;
  }
`;
const Images = styled.div`
  display: grid;
`;
const Tags = styled.div`
  font-family: 'Work Sans';
  display: grid;
  justify-items: center;
  border: solid lightgrey 1px;
  padding: 2em;
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
    font-family: sans-serif;
  }
`;
const InputImages = styled.input`
  font-family: 'Work Sans';
  font-weight:600;
  color: purple;
  border: solid lightgrey 1px;
  padding: 2em;
`;
const SubmitButton = styled.input`
  background-color: #007bff;
  width: 50%;
  border-radius: 2em;
  font-size: 1em;
  color: white;
  margin: 1em 25% 2em 25%;
  padding: 0.75em;
  border: none;
  text-transform: uppercase;
  display: ${props => (props.checked ? 'block' : 'none')};
  &:focus {
    outline: 0;
  }
  &:hover {
    cursor: pointer;
    background-color: #0064cf;
  }
`;
const Button = styled.button`
  background-color: white;
  color: black;
  border: lightgrey solid 1px;
  font-size: 0.75em;
  border-radius: 0.5em;
  font-family: times;
  font-weight: lighter;
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
      tags: [''],
      submit: false,
      errorMessage: ''
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
  toggleSubmitButton = () => {
    this.setState(this.state.submit ? { submit: false } : { submit: true });
  };

  submitHandler = async evt => {
    evt.preventDefault();
    let data = new FormData();
    this.state.files.forEach(file => data.append('images', file));
    data.append('item', this.state.item);
    data.append('description', this.state.description);
    data.append('price', this.state.price);
    data.append('seller', this.state.seller);
    data.append('tag', this.state.tags);
    let response = await fetch('/add-item', { method: 'POST', body: data });
    let text = await response.text();
    let body = JSON.parse(text);
    if (body.success) {
      console.log('added');
      this.setState({
        files: [],
        description: '',
        seller: this.props.seller,
        item: '',
        price: '',
        tag: '',
        tags: ['']
      });
    } else {
      console.log('not added');
      this.setState({ errorMessage: '***Must be logged in to sell items.' });
    }
    alert('Your item was added to the Alibay!');
  };
  render = () => {
    return (
      <div style={{ margin: '5em 0 5em 0' }}>
        <h1 className="all-items-title">Selling</h1>
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
              maxLength="15"
            />
            <label>Description</label>
            <textarea
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
            <InputImages
              type="file"
              multiple
              onChange={this.fileChangeHandler}
            />
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
          <Title>
            <div>
              <h3>Terms and Conditions</h3>
              <input
                type="checkbox"
                label="I certify"
                onChange={this.toggleSubmitButton}
              />
              By submitting this form I hereby accept the Conditions and
              Responsabilities of our Policies of confidentiality.
            </div>
          </Title>
          <Title style={{ color: 'red', margin: 0 }}>
            <div>{this.state.errorMessage}</div>
          </Title>
          <SubmitButton
            type="submit"
            value="Submit"
            checked={this.state.submit}
            onChange={() => console.log('submited')}
          />
        </Form>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { seller: state.username };
};

export default connect(mapStateToProps)(AddItem);
