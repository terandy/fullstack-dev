import React, { useState } from 'react';
import styled from 'styled-components';
const Container = styled.div`
  display: block;
  @media screen and (min-width: 968px) {
    position: relative;
  }
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &:hover {
    color: purple;
    cursor: pointer;
  }
`;
const Content = styled.div`
  display: ${props => props.display};
  font-size: 0.7em;
  margin: 0;
  padding: 0;
  padding-bottom: 1em;
  div {
    text-align: right;
    width: 100%;
  }
  @media screen and (min-width: 968px) {
    display: none;
    position: absolute;
    right: 0;
    min-width: max-content;
    box-shadow: rgba(128, 128, 128, 0.479) 4px 4px 16px;
    background-color: white;
    padding: 1em;
    z-index: 99;
    ${Container}:hover & {
      display: block;
    }
  }
`;

const Img = styled.img`
  display: inline-block;
  width: 0.5em;
  height: 0.5em;
  margin-left: 0.1em;
  transition: 0.1s;
  transform: ${props => {
    return props.display === 'none' ? 'rotate(90deg)' : 'rotate(-90deg)';
  }};
  @media screen and (min-width: 968px) {
    transform: rotate(90deg);
  }
`;

let Dropdown = props => {
  const [display, setDisplay] = useState('none');
  return (
    <Container>
      <Button onClick={() => setDisplay(display === 'none' ? 'block' : 'none')}>
        {props.name}
        <Img display={display} src="/../uploads/arrow.png" />
      </Button>

      <Content display={display}>{props.children}</Content>
    </Container>
  );
};

export default Dropdown;
