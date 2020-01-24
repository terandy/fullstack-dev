import React, { Component } from 'react';
import styled from 'styled-components';

const ItemName = styled.h1`
  color: pink;
`;
const MainImg = styled.img`
  height: 300px;
`;
const Description = styled.div`
  border: blue 1px solid;
  width: 50%;
`;
const Price = styled.div`
  color: red;
  &:before {
    content: '$';
  }
`;
const Button = styled.button`
  color: white;
  background-color: black;
  border: white 1px solid;
  width: 100%;
  padding: 1em;
`;
const Img = styled.img`
  height: 100px;
  margin: 1px;
  &:hover {
    cursor: pointer;
  }
`;

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      images: [],
      mainImage: 0
    };
  }

  componentDidMount = async () => {
    let data = new FormData();
    data.append('itemId', this.props.itemId);
    let responseBody = await fetch('/one-item', { method: 'POST', body: data });
    let responseText = await responseBody.text();
    let itemObject = JSON.parse(responseText);
    console.log('itemObject', itemObject);
    let responseImages = await itemObject.imgPaths;
    this.setState({ item: itemObject, images: responseImages });
  };
  render = () => {
    console.log(this.state.item);
    return (
      <div className="detail-container">
        <div className="detail-left">
          {this.state.images.map((img, index) => {
            return (
              <Img
                onMouseEnter={() => this.setState({ mainImage: index })}
                key={index}
                src={'..' + img}
              />
            );
          })}
        </div>
        <div className="detail-image">
          <MainImg src={this.state.images[this.state.mainImage]} />
        </div>
        <div className="detail-right">
          <ItemName>{this.state.item.item}</ItemName>
          <Price>{this.state.item.price}</Price>
          <h2>Product Details</h2>
          <Description>{this.state.item.description}</Description>
          <Button>Add to Cart</Button>
        </div>
      </div>
    );
  };
}
export default ItemDetail;
