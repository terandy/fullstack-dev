import React, { Component } from 'react';
import styled from 'styled-components';

let arrowDisplayToggle = 'none';

const SliderContainer = styled.div`
  position: relative;
  border: red solid 2px;
  width: 100vw;
`;
const ImgDiv = styled.div``;
const LeftArrow = styled.div`
  height: 100%;
  width: 40%;
  left: 0;
  position: absolute;
  border: solid blue 1px;
  justify-content: flex-start;
  align-items: center;
  display: ${props => props.toggle};
  img {
    width: 20%;
    border: red solid 1px;
  }
`;
const RightArrow = styled.div`
  height: 100%;
  width: 40%;
  right: 0;
  position: absolute;
  border: solid blue 1px;
  justify-content: flex-end;
  align-items: center;
  display: ${props => props.toggle};
  img {
    width: 20%;
    border: red solid 1px;
  }
`;

class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: 'none'
    };
  }
  displayArrows = () => {
    console.log('enter');
    this.setState({ toggle: 'flex' });
  };
  render() {
    return (
      <SliderContainer onMouseEnter={this.displayArrows}>
        <LeftArrow toggle={this.state.toggle}>
          <img src="../uploads/left-arrow.png" />
        </LeftArrow>
        <ImgDiv></ImgDiv>
        <ImgDiv></ImgDiv>
        <ImgDiv></ImgDiv>
        <RightArrow toggle={this.state.toggle}>
          <img src="../uploads/right-arrow.png" />
        </RightArrow>
      </SliderContainer>
    );
  }
}

export default ImageSlider;
