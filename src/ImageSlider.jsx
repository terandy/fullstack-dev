import React, { Component } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  position: relative;
  width: 100vw;
  overflow: hidden;
  @media screen and (min-width: 960px) {
    width: 100%;
    height: 80vh;
  }
`;
const ImgDiv = styled.div`
  display: flex;
  transition: ease-in-out 0.25s;
  width: 500%;
  height: 90%;
  background-color: grey;
  position: absolute;
  left: ${props => (props.position / 5) * 500 + '%'};
  top: 0;
  z-index: 1;
  img {
    width: 20%;
    height: 90%;
    object-fit: cover;
    overflow: hidden;
  }
`;
const LeftArrow = styled.div`
  height: 100%;
  width: 40%;
  left: 0;
  position: absolute;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  z-index: 2;
  img {
    width: 20%;
    display: ${props => props.toggle};
  }
  &:hover {
    cursor: pointer;
  }
`;
const RightArrow = styled(LeftArrow)`
  left: 60%;
  justify-content: flex-end;
`;
const Img = styled.img`
  height: 10px;
  width: 10px;
  object-fit: cover;
  overflow: hidden;
  margin: 10px;
  right: 0;
  bottom:0;
  border-radius:1em;
  border:${props => props.border};
  &:hover {
    cursor: pointer;
  }
  @media screen and (min-width: 960px) {
    height: 100%
    width: auto;
  }
`;
class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: 'none',
      position: 0
    };
  }
  componentDidUpdate = prevProps => {
    if (prevProps.mainImage !== this.props.mainImage) {
      this.setState({ position: this.state.position });
    }
  };
  displayArrows = () => {
    this.setState({ toggle: 'block' });
    setTimeout(() => {
      this.setState({ toggle: 'none' });
    }, 1500);
  };

  shiftLeft = () => {
    if (this.state.position === 0) {
      return;
    }
    this.setState({ position: this.state.position - 1 });
  };

  shiftRight = () => {
    if (this.state.position === 4) {
      return;
    }
    this.setState({ position: this.state.position + 1 });
  };

  render() {
    return (
      <SliderContainer onMouseEnter={this.displayArrows}>
        <LeftArrow toggle={this.state.toggle} onClick={this.shiftLeft}>
          <img src="../uploads/left-arrow.png" />
        </LeftArrow>
        <ImgDiv position={this.state.position}>
          {this.props.imagesArray.map((imagePath, index) => {
            return <img key={index} src={'..' + imagePath} />;
          })}
        </ImgDiv>
        <RightArrow toggle={this.state.toggle} onClick={this.shiftRight}>
          <img src="../uploads/right-arrow.png" />
        </RightArrow>
        {this.props.imagesArray.map((img, index) => {
          return (
            <Img
              onMouseEnter={() => this.setState({ position: index })}
              key={index}
              src={'..' + img}
              border={
                index === this.state.position ? 'solid 5px white' : 'none'
              }
            />
          );
        })}
      </SliderContainer>
    );
  }
}

export default ImageSlider;
