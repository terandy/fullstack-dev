import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
//---styles
const Form = styled.form`
  display: grid;
  max-width: 500px;
  min-width: 300px;
  font-family: sans-serif;
  margin: auto;
  border: lightgrey solid 1px;
  padding: 3em;
  h1 {
    margin: 1.5em 0 -1em 0;
    padding: 0;
    color: purple;
    font-size: 1.5em;
    text-align: center;
    text-transform: uppercase;
    font-weight: normal;
  }
`;
const DetailsContent = styled.div`
  font-family: 'sans-serif';
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
const Tag = styled.div`
  &:hover {
    cursor: pointer;
    text-decoration: line-through;
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
  justify-items: center;
`;
const Img = styled.div`
  display: flex;
  width: 90%;
  flex-wrap: wrap;
  border: 1px lightgrey solid;
  margin: 0 0 1em 0;
  img {
    margin: 1px;
    height: auto;
    width: 100px;
    text-align: middle;
    border: 1px solid white;
    &:hover {
      cursor: pointer;
      border: 1px red solid;
    }
  }
`;
const Tags = styled.div`
  font-family: 'sans-serif';
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
  font-family: 'sans-serif';
  color: purple;
  border: solid lightgrey 1px;
  padding: 2em;
`;
const SubmitButton = styled.input`
  background-color: purple;
  width: 50%;
  border-radius: 2em;
  font-size: 1em;
  color: white;
  margin: 1em 25% 2em 25%;
  padding: 0.75em;
  border: none;
  text-transform: uppercase;
  &:focus {
    outline: 0;
  }
  &:hover {
    cursor: pointer;
    background-color: grey;
  }
`;
const DeleteButton = styled.button`
  background-color: Teal;
  width: 50%;
  border-radius: 2em;
  font-size: 1em;
  color: white;
  margin: 1em 25% 2em 25%;
  padding: 0.75em;
  border: none;
  text-transform: uppercase;
  &:focus {
    outline: 0;
  }
  &:hover {
    cursor: pointer;
    background-color: grey;
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
class SellerItemDetail extends Component {
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
      errorMessage: '',
      thisItem: [],
      images: []
    };
  }
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    let data = new FormData();
    data.append('itemId', this.props.itemId);
    let responseBody = await fetch('/one-item', { method: 'POST', body: data });
    let responseText = await responseBody.text();
    let itemObject = JSON.parse(responseText);
    console.log('itemObject', itemObject);
    let responseImages = await itemObject.imgPaths;
    let responseTags = await itemObject.tag;
    console.log('response tags', responseTags);
    console.log('tags', itemObject.tags);
    this.setState({
      thisItem: itemObject,
      images: responseImages,
      tags: responseTags,
      price: itemObject.price,
      seller: itemObject.seller,
      item: itemObject.item,
      description: itemObject.description
    });
  };

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
    this.setState({
      files: [...e.target.files]
    });
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
    console.log('files', this.state.files);
    this.state.files.forEach(file => data.append('images', file));
    data.append('item', this.state.item);
    data.append('description', this.state.description);
    data.append('price', this.state.price);
    data.append('seller', this.state.seller);
    data.append('tag', this.state.tags);
    data.append('itemId', this.props.itemId);
    let response = await fetch('/update-item', { method: 'POST', body: data });
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
    alert('Your item was edited to the Alibay!');
  };
  submitDetailHandler = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append('item', this.state.item);
    data.append('description', this.state.description);
    data.append('price', this.state.price);
    data.append('seller', this.state.seller);
    data.append('itemId', this.props.itemId);
    let response = await fetch('/update-detail-item', {
      method: 'POST',
      body: data
    });
    let text = await response.text();
    let body = JSON.parse(text);
    if (body.success) {
      console.log('added');
      this.setState({
        description: '',
        item: '',
        price: ''
      });
    } else {
      console.log('not added');
      this.setState({ errorMessage: '***Must be logged in to sell items.' });
    }
    alert('Your item was edited!');
  };
  submitImageHandler = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append('seller', this.state.seller);
    console.log('files', this.state.files);
    this.state.files.forEach(file => data.append('images', file));
    data.append('itemId', this.props.itemId);
    let response = await fetch('/update-image-item', {
      method: 'POST',
      body: data
    });
    let text = await response.text();
    let body = JSON.parse(text);
    if (body.success) {
      console.log('added');
      this.setState({
        files: []
      });
    } else {
      console.log('not added');
      this.setState({ errorMessage: '***Must be logged in to sell items.' });
    }
    alert('Your item was edited!');
  };
  submitImageOrderHandler = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append('seller', this.state.seller);
    this.state.images.forEach(image => data.append('images', image));
    data.append('itemId', this.props.itemId);
    let response = await fetch('/update-image-order-item', {
      method: 'POST',
      body: data
    });
    let text = await response.text();
    let body = JSON.parse(text);
    if (body.success) {
      console.log('added');
    } else {
      console.log('not added');
      this.setState({ errorMessage: '***Must be logged in to sell items.' });
    }
    alert('Your item was edited!');
  };
  submitTagHandler = async evt => {
    console.log('yes submitted tag updates');
    evt.preventDefault();
    let data = new FormData();
    data.append('seller', this.state.seller);
    this.state.tags.forEach(tag => {
      data.append('tag', tag);
    });
    data.append('itemId', this.props.itemId);
    let response = await fetch('/update-tag-item', {
      method: 'POST',
      body: data
    });
    let text = await response.text();
    let body = JSON.parse(text);
    if (body.success) {
      console.log('added');
      this.setState({
        tag: ''
      });
    } else {
      console.log('not added');
      this.setState({ errorMessage: '***Must be logged in to sell items.' });
    }
    alert('Your item was edited!');
  };
  makeMainImage = index => {
    let newImages = [];
    newImages[0] = this.state.images[index];
    this.state.images.forEach((image, i) => {
      if (i !== index) {
        console.log('pushed iamge', i);
        newImages.push(image);
      }
    });
    this.setState({ images: newImages });
    console.log('images switched', this.state.images);
  };
  removeTag = index => {
    let newTags = [];
    this.state.tags.forEach((tag, i) => {
      if (index !== i) {
        newTags.push(tag);
      }
    });
    this.setState({ tags: newTags });
  };
  deleteItem = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append('seller', this.state.seller);
    data.append('itemId', this.props.itemId);
    let response = await fetch('/delete-item', {
      method: 'POST',
      body: data
    });
    let text = await response.text();
    let body = JSON.parse(text);
    if (body.success) {
      console.log('delted');
      this.setState({
        tag: ''
      });
    } else {
      console.log('not deleted');
    }
    alert('Your item was delted!');
  };

  render = () => {
    return (
      <div style={{ marginTop: '5em' }}>
        <Form>
          <h1 style={{ margin: '0' }}>Edit Existing Item</h1>
        </Form>
        <Form onSubmit={this.submitDetailHandler}>
          <Title>
            1 - Information
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
          <SubmitButton
            type="submit"
            value="Update"
            onChange={() => console.log('submited')}
          />
        </Form>

        <Form onSubmit={this.submitImageOrderHandler}>
          <Title>
            2.1 - Select main Image
            <div>
              Click image to select as main. All other images will be shifted
              right.
            </div>
          </Title>
          <Images>
            <Img>
              {this.state.images.map((image, index) => {
                return (
                  <div key={index}>
                    <div
                      style={{
                        height: '1em',
                        width: '100px',
                        textAlign: 'center',
                        margin: '1em 0'
                      }}
                    >
                      {index === 0 ? 'Main' : index === 1 ? 'Second' : ''}
                    </div>
                    <img
                      src={'..' + image}
                      onClick={() => this.makeMainImage(index)}
                    />
                  </div>
                );
              })}
            </Img>
          </Images>
          <SubmitButton
            type="submit"
            value="Update order of images"
            onChange={() => console.log('submited')}
          />
        </Form>
        <Form onSubmit={this.submitImageHandler}>
          <Title>
            2.2 - Update Images
            <div>Replace all existing images with new uploads</div>
          </Title>
          <InputImages type="file" multiple onChange={this.fileChangeHandler} />

          <SubmitButton
            type="submit"
            value="Update all images"
            onChange={() => console.log('submited')}
          />
        </Form>

        <Form onSubmit={this.submitTagHandler}>
          <Title>
            3 - Tags<div>Add new tags, or click tag to remove.</div>
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
                <Tag key={index} onClick={() => this.removeTag(index)}>
                  {tag}
                </Tag>
              ))}
            </div>
          </Tags>
          <SubmitButton
            type="submit"
            value="Update"
            onChange={() => console.log('submited')}
          />
        </Form>
        <Form>
          <Title>
            4 - Remove item<div>Delete item from Alibay</div>
          </Title>
          <DeleteButton onClick={this.deleteItem}>Delete Item</DeleteButton>
        </Form>
      </div>
    );
  };
}

let mapStateToProps = state => {
  return { seller: state.username };
};

export default connect(mapStateToProps)(SellerItemDetail);
