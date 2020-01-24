import React, { Component } from 'react';
import styled from 'styled-components';

const ItemName = styled.h1`
  text-transform: Capitalize;
  margin: 0;
`;
const H2 = styled.div`
  position: relative;
  border-bottom: solid 2px black;
  margin: 0;
  h2 {
    text-transform: Capitalize;
    position: absolute;
    bottom: 0;
    margin: 0;
    font-size: 1em;
  }
`;
const MainImg = styled.img`
  width: 90%;
`;
const Description = styled.div`
  padding: 1em;
  width: 50%;
`;
const Price = styled.div`
  &:before {
    content: '$';
  }
`;
const Button = styled.button`
  color: white;
  background-color: black;
  width: 100%;
  padding: 1em;
  &:hover {
    background-color: darkgrey;
    cursor: pointer;
  }
`;
const Img = styled.img`
  height: 40px;
  object-fit: cover;
  overflow: hidden;
  margin: 1px;
  right: 0;
  width: 40px;
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
          <H2>
            <h2>Product Details</h2>
          </H2>
          <Description>{this.state.item.description}</Description>
          <Button>Add to Cart</Button>
        </div>
      </div>
    );
  };
}
export default ItemDetail;
