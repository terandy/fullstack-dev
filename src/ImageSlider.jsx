import React, { Component } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  position: relative;
  width: 100vw;
  overflow: hidden;
`;
const ImgDiv = styled.div`
  display: flex;
  transition: ease-in-out 0.25s;
  width: 500%;
  height: 100%;
  background-color: grey;
  position: absolute;
  left: ${props => props.position + '%'};
  top: 0;
  z-index: 1;
  img {
    width: 20%;
    height: 100%;
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

class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: 'none',
      position: 0
    };
  }
  componentDidMount = () => {
    console.log('hovered');
    if (this.props.mainImage) {
      this.setState({ position: this.props.mainImage / 5 });
    }
  };
  displayArrows = () => {
    this.setState({ toggle: 'block' });
    setTimeout(() => {
      this.setState({ toggle: 'none' });
    }, 1500);
  };

  shiftLeft = () => {
    console.log('left');
    if (this.state.position === 0) {
      return;
    }
    this.setState({ position: this.state.position + 100 });
  };

  shiftRight = () => {
    console.log('right');
    if (this.state.position === -400) {
      return;
    }
    this.setState({ position: this.state.position - 100 });
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
      </SliderContainer>
    );
  }
}

export default ImageSlider;
